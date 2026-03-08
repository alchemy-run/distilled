// ==========================================================================
// Cloud Testing API (testing v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "testing",
  version: "v1",
  rootUrl: "https://testing.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DirectAccessVersionInfo {
  /** Whether direct access is supported at all. Clients are expected to filter down the device list to only android models and versions which support Direct Access when that is the user intent. */
  directAccessSupported?: boolean;
  /** Output only. Indicates client-device compatibility, where a device is known to work only with certain workarounds implemented in the Android Studio client. Expected format "major.minor.micro.patch", e.g. "5921.22.2211.8881706". */
  minimumAndroidStudioVersion?: string;
}

export const DirectAccessVersionInfo: Schema.Schema<DirectAccessVersionInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      directAccessSupported: Schema.optional(Schema.Boolean),
      minimumAndroidStudioVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DirectAccessVersionInfo",
  }) as any as Schema.Schema<DirectAccessVersionInfo>;

export interface PerAndroidVersionInfo {
  /** The number of online devices for an Android version. */
  deviceCapacity?:
    | "DEVICE_CAPACITY_UNSPECIFIED"
    | "DEVICE_CAPACITY_HIGH"
    | "DEVICE_CAPACITY_MEDIUM"
    | "DEVICE_CAPACITY_LOW"
    | "DEVICE_CAPACITY_NONE"
    | (string & {});
  /** Output only. Identifies supported clients for DirectAccess for this Android version. */
  directAccessVersionInfo?: DirectAccessVersionInfo;
  /** An Android version. */
  versionId?: string;
  /** Output only. The estimated wait time for a single interactive device session using Direct Access. */
  interactiveDeviceAvailabilityEstimate?: string;
}

export const PerAndroidVersionInfo: Schema.Schema<PerAndroidVersionInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      deviceCapacity: Schema.optional(Schema.String),
      directAccessVersionInfo: Schema.optional(DirectAccessVersionInfo),
      versionId: Schema.optional(Schema.String),
      interactiveDeviceAvailabilityEstimate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PerAndroidVersionInfo",
  }) as any as Schema.Schema<PerAndroidVersionInfo>;

export interface ClientInfoDetail {
  /** Required. The key of detailed client information. */
  key?: string;
  /** Required. The value of detailed client information. */
  value?: string;
}

export const ClientInfoDetail: Schema.Schema<ClientInfoDetail> = Schema.suspend(
  () =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ClientInfoDetail",
}) as any as Schema.Schema<ClientInfoDetail>;

export interface UsesPermissionTag {
  /** The android:name value */
  name?: string;
  /** The android:name value */
  maxSdkVersion?: number;
}

export const UsesPermissionTag: Schema.Schema<UsesPermissionTag> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      maxSdkVersion: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "UsesPermissionTag",
  }) as any as Schema.Schema<UsesPermissionTag>;

export interface TrafficRule {
  /** Packet delay, must be >= 0. */
  delay?: string;
  /** Packet loss ratio (0.0 - 1.0). */
  packetLossRatio?: number;
  /** Packet duplication ratio (0.0 - 1.0). */
  packetDuplicationRatio?: number;
  /** Bandwidth in kbits/second. */
  bandwidth?: number;
  /** Burst size in kbits. */
  burst?: number;
}

export const TrafficRule: Schema.Schema<TrafficRule> = Schema.suspend(() =>
  Schema.Struct({
    delay: Schema.optional(Schema.String),
    packetLossRatio: Schema.optional(Schema.Number),
    packetDuplicationRatio: Schema.optional(Schema.Number),
    bandwidth: Schema.optional(Schema.Number),
    burst: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "TrafficRule" }) as any as Schema.Schema<TrafficRule>;

export interface IosDevice {
  /** Required. The id of the iOS major software version to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  iosVersionId?: string;
  /** Required. The id of the iOS device to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  iosModelId?: string;
  /** Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options. */
  locale?: string;
  /** Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options. */
  orientation?: string;
}

export const IosDevice: Schema.Schema<IosDevice> = Schema.suspend(() =>
  Schema.Struct({
    iosVersionId: Schema.optional(Schema.String),
    iosModelId: Schema.optional(Schema.String),
    locale: Schema.optional(Schema.String),
    orientation: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "IosDevice" }) as any as Schema.Schema<IosDevice>;

export interface IosDeviceList {
  /** Required. A list of iOS devices. */
  iosDevices?: Array<IosDevice>;
}

export const IosDeviceList: Schema.Schema<IosDeviceList> = Schema.suspend(() =>
  Schema.Struct({
    iosDevices: Schema.optional(Schema.Array(IosDevice)),
  }),
).annotate({
  identifier: "IosDeviceList",
}) as any as Schema.Schema<IosDeviceList>;

export interface AndroidDevice {
  /** Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options. */
  locale?: string;
  /** Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options. */
  orientation?: string;
  /** Required. The id of the Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  androidModelId?: string;
  /** Required. The id of the Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  androidVersionId?: string;
}

export const AndroidDevice: Schema.Schema<AndroidDevice> = Schema.suspend(() =>
  Schema.Struct({
    locale: Schema.optional(Schema.String),
    orientation: Schema.optional(Schema.String),
    androidModelId: Schema.optional(Schema.String),
    androidVersionId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AndroidDevice",
}) as any as Schema.Schema<AndroidDevice>;

export interface AndroidDeviceList {
  /** Required. A list of Android devices. */
  androidDevices?: Array<AndroidDevice>;
}

export const AndroidDeviceList: Schema.Schema<AndroidDeviceList> =
  Schema.suspend(() =>
    Schema.Struct({
      androidDevices: Schema.optional(Schema.Array(AndroidDevice)),
    }),
  ).annotate({
    identifier: "AndroidDeviceList",
  }) as any as Schema.Schema<AndroidDeviceList>;

export interface AndroidMatrix {
  /** Required. The ids of the set of Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  androidModelIds?: Array<string>;
  /** Required. The set of locales the test device will enable for testing. Use the TestEnvironmentDiscoveryService to get supported options. */
  locales?: Array<string>;
  /** Required. The set of orientations to test with. Use the TestEnvironmentDiscoveryService to get supported options. */
  orientations?: Array<string>;
  /** Required. The ids of the set of Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options. */
  androidVersionIds?: Array<string>;
}

export const AndroidMatrix: Schema.Schema<AndroidMatrix> = Schema.suspend(() =>
  Schema.Struct({
    androidModelIds: Schema.optional(Schema.Array(Schema.String)),
    locales: Schema.optional(Schema.Array(Schema.String)),
    orientations: Schema.optional(Schema.Array(Schema.String)),
    androidVersionIds: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "AndroidMatrix",
}) as any as Schema.Schema<AndroidMatrix>;

export interface EnvironmentMatrix {
  /** A list of iOS devices. */
  iosDeviceList?: IosDeviceList;
  /** A list of Android devices; the test will be run only on the specified devices. */
  androidDeviceList?: AndroidDeviceList;
  /** A matrix of Android devices. */
  androidMatrix?: AndroidMatrix;
}

export const EnvironmentMatrix: Schema.Schema<EnvironmentMatrix> =
  Schema.suspend(() =>
    Schema.Struct({
      iosDeviceList: Schema.optional(IosDeviceList),
      androidDeviceList: Schema.optional(AndroidDeviceList),
      androidMatrix: Schema.optional(AndroidMatrix),
    }),
  ).annotate({
    identifier: "EnvironmentMatrix",
  }) as any as Schema.Schema<EnvironmentMatrix>;

export interface NetworkConfiguration {
  /** The emulation rule applying to the upload traffic. */
  upRule?: TrafficRule;
  /** The unique opaque id for this network traffic configuration. */
  id?: string;
  /** The emulation rule applying to the download traffic. */
  downRule?: TrafficRule;
}

export const NetworkConfiguration: Schema.Schema<NetworkConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      upRule: Schema.optional(TrafficRule),
      id: Schema.optional(Schema.String),
      downRule: Schema.optional(TrafficRule),
    }),
  ).annotate({
    identifier: "NetworkConfiguration",
  }) as any as Schema.Schema<NetworkConfiguration>;

export interface NetworkConfigurationCatalog {
  configurations?: Array<NetworkConfiguration>;
}

export const NetworkConfigurationCatalog: Schema.Schema<NetworkConfigurationCatalog> =
  Schema.suspend(() =>
    Schema.Struct({
      configurations: Schema.optional(Schema.Array(NetworkConfiguration)),
    }),
  ).annotate({
    identifier: "NetworkConfigurationCatalog",
  }) as any as Schema.Schema<NetworkConfigurationCatalog>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Locale {
  /** A human-friendly name for this language/locale. Example: "English". */
  name?: string;
  /** Tags for this dimension. Example: "default". */
  tags?: Array<string>;
  /** The id for this locale. Example: "en_US". */
  id?: string;
  /** A human-friendly string representing the region for this locale. Example: "United States". Not present for every locale. */
  region?: string;
}

export const Locale: Schema.Schema<Locale> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Array(Schema.String)),
    id: Schema.optional(Schema.String),
    region: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Locale" }) as any as Schema.Schema<Locale>;

export interface Orientation {
  /** A human-friendly name for this orientation. Example: "portrait". */
  name?: string;
  /** Tags for this dimension. Example: "default". */
  tags?: Array<string>;
  /** The id for this orientation. Example: "portrait". */
  id?: string;
}

export const Orientation: Schema.Schema<Orientation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Array(Schema.String)),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Orientation" }) as any as Schema.Schema<Orientation>;

export interface IosRuntimeConfiguration {
  /** The set of available locales. */
  locales?: Array<Locale>;
  /** The set of available orientations. */
  orientations?: Array<Orientation>;
}

export const IosRuntimeConfiguration: Schema.Schema<IosRuntimeConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      locales: Schema.optional(Schema.Array(Locale)),
      orientations: Schema.optional(Schema.Array(Orientation)),
    }),
  ).annotate({
    identifier: "IosRuntimeConfiguration",
  }) as any as Schema.Schema<IosRuntimeConfiguration>;

export interface SessionStateEvent {
  /** Output only. The session_state tracked by this event */
  sessionState?:
    | "SESSION_STATE_UNSPECIFIED"
    | "REQUESTED"
    | "PENDING"
    | "ACTIVE"
    | "EXPIRED"
    | "FINISHED"
    | "UNAVAILABLE"
    | "ERROR"
    | (string & {});
  /** Output only. A human-readable message to explain the state. */
  stateMessage?: string;
  /** Output only. The time that the session_state first encountered that state. */
  eventTime?: string;
}

export const SessionStateEvent: Schema.Schema<SessionStateEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      sessionState: Schema.optional(Schema.String),
      stateMessage: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SessionStateEvent",
  }) as any as Schema.Schema<SessionStateEvent>;

export interface DeviceSession {
  /** Output only. The time that the Session was created. */
  createTime?: string;
  /** Output only. The historical state transitions of the session_state message including the current session state. */
  stateHistories?: Array<SessionStateEvent>;
  /** Output only. The timestamp that the session first became ACTIVE. */
  activeStartTime?: string;
  /** Required. The requested device */
  androidDevice?: AndroidDevice;
  /** Output only. The title of the DeviceSession to be presented in the UI. */
  displayName?: string;
  /** Output only. The interval of time that this device must be interacted with before it transitions from ACTIVE to TIMEOUT_INACTIVITY. */
  inactivityTimeout?: string;
  /** Output only. Current state of the DeviceSession. */
  state?:
    | "SESSION_STATE_UNSPECIFIED"
    | "REQUESTED"
    | "PENDING"
    | "ACTIVE"
    | "EXPIRED"
    | "FINISHED"
    | "UNAVAILABLE"
    | "ERROR"
    | (string & {});
  /** Optional. If the device is still in use at this time, any connections will be ended and the SessionState will transition from ACTIVE to FINISHED. */
  expireTime?: string;
  /** Optional. Name of the DeviceSession, e.g. "projects/{project_id}/deviceSessions/{session_id}" */
  name?: string;
  /** Optional. The amount of time that a device will be initially allocated for. This can eventually be extended with the UpdateDeviceSession RPC. Default: 15 minutes. */
  ttl?: string;
}

export const DeviceSession: Schema.Schema<DeviceSession> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    stateHistories: Schema.optional(Schema.Array(SessionStateEvent)),
    activeStartTime: Schema.optional(Schema.String),
    androidDevice: Schema.optional(AndroidDevice),
    displayName: Schema.optional(Schema.String),
    inactivityTimeout: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    expireTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    ttl: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DeviceSession",
}) as any as Schema.Schema<DeviceSession>;

export interface IntentFilter {
  /** The android:mimeType value of the tag. */
  mimeType?: string;
  /** The android:name value of the tag. */
  actionNames?: Array<string>;
  /** The android:name value of the tag. */
  categoryNames?: Array<string>;
}

export const IntentFilter: Schema.Schema<IntentFilter> = Schema.suspend(() =>
  Schema.Struct({
    mimeType: Schema.optional(Schema.String),
    actionNames: Schema.optional(Schema.Array(Schema.String)),
    categoryNames: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "IntentFilter",
}) as any as Schema.Schema<IntentFilter>;

export interface Service {
  /** The android:name value */
  name?: string;
  /** Intent filters in the service */
  intentFilter?: Array<IntentFilter>;
}

export const Service: Schema.Schema<Service> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    intentFilter: Schema.optional(Schema.Array(IntentFilter)),
  }),
).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface EnvironmentVariable {
  /** Key for the environment variable. */
  key?: string;
  /** Value for the environment variable. */
  value?: string;
}

export const EnvironmentVariable: Schema.Schema<EnvironmentVariable> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnvironmentVariable",
  }) as any as Schema.Schema<EnvironmentVariable>;

export interface IosVersion {
  /** Tags for this dimension. Examples: "default", "preview", "deprecated". */
  tags?: Array<string>;
  /** An opaque id for this iOS version. Use this id to invoke the TestExecutionService. */
  id?: string;
  /** An integer representing the minor iOS version. Examples: "1", "2". */
  minorVersion?: number;
  /** An integer representing the major iOS version. Examples: "8", "9". */
  majorVersion?: number;
  /** The available Xcode versions for this version. */
  supportedXcodeVersionIds?: Array<string>;
}

export const IosVersion: Schema.Schema<IosVersion> = Schema.suspend(() =>
  Schema.Struct({
    tags: Schema.optional(Schema.Array(Schema.String)),
    id: Schema.optional(Schema.String),
    minorVersion: Schema.optional(Schema.Number),
    majorVersion: Schema.optional(Schema.Number),
    supportedXcodeVersionIds: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "IosVersion" }) as any as Schema.Schema<IosVersion>;

export interface FileReference {
  /** A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding) */
  gcsPath?: string;
}

export const FileReference: Schema.Schema<FileReference> = Schema.suspend(() =>
  Schema.Struct({
    gcsPath: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FileReference",
}) as any as Schema.Schema<FileReference>;

export interface IosTestLoop {
  /** The list of scenarios that should be run during the test. Defaults to the single scenario 0 if unspecified. */
  scenarios?: Array<number>;
  /** Required. The .ipa of the application to test. */
  appIpa?: FileReference;
  /** Output only. The bundle id for the application under test. */
  appBundleId?: string;
}

export const IosTestLoop: Schema.Schema<IosTestLoop> = Schema.suspend(() =>
  Schema.Struct({
    scenarios: Schema.optional(Schema.Array(Schema.Number)),
    appIpa: Schema.optional(FileReference),
    appBundleId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "IosTestLoop" }) as any as Schema.Schema<IosTestLoop>;

export interface Metadata {
  /** The android:value value */
  value?: string;
  /** The android:name value */
  name?: string;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface UsesFeature {
  /** The android:name value */
  name?: string;
  /** The android:required value */
  isRequired?: boolean;
}

export const UsesFeature: Schema.Schema<UsesFeature> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    isRequired: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "UsesFeature" }) as any as Schema.Schema<UsesFeature>;

export interface ApkManifest {
  /** Meta-data tags defined in the manifest. */
  metadata?: Array<Metadata>;
  /** User-readable name for the application. */
  applicationLabel?: string;
  /** Version number used internally by the app. */
  versionCode?: string;
  /** Services contained in the tag. */
  services?: Array<Service>;
  /** Specifies the API Level on which the application is designed to run. */
  targetSdkVersion?: number;
  /** Maximum API level on which the application is designed to run. */
  maxSdkVersion?: number;
  /** Feature usage tags defined in the manifest. */
  usesFeature?: Array<UsesFeature>;
  /** Permissions declared to be used by the application */
  usesPermissionTags?: Array<UsesPermissionTag>;
  usesPermission?: Array<string>;
  /** Version number shown to users. */
  versionName?: string;
  /** Minimum API level required for the application to run. */
  minSdkVersion?: number;
  /** Full Java-style package name for this application, e.g. "com.example.foo". */
  packageName?: string;
  intentFilters?: Array<IntentFilter>;
}

export const ApkManifest: Schema.Schema<ApkManifest> = Schema.suspend(() =>
  Schema.Struct({
    metadata: Schema.optional(Schema.Array(Metadata)),
    applicationLabel: Schema.optional(Schema.String),
    versionCode: Schema.optional(Schema.String),
    services: Schema.optional(Schema.Array(Service)),
    targetSdkVersion: Schema.optional(Schema.Number),
    maxSdkVersion: Schema.optional(Schema.Number),
    usesFeature: Schema.optional(Schema.Array(UsesFeature)),
    usesPermissionTags: Schema.optional(Schema.Array(UsesPermissionTag)),
    usesPermission: Schema.optional(Schema.Array(Schema.String)),
    versionName: Schema.optional(Schema.String),
    minSdkVersion: Schema.optional(Schema.Number),
    packageName: Schema.optional(Schema.String),
    intentFilters: Schema.optional(Schema.Array(IntentFilter)),
  }),
).annotate({ identifier: "ApkManifest" }) as any as Schema.Schema<ApkManifest>;

export interface TestTargetsForShard {
  /** Group of packages, classes, and/or test methods to be run for each shard. The targets need to be specified in AndroidJUnitRunner argument format. For example, "package com.my.packages" "class com.my.package.MyClass". The number of test_targets must be greater than 0. */
  testTargets?: Array<string>;
}

export const TestTargetsForShard: Schema.Schema<TestTargetsForShard> =
  Schema.suspend(() =>
    Schema.Struct({
      testTargets: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestTargetsForShard",
  }) as any as Schema.Schema<TestTargetsForShard>;

export interface ClientInfo {
  /** Required. Client name, such as gcloud. */
  name?: string;
  /** The list of detailed information about client. */
  clientInfoDetails?: Array<ClientInfoDetail>;
}

export const ClientInfo: Schema.Schema<ClientInfo> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    clientInfoDetails: Schema.optional(Schema.Array(ClientInfoDetail)),
  }),
).annotate({ identifier: "ClientInfo" }) as any as Schema.Schema<ClientInfo>;

export interface SmartSharding {
  /** The amount of time tests within a shard should take. Default: 300 seconds (5 minutes). The minimum allowed: 120 seconds (2 minutes). The shard count is dynamically set based on time, up to the maximum shard limit (described below). To guarantee at least one test case for each shard, the number of shards will not exceed the number of test cases. Shard duration will be exceeded if: - The maximum shard limit is reached and there is more calculated test time remaining to allocate into shards. - Any individual test is estimated to be longer than the targeted shard duration. Shard duration is not guaranteed because smart sharding uses test case history and default durations which may not be accurate. The rules for finding the test case timing records are: - If the service has processed a test case in the last 30 days, the record of the latest successful test case will be used. - For new test cases, the average duration of other known test cases will be used. - If there are no previous test case timing records available, the default test case duration is 15 seconds. Because the actual shard duration can exceed the targeted shard duration, we recommend that you set the targeted value at least 5 minutes less than the maximum allowed test timeout (45 minutes for physical devices and 60 minutes for virtual), or that you use the custom test timeout value that you set. This approach avoids cancelling the shard before all tests can finish. Note that there is a limit for maximum number of shards. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500. To guarantee at least one test case for per shard, the number of shards will not exceed the number of test cases. Each shard created counts toward daily test quota. */
  targetedShardDuration?: string;
}

export const SmartSharding: Schema.Schema<SmartSharding> = Schema.suspend(() =>
  Schema.Struct({
    targetedShardDuration: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SmartSharding",
}) as any as Schema.Schema<SmartSharding>;

export interface ListDeviceSessionsResponse {
  /** The sessions matching the specified filter in the given cloud project. */
  deviceSessions?: Array<DeviceSession>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDeviceSessionsResponse: Schema.Schema<ListDeviceSessionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deviceSessions: Schema.optional(Schema.Array(DeviceSession)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDeviceSessionsResponse",
  }) as any as Schema.Schema<ListDeviceSessionsResponse>;

export interface ApkDetail {
  apkManifest?: ApkManifest;
}

export const ApkDetail: Schema.Schema<ApkDetail> = Schema.suspend(() =>
  Schema.Struct({
    apkManifest: Schema.optional(ApkManifest),
  }),
).annotate({ identifier: "ApkDetail" }) as any as Schema.Schema<ApkDetail>;

export interface GoogleCloudStorage {
  /** Required. The path to a directory in GCS that will eventually contain the results for this test. The requesting user must have write access on the bucket in the supplied path. */
  gcsPath?: string;
}

export const GoogleCloudStorage: Schema.Schema<GoogleCloudStorage> =
  Schema.suspend(() =>
    Schema.Struct({
      gcsPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudStorage",
  }) as any as Schema.Schema<GoogleCloudStorage>;

export interface ToolResultsHistory {
  /** Required. The cloud project that owns the tool results history. */
  projectId?: string;
  /** Required. A tool results history ID. */
  historyId?: string;
}

export const ToolResultsHistory: Schema.Schema<ToolResultsHistory> =
  Schema.suspend(() =>
    Schema.Struct({
      projectId: Schema.optional(Schema.String),
      historyId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ToolResultsHistory",
  }) as any as Schema.Schema<ToolResultsHistory>;

export interface ToolResultsExecution {
  /** Output only. A tool results history ID. */
  historyId?: string;
  /** Output only. The cloud project that owns the tool results execution. */
  projectId?: string;
  /** Output only. A tool results execution ID. */
  executionId?: string;
}

export const ToolResultsExecution: Schema.Schema<ToolResultsExecution> =
  Schema.suspend(() =>
    Schema.Struct({
      historyId: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      executionId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ToolResultsExecution",
  }) as any as Schema.Schema<ToolResultsExecution>;

export interface ResultStorage {
  /** Required. */
  googleCloudStorage?: GoogleCloudStorage;
  /** The tool results history that contains the tool results execution that results are written to. If not provided, the service will choose an appropriate value. */
  toolResultsHistory?: ToolResultsHistory;
  /** Output only. URL to the results in the Firebase Web Console. */
  resultsUrl?: string;
  /** Output only. The tool results execution that results are written to. */
  toolResultsExecution?: ToolResultsExecution;
}

export const ResultStorage: Schema.Schema<ResultStorage> = Schema.suspend(() =>
  Schema.Struct({
    googleCloudStorage: Schema.optional(GoogleCloudStorage),
    toolResultsHistory: Schema.optional(ToolResultsHistory),
    resultsUrl: Schema.optional(Schema.String),
    toolResultsExecution: Schema.optional(ToolResultsExecution),
  }),
).annotate({
  identifier: "ResultStorage",
}) as any as Schema.Schema<ResultStorage>;

export interface IosDeviceFile {
  /** The source file */
  content?: FileReference;
  /** The bundle id of the app where this file lives. iOS apps sandbox their own filesystem, so app files must specify which app installed on the device. */
  bundleId?: string;
  /** Location of the file on the device, inside the app's sandboxed filesystem */
  devicePath?: string;
}

export const IosDeviceFile: Schema.Schema<IosDeviceFile> = Schema.suspend(() =>
  Schema.Struct({
    content: Schema.optional(FileReference),
    bundleId: Schema.optional(Schema.String),
    devicePath: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "IosDeviceFile",
}) as any as Schema.Schema<IosDeviceFile>;

export interface IosTestSetup {
  /** iOS apps to install in addition to those being directly tested. */
  additionalIpas?: Array<FileReference>;
  /** List of directories on the device to upload to Cloud Storage at the end of the test. Directories should either be in a shared directory (such as /private/var/mobile/Media) or within an accessible directory inside the app's filesystem (such as /Documents) by specifying the bundle ID. */
  pullDirectories?: Array<IosDeviceFile>;
  /** The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog. */
  networkProfile?: string;
  /** List of files to push to the device before starting the test. */
  pushFiles?: Array<IosDeviceFile>;
}

export const IosTestSetup: Schema.Schema<IosTestSetup> = Schema.suspend(() =>
  Schema.Struct({
    additionalIpas: Schema.optional(Schema.Array(FileReference)),
    pullDirectories: Schema.optional(Schema.Array(IosDeviceFile)),
    networkProfile: Schema.optional(Schema.String),
    pushFiles: Schema.optional(Schema.Array(IosDeviceFile)),
  }),
).annotate({
  identifier: "IosTestSetup",
}) as any as Schema.Schema<IosTestSetup>;

export interface StartActivityIntent {
  /** URI for the action. */
  uri?: string;
  /** Intent categories to set on the intent. */
  categories?: Array<string>;
  /** Action name. Required for START_ACTIVITY. */
  action?: string;
}

export const StartActivityIntent: Schema.Schema<StartActivityIntent> =
  Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      categories: Schema.optional(Schema.Array(Schema.String)),
      action: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StartActivityIntent",
  }) as any as Schema.Schema<StartActivityIntent>;

export interface NoActivityIntent {}

export const NoActivityIntent: Schema.Schema<NoActivityIntent> = Schema.suspend(
  () => Schema.Struct({}),
).annotate({
  identifier: "NoActivityIntent",
}) as any as Schema.Schema<NoActivityIntent>;

export interface LauncherActivityIntent {}

export const LauncherActivityIntent: Schema.Schema<LauncherActivityIntent> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "LauncherActivityIntent",
  }) as any as Schema.Schema<LauncherActivityIntent>;

export interface RoboStartingIntent {
  /** An intent that starts an activity with specific details. */
  startActivity?: StartActivityIntent;
  /** Timeout in seconds for each intent. */
  timeout?: string;
  /** Skips the starting activity */
  noActivity?: NoActivityIntent;
  /** An intent that starts the main launcher activity. */
  launcherActivity?: LauncherActivityIntent;
}

export const RoboStartingIntent: Schema.Schema<RoboStartingIntent> =
  Schema.suspend(() =>
    Schema.Struct({
      startActivity: Schema.optional(StartActivityIntent),
      timeout: Schema.optional(Schema.String),
      noActivity: Schema.optional(NoActivityIntent),
      launcherActivity: Schema.optional(LauncherActivityIntent),
    }),
  ).annotate({
    identifier: "RoboStartingIntent",
  }) as any as Schema.Schema<RoboStartingIntent>;

export interface GoogleAuto {}

export const GoogleAuto: Schema.Schema<GoogleAuto> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "GoogleAuto" }) as any as Schema.Schema<GoogleAuto>;

export interface Account {
  /** An automatic google login account. */
  googleAuto?: GoogleAuto;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() =>
  Schema.Struct({
    googleAuto: Schema.optional(GoogleAuto),
  }),
).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface Testing_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
}

export const Testing_Date: Schema.Schema<Testing_Date> = Schema.suspend(() =>
  Schema.Struct({
    year: Schema.optional(Schema.Number),
    day: Schema.optional(Schema.Number),
    month: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "Testing_Date",
}) as any as Schema.Schema<Testing_Date>;

export interface DeviceIpBlock {
  /** The date this block was added to Firebase Test Lab */
  addedDate?: Testing_Date;
  /** An IP address block in CIDR notation eg: 34.68.194.64/29 */
  block?: string;
  /** Whether this block is used by physical or virtual devices */
  form?:
    | "DEVICE_FORM_UNSPECIFIED"
    | "VIRTUAL"
    | "PHYSICAL"
    | "EMULATOR"
    | (string & {});
}

export const DeviceIpBlock: Schema.Schema<DeviceIpBlock> = Schema.suspend(() =>
  Schema.Struct({
    addedDate: Schema.optional(Testing_Date),
    block: Schema.optional(Schema.String),
    form: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DeviceIpBlock",
}) as any as Schema.Schema<DeviceIpBlock>;

export interface DeviceIpBlockCatalog {
  /** The device IP blocks used by Firebase Test Lab */
  ipBlocks?: Array<DeviceIpBlock>;
}

export const DeviceIpBlockCatalog: Schema.Schema<DeviceIpBlockCatalog> =
  Schema.suspend(() =>
    Schema.Struct({
      ipBlocks: Schema.optional(Schema.Array(DeviceIpBlock)),
    }),
  ).annotate({
    identifier: "DeviceIpBlockCatalog",
  }) as any as Schema.Schema<DeviceIpBlockCatalog>;

export interface Environment {
  /** An iOS device which must be used with an iOS test. */
  iosDevice?: IosDevice;
  /** An Android device which must be used with an Android test. */
  androidDevice?: AndroidDevice;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() =>
  Schema.Struct({
    iosDevice: Schema.optional(IosDevice),
    androidDevice: Schema.optional(AndroidDevice),
  }),
).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface TestDetails {
  /** Output only. If the TestState is ERROR, then this string will contain human-readable details about the error. */
  errorMessage?: string;
  /** Output only. Human-readable, detailed descriptions of the test's progress. For example: "Provisioning a device", "Starting Test". During the course of execution new data may be appended to the end of progress_messages. */
  progressMessages?: Array<string>;
}

export const TestDetails: Schema.Schema<TestDetails> = Schema.suspend(() =>
  Schema.Struct({
    errorMessage: Schema.optional(Schema.String),
    progressMessages: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "TestDetails" }) as any as Schema.Schema<TestDetails>;

export interface SystraceSetup {
  /** Systrace duration in seconds. Should be between 1 and 30 seconds. 0 disables systrace. */
  durationSeconds?: number;
}

export const SystraceSetup: Schema.Schema<SystraceSetup> = Schema.suspend(() =>
  Schema.Struct({
    durationSeconds: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "SystraceSetup",
}) as any as Schema.Schema<SystraceSetup>;

export interface Apk {
  /** The path to an APK to be installed on the device before the test begins. */
  location?: FileReference;
  /** The java package for the APK to be installed. Value is determined by examining the application's manifest. */
  packageName?: string;
}

export const Apk: Schema.Schema<Apk> = Schema.suspend(() =>
  Schema.Struct({
    location: Schema.optional(FileReference),
    packageName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Apk" }) as any as Schema.Schema<Apk>;

export interface ObbFile {
  /** Required. OBB file name which must conform to the format as specified by Android e.g. [main|patch].0300110.com.example.android.obb which will be installed into \/Android/obb/\/ on the device. */
  obbFileName?: string;
  /** Required. Opaque Binary Blob (OBB) file(s) to install on the device. */
  obb?: FileReference;
}

export const ObbFile: Schema.Schema<ObbFile> = Schema.suspend(() =>
  Schema.Struct({
    obbFileName: Schema.optional(Schema.String),
    obb: Schema.optional(FileReference),
  }),
).annotate({ identifier: "ObbFile" }) as any as Schema.Schema<ObbFile>;

export interface RegularFile {
  /** Required. The source file. */
  content?: FileReference;
  /** Required. Where to put the content on the device. Must be an absolute, allowlisted path. If the file exists, it will be replaced. The following device-side directories and any of their subdirectories are allowlisted: ${EXTERNAL_STORAGE}, /sdcard ${ANDROID_DATA}/local/tmp, or /data/local/tmp Specifying a path outside of these directory trees is invalid. The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device and copy the file there. It is strongly advised to use the Environment API in app and test code to access files on the device in a portable way. */
  devicePath?: string;
}

export const RegularFile: Schema.Schema<RegularFile> = Schema.suspend(() =>
  Schema.Struct({
    content: Schema.optional(FileReference),
    devicePath: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "RegularFile" }) as any as Schema.Schema<RegularFile>;

export interface DeviceFile {
  /** A reference to an opaque binary blob file. */
  obbFile?: ObbFile;
  /** A reference to a regular file. */
  regularFile?: RegularFile;
}

export const DeviceFile: Schema.Schema<DeviceFile> = Schema.suspend(() =>
  Schema.Struct({
    obbFile: Schema.optional(ObbFile),
    regularFile: Schema.optional(RegularFile),
  }),
).annotate({ identifier: "DeviceFile" }) as any as Schema.Schema<DeviceFile>;

export interface TestSetup {
  /** Systrace configuration for the run. Deprecated: Systrace used Python 2 which was sunsetted on 2020-01-01. Systrace is no longer supported in the Cloud Testing API, and no Systrace file will be provided in the results. */
  systrace?: SystraceSetup;
  /** The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog. */
  networkProfile?: string;
  /** Whether to prevent all runtime permissions to be granted at app install */
  dontAutograntPermissions?: boolean;
  /** Optional. Initial setup APKs to install before the app under test is installed. Limited to a combined total of 100 initial setup and additional files. */
  initialSetupApks?: Array<Apk>;
  /** List of files to push to the device before starting the test. */
  filesToPush?: Array<DeviceFile>;
  /** The device will be logged in on this account for the duration of the test. */
  account?: Account;
  /** Environment variables to set for the test (only applicable for instrumentation tests). */
  environmentVariables?: Array<EnvironmentVariable>;
  /** List of directories on the device to upload to GCS at the end of the test; they must be absolute paths under /sdcard, /storage or /data/local/tmp. Path names are restricted to characters a-z A-Z 0-9 _ - . + and / Note: The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device. */
  directoriesToPull?: Array<string>;
  /** APKs to install in addition to those being directly tested. These will be installed after the app under test. Limited to a combined total of 100 initial setup and additional files. */
  additionalApks?: Array<Apk>;
}

export const TestSetup: Schema.Schema<TestSetup> = Schema.suspend(() =>
  Schema.Struct({
    systrace: Schema.optional(SystraceSetup),
    networkProfile: Schema.optional(Schema.String),
    dontAutograntPermissions: Schema.optional(Schema.Boolean),
    initialSetupApks: Schema.optional(Schema.Array(Apk)),
    filesToPush: Schema.optional(Schema.Array(DeviceFile)),
    account: Schema.optional(Account),
    environmentVariables: Schema.optional(Schema.Array(EnvironmentVariable)),
    directoriesToPull: Schema.optional(Schema.Array(Schema.String)),
    additionalApks: Schema.optional(Schema.Array(Apk)),
  }),
).annotate({ identifier: "TestSetup" }) as any as Schema.Schema<TestSetup>;

export interface IosXcTest {
  /** Required. The .zip containing the .xctestrun file and the contents of the DerivedData/Build/Products directory. The .xctestrun file in this zip is ignored if the xctestrun field is specified. */
  testsZip?: FileReference;
  /** The Xcode version that should be used for the test. Use the TestEnvironmentDiscoveryService to get supported options. Defaults to the latest Xcode version Firebase Test Lab supports. */
  xcodeVersion?: string;
  /** An .xctestrun file that will override the .xctestrun file in the tests zip. Because the .xctestrun file contains environment variables along with test methods to run and/or ignore, this can be useful for sharding tests. Default is taken from the tests zip. */
  xctestrun?: FileReference;
  /** Output only. The bundle id for the application under test. */
  appBundleId?: string;
  /** The option to test special app entitlements. Setting this would re-sign the app having special entitlements with an explicit application-identifier. Currently supports testing aps-environment entitlement. */
  testSpecialEntitlements?: boolean;
}

export const IosXcTest: Schema.Schema<IosXcTest> = Schema.suspend(() =>
  Schema.Struct({
    testsZip: Schema.optional(FileReference),
    xcodeVersion: Schema.optional(Schema.String),
    xctestrun: Schema.optional(FileReference),
    appBundleId: Schema.optional(Schema.String),
    testSpecialEntitlements: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "IosXcTest" }) as any as Schema.Schema<IosXcTest>;

export interface ApkSplits {
  /** A list of .apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks. */
  bundleSplits?: Array<FileReference>;
}

export const ApkSplits: Schema.Schema<ApkSplits> = Schema.suspend(() =>
  Schema.Struct({
    bundleSplits: Schema.optional(Schema.Array(FileReference)),
  }),
).annotate({ identifier: "ApkSplits" }) as any as Schema.Schema<ApkSplits>;

export interface AppBundle {
  /** .aab file representing the app bundle under test. */
  bundleLocation?: FileReference;
  /** .apk files generated by bundletool to install as a single android app. */
  apks?: ApkSplits;
}

export const AppBundle: Schema.Schema<AppBundle> = Schema.suspend(() =>
  Schema.Struct({
    bundleLocation: Schema.optional(FileReference),
    apks: Schema.optional(ApkSplits),
  }),
).annotate({ identifier: "AppBundle" }) as any as Schema.Schema<AppBundle>;

export interface AndroidTestLoop {
  /** The APK for the application under test. */
  appApk?: FileReference;
  /** The java package for the application under test. The default is determined by examining the application's manifest. */
  appPackageId?: string;
  /** A multi-apk app bundle for the application under test. */
  appBundle?: AppBundle;
  /** The list of scenarios that should be run during the test. The default is all test loops, derived from the application's manifest. */
  scenarios?: Array<number>;
  /** The list of scenario labels that should be run during the test. The scenario labels should map to labels defined in the application's manifest. For example, player_experience and com.google.test.loops.player_experience add all of the loops labeled in the manifest with the com.google.test.loops.player_experience name to the execution. Scenarios can also be specified in the scenarios field. */
  scenarioLabels?: Array<string>;
}

export const AndroidTestLoop: Schema.Schema<AndroidTestLoop> = Schema.suspend(
  () =>
    Schema.Struct({
      appApk: Schema.optional(FileReference),
      appPackageId: Schema.optional(Schema.String),
      appBundle: Schema.optional(AppBundle),
      scenarios: Schema.optional(Schema.Array(Schema.Number)),
      scenarioLabels: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "AndroidTestLoop",
}) as any as Schema.Schema<AndroidTestLoop>;

export interface UniformSharding {
  /** Required. The total number of shards to create. This must always be a positive number that is no greater than the total number of test cases. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500. */
  numShards?: number;
}

export const UniformSharding: Schema.Schema<UniformSharding> = Schema.suspend(
  () =>
    Schema.Struct({
      numShards: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "UniformSharding",
}) as any as Schema.Schema<UniformSharding>;

export interface ManualSharding {
  /** Required. Group of packages, classes, and/or test methods to be run for each manually-created shard. You must specify at least one shard if this field is present. When you select one or more physical devices, the number of repeated test_targets_for_shard must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500. */
  testTargetsForShard?: Array<TestTargetsForShard>;
}

export const ManualSharding: Schema.Schema<ManualSharding> = Schema.suspend(
  () =>
    Schema.Struct({
      testTargetsForShard: Schema.optional(Schema.Array(TestTargetsForShard)),
    }),
).annotate({
  identifier: "ManualSharding",
}) as any as Schema.Schema<ManualSharding>;

export interface ShardingOption {
  /** Uniformly shards test cases given a total number of shards. */
  uniformSharding?: UniformSharding;
  /** Shards test based on previous test case timing records. */
  smartSharding?: SmartSharding;
  /** Shards test cases into the specified groups of packages, classes, and/or methods. */
  manualSharding?: ManualSharding;
}

export const ShardingOption: Schema.Schema<ShardingOption> = Schema.suspend(
  () =>
    Schema.Struct({
      uniformSharding: Schema.optional(UniformSharding),
      smartSharding: Schema.optional(SmartSharding),
      manualSharding: Schema.optional(ManualSharding),
    }),
).annotate({
  identifier: "ShardingOption",
}) as any as Schema.Schema<ShardingOption>;

export interface AndroidInstrumentationTest {
  /** The option of whether running each test within its own invocation of instrumentation with Android Test Orchestrator or not. ** Orchestrator is only compatible with AndroidJUnitRunner version 1.1 or higher! ** Orchestrator offers the following benefits: - No shared state - Crashes are isolated - Logs are scoped per test See for more information about Android Test Orchestrator. If not set, the test will be run without the orchestrator. */
  orchestratorOption?:
    | "ORCHESTRATOR_OPTION_UNSPECIFIED"
    | "USE_ORCHESTRATOR"
    | "DO_NOT_USE_ORCHESTRATOR"
    | (string & {});
  /** A multi-apk app bundle for the application under test. */
  appBundle?: AppBundle;
  /** The java package for the application under test. The default value is determined by examining the application's manifest. */
  appPackageId?: string;
  /** Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run. */
  testTargets?: Array<string>;
  /** The APK for the application under test. */
  appApk?: FileReference;
  /** The InstrumentationTestRunner class. The default value is determined by examining the application's manifest. */
  testRunnerClass?: string;
  /** The option to run tests in multiple shards in parallel. */
  shardingOption?: ShardingOption;
  /** Required. The APK containing the test code to be executed. */
  testApk?: FileReference;
  /** The java package for the test to be executed. The default value is determined by examining the application's manifest. */
  testPackageId?: string;
}

export const AndroidInstrumentationTest: Schema.Schema<AndroidInstrumentationTest> =
  Schema.suspend(() =>
    Schema.Struct({
      orchestratorOption: Schema.optional(Schema.String),
      appBundle: Schema.optional(AppBundle),
      appPackageId: Schema.optional(Schema.String),
      testTargets: Schema.optional(Schema.Array(Schema.String)),
      appApk: Schema.optional(FileReference),
      testRunnerClass: Schema.optional(Schema.String),
      shardingOption: Schema.optional(ShardingOption),
      testApk: Schema.optional(FileReference),
      testPackageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AndroidInstrumentationTest",
  }) as any as Schema.Schema<AndroidInstrumentationTest>;

export interface RoboDirective {
  /** The text that Robo is directed to set. If left empty, the directive will be treated as a CLICK on the element matching the resource_name. */
  inputText?: string;
  /** Required. The type of action that Robo should perform on the specified element. */
  actionType?:
    | "ACTION_TYPE_UNSPECIFIED"
    | "SINGLE_CLICK"
    | "ENTER_TEXT"
    | "IGNORE"
    | (string & {});
  /** Required. The android resource name of the target UI element. For example, in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed. Reference doc: https://developer.android.com/guide/topics/resources/accessing-resources.html */
  resourceName?: string;
}

export const RoboDirective: Schema.Schema<RoboDirective> = Schema.suspend(() =>
  Schema.Struct({
    inputText: Schema.optional(Schema.String),
    actionType: Schema.optional(Schema.String),
    resourceName: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "RoboDirective",
}) as any as Schema.Schema<RoboDirective>;

export interface AndroidRoboTest {
  /** The max number of steps Robo can execute. Default is no limit. */
  maxSteps?: number;
  /** The intents used to launch the app for the crawl. If none are provided, then the main launcher activity is launched. If some are provided, then only those provided are launched (the main launcher activity must be provided explicitly). */
  startingIntents?: Array<RoboStartingIntent>;
  /** The initial activity that should be used to start the app. */
  appInitialActivity?: string;
  /** A JSON file with a sequence of actions Robo should perform as a prologue for the crawl. */
  roboScript?: FileReference;
  /** A multi-apk app bundle for the application under test. */
  appBundle?: AppBundle;
  /** The APK for the application under test. */
  appApk?: FileReference;
  /** A set of directives Robo should apply during the crawl. This allows users to customize the crawl. For example, the username and password for a test account can be provided. */
  roboDirectives?: Array<RoboDirective>;
  /** The mode in which Robo should run. Most clients should allow the server to populate this field automatically. */
  roboMode?:
    | "ROBO_MODE_UNSPECIFIED"
    | "ROBO_VERSION_1"
    | "ROBO_VERSION_2"
    | (string & {});
  /** The java package for the application under test. The default value is determined by examining the application's manifest. */
  appPackageId?: string;
  /** The max depth of the traversal stack Robo can explore. Needs to be at least 2 to make Robo explore the app beyond the first activity. Default is 50. */
  maxDepth?: number;
}

export const AndroidRoboTest: Schema.Schema<AndroidRoboTest> = Schema.suspend(
  () =>
    Schema.Struct({
      maxSteps: Schema.optional(Schema.Number),
      startingIntents: Schema.optional(Schema.Array(RoboStartingIntent)),
      appInitialActivity: Schema.optional(Schema.String),
      roboScript: Schema.optional(FileReference),
      appBundle: Schema.optional(AppBundle),
      appApk: Schema.optional(FileReference),
      roboDirectives: Schema.optional(Schema.Array(RoboDirective)),
      roboMode: Schema.optional(Schema.String),
      appPackageId: Schema.optional(Schema.String),
      maxDepth: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "AndroidRoboTest",
}) as any as Schema.Schema<AndroidRoboTest>;

export interface IosRoboTest {
  /** Required. The ipa stored at this file should be used to run the test. */
  appIpa?: FileReference;
  /** The bundle ID for the app-under-test. This is determined by examining the application's "Info.plist" file. */
  appBundleId?: string;
  /** An optional Roboscript to customize the crawl. See https://firebase.google.com/docs/test-lab/android/robo-scripts-reference for more information about Roboscripts. The maximum allowed file size of the roboscript is 10MiB. */
  roboScript?: FileReference;
}

export const IosRoboTest: Schema.Schema<IosRoboTest> = Schema.suspend(() =>
  Schema.Struct({
    appIpa: Schema.optional(FileReference),
    appBundleId: Schema.optional(Schema.String),
    roboScript: Schema.optional(FileReference),
  }),
).annotate({ identifier: "IosRoboTest" }) as any as Schema.Schema<IosRoboTest>;

export interface TestSpecification {
  /** Test setup requirements for iOS. */
  iosTestSetup?: IosTestSetup;
  /** Test setup requirements for Android e.g. files to install, bootstrap scripts. */
  testSetup?: TestSetup;
  /** An iOS XCTest, via an .xctestrun file. */
  iosXcTest?: IosXcTest;
  /** An Android Application with a Test Loop. */
  androidTestLoop?: AndroidTestLoop;
  /** Disables performance metrics recording. May reduce test latency. */
  disablePerformanceMetrics?: boolean;
  /** An Android instrumentation test. */
  androidInstrumentationTest?: AndroidInstrumentationTest;
  /** An Android robo test. */
  androidRoboTest?: AndroidRoboTest;
  /** An iOS application with a test loop. */
  iosTestLoop?: IosTestLoop;
  /** Max time a test execution is allowed to run before it is automatically cancelled. The default value is 5 min. */
  testTimeout?: string;
  /** An iOS Robo test. */
  iosRoboTest?: IosRoboTest;
  /** Disables video recording. May reduce test latency. */
  disableVideoRecording?: boolean;
}

export const TestSpecification: Schema.Schema<TestSpecification> =
  Schema.suspend(() =>
    Schema.Struct({
      iosTestSetup: Schema.optional(IosTestSetup),
      testSetup: Schema.optional(TestSetup),
      iosXcTest: Schema.optional(IosXcTest),
      androidTestLoop: Schema.optional(AndroidTestLoop),
      disablePerformanceMetrics: Schema.optional(Schema.Boolean),
      androidInstrumentationTest: Schema.optional(AndroidInstrumentationTest),
      androidRoboTest: Schema.optional(AndroidRoboTest),
      iosTestLoop: Schema.optional(IosTestLoop),
      testTimeout: Schema.optional(Schema.String),
      iosRoboTest: Schema.optional(IosRoboTest),
      disableVideoRecording: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "TestSpecification",
  }) as any as Schema.Schema<TestSpecification>;

export interface ToolResultsStep {
  /** Output only. A tool results step ID. */
  stepId?: string;
  /** Output only. A tool results history ID. */
  historyId?: string;
  /** Output only. The cloud project that owns the tool results step. */
  projectId?: string;
  /** Output only. A tool results execution ID. */
  executionId?: string;
}

export const ToolResultsStep: Schema.Schema<ToolResultsStep> = Schema.suspend(
  () =>
    Schema.Struct({
      stepId: Schema.optional(Schema.String),
      historyId: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      executionId: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ToolResultsStep",
}) as any as Schema.Schema<ToolResultsStep>;

export interface Shard {
  /** Output only. The index of the shard among all the shards. */
  shardIndex?: number;
  /** Output only. The total number of shards. */
  numShards?: number;
  /** Output only. The estimated shard duration based on previous test case timing records, if available. */
  estimatedShardDuration?: string;
  /** Output only. Test targets for each shard. Only set for manual sharding. */
  testTargetsForShard?: TestTargetsForShard;
}

export const Shard: Schema.Schema<Shard> = Schema.suspend(() =>
  Schema.Struct({
    shardIndex: Schema.optional(Schema.Number),
    numShards: Schema.optional(Schema.Number),
    estimatedShardDuration: Schema.optional(Schema.String),
    testTargetsForShard: Schema.optional(TestTargetsForShard),
  }),
).annotate({ identifier: "Shard" }) as any as Schema.Schema<Shard>;

export interface TestExecution {
  /** Output only. The time this test execution was initially created. */
  timestamp?: string;
  /** Output only. The cloud project that owns the test execution. */
  projectId?: string;
  /** Output only. How the host machine(s) are configured. */
  environment?: Environment;
  /** Output only. Additional details about the running test. */
  testDetails?: TestDetails;
  /** Output only. Unique id set by the service. */
  id?: string;
  /** Output only. How to run the test. */
  testSpecification?: TestSpecification;
  /** Output only. Where the results for this execution are written. */
  toolResultsStep?: ToolResultsStep;
  /** Output only. Id of the containing TestMatrix. */
  matrixId?: string;
  /** Output only. Details about the shard. */
  shard?: Shard;
  /** Output only. Indicates the current progress of the test execution (e.g., FINISHED). */
  state?:
    | "TEST_STATE_UNSPECIFIED"
    | "VALIDATING"
    | "PENDING"
    | "RUNNING"
    | "FINISHED"
    | "ERROR"
    | "UNSUPPORTED_ENVIRONMENT"
    | "INCOMPATIBLE_ENVIRONMENT"
    | "INCOMPATIBLE_ARCHITECTURE"
    | "CANCELLED"
    | "INVALID"
    | (string & {});
}

export const TestExecution: Schema.Schema<TestExecution> = Schema.suspend(() =>
  Schema.Struct({
    timestamp: Schema.optional(Schema.String),
    projectId: Schema.optional(Schema.String),
    environment: Schema.optional(Environment),
    testDetails: Schema.optional(TestDetails),
    id: Schema.optional(Schema.String),
    testSpecification: Schema.optional(TestSpecification),
    toolResultsStep: Schema.optional(ToolResultsStep),
    matrixId: Schema.optional(Schema.String),
    shard: Schema.optional(Shard),
    state: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "TestExecution",
}) as any as Schema.Schema<TestExecution>;

export interface MatrixErrorDetail {
  /** Output only. The reason for the error. This is a constant value in UPPER_SNAKE_CASE that identifies the cause of the error. */
  reason?: string;
  /** Output only. A human-readable message about how the error in the TestMatrix. Expands on the `reason` field with additional details and possible options to fix the issue. */
  message?: string;
}

export const MatrixErrorDetail: Schema.Schema<MatrixErrorDetail> =
  Schema.suspend(() =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MatrixErrorDetail",
  }) as any as Schema.Schema<MatrixErrorDetail>;

export interface TestMatrix {
  /** Output only. The time this test matrix was initially created. */
  timestamp?: string;
  /** Output Only. The overall outcome of the test. Only set when the test matrix state is FINISHED. */
  outcomeSummary?:
    | "OUTCOME_SUMMARY_UNSPECIFIED"
    | "SUCCESS"
    | "FAILURE"
    | "INCONCLUSIVE"
    | "SKIPPED"
    | (string & {});
  /** Required. The devices the tests are being executed on. */
  environmentMatrix?: EnvironmentMatrix;
  /** Required. How to run the test. */
  testSpecification?: TestSpecification;
  /** Output only. Unique id set by the service. */
  testMatrixId?: string;
  /** Output only. The list of test executions that the service creates for this matrix. */
  testExecutions?: Array<TestExecution>;
  /** Output only. Indicates the current progress of the test matrix. */
  state?:
    | "TEST_STATE_UNSPECIFIED"
    | "VALIDATING"
    | "PENDING"
    | "RUNNING"
    | "FINISHED"
    | "ERROR"
    | "UNSUPPORTED_ENVIRONMENT"
    | "INCOMPATIBLE_ENVIRONMENT"
    | "INCOMPATIBLE_ARCHITECTURE"
    | "CANCELLED"
    | "INVALID"
    | (string & {});
  /** Output only. Describes why the matrix is considered invalid. Only useful for matrices in the INVALID state. */
  invalidMatrixDetails?:
    | "INVALID_MATRIX_DETAILS_UNSPECIFIED"
    | "DETAILS_UNAVAILABLE"
    | "MALFORMED_APK"
    | "MALFORMED_TEST_APK"
    | "NO_MANIFEST"
    | "NO_PACKAGE_NAME"
    | "INVALID_PACKAGE_NAME"
    | "TEST_SAME_AS_APP"
    | "NO_INSTRUMENTATION"
    | "NO_SIGNATURE"
    | "INSTRUMENTATION_ORCHESTRATOR_INCOMPATIBLE"
    | "NO_TEST_RUNNER_CLASS"
    | "NO_LAUNCHER_ACTIVITY"
    | "FORBIDDEN_PERMISSIONS"
    | "INVALID_ROBO_DIRECTIVES"
    | "INVALID_RESOURCE_NAME"
    | "INVALID_DIRECTIVE_ACTION"
    | "TEST_LOOP_INTENT_FILTER_NOT_FOUND"
    | "SCENARIO_LABEL_NOT_DECLARED"
    | "SCENARIO_LABEL_MALFORMED"
    | "SCENARIO_NOT_DECLARED"
    | "DEVICE_ADMIN_RECEIVER"
    | "MALFORMED_XC_TEST_ZIP"
    | "BUILT_FOR_IOS_SIMULATOR"
    | "NO_TESTS_IN_XC_TEST_ZIP"
    | "USE_DESTINATION_ARTIFACTS"
    | "TEST_NOT_APP_HOSTED"
    | "PLIST_CANNOT_BE_PARSED"
    | "TEST_ONLY_APK"
    | "MALFORMED_IPA"
    | "MISSING_URL_SCHEME"
    | "MALFORMED_APP_BUNDLE"
    | "NO_CODE_APK"
    | "INVALID_INPUT_APK"
    | "INVALID_APK_PREVIEW_SDK"
    | "MATRIX_TOO_LARGE"
    | "TEST_QUOTA_EXCEEDED"
    | "SERVICE_NOT_ACTIVATED"
    | "UNKNOWN_PERMISSION_ERROR"
    | (string & {});
  /** The number of times a TestExecution should be re-attempted if one or more of its test cases fail for any reason. The maximum number of reruns allowed is 10. Default is 0, which implies no reruns. */
  flakyTestAttempts?: number;
  /** The cloud project that owns the test matrix. */
  projectId?: string;
  /** If true, only a single attempt at most will be made to run each execution/shard in the matrix. Flaky test attempts are not affected. Normally, 2 or more attempts are made if a potential infrastructure issue is detected. This feature is for latency sensitive workloads. The incidence of execution failures may be significantly greater for fail-fast matrices and support is more limited because of that expectation. */
  failFast?: boolean;
  /** Required. Where the results for the matrix are written. */
  resultStorage?: ResultStorage;
  /** Output only. Details about why a matrix was deemed invalid. If multiple checks can be safely performed, they will be reported but no assumptions should be made about the length of this list. */
  extendedInvalidMatrixDetails?: Array<MatrixErrorDetail>;
  /** Information about the client which invoked the test. */
  clientInfo?: ClientInfo;
}

export const TestMatrix: Schema.Schema<TestMatrix> = Schema.suspend(() =>
  Schema.Struct({
    timestamp: Schema.optional(Schema.String),
    outcomeSummary: Schema.optional(Schema.String),
    environmentMatrix: Schema.optional(EnvironmentMatrix),
    testSpecification: Schema.optional(TestSpecification),
    testMatrixId: Schema.optional(Schema.String),
    testExecutions: Schema.optional(Schema.Array(TestExecution)),
    state: Schema.optional(Schema.String),
    invalidMatrixDetails: Schema.optional(Schema.String),
    flakyTestAttempts: Schema.optional(Schema.Number),
    projectId: Schema.optional(Schema.String),
    failFast: Schema.optional(Schema.Boolean),
    resultStorage: Schema.optional(ResultStorage),
    extendedInvalidMatrixDetails: Schema.optional(
      Schema.Array(MatrixErrorDetail),
    ),
    clientInfo: Schema.optional(ClientInfo),
  }),
).annotate({ identifier: "TestMatrix" }) as any as Schema.Schema<TestMatrix>;

export interface LabInfo {
  /** The Unicode country/region code (CLDR) of the lab where the device is hosted. E.g. "US" for United States, "CH" for Switzerland. */
  regionCode?: string;
  /** Lab name where the device is hosted. If empty, the device is hosted in a Google owned lab. */
  name?: string;
}

export const LabInfo: Schema.Schema<LabInfo> = Schema.suspend(() =>
  Schema.Struct({
    regionCode: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LabInfo" }) as any as Schema.Schema<LabInfo>;

export interface ProvidedSoftwareCatalog {
  /** Deprecated: Use AndroidX Test Orchestrator going forward. A string representing the current version of Android Test Orchestrator that is used in the environment. The package is available at https://maven.google.com/web/index.html#com.android.support.test:orchestrator. */
  orchestratorVersion?: string;
  /** A string representing the current version of AndroidX Test Orchestrator that is used in the environment. The package is available at https://maven.google.com/web/index.html#androidx.test:orchestrator. */
  androidxOrchestratorVersion?: string;
}

export const ProvidedSoftwareCatalog: Schema.Schema<ProvidedSoftwareCatalog> =
  Schema.suspend(() =>
    Schema.Struct({
      orchestratorVersion: Schema.optional(Schema.String),
      androidxOrchestratorVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProvidedSoftwareCatalog",
  }) as any as Schema.Schema<ProvidedSoftwareCatalog>;

export interface AndroidRuntimeConfiguration {
  /** The set of available locales. */
  locales?: Array<Locale>;
  /** The set of available orientations. */
  orientations?: Array<Orientation>;
}

export const AndroidRuntimeConfiguration: Schema.Schema<AndroidRuntimeConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      locales: Schema.optional(Schema.Array(Locale)),
      orientations: Schema.optional(Schema.Array(Orientation)),
    }),
  ).annotate({
    identifier: "AndroidRuntimeConfiguration",
  }) as any as Schema.Schema<AndroidRuntimeConfiguration>;

export interface Distribution {
  /** Output only. The time this distribution was measured. */
  measurementTime?: string;
  /** Output only. The estimated fraction (0-1) of the total market with this configuration. */
  marketShare?: number;
}

export const Distribution: Schema.Schema<Distribution> = Schema.suspend(() =>
  Schema.Struct({
    measurementTime: Schema.optional(Schema.String),
    marketShare: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "Distribution",
}) as any as Schema.Schema<Distribution>;

export interface AndroidVersion {
  /** An opaque id for this Android version. Use this id to invoke the TestExecutionService. */
  id?: string;
  /** A string representing this version of the Android OS. Examples: "4.3", "4.4". */
  versionString?: string;
  /** The code name for this Android version. Examples: "JellyBean", "KitKat". */
  codeName?: string;
  /** Tags for this dimension. Examples: "default", "preview", "deprecated". */
  tags?: Array<string>;
  /** The API level for this Android version. Examples: 18, 19. */
  apiLevel?: number;
  /** Market share for this version. */
  distribution?: Distribution;
  /** The date this Android version became available in the market. */
  releaseDate?: Testing_Date;
}

export const AndroidVersion: Schema.Schema<AndroidVersion> = Schema.suspend(
  () =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      versionString: Schema.optional(Schema.String),
      codeName: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      apiLevel: Schema.optional(Schema.Number),
      distribution: Schema.optional(Distribution),
      releaseDate: Schema.optional(Testing_Date),
    }),
).annotate({
  identifier: "AndroidVersion",
}) as any as Schema.Schema<AndroidVersion>;

export interface AndroidModel {
  /** URL of a thumbnail image (photo) of the device. */
  thumbnailUrl?: string;
  /** The human-readable marketing name for this device model. Examples: "Nexus 5", "Galaxy S5". */
  name?: string;
  /** The list of supported ABIs for this device. This corresponds to either android.os.Build.SUPPORTED_ABIS (for API level 21 and above) or android.os.Build.CPU_ABI/CPU_ABI2. The most preferred ABI is the first element in the list. Elements are optionally prefixed by "version_id:" (where version_id is the id of an AndroidVersion), denoting an ABI that is supported only on a particular version. */
  supportedAbis?: Array<string>;
  /** Screen size in the horizontal (X) dimension measured in pixels. */
  screenX?: number;
  /** Tags for this dimension. Examples: "default", "preview", "deprecated". */
  tags?: Array<string>;
  /** Output only. Lab info of this device. */
  labInfo?: LabInfo;
  /** The company that this device is branded with. Example: "Google", "Samsung". */
  brand?: string;
  /** True if and only if tests with this model are recorded by stitching together screenshots. See use_low_spec_video_recording in device config. */
  lowFpsVideoRecording?: boolean;
  /** Whether this device is virtual or physical. */
  form?:
    | "DEVICE_FORM_UNSPECIFIED"
    | "VIRTUAL"
    | "PHYSICAL"
    | "EMULATOR"
    | (string & {});
  /** The manufacturer of this device. */
  manufacturer?: string;
  /** The name of the industrial design. This corresponds to android.os.Build.DEVICE. */
  codename?: string;
  /** The set of Android versions this device supports. */
  supportedVersionIds?: Array<string>;
  /** Screen size in the vertical (Y) dimension measured in pixels. */
  screenY?: number;
  /** Whether this device is a phone, tablet, wearable, etc. */
  formFactor?:
    | "DEVICE_FORM_FACTOR_UNSPECIFIED"
    | "PHONE"
    | "TABLET"
    | "WEARABLE"
    | "TV"
    | "AUTOMOTIVE"
    | "DESKTOP"
    | "XR"
    | (string & {});
  /** The unique opaque id for this model. Use this for invoking the TestExecutionService. */
  id?: string;
  /** Version-specific information of an Android model. */
  perVersionInfo?: Array<PerAndroidVersionInfo>;
  /** Reasons for access denial. This model is accessible if this list is empty, otherwise the model is viewable only. */
  accessDeniedReasons?: Array<
    "ACCESS_DENIED_REASON_UNSPECIFIED" | "EULA_NOT_ACCEPTED" | (string & {})
  >;
  /** Screen density in DPI. This corresponds to ro.sf.lcd_density */
  screenDensity?: number;
}

export const AndroidModel: Schema.Schema<AndroidModel> = Schema.suspend(() =>
  Schema.Struct({
    thumbnailUrl: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    supportedAbis: Schema.optional(Schema.Array(Schema.String)),
    screenX: Schema.optional(Schema.Number),
    tags: Schema.optional(Schema.Array(Schema.String)),
    labInfo: Schema.optional(LabInfo),
    brand: Schema.optional(Schema.String),
    lowFpsVideoRecording: Schema.optional(Schema.Boolean),
    form: Schema.optional(Schema.String),
    manufacturer: Schema.optional(Schema.String),
    codename: Schema.optional(Schema.String),
    supportedVersionIds: Schema.optional(Schema.Array(Schema.String)),
    screenY: Schema.optional(Schema.Number),
    formFactor: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    perVersionInfo: Schema.optional(Schema.Array(PerAndroidVersionInfo)),
    accessDeniedReasons: Schema.optional(Schema.Array(Schema.String)),
    screenDensity: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "AndroidModel",
}) as any as Schema.Schema<AndroidModel>;

export interface AndroidDeviceCatalog {
  /** The set of supported runtime configurations. */
  runtimeConfiguration?: AndroidRuntimeConfiguration;
  /** The set of supported Android OS versions. */
  versions?: Array<AndroidVersion>;
  /** The set of supported Android device models. */
  models?: Array<AndroidModel>;
}

export const AndroidDeviceCatalog: Schema.Schema<AndroidDeviceCatalog> =
  Schema.suspend(() =>
    Schema.Struct({
      runtimeConfiguration: Schema.optional(AndroidRuntimeConfiguration),
      versions: Schema.optional(Schema.Array(AndroidVersion)),
      models: Schema.optional(Schema.Array(AndroidModel)),
    }),
  ).annotate({
    identifier: "AndroidDeviceCatalog",
  }) as any as Schema.Schema<AndroidDeviceCatalog>;

export interface PerIosVersionInfo {
  /** An iOS version. */
  versionId?: string;
  /** The number of online devices for an iOS version. */
  deviceCapacity?:
    | "DEVICE_CAPACITY_UNSPECIFIED"
    | "DEVICE_CAPACITY_HIGH"
    | "DEVICE_CAPACITY_MEDIUM"
    | "DEVICE_CAPACITY_LOW"
    | "DEVICE_CAPACITY_NONE"
    | (string & {});
}

export const PerIosVersionInfo: Schema.Schema<PerIosVersionInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      versionId: Schema.optional(Schema.String),
      deviceCapacity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PerIosVersionInfo",
  }) as any as Schema.Schema<PerIosVersionInfo>;

export interface IosModel {
  /** Device capabilities. Copied from https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html */
  deviceCapabilities?: Array<string>;
  /** Screen density in DPI. */
  screenDensity?: number;
  /** Version-specific information of an iOS model. */
  perVersionInfo?: Array<PerIosVersionInfo>;
  /** Tags for this dimension. Examples: "default", "preview", "deprecated". */
  tags?: Array<string>;
  /** Screen size in the horizontal (X) dimension measured in pixels. */
  screenX?: number;
  /** Whether this device is a phone, tablet, wearable, etc. */
  formFactor?:
    | "DEVICE_FORM_FACTOR_UNSPECIFIED"
    | "PHONE"
    | "TABLET"
    | "WEARABLE"
    | "TV"
    | "AUTOMOTIVE"
    | "DESKTOP"
    | "XR"
    | (string & {});
  /** The unique opaque id for this model. Use this for invoking the TestExecutionService. */
  id?: string;
  /** The human-readable name for this device model. Examples: "iPhone 4s", "iPad Mini 2". */
  name?: string;
  /** The set of iOS major software versions this device supports. */
  supportedVersionIds?: Array<string>;
  /** Screen size in the vertical (Y) dimension measured in pixels. */
  screenY?: number;
}

export const IosModel: Schema.Schema<IosModel> = Schema.suspend(() =>
  Schema.Struct({
    deviceCapabilities: Schema.optional(Schema.Array(Schema.String)),
    screenDensity: Schema.optional(Schema.Number),
    perVersionInfo: Schema.optional(Schema.Array(PerIosVersionInfo)),
    tags: Schema.optional(Schema.Array(Schema.String)),
    screenX: Schema.optional(Schema.Number),
    formFactor: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    supportedVersionIds: Schema.optional(Schema.Array(Schema.String)),
    screenY: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "IosModel" }) as any as Schema.Schema<IosModel>;

export interface XcodeVersion {
  /** Tags for this Xcode version. Example: "default". */
  tags?: Array<string>;
  /** The id for this version. Example: "9.2". */
  version?: string;
}

export const XcodeVersion: Schema.Schema<XcodeVersion> = Schema.suspend(() =>
  Schema.Struct({
    tags: Schema.optional(Schema.Array(Schema.String)),
    version: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "XcodeVersion",
}) as any as Schema.Schema<XcodeVersion>;

export interface IosDeviceCatalog {
  /** The set of supported runtime configurations. */
  runtimeConfiguration?: IosRuntimeConfiguration;
  /** The set of supported iOS software versions. */
  versions?: Array<IosVersion>;
  /** The set of supported iOS device models. */
  models?: Array<IosModel>;
  /** The set of supported Xcode versions. */
  xcodeVersions?: Array<XcodeVersion>;
}

export const IosDeviceCatalog: Schema.Schema<IosDeviceCatalog> = Schema.suspend(
  () =>
    Schema.Struct({
      runtimeConfiguration: Schema.optional(IosRuntimeConfiguration),
      versions: Schema.optional(Schema.Array(IosVersion)),
      models: Schema.optional(Schema.Array(IosModel)),
      xcodeVersions: Schema.optional(Schema.Array(XcodeVersion)),
    }),
).annotate({
  identifier: "IosDeviceCatalog",
}) as any as Schema.Schema<IosDeviceCatalog>;

export interface TestEnvironmentCatalog {
  /** The software test environment provided by TestExecutionService. */
  softwareCatalog?: ProvidedSoftwareCatalog;
  /** Supported Android devices. */
  androidDeviceCatalog?: AndroidDeviceCatalog;
  /** The IP blocks used by devices in the test environment. */
  deviceIpBlockCatalog?: DeviceIpBlockCatalog;
  /** Supported iOS devices. */
  iosDeviceCatalog?: IosDeviceCatalog;
  /** Supported network configurations. */
  networkConfigurationCatalog?: NetworkConfigurationCatalog;
}

export const TestEnvironmentCatalog: Schema.Schema<TestEnvironmentCatalog> =
  Schema.suspend(() =>
    Schema.Struct({
      softwareCatalog: Schema.optional(ProvidedSoftwareCatalog),
      androidDeviceCatalog: Schema.optional(AndroidDeviceCatalog),
      deviceIpBlockCatalog: Schema.optional(DeviceIpBlockCatalog),
      iosDeviceCatalog: Schema.optional(IosDeviceCatalog),
      networkConfigurationCatalog: Schema.optional(NetworkConfigurationCatalog),
    }),
  ).annotate({
    identifier: "TestEnvironmentCatalog",
  }) as any as Schema.Schema<TestEnvironmentCatalog>;

export interface CancelTestMatrixResponse {
  /** The current rolled-up state of the test matrix. If this state is already final, then the cancelation request will have no effect. */
  testState?:
    | "TEST_STATE_UNSPECIFIED"
    | "VALIDATING"
    | "PENDING"
    | "RUNNING"
    | "FINISHED"
    | "ERROR"
    | "UNSUPPORTED_ENVIRONMENT"
    | "INCOMPATIBLE_ENVIRONMENT"
    | "INCOMPATIBLE_ARCHITECTURE"
    | "CANCELLED"
    | "INVALID"
    | (string & {});
}

export const CancelTestMatrixResponse: Schema.Schema<CancelTestMatrixResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      testState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CancelTestMatrixResponse",
  }) as any as Schema.Schema<CancelTestMatrixResponse>;

export interface GetApkDetailsResponse {
  /** Details of the Android App. */
  apkDetail?: ApkDetail;
}

export const GetApkDetailsResponse: Schema.Schema<GetApkDetailsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      apkDetail: Schema.optional(ApkDetail),
    }),
  ).annotate({
    identifier: "GetApkDetailsResponse",
  }) as any as Schema.Schema<GetApkDetailsResponse>;

export interface CancelDeviceSessionRequest {}

export const CancelDeviceSessionRequest: Schema.Schema<CancelDeviceSessionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelDeviceSessionRequest",
  }) as any as Schema.Schema<CancelDeviceSessionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateProjectsTestMatricesRequest {
  /** A string id used to detect duplicated requests. Ids are automatically scoped to a project, so users should ensure the ID is unique per-project. A UUID is recommended. Optional, but strongly recommended. */
  requestId?: string;
  /** The GCE project under which this job will run. */
  projectId: string;
  /** Request body */
  body?: TestMatrix;
}

export const CreateProjectsTestMatricesRequest = Schema.Struct({
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(TestMatrix).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectId}/testMatrices",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTestMatricesRequest>;

export type CreateProjectsTestMatricesResponse = TestMatrix;
export const CreateProjectsTestMatricesResponse = TestMatrix;

export type CreateProjectsTestMatricesError = DefaultErrors;

/** Creates and runs a matrix of tests according to the given specifications. Unsupported environments will be returned in the state UNSUPPORTED. A test matrix is limited to use at most 2000 devices in parallel. The returned matrix will not yet contain the executions that will be created for this matrix. Execution creation happens later on and will require a call to GetTestMatrix. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to write to project - INVALID_ARGUMENT - if the request is malformed or if the matrix tries to use too many simultaneous devices. */
export const createProjectsTestMatrices: API.OperationMethod<
  CreateProjectsTestMatricesRequest,
  CreateProjectsTestMatricesResponse,
  CreateProjectsTestMatricesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsTestMatricesRequest,
  output: CreateProjectsTestMatricesResponse,
  errors: [],
}));

export interface GetProjectsTestMatricesRequest {
  /** Cloud project that owns the test matrix. */
  projectId: string;
  /** Unique test matrix id which was assigned by the service. */
  testMatrixId: string;
}

export const GetProjectsTestMatricesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  testMatrixId: Schema.String.pipe(T.HttpPath("testMatrixId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectId}/testMatrices/{testMatrixId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsTestMatricesRequest>;

export type GetProjectsTestMatricesResponse = TestMatrix;
export const GetProjectsTestMatricesResponse = TestMatrix;

export type GetProjectsTestMatricesError = DefaultErrors;

/** Checks the status of a test matrix and the executions once they are created. The test matrix will contain the list of test executions to run if and only if the resultStorage.toolResultsExecution fields have been populated. Note: Flaky test executions may be added to the matrix at a later stage. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Test Matrix does not exist */
export const getProjectsTestMatrices: API.OperationMethod<
  GetProjectsTestMatricesRequest,
  GetProjectsTestMatricesResponse,
  GetProjectsTestMatricesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsTestMatricesRequest,
  output: GetProjectsTestMatricesResponse,
  errors: [],
}));

export interface CancelProjectsTestMatricesRequest {
  /** Cloud project that owns the test. */
  projectId: string;
  /** Test matrix that will be canceled. */
  testMatrixId: string;
}

export const CancelProjectsTestMatricesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  testMatrixId: Schema.String.pipe(T.HttpPath("testMatrixId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectId}/testMatrices/{testMatrixId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsTestMatricesRequest>;

export type CancelProjectsTestMatricesResponse = CancelTestMatrixResponse;
export const CancelProjectsTestMatricesResponse = CancelTestMatrixResponse;

export type CancelProjectsTestMatricesError = DefaultErrors;

/** Cancels unfinished test executions in a test matrix. This call returns immediately and cancellation proceeds asynchronously. If the matrix is already final, this operation will have no effect. May return any of the following canonical error codes: - PERMISSION_DENIED - if the user is not authorized to read project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Test Matrix does not exist */
export const cancelProjectsTestMatrices: API.OperationMethod<
  CancelProjectsTestMatricesRequest,
  CancelProjectsTestMatricesResponse,
  CancelProjectsTestMatricesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsTestMatricesRequest,
  output: CancelProjectsTestMatricesResponse,
  errors: [],
}));

export interface ListProjectsDeviceSessionsRequest {
  /** Optional. If specified, responses will be filtered by the given filter. Allowed fields are: session_state. */
  filter?: string;
  /** Required. The name of the parent to request, e.g. "projects/{project_id}" */
  parent: string;
  /** Optional. A continuation token for paging. */
  pageToken?: string;
  /** Optional. The maximum number of DeviceSessions to return. */
  pageSize?: number;
}

export const ListProjectsDeviceSessionsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/deviceSessions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsDeviceSessionsRequest>;

export type ListProjectsDeviceSessionsResponse = ListDeviceSessionsResponse;
export const ListProjectsDeviceSessionsResponse = ListDeviceSessionsResponse;

export type ListProjectsDeviceSessionsError = DefaultErrors;

/** GET /v1/projects/{project_id}/deviceSessions Lists device Sessions owned by the project user. */
export const listProjectsDeviceSessions: API.PaginatedOperationMethod<
  ListProjectsDeviceSessionsRequest,
  ListProjectsDeviceSessionsResponse,
  ListProjectsDeviceSessionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDeviceSessionsRequest,
  output: ListProjectsDeviceSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsDeviceSessionsRequest {
  /** Required. The Compute Engine project under which this device will be allocated. "projects/{project_id}" */
  parent: string;
  /** Request body */
  body?: DeviceSession;
}

export const CreateProjectsDeviceSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DeviceSession).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/deviceSessions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDeviceSessionsRequest>;

export type CreateProjectsDeviceSessionsResponse = DeviceSession;
export const CreateProjectsDeviceSessionsResponse = DeviceSession;

export type CreateProjectsDeviceSessionsError = DefaultErrors;

/** POST /v1/projects/{project_id}/deviceSessions */
export const createProjectsDeviceSessions: API.OperationMethod<
  CreateProjectsDeviceSessionsRequest,
  CreateProjectsDeviceSessionsResponse,
  CreateProjectsDeviceSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsDeviceSessionsRequest,
  output: CreateProjectsDeviceSessionsResponse,
  errors: [],
}));

export interface GetProjectsDeviceSessionsRequest {
  /** Required. Name of the DeviceSession, e.g. "projects/{project_id}/deviceSessions/{session_id}" */
  name: string;
}

export const GetProjectsDeviceSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/projects/{projectsId}/deviceSessions/{deviceSessionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDeviceSessionsRequest>;

export type GetProjectsDeviceSessionsResponse = DeviceSession;
export const GetProjectsDeviceSessionsResponse = DeviceSession;

export type GetProjectsDeviceSessionsError = DefaultErrors;

/** GET /v1/projects/{project_id}/deviceSessions/{device_session_id} Return a DeviceSession, which documents the allocation status and whether the device is allocated. Clients making requests from this API must poll GetDeviceSession. */
export const getProjectsDeviceSessions: API.OperationMethod<
  GetProjectsDeviceSessionsRequest,
  GetProjectsDeviceSessionsResponse,
  GetProjectsDeviceSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDeviceSessionsRequest,
  output: GetProjectsDeviceSessionsResponse,
  errors: [],
}));

export interface CancelProjectsDeviceSessionsRequest {
  /** Required. Name of the DeviceSession, e.g. "projects/{project_id}/deviceSessions/{session_id}" */
  name: string;
  /** Request body */
  body?: CancelDeviceSessionRequest;
}

export const CancelProjectsDeviceSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelDeviceSessionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/projects/{projectsId}/deviceSessions/{deviceSessionsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsDeviceSessionsRequest>;

export type CancelProjectsDeviceSessionsResponse = Empty;
export const CancelProjectsDeviceSessionsResponse = Empty;

export type CancelProjectsDeviceSessionsError = DefaultErrors;

/** POST /v1/projects/{project_id}/deviceSessions/{device_session_id}:cancel Changes the DeviceSession to state FINISHED and terminates all connections. Canceled sessions are not deleted and can be retrieved or listed by the user until they expire based on the 28 day deletion policy. */
export const cancelProjectsDeviceSessions: API.OperationMethod<
  CancelProjectsDeviceSessionsRequest,
  CancelProjectsDeviceSessionsResponse,
  CancelProjectsDeviceSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsDeviceSessionsRequest,
  output: CancelProjectsDeviceSessionsResponse,
  errors: [],
}));

export interface PatchProjectsDeviceSessionsRequest {
  /** Optional. Name of the DeviceSession, e.g. "projects/{project_id}/deviceSessions/{session_id}" */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: DeviceSession;
}

export const PatchProjectsDeviceSessionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DeviceSession).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1/projects/{projectsId}/deviceSessions/{deviceSessionsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDeviceSessionsRequest>;

export type PatchProjectsDeviceSessionsResponse = DeviceSession;
export const PatchProjectsDeviceSessionsResponse = DeviceSession;

export type PatchProjectsDeviceSessionsError = DefaultErrors;

/** PATCH /v1/projects/{projectId}/deviceSessions/deviceSessionId}:updateDeviceSession Updates the current device session to the fields described by the update_mask. */
export const patchProjectsDeviceSessions: API.OperationMethod<
  PatchProjectsDeviceSessionsRequest,
  PatchProjectsDeviceSessionsResponse,
  PatchProjectsDeviceSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsDeviceSessionsRequest,
  output: PatchProjectsDeviceSessionsResponse,
  errors: [],
}));

export interface GetApkDetailsApplicationDetailServiceRequest {
  /** A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding) */
  "bundleLocation.gcsPath"?: string;
  /** Request body */
  body?: FileReference;
}

export const GetApkDetailsApplicationDetailServiceRequest = Schema.Struct({
  "bundleLocation.gcsPath": Schema.optional(Schema.String).pipe(
    T.HttpQuery("bundleLocation.gcsPath"),
  ),
  body: Schema.optional(FileReference).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/applicationDetailService/getApkDetails",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetApkDetailsApplicationDetailServiceRequest>;

export type GetApkDetailsApplicationDetailServiceResponse =
  GetApkDetailsResponse;
export const GetApkDetailsApplicationDetailServiceResponse =
  GetApkDetailsResponse;

export type GetApkDetailsApplicationDetailServiceError = DefaultErrors;

/** Gets the details of an Android application APK. */
export const getApkDetailsApplicationDetailService: API.OperationMethod<
  GetApkDetailsApplicationDetailServiceRequest,
  GetApkDetailsApplicationDetailServiceResponse,
  GetApkDetailsApplicationDetailServiceError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetApkDetailsApplicationDetailServiceRequest,
  output: GetApkDetailsApplicationDetailServiceResponse,
  errors: [],
}));

export interface GetTestEnvironmentCatalogRequest {
  /** For authorization, the cloud project requesting the TestEnvironmentCatalog. */
  projectId?: string;
  /** Required. The type of environment that should be listed. */
  environmentType:
    | "ENVIRONMENT_TYPE_UNSPECIFIED"
    | "ANDROID"
    | "IOS"
    | "NETWORK_CONFIGURATION"
    | "PROVIDED_SOFTWARE"
    | "DEVICE_IP_BLOCKS"
    | (string & {});
  /** Optional. Whether to include viewable only models in the response. This is only applicable for Android models. */
  includeViewableModels?: boolean;
}

export const GetTestEnvironmentCatalogRequest = Schema.Struct({
  projectId: Schema.optional(Schema.String).pipe(T.HttpQuery("projectId")),
  environmentType: Schema.String.pipe(T.HttpPath("environmentType")),
  includeViewableModels: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeViewableModels"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/testEnvironmentCatalog/{environmentType}",
  }),
  svc,
) as unknown as Schema.Schema<GetTestEnvironmentCatalogRequest>;

export type GetTestEnvironmentCatalogResponse = TestEnvironmentCatalog;
export const GetTestEnvironmentCatalogResponse = TestEnvironmentCatalog;

export type GetTestEnvironmentCatalogError = DefaultErrors;

/** Gets the catalog of supported test environments. May return any of the following canonical error codes: - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the environment type does not exist - INTERNAL - if an internal error occurred */
export const getTestEnvironmentCatalog: API.OperationMethod<
  GetTestEnvironmentCatalogRequest,
  GetTestEnvironmentCatalogResponse,
  GetTestEnvironmentCatalogError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTestEnvironmentCatalogRequest,
  output: GetTestEnvironmentCatalogResponse,
  errors: [],
}));
