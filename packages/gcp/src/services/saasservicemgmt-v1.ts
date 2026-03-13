// ==========================================================================
// SaaS Runtime API (saasservicemgmt v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "saasservicemgmt",
  version: "v1",
  rootUrl: "https://saasservicemgmt.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudLocationLocation {
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudLocationLocation",
  }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface UnitVariable {
  /** Optional. Immutable. Name of a supported variable type. Supported types are string, int, bool. */
  type?: "TYPE_UNSPECIFIED" | "STRING" | "INT" | "BOOL" | (string & {});
  /** Required. Immutable. Name of the variable from actuation configs. */
  variable?: string;
  /** Optional. String encoded value for the variable. */
  value?: string;
}

export const UnitVariable: Schema.Schema<UnitVariable> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      variable: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnitVariable",
  }) as any as Schema.Schema<UnitVariable>;

export interface Upgrade {
  /** Optional. Reference to the Release object to use for the Unit. (optional). */
  release?: string;
  /** Optional. Set of input variables. Maximum 100. (optional) */
  inputVariables?: Array<UnitVariable>;
}

export const Upgrade: Schema.Schema<Upgrade> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      release: Schema.optional(Schema.String),
      inputVariables: Schema.optional(Schema.Array(UnitVariable)),
    }),
  ).annotate({ identifier: "Upgrade" }) as any as Schema.Schema<Upgrade>;

export interface Provision {
  /** Optional. Reference to the Release object to use for the Unit. (optional). */
  release?: string;
  /** Optional. Set of input variables. Maximum 100. (optional) */
  inputVariables?: Array<UnitVariable>;
}

export const Provision: Schema.Schema<Provision> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      release: Schema.optional(Schema.String),
      inputVariables: Schema.optional(Schema.Array(UnitVariable)),
    }),
  ).annotate({ identifier: "Provision" }) as any as Schema.Schema<Provision>;

export interface Deprovision {}

export const Deprovision: Schema.Schema<Deprovision> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Deprovision",
  }) as any as Schema.Schema<Deprovision>;

export interface UnitOperationCondition {
  /** Required. Human readable message indicating details about the last transition. */
  message?: string;
  /** Required. Last time the condition transited from one status to another. */
  lastTransitionTime?: string;
  /** Required. Status of the condition. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "STATUS_UNKNOWN"
    | "STATUS_TRUE"
    | "STATUS_FALSE"
    | (string & {});
  /** Required. Brief reason for the condition's last transition. */
  reason?: string;
  /** Required. Type of the condition. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_SCHEDULED"
    | "TYPE_RUNNING"
    | "TYPE_SUCCEEDED"
    | "TYPE_CANCELLED"
    | "TYPE_APP_CREATED"
    | "TYPE_APP_COMPONENTS_REGISTERED"
    | (string & {});
}

export const UnitOperationCondition: Schema.Schema<UnitOperationCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
      lastTransitionTime: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnitOperationCondition",
  }) as any as Schema.Schema<UnitOperationCondition>;

export interface Schedule {
  /** Optional. Start of operation. If not set, will be set to the start of the next window. (optional) */
  startTime?: string;
}

export const Schedule: Schema.Schema<Schedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Schedule" }) as any as Schema.Schema<Schedule>;

export interface UnitOperation {
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  upgrade?: Upgrade;
  /** Optional. Output only. UnitOperationErrorCategory describe the error category. */
  errorCategory?:
    | "UNIT_OPERATION_ERROR_CATEGORY_UNSPECIFIED"
    | "NOT_APPLICABLE"
    | "FATAL"
    | "RETRIABLE"
    | "IGNORABLE"
    | "STANDARD"
    | (string & {});
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Optional. Output only. The engine state for on-going deployment engine operation(s). This field is opaque for external usage. */
  engineState?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitOperations/{unitOperation}" */
  name?: string;
  /** Required. Immutable. The Unit a given UnitOperation will act upon. */
  unit?: string;
  provision?: Provision;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Optional. When true, attempt to cancel the operation. Cancellation may fail if the operation is already executing. (Optional) */
  cancel?: boolean;
  deprovision?: Deprovision;
  /** Optional. Output only. UnitOperationState describes the current state of the unit operation. */
  state?:
    | "UNIT_OPERATION_STATE_UNKNOWN"
    | "UNIT_OPERATION_STATE_PENDING"
    | "UNIT_OPERATION_STATE_SCHEDULED"
    | "UNIT_OPERATION_STATE_RUNNING"
    | "UNIT_OPERATION_STATE_SUCCEEDED"
    | "UNIT_OPERATION_STATE_FAILED"
    | "UNIT_OPERATION_STATE_CANCELLED"
    | (string & {});
  /** Optional. Reference to parent resource: UnitOperation. If an operation needs to create other operations as part of its workflow, each of the child operations should have this field set to the parent. This can be used for tracing. (Optional) */
  parentUnitOperation?: string;
  /** Optional. Output only. A set of conditions which indicate the various conditions this resource can have. */
  conditions?: Array<UnitOperationCondition>;
  /** Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). */
  deleteTime?: string;
  /** Optional. When to schedule this operation. */
  schedule?: Schedule;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Optional. Specifies which rollout created this Unit Operation. This cannot be modified and is used for filtering purposes only. If a dependent unit and unit operation are created as part of another unit operation, they will use the same rolloutId. */
  rollout?: string;
}

export const UnitOperation: Schema.Schema<UnitOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      upgrade: Schema.optional(Upgrade),
      errorCategory: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      engineState: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.String),
      provision: Schema.optional(Provision),
      updateTime: Schema.optional(Schema.String),
      cancel: Schema.optional(Schema.Boolean),
      deprovision: Schema.optional(Deprovision),
      state: Schema.optional(Schema.String),
      parentUnitOperation: Schema.optional(Schema.String),
      conditions: Schema.optional(Schema.Array(UnitOperationCondition)),
      deleteTime: Schema.optional(Schema.String),
      schedule: Schema.optional(Schedule),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      rollout: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnitOperation",
  }) as any as Schema.Schema<UnitOperation>;

export interface UnitCondition {
  /** Required. Last time the condition transited from one status to another. */
  lastTransitionTime?: string;
  /** Required. Human readable message indicating details about the last transition. */
  message?: string;
  /** Required. Status of the condition. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "STATUS_UNKNOWN"
    | "STATUS_TRUE"
    | "STATUS_FALSE"
    | (string & {});
  /** Required. Brief reason for the condition's last transition. */
  reason?: string;
  /** Required. Type of the condition. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TYPE_READY"
    | "TYPE_UPDATING"
    | "TYPE_PROVISIONED"
    | "TYPE_OPERATION_ERROR"
    | (string & {});
}

export const UnitCondition: Schema.Schema<UnitCondition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastTransitionTime: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnitCondition",
  }) as any as Schema.Schema<UnitCondition>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Location {
  /** Optional. Name of location. */
  name?: string;
}

export const Location: Schema.Schema<Location> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Saas {
  /** Optional. List of locations that the service is available in. Rollout refers to the list to generate a rollout plan. */
  locations?: Array<Location>;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/saas/{saas}" */
  name?: string;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
}

export const Saas: Schema.Schema<Saas> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      etag: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "Saas" }) as any as Schema.Schema<Saas>;

export interface ReleaseRequirements {
  /** Optional. A list of releases from which a unit can be upgraded to this one (optional). If left empty no constraints will be applied. When provided, unit upgrade requests to this release will check and enforce this constraint. */
  upgradeableFromReleases?: Array<string>;
}

export const ReleaseRequirements: Schema.Schema<ReleaseRequirements> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      upgradeableFromReleases: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ReleaseRequirements",
  }) as any as Schema.Schema<ReleaseRequirements>;

export interface ErrorBudget {
  /** Optional. The maximum number of failed units allowed in a location without pausing the rollout. */
  allowedCount?: number;
  /** Optional. The maximum percentage of units allowed to fail (0, 100] within a location without pausing the rollout. */
  allowedPercentage?: number;
}

export const ErrorBudget: Schema.Schema<ErrorBudget> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowedCount: Schema.optional(Schema.Number),
      allowedPercentage: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ErrorBudget",
  }) as any as Schema.Schema<ErrorBudget>;

export interface RolloutKind {
  /** Optional. Value among strict (enforcing maintenance policy and only looking at Units with maintenance policy), ignore (ignoring maintenance policy) and skip (skipping Units with maintenance policy) */
  maintenancePolicyEnforcement?:
    | "MAINTENANCE_POLICY_ENFORCEMENT_UNSPECIFIED"
    | "MAINTENANCE_POLICY_ENFORCEMENT_STRICT"
    | "MAINTENANCE_POLICY_ENFORCEMENT_IGNORED"
    | "MAINTENANCE_POLICY_ENFORCEMENT_SKIPPED"
    | (string & {});
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rolloutKinds/{rollout_kind_id}" */
  name?: string;
  /** Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. */
  unitFilter?: string;
  /** Optional. The strategy used for executing a Rollout. This is a required field. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the associated UnitKind's Saas Locations. */
  rolloutOrchestrationStrategy?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Required. Immutable. UnitKind that this rollout kind corresponds to. Rollouts stemming from this rollout kind will target the units of this unit kind. In other words, this defines the population of target units to be upgraded by rollouts. */
  unitKind?: string;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Optional. The configuration for error budget. If the number of failed units exceeds max(allowed_count, allowed_ratio * total_units), the rollout will be paused. If not set, all units will be attempted to be updated regardless of the number of failures encountered. */
  errorBudget?: ErrorBudget;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Optional. The config for updating the unit kind. By default, the unit kind will be updated on the rollout start. */
  updateUnitKindStrategy?:
    | "UPDATE_UNIT_KIND_STRATEGY_UNSPECIFIED"
    | "UPDATE_UNIT_KIND_STRATEGY_ON_START"
    | "UPDATE_UNIT_KIND_STRATEGY_NEVER"
    | (string & {});
}

export const RolloutKind: Schema.Schema<RolloutKind> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maintenancePolicyEnforcement: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      unitFilter: Schema.optional(Schema.String),
      rolloutOrchestrationStrategy: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      unitKind: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      errorBudget: Schema.optional(ErrorBudget),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      updateUnitKindStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RolloutKind",
  }) as any as Schema.Schema<RolloutKind>;

export interface Blueprint {
  /** Optional. Immutable. URI to a blueprint used by the Unit (required unless unitKind or release is set). */
  package?: string;
  /** Output only. Version metadata if present on the blueprint. */
  version?: string;
  /** Output only. Type of the engine used to actuate the blueprint. e.g. terraform, helm etc. */
  engine?: string;
}

export const Blueprint: Schema.Schema<Blueprint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      package: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      engine: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Blueprint" }) as any as Schema.Schema<Blueprint>;

export interface Release {
  /** Optional. Set of requirements to be fulfilled on the Unit when using this Release. */
  releaseRequirements?: ReleaseRequirements;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Optional. Output only. List of output variables declared on the blueprint and can be present with their values on the unit status */
  outputVariables?: Array<UnitVariable>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Optional. Blueprints are OCI Images that contain all of the artifacts needed to provision a unit. */
  blueprint?: Blueprint;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Required. Immutable. Reference to the UnitKind this Release corresponds to (required and immutable once created). */
  unitKind?: string;
  /** Optional. Output only. List of input variables declared on the blueprint and can be present with their values on the unit spec */
  inputVariables?: Array<UnitVariable>;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Optional. Mapping of input variables to default values. Maximum 100 */
  inputVariableDefaults?: Array<UnitVariable>;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}" */
  name?: string;
}

export const Release: Schema.Schema<Release> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      releaseRequirements: Schema.optional(ReleaseRequirements),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      outputVariables: Schema.optional(Schema.Array(UnitVariable)),
      createTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      blueprint: Schema.optional(Blueprint),
      updateTime: Schema.optional(Schema.String),
      unitKind: Schema.optional(Schema.String),
      inputVariables: Schema.optional(Schema.Array(UnitVariable)),
      etag: Schema.optional(Schema.String),
      inputVariableDefaults: Schema.optional(Schema.Array(UnitVariable)),
      uid: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Release" }) as any as Schema.Schema<Release>;

export interface UnitDependency {
  /** Output only. A reference to the Unit object. */
  unit?: string;
  /** Output only. Alias for the name of the dependency. */
  alias?: string;
}

export const UnitDependency: Schema.Schema<UnitDependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unit: Schema.optional(Schema.String),
      alias: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnitDependency",
  }) as any as Schema.Schema<UnitDependency>;

export interface ListSaasResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The resulting saas. */
  saas?: Array<Saas>;
  /** If present, the next page token can be provided to a subsequent ListSaas call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
}

export const ListSaasResponse: Schema.Schema<ListSaasResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      saas: Schema.optional(Schema.Array(Saas)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSaasResponse",
  }) as any as Schema.Schema<ListSaasResponse>;

export interface RunRolloutActionParams {
  /** Required. If true, the rollout will retry failed operations when resumed. This is applicable only the current state of the Rollout is PAUSED and the requested action is RUN. */
  retryFailedOperations?: boolean;
}

export const RunRolloutActionParams: Schema.Schema<RunRolloutActionParams> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      retryFailedOperations: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RunRolloutActionParams",
  }) as any as Schema.Schema<RunRolloutActionParams>;

export interface RolloutControl {
  /** Optional. Parameters for the RUN action. It is an error to specify this if the RolloutAction is not set to RUN. By default, the rollout will retry failed operations when resumed. */
  runParams?: RunRolloutActionParams;
  /** Required. Action to be performed on the Rollout. The default behavior is to run the rollout until it naturally reaches a terminal state. */
  action?:
    | "ROLLOUT_ACTION_UNSPECIFIED"
    | "ROLLOUT_ACTION_RUN"
    | "ROLLOUT_ACTION_PAUSE"
    | "ROLLOUT_ACTION_CANCEL"
    | (string & {});
}

export const RolloutControl: Schema.Schema<RolloutControl> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      runParams: Schema.optional(RunRolloutActionParams),
      action: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RolloutControl",
  }) as any as Schema.Schema<RolloutControl>;

export interface Aggregate {
  /** Required. Group by which to aggregate. */
  group?: string;
  /** Required. Number of records in the group. */
  count?: number;
}

export const Aggregate: Schema.Schema<Aggregate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      group: Schema.optional(Schema.String),
      count: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Aggregate" }) as any as Schema.Schema<Aggregate>;

export interface RolloutStats {
  /** Optional. Output only. Unordered list. A breakdown of the progress of operations triggered by the rollout. Provides a count of Operations by their state. This can be used to determine the number of units which have been updated, or are scheduled to be updated. There will be at most one entry per group. Possible values for operation groups are: - "SCHEDULED" - "PENDING" - "RUNNING" - "SUCCEEDED" - "FAILED" - "CANCELLED" */
  operationsByState?: Array<Aggregate>;
}

export const RolloutStats: Schema.Schema<RolloutStats> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operationsByState: Schema.optional(Schema.Array(Aggregate)),
    }),
  ).annotate({
    identifier: "RolloutStats",
  }) as any as Schema.Schema<RolloutStats>;

export interface Rollout {
  /** Optional. CEL(https://github.com/google/cel-spec) formatted filter string against Unit. The filter will be applied to determine the eligible unit population. This filter can only reduce, but not expand the scope of the rollout. If not provided, the unit_filter from the RolloutKind will be used. */
  unitFilter?: string;
  /** Optional. Output only. The time when the rollout transitioned into its current state. */
  stateTransitionTime?: string;
  /** Optional. Requested change to the execution of this rollout. Default RolloutControl.action is ROLLOUT_ACTION_RUN meaning the rollout will be executed to completion while progressing through all natural Rollout States (such as RUNNING -> SUCCEEDED or RUNNING -> FAILED). Requests can only be made when the Rollout is in a non-terminal state. */
  control?: RolloutControl;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Optional. Immutable. Name of the Release that gets rolled out to target Units. Required if no other type of release is specified. */
  release?: string;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Optional. Output only. Output only snapshot of the effective unit filter at Rollout start time. Contains a CEL(https://github.com/google/cel-spec) expression consisting of a conjunction of Rollout.unit_filter and RolloutKind.unit_filter. This field captures the filter applied by the Rollout to determine the Unit population. If the associated RolloutKind's unit_filter is modified after the rollout is started, it will not be updated here. */
  effectiveUnitFilter?: string;
  /** Optional. Output only. The direct parent rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" */
  parentRollout?: string;
  /** Optional. Immutable. Name of the RolloutKind this rollout is stemming from and adhering to. */
  rolloutKind?: string;
  /** Optional. Output only. The time when the rollout finished execution (regardless of success, failure, or cancellation). Will be empty if the rollout hasn't finished yet. Once set, the rollout is in terminal state and all the results are final. */
  endTime?: string;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Output only. Human readable message indicating details about the last state transition. */
  stateMessage?: string;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Optional. Output only. The time when the rollout started executing. Will be empty if the rollout hasn't started yet. */
  startTime?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Optional. Output only. Details about the progress of the rollout. */
  stats?: RolloutStats;
  /** Optional. Output only. The root rollout that this rollout is stemming from. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollouts/{rollout_id}" */
  rootRollout?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}" */
  name?: string;
  /** Output only. The timestamp when the resource was marked for deletion (deletion is an asynchronous operation). */
  deleteTime?: string;
  /** Output only. Current state of the rollout. */
  state?:
    | "ROLLOUT_STATE_UNSPECIFIED"
    | "ROLLOUT_STATE_RUNNING"
    | "ROLLOUT_STATE_PAUSED"
    | "ROLLOUT_STATE_SUCCEEDED"
    | "ROLLOUT_STATE_FAILED"
    | "ROLLOUT_STATE_CANCELLED"
    | "ROLLOUT_STATE_WAITING"
    | "ROLLOUT_STATE_CANCELLING"
    | "ROLLOUT_STATE_RESUMING"
    | "ROLLOUT_STATE_PAUSING"
    | (string & {});
  /** Optional. The strategy used for executing this Rollout. This strategy will override whatever strategy is specified in the RolloutKind. If not specified on creation, the strategy from RolloutKind will be used. There are two supported values strategies which are used to control - "Google.Cloud.Simple.AllAtOnce" - "Google.Cloud.Simple.OneLocationAtATime" A rollout with one of these simple strategies will rollout across all locations defined in the targeted UnitKind's Saas Locations. */
  rolloutOrchestrationStrategy?: string;
}

export const Rollout: Schema.Schema<Rollout> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unitFilter: Schema.optional(Schema.String),
      stateTransitionTime: Schema.optional(Schema.String),
      control: Schema.optional(RolloutControl),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      release: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      effectiveUnitFilter: Schema.optional(Schema.String),
      parentRollout: Schema.optional(Schema.String),
      rolloutKind: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      stateMessage: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      startTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      stats: Schema.optional(RolloutStats),
      rootRollout: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      rolloutOrchestrationStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Rollout" }) as any as Schema.Schema<Rollout>;

export interface ListRolloutsResponse {
  /** If present, the next page token can be provided to a subsequent ListRollouts call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The resulting rollouts. */
  rollouts?: Array<Rollout>;
}

export const ListRolloutsResponse: Schema.Schema<ListRolloutsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      rollouts: Schema.optional(Schema.Array(Rollout)),
    }),
  ).annotate({
    identifier: "ListRolloutsResponse",
  }) as any as Schema.Schema<ListRolloutsResponse>;

export interface Dependency {
  /** Required. Immutable. The unit kind of the dependency. */
  unitKind?: string;
  /** Required. An alias for the dependency. Used for input variable mapping. */
  alias?: string;
}

export const Dependency: Schema.Schema<Dependency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unitKind: Schema.optional(Schema.String),
      alias: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Dependency" }) as any as Schema.Schema<Dependency>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface ToMapping {
  /** Required. Name of the inputVariable on the dependency */
  inputVariable?: string;
  /** Required. Alias of the dependency that the inputVariable will pass its value to */
  dependency?: string;
  /** Optional. Tells SaaS Runtime if this mapping should be used during lookup or not */
  ignoreForLookup?: boolean;
}

export const ToMapping: Schema.Schema<ToMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputVariable: Schema.optional(Schema.String),
      dependency: Schema.optional(Schema.String),
      ignoreForLookup: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "ToMapping" }) as any as Schema.Schema<ToMapping>;

export interface FromMapping {
  /** Required. Alias of the dependency that the outputVariable will pass its value to */
  dependency?: string;
  /** Required. Name of the outputVariable on the dependency */
  outputVariable?: string;
}

export const FromMapping: Schema.Schema<FromMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dependency: Schema.optional(Schema.String),
      outputVariable: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FromMapping",
  }) as any as Schema.Schema<FromMapping>;

export interface VariableMapping {
  /** Required. name of the variable */
  variable?: string;
  /** Optional. Input variables whose values will be passed on to dependencies. */
  to?: ToMapping;
  /** Optional. Output variables which will get their values from dependencies */
  from?: FromMapping;
}

export const VariableMapping: Schema.Schema<VariableMapping> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      variable: Schema.optional(Schema.String),
      to: Schema.optional(ToMapping),
      from: Schema.optional(FromMapping),
    }),
  ).annotate({
    identifier: "VariableMapping",
  }) as any as Schema.Schema<VariableMapping>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface UnitKind {
  /** Optional. A reference to the Release object to use as default for creating new units of this UnitKind (optional). If not specified, a new unit must explicitly reference which release to use for its creation. */
  defaultRelease?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Optional. Immutable. List of other unit kinds that this release will depend on. Dependencies will be automatically provisioned if not found. Maximum 10. */
  dependencies?: Array<Dependency>;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}" */
  name?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Optional. List of outputVariables for this unit kind will be passed to this unit's outputVariables. Maximum 100. */
  outputVariableMappings?: Array<VariableMapping>;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Optional. List of inputVariables for this release that will either be retrieved from a dependency’s outputVariables, or will be passed on to a dependency’s inputVariables. Maximum 100. */
  inputVariableMappings?: Array<VariableMapping>;
  /** Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with SaaS Runtime. Part of the SaaS Runtime common data model. Immutable once set. */
  saas?: string;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
}

export const UnitKind: Schema.Schema<UnitKind> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultRelease: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      dependencies: Schema.optional(Schema.Array(Dependency)),
      name: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      outputVariableMappings: Schema.optional(Schema.Array(VariableMapping)),
      etag: Schema.optional(Schema.String),
      inputVariableMappings: Schema.optional(Schema.Array(VariableMapping)),
      saas: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({ identifier: "UnitKind" }) as any as Schema.Schema<UnitKind>;

export interface ListUnitKindsResponse {
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The resulting unit kinds. */
  unitKinds?: Array<UnitKind>;
  /** If present, the next page token can be provided to a subsequent ListUnitKinds call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
}

export const ListUnitKindsResponse: Schema.Schema<ListUnitKindsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      unitKinds: Schema.optional(Schema.Array(UnitKind)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListUnitKindsResponse",
  }) as any as Schema.Schema<ListUnitKindsResponse>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<GoogleCloudLocationLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface MaintenanceSettings {
  /** Optional. If present, it fixes the release on the unit until the given time; i.e. changes to the release field will be rejected. Rollouts should and will also respect this by not requesting an upgrade in the first place. */
  pinnedUntilTime?: string;
}

export const MaintenanceSettings: Schema.Schema<MaintenanceSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pinnedUntilTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MaintenanceSettings",
  }) as any as Schema.Schema<MaintenanceSettings>;

export interface Unit {
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. Output only. Indicates the current input variables deployed by the unit */
  inputVariables?: Array<UnitVariable>;
  /** Optional. Immutable. Indicates whether the Unit life cycle is controlled by the user or by the system. Immutable once created. */
  managementMode?:
    | "MANAGEMENT_MODE_UNSPECIFIED"
    | "MANAGEMENT_MODE_USER"
    | "MANAGEMENT_MODE_SYSTEM"
    | (string & {});
  /** Optional. Output only. If set, indicates the time when the system will start removing the unit. */
  systemCleanupAt?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/units/{unit}" */
  name?: string;
  /** Optional. Captures requested directives for performing future maintenance on the unit. This includes a request for the unit to skip maintenance for a period of time and remain pinned to its current release as well as controls for postponing maintenance scheduled in future. */
  maintenance?: MaintenanceSettings;
  /** Optional. Output only. Indicates the system managed state of the unit. */
  systemManagedState?:
    | "SYSTEM_MANAGED_STATE_UNSPECIFIED"
    | "SYSTEM_MANAGED_STATE_ACTIVE"
    | "SYSTEM_MANAGED_STATE_INACTIVE"
    | "SYSTEM_MANAGED_STATE_DECOMMISSIONED"
    | (string & {});
  /** Optional. Output only. List of concurrent UnitOperations that are operating on this Unit. */
  ongoingOperations?: Array<string>;
  /** Optional. Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). */
  state?:
    | "UNIT_STATE_UNSPECIFIED"
    | "UNIT_STATE_NOT_PROVISIONED"
    | "UNIT_STATE_PROVISIONING"
    | "UNIT_STATE_UPDATING"
    | "UNIT_STATE_DEPROVISIONING"
    | "UNIT_STATE_READY"
    | "UNIT_STATE_ERROR"
    | (string & {});
  /** Optional. Output only. The current Release object for this Unit. */
  release?: string;
  /** Optional. Reference to the Saas Tenant resource this unit belongs to. This for example informs the maintenance policies to use for scheduling future updates on a unit. (optional and immutable once created) */
  tenant?: string;
  /** Output only. Indicates whether the resource location satisfies Zone Separation constraints. This is false by default. */
  satisfiesPzs?: boolean;
  /** Optional. Reference to the UnitKind this Unit belongs to. Immutable once set. */
  unitKind?: string;
  /** Optional. Output only. Set of dependencies for this unit. Maximum 10. */
  dependencies?: Array<UnitDependency>;
  /** Optional. Output only. List of scheduled UnitOperations for this unit. */
  scheduledOperations?: Array<string>;
  /** Output only. Indicates whether the resource location satisfies Zone Isolation constraints. This is false by default. */
  satisfiesPzi?: boolean;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Optional. Output only. List of Units that depend on this unit. Unit can only be deprovisioned if this list is empty. Maximum 1000. */
  dependents?: Array<UnitDependency>;
  /** Optional. Output only. List of pending (wait to be executed) UnitOperations for this unit. */
  pendingOperations?: Array<string>;
  /** Optional. Output only. A set of conditions which indicate the various conditions this resource can have. */
  conditions?: Array<UnitCondition>;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Optional. Output only. Set of key/value pairs corresponding to output variables from execution of actuation templates. The variables are declared in actuation configs (e.g in helm chart or terraform) and the values are fetched and returned by the actuation engine upon completion of execution. */
  outputVariables?: Array<UnitVariable>;
}

export const Unit: Schema.Schema<Unit> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      inputVariables: Schema.optional(Schema.Array(UnitVariable)),
      managementMode: Schema.optional(Schema.String),
      systemCleanupAt: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      maintenance: Schema.optional(MaintenanceSettings),
      systemManagedState: Schema.optional(Schema.String),
      ongoingOperations: Schema.optional(Schema.Array(Schema.String)),
      state: Schema.optional(Schema.String),
      release: Schema.optional(Schema.String),
      tenant: Schema.optional(Schema.String),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      unitKind: Schema.optional(Schema.String),
      dependencies: Schema.optional(Schema.Array(UnitDependency)),
      scheduledOperations: Schema.optional(Schema.Array(Schema.String)),
      satisfiesPzi: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      dependents: Schema.optional(Schema.Array(UnitDependency)),
      pendingOperations: Schema.optional(Schema.Array(Schema.String)),
      conditions: Schema.optional(Schema.Array(UnitCondition)),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      outputVariables: Schema.optional(Schema.Array(UnitVariable)),
    }),
  ).annotate({ identifier: "Unit" }) as any as Schema.Schema<Unit>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      done: Schema.optional(Schema.Boolean),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      error: Schema.optional(Status),
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Tenant {
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/tenants/{tenant}" */
  name?: string;
  /** Required. Immutable. A reference to the Saas that defines the product (managed service) that the producer wants to manage with SaaS Runtime. Part of the SaaS Runtime common data model. */
  saas?: string;
  /** Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations */
  annotations?: Record<string, string>;
  /** Output only. The timestamp when the resource was created. */
  createTime?: string;
  /** Optional. Immutable. A reference to the consumer resource this SaaS Tenant is representing. The relationship with a consumer resource can be used by SaaS Runtime for retrieving consumer-defined settings and policies such as maintenance policies (using Unified Maintenance Policy API). */
  consumerResource?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Output only. The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
}

export const Tenant: Schema.Schema<Tenant> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      saas: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createTime: Schema.optional(Schema.String),
      consumerResource: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Tenant" }) as any as Schema.Schema<Tenant>;

export interface ListTenantsResponse {
  /** If present, the next page token can be provided to a subsequent ListTenants call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The resulting tenants. */
  tenants?: Array<Tenant>;
}

export const ListTenantsResponse: Schema.Schema<ListTenantsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      tenants: Schema.optional(Schema.Array(Tenant)),
    }),
  ).annotate({
    identifier: "ListTenantsResponse",
  }) as any as Schema.Schema<ListTenantsResponse>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      operations: Schema.optional(Schema.Array(Operation)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface ListRolloutKindsResponse {
  /** The resulting rollout kinds. */
  rolloutKinds?: Array<RolloutKind>;
  /** If present, the next page token can be provided to a subsequent ListRolloutKinds call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListRolloutKindsResponse: Schema.Schema<ListRolloutKindsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rolloutKinds: Schema.optional(Schema.Array(RolloutKind)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListRolloutKindsResponse",
  }) as any as Schema.Schema<ListRolloutKindsResponse>;

export interface ListUnitsResponse {
  /** If present, the next page token can be provided to a subsequent ListUnits call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** The resulting units. */
  units?: Array<Unit>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListUnitsResponse: Schema.Schema<ListUnitsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      units: Schema.optional(Schema.Array(Unit)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListUnitsResponse",
  }) as any as Schema.Schema<ListUnitsResponse>;

export interface ListUnitOperationsResponse {
  /** If present, the next page token can be provided to a subsequent ListUnitOperations call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
  /** The resulting unit operations. */
  unitOperations?: Array<UnitOperation>;
}

export const ListUnitOperationsResponse: Schema.Schema<ListUnitOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      unitOperations: Schema.optional(Schema.Array(UnitOperation)),
    }),
  ).annotate({
    identifier: "ListUnitOperationsResponse",
  }) as any as Schema.Schema<ListUnitOperationsResponse>;

export interface ListReleasesResponse {
  /** The resulting releases. */
  releases?: Array<Release>;
  /** If present, the next page token can be provided to a subsequent ListReleases call to list the next page. If empty, there are no more pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListReleasesResponse: Schema.Schema<ListReleasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      releases: Schema.optional(Schema.Array(Release)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListReleasesResponse",
  }) as any as Schema.Schema<ListReleasesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelOperations: API.OperationMethod<
  CancelOperationsRequest,
  CancelOperationsResponse,
  CancelOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteOperations: API.OperationMethod<
  DeleteOperationsRequest,
  DeleteOperationsResponse,
  DeleteOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

export interface ListOperationsRequest {
  /** The standard list page size. */
  pageSize?: number;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list filter. */
  filter?: string;
}

export const ListOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse_Op,
  ListOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudLocationLocation;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRolloutKindsRequest {
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rolloutKinds/{rollout_kind_id}" */
  name: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Field mask is used to specify the fields to be overwritten in the RolloutKind resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the RolloutKind will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: RolloutKind;
}

export const PatchProjectsLocationsRolloutKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(RolloutKind).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rolloutKinds/{rolloutKindsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsRolloutKindsRequest>;

export type PatchProjectsLocationsRolloutKindsResponse = RolloutKind;
export const PatchProjectsLocationsRolloutKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RolloutKind;

export type PatchProjectsLocationsRolloutKindsError = DefaultErrors;

/** Update a single rollout kind. */
export const patchProjectsLocationsRolloutKinds: API.OperationMethod<
  PatchProjectsLocationsRolloutKindsRequest,
  PatchProjectsLocationsRolloutKindsResponse,
  PatchProjectsLocationsRolloutKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsRolloutKindsRequest,
  output: PatchProjectsLocationsRolloutKindsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRolloutKindsRequest {
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** Required. The parent of the rollout kind. */
  parent: string;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
  /** The maximum number of rollout kinds to send per page. */
  pageSize?: number;
}

export const ListProjectsLocationsRolloutKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rolloutKinds",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRolloutKindsRequest>;

export type ListProjectsLocationsRolloutKindsResponse =
  ListRolloutKindsResponse;
export const ListProjectsLocationsRolloutKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRolloutKindsResponse;

export type ListProjectsLocationsRolloutKindsError = DefaultErrors;

/** Retrieve a collection of rollout kinds. */
export const listProjectsLocationsRolloutKinds: API.PaginatedOperationMethod<
  ListProjectsLocationsRolloutKindsRequest,
  ListProjectsLocationsRolloutKindsResponse,
  ListProjectsLocationsRolloutKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRolloutKindsRequest,
  output: ListProjectsLocationsRolloutKindsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRolloutKindsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsRolloutKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rolloutKinds/{rolloutKindsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRolloutKindsRequest>;

export type GetProjectsLocationsRolloutKindsResponse = RolloutKind;
export const GetProjectsLocationsRolloutKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RolloutKind;

export type GetProjectsLocationsRolloutKindsError = DefaultErrors;

/** Retrieve a single rollout kind. */
export const getProjectsLocationsRolloutKinds: API.OperationMethod<
  GetProjectsLocationsRolloutKindsRequest,
  GetProjectsLocationsRolloutKindsResponse,
  GetProjectsLocationsRolloutKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRolloutKindsRequest,
  output: GetProjectsLocationsRolloutKindsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsRolloutKindsRequest {
  /** Required. The ID value for the new rollout kind. */
  rolloutKindId?: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent of the rollout kind. */
  parent: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Request body */
  body?: RolloutKind;
}

export const CreateProjectsLocationsRolloutKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rolloutKindId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("rolloutKindId"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    body: Schema.optional(RolloutKind).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rolloutKinds",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsRolloutKindsRequest>;

export type CreateProjectsLocationsRolloutKindsResponse = RolloutKind;
export const CreateProjectsLocationsRolloutKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RolloutKind;

export type CreateProjectsLocationsRolloutKindsError = DefaultErrors;

/** Create a new rollout kind. */
export const createProjectsLocationsRolloutKinds: API.OperationMethod<
  CreateProjectsLocationsRolloutKindsRequest,
  CreateProjectsLocationsRolloutKindsResponse,
  CreateProjectsLocationsRolloutKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsRolloutKindsRequest,
  output: CreateProjectsLocationsRolloutKindsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRolloutKindsRequest {
  /** The etag known to the client for the expected state of the rollout kind. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the rollout kind. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const DeleteProjectsLocationsRolloutKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rolloutKinds/{rolloutKindsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRolloutKindsRequest>;

export type DeleteProjectsLocationsRolloutKindsResponse = Empty;
export const DeleteProjectsLocationsRolloutKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsRolloutKindsError = DefaultErrors;

/** Delete a single rollout kind. */
export const deleteProjectsLocationsRolloutKinds: API.OperationMethod<
  DeleteProjectsLocationsRolloutKindsRequest,
  DeleteProjectsLocationsRolloutKindsResponse,
  DeleteProjectsLocationsRolloutKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRolloutKindsRequest,
  output: DeleteProjectsLocationsRolloutKindsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsUnitsRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Field mask is used to specify the fields to be overwritten in the Unit resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Unit will be overwritten. */
  updateMask?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/units/{unit}" */
  name: string;
  /** Request body */
  body?: Unit;
}

export const PatchProjectsLocationsUnitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Unit).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/units/{unitsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsUnitsRequest>;

export type PatchProjectsLocationsUnitsResponse = Unit;
export const PatchProjectsLocationsUnitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Unit;

export type PatchProjectsLocationsUnitsError = DefaultErrors;

/** Update a single unit. */
export const patchProjectsLocationsUnits: API.OperationMethod<
  PatchProjectsLocationsUnitsRequest,
  PatchProjectsLocationsUnitsResponse,
  PatchProjectsLocationsUnitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsUnitsRequest,
  output: PatchProjectsLocationsUnitsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsUnitsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** The etag known to the client for the expected state of the unit. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
}

export const DeleteProjectsLocationsUnitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/units/{unitsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsUnitsRequest>;

export type DeleteProjectsLocationsUnitsResponse = Empty;
export const DeleteProjectsLocationsUnitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsUnitsError = DefaultErrors;

/** Delete a single unit. */
export const deleteProjectsLocationsUnits: API.OperationMethod<
  DeleteProjectsLocationsUnitsRequest,
  DeleteProjectsLocationsUnitsResponse,
  DeleteProjectsLocationsUnitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsUnitsRequest,
  output: DeleteProjectsLocationsUnitsResponse,
  errors: [],
}));

export interface GetProjectsLocationsUnitsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsUnitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/units/{unitsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsUnitsRequest>;

export type GetProjectsLocationsUnitsResponse = Unit;
export const GetProjectsLocationsUnitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Unit;

export type GetProjectsLocationsUnitsError = DefaultErrors;

/** Retrieve a single unit. */
export const getProjectsLocationsUnits: API.OperationMethod<
  GetProjectsLocationsUnitsRequest,
  GetProjectsLocationsUnitsResponse,
  GetProjectsLocationsUnitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsUnitsRequest,
  output: GetProjectsLocationsUnitsResponse,
  errors: [],
}));

export interface ListProjectsLocationsUnitsRequest {
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** The maximum number of units to send per page. */
  pageSize?: number;
  /** Required. The parent of the unit. */
  parent: string;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsUnitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/units",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsUnitsRequest>;

export type ListProjectsLocationsUnitsResponse = ListUnitsResponse;
export const ListProjectsLocationsUnitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListUnitsResponse;

export type ListProjectsLocationsUnitsError = DefaultErrors;

/** Retrieve a collection of units. */
export const listProjectsLocationsUnits: API.PaginatedOperationMethod<
  ListProjectsLocationsUnitsRequest,
  ListProjectsLocationsUnitsResponse,
  ListProjectsLocationsUnitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsUnitsRequest,
  output: ListProjectsLocationsUnitsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsUnitsRequest {
  /** Required. The ID value for the new unit. */
  unitId?: string;
  /** Required. The parent of the unit. */
  parent: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Unit;
}

export const CreateProjectsLocationsUnitsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    unitId: Schema.optional(Schema.String).pipe(T.HttpQuery("unitId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Unit).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/units",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsUnitsRequest>;

export type CreateProjectsLocationsUnitsResponse = Unit;
export const CreateProjectsLocationsUnitsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Unit;

export type CreateProjectsLocationsUnitsError = DefaultErrors;

/** Create a new unit. */
export const createProjectsLocationsUnits: API.OperationMethod<
  CreateProjectsLocationsUnitsRequest,
  CreateProjectsLocationsUnitsResponse,
  CreateProjectsLocationsUnitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsUnitsRequest,
  output: CreateProjectsLocationsUnitsResponse,
  errors: [],
}));

export interface GetProjectsLocationsUnitOperationsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsUnitOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitOperations/{unitOperationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsUnitOperationsRequest>;

export type GetProjectsLocationsUnitOperationsResponse = UnitOperation;
export const GetProjectsLocationsUnitOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitOperation;

export type GetProjectsLocationsUnitOperationsError = DefaultErrors;

/** Retrieve a single unit operation. */
export const getProjectsLocationsUnitOperations: API.OperationMethod<
  GetProjectsLocationsUnitOperationsRequest,
  GetProjectsLocationsUnitOperationsResponse,
  GetProjectsLocationsUnitOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsUnitOperationsRequest,
  output: GetProjectsLocationsUnitOperationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsUnitOperationsRequest {
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Field mask is used to specify the fields to be overwritten in the UnitOperation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the UnitOperation will be overwritten. */
  updateMask?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitOperations/{unitOperation}" */
  name: string;
  /** Request body */
  body?: UnitOperation;
}

export const PatchProjectsLocationsUnitOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UnitOperation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitOperations/{unitOperationsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsUnitOperationsRequest>;

export type PatchProjectsLocationsUnitOperationsResponse = UnitOperation;
export const PatchProjectsLocationsUnitOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitOperation;

export type PatchProjectsLocationsUnitOperationsError = DefaultErrors;

/** Update a single unit operation. */
export const patchProjectsLocationsUnitOperations: API.OperationMethod<
  PatchProjectsLocationsUnitOperationsRequest,
  PatchProjectsLocationsUnitOperationsResponse,
  PatchProjectsLocationsUnitOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsUnitOperationsRequest,
  output: PatchProjectsLocationsUnitOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsUnitOperationsRequest {
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The parent of the unit operation. */
  parent: string;
  /** Required. The ID value for the new unit operation. */
  unitOperationId?: string;
  /** Request body */
  body?: UnitOperation;
}

export const CreateProjectsLocationsUnitOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    unitOperationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("unitOperationId"),
    ),
    body: Schema.optional(UnitOperation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitOperations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsUnitOperationsRequest>;

export type CreateProjectsLocationsUnitOperationsResponse = UnitOperation;
export const CreateProjectsLocationsUnitOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitOperation;

export type CreateProjectsLocationsUnitOperationsError = DefaultErrors;

/** Create a new unit operation. */
export const createProjectsLocationsUnitOperations: API.OperationMethod<
  CreateProjectsLocationsUnitOperationsRequest,
  CreateProjectsLocationsUnitOperationsResponse,
  CreateProjectsLocationsUnitOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsUnitOperationsRequest,
  output: CreateProjectsLocationsUnitOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsUnitOperationsRequest {
  /** Required. The parent of the unit operation. */
  parent: string;
  /** The maximum number of unit operations to send per page. */
  pageSize?: number;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
}

export const ListProjectsLocationsUnitOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitOperations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsUnitOperationsRequest>;

export type ListProjectsLocationsUnitOperationsResponse =
  ListUnitOperationsResponse;
export const ListProjectsLocationsUnitOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListUnitOperationsResponse;

export type ListProjectsLocationsUnitOperationsError = DefaultErrors;

/** Retrieve a collection of unit operations. */
export const listProjectsLocationsUnitOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsUnitOperationsRequest,
  ListProjectsLocationsUnitOperationsResponse,
  ListProjectsLocationsUnitOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsUnitOperationsRequest,
  output: ListProjectsLocationsUnitOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsUnitOperationsRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** The etag known to the client for the expected state of the unit operation. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit operation. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const DeleteProjectsLocationsUnitOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitOperations/{unitOperationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsUnitOperationsRequest>;

export type DeleteProjectsLocationsUnitOperationsResponse = Empty;
export const DeleteProjectsLocationsUnitOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsUnitOperationsError = DefaultErrors;

/** Delete a single unit operation. */
export const deleteProjectsLocationsUnitOperations: API.OperationMethod<
  DeleteProjectsLocationsUnitOperationsRequest,
  DeleteProjectsLocationsUnitOperationsResponse,
  DeleteProjectsLocationsUnitOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsUnitOperationsRequest,
  output: DeleteProjectsLocationsUnitOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsReleasesRequest {
  /** Required. The ID value for the new release. */
  releaseId?: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Required. The parent of the release. */
  parent: string;
  /** Request body */
  body?: Release;
}

export const CreateProjectsLocationsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    releaseId: Schema.optional(Schema.String).pipe(T.HttpQuery("releaseId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/releases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsReleasesRequest>;

export type CreateProjectsLocationsReleasesResponse = Release;
export const CreateProjectsLocationsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type CreateProjectsLocationsReleasesError = DefaultErrors;

/** Create a new release. */
export const createProjectsLocationsReleases: API.OperationMethod<
  CreateProjectsLocationsReleasesRequest,
  CreateProjectsLocationsReleasesResponse,
  CreateProjectsLocationsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsReleasesRequest,
  output: CreateProjectsLocationsReleasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsReleasesRequest {
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
  /** The maximum number of releases to send per page. */
  pageSize?: number;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** Required. The parent of the release. */
  parent: string;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
}

export const ListProjectsLocationsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/releases",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsReleasesRequest>;

export type ListProjectsLocationsReleasesResponse = ListReleasesResponse;
export const ListProjectsLocationsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListReleasesResponse;

export type ListProjectsLocationsReleasesError = DefaultErrors;

/** Retrieve a collection of releases. */
export const listProjectsLocationsReleases: API.PaginatedOperationMethod<
  ListProjectsLocationsReleasesRequest,
  ListProjectsLocationsReleasesResponse,
  ListProjectsLocationsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsReleasesRequest,
  output: ListProjectsLocationsReleasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsReleasesRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsReleasesRequest>;

export type GetProjectsLocationsReleasesResponse = Release;
export const GetProjectsLocationsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type GetProjectsLocationsReleasesError = DefaultErrors;

/** Retrieve a single release. */
export const getProjectsLocationsReleases: API.OperationMethod<
  GetProjectsLocationsReleasesRequest,
  GetProjectsLocationsReleasesResponse,
  GetProjectsLocationsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsReleasesRequest,
  output: GetProjectsLocationsReleasesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsReleasesRequest {
  /** The etag known to the client for the expected state of the release. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the release. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the resource within a service. */
  name: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/releases/{releasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsReleasesRequest>;

export type DeleteProjectsLocationsReleasesResponse = Empty;
export const DeleteProjectsLocationsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsReleasesError = DefaultErrors;

/** Delete a single release. */
export const deleteProjectsLocationsReleases: API.OperationMethod<
  DeleteProjectsLocationsReleasesRequest,
  DeleteProjectsLocationsReleasesResponse,
  DeleteProjectsLocationsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsReleasesRequest,
  output: DeleteProjectsLocationsReleasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsReleasesRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Field mask is used to specify the fields to be overwritten in the Release resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Release will be overwritten. */
  updateMask?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}" */
  name: string;
  /** Request body */
  body?: Release;
}

export const PatchProjectsLocationsReleasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Release).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/releases/{releasesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsReleasesRequest>;

export type PatchProjectsLocationsReleasesResponse = Release;
export const PatchProjectsLocationsReleasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Release;

export type PatchProjectsLocationsReleasesError = DefaultErrors;

/** Update a single release. */
export const patchProjectsLocationsReleases: API.OperationMethod<
  PatchProjectsLocationsReleasesRequest,
  PatchProjectsLocationsReleasesResponse,
  PatchProjectsLocationsReleasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsReleasesRequest,
  output: PatchProjectsLocationsReleasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsUnitKindsRequest {
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** The maximum number of unit kinds to send per page. */
  pageSize?: number;
  /** Required. The parent of the unit kind. */
  parent: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsUnitKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitKinds",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsUnitKindsRequest>;

export type ListProjectsLocationsUnitKindsResponse = ListUnitKindsResponse;
export const ListProjectsLocationsUnitKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListUnitKindsResponse;

export type ListProjectsLocationsUnitKindsError = DefaultErrors;

/** Retrieve a collection of unit kinds. */
export const listProjectsLocationsUnitKinds: API.PaginatedOperationMethod<
  ListProjectsLocationsUnitKindsRequest,
  ListProjectsLocationsUnitKindsResponse,
  ListProjectsLocationsUnitKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsUnitKindsRequest,
  output: ListProjectsLocationsUnitKindsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsUnitKindsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
  /** The etag known to the client for the expected state of the unit kind. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit kind. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsUnitKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitKinds/{unitKindsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsUnitKindsRequest>;

export type DeleteProjectsLocationsUnitKindsResponse = Empty;
export const DeleteProjectsLocationsUnitKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsUnitKindsError = DefaultErrors;

/** Delete a single unit kind. */
export const deleteProjectsLocationsUnitKinds: API.OperationMethod<
  DeleteProjectsLocationsUnitKindsRequest,
  DeleteProjectsLocationsUnitKindsResponse,
  DeleteProjectsLocationsUnitKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsUnitKindsRequest,
  output: DeleteProjectsLocationsUnitKindsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsUnitKindsRequest {
  /** Required. The ID value for the new unit kind. */
  unitKindId?: string;
  /** Required. The parent of the unit kind. */
  parent: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: UnitKind;
}

export const CreateProjectsLocationsUnitKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    unitKindId: Schema.optional(Schema.String).pipe(T.HttpQuery("unitKindId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(UnitKind).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitKinds",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsUnitKindsRequest>;

export type CreateProjectsLocationsUnitKindsResponse = UnitKind;
export const CreateProjectsLocationsUnitKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitKind;

export type CreateProjectsLocationsUnitKindsError = DefaultErrors;

/** Create a new unit kind. */
export const createProjectsLocationsUnitKinds: API.OperationMethod<
  CreateProjectsLocationsUnitKindsRequest,
  CreateProjectsLocationsUnitKindsResponse,
  CreateProjectsLocationsUnitKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsUnitKindsRequest,
  output: CreateProjectsLocationsUnitKindsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsUnitKindsRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}" */
  name: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Field mask is used to specify the fields to be overwritten in the UnitKind resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the UnitKind will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: UnitKind;
}

export const PatchProjectsLocationsUnitKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(UnitKind).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitKinds/{unitKindsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsUnitKindsRequest>;

export type PatchProjectsLocationsUnitKindsResponse = UnitKind;
export const PatchProjectsLocationsUnitKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitKind;

export type PatchProjectsLocationsUnitKindsError = DefaultErrors;

/** Update a single unit kind. */
export const patchProjectsLocationsUnitKinds: API.OperationMethod<
  PatchProjectsLocationsUnitKindsRequest,
  PatchProjectsLocationsUnitKindsResponse,
  PatchProjectsLocationsUnitKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsUnitKindsRequest,
  output: PatchProjectsLocationsUnitKindsResponse,
  errors: [],
}));

export interface GetProjectsLocationsUnitKindsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsUnitKindsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/unitKinds/{unitKindsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsUnitKindsRequest>;

export type GetProjectsLocationsUnitKindsResponse = UnitKind;
export const GetProjectsLocationsUnitKindsResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnitKind;

export type GetProjectsLocationsUnitKindsError = DefaultErrors;

/** Retrieve a single unit kind. */
export const getProjectsLocationsUnitKinds: API.OperationMethod<
  GetProjectsLocationsUnitKindsRequest,
  GetProjectsLocationsUnitKindsResponse,
  GetProjectsLocationsUnitKindsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsUnitKindsRequest,
  output: GetProjectsLocationsUnitKindsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsTenantsRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The ID value for the new tenant. */
  tenantId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Required. The parent of the tenant. */
  parent: string;
  /** Request body */
  body?: Tenant;
}

export const CreateProjectsLocationsTenantsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    tenantId: Schema.optional(Schema.String).pipe(T.HttpQuery("tenantId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Tenant).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/tenants",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsTenantsRequest>;

export type CreateProjectsLocationsTenantsResponse = Tenant;
export const CreateProjectsLocationsTenantsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tenant;

export type CreateProjectsLocationsTenantsError = DefaultErrors;

/** Create a new tenant. */
export const createProjectsLocationsTenants: API.OperationMethod<
  CreateProjectsLocationsTenantsRequest,
  CreateProjectsLocationsTenantsResponse,
  CreateProjectsLocationsTenantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsTenantsRequest,
  output: CreateProjectsLocationsTenantsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsTenantsRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** The etag known to the client for the expected state of the tenant. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the tenant. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const DeleteProjectsLocationsTenantsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/tenants/{tenantsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsTenantsRequest>;

export type DeleteProjectsLocationsTenantsResponse = Empty;
export const DeleteProjectsLocationsTenantsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsTenantsError = DefaultErrors;

/** Delete a single tenant. */
export const deleteProjectsLocationsTenants: API.OperationMethod<
  DeleteProjectsLocationsTenantsRequest,
  DeleteProjectsLocationsTenantsResponse,
  DeleteProjectsLocationsTenantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsTenantsRequest,
  output: DeleteProjectsLocationsTenantsResponse,
  errors: [],
}));

export interface ListProjectsLocationsTenantsRequest {
  /** The maximum number of tenants to send per page. */
  pageSize?: number;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** Required. The parent of the tenant. */
  parent: string;
}

export const ListProjectsLocationsTenantsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/tenants",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsTenantsRequest>;

export type ListProjectsLocationsTenantsResponse = ListTenantsResponse;
export const ListProjectsLocationsTenantsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTenantsResponse;

export type ListProjectsLocationsTenantsError = DefaultErrors;

/** Retrieve a collection of tenants. */
export const listProjectsLocationsTenants: API.PaginatedOperationMethod<
  ListProjectsLocationsTenantsRequest,
  ListProjectsLocationsTenantsResponse,
  ListProjectsLocationsTenantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsTenantsRequest,
  output: ListProjectsLocationsTenantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsTenantsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsTenantsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/tenants/{tenantsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsTenantsRequest>;

export type GetProjectsLocationsTenantsResponse = Tenant;
export const GetProjectsLocationsTenantsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tenant;

export type GetProjectsLocationsTenantsError = DefaultErrors;

/** Retrieve a single tenant. */
export const getProjectsLocationsTenants: API.OperationMethod<
  GetProjectsLocationsTenantsRequest,
  GetProjectsLocationsTenantsResponse,
  GetProjectsLocationsTenantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsTenantsRequest,
  output: GetProjectsLocationsTenantsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsTenantsRequest {
  /** Field mask is used to specify the fields to be overwritten in the Tenant resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Tenant will be overwritten. */
  updateMask?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/tenants/{tenant}" */
  name: string;
  /** Request body */
  body?: Tenant;
}

export const PatchProjectsLocationsTenantsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Tenant).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/tenants/{tenantsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsTenantsRequest>;

export type PatchProjectsLocationsTenantsResponse = Tenant;
export const PatchProjectsLocationsTenantsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Tenant;

export type PatchProjectsLocationsTenantsError = DefaultErrors;

/** Update a single tenant. */
export const patchProjectsLocationsTenants: API.OperationMethod<
  PatchProjectsLocationsTenantsRequest,
  PatchProjectsLocationsTenantsResponse,
  PatchProjectsLocationsTenantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsTenantsRequest,
  output: PatchProjectsLocationsTenantsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSaasRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Required. The ID value for the new saas. */
  saasId?: string;
  /** Required. The parent of the saas. */
  parent: string;
  /** Request body */
  body?: Saas;
}

export const CreateProjectsLocationsSaasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    saasId: Schema.optional(Schema.String).pipe(T.HttpQuery("saasId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Saas).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/saas",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSaasRequest>;

export type CreateProjectsLocationsSaasResponse = Saas;
export const CreateProjectsLocationsSaasResponse =
  /*@__PURE__*/ /*#__PURE__*/ Saas;

export type CreateProjectsLocationsSaasError = DefaultErrors;

/** Create a new saas. */
export const createProjectsLocationsSaas: API.OperationMethod<
  CreateProjectsLocationsSaasRequest,
  CreateProjectsLocationsSaasResponse,
  CreateProjectsLocationsSaasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSaasRequest,
  output: CreateProjectsLocationsSaasResponse,
  errors: [],
}));

export interface ListProjectsLocationsSaasRequest {
  /** The maximum number of saas to send per page. */
  pageSize?: number;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
  /** Required. The parent of the saas. */
  parent: string;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsSaasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/saas",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSaasRequest>;

export type ListProjectsLocationsSaasResponse = ListSaasResponse;
export const ListProjectsLocationsSaasResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSaasResponse;

export type ListProjectsLocationsSaasError = DefaultErrors;

/** Retrieve a collection of saas. */
export const listProjectsLocationsSaas: API.PaginatedOperationMethod<
  ListProjectsLocationsSaasRequest,
  ListProjectsLocationsSaasResponse,
  ListProjectsLocationsSaasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsSaasRequest,
  output: ListProjectsLocationsSaasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsSaasRequest {
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Field mask is used to specify the fields to be overwritten in the Saas resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Saas will be overwritten. */
  updateMask?: string;
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/saas/{saas}" */
  name: string;
  /** Request body */
  body?: Saas;
}

export const PatchProjectsLocationsSaasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Saas).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/saas/{saasId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSaasRequest>;

export type PatchProjectsLocationsSaasResponse = Saas;
export const PatchProjectsLocationsSaasResponse =
  /*@__PURE__*/ /*#__PURE__*/ Saas;

export type PatchProjectsLocationsSaasError = DefaultErrors;

/** Update a single saas. */
export const patchProjectsLocationsSaas: API.OperationMethod<
  PatchProjectsLocationsSaasRequest,
  PatchProjectsLocationsSaasResponse,
  PatchProjectsLocationsSaasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSaasRequest,
  output: PatchProjectsLocationsSaasResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSaasRequest {
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Required. The resource name of the resource within a service. */
  name: string;
  /** The etag known to the client for the expected state of the saas. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the saas. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
}

export const DeleteProjectsLocationsSaasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/saas/{saasId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSaasRequest>;

export type DeleteProjectsLocationsSaasResponse = Empty;
export const DeleteProjectsLocationsSaasResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsSaasError = DefaultErrors;

/** Delete a single saas. */
export const deleteProjectsLocationsSaas: API.OperationMethod<
  DeleteProjectsLocationsSaasRequest,
  DeleteProjectsLocationsSaasResponse,
  DeleteProjectsLocationsSaasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSaasRequest,
  output: DeleteProjectsLocationsSaasResponse,
  errors: [],
}));

export interface GetProjectsLocationsSaasRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsSaasRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/saas/{saasId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSaasRequest>;

export type GetProjectsLocationsSaasResponse = Saas;
export const GetProjectsLocationsSaasResponse =
  /*@__PURE__*/ /*#__PURE__*/ Saas;

export type GetProjectsLocationsSaasError = DefaultErrors;

/** Retrieve a single saas. */
export const getProjectsLocationsSaas: API.OperationMethod<
  GetProjectsLocationsSaasRequest,
  GetProjectsLocationsSaasResponse,
  GetProjectsLocationsSaasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSaasRequest,
  output: GetProjectsLocationsSaasResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsRolloutsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** The etag known to the client for the expected state of the rollout. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the rollout. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. */
  etag?: string;
}

export const DeleteProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rollouts/{rolloutsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsRolloutsRequest>;

export type DeleteProjectsLocationsRolloutsResponse = Empty;
export const DeleteProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsRolloutsError = DefaultErrors;

/** Delete a single rollout. */
export const deleteProjectsLocationsRollouts: API.OperationMethod<
  DeleteProjectsLocationsRolloutsRequest,
  DeleteProjectsLocationsRolloutsResponse,
  DeleteProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsRolloutsRequest,
  output: DeleteProjectsLocationsRolloutsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRolloutsRequest {
  /** The maximum number of rollouts to send per page. */
  pageSize?: number;
  /** Required. The parent of the rollout. */
  parent: string;
  /** Filter the list as specified in https://google.aip.dev/160. */
  filter?: string;
  /** The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. */
  pageToken?: string;
  /** Order results as specified in https://google.aip.dev/132. */
  orderBy?: string;
}

export const ListProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rollouts",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRolloutsRequest>;

export type ListProjectsLocationsRolloutsResponse = ListRolloutsResponse;
export const ListProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListRolloutsResponse;

export type ListProjectsLocationsRolloutsError = DefaultErrors;

/** Retrieve a collection of rollouts. */
export const listProjectsLocationsRollouts: API.PaginatedOperationMethod<
  ListProjectsLocationsRolloutsRequest,
  ListProjectsLocationsRolloutsResponse,
  ListProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsRolloutsRequest,
  output: ListProjectsLocationsRolloutsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsRolloutsRequest {
  /** Required. The ID value for the new rollout. */
  rolloutId?: string;
  /** Required. The parent of the rollout. */
  parent: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Rollout;
}

export const CreateProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rolloutId: Schema.optional(Schema.String).pipe(T.HttpQuery("rolloutId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(Rollout).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rollouts",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsRolloutsRequest>;

export type CreateProjectsLocationsRolloutsResponse = Rollout;
export const CreateProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rollout;

export type CreateProjectsLocationsRolloutsError = DefaultErrors;

/** Create a new rollout. */
export const createProjectsLocationsRollouts: API.OperationMethod<
  CreateProjectsLocationsRolloutsRequest,
  CreateProjectsLocationsRolloutsResponse,
  CreateProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsRolloutsRequest,
  output: CreateProjectsLocationsRolloutsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsRolloutsRequest {
  /** Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}" */
  name: string;
  /** An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. */
  validateOnly?: boolean;
  /** Field mask is used to specify the fields to be overwritten in the Rollout resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Rollout will be overwritten. */
  updateMask?: string;
  /** Request body */
  body?: Rollout;
}

export const PatchProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    validateOnly: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("validateOnly"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(Rollout).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rollouts/{rolloutsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsRolloutsRequest>;

export type PatchProjectsLocationsRolloutsResponse = Rollout;
export const PatchProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rollout;

export type PatchProjectsLocationsRolloutsError = DefaultErrors;

/** Update a single rollout. */
export const patchProjectsLocationsRollouts: API.OperationMethod<
  PatchProjectsLocationsRolloutsRequest,
  PatchProjectsLocationsRolloutsResponse,
  PatchProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsRolloutsRequest,
  output: PatchProjectsLocationsRolloutsResponse,
  errors: [],
}));

export interface GetProjectsLocationsRolloutsRequest {
  /** Required. The resource name of the resource within a service. */
  name: string;
}

export const GetProjectsLocationsRolloutsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/rollouts/{rolloutsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRolloutsRequest>;

export type GetProjectsLocationsRolloutsResponse = Rollout;
export const GetProjectsLocationsRolloutsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Rollout;

export type GetProjectsLocationsRolloutsError = DefaultErrors;

/** Retrieve a single rollout. */
export const getProjectsLocationsRollouts: API.OperationMethod<
  GetProjectsLocationsRolloutsRequest,
  GetProjectsLocationsRolloutsResponse,
  GetProjectsLocationsRolloutsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsRolloutsRequest,
  output: GetProjectsLocationsRolloutsResponse,
  errors: [],
}));
