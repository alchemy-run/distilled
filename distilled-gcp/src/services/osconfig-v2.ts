// ==========================================================================
// OS Config API (osconfig v2)
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
  name: "osconfig",
  version: "v2",
  rootUrl: "https://osconfig.googleapis.com/",
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector {
  /** Optional. Names of the projects in scope. Format: `projects/{project_number}` */
  includedProjects?: Array<string>;
  /** Optional. Names of the folders in scope. Format: `folders/{folder_id}` */
  includedFolders?: Array<string>;
}

export const GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector: Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector> = Schema.suspend(() => Schema.Struct({
  includedProjects: Schema.optional(Schema.Array(Schema.String)),
  includedFolders: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector" }) as any as Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector>;

export interface GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector {
  /** Optional. Names of the locations in scope. Format: `us-central1-a` */
  includedLocations?: Array<string>;
}

export const GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector: Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector> = Schema.suspend(() => Schema.Struct({
  includedLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector" }) as any as Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector>;

export interface GoogleCloudOsconfigV2_OrchestrationScope_Selector {
  /** Selector for selecting resource hierarchy. */
  resourceHierarchySelector?: GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector;
  /** Selector for selecting locations. */
  locationSelector?: GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector;
}

export const GoogleCloudOsconfigV2_OrchestrationScope_Selector: Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_Selector> = Schema.suspend(() => Schema.Struct({
  resourceHierarchySelector: Schema.optional(GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector),
  locationSelector: Schema.optional(GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector),
})).annotate({ identifier: "GoogleCloudOsconfigV2_OrchestrationScope_Selector" }) as any as Schema.Schema<GoogleCloudOsconfigV2_OrchestrationScope_Selector>;

export interface GoogleCloudOsconfigV2__OrchestrationScope {
  /** Optional. Selectors of the orchestration scope. There is a logical AND between each selector defined. When there is no explicit `ResourceHierarchySelector` selector specified, the scope is by default bounded to the parent of the policy orchestrator resource. */
  selectors?: Array<GoogleCloudOsconfigV2_OrchestrationScope_Selector>;
}

export const GoogleCloudOsconfigV2__OrchestrationScope: Schema.Schema<GoogleCloudOsconfigV2__OrchestrationScope> = Schema.suspend(() => Schema.Struct({
  selectors: Schema.optional(Schema.Array(GoogleCloudOsconfigV2_OrchestrationScope_Selector)),
})).annotate({ identifier: "GoogleCloudOsconfigV2__OrchestrationScope" }) as any as Schema.Schema<GoogleCloudOsconfigV2__OrchestrationScope>;

export interface OSPolicyInventoryFilter {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyInventoryFilter: Schema.Schema<OSPolicyInventoryFilter> = Schema.suspend(() => Schema.Struct({
  osShortName: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyInventoryFilter" }) as any as Schema.Schema<OSPolicyInventoryFilter>;

export interface OSPolicyResourcePackageResourceAPT {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceAPT: Schema.Schema<OSPolicyResourcePackageResourceAPT> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceAPT" }) as any as Schema.Schema<OSPolicyResourcePackageResourceAPT>;

export interface OSPolicyResourceFileRemote {
  /** Required. URI from which to fetch the object. It should contain both the protocol and path following the format `{protocol}://{location}`. */
  uri?: string;
  /** SHA256 checksum of the remote file. */
  sha256Checksum?: string;
}

export const OSPolicyResourceFileRemote: Schema.Schema<OSPolicyResourceFileRemote> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  sha256Checksum: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileRemote" }) as any as Schema.Schema<OSPolicyResourceFileRemote>;

export interface OSPolicyResourceFileGcs {
  /** Required. Bucket of the Cloud Storage object. */
  bucket?: string;
  /** Required. Name of the Cloud Storage object. */
  object?: string;
  /** Generation number of the Cloud Storage object. */
  generation?: string;
}

export const OSPolicyResourceFileGcs: Schema.Schema<OSPolicyResourceFileGcs> = Schema.suspend(() => Schema.Struct({
  bucket: Schema.optional(Schema.String),
  object: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileGcs" }) as any as Schema.Schema<OSPolicyResourceFileGcs>;

export interface OSPolicyResourceFile {
  /** A generic remote file. */
  remote?: OSPolicyResourceFileRemote;
  /** A Cloud Storage object. */
  gcs?: OSPolicyResourceFileGcs;
  /** A local path within the VM to use. */
  localPath?: string;
  /** Defaults to false. When false, files are subject to validations based on the file type: Remote: A checksum must be specified. Cloud Storage: An object generation number must be specified. */
  allowInsecure?: boolean;
}

export const OSPolicyResourceFile: Schema.Schema<OSPolicyResourceFile> = Schema.suspend(() => Schema.Struct({
  remote: Schema.optional(OSPolicyResourceFileRemote),
  gcs: Schema.optional(OSPolicyResourceFileGcs),
  localPath: Schema.optional(Schema.String),
  allowInsecure: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyResourceFile" }) as any as Schema.Schema<OSPolicyResourceFile>;

export interface OSPolicyResourcePackageResourceDeb {
  /** Required. A deb package. */
  source?: OSPolicyResourceFile;
  /** Whether dependencies should also be installed. - install when false: `dpkg -i package` - install when true: `apt-get update && apt-get -y install package.deb` */
  pullDeps?: boolean;
}

export const OSPolicyResourcePackageResourceDeb: Schema.Schema<OSPolicyResourcePackageResourceDeb> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  pullDeps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyResourcePackageResourceDeb" }) as any as Schema.Schema<OSPolicyResourcePackageResourceDeb>;

export interface OSPolicyResourcePackageResourceYUM {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceYUM: Schema.Schema<OSPolicyResourcePackageResourceYUM> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceYUM" }) as any as Schema.Schema<OSPolicyResourcePackageResourceYUM>;

export interface OSPolicyResourcePackageResourceZypper {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceZypper: Schema.Schema<OSPolicyResourcePackageResourceZypper> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceZypper" }) as any as Schema.Schema<OSPolicyResourcePackageResourceZypper>;

export interface OSPolicyResourcePackageResourceRPM {
  /** Required. An rpm package. */
  source?: OSPolicyResourceFile;
  /** Whether dependencies should also be installed. - install when false: `rpm --upgrade --replacepkgs package.rpm` - install when true: `yum -y install package.rpm` or `zypper -y install package.rpm` */
  pullDeps?: boolean;
}

export const OSPolicyResourcePackageResourceRPM: Schema.Schema<OSPolicyResourcePackageResourceRPM> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  pullDeps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicyResourcePackageResourceRPM" }) as any as Schema.Schema<OSPolicyResourcePackageResourceRPM>;

export interface OSPolicyResourcePackageResourceGooGet {
  /** Required. Package name. */
  name?: string;
}

export const OSPolicyResourcePackageResourceGooGet: Schema.Schema<OSPolicyResourcePackageResourceGooGet> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourcePackageResourceGooGet" }) as any as Schema.Schema<OSPolicyResourcePackageResourceGooGet>;

export interface OSPolicyResourcePackageResourceMSI {
  /** Required. The MSI package. */
  source?: OSPolicyResourceFile;
  /** Additional properties to use during installation. This should be in the format of Property=Setting. Appended to the defaults of `ACTION=INSTALL REBOOT=ReallySuppress`. */
  properties?: Array<string>;
}

export const OSPolicyResourcePackageResourceMSI: Schema.Schema<OSPolicyResourcePackageResourceMSI> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(OSPolicyResourceFile),
  properties: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourcePackageResourceMSI" }) as any as Schema.Schema<OSPolicyResourcePackageResourceMSI>;

export interface OSPolicyResourcePackageResource {
  /** Required. The desired state the agent should maintain for this package. */
  desiredState?: "DESIRED_STATE_UNSPECIFIED" | "INSTALLED" | "REMOVED" | (string & {});
  /** A package managed by Apt. */
  apt?: OSPolicyResourcePackageResourceAPT;
  /** A deb package file. */
  deb?: OSPolicyResourcePackageResourceDeb;
  /** A package managed by YUM. */
  yum?: OSPolicyResourcePackageResourceYUM;
  /** A package managed by Zypper. */
  zypper?: OSPolicyResourcePackageResourceZypper;
  /** An rpm package file. */
  rpm?: OSPolicyResourcePackageResourceRPM;
  /** A package managed by GooGet. */
  googet?: OSPolicyResourcePackageResourceGooGet;
  /** An MSI package. */
  msi?: OSPolicyResourcePackageResourceMSI;
}

export const OSPolicyResourcePackageResource: Schema.Schema<OSPolicyResourcePackageResource> = Schema.suspend(() => Schema.Struct({
  desiredState: Schema.optional(Schema.String),
  apt: Schema.optional(OSPolicyResourcePackageResourceAPT),
  deb: Schema.optional(OSPolicyResourcePackageResourceDeb),
  yum: Schema.optional(OSPolicyResourcePackageResourceYUM),
  zypper: Schema.optional(OSPolicyResourcePackageResourceZypper),
  rpm: Schema.optional(OSPolicyResourcePackageResourceRPM),
  googet: Schema.optional(OSPolicyResourcePackageResourceGooGet),
  msi: Schema.optional(OSPolicyResourcePackageResourceMSI),
})).annotate({ identifier: "OSPolicyResourcePackageResource" }) as any as Schema.Schema<OSPolicyResourcePackageResource>;

export interface OSPolicyResourceRepositoryResourceAptRepository {
  /** Required. Type of archive files in this repository. */
  archiveType?: "ARCHIVE_TYPE_UNSPECIFIED" | "DEB" | "DEB_SRC" | (string & {});
  /** Required. URI for this repository. */
  uri?: string;
  /** Required. Distribution of this repository. */
  distribution?: string;
  /** Required. List of components for this repository. Must contain at least one item. */
  components?: Array<string>;
  /** URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg`. */
  gpgKey?: string;
}

export const OSPolicyResourceRepositoryResourceAptRepository: Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository> = Schema.suspend(() => Schema.Struct({
  archiveType: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  distribution: Schema.optional(Schema.String),
  components: Schema.optional(Schema.Array(Schema.String)),
  gpgKey: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceAptRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceAptRepository>;

export interface OSPolicyResourceRepositoryResourceYumRepository {
  /** Required. A one word, unique name for this repository. This is the `repo id` in the yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for resource conflicts. */
  id?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
}

export const OSPolicyResourceRepositoryResourceYumRepository: Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  baseUrl: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceYumRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceYumRepository>;

export interface OSPolicyResourceRepositoryResourceZypperRepository {
  /** Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for GuestPolicy conflicts. */
  id?: string;
  /** The display name of the repository. */
  displayName?: string;
  /** Required. The location of the repository directory. */
  baseUrl?: string;
  /** URIs of GPG keys. */
  gpgKeys?: Array<string>;
}

export const OSPolicyResourceRepositoryResourceZypperRepository: Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  baseUrl: Schema.optional(Schema.String),
  gpgKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceZypperRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceZypperRepository>;

export interface OSPolicyResourceRepositoryResourceGooRepository {
  /** Required. The name of the repository. */
  name?: string;
  /** Required. The url of the repository. */
  url?: string;
}

export const OSPolicyResourceRepositoryResourceGooRepository: Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceRepositoryResourceGooRepository" }) as any as Schema.Schema<OSPolicyResourceRepositoryResourceGooRepository>;

export interface OSPolicyResourceRepositoryResource {
  /** An Apt Repository. */
  apt?: OSPolicyResourceRepositoryResourceAptRepository;
  /** A Yum Repository. */
  yum?: OSPolicyResourceRepositoryResourceYumRepository;
  /** A Zypper Repository. */
  zypper?: OSPolicyResourceRepositoryResourceZypperRepository;
  /** A Goo Repository. */
  goo?: OSPolicyResourceRepositoryResourceGooRepository;
}

export const OSPolicyResourceRepositoryResource: Schema.Schema<OSPolicyResourceRepositoryResource> = Schema.suspend(() => Schema.Struct({
  apt: Schema.optional(OSPolicyResourceRepositoryResourceAptRepository),
  yum: Schema.optional(OSPolicyResourceRepositoryResourceYumRepository),
  zypper: Schema.optional(OSPolicyResourceRepositoryResourceZypperRepository),
  goo: Schema.optional(OSPolicyResourceRepositoryResourceGooRepository),
})).annotate({ identifier: "OSPolicyResourceRepositoryResource" }) as any as Schema.Schema<OSPolicyResourceRepositoryResource>;

export interface OSPolicyResourceExecResourceExec {
  /** A remote or local file. */
  file?: OSPolicyResourceFile;
  /** An inline script. The size of the script is limited to 32KiB. */
  script?: string;
  /** Optional arguments to pass to the source during execution. */
  args?: Array<string>;
  /** Required. The script interpreter to use. */
  interpreter?: "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL" | (string & {});
  /** Only recorded for enforce Exec. Path to an output file (that is created by this Exec) whose content will be recorded in OSPolicyResourceCompliance after a successful run. Absence or failure to read this file will result in this ExecResource being non-compliant. Output file size is limited to 500K bytes. */
  outputFilePath?: string;
}

export const OSPolicyResourceExecResourceExec: Schema.Schema<OSPolicyResourceExecResourceExec> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(OSPolicyResourceFile),
  script: Schema.optional(Schema.String),
  args: Schema.optional(Schema.Array(Schema.String)),
  interpreter: Schema.optional(Schema.String),
  outputFilePath: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceExecResourceExec" }) as any as Schema.Schema<OSPolicyResourceExecResourceExec>;

export interface OSPolicyResourceExecResource {
  /** Required. What to run to validate this resource is in the desired state. An exit code of 100 indicates "in desired state", and exit code of 101 indicates "not in desired state". Any other exit code indicates a failure running validate. */
  validate?: OSPolicyResourceExecResourceExec;
  /** What to run to bring this resource into the desired state. An exit code of 100 indicates "success", any other exit code indicates a failure running enforce. */
  enforce?: OSPolicyResourceExecResourceExec;
}

export const OSPolicyResourceExecResource: Schema.Schema<OSPolicyResourceExecResource> = Schema.suspend(() => Schema.Struct({
  validate: Schema.optional(OSPolicyResourceExecResourceExec),
  enforce: Schema.optional(OSPolicyResourceExecResourceExec),
})).annotate({ identifier: "OSPolicyResourceExecResource" }) as any as Schema.Schema<OSPolicyResourceExecResource>;

export interface OSPolicyResourceFileResource {
  /** A remote or local source. */
  file?: OSPolicyResourceFile;
  /** A a file with this content. The size of the content is limited to 32KiB. */
  content?: string;
  /** Required. The absolute path of the file within the VM. */
  path?: string;
  /** Required. Desired state of the file. */
  state?: "DESIRED_STATE_UNSPECIFIED" | "PRESENT" | "ABSENT" | "CONTENTS_MATCH" | (string & {});
  /** Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 */
  permissions?: string;
}

export const OSPolicyResourceFileResource: Schema.Schema<OSPolicyResourceFileResource> = Schema.suspend(() => Schema.Struct({
  file: Schema.optional(OSPolicyResourceFile),
  content: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  permissions: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyResourceFileResource" }) as any as Schema.Schema<OSPolicyResourceFileResource>;

export interface OSPolicyResource {
  /** Required. The id of the resource with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the OS policy. */
  id?: string;
  /** Package resource */
  pkg?: OSPolicyResourcePackageResource;
  /** Package repository resource */
  repository?: OSPolicyResourceRepositoryResource;
  /** Exec resource */
  exec?: OSPolicyResourceExecResource;
  /** File resource */
  file?: OSPolicyResourceFileResource;
}

export const OSPolicyResource: Schema.Schema<OSPolicyResource> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  pkg: Schema.optional(OSPolicyResourcePackageResource),
  repository: Schema.optional(OSPolicyResourceRepositoryResource),
  exec: Schema.optional(OSPolicyResourceExecResource),
  file: Schema.optional(OSPolicyResourceFileResource),
})).annotate({ identifier: "OSPolicyResource" }) as any as Schema.Schema<OSPolicyResource>;

export interface OSPolicyResourceGroup {
  /** List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters[0].os_short_name='rhel' and inventory_filters[1].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally. */
  inventoryFilters?: Array<OSPolicyInventoryFilter>;
  /** Required. List of resources configured for this resource group. The resources are executed in the exact order specified here. */
  resources?: Array<OSPolicyResource>;
}

export const OSPolicyResourceGroup: Schema.Schema<OSPolicyResourceGroup> = Schema.suspend(() => Schema.Struct({
  inventoryFilters: Schema.optional(Schema.Array(OSPolicyInventoryFilter)),
  resources: Schema.optional(Schema.Array(OSPolicyResource)),
})).annotate({ identifier: "OSPolicyResourceGroup" }) as any as Schema.Schema<OSPolicyResourceGroup>;

export interface OSPolicy {
  /** Required. The id of the OS policy with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the assignment. */
  id?: string;
  /** Policy description. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Required. Policy mode */
  mode?: "MODE_UNSPECIFIED" | "VALIDATION" | "ENFORCEMENT" | (string & {});
  /** Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match` */
  resourceGroups?: Array<OSPolicyResourceGroup>;
  /** This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce. */
  allowNoResourceGroupMatch?: boolean;
}

export const OSPolicy: Schema.Schema<OSPolicy> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  resourceGroups: Schema.optional(Schema.Array(OSPolicyResourceGroup)),
  allowNoResourceGroupMatch: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "OSPolicy" }) as any as Schema.Schema<OSPolicy>;

export interface OSPolicyAssignmentLabelSet {
  /** Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected. */
  labels?: Record<string, string>;
}

export const OSPolicyAssignmentLabelSet: Schema.Schema<OSPolicyAssignmentLabelSet> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "OSPolicyAssignmentLabelSet" }) as any as Schema.Schema<OSPolicyAssignmentLabelSet>;

export interface OSPolicyAssignmentInstanceFilterInventory {
  /** Required. The OS short name */
  osShortName?: string;
  /** The OS version Prefix matches are supported if asterisk(*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. */
  osVersion?: string;
}

export const OSPolicyAssignmentInstanceFilterInventory: Schema.Schema<OSPolicyAssignmentInstanceFilterInventory> = Schema.suspend(() => Schema.Struct({
  osShortName: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentInstanceFilterInventory" }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilterInventory>;

export interface OSPolicyAssignmentInstanceFilter {
  /** Target all VMs in the project. If true, no other criteria is permitted. */
  all?: boolean;
  /** List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM. */
  inclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
  /** List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM. */
  exclusionLabels?: Array<OSPolicyAssignmentLabelSet>;
  /** List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories. */
  inventories?: Array<OSPolicyAssignmentInstanceFilterInventory>;
}

export const OSPolicyAssignmentInstanceFilter: Schema.Schema<OSPolicyAssignmentInstanceFilter> = Schema.suspend(() => Schema.Struct({
  all: Schema.optional(Schema.Boolean),
  inclusionLabels: Schema.optional(Schema.Array(OSPolicyAssignmentLabelSet)),
  exclusionLabels: Schema.optional(Schema.Array(OSPolicyAssignmentLabelSet)),
  inventories: Schema.optional(Schema.Array(OSPolicyAssignmentInstanceFilterInventory)),
})).annotate({ identifier: "OSPolicyAssignmentInstanceFilter" }) as any as Schema.Schema<OSPolicyAssignmentInstanceFilter>;

export interface FixedOrPercent {
  /** Specifies a fixed value. */
  fixed?: number;
  /** Specifies the relative value defined as a percentage, which will be multiplied by a reference value. */
  percent?: number;
}

export const FixedOrPercent: Schema.Schema<FixedOrPercent> = Schema.suspend(() => Schema.Struct({
  fixed: Schema.optional(Schema.Number),
  percent: Schema.optional(Schema.Number),
})).annotate({ identifier: "FixedOrPercent" }) as any as Schema.Schema<FixedOrPercent>;

export interface OSPolicyAssignmentRollout {
  /** Required. The maximum number (or percentage) of VMs per zone to disrupt at any given moment. */
  disruptionBudget?: FixedOrPercent;
  /** Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied. */
  minWaitDuration?: string;
}

export const OSPolicyAssignmentRollout: Schema.Schema<OSPolicyAssignmentRollout> = Schema.suspend(() => Schema.Struct({
  disruptionBudget: Schema.optional(FixedOrPercent),
  minWaitDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentRollout" }) as any as Schema.Schema<OSPolicyAssignmentRollout>;

export interface OSPolicyAssignment {
  /** Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. */
  name?: string;
  /** OS policy assignment description. Length of the description is limited to 1024 characters. */
  description?: string;
  /** Required. List of OS policies to be applied to the VMs. */
  osPolicies?: Array<OSPolicy>;
  /** Required. Filter to select VMs. */
  instanceFilter?: OSPolicyAssignmentInstanceFilter;
  /** Required. Rollout to deploy the OS policy assignment. A rollout is triggered in the following situations: 1) OSPolicyAssignment is created. 2) OSPolicyAssignment is updated and the update contains changes to one of the following fields: - instance_filter - os_policies 3) OSPolicyAssignment is deleted. */
  rollout?: OSPolicyAssignmentRollout;
  /** Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment */
  revisionId?: string;
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
  /** The etag for this OS policy assignment. If this is provided on update, it must match the server's etag. */
  etag?: string;
  /** Output only. OS policy assignment rollout state */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field. */
  baseline?: boolean;
  /** Output only. Indicates that this revision deletes the OS policy assignment. */
  deleted?: boolean;
  /** Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: * IN_PROGRESS * CANCELLING */
  reconciling?: boolean;
  /** Output only. Server generated unique id for the OS policy assignment resource. */
  uid?: string;
}

export const OSPolicyAssignment: Schema.Schema<OSPolicyAssignment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  osPolicies: Schema.optional(Schema.Array(OSPolicy)),
  instanceFilter: Schema.optional(OSPolicyAssignmentInstanceFilter),
  rollout: Schema.optional(OSPolicyAssignmentRollout),
  revisionId: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  baseline: Schema.optional(Schema.Boolean),
  deleted: Schema.optional(Schema.Boolean),
  reconciling: Schema.optional(Schema.Boolean),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignment" }) as any as Schema.Schema<OSPolicyAssignment>;

export interface GoogleCloudOsconfigV2__OrchestratedResource {
  /** Optional. OSPolicyAssignment resource to be created, updated or deleted. Name field is ignored and replace with a generated value. With this field set, orchestrator will perform actions on `project/{project}/locations/{zone}/osPolicyAssignments/{resource_id}` resources, where `project` and `zone` pairs come from the expanded scope, and `resource_id` comes from the `resource_id` field of orchestrator resource. */
  osPolicyAssignmentV1Payload?: OSPolicyAssignment;
  /** Optional. ID of the resource to be used while generating set of affected resources. For UPSERT action the value is auto-generated during PolicyOrchestrator creation when not set. When the value is set it should following next restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the project. For DELETE action, ID must be specified explicitly during PolicyOrchestrator creation. */
  id?: string;
}

export const GoogleCloudOsconfigV2__OrchestratedResource: Schema.Schema<GoogleCloudOsconfigV2__OrchestratedResource> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignmentV1Payload: Schema.optional(OSPolicyAssignment),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV2__OrchestratedResource" }) as any as Schema.Schema<GoogleCloudOsconfigV2__OrchestratedResource>;

export interface GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState {
  /** Output only. State of the iteration. */
  state?: "STATE_UNSPECIFIED" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED" | "UNKNOWN" | (string & {});
  /** Output only. Unique identifier of the iteration. */
  iterationId?: string;
  /** Output only. An estimated percentage of the progress. Number between 0 and 100. */
  progress?: number;
  /** Output only. Overall number of actions done by the orchestrator so far. */
  performedActions?: string;
  /** Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs. */
  failedActions?: string;
  /** Output only. Start time of the wave iteration. */
  startTime?: string;
  /** Output only. Finish time of the wave iteration. */
  finishTime?: string;
  /** Output only. Error thrown in the wave iteration. */
  error?: Status;
}

export const GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState: Schema.Schema<GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  iterationId: Schema.optional(Schema.String),
  progress: Schema.optional(Schema.Number),
  performedActions: Schema.optional(Schema.String),
  failedActions: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState" }) as any as Schema.Schema<GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState>;

export interface GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState {
  /** Output only. Current Wave iteration state. */
  currentIterationState?: GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState;
  /** Output only. Previous Wave iteration state. */
  previousIterationState?: GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState;
}

export const GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState: Schema.Schema<GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState> = Schema.suspend(() => Schema.Struct({
  currentIterationState: Schema.optional(GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState),
  previousIterationState: Schema.optional(GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState),
})).annotate({ identifier: "GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState" }) as any as Schema.Schema<GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState>;

export interface GoogleCloudOsconfigV2__PolicyOrchestrator {
  /** Immutable. Identifier. In form of * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` */
  name?: string;
  /** Optional. Freeform text describing the purpose of the resource. */
  description?: string;
  /** Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. State of the orchestrator. Can be updated to change orchestrator behaviour. Allowed values: - `ACTIVE` - orchestrator is actively looking for actions to be taken. - `STOPPED` - orchestrator won't make any changes. Note: There might be more states added in the future. We use string here instead of an enum, to avoid the need of propagating new states to all the client code. */
  state?: string;
  /** Output only. Set to true, if the there are ongoing changes being applied by the orchestrator. */
  reconciling?: boolean;
  /** Optional. Defines scope for the orchestration, in context of the enclosing PolicyOrchestrator resource. Scope is expanded into a list of pairs, in which the rollout action will take place. Expansion starts with a Folder resource parenting the PolicyOrchestrator resource: - All the descendant projects are listed. - List of project is cross joined with a list of all available zones. - Resulting list of pairs is filtered according to the selectors. */
  orchestrationScope?: GoogleCloudOsconfigV2__OrchestrationScope;
  /** Required. Action to be done by the orchestrator in `projects/{project_id}/zones/{zone_id}` locations defined by the `orchestration_scope`. Allowed values: - `UPSERT` - Orchestrator will create or update target resources. - `DELETE` - Orchestrator will delete target resources, if they exist */
  action?: string;
  /** Required. Resource to be orchestrated by the policy orchestrator. */
  orchestratedResource?: GoogleCloudOsconfigV2__OrchestratedResource;
  /** Output only. State of the orchestration. */
  orchestrationState?: GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState;
  /** Output only. Timestamp when the policy orchestrator resource was created. */
  createTime?: string;
  /** Output only. Timestamp when the policy orchestrator resource was last modified. */
  updateTime?: string;
  /** Optional. Labels as key value pairs */
  labels?: Record<string, string>;
}

export const GoogleCloudOsconfigV2__PolicyOrchestrator: Schema.Schema<GoogleCloudOsconfigV2__PolicyOrchestrator> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  orchestrationScope: Schema.optional(GoogleCloudOsconfigV2__OrchestrationScope),
  action: Schema.optional(Schema.String),
  orchestratedResource: Schema.optional(GoogleCloudOsconfigV2__OrchestratedResource),
  orchestrationState: Schema.optional(GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudOsconfigV2__PolicyOrchestrator" }) as any as Schema.Schema<GoogleCloudOsconfigV2__PolicyOrchestrator>;

export interface GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse {
  /** The policy orchestrators for the specified parent resource. */
  policyOrchestrators?: Array<GoogleCloudOsconfigV2__PolicyOrchestrator>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse: Schema.Schema<GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse> = Schema.suspend(() => Schema.Struct({
  policyOrchestrators: Schema.optional(Schema.Array(GoogleCloudOsconfigV2__PolicyOrchestrator)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse" }) as any as Schema.Schema<GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse>;

export interface OSPolicyAssignmentOperationMetadata {
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Rollout update time */
  rolloutUpdateTime?: string;
}

export const OSPolicyAssignmentOperationMetadata: Schema.Schema<OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignment: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
  rolloutUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<OSPolicyAssignmentOperationMetadata>;

export interface GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  /** Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` */
  osPolicyAssignment?: string;
  /** The OS policy assignment API method. */
  apiMethod?: "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** State of the rollout */
  rolloutState?: "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | (string & {});
  /** Rollout start time */
  rolloutStartTime?: string;
  /** Rollout update time */
  rolloutUpdateTime?: string;
}

export const GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata: Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata> = Schema.suspend(() => Schema.Struct({
  osPolicyAssignment: Schema.optional(Schema.String),
  apiMethod: Schema.optional(Schema.String),
  rolloutState: Schema.optional(Schema.String),
  rolloutStartTime: Schema.optional(Schema.String),
  rolloutUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata>;

export interface GoogleCloudOsconfigV2__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigV2__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV2__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2__OperationMetadata>;

export interface GoogleCloudOsconfigV2beta__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigV2beta__OperationMetadata: Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigV2beta__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigV2beta__OperationMetadata>;

export interface GoogleCloudOsconfigCommonV1__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1__OperationMetadata>;

export interface GoogleCloudOsconfigCommonV1alpha__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1alpha__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1alpha__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1alpha__OperationMetadata>;

export interface GoogleCloudOsconfigCommonV1main__OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const GoogleCloudOsconfigCommonV1main__OperationMetadata: Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudOsconfigCommonV1main__OperationMetadata" }) as any as Schema.Schema<GoogleCloudOsconfigCommonV1main__OperationMetadata>;

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

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a new policy orchestrator under the given project resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway). */
export interface CreateProjectsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name in the form of: * `organizations/{organization_id}/locations/global` * `folders/{folder_id}/locations/global` * `projects/{project_id_or_number}/locations/global` */
  parent: string;
  /** Required. The logical identifier of the policy orchestrator, with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the parent. */
  policyOrchestratorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const CreateProjectsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyOrchestratorId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyOrchestratorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/global/policyOrchestrators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlobalPolicyOrchestratorsRequest>;

export type CreateProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const CreateProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type CreateProjectsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const createProjectsLocationsGlobalPolicyOrchestrators: API.OperationMethod<CreateProjectsLocationsGlobalPolicyOrchestratorsRequest, CreateProjectsLocationsGlobalPolicyOrchestratorsResponse, CreateProjectsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlobalPolicyOrchestratorsRequest,
  output: CreateProjectsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Lists the policy orchestrators under the given parent project resource. */
export interface ListProjectsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/global/policyOrchestrators" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlobalPolicyOrchestratorsRequest>;

export type ListProjectsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;
export const ListProjectsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;

export type ListProjectsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const listProjectsLocationsGlobalPolicyOrchestrators = API.makePaginated(() => ({
  input: ListProjectsLocationsGlobalPolicyOrchestratorsRequest,
  output: ListProjectsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves an existing policy orchestrator, parented by a project. */
export interface GetProjectsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetProjectsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlobalPolicyOrchestratorsRequest>;

export type GetProjectsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;
export const GetProjectsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;

export type GetProjectsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const getProjectsLocationsGlobalPolicyOrchestrators: API.OperationMethod<GetProjectsLocationsGlobalPolicyOrchestratorsRequest, GetProjectsLocationsGlobalPolicyOrchestratorsResponse, GetProjectsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlobalPolicyOrchestratorsRequest,
  output: GetProjectsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Updates an existing policy orchestrator, parented by a project. */
export interface PatchProjectsLocationsGlobalPolicyOrchestratorsRequest {
  /** Immutable. Identifier. In form of * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` */
  name: string;
  /** Optional. The list of fields to merge into the existing policy orchestrator. A special ["*"] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: * output only fields are ignored, * primitive fields are replaced, * repeated fields are replaced, * map fields are merged key by key, * message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: * primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), * map and repeated fields are listed, * `google.protobuf.Any` fields are listed, * other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const PatchProjectsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlobalPolicyOrchestratorsRequest>;

export type PatchProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const PatchProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type PatchProjectsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const patchProjectsLocationsGlobalPolicyOrchestrators: API.OperationMethod<PatchProjectsLocationsGlobalPolicyOrchestratorsRequest, PatchProjectsLocationsGlobalPolicyOrchestratorsResponse, PatchProjectsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlobalPolicyOrchestratorsRequest,
  output: PatchProjectsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Deletes an existing policy orchestrator resource, parented by a project. */
export interface DeleteProjectsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. Name of the resource to be deleted. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlobalPolicyOrchestratorsRequest>;

export type DeleteProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const DeleteProjectsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type DeleteProjectsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const deleteProjectsLocationsGlobalPolicyOrchestrators: API.OperationMethod<DeleteProjectsLocationsGlobalPolicyOrchestratorsRequest, DeleteProjectsLocationsGlobalPolicyOrchestratorsResponse, DeleteProjectsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlobalPolicyOrchestratorsRequest,
  output: DeleteProjectsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListFoldersLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsOperationsRequest>;

export type ListFoldersLocationsOperationsResponse = ListOperationsResponse;
export const ListFoldersLocationsOperationsResponse = ListOperationsResponse;

export type ListFoldersLocationsOperationsError = CommonErrors;

export const listFoldersLocationsOperations = API.makePaginated(() => ({
  input: ListFoldersLocationsOperationsRequest,
  output: ListFoldersLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetFoldersLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsOperationsRequest>;

export type GetFoldersLocationsOperationsResponse = Operation;
export const GetFoldersLocationsOperationsResponse = Operation;

export type GetFoldersLocationsOperationsError = CommonErrors;

export const getFoldersLocationsOperations: API.OperationMethod<GetFoldersLocationsOperationsRequest, GetFoldersLocationsOperationsResponse, GetFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsOperationsRequest,
  output: GetFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteFoldersLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsOperationsRequest>;

export type DeleteFoldersLocationsOperationsResponse = Empty;
export const DeleteFoldersLocationsOperationsResponse = Empty;

export type DeleteFoldersLocationsOperationsError = CommonErrors;

export const deleteFoldersLocationsOperations: API.OperationMethod<DeleteFoldersLocationsOperationsRequest, DeleteFoldersLocationsOperationsResponse, DeleteFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsOperationsRequest,
  output: DeleteFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelFoldersLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelFoldersLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelFoldersLocationsOperationsRequest>;

export type CancelFoldersLocationsOperationsResponse = Empty;
export const CancelFoldersLocationsOperationsResponse = Empty;

export type CancelFoldersLocationsOperationsError = CommonErrors;

export const cancelFoldersLocationsOperations: API.OperationMethod<CancelFoldersLocationsOperationsRequest, CancelFoldersLocationsOperationsResponse, CancelFoldersLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelFoldersLocationsOperationsRequest,
  output: CancelFoldersLocationsOperationsResponse,
  errors: [],
}));

/** Creates a new policy orchestrator under the given folder resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway). */
export interface CreateFoldersLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name in the form of: * `organizations/{organization_id}/locations/global` * `folders/{folder_id}/locations/global` * `projects/{project_id_or_number}/locations/global` */
  parent: string;
  /** Required. The logical identifier of the policy orchestrator, with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the parent. */
  policyOrchestratorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const CreateFoldersLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyOrchestratorId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyOrchestratorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/folders/{foldersId}/locations/global/policyOrchestrators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateFoldersLocationsGlobalPolicyOrchestratorsRequest>;

export type CreateFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const CreateFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type CreateFoldersLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const createFoldersLocationsGlobalPolicyOrchestrators: API.OperationMethod<CreateFoldersLocationsGlobalPolicyOrchestratorsRequest, CreateFoldersLocationsGlobalPolicyOrchestratorsResponse, CreateFoldersLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateFoldersLocationsGlobalPolicyOrchestratorsRequest,
  output: CreateFoldersLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Lists the policy orchestrators under the given parent folder resource. */
export interface ListFoldersLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListFoldersLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/global/policyOrchestrators" }),
  svc,
) as unknown as Schema.Schema<ListFoldersLocationsGlobalPolicyOrchestratorsRequest>;

export type ListFoldersLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;
export const ListFoldersLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;

export type ListFoldersLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const listFoldersLocationsGlobalPolicyOrchestrators = API.makePaginated(() => ({
  input: ListFoldersLocationsGlobalPolicyOrchestratorsRequest,
  output: ListFoldersLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves an existing policy orchestrator, parented by a folder. */
export interface GetFoldersLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetFoldersLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/folders/{foldersId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<GetFoldersLocationsGlobalPolicyOrchestratorsRequest>;

export type GetFoldersLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;
export const GetFoldersLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;

export type GetFoldersLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const getFoldersLocationsGlobalPolicyOrchestrators: API.OperationMethod<GetFoldersLocationsGlobalPolicyOrchestratorsRequest, GetFoldersLocationsGlobalPolicyOrchestratorsResponse, GetFoldersLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFoldersLocationsGlobalPolicyOrchestratorsRequest,
  output: GetFoldersLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Updates an existing policy orchestrator, parented by a folder. */
export interface PatchFoldersLocationsGlobalPolicyOrchestratorsRequest {
  /** Immutable. Identifier. In form of * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` */
  name: string;
  /** Optional. The list of fields to merge into the existing policy orchestrator. A special ["*"] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: * output only fields are ignored, * primitive fields are replaced, * repeated fields are replaced, * map fields are merged key by key, * message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: * primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), * map and repeated fields are listed, * `google.protobuf.Any` fields are listed, * other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const PatchFoldersLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/folders/{foldersId}/locations/global/policyOrchestrators/{policyOrchestratorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchFoldersLocationsGlobalPolicyOrchestratorsRequest>;

export type PatchFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const PatchFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type PatchFoldersLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const patchFoldersLocationsGlobalPolicyOrchestrators: API.OperationMethod<PatchFoldersLocationsGlobalPolicyOrchestratorsRequest, PatchFoldersLocationsGlobalPolicyOrchestratorsResponse, PatchFoldersLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchFoldersLocationsGlobalPolicyOrchestratorsRequest,
  output: PatchFoldersLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Deletes an existing policy orchestrator resource, parented by a folder. */
export interface DeleteFoldersLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. Name of the resource to be deleted. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteFoldersLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/folders/{foldersId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteFoldersLocationsGlobalPolicyOrchestratorsRequest>;

export type DeleteFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const DeleteFoldersLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type DeleteFoldersLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const deleteFoldersLocationsGlobalPolicyOrchestrators: API.OperationMethod<DeleteFoldersLocationsGlobalPolicyOrchestratorsRequest, DeleteFoldersLocationsGlobalPolicyOrchestratorsResponse, DeleteFoldersLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteFoldersLocationsGlobalPolicyOrchestratorsRequest,
  output: DeleteFoldersLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOrganizationsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = ListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = Operation;
export const GetOrganizationsLocationsOperationsResponse = Operation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse = Empty;

export type DeleteOrganizationsLocationsOperationsError = CommonErrors;

export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a new policy orchestrator under the given organizations resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway). */
export interface CreateOrganizationsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name in the form of: * `organizations/{organization_id}/locations/global` * `folders/{folder_id}/locations/global` * `projects/{project_id_or_number}/locations/global` */
  parent: string;
  /** Required. The logical identifier of the policy orchestrator, with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the parent. */
  policyOrchestratorId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const CreateOrganizationsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  policyOrchestratorId: Schema.optional(Schema.String).pipe(T.HttpQuery("policyOrchestratorId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/organizations/{organizationsId}/locations/global/policyOrchestrators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsGlobalPolicyOrchestratorsRequest>;

export type CreateOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const CreateOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type CreateOrganizationsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const createOrganizationsLocationsGlobalPolicyOrchestrators: API.OperationMethod<CreateOrganizationsLocationsGlobalPolicyOrchestratorsRequest, CreateOrganizationsLocationsGlobalPolicyOrchestratorsResponse, CreateOrganizationsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsGlobalPolicyOrchestratorsRequest,
  output: CreateOrganizationsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Lists the policy orchestrators under the given parent organization resource. */
export interface ListOrganizationsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListOrganizationsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/global/policyOrchestrators" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsGlobalPolicyOrchestratorsRequest>;

export type ListOrganizationsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;
export const ListOrganizationsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse;

export type ListOrganizationsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const listOrganizationsLocationsGlobalPolicyOrchestrators = API.makePaginated(() => ({
  input: ListOrganizationsLocationsGlobalPolicyOrchestratorsRequest,
  output: ListOrganizationsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves an existing policy orchestrator, parented by an organization. */
export interface GetOrganizationsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. The resource name. */
  name: string;
}

export const GetOrganizationsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/organizations/{organizationsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsGlobalPolicyOrchestratorsRequest>;

export type GetOrganizationsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;
export const GetOrganizationsLocationsGlobalPolicyOrchestratorsResponse = GoogleCloudOsconfigV2__PolicyOrchestrator;

export type GetOrganizationsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const getOrganizationsLocationsGlobalPolicyOrchestrators: API.OperationMethod<GetOrganizationsLocationsGlobalPolicyOrchestratorsRequest, GetOrganizationsLocationsGlobalPolicyOrchestratorsResponse, GetOrganizationsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsGlobalPolicyOrchestratorsRequest,
  output: GetOrganizationsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Updates an existing policy orchestrator, parented by an organization. */
export interface PatchOrganizationsLocationsGlobalPolicyOrchestratorsRequest {
  /** Immutable. Identifier. In form of * `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` * `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` */
  name: string;
  /** Optional. The list of fields to merge into the existing policy orchestrator. A special ["*"] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: * output only fields are ignored, * primitive fields are replaced, * repeated fields are replaced, * map fields are merged key by key, * message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: * primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), * map and repeated fields are listed, * `google.protobuf.Any` fields are listed, * other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudOsconfigV2__PolicyOrchestrator;
}

export const PatchOrganizationsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudOsconfigV2__PolicyOrchestrator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/organizations/{organizationsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsGlobalPolicyOrchestratorsRequest>;

export type PatchOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const PatchOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type PatchOrganizationsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const patchOrganizationsLocationsGlobalPolicyOrchestrators: API.OperationMethod<PatchOrganizationsLocationsGlobalPolicyOrchestratorsRequest, PatchOrganizationsLocationsGlobalPolicyOrchestratorsResponse, PatchOrganizationsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsGlobalPolicyOrchestratorsRequest,
  output: PatchOrganizationsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

/** Deletes an existing policy orchestrator resource, parented by an organization. */
export interface DeleteOrganizationsLocationsGlobalPolicyOrchestratorsRequest {
  /** Required. Name of the resource to be deleted. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteOrganizationsLocationsGlobalPolicyOrchestratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/organizations/{organizationsId}/locations/global/policyOrchestrators/{policyOrchestratorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsGlobalPolicyOrchestratorsRequest>;

export type DeleteOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;
export const DeleteOrganizationsLocationsGlobalPolicyOrchestratorsResponse = Operation;

export type DeleteOrganizationsLocationsGlobalPolicyOrchestratorsError = CommonErrors;

export const deleteOrganizationsLocationsGlobalPolicyOrchestrators: API.OperationMethod<DeleteOrganizationsLocationsGlobalPolicyOrchestratorsRequest, DeleteOrganizationsLocationsGlobalPolicyOrchestratorsResponse, DeleteOrganizationsLocationsGlobalPolicyOrchestratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsGlobalPolicyOrchestratorsRequest,
  output: DeleteOrganizationsLocationsGlobalPolicyOrchestratorsResponse,
  errors: [],
}));

