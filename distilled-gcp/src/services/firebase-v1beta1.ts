// ==========================================================================
// Firebase Management API (firebase v1beta1)
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
  name: "firebase",
  version: "v1beta1",
  rootUrl: "https://firebase.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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

export interface AndroidApp {
  /** The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)). */
  name?: string;
  /** Output only. Immutable. The globally unique, Firebase-assigned identifier for the `AndroidApp`. This identifier should be treated as an opaque token, as the data format is not specified. */
  appId?: string;
  /** The user-assigned display name for the `AndroidApp`. */
  displayName?: string;
  /** Output only. Immutable. A user-assigned unique identifier of the parent FirebaseProject for the `AndroidApp`. */
  projectId?: string;
  /** Immutable. The canonical package name of the Android app as would appear in the Google Play Developer Console. */
  packageName?: string;
  /** The globally unique, Google-assigned identifier (UID) for the Firebase API key associated with the `AndroidApp`. Be aware that this value is the UID of the API key, _not_ the [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string) of the API key. The `keyString` is the value that can be found in the App's [configuration artifact](../../rest/v1beta1/projects.androidApps/getConfig). If `api_key_id` is not set in requests to [`androidApps.Create`](../../rest/v1beta1/projects.androidApps/create), then Firebase automatically associates an `api_key_id` with the `AndroidApp`. This auto-associated key may be an existing valid key or, if no valid key exists, a new one will be provisioned. In patch requests, `api_key_id` cannot be set to an empty value, and the new UID must have no restrictions or only have restrictions that are valid for the associated `AndroidApp`. We recommend using the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) to manage API keys. */
  apiKeyId?: string;
  /** Output only. The lifecycle state of the App. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** The SHA1 certificate hashes for the AndroidApp. */
  sha1Hashes?: Array<string>;
  /** The SHA256 certificate hashes for the AndroidApp. */
  sha256Hashes?: Array<string>;
  /** Output only. If the App has been removed from the Project, this is the timestamp of when the App is considered expired and will be permanently deleted. After this time, the App cannot be undeleted (that is, restored to the Project). This value is only provided if the App is in the `DELETED` state. */
  expireTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated. */
  etag?: string;
}

export const AndroidApp: Schema.Schema<AndroidApp> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  apiKeyId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  sha1Hashes: Schema.optional(Schema.Array(Schema.String)),
  sha256Hashes: Schema.optional(Schema.Array(Schema.String)),
  expireTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "AndroidApp" }) as any as Schema.Schema<AndroidApp>;

export interface ListAndroidAppsResponse {
  /** List of each `AndroidApp` associated with the specified `FirebaseProject`. */
  apps?: Array<AndroidApp>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent call to `ListAndroidApps` to find the next group of Apps. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListAndroidAppsResponse: Schema.Schema<ListAndroidAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(AndroidApp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAndroidAppsResponse" }) as any as Schema.Schema<ListAndroidAppsResponse>;

export interface RemoveAndroidAppRequest {
  /** If set to true, and the App is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** If set to true, the request is only validated. The App will _not_ be removed. */
  validateOnly?: boolean;
  /** Checksum provided in the AndroidApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Determines whether to _immediately_ delete the AndroidApp. If set to true, the App is immediately deleted from the Project and cannot be undeleted (that is, restored to the Project). If not set, defaults to false, which means the App will be set to expire in 30 days. Within the 30 days, the App may be restored to the Project using UndeleteAndroidApp. */
  immediate?: boolean;
}

export const RemoveAndroidAppRequest: Schema.Schema<RemoveAndroidAppRequest> = Schema.suspend(() => Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean),
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  immediate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoveAndroidAppRequest" }) as any as Schema.Schema<RemoveAndroidAppRequest>;

export interface UndeleteAndroidAppRequest {
  /** If set to true, the request is only validated. The App will _not_ be undeleted. */
  validateOnly?: boolean;
  /** Checksum provided in the AndroidApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const UndeleteAndroidAppRequest: Schema.Schema<UndeleteAndroidAppRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteAndroidAppRequest" }) as any as Schema.Schema<UndeleteAndroidAppRequest>;

export interface AndroidAppConfig {
  /** The filename that the configuration artifact for the `AndroidApp` is typically saved as. For example: `google-services.json` */
  configFilename?: string;
  /** The contents of the JSON configuration file. */
  configFileContents?: string;
}

export const AndroidAppConfig: Schema.Schema<AndroidAppConfig> = Schema.suspend(() => Schema.Struct({
  configFilename: Schema.optional(Schema.String),
  configFileContents: Schema.optional(Schema.String),
})).annotate({ identifier: "AndroidAppConfig" }) as any as Schema.Schema<AndroidAppConfig>;

export interface ShaCertificate {
  /** The resource name of the ShaCertificate for the AndroidApp, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID/sha/SHA_HASH * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)). * SHA_HASH: the certificate hash for the App (see [`shaHash`](../projects.androidApps.sha#ShaCertificate.FIELDS.sha_hash)). */
  name?: string;
  /** The certificate hash for the `AndroidApp`. */
  shaHash?: string;
  /** The type of SHA certificate encoded in the hash. */
  certType?: "SHA_CERTIFICATE_TYPE_UNSPECIFIED" | "SHA_1" | "SHA_256" | (string & {});
}

export const ShaCertificate: Schema.Schema<ShaCertificate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  shaHash: Schema.optional(Schema.String),
  certType: Schema.optional(Schema.String),
})).annotate({ identifier: "ShaCertificate" }) as any as Schema.Schema<ShaCertificate>;

export interface ListShaCertificatesResponse {
  /** The list of each `ShaCertificate` associated with the `AndroidApp`. */
  certificates?: Array<ShaCertificate>;
}

export const ListShaCertificatesResponse: Schema.Schema<ListShaCertificatesResponse> = Schema.suspend(() => Schema.Struct({
  certificates: Schema.optional(Schema.Array(ShaCertificate)),
})).annotate({ identifier: "ListShaCertificatesResponse" }) as any as Schema.Schema<ListShaCertificatesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AddGoogleAnalyticsRequest {
  /** The ID for the existing [Google Analytics account](http://www.google.com/analytics/) that you want to link with the `FirebaseProject`. Specifying this field will provision a new Google Analytics property in your Google Analytics account and associate the new property with the `FirebaseProject`. */
  analyticsAccountId?: string;
  /** The ID for the existing Google Analytics property that you want to associate with the `FirebaseProject`. */
  analyticsPropertyId?: string;
}

export const AddGoogleAnalyticsRequest: Schema.Schema<AddGoogleAnalyticsRequest> = Schema.suspend(() => Schema.Struct({
  analyticsAccountId: Schema.optional(Schema.String),
  analyticsPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "AddGoogleAnalyticsRequest" }) as any as Schema.Schema<AddGoogleAnalyticsRequest>;

export interface AnalyticsProperty {
  /** The globally unique, Google-assigned identifier of the Google Analytics property associated with the specified `FirebaseProject`. If you called [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics) to link the `FirebaseProject` with a Google Analytics account, the value in this `id` field is the same as the ID of the property either specified or provisioned with that call to `AddGoogleAnalytics`. */
  id?: string;
  /** The display name of the Google Analytics property associated with the specified `FirebaseProject`. */
  displayName?: string;
  /** Output only. The ID of the [Google Analytics account](https://www.google.com/analytics/) for the Google Analytics property associated with the specified FirebaseProject. */
  analyticsAccountId?: string;
}

export const AnalyticsProperty: Schema.Schema<AnalyticsProperty> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  analyticsAccountId: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyticsProperty" }) as any as Schema.Schema<AnalyticsProperty>;

export interface StreamMapping {
  /** The resource name of the Firebase App associated with the Google Analytics data stream, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID or projects/PROJECT_IDENTIFIER/iosApps/APP_ID or projects/PROJECT_IDENTIFIER /webApps/APP_ID Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  app?: string;
  /** The unique Google-assigned identifier of the Google Analytics data stream associated with the Firebase App. Learn more about Google Analytics data streams in the [Analytics documentation](https://support.google.com/analytics/answer/9303323). */
  streamId?: string;
  /** Applicable for Firebase Web Apps only. The unique Google-assigned identifier of the Google Analytics web stream associated with the Firebase Web App. Firebase SDKs use this ID to interact with Google Analytics APIs. Learn more about this ID and Google Analytics web streams in the [Analytics documentation](https://support.google.com/analytics/answer/9304153). */
  measurementId?: string;
}

export const StreamMapping: Schema.Schema<StreamMapping> = Schema.suspend(() => Schema.Struct({
  app: Schema.optional(Schema.String),
  streamId: Schema.optional(Schema.String),
  measurementId: Schema.optional(Schema.String),
})).annotate({ identifier: "StreamMapping" }) as any as Schema.Schema<StreamMapping>;

export interface AnalyticsDetails {
  /** The Analytics Property object associated with the specified `FirebaseProject`. This object contains the details of the Google Analytics property associated with the Project. */
  analyticsProperty?: AnalyticsProperty;
  /** - For `AndroidApps` and `IosApps`: a map of `app` to `streamId` for each Firebase App in the specified `FirebaseProject`. Each `app` and `streamId` appears only once. - For `WebApps`: a map of `app` to `streamId` and `measurementId` for each `WebApp` in the specified `FirebaseProject`. Each `app`, `streamId`, and `measurementId` appears only once. */
  streamMappings?: Array<StreamMapping>;
}

export const AnalyticsDetails: Schema.Schema<AnalyticsDetails> = Schema.suspend(() => Schema.Struct({
  analyticsProperty: Schema.optional(AnalyticsProperty),
  streamMappings: Schema.optional(Schema.Array(StreamMapping)),
})).annotate({ identifier: "AnalyticsDetails" }) as any as Schema.Schema<AnalyticsDetails>;

export interface RemoveAnalyticsRequest {
  /** Optional. The ID of the Google Analytics property associated with the specified `FirebaseProject`. - If not set, then the Google Analytics property that is currently associated with the specified `FirebaseProject` is removed. - If set, and the specified `FirebaseProject` is currently associated with a *different* Google Analytics property, then the response is a `412 Precondition Failed` error. */
  analyticsPropertyId?: string;
}

export const RemoveAnalyticsRequest: Schema.Schema<RemoveAnalyticsRequest> = Schema.suspend(() => Schema.Struct({
  analyticsPropertyId: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoveAnalyticsRequest" }) as any as Schema.Schema<RemoveAnalyticsRequest>;

export interface IosApp {
  /** The resource name of the IosApp, in the format: projects/PROJECT_IDENTIFIER /iosApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.iosApps#IosApp.FIELDS.app_id)). */
  name?: string;
  /** Output only. Immutable. The globally unique, Firebase-assigned identifier for the `IosApp`. This identifier should be treated as an opaque token, as the data format is not specified. */
  appId?: string;
  /** The user-assigned display name for the `IosApp`. */
  displayName?: string;
  /** Output only. Immutable. A user-assigned unique identifier of the parent FirebaseProject for the `IosApp`. */
  projectId?: string;
  /** Immutable. The canonical bundle ID of the iOS app as it would appear in the iOS AppStore. */
  bundleId?: string;
  /** The automatically generated Apple ID assigned to the iOS app by Apple in the iOS App Store. */
  appStoreId?: string;
  /** The Apple Developer Team ID associated with the App in the App Store. */
  teamId?: string;
  /** The globally unique, Google-assigned identifier (UID) for the Firebase API key associated with the `IosApp`. Be aware that this value is the UID of the API key, _not_ the [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string) of the API key. The `keyString` is the value that can be found in the App's [configuration artifact](../../rest/v1beta1/projects.iosApps/getConfig). If `api_key_id` is not set in requests to [`iosApps.Create`](../../rest/v1beta1/projects.iosApps/create), then Firebase automatically associates an `api_key_id` with the `IosApp`. This auto-associated key may be an existing valid key or, if no valid key exists, a new one will be provisioned. In patch requests, `api_key_id` cannot be set to an empty value, and the new UID must have no restrictions or only have restrictions that are valid for the associated `IosApp`. We recommend using the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) to manage API keys. */
  apiKeyId?: string;
  /** Output only. The lifecycle state of the App. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Output only. If the App has been removed from the Project, this is the timestamp of when the App is considered expired and will be permanently deleted. After this time, the App cannot be undeleted (that is, restored to the Project). This value is only provided if the App is in the `DELETED` state. */
  expireTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated. */
  etag?: string;
}

export const IosApp: Schema.Schema<IosApp> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  bundleId: Schema.optional(Schema.String),
  appStoreId: Schema.optional(Schema.String),
  teamId: Schema.optional(Schema.String),
  apiKeyId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "IosApp" }) as any as Schema.Schema<IosApp>;

export interface ListIosAppsResponse {
  /** List of each `IosApp` associated with the specified `FirebaseProject`. */
  apps?: Array<IosApp>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent call to `ListIosApps` to find the next group of Apps. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListIosAppsResponse: Schema.Schema<ListIosAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(IosApp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIosAppsResponse" }) as any as Schema.Schema<ListIosAppsResponse>;

export interface RemoveIosAppRequest {
  /** If set to true, and the App is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** If set to true, the request is only validated. The App will _not_ be removed. */
  validateOnly?: boolean;
  /** Checksum provided in the IosApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Determines whether to _immediately_ delete the IosApp. If set to true, the App is immediately deleted from the Project and cannot be undeleted (that is, restored to the Project). If not set, defaults to false, which means the App will be set to expire in 30 days. Within the 30 days, the App may be restored to the Project using UndeleteIosApp */
  immediate?: boolean;
}

export const RemoveIosAppRequest: Schema.Schema<RemoveIosAppRequest> = Schema.suspend(() => Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean),
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  immediate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoveIosAppRequest" }) as any as Schema.Schema<RemoveIosAppRequest>;

export interface UndeleteIosAppRequest {
  /** If set to true, the request is only validated. The App will _not_ be undeleted. */
  validateOnly?: boolean;
  /** Checksum provided in the IosApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const UndeleteIosAppRequest: Schema.Schema<UndeleteIosAppRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteIosAppRequest" }) as any as Schema.Schema<UndeleteIosAppRequest>;

export interface IosAppConfig {
  /** The filename that the configuration artifact for the `IosApp` is typically saved as. For example: `GoogleService-Info.plist` */
  configFilename?: string;
  /** The content of the XML configuration file. */
  configFileContents?: string;
}

export const IosAppConfig: Schema.Schema<IosAppConfig> = Schema.suspend(() => Schema.Struct({
  configFilename: Schema.optional(Schema.String),
  configFileContents: Schema.optional(Schema.String),
})).annotate({ identifier: "IosAppConfig" }) as any as Schema.Schema<IosAppConfig>;

export interface DefaultResources {
  /** Output only. **DEPRECATED.** _Instead, find the name of the default Firebase Hosting site using [ListSites](https://firebase.google.com/docs/reference/hosting/rest/v1beta1/projects.sites/list) within the Firebase Hosting REST API. If the default Hosting site for the Project has not yet been provisioned, the return might not contain a default site._ The name of the default Firebase Hosting site, in the format: PROJECT_ID Though rare, your `projectId` might already be used as the name for an existing Hosting site in another project (learn more about creating non-default, [additional sites](https://firebase.google.com/docs/hosting/multisites)). In these cases, your `projectId` is appended with a hyphen then five alphanumeric characters to create your default Hosting site name. For example, if your `projectId` is `myproject123`, your default Hosting site name might be: `myproject123-a5c16` */
  hostingSite?: string;
  /** Output only. **DEPRECATED.** _Instead, find the name of the default Realtime Database instance using the [list endpoint](https://firebase.google.com/docs/reference/rest/database/database-management/rest/v1beta/projects.locations.instances/list) within the Firebase Realtime Database REST API. If the default Realtime Database instance for a Project has not yet been provisioned, the return might not contain a default instance._ The default Firebase Realtime Database instance name, in the format: PROJECT_ID Though rare, your `projectId` might already be used as the name for an existing Realtime Database instance in another project (learn more about [database sharding](https://firebase.google.com/docs/database/usage/sharding)). In these cases, your `projectId` is appended with a hyphen then five alphanumeric characters to create your default Realtime Database instance name. For example, if your `projectId` is `myproject123`, your default database instance name might be: `myproject123-a5c16` */
  realtimeDatabaseInstance?: string;
  /** Output only. **DEPRECATED.** _Instead, find the name of the default Cloud Storage for Firebase bucket using the [list endpoint](https://firebase.google.com/docs/reference/rest/storage/rest/v1beta/projects.buckets/list) within the Cloud Storage for Firebase REST API. If the default bucket for the Project has not yet been provisioned, the return might not contain a default bucket._ The name of the default Cloud Storage for Firebase bucket, in one of the following formats: * If provisioned _before_ October 30, 2024: PROJECT_ID.firebasestorage.app * If provisioned _on or after_ October 30, 2024: PROJECT_ID.firebasestorage.app */
  storageBucket?: string;
  /** Output only. **DEPRECATED.** _Instead, use product-specific REST APIs to find the location of each resource in a Project. This field may not be populated, especially for newly provisioned projects after October 30, 2024._ The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location), which are resources associated with Google App Engine. The location is one of the available [Google App Engine locations](https://cloud.google.com/about/locations#region). This field is omitted if the location for default Google Cloud resources has not been set. */
  locationId?: string;
}

export const DefaultResources: Schema.Schema<DefaultResources> = Schema.suspend(() => Schema.Struct({
  hostingSite: Schema.optional(Schema.String),
  realtimeDatabaseInstance: Schema.optional(Schema.String),
  storageBucket: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "DefaultResources" }) as any as Schema.Schema<DefaultResources>;

export interface FirebaseProject {
  /** The resource name of the Project, in the format: projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. */
  name?: string;
  /** Output only. Immutable. A user-assigned unique identifier for the Project. This identifier may appear in URLs or names for some Firebase resources associated with the Project, but it should generally be treated as a convenience alias to reference the Project. */
  projectId?: string;
  /** Output only. Immutable. The globally unique, Google-assigned canonical identifier for the Project. Use this identifier when configuring integrations and/or making API calls to Firebase or third-party services. */
  projectNumber?: string;
  /** The user-assigned display name of the Project. */
  displayName?: string;
  /** Output only. **DEPRECATED.** _Auto-provisioning of these resources is changing, so this object no longer reliably provides information about the Project. Instead, retrieve information about each resource directly from its resource-specific API._ The default Firebase resources associated with the Project. */
  resources?: DefaultResources;
  /** Output only. The lifecycle state of the Project. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** A set of user-defined annotations for the FirebaseProject. Learn more about annotations in Google's [AIP-128 standard](https://google.aip.dev/128#annotations). These annotations are intended solely for developers and client-side tools. Firebase services will not mutate this annotations set. */
  annotations?: Record<string, string>;
  /** This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated. */
  etag?: string;
}

export const FirebaseProject: Schema.Schema<FirebaseProject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  projectNumber: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  resources: Schema.optional(DefaultResources),
  state: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "FirebaseProject" }) as any as Schema.Schema<FirebaseProject>;

export interface ListFirebaseProjectsResponse {
  /** One page of the list of Projects that are accessible to the caller. */
  results?: Array<FirebaseProject>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent calls to `ListFirebaseProjects` to find the next group of Projects. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListFirebaseProjectsResponse: Schema.Schema<ListFirebaseProjectsResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(FirebaseProject)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFirebaseProjectsResponse" }) as any as Schema.Schema<ListFirebaseProjectsResponse>;

export interface AddFirebaseRequest {
  /** **DEPRECATED.** _Instead, use product-specific REST APIs to work with the location of each resource in a Project. This field may be ignored, especially for newly provisioned projects after October 30, 2024._ The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location), which are resources associated with Google App Engine. The location must be one of the available [Google App Engine locations](https://cloud.google.com/about/locations#region). */
  locationId?: string;
}

export const AddFirebaseRequest: Schema.Schema<AddFirebaseRequest> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "AddFirebaseRequest" }) as any as Schema.Schema<AddFirebaseRequest>;

export interface ProjectInfo {
  /** The resource name of the Google Cloud `Project` to which Firebase resources can be added, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  project?: string;
  /** The user-assigned display name of the Google Cloud `Project`, for example: `My App`. */
  displayName?: string;
  /** **DEPRECATED** _Instead, use product-specific REST APIs to work with the location of each resource in a Project. This field may not be populated, especially for newly provisioned projects after October 30, 2024._ The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location). The location is one of the available [Google App Engine locations](https://cloud.google.com/about/locations#region). Not all Projects will have this field populated. If it is not populated, it means that the Project does not yet have a location for default Google Cloud resources. */
  locationId?: string;
}

export const ProjectInfo: Schema.Schema<ProjectInfo> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectInfo" }) as any as Schema.Schema<ProjectInfo>;

export interface ListAvailableProjectsResponse {
  /** The list of Google Cloud `Projects` which can have Firebase resources added to them. */
  projectInfo?: Array<ProjectInfo>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent calls to `ListAvailableProjects` to find the next group of Projects. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListAvailableProjectsResponse: Schema.Schema<ListAvailableProjectsResponse> = Schema.suspend(() => Schema.Struct({
  projectInfo: Schema.optional(Schema.Array(ProjectInfo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAvailableProjectsResponse" }) as any as Schema.Schema<ListAvailableProjectsResponse>;

export interface Location {
  /** The ID of the Project's location for default Google Cloud resources. It will be one of the available [Google App Engine locations](https://cloud.google.com/about/locations#region). */
  locationId?: string;
  /** Indicates whether the location for default Google Cloud resources is a [regional or multi-regional location](https://firebase.google.com/docs/projects/locations#types) for data replication. */
  type?: "LOCATION_TYPE_UNSPECIFIED" | "REGIONAL" | "MULTI_REGIONAL" | (string & {});
  /** Products and services that are available in the location for default Google Cloud resources. */
  features?: Array<"LOCATION_FEATURE_UNSPECIFIED" | "FIRESTORE" | "DEFAULT_STORAGE" | "FUNCTIONS" | (string & {})>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  features: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListAvailableLocationsResponse {
  /** One page of results from a call to `ListAvailableLocations`. */
  locations?: Array<Location>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results and all available locations have been listed. This token can be used in a subsequent call to `ListAvailableLocations` to find more locations. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListAvailableLocationsResponse: Schema.Schema<ListAvailableLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAvailableLocationsResponse" }) as any as Schema.Schema<ListAvailableLocationsResponse>;

export interface FinalizeDefaultLocationRequest {
  /** **DEPRECATED** The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location), which are resources associated with Google App Engine. The location must be one of the available [Google App Engine locations](https://cloud.google.com/about/locations#region). */
  locationId?: string;
}

export const FinalizeDefaultLocationRequest: Schema.Schema<FinalizeDefaultLocationRequest> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "FinalizeDefaultLocationRequest" }) as any as Schema.Schema<FinalizeDefaultLocationRequest>;

export interface AdminSdkConfig {
  /** Immutable. A user-assigned unique identifier for the `FirebaseProject`. This identifier may appear in URLs or names for some Firebase resources associated with the Project, but it should generally be treated as a convenience alias to reference the Project. */
  projectId?: string;
  /** **DEPRECATED.** _Instead, find the URL of the default Realtime Database instance using the [list endpoint](https://firebase.google.com/docs/reference/rest/database/database-management/rest/v1beta/projects.locations.instances/list) within the Firebase Realtime Database REST API. If the default instance for the Project has not yet been provisioned, the return might not contain a default instance. Note that the config that's generated for the Firebase console or the Firebase CLI uses the Realtime Database endpoint to populate this value for that config._ The URL of the default Firebase Realtime Database instance. */
  databaseURL?: string;
  /** **DEPRECATED.** _Instead, find the name of the default Cloud Storage for Firebase bucket using the [list endpoint](https://firebase.google.com/docs/reference/rest/storage/rest/v1beta/projects.buckets/list) within the Cloud Storage for Firebase REST API. If the default bucket for the Project has not yet been provisioned, the return might not contain a default bucket. Note that the config that's generated for the Firebase console or the Firebase CLI uses the Cloud Storage for Firebase endpoint to populate this value for that config._ The name of the default Cloud Storage for Firebase bucket. */
  storageBucket?: string;
  /** **DEPRECATED.** _Instead, use product-specific REST APIs to find the location of each resource in a Project. This field may not be populated, especially for newly provisioned projects after October 30, 2024._ The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location), which are resources associated with Google App Engine. The location is one of the available [App Engine locations](https://cloud.google.com/about/locations#region). This field is omitted if the location for default Google Cloud resources has not been set. */
  locationId?: string;
}

export const AdminSdkConfig: Schema.Schema<AdminSdkConfig> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  databaseURL: Schema.optional(Schema.String),
  storageBucket: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "AdminSdkConfig" }) as any as Schema.Schema<AdminSdkConfig>;

export interface FirebaseAppInfo {
  /** The resource name of the Firebase App, in the format: projects/PROJECT_ID /iosApps/APP_ID or projects/PROJECT_ID/androidApps/APP_ID or projects/ PROJECT_ID/webApps/APP_ID */
  name?: string;
  /** The user-assigned display name of the Firebase App. */
  displayName?: string;
  /** The platform of the Firebase App. */
  platform?: "PLATFORM_UNSPECIFIED" | "IOS" | "ANDROID" | "WEB" | (string & {});
  /** Output only. Immutable. The globally unique, Firebase-assigned identifier for the `WebApp`. This identifier should be treated as an opaque token, as the data format is not specified. */
  appId?: string;
  /** Output only. Immutable. The platform-specific identifier of the App. *Note:* For most use cases, use `appId`, which is the canonical, globally unique identifier for referencing an App. This string is derived from a native identifier for each platform: `packageName` for an `AndroidApp`, `bundleId` for an `IosApp`, and `webId` for a `WebApp`. Its contents should be treated as opaque, as the native identifier format may change as platforms evolve. This string is only unique within a `FirebaseProject` and its associated Apps. */
  namespace?: string;
  /** The globally unique, Google-assigned identifier (UID) for the Firebase API key associated with the App. Be aware that this value is the UID of the API key, _not_ the [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string) of the API key. The `keyString` is the value that can be found in the App's configuration artifact ([`AndroidApp`](../../rest/v1beta1/projects.androidApps/getConfig) | [`IosApp`](../../rest/v1beta1/projects.iosApps/getConfig) | [`WebApp`](../../rest/v1beta1/projects.webApps/getConfig)). If `api_key_id` is not set in requests to create the App ([`AndroidApp`](../../rest/v1beta1/projects.androidApps/create) | [`IosApp`](../../rest/v1beta1/projects.iosApps/create) | [`WebApp`](../../rest/v1beta1/projects.webApps/create)), then Firebase automatically associates an `api_key_id` with the App. This auto-associated key may be an existing valid key or, if no valid key exists, a new one will be provisioned. */
  apiKeyId?: string;
  /** Output only. The lifecycle state of the App. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Output only. If the App has been removed from the Project, this is the timestamp of when the App is considered expired and will be permanently deleted. After this time, the App cannot be undeleted (that is, restored to the Project). This value is only provided if the App is in the `DELETED` state. */
  expireTime?: string;
}

export const FirebaseAppInfo: Schema.Schema<FirebaseAppInfo> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  apiKeyId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "FirebaseAppInfo" }) as any as Schema.Schema<FirebaseAppInfo>;

export interface SearchFirebaseAppsResponse {
  /** One page of results from a call to `SearchFirebaseApps`. */
  apps?: Array<FirebaseAppInfo>;
  /** If the result list is too large to fit in a single response, then a token is returned. This token can be used in a subsequent calls to `SearchFirebaseApps` to find the next group of Apps. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const SearchFirebaseAppsResponse: Schema.Schema<SearchFirebaseAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(FirebaseAppInfo)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchFirebaseAppsResponse" }) as any as Schema.Schema<SearchFirebaseAppsResponse>;

export interface WebApp {
  /** The resource name of the WebApp, in the format: projects/PROJECT_IDENTIFIER /webApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.webApps#WebApp.FIELDS.app_id)). */
  name?: string;
  /** Output only. Immutable. The globally unique, Firebase-assigned identifier for the `WebApp`. This identifier should be treated as an opaque token, as the data format is not specified. */
  appId?: string;
  /** The user-assigned display name for the `WebApp`. */
  displayName?: string;
  /** Output only. Immutable. A user-assigned unique identifier of the parent FirebaseProject for the `WebApp`. */
  projectId?: string;
  /** The URLs where the `WebApp` is hosted. */
  appUrls?: Array<string>;
  /** Output only. Immutable. A unique, Firebase-assigned identifier for the `WebApp`. This identifier is only used to populate the `namespace` value for the `WebApp`. For most use cases, use `appId` to identify or reference the App. The `webId` value is only unique within a `FirebaseProject` and its associated Apps. */
  webId?: string;
  /** The globally unique, Google-assigned identifier (UID) for the Firebase API key associated with the `WebApp`. Be aware that this value is the UID of the API key, _not_ the [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string) of the API key. The `keyString` is the value that can be found in the App's [configuration artifact](../../rest/v1beta1/projects.webApps/getConfig). If `api_key_id` is not set in requests to [`webApps.Create`](../../rest/v1beta1/projects.webApps/create), then Firebase automatically associates an `api_key_id` with the `WebApp`. This auto-associated key may be an existing valid key or, if no valid key exists, a new one will be provisioned. In patch requests, `api_key_id` cannot be set to an empty value, and the new UID must have no restrictions or only have restrictions that are valid for the associated `WebApp`. We recommend using the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) to manage API keys. */
  apiKeyId?: string;
  /** Output only. The lifecycle state of the App. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Output only. If the App has been removed from the Project, this is the timestamp of when the App is considered expired and will be permanently deleted. After this time, the App cannot be undeleted (that is, restored to the Project). This value is only provided if the App is in the `DELETED` state. */
  expireTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated. */
  etag?: string;
}

export const WebApp: Schema.Schema<WebApp> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  appUrls: Schema.optional(Schema.Array(Schema.String)),
  webId: Schema.optional(Schema.String),
  apiKeyId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "WebApp" }) as any as Schema.Schema<WebApp>;

export interface ListWebAppsResponse {
  /** List of each `WebApp` associated with the specified `FirebaseProject`. */
  apps?: Array<WebApp>;
  /** If the result list is too large to fit in a single response, then a token is returned. If the string is empty, then this response is the last page of results. This token can be used in a subsequent call to `ListWebApps` to find the next group of Apps. Page tokens are short-lived and should not be persisted. */
  nextPageToken?: string;
}

export const ListWebAppsResponse: Schema.Schema<ListWebAppsResponse> = Schema.suspend(() => Schema.Struct({
  apps: Schema.optional(Schema.Array(WebApp)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListWebAppsResponse" }) as any as Schema.Schema<ListWebAppsResponse>;

export interface RemoveWebAppRequest {
  /** If set to true, and the App is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
  /** If set to true, the request is only validated. The App will _not_ be removed. */
  validateOnly?: boolean;
  /** Checksum provided in the WebApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Determines whether to _immediately_ delete the WebApp. If set to true, the App is immediately deleted from the Project and cannot be undeleted (that is, restored to the Project). If not set, defaults to false, which means the App will be set to expire in 30 days. Within the 30 days, the App may be restored to the Project using UndeleteWebApp */
  immediate?: boolean;
}

export const RemoveWebAppRequest: Schema.Schema<RemoveWebAppRequest> = Schema.suspend(() => Schema.Struct({
  allowMissing: Schema.optional(Schema.Boolean),
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  immediate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RemoveWebAppRequest" }) as any as Schema.Schema<RemoveWebAppRequest>;

export interface UndeleteWebAppRequest {
  /** If set to true, the request is only validated. The App will _not_ be undeleted. */
  validateOnly?: boolean;
  /** Checksum provided in the WebApp resource. If provided, this checksum ensures that the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const UndeleteWebAppRequest: Schema.Schema<UndeleteWebAppRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteWebAppRequest" }) as any as Schema.Schema<UndeleteWebAppRequest>;

export interface WebAppConfig {
  /** Immutable. A user-assigned unique identifier for the `FirebaseProject`. */
  projectId?: string;
  /** Immutable. The globally unique, Firebase-assigned identifier for the `WebApp`. */
  appId?: string;
  /** **DEPRECATED.** _Instead, find the URL of the default Realtime Database instance using the [list endpoint](https://firebase.google.com/docs/reference/rest/database/database-management/rest/v1beta/projects.locations.instances/list) within the Firebase Realtime Database REST API. If the default instance for the Project has not yet been provisioned, the return might not contain a default instance. Note that the config that's generated for the Firebase console or the Firebase CLI uses the Realtime Database endpoint to populate this value for that config._ The URL of the default Firebase Realtime Database instance. */
  databaseURL?: string;
  /** **DEPRECATED.** _Instead, find the name of the default Cloud Storage for Firebase bucket using the [list endpoint](https://firebase.google.com/docs/reference/rest/storage/rest/v1beta/projects.buckets/list) within the Cloud Storage for Firebase REST API. If the default bucket for the Project has not yet been provisioned, the return might not contain a default bucket. Note that the config that's generated for the Firebase console or the Firebase CLI uses the Cloud Storage for Firebase endpoint to populate this value for that config._ The name of the default Cloud Storage for Firebase bucket. */
  storageBucket?: string;
  /** **DEPRECATED.** _Instead, use product-specific REST APIs to find the location of each resource in a Project. This field may not be populated, especially for newly provisioned projects after October 30, 2024._ The ID of the Project's ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location), which are resources associated with Google App Engine. The location is one of the available [App Engine locations](https://cloud.google.com/about/locations#region). This field is omitted if the location for default Google Cloud resources has not been set. */
  locationId?: string;
  /** The [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string) of the API key associated with the `WebApp`. Note that this value is _not_ the [`apiKeyId`](../projects.webApps#WebApp.FIELDS.api_key_id) (the UID) of the API key associated with the `WebApp`. */
  apiKey?: string;
  /** The domain Firebase Auth configures for OAuth redirects, in the format: PROJECT_ID.firebaseapp.com */
  authDomain?: string;
  /** The sender ID for use with Firebase Cloud Messaging. */
  messagingSenderId?: string;
  /** The unique Google-assigned identifier of the Google Analytics web stream associated with the `WebApp`. Firebase SDKs use this ID to interact with Google Analytics APIs. This field is only present if the `WebApp` is linked to a web stream in a Google Analytics App + Web property. Learn more about this ID and Google Analytics web streams in the [Analytics documentation](https://support.google.com/analytics/answer/9304153). To generate a `measurementId` and link the `WebApp` with a Google Analytics web stream, call [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics). For apps using the Firebase JavaScript SDK v7.20.0 and later, Firebase dynamically fetches the `measurementId` when your app initializes Analytics. Having this ID in your config object is optional, but it does serve as a fallback in the rare case that the dynamic fetch fails. */
  measurementId?: string;
  /** Output only. Immutable. The globally unique, Google-assigned canonical identifier for the Project. Use this identifier when configuring integrations and/or making API calls to Google Cloud or third-party services. */
  projectNumber?: string;
  /** Optional. Duplicate field for the URL of the default Realtime Database instances (if the default instance has been provisioned). If the request asks for the V2 config format, this field will be populated instead of `realtime_database_instance_uri`. */
  realtimeDatabaseUrl?: string;
  /** Version of the config specification. */
  version?: string;
}

export const WebAppConfig: Schema.Schema<WebAppConfig> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  appId: Schema.optional(Schema.String),
  databaseURL: Schema.optional(Schema.String),
  storageBucket: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  authDomain: Schema.optional(Schema.String),
  messagingSenderId: Schema.optional(Schema.String),
  measurementId: Schema.optional(Schema.String),
  projectNumber: Schema.optional(Schema.String),
  realtimeDatabaseUrl: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "WebAppConfig" }) as any as Schema.Schema<WebAppConfig>;

export interface MessageSet {
}

export const MessageSet: Schema.Schema<MessageSet> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MessageSet" }) as any as Schema.Schema<MessageSet>;

export interface StatusProto {
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: MessageSet;
}

export const StatusProto: Schema.Schema<StatusProto> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  space: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  canonicalCode: Schema.optional(Schema.Number),
  messageSet: Schema.optional(MessageSet),
})).annotate({ identifier: "StatusProto" }) as any as Schema.Schema<StatusProto>;

export interface ProductMetadata {
  /** List of warnings related to the associated operation. */
  warningMessages?: Array<string>;
}

export const ProductMetadata: Schema.Schema<ProductMetadata> = Schema.suspend(() => Schema.Struct({
  warningMessages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ProductMetadata" }) as any as Schema.Schema<ProductMetadata>;

export interface OperationMetadata {
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Links the specified FirebaseProject with an existing [Google Analytics account](http://www.google.com/analytics/). Using this call, you can either: - Specify an `analyticsAccountId` to provision a new Google Analytics property within the specified account and associate the new property with the `FirebaseProject`. - Specify an existing `analyticsPropertyId` to associate the property with the `FirebaseProject`. Note that when you call `AddGoogleAnalytics`: 1. The first check determines if any existing data streams in the Google Analytics property correspond to any existing Firebase Apps in the `FirebaseProject` (based on the `packageName` or `bundleId` associated with the data stream). Then, as applicable, the data streams and apps are linked. Note that this auto-linking only applies to `AndroidApps` and `IosApps`. 2. If no corresponding data streams are found for the Firebase Apps, new data streams are provisioned in the Google Analytics property for each of the Firebase Apps. Note that a new data stream is always provisioned for a Web App even if it was previously associated with a data stream in the Analytics property. Learn more about the hierarchy and structure of Google Analytics accounts in the [Analytics documentation](https://support.google.com/analytics/answer/9303323). The result of this call is an [`Operation`](../../v1beta1/operations). Poll the `Operation` to track the provisioning process by calling GetOperation until [`done`](../../v1beta1/operations#Operation.FIELDS.done) is `true`. When `done` is `true`, the `Operation` has either succeeded or failed. If the `Operation` succeeded, its [`response`](../../v1beta1/operations#Operation.FIELDS.response) is set to an AnalyticsDetails; if the `Operation` failed, its [`error`](../../v1beta1/operations#Operation.FIELDS.error) is set to a google.rpc.Status. To call `AddGoogleAnalytics`, a project member must be an Owner for the existing `FirebaseProject` and have the [`Edit` permission](https://support.google.com/analytics/answer/2884495) for the Google Analytics account. If the `FirebaseProject` already has Google Analytics enabled, and you call `AddGoogleAnalytics` using an `analyticsPropertyId` that's different from the currently associated property, then the call will fail. Analytics may have already been enabled in the Firebase console or by specifying `timeZone` and `regionCode` in the call to [`AddFirebase`](../../v1beta1/projects/addFirebase). */
export interface AddGoogleAnalyticsProjectsRequest {
  /** The resource name of the FirebaseProject to link to an existing Google Analytics account, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: AddGoogleAnalyticsRequest;
}

export const AddGoogleAnalyticsProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AddGoogleAnalyticsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}:addGoogleAnalytics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddGoogleAnalyticsProjectsRequest>;

export type AddGoogleAnalyticsProjectsResponse = Operation;
export const AddGoogleAnalyticsProjectsResponse = Operation;

export type AddGoogleAnalyticsProjectsError = CommonErrors;

export const addGoogleAnalyticsProjects: API.OperationMethod<AddGoogleAnalyticsProjectsRequest, AddGoogleAnalyticsProjectsResponse, AddGoogleAnalyticsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddGoogleAnalyticsProjectsRequest,
  output: AddGoogleAnalyticsProjectsResponse,
  errors: [],
}));

/** Gets the Google Analytics details currently associated with the specified FirebaseProject. If the `FirebaseProject` is not yet linked to Google Analytics, then the response to `GetAnalyticsDetails` is `NOT_FOUND`. */
export interface GetAnalyticsDetailsProjectsRequest {
  /** The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER/analyticsDetails Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  name: string;
}

export const GetAnalyticsDetailsProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/analyticsDetails" }),
  svc,
) as unknown as Schema.Schema<GetAnalyticsDetailsProjectsRequest>;

export type GetAnalyticsDetailsProjectsResponse = AnalyticsDetails;
export const GetAnalyticsDetailsProjectsResponse = AnalyticsDetails;

export type GetAnalyticsDetailsProjectsError = CommonErrors;

export const getAnalyticsDetailsProjects: API.OperationMethod<GetAnalyticsDetailsProjectsRequest, GetAnalyticsDetailsProjectsResponse, GetAnalyticsDetailsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAnalyticsDetailsProjectsRequest,
  output: GetAnalyticsDetailsProjectsResponse,
  errors: [],
}));

/** Unlinks the specified FirebaseProject from its Google Analytics account. This call removes the association of the specified `FirebaseProject` with its current Google Analytics property. However, this call does not delete the Google Analytics resources, such as the Google Analytics property or any data streams. These resources may be re-associated later to the `FirebaseProject` by calling [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics) and specifying the same `analyticsPropertyId`. For Android Apps and iOS Apps, this call re-links data streams with their corresponding apps. However, for Web Apps, this call provisions a *new* data stream for each Web App. To call `RemoveAnalytics`, a project member must be an Owner for the `FirebaseProject`. */
export interface RemoveAnalyticsProjectsRequest {
  /** The resource name of the FirebaseProject to unlink from its Google Analytics account, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: RemoveAnalyticsRequest;
}

export const RemoveAnalyticsProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RemoveAnalyticsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}:removeAnalytics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveAnalyticsProjectsRequest>;

export type RemoveAnalyticsProjectsResponse = Empty;
export const RemoveAnalyticsProjectsResponse = Empty;

export type RemoveAnalyticsProjectsError = CommonErrors;

export const removeAnalyticsProjects: API.OperationMethod<RemoveAnalyticsProjectsRequest, RemoveAnalyticsProjectsResponse, RemoveAnalyticsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveAnalyticsProjectsRequest,
  output: RemoveAnalyticsProjectsResponse,
  errors: [],
}));

/** Gets the specified FirebaseProject. */
export interface GetProjectsRequest {
  /** The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  name: string;
}

export const GetProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsRequest>;

export type GetProjectsResponse = FirebaseProject;
export const GetProjectsResponse = FirebaseProject;

export type GetProjectsError = CommonErrors;

export const getProjects: API.OperationMethod<GetProjectsRequest, GetProjectsResponse, GetProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsRequest,
  output: GetProjectsResponse,
  errors: [],
}));

/** Lists each FirebaseProject accessible to the caller. The elements are returned in no particular order, but they will be a consistent view of the Projects when additional requests are made with a `pageToken`. This method is eventually consistent with Project mutations, which means newly provisioned Projects and recent modifications to existing Projects might not be reflected in the set of Projects. The list will include only ACTIVE Projects. Use GetFirebaseProject for consistent reads as well as for additional Project details. */
export interface ListProjectsRequest {
  /** Token returned from a previous call to `ListFirebaseProjects` indicating where in the set of Projects to resume listing. */
  pageToken?: string;
  /** The maximum number of Projects to return in the response. The server may return fewer than this at its discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. This value cannot be negative. */
  pageSize?: number;
  /** Optional. Controls whether Projects in the DELETED state should be returned in the response. If not specified, only `ACTIVE` Projects will be returned. */
  showDeleted?: boolean;
}

export const ListProjectsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRequest>;

export type ListProjectsResponse = ListFirebaseProjectsResponse;
export const ListProjectsResponse = ListFirebaseProjectsResponse;

export type ListProjectsError = CommonErrors;

export const listProjects = API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Adds Firebase resources and enables Firebase services in the specified existing [Google Cloud `Project`](https://cloud.google.com/resource-manager/reference/rest/v1/projects). Since a FirebaseProject is actually also a Google Cloud `Project`, a `FirebaseProject` has the same underlying Google Cloud identifiers (`projectNumber` and `projectId`). This allows for easy interop with Google APIs. The result of this call is an [`Operation`](../../v1beta1/operations). Poll the `Operation` to track the provisioning process by calling GetOperation until [`done`](../../v1beta1/operations#Operation.FIELDS.done) is `true`. When `done` is `true`, the `Operation` has either succeeded or failed. If the `Operation` succeeded, its [`response`](../../v1beta1/operations#Operation.FIELDS.response) is set to a FirebaseProject; if the `Operation` failed, its [`error`](../../v1beta1/operations#Operation.FIELDS.error) is set to a google.rpc.Status. The `Operation` is automatically deleted after completion, so there is no need to call DeleteOperation. This method does not modify any billing account information on the underlying Google Cloud `Project`. To call `AddFirebase`, a project member or service account must have the following permissions (the IAM roles of Editor and Owner contain these permissions): `firebase.projects.update`, `resourcemanager.projects.get`, `serviceusage.services.enable`, and `serviceusage.services.get`. */
export interface AddFirebaseProjectsRequest {
  /** The resource name of the Google Cloud `Project` in which Firebase resources will be added and Firebase services enabled, in the format: projects/ PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. After calling `AddFirebase`, the unique Project identifiers ( [`projectNumber`](https://cloud.google.com/resource-manager/reference/rest/v1/projects#Project.FIELDS.project_number) and [`projectId`](https://cloud.google.com/resource-manager/reference/rest/v1/projects#Project.FIELDS.project_id)) of the underlying Google Cloud `Project` are also the identifiers of the FirebaseProject. */
  project: string;
  /** Request body */
  body?: AddFirebaseRequest;
}

export const AddFirebaseProjectsRequest = Schema.Struct({
  project: Schema.String.pipe(T.HttpPath("project")),
  body: Schema.optional(AddFirebaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}:addFirebase", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddFirebaseProjectsRequest>;

export type AddFirebaseProjectsResponse = Operation;
export const AddFirebaseProjectsResponse = Operation;

export type AddFirebaseProjectsError = CommonErrors;

export const addFirebaseProjects: API.OperationMethod<AddFirebaseProjectsRequest, AddFirebaseProjectsResponse, AddFirebaseProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddFirebaseProjectsRequest,
  output: AddFirebaseProjectsResponse,
  errors: [],
}));

/** Updates the attributes of the specified FirebaseProject. All [query parameters](#query-parameters) are required. */
export interface PatchProjectsRequest {
  /** The resource name of the Project, in the format: projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. */
  name: string;
  /** Specifies which fields of the FirebaseProject to update. Note that the following fields are immutable: `name`, `project_id`, and `project_number`. To update `state`, use any of the following Google Cloud endpoints: [`projects.delete`](https://cloud.google.com/resource-manager/reference/rest/v1/projects/delete) or [`projects.undelete`](https://cloud.google.com/resource-manager/reference/rest/v1/projects/undelete) */
  updateMask?: string;
  /** Request body */
  body?: FirebaseProject;
}

export const PatchProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(FirebaseProject).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsRequest>;

export type PatchProjectsResponse = FirebaseProject;
export const PatchProjectsResponse = FirebaseProject;

export type PatchProjectsError = CommonErrors;

export const patchProjects: API.OperationMethod<PatchProjectsRequest, PatchProjectsResponse, PatchProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsRequest,
  output: PatchProjectsResponse,
  errors: [],
}));

/** Gets the configuration artifact associated with the specified FirebaseProject, which can be used by servers to simplify initialization. Typically, this configuration is used with the Firebase Admin SDK [initializeApp](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) command. */
export interface GetAdminSdkConfigProjectsRequest {
  /** The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER/adminSdkConfig Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  name: string;
}

export const GetAdminSdkConfigProjectsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/adminSdkConfig" }),
  svc,
) as unknown as Schema.Schema<GetAdminSdkConfigProjectsRequest>;

export type GetAdminSdkConfigProjectsResponse = AdminSdkConfig;
export const GetAdminSdkConfigProjectsResponse = AdminSdkConfig;

export type GetAdminSdkConfigProjectsError = CommonErrors;

export const getAdminSdkConfigProjects: API.OperationMethod<GetAdminSdkConfigProjectsRequest, GetAdminSdkConfigProjectsResponse, GetAdminSdkConfigProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdminSdkConfigProjectsRequest,
  output: GetAdminSdkConfigProjectsResponse,
  errors: [],
}));

/** Lists all available Apps for the specified FirebaseProject. This is a convenience method. Typically, interaction with an App should be done using the platform-specific service, but some tool use-cases require a summary of all known Apps (such as for App selector interfaces). */
export interface SearchAppsProjectsRequest {
  /** The parent FirebaseProject for which to list Apps, in the format: projects/ PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Token returned from a previous call to `SearchFirebaseApps` indicating where in the set of Apps to resume listing. */
  pageToken?: string;
  /** The maximum number of Apps to return in the response. The server may return fewer than this value at its discretion. If no value is specified (or too large a value is specified), then the server will impose its own limit. This value cannot be negative. */
  pageSize?: number;
  /** A query string compatible with Google's [AIP-160 standard](https://google.aip.dev/160). Use any of the following fields in a query: * [`app_id`](../projects/searchApps#FirebaseAppInfo.FIELDS.app_id) * [`namespace`](../projects/searchApps#FirebaseAppInfo.FIELDS.namespace) * [`platform`](../projects/searchApps#FirebaseAppInfo.FIELDS.platform) This query also supports the following "virtual" fields. These are fields which are not actually part of the returned resource object, but they can be queried as if they are pre-populated with specific values. * `sha1_hash` or `sha1_hashes`: This field is considered to be a _repeated_ `string` field, populated with the list of all SHA-1 certificate fingerprints registered with the AndroidApp. This list is empty if the App is not an `AndroidApp`. * `sha256_hash` or `sha256_hashes`: This field is considered to be a _repeated_ `string` field, populated with the list of all SHA-256 certificate fingerprints registered with the AndroidApp. This list is empty if the App is not an `AndroidApp`. * `app_store_id`: This field is considered to be a _singular_ `string` field, populated with the Apple App Store ID registered with the IosApp. This field is empty if the App is not an `IosApp`. * `team_id`: This field is considered to be a _singular_ `string` field, populated with the Apple team ID registered with the IosApp. This field is empty if the App is not an `IosApp`. */
  filter?: string;
  /** Controls whether Apps in the DELETED state should be returned. If not specified, only `ACTIVE` Apps will be returned. */
  showDeleted?: boolean;
}

export const SearchAppsProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}:searchApps" }),
  svc,
) as unknown as Schema.Schema<SearchAppsProjectsRequest>;

export type SearchAppsProjectsResponse = SearchFirebaseAppsResponse;
export const SearchAppsProjectsResponse = SearchFirebaseAppsResponse;

export type SearchAppsProjectsError = CommonErrors;

export const searchAppsProjects = API.makePaginated(() => ({
  input: SearchAppsProjectsRequest,
  output: SearchAppsProjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified AndroidApp. */
export interface GetProjectsAndroidAppsRequest {
  /** The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetProjectsAndroidAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAndroidAppsRequest>;

export type GetProjectsAndroidAppsResponse = AndroidApp;
export const GetProjectsAndroidAppsResponse = AndroidApp;

export type GetProjectsAndroidAppsError = CommonErrors;

export const getProjectsAndroidApps: API.OperationMethod<GetProjectsAndroidAppsRequest, GetProjectsAndroidAppsResponse, GetProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAndroidAppsRequest,
  output: GetProjectsAndroidAppsResponse,
  errors: [],
}));

/** Lists each AndroidApp associated with the specified FirebaseProject. The elements are returned in no particular order, but will be a consistent view of the Apps when additional requests are made with a `pageToken`. */
export interface ListProjectsAndroidAppsRequest {
  /** The resource name of the parent FirebaseProject for which to list each associated AndroidApp, in the format: projects/PROJECT_IDENTIFIER /androidApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Token returned from a previous call to `ListAndroidApps` indicating where in the set of Apps to resume listing. */
  pageToken?: string;
  /** The maximum number of Apps to return in the response. The server may return fewer than this at its discretion. If no value is specified (or too large a value is specified), then the server will impose its own limit. */
  pageSize?: number;
  /** Controls whether Apps in the DELETED state should be returned in the response. If not specified, only `ACTIVE` Apps will be returned. */
  showDeleted?: boolean;
}

export const ListProjectsAndroidAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/androidApps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAndroidAppsRequest>;

export type ListProjectsAndroidAppsResponse = ListAndroidAppsResponse;
export const ListProjectsAndroidAppsResponse = ListAndroidAppsResponse;

export type ListProjectsAndroidAppsError = CommonErrors;

export const listProjectsAndroidApps = API.makePaginated(() => ({
  input: ListProjectsAndroidAppsRequest,
  output: ListProjectsAndroidAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Requests the creation of a new AndroidApp in the specified FirebaseProject. The result of this call is an `Operation` which can be used to track the provisioning process. The `Operation` is automatically deleted after completion, so there is no need to call `DeleteOperation`. */
export interface CreateProjectsAndroidAppsRequest {
  /** The resource name of the parent FirebaseProject in which to create an AndroidApp, in the format: projects/PROJECT_IDENTIFIER/androidApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: AndroidApp;
}

export const CreateProjectsAndroidAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AndroidApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/androidApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAndroidAppsRequest>;

export type CreateProjectsAndroidAppsResponse = Operation;
export const CreateProjectsAndroidAppsResponse = Operation;

export type CreateProjectsAndroidAppsError = CommonErrors;

export const createProjectsAndroidApps: API.OperationMethod<CreateProjectsAndroidAppsRequest, CreateProjectsAndroidAppsResponse, CreateProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAndroidAppsRequest,
  output: CreateProjectsAndroidAppsResponse,
  errors: [],
}));

/** Updates the attributes of the specified AndroidApp. */
export interface PatchProjectsAndroidAppsRequest {
  /** The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)). */
  name: string;
  /** Specifies which fields of the AndroidApp to update. Note that the following fields are immutable: `name`, `app_id`, `project_id`, and `package_name`. To update `state`, use any of the following endpoints: RemoveAndroidApp or UndeleteAndroidApp. */
  updateMask?: string;
  /** Request body */
  body?: AndroidApp;
}

export const PatchProjectsAndroidAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AndroidApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAndroidAppsRequest>;

export type PatchProjectsAndroidAppsResponse = AndroidApp;
export const PatchProjectsAndroidAppsResponse = AndroidApp;

export type PatchProjectsAndroidAppsError = CommonErrors;

export const patchProjectsAndroidApps: API.OperationMethod<PatchProjectsAndroidAppsRequest, PatchProjectsAndroidAppsResponse, PatchProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAndroidAppsRequest,
  output: PatchProjectsAndroidAppsResponse,
  errors: [],
}));

/** Removes the specified AndroidApp from the FirebaseProject. */
export interface RemoveProjectsAndroidAppsRequest {
  /** Required. The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the AndroidApp [name](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: RemoveAndroidAppRequest;
}

export const RemoveProjectsAndroidAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveAndroidAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProjectsAndroidAppsRequest>;

export type RemoveProjectsAndroidAppsResponse = Operation;
export const RemoveProjectsAndroidAppsResponse = Operation;

export type RemoveProjectsAndroidAppsError = CommonErrors;

export const removeProjectsAndroidApps: API.OperationMethod<RemoveProjectsAndroidAppsRequest, RemoveProjectsAndroidAppsResponse, RemoveProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProjectsAndroidAppsRequest,
  output: RemoveProjectsAndroidAppsResponse,
  errors: [],
}));

/** Restores the specified AndroidApp to the FirebaseProject. */
export interface UndeleteProjectsAndroidAppsRequest {
  /** Required. The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the AndroidApp [name](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: UndeleteAndroidAppRequest;
}

export const UndeleteProjectsAndroidAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteAndroidAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsAndroidAppsRequest>;

export type UndeleteProjectsAndroidAppsResponse = Operation;
export const UndeleteProjectsAndroidAppsResponse = Operation;

export type UndeleteProjectsAndroidAppsError = CommonErrors;

export const undeleteProjectsAndroidApps: API.OperationMethod<UndeleteProjectsAndroidAppsRequest, UndeleteProjectsAndroidAppsResponse, UndeleteProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsAndroidAppsRequest,
  output: UndeleteProjectsAndroidAppsResponse,
  errors: [],
}));

/** Gets the configuration artifact associated with the specified AndroidApp. */
export interface GetConfigProjectsAndroidAppsRequest {
  /** The resource name of the AndroidApp configuration to download, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetConfigProjectsAndroidAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsAndroidAppsRequest>;

export type GetConfigProjectsAndroidAppsResponse = AndroidAppConfig;
export const GetConfigProjectsAndroidAppsResponse = AndroidAppConfig;

export type GetConfigProjectsAndroidAppsError = CommonErrors;

export const getConfigProjectsAndroidApps: API.OperationMethod<GetConfigProjectsAndroidAppsRequest, GetConfigProjectsAndroidAppsResponse, GetConfigProjectsAndroidAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsAndroidAppsRequest,
  output: GetConfigProjectsAndroidAppsResponse,
  errors: [],
}));

/** Lists the SHA-1 and SHA-256 certificates for the specified AndroidApp. */
export interface ListProjectsAndroidAppsShaRequest {
  /** The resource name of the parent AndroidApp for which to list each associated ShaCertificate, in the format: projects/PROJECT_IDENTIFIER /androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  parent: string;
}

export const ListProjectsAndroidAppsShaRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}/sha" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAndroidAppsShaRequest>;

export type ListProjectsAndroidAppsShaResponse = ListShaCertificatesResponse;
export const ListProjectsAndroidAppsShaResponse = ListShaCertificatesResponse;

export type ListProjectsAndroidAppsShaError = CommonErrors;

export const listProjectsAndroidAppsSha: API.OperationMethod<ListProjectsAndroidAppsShaRequest, ListProjectsAndroidAppsShaResponse, ListProjectsAndroidAppsShaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsAndroidAppsShaRequest,
  output: ListProjectsAndroidAppsShaResponse,
  errors: [],
}));

/** Adds a ShaCertificate to the specified AndroidApp. */
export interface CreateProjectsAndroidAppsShaRequest {
  /** The resource name of the parent AndroidApp to which to add a ShaCertificate, in the format: projects/PROJECT_IDENTIFIER/androidApps/ APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  parent: string;
  /** Request body */
  body?: ShaCertificate;
}

export const CreateProjectsAndroidAppsShaRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ShaCertificate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}/sha", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAndroidAppsShaRequest>;

export type CreateProjectsAndroidAppsShaResponse = ShaCertificate;
export const CreateProjectsAndroidAppsShaResponse = ShaCertificate;

export type CreateProjectsAndroidAppsShaError = CommonErrors;

export const createProjectsAndroidAppsSha: API.OperationMethod<CreateProjectsAndroidAppsShaRequest, CreateProjectsAndroidAppsShaResponse, CreateProjectsAndroidAppsShaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAndroidAppsShaRequest,
  output: CreateProjectsAndroidAppsShaResponse,
  errors: [],
}));

/** Removes a ShaCertificate from the specified AndroidApp. */
export interface DeleteProjectsAndroidAppsShaRequest {
  /** The resource name of the ShaCertificate to remove from the parent AndroidApp, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID /sha/SHA_HASH Refer to the `ShaCertificate` [`name`](../projects.androidApps.sha#ShaCertificate.FIELDS.name) field for details about PROJECT_IDENTIFIER, APP_ID, and SHA_HASH values. You can obtain the full resource name of the `ShaCertificate` from the response of [`ListShaCertificates`](../projects.androidApps.sha/list) or the original [`CreateShaCertificate`](../projects.androidApps.sha/create). */
  name: string;
}

export const DeleteProjectsAndroidAppsShaRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/androidApps/{androidAppsId}/sha/{shaId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAndroidAppsShaRequest>;

export type DeleteProjectsAndroidAppsShaResponse = Empty;
export const DeleteProjectsAndroidAppsShaResponse = Empty;

export type DeleteProjectsAndroidAppsShaError = CommonErrors;

export const deleteProjectsAndroidAppsSha: API.OperationMethod<DeleteProjectsAndroidAppsShaRequest, DeleteProjectsAndroidAppsShaResponse, DeleteProjectsAndroidAppsShaError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAndroidAppsShaRequest,
  output: DeleteProjectsAndroidAppsShaResponse,
  errors: [],
}));

/** Gets the specified IosApp. */
export interface GetProjectsIosAppsRequest {
  /** The resource name of the IosApp, in the format: projects/PROJECT_IDENTIFIER /iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the `IosApp` [`name`](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetProjectsIosAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/iosApps/{iosAppsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsIosAppsRequest>;

export type GetProjectsIosAppsResponse = IosApp;
export const GetProjectsIosAppsResponse = IosApp;

export type GetProjectsIosAppsError = CommonErrors;

export const getProjectsIosApps: API.OperationMethod<GetProjectsIosAppsRequest, GetProjectsIosAppsResponse, GetProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsIosAppsRequest,
  output: GetProjectsIosAppsResponse,
  errors: [],
}));

/** Lists each IosApp associated with the specified FirebaseProject. The elements are returned in no particular order, but will be a consistent view of the Apps when additional requests are made with a `pageToken`. */
export interface ListProjectsIosAppsRequest {
  /** The resource name of the parent FirebaseProject for which to list each associated IosApp, in the format: projects/PROJECT_IDENTIFIER/iosApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Token returned from a previous call to `ListIosApps` indicating where in the set of Apps to resume listing. */
  pageToken?: string;
  /** The maximum number of Apps to return in the response. The server may return fewer than this at its discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. */
  pageSize?: number;
  /** Controls whether Apps in the DELETED state should be returned in the response. If not specified, only `ACTIVE` Apps will be returned. */
  showDeleted?: boolean;
}

export const ListProjectsIosAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/iosApps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsIosAppsRequest>;

export type ListProjectsIosAppsResponse = ListIosAppsResponse;
export const ListProjectsIosAppsResponse = ListIosAppsResponse;

export type ListProjectsIosAppsError = CommonErrors;

export const listProjectsIosApps = API.makePaginated(() => ({
  input: ListProjectsIosAppsRequest,
  output: ListProjectsIosAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Requests the creation of a new IosApp in the specified FirebaseProject. The result of this call is an `Operation` which can be used to track the provisioning process. The `Operation` is automatically deleted after completion, so there is no need to call `DeleteOperation`. */
export interface CreateProjectsIosAppsRequest {
  /** The resource name of the parent FirebaseProject in which to create an IosApp, in the format: projects/PROJECT_IDENTIFIER/iosApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: IosApp;
}

export const CreateProjectsIosAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(IosApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/iosApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsIosAppsRequest>;

export type CreateProjectsIosAppsResponse = Operation;
export const CreateProjectsIosAppsResponse = Operation;

export type CreateProjectsIosAppsError = CommonErrors;

export const createProjectsIosApps: API.OperationMethod<CreateProjectsIosAppsRequest, CreateProjectsIosAppsResponse, CreateProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsIosAppsRequest,
  output: CreateProjectsIosAppsResponse,
  errors: [],
}));

/** Updates the attributes of the specified IosApp. */
export interface PatchProjectsIosAppsRequest {
  /** The resource name of the IosApp, in the format: projects/PROJECT_IDENTIFIER /iosApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.iosApps#IosApp.FIELDS.app_id)). */
  name: string;
  /** Specifies which fields of the IosApp to update. Note that the following fields are immutable: `name`, `app_id`, `project_id`, and `bundle_id`. To update `state`, use any of the following endpoints: RemoveIosApp or UndeleteIosApp. */
  updateMask?: string;
  /** Request body */
  body?: IosApp;
}

export const PatchProjectsIosAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(IosApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/iosApps/{iosAppsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsIosAppsRequest>;

export type PatchProjectsIosAppsResponse = IosApp;
export const PatchProjectsIosAppsResponse = IosApp;

export type PatchProjectsIosAppsError = CommonErrors;

export const patchProjectsIosApps: API.OperationMethod<PatchProjectsIosAppsRequest, PatchProjectsIosAppsResponse, PatchProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsIosAppsRequest,
  output: PatchProjectsIosAppsResponse,
  errors: [],
}));

/** Removes the specified IosApp from the FirebaseProject. */
export interface RemoveProjectsIosAppsRequest {
  /** Required. The resource name of the IosApp, in the format: projects/ PROJECT_IDENTIFIER/iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the IosApp [name](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: RemoveIosAppRequest;
}

export const RemoveProjectsIosAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveIosAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/iosApps/{iosAppsId}:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProjectsIosAppsRequest>;

export type RemoveProjectsIosAppsResponse = Operation;
export const RemoveProjectsIosAppsResponse = Operation;

export type RemoveProjectsIosAppsError = CommonErrors;

export const removeProjectsIosApps: API.OperationMethod<RemoveProjectsIosAppsRequest, RemoveProjectsIosAppsResponse, RemoveProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProjectsIosAppsRequest,
  output: RemoveProjectsIosAppsResponse,
  errors: [],
}));

/** Restores the specified IosApp to the FirebaseProject. */
export interface UndeleteProjectsIosAppsRequest {
  /** Required. The resource name of the IosApp, in the format: projects/ PROJECT_IDENTIFIER/iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the IosApp [name](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: UndeleteIosAppRequest;
}

export const UndeleteProjectsIosAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteIosAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/iosApps/{iosAppsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsIosAppsRequest>;

export type UndeleteProjectsIosAppsResponse = Operation;
export const UndeleteProjectsIosAppsResponse = Operation;

export type UndeleteProjectsIosAppsError = CommonErrors;

export const undeleteProjectsIosApps: API.OperationMethod<UndeleteProjectsIosAppsRequest, UndeleteProjectsIosAppsResponse, UndeleteProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsIosAppsRequest,
  output: UndeleteProjectsIosAppsResponse,
  errors: [],
}));

/** Gets the configuration artifact associated with the specified IosApp. */
export interface GetConfigProjectsIosAppsRequest {
  /** The resource name of the App configuration to download, in the format: projects/PROJECT_IDENTIFIER/iosApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the `IosApp` [`name`](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetConfigProjectsIosAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/iosApps/{iosAppsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsIosAppsRequest>;

export type GetConfigProjectsIosAppsResponse = IosAppConfig;
export const GetConfigProjectsIosAppsResponse = IosAppConfig;

export type GetConfigProjectsIosAppsError = CommonErrors;

export const getConfigProjectsIosApps: API.OperationMethod<GetConfigProjectsIosAppsRequest, GetConfigProjectsIosAppsResponse, GetConfigProjectsIosAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsIosAppsRequest,
  output: GetConfigProjectsIosAppsResponse,
  errors: [],
}));

/** **DECOMMISSIONED.** **If called, this endpoint will return a 404 error.** _Instead, use the applicable resource-specific REST API (or associated documentation, as needed) to determine valid locations for each resource used in your Project._ Lists the valid ["locations for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location) for the specified Project (including a FirebaseProject). One of these locations can be selected as the Project's location for default Google Cloud resources, which is the geographical location where the Project's resources associated with Google App Engine (such as the default Cloud Firestore instance) will be provisioned by default. However, if the location for default Google Cloud resources has already been set for the Project, then this setting cannot be changed. This call checks for any possible [location restrictions](https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations) for the specified Project and, thus, might return a subset of all possible locations. To list all locations (regardless of any restrictions), call the endpoint without specifying a unique project identifier (that is, `/v1beta1/{parent=projects/-}/listAvailableLocations`). To call `ListAvailableLocations` with a specified project, a member must be at minimum a Viewer of the Project. Calls without a specified project do not require any specific project permissions. */
export interface ListProjectsAvailableLocationsRequest {
  /** The FirebaseProject for which to list [locations for default Google Cloud resources](https://firebase.google.com/docs/projects/locations#default-cloud-location), in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. If no unique project identifier is specified (that is, `projects/-`), the returned list does not take into account org-specific or project-specific location restrictions. */
  parent: string;
  /** Token returned from a previous call to `ListAvailableLocations` indicating where in the list of locations to resume listing. */
  pageToken?: string;
  /** The maximum number of locations to return in the response. The server may return fewer than this value at its discretion. If no value is specified (or too large a value is specified), then the server will impose its own limit. This value cannot be negative. */
  pageSize?: number;
}

export const ListProjectsAvailableLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/availableLocations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAvailableLocationsRequest>;

export type ListProjectsAvailableLocationsResponse = ListAvailableLocationsResponse;
export const ListProjectsAvailableLocationsResponse = ListAvailableLocationsResponse;

export type ListProjectsAvailableLocationsError = CommonErrors;

export const listProjectsAvailableLocations = API.makePaginated(() => ({
  input: ListProjectsAvailableLocationsRequest,
  output: ListProjectsAvailableLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** **DECOMMISSIONED.** **If called, this endpoint will return a 404 error.** _Instead, use the applicable resource-specific REST API to set the location for each resource used in your Project._ Sets the ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location) for the specified FirebaseProject. This method creates a Google App Engine application with a [default Cloud Storage bucket](https://cloud.google.com/appengine/docs/standard/python/googlecloudstorageclient/setting-up-cloud-storage#activating_a_cloud_storage_bucket), located in the specified [`locationId`](#body.request_body.FIELDS.location_id). This location must be one of the available [App Engine locations](https://cloud.google.com/about/locations#region). After the location for default Google Cloud resources is finalized, or if it was already set, it cannot be changed. The location for default Google Cloud resources for the specified `FirebaseProject` might already be set because either the underlying Google Cloud `Project` already has an App Engine application or `FinalizeDefaultLocation` was previously called with a specified `locationId`. The result of this call is an [`Operation`](../../v1beta1/operations), which can be used to track the provisioning process. The [`response`](../../v1beta1/operations#Operation.FIELDS.response) type of the `Operation` is google.protobuf.Empty. The `Operation` can be polled by its `name` using GetOperation until `done` is true. When `done` is true, the `Operation` has either succeeded or failed. If the `Operation` has succeeded, its [`response`](../../v1beta1/operations#Operation.FIELDS.response) will be set to a google.protobuf.Empty; if the `Operation` has failed, its `error` will be set to a google.rpc.Status. The `Operation` is automatically deleted after completion, so there is no need to call DeleteOperation. All fields listed in the [request body](#request-body) are required. To call `FinalizeDefaultLocation`, a member must be an Owner of the Project. */
export interface FinalizeProjectsDefaultLocationRequest {
  /** The resource name of the FirebaseProject for which the ["location for default Google Cloud resources"](https://firebase.google.com/docs/projects/locations#default-cloud-location) will be set, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: FinalizeDefaultLocationRequest;
}

export const FinalizeProjectsDefaultLocationRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(FinalizeDefaultLocationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/defaultLocation:finalize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FinalizeProjectsDefaultLocationRequest>;

export type FinalizeProjectsDefaultLocationResponse = Operation;
export const FinalizeProjectsDefaultLocationResponse = Operation;

export type FinalizeProjectsDefaultLocationError = CommonErrors;

export const finalizeProjectsDefaultLocation: API.OperationMethod<FinalizeProjectsDefaultLocationRequest, FinalizeProjectsDefaultLocationResponse, FinalizeProjectsDefaultLocationError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FinalizeProjectsDefaultLocationRequest,
  output: FinalizeProjectsDefaultLocationResponse,
  errors: [],
}));

/** Gets the specified WebApp. */
export interface GetProjectsWebAppsRequest {
  /** The resource name of the WebApp, in the format: projects/PROJECT_IDENTIFIER /webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the `WebApp` [`name`](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetProjectsWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/webApps/{webAppsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsWebAppsRequest>;

export type GetProjectsWebAppsResponse = WebApp;
export const GetProjectsWebAppsResponse = WebApp;

export type GetProjectsWebAppsError = CommonErrors;

export const getProjectsWebApps: API.OperationMethod<GetProjectsWebAppsRequest, GetProjectsWebAppsResponse, GetProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsWebAppsRequest,
  output: GetProjectsWebAppsResponse,
  errors: [],
}));

/** Lists each WebApp associated with the specified FirebaseProject. The elements are returned in no particular order, but will be a consistent view of the Apps when additional requests are made with a `pageToken`. */
export interface ListProjectsWebAppsRequest {
  /** The resource name of the parent FirebaseProject for which to list each associated WebApp, in the format: projects/PROJECT_IDENTIFIER/webApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Token returned from a previous call to `ListWebApps` indicating where in the set of Apps to resume listing. */
  pageToken?: string;
  /** The maximum number of Apps to return in the response. The server may return fewer than this value at its discretion. If no value is specified (or too large a value is specified), then the server will impose its own limit. */
  pageSize?: number;
  /** Controls whether Apps in the DELETED state should be returned in the response. If not specified, only `ACTIVE` Apps will be returned. */
  showDeleted?: boolean;
}

export const ListProjectsWebAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/webApps" }),
  svc,
) as unknown as Schema.Schema<ListProjectsWebAppsRequest>;

export type ListProjectsWebAppsResponse = ListWebAppsResponse;
export const ListProjectsWebAppsResponse = ListWebAppsResponse;

export type ListProjectsWebAppsError = CommonErrors;

export const listProjectsWebApps = API.makePaginated(() => ({
  input: ListProjectsWebAppsRequest,
  output: ListProjectsWebAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Requests the creation of a new WebApp in the specified FirebaseProject. The result of this call is an `Operation` which can be used to track the provisioning process. The `Operation` is automatically deleted after completion, so there is no need to call `DeleteOperation`. */
export interface CreateProjectsWebAppsRequest {
  /** The resource name of the parent FirebaseProject in which to create a WebApp, in the format: projects/PROJECT_IDENTIFIER/webApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. */
  parent: string;
  /** Request body */
  body?: WebApp;
}

export const CreateProjectsWebAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/webApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsWebAppsRequest>;

export type CreateProjectsWebAppsResponse = Operation;
export const CreateProjectsWebAppsResponse = Operation;

export type CreateProjectsWebAppsError = CommonErrors;

export const createProjectsWebApps: API.OperationMethod<CreateProjectsWebAppsRequest, CreateProjectsWebAppsResponse, CreateProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsWebAppsRequest,
  output: CreateProjectsWebAppsResponse,
  errors: [],
}));

/** Updates the attributes of the specified WebApp. */
export interface PatchProjectsWebAppsRequest {
  /** The resource name of the WebApp, in the format: projects/PROJECT_IDENTIFIER /webApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.webApps#WebApp.FIELDS.app_id)). */
  name: string;
  /** Specifies which fields of the WebApp to update. Note that the following fields are immutable: `name`, `app_id`, and `project_id`. To update `state`, use any of the following endpoints: RemoveWebApp or UndeleteWebApp. */
  updateMask?: string;
  /** Request body */
  body?: WebApp;
}

export const PatchProjectsWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(WebApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/projects/{projectsId}/webApps/{webAppsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsWebAppsRequest>;

export type PatchProjectsWebAppsResponse = WebApp;
export const PatchProjectsWebAppsResponse = WebApp;

export type PatchProjectsWebAppsError = CommonErrors;

export const patchProjectsWebApps: API.OperationMethod<PatchProjectsWebAppsRequest, PatchProjectsWebAppsResponse, PatchProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsWebAppsRequest,
  output: PatchProjectsWebAppsResponse,
  errors: [],
}));

/** Removes the specified WebApp from the FirebaseProject. */
export interface RemoveProjectsWebAppsRequest {
  /** Required. The resource name of the WebApp, in the format: projects/ PROJECT_IDENTIFIER/webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the WebApp [name](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: RemoveWebAppRequest;
}

export const RemoveProjectsWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RemoveWebAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/webApps/{webAppsId}:remove", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveProjectsWebAppsRequest>;

export type RemoveProjectsWebAppsResponse = Operation;
export const RemoveProjectsWebAppsResponse = Operation;

export type RemoveProjectsWebAppsError = CommonErrors;

export const removeProjectsWebApps: API.OperationMethod<RemoveProjectsWebAppsRequest, RemoveProjectsWebAppsResponse, RemoveProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveProjectsWebAppsRequest,
  output: RemoveProjectsWebAppsResponse,
  errors: [],
}));

/** Restores the specified WebApp to the FirebaseProject. */
export interface UndeleteProjectsWebAppsRequest {
  /** Required. The resource name of the WebApp, in the format: projects/ PROJECT_IDENTIFIER/webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the WebApp [name](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
  /** Request body */
  body?: UndeleteWebAppRequest;
}

export const UndeleteProjectsWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteWebAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/webApps/{webAppsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsWebAppsRequest>;

export type UndeleteProjectsWebAppsResponse = Operation;
export const UndeleteProjectsWebAppsResponse = Operation;

export type UndeleteProjectsWebAppsError = CommonErrors;

export const undeleteProjectsWebApps: API.OperationMethod<UndeleteProjectsWebAppsRequest, UndeleteProjectsWebAppsResponse, UndeleteProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsWebAppsRequest,
  output: UndeleteProjectsWebAppsResponse,
  errors: [],
}));

/** Gets the configuration artifact associated with the specified WebApp. */
export interface GetConfigProjectsWebAppsRequest {
  /** The resource name of the WebApp configuration to download, in the format: projects/PROJECT_IDENTIFIER/webApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the `WebApp` [`name`](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values. */
  name: string;
}

export const GetConfigProjectsWebAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/webApps/{webAppsId}/config" }),
  svc,
) as unknown as Schema.Schema<GetConfigProjectsWebAppsRequest>;

export type GetConfigProjectsWebAppsResponse = WebAppConfig;
export const GetConfigProjectsWebAppsResponse = WebAppConfig;

export type GetConfigProjectsWebAppsError = CommonErrors;

export const getConfigProjectsWebApps: API.OperationMethod<GetConfigProjectsWebAppsRequest, GetConfigProjectsWebAppsResponse, GetConfigProjectsWebAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConfigProjectsWebAppsRequest,
  output: GetConfigProjectsWebAppsResponse,
  errors: [],
}));

/** Lists each [Google Cloud `Project`](https://cloud.google.com/resource-manager/reference/rest/v1/projects) that can have Firebase resources added and Firebase services enabled. A Project will only be listed if: - The caller has sufficient [Google IAM](https://cloud.google.com/iam) permissions to call AddFirebase. - The Project is not already a FirebaseProject. - The Project is not in an Organization which has policies that prevent Firebase resources from being added. */
export interface ListAvailableProjectsRequest {
  /** Token returned from a previous call to `ListAvailableProjects` indicating where in the set of Projects to resume listing. */
  pageToken?: string;
  /** The maximum number of Projects to return in the response. The server may return fewer than this value at its discretion. If no value is specified (or too large a value is specified), the server will impose its own limit. This value cannot be negative. */
  pageSize?: number;
}

export const ListAvailableProjectsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/availableProjects" }),
  svc,
) as unknown as Schema.Schema<ListAvailableProjectsRequest>;

export type ListAvailableProjectsResponse_Op = ListAvailableProjectsResponse;
export const ListAvailableProjectsResponse_Op = ListAvailableProjectsResponse;

export type ListAvailableProjectsError = CommonErrors;

export const listAvailableProjects = API.makePaginated(() => ({
  input: ListAvailableProjectsRequest,
  output: ListAvailableProjectsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

