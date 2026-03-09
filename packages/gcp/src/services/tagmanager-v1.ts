// ==========================================================================
// Tag Manager API (tagmanager v1)
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
  name: "tagmanager",
  version: "v1",
  rootUrl: "https://tagmanager.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Container {
  /** GTM Account ID. */
  accountId?: string;
  /** Container Notes. */
  notes?: string;
  /** Optional list of domain names associated with the Container. */
  domainName?: Array<string>;
  /** Container Time Zone ID. */
  timeZoneId?: string;
  /** Container display name. */
  name?: string;
  /** Container Country ID. */
  timeZoneCountryId?: string;
  /** List of enabled built-in variables. Valid values include: pageUrl, pageHostname, pagePath, referrer, event, clickElement, clickClasses, clickId, clickTarget, clickUrl, clickText, formElement, formClasses, formId, formTarget, formUrl, formText, errorMessage, errorUrl, errorLine, newHistoryFragment, oldHistoryFragment, newHistoryState, oldHistoryState, historySource, containerVersion, debugMode, randomNumber, containerId. */
  enabledBuiltInVariable?: Array<
    | "pageUrl"
    | "pageHostname"
    | "pagePath"
    | "referrer"
    | "event"
    | "clickElement"
    | "clickClasses"
    | "clickId"
    | "clickTarget"
    | "clickUrl"
    | "clickText"
    | "firstPartyServingUrl"
    | "formElement"
    | "formClasses"
    | "formId"
    | "formTarget"
    | "formUrl"
    | "formText"
    | "environmentName"
    | "errorMessage"
    | "errorUrl"
    | "errorLine"
    | "newHistoryUrl"
    | "oldHistoryUrl"
    | "newHistoryFragment"
    | "oldHistoryFragment"
    | "newHistoryState"
    | "oldHistoryState"
    | "historySource"
    | "containerVersion"
    | "debugMode"
    | "randomNumber"
    | "containerId"
    | "appId"
    | "appName"
    | "appVersionCode"
    | "appVersionName"
    | "language"
    | "osVersion"
    | "platform"
    | "sdkVersion"
    | "deviceName"
    | "resolution"
    | "advertiserId"
    | "advertisingTrackingEnabled"
    | "htmlId"
    | "ampBrowserLanguage"
    | "ampCanonicalPath"
    | "ampCanonicalUrl"
    | "ampCanonicalHost"
    | "ampReferrer"
    | "ampTitle"
    | "ampClientId"
    | "ampClientTimezone"
    | "ampClientTimestamp"
    | "ampClientScreenWidth"
    | "ampClientScreenHeight"
    | "ampClientScrollX"
    | "ampClientScrollY"
    | "ampClientMaxScrollX"
    | "ampClientMaxScrollY"
    | "ampTotalEngagedTime"
    | "ampPageViewId"
    | "ampPageLoadTime"
    | "ampPageDownloadTime"
    | "ampGtmEvent"
    | "eventName"
    | "firebaseEventParameterCampaign"
    | "firebaseEventParameterCampaignAclid"
    | "firebaseEventParameterCampaignAnid"
    | "firebaseEventParameterCampaignClickTimestamp"
    | "firebaseEventParameterCampaignContent"
    | "firebaseEventParameterCampaignCp1"
    | "firebaseEventParameterCampaignGclid"
    | "firebaseEventParameterCampaignSource"
    | "firebaseEventParameterCampaignTerm"
    | "firebaseEventParameterCurrency"
    | "firebaseEventParameterDynamicLinkAcceptTime"
    | "firebaseEventParameterDynamicLinkLinkid"
    | "firebaseEventParameterNotificationMessageDeviceTime"
    | "firebaseEventParameterNotificationMessageId"
    | "firebaseEventParameterNotificationMessageName"
    | "firebaseEventParameterNotificationMessageTime"
    | "firebaseEventParameterNotificationTopic"
    | "firebaseEventParameterPreviousAppVersion"
    | "firebaseEventParameterPreviousOsVersion"
    | "firebaseEventParameterPrice"
    | "firebaseEventParameterProductId"
    | "firebaseEventParameterQuantity"
    | "firebaseEventParameterValue"
    | "videoProvider"
    | "videoUrl"
    | "videoTitle"
    | "videoDuration"
    | "videoPercent"
    | "videoVisible"
    | "videoStatus"
    | "videoCurrentTime"
    | "scrollDepthThreshold"
    | "scrollDepthUnits"
    | "scrollDepthDirection"
    | "elementVisibilityRatio"
    | "elementVisibilityTime"
    | "elementVisibilityFirstTime"
    | "elementVisibilityRecentTime"
    | "analyticsClientId"
    | "analyticsSessionId"
    | "analyticsSessionNumber"
    | (string & {})
  >;
  /** The Container ID uniquely identifies the GTM Container. */
  containerId?: string;
  /** List of Usage Contexts for the Container. Valid values include: web, android, ios. */
  usageContext?: Array<
    | "web"
    | "android"
    | "ios"
    | "androidSdk5"
    | "iosSdk5"
    | "amp"
    | (string & {})
  >;
  /** The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified. */
  fingerprint?: string;
  /** Container Public ID. */
  publicId?: string;
}

export const Container: Schema.Schema<Container> = Schema.suspend(() =>
  Schema.Struct({
    accountId: Schema.optional(Schema.String),
    notes: Schema.optional(Schema.String),
    domainName: Schema.optional(Schema.Array(Schema.String)),
    timeZoneId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    timeZoneCountryId: Schema.optional(Schema.String),
    enabledBuiltInVariable: Schema.optional(Schema.Array(Schema.String)),
    containerId: Schema.optional(Schema.String),
    usageContext: Schema.optional(Schema.Array(Schema.String)),
    fingerprint: Schema.optional(Schema.String),
    publicId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Container" }) as any as Schema.Schema<Container>;

export interface TeardownTag {
  /** The name of the teardown tag. */
  tagName?: string;
  /** If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status. */
  stopTeardownOnFailure?: boolean;
}

export const TeardownTag: Schema.Schema<TeardownTag> = Schema.suspend(() =>
  Schema.Struct({
    tagName: Schema.optional(Schema.String),
    stopTeardownOnFailure: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "TeardownTag" }) as any as Schema.Schema<TeardownTag>;

export interface Folder {
  /** Folder display name. */
  name?: string;
  /** The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified. */
  fingerprint?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The Folder ID uniquely identifies the GTM Folder. */
  folderId?: string;
  /** GTM Account ID. */
  accountId?: string;
}

export const Folder: Schema.Schema<Folder> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    fingerprint: Schema.optional(Schema.String),
    containerId: Schema.optional(Schema.String),
    folderId: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Folder" }) as any as Schema.Schema<Folder>;

export interface ContainerAccess {
  /** List of Container permissions. Valid container permissions are: read, edit, delete, publish. */
  permission?: Array<
    | "read"
    | "edit"
    | "publish"
    | "delete"
    | "manage"
    | "editWorkspace"
    | (string & {})
  >;
  /** GTM Container ID. */
  containerId?: string;
}

export const ContainerAccess: Schema.Schema<ContainerAccess> = Schema.suspend(
  () =>
    Schema.Struct({
      permission: Schema.optional(Schema.Array(Schema.String)),
      containerId: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ContainerAccess",
}) as any as Schema.Schema<ContainerAccess>;

export interface Environment {
  /** The environment display name. Can be set or changed only on USER type environments. */
  name?: string;
  /** The type of this environment. */
  type?: "user" | "live" | "latest" | "draft" | (string & {});
  /** The environment authorization code. */
  authorizationCode?: string;
  /** GTM Environment ID uniquely identifies the GTM Environment. */
  environmentId?: string;
  /** The last update time-stamp for the authorization code. */
  authorizationTimestampMs?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** Whether or not to enable debug by default on for the environment. */
  enableDebug?: boolean;
  /** Default preview page url for the environment. */
  url?: string;
  /** The fingerprint of the GTM environment as computed at storage time. This value is recomputed whenever the environment is modified. */
  fingerprint?: string;
  /** The environment description. Can be set or changed only on USER type environments. */
  description?: string;
  /** GTM Container ID. */
  containerId?: string;
  containerVersionId?: string;
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    authorizationCode: Schema.optional(Schema.String),
    environmentId: Schema.optional(Schema.String),
    authorizationTimestampMs: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    enableDebug: Schema.optional(Schema.Boolean),
    url: Schema.optional(Schema.String),
    fingerprint: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    containerId: Schema.optional(Schema.String),
    containerVersionId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface Parameter {
  /** This list parameter's parameters (keys will be ignored). */
  list?: Array<Parameter>;
  /** The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values. */
  key?: string;
  /** A parameter's value (may contain variable references). as appropriate to the specified type. */
  value?: string;
  /** This map parameter's parameters (must have keys; keys must be unique). */
  map?: Array<Parameter>;
  /** The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name */
  type?:
    | "template"
    | "integer"
    | "boolean"
    | "list"
    | "map"
    | "triggerReference"
    | "tagReference"
    | (string & {});
}

export const Parameter: Schema.Schema<Parameter> = Schema.suspend(() =>
  Schema.Struct({
    list: Schema.optional(Schema.Array(Parameter)),
    key: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
    map: Schema.optional(Schema.Array(Parameter)),
    type: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Parameter" }) as any as Schema.Schema<Parameter>;

export interface Variable {
  /** GTM Container ID. */
  containerId?: string;
  /** User notes on how to apply this variable in the container. */
  notes?: string;
  /** For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set. */
  disablingTriggerId?: Array<string>;
  /** Variable display name. */
  name?: string;
  /** Parent folder id. */
  parentFolderId?: string;
  /** The start timestamp in milliseconds to schedule a variable. */
  scheduleStartMs?: string;
  /** The end timestamp in milliseconds to schedule a variable. */
  scheduleEndMs?: string;
  /** For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set. */
  enablingTriggerId?: Array<string>;
  /** The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified. */
  fingerprint?: string;
  /** GTM Account ID. */
  accountId?: string;
  /** The variable's parameters. */
  parameter?: Array<Parameter>;
  /** The Variable ID uniquely identifies the GTM Variable. */
  variableId?: string;
  /** GTM Variable Type. */
  type?: string;
}

export const Variable: Schema.Schema<Variable> = Schema.suspend(() =>
  Schema.Struct({
    containerId: Schema.optional(Schema.String),
    notes: Schema.optional(Schema.String),
    disablingTriggerId: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    parentFolderId: Schema.optional(Schema.String),
    scheduleStartMs: Schema.optional(Schema.String),
    scheduleEndMs: Schema.optional(Schema.String),
    enablingTriggerId: Schema.optional(Schema.Array(Schema.String)),
    fingerprint: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    parameter: Schema.optional(Schema.Array(Parameter)),
    variableId: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Variable" }) as any as Schema.Schema<Variable>;

export interface SetupTag {
  /** The name of the setup tag. */
  tagName?: string;
  /** If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status. */
  stopOnSetupFailure?: boolean;
}

export const SetupTag: Schema.Schema<SetupTag> = Schema.suspend(() =>
  Schema.Struct({
    tagName: Schema.optional(Schema.String),
    stopOnSetupFailure: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "SetupTag" }) as any as Schema.Schema<SetupTag>;

export interface Tag {
  /** If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode). */
  liveOnly?: boolean;
  /** GTM Account ID. */
  accountId?: string;
  /** The tag's parameters. */
  parameter?: Array<Parameter>;
  /** GTM Tag Type. */
  type?: string;
  /** True if the tag is paused. */
  paused?: boolean;
  /** The Tag ID uniquely identifies the GTM Tag. */
  tagId?: string;
  /** Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false. */
  firingTriggerId?: Array<string>;
  /** Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire. */
  blockingTriggerId?: Array<string>;
  /** The end timestamp in milliseconds to schedule a tag. */
  scheduleEndMs?: string;
  /** The start timestamp in milliseconds to schedule a tag. */
  scheduleStartMs?: string;
  /** The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified. */
  fingerprint?: string;
  /** User notes on how to apply this tag in the container. */
  notes?: string;
  /** Option to fire this tag. */
  tagFiringOption?:
    | "unlimited"
    | "oncePerEvent"
    | "oncePerLoad"
    | (string & {});
  /** User defined numeric priority of the tag. Tags are fired asynchronously in order of priority. Tags with higher numeric value fire first. A tag's priority can be a positive or negative value. The default value is 0. */
  priority?: Parameter;
  /** The list of teardown tags. Currently we only allow one. */
  teardownTag?: Array<TeardownTag>;
  /** Parent folder id. */
  parentFolderId?: string;
  /** Tag display name. */
  name?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The list of setup tags. Currently we only allow one. */
  setupTag?: Array<SetupTag>;
}

export const Tag: Schema.Schema<Tag> = Schema.suspend(() =>
  Schema.Struct({
    liveOnly: Schema.optional(Schema.Boolean),
    accountId: Schema.optional(Schema.String),
    parameter: Schema.optional(Schema.Array(Parameter)),
    type: Schema.optional(Schema.String),
    paused: Schema.optional(Schema.Boolean),
    tagId: Schema.optional(Schema.String),
    firingTriggerId: Schema.optional(Schema.Array(Schema.String)),
    blockingTriggerId: Schema.optional(Schema.Array(Schema.String)),
    scheduleEndMs: Schema.optional(Schema.String),
    scheduleStartMs: Schema.optional(Schema.String),
    fingerprint: Schema.optional(Schema.String),
    notes: Schema.optional(Schema.String),
    tagFiringOption: Schema.optional(Schema.String),
    priority: Schema.optional(Parameter),
    teardownTag: Schema.optional(Schema.Array(TeardownTag)),
    parentFolderId: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    containerId: Schema.optional(Schema.String),
    setupTag: Schema.optional(Schema.Array(SetupTag)),
  }),
).annotate({ identifier: "Tag" }) as any as Schema.Schema<Tag>;

export interface Condition {
  /** The type of operator for this condition. */
  type?:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "matchRegex"
    | "greater"
    | "greaterOrEquals"
    | "less"
    | "lessOrEquals"
    | "cssSelector"
    | "urlMatches"
    | (string & {});
  /** A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true. */
  parameter?: Array<Parameter>;
}

export const Condition: Schema.Schema<Condition> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    parameter: Schema.optional(Schema.Array(Parameter)),
  }),
).annotate({ identifier: "Condition" }) as any as Schema.Schema<Condition>;

export interface Trigger {
  /** A visibility trigger minimum continuous visible time (in milliseconds). Only valid for AMP Visibility trigger. */
  continuousTimeMinMilliseconds?: Parameter;
  /** Parent folder id. */
  parentFolderId?: string;
  /** A visibility trigger maximum percent visibility. Only valid for AMP Visibility trigger. */
  visiblePercentageMax?: Parameter;
  /** Name of the GTM event that is fired. Only valid for Timer triggers. */
  eventName?: Parameter;
  /** The trigger will only fire iff all Conditions are true. */
  filter?: Array<Condition>;
  /** The fingerprint of the GTM Trigger as computed at storage time. This value is recomputed whenever the trigger is modified. */
  fingerprint?: string;
  /** Used in the case of custom event, which is fired iff all Conditions are true. */
  customEventFilter?: Array<Condition>;
  /** Globally unique id of the trigger that auto-generates this (a Form Submit, Link Click or Timer listener) if any. Used to make incompatible auto-events work together with trigger filtering based on trigger ids. This value is populated during output generation since the tags implied by triggers don't exist until then. Only valid for Form Submit, Link Click and Timer triggers. */
  uniqueTriggerId?: Parameter;
  /** Defines the data layer event that causes this trigger. */
  type?:
    | "pageview"
    | "domReady"
    | "windowLoaded"
    | "customEvent"
    | "triggerGroup"
    | "always"
    | "formSubmission"
    | "click"
    | "linkClick"
    | "jsError"
    | "historyChange"
    | "timer"
    | "ampClick"
    | "ampTimer"
    | "ampScroll"
    | "ampVisibility"
    | "youTubeVideo"
    | "scrollDepth"
    | "elementVisibility"
    | (string & {});
  /** Whether or not we should only fire tags if the form submit or link click event is not cancelled by some other event handler (e.g. because of validation). Only valid for Form Submission and Link Click triggers. */
  checkValidation?: Parameter;
  /** The Trigger ID uniquely identifies the GTM Trigger. */
  triggerId?: string;
  /** A visibility trigger minimum percent visibility. Only valid for AMP Visibility trigger. */
  visiblePercentageMin?: Parameter;
  /** GTM Account ID. */
  accountId?: string;
  /** Time between Timer Events to fire (in seconds). Only valid for AMP Timer trigger. */
  intervalSeconds?: Parameter;
  /** Limit of the number of GTM events this Timer Trigger will fire. If no limit is set, we will continue to fire GTM events until the user leaves the page. Only valid for Timer triggers. */
  limit?: Parameter;
  /** Max time to fire Timer Events (in seconds). Only valid for AMP Timer trigger. */
  maxTimerLengthSeconds?: Parameter;
  /** Used in the case of auto event tracking. */
  autoEventFilter?: Array<Condition>;
  /** A click trigger CSS selector (i.e. "a", "button" etc.). Only valid for AMP Click trigger. */
  selector?: Parameter;
  /** List of integer percentage values for scroll triggers. The trigger will fire when each percentage is reached when the view is scrolled vertically. Only valid for AMP scroll triggers. */
  verticalScrollPercentageList?: Parameter;
  /** GTM Container ID. */
  containerId?: string;
  /** A visibility trigger minimum total visible time (in milliseconds). Only valid for AMP Visibility trigger. */
  totalTimeMinMilliseconds?: Parameter;
  /** Whether or not we should delay the form submissions or link opening until all of the tags have fired (by preventing the default action and later simulating the default action). Only valid for Form Submission and Link Click triggers. */
  waitForTags?: Parameter;
  /** Trigger display name. */
  name?: string;
  /** Time between triggering recurring Timer Events (in milliseconds). Only valid for Timer triggers. */
  interval?: Parameter;
  /** How long to wait (in milliseconds) for tags to fire when 'waits_for_tags' above evaluates to true. Only valid for Form Submission and Link Click triggers. */
  waitForTagsTimeout?: Parameter;
  /** A visibility trigger CSS selector (i.e. "#id"). Only valid for AMP Visibility trigger. */
  visibilitySelector?: Parameter;
  /** Additional parameters. */
  parameter?: Array<Parameter>;
  /** List of integer percentage values for scroll triggers. The trigger will fire when each percentage is reached when the view is scrolled horizontally. Only valid for AMP scroll triggers. */
  horizontalScrollPercentageList?: Parameter;
}

export const Trigger: Schema.Schema<Trigger> = Schema.suspend(() =>
  Schema.Struct({
    continuousTimeMinMilliseconds: Schema.optional(Parameter),
    parentFolderId: Schema.optional(Schema.String),
    visiblePercentageMax: Schema.optional(Parameter),
    eventName: Schema.optional(Parameter),
    filter: Schema.optional(Schema.Array(Condition)),
    fingerprint: Schema.optional(Schema.String),
    customEventFilter: Schema.optional(Schema.Array(Condition)),
    uniqueTriggerId: Schema.optional(Parameter),
    type: Schema.optional(Schema.String),
    checkValidation: Schema.optional(Parameter),
    triggerId: Schema.optional(Schema.String),
    visiblePercentageMin: Schema.optional(Parameter),
    accountId: Schema.optional(Schema.String),
    intervalSeconds: Schema.optional(Parameter),
    limit: Schema.optional(Parameter),
    maxTimerLengthSeconds: Schema.optional(Parameter),
    autoEventFilter: Schema.optional(Schema.Array(Condition)),
    selector: Schema.optional(Parameter),
    verticalScrollPercentageList: Schema.optional(Parameter),
    containerId: Schema.optional(Schema.String),
    totalTimeMinMilliseconds: Schema.optional(Parameter),
    waitForTags: Schema.optional(Parameter),
    name: Schema.optional(Schema.String),
    interval: Schema.optional(Parameter),
    waitForTagsTimeout: Schema.optional(Parameter),
    visibilitySelector: Schema.optional(Parameter),
    parameter: Schema.optional(Schema.Array(Parameter)),
    horizontalScrollPercentageList: Schema.optional(Parameter),
  }),
).annotate({ identifier: "Trigger" }) as any as Schema.Schema<Trigger>;

export interface ContainerVersion {
  /** GTM Account ID. */
  accountId?: string;
  /** User notes on how to apply this container version in the container. */
  notes?: string;
  /** The variables in the container that this version was taken from. */
  variable?: Array<Variable>;
  /** A value of true indicates this container version has been deleted. */
  deleted?: boolean;
  /** Container version display name. */
  name?: string;
  /** The tags in the container that this version was taken from. */
  tag?: Array<Tag>;
  /** The triggers in the container that this version was taken from. */
  trigger?: Array<Trigger>;
  /** The folders in the container that this version was taken from. */
  folder?: Array<Folder>;
  /** The Container Version ID uniquely identifies the GTM Container Version. */
  containerVersionId?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** The fingerprint of the GTM Container Version as computed at storage time. This value is recomputed whenever the container version is modified. */
  fingerprint?: string;
  /** The container that this version was taken from. */
  container?: Container;
}

export const ContainerVersion: Schema.Schema<ContainerVersion> = Schema.suspend(
  () =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      notes: Schema.optional(Schema.String),
      variable: Schema.optional(Schema.Array(Variable)),
      deleted: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      tag: Schema.optional(Schema.Array(Tag)),
      trigger: Schema.optional(Schema.Array(Trigger)),
      folder: Schema.optional(Schema.Array(Folder)),
      containerVersionId: Schema.optional(Schema.String),
      containerId: Schema.optional(Schema.String),
      fingerprint: Schema.optional(Schema.String),
      container: Schema.optional(Container),
    }),
).annotate({
  identifier: "ContainerVersion",
}) as any as Schema.Schema<ContainerVersion>;

export interface CreateContainerVersionResponse {
  /** Compiler errors or not. */
  compilerError?: boolean;
  /** The container version created. */
  containerVersion?: ContainerVersion;
}

export const CreateContainerVersionResponse: Schema.Schema<CreateContainerVersionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      compilerError: Schema.optional(Schema.Boolean),
      containerVersion: Schema.optional(ContainerVersion),
    }),
  ).annotate({
    identifier: "CreateContainerVersionResponse",
  }) as any as Schema.Schema<CreateContainerVersionResponse>;

export interface ListEnvironmentsResponse {
  /** All Environments of a GTM Container. */
  environments?: Array<Environment>;
}

export const ListEnvironmentsResponse: Schema.Schema<ListEnvironmentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      environments: Schema.optional(Schema.Array(Environment)),
    }),
  ).annotate({
    identifier: "ListEnvironmentsResponse",
  }) as any as Schema.Schema<ListEnvironmentsResponse>;

export interface FolderEntities {
  /** The list of tags inside the folder. */
  tag?: Array<Tag>;
  /** The list of triggers inside the folder. */
  trigger?: Array<Trigger>;
  /** The list of variables inside the folder. */
  variable?: Array<Variable>;
}

export const FolderEntities: Schema.Schema<FolderEntities> = Schema.suspend(
  () =>
    Schema.Struct({
      tag: Schema.optional(Schema.Array(Tag)),
      trigger: Schema.optional(Schema.Array(Trigger)),
      variable: Schema.optional(Schema.Array(Variable)),
    }),
).annotate({
  identifier: "FolderEntities",
}) as any as Schema.Schema<FolderEntities>;

export interface ListVariablesResponse {
  /** All GTM Variables of a GTM Container. */
  variables?: Array<Variable>;
}

export const ListVariablesResponse: Schema.Schema<ListVariablesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      variables: Schema.optional(Schema.Array(Variable)),
    }),
  ).annotate({
    identifier: "ListVariablesResponse",
  }) as any as Schema.Schema<ListVariablesResponse>;

export interface ListTagsResponse {
  /** All GTM Tags of a GTM Container. */
  tags?: Array<Tag>;
}

export const ListTagsResponse: Schema.Schema<ListTagsResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      tags: Schema.optional(Schema.Array(Tag)),
    }),
).annotate({
  identifier: "ListTagsResponse",
}) as any as Schema.Schema<ListTagsResponse>;

export interface PublishContainerVersionResponse {
  /** Compiler errors or not. */
  compilerError?: boolean;
  /** The container version created. */
  containerVersion?: ContainerVersion;
}

export const PublishContainerVersionResponse: Schema.Schema<PublishContainerVersionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      compilerError: Schema.optional(Schema.Boolean),
      containerVersion: Schema.optional(ContainerVersion),
    }),
  ).annotate({
    identifier: "PublishContainerVersionResponse",
  }) as any as Schema.Schema<PublishContainerVersionResponse>;

export interface AccountAccess {
  /** List of Account permissions. Valid account permissions are read and manage. */
  permission?: Array<
    | "read"
    | "edit"
    | "publish"
    | "delete"
    | "manage"
    | "editWorkspace"
    | (string & {})
  >;
}

export const AccountAccess: Schema.Schema<AccountAccess> = Schema.suspend(() =>
  Schema.Struct({
    permission: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "AccountAccess",
}) as any as Schema.Schema<AccountAccess>;

export interface ListFoldersResponse {
  /** All GTM Folders of a GTM Container. */
  folders?: Array<Folder>;
}

export const ListFoldersResponse: Schema.Schema<ListFoldersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      folders: Schema.optional(Schema.Array(Folder)),
    }),
  ).annotate({
    identifier: "ListFoldersResponse",
  }) as any as Schema.Schema<ListFoldersResponse>;

export interface Account {
  /** Account display name. */
  name?: string;
  /** The fingerprint of the GTM Account as computed at storage time. This value is recomputed whenever the account is modified. */
  fingerprint?: string;
  /** The Account ID uniquely identifies the GTM Account. */
  accountId?: string;
  /** Whether the account shares data anonymously with Google and others. */
  shareData?: boolean;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    fingerprint: Schema.optional(Schema.String),
    accountId: Schema.optional(Schema.String),
    shareData: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListAccountsResponse {
  /** List of GTM Accounts that a user has access to. */
  accounts?: Array<Account>;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      accounts: Schema.optional(Schema.Array(Account)),
    }),
  ).annotate({
    identifier: "ListAccountsResponse",
  }) as any as Schema.Schema<ListAccountsResponse>;

export interface ContainerVersionHeader {
  /** GTM Account ID. */
  accountId?: string;
  /** The Container Version ID uniquely identifies the GTM Container Version. */
  containerVersionId?: string;
  /** Number of tags in the container version. */
  numTags?: string;
  /** Number of variables in the container version. */
  numVariables?: string;
  /** GTM Container ID. */
  containerId?: string;
  /** Number of triggers in the container version. */
  numTriggers?: string;
  /** A value of true indicates this container version has been deleted. */
  deleted?: boolean;
  /** Container version display name. */
  name?: string;
}

export const ContainerVersionHeader: Schema.Schema<ContainerVersionHeader> =
  Schema.suspend(() =>
    Schema.Struct({
      accountId: Schema.optional(Schema.String),
      containerVersionId: Schema.optional(Schema.String),
      numTags: Schema.optional(Schema.String),
      numVariables: Schema.optional(Schema.String),
      containerId: Schema.optional(Schema.String),
      numTriggers: Schema.optional(Schema.String),
      deleted: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContainerVersionHeader",
  }) as any as Schema.Schema<ContainerVersionHeader>;

export interface ListContainerVersionsResponse {
  /** All versions of a GTM Container. */
  containerVersion?: Array<ContainerVersion>;
  /** All container version headers of a GTM Container. */
  containerVersionHeader?: Array<ContainerVersionHeader>;
}

export const ListContainerVersionsResponse: Schema.Schema<ListContainerVersionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      containerVersion: Schema.optional(Schema.Array(ContainerVersion)),
      containerVersionHeader: Schema.optional(
        Schema.Array(ContainerVersionHeader),
      ),
    }),
  ).annotate({
    identifier: "ListContainerVersionsResponse",
  }) as any as Schema.Schema<ListContainerVersionsResponse>;

export interface UserAccess {
  /** User's email address. */
  emailAddress?: string;
  /** Account Permission ID. */
  permissionId?: string;
  /** GTM Account access permissions. */
  accountAccess?: AccountAccess;
  /** GTM Container access permissions. */
  containerAccess?: Array<ContainerAccess>;
  /** GTM Account ID. */
  accountId?: string;
}

export const UserAccess: Schema.Schema<UserAccess> = Schema.suspend(() =>
  Schema.Struct({
    emailAddress: Schema.optional(Schema.String),
    permissionId: Schema.optional(Schema.String),
    accountAccess: Schema.optional(AccountAccess),
    containerAccess: Schema.optional(Schema.Array(ContainerAccess)),
    accountId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "UserAccess" }) as any as Schema.Schema<UserAccess>;

export interface ListAccountUsersResponse {
  /** All GTM AccountUsers of a GTM Account. */
  userAccess?: Array<UserAccess>;
}

export const ListAccountUsersResponse: Schema.Schema<ListAccountUsersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      userAccess: Schema.optional(Schema.Array(UserAccess)),
    }),
  ).annotate({
    identifier: "ListAccountUsersResponse",
  }) as any as Schema.Schema<ListAccountUsersResponse>;

export interface CreateContainerVersionRequestVersionOptions {
  /** The notes of the container version to be created. */
  notes?: string;
  /** The creation of this version may be for quick preview and shouldn't be saved. */
  quickPreview?: boolean;
  /** The name of the container version to be created. */
  name?: string;
}

export const CreateContainerVersionRequestVersionOptions: Schema.Schema<CreateContainerVersionRequestVersionOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      notes: Schema.optional(Schema.String),
      quickPreview: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateContainerVersionRequestVersionOptions",
  }) as any as Schema.Schema<CreateContainerVersionRequestVersionOptions>;

export interface ListContainersResponse {
  /** All Containers of a GTM Account. */
  containers?: Array<Container>;
}

export const ListContainersResponse: Schema.Schema<ListContainersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      containers: Schema.optional(Schema.Array(Container)),
    }),
  ).annotate({
    identifier: "ListContainersResponse",
  }) as any as Schema.Schema<ListContainersResponse>;

export interface ListTriggersResponse {
  /** All GTM Triggers of a GTM Container. */
  triggers?: Array<Trigger>;
}

export const ListTriggersResponse: Schema.Schema<ListTriggersResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      triggers: Schema.optional(Schema.Array(Trigger)),
    }),
  ).annotate({
    identifier: "ListTriggersResponse",
  }) as any as Schema.Schema<ListTriggersResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAccountsRequest {}

export const ListAccountsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v1/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse_Op = ListAccountsResponse;
export const ListAccountsResponse_Op = ListAccountsResponse;

export type ListAccountsError = DefaultErrors;

/** Lists all GTM Accounts that a user has access to. */
export const listAccounts: API.OperationMethod<
  ListAccountsRequest,
  ListAccountsResponse_Op,
  ListAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse_Op,
  errors: [],
}));

export interface GetAccountsRequest {
  /** The GTM Account ID. */
  accountId: string;
}

export const GetAccountsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({ method: "GET", path: "tagmanager/v1/accounts/{accountId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = DefaultErrors;

/** Gets a GTM Account. */
export const getAccounts: API.OperationMethod<
  GetAccountsRequest,
  GetAccountsResponse,
  GetAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

export interface UpdateAccountsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** When provided, this fingerprint must match the fingerprint of the account in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Account;
}

export const UpdateAccountsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsRequest>;

export type UpdateAccountsResponse = Account;
export const UpdateAccountsResponse = Account;

export type UpdateAccountsError = DefaultErrors;

/** Updates a GTM Account. */
export const updateAccounts: API.OperationMethod<
  UpdateAccountsRequest,
  UpdateAccountsResponse,
  UpdateAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsRequest,
  output: UpdateAccountsResponse,
  errors: [],
}));

export interface DeleteAccountsPermissionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM User ID. */
  permissionId: string;
}

export const DeleteAccountsPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/permissions/{permissionId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsPermissionsRequest>;

export interface DeleteAccountsPermissionsResponse {}
export const DeleteAccountsPermissionsResponse: Schema.Schema<DeleteAccountsPermissionsResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeleteAccountsPermissionsResponse>;

export type DeleteAccountsPermissionsError = DefaultErrors;

/** Removes a user from the account, revoking access to it and all of its containers. */
export const deleteAccountsPermissions: API.OperationMethod<
  DeleteAccountsPermissionsRequest,
  DeleteAccountsPermissionsResponse,
  DeleteAccountsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsPermissionsRequest,
  output: DeleteAccountsPermissionsResponse,
  errors: [],
}));

export interface GetAccountsPermissionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM User ID. */
  permissionId: string;
}

export const GetAccountsPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/permissions/{permissionId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsPermissionsRequest>;

export type GetAccountsPermissionsResponse = UserAccess;
export const GetAccountsPermissionsResponse = UserAccess;

export type GetAccountsPermissionsError = DefaultErrors;

/** Gets a user's Account & Container Permissions. */
export const getAccountsPermissions: API.OperationMethod<
  GetAccountsPermissionsRequest,
  GetAccountsPermissionsResponse,
  GetAccountsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsPermissionsRequest,
  output: GetAccountsPermissionsResponse,
  errors: [],
}));

export interface UpdateAccountsPermissionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM User ID. */
  permissionId: string;
  /** Request body */
  body?: UserAccess;
}

export const UpdateAccountsPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  permissionId: Schema.String.pipe(T.HttpPath("permissionId")),
  body: Schema.optional(UserAccess).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/permissions/{permissionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsPermissionsRequest>;

export type UpdateAccountsPermissionsResponse = UserAccess;
export const UpdateAccountsPermissionsResponse = UserAccess;

export type UpdateAccountsPermissionsError = DefaultErrors;

/** Updates a user's Account & Container Permissions. */
export const updateAccountsPermissions: API.OperationMethod<
  UpdateAccountsPermissionsRequest,
  UpdateAccountsPermissionsResponse,
  UpdateAccountsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsPermissionsRequest,
  output: UpdateAccountsPermissionsResponse,
  errors: [],
}));

export interface CreateAccountsPermissionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** Request body */
  body?: UserAccess;
}

export const CreateAccountsPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(UserAccess).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/permissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsPermissionsRequest>;

export type CreateAccountsPermissionsResponse = UserAccess;
export const CreateAccountsPermissionsResponse = UserAccess;

export type CreateAccountsPermissionsError = DefaultErrors;

/** Creates a user's Account & Container Permissions. */
export const createAccountsPermissions: API.OperationMethod<
  CreateAccountsPermissionsRequest,
  CreateAccountsPermissionsResponse,
  CreateAccountsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsPermissionsRequest,
  output: CreateAccountsPermissionsResponse,
  errors: [],
}));

export interface ListAccountsPermissionsRequest {
  /** The GTM Account ID. */
  accountId: string;
}

export const ListAccountsPermissionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/permissions",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsPermissionsRequest>;

export type ListAccountsPermissionsResponse = ListAccountUsersResponse;
export const ListAccountsPermissionsResponse = ListAccountUsersResponse;

export type ListAccountsPermissionsError = DefaultErrors;

/** List all users that have access to the account along with Account and Container Permissions granted to each of them. */
export const listAccountsPermissions: API.OperationMethod<
  ListAccountsPermissionsRequest,
  ListAccountsPermissionsResponse,
  ListAccountsPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsPermissionsRequest,
  output: ListAccountsPermissionsResponse,
  errors: [],
}));

export interface CreateAccountsContainersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** Request body */
  body?: Container;
}

export const CreateAccountsContainersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  body: Schema.optional(Container).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersRequest>;

export type CreateAccountsContainersResponse = Container;
export const CreateAccountsContainersResponse = Container;

export type CreateAccountsContainersError = DefaultErrors;

/** Creates a Container. */
export const createAccountsContainers: API.OperationMethod<
  CreateAccountsContainersRequest,
  CreateAccountsContainersResponse,
  CreateAccountsContainersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersRequest,
  output: CreateAccountsContainersResponse,
  errors: [],
}));

export interface ListAccountsContainersRequest {
  /** The GTM Account ID. */
  accountId: string;
}

export const ListAccountsContainersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersRequest>;

export type ListAccountsContainersResponse = ListContainersResponse;
export const ListAccountsContainersResponse = ListContainersResponse;

export type ListAccountsContainersError = DefaultErrors;

/** Lists all Containers that belongs to a GTM Account. */
export const listAccountsContainers: API.OperationMethod<
  ListAccountsContainersRequest,
  ListAccountsContainersResponse,
  ListAccountsContainersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersRequest,
  output: ListAccountsContainersResponse,
  errors: [],
}));

export interface DeleteAccountsContainersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const DeleteAccountsContainersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersRequest>;

export interface DeleteAccountsContainersResponse {}
export const DeleteAccountsContainersResponse: Schema.Schema<DeleteAccountsContainersResponse> =
  Schema.Struct({}) as any as Schema.Schema<DeleteAccountsContainersResponse>;

export type DeleteAccountsContainersError = DefaultErrors;

/** Deletes a Container. */
export const deleteAccountsContainers: API.OperationMethod<
  DeleteAccountsContainersRequest,
  DeleteAccountsContainersResponse,
  DeleteAccountsContainersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersRequest,
  output: DeleteAccountsContainersResponse,
  errors: [],
}));

export interface GetAccountsContainersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const GetAccountsContainersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersRequest>;

export type GetAccountsContainersResponse = Container;
export const GetAccountsContainersResponse = Container;

export type GetAccountsContainersError = DefaultErrors;

/** Gets a Container. */
export const getAccountsContainers: API.OperationMethod<
  GetAccountsContainersRequest,
  GetAccountsContainersResponse,
  GetAccountsContainersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersRequest,
  output: GetAccountsContainersResponse,
  errors: [],
}));

export interface UpdateAccountsContainersRequest {
  /** When provided, this fingerprint must match the fingerprint of the container in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Container;
}

export const UpdateAccountsContainersRequest = Schema.Struct({
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Container).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersRequest>;

export type UpdateAccountsContainersResponse = Container;
export const UpdateAccountsContainersResponse = Container;

export type UpdateAccountsContainersError = DefaultErrors;

/** Updates a Container. */
export const updateAccountsContainers: API.OperationMethod<
  UpdateAccountsContainersRequest,
  UpdateAccountsContainersResponse,
  UpdateAccountsContainersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersRequest,
  output: UpdateAccountsContainersResponse,
  errors: [],
}));

export interface GetAccountsContainersVariablesRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Variable ID. */
  variableId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const GetAccountsContainersVariablesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  variableId: Schema.String.pipe(T.HttpPath("variableId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersVariablesRequest>;

export type GetAccountsContainersVariablesResponse = Variable;
export const GetAccountsContainersVariablesResponse = Variable;

export type GetAccountsContainersVariablesError = DefaultErrors;

/** Gets a GTM Variable. */
export const getAccountsContainersVariables: API.OperationMethod<
  GetAccountsContainersVariablesRequest,
  GetAccountsContainersVariablesResponse,
  GetAccountsContainersVariablesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersVariablesRequest,
  output: GetAccountsContainersVariablesResponse,
  errors: [],
}));

export interface UpdateAccountsContainersVariablesRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Variable ID. */
  variableId: string;
  /** When provided, this fingerprint must match the fingerprint of the variable in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Variable;
}

export const UpdateAccountsContainersVariablesRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  variableId: Schema.String.pipe(T.HttpPath("variableId")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersVariablesRequest>;

export type UpdateAccountsContainersVariablesResponse = Variable;
export const UpdateAccountsContainersVariablesResponse = Variable;

export type UpdateAccountsContainersVariablesError = DefaultErrors;

/** Updates a GTM Variable. */
export const updateAccountsContainersVariables: API.OperationMethod<
  UpdateAccountsContainersVariablesRequest,
  UpdateAccountsContainersVariablesResponse,
  UpdateAccountsContainersVariablesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersVariablesRequest,
  output: UpdateAccountsContainersVariablesResponse,
  errors: [],
}));

export interface DeleteAccountsContainersVariablesRequest {
  /** The GTM Variable ID. */
  variableId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const DeleteAccountsContainersVariablesRequest = Schema.Struct({
  variableId: Schema.String.pipe(T.HttpPath("variableId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersVariablesRequest>;

export interface DeleteAccountsContainersVariablesResponse {}
export const DeleteAccountsContainersVariablesResponse: Schema.Schema<DeleteAccountsContainersVariablesResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersVariablesResponse>;

export type DeleteAccountsContainersVariablesError = DefaultErrors;

/** Deletes a GTM Variable. */
export const deleteAccountsContainersVariables: API.OperationMethod<
  DeleteAccountsContainersVariablesRequest,
  DeleteAccountsContainersVariablesResponse,
  DeleteAccountsContainersVariablesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersVariablesRequest,
  output: DeleteAccountsContainersVariablesResponse,
  errors: [],
}));

export interface ListAccountsContainersVariablesRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const ListAccountsContainersVariablesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersVariablesRequest>;

export type ListAccountsContainersVariablesResponse = ListVariablesResponse;
export const ListAccountsContainersVariablesResponse = ListVariablesResponse;

export type ListAccountsContainersVariablesError = DefaultErrors;

/** Lists all GTM Variables of a Container. */
export const listAccountsContainersVariables: API.OperationMethod<
  ListAccountsContainersVariablesRequest,
  ListAccountsContainersVariablesResponse,
  ListAccountsContainersVariablesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersVariablesRequest,
  output: ListAccountsContainersVariablesResponse,
  errors: [],
}));

export interface CreateAccountsContainersVariablesRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Variable;
}

export const CreateAccountsContainersVariablesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Variable).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersVariablesRequest>;

export type CreateAccountsContainersVariablesResponse = Variable;
export const CreateAccountsContainersVariablesResponse = Variable;

export type CreateAccountsContainersVariablesError = DefaultErrors;

/** Creates a GTM Variable. */
export const createAccountsContainersVariables: API.OperationMethod<
  CreateAccountsContainersVariablesRequest,
  CreateAccountsContainersVariablesResponse,
  CreateAccountsContainersVariablesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersVariablesRequest,
  output: CreateAccountsContainersVariablesResponse,
  errors: [],
}));

export interface DeleteAccountsContainersTriggersRequest {
  /** The GTM Trigger ID. */
  triggerId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
}

export const DeleteAccountsContainersTriggersRequest = Schema.Struct({
  triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersTriggersRequest>;

export interface DeleteAccountsContainersTriggersResponse {}
export const DeleteAccountsContainersTriggersResponse: Schema.Schema<DeleteAccountsContainersTriggersResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersTriggersResponse>;

export type DeleteAccountsContainersTriggersError = DefaultErrors;

/** Deletes a GTM Trigger. */
export const deleteAccountsContainersTriggers: API.OperationMethod<
  DeleteAccountsContainersTriggersRequest,
  DeleteAccountsContainersTriggersResponse,
  DeleteAccountsContainersTriggersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersTriggersRequest,
  output: DeleteAccountsContainersTriggersResponse,
  errors: [],
}));

export interface GetAccountsContainersTriggersRequest {
  /** The GTM Trigger ID. */
  triggerId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
}

export const GetAccountsContainersTriggersRequest = Schema.Struct({
  triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersTriggersRequest>;

export type GetAccountsContainersTriggersResponse = Trigger;
export const GetAccountsContainersTriggersResponse = Trigger;

export type GetAccountsContainersTriggersError = DefaultErrors;

/** Gets a GTM Trigger. */
export const getAccountsContainersTriggers: API.OperationMethod<
  GetAccountsContainersTriggersRequest,
  GetAccountsContainersTriggersResponse,
  GetAccountsContainersTriggersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersTriggersRequest,
  output: GetAccountsContainersTriggersResponse,
  errors: [],
}));

export interface UpdateAccountsContainersTriggersRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Trigger ID. */
  triggerId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** When provided, this fingerprint must match the fingerprint of the trigger in storage. */
  fingerprint?: string;
  /** Request body */
  body?: Trigger;
}

export const UpdateAccountsContainersTriggersRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  triggerId: Schema.String.pipe(T.HttpPath("triggerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  body: Schema.optional(Trigger).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers/{triggerId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersTriggersRequest>;

export type UpdateAccountsContainersTriggersResponse = Trigger;
export const UpdateAccountsContainersTriggersResponse = Trigger;

export type UpdateAccountsContainersTriggersError = DefaultErrors;

/** Updates a GTM Trigger. */
export const updateAccountsContainersTriggers: API.OperationMethod<
  UpdateAccountsContainersTriggersRequest,
  UpdateAccountsContainersTriggersResponse,
  UpdateAccountsContainersTriggersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersTriggersRequest,
  output: UpdateAccountsContainersTriggersResponse,
  errors: [],
}));

export interface CreateAccountsContainersTriggersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Trigger;
}

export const CreateAccountsContainersTriggersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Trigger).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersTriggersRequest>;

export type CreateAccountsContainersTriggersResponse = Trigger;
export const CreateAccountsContainersTriggersResponse = Trigger;

export type CreateAccountsContainersTriggersError = DefaultErrors;

/** Creates a GTM Trigger. */
export const createAccountsContainersTriggers: API.OperationMethod<
  CreateAccountsContainersTriggersRequest,
  CreateAccountsContainersTriggersResponse,
  CreateAccountsContainersTriggersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersTriggersRequest,
  output: CreateAccountsContainersTriggersResponse,
  errors: [],
}));

export interface ListAccountsContainersTriggersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const ListAccountsContainersTriggersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/triggers",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersTriggersRequest>;

export type ListAccountsContainersTriggersResponse = ListTriggersResponse;
export const ListAccountsContainersTriggersResponse = ListTriggersResponse;

export type ListAccountsContainersTriggersError = DefaultErrors;

/** Lists all GTM Triggers of a Container. */
export const listAccountsContainersTriggers: API.OperationMethod<
  ListAccountsContainersTriggersRequest,
  ListAccountsContainersTriggersResponse,
  ListAccountsContainersTriggersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersTriggersRequest,
  output: ListAccountsContainersTriggersResponse,
  errors: [],
}));

export interface DeleteAccountsContainersEnvironmentsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Environment ID. */
  environmentId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const DeleteAccountsContainersEnvironmentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  environmentId: Schema.String.pipe(T.HttpPath("environmentId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersEnvironmentsRequest>;

export interface DeleteAccountsContainersEnvironmentsResponse {}
export const DeleteAccountsContainersEnvironmentsResponse: Schema.Schema<DeleteAccountsContainersEnvironmentsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersEnvironmentsResponse>;

export type DeleteAccountsContainersEnvironmentsError = DefaultErrors;

/** Deletes a GTM Environment. */
export const deleteAccountsContainersEnvironments: API.OperationMethod<
  DeleteAccountsContainersEnvironmentsRequest,
  DeleteAccountsContainersEnvironmentsResponse,
  DeleteAccountsContainersEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersEnvironmentsRequest,
  output: DeleteAccountsContainersEnvironmentsResponse,
  errors: [],
}));

export interface GetAccountsContainersEnvironmentsRequest {
  /** The GTM Environment ID. */
  environmentId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
}

export const GetAccountsContainersEnvironmentsRequest = Schema.Struct({
  environmentId: Schema.String.pipe(T.HttpPath("environmentId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersEnvironmentsRequest>;

export type GetAccountsContainersEnvironmentsResponse = Environment;
export const GetAccountsContainersEnvironmentsResponse = Environment;

export type GetAccountsContainersEnvironmentsError = DefaultErrors;

/** Gets a GTM Environment. */
export const getAccountsContainersEnvironments: API.OperationMethod<
  GetAccountsContainersEnvironmentsRequest,
  GetAccountsContainersEnvironmentsResponse,
  GetAccountsContainersEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersEnvironmentsRequest,
  output: GetAccountsContainersEnvironmentsResponse,
  errors: [],
}));

export interface UpdateAccountsContainersEnvironmentsRequest {
  /** When provided, this fingerprint must match the fingerprint of the environment in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Environment ID. */
  environmentId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Environment;
}

export const UpdateAccountsContainersEnvironmentsRequest = Schema.Struct({
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  environmentId: Schema.String.pipe(T.HttpPath("environmentId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments/{environmentId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersEnvironmentsRequest>;

export type UpdateAccountsContainersEnvironmentsResponse = Environment;
export const UpdateAccountsContainersEnvironmentsResponse = Environment;

export type UpdateAccountsContainersEnvironmentsError = DefaultErrors;

/** Updates a GTM Environment. */
export const updateAccountsContainersEnvironments: API.OperationMethod<
  UpdateAccountsContainersEnvironmentsRequest,
  UpdateAccountsContainersEnvironmentsResponse,
  UpdateAccountsContainersEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersEnvironmentsRequest,
  output: UpdateAccountsContainersEnvironmentsResponse,
  errors: [],
}));

export interface CreateAccountsContainersEnvironmentsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Environment;
}

export const CreateAccountsContainersEnvironmentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersEnvironmentsRequest>;

export type CreateAccountsContainersEnvironmentsResponse = Environment;
export const CreateAccountsContainersEnvironmentsResponse = Environment;

export type CreateAccountsContainersEnvironmentsError = DefaultErrors;

/** Creates a GTM Environment. */
export const createAccountsContainersEnvironments: API.OperationMethod<
  CreateAccountsContainersEnvironmentsRequest,
  CreateAccountsContainersEnvironmentsResponse,
  CreateAccountsContainersEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersEnvironmentsRequest,
  output: CreateAccountsContainersEnvironmentsResponse,
  errors: [],
}));

export interface ListAccountsContainersEnvironmentsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const ListAccountsContainersEnvironmentsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/environments",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersEnvironmentsRequest>;

export type ListAccountsContainersEnvironmentsResponse =
  ListEnvironmentsResponse;
export const ListAccountsContainersEnvironmentsResponse =
  ListEnvironmentsResponse;

export type ListAccountsContainersEnvironmentsError = DefaultErrors;

/** Lists all GTM Environments of a GTM Container. */
export const listAccountsContainersEnvironments: API.OperationMethod<
  ListAccountsContainersEnvironmentsRequest,
  ListAccountsContainersEnvironmentsResponse,
  ListAccountsContainersEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersEnvironmentsRequest,
  output: ListAccountsContainersEnvironmentsResponse,
  errors: [],
}));

export interface DeleteAccountsContainersVersionsRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. */
  containerVersionId: string;
}

export const DeleteAccountsContainersVersionsRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersVersionsRequest>;

export interface DeleteAccountsContainersVersionsResponse {}
export const DeleteAccountsContainersVersionsResponse: Schema.Schema<DeleteAccountsContainersVersionsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersVersionsResponse>;

export type DeleteAccountsContainersVersionsError = DefaultErrors;

/** Deletes a Container Version. */
export const deleteAccountsContainersVersions: API.OperationMethod<
  DeleteAccountsContainersVersionsRequest,
  DeleteAccountsContainersVersionsResponse,
  DeleteAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersVersionsRequest,
  output: DeleteAccountsContainersVersionsResponse,
  errors: [],
}));

export interface PublishAccountsContainersVersionsRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** When provided, this fingerprint must match the fingerprint of the container version in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. */
  containerVersionId: string;
}

export const PublishAccountsContainersVersionsRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/publish",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PublishAccountsContainersVersionsRequest>;

export type PublishAccountsContainersVersionsResponse =
  PublishContainerVersionResponse;
export const PublishAccountsContainersVersionsResponse =
  PublishContainerVersionResponse;

export type PublishAccountsContainersVersionsError = DefaultErrors;

/** Publishes a Container Version. */
export const publishAccountsContainersVersions: API.OperationMethod<
  PublishAccountsContainersVersionsRequest,
  PublishAccountsContainersVersionsResponse,
  PublishAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PublishAccountsContainersVersionsRequest,
  output: PublishAccountsContainersVersionsResponse,
  errors: [],
}));

export interface GetAccountsContainersVersionsRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. Specify published to retrieve the currently published version. */
  containerVersionId: string;
}

export const GetAccountsContainersVersionsRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersVersionsRequest>;

export type GetAccountsContainersVersionsResponse = ContainerVersion;
export const GetAccountsContainersVersionsResponse = ContainerVersion;

export type GetAccountsContainersVersionsError = DefaultErrors;

/** Gets a Container Version. */
export const getAccountsContainersVersions: API.OperationMethod<
  GetAccountsContainersVersionsRequest,
  GetAccountsContainersVersionsResponse,
  GetAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersVersionsRequest,
  output: GetAccountsContainersVersionsResponse,
  errors: [],
}));

export interface UpdateAccountsContainersVersionsRequest {
  /** When provided, this fingerprint must match the fingerprint of the container version in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. */
  containerVersionId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: ContainerVersion;
}

export const UpdateAccountsContainersVersionsRequest = Schema.Struct({
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(ContainerVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersVersionsRequest>;

export type UpdateAccountsContainersVersionsResponse = ContainerVersion;
export const UpdateAccountsContainersVersionsResponse = ContainerVersion;

export type UpdateAccountsContainersVersionsError = DefaultErrors;

/** Updates a Container Version. */
export const updateAccountsContainersVersions: API.OperationMethod<
  UpdateAccountsContainersVersionsRequest,
  UpdateAccountsContainersVersionsResponse,
  UpdateAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersVersionsRequest,
  output: UpdateAccountsContainersVersionsResponse,
  errors: [],
}));

export interface RestoreAccountsContainersVersionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. */
  containerVersionId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const RestoreAccountsContainersVersionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/restore",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestoreAccountsContainersVersionsRequest>;

export type RestoreAccountsContainersVersionsResponse = ContainerVersion;
export const RestoreAccountsContainersVersionsResponse = ContainerVersion;

export type RestoreAccountsContainersVersionsError = DefaultErrors;

/** Restores a Container Version. This will overwrite the container's current configuration (including its variables, triggers and tags). The operation will not have any effect on the version that is being served (i.e. the published version). */
export const restoreAccountsContainersVersions: API.OperationMethod<
  RestoreAccountsContainersVersionsRequest,
  RestoreAccountsContainersVersionsResponse,
  RestoreAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreAccountsContainersVersionsRequest,
  output: RestoreAccountsContainersVersionsResponse,
  errors: [],
}));

export interface CreateAccountsContainersVersionsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: CreateContainerVersionRequestVersionOptions;
}

export const CreateAccountsContainersVersionsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(CreateContainerVersionRequestVersionOptions).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersVersionsRequest>;

export type CreateAccountsContainersVersionsResponse =
  CreateContainerVersionResponse;
export const CreateAccountsContainersVersionsResponse =
  CreateContainerVersionResponse;

export type CreateAccountsContainersVersionsError = DefaultErrors;

/** Creates a Container Version. */
export const createAccountsContainersVersions: API.OperationMethod<
  CreateAccountsContainersVersionsRequest,
  CreateAccountsContainersVersionsResponse,
  CreateAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersVersionsRequest,
  output: CreateAccountsContainersVersionsResponse,
  errors: [],
}));

export interface UndeleteAccountsContainersVersionsRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container Version ID. */
  containerVersionId: string;
}

export const UndeleteAccountsContainersVersionsRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerVersionId: Schema.String.pipe(T.HttpPath("containerVersionId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions/{containerVersionId}/undelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UndeleteAccountsContainersVersionsRequest>;

export type UndeleteAccountsContainersVersionsResponse = ContainerVersion;
export const UndeleteAccountsContainersVersionsResponse = ContainerVersion;

export type UndeleteAccountsContainersVersionsError = DefaultErrors;

/** Undeletes a Container Version. */
export const undeleteAccountsContainersVersions: API.OperationMethod<
  UndeleteAccountsContainersVersionsRequest,
  UndeleteAccountsContainersVersionsResponse,
  UndeleteAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UndeleteAccountsContainersVersionsRequest,
  output: UndeleteAccountsContainersVersionsResponse,
  errors: [],
}));

export interface ListAccountsContainersVersionsRequest {
  /** Also retrieve deleted (archived) versions when true. */
  includeDeleted?: boolean;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Retrieve headers only when true. */
  headers?: boolean;
}

export const ListAccountsContainersVersionsRequest = Schema.Struct({
  includeDeleted: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("includeDeleted"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  headers: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("headers")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/versions",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersVersionsRequest>;

export type ListAccountsContainersVersionsResponse =
  ListContainerVersionsResponse;
export const ListAccountsContainersVersionsResponse =
  ListContainerVersionsResponse;

export type ListAccountsContainersVersionsError = DefaultErrors;

/** Lists all Container Versions of a GTM Container. */
export const listAccountsContainersVersions: API.OperationMethod<
  ListAccountsContainersVersionsRequest,
  ListAccountsContainersVersionsResponse,
  ListAccountsContainersVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersVersionsRequest,
  output: ListAccountsContainersVersionsResponse,
  errors: [],
}));

export interface ListAccountsContainersTagsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const ListAccountsContainersTagsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersTagsRequest>;

export type ListAccountsContainersTagsResponse = ListTagsResponse;
export const ListAccountsContainersTagsResponse = ListTagsResponse;

export type ListAccountsContainersTagsError = DefaultErrors;

/** Lists all GTM Tags of a Container. */
export const listAccountsContainersTags: API.OperationMethod<
  ListAccountsContainersTagsRequest,
  ListAccountsContainersTagsResponse,
  ListAccountsContainersTagsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersTagsRequest,
  output: ListAccountsContainersTagsResponse,
  errors: [],
}));

export interface CreateAccountsContainersTagsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Tag;
}

export const CreateAccountsContainersTagsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersTagsRequest>;

export type CreateAccountsContainersTagsResponse = Tag;
export const CreateAccountsContainersTagsResponse = Tag;

export type CreateAccountsContainersTagsError = DefaultErrors;

/** Creates a GTM Tag. */
export const createAccountsContainersTags: API.OperationMethod<
  CreateAccountsContainersTagsRequest,
  CreateAccountsContainersTagsResponse,
  CreateAccountsContainersTagsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersTagsRequest,
  output: CreateAccountsContainersTagsResponse,
  errors: [],
}));

export interface GetAccountsContainersTagsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Tag ID. */
  tagId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const GetAccountsContainersTagsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  tagId: Schema.String.pipe(T.HttpPath("tagId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersTagsRequest>;

export type GetAccountsContainersTagsResponse = Tag;
export const GetAccountsContainersTagsResponse = Tag;

export type GetAccountsContainersTagsError = DefaultErrors;

/** Gets a GTM Tag. */
export const getAccountsContainersTags: API.OperationMethod<
  GetAccountsContainersTagsRequest,
  GetAccountsContainersTagsResponse,
  GetAccountsContainersTagsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersTagsRequest,
  output: GetAccountsContainersTagsResponse,
  errors: [],
}));

export interface UpdateAccountsContainersTagsRequest {
  /** When provided, this fingerprint must match the fingerprint of the tag in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Tag ID. */
  tagId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Tag;
}

export const UpdateAccountsContainersTagsRequest = Schema.Struct({
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  tagId: Schema.String.pipe(T.HttpPath("tagId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Tag).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersTagsRequest>;

export type UpdateAccountsContainersTagsResponse = Tag;
export const UpdateAccountsContainersTagsResponse = Tag;

export type UpdateAccountsContainersTagsError = DefaultErrors;

/** Updates a GTM Tag. */
export const updateAccountsContainersTags: API.OperationMethod<
  UpdateAccountsContainersTagsRequest,
  UpdateAccountsContainersTagsResponse,
  UpdateAccountsContainersTagsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersTagsRequest,
  output: UpdateAccountsContainersTagsResponse,
  errors: [],
}));

export interface DeleteAccountsContainersTagsRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Tag ID. */
  tagId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const DeleteAccountsContainersTagsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  tagId: Schema.String.pipe(T.HttpPath("tagId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersTagsRequest>;

export interface DeleteAccountsContainersTagsResponse {}
export const DeleteAccountsContainersTagsResponse: Schema.Schema<DeleteAccountsContainersTagsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersTagsResponse>;

export type DeleteAccountsContainersTagsError = DefaultErrors;

/** Deletes a GTM Tag. */
export const deleteAccountsContainersTags: API.OperationMethod<
  DeleteAccountsContainersTagsRequest,
  DeleteAccountsContainersTagsResponse,
  DeleteAccountsContainersTagsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersTagsRequest,
  output: DeleteAccountsContainersTagsResponse,
  errors: [],
}));

export interface UpdateAccountsContainersMove_foldersRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Folder ID. */
  folderId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The triggers to be moved to the folder. */
  triggerId?: string[];
  /** The variables to be moved to the folder. */
  variableId?: string[];
  /** The tags to be moved to the folder. */
  tagId?: string[];
  /** Request body */
  body?: Folder;
}

export const UpdateAccountsContainersMove_foldersRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  triggerId: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("triggerId"),
  ),
  variableId: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("variableId"),
  ),
  tagId: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("tagId"),
  ),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/move_folders/{folderId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersMove_foldersRequest>;

export interface UpdateAccountsContainersMove_foldersResponse {}
export const UpdateAccountsContainersMove_foldersResponse: Schema.Schema<UpdateAccountsContainersMove_foldersResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<UpdateAccountsContainersMove_foldersResponse>;

export type UpdateAccountsContainersMove_foldersError = DefaultErrors;

/** Moves entities to a GTM Folder. */
export const updateAccountsContainersMove_folders: API.OperationMethod<
  UpdateAccountsContainersMove_foldersRequest,
  UpdateAccountsContainersMove_foldersResponse,
  UpdateAccountsContainersMove_foldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersMove_foldersRequest,
  output: UpdateAccountsContainersMove_foldersResponse,
  errors: [],
}));

export interface UpdateAccountsContainersReauthorize_environmentsRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Environment ID. */
  environmentId: string;
  /** The GTM Account ID. */
  accountId: string;
  /** Request body */
  body?: Environment;
}

export const UpdateAccountsContainersReauthorize_environmentsRequest =
  Schema.Struct({
    containerId: Schema.String.pipe(T.HttpPath("containerId")),
    environmentId: Schema.String.pipe(T.HttpPath("environmentId")),
    accountId: Schema.String.pipe(T.HttpPath("accountId")),
    body: Schema.optional(Environment).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/reauthorize_environments/{environmentId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateAccountsContainersReauthorize_environmentsRequest>;

export type UpdateAccountsContainersReauthorize_environmentsResponse =
  Environment;
export const UpdateAccountsContainersReauthorize_environmentsResponse =
  Environment;

export type UpdateAccountsContainersReauthorize_environmentsError =
  DefaultErrors;

/** Re-generates the authorization code for a GTM Environment. */
export const updateAccountsContainersReauthorize_environments: API.OperationMethod<
  UpdateAccountsContainersReauthorize_environmentsRequest,
  UpdateAccountsContainersReauthorize_environmentsResponse,
  UpdateAccountsContainersReauthorize_environmentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersReauthorize_environmentsRequest,
  output: UpdateAccountsContainersReauthorize_environmentsResponse,
  errors: [],
}));

export interface DeleteAccountsContainersFoldersRequest {
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Folder ID. */
  folderId: string;
  /** The GTM Account ID. */
  accountId: string;
}

export const DeleteAccountsContainersFoldersRequest = Schema.Struct({
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsContainersFoldersRequest>;

export interface DeleteAccountsContainersFoldersResponse {}
export const DeleteAccountsContainersFoldersResponse: Schema.Schema<DeleteAccountsContainersFoldersResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAccountsContainersFoldersResponse>;

export type DeleteAccountsContainersFoldersError = DefaultErrors;

/** Deletes a GTM Folder. */
export const deleteAccountsContainersFolders: API.OperationMethod<
  DeleteAccountsContainersFoldersRequest,
  DeleteAccountsContainersFoldersResponse,
  DeleteAccountsContainersFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsContainersFoldersRequest,
  output: DeleteAccountsContainersFoldersResponse,
  errors: [],
}));

export interface GetAccountsContainersFoldersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Folder ID. */
  folderId: string;
}

export const GetAccountsContainersFoldersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsContainersFoldersRequest>;

export type GetAccountsContainersFoldersResponse = Folder;
export const GetAccountsContainersFoldersResponse = Folder;

export type GetAccountsContainersFoldersError = DefaultErrors;

/** Gets a GTM Folder. */
export const getAccountsContainersFolders: API.OperationMethod<
  GetAccountsContainersFoldersRequest,
  GetAccountsContainersFoldersResponse,
  GetAccountsContainersFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsContainersFoldersRequest,
  output: GetAccountsContainersFoldersResponse,
  errors: [],
}));

export interface UpdateAccountsContainersFoldersRequest {
  /** When provided, this fingerprint must match the fingerprint of the folder in storage. */
  fingerprint?: string;
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Folder ID. */
  folderId: string;
  /** Request body */
  body?: Folder;
}

export const UpdateAccountsContainersFoldersRequest = Schema.Struct({
  fingerprint: Schema.optional(Schema.String).pipe(T.HttpQuery("fingerprint")),
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAccountsContainersFoldersRequest>;

export type UpdateAccountsContainersFoldersResponse = Folder;
export const UpdateAccountsContainersFoldersResponse = Folder;

export type UpdateAccountsContainersFoldersError = DefaultErrors;

/** Updates a GTM Folder. */
export const updateAccountsContainersFolders: API.OperationMethod<
  UpdateAccountsContainersFoldersRequest,
  UpdateAccountsContainersFoldersResponse,
  UpdateAccountsContainersFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountsContainersFoldersRequest,
  output: UpdateAccountsContainersFoldersResponse,
  errors: [],
}));

export interface CreateAccountsContainersFoldersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** Request body */
  body?: Folder;
}

export const CreateAccountsContainersFoldersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  body: Schema.optional(Folder).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsContainersFoldersRequest>;

export type CreateAccountsContainersFoldersResponse = Folder;
export const CreateAccountsContainersFoldersResponse = Folder;

export type CreateAccountsContainersFoldersError = DefaultErrors;

/** Creates a GTM Folder. */
export const createAccountsContainersFolders: API.OperationMethod<
  CreateAccountsContainersFoldersRequest,
  CreateAccountsContainersFoldersResponse,
  CreateAccountsContainersFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsContainersFoldersRequest,
  output: CreateAccountsContainersFoldersResponse,
  errors: [],
}));

export interface ListAccountsContainersFoldersRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
}

export const ListAccountsContainersFoldersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersFoldersRequest>;

export type ListAccountsContainersFoldersResponse = ListFoldersResponse;
export const ListAccountsContainersFoldersResponse = ListFoldersResponse;

export type ListAccountsContainersFoldersError = DefaultErrors;

/** Lists all GTM Folders of a Container. */
export const listAccountsContainersFolders: API.OperationMethod<
  ListAccountsContainersFoldersRequest,
  ListAccountsContainersFoldersResponse,
  ListAccountsContainersFoldersError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersFoldersRequest,
  output: ListAccountsContainersFoldersResponse,
  errors: [],
}));

export interface ListAccountsContainersFoldersEntitiesRequest {
  /** The GTM Account ID. */
  accountId: string;
  /** The GTM Container ID. */
  containerId: string;
  /** The GTM Folder ID. */
  folderId: string;
}

export const ListAccountsContainersFoldersEntitiesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("accountId")),
  containerId: Schema.String.pipe(T.HttpPath("containerId")),
  folderId: Schema.String.pipe(T.HttpPath("folderId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}/entities",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsContainersFoldersEntitiesRequest>;

export type ListAccountsContainersFoldersEntitiesResponse = FolderEntities;
export const ListAccountsContainersFoldersEntitiesResponse = FolderEntities;

export type ListAccountsContainersFoldersEntitiesError = DefaultErrors;

/** List all entities in a GTM Folder. */
export const listAccountsContainersFoldersEntities: API.OperationMethod<
  ListAccountsContainersFoldersEntitiesRequest,
  ListAccountsContainersFoldersEntitiesResponse,
  ListAccountsContainersFoldersEntitiesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsContainersFoldersEntitiesRequest,
  output: ListAccountsContainersFoldersEntitiesResponse,
  errors: [],
}));
