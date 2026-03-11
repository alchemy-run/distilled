// ==========================================================================
// OS Config API (osconfig v1alpha)
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
  name: "osconfig",
  version: "v1alpha",
  rootUrl: "https://osconfig.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudOsconfigV2__OperationMetadata {
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const GoogleCloudOsconfigV2__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigV2__OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata>;

export interface OSPolicyResourceFileRemote {
  /** Required. URI from which to fetch the object. It should contain both the protocol and path following the format `{protocol}://{location}`. */
  uri?: string;
  /** SHA256 checksum of the remote file. */
  sha256Checksum?: string;
}

export const OSPolicyResourceFileRemote: Schema.Schema<OSPolicyResourceFileRemote> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      sha256Checksum: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceFileRemote",
  }) as any as Schema.Schema<OSPolicyResourceFileRemote>;

export interface OSPolicyResourceFileGcs {
  /** Generation number of the Cloud Storage object. */
  generation?: string;
  /** Required. Name of the Cloud Storage object. */
  object?: string;
  /** Required. Bucket of the Cloud Storage object. */
  bucket?: string;
}

export const OSPolicyResourceFileGcs: Schema.Schema<OSPolicyResourceFileGcs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generation: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceFileGcs",
  }) as any as Schema.Schema<OSPolicyResourceFileGcs>;

export interface OSPolicyResourceFile {
  /** A generic remote file. */
  remote?: OSPolicyResourceFileRemote;
  /** A Cloud Storage object. */
  gcs?: OSPolicyResourceFileGcs;
  /** Defaults to false. When false, files are subject to validations based on the file type: Remote: A checksum must be specified. Cloud Storage: An object generation number must be specified. */
  allowInsecure?: boolean;
  /** A local path within the VM to use. */
  localPath?: string;
}

export const OSPolicyResourceFile: Schema.Schema<OSPolicyResourceFile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      remote: Schema.optional(OSPolicyResourceFileRemote),
      gcs: Schema.optional(OSPolicyResourceFileGcs),
      allowInsecure: Schema.optional(Schema.Boolean),
      localPath: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceFile",
  }) as any as Schema.Schema<OSPolicyResourceFile>;

export interface OSPolicyResourceFileResource {
  /** A remote or local source. */
  file?: OSPolicyResourceFile;
  /** Required. Desired state of the file. */
  state?:
    | "DESIRED_STATE_UNSPECIFIED"
    | "PRESENT"
    | "ABSENT"
    | "CONTENTS_MATCH"
    | (string & {});
  /** Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 */
  permissions?: string;
  /** Required. The absolute path of the file within the VM. */
  path?: string;
  /** A a file with this content. The size of the content is limited to 32KiB. */
  content?: string;
}

export const OSPolicyResourceFileResource: Schema.Schema<OSPolicyResourceFileResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      file: Schema.optional(OSPolicyResourceFile),
      state: Schema.optional(Schema.String),
      permissions: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceFileResource",
  }) as any as Schema.Schema<OSPolicyResourceFileResource>;

export interface OSPolicyResourceComplianceExecResourceOutput {
  /** Output from Enforcement phase output file (if run). Output size is limited to 100K bytes. */
  enforcementOutput?: string;
}

export const OSPolicyResourceComplianceExecResourceOutput: Schema.Schema<OSPolicyResourceComplianceExecResourceOutput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enforcementOutput: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceComplianceExecResourceOutput",
  }) as any as Schema.Schema<OSPolicyResourceComplianceExecResourceOutput>;

export interface OSPolicyResourceConfigStep {
  /** Configuration step type. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "VALIDATION"
    | "DESIRED_STATE_CHECK"
    | "DESIRED_STATE_ENFORCEMENT"
    | "DESIRED_STATE_CHECK_POST_ENFORCEMENT"
    | (string & {});
  /** Outcome of the configuration step. */
  outcome?: "OUTCOME_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** An error message recorded during the execution of this step. Only populated when outcome is FAILED. */
  errorMessage?: string;
}

export const OSPolicyResourceConfigStep: Schema.Schema<OSPolicyResourceConfigStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      outcome: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceConfigStep",
  }) as any as Schema.Schema<OSPolicyResourceConfigStep>;

export interface OSPolicyResourceCompliance {
  /** ExecResource specific output. */
  execResourceOutput?: OSPolicyResourceComplianceExecResourceOutput;
  /** The id of the OS policy resource. */
  osPolicyResourceId?: string;
  /** Ordered list of configuration steps taken by the agent for the OS policy resource. */
  configSteps?: Array<OSPolicyResourceConfigStep>;
  /** Compliance state of the OS policy resource. */
  state?:
    | "OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED"
    | "COMPLIANT"
    | "NON_COMPLIANT"
    | "UNKNOWN"
    | "NO_OS_POLICIES_APPLICABLE"
    | (string & {});
}

export const OSPolicyResourceCompliance: Schema.Schema<OSPolicyResourceCompliance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      execResourceOutput: Schema.optional(
        OSPolicyResourceComplianceExecResourceOutput,
      ),
      osPolicyResourceId: Schema.optional(Schema.String),
      configSteps: Schema.optional(Schema.Array(OSPolicyResourceConfigStep)),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceCompliance",
  }) as any as Schema.Schema<OSPolicyResourceCompliance>;

export interface InstanceOSPoliciesComplianceOSPolicyCompliance {
  /** The OS policy id */
  osPolicyId?: string;
  /** Reference to the `OSPolicyAssignment` API resource that the `OSPolicy` belongs to. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** Compliance data for each `OSPolicyResource` that is applied to the VM. */
  osPolicyResourceCompliances?: Array<OSPolicyResourceCompliance>;
  /** Compliance state of the OS policy. */
  state?:
    | "OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED"
    | "COMPLIANT"
    | "NON_COMPLIANT"
    | "UNKNOWN"
    | "NO_OS_POLICIES_APPLICABLE"
    | (string & {});
}

export const InstanceOSPoliciesComplianceOSPolicyCompliance: Schema.Schema<InstanceOSPoliciesComplianceOSPolicyCompliance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osPolicyId: Schema.optional(Schema.String),
      osPolicyAssignment: Schema.optional(Schema.String),
      osPolicyResourceCompliances: Schema.optional(
        Schema.Array(OSPolicyResourceCompliance),
      ),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceOSPoliciesComplianceOSPolicyCompliance",
  }) as any as Schema.Schema<InstanceOSPoliciesComplianceOSPolicyCompliance>;

export interface InstanceOSPoliciesCompliance {
  /** Output only. Compliance data for each `OSPolicy` that is applied to the VM. */
  osPolicyCompliances?: Array<InstanceOSPoliciesComplianceOSPolicyCompliance>;
  /** Output only. The `InstanceOSPoliciesCompliance` API resource name. Format: `projects/{project_number}/locations/{location}/instanceOSPoliciesCompliances/{instance_id}` */
  name?: string;
  /** Output only. Unique identifier for the last compliance run. This id will be logged by the OS config agent during a compliance run and can be used for debugging and tracing purpose. */
  lastComplianceRunId?: string;
  /** Output only. The Compute Engine VM instance name. */
  instance?: string;
  /** Output only. Detailed compliance state of the VM. This field is populated only when compliance state is `UNKNOWN`. It may contain one of the following values: * `no-compliance-data`: Compliance data is not available for this VM. * `no-agent-detected`: OS Config agent is not detected for this VM. * `config-not-supported-by-agent`: The version of the OS Config agent running on this VM does not support configuration management. * `inactive`: VM is not running. * `internal-service-errors`: There were internal service errors encountered while enforcing compliance. * `agent-errors`: OS config agent encountered errors while enforcing compliance. */
  detailedState?: string;
  /** Output only. Timestamp of the last compliance check for the VM. */
  lastComplianceCheckTime?: string;
  /** Output only. The reason for the `detailed_state` of the VM (if any). */
  detailedStateReason?: string;
  /** Output only. Compliance state of the VM. */
  state?:
    | "OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED"
    | "COMPLIANT"
    | "NON_COMPLIANT"
    | "UNKNOWN"
    | "NO_OS_POLICIES_APPLICABLE"
    | (string & {});
}

export const InstanceOSPoliciesCompliance: Schema.Schema<InstanceOSPoliciesCompliance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osPolicyCompliances: Schema.optional(
        Schema.Array(InstanceOSPoliciesComplianceOSPolicyCompliance),
      ),
      name: Schema.optional(Schema.String),
      lastComplianceRunId: Schema.optional(Schema.String),
      instance: Schema.optional(Schema.String),
      detailedState: Schema.optional(Schema.String),
      lastComplianceCheckTime: Schema.optional(Schema.String),
      detailedStateReason: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InstanceOSPoliciesCompliance",
  }) as any as Schema.Schema<InstanceOSPoliciesCompliance>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface OSPolicyResourcePackageResourceGooGet {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceGooGet: Schema.Schema<OSPolicyResourcePackageResourceGooGet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceGooGet",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceGooGet>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep {
  /** Configuration step type. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "VALIDATION"
    | "DESIRED_STATE_CHECK"
    | "DESIRED_STATE_ENFORCEMENT"
    | "DESIRED_STATE_CHECK_POST_ENFORCEMENT"
    | (string & {});
  /** An error message recorded during the execution of this step. Only populated if errors were encountered during this step execution. */
  errorMessage?: string;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep",
  }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep>;

export interface OSPolicyAssignmentInstanceFilterInventory {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyAssignmentInstanceFilterInventory: Schema.Schema<OSPolicyAssignmentInstanceFilterInventory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osShortName: Schema.optional(Schema.String),
      osVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentInstanceFilterInventory",
  }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilterInventory>;

export interface MessageSet {}

export const MessageSet: Schema.Schema<MessageSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "MessageSet",
  }) as any as Schema.Schema<MessageSet>;

export interface StatusProto {
  /** message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; */
  messageSet?: MessageSet;
  /** copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; */
  canonicalCode?: number;
  /** copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs */
  space?: string;
  /** Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; */
  message?: string;
  /** Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; */
  code?: number;
}

export const StatusProto: Schema.Schema<StatusProto> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageSet: Schema.optional(MessageSet),
      canonicalCode: Schema.optional(Schema.Number),
      space: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
      code: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "StatusProto",
  }) as any as Schema.Schema<StatusProto>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput {
  /** Output from enforcement phase output file (if run). Output size is limited to 100K bytes. */
  enforcementOutput?: string;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enforcementOutput: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput",
  }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput>;

export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance {
  /** The compliance state of the resource. */
  complianceState?: "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
  /** ExecResource specific output. */
  execResourceOutput?: OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput;
  /** The ID of the OS policy resource. */
  osPolicyResourceId?: string;
  /** Ordered list of configuration completed by the agent for the OS policy resource. */
  configSteps?: Array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep>;
  /** A reason for the resource to be in the given compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. The following values are supported when `compliance_state == UNKNOWN` * `execution-errors`: Errors were encountered by the agent while executing the resource and the compliance state couldn't be determined. * `execution-skipped-by-agent`: Resource execution was skipped by the agent because errors were encountered while executing prior resources in the OS policy. * `os-policy-execution-attempt-failed`: The execution of the OS policy containing this resource failed and the compliance state couldn't be determined. * `os-policy-execution-pending`: OS policy that owns this resource was assigned to the given VM, but was not executed yet. */
  complianceStateReason?: string;
}

export const OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance: Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      complianceState: Schema.optional(Schema.String),
      execResourceOutput: Schema.optional(
        OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput,
      ),
      osPolicyResourceId: Schema.optional(Schema.String),
      configSteps: Schema.optional(
        Schema.Array(
          OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep,
        ),
      ),
      complianceStateReason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance",
  }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance>;

export interface OSPolicyAssignmentReportOSPolicyCompliance {
  /** The OS policy id */
  osPolicyId?: string;
  /** The compliance state of the OS policy. */
  complianceState?: "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT" | (string & {});
  /** The reason for the OS policy to be in an unknown compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. If populated, the field can contain one of the following values: * `vm-not-running`: The VM was not running. * `os-policies-not-supported-by-agent`: The version of the OS Config agent running on the VM does not support running OS policies. * `no-agent-detected`: The OS Config agent is not detected for the VM. * `resource-execution-errors`: The OS Config agent encountered errors while executing one or more resources in the policy. See `os_policy_resource_compliances` for details. * `task-timeout`: The task sent to the agent to apply the policy timed out. * `unexpected-agent-state`: The OS Config agent did not report the final status of the task that attempted to apply the policy. Instead, the agent unexpectedly started working on a different task. This mostly happens when the agent or VM unexpectedly restarts while applying OS policies. * `internal-service-errors`: Internal service errors were encountered while attempting to apply the policy. * `os-policy-execution-pending`: OS policy was assigned to the given VM, but was not executed yet. Typically this is a transient condition that will go away after the next policy execution cycle. */
  complianceStateReason?: string;
  /** Compliance data for each resource within the policy that is applied to the VM. */
  osPolicyResourceCompliances?: Array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance>;
}

export const OSPolicyAssignmentReportOSPolicyCompliance: Schema.Schema<OSPolicyAssignmentReportOSPolicyCompliance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osPolicyId: Schema.optional(Schema.String),
      complianceState: Schema.optional(Schema.String),
      complianceStateReason: Schema.optional(Schema.String),
      osPolicyResourceCompliances: Schema.optional(
        Schema.Array(
          OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance,
        ),
      ),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentReportOSPolicyCompliance",
  }) as any as Schema.Schema<OSPolicyAssignmentReportOSPolicyCompliance>;

export interface OSPolicyAssignmentReport {
  /** The `OSPolicyAssignmentReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/osPolicyAssignments/{os_policy_assignment_id}/report` */
  name?: string;
  /** The Compute Engine VM instance name. */
  instance?: string;
  /** Unique identifier of the last attempted run to apply the OS policies associated with this assignment on the VM. This ID is logged by the OS Config agent while applying the OS policies associated with this assignment on the VM. NOTE: If the service is unable to successfully connect to the agent for this run, then this id will not be available in the agent logs. */
  lastRunId?: string;
  /** Timestamp for when the report was last generated. */
  updateTime?: string;
  /** Reference to the `OSPolicyAssignment` API resource that the `OSPolicy` belongs to. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** Compliance data for each `OSPolicy` that is applied to the VM. */
  osPolicyCompliances?: Array<OSPolicyAssignmentReportOSPolicyCompliance>;
}

export const OSPolicyAssignmentReport: Schema.Schema<OSPolicyAssignmentReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      instance: Schema.optional(Schema.String),
      lastRunId: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      osPolicyAssignment: Schema.optional(Schema.String),
      osPolicyCompliances: Schema.optional(
        Schema.Array(OSPolicyAssignmentReportOSPolicyCompliance),
      ),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentReport",
  }) as any as Schema.Schema<OSPolicyAssignmentReport>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface OSPolicyResourceRepositoryResourceZypperRepository {
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
  /** Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for GuestPolicy conflicts. */
  id?: string;
}

export const OSPolicyResourceRepositoryResourceZypperRepository: Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      baseUrl: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      gpgKeys: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceRepositoryResourceZypperRepository",
  }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository>;

export interface VulnerabilityReportVulnerabilityItem {
  /** Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. */
  availableInventoryItemId?: string;
  /** Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some operating systems, this field might be empty. */
  installedInventoryItemId?: string;
  /** The recommended [CPE URI](https://cpe.mitre.org/specification/) update that contains a fix for this vulnerability. */
  fixedCpeUri?: string;
  /** The upstream OS patch, packages or KB that fixes the vulnerability. */
  upstreamFix?: string;
}

export const VulnerabilityReportVulnerabilityItem: Schema.Schema<VulnerabilityReportVulnerabilityItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      availableInventoryItemId: Schema.optional(Schema.String),
      installedInventoryItemId: Schema.optional(Schema.String),
      fixedCpeUri: Schema.optional(Schema.String),
      upstreamFix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityReportVulnerabilityItem",
  }) as any as Schema.Schema<VulnerabilityReportVulnerabilityItem>;

export interface VulnerabilityReportVulnerabilityDetailsReference {
  /** The url of the reference. */
  url?: string;
  /** The source of the reference e.g. NVD. */
  source?: string;
}

export const VulnerabilityReportVulnerabilityDetailsReference: Schema.Schema<VulnerabilityReportVulnerabilityDetailsReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityReportVulnerabilityDetailsReference",
  }) as any as Schema.Schema<VulnerabilityReportVulnerabilityDetailsReference>;

export interface CVSSv3 {
  /** This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. */
  confidentialityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
  /** The Impact sub-score equation is derived from the Base Impact metrics. */
  impactScore?: number;
  /** This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. */
  privilegesRequired?:
    | "PRIVILEGES_REQUIRED_UNSPECIFIED"
    | "PRIVILEGES_REQUIRED_NONE"
    | "PRIVILEGES_REQUIRED_LOW"
    | "PRIVILEGES_REQUIRED_HIGH"
    | (string & {});
  /** This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. */
  userInteraction?:
    | "USER_INTERACTION_UNSPECIFIED"
    | "USER_INTERACTION_NONE"
    | "USER_INTERACTION_REQUIRED"
    | (string & {});
  /** This metric measures the impact to integrity of a successfully exploited vulnerability. */
  integrityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
  /** This metric reflects the context by which vulnerability exploitation is possible. */
  attackVector?:
    | "ATTACK_VECTOR_UNSPECIFIED"
    | "ATTACK_VECTOR_NETWORK"
    | "ATTACK_VECTOR_ADJACENT"
    | "ATTACK_VECTOR_LOCAL"
    | "ATTACK_VECTOR_PHYSICAL"
    | (string & {});
  /** This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability. */
  attackComplexity?:
    | "ATTACK_COMPLEXITY_UNSPECIFIED"
    | "ATTACK_COMPLEXITY_LOW"
    | "ATTACK_COMPLEXITY_HIGH"
    | (string & {});
  /** The Exploitability sub-score equation is derived from the Base Exploitability metrics. https://www.first.org/cvss/specification-document#2-1-Exploitability-Metrics */
  exploitabilityScore?: number;
  /** The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. */
  scope?:
    | "SCOPE_UNSPECIFIED"
    | "SCOPE_UNCHANGED"
    | "SCOPE_CHANGED"
    | (string & {});
  /** The base score is a function of the base metric scores. https://www.first.org/cvss/specification-document#Base-Metrics */
  baseScore?: number;
  /** This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. */
  availabilityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | (string & {});
}

export const CVSSv3: Schema.Schema<CVSSv3> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      confidentialityImpact: Schema.optional(Schema.String),
      impactScore: Schema.optional(Schema.Number),
      privilegesRequired: Schema.optional(Schema.String),
      userInteraction: Schema.optional(Schema.String),
      integrityImpact: Schema.optional(Schema.String),
      attackVector: Schema.optional(Schema.String),
      attackComplexity: Schema.optional(Schema.String),
      exploitabilityScore: Schema.optional(Schema.Number),
      scope: Schema.optional(Schema.String),
      baseScore: Schema.optional(Schema.Number),
      availabilityImpact: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "CVSSv3" }) as any as Schema.Schema<CVSSv3>;

export interface VulnerabilityReportVulnerabilityDetails {
  /** The note or description describing the vulnerability from the distro. */
  description?: string;
  /** Assigned severity/impact ranking from the distro. */
  severity?: string;
  /** Corresponds to the references attached to the `VulnerabilityDetails`. */
  references?: Array<VulnerabilityReportVulnerabilityDetailsReference>;
  /** The CVSS V2 score of this vulnerability. CVSS V2 score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. */
  cvssV2Score?: number;
  /** The CVE of the vulnerability. CVE cannot be empty and the combination of should be unique across vulnerabilities for a VM. */
  cve?: string;
  /** The full description of the CVSSv3 for this vulnerability from NVD. */
  cvssV3?: CVSSv3;
}

export const VulnerabilityReportVulnerabilityDetails: Schema.Schema<VulnerabilityReportVulnerabilityDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
      references: Schema.optional(
        Schema.Array(VulnerabilityReportVulnerabilityDetailsReference),
      ),
      cvssV2Score: Schema.optional(Schema.Number),
      cve: Schema.optional(Schema.String),
      cvssV3: Schema.optional(CVSSv3),
    }),
  ).annotate({
    identifier: "VulnerabilityReportVulnerabilityDetails",
  }) as any as Schema.Schema<VulnerabilityReportVulnerabilityDetails>;

export interface VulnerabilityReportVulnerability {
  /** List of items affected by the vulnerability. */
  items?: Array<VulnerabilityReportVulnerabilityItem>;
  /** Contains metadata as per the upstream feed of the operating system and NVD. */
  details?: VulnerabilityReportVulnerabilityDetails;
  /** The timestamp for when the vulnerability was first detected. */
  createTime?: string;
  /** Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This field displays the inventory items affected by this vulnerability. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. For some distros, this field may be empty. */
  installedInventoryItemIds?: Array<string>;
  /** Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the vulnerability report was not updated after the VM inventory update, these values might not display in VM inventory. If there is no available fix, the field is empty. The `inventory_item` value specifies the latest `SoftwarePackage` available to the VM that fixes the vulnerability. */
  availableInventoryItemIds?: Array<string>;
  /** The timestamp for when the vulnerability was last modified. */
  updateTime?: string;
}

export const VulnerabilityReportVulnerability: Schema.Schema<VulnerabilityReportVulnerability> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(VulnerabilityReportVulnerabilityItem),
      ),
      details: Schema.optional(VulnerabilityReportVulnerabilityDetails),
      createTime: Schema.optional(Schema.String),
      installedInventoryItemIds: Schema.optional(Schema.Array(Schema.String)),
      availableInventoryItemIds: Schema.optional(Schema.Array(Schema.String)),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityReportVulnerability",
  }) as any as Schema.Schema<VulnerabilityReportVulnerability>;

export interface OSPolicyResourceRepositoryResourceYumRepository {
  /** Required. A one word, unique name for this repository. This is the `repo id` in the yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for resource conflicts. */
  id?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
  /** Required. The location of the repository directory. */
  baseUrl?: string;
}

export const OSPolicyResourceRepositoryResourceYumRepository: Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      gpgKeys: Schema.optional(Schema.Array(Schema.String)),
      baseUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceRepositoryResourceYumRepository",
  }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository>;

export interface GoogleCloudOsconfigCommonV1alpha__OperationMetadata {
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1alpha__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      createTime: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigCommonV1alpha__OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata>;

export interface InventoryWindowsUpdatePackageWindowsUpdateCategory {
  /** The identifier of the windows update category. */
  id?: string;
  /** The name of the windows update category. */
  name?: string;
}

export const InventoryWindowsUpdatePackageWindowsUpdateCategory: Schema.Schema<InventoryWindowsUpdatePackageWindowsUpdateCategory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryWindowsUpdatePackageWindowsUpdateCategory",
  }) as any as Schema.Schema<InventoryWindowsUpdatePackageWindowsUpdateCategory>;

export interface InventoryWindowsUpdatePackage {
  /** The localized title of the update package. */
  title?: string;
  /** A collection of Microsoft Knowledge Base article IDs that are associated with the update package. */
  kbArticleIds?: Array<string>;
  /** The categories that are associated with this update package. */
  categories?: Array<InventoryWindowsUpdatePackageWindowsUpdateCategory>;
  /** A hyperlink to the language-specific support information for the update. */
  supportUrl?: string;
  /** The localized description of the update package. */
  description?: string;
  /** A collection of URLs that provide more information about the update package. */
  moreInfoUrls?: Array<string>;
  /** The revision number of this update package. */
  revisionNumber?: number;
  /** The last published date of the update, in (UTC) date and time. */
  lastDeploymentChangeTime?: string;
  /** Gets the identifier of an update package. Stays the same across revisions. */
  updateId?: string;
}

export const InventoryWindowsUpdatePackage: Schema.Schema<InventoryWindowsUpdatePackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      kbArticleIds: Schema.optional(Schema.Array(Schema.String)),
      categories: Schema.optional(
        Schema.Array(InventoryWindowsUpdatePackageWindowsUpdateCategory),
      ),
      supportUrl: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      moreInfoUrls: Schema.optional(Schema.Array(Schema.String)),
      revisionNumber: Schema.optional(Schema.Number),
      lastDeploymentChangeTime: Schema.optional(Schema.String),
      updateId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryWindowsUpdatePackage",
  }) as any as Schema.Schema<InventoryWindowsUpdatePackage>;

export interface OSPolicyResourceExecResourceExec {
  /** An inline script. The size of the script is limited to 32KiB. */
  script?: string;
  /** Required. The script interpreter to use. */
  interpreter?:
    | "INTERPRETER_UNSPECIFIED"
    | "NONE"
    | "SHELL"
    | "POWERSHELL"
    | (string & {});
  /** Optional arguments to pass to the source during execution. */
  args?: Array<string>;
  /** Only recorded for enforce Exec. Path to an output file (that is created by this Exec) whose content will be recorded in OSPolicyResourceCompliance after a successful run. Absence or failure to read this file will result in this ExecResource being non-compliant. Output file size is limited to 100K bytes. */
  outputFilePath?: string;
  /** A remote or local file. */
  file?: OSPolicyResourceFile;
}

export const OSPolicyResourceExecResourceExec: Schema.Schema<OSPolicyResourceExecResourceExec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      script: Schema.optional(Schema.String),
      interpreter: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Array(Schema.String)),
      outputFilePath: Schema.optional(Schema.String),
      file: Schema.optional(OSPolicyResourceFile),
    }),
  ).annotate({
    identifier: "OSPolicyResourceExecResourceExec",
  }) as any as Schema.Schema<OSPolicyResourceExecResourceExec>;

export interface OSPolicyAssignmentLabelSet {
  /** Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected. */
  labels?: Record<string, string>;
}

export const OSPolicyAssignmentLabelSet: Schema.Schema<OSPolicyAssignmentLabelSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentLabelSet",
  }) as any as Schema.Schema<OSPolicyAssignmentLabelSet>;

export interface OSPolicyAssignmentInstanceFilter {
  /** List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories. */
  inventories?: Array<OSPolicyAssignmentInstanceFilterInventory>;
  /** List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM. */
  exclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
  /** Target all VMs in the project. If true, no other criteria is permitted. */
  all?: boolean;
  /** List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM. */
  inclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
  /** Deprecated. Use the `inventories` field instead. A VM is selected if it's OS short name matches with any of the values provided in this list. */
  osShortNames?: Array<string>;
}

export const OSPolicyAssignmentInstanceFilter: Schema.Schema<OSPolicyAssignmentInstanceFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventories: Schema.optional(
        Schema.Array(OSPolicyAssignmentInstanceFilterInventory),
      ),
      exclusionLabels: Schema.optional(
        Schema.Array(OSPolicyAssignmentLabelSet),
      ),
      all: Schema.optional(Schema.Boolean),
      inclusionLabels: Schema.optional(
        Schema.Array(OSPolicyAssignmentLabelSet),
      ),
      osShortNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentInstanceFilter",
  }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilter>;

export interface ListOSPolicyAssignmentReportsResponse {
  /** The pagination token to retrieve the next page of OS policy assignment report objects. */
  nextPageToken?: string;
  /** List of OS policy assignment reports. */
  osPolicyAssignmentReports?: Array<OSPolicyAssignmentReport>;
}

export const ListOSPolicyAssignmentReportsResponse: Schema.Schema<ListOSPolicyAssignmentReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      osPolicyAssignmentReports: Schema.optional(
        Schema.Array(OSPolicyAssignmentReport),
      ),
    }),
  ).annotate({
    identifier: "ListOSPolicyAssignmentReportsResponse",
  }) as any as Schema.Schema<ListOSPolicyAssignmentReportsResponse>;

export interface FixedOrPercent {
  /** Specifies a fixed value. */
  fixed?: number;
  /** Specifies the relative value defined as a percentage, which will be multiplied by a reference value. */
  percent?: number;
}

export const FixedOrPercent: Schema.Schema<FixedOrPercent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fixed: Schema.optional(Schema.Number),
      percent: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "FixedOrPercent",
  }) as any as Schema.Schema<FixedOrPercent>;

export interface OSPolicyAssignmentRollout {
  /** Required. The maximum number (or percentage) of VMs per zone to disrupt at any given moment. */
  disruptionBudget?: FixedOrPercent;
  /** Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied. */
  minWaitDuration?: string;
}

export const OSPolicyAssignmentRollout: Schema.Schema<OSPolicyAssignmentRollout> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disruptionBudget: Schema.optional(FixedOrPercent),
      minWaitDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentRollout",
  }) as any as Schema.Schema<OSPolicyAssignmentRollout>;

export interface OSPolicyInventoryFilter {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyInventoryFilter: Schema.Schema<OSPolicyInventoryFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osShortName: Schema.optional(Schema.String),
      osVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyInventoryFilter",
  }) as any as Schema.Schema<OSPolicyInventoryFilter>;

export interface OSPolicyResourceExecResource {
  /** What to run to bring this resource into the desired state. An exit code of 100 indicates "success", any other exit code indicates a failure running enforce. */
  enforce?: OSPolicyResourceExecResourceExec;
  /** Required. What to run to validate this resource is in the desired state. An exit code of 100 indicates "in desired state", and exit code of 101 indicates "not in desired state". Any other exit code indicates a failure running validate. */
  validate?: OSPolicyResourceExecResourceExec;
}

export const OSPolicyResourceExecResource: Schema.Schema<OSPolicyResourceExecResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enforce: Schema.optional(OSPolicyResourceExecResourceExec),
      validate: Schema.optional(OSPolicyResourceExecResourceExec),
    }),
  ).annotate({
    identifier: "OSPolicyResourceExecResource",
  }) as any as Schema.Schema<OSPolicyResourceExecResource>;

export interface OSPolicyResourceRepositoryResourceAptRepository {
  /** Required. URI for this repository. */
  uri?: string;
  /** Required. Distribution of this repository. */
  distribution?: string;
  /** URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg`. */
  gpgKey?: string;
  /** Required. Type of archive files in this repository. */
  archiveType?: "ARCHIVE_TYPE_UNSPECIFIED" | "DEB" | "DEB_SRC" | (string & {});
  /** Required. List of components for this repository. Must contain at least one item. */
  components?: Array<string>;
}

export const OSPolicyResourceRepositoryResourceAptRepository: Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      distribution: Schema.optional(Schema.String),
      gpgKey: Schema.optional(Schema.String),
      archiveType: Schema.optional(Schema.String),
      components: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "OSPolicyResourceRepositoryResourceAptRepository",
  }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository>;

export interface OSPolicyResourceRepositoryResourceGooRepository {
  /** Required. The name of the repository. */
  name?: string;
  /** Required. The url of the repository. */
  url?: string;
}

export const OSPolicyResourceRepositoryResourceGooRepository: Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourceRepositoryResourceGooRepository",
  }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository>;

export interface OSPolicyResourceRepositoryResource {
  /** A Yum Repository. */
  yum?: OSPolicyResourceRepositoryResourceYumRepository;
  /** A Zypper Repository. */
  zypper?: OSPolicyResourceRepositoryResourceZypperRepository;
  /** An Apt Repository. */
  apt?: OSPolicyResourceRepositoryResourceAptRepository;
  /** A Goo Repository. */
  goo?: OSPolicyResourceRepositoryResourceGooRepository;
}

export const OSPolicyResourceRepositoryResource: Schema.Schema<OSPolicyResourceRepositoryResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      yum: Schema.optional(OSPolicyResourceRepositoryResourceYumRepository),
      zypper: Schema.optional(
        OSPolicyResourceRepositoryResourceZypperRepository,
      ),
      apt: Schema.optional(OSPolicyResourceRepositoryResourceAptRepository),
      goo: Schema.optional(OSPolicyResourceRepositoryResourceGooRepository),
    }),
  ).annotate({
    identifier: "OSPolicyResourceRepositoryResource",
  }) as any as Schema.Schema<OSPolicyResourceRepositoryResource>;

export interface OSPolicyResourcePackageResourceRPM {
  /** Required. An rpm package. */
  source?: OSPolicyResourceFile;
  /** Whether dependencies should also be installed. - install when false: `rpm --upgrade --replacepkgs package.rpm` - install when true: `yum -y install package.rpm` or `zypper -y install package.rpm` */
  pullDeps?: boolean;
}

export const OSPolicyResourcePackageResourceRPM: Schema.Schema<OSPolicyResourcePackageResourceRPM> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(OSPolicyResourceFile),
      pullDeps: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceRPM",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceRPM>;

export interface OSPolicyResourcePackageResourceMSI {
  /** Additional properties to use during installation. This should be in the format of Property=Setting. Appended to the defaults of `ACTION=INSTALL REBOOT=ReallySuppress`. */
  properties?: Array<string>;
  /** Required. The MSI package. */
  source?: OSPolicyResourceFile;
}

export const OSPolicyResourcePackageResourceMSI: Schema.Schema<OSPolicyResourcePackageResourceMSI> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      properties: Schema.optional(Schema.Array(Schema.String)),
      source: Schema.optional(OSPolicyResourceFile),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceMSI",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceMSI>;

export interface OSPolicyResourcePackageResourceAPT {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceAPT: Schema.Schema<OSPolicyResourcePackageResourceAPT> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceAPT",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceAPT>;

export interface OSPolicyResourcePackageResourceDeb {
  /** Whether dependencies should also be installed. - install when false: `dpkg -i package` - install when true: `apt-get update && apt-get -y install package.deb` */
  pullDeps?: boolean;
  /** Required. A deb package. */
  source?: OSPolicyResourceFile;
}

export const OSPolicyResourcePackageResourceDeb: Schema.Schema<OSPolicyResourcePackageResourceDeb> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pullDeps: Schema.optional(Schema.Boolean),
      source: Schema.optional(OSPolicyResourceFile),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceDeb",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceDeb>;

export interface OSPolicyResourcePackageResourceYUM {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceYUM: Schema.Schema<OSPolicyResourcePackageResourceYUM> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceYUM",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceYUM>;

export interface OSPolicyResourcePackageResourceZypper {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceZypper: Schema.Schema<OSPolicyResourcePackageResourceZypper> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResourceZypper",
  }) as any as Schema.Schema<OSPolicyResourcePackageResourceZypper>;

export interface OSPolicyResourcePackageResource {
  /** Required. The desired state the agent should maintain for this package. */
  desiredState?:
    | "DESIRED_STATE_UNSPECIFIED"
    | "INSTALLED"
    | "REMOVED"
    | (string & {});
  /** An rpm package file. */
  rpm?: OSPolicyResourcePackageResourceRPM;
  /** An MSI package. */
  msi?: OSPolicyResourcePackageResourceMSI;
  /** A package managed by Apt. */
  apt?: OSPolicyResourcePackageResourceAPT;
  /** A deb package file. */
  deb?: OSPolicyResourcePackageResourceDeb;
  /** A package managed by YUM. */
  yum?: OSPolicyResourcePackageResourceYUM;
  /** A package managed by Zypper. */
  zypper?: OSPolicyResourcePackageResourceZypper;
  /** A package managed by GooGet. */
  googet?: OSPolicyResourcePackageResourceGooGet;
}

export const OSPolicyResourcePackageResource: Schema.Schema<OSPolicyResourcePackageResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      desiredState: Schema.optional(Schema.String),
      rpm: Schema.optional(OSPolicyResourcePackageResourceRPM),
      msi: Schema.optional(OSPolicyResourcePackageResourceMSI),
      apt: Schema.optional(OSPolicyResourcePackageResourceAPT),
      deb: Schema.optional(OSPolicyResourcePackageResourceDeb),
      yum: Schema.optional(OSPolicyResourcePackageResourceYUM),
      zypper: Schema.optional(OSPolicyResourcePackageResourceZypper),
      googet: Schema.optional(OSPolicyResourcePackageResourceGooGet),
    }),
  ).annotate({
    identifier: "OSPolicyResourcePackageResource",
  }) as any as Schema.Schema<OSPolicyResourcePackageResource>;

export interface OSPolicyResource {
  /** File resource */
  file?: OSPolicyResourceFileResource;
  /** Exec resource */
  exec?: OSPolicyResourceExecResource;
  /** Package repository resource */
  repository?: OSPolicyResourceRepositoryResource;
  /** Required. The id of the resource with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the OS policy. */
  id?: string;
  /** Package resource */
  pkg?: OSPolicyResourcePackageResource;
}

export const OSPolicyResource: Schema.Schema<OSPolicyResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      file: Schema.optional(OSPolicyResourceFileResource),
      exec: Schema.optional(OSPolicyResourceExecResource),
      repository: Schema.optional(OSPolicyResourceRepositoryResource),
      id: Schema.optional(Schema.String),
      pkg: Schema.optional(OSPolicyResourcePackageResource),
    }),
  ).annotate({
    identifier: "OSPolicyResource",
  }) as any as Schema.Schema<OSPolicyResource>;

export interface OSPolicyOSFilter {
  /** This should match OS short name emitted by the OS inventory agent. An empty value matches any OS. */
  osShortName?: string;
  /** This value should match the version emitted by the OS inventory agent. Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` */
  osVersion?: string;
}

export const OSPolicyOSFilter: Schema.Schema<OSPolicyOSFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osShortName: Schema.optional(Schema.String),
      osVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyOSFilter",
  }) as any as Schema.Schema<OSPolicyOSFilter>;

export interface OSPolicyResourceGroup {
  /** List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters[0].os_short_name='rhel' and inventory_filters[1].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally. */
  inventoryFilters?: Array<OSPolicyInventoryFilter>;
  /** Required. List of resources configured for this resource group. The resources are executed in the exact order specified here. */
  resources?: Array<OSPolicyResource>;
  /** Deprecated. Use the `inventory_filters` field instead. Used to specify the OS filter for a resource group */
  osFilter?: OSPolicyOSFilter;
}

export const OSPolicyResourceGroup: Schema.Schema<OSPolicyResourceGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inventoryFilters: Schema.optional(Schema.Array(OSPolicyInventoryFilter)),
      resources: Schema.optional(Schema.Array(OSPolicyResource)),
      osFilter: Schema.optional(OSPolicyOSFilter),
    }),
  ).annotate({
    identifier: "OSPolicyResourceGroup",
  }) as any as Schema.Schema<OSPolicyResourceGroup>;

export interface OSPolicy {
  /** This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce. */
  allowNoResourceGroupMatch?: boolean;
  /** Required. The id of the OS policy with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the assignment. */
  id?: string;
  /** Required. Policy mode */
  mode?: "MODE_UNSPECIFIED" | "VALIDATION" | "ENFORCEMENT" | (string & {});
  /** Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match` */
  resourceGroups?: Array<OSPolicyResourceGroup>;
  /** Policy description. Length of the description is limited to 1024 characters. */
  description?: string;
}

export const OSPolicy: Schema.Schema<OSPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowNoResourceGroupMatch: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      mode: Schema.optional(Schema.String),
      resourceGroups: Schema.optional(Schema.Array(OSPolicyResourceGroup)),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "OSPolicy" }) as any as Schema.Schema<OSPolicy>;

export interface OSPolicyAssignment {
  /** Required. Filter to select VMs. */
  instanceFilter?: OSPolicyAssignmentInstanceFilter;
  /** Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment */
  revisionId?: string;
  /** OS policy assignment description. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Output only. Indicates that this revision deletes the OS policy assignment. */
  deleted?: boolean;
  /** Output only. Server generated unique id for the OS policy assignment resource. */
  uid?: string;
  /** Required. Rollout to deploy the OS policy assignment. A rollout is triggered in the following situations: 1) OSPolicyAssignment is created. 2) OSPolicyAssignment is updated and the update contains changes to one of the following fields: - instance_filter - os_policies 3) OSPolicyAssignment is deleted. */
  rollout?: OSPolicyAssignmentRollout;
  /** The etag for this OS policy assignment. If this is provided on update, it must match the server's etag. */
  etag?: string;
  /** Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field. */
  baseline?: boolean;
  /** Required. List of OS policies to be applied to the VMs. */
  osPolicies?: Array<OSPolicy>;
  /** Output only. OS policy assignment rollout state */
  rolloutState?:
    | "ROLLOUT_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "CANCELLING"
    | "CANCELLED"
    | "SUCCEEDED"
    | (string & {});
  /** Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: * IN_PROGRESS * CANCELLING */
  reconciling?: boolean;
  /** Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. */
  name?: string;
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
}

export const OSPolicyAssignment: Schema.Schema<OSPolicyAssignment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instanceFilter: Schema.optional(OSPolicyAssignmentInstanceFilter),
      revisionId: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      uid: Schema.optional(Schema.String),
      rollout: Schema.optional(OSPolicyAssignmentRollout),
      etag: Schema.optional(Schema.String),
      baseline: Schema.optional(Schema.Boolean),
      osPolicies: Schema.optional(Schema.Array(OSPolicy)),
      rolloutState: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      revisionCreateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyAssignment",
  }) as any as Schema.Schema<OSPolicyAssignment>;

export interface InventoryOsInfo {
  /** The VM hostname. */
  hostname?: string;
  /** The operating system long name. For example 'Debian GNU/Linux 9' or 'Microsoft Window Server 2019 Datacenter'. */
  longName?: string;
  /** The current version of the OS Config agent running on the VM. */
  osconfigAgentVersion?: string;
  /** The version of the operating system. */
  version?: string;
  /** The operating system short name. For example, 'windows' or 'debian'. */
  shortName?: string;
  /** The system architecture of the operating system. */
  architecture?: string;
  /** The kernel version of the operating system. */
  kernelVersion?: string;
  /** The kernel release of the operating system. */
  kernelRelease?: string;
}

export const InventoryOsInfo: Schema.Schema<InventoryOsInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hostname: Schema.optional(Schema.String),
      longName: Schema.optional(Schema.String),
      osconfigAgentVersion: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      shortName: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      kernelVersion: Schema.optional(Schema.String),
      kernelRelease: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryOsInfo",
  }) as any as Schema.Schema<InventoryOsInfo>;

export interface VulnerabilityReport {
  /** Output only. Highest level of severity among all the upgradable vulnerabilities with CVEs attached. */
  highestUpgradableCveSeverity?:
    | "VULNERABILITY_SEVERITY_LEVEL_UNSPECIFIED"
    | "NONE"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** Output only. The `vulnerabilityReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/vulnerabilityReport` */
  name?: string;
  /** Output only. The timestamp for when the last vulnerability report was generated for the VM. */
  updateTime?: string;
  /** Output only. List of vulnerabilities affecting the VM. */
  vulnerabilities?: Array<VulnerabilityReportVulnerability>;
}

export const VulnerabilityReport: Schema.Schema<VulnerabilityReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      highestUpgradableCveSeverity: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      vulnerabilities: Schema.optional(
        Schema.Array(VulnerabilityReportVulnerability),
      ),
    }),
  ).annotate({
    identifier: "VulnerabilityReport",
  }) as any as Schema.Schema<VulnerabilityReport>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
}

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface InventoryZypperPatch {
  /** The severity specified for this patch */
  severity?: string;
  /** The name of the patch. */
  patchName?: string;
  /** Any summary information provided about this patch. */
  summary?: string;
  /** The category of the patch. */
  category?: string;
}

export const InventoryZypperPatch: Schema.Schema<InventoryZypperPatch> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      severity: Schema.optional(Schema.String),
      patchName: Schema.optional(Schema.String),
      summary: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryZypperPatch",
  }) as any as Schema.Schema<InventoryZypperPatch>;

export interface ListInstanceOSPoliciesCompliancesResponse {
  /** The pagination token to retrieve the next page of instance OS policies compliance objects. */
  nextPageToken?: string;
  /** List of instance OS policies compliance objects. */
  instanceOsPoliciesCompliances?: Array<InstanceOSPoliciesCompliance>;
}

export const ListInstanceOSPoliciesCompliancesResponse: Schema.Schema<ListInstanceOSPoliciesCompliancesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      instanceOsPoliciesCompliances: Schema.optional(
        Schema.Array(InstanceOSPoliciesCompliance),
      ),
    }),
  ).annotate({
    identifier: "ListInstanceOSPoliciesCompliancesResponse",
  }) as any as Schema.Schema<ListInstanceOSPoliciesCompliancesResponse>;

export interface GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  /** Rollout update time */
  rolloutUpdateTime?: string;
  /** State of the rollout */
  rolloutState?:
    | "ROLLOUT_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "CANCELLING"
    | "CANCELLED"
    | "SUCCEEDED"
    | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?:
    | "API_METHOD_UNSPECIFIED"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | (string & {});
}

export const GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata: Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rolloutUpdateTime: Schema.optional(Schema.String),
      rolloutState: Schema.optional(Schema.String),
      rolloutStartTime: Schema.optional(Schema.String),
      osPolicyAssignment: Schema.optional(Schema.String),
      apiMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata>;

export interface InventoryVersionedPackage {
  /** The name of the package. */
  packageName?: string;
  /** The system architecture this package is intended for. */
  architecture?: string;
  /** The version of the package. */
  version?: string;
}

export const InventoryVersionedPackage: Schema.Schema<InventoryVersionedPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      packageName: Schema.optional(Schema.String),
      architecture: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryVersionedPackage",
  }) as any as Schema.Schema<InventoryVersionedPackage>;

export interface GoogleCloudOsconfigCommonV1main__OperationMetadata {
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const GoogleCloudOsconfigCommonV1main__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigCommonV1main__OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata>;

export interface Osconfig_Date {
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Osconfig_Date: Schema.Schema<Osconfig_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      month: Schema.optional(Schema.Number),
      year: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Osconfig_Date",
  }) as any as Schema.Schema<Osconfig_Date>;

export interface InventoryWindowsApplication {
  /** The name of the application or product. */
  displayName?: string;
  /** The name of the manufacturer for the product or application. */
  publisher?: string;
  /** The last time this product received service. The value of this property is replaced each time a patch is applied or removed from the product or the command-line option is used to repair the product. */
  installDate?: Osconfig_Date;
  /** The version of the product or application in string format. */
  displayVersion?: string;
  /** The internet address for technical support. */
  helpLink?: string;
}

export const InventoryWindowsApplication: Schema.Schema<InventoryWindowsApplication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      publisher: Schema.optional(Schema.String),
      installDate: Schema.optional(Osconfig_Date),
      displayVersion: Schema.optional(Schema.String),
      helpLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryWindowsApplication",
  }) as any as Schema.Schema<InventoryWindowsApplication>;

export interface InventoryWindowsQuickFixEngineeringPackage {
  /** A textual description of the QFE update. */
  description?: string;
  /** Unique identifier associated with a particular QFE update. */
  hotFixId?: string;
  /** A short textual description of the QFE update. */
  caption?: string;
  /** Date that the QFE update was installed. Mapped from installed_on field. */
  installTime?: string;
}

export const InventoryWindowsQuickFixEngineeringPackage: Schema.Schema<InventoryWindowsQuickFixEngineeringPackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      hotFixId: Schema.optional(Schema.String),
      caption: Schema.optional(Schema.String),
      installTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryWindowsQuickFixEngineeringPackage",
  }) as any as Schema.Schema<InventoryWindowsQuickFixEngineeringPackage>;

export interface InventorySoftwarePackage {
  /** Details of a Googet package. For details about the googet package manager, see https://github.com/google/googet. */
  googetPackage?: InventoryVersionedPackage;
  /** Details of a Windows Update package. See https://docs.microsoft.com/en-us/windows/win32/api/_wua/ for information about Windows Update. */
  wuaPackage?: InventoryWindowsUpdatePackage;
  /** Details of a Zypper package. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPackage?: InventoryVersionedPackage;
  /** Details of a Zypper patch. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. */
  zypperPatch?: InventoryZypperPatch;
  /** Details of an APT package. For details about the apt package manager, see https://wiki.debian.org/Apt. */
  aptPackage?: InventoryVersionedPackage;
  /** Details of Windows Application. */
  windowsApplication?: InventoryWindowsApplication;
  /** Details of a Windows Quick Fix engineering package. See https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering for info in Windows Quick Fix Engineering. */
  qfePackage?: InventoryWindowsQuickFixEngineeringPackage;
  /** Details of a COS package. */
  cosPackage?: InventoryVersionedPackage;
  /** Yum package info. For details about the yum package manager, see https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum. */
  yumPackage?: InventoryVersionedPackage;
}

export const InventorySoftwarePackage: Schema.Schema<InventorySoftwarePackage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      googetPackage: Schema.optional(InventoryVersionedPackage),
      wuaPackage: Schema.optional(InventoryWindowsUpdatePackage),
      zypperPackage: Schema.optional(InventoryVersionedPackage),
      zypperPatch: Schema.optional(InventoryZypperPatch),
      aptPackage: Schema.optional(InventoryVersionedPackage),
      windowsApplication: Schema.optional(InventoryWindowsApplication),
      qfePackage: Schema.optional(InventoryWindowsQuickFixEngineeringPackage),
      cosPackage: Schema.optional(InventoryVersionedPackage),
      yumPackage: Schema.optional(InventoryVersionedPackage),
    }),
  ).annotate({
    identifier: "InventorySoftwarePackage",
  }) as any as Schema.Schema<InventorySoftwarePackage>;

export interface InventoryItem {
  /** When this inventory item was first detected. */
  createTime?: string;
  /** Software package present on the VM instance. */
  installedPackage?: InventorySoftwarePackage;
  /** Identifier for this item, unique across items for this VM. */
  id?: string;
  /** When this inventory item was last modified. */
  updateTime?: string;
  /** The specific type of inventory, correlating to its specific details. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "INSTALLED_PACKAGE"
    | "AVAILABLE_PACKAGE"
    | (string & {});
  /** Software package available to be installed on the VM instance. */
  availablePackage?: InventorySoftwarePackage;
  /** The origin of this inventory item. */
  originType?: "ORIGIN_TYPE_UNSPECIFIED" | "INVENTORY_REPORT" | (string & {});
}

export const InventoryItem: Schema.Schema<InventoryItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      installedPackage: Schema.optional(InventorySoftwarePackage),
      id: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      availablePackage: Schema.optional(InventorySoftwarePackage),
      originType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InventoryItem",
  }) as any as Schema.Schema<InventoryItem>;

export interface Inventory {
  /** Output only. The `Inventory` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory` */
  name?: string;
  /** Output only. Base level operating system information for the VM. */
  osInfo?: InventoryOsInfo;
  /** Output only. Timestamp of the last reported inventory for the VM. */
  updateTime?: string;
  /** Output only. Inventory items related to the VM keyed by an opaque unique identifier for each inventory item. The identifier is unique to each distinct and addressable inventory item and will change, when there is a new package version. */
  items?: Record<string, InventoryItem>;
}

export const Inventory: Schema.Schema<Inventory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      osInfo: Schema.optional(InventoryOsInfo),
      updateTime: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Record(Schema.String, InventoryItem)),
    }),
  ).annotate({ identifier: "Inventory" }) as any as Schema.Schema<Inventory>;

export interface ListVulnerabilityReportsResponse {
  /** List of vulnerabilityReport objects. */
  vulnerabilityReports?: Array<VulnerabilityReport>;
  /** The pagination token to retrieve the next page of vulnerabilityReports object. */
  nextPageToken?: string;
}

export const ListVulnerabilityReportsResponse: Schema.Schema<ListVulnerabilityReportsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      vulnerabilityReports: Schema.optional(Schema.Array(VulnerabilityReport)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListVulnerabilityReportsResponse",
  }) as any as Schema.Schema<ListVulnerabilityReportsResponse>;

export interface OSPolicyAssignmentOperationMetadata {
  /** Rollout update time */
  rolloutUpdateTime?: string;
  /** State of the rollout */
  rolloutState?:
    | "ROLLOUT_STATE_UNSPECIFIED"
    | "IN_PROGRESS"
    | "CANCELLING"
    | "CANCELLED"
    | "SUCCEEDED"
    | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?:
    | "API_METHOD_UNSPECIFIED"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | (string & {});
}

export const OSPolicyAssignmentOperationMetadata: Schema.Schema<OSPolicyAssignmentOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rolloutUpdateTime: Schema.optional(Schema.String),
      rolloutState: Schema.optional(Schema.String),
      rolloutStartTime: Schema.optional(Schema.String),
      osPolicyAssignment: Schema.optional(Schema.String),
      apiMethod: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OSPolicyAssignmentOperationMetadata",
  }) as any as Schema.Schema<OSPolicyAssignmentOperationMetadata>;

export interface GoogleCloudOsconfigV2beta__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const GoogleCloudOsconfigV2beta__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigV2beta__OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata>;

export interface ListOSPolicyAssignmentsResponse {
  /** The list of assignments */
  osPolicyAssignments?: Array<OSPolicyAssignment>;
  /** The pagination token to retrieve the next page of OS policy assignments. */
  nextPageToken?: string;
}

export const ListOSPolicyAssignmentsResponse: Schema.Schema<ListOSPolicyAssignmentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osPolicyAssignments: Schema.optional(Schema.Array(OSPolicyAssignment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOSPolicyAssignmentsResponse",
  }) as any as Schema.Schema<ListOSPolicyAssignmentsResponse>;

export interface ListInventoriesResponse {
  /** The pagination token to retrieve the next page of inventory objects. */
  nextPageToken?: string;
  /** List of inventory objects. */
  inventories?: Array<Inventory>;
}

export const ListInventoriesResponse: Schema.Schema<ListInventoriesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      inventories: Schema.optional(Schema.Array(Inventory)),
    }),
  ).annotate({
    identifier: "ListInventoriesResponse",
  }) as any as Schema.Schema<ListInventoriesResponse>;

export interface ListOSPolicyAssignmentRevisionsResponse {
  /** The OS policy assignment revisions */
  osPolicyAssignments?: Array<OSPolicyAssignment>;
  /** The pagination token to retrieve the next page of OS policy assignment revisions. */
  nextPageToken?: string;
}

export const ListOSPolicyAssignmentRevisionsResponse: Schema.Schema<ListOSPolicyAssignmentRevisionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      osPolicyAssignments: Schema.optional(Schema.Array(OSPolicyAssignment)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListOSPolicyAssignmentRevisionsResponse",
  }) as any as Schema.Schema<ListOSPolicyAssignmentRevisionsResponse>;

export interface GoogleCloudOsconfigCommonV1__OperationMetadata {
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
}

export const GoogleCloudOsconfigCommonV1__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      target: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
      verb: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudOsconfigCommonV1__OperationMetadata",
  }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    name: Schema.String.pipe(T.HttpPath("name")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest {
  /** Required. API resource name for OS policy assignment report. Format: `/projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/report` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance_id}`, either Compute Engine `instance-id` or `instance-name` can be provided. For `{assignment_id}`, the OSPolicyAssignment id must be provided. */
  name: string;
}

export const GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/osPolicyAssignments/{osPolicyAssignmentsId}/report",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest>;

export type GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse =
  OSPolicyAssignmentReport;
export const GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ OSPolicyAssignmentReport;

export type GetProjectsLocationsInstancesOsPolicyAssignmentsReportsError =
  DefaultErrors;

/** Get the OS policy assignment report for the specified Compute Engine VM instance. */
export const getProjectsLocationsInstancesOsPolicyAssignmentsReports: API.OperationMethod<
  GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  GetProjectsLocationsInstancesOsPolicyAssignmentsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  output: GetProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to the `ListOSPolicyAssignmentReports` method that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/reports` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either `instance-name`, `instance-id`, or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all instances in the project/location. For `{assignment}`, either `assignment-id` or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all OSPolicyAssignments in the project/location. Either {instance} or {assignment} must be `-`. For example: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/-/reports` returns all reports for the instance `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/{assignment-id}/reports` returns all the reports for the given assignment across all instances. `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/-/reports` returns all the reports for all assignments across all instances. */
  parent: string;
  /** If provided, this field specifies the criteria that must be met by the `OSPolicyAssignmentReport` API resource that is included in the response. */
  filter?: string;
}

export const ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/osPolicyAssignments/{osPolicyAssignmentsId}/reports",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest>;

export type ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse =
  ListOSPolicyAssignmentReportsResponse;
export const ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOSPolicyAssignmentReportsResponse;

export type ListProjectsLocationsInstancesOsPolicyAssignmentsReportsError =
  DefaultErrors;

/** List OS policy assignment reports for all Compute Engine VM instances in the specified zone. */
export const listProjectsLocationsInstancesOsPolicyAssignmentsReports: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  ListProjectsLocationsInstancesOsPolicyAssignmentsReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesOsPolicyAssignmentsReportsRequest,
  output: ListProjectsLocationsInstancesOsPolicyAssignmentsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInstancesVulnerabilityReportsRequest {
  /** Required. API resource name for vulnerability resource. Format: `projects/{project}/locations/{location}/instances/{instance}/vulnerabilityReport` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. */
  name: string;
}

export const GetProjectsLocationsInstancesVulnerabilityReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/vulnerabilityReport",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesVulnerabilityReportsRequest>;

export type GetProjectsLocationsInstancesVulnerabilityReportsResponse =
  VulnerabilityReport;
export const GetProjectsLocationsInstancesVulnerabilityReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ VulnerabilityReport;

export type GetProjectsLocationsInstancesVulnerabilityReportsError =
  DefaultErrors;

/** Gets the vulnerability report for the specified VM instance. Only VMs with inventory data have vulnerability reports associated with them. */
export const getProjectsLocationsInstancesVulnerabilityReports: API.OperationMethod<
  GetProjectsLocationsInstancesVulnerabilityReportsRequest,
  GetProjectsLocationsInstancesVulnerabilityReportsResponse,
  GetProjectsLocationsInstancesVulnerabilityReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesVulnerabilityReportsRequest,
  output: GetProjectsLocationsInstancesVulnerabilityReportsResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesVulnerabilityReportsRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListVulnerabilityReports` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. */
  parent: string;
  /** This field supports filtering by the severity level for the vulnerability. For a list of severity levels, see [Severity levels for vulnerabilities](https://cloud.google.com/container-analysis/docs/container-scanning-overview#severity_levels_for_vulnerabilities). The filter field follows the rules described in the [AIP-160](https://google.aip.dev/160) guidelines as follows: + **Filter for a specific severity type**: you can list reports that contain vulnerabilities that are classified as medium by specifying `vulnerabilities.details.severity:MEDIUM`. + **Filter for a range of severities** : you can list reports that have vulnerabilities that are classified as critical or high by specifying `vulnerabilities.details.severity:HIGH OR vulnerabilities.details.severity:CRITICAL` */
  filter?: string;
}

export const ListProjectsLocationsInstancesVulnerabilityReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/vulnerabilityReports",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesVulnerabilityReportsRequest>;

export type ListProjectsLocationsInstancesVulnerabilityReportsResponse =
  ListVulnerabilityReportsResponse;
export const ListProjectsLocationsInstancesVulnerabilityReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListVulnerabilityReportsResponse;

export type ListProjectsLocationsInstancesVulnerabilityReportsError =
  DefaultErrors;

/** List vulnerability reports for all VM instances in the specified zone. */
export const listProjectsLocationsInstancesVulnerabilityReports: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesVulnerabilityReportsRequest,
  ListProjectsLocationsInstancesVulnerabilityReportsResponse,
  ListProjectsLocationsInstancesVulnerabilityReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesVulnerabilityReportsRequest,
  output: ListProjectsLocationsInstancesVulnerabilityReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsInstancesInventoriesRequest {
  /** Required. API resource name for inventory resource. Format: `projects/{project}/locations/{location}/instances/{instance}/inventory` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. */
  name: string;
  /** Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. */
  view?: "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsInstancesInventoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/inventory",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstancesInventoriesRequest>;

export type GetProjectsLocationsInstancesInventoriesResponse = Inventory;
export const GetProjectsLocationsInstancesInventoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Inventory;

export type GetProjectsLocationsInstancesInventoriesError = DefaultErrors;

/** Get inventory data for the specified VM instance. If the VM has no associated inventory, the message `NOT_FOUND` is returned. */
export const getProjectsLocationsInstancesInventories: API.OperationMethod<
  GetProjectsLocationsInstancesInventoriesRequest,
  GetProjectsLocationsInstancesInventoriesResponse,
  GetProjectsLocationsInstancesInventoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstancesInventoriesRequest,
  output: GetProjectsLocationsInstancesInventoriesResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstancesInventoriesRequest {
  /** If provided, this field specifies the criteria that must be met by a `Inventory` API resource to be included in the response. */
  filter?: string;
  /** Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. */
  view?: "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The maximum number of results to return. */
  pageSize?: number;
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. */
  parent: string;
  /** A pagination token returned from a previous call to `ListInventories` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListProjectsLocationsInstancesInventoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}/inventories",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstancesInventoriesRequest>;

export type ListProjectsLocationsInstancesInventoriesResponse =
  ListInventoriesResponse;
export const ListProjectsLocationsInstancesInventoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInventoriesResponse;

export type ListProjectsLocationsInstancesInventoriesError = DefaultErrors;

/** List inventory data for all VM instances in the specified zone. */
export const listProjectsLocationsInstancesInventories: API.PaginatedOperationMethod<
  ListProjectsLocationsInstancesInventoriesRequest,
  ListProjectsLocationsInstancesInventoriesResponse,
  ListProjectsLocationsInstancesInventoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesInventoriesRequest,
  output: ListProjectsLocationsInstancesInventoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsOsPolicyAssignmentsRequest {
  /** Optional. Field mask that controls which fields of the assignment should be updated. */
  updateMask?: string;
  /** Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. */
  name: string;
  /** Optional. If set to true, and the OS policy assignment is not found, a new OS policy assignment will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Request body */
  body?: OSPolicyAssignment;
}

export const PatchProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    allowMissing: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("allowMissing"),
    ),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    body: Schema.optional(OSPolicyAssignment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsOsPolicyAssignmentsRequest>;

export type PatchProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const PatchProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type PatchProjectsLocationsOsPolicyAssignmentsError = DefaultErrors;

/** Update an existing OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1alpha/projects.locations.osPolicyAssignments.operations/cancel). */
export const patchProjectsLocationsOsPolicyAssignments: API.OperationMethod<
  PatchProjectsLocationsOsPolicyAssignmentsRequest,
  PatchProjectsLocationsOsPolicyAssignmentsResponse,
  PatchProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsOsPolicyAssignmentsRequest,
  output: PatchProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The resource name of OS policy assignment. Format: `projects/{project}/locations/{location}/osPolicyAssignments/{os_policy_assignment}@{revisionId}` */
  name: string;
}

export const GetProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOsPolicyAssignmentsRequest>;

export type GetProjectsLocationsOsPolicyAssignmentsResponse =
  OSPolicyAssignment;
export const GetProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ OSPolicyAssignment;

export type GetProjectsLocationsOsPolicyAssignmentsError = DefaultErrors;

/** Retrieve an existing OS policy assignment. This method always returns the latest revision. In order to retrieve a previous revision of the assignment, also provide the revision ID in the `name` parameter. */
export const getProjectsLocationsOsPolicyAssignments: API.OperationMethod<
  GetProjectsLocationsOsPolicyAssignmentsRequest,
  GetProjectsLocationsOsPolicyAssignmentsResponse,
  GetProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOsPolicyAssignmentsRequest,
  output: GetProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest {
  /** The maximum number of revisions to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListOSPolicyAssignmentRevisions` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The name of the OS policy assignment to list revisions for. */
  name: string;
}

export const ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}:listRevisions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest>;

export type ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse =
  ListOSPolicyAssignmentRevisionsResponse;
export const ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOSPolicyAssignmentRevisionsResponse;

export type ListRevisionsProjectsLocationsOsPolicyAssignmentsError =
  DefaultErrors;

/** List the OS policy assignment revisions for a given OS policy assignment. */
export const listRevisionsProjectsLocationsOsPolicyAssignments: API.PaginatedOperationMethod<
  ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest,
  ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse,
  ListRevisionsProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsOsPolicyAssignmentsRequest,
  output: ListRevisionsProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsOsPolicyAssignmentsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of assignments to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListOSPolicyAssignments` that indicates where this listing should continue from. */
  pageToken?: string;
}

export const ListProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOsPolicyAssignmentsRequest>;

export type ListProjectsLocationsOsPolicyAssignmentsResponse =
  ListOSPolicyAssignmentsResponse;
export const ListProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListOSPolicyAssignmentsResponse;

export type ListProjectsLocationsOsPolicyAssignmentsError = DefaultErrors;

/** List the OS policy assignments under the parent resource. For each OS policy assignment, the latest revision is returned. */
export const listProjectsLocationsOsPolicyAssignments: API.PaginatedOperationMethod<
  ListProjectsLocationsOsPolicyAssignmentsRequest,
  ListProjectsLocationsOsPolicyAssignmentsResponse,
  ListProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsOsPolicyAssignmentsRequest,
  output: ListProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsOsPolicyAssignmentsRequest {
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Required. The parent resource name in the form: projects/{project}/locations/{location} */
  parent: string;
  /** Required. The logical name of the OS policy assignment in the project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. */
  osPolicyAssignmentId?: string;
  /** Request body */
  body?: OSPolicyAssignment;
}

export const CreateProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    osPolicyAssignmentId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("osPolicyAssignmentId"),
    ),
    body: Schema.optional(OSPolicyAssignment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsOsPolicyAssignmentsRequest>;

export type CreateProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const CreateProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type CreateProjectsLocationsOsPolicyAssignmentsError = DefaultErrors;

/** Create an OS policy assignment. This method also creates the first revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1alpha/projects.locations.osPolicyAssignments.operations/cancel). */
export const createProjectsLocationsOsPolicyAssignments: API.OperationMethod<
  CreateProjectsLocationsOsPolicyAssignmentsRequest,
  CreateProjectsLocationsOsPolicyAssignmentsResponse,
  CreateProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsOsPolicyAssignmentsRequest,
  output: CreateProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOsPolicyAssignmentsRequest {
  /** Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. */
  requestId?: string;
  /** Required. The name of the OS policy assignment to be deleted */
  name: string;
}

export const DeleteProjectsLocationsOsPolicyAssignmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsOsPolicyAssignmentsRequest>;

export type DeleteProjectsLocationsOsPolicyAssignmentsResponse = Operation;
export const DeleteProjectsLocationsOsPolicyAssignmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type DeleteProjectsLocationsOsPolicyAssignmentsError = DefaultErrors;

/** Delete the OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. If the LRO completes and is not cancelled, all revisions associated with the OS policy assignment are deleted. For more information, see [Method: projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1alpha/projects.locations.osPolicyAssignments.operations/cancel). */
export const deleteProjectsLocationsOsPolicyAssignments: API.OperationMethod<
  DeleteProjectsLocationsOsPolicyAssignmentsRequest,
  DeleteProjectsLocationsOsPolicyAssignmentsResponse,
  DeleteProjectsLocationsOsPolicyAssignmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsOsPolicyAssignmentsRequest,
  output: DeleteProjectsLocationsOsPolicyAssignmentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsOsPolicyAssignmentsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOsPolicyAssignmentsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOsPolicyAssignmentsOperationsRequest>;

export type GetProjectsLocationsOsPolicyAssignmentsOperationsResponse =
  Operation;
export const GetProjectsLocationsOsPolicyAssignmentsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetProjectsLocationsOsPolicyAssignmentsOperationsError =
  DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOsPolicyAssignmentsOperations: API.OperationMethod<
  GetProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  GetProjectsLocationsOsPolicyAssignmentsOperationsResponse,
  GetProjectsLocationsOsPolicyAssignmentsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  output: GetProjectsLocationsOsPolicyAssignmentsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/osPolicyAssignments/{osPolicyAssignmentsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest>;

export type CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse =
  Empty;
export const CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type CancelProjectsLocationsOsPolicyAssignmentsOperationsError =
  DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOsPolicyAssignmentsOperations: API.OperationMethod<
  CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse,
  CancelProjectsLocationsOsPolicyAssignmentsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOsPolicyAssignmentsOperationsRequest,
  output: CancelProjectsLocationsOsPolicyAssignmentsOperationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsInstanceOSPoliciesCompliancesRequest {
  /** Required. API resource name for instance OS policies compliance resource. Format: `projects/{project}/locations/{location}/instanceOSPoliciesCompliances/{instance}` For `{project}`, either Compute Engine project-number or project-id can be provided. For `{instance}`, either Compute Engine VM instance-id or instance-name can be provided. */
  name: string;
}

export const GetProjectsLocationsInstanceOSPoliciesCompliancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instanceOSPoliciesCompliances/{instanceOSPoliciesCompliancesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsInstanceOSPoliciesCompliancesRequest>;

export type GetProjectsLocationsInstanceOSPoliciesCompliancesResponse =
  InstanceOSPoliciesCompliance;
export const GetProjectsLocationsInstanceOSPoliciesCompliancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ InstanceOSPoliciesCompliance;

export type GetProjectsLocationsInstanceOSPoliciesCompliancesError =
  DefaultErrors;

/** Get OS policies compliance data for the specified Compute Engine VM instance. */
export const getProjectsLocationsInstanceOSPoliciesCompliances: API.OperationMethod<
  GetProjectsLocationsInstanceOSPoliciesCompliancesRequest,
  GetProjectsLocationsInstanceOSPoliciesCompliancesResponse,
  GetProjectsLocationsInstanceOSPoliciesCompliancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsInstanceOSPoliciesCompliancesRequest,
  output: GetProjectsLocationsInstanceOSPoliciesCompliancesResponse,
  errors: [],
}));

export interface ListProjectsLocationsInstanceOSPoliciesCompliancesRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A pagination token returned from a previous call to `ListInstanceOSPoliciesCompliances` that indicates where this listing should continue from. */
  pageToken?: string;
  /** Required. The parent resource name. Format: `projects/{project}/locations/{location}` For `{project}`, either Compute Engine project-number or project-id can be provided. */
  parent: string;
  /** If provided, this field specifies the criteria that must be met by a `InstanceOSPoliciesCompliance` API resource to be included in the response. */
  filter?: string;
}

export const ListProjectsLocationsInstanceOSPoliciesCompliancesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/projects/{projectsId}/locations/{locationsId}/instanceOSPoliciesCompliances",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsInstanceOSPoliciesCompliancesRequest>;

export type ListProjectsLocationsInstanceOSPoliciesCompliancesResponse =
  ListInstanceOSPoliciesCompliancesResponse;
export const ListProjectsLocationsInstanceOSPoliciesCompliancesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListInstanceOSPoliciesCompliancesResponse;

export type ListProjectsLocationsInstanceOSPoliciesCompliancesError =
  DefaultErrors;

/** List OS policies compliance data for all Compute Engine VM instances in the specified zone. */
export const listProjectsLocationsInstanceOSPoliciesCompliances: API.PaginatedOperationMethod<
  ListProjectsLocationsInstanceOSPoliciesCompliancesRequest,
  ListProjectsLocationsInstanceOSPoliciesCompliancesResponse,
  ListProjectsLocationsInstanceOSPoliciesCompliancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsInstanceOSPoliciesCompliancesRequest,
  output: ListProjectsLocationsInstanceOSPoliciesCompliancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
