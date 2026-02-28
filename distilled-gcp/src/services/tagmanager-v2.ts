// ==========================================================================
// Tag Manager API (tagmanager v2)
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
  name: "tagmanager",
  version: "v2",
  rootUrl: "https://tagmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AccountFeatures {
  /** Whether this Account supports user permissions managed by GTM. */
  supportUserPermissions?: boolean;
  /** Whether this Account supports multiple Containers. */
  supportMultipleContainers?: boolean;
}

export const AccountFeatures: Schema.Schema<AccountFeatures> = Schema.suspend(() => Schema.Struct({
  supportUserPermissions: Schema.optional(Schema.Boolean),
  supportMultipleContainers: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AccountFeatures" }) as any as Schema.Schema<AccountFeatures>;

export interface Account {
  /** GTM Account's API relative path. */
  path?: string;
  /** The Account ID uniquely identifies the GTM Account. */
  accountId?: string;
  /** Account display name. */
  name?: string;
  /** Whether the account shares data anonymously with Google and others. This flag enables benchmarking by sharing your data in an anonymous form. Google will remove all identifiable information about your website, combine the data with hundreds of other anonymous sites and report aggregate trends in the benchmarking service. */
  shareData?: boolean;
  /** The fingerprint of the GTM Account as computed at storage time. This value is recomputed whenever the account is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** Read-only Account feature set */
  features?: AccountFeatures;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  shareData: Schema.optional(Schema.Boolean),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  features: Schema.optional(AccountFeatures),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListAccountsResponse {
  /** List of GTM Accounts that a user has access to. */
  account?: Array<Account>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Schema.Array(Account)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccountsResponse" }) as any as Schema.Schema<ListAccountsResponse>;

export interface AccountAccess {
  /** Whether the user has no access, user access, or admin access to an account. */
  permission?: "accountPermissionUnspecified" | "noAccess" | "user" | "admin" | (string & {});
}

export const AccountAccess: Schema.Schema<AccountAccess> = Schema.suspend(() => Schema.Struct({
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountAccess" }) as any as Schema.Schema<AccountAccess>;

export interface ContainerAccess {
  /** GTM Container ID. */
  containerId?: string;
  /** List of Container permissions. */
  permission?: "containerPermissionUnspecified" | "noAccess" | "read" | "edit" | "approve" | "publish" | (string & {});
}

export const ContainerAccess: Schema.Schema<ContainerAccess> = Schema.suspend(() => Schema.Struct({
  containerId: Schema.optional(Schema.String),
  permission: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerAccess" }) as any as Schema.Schema<ContainerAccess>;

export interface UserPermission {
  /** GTM UserPermission's API relative path. */
  path?: string;
  /** The Account ID uniquely identifies the GTM Account. */
  accountId?: string;
  /** User's email address. */
  emailAddress?: string;
  /** GTM Account access permissions. */
  accountAccess?: AccountAccess;
  /** GTM Container access permissions. */
  containerAccess?: Array<ContainerAccess>;
}

export const UserPermission: Schema.Schema<UserPermission> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  emailAddress: Schema.optional(Schema.String),
  accountAccess: Schema.optional(AccountAccess),
  containerAccess: Schema.optional(Schema.Array(ContainerAccess)),
})).annotate({ identifier: "UserPermission" }) as any as Schema.Schema<UserPermission>;

export interface ListUserPermissionsResponse {
  /** All GTM UserPermissions of a GTM Account. */
  userPermission?: Array<UserPermission>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListUserPermissionsResponse: Schema.Schema<ListUserPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  userPermission: Schema.optional(Schema.Array(UserPermission)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListUserPermissionsResponse" }) as any as Schema.Schema<ListUserPermissionsResponse>;

export interface ContainerFeatures {
  /** Whether this Container supports user permissions managed by GTM. */
  supportUserPermissions?: boolean;
  /** Whether this Container supports environments. */
  supportEnvironments?: boolean;
  /** Whether this Container supports workspaces. */
  supportWorkspaces?: boolean;
  /** Whether this Container supports Google tag config. */
  supportGtagConfigs?: boolean;
  /** Whether this Container supports built-in variables */
  supportBuiltInVariables?: boolean;
  /** Whether this Container supports clients. */
  supportClients?: boolean;
  /** Whether this Container supports folders. */
  supportFolders?: boolean;
  /** Whether this Container supports tags. */
  supportTags?: boolean;
  /** Whether this Container supports templates. */
  supportTemplates?: boolean;
  /** Whether this Container supports triggers. */
  supportTriggers?: boolean;
  /** Whether this Container supports variables. */
  supportVariables?: boolean;
  /** Whether this Container supports Container versions. */
  supportVersions?: boolean;
  /** Whether this Container supports zones. */
  supportZones?: boolean;
  /** Whether this Container supports transformations. */
  supportTransformations?: boolean;
}

export const ContainerFeatures: Schema.Schema<ContainerFeatures> = Schema.suspend(() => Schema.Struct({
  supportUserPermissions: Schema.optional(Schema.Boolean),
  supportEnvironments: Schema.optional(Schema.Boolean),
  supportWorkspaces: Schema.optional(Schema.Boolean),
  supportGtagConfigs: Schema.optional(Schema.Boolean),
  supportBuiltInVariables: Schema.optional(Schema.Boolean),
  supportClients: Schema.optional(Schema.Boolean),
  supportFolders: Schema.optional(Schema.Boolean),
  supportTags: Schema.optional(Schema.Boolean),
  supportTemplates: Schema.optional(Schema.Boolean),
  supportTriggers: Schema.optional(Schema.Boolean),
  supportVariables: Schema.optional(Schema.Boolean),
  supportVersions: Schema.optional(Schema.Boolean),
  supportZones: Schema.optional(Schema.Boolean),
  supportTransformations: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContainerFeatures" }) as any as Schema.Schema<ContainerFeatures>;

export interface Container {
  /** GTM Container's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** The Container ID uniquely identifies the GTM Container. */
  containerId?: string;
  /** Container display name. */
  name?: string;
  /** List of domain names associated with the Container. */
  domainName?: Array<string>;
  /** Container Public ID. */
  publicId?: string;
  /** All Tag IDs that refer to this Container. */
  tagIds?: Array<string>;
  /** Read-only Container feature set. */
  features?: ContainerFeatures;
  /** Container Notes. */
  notes?: string;
  /** List of Usage Contexts for the Container. Valid values include: web, android, or ios. */
  usageContext?: Array<"usageContextUnspecified" | "web" | "android" | "ios" | "androidSdk5" | "iosSdk5" | "amp" | "server" | (string & {})>;
  /** The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match. */
  taggingServerUrls?: Array<string>;
}

export const Container: Schema.Schema<Container> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  domainName: Schema.optional(Schema.Array(Schema.String)),
  publicId: Schema.optional(Schema.String),
  tagIds: Schema.optional(Schema.Array(Schema.String)),
  features: Schema.optional(ContainerFeatures),
  notes: Schema.optional(Schema.String),
  usageContext: Schema.optional(Schema.Array(Schema.String)),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  taggingServerUrls: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Container" }) as any as Schema.Schema<Container>;

export interface ListContainersResponse {
  /** All Containers of a GTM Account. */
  container?: Array<Container>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListContainersResponse: Schema.Schema<ListContainersResponse> = Schema.suspend(() => Schema.Struct({
  container: Schema.optional(Schema.Array(Container)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListContainersResponse" }) as any as Schema.Schema<ListContainersResponse>;

export interface GetContainerSnippetResponse {
  /** Tagging snippet for a Container. */
  snippet?: string;
  /** Server container config param for manually provisioning a tagging server. */
  containerConfig?: string;
}

export const GetContainerSnippetResponse: Schema.Schema<GetContainerSnippetResponse> = Schema.suspend(() => Schema.Struct({
  snippet: Schema.optional(Schema.String),
  containerConfig: Schema.optional(Schema.String),
})).annotate({ identifier: "GetContainerSnippetResponse" }) as any as Schema.Schema<GetContainerSnippetResponse>;

export interface Destination {
  /** Destination's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The Destination link ID uniquely identifies the Destination. */
  destinationLinkId?: string;
  /** Destination ID. */
  destinationId?: string;
  /** Destination display name. */
  name?: string;
  /** The fingerprint of the Google Tag Destination as computed at storage time. This value is recomputed whenever the destination is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI. */
  tagManagerUrl?: string;
}

export const Destination: Schema.Schema<Destination> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  destinationLinkId: Schema.optional(Schema.String),
  destinationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Destination" }) as any as Schema.Schema<Destination>;

export interface ListDestinationsResponse {
  /** All Destinations linked to a GTM Container. */
  destination?: Array<Destination>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListDestinationsResponse: Schema.Schema<ListDestinationsResponse> = Schema.suspend(() => Schema.Struct({
  destination: Schema.optional(Schema.Array(Destination)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDestinationsResponse" }) as any as Schema.Schema<ListDestinationsResponse>;

export interface Workspace {
  /** GTM Workspace's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The Workspace ID uniquely identifies the GTM Workspace. */
  workspaceId?: string;
  /** Workspace display name. */
  name?: string;
  /** Workspace description. */
  description?: string;
  /** The fingerprint of the GTM Workspace as computed at storage time. This value is recomputed whenever the workspace is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
}

export const Workspace: Schema.Schema<Workspace> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Workspace" }) as any as Schema.Schema<Workspace>;

export interface ListWorkspacesResponse {
  /** All Workspaces of a GTM Container. */
  workspace?: Array<Workspace>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListWorkspacesResponse: Schema.Schema<ListWorkspacesResponse> = Schema.suspend(() => Schema.Struct({
  workspace: Schema.optional(Schema.Array(Workspace)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListWorkspacesResponse" }) as any as Schema.Schema<ListWorkspacesResponse>;

export interface SyncStatus {
  /** Synchornization operation detected a merge conflict. */
  mergeConflict?: boolean;
  /** An error occurred during the synchronization operation. */
  syncError?: boolean;
}

export const SyncStatus: Schema.Schema<SyncStatus> = Schema.suspend(() => Schema.Struct({
  mergeConflict: Schema.optional(Schema.Boolean),
  syncError: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SyncStatus" }) as any as Schema.Schema<SyncStatus>;

export interface Parameter {
  /** The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name */
  type?: "typeUnspecified" | "template" | "integer" | "boolean" | "list" | "map" | "triggerReference" | "tagReference" | (string & {});
  /** The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values. */
  key?: string;
  /** A parameter's value (may contain variable references). as appropriate to the specified type. */
  value?: string;
  /** This list parameter's parameters (keys will be ignored). */
  list?: Array<Parameter>;
  /** This map parameter's parameters (must have keys; keys must be unique). */
  map?: Array<Parameter>;
  /** Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations. */
  isWeakReference?: boolean;
}

export const Parameter: Schema.Schema<Parameter> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  list: Schema.optional(Schema.Array(Parameter)),
  map: Schema.optional(Schema.Array(Parameter)),
  isWeakReference: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Parameter" }) as any as Schema.Schema<Parameter>;

export interface SetupTag {
  /** The name of the setup tag. */
  tagName?: string;
  /** If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status. */
  stopOnSetupFailure?: boolean;
}

export const SetupTag: Schema.Schema<SetupTag> = Schema.suspend(() => Schema.Struct({
  tagName: Schema.optional(Schema.String),
  stopOnSetupFailure: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SetupTag" }) as any as Schema.Schema<SetupTag>;

export interface TeardownTag {
  /** The name of the teardown tag. */
  tagName?: string;
  /** If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status. */
  stopTeardownOnFailure?: boolean;
}

export const TeardownTag: Schema.Schema<TeardownTag> = Schema.suspend(() => Schema.Struct({
  tagName: Schema.optional(Schema.String),
  stopTeardownOnFailure: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TeardownTag" }) as any as Schema.Schema<TeardownTag>;

export interface TagConsentSetting {
  /** The tag's consent status. If set to NEEDED, the runtime will check that the consent types specified by the consent_type field have been granted. */
  consentStatus?: "notSet" | "notNeeded" | "needed" | (string & {});
  /** The type of consents to check for during tag firing if in the consent NEEDED state. This parameter must be of type LIST where each list item is of type STRING. */
  consentType?: Parameter;
}

export const TagConsentSetting: Schema.Schema<TagConsentSetting> = Schema.suspend(() => Schema.Struct({
  consentStatus: Schema.optional(Schema.String),
  consentType: Schema.optional(Parameter),
})).annotate({ identifier: "TagConsentSetting" }) as any as Schema.Schema<TagConsentSetting>;

export interface Tag {
  /** GTM Tag's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Tag ID uniquely identifies the GTM Tag. */
  tagId?: string;
  /** Tag display name. */
  name?: string;
  /** GTM Tag Type. */
  type?: string;
  /** If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode). */
  liveOnly?: boolean;
  /** User defined numeric priority of the tag. Tags are fired asynchronously in order of priority. Tags with higher numeric value fire first. A tag's priority can be a positive or negative value. The default value is 0. */
  priority?: Parameter;
  /** User notes on how to apply this tag in the container. */
  notes?: string;
  /** The start timestamp in milliseconds to schedule a tag. */
  scheduleStartMs?: string;
  /** The end timestamp in milliseconds to schedule a tag. */
  scheduleEndMs?: string;
  /** The tag's parameters. */
  parameter?: Array<Parameter>;
  /** The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified. */
  fingerprint?: string;
  /** Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false. */
  firingTriggerId?: Array<string>;
  /** Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire. */
  blockingTriggerId?: Array<string>;
  /** The list of setup tags. Currently we only allow one. */
  setupTag?: Array<SetupTag>;
  /** The list of teardown tags. Currently we only allow one. */
  teardownTag?: Array<TeardownTag>;
  /** Parent folder id. */
  parentFolderId?: string;
  /** Option to fire this tag. */
  tagFiringOption?: "tagFiringOptionUnspecified" | "unlimited" | "oncePerEvent" | "oncePerLoad" | (string & {});
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** Indicates whether the tag is paused, which prevents the tag from firing. */
  paused?: boolean;
  /** A map of key-value pairs of tag metadata to be included in the event data for tag monitoring. Notes: - This parameter must be type MAP. - Each parameter in the map are type TEMPLATE, however cannot contain variable references. */
  monitoringMetadata?: Parameter;
  /** If non-empty, then the tag display name will be included in the monitoring metadata map using the key specified. */
  monitoringMetadataTagNameKey?: string;
  /** Consent settings of a tag. */
  consentSettings?: TagConsentSetting;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  tagId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  liveOnly: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Parameter),
  notes: Schema.optional(Schema.String),
  scheduleStartMs: Schema.optional(Schema.String),
  scheduleEndMs: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
  fingerprint: Schema.optional(Schema.String),
  firingTriggerId: Schema.optional(Schema.Array(Schema.String)),
  blockingTriggerId: Schema.optional(Schema.Array(Schema.String)),
  setupTag: Schema.optional(Schema.Array(SetupTag)),
  teardownTag: Schema.optional(Schema.Array(TeardownTag)),
  parentFolderId: Schema.optional(Schema.String),
  tagFiringOption: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  monitoringMetadata: Schema.optional(Parameter),
  monitoringMetadataTagNameKey: Schema.optional(Schema.String),
  consentSettings: Schema.optional(TagConsentSetting),
})).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Condition {
  /** The type of operator for this condition. */
  type?: "conditionTypeUnspecified" | "equals" | "contains" | "startsWith" | "endsWith" | "matchRegex" | "greater" | "greaterOrEquals" | "less" | "lessOrEquals" | "cssSelector" | "urlMatches" | (string & {});
  /** A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true. */
  parameter?: Array<Parameter>;
}

export const Condition: Schema.Schema<Condition> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
})).annotate({ identifier: "Condition" }) as any as Schema.Schema<Condition>;

export interface Trigger {
  /** GTM Trigger's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Trigger ID uniquely identifies the GTM Trigger. */
  triggerId?: string;
  /** Trigger display name. */
  name?: string;
  /** Defines the data layer event that causes this trigger. */
  type?: "eventTypeUnspecified" | "pageview" | "domReady" | "windowLoaded" | "customEvent" | "triggerGroup" | "init" | "consentInit" | "serverPageview" | "always" | "firebaseAppException" | "firebaseAppUpdate" | "firebaseCampaign" | "firebaseFirstOpen" | "firebaseInAppPurchase" | "firebaseNotificationDismiss" | "firebaseNotificationForeground" | "firebaseNotificationOpen" | "firebaseNotificationReceive" | "firebaseOsUpdate" | "firebaseSessionStart" | "firebaseUserEngagement" | "formSubmission" | "click" | "linkClick" | "jsError" | "historyChange" | "timer" | "ampClick" | "ampTimer" | "ampScroll" | "ampVisibility" | "youTubeVideo" | "scrollDepth" | "elementVisibility" | (string & {});
  /** Used in the case of custom event, which is fired iff all Conditions are true. */
  customEventFilter?: Array<Condition>;
  /** The trigger will only fire iff all Conditions are true. */
  filter?: Array<Condition>;
  /** Used in the case of auto event tracking. */
  autoEventFilter?: Array<Condition>;
  /** Whether or not we should delay the form submissions or link opening until all of the tags have fired (by preventing the default action and later simulating the default action). Only valid for Form Submission and Link Click triggers. */
  waitForTags?: Parameter;
  /** Whether or not we should only fire tags if the form submit or link click event is not cancelled by some other event handler (e.g. because of validation). Only valid for Form Submission and Link Click triggers. */
  checkValidation?: Parameter;
  /** How long to wait (in milliseconds) for tags to fire when 'waits_for_tags' above evaluates to true. Only valid for Form Submission and Link Click triggers. */
  waitForTagsTimeout?: Parameter;
  /** Globally unique id of the trigger that auto-generates this (a Form Submit, Link Click or Timer listener) if any. Used to make incompatible auto-events work together with trigger filtering based on trigger ids. This value is populated during output generation since the tags implied by triggers don't exist until then. Only valid for Form Submit, Link Click and Timer triggers. */
  uniqueTriggerId?: Parameter;
  /** Name of the GTM event that is fired. Only valid for Timer triggers. */
  eventName?: Parameter;
  /** Time between triggering recurring Timer Events (in milliseconds). Only valid for Timer triggers. */
  interval?: Parameter;
  /** Limit of the number of GTM events this Timer Trigger will fire. If no limit is set, we will continue to fire GTM events until the user leaves the page. Only valid for Timer triggers. */
  limit?: Parameter;
  /** The fingerprint of the GTM Trigger as computed at storage time. This value is recomputed whenever the trigger is modified. */
  fingerprint?: string;
  /** Parent folder id. */
  parentFolderId?: string;
  /** A click trigger CSS selector (i.e. "a", "button" etc.). Only valid for AMP Click trigger. */
  selector?: Parameter;
  /** Time between Timer Events to fire (in seconds). Only valid for AMP Timer trigger. */
  intervalSeconds?: Parameter;
  /** Max time to fire Timer Events (in seconds). Only valid for AMP Timer trigger. */
  maxTimerLengthSeconds?: Parameter;
  /** List of integer percentage values for scroll triggers. The trigger will fire when each percentage is reached when the view is scrolled vertically. Only valid for AMP scroll triggers. */
  verticalScrollPercentageList?: Parameter;
  /** List of integer percentage values for scroll triggers. The trigger will fire when each percentage is reached when the view is scrolled horizontally. Only valid for AMP scroll triggers. */
  horizontalScrollPercentageList?: Parameter;
  /** A visibility trigger CSS selector (i.e. "#id"). Only valid for AMP Visibility trigger. */
  visibilitySelector?: Parameter;
  /** A visibility trigger minimum percent visibility. Only valid for AMP Visibility trigger. */
  visiblePercentageMin?: Parameter;
  /** A visibility trigger maximum percent visibility. Only valid for AMP Visibility trigger. */
  visiblePercentageMax?: Parameter;
  /** A visibility trigger minimum continuous visible time (in milliseconds). Only valid for AMP Visibility trigger. */
  continuousTimeMinMilliseconds?: Parameter;
  /** A visibility trigger minimum total visible time (in milliseconds). Only valid for AMP Visibility trigger. */
  totalTimeMinMilliseconds?: Parameter;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** User notes on how to apply this trigger in the container. */
  notes?: string;
  /** Additional parameters. */
  parameter?: Array<Parameter>;
}

export const Trigger: Schema.Schema<Trigger> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  triggerId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  customEventFilter: Schema.optional(Schema.Array(Condition)),
  filter: Schema.optional(Schema.Array(Condition)),
  autoEventFilter: Schema.optional(Schema.Array(Condition)),
  waitForTags: Schema.optional(Parameter),
  checkValidation: Schema.optional(Parameter),
  waitForTagsTimeout: Schema.optional(Parameter),
  uniqueTriggerId: Schema.optional(Parameter),
  eventName: Schema.optional(Parameter),
  interval: Schema.optional(Parameter),
  limit: Schema.optional(Parameter),
  fingerprint: Schema.optional(Schema.String),
  parentFolderId: Schema.optional(Schema.String),
  selector: Schema.optional(Parameter),
  intervalSeconds: Schema.optional(Parameter),
  maxTimerLengthSeconds: Schema.optional(Parameter),
  verticalScrollPercentageList: Schema.optional(Parameter),
  horizontalScrollPercentageList: Schema.optional(Parameter),
  visibilitySelector: Schema.optional(Parameter),
  visiblePercentageMin: Schema.optional(Parameter),
  visiblePercentageMax: Schema.optional(Parameter),
  continuousTimeMinMilliseconds: Schema.optional(Parameter),
  totalTimeMinMilliseconds: Schema.optional(Parameter),
  tagManagerUrl: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
})).annotate({ identifier: "Trigger" }) as any as Schema.Schema<Trigger>;

export interface VariableFormatValue {
  /** The option to convert a string-type variable value to either lowercase or uppercase. */
  caseConversionType?: "none" | "lowercase" | "uppercase" | (string & {});
  /** The value to convert if a variable value is null. */
  convertNullToValue?: Parameter;
  /** The value to convert if a variable value is undefined. */
  convertUndefinedToValue?: Parameter;
  /** The value to convert if a variable value is true. */
  convertTrueToValue?: Parameter;
  /** The value to convert if a variable value is false. */
  convertFalseToValue?: Parameter;
}

export const VariableFormatValue: Schema.Schema<VariableFormatValue> = Schema.suspend(() => Schema.Struct({
  caseConversionType: Schema.optional(Schema.String),
  convertNullToValue: Schema.optional(Parameter),
  convertUndefinedToValue: Schema.optional(Parameter),
  convertTrueToValue: Schema.optional(Parameter),
  convertFalseToValue: Schema.optional(Parameter),
})).annotate({ identifier: "VariableFormatValue" }) as any as Schema.Schema<VariableFormatValue>;

export interface Variable {
  /** GTM Variable's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Variable ID uniquely identifies the GTM Variable. */
  variableId?: string;
  /** Variable display name. */
  name?: string;
  /** GTM Variable Type. */
  type?: string;
  /** User notes on how to apply this variable in the container. */
  notes?: string;
  /** The start timestamp in milliseconds to schedule a variable. */
  scheduleStartMs?: string;
  /** The end timestamp in milliseconds to schedule a variable. */
  scheduleEndMs?: string;
  /** The variable's parameters. */
  parameter?: Array<Parameter>;
  /** For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set. */
  enablingTriggerId?: Array<string>;
  /** For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set. */
  disablingTriggerId?: Array<string>;
  /** The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified. */
  fingerprint?: string;
  /** Parent folder id. */
  parentFolderId?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** Option to convert a variable value to other value. */
  formatValue?: VariableFormatValue;
}

export const Variable: Schema.Schema<Variable> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  variableId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  scheduleStartMs: Schema.optional(Schema.String),
  scheduleEndMs: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
  enablingTriggerId: Schema.optional(Schema.Array(Schema.String)),
  disablingTriggerId: Schema.optional(Schema.Array(Schema.String)),
  fingerprint: Schema.optional(Schema.String),
  parentFolderId: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  formatValue: Schema.optional(VariableFormatValue),
})).annotate({ identifier: "Variable" }) as any as Schema.Schema<Variable>;

export interface Folder {
  /** GTM Folder's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Folder ID uniquely identifies the GTM Folder. */
  folderId?: string;
  /** Folder display name. */
  name?: string;
  /** The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** User notes on how to apply this folder in the container. */
  notes?: string;
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  folderId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
})).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface Client {
  /** GTM client's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Client ID uniquely identifies the GTM client. */
  clientId?: string;
  /** Client display name. */
  name?: string;
  /** Client type. */
  type?: string;
  /** The client's parameters. */
  parameter?: Array<Parameter>;
  /** Priority determines relative firing order. */
  priority?: number;
  /** The fingerprint of the GTM Client as computed at storage time. This value is recomputed whenever the client is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** Parent folder id. */
  parentFolderId?: string;
  /** User notes on how to apply this tag in the container. */
  notes?: string;
}

export const Client: Schema.Schema<Client> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
  priority: Schema.optional(Schema.Number),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  parentFolderId: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
})).annotate({ identifier: "Client" }) as any as Schema.Schema<Client>;

export interface Transformation {
  /** GTM transformation's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Transformation ID uniquely identifies the GTM transformation. */
  transformationId?: string;
  /** Transformation display name. */
  name?: string;
  /** Transformation type. */
  type?: string;
  /** The transformation's parameters. */
  parameter?: Array<Parameter>;
  /** The fingerprint of the GTM Transformation as computed at storage time. This value is recomputed whenever the transformation is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** Parent folder id. */
  parentFolderId?: string;
  /** User notes on how to apply this transformation in the container. */
  notes?: string;
}

export const Transformation: Schema.Schema<Transformation> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  transformationId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  parentFolderId: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
})).annotate({ identifier: "Transformation" }) as any as Schema.Schema<Transformation>;

export interface ZoneChildContainer {
  /** The child container's public id. */
  publicId?: string;
  /** The zone's nickname for the child container. */
  nickname?: string;
}

export const ZoneChildContainer: Schema.Schema<ZoneChildContainer> = Schema.suspend(() => Schema.Struct({
  publicId: Schema.optional(Schema.String),
  nickname: Schema.optional(Schema.String),
})).annotate({ identifier: "ZoneChildContainer" }) as any as Schema.Schema<ZoneChildContainer>;

export interface ZoneBoundary {
  /** The conditions that, when conjoined, make up the boundary. */
  condition?: Array<Condition>;
  /** Custom evaluation trigger IDs. A zone will evaluate its boundary conditions when any of the listed triggers are true. */
  customEvaluationTriggerId?: Array<string>;
}

export const ZoneBoundary: Schema.Schema<ZoneBoundary> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.Array(Condition)),
  customEvaluationTriggerId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ZoneBoundary" }) as any as Schema.Schema<ZoneBoundary>;

export interface ZoneTypeRestriction {
  /** True if type restrictions have been enabled for this Zone. */
  enable?: boolean;
  /** List of type public ids that have been whitelisted for use in this Zone. */
  whitelistedTypeId?: Array<string>;
}

export const ZoneTypeRestriction: Schema.Schema<ZoneTypeRestriction> = Schema.suspend(() => Schema.Struct({
  enable: Schema.optional(Schema.Boolean),
  whitelistedTypeId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ZoneTypeRestriction" }) as any as Schema.Schema<ZoneTypeRestriction>;

export interface Zone {
  /** GTM Zone's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Zone ID uniquely identifies the GTM Zone. */
  zoneId?: string;
  /** Zone display name. */
  name?: string;
  /** The fingerprint of the GTM Zone as computed at storage time. This value is recomputed whenever the zone is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** User notes on how to apply this zone in the container. */
  notes?: string;
  /** Containers that are children of this Zone. */
  childContainer?: Array<ZoneChildContainer>;
  /** This Zone's boundary. */
  boundary?: ZoneBoundary;
  /** This Zone's type restrictions. */
  typeRestriction?: ZoneTypeRestriction;
}

export const Zone: Schema.Schema<Zone> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  zoneId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  childContainer: Schema.optional(Schema.Array(ZoneChildContainer)),
  boundary: Schema.optional(ZoneBoundary),
  typeRestriction: Schema.optional(ZoneTypeRestriction),
})).annotate({ identifier: "Zone" }) as any as Schema.Schema<Zone>;

export interface GalleryReference {
  /** The name of the host for the community gallery template. */
  host?: string;
  /** The name of the owner for the community gallery template. */
  owner?: string;
  /** The name of the repository for the community gallery template. */
  repository?: string;
  /** The version of the community gallery template. */
  version?: string;
  /** If a user has manually edited the community gallery template. */
  isModified?: boolean;
  /** The signature of the community gallery template as computed at import time. This value is recomputed whenever the template is updated from the gallery. */
  signature?: string;
  /** The developer id of the community gallery template. This value is set whenever the template is created from the gallery. */
  templateDeveloperId?: string;
  /** ID for the gallery template that is generated once during first sync and travels with the template redirects. */
  galleryTemplateId?: string;
}

export const GalleryReference: Schema.Schema<GalleryReference> = Schema.suspend(() => Schema.Struct({
  host: Schema.optional(Schema.String),
  owner: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  isModified: Schema.optional(Schema.Boolean),
  signature: Schema.optional(Schema.String),
  templateDeveloperId: Schema.optional(Schema.String),
  galleryTemplateId: Schema.optional(Schema.String),
})).annotate({ identifier: "GalleryReference" }) as any as Schema.Schema<GalleryReference>;

export interface CustomTemplate {
  /** GTM Custom Template's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** The Custom Template ID uniquely identifies the GTM custom template. */
  templateId?: string;
  /** Custom Template display name. */
  name?: string;
  /** The fingerprint of the GTM Custom Template as computed at storage time. This value is recomputed whenever the template is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** The custom template in text format. */
  templateData?: string;
  /** A reference to the Community Template Gallery entry. */
  galleryReference?: GalleryReference;
}

export const CustomTemplate: Schema.Schema<CustomTemplate> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  templateId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  templateData: Schema.optional(Schema.String),
  galleryReference: Schema.optional(GalleryReference),
})).annotate({ identifier: "CustomTemplate" }) as any as Schema.Schema<CustomTemplate>;

export interface BuiltInVariable {
  /** GTM BuiltInVariable's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Workspace ID. */
  workspaceId?: string;
  /** Type of built-in variable. */
  type?: "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion" | "analyticsClientId" | "analyticsSessionId" | "analyticsSessionNumber" | (string & {});
  /** Name of the built-in variable to be used to refer to the built-in variable. */
  name?: string;
}

export const BuiltInVariable: Schema.Schema<BuiltInVariable> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "BuiltInVariable" }) as any as Schema.Schema<BuiltInVariable>;

export interface GtagConfig {
  /** Google tag config's API relative path. */
  path?: string;
  /** Google tag account ID. */
  accountId?: string;
  /** Google tag container ID. */
  containerId?: string;
  /** Google tag workspace ID. Only used by GTM containers. Set to 0 otherwise. */
  workspaceId?: string;
  /** The ID uniquely identifies the Google tag config. */
  gtagConfigId?: string;
  /** Google tag config type. */
  type?: string;
  /** The Google tag config's parameters. */
  parameter?: Array<Parameter>;
  /** The fingerprint of the Google tag config as computed at storage time. This value is recomputed whenever the config is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
}

export const GtagConfig: Schema.Schema<GtagConfig> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  gtagConfigId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.Array(Parameter)),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GtagConfig" }) as any as Schema.Schema<GtagConfig>;

export interface Entity {
  /** The tag being represented by the entity. */
  tag?: Tag;
  /** The trigger being represented by the entity. */
  trigger?: Trigger;
  /** The variable being represented by the entity. */
  variable?: Variable;
  /** The folder being represented by the entity. */
  folder?: Folder;
  /** The client being represented by the entity. */
  client?: Client;
  /** The transformation being represented by the entity. */
  transformation?: Transformation;
  /** The zone being represented by the entity. */
  zone?: Zone;
  /** The custom template being represented by the entity. */
  customTemplate?: CustomTemplate;
  /** The built in variable being represented by the entity. */
  builtInVariable?: BuiltInVariable;
  /** The gtag config being represented by the entity. */
  gtagConfig?: GtagConfig;
  /** Represents how the entity has been changed in the workspace. */
  changeStatus?: "changeStatusUnspecified" | "none" | "added" | "deleted" | "updated" | (string & {});
}

export const Entity: Schema.Schema<Entity> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Tag),
  trigger: Schema.optional(Trigger),
  variable: Schema.optional(Variable),
  folder: Schema.optional(Folder),
  client: Schema.optional(Client),
  transformation: Schema.optional(Transformation),
  zone: Schema.optional(Zone),
  customTemplate: Schema.optional(CustomTemplate),
  builtInVariable: Schema.optional(BuiltInVariable),
  gtagConfig: Schema.optional(GtagConfig),
  changeStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface MergeConflict {
  /** The workspace entity that has conflicting changes compared to the base version. If an entity is deleted in a workspace, it will still appear with a deleted change status. */
  entityInWorkspace?: Entity;
  /** The base version entity (since the latest sync operation) that has conflicting changes compared to the workspace. If this field is missing, it means the workspace entity is deleted from the base version. */
  entityInBaseVersion?: Entity;
}

export const MergeConflict: Schema.Schema<MergeConflict> = Schema.suspend(() => Schema.Struct({
  entityInWorkspace: Schema.optional(Entity),
  entityInBaseVersion: Schema.optional(Entity),
})).annotate({ identifier: "MergeConflict" }) as any as Schema.Schema<MergeConflict>;

export interface SyncWorkspaceResponse {
  /** Indicates whether synchronization caused a merge conflict or sync error. */
  syncStatus?: SyncStatus;
  /** The merge conflict after sync. If this field is not empty, the sync is still treated as successful. But a version cannot be created until all conflicts are resolved. */
  mergeConflict?: Array<MergeConflict>;
}

export const SyncWorkspaceResponse: Schema.Schema<SyncWorkspaceResponse> = Schema.suspend(() => Schema.Struct({
  syncStatus: Schema.optional(SyncStatus),
  mergeConflict: Schema.optional(Schema.Array(MergeConflict)),
})).annotate({ identifier: "SyncWorkspaceResponse" }) as any as Schema.Schema<SyncWorkspaceResponse>;

export interface GetWorkspaceStatusResponse {
  /** Entities that have been changed in the workspace. */
  workspaceChange?: Array<Entity>;
  /** The merge conflict after sync. */
  mergeConflict?: Array<MergeConflict>;
}

export const GetWorkspaceStatusResponse: Schema.Schema<GetWorkspaceStatusResponse> = Schema.suspend(() => Schema.Struct({
  workspaceChange: Schema.optional(Schema.Array(Entity)),
  mergeConflict: Schema.optional(Schema.Array(MergeConflict)),
})).annotate({ identifier: "GetWorkspaceStatusResponse" }) as any as Schema.Schema<GetWorkspaceStatusResponse>;

export interface ProposedChange {
  /** The list of workspace changes to be applied. */
  changes?: Array<Entity>;
}

export const ProposedChange: Schema.Schema<ProposedChange> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(Entity)),
})).annotate({ identifier: "ProposedChange" }) as any as Schema.Schema<ProposedChange>;

export interface BulkUpdateWorkspaceResponse {
  /** The entities that were added or updated during the bulk-update. Does not include entities that were deleted or updated by the system. */
  changes?: Array<Entity>;
}

export const BulkUpdateWorkspaceResponse: Schema.Schema<BulkUpdateWorkspaceResponse> = Schema.suspend(() => Schema.Struct({
  changes: Schema.optional(Schema.Array(Entity)),
})).annotate({ identifier: "BulkUpdateWorkspaceResponse" }) as any as Schema.Schema<BulkUpdateWorkspaceResponse>;

export interface ContainerVersion {
  /** GTM Container Version's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The Container Version ID uniquely identifies the GTM Container Version. */
  containerVersionId?: string;
  /** Container version display name. */
  name?: string;
  /** A value of true indicates this container version has been deleted. */
  deleted?: boolean;
  /** Container version description. */
  description?: string;
  /** The container that this version was taken from. */
  container?: Container;
  /** The tags in the container that this version was taken from. */
  tag?: Array<Tag>;
  /** The triggers in the container that this version was taken from. */
  trigger?: Array<Trigger>;
  /** The variables in the container that this version was taken from. */
  variable?: Array<Variable>;
  /** The folders in the container that this version was taken from. */
  folder?: Array<Folder>;
  /** The built-in variables in the container that this version was taken from. */
  builtInVariable?: Array<BuiltInVariable>;
  /** The fingerprint of the GTM Container Version as computed at storage time. This value is recomputed whenever the container version is modified. */
  fingerprint?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
  /** The zones in the container that this version was taken from. */
  zone?: Array<Zone>;
  /** The custom templates in the container that this version was taken from. */
  customTemplate?: Array<CustomTemplate>;
  /** The clients in the container that this version was taken from. */
  client?: Array<Client>;
  /** The Google tag configs in the container that this version was taken from. */
  gtagConfig?: Array<GtagConfig>;
  /** The transformations in the container that this version was taken from. */
  transformation?: Array<Transformation>;
}

export const ContainerVersion: Schema.Schema<ContainerVersion> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  containerVersionId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  container: Schema.optional(Container),
  tag: Schema.optional(Schema.Array(Tag)),
  trigger: Schema.optional(Schema.Array(Trigger)),
  variable: Schema.optional(Schema.Array(Variable)),
  folder: Schema.optional(Schema.Array(Folder)),
  builtInVariable: Schema.optional(Schema.Array(BuiltInVariable)),
  fingerprint: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.Array(Zone)),
  customTemplate: Schema.optional(Schema.Array(CustomTemplate)),
  client: Schema.optional(Schema.Array(Client)),
  gtagConfig: Schema.optional(Schema.Array(GtagConfig)),
  transformation: Schema.optional(Schema.Array(Transformation)),
})).annotate({ identifier: "ContainerVersion" }) as any as Schema.Schema<ContainerVersion>;

export interface QuickPreviewResponse {
  /** The quick previewed container version. */
  containerVersion?: ContainerVersion;
  /** Whether quick previewing failed when syncing the workspace to the latest container version. */
  syncStatus?: SyncStatus;
  /** Were there compiler errors or not. */
  compilerError?: boolean;
}

export const QuickPreviewResponse: Schema.Schema<QuickPreviewResponse> = Schema.suspend(() => Schema.Struct({
  containerVersion: Schema.optional(ContainerVersion),
  syncStatus: Schema.optional(SyncStatus),
  compilerError: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "QuickPreviewResponse" }) as any as Schema.Schema<QuickPreviewResponse>;

export interface CreateContainerVersionRequestVersionOptions {
  /** The name of the container version to be created. */
  name?: string;
  /** The notes of the container version to be created. */
  notes?: string;
}

export const CreateContainerVersionRequestVersionOptions: Schema.Schema<CreateContainerVersionRequestVersionOptions> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateContainerVersionRequestVersionOptions" }) as any as Schema.Schema<CreateContainerVersionRequestVersionOptions>;

export interface CreateContainerVersionResponse {
  /** The container version created. */
  containerVersion?: ContainerVersion;
  /** Whether version creation failed when syncing the workspace to the latest container version. */
  syncStatus?: SyncStatus;
  /** Compiler errors or not. */
  compilerError?: boolean;
  /** Auto generated workspace path created as a result of version creation. This field should only be populated if the created version was not a quick preview. */
  newWorkspacePath?: string;
}

export const CreateContainerVersionResponse: Schema.Schema<CreateContainerVersionResponse> = Schema.suspend(() => Schema.Struct({
  containerVersion: Schema.optional(ContainerVersion),
  syncStatus: Schema.optional(SyncStatus),
  compilerError: Schema.optional(Schema.Boolean),
  newWorkspacePath: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateContainerVersionResponse" }) as any as Schema.Schema<CreateContainerVersionResponse>;

export interface PublishContainerVersionResponse {
  /** The container version created. */
  containerVersion?: ContainerVersion;
  /** Compiler errors or not. */
  compilerError?: boolean;
}

export const PublishContainerVersionResponse: Schema.Schema<PublishContainerVersionResponse> = Schema.suspend(() => Schema.Struct({
  containerVersion: Schema.optional(ContainerVersion),
  compilerError: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PublishContainerVersionResponse" }) as any as Schema.Schema<PublishContainerVersionResponse>;

export interface ContainerVersionHeader {
  /** GTM Container Version's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The Container Version ID uniquely identifies the GTM Container Version. */
  containerVersionId?: string;
  /** Container version display name. */
  name?: string;
  /** Number of tags in the container version. */
  numTags?: string;
  /** Number of triggers in the container version. */
  numTriggers?: string;
  /** A value of true indicates this container version has been deleted. */
  deleted?: boolean;
  /** Number of variables in the container version. */
  numVariables?: string;
  /** Number of zones in the container version. */
  numZones?: string;
  /** Number of custom templates in the container version. */
  numCustomTemplates?: string;
  /** Number of clients in the container version. */
  numClients?: string;
  /** Number of Google tag configs in the container version. */
  numGtagConfigs?: string;
  /** Number of transformations in the container version. */
  numTransformations?: string;
}

export const ContainerVersionHeader: Schema.Schema<ContainerVersionHeader> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  containerVersionId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  numTags: Schema.optional(Schema.String),
  numTriggers: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  numVariables: Schema.optional(Schema.String),
  numZones: Schema.optional(Schema.String),
  numCustomTemplates: Schema.optional(Schema.String),
  numClients: Schema.optional(Schema.String),
  numGtagConfigs: Schema.optional(Schema.String),
  numTransformations: Schema.optional(Schema.String),
})).annotate({ identifier: "ContainerVersionHeader" }) as any as Schema.Schema<ContainerVersionHeader>;

export interface ListContainerVersionsResponse {
  /** All container version headers of a GTM Container. */
  containerVersionHeader?: Array<ContainerVersionHeader>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListContainerVersionsResponse: Schema.Schema<ListContainerVersionsResponse> = Schema.suspend(() => Schema.Struct({
  containerVersionHeader: Schema.optional(Schema.Array(ContainerVersionHeader)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListContainerVersionsResponse" }) as any as Schema.Schema<ListContainerVersionsResponse>;

export interface ListVariablesResponse {
  /** All GTM Variables of a GTM Container. */
  variable?: Array<Variable>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListVariablesResponse: Schema.Schema<ListVariablesResponse> = Schema.suspend(() => Schema.Struct({
  variable: Schema.optional(Schema.Array(Variable)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVariablesResponse" }) as any as Schema.Schema<ListVariablesResponse>;

export interface RevertVariableResponse {
  /** Variable as it appears in the latest container version since the last workspace synchronization operation. If no variable is present, that means the variable was deleted in the latest container version. */
  variable?: Variable;
}

export const RevertVariableResponse: Schema.Schema<RevertVariableResponse> = Schema.suspend(() => Schema.Struct({
  variable: Schema.optional(Variable),
})).annotate({ identifier: "RevertVariableResponse" }) as any as Schema.Schema<RevertVariableResponse>;

export interface CreateBuiltInVariableResponse {
  /** List of created built-in variables. */
  builtInVariable?: Array<BuiltInVariable>;
}

export const CreateBuiltInVariableResponse: Schema.Schema<CreateBuiltInVariableResponse> = Schema.suspend(() => Schema.Struct({
  builtInVariable: Schema.optional(Schema.Array(BuiltInVariable)),
})).annotate({ identifier: "CreateBuiltInVariableResponse" }) as any as Schema.Schema<CreateBuiltInVariableResponse>;

export interface ListEnabledBuiltInVariablesResponse {
  /** All GTM BuiltInVariables of a GTM container. */
  builtInVariable?: Array<BuiltInVariable>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListEnabledBuiltInVariablesResponse: Schema.Schema<ListEnabledBuiltInVariablesResponse> = Schema.suspend(() => Schema.Struct({
  builtInVariable: Schema.optional(Schema.Array(BuiltInVariable)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnabledBuiltInVariablesResponse" }) as any as Schema.Schema<ListEnabledBuiltInVariablesResponse>;

export interface RevertBuiltInVariableResponse {
  /** Whether the built-in variable is enabled after reversion. */
  enabled?: boolean;
}

export const RevertBuiltInVariableResponse: Schema.Schema<RevertBuiltInVariableResponse> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RevertBuiltInVariableResponse" }) as any as Schema.Schema<RevertBuiltInVariableResponse>;

export interface ListTriggersResponse {
  /** All GTM Triggers of a GTM Container. */
  trigger?: Array<Trigger>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListTriggersResponse: Schema.Schema<ListTriggersResponse> = Schema.suspend(() => Schema.Struct({
  trigger: Schema.optional(Schema.Array(Trigger)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTriggersResponse" }) as any as Schema.Schema<ListTriggersResponse>;

export interface RevertTriggerResponse {
  /** Trigger as it appears in the latest container version since the last workspace synchronization operation. If no trigger is present, that means the trigger was deleted in the latest container version. */
  trigger?: Trigger;
}

export const RevertTriggerResponse: Schema.Schema<RevertTriggerResponse> = Schema.suspend(() => Schema.Struct({
  trigger: Schema.optional(Trigger),
})).annotate({ identifier: "RevertTriggerResponse" }) as any as Schema.Schema<RevertTriggerResponse>;

export interface ListTagsResponse {
  /** All GTM Tags of a GTM Container. */
  tag?: Array<Tag>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListTagsResponse: Schema.Schema<ListTagsResponse> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.Array(Tag)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTagsResponse" }) as any as Schema.Schema<ListTagsResponse>;

export interface RevertTagResponse {
  /** Tag as it appears in the latest container version since the last workspace synchronization operation. If no tag is present, that means the tag was deleted in the latest container version. */
  tag?: Tag;
}

export const RevertTagResponse: Schema.Schema<RevertTagResponse> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Tag),
})).annotate({ identifier: "RevertTagResponse" }) as any as Schema.Schema<RevertTagResponse>;

export interface ListGtagConfigResponse {
  /** All Google tag configs in a Container. */
  gtagConfig?: Array<GtagConfig>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListGtagConfigResponse: Schema.Schema<ListGtagConfigResponse> = Schema.suspend(() => Schema.Struct({
  gtagConfig: Schema.optional(Schema.Array(GtagConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGtagConfigResponse" }) as any as Schema.Schema<ListGtagConfigResponse>;

export interface ListTemplatesResponse {
  /** All GTM Custom Templates of a GTM Container. */
  template?: Array<CustomTemplate>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListTemplatesResponse: Schema.Schema<ListTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(Schema.Array(CustomTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTemplatesResponse" }) as any as Schema.Schema<ListTemplatesResponse>;

export interface RevertTemplateResponse {
  /** Template as it appears in the latest container version since the last workspace synchronization operation. If no template is present, that means the template was deleted in the latest container version. */
  template?: CustomTemplate;
}

export const RevertTemplateResponse: Schema.Schema<RevertTemplateResponse> = Schema.suspend(() => Schema.Struct({
  template: Schema.optional(CustomTemplate),
})).annotate({ identifier: "RevertTemplateResponse" }) as any as Schema.Schema<RevertTemplateResponse>;

export interface ListFoldersResponse {
  /** All GTM Folders of a GTM Container. */
  folder?: Array<Folder>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListFoldersResponse: Schema.Schema<ListFoldersResponse> = Schema.suspend(() => Schema.Struct({
  folder: Schema.optional(Schema.Array(Folder)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListFoldersResponse" }) as any as Schema.Schema<ListFoldersResponse>;

export interface FolderEntities {
  /** The list of tags inside the folder. */
  tag?: Array<Tag>;
  /** The list of variables inside the folder. */
  variable?: Array<Variable>;
  /** The list of triggers inside the folder. */
  trigger?: Array<Trigger>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const FolderEntities: Schema.Schema<FolderEntities> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.Array(Tag)),
  variable: Schema.optional(Schema.Array(Variable)),
  trigger: Schema.optional(Schema.Array(Trigger)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "FolderEntities" }) as any as Schema.Schema<FolderEntities>;

export interface RevertFolderResponse {
  /** Folder as it appears in the latest container version since the last workspace synchronization operation. If no folder is present, that means the folder was deleted in the latest container version. */
  folder?: Folder;
}

export const RevertFolderResponse: Schema.Schema<RevertFolderResponse> = Schema.suspend(() => Schema.Struct({
  folder: Schema.optional(Folder),
})).annotate({ identifier: "RevertFolderResponse" }) as any as Schema.Schema<RevertFolderResponse>;

export interface Environment {
  /** GTM Environment's API relative path. */
  path?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** GTM Environment ID uniquely identifies the GTM Environment. */
  environmentId?: string;
  /** The type of this environment. */
  type?: "user" | "live" | "latest" | "workspace" | (string & {});
  /** The fingerprint of the GTM environment as computed at storage time. This value is recomputed whenever the environment is modified. */
  fingerprint?: string;
  /** The environment display name. Can be set or changed only on USER type environments. */
  name?: string;
  /** The environment description. Can be set or changed only on USER type environments. */
  description?: string;
  /** Whether or not to enable debug by default for the environment. */
  enableDebug?: boolean;
  /** Default preview page url for the environment. */
  url?: string;
  /** The environment authorization code. */
  authorizationCode?: string;
  /** The last update time-stamp for the authorization code. */
  authorizationTimestamp?: string;
  /** Represents a link to a container version. */
  containerVersionId?: string;
  /** Represents a link to a quick preview of a workspace. */
  workspaceId?: string;
  /** Auto generated link to the tag manager UI */
  tagManagerUrl?: string;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  accountId: Schema.optional(Schema.String),
  containerId: Schema.optional(Schema.String),
  environmentId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  enableDebug: Schema.optional(Schema.Boolean),
  url: Schema.optional(Schema.String),
  authorizationCode: Schema.optional(Schema.String),
  authorizationTimestamp: Schema.optional(Schema.String),
  containerVersionId: Schema.optional(Schema.String),
  workspaceId: Schema.optional(Schema.String),
  tagManagerUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface ListEnvironmentsResponse {
  /** All Environments of a GTM Container. */
  environment?: Array<Environment>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListEnvironmentsResponse: Schema.Schema<ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.Array(Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEnvironmentsResponse" }) as any as Schema.Schema<ListEnvironmentsResponse>;

export interface ListZonesResponse {
  /** All GTM Zones of a GTM Container. */
  zone?: Array<Zone>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListZonesResponse: Schema.Schema<ListZonesResponse> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Schema.Array(Zone)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListZonesResponse" }) as any as Schema.Schema<ListZonesResponse>;

export interface RevertZoneResponse {
  /** Zone as it appears in the latest container version since the last workspace synchronization operation. If no zone is present, that means the zone was deleted in the latest container version. */
  zone?: Zone;
}

export const RevertZoneResponse: Schema.Schema<RevertZoneResponse> = Schema.suspend(() => Schema.Struct({
  zone: Schema.optional(Zone),
})).annotate({ identifier: "RevertZoneResponse" }) as any as Schema.Schema<RevertZoneResponse>;

export interface ListClientsResponse {
  /** All GTM Clients of a GTM Container. */
  client?: Array<Client>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListClientsResponse: Schema.Schema<ListClientsResponse> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(Schema.Array(Client)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListClientsResponse" }) as any as Schema.Schema<ListClientsResponse>;

export interface RevertClientResponse {
  /** Client as it appears in the latest container version since the last workspace synchronization operation. If no client is present, that means the client was deleted in the latest container version. */
  client?: Client;
}

export const RevertClientResponse: Schema.Schema<RevertClientResponse> = Schema.suspend(() => Schema.Struct({
  client: Schema.optional(Client),
})).annotate({ identifier: "RevertClientResponse" }) as any as Schema.Schema<RevertClientResponse>;

export interface ListTransformationsResponse {
  /** All GTM Transformations of a GTM Container. */
  transformation?: Array<Transformation>;
  /** Continuation token for fetching the next page of results. */
  nextPageToken?: string;
}

export const ListTransformationsResponse: Schema.Schema<ListTransformationsResponse> = Schema.suspend(() => Schema.Struct({
  transformation: Schema.optional(Schema.Array(Transformation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTransformationsResponse" }) as any as Schema.Schema<ListTransformationsResponse>;

export interface RevertTransformationResponse {
  /** Transformation as it appears in the latest container version since the last workspace synchronization operation. If no transformation is present, that means the transformation was deleted in the latest container version. */
  transformation?: Transformation;
}

export const RevertTransformationResponse: Schema.Schema<RevertTransformationResponse> = Schema.suspend(() => Schema.Struct({
  transformation: Schema.optional(Transformation),
})).annotate({ identifier: "RevertTransformationResponse" }) as any as Schema.Schema<RevertTransformationResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists all GTM Accounts that a user has access to. */
export interface ListAccountsRequest {
  /** Also retrieve accounts associated with Google Tag when true. */
  includeGoogleTags?: boolean;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsRequest = Schema.Struct({
  includeGoogleTags: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeGoogleTags")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse_Op = ListAccountsResponse;
export const ListAccountsResponse_Op = ListAccountsResponse;

export type ListAccountsError = CommonErrors;

export const listAccounts = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Account. */
export interface GetAccountsRequest {
  /** GTM Account's API relative path. */
  path: string;
}

export const GetAccountsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Updates a GTM Account. */
export interface UpdateAccountsRequest {
  /** GTM Account's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the account in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Account;
}

export const UpdateAccountsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = Account;
export const UpdateAccountsResponse = Account;

export type UpdateAccountsError = CommonErrors;

export const updateAccounts: API.OperationMethod<UpdateAccountsRequest, UpdateAccountsResponse, UpdateAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

/** Creates a user's Account & Container access. */
export interface CreateAccountsUser_permissionsRequest {
  /** GTM Account's API relative path. */
  parent: string;
  /** Request body */
  body?: UserPermission;
}

export const CreateAccountsUser_permissionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserPermission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/user_permissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsUser_permissionsRequest>;

export type CreateAccountsUser_permissionsResponse = UserPermission;
export const CreateAccountsUser_permissionsResponse = UserPermission;

export type CreateAccountsUser_permissionsError = CommonErrors;

export const createAccountsUser_permissions: API.OperationMethod<CreateAccountsUser_permissionsRequest, CreateAccountsUser_permissionsResponse, CreateAccountsUser_permissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsUser_permissionsRequest,
  output: CreateAccountsUser_permissionsResponse,
  errors: [],
}));

/** List all users that have access to the account along with Account and Container user access granted to each of them. */
export interface ListAccountsUser_permissionsRequest {
  /** GTM Account's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsUser_permissionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/user_permissions" }),
  svc,
) as unknown as Schema.Schema<ListAccountsUser_permissionsRequest>;

export type ListAccountsUser_permissionsResponse = ListUserPermissionsResponse;
export const ListAccountsUser_permissionsResponse = ListUserPermissionsResponse;

export type ListAccountsUser_permissionsError = CommonErrors;

export const listAccountsUser_permissions = API.makePaginated(() => ({
  input: ListAccountsUser_permissionsRequest,
  output: ListAccountsUser_permissionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a user's Account & Container access. */
export interface GetAccountsUser_permissionsRequest {
  /** GTM UserPermission's API relative path. */
  path: string;
}

export const GetAccountsUser_permissionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/user_permissions/{user_permissionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsUser_permissionsRequest>;

export type GetAccountsUser_permissionsResponse = UserPermission;
export const GetAccountsUser_permissionsResponse = UserPermission;

export type GetAccountsUser_permissionsError = CommonErrors;

export const getAccountsUser_permissions: API.OperationMethod<GetAccountsUser_permissionsRequest, GetAccountsUser_permissionsResponse, GetAccountsUser_permissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsUser_permissionsRequest,
  output: GetAccountsUser_permissionsResponse,
  errors: [],
}));

/** Updates a user's Account & Container access. */
export interface UpdateAccountsUser_permissionsRequest {
  /** GTM UserPermission's API relative path. */
  path: string;
  /** Request body */
  body?: UserPermission;
}

export const UpdateAccountsUser_permissionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  body: Schema.optional(UserPermission).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/user_permissions/{user_permissionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsUser_permissionsRequest>;

export type UpdateAccountsUser_permissionsResponse = UserPermission;
export const UpdateAccountsUser_permissionsResponse = UserPermission;

export type UpdateAccountsUser_permissionsError = CommonErrors;

export const updateAccountsUser_permissions: API.OperationMethod<UpdateAccountsUser_permissionsRequest, UpdateAccountsUser_permissionsResponse, UpdateAccountsUser_permissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsUser_permissionsRequest,
  output: UpdateAccountsUser_permissionsResponse,
  errors: [],
}));

/** Removes a user from the account, revoking access to it and all of its containers. */
export interface DeleteAccountsUser_permissionsRequest {
  /** GTM UserPermission's API relative path. */
  path: string;
}

export const DeleteAccountsUser_permissionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/user_permissions/{user_permissionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsUser_permissionsRequest>;

export interface DeleteAccountsUser_permissionsResponse {}
export const DeleteAccountsUser_permissionsResponse: Schema.Schema<DeleteAccountsUser_permissionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsUser_permissionsResponse>;

export type DeleteAccountsUser_permissionsError = CommonErrors;

export const deleteAccountsUser_permissions: API.OperationMethod<DeleteAccountsUser_permissionsRequest, DeleteAccountsUser_permissionsResponse, DeleteAccountsUser_permissionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsUser_permissionsRequest,
  output: DeleteAccountsUser_permissionsResponse,
  errors: [],
}));

/** Creates a Container. */
export interface CreateAccountsContainersRequest {
  /** GTM Account's API relative path. */
  parent: string;
  /** Request body */
  body?: Container;
}

export const CreateAccountsContainersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Container).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersRequest>;

export type CreateAccountsContainersResponse = Container;
export const CreateAccountsContainersResponse = Container;

export type CreateAccountsContainersError = CommonErrors;

export const createAccountsContainers: API.OperationMethod<CreateAccountsContainersRequest, CreateAccountsContainersResponse, CreateAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersRequest,
  output: CreateAccountsContainersResponse,
  errors: [],
}));

/** Lists all Containers that belongs to a GTM Account. */
export interface ListAccountsContainersRequest {
  /** GTM Account's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersRequest>;

export type ListAccountsContainersResponse = ListContainersResponse;
export const ListAccountsContainersResponse = ListContainersResponse;

export type ListAccountsContainersError = CommonErrors;

export const listAccountsContainers = API.makePaginated(() => ({
  input: ListAccountsContainersRequest,
  output: ListAccountsContainersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Container. */
export interface GetAccountsContainersRequest {
  /** GTM Container's API relative path. */
  path: string;
}

export const GetAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersRequest>;

export type GetAccountsContainersResponse = Container;
export const GetAccountsContainersResponse = Container;

export type GetAccountsContainersError = CommonErrors;

export const getAccountsContainers: API.OperationMethod<GetAccountsContainersRequest, GetAccountsContainersResponse, GetAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersRequest,
  output: GetAccountsContainersResponse,
  errors: [],
}));

/** Gets the tagging snippet for a Container. */
export interface SnippetAccountsContainersRequest {
  /** Container snippet's API relative path. */
  path: string;
}

export const SnippetAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}:snippet" }),
  svc,
) as unknown as Schema.Schema<SnippetAccountsContainersRequest>;

export type SnippetAccountsContainersResponse = GetContainerSnippetResponse;
export const SnippetAccountsContainersResponse = GetContainerSnippetResponse;

export type SnippetAccountsContainersError = CommonErrors;

export const snippetAccountsContainers: API.OperationMethod<SnippetAccountsContainersRequest, SnippetAccountsContainersResponse, SnippetAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SnippetAccountsContainersRequest,
  output: SnippetAccountsContainersResponse,
  errors: [],
}));

/** Looks up a Container by destination ID or tag ID. */
export interface LookupAccountsContainersRequest {
  /** Destination ID linked to a GTM Container, e.g. AW-123456789. Only one of destination_id or tag_id should be set. */
  destinationId?: string;
  /** Tag ID for a GTM Container, e.g. GTM-123456789. Only one of destination_id or tag_id should be set. */
  tagId?: string;
}

export const LookupAccountsContainersRequest = Schema.Struct({
  destinationId: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationId")),
  tagId: Schema.optional(Schema.String).pipe(T.HttpQuery("tagId")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/containers:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupAccountsContainersRequest>;

export type LookupAccountsContainersResponse = Container;
export const LookupAccountsContainersResponse = Container;

export type LookupAccountsContainersError = CommonErrors;

export const lookupAccountsContainers: API.OperationMethod<LookupAccountsContainersRequest, LookupAccountsContainersResponse, LookupAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupAccountsContainersRequest,
  output: LookupAccountsContainersResponse,
  errors: [],
}));

/** Updates a Container. */
export interface UpdateAccountsContainersRequest {
  /** GTM Container's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the container in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Container;
}

export const UpdateAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Container).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersRequest>;

export type UpdateAccountsContainersResponse = Container;
export const UpdateAccountsContainersResponse = Container;

export type UpdateAccountsContainersError = CommonErrors;

export const updateAccountsContainers: API.OperationMethod<UpdateAccountsContainersRequest, UpdateAccountsContainersResponse, UpdateAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersRequest,
  output: UpdateAccountsContainersResponse,
  errors: [],
}));

/** Combines Containers. */
export interface CombineAccountsContainersRequest {
  /** GTM Container's API relative path. */
  path: string;
  /** ID of container that will be merged into the current container. */
  containerId?: string;
  /** Must be set to true to allow features.user_permissions to change from false to true. If this operation causes an update but this bit is false, the operation will fail. */
  allowUserPermissionFeatureUpdate?: boolean;
  /** Specify the source of config setting after combine */
  settingSource?: "settingSourceUnspecified" | "current" | "other" | (string & {});
}

export const CombineAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  containerId: Schema.optional(Schema.String).pipe(T.HttpQuery("containerId")),
  allowUserPermissionFeatureUpdate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowUserPermissionFeatureUpdate")),
  settingSource: Schema.optional(Schema.String).pipe(T.HttpQuery("settingSource")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}:combine", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CombineAccountsContainersRequest>;

export type CombineAccountsContainersResponse = Container;
export const CombineAccountsContainersResponse = Container;

export type CombineAccountsContainersError = CommonErrors;

export const combineAccountsContainers: API.OperationMethod<CombineAccountsContainersRequest, CombineAccountsContainersResponse, CombineAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CombineAccountsContainersRequest,
  output: CombineAccountsContainersResponse,
  errors: [],
}));

/** Move Tag ID out of a Container. */
export interface Move_tag_idAccountsContainersRequest {
  /** GTM Container's API relative path. */
  path: string;
  /** Tag ID to be removed from the current Container. */
  tagId?: string;
  /** The name for the newly created tag. */
  tagName?: string;
  /** Whether or not to copy users from this tag to the new tag. */
  copyUsers?: boolean;
  /** Whether or not to copy tag settings from this tag to the new tag. */
  copySettings?: boolean;
  /** Must be set to true to allow features.user_permissions to change from false to true. If this operation causes an update but this bit is false, the operation will fail. */
  allowUserPermissionFeatureUpdate?: boolean;
  /** Must be set to true to accept all terms of service agreements copied from the current tag to the newly created tag. If this bit is false, the operation will fail. */
  copyTermsOfService?: boolean;
}

export const Move_tag_idAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  tagId: Schema.optional(Schema.String).pipe(T.HttpQuery("tagId")),
  tagName: Schema.optional(Schema.String).pipe(T.HttpQuery("tagName")),
  copyUsers: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("copyUsers")),
  copySettings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("copySettings")),
  allowUserPermissionFeatureUpdate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowUserPermissionFeatureUpdate")),
  copyTermsOfService: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("copyTermsOfService")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}:move_tag_id", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Move_tag_idAccountsContainersRequest>;

export type Move_tag_idAccountsContainersResponse = Container;
export const Move_tag_idAccountsContainersResponse = Container;

export type Move_tag_idAccountsContainersError = CommonErrors;

export const move_tag_idAccountsContainers: API.OperationMethod<Move_tag_idAccountsContainersRequest, Move_tag_idAccountsContainersResponse, Move_tag_idAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Move_tag_idAccountsContainersRequest,
  output: Move_tag_idAccountsContainersResponse,
  errors: [],
}));

/** Deletes a Container. */
export interface DeleteAccountsContainersRequest {
  /** GTM Container's API relative path. */
  path: string;
}

export const DeleteAccountsContainersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersRequest>;

export interface DeleteAccountsContainersResponse {}
export const DeleteAccountsContainersResponse: Schema.Schema<DeleteAccountsContainersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersResponse>;

export type DeleteAccountsContainersError = CommonErrors;

export const deleteAccountsContainers: API.OperationMethod<DeleteAccountsContainersRequest, DeleteAccountsContainersResponse, DeleteAccountsContainersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersRequest,
  output: DeleteAccountsContainersResponse,
  errors: [],
}));

/** Gets a Destination. */
export interface GetAccountsContainersDestinationsRequest {
  /** Google Tag Destination's API relative path. */
  path: string;
}

export const GetAccountsContainersDestinationsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/destinations/{destinationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersDestinationsRequest>;

export type GetAccountsContainersDestinationsResponse = Destination;
export const GetAccountsContainersDestinationsResponse = Destination;

export type GetAccountsContainersDestinationsError = CommonErrors;

export const getAccountsContainersDestinations: API.OperationMethod<GetAccountsContainersDestinationsRequest, GetAccountsContainersDestinationsResponse, GetAccountsContainersDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersDestinationsRequest,
  output: GetAccountsContainersDestinationsResponse,
  errors: [],
}));

/** Lists all Destinations linked to a GTM Container. */
export interface ListAccountsContainersDestinationsRequest {
  /** GTM parent Container's API relative path. */
  parent: string;
}

export const ListAccountsContainersDestinationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/destinations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersDestinationsRequest>;

export type ListAccountsContainersDestinationsResponse = ListDestinationsResponse;
export const ListAccountsContainersDestinationsResponse = ListDestinationsResponse;

export type ListAccountsContainersDestinationsError = CommonErrors;

export const listAccountsContainersDestinations: API.OperationMethod<ListAccountsContainersDestinationsRequest, ListAccountsContainersDestinationsResponse, ListAccountsContainersDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountsContainersDestinationsRequest,
  output: ListAccountsContainersDestinationsResponse,
  errors: [],
}));

/** Adds a Destination to this Container and removes it from the Container to which it is currently linked. */
export interface LinkAccountsContainersDestinationsRequest {
  /** GTM parent Container's API relative path. */
  parent: string;
  /** Destination ID to be linked to the current container. */
  destinationId?: string;
  /** Must be set to true to allow features.user_permissions to change from false to true. If this operation causes an update but this bit is false, the operation will fail. */
  allowUserPermissionFeatureUpdate?: boolean;
}

export const LinkAccountsContainersDestinationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  destinationId: Schema.optional(Schema.String).pipe(T.HttpQuery("destinationId")),
  allowUserPermissionFeatureUpdate: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowUserPermissionFeatureUpdate")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/destinations:link", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LinkAccountsContainersDestinationsRequest>;

export type LinkAccountsContainersDestinationsResponse = Destination;
export const LinkAccountsContainersDestinationsResponse = Destination;

export type LinkAccountsContainersDestinationsError = CommonErrors;

export const linkAccountsContainersDestinations: API.OperationMethod<LinkAccountsContainersDestinationsRequest, LinkAccountsContainersDestinationsResponse, LinkAccountsContainersDestinationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LinkAccountsContainersDestinationsRequest,
  output: LinkAccountsContainersDestinationsResponse,
  errors: [],
}));

/** Creates a Workspace. */
export interface CreateAccountsContainersWorkspacesRequest {
  /** GTM parent Container's API relative path. */
  parent: string;
  /** Request body */
  body?: Workspace;
}

export const CreateAccountsContainersWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Workspace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesRequest>;

export type CreateAccountsContainersWorkspacesResponse = Workspace;
export const CreateAccountsContainersWorkspacesResponse = Workspace;

export type CreateAccountsContainersWorkspacesError = CommonErrors;

export const createAccountsContainersWorkspaces: API.OperationMethod<CreateAccountsContainersWorkspacesRequest, CreateAccountsContainersWorkspacesResponse, CreateAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesRequest,
  output: CreateAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Deletes a Workspace. */
export interface DeleteAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesRequest>;

export interface DeleteAccountsContainersWorkspacesResponse {}
export const DeleteAccountsContainersWorkspacesResponse: Schema.Schema<DeleteAccountsContainersWorkspacesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesResponse>;

export type DeleteAccountsContainersWorkspacesError = CommonErrors;

export const deleteAccountsContainersWorkspaces: API.OperationMethod<DeleteAccountsContainersWorkspacesRequest, DeleteAccountsContainersWorkspacesResponse, DeleteAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesRequest,
  output: DeleteAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Gets a Workspace. */
export interface GetAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesRequest>;

export type GetAccountsContainersWorkspacesResponse = Workspace;
export const GetAccountsContainersWorkspacesResponse = Workspace;

export type GetAccountsContainersWorkspacesError = CommonErrors;

export const getAccountsContainersWorkspaces: API.OperationMethod<GetAccountsContainersWorkspacesRequest, GetAccountsContainersWorkspacesResponse, GetAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesRequest,
  output: GetAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Updates a Workspace. */
export interface UpdateAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the workspace in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Workspace;
}

export const UpdateAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Workspace).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesRequest>;

export type UpdateAccountsContainersWorkspacesResponse = Workspace;
export const UpdateAccountsContainersWorkspacesResponse = Workspace;

export type UpdateAccountsContainersWorkspacesError = CommonErrors;

export const updateAccountsContainersWorkspaces: API.OperationMethod<UpdateAccountsContainersWorkspacesRequest, UpdateAccountsContainersWorkspacesResponse, UpdateAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesRequest,
  output: UpdateAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Lists all Workspaces that belong to a GTM Container. */
export interface ListAccountsContainersWorkspacesRequest {
  /** GTM parent Container's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesRequest>;

export type ListAccountsContainersWorkspacesResponse = ListWorkspacesResponse;
export const ListAccountsContainersWorkspacesResponse = ListWorkspacesResponse;

export type ListAccountsContainersWorkspacesError = CommonErrors;

export const listAccountsContainersWorkspaces = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesRequest,
  output: ListAccountsContainersWorkspacesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities. */
export interface SyncAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
}

export const SyncAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}:sync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SyncAccountsContainersWorkspacesRequest>;

export type SyncAccountsContainersWorkspacesResponse = SyncWorkspaceResponse;
export const SyncAccountsContainersWorkspacesResponse = SyncWorkspaceResponse;

export type SyncAccountsContainersWorkspacesError = CommonErrors;

export const syncAccountsContainersWorkspaces: API.OperationMethod<SyncAccountsContainersWorkspacesRequest, SyncAccountsContainersWorkspacesResponse, SyncAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SyncAccountsContainersWorkspacesRequest,
  output: SyncAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Finds conflicting and modified entities in the workspace. */
export interface GetStatusAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
}

export const GetStatusAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/status" }),
  svc,
) as unknown as Schema.Schema<GetStatusAccountsContainersWorkspacesRequest>;

export type GetStatusAccountsContainersWorkspacesResponse = GetWorkspaceStatusResponse;
export const GetStatusAccountsContainersWorkspacesResponse = GetWorkspaceStatusResponse;

export type GetStatusAccountsContainersWorkspacesError = CommonErrors;

export const getStatusAccountsContainersWorkspaces: API.OperationMethod<GetStatusAccountsContainersWorkspacesRequest, GetStatusAccountsContainersWorkspacesResponse, GetStatusAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStatusAccountsContainersWorkspacesRequest,
  output: GetStatusAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Applies multiple entity changes to a workspace in one call. When creating new entities, their entity IDs must be unique and in correct format. That is, they must start with "new_" and followed by number, e.g. "new_1", "new_2". Example body snippet to create myNewTag under myNewFolder is: ``` "changes": [ { "folder": { "folderId": "new_1", "name": "myNewFolder", ... }, "changeStatus": "added" }, { "tag": { "tagId": "new_2", "name": "myNewTag", "parentFolderId": "new_1", ... }, "changeStatus": "added" } ] ``` */
export interface Bulk_updateAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
  /** Request body */
  body?: ProposedChange;
}

export const Bulk_updateAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  body: Schema.optional(ProposedChange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/bulk_update", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Bulk_updateAccountsContainersWorkspacesRequest>;

export type Bulk_updateAccountsContainersWorkspacesResponse = BulkUpdateWorkspaceResponse;
export const Bulk_updateAccountsContainersWorkspacesResponse = BulkUpdateWorkspaceResponse;

export type Bulk_updateAccountsContainersWorkspacesError = CommonErrors;

export const bulk_updateAccountsContainersWorkspaces: API.OperationMethod<Bulk_updateAccountsContainersWorkspacesRequest, Bulk_updateAccountsContainersWorkspacesResponse, Bulk_updateAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Bulk_updateAccountsContainersWorkspacesRequest,
  output: Bulk_updateAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Resolves a merge conflict for a workspace entity by updating it to the resolved entity passed in the request. */
export interface Resolve_conflictAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the entity_in_workspace in the merge conflict. */
  fingerprint?: string;
  /** Request body */
  body?: Entity;
}

export const Resolve_conflictAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}:resolve_conflict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Resolve_conflictAccountsContainersWorkspacesRequest>;

export interface Resolve_conflictAccountsContainersWorkspacesResponse {}
export const Resolve_conflictAccountsContainersWorkspacesResponse: Schema.Schema<Resolve_conflictAccountsContainersWorkspacesResponse> = Schema.Struct({}) as any as Schema.Schema<Resolve_conflictAccountsContainersWorkspacesResponse>;

export type Resolve_conflictAccountsContainersWorkspacesError = CommonErrors;

export const resolve_conflictAccountsContainersWorkspaces: API.OperationMethod<Resolve_conflictAccountsContainersWorkspacesRequest, Resolve_conflictAccountsContainersWorkspacesResponse, Resolve_conflictAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Resolve_conflictAccountsContainersWorkspacesRequest,
  output: Resolve_conflictAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Quick previews a workspace by creating a fake container version from all entities in the provided workspace. */
export interface Quick_previewAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
}

export const Quick_previewAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}:quick_preview", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Quick_previewAccountsContainersWorkspacesRequest>;

export type Quick_previewAccountsContainersWorkspacesResponse = QuickPreviewResponse;
export const Quick_previewAccountsContainersWorkspacesResponse = QuickPreviewResponse;

export type Quick_previewAccountsContainersWorkspacesError = CommonErrors;

export const quick_previewAccountsContainersWorkspaces: API.OperationMethod<Quick_previewAccountsContainersWorkspacesRequest, Quick_previewAccountsContainersWorkspacesResponse, Quick_previewAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Quick_previewAccountsContainersWorkspacesRequest,
  output: Quick_previewAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Creates a Container Version from the entities present in the workspace, deletes the workspace, and sets the base container version to the newly created version. */
export interface Create_versionAccountsContainersWorkspacesRequest {
  /** GTM Workspace's API relative path. */
  path: string;
  /** Request body */
  body?: CreateContainerVersionRequestVersionOptions;
}

export const Create_versionAccountsContainersWorkspacesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  body: Schema.optional(CreateContainerVersionRequestVersionOptions).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}:create_version", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Create_versionAccountsContainersWorkspacesRequest>;

export type Create_versionAccountsContainersWorkspacesResponse = CreateContainerVersionResponse;
export const Create_versionAccountsContainersWorkspacesResponse = CreateContainerVersionResponse;

export type Create_versionAccountsContainersWorkspacesError = CommonErrors;

export const create_versionAccountsContainersWorkspaces: API.OperationMethod<Create_versionAccountsContainersWorkspacesRequest, Create_versionAccountsContainersWorkspacesResponse, Create_versionAccountsContainersWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Create_versionAccountsContainersWorkspacesRequest,
  output: Create_versionAccountsContainersWorkspacesResponse,
  errors: [],
}));

/** Creates a GTM Variable. */
export interface CreateAccountsContainersWorkspacesVariablesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Variable;
}

export const CreateAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesVariablesRequest>;

export type CreateAccountsContainersWorkspacesVariablesResponse = Variable;
export const CreateAccountsContainersWorkspacesVariablesResponse = Variable;

export type CreateAccountsContainersWorkspacesVariablesError = CommonErrors;

export const createAccountsContainersWorkspacesVariables: API.OperationMethod<CreateAccountsContainersWorkspacesVariablesRequest, CreateAccountsContainersWorkspacesVariablesResponse, CreateAccountsContainersWorkspacesVariablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesVariablesRequest,
  output: CreateAccountsContainersWorkspacesVariablesResponse,
  errors: [],
}));

/** Lists all GTM Variables of a Container. */
export interface ListAccountsContainersWorkspacesVariablesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesVariablesRequest>;

export type ListAccountsContainersWorkspacesVariablesResponse = ListVariablesResponse;
export const ListAccountsContainersWorkspacesVariablesResponse = ListVariablesResponse;

export type ListAccountsContainersWorkspacesVariablesError = CommonErrors;

export const listAccountsContainersWorkspacesVariables = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesVariablesRequest,
  output: ListAccountsContainersWorkspacesVariablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Variable. */
export interface GetAccountsContainersWorkspacesVariablesRequest {
  /** GTM Variable's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables/{variablesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesVariablesRequest>;

export type GetAccountsContainersWorkspacesVariablesResponse = Variable;
export const GetAccountsContainersWorkspacesVariablesResponse = Variable;

export type GetAccountsContainersWorkspacesVariablesError = CommonErrors;

export const getAccountsContainersWorkspacesVariables: API.OperationMethod<GetAccountsContainersWorkspacesVariablesRequest, GetAccountsContainersWorkspacesVariablesResponse, GetAccountsContainersWorkspacesVariablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesVariablesRequest,
  output: GetAccountsContainersWorkspacesVariablesResponse,
  errors: [],
}));

/** Updates a GTM Variable. */
export interface UpdateAccountsContainersWorkspacesVariablesRequest {
  /** GTM Variable's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the variable in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Variable;
}

export const UpdateAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables/{variablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesVariablesRequest>;

export type UpdateAccountsContainersWorkspacesVariablesResponse = Variable;
export const UpdateAccountsContainersWorkspacesVariablesResponse = Variable;

export type UpdateAccountsContainersWorkspacesVariablesError = CommonErrors;

export const updateAccountsContainersWorkspacesVariables: API.OperationMethod<UpdateAccountsContainersWorkspacesVariablesRequest, UpdateAccountsContainersWorkspacesVariablesResponse, UpdateAccountsContainersWorkspacesVariablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesVariablesRequest,
  output: UpdateAccountsContainersWorkspacesVariablesResponse,
  errors: [],
}));

/** Deletes a GTM Variable. */
export interface DeleteAccountsContainersWorkspacesVariablesRequest {
  /** GTM Variable's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables/{variablesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesVariablesRequest>;

export interface DeleteAccountsContainersWorkspacesVariablesResponse {}
export const DeleteAccountsContainersWorkspacesVariablesResponse: Schema.Schema<DeleteAccountsContainersWorkspacesVariablesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesVariablesResponse>;

export type DeleteAccountsContainersWorkspacesVariablesError = CommonErrors;

export const deleteAccountsContainersWorkspacesVariables: API.OperationMethod<DeleteAccountsContainersWorkspacesVariablesRequest, DeleteAccountsContainersWorkspacesVariablesResponse, DeleteAccountsContainersWorkspacesVariablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesVariablesRequest,
  output: DeleteAccountsContainersWorkspacesVariablesResponse,
  errors: [],
}));

/** Reverts changes to a GTM Variable in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesVariablesRequest {
  /** GTM Variable's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the variable in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesVariablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/variables/{variablesId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesVariablesRequest>;

export type RevertAccountsContainersWorkspacesVariablesResponse = RevertVariableResponse;
export const RevertAccountsContainersWorkspacesVariablesResponse = RevertVariableResponse;

export type RevertAccountsContainersWorkspacesVariablesError = CommonErrors;

export const revertAccountsContainersWorkspacesVariables: API.OperationMethod<RevertAccountsContainersWorkspacesVariablesRequest, RevertAccountsContainersWorkspacesVariablesResponse, RevertAccountsContainersWorkspacesVariablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesVariablesRequest,
  output: RevertAccountsContainersWorkspacesVariablesResponse,
  errors: [],
}));

/** Creates one or more GTM Built-In Variables. */
export interface CreateAccountsContainersWorkspacesBuilt_in_variablesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** The types of built-in variables to enable. */
  type?: "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion" | "analyticsClientId" | "analyticsSessionId" | "analyticsSessionNumber" | (string & {})[];
}

export const CreateAccountsContainersWorkspacesBuilt_in_variablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  type: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/built_in_variables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesBuilt_in_variablesRequest>;

export type CreateAccountsContainersWorkspacesBuilt_in_variablesResponse = CreateBuiltInVariableResponse;
export const CreateAccountsContainersWorkspacesBuilt_in_variablesResponse = CreateBuiltInVariableResponse;

export type CreateAccountsContainersWorkspacesBuilt_in_variablesError = CommonErrors;

export const createAccountsContainersWorkspacesBuilt_in_variables: API.OperationMethod<CreateAccountsContainersWorkspacesBuilt_in_variablesRequest, CreateAccountsContainersWorkspacesBuilt_in_variablesResponse, CreateAccountsContainersWorkspacesBuilt_in_variablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesBuilt_in_variablesRequest,
  output: CreateAccountsContainersWorkspacesBuilt_in_variablesResponse,
  errors: [],
}));

/** Deletes one or more GTM Built-In Variables. */
export interface DeleteAccountsContainersWorkspacesBuilt_in_variablesRequest {
  /** GTM BuiltInVariable's API relative path. */
  path: string;
  /** The types of built-in variables to delete. */
  type?: "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion" | "analyticsClientId" | "analyticsSessionId" | "analyticsSessionNumber" | (string & {})[];
}

export const DeleteAccountsContainersWorkspacesBuilt_in_variablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  type: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/built_in_variables" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesBuilt_in_variablesRequest>;

export interface DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse {}
export const DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse: Schema.Schema<DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse>;

export type DeleteAccountsContainersWorkspacesBuilt_in_variablesError = CommonErrors;

export const deleteAccountsContainersWorkspacesBuilt_in_variables: API.OperationMethod<DeleteAccountsContainersWorkspacesBuilt_in_variablesRequest, DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse, DeleteAccountsContainersWorkspacesBuilt_in_variablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesBuilt_in_variablesRequest,
  output: DeleteAccountsContainersWorkspacesBuilt_in_variablesResponse,
  errors: [],
}));

/** Lists all the enabled Built-In Variables of a GTM Container. */
export interface ListAccountsContainersWorkspacesBuilt_in_variablesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesBuilt_in_variablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/built_in_variables" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesBuilt_in_variablesRequest>;

export type ListAccountsContainersWorkspacesBuilt_in_variablesResponse = ListEnabledBuiltInVariablesResponse;
export const ListAccountsContainersWorkspacesBuilt_in_variablesResponse = ListEnabledBuiltInVariablesResponse;

export type ListAccountsContainersWorkspacesBuilt_in_variablesError = CommonErrors;

export const listAccountsContainersWorkspacesBuilt_in_variables = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesBuilt_in_variablesRequest,
  output: ListAccountsContainersWorkspacesBuilt_in_variablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Reverts changes to a GTM Built-In Variables in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesBuilt_in_variablesRequest {
  /** GTM BuiltInVariable's API relative path. */
  path: string;
  /** The type of built-in variable to revert. */
  type?: "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion" | "analyticsClientId" | "analyticsSessionId" | "analyticsSessionNumber" | (string & {});
}

export const RevertAccountsContainersWorkspacesBuilt_in_variablesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/built_in_variables:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesBuilt_in_variablesRequest>;

export type RevertAccountsContainersWorkspacesBuilt_in_variablesResponse = RevertBuiltInVariableResponse;
export const RevertAccountsContainersWorkspacesBuilt_in_variablesResponse = RevertBuiltInVariableResponse;

export type RevertAccountsContainersWorkspacesBuilt_in_variablesError = CommonErrors;

export const revertAccountsContainersWorkspacesBuilt_in_variables: API.OperationMethod<RevertAccountsContainersWorkspacesBuilt_in_variablesRequest, RevertAccountsContainersWorkspacesBuilt_in_variablesResponse, RevertAccountsContainersWorkspacesBuilt_in_variablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesBuilt_in_variablesRequest,
  output: RevertAccountsContainersWorkspacesBuilt_in_variablesResponse,
  errors: [],
}));

/** Creates a GTM Trigger. */
export interface CreateAccountsContainersWorkspacesTriggersRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Trigger;
}

export const CreateAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Trigger).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesTriggersRequest>;

export type CreateAccountsContainersWorkspacesTriggersResponse = Trigger;
export const CreateAccountsContainersWorkspacesTriggersResponse = Trigger;

export type CreateAccountsContainersWorkspacesTriggersError = CommonErrors;

export const createAccountsContainersWorkspacesTriggers: API.OperationMethod<CreateAccountsContainersWorkspacesTriggersRequest, CreateAccountsContainersWorkspacesTriggersResponse, CreateAccountsContainersWorkspacesTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesTriggersRequest,
  output: CreateAccountsContainersWorkspacesTriggersResponse,
  errors: [],
}));

/** Lists all GTM Triggers of a Container. */
export interface ListAccountsContainersWorkspacesTriggersRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesTriggersRequest>;

export type ListAccountsContainersWorkspacesTriggersResponse = ListTriggersResponse;
export const ListAccountsContainersWorkspacesTriggersResponse = ListTriggersResponse;

export type ListAccountsContainersWorkspacesTriggersError = CommonErrors;

export const listAccountsContainersWorkspacesTriggers = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesTriggersRequest,
  output: ListAccountsContainersWorkspacesTriggersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Trigger. */
export interface GetAccountsContainersWorkspacesTriggersRequest {
  /** GTM Trigger's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers/{triggersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesTriggersRequest>;

export type GetAccountsContainersWorkspacesTriggersResponse = Trigger;
export const GetAccountsContainersWorkspacesTriggersResponse = Trigger;

export type GetAccountsContainersWorkspacesTriggersError = CommonErrors;

export const getAccountsContainersWorkspacesTriggers: API.OperationMethod<GetAccountsContainersWorkspacesTriggersRequest, GetAccountsContainersWorkspacesTriggersResponse, GetAccountsContainersWorkspacesTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesTriggersRequest,
  output: GetAccountsContainersWorkspacesTriggersResponse,
  errors: [],
}));

/** Updates a GTM Trigger. */
export interface UpdateAccountsContainersWorkspacesTriggersRequest {
  /** GTM Trigger's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the trigger in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Trigger;
}

export const UpdateAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Trigger).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers/{triggersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesTriggersRequest>;

export type UpdateAccountsContainersWorkspacesTriggersResponse = Trigger;
export const UpdateAccountsContainersWorkspacesTriggersResponse = Trigger;

export type UpdateAccountsContainersWorkspacesTriggersError = CommonErrors;

export const updateAccountsContainersWorkspacesTriggers: API.OperationMethod<UpdateAccountsContainersWorkspacesTriggersRequest, UpdateAccountsContainersWorkspacesTriggersResponse, UpdateAccountsContainersWorkspacesTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesTriggersRequest,
  output: UpdateAccountsContainersWorkspacesTriggersResponse,
  errors: [],
}));

/** Deletes a GTM Trigger. */
export interface DeleteAccountsContainersWorkspacesTriggersRequest {
  /** GTM Trigger's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers/{triggersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesTriggersRequest>;

export interface DeleteAccountsContainersWorkspacesTriggersResponse {}
export const DeleteAccountsContainersWorkspacesTriggersResponse: Schema.Schema<DeleteAccountsContainersWorkspacesTriggersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesTriggersResponse>;

export type DeleteAccountsContainersWorkspacesTriggersError = CommonErrors;

export const deleteAccountsContainersWorkspacesTriggers: API.OperationMethod<DeleteAccountsContainersWorkspacesTriggersRequest, DeleteAccountsContainersWorkspacesTriggersResponse, DeleteAccountsContainersWorkspacesTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesTriggersRequest,
  output: DeleteAccountsContainersWorkspacesTriggersResponse,
  errors: [],
}));

/** Reverts changes to a GTM Trigger in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesTriggersRequest {
  /** GTM Trigger's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the trigger in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesTriggersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/triggers/{triggersId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesTriggersRequest>;

export type RevertAccountsContainersWorkspacesTriggersResponse = RevertTriggerResponse;
export const RevertAccountsContainersWorkspacesTriggersResponse = RevertTriggerResponse;

export type RevertAccountsContainersWorkspacesTriggersError = CommonErrors;

export const revertAccountsContainersWorkspacesTriggers: API.OperationMethod<RevertAccountsContainersWorkspacesTriggersRequest, RevertAccountsContainersWorkspacesTriggersResponse, RevertAccountsContainersWorkspacesTriggersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesTriggersRequest,
  output: RevertAccountsContainersWorkspacesTriggersResponse,
  errors: [],
}));

/** Creates a GTM Tag. */
export interface CreateAccountsContainersWorkspacesTagsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Tag;
}

export const CreateAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesTagsRequest>;

export type CreateAccountsContainersWorkspacesTagsResponse = Tag;
export const CreateAccountsContainersWorkspacesTagsResponse = Tag;

export type CreateAccountsContainersWorkspacesTagsError = CommonErrors;

export const createAccountsContainersWorkspacesTags: API.OperationMethod<CreateAccountsContainersWorkspacesTagsRequest, CreateAccountsContainersWorkspacesTagsResponse, CreateAccountsContainersWorkspacesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesTagsRequest,
  output: CreateAccountsContainersWorkspacesTagsResponse,
  errors: [],
}));

/** Lists all GTM Tags of a Container. */
export interface ListAccountsContainersWorkspacesTagsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesTagsRequest>;

export type ListAccountsContainersWorkspacesTagsResponse = ListTagsResponse;
export const ListAccountsContainersWorkspacesTagsResponse = ListTagsResponse;

export type ListAccountsContainersWorkspacesTagsError = CommonErrors;

export const listAccountsContainersWorkspacesTags = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesTagsRequest,
  output: ListAccountsContainersWorkspacesTagsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Tag. */
export interface GetAccountsContainersWorkspacesTagsRequest {
  /** GTM Tag's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesTagsRequest>;

export type GetAccountsContainersWorkspacesTagsResponse = Tag;
export const GetAccountsContainersWorkspacesTagsResponse = Tag;

export type GetAccountsContainersWorkspacesTagsError = CommonErrors;

export const getAccountsContainersWorkspacesTags: API.OperationMethod<GetAccountsContainersWorkspacesTagsRequest, GetAccountsContainersWorkspacesTagsResponse, GetAccountsContainersWorkspacesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesTagsRequest,
  output: GetAccountsContainersWorkspacesTagsResponse,
  errors: [],
}));

/** Updates a GTM Tag. */
export interface UpdateAccountsContainersWorkspacesTagsRequest {
  /** GTM Tag's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the tag in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Tag;
}

export const UpdateAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags/{tagsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesTagsRequest>;

export type UpdateAccountsContainersWorkspacesTagsResponse = Tag;
export const UpdateAccountsContainersWorkspacesTagsResponse = Tag;

export type UpdateAccountsContainersWorkspacesTagsError = CommonErrors;

export const updateAccountsContainersWorkspacesTags: API.OperationMethod<UpdateAccountsContainersWorkspacesTagsRequest, UpdateAccountsContainersWorkspacesTagsResponse, UpdateAccountsContainersWorkspacesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesTagsRequest,
  output: UpdateAccountsContainersWorkspacesTagsResponse,
  errors: [],
}));

/** Deletes a GTM Tag. */
export interface DeleteAccountsContainersWorkspacesTagsRequest {
  /** GTM Tag's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags/{tagsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesTagsRequest>;

export interface DeleteAccountsContainersWorkspacesTagsResponse {}
export const DeleteAccountsContainersWorkspacesTagsResponse: Schema.Schema<DeleteAccountsContainersWorkspacesTagsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesTagsResponse>;

export type DeleteAccountsContainersWorkspacesTagsError = CommonErrors;

export const deleteAccountsContainersWorkspacesTags: API.OperationMethod<DeleteAccountsContainersWorkspacesTagsRequest, DeleteAccountsContainersWorkspacesTagsResponse, DeleteAccountsContainersWorkspacesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesTagsRequest,
  output: DeleteAccountsContainersWorkspacesTagsResponse,
  errors: [],
}));

/** Reverts changes to a GTM Tag in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesTagsRequest {
  /** GTM Tag's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of thetag in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesTagsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/tags/{tagsId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesTagsRequest>;

export type RevertAccountsContainersWorkspacesTagsResponse = RevertTagResponse;
export const RevertAccountsContainersWorkspacesTagsResponse = RevertTagResponse;

export type RevertAccountsContainersWorkspacesTagsError = CommonErrors;

export const revertAccountsContainersWorkspacesTags: API.OperationMethod<RevertAccountsContainersWorkspacesTagsRequest, RevertAccountsContainersWorkspacesTagsResponse, RevertAccountsContainersWorkspacesTagsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesTagsRequest,
  output: RevertAccountsContainersWorkspacesTagsResponse,
  errors: [],
}));

/** Creates a Google tag config. */
export interface CreateAccountsContainersWorkspacesGtag_configRequest {
  /** Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: GtagConfig;
}

export const CreateAccountsContainersWorkspacesGtag_configRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GtagConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/gtag_config", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesGtag_configRequest>;

export type CreateAccountsContainersWorkspacesGtag_configResponse = GtagConfig;
export const CreateAccountsContainersWorkspacesGtag_configResponse = GtagConfig;

export type CreateAccountsContainersWorkspacesGtag_configError = CommonErrors;

export const createAccountsContainersWorkspacesGtag_config: API.OperationMethod<CreateAccountsContainersWorkspacesGtag_configRequest, CreateAccountsContainersWorkspacesGtag_configResponse, CreateAccountsContainersWorkspacesGtag_configError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesGtag_configRequest,
  output: CreateAccountsContainersWorkspacesGtag_configResponse,
  errors: [],
}));

/** Lists all Google tag configs in a Container. */
export interface ListAccountsContainersWorkspacesGtag_configRequest {
  /** Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesGtag_configRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/gtag_config" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesGtag_configRequest>;

export type ListAccountsContainersWorkspacesGtag_configResponse = ListGtagConfigResponse;
export const ListAccountsContainersWorkspacesGtag_configResponse = ListGtagConfigResponse;

export type ListAccountsContainersWorkspacesGtag_configError = CommonErrors;

export const listAccountsContainersWorkspacesGtag_config = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesGtag_configRequest,
  output: ListAccountsContainersWorkspacesGtag_configResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Google tag config. */
export interface GetAccountsContainersWorkspacesGtag_configRequest {
  /** Google tag config's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesGtag_configRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/gtag_config/{gtag_configId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesGtag_configRequest>;

export type GetAccountsContainersWorkspacesGtag_configResponse = GtagConfig;
export const GetAccountsContainersWorkspacesGtag_configResponse = GtagConfig;

export type GetAccountsContainersWorkspacesGtag_configError = CommonErrors;

export const getAccountsContainersWorkspacesGtag_config: API.OperationMethod<GetAccountsContainersWorkspacesGtag_configRequest, GetAccountsContainersWorkspacesGtag_configResponse, GetAccountsContainersWorkspacesGtag_configError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesGtag_configRequest,
  output: GetAccountsContainersWorkspacesGtag_configResponse,
  errors: [],
}));

/** Updates a Google tag config. */
export interface UpdateAccountsContainersWorkspacesGtag_configRequest {
  /** Google tag config's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the config in storage. */
  fingerprint?: string;
  /** Request body */
  body?: GtagConfig;
}

export const UpdateAccountsContainersWorkspacesGtag_configRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(GtagConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/gtag_config/{gtag_configId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesGtag_configRequest>;

export type UpdateAccountsContainersWorkspacesGtag_configResponse = GtagConfig;
export const UpdateAccountsContainersWorkspacesGtag_configResponse = GtagConfig;

export type UpdateAccountsContainersWorkspacesGtag_configError = CommonErrors;

export const updateAccountsContainersWorkspacesGtag_config: API.OperationMethod<UpdateAccountsContainersWorkspacesGtag_configRequest, UpdateAccountsContainersWorkspacesGtag_configResponse, UpdateAccountsContainersWorkspacesGtag_configError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesGtag_configRequest,
  output: UpdateAccountsContainersWorkspacesGtag_configResponse,
  errors: [],
}));

/** Deletes a Google tag config. */
export interface DeleteAccountsContainersWorkspacesGtag_configRequest {
  /** Google tag config's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesGtag_configRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/gtag_config/{gtag_configId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesGtag_configRequest>;

export interface DeleteAccountsContainersWorkspacesGtag_configResponse {}
export const DeleteAccountsContainersWorkspacesGtag_configResponse: Schema.Schema<DeleteAccountsContainersWorkspacesGtag_configResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesGtag_configResponse>;

export type DeleteAccountsContainersWorkspacesGtag_configError = CommonErrors;

export const deleteAccountsContainersWorkspacesGtag_config: API.OperationMethod<DeleteAccountsContainersWorkspacesGtag_configRequest, DeleteAccountsContainersWorkspacesGtag_configResponse, DeleteAccountsContainersWorkspacesGtag_configError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesGtag_configRequest,
  output: DeleteAccountsContainersWorkspacesGtag_configResponse,
  errors: [],
}));

/** Creates a GTM Custom Template. */
export interface CreateAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: CustomTemplate;
}

export const CreateAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CustomTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesTemplatesRequest>;

export type CreateAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;
export const CreateAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;

export type CreateAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const createAccountsContainersWorkspacesTemplates: API.OperationMethod<CreateAccountsContainersWorkspacesTemplatesRequest, CreateAccountsContainersWorkspacesTemplatesResponse, CreateAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesTemplatesRequest,
  output: CreateAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Imports a GTM Custom Template from Gallery. */
export interface Import_from_galleryAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Owner of the Gallery template to import */
  galleryOwner?: string;
  /** Repository of the Gallery template to import */
  galleryRepository?: string;
  /** SHA version of the Gallery template to import. Defaulted to the latest SHA version if not provided. */
  gallerySha?: string;
  /** Must be set to true to allow Gallery template to be imported into the workspace. If this bit is false, the import operation will fail. */
  acknowledgePermissions?: boolean;
}

export const Import_from_galleryAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  galleryOwner: Schema.optional(Schema.String).pipe(T.HttpQuery("galleryOwner")),
  galleryRepository: Schema.optional(Schema.String).pipe(T.HttpQuery("galleryRepository")),
  gallerySha: Schema.optional(Schema.String).pipe(T.HttpQuery("gallerySha")),
  acknowledgePermissions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("acknowledgePermissions")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates:import_from_gallery", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Import_from_galleryAccountsContainersWorkspacesTemplatesRequest>;

export type Import_from_galleryAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;
export const Import_from_galleryAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;

export type Import_from_galleryAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const import_from_galleryAccountsContainersWorkspacesTemplates: API.OperationMethod<Import_from_galleryAccountsContainersWorkspacesTemplatesRequest, Import_from_galleryAccountsContainersWorkspacesTemplatesResponse, Import_from_galleryAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Import_from_galleryAccountsContainersWorkspacesTemplatesRequest,
  output: Import_from_galleryAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Lists all GTM Templates of a GTM container workspace. */
export interface ListAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesTemplatesRequest>;

export type ListAccountsContainersWorkspacesTemplatesResponse = ListTemplatesResponse;
export const ListAccountsContainersWorkspacesTemplatesResponse = ListTemplatesResponse;

export type ListAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const listAccountsContainersWorkspacesTemplates = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesTemplatesRequest,
  output: ListAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Template. */
export interface GetAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Custom Template's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates/{templatesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesTemplatesRequest>;

export type GetAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;
export const GetAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;

export type GetAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const getAccountsContainersWorkspacesTemplates: API.OperationMethod<GetAccountsContainersWorkspacesTemplatesRequest, GetAccountsContainersWorkspacesTemplatesResponse, GetAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesTemplatesRequest,
  output: GetAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Updates a GTM Template. */
export interface UpdateAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Custom Template's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the templates in storage. */
  fingerprint?: string;
  /** Request body */
  body?: CustomTemplate;
}

export const UpdateAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(CustomTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates/{templatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesTemplatesRequest>;

export type UpdateAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;
export const UpdateAccountsContainersWorkspacesTemplatesResponse = CustomTemplate;

export type UpdateAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const updateAccountsContainersWorkspacesTemplates: API.OperationMethod<UpdateAccountsContainersWorkspacesTemplatesRequest, UpdateAccountsContainersWorkspacesTemplatesResponse, UpdateAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesTemplatesRequest,
  output: UpdateAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Deletes a GTM Template. */
export interface DeleteAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Custom Template's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates/{templatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesTemplatesRequest>;

export interface DeleteAccountsContainersWorkspacesTemplatesResponse {}
export const DeleteAccountsContainersWorkspacesTemplatesResponse: Schema.Schema<DeleteAccountsContainersWorkspacesTemplatesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesTemplatesResponse>;

export type DeleteAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const deleteAccountsContainersWorkspacesTemplates: API.OperationMethod<DeleteAccountsContainersWorkspacesTemplatesRequest, DeleteAccountsContainersWorkspacesTemplatesResponse, DeleteAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesTemplatesRequest,
  output: DeleteAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Reverts changes to a GTM Template in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesTemplatesRequest {
  /** GTM Custom Template's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the template in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesTemplatesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/templates/{templatesId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesTemplatesRequest>;

export type RevertAccountsContainersWorkspacesTemplatesResponse = RevertTemplateResponse;
export const RevertAccountsContainersWorkspacesTemplatesResponse = RevertTemplateResponse;

export type RevertAccountsContainersWorkspacesTemplatesError = CommonErrors;

export const revertAccountsContainersWorkspacesTemplates: API.OperationMethod<RevertAccountsContainersWorkspacesTemplatesRequest, RevertAccountsContainersWorkspacesTemplatesResponse, RevertAccountsContainersWorkspacesTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesTemplatesRequest,
  output: RevertAccountsContainersWorkspacesTemplatesResponse,
  errors: [],
}));

/** Creates a GTM Folder. */
export interface CreateAccountsContainersWorkspacesFoldersRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Folder;
}

export const CreateAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesFoldersRequest>;

export type CreateAccountsContainersWorkspacesFoldersResponse = Folder;
export const CreateAccountsContainersWorkspacesFoldersResponse = Folder;

export type CreateAccountsContainersWorkspacesFoldersError = CommonErrors;

export const createAccountsContainersWorkspacesFolders: API.OperationMethod<CreateAccountsContainersWorkspacesFoldersRequest, CreateAccountsContainersWorkspacesFoldersResponse, CreateAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesFoldersRequest,
  output: CreateAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** Lists all GTM Folders of a Container. */
export interface ListAccountsContainersWorkspacesFoldersRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesFoldersRequest>;

export type ListAccountsContainersWorkspacesFoldersResponse = ListFoldersResponse;
export const ListAccountsContainersWorkspacesFoldersResponse = ListFoldersResponse;

export type ListAccountsContainersWorkspacesFoldersError = CommonErrors;

export const listAccountsContainersWorkspacesFolders = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesFoldersRequest,
  output: ListAccountsContainersWorkspacesFoldersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Folder. */
export interface GetAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesFoldersRequest>;

export type GetAccountsContainersWorkspacesFoldersResponse = Folder;
export const GetAccountsContainersWorkspacesFoldersResponse = Folder;

export type GetAccountsContainersWorkspacesFoldersError = CommonErrors;

export const getAccountsContainersWorkspacesFolders: API.OperationMethod<GetAccountsContainersWorkspacesFoldersRequest, GetAccountsContainersWorkspacesFoldersResponse, GetAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesFoldersRequest,
  output: GetAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** List all entities in a GTM Folder. */
export interface EntitiesAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const EntitiesAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}:entities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EntitiesAccountsContainersWorkspacesFoldersRequest>;

export type EntitiesAccountsContainersWorkspacesFoldersResponse = FolderEntities;
export const EntitiesAccountsContainersWorkspacesFoldersResponse = FolderEntities;

export type EntitiesAccountsContainersWorkspacesFoldersError = CommonErrors;

export const entitiesAccountsContainersWorkspacesFolders = API.makePaginated(() => ({
  input: EntitiesAccountsContainersWorkspacesFoldersRequest,
  output: EntitiesAccountsContainersWorkspacesFoldersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a GTM Folder. */
export interface UpdateAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the folder in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Folder;
}

export const UpdateAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesFoldersRequest>;

export type UpdateAccountsContainersWorkspacesFoldersResponse = Folder;
export const UpdateAccountsContainersWorkspacesFoldersResponse = Folder;

export type UpdateAccountsContainersWorkspacesFoldersError = CommonErrors;

export const updateAccountsContainersWorkspacesFolders: API.OperationMethod<UpdateAccountsContainersWorkspacesFoldersRequest, UpdateAccountsContainersWorkspacesFoldersResponse, UpdateAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesFoldersRequest,
  output: UpdateAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** Deletes a GTM Folder. */
export interface DeleteAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesFoldersRequest>;

export interface DeleteAccountsContainersWorkspacesFoldersResponse {}
export const DeleteAccountsContainersWorkspacesFoldersResponse: Schema.Schema<DeleteAccountsContainersWorkspacesFoldersResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesFoldersResponse>;

export type DeleteAccountsContainersWorkspacesFoldersError = CommonErrors;

export const deleteAccountsContainersWorkspacesFolders: API.OperationMethod<DeleteAccountsContainersWorkspacesFoldersRequest, DeleteAccountsContainersWorkspacesFoldersResponse, DeleteAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesFoldersRequest,
  output: DeleteAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** Moves entities to a GTM Folder. If {folder_id} in the request path equals 0, this will instead move entities out of the folder they currently belong to. */
export interface Move_entities_to_folderAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
  /** The tags to be moved to the folder. */
  tagId?: string[];
  /** The variables to be moved to the folder. */
  variableId?: string[];
  /** The triggers to be moved to the folder. */
  triggerId?: string[];
  /** Request body */
  body?: Folder;
}

export const Move_entities_to_folderAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  tagId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("tagId")),
  variableId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("variableId")),
  triggerId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("triggerId")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}:move_entities_to_folder", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Move_entities_to_folderAccountsContainersWorkspacesFoldersRequest>;

export interface Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse {}
export const Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse: Schema.Schema<Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse> = Schema.Struct({}) as any as Schema.Schema<Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse>;

export type Move_entities_to_folderAccountsContainersWorkspacesFoldersError = CommonErrors;

export const move_entities_to_folderAccountsContainersWorkspacesFolders: API.OperationMethod<Move_entities_to_folderAccountsContainersWorkspacesFoldersRequest, Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse, Move_entities_to_folderAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Move_entities_to_folderAccountsContainersWorkspacesFoldersRequest,
  output: Move_entities_to_folderAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** Reverts changes to a GTM Folder in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesFoldersRequest {
  /** GTM Folder's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the tag in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesFoldersRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/folders/{foldersId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesFoldersRequest>;

export type RevertAccountsContainersWorkspacesFoldersResponse = RevertFolderResponse;
export const RevertAccountsContainersWorkspacesFoldersResponse = RevertFolderResponse;

export type RevertAccountsContainersWorkspacesFoldersError = CommonErrors;

export const revertAccountsContainersWorkspacesFolders: API.OperationMethod<RevertAccountsContainersWorkspacesFoldersRequest, RevertAccountsContainersWorkspacesFoldersResponse, RevertAccountsContainersWorkspacesFoldersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesFoldersRequest,
  output: RevertAccountsContainersWorkspacesFoldersResponse,
  errors: [],
}));

/** Creates a GTM Zone. */
export interface CreateAccountsContainersWorkspacesZonesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Zone;
}

export const CreateAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Zone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesZonesRequest>;

export type CreateAccountsContainersWorkspacesZonesResponse = Zone;
export const CreateAccountsContainersWorkspacesZonesResponse = Zone;

export type CreateAccountsContainersWorkspacesZonesError = CommonErrors;

export const createAccountsContainersWorkspacesZones: API.OperationMethod<CreateAccountsContainersWorkspacesZonesRequest, CreateAccountsContainersWorkspacesZonesResponse, CreateAccountsContainersWorkspacesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesZonesRequest,
  output: CreateAccountsContainersWorkspacesZonesResponse,
  errors: [],
}));

/** Lists all GTM Zones of a GTM container workspace. */
export interface ListAccountsContainersWorkspacesZonesRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesZonesRequest>;

export type ListAccountsContainersWorkspacesZonesResponse = ListZonesResponse;
export const ListAccountsContainersWorkspacesZonesResponse = ListZonesResponse;

export type ListAccountsContainersWorkspacesZonesError = CommonErrors;

export const listAccountsContainersWorkspacesZones = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesZonesRequest,
  output: ListAccountsContainersWorkspacesZonesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Zone. */
export interface GetAccountsContainersWorkspacesZonesRequest {
  /** GTM Zone's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones/{zonesId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesZonesRequest>;

export type GetAccountsContainersWorkspacesZonesResponse = Zone;
export const GetAccountsContainersWorkspacesZonesResponse = Zone;

export type GetAccountsContainersWorkspacesZonesError = CommonErrors;

export const getAccountsContainersWorkspacesZones: API.OperationMethod<GetAccountsContainersWorkspacesZonesRequest, GetAccountsContainersWorkspacesZonesResponse, GetAccountsContainersWorkspacesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesZonesRequest,
  output: GetAccountsContainersWorkspacesZonesResponse,
  errors: [],
}));

/** Updates a GTM Zone. */
export interface UpdateAccountsContainersWorkspacesZonesRequest {
  /** GTM Zone's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the zone in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Zone;
}

export const UpdateAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Zone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones/{zonesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesZonesRequest>;

export type UpdateAccountsContainersWorkspacesZonesResponse = Zone;
export const UpdateAccountsContainersWorkspacesZonesResponse = Zone;

export type UpdateAccountsContainersWorkspacesZonesError = CommonErrors;

export const updateAccountsContainersWorkspacesZones: API.OperationMethod<UpdateAccountsContainersWorkspacesZonesRequest, UpdateAccountsContainersWorkspacesZonesResponse, UpdateAccountsContainersWorkspacesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesZonesRequest,
  output: UpdateAccountsContainersWorkspacesZonesResponse,
  errors: [],
}));

/** Deletes a GTM Zone. */
export interface DeleteAccountsContainersWorkspacesZonesRequest {
  /** GTM Zone's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones/{zonesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesZonesRequest>;

export interface DeleteAccountsContainersWorkspacesZonesResponse {}
export const DeleteAccountsContainersWorkspacesZonesResponse: Schema.Schema<DeleteAccountsContainersWorkspacesZonesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesZonesResponse>;

export type DeleteAccountsContainersWorkspacesZonesError = CommonErrors;

export const deleteAccountsContainersWorkspacesZones: API.OperationMethod<DeleteAccountsContainersWorkspacesZonesRequest, DeleteAccountsContainersWorkspacesZonesResponse, DeleteAccountsContainersWorkspacesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesZonesRequest,
  output: DeleteAccountsContainersWorkspacesZonesResponse,
  errors: [],
}));

/** Reverts changes to a GTM Zone in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesZonesRequest {
  /** GTM Zone's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the zone in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesZonesRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/zones/{zonesId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesZonesRequest>;

export type RevertAccountsContainersWorkspacesZonesResponse = RevertZoneResponse;
export const RevertAccountsContainersWorkspacesZonesResponse = RevertZoneResponse;

export type RevertAccountsContainersWorkspacesZonesError = CommonErrors;

export const revertAccountsContainersWorkspacesZones: API.OperationMethod<RevertAccountsContainersWorkspacesZonesRequest, RevertAccountsContainersWorkspacesZonesResponse, RevertAccountsContainersWorkspacesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesZonesRequest,
  output: RevertAccountsContainersWorkspacesZonesResponse,
  errors: [],
}));

/** Creates a GTM Client. */
export interface CreateAccountsContainersWorkspacesClientsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Client;
}

export const CreateAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesClientsRequest>;

export type CreateAccountsContainersWorkspacesClientsResponse = Client;
export const CreateAccountsContainersWorkspacesClientsResponse = Client;

export type CreateAccountsContainersWorkspacesClientsError = CommonErrors;

export const createAccountsContainersWorkspacesClients: API.OperationMethod<CreateAccountsContainersWorkspacesClientsRequest, CreateAccountsContainersWorkspacesClientsResponse, CreateAccountsContainersWorkspacesClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesClientsRequest,
  output: CreateAccountsContainersWorkspacesClientsResponse,
  errors: [],
}));

/** Lists all GTM Clients of a GTM container workspace. */
export interface ListAccountsContainersWorkspacesClientsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesClientsRequest>;

export type ListAccountsContainersWorkspacesClientsResponse = ListClientsResponse;
export const ListAccountsContainersWorkspacesClientsResponse = ListClientsResponse;

export type ListAccountsContainersWorkspacesClientsError = CommonErrors;

export const listAccountsContainersWorkspacesClients = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesClientsRequest,
  output: ListAccountsContainersWorkspacesClientsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Client. */
export interface GetAccountsContainersWorkspacesClientsRequest {
  /** GTM Client's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients/{clientsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesClientsRequest>;

export type GetAccountsContainersWorkspacesClientsResponse = Client;
export const GetAccountsContainersWorkspacesClientsResponse = Client;

export type GetAccountsContainersWorkspacesClientsError = CommonErrors;

export const getAccountsContainersWorkspacesClients: API.OperationMethod<GetAccountsContainersWorkspacesClientsRequest, GetAccountsContainersWorkspacesClientsResponse, GetAccountsContainersWorkspacesClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesClientsRequest,
  output: GetAccountsContainersWorkspacesClientsResponse,
  errors: [],
}));

/** Updates a GTM Client. */
export interface UpdateAccountsContainersWorkspacesClientsRequest {
  /** GTM Client's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the client in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Client;
}

export const UpdateAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Client).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients/{clientsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesClientsRequest>;

export type UpdateAccountsContainersWorkspacesClientsResponse = Client;
export const UpdateAccountsContainersWorkspacesClientsResponse = Client;

export type UpdateAccountsContainersWorkspacesClientsError = CommonErrors;

export const updateAccountsContainersWorkspacesClients: API.OperationMethod<UpdateAccountsContainersWorkspacesClientsRequest, UpdateAccountsContainersWorkspacesClientsResponse, UpdateAccountsContainersWorkspacesClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesClientsRequest,
  output: UpdateAccountsContainersWorkspacesClientsResponse,
  errors: [],
}));

/** Deletes a GTM Client. */
export interface DeleteAccountsContainersWorkspacesClientsRequest {
  /** GTM Client's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients/{clientsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesClientsRequest>;

export interface DeleteAccountsContainersWorkspacesClientsResponse {}
export const DeleteAccountsContainersWorkspacesClientsResponse: Schema.Schema<DeleteAccountsContainersWorkspacesClientsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesClientsResponse>;

export type DeleteAccountsContainersWorkspacesClientsError = CommonErrors;

export const deleteAccountsContainersWorkspacesClients: API.OperationMethod<DeleteAccountsContainersWorkspacesClientsRequest, DeleteAccountsContainersWorkspacesClientsResponse, DeleteAccountsContainersWorkspacesClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesClientsRequest,
  output: DeleteAccountsContainersWorkspacesClientsResponse,
  errors: [],
}));

/** Reverts changes to a GTM Client in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesClientsRequest {
  /** GTM Client's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the client in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesClientsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/clients/{clientsId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesClientsRequest>;

export type RevertAccountsContainersWorkspacesClientsResponse = RevertClientResponse;
export const RevertAccountsContainersWorkspacesClientsResponse = RevertClientResponse;

export type RevertAccountsContainersWorkspacesClientsError = CommonErrors;

export const revertAccountsContainersWorkspacesClients: API.OperationMethod<RevertAccountsContainersWorkspacesClientsRequest, RevertAccountsContainersWorkspacesClientsResponse, RevertAccountsContainersWorkspacesClientsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesClientsRequest,
  output: RevertAccountsContainersWorkspacesClientsResponse,
  errors: [],
}));

/** Creates a GTM Transformation. */
export interface CreateAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Request body */
  body?: Transformation;
}

export const CreateAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Transformation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersWorkspacesTransformationsRequest>;

export type CreateAccountsContainersWorkspacesTransformationsResponse = Transformation;
export const CreateAccountsContainersWorkspacesTransformationsResponse = Transformation;

export type CreateAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const createAccountsContainersWorkspacesTransformations: API.OperationMethod<CreateAccountsContainersWorkspacesTransformationsRequest, CreateAccountsContainersWorkspacesTransformationsResponse, CreateAccountsContainersWorkspacesTransformationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersWorkspacesTransformationsRequest,
  output: CreateAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
}));

/** Lists all GTM Transformations of a GTM container workspace. */
export interface ListAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Workspace's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersWorkspacesTransformationsRequest>;

export type ListAccountsContainersWorkspacesTransformationsResponse = ListTransformationsResponse;
export const ListAccountsContainersWorkspacesTransformationsResponse = ListTransformationsResponse;

export type ListAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const listAccountsContainersWorkspacesTransformations = API.makePaginated(() => ({
  input: ListAccountsContainersWorkspacesTransformationsRequest,
  output: ListAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Transformation. */
export interface GetAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Transformation's API relative path. */
  path: string;
}

export const GetAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations/{transformationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersWorkspacesTransformationsRequest>;

export type GetAccountsContainersWorkspacesTransformationsResponse = Transformation;
export const GetAccountsContainersWorkspacesTransformationsResponse = Transformation;

export type GetAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const getAccountsContainersWorkspacesTransformations: API.OperationMethod<GetAccountsContainersWorkspacesTransformationsRequest, GetAccountsContainersWorkspacesTransformationsResponse, GetAccountsContainersWorkspacesTransformationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersWorkspacesTransformationsRequest,
  output: GetAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
}));

/** Updates a GTM Transformation. */
export interface UpdateAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Transformation's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the transformation in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Transformation;
}

export const UpdateAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Transformation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations/{transformationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersWorkspacesTransformationsRequest>;

export type UpdateAccountsContainersWorkspacesTransformationsResponse = Transformation;
export const UpdateAccountsContainersWorkspacesTransformationsResponse = Transformation;

export type UpdateAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const updateAccountsContainersWorkspacesTransformations: API.OperationMethod<UpdateAccountsContainersWorkspacesTransformationsRequest, UpdateAccountsContainersWorkspacesTransformationsResponse, UpdateAccountsContainersWorkspacesTransformationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersWorkspacesTransformationsRequest,
  output: UpdateAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
}));

/** Deletes a GTM Transformation. */
export interface DeleteAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Transformation's API relative path. */
  path: string;
}

export const DeleteAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations/{transformationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersWorkspacesTransformationsRequest>;

export interface DeleteAccountsContainersWorkspacesTransformationsResponse {}
export const DeleteAccountsContainersWorkspacesTransformationsResponse: Schema.Schema<DeleteAccountsContainersWorkspacesTransformationsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersWorkspacesTransformationsResponse>;

export type DeleteAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const deleteAccountsContainersWorkspacesTransformations: API.OperationMethod<DeleteAccountsContainersWorkspacesTransformationsRequest, DeleteAccountsContainersWorkspacesTransformationsResponse, DeleteAccountsContainersWorkspacesTransformationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersWorkspacesTransformationsRequest,
  output: DeleteAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
}));

/** Reverts changes to a GTM Transformation in a GTM Workspace. */
export interface RevertAccountsContainersWorkspacesTransformationsRequest {
  /** GTM Transformation's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the transformation in storage. */
  fingerprint?: string;
}

export const RevertAccountsContainersWorkspacesTransformationsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/workspaces/{workspacesId}/transformations/{transformationsId}:revert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevertAccountsContainersWorkspacesTransformationsRequest>;

export type RevertAccountsContainersWorkspacesTransformationsResponse = RevertTransformationResponse;
export const RevertAccountsContainersWorkspacesTransformationsResponse = RevertTransformationResponse;

export type RevertAccountsContainersWorkspacesTransformationsError = CommonErrors;

export const revertAccountsContainersWorkspacesTransformations: API.OperationMethod<RevertAccountsContainersWorkspacesTransformationsRequest, RevertAccountsContainersWorkspacesTransformationsResponse, RevertAccountsContainersWorkspacesTransformationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevertAccountsContainersWorkspacesTransformationsRequest,
  output: RevertAccountsContainersWorkspacesTransformationsResponse,
  errors: [],
}));

/** Gets a Container Version. */
export interface GetAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
  /** The GTM ContainerVersion ID. Specify published to retrieve the currently published version. */
  containerVersionId?: string;
}

export const GetAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  containerVersionId: Schema.optional(Schema.String).pipe(T.HttpQuery("containerVersionId")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersVersionsRequest>;

export type GetAccountsContainersVersionsResponse = ContainerVersion;
export const GetAccountsContainersVersionsResponse = ContainerVersion;

export type GetAccountsContainersVersionsError = CommonErrors;

export const getAccountsContainersVersions: API.OperationMethod<GetAccountsContainersVersionsRequest, GetAccountsContainersVersionsResponse, GetAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersVersionsRequest,
  output: GetAccountsContainersVersionsResponse,
  errors: [],
}));

/** Updates a Container Version. */
export interface UpdateAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the container version in storage. */
  fingerprint?: string;
  /** Request body */
  body?: ContainerVersion;
}

export const UpdateAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(ContainerVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersVersionsRequest>;

export type UpdateAccountsContainersVersionsResponse = ContainerVersion;
export const UpdateAccountsContainersVersionsResponse = ContainerVersion;

export type UpdateAccountsContainersVersionsError = CommonErrors;

export const updateAccountsContainersVersions: API.OperationMethod<UpdateAccountsContainersVersionsRequest, UpdateAccountsContainersVersionsResponse, UpdateAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersVersionsRequest,
  output: UpdateAccountsContainersVersionsResponse,
  errors: [],
}));

/** Deletes a Container Version. */
export interface DeleteAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
}

export const DeleteAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersVersionsRequest>;

export interface DeleteAccountsContainersVersionsResponse {}
export const DeleteAccountsContainersVersionsResponse: Schema.Schema<DeleteAccountsContainersVersionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersVersionsResponse>;

export type DeleteAccountsContainersVersionsError = CommonErrors;

export const deleteAccountsContainersVersions: API.OperationMethod<DeleteAccountsContainersVersionsRequest, DeleteAccountsContainersVersionsResponse, DeleteAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersVersionsRequest,
  output: DeleteAccountsContainersVersionsResponse,
  errors: [],
}));

/** Undeletes a Container Version. */
export interface UndeleteAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
}

export const UndeleteAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteAccountsContainersVersionsRequest>;

export type UndeleteAccountsContainersVersionsResponse = ContainerVersion;
export const UndeleteAccountsContainersVersionsResponse = ContainerVersion;

export type UndeleteAccountsContainersVersionsError = CommonErrors;

export const undeleteAccountsContainersVersions: API.OperationMethod<UndeleteAccountsContainersVersionsRequest, UndeleteAccountsContainersVersionsResponse, UndeleteAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteAccountsContainersVersionsRequest,
  output: UndeleteAccountsContainersVersionsResponse,
  errors: [],
}));

/** Publishes a Container Version. */
export interface PublishAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the container version in storage. */
  fingerprint?: string;
}

export const PublishAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}:publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishAccountsContainersVersionsRequest>;

export type PublishAccountsContainersVersionsResponse = PublishContainerVersionResponse;
export const PublishAccountsContainersVersionsResponse = PublishContainerVersionResponse;

export type PublishAccountsContainersVersionsError = CommonErrors;

export const publishAccountsContainersVersions: API.OperationMethod<PublishAccountsContainersVersionsRequest, PublishAccountsContainersVersionsResponse, PublishAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishAccountsContainersVersionsRequest,
  output: PublishAccountsContainersVersionsResponse,
  errors: [],
}));

/** Sets the latest version used for synchronization of workspaces when detecting conflicts and errors. */
export interface Set_latestAccountsContainersVersionsRequest {
  /** GTM ContainerVersion's API relative path. */
  path: string;
}

export const Set_latestAccountsContainersVersionsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions/{versionsId}:set_latest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Set_latestAccountsContainersVersionsRequest>;

export type Set_latestAccountsContainersVersionsResponse = ContainerVersion;
export const Set_latestAccountsContainersVersionsResponse = ContainerVersion;

export type Set_latestAccountsContainersVersionsError = CommonErrors;

export const set_latestAccountsContainersVersions: API.OperationMethod<Set_latestAccountsContainersVersionsRequest, Set_latestAccountsContainersVersionsResponse, Set_latestAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Set_latestAccountsContainersVersionsRequest,
  output: Set_latestAccountsContainersVersionsResponse,
  errors: [],
}));

/** Gets the live (i.e. published) container version */
export interface LiveAccountsContainersVersionsRequest {
  /** GTM Container's API relative path. */
  parent: string;
}

export const LiveAccountsContainersVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/versions:live" }),
  svc,
) as unknown as Schema.Schema<LiveAccountsContainersVersionsRequest>;

export type LiveAccountsContainersVersionsResponse = ContainerVersion;
export const LiveAccountsContainersVersionsResponse = ContainerVersion;

export type LiveAccountsContainersVersionsError = CommonErrors;

export const liveAccountsContainersVersions: API.OperationMethod<LiveAccountsContainersVersionsRequest, LiveAccountsContainersVersionsResponse, LiveAccountsContainersVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LiveAccountsContainersVersionsRequest,
  output: LiveAccountsContainersVersionsResponse,
  errors: [],
}));

/** Lists all Container Versions of a GTM Container. */
export interface ListAccountsContainersVersion_headersRequest {
  /** GTM Container's API relative path. */
  parent: string;
  /** Also retrieve deleted (archived) versions when true. */
  includeDeleted?: boolean;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersVersion_headersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  includeDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeleted")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/version_headers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersVersion_headersRequest>;

export type ListAccountsContainersVersion_headersResponse = ListContainerVersionsResponse;
export const ListAccountsContainersVersion_headersResponse = ListContainerVersionsResponse;

export type ListAccountsContainersVersion_headersError = CommonErrors;

export const listAccountsContainersVersion_headers = API.makePaginated(() => ({
  input: ListAccountsContainersVersion_headersRequest,
  output: ListAccountsContainersVersion_headersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest container version header */
export interface LatestAccountsContainersVersion_headersRequest {
  /** GTM Container's API relative path. */
  parent: string;
}

export const LatestAccountsContainersVersion_headersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/version_headers:latest" }),
  svc,
) as unknown as Schema.Schema<LatestAccountsContainersVersion_headersRequest>;

export type LatestAccountsContainersVersion_headersResponse = ContainerVersionHeader;
export const LatestAccountsContainersVersion_headersResponse = ContainerVersionHeader;

export type LatestAccountsContainersVersion_headersError = CommonErrors;

export const latestAccountsContainersVersion_headers: API.OperationMethod<LatestAccountsContainersVersion_headersRequest, LatestAccountsContainersVersion_headersResponse, LatestAccountsContainersVersion_headersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LatestAccountsContainersVersion_headersRequest,
  output: LatestAccountsContainersVersion_headersResponse,
  errors: [],
}));

/** Creates a GTM Environment. */
export interface CreateAccountsContainersEnvironmentsRequest {
  /** GTM Container's API relative path. */
  parent: string;
  /** Request body */
  body?: Environment;
}

export const CreateAccountsContainersEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersEnvironmentsRequest>;

export type CreateAccountsContainersEnvironmentsResponse = Environment;
export const CreateAccountsContainersEnvironmentsResponse = Environment;

export type CreateAccountsContainersEnvironmentsError = CommonErrors;

export const createAccountsContainersEnvironments: API.OperationMethod<CreateAccountsContainersEnvironmentsRequest, CreateAccountsContainersEnvironmentsResponse, CreateAccountsContainersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsContainersEnvironmentsRequest,
  output: CreateAccountsContainersEnvironmentsResponse,
  errors: [],
}));

/** Lists all GTM Environments of a GTM Container. */
export interface ListAccountsContainersEnvironmentsRequest {
  /** GTM Container's API relative path. */
  parent: string;
  /** Continuation token for fetching the next page of results. */
  pageToken?: string;
}

export const ListAccountsContainersEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersEnvironmentsRequest>;

export type ListAccountsContainersEnvironmentsResponse = ListEnvironmentsResponse;
export const ListAccountsContainersEnvironmentsResponse = ListEnvironmentsResponse;

export type ListAccountsContainersEnvironmentsError = CommonErrors;

export const listAccountsContainersEnvironments = API.makePaginated(() => ({
  input: ListAccountsContainersEnvironmentsRequest,
  output: ListAccountsContainersEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GTM Environment. */
export interface GetAccountsContainersEnvironmentsRequest {
  /** GTM Environment's API relative path. */
  path: string;
}

export const GetAccountsContainersEnvironmentsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersEnvironmentsRequest>;

export type GetAccountsContainersEnvironmentsResponse = Environment;
export const GetAccountsContainersEnvironmentsResponse = Environment;

export type GetAccountsContainersEnvironmentsError = CommonErrors;

export const getAccountsContainersEnvironments: API.OperationMethod<GetAccountsContainersEnvironmentsRequest, GetAccountsContainersEnvironmentsResponse, GetAccountsContainersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsContainersEnvironmentsRequest,
  output: GetAccountsContainersEnvironmentsResponse,
  errors: [],
}));

/** Updates a GTM Environment. */
export interface UpdateAccountsContainersEnvironmentsRequest {
  /** GTM Environment's API relative path. */
  path: string;
  /** When provided, this fingerprint must match the fingerprint of the environment in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Environment;
}

export const UpdateAccountsContainersEnvironmentsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersEnvironmentsRequest>;

export type UpdateAccountsContainersEnvironmentsResponse = Environment;
export const UpdateAccountsContainersEnvironmentsResponse = Environment;

export type UpdateAccountsContainersEnvironmentsError = CommonErrors;

export const updateAccountsContainersEnvironments: API.OperationMethod<UpdateAccountsContainersEnvironmentsRequest, UpdateAccountsContainersEnvironmentsResponse, UpdateAccountsContainersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAccountsContainersEnvironmentsRequest,
  output: UpdateAccountsContainersEnvironmentsResponse,
  errors: [],
}));

/** Deletes a GTM Environment. */
export interface DeleteAccountsContainersEnvironmentsRequest {
  /** GTM Environment's API relative path. */
  path: string;
}

export const DeleteAccountsContainersEnvironmentsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
}).pipe(
  T.Http({ method: "DELETE", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersEnvironmentsRequest>;

export interface DeleteAccountsContainersEnvironmentsResponse {}
export const DeleteAccountsContainersEnvironmentsResponse: Schema.Schema<DeleteAccountsContainersEnvironmentsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersEnvironmentsResponse>;

export type DeleteAccountsContainersEnvironmentsError = CommonErrors;

export const deleteAccountsContainersEnvironments: API.OperationMethod<DeleteAccountsContainersEnvironmentsRequest, DeleteAccountsContainersEnvironmentsResponse, DeleteAccountsContainersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsContainersEnvironmentsRequest,
  output: DeleteAccountsContainersEnvironmentsResponse,
  errors: [],
}));

/** Re-generates the authorization code for a GTM Environment. */
export interface ReauthorizeAccountsContainersEnvironmentsRequest {
  /** GTM Environment's API relative path. */
  path: string;
  /** Request body */
  body?: Environment;
}

export const ReauthorizeAccountsContainersEnvironmentsRequest = Schema.Struct({
  path: Schema.String.pipe(T.HttpPath("path")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "tagmanager/v2/accounts/{accountsId}/containers/{containersId}/environments/{environmentsId}:reauthorize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReauthorizeAccountsContainersEnvironmentsRequest>;

export type ReauthorizeAccountsContainersEnvironmentsResponse = Environment;
export const ReauthorizeAccountsContainersEnvironmentsResponse = Environment;

export type ReauthorizeAccountsContainersEnvironmentsError = CommonErrors;

export const reauthorizeAccountsContainersEnvironments: API.OperationMethod<ReauthorizeAccountsContainersEnvironmentsRequest, ReauthorizeAccountsContainersEnvironmentsResponse, ReauthorizeAccountsContainersEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReauthorizeAccountsContainersEnvironmentsRequest,
  output: ReauthorizeAccountsContainersEnvironmentsResponse,
  errors: [],
}));

