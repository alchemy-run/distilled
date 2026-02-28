// ==========================================================================
// Secure Source Manager API (securesourcemanager v1)
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
  name: "securesourcemanager",
  version: "v1",
  rootUrl: "https://securesourcemanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

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

export interface CustomHostConfig {
  /** Required. The custom UI hostname for the instance, e.g., "git.source.internal.mycompany.com" */
  html?: string;
  /** Required. The custom API hostname for the instance, e.g., "api.source.internal.mycompany.com" */
  api?: string;
  /** Required. The custom git ssh hostname for the instance, e.g., "ssh.source.internal.mycompany.com" */
  gitSsh?: string;
  /** Required. The custom git http hostname for the instance, e.g., "git.source.internal.mycompany.com" */
  gitHttp?: string;
}

export const CustomHostConfig: Schema.Schema<CustomHostConfig> = Schema.suspend(() => Schema.Struct({
  html: Schema.optional(Schema.String),
  api: Schema.optional(Schema.String),
  gitSsh: Schema.optional(Schema.String),
  gitHttp: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomHostConfig" }) as any as Schema.Schema<CustomHostConfig>;

export interface PrivateConfig {
  /** Required. Immutable. Indicate if it's private instance. */
  isPrivate?: boolean;
  /** Optional. Immutable. CA pool resource, resource must in the format of `projects/{project}/locations/{location}/caPools/{ca_pool}`. */
  caPool?: string;
  /** Output only. Service Attachment for HTTP, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`. */
  httpServiceAttachment?: string;
  /** Output only. Service Attachment for SSH, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`. */
  sshServiceAttachment?: string;
  /** Optional. Additional allowed projects for setting up PSC connections. Instance host project is automatically allowed and does not need to be included in this list. */
  pscAllowedProjects?: Array<string>;
  /** Optional. Custom host config for the instance. */
  customHostConfig?: CustomHostConfig;
}

export const PrivateConfig: Schema.Schema<PrivateConfig> = Schema.suspend(() => Schema.Struct({
  isPrivate: Schema.optional(Schema.Boolean),
  caPool: Schema.optional(Schema.String),
  httpServiceAttachment: Schema.optional(Schema.String),
  sshServiceAttachment: Schema.optional(Schema.String),
  pscAllowedProjects: Schema.optional(Schema.Array(Schema.String)),
  customHostConfig: Schema.optional(CustomHostConfig),
})).annotate({ identifier: "PrivateConfig" }) as any as Schema.Schema<PrivateConfig>;

export interface HostConfig {
  /** Output only. HTML hostname. */
  html?: string;
  /** Output only. API hostname. */
  api?: string;
  /** Output only. Git HTTP hostname. */
  gitHttp?: string;
  /** Output only. Git SSH hostname. */
  gitSsh?: string;
}

export const HostConfig: Schema.Schema<HostConfig> = Schema.suspend(() => Schema.Struct({
  html: Schema.optional(Schema.String),
  api: Schema.optional(Schema.String),
  gitHttp: Schema.optional(Schema.String),
  gitSsh: Schema.optional(Schema.String),
})).annotate({ identifier: "HostConfig" }) as any as Schema.Schema<HostConfig>;

export interface WorkforceIdentityFederationConfig {
  /** Optional. Immutable. Whether Workforce Identity Federation is enabled. */
  enabled?: boolean;
}

export const WorkforceIdentityFederationConfig: Schema.Schema<WorkforceIdentityFederationConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WorkforceIdentityFederationConfig" }) as any as Schema.Schema<WorkforceIdentityFederationConfig>;

export interface Instance {
  /** Identifier. A unique identifier for an instance. The name should be of the format: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` `project_number`: Maps to a unique int64 id assigned to each project. `location_id`: Refers to the region where the instance will be deployed. Since Secure Source Manager is a regional service, it must be one of the valid GCP regions. `instance_id`: User provided name for the instance, must be unique for a project_number and location_id combination. */
  name?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Optional. Labels as key value pairs. Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. For more information, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/best-practices-labels#label_encoding). */
  labels?: Record<string, string>;
  /** Optional. Private settings for private instance. */
  privateConfig?: PrivateConfig;
  /** Output only. Current state of the instance. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "PAUSED" | "UNKNOWN" | (string & {});
  /** Output only. An optional field providing information about the current instance state. */
  stateNote?: "STATE_NOTE_UNSPECIFIED" | "PAUSED_CMEK_UNAVAILABLE" | "INSTANCE_RESUMING" | (string & {});
  /** Optional. Immutable. Customer-managed encryption key name, in the format projects/* /locations/* /keyRings/* /cryptoKeys/*. */
  kmsKey?: string;
  /** Output only. A list of hostnames for this instance. */
  hostConfig?: HostConfig;
  /** Optional. Configuration for Workforce Identity Federation to support third party identity provider. If unset, defaults to the Google OIDC IdP. */
  workforceIdentityFederationConfig?: WorkforceIdentityFederationConfig;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  privateConfig: Schema.optional(PrivateConfig),
  state: Schema.optional(Schema.String),
  stateNote: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
  hostConfig: Schema.optional(HostConfig),
  workforceIdentityFederationConfig: Schema.optional(WorkforceIdentityFederationConfig),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface ListInstancesResponse {
  /** The list of instances. */
  instances?: Array<Instance>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface URIs {
  /** Output only. HTML is the URI for user to view the repository in a browser. */
  html?: string;
  /** Output only. git_https is the git HTTPS URI for git operations. */
  gitHttps?: string;
  /** Output only. API is the URI for API access. */
  api?: string;
}

export const URIs: Schema.Schema<URIs> = Schema.suspend(() => Schema.Struct({
  html: Schema.optional(Schema.String),
  gitHttps: Schema.optional(Schema.String),
  api: Schema.optional(Schema.String),
})).annotate({ identifier: "URIs" }) as any as Schema.Schema<URIs>;

export interface InitialConfig {
  /** Default branch name of the repository. */
  defaultBranch?: string;
  /** List of gitignore template names user can choose from. Valid values: actionscript, ada, agda, android, anjuta, ansible, appcelerator-titanium, app-engine, archives, arch-linux-packages, atmel-studio, autotools, backup, bazaar, bazel, bitrix, bricx-cc, c, cake-php, calabash, cf-wheels, chef-cookbook, clojure, cloud9, c-make, code-igniter, code-kit, code-sniffer, common-lisp, composer, concrete5, coq, cordova, cpp, craft-cms, cuda, cvs, d, dart, dart-editor, delphi, diff, dm, dreamweaver, dropbox, drupal, drupal-7, eagle, eclipse, eiffel-studio, elisp, elixir, elm, emacs, ensime, epi-server, erlang, esp-idf, espresso, exercism, expression-engine, ext-js, fancy, finale, flex-builder, force-dot-com, fortran, fuel-php, gcov, git-book, gnome-shell-extension, go, godot, gpg, gradle, grails, gwt, haskell, hugo, iar-ewarm, idris, igor-pro, images, infor-cms, java, jboss, jboss-4, jboss-6, jdeveloper, jekyll, jenkins-home, jenv, jet-brains, jigsaw, joomla, julia, jupyter-notebooks, kate, kdevelop4, kentico, ki-cad, kohana, kotlin, lab-view, laravel, lazarus, leiningen, lemon-stand, libre-office, lilypond, linux, lithium, logtalk, lua, lyx, mac-os, magento, magento-1, magento-2, matlab, maven, mercurial, mercury, metals, meta-programming-system, meteor, microsoft-office, model-sim, momentics, mono-develop, nanoc, net-beans, nikola, nim, ninja, node, notepad-pp, nwjs, objective--c, ocaml, octave, opa, open-cart, openssl, oracle-forms, otto, packer, patch, perl, perl6, phalcon, phoenix, pimcore, play-framework, plone, prestashop, processing, psoc-creator, puppet, pure-script, putty, python, qooxdoo, qt, r, racket, rails, raku, red, redcar, redis, rhodes-rhomobile, ros, ruby, rust, sam, sass, sbt, scala, scheme, scons, scrivener, sdcc, seam-gen, sketch-up, slick-edit, smalltalk, snap, splunk, stata, stella, sublime-text, sugar-crm, svn, swift, symfony, symphony-cms, synopsys-vcs, tags, terraform, tex, text-mate, textpattern, think-php, tortoise-git, turbo-gears-2, typo3, umbraco, unity, unreal-engine, vagrant, vim, virtual-env, virtuoso, visual-studio, visual-studio-code, vue, vvvv, waf, web-methods, windows, word-press, xcode, xilinx, xilinx-ise, xojo, yeoman, yii, zend-framework, zephir. */
  gitignores?: Array<string>;
  /** License template name user can choose from. Valid values: license-0bsd, license-389-exception, aal, abstyles, adobe-2006, adobe-glyph, adsl, afl-1-1, afl-1-2, afl-2-0, afl-2-1, afl-3-0, afmparse, agpl-1-0, agpl-1-0-only, agpl-1-0-or-later, agpl-3-0-only, agpl-3-0-or-later, aladdin, amdplpa, aml, ampas, antlr-pd, antlr-pd-fallback, apache-1-0, apache-1-1, apache-2-0, apafml, apl-1-0, apsl-1-0, apsl-1-1, apsl-1-2, apsl-2-0, artistic-1-0, artistic-1-0-cl8, artistic-1-0-perl, artistic-2-0, autoconf-exception-2-0, autoconf-exception-3-0, bahyph, barr, beerware, bison-exception-2-2, bittorrent-1-0, bittorrent-1-1, blessing, blueoak-1-0-0, bootloader-exception, borceux, bsd-1-clause, bsd-2-clause, bsd-2-clause-freebsd, bsd-2-clause-netbsd, bsd-2-clause-patent, bsd-2-clause-views, bsd-3-clause, bsd-3-clause-attribution, bsd-3-clause-clear, bsd-3-clause-lbnl, bsd-3-clause-modification, bsd-3-clause-no-nuclear-license, bsd-3-clause-no-nuclear-license-2014, bsd-3-clause-no-nuclear-warranty, bsd-3-clause-open-mpi, bsd-4-clause, bsd-4-clause-shortened, bsd-4-clause-uc, bsd-protection, bsd-source-code, bsl-1-0, busl-1-1, cal-1-0, cal-1-0-combined-work-exception, caldera, catosl-1-1, cc0-1-0, cc-by-1-0, cc-by-2-0, cc-by-3-0, cc-by-3-0-at, cc-by-3-0-us, cc-by-4-0, cc-by-nc-1-0, cc-by-nc-2-0, cc-by-nc-3-0, cc-by-nc-4-0, cc-by-nc-nd-1-0, cc-by-nc-nd-2-0, cc-by-nc-nd-3-0, cc-by-nc-nd-3-0-igo, cc-by-nc-nd-4-0, cc-by-nc-sa-1-0, cc-by-nc-sa-2-0, cc-by-nc-sa-3-0, cc-by-nc-sa-4-0, cc-by-nd-1-0, cc-by-nd-2-0, cc-by-nd-3-0, cc-by-nd-4-0, cc-by-sa-1-0, cc-by-sa-2-0, cc-by-sa-2-0-uk, cc-by-sa-2-1-jp, cc-by-sa-3-0, cc-by-sa-3-0-at, cc-by-sa-4-0, cc-pddc, cddl-1-0, cddl-1-1, cdla-permissive-1-0, cdla-sharing-1-0, cecill-1-0, cecill-1-1, cecill-2-0, cecill-2-1, cecill-b, cecill-c, cern-ohl-1-1, cern-ohl-1-2, cern-ohl-p-2-0, cern-ohl-s-2-0, cern-ohl-w-2-0, clartistic, classpath-exception-2-0, clisp-exception-2-0, cnri-jython, cnri-python, cnri-python-gpl-compatible, condor-1-1, copyleft-next-0-3-0, copyleft-next-0-3-1, cpal-1-0, cpl-1-0, cpol-1-02, crossword, crystal-stacker, cua-opl-1-0, cube, c-uda-1-0, curl, d-fsl-1-0, diffmark, digirule-foss-exception, doc, dotseqn, drl-1-0, dsdp, dvipdfm, ecl-1-0, ecl-2-0, ecos-exception-2-0, efl-1-0, efl-2-0, egenix, entessa, epics, epl-1-0, epl-2-0, erlpl-1-1, etalab-2-0, eu-datagrid, eupl-1-0, eupl-1-1, eupl-1-2, eurosym, fair, fawkes-runtime-exception, fltk-exception, font-exception-2-0, frameworx-1-0, freebsd-doc, freeimage, freertos-exception-2-0, fsfap, fsful, fsfullr, ftl, gcc-exception-2-0, gcc-exception-3-1, gd, gfdl-1-1-invariants-only, gfdl-1-1-invariants-or-later, gfdl-1-1-no-invariants-only, gfdl-1-1-no-invariants-or-later, gfdl-1-1-only, gfdl-1-1-or-later, gfdl-1-2-invariants-only, gfdl-1-2-invariants-or-later, gfdl-1-2-no-invariants-only, gfdl-1-2-no-invariants-or-later, gfdl-1-2-only, gfdl-1-2-or-later, gfdl-1-3-invariants-only, gfdl-1-3-invariants-or-later, gfdl-1-3-no-invariants-only, gfdl-1-3-no-invariants-or-later, gfdl-1-3-only, gfdl-1-3-or-later, giftware, gl2ps, glide, glulxe, glwtpl, gnu-javamail-exception, gnuplot, gpl-1-0-only, gpl-1-0-or-later, gpl-2-0-only, gpl-2-0-or-later, gpl-3-0-linking-exception, gpl-3-0-linking-source-exception, gpl-3-0-only, gpl-3-0-or-later, gpl-cc-1-0, gsoap-1-3b, haskell-report, hippocratic-2-1, hpnd, hpnd-sell-variant, htmltidy, i2p-gpl-java-exception, ibm-pibs, icu, ijg, image-magick, imatix, imlib2, info-zip, intel, intel-acpi, interbase-1-0, ipa, ipl-1-0, isc, jasper-2-0, jpnic, json, lal-1-2, lal-1-3, latex2e, leptonica, lgpl-2-0-only, lgpl-2-0-or-later, lgpl-2-1-only, lgpl-2-1-or-later, lgpl-3-0-linking-exception, lgpl-3-0-only, lgpl-3-0-or-later, lgpllr, libpng, libpng-2-0, libselinux-1-0, libtiff, libtool-exception, liliq-p-1-1, liliq-r-1-1, liliq-rplus-1-1, linux-openib, linux-syscall-note, llvm-exception, lpl-1-0, lpl-1-02, lppl-1-0, lppl-1-1, lppl-1-2, lppl-1-3a, lppl-1-3c, lzma-exception, make-index, mif-exception, miros, mit, mit-0, mit-advertising, mit-cmu, mit-enna, mit-feh, mit-modern-variant, mitnfa, mit-open-group, motosoto, mpich2, mpl-1-0, mpl-1-1, mpl-2-0, mpl-2-0-no-copyleft-exception, ms-pl, ms-rl, mtll, mulanpsl-1-0, mulanpsl-2-0, multics, mup, naist-2003, nasa-1-3, naumen, nbpl-1-0, ncgl-uk-2-0, ncsa, netcdf, net-snmp, newsletr, ngpl, nist-pd, nist-pd-fallback, nlod-1-0, nlpl, nokia, nokia-qt-exception-1-1, nosl, noweb, npl-1-0, npl-1-1, nposl-3-0, nrl, ntp, ntp-0, ocaml-lgpl-linking-exception, occt-exception-1-0, occt-pl, oclc-2-0, odbl-1-0, odc-by-1-0, ofl-1-0, ofl-1-0-no-rfn, ofl-1-0-rfn, ofl-1-1, ofl-1-1-no-rfn, ofl-1-1-rfn, ogc-1-0, ogdl-taiwan-1-0, ogl-canada-2-0, ogl-uk-1-0, ogl-uk-2-0, ogl-uk-3-0, ogtsl, oldap-1-1, oldap-1-2, oldap-1-3, oldap-1-4, oldap-2-0, oldap-2-0-1, oldap-2-1, oldap-2-2, oldap-2-2-1, oldap-2-2-2, oldap-2-3, oldap-2-4, oldap-2-7, oml, openjdk-assembly-exception-1-0, openssl, openvpn-openssl-exception, opl-1-0, oset-pl-2-1, osl-1-0, osl-1-1, osl-2-0, osl-2-1, osl-3-0, o-uda-1-0, parity-6-0-0, parity-7-0-0, pddl-1-0, php-3-0, php-3-01, plexus, polyform-noncommercial-1-0-0, polyform-small-business-1-0-0, postgresql, psf-2-0, psfrag, ps-or-pdf-font-exception-20170817, psutils, python-2-0, qhull, qpl-1-0, qt-gpl-exception-1-0, qt-lgpl-exception-1-1, qwt-exception-1-0, rdisc, rhecos-1-1, rpl-1-1, rpsl-1-0, rsa-md, rscpl, ruby, saxpath, sax-pd, scea, sendmail, sendmail-8-23, sgi-b-1-0, sgi-b-1-1, sgi-b-2-0, shl-0-51, shl-2-0, shl-2-1, simpl-2-0, sissl, sissl-1-2, sleepycat, smlnj, smppl, snia, spencer-86, spencer-94, spencer-99, spl-1-0, ssh-openssh, ssh-short, sspl-1-0, sugarcrm-1-1-3, swift-exception, swl, tapr-ohl-1-0, tcl, tcp-wrappers, tmate, torque-1-1, tosl, tu-berlin-1-0, tu-berlin-2-0, u-boot-exception-2-0, ucl-1-0, unicode-dfs-2015, unicode-dfs-2016, unicode-tou, universal-foss-exception-1-0, unlicense, upl-1-0, vim, vostrom, vsl-1-0, w3c, w3c-19980720, w3c-20150513, watcom-1-0, wsuipa, wtfpl, wxwindows-exception-3-1, x11, xerox, xfree86-1-1, xinetd, xnet, xpp, xskat, ypl-1-0, ypl-1-1, zed, zend-2-0, zimbra-1-3, zimbra-1-4, zlib, zlib-acknowledgement, zpl-1-1, zpl-2-0, zpl-2-1. */
  license?: string;
  /** README template name. Valid template name(s) are: default. */
  readme?: string;
}

export const InitialConfig: Schema.Schema<InitialConfig> = Schema.suspend(() => Schema.Struct({
  defaultBranch: Schema.optional(Schema.String),
  gitignores: Schema.optional(Schema.Array(Schema.String)),
  license: Schema.optional(Schema.String),
  readme: Schema.optional(Schema.String),
})).annotate({ identifier: "InitialConfig" }) as any as Schema.Schema<InitialConfig>;

export interface Repository {
  /** Identifier. A unique identifier for a repository. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}` */
  name?: string;
  /** Optional. Description of the repository, which cannot exceed 500 characters. */
  description?: string;
  /** Optional. The name of the instance in which the repository is hosted, formatted as `projects/{project_number}/locations/{location_id}/instances/{instance_id}` When creating repository via securesourcemanager.googleapis.com, this field is used as input. When creating repository via *.sourcemanager.dev, this field is output only. */
  instance?: string;
  /** Output only. Unique identifier of the repository. */
  uid?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Output only. URIs for the repository. */
  uris?: URIs;
  /** Input only. Initial configurations for the repository. */
  initialConfig?: InitialConfig;
}

export const Repository: Schema.Schema<Repository> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  uris: Schema.optional(URIs),
  initialConfig: Schema.optional(InitialConfig),
})).annotate({ identifier: "Repository" }) as any as Schema.Schema<Repository>;

export interface ListRepositoriesResponse {
  /** The list of repositories. */
  repositories?: Array<Repository>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListRepositoriesResponse: Schema.Schema<ListRepositoriesResponse> = Schema.suspend(() => Schema.Struct({
  repositories: Schema.optional(Schema.Array(Repository)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRepositoriesResponse" }) as any as Schema.Schema<ListRepositoriesResponse>;

export interface PushOption {
  /** Optional. Trigger hook for matching branches only. Specified as glob pattern. If empty or *, events for all branches are reported. Examples: main, {main,release*}. See https://pkg.go.dev/github.com/gobwas/glob documentation. */
  branchFilter?: string;
}

export const PushOption: Schema.Schema<PushOption> = Schema.suspend(() => Schema.Struct({
  branchFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "PushOption" }) as any as Schema.Schema<PushOption>;

export interface Hook {
  /** Identifier. A unique identifier for a Hook. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}` */
  name?: string;
  /** Required. The target URI to which the payloads will be delivered. */
  targetUri?: string;
  /** Optional. Determines if the hook disabled or not. Set to true to stop sending traffic. */
  disabled?: boolean;
  /** Optional. The events that trigger hook on. */
  events?: Array<"UNSPECIFIED" | "PUSH" | "PULL_REQUEST" | (string & {})>;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Output only. Unique identifier of the hook. */
  uid?: string;
  /** Optional. The trigger option for push events. */
  pushOption?: PushOption;
  /** Optional. The sensitive query string to be appended to the target URI. */
  sensitiveQueryString?: string;
}

export const Hook: Schema.Schema<Hook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  targetUri: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  events: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  pushOption: Schema.optional(PushOption),
  sensitiveQueryString: Schema.optional(Schema.String),
})).annotate({ identifier: "Hook" }) as any as Schema.Schema<Hook>;

export interface ListHooksResponse {
  /** The list of hooks. */
  hooks?: Array<Hook>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListHooksResponse: Schema.Schema<ListHooksResponse> = Schema.suspend(() => Schema.Struct({
  hooks: Schema.optional(Schema.Array(Hook)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListHooksResponse" }) as any as Schema.Schema<ListHooksResponse>;

export interface Check {
  /** Required. The context of the check. */
  context?: string;
}

export const Check: Schema.Schema<Check> = Schema.suspend(() => Schema.Struct({
  context: Schema.optional(Schema.String),
})).annotate({ identifier: "Check" }) as any as Schema.Schema<Check>;

export interface BranchRule {
  /** Identifier. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}` */
  name?: string;
  /** Output only. Unique identifier of the repository. */
  uid?: string;
  /** Output only. Create timestamp. */
  createTime?: string;
  /** Output only. Update timestamp. */
  updateTime?: string;
  /** Optional. User annotations. These attributes can only be set and used by the user. See https://google.aip.dev/128#annotations for more details such as format and size limitations. */
  annotations?: Record<string, string>;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. The pattern of the branch that can match to this BranchRule. Specified as regex. .* for all branches. Examples: main, (main|release.*). Current MVP phase only support `.*` for wildcard. */
  includePattern?: string;
  /** Optional. Determines if the branch rule is disabled or not. */
  disabled?: boolean;
  /** Optional. Determines if the branch rule requires a pull request or not. */
  requirePullRequest?: boolean;
  /** Optional. The minimum number of reviews required for the branch rule to be matched. */
  minimumReviewsCount?: number;
  /** Optional. The minimum number of approvals required for the branch rule to be matched. */
  minimumApprovalsCount?: number;
  /** Optional. Determines if code owners must approve before merging to the branch. */
  requireCodeOwnerApproval?: boolean;
  /** Optional. Determines if require comments resolved before merging to the branch. */
  requireCommentsResolved?: boolean;
  /** Optional. Determines if allow stale reviews or approvals before merging to the branch. */
  allowStaleReviews?: boolean;
  /** Optional. Determines if require linear history before merging to the branch. */
  requireLinearHistory?: boolean;
  /** Optional. List of required status checks before merging to the branch. */
  requiredStatusChecks?: Array<Check>;
}

export const BranchRule: Schema.Schema<BranchRule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  etag: Schema.optional(Schema.String),
  includePattern: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  requirePullRequest: Schema.optional(Schema.Boolean),
  minimumReviewsCount: Schema.optional(Schema.Number),
  minimumApprovalsCount: Schema.optional(Schema.Number),
  requireCodeOwnerApproval: Schema.optional(Schema.Boolean),
  requireCommentsResolved: Schema.optional(Schema.Boolean),
  allowStaleReviews: Schema.optional(Schema.Boolean),
  requireLinearHistory: Schema.optional(Schema.Boolean),
  requiredStatusChecks: Schema.optional(Schema.Array(Check)),
})).annotate({ identifier: "BranchRule" }) as any as Schema.Schema<BranchRule>;

export interface ListBranchRulesResponse {
  /** The list of branch rules. */
  branchRules?: Array<BranchRule>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListBranchRulesResponse: Schema.Schema<ListBranchRulesResponse> = Schema.suspend(() => Schema.Struct({
  branchRules: Schema.optional(Schema.Array(BranchRule)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBranchRulesResponse" }) as any as Schema.Schema<ListBranchRulesResponse>;

export interface Branch {
  /** Required. Name of the branch. */
  ref?: string;
  /** Output only. The commit at the tip of the branch. */
  sha?: string;
}

export const Branch: Schema.Schema<Branch> = Schema.suspend(() => Schema.Struct({
  ref: Schema.optional(Schema.String),
  sha: Schema.optional(Schema.String),
})).annotate({ identifier: "Branch" }) as any as Schema.Schema<Branch>;

export interface PullRequest {
  /** Output only. Identifier. A unique identifier for a PullRequest. The number appended at the end is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request_id}` */
  name?: string;
  /** Required. The pull request title. */
  title?: string;
  /** Optional. The pull request body. Provides a detailed description of the changes. */
  body?: string;
  /** Required. The branch to merge changes in. */
  base?: Branch;
  /** Immutable. The branch containing the changes to be merged. */
  head?: Branch;
  /** Output only. State of the pull request (open, closed or merged). */
  state?: "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | "MERGED" | (string & {});
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Last updated timestamp. */
  updateTime?: string;
  /** Output only. Close timestamp (if closed or merged). Cleared when pull request is re-opened. */
  closeTime?: string;
}

export const PullRequest: Schema.Schema<PullRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  base: Schema.optional(Branch),
  head: Schema.optional(Branch),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  closeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "PullRequest" }) as any as Schema.Schema<PullRequest>;

export interface ListPullRequestsResponse {
  /** The list of pull requests. */
  pullRequests?: Array<PullRequest>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListPullRequestsResponse: Schema.Schema<ListPullRequestsResponse> = Schema.suspend(() => Schema.Struct({
  pullRequests: Schema.optional(Schema.Array(PullRequest)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPullRequestsResponse" }) as any as Schema.Schema<ListPullRequestsResponse>;

export interface MergePullRequestRequest {
}

export const MergePullRequestRequest: Schema.Schema<MergePullRequestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "MergePullRequestRequest" }) as any as Schema.Schema<MergePullRequestRequest>;

export interface OpenPullRequestRequest {
}

export const OpenPullRequestRequest: Schema.Schema<OpenPullRequestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "OpenPullRequestRequest" }) as any as Schema.Schema<OpenPullRequestRequest>;

export interface ClosePullRequestRequest {
}

export const ClosePullRequestRequest: Schema.Schema<ClosePullRequestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ClosePullRequestRequest" }) as any as Schema.Schema<ClosePullRequestRequest>;

export interface FileDiff {
  /** Output only. The name of the file. */
  name?: string;
  /** Output only. The action taken on the file (eg. added, modified, deleted). */
  action?: "ACTION_UNSPECIFIED" | "ADDED" | "MODIFIED" | "DELETED" | (string & {});
  /** Output only. The commit pointing to the file changes. */
  sha?: string;
  /** Output only. The git patch containing the file changes. */
  patch?: string;
}

export const FileDiff: Schema.Schema<FileDiff> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  sha: Schema.optional(Schema.String),
  patch: Schema.optional(Schema.String),
})).annotate({ identifier: "FileDiff" }) as any as Schema.Schema<FileDiff>;

export interface ListPullRequestFileDiffsResponse {
  /** The list of pull request file diffs. */
  fileDiffs?: Array<FileDiff>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListPullRequestFileDiffsResponse: Schema.Schema<ListPullRequestFileDiffsResponse> = Schema.suspend(() => Schema.Struct({
  fileDiffs: Schema.optional(Schema.Array(FileDiff)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPullRequestFileDiffsResponse" }) as any as Schema.Schema<ListPullRequestFileDiffsResponse>;

export interface TreeEntry {
  /** Output only. The type of the object (TREE, BLOB, COMMIT). Output-only. */
  type?: "OBJECT_TYPE_UNSPECIFIED" | "TREE" | "BLOB" | "COMMIT" | (string & {});
  /** Output only. The SHA-1 hash of the object (unique identifier). Output-only. */
  sha?: string;
  /** Output only. The path of the file or directory within the tree (e.g., "src/main/java/MyClass.java"). Output-only. */
  path?: string;
  /** Output only. The file mode as a string (e.g., "100644"). Indicates file type. Output-only. */
  mode?: string;
  /** Output only. The size of the object in bytes (only for blobs). Output-only. */
  size?: string;
}

export const TreeEntry: Schema.Schema<TreeEntry> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  sha: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
})).annotate({ identifier: "TreeEntry" }) as any as Schema.Schema<TreeEntry>;

export interface FetchTreeResponse {
  /** The list of TreeEntry objects. */
  treeEntries?: Array<TreeEntry>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const FetchTreeResponse: Schema.Schema<FetchTreeResponse> = Schema.suspend(() => Schema.Struct({
  treeEntries: Schema.optional(Schema.Array(TreeEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchTreeResponse" }) as any as Schema.Schema<FetchTreeResponse>;

export interface FetchBlobResponse {
  /** The SHA-1 hash of the blob. */
  sha?: string;
  /** The content of the blob, encoded as base64. */
  content?: string;
}

export const FetchBlobResponse: Schema.Schema<FetchBlobResponse> = Schema.suspend(() => Schema.Struct({
  sha: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "FetchBlobResponse" }) as any as Schema.Schema<FetchBlobResponse>;

export interface Issue {
  /** Identifier. Unique identifier for an issue. The issue id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}` */
  name?: string;
  /** Required. Issue title. */
  title?: string;
  /** Optional. Issue body. Provides a detailed description of the issue. */
  body?: string;
  /** Output only. State of the issue. */
  state?: "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | (string & {});
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Last updated timestamp. */
  updateTime?: string;
  /** Output only. Close timestamp (if closed). Cleared when is re-opened. */
  closeTime?: string;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const Issue: Schema.Schema<Issue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  closeTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Issue" }) as any as Schema.Schema<Issue>;

export interface ListIssuesResponse {
  /** The list of issues. */
  issues?: Array<Issue>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListIssuesResponse: Schema.Schema<ListIssuesResponse> = Schema.suspend(() => Schema.Struct({
  issues: Schema.optional(Schema.Array(Issue)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIssuesResponse" }) as any as Schema.Schema<ListIssuesResponse>;

export interface OpenIssueRequest {
  /** Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, opening will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const OpenIssueRequest: Schema.Schema<OpenIssueRequest> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "OpenIssueRequest" }) as any as Schema.Schema<OpenIssueRequest>;

export interface CloseIssueRequest {
  /** Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, closing will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const CloseIssueRequest: Schema.Schema<CloseIssueRequest> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "CloseIssueRequest" }) as any as Schema.Schema<CloseIssueRequest>;

export interface Review {
  /** Required. The review action type. */
  actionType?: "ACTION_TYPE_UNSPECIFIED" | "COMMENT" | "CHANGE_REQUESTED" | "APPROVED" | (string & {});
  /** Optional. The comment body. */
  body?: string;
  /** Output only. The effective commit sha this review is pointing to. */
  effectiveCommitSha?: string;
}

export const Review: Schema.Schema<Review> = Schema.suspend(() => Schema.Struct({
  actionType: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  effectiveCommitSha: Schema.optional(Schema.String),
})).annotate({ identifier: "Review" }) as any as Schema.Schema<Review>;

export interface Comment {
  /** Required. The comment body. */
  body?: string;
}

export const Comment: Schema.Schema<Comment> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(Schema.String),
})).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface Position {
  /** Required. The path of the file. */
  path?: string;
  /** Required. The line number of the comment. Positive value means it's on the new side of the diff, negative value means it's on the old side. */
  line?: string;
}

export const Position: Schema.Schema<Position> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  line: Schema.optional(Schema.String),
})).annotate({ identifier: "Position" }) as any as Schema.Schema<Position>;

export interface Code {
  /** Required. The comment body. */
  body?: string;
  /** Optional. Input only. The PullRequestComment resource name that this comment is replying to. */
  reply?: string;
  /** Optional. The position of the comment. */
  position?: Position;
  /** Output only. The root comment of the conversation, derived from the reply field. */
  effectiveRootComment?: string;
  /** Output only. Boolean indicator if the comment is resolved. */
  resolved?: boolean;
  /** Output only. The effective commit sha this code comment is pointing to. */
  effectiveCommitSha?: string;
}

export const Code: Schema.Schema<Code> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(Schema.String),
  reply: Schema.optional(Schema.String),
  position: Schema.optional(Position),
  effectiveRootComment: Schema.optional(Schema.String),
  resolved: Schema.optional(Schema.Boolean),
  effectiveCommitSha: Schema.optional(Schema.String),
})).annotate({ identifier: "Code" }) as any as Schema.Schema<Code>;

export interface PullRequestComment {
  /** Identifier. Unique identifier for the pull request comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}/pullRequestComments/{comment_id}` */
  name?: string;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Last updated timestamp. */
  updateTime?: string;
  /** Optional. The review summary comment. */
  review?: Review;
  /** Optional. The general pull request comment. */
  comment?: Comment;
  /** Optional. The comment on a code line. */
  code?: Code;
}

export const PullRequestComment: Schema.Schema<PullRequestComment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  review: Schema.optional(Review),
  comment: Schema.optional(Comment),
  code: Schema.optional(Code),
})).annotate({ identifier: "PullRequestComment" }) as any as Schema.Schema<PullRequestComment>;

export interface ListPullRequestCommentsResponse {
  /** The list of pull request comments. */
  pullRequestComments?: Array<PullRequestComment>;
  /** A token to set as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPullRequestCommentsResponse: Schema.Schema<ListPullRequestCommentsResponse> = Schema.suspend(() => Schema.Struct({
  pullRequestComments: Schema.optional(Schema.Array(PullRequestComment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPullRequestCommentsResponse" }) as any as Schema.Schema<ListPullRequestCommentsResponse>;

export interface CreatePullRequestCommentRequest {
  /** Required. The pull request in which to create the pull request comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent?: string;
  /** Required. The pull request comment to create. */
  pullRequestComment?: PullRequestComment;
}

export const CreatePullRequestCommentRequest: Schema.Schema<CreatePullRequestCommentRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  pullRequestComment: Schema.optional(PullRequestComment),
})).annotate({ identifier: "CreatePullRequestCommentRequest" }) as any as Schema.Schema<CreatePullRequestCommentRequest>;

export interface BatchCreatePullRequestCommentsRequest {
  /** Required. The request message specifying the resources to create. There should be exactly one CreatePullRequestCommentRequest with CommentDetail being REVIEW in the list, and no more than 100 CreatePullRequestCommentRequests with CommentDetail being CODE in the list */
  requests?: Array<CreatePullRequestCommentRequest>;
}

export const BatchCreatePullRequestCommentsRequest: Schema.Schema<BatchCreatePullRequestCommentsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(CreatePullRequestCommentRequest)),
})).annotate({ identifier: "BatchCreatePullRequestCommentsRequest" }) as any as Schema.Schema<BatchCreatePullRequestCommentsRequest>;

export interface ResolvePullRequestCommentsRequest {
  /** Required. The names of the pull request comments to resolve. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}` Only comments from the same threads are allowed in the same request. */
  names?: Array<string>;
  /** Optional. If set, at least one comment in a thread is required, rest of the comments in the same thread will be automatically updated to resolved. If unset, all comments in the same thread need be present. */
  autoFill?: boolean;
}

export const ResolvePullRequestCommentsRequest: Schema.Schema<ResolvePullRequestCommentsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  autoFill: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ResolvePullRequestCommentsRequest" }) as any as Schema.Schema<ResolvePullRequestCommentsRequest>;

export interface UnresolvePullRequestCommentsRequest {
  /** Required. The names of the pull request comments to unresolve. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}` Only comments from the same threads are allowed in the same request. */
  names?: Array<string>;
  /** Optional. If set, at least one comment in a thread is required, rest of the comments in the same thread will be automatically updated to unresolved. If unset, all comments in the same thread need be present. */
  autoFill?: boolean;
}

export const UnresolvePullRequestCommentsRequest: Schema.Schema<UnresolvePullRequestCommentsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  autoFill: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "UnresolvePullRequestCommentsRequest" }) as any as Schema.Schema<UnresolvePullRequestCommentsRequest>;

export interface IssueComment {
  /** Identifier. Unique identifier for an issue comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue}/issueComments/{comment_id}` */
  name?: string;
  /** Required. The comment body. */
  body?: string;
  /** Output only. Creation timestamp. */
  createTime?: string;
  /** Output only. Last updated timestamp. */
  updateTime?: string;
}

export const IssueComment: Schema.Schema<IssueComment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IssueComment" }) as any as Schema.Schema<IssueComment>;

export interface ListIssueCommentsResponse {
  /** The list of issue comments. */
  issueComments?: Array<IssueComment>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListIssueCommentsResponse: Schema.Schema<ListIssueCommentsResponse> = Schema.suspend(() => Schema.Struct({
  issueComments: Schema.optional(Schema.Array(IssueComment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListIssueCommentsResponse" }) as any as Schema.Schema<ListIssueCommentsResponse>;

export interface OperationMetadata {
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

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface BatchCreatePullRequestCommentsResponse {
  /** The list of pull request comments created. */
  pullRequestComments?: Array<PullRequestComment>;
}

export const BatchCreatePullRequestCommentsResponse: Schema.Schema<BatchCreatePullRequestCommentsResponse> = Schema.suspend(() => Schema.Struct({
  pullRequestComments: Schema.optional(Schema.Array(PullRequestComment)),
})).annotate({ identifier: "BatchCreatePullRequestCommentsResponse" }) as any as Schema.Schema<BatchCreatePullRequestCommentsResponse>;

export interface ResolvePullRequestCommentsResponse {
  /** The list of pull request comments resolved. */
  pullRequestComments?: Array<PullRequestComment>;
}

export const ResolvePullRequestCommentsResponse: Schema.Schema<ResolvePullRequestCommentsResponse> = Schema.suspend(() => Schema.Struct({
  pullRequestComments: Schema.optional(Schema.Array(PullRequestComment)),
})).annotate({ identifier: "ResolvePullRequestCommentsResponse" }) as any as Schema.Schema<ResolvePullRequestCommentsResponse>;

export interface UnresolvePullRequestCommentsResponse {
  /** The list of pull request comments unresolved. */
  pullRequestComments?: Array<PullRequestComment>;
}

export const UnresolvePullRequestCommentsResponse: Schema.Schema<UnresolvePullRequestCommentsResponse> = Schema.suspend(() => Schema.Struct({
  pullRequestComments: Schema.optional(Schema.Array(PullRequestComment)),
})).annotate({ identifier: "UnresolvePullRequestCommentsResponse" }) as any as Schema.Schema<UnresolvePullRequestCommentsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsInstancesRequest>;

export type SetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const SetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type SetIamPolicyProjectsLocationsInstancesError = CommonErrors;

export const setIamPolicyProjectsLocationsInstances: API.OperationMethod<SetIamPolicyProjectsLocationsInstancesRequest, SetIamPolicyProjectsLocationsInstancesResponse, SetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsInstancesRequest,
  output: SetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsInstancesRequest>;

export type GetIamPolicyProjectsLocationsInstancesResponse = Policy;
export const GetIamPolicyProjectsLocationsInstancesResponse = Policy;

export type GetIamPolicyProjectsLocationsInstancesError = CommonErrors;

export const getIamPolicyProjectsLocationsInstances: API.OperationMethod<GetIamPolicyProjectsLocationsInstancesRequest, GetIamPolicyProjectsLocationsInstancesResponse, GetIamPolicyProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsInstancesRequest,
  output: GetIamPolicyProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsInstancesRequest>;

export type TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsInstancesError = CommonErrors;

export const testIamPermissionsProjectsLocationsInstances: API.OperationMethod<TestIamPermissionsProjectsLocationsInstancesRequest, TestIamPermissionsProjectsLocationsInstancesResponse, TestIamPermissionsProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsInstancesRequest,
  output: TestIamPermissionsProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Lists Instances in a given project and location. */
export interface ListProjectsLocationsInstancesRequest {
  /** Required. Parent value for ListInstancesRequest. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filter for filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsInstancesRequest>;

export type ListProjectsLocationsInstancesResponse = ListInstancesResponse;
export const ListProjectsLocationsInstancesResponse = ListInstancesResponse;

export type ListProjectsLocationsInstancesError = CommonErrors;

export const listProjectsLocationsInstances = API.makePaginated(() => ({
  input: ListProjectsLocationsInstancesRequest,
  output: ListProjectsLocationsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single instance. */
export interface GetProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
}

export const GetProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsInstancesRequest>;

export type GetProjectsLocationsInstancesResponse = Instance;
export const GetProjectsLocationsInstancesResponse = Instance;

export type GetProjectsLocationsInstancesError = CommonErrors;

export const getProjectsLocationsInstances: API.OperationMethod<GetProjectsLocationsInstancesRequest, GetProjectsLocationsInstancesResponse, GetProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsInstancesRequest,
  output: GetProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Creates a new instance in a given project and location. */
export interface CreateProjectsLocationsInstancesRequest {
  /** Required. Value for parent. */
  parent: string;
  /** Required. ID of the instance to be created. */
  instanceId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Instance;
}

export const CreateProjectsLocationsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  instanceId: Schema.optional(Schema.String).pipe(T.HttpQuery("instanceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsInstancesRequest>;

export type CreateProjectsLocationsInstancesResponse = Operation;
export const CreateProjectsLocationsInstancesResponse = Operation;

export type CreateProjectsLocationsInstancesError = CommonErrors;

export const createProjectsLocationsInstances: API.OperationMethod<CreateProjectsLocationsInstancesRequest, CreateProjectsLocationsInstancesResponse, CreateProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsInstancesRequest,
  output: CreateProjectsLocationsInstancesResponse,
  errors: [],
}));

/** Deletes a single instance. */
export interface DeleteProjectsLocationsInstancesRequest {
  /** Required. Name of the resource. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Optional. If set to true, will force the deletion of the instance. */
  force?: boolean;
}

export const DeleteProjectsLocationsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsInstancesRequest>;

export type DeleteProjectsLocationsInstancesResponse = Operation;
export const DeleteProjectsLocationsInstancesResponse = Operation;

export type DeleteProjectsLocationsInstancesError = CommonErrors;

export const deleteProjectsLocationsInstances: API.OperationMethod<DeleteProjectsLocationsInstancesRequest, DeleteProjectsLocationsInstancesResponse, DeleteProjectsLocationsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsInstancesRequest,
  output: DeleteProjectsLocationsInstancesResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
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
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
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

/** Lists Repositories in a given project and location. The instance field is required in the query parameter for requests using the securesourcemanager.googleapis.com endpoint. */
export interface ListProjectsLocationsRepositoriesRequest {
  /** Required. Parent value for ListRepositoriesRequest. */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filter results. */
  filter?: string;
  /** Optional. The name of the instance in which the repository is hosted, formatted as `projects/{project_number}/locations/{location_id}/instances/{instance_id}`. When listing repositories via securesourcemanager.googleapis.com, this field is required. When listing repositories via *.sourcemanager.dev, this field is ignored. */
  instance?: string;
}

export const ListProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  instance: Schema.optional(Schema.String).pipe(T.HttpQuery("instance")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesRequest>;

export type ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;
export const ListProjectsLocationsRepositoriesResponse = ListRepositoriesResponse;

export type ListProjectsLocationsRepositoriesError = CommonErrors;

export const listProjectsLocationsRepositories = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesRequest,
  output: ListProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets metadata of a repository. */
export interface GetProjectsLocationsRepositoriesRequest {
  /** Required. Name of the repository to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesRequest>;

export type GetProjectsLocationsRepositoriesResponse = Repository;
export const GetProjectsLocationsRepositoriesResponse = Repository;

export type GetProjectsLocationsRepositoriesError = CommonErrors;

export const getProjectsLocationsRepositories: API.OperationMethod<GetProjectsLocationsRepositoriesRequest, GetProjectsLocationsRepositoriesResponse, GetProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesRequest,
  output: GetProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Creates a new repository in a given project and location. The Repository.Instance field is required in the request body for requests using the securesourcemanager.googleapis.com endpoint. */
export interface CreateProjectsLocationsRepositoriesRequest {
  /** Required. The project in which to create the repository. Values are of the form `projects/{project_number}/locations/{location_id}` */
  parent: string;
  /** Required. The ID to use for the repository, which will become the final component of the repository's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. */
  repositoryId?: string;
  /** Request body */
  body?: Repository;
}

export const CreateProjectsLocationsRepositoriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  repositoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("repositoryId")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesRequest>;

export type CreateProjectsLocationsRepositoriesResponse = Operation;
export const CreateProjectsLocationsRepositoriesResponse = Operation;

export type CreateProjectsLocationsRepositoriesError = CommonErrors;

export const createProjectsLocationsRepositories: API.OperationMethod<CreateProjectsLocationsRepositoriesRequest, CreateProjectsLocationsRepositoriesResponse, CreateProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesRequest,
  output: CreateProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Updates the metadata of a repository. */
export interface PatchProjectsLocationsRepositoriesRequest {
  /** Identifier. A unique identifier for a repository. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the repository resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. False by default. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. */
  validateOnly?: boolean;
  /** Request body */
  body?: Repository;
}

export const PatchProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Repository).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesRequest>;

export type PatchProjectsLocationsRepositoriesResponse = Operation;
export const PatchProjectsLocationsRepositoriesResponse = Operation;

export type PatchProjectsLocationsRepositoriesError = CommonErrors;

export const patchProjectsLocationsRepositories: API.OperationMethod<PatchProjectsLocationsRepositoriesRequest, PatchProjectsLocationsRepositoriesResponse, PatchProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesRequest,
  output: PatchProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Deletes a Repository. */
export interface DeleteProjectsLocationsRepositoriesRequest {
  /** Required. Name of the repository to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. */
  name: string;
  /** Optional. If set to true, and the repository is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsRepositoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesRequest>;

export type DeleteProjectsLocationsRepositoriesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesError = CommonErrors;

export const deleteProjectsLocationsRepositories: API.OperationMethod<DeleteProjectsLocationsRepositoriesRequest, DeleteProjectsLocationsRepositoriesResponse, DeleteProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesRequest,
  output: DeleteProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Get IAM policy for a repository. */
export interface GetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsRepositoriesRequest>;

export type GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const GetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type GetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const getIamPolicyProjectsLocationsRepositories: API.OperationMethod<GetIamPolicyProjectsLocationsRepositoriesRequest, GetIamPolicyProjectsLocationsRepositoriesResponse, GetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsRepositoriesRequest,
  output: GetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Set IAM policy on a repository. */
export interface SetIamPolicyProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsRepositoriesRequest>;

export type SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;
export const SetIamPolicyProjectsLocationsRepositoriesResponse = Policy;

export type SetIamPolicyProjectsLocationsRepositoriesError = CommonErrors;

export const setIamPolicyProjectsLocationsRepositories: API.OperationMethod<SetIamPolicyProjectsLocationsRepositoriesRequest, SetIamPolicyProjectsLocationsRepositoriesResponse, SetIamPolicyProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsRepositoriesRequest,
  output: SetIamPolicyProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Test IAM permissions on a repository. IAM permission checks are not required on this method. */
export interface TestIamPermissionsProjectsLocationsRepositoriesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsRepositoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsRepositoriesRequest>;

export type TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsRepositoriesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsRepositoriesError = CommonErrors;

export const testIamPermissionsProjectsLocationsRepositories: API.OperationMethod<TestIamPermissionsProjectsLocationsRepositoriesRequest, TestIamPermissionsProjectsLocationsRepositoriesResponse, TestIamPermissionsProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsRepositoriesRequest,
  output: TestIamPermissionsProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Fetches a tree from a repository. */
export interface FetchTreeProjectsLocationsRepositoriesRequest {
  /** Required. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. Specifies the repository to fetch the tree from. */
  repository: string;
  /** Optional. `ref` can be a SHA-1 hash, a branch name, or a tag. Specifies which tree to fetch. If not specified, the default branch will be used. */
  ref?: string;
  /** Optional. If true, include all subfolders and their files in the response. If false, only the immediate children are returned. */
  recursive?: boolean;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, at most 10,000 items will be returned. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const FetchTreeProjectsLocationsRepositoriesRequest = Schema.Struct({
  repository: Schema.String.pipe(T.HttpPath("repository")),
  ref: Schema.optional(Schema.String).pipe(T.HttpQuery("ref")),
  recursive: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("recursive")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:fetchTree" }),
  svc,
) as unknown as Schema.Schema<FetchTreeProjectsLocationsRepositoriesRequest>;

export type FetchTreeProjectsLocationsRepositoriesResponse = FetchTreeResponse;
export const FetchTreeProjectsLocationsRepositoriesResponse = FetchTreeResponse;

export type FetchTreeProjectsLocationsRepositoriesError = CommonErrors;

export const fetchTreeProjectsLocationsRepositories = API.makePaginated(() => ({
  input: FetchTreeProjectsLocationsRepositoriesRequest,
  output: FetchTreeProjectsLocationsRepositoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Fetches a blob from a repository. */
export interface FetchBlobProjectsLocationsRepositoriesRequest {
  /** Required. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. Specifies the repository containing the blob. */
  repository: string;
  /** Required. The SHA-1 hash of the blob to retrieve. */
  sha?: string;
}

export const FetchBlobProjectsLocationsRepositoriesRequest = Schema.Struct({
  repository: Schema.String.pipe(T.HttpPath("repository")),
  sha: Schema.optional(Schema.String).pipe(T.HttpQuery("sha")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}:fetchBlob" }),
  svc,
) as unknown as Schema.Schema<FetchBlobProjectsLocationsRepositoriesRequest>;

export type FetchBlobProjectsLocationsRepositoriesResponse = FetchBlobResponse;
export const FetchBlobProjectsLocationsRepositoriesResponse = FetchBlobResponse;

export type FetchBlobProjectsLocationsRepositoriesError = CommonErrors;

export const fetchBlobProjectsLocationsRepositories: API.OperationMethod<FetchBlobProjectsLocationsRepositoriesRequest, FetchBlobProjectsLocationsRepositoriesResponse, FetchBlobProjectsLocationsRepositoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchBlobProjectsLocationsRepositoriesRequest,
  output: FetchBlobProjectsLocationsRepositoriesResponse,
  errors: [],
}));

/** Lists hooks in a given repository. */
export interface ListProjectsLocationsRepositoriesHooksRequest {
  /** Required. Parent value for ListHooksRequest. */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesHooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/hooks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesHooksRequest>;

export type ListProjectsLocationsRepositoriesHooksResponse = ListHooksResponse;
export const ListProjectsLocationsRepositoriesHooksResponse = ListHooksResponse;

export type ListProjectsLocationsRepositoriesHooksError = CommonErrors;

export const listProjectsLocationsRepositoriesHooks = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesHooksRequest,
  output: ListProjectsLocationsRepositoriesHooksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets metadata of a hook. */
export interface GetProjectsLocationsRepositoriesHooksRequest {
  /** Required. Name of the hook to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesHooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/hooks/{hooksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesHooksRequest>;

export type GetProjectsLocationsRepositoriesHooksResponse = Hook;
export const GetProjectsLocationsRepositoriesHooksResponse = Hook;

export type GetProjectsLocationsRepositoriesHooksError = CommonErrors;

export const getProjectsLocationsRepositoriesHooks: API.OperationMethod<GetProjectsLocationsRepositoriesHooksRequest, GetProjectsLocationsRepositoriesHooksResponse, GetProjectsLocationsRepositoriesHooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesHooksRequest,
  output: GetProjectsLocationsRepositoriesHooksResponse,
  errors: [],
}));

/** Creates a new hook in a given repository. */
export interface CreateProjectsLocationsRepositoriesHooksRequest {
  /** Required. The repository in which to create the hook. Values are of the form `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` */
  parent: string;
  /** Required. The ID to use for the hook, which will become the final component of the hook's resource name. This value restricts to lower-case letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  hookId?: string;
  /** Request body */
  body?: Hook;
}

export const CreateProjectsLocationsRepositoriesHooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  hookId: Schema.optional(Schema.String).pipe(T.HttpQuery("hookId")),
  body: Schema.optional(Hook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/hooks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesHooksRequest>;

export type CreateProjectsLocationsRepositoriesHooksResponse = Operation;
export const CreateProjectsLocationsRepositoriesHooksResponse = Operation;

export type CreateProjectsLocationsRepositoriesHooksError = CommonErrors;

export const createProjectsLocationsRepositoriesHooks: API.OperationMethod<CreateProjectsLocationsRepositoriesHooksRequest, CreateProjectsLocationsRepositoriesHooksResponse, CreateProjectsLocationsRepositoriesHooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesHooksRequest,
  output: CreateProjectsLocationsRepositoriesHooksResponse,
  errors: [],
}));

/** Updates the metadata of a hook. */
export interface PatchProjectsLocationsRepositoriesHooksRequest {
  /** Identifier. A unique identifier for a Hook. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the hook resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "*" means full replacement. */
  updateMask?: string;
  /** Request body */
  body?: Hook;
}

export const PatchProjectsLocationsRepositoriesHooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Hook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/hooks/{hooksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesHooksRequest>;

export type PatchProjectsLocationsRepositoriesHooksResponse = Operation;
export const PatchProjectsLocationsRepositoriesHooksResponse = Operation;

export type PatchProjectsLocationsRepositoriesHooksError = CommonErrors;

export const patchProjectsLocationsRepositoriesHooks: API.OperationMethod<PatchProjectsLocationsRepositoriesHooksRequest, PatchProjectsLocationsRepositoriesHooksResponse, PatchProjectsLocationsRepositoriesHooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesHooksRequest,
  output: PatchProjectsLocationsRepositoriesHooksResponse,
  errors: [],
}));

/** Deletes a Hook. */
export interface DeleteProjectsLocationsRepositoriesHooksRequest {
  /** Required. Name of the hook to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}`. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesHooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/hooks/{hooksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesHooksRequest>;

export type DeleteProjectsLocationsRepositoriesHooksResponse = Operation;
export const DeleteProjectsLocationsRepositoriesHooksResponse = Operation;

export type DeleteProjectsLocationsRepositoriesHooksError = CommonErrors;

export const deleteProjectsLocationsRepositoriesHooks: API.OperationMethod<DeleteProjectsLocationsRepositoriesHooksRequest, DeleteProjectsLocationsRepositoriesHooksResponse, DeleteProjectsLocationsRepositoriesHooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesHooksRequest,
  output: DeleteProjectsLocationsRepositoriesHooksResponse,
  errors: [],
}));

/** CreateBranchRule creates a branch rule in a given repository. */
export interface CreateProjectsLocationsRepositoriesBranchRulesRequest {
  parent: string;
  branchRuleId?: string;
  /** Request body */
  body?: BranchRule;
}

export const CreateProjectsLocationsRepositoriesBranchRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  branchRuleId: Schema.optional(Schema.String).pipe(T.HttpQuery("branchRuleId")),
  body: Schema.optional(BranchRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/branchRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesBranchRulesRequest>;

export type CreateProjectsLocationsRepositoriesBranchRulesResponse = Operation;
export const CreateProjectsLocationsRepositoriesBranchRulesResponse = Operation;

export type CreateProjectsLocationsRepositoriesBranchRulesError = CommonErrors;

export const createProjectsLocationsRepositoriesBranchRules: API.OperationMethod<CreateProjectsLocationsRepositoriesBranchRulesRequest, CreateProjectsLocationsRepositoriesBranchRulesResponse, CreateProjectsLocationsRepositoriesBranchRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesBranchRulesRequest,
  output: CreateProjectsLocationsRepositoriesBranchRulesResponse,
  errors: [],
}));

/** ListBranchRules lists branch rules in a given repository. */
export interface ListProjectsLocationsRepositoriesBranchRulesRequest {
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesBranchRulesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/branchRules" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesBranchRulesRequest>;

export type ListProjectsLocationsRepositoriesBranchRulesResponse = ListBranchRulesResponse;
export const ListProjectsLocationsRepositoriesBranchRulesResponse = ListBranchRulesResponse;

export type ListProjectsLocationsRepositoriesBranchRulesError = CommonErrors;

export const listProjectsLocationsRepositoriesBranchRules = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesBranchRulesRequest,
  output: ListProjectsLocationsRepositoriesBranchRulesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** GetBranchRule gets a branch rule. */
export interface GetProjectsLocationsRepositoriesBranchRulesRequest {
  /** Required. Name of the repository to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesBranchRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/branchRules/{branchRulesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesBranchRulesRequest>;

export type GetProjectsLocationsRepositoriesBranchRulesResponse = BranchRule;
export const GetProjectsLocationsRepositoriesBranchRulesResponse = BranchRule;

export type GetProjectsLocationsRepositoriesBranchRulesError = CommonErrors;

export const getProjectsLocationsRepositoriesBranchRules: API.OperationMethod<GetProjectsLocationsRepositoriesBranchRulesRequest, GetProjectsLocationsRepositoriesBranchRulesResponse, GetProjectsLocationsRepositoriesBranchRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesBranchRulesRequest,
  output: GetProjectsLocationsRepositoriesBranchRulesResponse,
  errors: [],
}));

/** UpdateBranchRule updates a branch rule. */
export interface PatchProjectsLocationsRepositoriesBranchRulesRequest {
  /** Identifier. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}` */
  name: string;
  /** Optional. If set, validate the request and preview the review, but do not actually post it. (https://google.aip.dev/163, for declarative friendly) */
  validateOnly?: boolean;
  /** Optional. Field mask is used to specify the fields to be overwritten in the branchRule resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "*" means full replacement. */
  updateMask?: string;
  /** Request body */
  body?: BranchRule;
}

export const PatchProjectsLocationsRepositoriesBranchRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(BranchRule).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/branchRules/{branchRulesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesBranchRulesRequest>;

export type PatchProjectsLocationsRepositoriesBranchRulesResponse = Operation;
export const PatchProjectsLocationsRepositoriesBranchRulesResponse = Operation;

export type PatchProjectsLocationsRepositoriesBranchRulesError = CommonErrors;

export const patchProjectsLocationsRepositoriesBranchRules: API.OperationMethod<PatchProjectsLocationsRepositoriesBranchRulesRequest, PatchProjectsLocationsRepositoriesBranchRulesResponse, PatchProjectsLocationsRepositoriesBranchRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesBranchRulesRequest,
  output: PatchProjectsLocationsRepositoriesBranchRulesResponse,
  errors: [],
}));

/** DeleteBranchRule deletes a branch rule. */
export interface DeleteProjectsLocationsRepositoriesBranchRulesRequest {
  name: string;
  /** Optional. If set to true, and the branch rule is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsRepositoriesBranchRulesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/branchRules/{branchRulesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesBranchRulesRequest>;

export type DeleteProjectsLocationsRepositoriesBranchRulesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesBranchRulesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesBranchRulesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesBranchRules: API.OperationMethod<DeleteProjectsLocationsRepositoriesBranchRulesRequest, DeleteProjectsLocationsRepositoriesBranchRulesResponse, DeleteProjectsLocationsRepositoriesBranchRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesBranchRulesRequest,
  output: DeleteProjectsLocationsRepositoriesBranchRulesResponse,
  errors: [],
}));

/** Creates a pull request. */
export interface CreateProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The repository that the pull request is created from. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` */
  parent: string;
  /** Request body */
  body?: PullRequest;
}

export const CreateProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PullRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesPullRequestsRequest>;

export type CreateProjectsLocationsRepositoriesPullRequestsResponse = Operation;
export const CreateProjectsLocationsRepositoriesPullRequestsResponse = Operation;

export type CreateProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const createProjectsLocationsRepositoriesPullRequests: API.OperationMethod<CreateProjectsLocationsRepositoriesPullRequestsRequest, CreateProjectsLocationsRepositoriesPullRequestsResponse, CreateProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesPullRequestsRequest,
  output: CreateProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Gets a pull request. */
export interface GetProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. Name of the pull request to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPullRequestsRequest>;

export type GetProjectsLocationsRepositoriesPullRequestsResponse = PullRequest;
export const GetProjectsLocationsRepositoriesPullRequestsResponse = PullRequest;

export type GetProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const getProjectsLocationsRepositoriesPullRequests: API.OperationMethod<GetProjectsLocationsRepositoriesPullRequestsRequest, GetProjectsLocationsRepositoriesPullRequestsResponse, GetProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPullRequestsRequest,
  output: GetProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Lists pull requests in a repository. */
export interface ListProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The repository in which to list pull requests. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPullRequestsRequest>;

export type ListProjectsLocationsRepositoriesPullRequestsResponse = ListPullRequestsResponse;
export const ListProjectsLocationsRepositoriesPullRequestsResponse = ListPullRequestsResponse;

export type ListProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const listProjectsLocationsRepositoriesPullRequests = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPullRequestsRequest,
  output: ListProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a pull request. */
export interface PatchProjectsLocationsRepositoriesPullRequestsRequest {
  /** Output only. Identifier. A unique identifier for a PullRequest. The number appended at the end is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the pull request resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "*" means full replacement. */
  updateMask?: string;
  /** Request body */
  body?: PullRequest;
}

export const PatchProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PullRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPullRequestsRequest>;

export type PatchProjectsLocationsRepositoriesPullRequestsResponse = Operation;
export const PatchProjectsLocationsRepositoriesPullRequestsResponse = Operation;

export type PatchProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const patchProjectsLocationsRepositoriesPullRequests: API.OperationMethod<PatchProjectsLocationsRepositoriesPullRequestsRequest, PatchProjectsLocationsRepositoriesPullRequestsResponse, PatchProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPullRequestsRequest,
  output: PatchProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Merges a pull request. */
export interface MergeProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The pull request to merge. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  name: string;
  /** Request body */
  body?: MergePullRequestRequest;
}

export const MergeProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(MergePullRequestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}:merge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MergeProjectsLocationsRepositoriesPullRequestsRequest>;

export type MergeProjectsLocationsRepositoriesPullRequestsResponse = Operation;
export const MergeProjectsLocationsRepositoriesPullRequestsResponse = Operation;

export type MergeProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const mergeProjectsLocationsRepositoriesPullRequests: API.OperationMethod<MergeProjectsLocationsRepositoriesPullRequestsRequest, MergeProjectsLocationsRepositoriesPullRequestsResponse, MergeProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MergeProjectsLocationsRepositoriesPullRequestsRequest,
  output: MergeProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Opens a pull request. */
export interface OpenProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The pull request to open. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  name: string;
  /** Request body */
  body?: OpenPullRequestRequest;
}

export const OpenProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(OpenPullRequestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}:open", hasBody: true }),
  svc,
) as unknown as Schema.Schema<OpenProjectsLocationsRepositoriesPullRequestsRequest>;

export type OpenProjectsLocationsRepositoriesPullRequestsResponse = Operation;
export const OpenProjectsLocationsRepositoriesPullRequestsResponse = Operation;

export type OpenProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const openProjectsLocationsRepositoriesPullRequests: API.OperationMethod<OpenProjectsLocationsRepositoriesPullRequestsRequest, OpenProjectsLocationsRepositoriesPullRequestsResponse, OpenProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: OpenProjectsLocationsRepositoriesPullRequestsRequest,
  output: OpenProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Closes a pull request without merging. */
export interface CloseProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The pull request to close. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  name: string;
  /** Request body */
  body?: ClosePullRequestRequest;
}

export const CloseProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ClosePullRequestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}:close", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloseProjectsLocationsRepositoriesPullRequestsRequest>;

export type CloseProjectsLocationsRepositoriesPullRequestsResponse = Operation;
export const CloseProjectsLocationsRepositoriesPullRequestsResponse = Operation;

export type CloseProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const closeProjectsLocationsRepositoriesPullRequests: API.OperationMethod<CloseProjectsLocationsRepositoriesPullRequestsRequest, CloseProjectsLocationsRepositoriesPullRequestsResponse, CloseProjectsLocationsRepositoriesPullRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloseProjectsLocationsRepositoriesPullRequestsRequest,
  output: CloseProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
}));

/** Lists a pull request's file diffs. */
export interface ListFileDiffsProjectsLocationsRepositoriesPullRequestsRequest {
  /** Required. The pull request to list file diffs for. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  name: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListFileDiffsProjectsLocationsRepositoriesPullRequestsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}:listFileDiffs" }),
  svc,
) as unknown as Schema.Schema<ListFileDiffsProjectsLocationsRepositoriesPullRequestsRequest>;

export type ListFileDiffsProjectsLocationsRepositoriesPullRequestsResponse = ListPullRequestFileDiffsResponse;
export const ListFileDiffsProjectsLocationsRepositoriesPullRequestsResponse = ListPullRequestFileDiffsResponse;

export type ListFileDiffsProjectsLocationsRepositoriesPullRequestsError = CommonErrors;

export const listFileDiffsProjectsLocationsRepositoriesPullRequests = API.makePaginated(() => ({
  input: ListFileDiffsProjectsLocationsRepositoriesPullRequestsRequest,
  output: ListFileDiffsProjectsLocationsRepositoriesPullRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a pull request comment. */
export interface GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. Name of the pull request comment to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments/{pullRequestCommentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = PullRequestComment;
export const GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = PullRequestComment;

export type GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const getProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: GetProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Lists pull request comments. */
export interface ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. The pull request in which to list pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = ListPullRequestCommentsResponse;
export const ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = ListPullRequestCommentsResponse;

export type ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const listProjectsLocationsRepositoriesPullRequestsPullRequestComments = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: ListProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a pull request comment. This function is used to create a single PullRequestComment of type Comment, or a single PullRequestComment of type Code that's replying to another PullRequestComment of type Code. Use BatchCreatePullRequestComments to create multiple PullRequestComments for code reviews. */
export interface CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. The pull request in which to create the pull request comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent: string;
  /** Request body */
  body?: PullRequestComment;
}

export const CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PullRequestComment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const createProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: CreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Updates a pull request comment. */
export interface PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Identifier. Unique identifier for the pull request comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}/pullRequestComments/{comment_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the pull request comment resource by the update. Updatable fields are `body`. */
  updateMask?: string;
  /** Request body */
  body?: PullRequestComment;
}

export const PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(PullRequestComment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments/{pullRequestCommentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const patchProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: PatchProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Deletes a pull request comment. */
export interface DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. Name of the pull request comment to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}`. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments/{pullRequestCommentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: DeleteProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Batch creates pull request comments. This function is used to create multiple PullRequestComments for code review. There needs to be exactly one PullRequestComment of type Review, and at most 100 PullRequestComments of type Code per request. The Position of the code comments must be unique within the request. */
export interface BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. The pull request in which to create the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent: string;
  /** Request body */
  body?: BatchCreatePullRequestCommentsRequest;
}

export const BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreatePullRequestCommentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const batchCreateProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: BatchCreateProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Resolves pull request comments. A list of PullRequestComment names must be provided. The PullRequestComment names must be in the same conversation thread. If auto_fill is set, all comments in the conversation thread will be resolved. */
export interface ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. The pull request in which to resolve the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent: string;
  /** Request body */
  body?: ResolvePullRequestCommentsRequest;
}

export const ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ResolvePullRequestCommentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments:resolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const resolveProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: ResolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Unresolves pull request comments. A list of PullRequestComment names must be provided. The PullRequestComment names must be in the same conversation thread. If auto_fill is set, all comments in the conversation thread will be unresolved. */
export interface UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest {
  /** Required. The pull request in which to resolve the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` */
  parent: string;
  /** Request body */
  body?: UnresolvePullRequestCommentsRequest;
}

export const UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UnresolvePullRequestCommentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/pullRequests/{pullRequestsId}/pullRequestComments:unresolve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest>;

export type UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;
export const UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse = Operation;

export type UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError = CommonErrors;

export const unresolveProjectsLocationsRepositoriesPullRequestsPullRequestComments: API.OperationMethod<UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest, UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse, UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsRequest,
  output: UnresolveProjectsLocationsRepositoriesPullRequestsPullRequestCommentsResponse,
  errors: [],
}));

/** Creates an issue. */
export interface CreateProjectsLocationsRepositoriesIssuesRequest {
  /** Required. The repository in which to create the issue. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` */
  parent: string;
  /** Request body */
  body?: Issue;
}

export const CreateProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Issue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesIssuesRequest>;

export type CreateProjectsLocationsRepositoriesIssuesResponse = Operation;
export const CreateProjectsLocationsRepositoriesIssuesResponse = Operation;

export type CreateProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const createProjectsLocationsRepositoriesIssues: API.OperationMethod<CreateProjectsLocationsRepositoriesIssuesRequest, CreateProjectsLocationsRepositoriesIssuesResponse, CreateProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesIssuesRequest,
  output: CreateProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Gets an issue. */
export interface GetProjectsLocationsRepositoriesIssuesRequest {
  /** Required. Name of the issue to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesIssuesRequest>;

export type GetProjectsLocationsRepositoriesIssuesResponse = Issue;
export const GetProjectsLocationsRepositoriesIssuesResponse = Issue;

export type GetProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const getProjectsLocationsRepositoriesIssues: API.OperationMethod<GetProjectsLocationsRepositoriesIssuesRequest, GetProjectsLocationsRepositoriesIssuesResponse, GetProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesIssuesRequest,
  output: GetProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Lists issues in a repository. */
export interface ListProjectsLocationsRepositoriesIssuesRequest {
  /** Required. The repository in which to list issues. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Used to filter the resulting issues list. */
  filter?: string;
}

export const ListProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesIssuesRequest>;

export type ListProjectsLocationsRepositoriesIssuesResponse = ListIssuesResponse;
export const ListProjectsLocationsRepositoriesIssuesResponse = ListIssuesResponse;

export type ListProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const listProjectsLocationsRepositoriesIssues = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesIssuesRequest,
  output: ListProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a issue. */
export interface PatchProjectsLocationsRepositoriesIssuesRequest {
  /** Identifier. Unique identifier for an issue. The issue id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the issue resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "*" means full replacement. */
  updateMask?: string;
  /** Request body */
  body?: Issue;
}

export const PatchProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Issue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesIssuesRequest>;

export type PatchProjectsLocationsRepositoriesIssuesResponse = Operation;
export const PatchProjectsLocationsRepositoriesIssuesResponse = Operation;

export type PatchProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const patchProjectsLocationsRepositoriesIssues: API.OperationMethod<PatchProjectsLocationsRepositoriesIssuesRequest, PatchProjectsLocationsRepositoriesIssuesResponse, PatchProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesIssuesRequest,
  output: PatchProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Deletes an issue. */
export interface DeleteProjectsLocationsRepositoriesIssuesRequest {
  /** Required. Name of the issue to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. */
  name: string;
  /** Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesIssuesRequest>;

export type DeleteProjectsLocationsRepositoriesIssuesResponse = Operation;
export const DeleteProjectsLocationsRepositoriesIssuesResponse = Operation;

export type DeleteProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const deleteProjectsLocationsRepositoriesIssues: API.OperationMethod<DeleteProjectsLocationsRepositoriesIssuesRequest, DeleteProjectsLocationsRepositoriesIssuesResponse, DeleteProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesIssuesRequest,
  output: DeleteProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Opens an issue. */
export interface OpenProjectsLocationsRepositoriesIssuesRequest {
  /** Required. Name of the issue to open. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. */
  name: string;
  /** Request body */
  body?: OpenIssueRequest;
}

export const OpenProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(OpenIssueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}:open", hasBody: true }),
  svc,
) as unknown as Schema.Schema<OpenProjectsLocationsRepositoriesIssuesRequest>;

export type OpenProjectsLocationsRepositoriesIssuesResponse = Operation;
export const OpenProjectsLocationsRepositoriesIssuesResponse = Operation;

export type OpenProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const openProjectsLocationsRepositoriesIssues: API.OperationMethod<OpenProjectsLocationsRepositoriesIssuesRequest, OpenProjectsLocationsRepositoriesIssuesResponse, OpenProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: OpenProjectsLocationsRepositoriesIssuesRequest,
  output: OpenProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Closes an issue. */
export interface CloseProjectsLocationsRepositoriesIssuesRequest {
  /** Required. Name of the issue to close. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. */
  name: string;
  /** Request body */
  body?: CloseIssueRequest;
}

export const CloseProjectsLocationsRepositoriesIssuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CloseIssueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}:close", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CloseProjectsLocationsRepositoriesIssuesRequest>;

export type CloseProjectsLocationsRepositoriesIssuesResponse = Operation;
export const CloseProjectsLocationsRepositoriesIssuesResponse = Operation;

export type CloseProjectsLocationsRepositoriesIssuesError = CommonErrors;

export const closeProjectsLocationsRepositoriesIssues: API.OperationMethod<CloseProjectsLocationsRepositoriesIssuesRequest, CloseProjectsLocationsRepositoriesIssuesResponse, CloseProjectsLocationsRepositoriesIssuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CloseProjectsLocationsRepositoriesIssuesRequest,
  output: CloseProjectsLocationsRepositoriesIssuesResponse,
  errors: [],
}));

/** Creates an issue comment. */
export interface CreateProjectsLocationsRepositoriesIssuesIssueCommentsRequest {
  /** Required. The issue in which to create the issue comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}` */
  parent: string;
  /** Request body */
  body?: IssueComment;
}

export const CreateProjectsLocationsRepositoriesIssuesIssueCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(IssueComment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}/issueComments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsRepositoriesIssuesIssueCommentsRequest>;

export type CreateProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;
export const CreateProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;

export type CreateProjectsLocationsRepositoriesIssuesIssueCommentsError = CommonErrors;

export const createProjectsLocationsRepositoriesIssuesIssueComments: API.OperationMethod<CreateProjectsLocationsRepositoriesIssuesIssueCommentsRequest, CreateProjectsLocationsRepositoriesIssuesIssueCommentsResponse, CreateProjectsLocationsRepositoriesIssuesIssueCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsRepositoriesIssuesIssueCommentsRequest,
  output: CreateProjectsLocationsRepositoriesIssuesIssueCommentsResponse,
  errors: [],
}));

/** Gets an issue comment. */
export interface GetProjectsLocationsRepositoriesIssuesIssueCommentsRequest {
  /** Required. Name of the issue comment to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}/issueComments/{comment_id}`. */
  name: string;
}

export const GetProjectsLocationsRepositoriesIssuesIssueCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}/issueComments/{issueCommentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRepositoriesIssuesIssueCommentsRequest>;

export type GetProjectsLocationsRepositoriesIssuesIssueCommentsResponse = IssueComment;
export const GetProjectsLocationsRepositoriesIssuesIssueCommentsResponse = IssueComment;

export type GetProjectsLocationsRepositoriesIssuesIssueCommentsError = CommonErrors;

export const getProjectsLocationsRepositoriesIssuesIssueComments: API.OperationMethod<GetProjectsLocationsRepositoriesIssuesIssueCommentsRequest, GetProjectsLocationsRepositoriesIssuesIssueCommentsResponse, GetProjectsLocationsRepositoriesIssuesIssueCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRepositoriesIssuesIssueCommentsRequest,
  output: GetProjectsLocationsRepositoriesIssuesIssueCommentsResponse,
  errors: [],
}));

/** Lists comments in an issue. */
export interface ListProjectsLocationsRepositoriesIssuesIssueCommentsRequest {
  /** Required. The issue in which to list the comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}` */
  parent: string;
  /** Optional. Requested page size. If unspecified, a default size of 30 will be used. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsRepositoriesIssuesIssueCommentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}/issueComments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRepositoriesIssuesIssueCommentsRequest>;

export type ListProjectsLocationsRepositoriesIssuesIssueCommentsResponse = ListIssueCommentsResponse;
export const ListProjectsLocationsRepositoriesIssuesIssueCommentsResponse = ListIssueCommentsResponse;

export type ListProjectsLocationsRepositoriesIssuesIssueCommentsError = CommonErrors;

export const listProjectsLocationsRepositoriesIssuesIssueComments = API.makePaginated(() => ({
  input: ListProjectsLocationsRepositoriesIssuesIssueCommentsRequest,
  output: ListProjectsLocationsRepositoriesIssuesIssueCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates an issue comment. */
export interface PatchProjectsLocationsRepositoriesIssuesIssueCommentsRequest {
  /** Identifier. Unique identifier for an issue comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue}/issueComments/{comment_id}` */
  name: string;
  /** Optional. Field mask is used to specify the fields to be overwritten in the issue comment resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "*" means full replacement. */
  updateMask?: string;
  /** Request body */
  body?: IssueComment;
}

export const PatchProjectsLocationsRepositoriesIssuesIssueCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(IssueComment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}/issueComments/{issueCommentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsRepositoriesIssuesIssueCommentsRequest>;

export type PatchProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;
export const PatchProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;

export type PatchProjectsLocationsRepositoriesIssuesIssueCommentsError = CommonErrors;

export const patchProjectsLocationsRepositoriesIssuesIssueComments: API.OperationMethod<PatchProjectsLocationsRepositoriesIssuesIssueCommentsRequest, PatchProjectsLocationsRepositoriesIssuesIssueCommentsResponse, PatchProjectsLocationsRepositoriesIssuesIssueCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsRepositoriesIssuesIssueCommentsRequest,
  output: PatchProjectsLocationsRepositoriesIssuesIssueCommentsResponse,
  errors: [],
}));

/** Deletes an issue comment. */
export interface DeleteProjectsLocationsRepositoriesIssuesIssueCommentsRequest {
  /** Required. Name of the issue comment to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}/issueComments/{comment_id}`. */
  name: string;
}

export const DeleteProjectsLocationsRepositoriesIssuesIssueCommentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/issues/{issuesId}/issueComments/{issueCommentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsRepositoriesIssuesIssueCommentsRequest>;

export type DeleteProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;
export const DeleteProjectsLocationsRepositoriesIssuesIssueCommentsResponse = Operation;

export type DeleteProjectsLocationsRepositoriesIssuesIssueCommentsError = CommonErrors;

export const deleteProjectsLocationsRepositoriesIssuesIssueComments: API.OperationMethod<DeleteProjectsLocationsRepositoriesIssuesIssueCommentsRequest, DeleteProjectsLocationsRepositoriesIssuesIssueCommentsResponse, DeleteProjectsLocationsRepositoriesIssuesIssueCommentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsRepositoriesIssuesIssueCommentsRequest,
  output: DeleteProjectsLocationsRepositoriesIssuesIssueCommentsResponse,
  errors: [],
}));

