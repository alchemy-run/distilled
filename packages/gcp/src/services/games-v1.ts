// ==========================================================================
// Google Play Games Services API (games v1)
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
  name: "games",
  version: "v1",
  rootUrl: "https://games.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AchievementDefinition {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementDefinition`. */
  kind?: string;
  /** The ID of the achievement. */
  id?: string;
  /** The name of the achievement. */
  name?: string;
  /** The description of the achievement. */
  description?: string;
  /** The type of the achievement. */
  achievementType?: "STANDARD" | "INCREMENTAL" | (string & {});
  /** The total steps for an incremental achievement. */
  totalSteps?: number;
  /** The total steps for an incremental achievement as a string. */
  formattedTotalSteps?: string;
  /** The image URL for the revealed achievement icon. */
  revealedIconUrl?: string;
  /** Indicates whether the revealed icon image being returned is a default image, or is provided by the game. */
  isRevealedIconUrlDefault?: boolean;
  /** The image URL for the unlocked achievement icon. */
  unlockedIconUrl?: string;
  /** Indicates whether the unlocked icon image being returned is a default image, or is game-provided. */
  isUnlockedIconUrlDefault?: boolean;
  /** The initial state of the achievement. */
  initialState?: "HIDDEN" | "REVEALED" | "UNLOCKED" | (string & {});
  /** Experience points which will be earned when unlocking this achievement. */
  experiencePoints?: string;
}

export const AchievementDefinition: Schema.Schema<AchievementDefinition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      achievementType: Schema.optional(Schema.String),
      totalSteps: Schema.optional(Schema.Number),
      formattedTotalSteps: Schema.optional(Schema.String),
      revealedIconUrl: Schema.optional(Schema.String),
      isRevealedIconUrlDefault: Schema.optional(Schema.Boolean),
      unlockedIconUrl: Schema.optional(Schema.String),
      isUnlockedIconUrlDefault: Schema.optional(Schema.Boolean),
      initialState: Schema.optional(Schema.String),
      experiencePoints: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AchievementDefinition",
  }) as any as Schema.Schema<AchievementDefinition>;

export interface AchievementDefinitionsListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementDefinitionsListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. */
  nextPageToken?: string;
  /** The achievement definitions. */
  items?: Array<AchievementDefinition>;
}

export const AchievementDefinitionsListResponse: Schema.Schema<AchievementDefinitionsListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(AchievementDefinition)),
    }),
  ).annotate({
    identifier: "AchievementDefinitionsListResponse",
  }) as any as Schema.Schema<AchievementDefinitionsListResponse>;

export interface AchievementIncrementResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementIncrementResponse`. */
  kind?: string;
  /** The current steps recorded for this incremental achievement. */
  currentSteps?: number;
  /** Whether the current steps for the achievement has reached the number of steps required to unlock. */
  newlyUnlocked?: boolean;
}

export const AchievementIncrementResponse: Schema.Schema<AchievementIncrementResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      currentSteps: Schema.optional(Schema.Number),
      newlyUnlocked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AchievementIncrementResponse",
  }) as any as Schema.Schema<AchievementIncrementResponse>;

export interface PlayerAchievement {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerAchievement`. */
  kind?: string;
  /** The ID of the achievement. */
  id?: string;
  /** The current steps for an incremental achievement. */
  currentSteps?: number;
  /** The current steps for an incremental achievement as a string. */
  formattedCurrentStepsString?: string;
  /** The state of the achievement. */
  achievementState?: "HIDDEN" | "REVEALED" | "UNLOCKED" | (string & {});
  /** The timestamp of the last modification to this achievement's state. */
  lastUpdatedTimestamp?: string;
  /** Experience points earned for the achievement. This field is absent for achievements that have not yet been unlocked and 0 for achievements that have been unlocked by testers but that are unpublished. */
  experiencePoints?: string;
}

export const PlayerAchievement: Schema.Schema<PlayerAchievement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      currentSteps: Schema.optional(Schema.Number),
      formattedCurrentStepsString: Schema.optional(Schema.String),
      achievementState: Schema.optional(Schema.String),
      lastUpdatedTimestamp: Schema.optional(Schema.String),
      experiencePoints: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerAchievement",
  }) as any as Schema.Schema<PlayerAchievement>;

export interface PlayerAchievementListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerAchievementListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. */
  nextPageToken?: string;
  /** The achievements. */
  items?: Array<PlayerAchievement>;
}

export const PlayerAchievementListResponse: Schema.Schema<PlayerAchievementListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(PlayerAchievement)),
    }),
  ).annotate({
    identifier: "PlayerAchievementListResponse",
  }) as any as Schema.Schema<PlayerAchievementListResponse>;

export interface AchievementRevealResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementRevealResponse`. */
  kind?: string;
  /** The current state of the achievement for which a reveal was attempted. This might be `UNLOCKED` if the achievement was already unlocked. */
  currentState?: "REVEALED" | "UNLOCKED" | (string & {});
}

export const AchievementRevealResponse: Schema.Schema<AchievementRevealResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      currentState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AchievementRevealResponse",
  }) as any as Schema.Schema<AchievementRevealResponse>;

export interface AchievementSetStepsAtLeastResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementSetStepsAtLeastResponse`. */
  kind?: string;
  /** The current steps recorded for this incremental achievement. */
  currentSteps?: number;
  /** Whether the current steps for the achievement has reached the number of steps required to unlock. */
  newlyUnlocked?: boolean;
}

export const AchievementSetStepsAtLeastResponse: Schema.Schema<AchievementSetStepsAtLeastResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      currentSteps: Schema.optional(Schema.Number),
      newlyUnlocked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AchievementSetStepsAtLeastResponse",
  }) as any as Schema.Schema<AchievementSetStepsAtLeastResponse>;

export interface AchievementUnlockResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementUnlockResponse`. */
  kind?: string;
  /** Whether this achievement was newly unlocked (that is, whether the unlock request for the achievement was the first for the player). */
  newlyUnlocked?: boolean;
}

export const AchievementUnlockResponse: Schema.Schema<AchievementUnlockResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      newlyUnlocked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AchievementUnlockResponse",
  }) as any as Schema.Schema<AchievementUnlockResponse>;

export interface GamesAchievementIncrement {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#GamesAchievementIncrement`. */
  kind?: string;
  /** The number of steps to be incremented. */
  steps?: number;
  /** The requestId associated with an increment to an achievement. */
  requestId?: string;
}

export const GamesAchievementIncrement: Schema.Schema<GamesAchievementIncrement> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Number),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GamesAchievementIncrement",
  }) as any as Schema.Schema<GamesAchievementIncrement>;

export interface GamesAchievementSetStepsAtLeast {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#GamesAchievementSetStepsAtLeast`. */
  kind?: string;
  /** The minimum number of steps for the achievement to be set to. */
  steps?: number;
}

export const GamesAchievementSetStepsAtLeast: Schema.Schema<GamesAchievementSetStepsAtLeast> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      steps: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GamesAchievementSetStepsAtLeast",
  }) as any as Schema.Schema<GamesAchievementSetStepsAtLeast>;

export interface AchievementUpdateRequest {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementUpdateRequest`. */
  kind?: string;
  /** The achievement this update is being applied to. */
  achievementId?: string;
  /** The type of update being applied. */
  updateType?:
    | "REVEAL"
    | "UNLOCK"
    | "INCREMENT"
    | "SET_STEPS_AT_LEAST"
    | (string & {});
  /** The payload if an update of type `INCREMENT` was requested for the achievement. */
  incrementPayload?: GamesAchievementIncrement;
  /** The payload if an update of type `SET_STEPS_AT_LEAST` was requested for the achievement. */
  setStepsAtLeastPayload?: GamesAchievementSetStepsAtLeast;
}

export const AchievementUpdateRequest: Schema.Schema<AchievementUpdateRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      achievementId: Schema.optional(Schema.String),
      updateType: Schema.optional(Schema.String),
      incrementPayload: Schema.optional(GamesAchievementIncrement),
      setStepsAtLeastPayload: Schema.optional(GamesAchievementSetStepsAtLeast),
    }),
  ).annotate({
    identifier: "AchievementUpdateRequest",
  }) as any as Schema.Schema<AchievementUpdateRequest>;

export interface AchievementUpdateMultipleRequest {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementUpdateMultipleRequest`. */
  kind?: string;
  /** The individual achievement update requests. */
  updates?: Array<AchievementUpdateRequest>;
}

export const AchievementUpdateMultipleRequest: Schema.Schema<AchievementUpdateMultipleRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      updates: Schema.optional(Schema.Array(AchievementUpdateRequest)),
    }),
  ).annotate({
    identifier: "AchievementUpdateMultipleRequest",
  }) as any as Schema.Schema<AchievementUpdateMultipleRequest>;

export interface AchievementUpdateResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementUpdateResponse`. */
  kind?: string;
  /** The achievement this update is was applied to. */
  achievementId?: string;
  /** Whether the requested updates actually affected the achievement. */
  updateOccurred?: boolean;
  /** The current state of the achievement. */
  currentState?: "HIDDEN" | "REVEALED" | "UNLOCKED" | (string & {});
  /** The current steps recorded for this achievement if it is incremental. */
  currentSteps?: number;
  /** Whether this achievement was newly unlocked (that is, whether the unlock request for the achievement was the first for the player). */
  newlyUnlocked?: boolean;
}

export const AchievementUpdateResponse: Schema.Schema<AchievementUpdateResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      achievementId: Schema.optional(Schema.String),
      updateOccurred: Schema.optional(Schema.Boolean),
      currentState: Schema.optional(Schema.String),
      currentSteps: Schema.optional(Schema.Number),
      newlyUnlocked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AchievementUpdateResponse",
  }) as any as Schema.Schema<AchievementUpdateResponse>;

export interface AchievementUpdateMultipleResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#achievementUpdateMultipleResponse`. */
  kind?: string;
  /** The updated state of the achievements. */
  updatedAchievements?: Array<AchievementUpdateResponse>;
}

export const AchievementUpdateMultipleResponse: Schema.Schema<AchievementUpdateMultipleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      updatedAchievements: Schema.optional(
        Schema.Array(AchievementUpdateResponse),
      ),
    }),
  ).annotate({
    identifier: "AchievementUpdateMultipleResponse",
  }) as any as Schema.Schema<AchievementUpdateMultipleResponse>;

export interface ApplicationCategory {
  /** The primary category. */
  primary?: string;
  /** The secondary category. */
  secondary?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#applicationCategory`. */
  kind?: string;
}

export const ApplicationCategory: Schema.Schema<ApplicationCategory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      primary: Schema.optional(Schema.String),
      secondary: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationCategory",
  }) as any as Schema.Schema<ApplicationCategory>;

export interface ImageAsset {
  /** The name of the asset. */
  name?: string;
  /** The width of the asset. */
  width?: number;
  /** The height of the asset. */
  height?: number;
  /** The URL of the asset. */
  url?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#imageAsset`. */
  kind?: string;
}

export const ImageAsset: Schema.Schema<ImageAsset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      width: Schema.optional(Schema.Number),
      height: Schema.optional(Schema.Number),
      url: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ImageAsset" }) as any as Schema.Schema<ImageAsset>;

export interface InstanceAndroidDetails {
  /** Android package name which maps to Google Play URL. */
  packageName?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#instanceAndroidDetails`. */
  kind?: string;
  /** Flag indicating whether the anti-piracy check is enabled. */
  enablePiracyCheck?: boolean;
  /** Indicates that this instance is the default for new installations. */
  preferred?: boolean;
}

export const InstanceAndroidDetails: Schema.Schema<InstanceAndroidDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      packageName: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      enablePiracyCheck: Schema.optional(Schema.Boolean),
      preferred: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "InstanceAndroidDetails",
  }) as any as Schema.Schema<InstanceAndroidDetails>;

export interface InstanceIosDetails {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#instanceIosDetails`. */
  kind?: string;
  /** Bundle identifier. */
  bundleIdentifier?: string;
  /** iTunes App ID. */
  itunesAppId?: string;
  /** Flag to indicate if this instance supports iPhone. */
  supportIphone?: boolean;
  /** Flag to indicate if this instance supports iPad. */
  supportIpad?: boolean;
  /** Indicates that this instance is the default for new installations on iPhone devices. */
  preferredForIphone?: boolean;
  /** Indicates that this instance is the default for new installations on iPad devices. */
  preferredForIpad?: boolean;
}

export const InstanceIosDetails: Schema.Schema<InstanceIosDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      bundleIdentifier: Schema.optional(Schema.String),
      itunesAppId: Schema.optional(Schema.String),
      supportIphone: Schema.optional(Schema.Boolean),
      supportIpad: Schema.optional(Schema.Boolean),
      preferredForIphone: Schema.optional(Schema.Boolean),
      preferredForIpad: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "InstanceIosDetails",
  }) as any as Schema.Schema<InstanceIosDetails>;

export interface InstanceWebDetails {
  /** Launch URL for the game. */
  launchUrl?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#instanceWebDetails`. */
  kind?: string;
  /** Indicates that this instance is the default for new installations. */
  preferred?: boolean;
}

export const InstanceWebDetails: Schema.Schema<InstanceWebDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      launchUrl: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      preferred: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "InstanceWebDetails",
  }) as any as Schema.Schema<InstanceWebDetails>;

export interface Instance {
  /** The platform type. */
  platformType?: "ANDROID" | "IOS" | "WEB_APP" | (string & {});
  /** Localized display name. */
  name?: string;
  /** Flag to show if this game instance supports turn based play. */
  turnBasedPlay?: boolean;
  /** Flag to show if this game instance supports realtime play. */
  realtimePlay?: boolean;
  /** Platform dependent details for Android. */
  androidInstance?: InstanceAndroidDetails;
  /** Platform dependent details for iOS. */
  iosInstance?: InstanceIosDetails;
  /** Platform dependent details for Web. */
  webInstance?: InstanceWebDetails;
  /** URI which shows where a user can acquire this instance. */
  acquisitionUri?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#instance`. */
  kind?: string;
}

export const Instance: Schema.Schema<Instance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      platformType: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      turnBasedPlay: Schema.optional(Schema.Boolean),
      realtimePlay: Schema.optional(Schema.Boolean),
      androidInstance: Schema.optional(InstanceAndroidDetails),
      iosInstance: Schema.optional(InstanceIosDetails),
      webInstance: Schema.optional(InstanceWebDetails),
      acquisitionUri: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface Application {
  /** The ID of the application. */
  id?: string;
  /** The name of the application. */
  name?: string;
  /** The author of the application. */
  author?: string;
  /** The description of the application. */
  description?: string;
  /** The category of the application. */
  category?: ApplicationCategory;
  /** The assets of the application. */
  assets?: Array<ImageAsset>;
  /** The instances of the application. */
  instances?: Array<Instance>;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#application`. */
  kind?: string;
  /** The last updated timestamp of the application. */
  lastUpdatedTimestamp?: string;
  /** The number of achievements visible to the currently authenticated player. */
  achievement_count?: number;
  /** The number of leaderboards visible to the currently authenticated player. */
  leaderboard_count?: number;
  /** A list of features that have been enabled for the application. */
  enabledFeatures?: Array<"SNAPSHOTS" | (string & {})>;
  /** A hint to the client UI for what color to use as an app-themed color. The color is given as an RGB triplet (e.g. "E0E0E0"). */
  themeColor?: string;
}

export const Application: Schema.Schema<Application> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      author: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      category: Schema.optional(ApplicationCategory),
      assets: Schema.optional(Schema.Array(ImageAsset)),
      instances: Schema.optional(Schema.Array(Instance)),
      kind: Schema.optional(Schema.String),
      lastUpdatedTimestamp: Schema.optional(Schema.String),
      achievement_count: Schema.optional(Schema.Number),
      leaderboard_count: Schema.optional(Schema.Number),
      enabledFeatures: Schema.optional(Schema.Array(Schema.String)),
      themeColor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Application",
  }) as any as Schema.Schema<Application>;

export interface ApplicationVerifyResponse {
  /** The ID of the player that was issued the auth token used in this request. */
  player_id?: string;
  /** An alternate ID that was once used for the player that was issued the auth token used in this request. (This field is not normally populated.) */
  alternate_player_id?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#applicationVerifyResponse`. */
  kind?: string;
}

export const ApplicationVerifyResponse: Schema.Schema<ApplicationVerifyResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      player_id: Schema.optional(Schema.String),
      alternate_player_id: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationVerifyResponse",
  }) as any as Schema.Schema<ApplicationVerifyResponse>;

export interface EndPoint {
  /** A URL suitable for loading in a web browser for the requested endpoint. */
  url?: string;
}

export const EndPoint: Schema.Schema<EndPoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "EndPoint" }) as any as Schema.Schema<EndPoint>;

export interface PlayerEvent {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerEvent`. */
  kind?: string;
  /** The ID of the event definition. */
  definitionId?: string;
  /** The ID of the player. */
  playerId?: string;
  /** The current number of times this event has occurred. */
  numEvents?: string;
  /** The current number of times this event has occurred, as a string. The formatting of this string depends on the configuration of your event in the Play Games Developer Console. */
  formattedNumEvents?: string;
}

export const PlayerEvent: Schema.Schema<PlayerEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      definitionId: Schema.optional(Schema.String),
      playerId: Schema.optional(Schema.String),
      numEvents: Schema.optional(Schema.String),
      formattedNumEvents: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerEvent",
  }) as any as Schema.Schema<PlayerEvent>;

export interface PlayerEventListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerEventListResponse`. */
  kind?: string;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
  /** The player events. */
  items?: Array<PlayerEvent>;
}

export const PlayerEventListResponse: Schema.Schema<PlayerEventListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(PlayerEvent)),
    }),
  ).annotate({
    identifier: "PlayerEventListResponse",
  }) as any as Schema.Schema<PlayerEventListResponse>;

export interface EventChild {
  /** The ID of the child event. */
  childId?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventChild`. */
  kind?: string;
}

export const EventChild: Schema.Schema<EventChild> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      childId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "EventChild" }) as any as Schema.Schema<EventChild>;

export interface EventDefinition {
  /** The ID of the event. */
  id?: string;
  /** The visibility of event being tracked in this definition. */
  visibility?: "REVEALED" | "HIDDEN" | (string & {});
  /** The name to display for the event. */
  displayName?: string;
  /** The base URL for the image that represents the event. */
  imageUrl?: string;
  /** A list of events that are a child of this event. */
  childEvents?: Array<EventChild>;
  /** Description of what this event represents. */
  description?: string;
  /** Indicates whether the icon image being returned is a default image, or is game-provided. */
  isDefaultImageUrl?: boolean;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventDefinition`. */
  kind?: string;
}

export const EventDefinition: Schema.Schema<EventDefinition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      visibility: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
      childEvents: Schema.optional(Schema.Array(EventChild)),
      description: Schema.optional(Schema.String),
      isDefaultImageUrl: Schema.optional(Schema.Boolean),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventDefinition",
  }) as any as Schema.Schema<EventDefinition>;

export interface EventDefinitionListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventDefinitionListResponse`. */
  kind?: string;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
  /** The event definitions. */
  items?: Array<EventDefinition>;
}

export const EventDefinitionListResponse: Schema.Schema<EventDefinitionListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(EventDefinition)),
    }),
  ).annotate({
    identifier: "EventDefinitionListResponse",
  }) as any as Schema.Schema<EventDefinitionListResponse>;

export interface EventPeriodRange {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventPeriodRange`. */
  kind?: string;
  /** The time when this update period begins, in millis, since 1970 UTC (Unix Epoch). */
  periodStartMillis?: string;
  /** The time when this update period ends, in millis, since 1970 UTC (Unix Epoch). */
  periodEndMillis?: string;
}

export const EventPeriodRange: Schema.Schema<EventPeriodRange> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      periodStartMillis: Schema.optional(Schema.String),
      periodEndMillis: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventPeriodRange",
  }) as any as Schema.Schema<EventPeriodRange>;

export interface EventUpdateRequest {
  /** The ID of the event being modified in this update. */
  definitionId?: string;
  /** The number of times this event occurred in this time period. */
  updateCount?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventUpdateRequest`. */
  kind?: string;
}

export const EventUpdateRequest: Schema.Schema<EventUpdateRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      definitionId: Schema.optional(Schema.String),
      updateCount: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventUpdateRequest",
  }) as any as Schema.Schema<EventUpdateRequest>;

export interface EventPeriodUpdate {
  /** The time period being covered by this update. */
  timePeriod?: EventPeriodRange;
  /** The updates being made for this time period. */
  updates?: Array<EventUpdateRequest>;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventPeriodUpdate`. */
  kind?: string;
}

export const EventPeriodUpdate: Schema.Schema<EventPeriodUpdate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timePeriod: Schema.optional(EventPeriodRange),
      updates: Schema.optional(Schema.Array(EventUpdateRequest)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventPeriodUpdate",
  }) as any as Schema.Schema<EventPeriodUpdate>;

export interface EventRecordRequest {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventRecordRequest`. */
  kind?: string;
  /** The request ID used to identify this attempt to record events. */
  requestId?: string;
  /** The current time when this update was sent, in milliseconds, since 1970 UTC (Unix Epoch). */
  currentTimeMillis?: string;
  /** A list of the time period updates being made in this request. */
  timePeriods?: Array<EventPeriodUpdate>;
}

export const EventRecordRequest: Schema.Schema<EventRecordRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      requestId: Schema.optional(Schema.String),
      currentTimeMillis: Schema.optional(Schema.String),
      timePeriods: Schema.optional(Schema.Array(EventPeriodUpdate)),
    }),
  ).annotate({
    identifier: "EventRecordRequest",
  }) as any as Schema.Schema<EventRecordRequest>;

export interface EventBatchRecordFailure {
  /** The time range which was rejected; empty for a request-wide failure. */
  range?: EventPeriodRange;
  /** The cause for the update failure. */
  failureCause?:
    | "TOO_LARGE"
    | "TIME_PERIOD_EXPIRED"
    | "TIME_PERIOD_SHORT"
    | "TIME_PERIOD_LONG"
    | "ALREADY_UPDATED"
    | "RECORD_RATE_HIGH"
    | (string & {});
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventBatchRecordFailure`. */
  kind?: string;
}

export const EventBatchRecordFailure: Schema.Schema<EventBatchRecordFailure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      range: Schema.optional(EventPeriodRange),
      failureCause: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventBatchRecordFailure",
  }) as any as Schema.Schema<EventBatchRecordFailure>;

export interface EventRecordFailure {
  /** The ID of the event that was not updated. */
  eventId?: string;
  /** The cause for the update failure. */
  failureCause?: "NOT_FOUND" | "INVALID_UPDATE_VALUE" | (string & {});
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventRecordFailure`. */
  kind?: string;
}

export const EventRecordFailure: Schema.Schema<EventRecordFailure> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      failureCause: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventRecordFailure",
  }) as any as Schema.Schema<EventRecordFailure>;

export interface EventUpdateResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#eventUpdateResponse`. */
  kind?: string;
  /** Any batch-wide failures which occurred applying updates. */
  batchFailures?: Array<EventBatchRecordFailure>;
  /** Any failures updating a particular event. */
  eventFailures?: Array<EventRecordFailure>;
  /** The current status of any updated events */
  playerEvents?: Array<PlayerEvent>;
}

export const EventUpdateResponse: Schema.Schema<EventUpdateResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      batchFailures: Schema.optional(Schema.Array(EventBatchRecordFailure)),
      eventFailures: Schema.optional(Schema.Array(EventRecordFailure)),
      playerEvents: Schema.optional(Schema.Array(PlayerEvent)),
    }),
  ).annotate({
    identifier: "EventUpdateResponse",
  }) as any as Schema.Schema<EventUpdateResponse>;

export interface Leaderboard {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#leaderboard`. */
  kind?: string;
  /** The leaderboard ID. */
  id?: string;
  /** The name of the leaderboard. */
  name?: string;
  /** The icon for the leaderboard. */
  iconUrl?: string;
  /** Indicates whether the icon image being returned is a default image, or is game-provided. */
  isIconUrlDefault?: boolean;
  /** How scores are ordered. */
  order?: "LARGER_IS_BETTER" | "SMALLER_IS_BETTER" | (string & {});
}

export const Leaderboard: Schema.Schema<Leaderboard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      iconUrl: Schema.optional(Schema.String),
      isIconUrlDefault: Schema.optional(Schema.Boolean),
      order: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Leaderboard",
  }) as any as Schema.Schema<Leaderboard>;

export interface LeaderboardListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#leaderboardListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. */
  nextPageToken?: string;
  /** The leaderboards. */
  items?: Array<Leaderboard>;
}

export const LeaderboardListResponse: Schema.Schema<LeaderboardListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Leaderboard)),
    }),
  ).annotate({
    identifier: "LeaderboardListResponse",
  }) as any as Schema.Schema<LeaderboardListResponse>;

export interface PlayerLevel {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerLevel`. */
  kind?: string;
  /** The level for the user. */
  level?: number;
  /** The minimum experience points for this level. */
  minExperiencePoints?: string;
  /** The maximum experience points for this level. */
  maxExperiencePoints?: string;
}

export const PlayerLevel: Schema.Schema<PlayerLevel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      level: Schema.optional(Schema.Number),
      minExperiencePoints: Schema.optional(Schema.String),
      maxExperiencePoints: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerLevel",
  }) as any as Schema.Schema<PlayerLevel>;

export interface MetagameConfig {
  /** Current version of the metagame configuration data. When this data is updated, the version number will be increased by one. */
  currentVersion?: number;
  /** The list of player levels. */
  playerLevels?: Array<PlayerLevel>;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#metagameConfig`. */
  kind?: string;
}

export const MetagameConfig: Schema.Schema<MetagameConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currentVersion: Schema.optional(Schema.Number),
      playerLevels: Schema.optional(Schema.Array(PlayerLevel)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MetagameConfig",
  }) as any as Schema.Schema<MetagameConfig>;

export interface Category {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#category`. */
  kind?: string;
  /** The category name. */
  category?: string;
  /** Experience points earned in this category. */
  experiencePoints?: string;
}

export const Category: Schema.Schema<Category> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      category: Schema.optional(Schema.String),
      experiencePoints: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface CategoryListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#categoryListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. */
  nextPageToken?: string;
  /** The list of categories with usage data. */
  items?: Array<Category>;
}

export const CategoryListResponse: Schema.Schema<CategoryListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Category)),
    }),
  ).annotate({
    identifier: "CategoryListResponse",
  }) as any as Schema.Schema<CategoryListResponse>;

export interface ProfileSettings {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#profileSettings`. */
  kind?: string;
  /** Whether the player's profile is visible to the currently signed in player. */
  profileVisible?: boolean;
  friendsListVisibility?:
    | "VISIBLE"
    | "REQUEST_REQUIRED"
    | "UNAVAILABLE"
    | (string & {});
}

export const ProfileSettings: Schema.Schema<ProfileSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      profileVisible: Schema.optional(Schema.Boolean),
      friendsListVisibility: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProfileSettings",
  }) as any as Schema.Schema<ProfileSettings>;

export interface PlayerExperienceInfo {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerExperienceInfo`. */
  kind?: string;
  /** The current number of experience points for the player. */
  currentExperiencePoints?: string;
  /** The timestamp when the player was leveled up, in millis since Unix epoch UTC. */
  lastLevelUpTimestampMillis?: string;
  /** The current level of the player. */
  currentLevel?: PlayerLevel;
  /** The next level of the player. If the current level is the maximum level, this should be same as the current level. */
  nextLevel?: PlayerLevel;
}

export const PlayerExperienceInfo: Schema.Schema<PlayerExperienceInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      currentExperiencePoints: Schema.optional(Schema.String),
      lastLevelUpTimestampMillis: Schema.optional(Schema.String),
      currentLevel: Schema.optional(PlayerLevel),
      nextLevel: Schema.optional(PlayerLevel),
    }),
  ).annotate({
    identifier: "PlayerExperienceInfo",
  }) as any as Schema.Schema<PlayerExperienceInfo>;

export interface Player {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#player` */
  kind?: string;
  /** The ID of the player. */
  playerId?: string;
  /** The name to display for the player. */
  displayName?: string;
  /** The base URL for the image that represents the player. */
  avatarImageUrl?: string;
  /** The url to the portrait mode player banner image. */
  bannerUrlPortrait?: string;
  /** The url to the landscape mode player banner image. */
  bannerUrlLandscape?: string;
  /** The player ID that was used for this player the first time they signed into the game in question. This is only populated for calls to player.get for the requesting player, only if the player ID has subsequently changed, and only to clients that support remapping player IDs. */
  originalPlayerId?: string;
  /** The player's profile settings. Controls whether or not the player's profile is visible to other players. */
  profileSettings?: ProfileSettings;
  /** A representation of the individual components of the name. */
  name?: { familyName?: string; givenName?: string };
  /** An object to represent Play Game experience information for the player. */
  experienceInfo?: PlayerExperienceInfo;
  /** The player's title rewarded for their game activities. */
  title?: string;
  /** The friend status of the given player, relative to the requester. This is unset if the player is not sharing their friends list with the game. */
  friendStatus?: "NO_RELATIONSHIP" | "FRIEND" | (string & {});
  /** Per-application unique player identifier. */
  gamePlayerId?: string;
}

export const Player: Schema.Schema<Player> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      playerId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      avatarImageUrl: Schema.optional(Schema.String),
      bannerUrlPortrait: Schema.optional(Schema.String),
      bannerUrlLandscape: Schema.optional(Schema.String),
      originalPlayerId: Schema.optional(Schema.String),
      profileSettings: Schema.optional(ProfileSettings),
      name: Schema.optional(
        Schema.Struct({
          familyName: Schema.optional(Schema.String),
          givenName: Schema.optional(Schema.String),
        }),
      ),
      experienceInfo: Schema.optional(PlayerExperienceInfo),
      title: Schema.optional(Schema.String),
      friendStatus: Schema.optional(Schema.String),
      gamePlayerId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Player" }) as any as Schema.Schema<Player>;

export interface ScopedPlayerIds {
  /** Game-scoped player identifier. This is the same id that is returned in GetPlayer game_player_id field. */
  gamePlayerId?: string;
  /** Identifier of the player across all games of the given developer. Every player has the same developer_player_key in all games of one developer. Developer player key changes for the game if the game is transferred to another developer. Note that game_player_id will stay unchanged. */
  developerPlayerKey?: string;
}

export const ScopedPlayerIds: Schema.Schema<ScopedPlayerIds> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gamePlayerId: Schema.optional(Schema.String),
      developerPlayerKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScopedPlayerIds",
  }) as any as Schema.Schema<ScopedPlayerIds>;

export interface ApplicationPlayerId {
  /** The application that this player identifier is for. */
  applicationId?: string;
  /** The player identifier for the application. */
  playerId?: string;
}

export const ApplicationPlayerId: Schema.Schema<ApplicationPlayerId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationId: Schema.optional(Schema.String),
      playerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ApplicationPlayerId",
  }) as any as Schema.Schema<ApplicationPlayerId>;

export interface GetMultipleApplicationPlayerIdsResponse {
  /** Output only. The requested applications along with the scoped ids for tha player, if that player has an id for the application. If not, the application is not included in the response. */
  playerIds?: Array<ApplicationPlayerId>;
}

export const GetMultipleApplicationPlayerIdsResponse: Schema.Schema<GetMultipleApplicationPlayerIdsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playerIds: Schema.optional(Schema.Array(ApplicationPlayerId)),
    }),
  ).annotate({
    identifier: "GetMultipleApplicationPlayerIdsResponse",
  }) as any as Schema.Schema<GetMultipleApplicationPlayerIdsResponse>;

export interface PlayerListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. */
  nextPageToken?: string;
  /** The players. */
  items?: Array<Player>;
}

export const PlayerListResponse: Schema.Schema<PlayerListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Player)),
    }),
  ).annotate({
    identifier: "PlayerListResponse",
  }) as any as Schema.Schema<PlayerListResponse>;

export interface RevisionCheckResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#revisionCheckResponse`. */
  kind?: string;
  /** The result of the revision check. */
  revisionStatus?: "OK" | "DEPRECATED" | "INVALID" | (string & {});
  /** The version of the API this client revision should use when calling API methods. */
  apiVersion?: string;
}

export const RevisionCheckResponse: Schema.Schema<RevisionCheckResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      revisionStatus: Schema.optional(Schema.String),
      apiVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RevisionCheckResponse",
  }) as any as Schema.Schema<RevisionCheckResponse>;

export interface LeaderboardScoreRank {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#leaderboardScoreRank`. */
  kind?: string;
  /** The rank in the leaderboard. */
  rank?: string;
  /** The rank in the leaderboard as a string. */
  formattedRank?: string;
  /** The number of scores in the leaderboard. */
  numScores?: string;
  /** The number of scores in the leaderboard as a string. */
  formattedNumScores?: string;
}

export const LeaderboardScoreRank: Schema.Schema<LeaderboardScoreRank> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      rank: Schema.optional(Schema.String),
      formattedRank: Schema.optional(Schema.String),
      numScores: Schema.optional(Schema.String),
      formattedNumScores: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LeaderboardScoreRank",
  }) as any as Schema.Schema<LeaderboardScoreRank>;

export interface PlayerLeaderboardScore {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerLeaderboardScore`. */
  kind?: string;
  /** The ID of the leaderboard this score is in. */
  leaderboard_id?: string;
  /** The numerical value of this score. */
  scoreValue?: string;
  /** The formatted value of this score. */
  scoreString?: string;
  /** The public rank of the score in this leaderboard. This object will not be present if the user is not sharing their scores publicly. */
  publicRank?: LeaderboardScoreRank;
  /** The social rank of the score in this leaderboard. */
  socialRank?: LeaderboardScoreRank;
  /** The rank of the score in the friends collection for this leaderboard. */
  friendsRank?: LeaderboardScoreRank;
  /** The time span of this score. */
  timeSpan?: "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The timestamp at which this score was recorded, in milliseconds since the epoch in UTC. */
  writeTimestamp?: string;
  /** Additional information about the score. Values must contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
}

export const PlayerLeaderboardScore: Schema.Schema<PlayerLeaderboardScore> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      leaderboard_id: Schema.optional(Schema.String),
      scoreValue: Schema.optional(Schema.String),
      scoreString: Schema.optional(Schema.String),
      publicRank: Schema.optional(LeaderboardScoreRank),
      socialRank: Schema.optional(LeaderboardScoreRank),
      friendsRank: Schema.optional(LeaderboardScoreRank),
      timeSpan: Schema.optional(Schema.String),
      writeTimestamp: Schema.optional(Schema.String),
      scoreTag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerLeaderboardScore",
  }) as any as Schema.Schema<PlayerLeaderboardScore>;

export interface PlayerLeaderboardScoreListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerLeaderboardScoreListResponse`. */
  kind?: string;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
  /** The Player resources for the owner of this score. */
  player?: Player;
  /** The leaderboard scores. */
  items?: Array<PlayerLeaderboardScore>;
}

export const PlayerLeaderboardScoreListResponse: Schema.Schema<PlayerLeaderboardScoreListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      player: Schema.optional(Player),
      items: Schema.optional(Schema.Array(PlayerLeaderboardScore)),
    }),
  ).annotate({
    identifier: "PlayerLeaderboardScoreListResponse",
  }) as any as Schema.Schema<PlayerLeaderboardScoreListResponse>;

export interface LeaderboardEntry {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#leaderboardEntry`. */
  kind?: string;
  /** The player who holds this score. */
  player?: Player;
  /** The rank of this score for this leaderboard. */
  scoreRank?: string;
  /** The localized string for the rank of this score for this leaderboard. */
  formattedScoreRank?: string;
  /** The numerical value of this score. */
  scoreValue?: string;
  /** The localized string for the numerical value of this score. */
  formattedScore?: string;
  /** The time span of this high score. */
  timeSpan?: "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The timestamp at which this score was recorded, in milliseconds since the epoch in UTC. */
  writeTimestampMillis?: string;
  /** Additional information about the score. Values must contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
}

export const LeaderboardEntry: Schema.Schema<LeaderboardEntry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      player: Schema.optional(Player),
      scoreRank: Schema.optional(Schema.String),
      formattedScoreRank: Schema.optional(Schema.String),
      scoreValue: Schema.optional(Schema.String),
      formattedScore: Schema.optional(Schema.String),
      timeSpan: Schema.optional(Schema.String),
      writeTimestampMillis: Schema.optional(Schema.String),
      scoreTag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LeaderboardEntry",
  }) as any as Schema.Schema<LeaderboardEntry>;

export interface LeaderboardScores {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#leaderboardScores`. */
  kind?: string;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
  /** The pagination token for the previous page of results. */
  prevPageToken?: string;
  /** The total number of scores in the leaderboard. */
  numScores?: string;
  /** The score of the requesting player on the leaderboard. The player's score may appear both here and in the list of scores above. If you are viewing a public leaderboard and the player is not sharing their gameplay information publicly, the `scoreRank`and `formattedScoreRank` values will not be present. */
  playerScore?: LeaderboardEntry;
  /** The scores in the leaderboard. */
  items?: Array<LeaderboardEntry>;
}

export const LeaderboardScores: Schema.Schema<LeaderboardScores> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      prevPageToken: Schema.optional(Schema.String),
      numScores: Schema.optional(Schema.String),
      playerScore: Schema.optional(LeaderboardEntry),
      items: Schema.optional(Schema.Array(LeaderboardEntry)),
    }),
  ).annotate({
    identifier: "LeaderboardScores",
  }) as any as Schema.Schema<LeaderboardScores>;

export interface PlayerScore {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerScore`. */
  kind?: string;
  /** The time span for this player score. */
  timeSpan?: "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The numerical value for this player score. */
  score?: string;
  /** The formatted score for this player score. */
  formattedScore?: string;
  /** Additional information about this score. Values will contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
}

export const PlayerScore: Schema.Schema<PlayerScore> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      timeSpan: Schema.optional(Schema.String),
      score: Schema.optional(Schema.String),
      formattedScore: Schema.optional(Schema.String),
      scoreTag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerScore",
  }) as any as Schema.Schema<PlayerScore>;

export interface PlayerScoreResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerScoreResponse`. */
  kind?: string;
  /** The time spans where the submitted score is better than the existing score for that time span. */
  beatenScoreTimeSpans?: Array<"ALL_TIME" | "WEEKLY" | "DAILY" | (string & {})>;
  /** The scores in time spans that have not been beaten. As an example, the submitted score may be better than the player's `DAILY` score, but not better than the player's scores for the `WEEKLY` or `ALL_TIME` time spans. */
  unbeatenScores?: Array<PlayerScore>;
  /** The formatted value of the submitted score. */
  formattedScore?: string;
  /** The leaderboard ID that this score was submitted to. */
  leaderboardId?: string;
  /** Additional information about this score. Values will contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
}

export const PlayerScoreResponse: Schema.Schema<PlayerScoreResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      beatenScoreTimeSpans: Schema.optional(Schema.Array(Schema.String)),
      unbeatenScores: Schema.optional(Schema.Array(PlayerScore)),
      formattedScore: Schema.optional(Schema.String),
      leaderboardId: Schema.optional(Schema.String),
      scoreTag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayerScoreResponse",
  }) as any as Schema.Schema<PlayerScoreResponse>;

export interface ScoreSubmission {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#scoreSubmission`. */
  kind?: string;
  /** The leaderboard this score is being submitted to. */
  leaderboardId?: string;
  /** The new score being submitted. */
  score?: string;
  /** Additional information about this score. Values will contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
  /** Signature Values will contain URI-safe characters as defined by section 2.3 of RFC 3986. */
  signature?: string;
}

export const ScoreSubmission: Schema.Schema<ScoreSubmission> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      leaderboardId: Schema.optional(Schema.String),
      score: Schema.optional(Schema.String),
      scoreTag: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScoreSubmission",
  }) as any as Schema.Schema<ScoreSubmission>;

export interface PlayerScoreSubmissionList {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerScoreSubmissionList`. */
  kind?: string;
  /** The score submissions. */
  scores?: Array<ScoreSubmission>;
}

export const PlayerScoreSubmissionList: Schema.Schema<PlayerScoreSubmissionList> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      scores: Schema.optional(Schema.Array(ScoreSubmission)),
    }),
  ).annotate({
    identifier: "PlayerScoreSubmissionList",
  }) as any as Schema.Schema<PlayerScoreSubmissionList>;

export interface PlayerScoreListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#playerScoreListResponse`. */
  kind?: string;
  /** The score submissions statuses. */
  submittedScores?: Array<PlayerScoreResponse>;
}

export const PlayerScoreListResponse: Schema.Schema<PlayerScoreListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      submittedScores: Schema.optional(Schema.Array(PlayerScoreResponse)),
    }),
  ).annotate({
    identifier: "PlayerScoreListResponse",
  }) as any as Schema.Schema<PlayerScoreListResponse>;

export interface SnapshotImage {
  /** The width of the image. */
  width?: number;
  /** The height of the image. */
  height?: number;
  /** The MIME type of the image. */
  mime_type?: string;
  /** The URL of the image. This URL may be invalidated at any time and should not be cached. */
  url?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#snapshotImage`. */
  kind?: string;
}

export const SnapshotImage: Schema.Schema<SnapshotImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      width: Schema.optional(Schema.Number),
      height: Schema.optional(Schema.Number),
      mime_type: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SnapshotImage",
  }) as any as Schema.Schema<SnapshotImage>;

export interface Snapshot {
  /** The ID of the snapshot. */
  id?: string;
  /** The ID of the file underlying this snapshot in the Drive API. Only present if the snapshot is a view on a Drive file and the file is owned by the caller. */
  driveId?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#snapshot`. */
  kind?: string;
  /** The type of this snapshot. */
  type?: "SAVE_GAME" | (string & {});
  /** The title of this snapshot. */
  title?: string;
  /** The description of this snapshot. */
  description?: string;
  /** The timestamp (in millis since Unix epoch) of the last modification to this snapshot. */
  lastModifiedMillis?: string;
  /** The duration associated with this snapshot, in millis. */
  durationMillis?: string;
  /** The cover image of this snapshot. May be absent if there is no image. */
  coverImage?: SnapshotImage;
  /** The unique name provided when the snapshot was created. */
  uniqueName?: string;
  /** The progress value (64-bit integer set by developer) associated with this snapshot. */
  progressValue?: string;
}

export const Snapshot: Schema.Schema<Snapshot> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      driveId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      lastModifiedMillis: Schema.optional(Schema.String),
      durationMillis: Schema.optional(Schema.String),
      coverImage: Schema.optional(SnapshotImage),
      uniqueName: Schema.optional(Schema.String),
      progressValue: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface SnapshotListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#snapshotListResponse`. */
  kind?: string;
  /** Token corresponding to the next page of results. If there are no more results, the token is omitted. */
  nextPageToken?: string;
  /** The snapshots. */
  items?: Array<Snapshot>;
}

export const SnapshotListResponse: Schema.Schema<SnapshotListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Snapshot)),
    }),
  ).annotate({
    identifier: "SnapshotListResponse",
  }) as any as Schema.Schema<SnapshotListResponse>;

export interface StatsResponse {
  /** The probability of the player not returning to play the game in the next day. E.g., 0, 0.1, 0.5, ..., 1.0. Not populated if there is not enough information. */
  churn_probability?: number;
  /** Number of in-app purchases made by the player in this game. E.g., 0, 1, 5, 10, ... . Not populated if there is not enough information. */
  num_purchases?: number;
  /** The approximate spend percentile of the player in this game. E.g., 0, 0.25, 0.5, 0.75. Not populated if there is not enough information. */
  spend_percentile?: number;
  /** Number of days since the player last played this game. E.g., 0, 1, 5, 10, ... . Not populated if there is not enough information. */
  days_since_last_played?: number;
  /** The approximate number of sessions of the player within the last 28 days, where a session begins when the player is connected to Play Games Services and ends when they are disconnected. E.g., 0, 1, 5, 10, ... . Not populated if there is not enough information. */
  num_sessions?: number;
  /** The approximation of the sessions percentile of the player within the last 30 days, where a session begins when the player is connected to Play Games Services and ends when they are disconnected. E.g., 0, 0.25, 0.5, 0.75. Not populated if there is not enough information. */
  num_sessions_percentile?: number;
  /** Average session length in minutes of the player. E.g., 1, 30, 60, ... . Not populated if there is not enough information. */
  avg_session_length_minutes?: number;
  /** The probability of the player going to spend the game in the next seven days. E.g., 0, 0.25, 0.50, 0.75. Not populated if there is not enough information. */
  spend_probability?: number;
  /** The probability of the player going to spend beyond a threshold amount of money. E.g., 0, 0.25, 0.50, 0.75. Not populated if there is not enough information. */
  high_spender_probability?: number;
  /** The predicted amount of money that the player going to spend in the next 28 days. E.g., 1, 30, 60, ... . Not populated if there is not enough information. */
  total_spend_next_28_days?: number;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `games#statsResponse`. */
  kind?: string;
}

export const StatsResponse: Schema.Schema<StatsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      churn_probability: Schema.optional(Schema.Number),
      num_purchases: Schema.optional(Schema.Number),
      spend_percentile: Schema.optional(Schema.Number),
      days_since_last_played: Schema.optional(Schema.Number),
      num_sessions: Schema.optional(Schema.Number),
      num_sessions_percentile: Schema.optional(Schema.Number),
      avg_session_length_minutes: Schema.optional(Schema.Number),
      spend_probability: Schema.optional(Schema.Number),
      high_spender_probability: Schema.optional(Schema.Number),
      total_spend_next_28_days: Schema.optional(Schema.Number),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "StatsResponse",
  }) as any as Schema.Schema<StatsResponse>;

export interface LinkPersonaRequest {
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. */
  sessionId?: string;
  /** Required. Stable identifier of the in-game account. Please refrain from re-using the same persona for different games. */
  persona?: string;
  /** Required. Value of the token to create. Opaque to Play Games and assumed to be non-stable (encrypted with key rotation). */
  token?: string;
  /** Required. Cardinality constraint to observe when linking a persona to a player in the scope of a game. */
  cardinalityConstraint?: "ONE_PERSONA_TO_ONE_PLAYER" | (string & {});
  /** Required. Resolution policy to apply when the linking of a persona to a player would result in violating the specified cardinality constraint. */
  conflictingLinksResolutionPolicy?:
    | "KEEP_EXISTING_LINKS"
    | "CREATE_NEW_LINK"
    | (string & {});
  /** Input only. Optional expiration time. */
  expireTime?: string;
  /** Input only. Optional time-to-live. */
  ttl?: string;
}

export const LinkPersonaRequest: Schema.Schema<LinkPersonaRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionId: Schema.optional(Schema.String),
      persona: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      cardinalityConstraint: Schema.optional(Schema.String),
      conflictingLinksResolutionPolicy: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      ttl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkPersonaRequest",
  }) as any as Schema.Schema<LinkPersonaRequest>;

export interface LinkPersonaResponse {
  /** Output only. State of a persona linking attempt. */
  state?: "LINK_CREATED" | "PERSONA_OR_PLAYER_ALREADY_LINKED" | (string & {});
}

export const LinkPersonaResponse: Schema.Schema<LinkPersonaResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LinkPersonaResponse",
  }) as any as Schema.Schema<LinkPersonaResponse>;

export interface RecallToken {
  /** Required. Value of the Recall token as it is provided by the client via LinkPersona RPC */
  token?: string;
  /** Required. Whether the persona identified by the token is linked to multiple PGS Players */
  multiPlayerPersona?: boolean;
  /** Optional. Optional expiration time of the token */
  expireTime?: string;
}

export const RecallToken: Schema.Schema<RecallToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
      multiPlayerPersona: Schema.optional(Schema.Boolean),
      expireTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecallToken",
  }) as any as Schema.Schema<RecallToken>;

export interface RetrievePlayerTokensResponse {
  /** Required. Recall tokens associated with the requested PGS Player principal */
  tokens?: Array<RecallToken>;
}

export const RetrievePlayerTokensResponse: Schema.Schema<RetrievePlayerTokensResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokens: Schema.optional(Schema.Array(RecallToken)),
    }),
  ).annotate({
    identifier: "RetrievePlayerTokensResponse",
  }) as any as Schema.Schema<RetrievePlayerTokensResponse>;

export interface GamePlayerToken {
  /** The application that this player identifier is for. */
  applicationId?: string;
  /** Recall token data. */
  recallToken?: RecallToken;
}

export const GamePlayerToken: Schema.Schema<GamePlayerToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicationId: Schema.optional(Schema.String),
      recallToken: Schema.optional(RecallToken),
    }),
  ).annotate({
    identifier: "GamePlayerToken",
  }) as any as Schema.Schema<GamePlayerToken>;

export interface RetrieveDeveloperGamesLastPlayerTokenResponse {
  /** The recall token associated with the requested PGS Player principal. It can be unset if there is no recall token associated with the requested principal. */
  gamePlayerToken?: GamePlayerToken;
}

export const RetrieveDeveloperGamesLastPlayerTokenResponse: Schema.Schema<RetrieveDeveloperGamesLastPlayerTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gamePlayerToken: Schema.optional(GamePlayerToken),
    }),
  ).annotate({
    identifier: "RetrieveDeveloperGamesLastPlayerTokenResponse",
  }) as any as Schema.Schema<RetrieveDeveloperGamesLastPlayerTokenResponse>;

export interface RetrieveGamesPlayerTokensResponse {
  /** The requested applications along with the recall tokens for the player. If the player does not have recall tokens for an application, that application is not included in the response. */
  gamePlayerTokens?: Array<GamePlayerToken>;
}

export const RetrieveGamesPlayerTokensResponse: Schema.Schema<RetrieveGamesPlayerTokensResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gamePlayerTokens: Schema.optional(Schema.Array(GamePlayerToken)),
    }),
  ).annotate({
    identifier: "RetrieveGamesPlayerTokensResponse",
  }) as any as Schema.Schema<RetrieveGamesPlayerTokensResponse>;

export interface UnlinkPersonaRequest {
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. */
  sessionId?: string;
  /** Value of the Recall token as it was provided by the client in LinkPersona RPC */
  token?: string;
  /** Value of the 'persona' field as it was provided by the client in LinkPersona RPC */
  persona?: string;
}

export const UnlinkPersonaRequest: Schema.Schema<UnlinkPersonaRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionId: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      persona: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UnlinkPersonaRequest",
  }) as any as Schema.Schema<UnlinkPersonaRequest>;

export interface UnlinkPersonaResponse {
  /** Required. Whether a Recall token specified by the request was deleted. Can be 'false' when there were no Recall tokens satisfied the criteria from the request. */
  unlinked?: boolean;
}

export const UnlinkPersonaResponse: Schema.Schema<UnlinkPersonaResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unlinked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "UnlinkPersonaResponse",
  }) as any as Schema.Schema<UnlinkPersonaResponse>;

export interface ResetPersonaRequest {
  /** Value of the 'persona' field as it was provided by the client in LinkPersona RPC */
  persona?: string;
}

export const ResetPersonaRequest: Schema.Schema<ResetPersonaRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      persona: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResetPersonaRequest",
  }) as any as Schema.Schema<ResetPersonaRequest>;

export interface ResetPersonaResponse {
  /** Required. Whether any tokens were unlinked as a result of this request. */
  unlinked?: boolean;
}

export const ResetPersonaResponse: Schema.Schema<ResetPersonaResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      unlinked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ResetPersonaResponse",
  }) as any as Schema.Schema<ResetPersonaResponse>;

export interface PlayGroupingApiToken {
  /** Value of the token. */
  tokenValue?: string;
}

export const PlayGroupingApiToken: Schema.Schema<PlayGroupingApiToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlayGroupingApiToken",
  }) as any as Schema.Schema<PlayGroupingApiToken>;

export interface GeneratePlayGroupingApiTokenResponse {
  /** Token for accessing the Play Grouping API. */
  token?: PlayGroupingApiToken;
}

export const GeneratePlayGroupingApiTokenResponse: Schema.Schema<GeneratePlayGroupingApiTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(PlayGroupingApiToken),
    }),
  ).annotate({
    identifier: "GeneratePlayGroupingApiTokenResponse",
  }) as any as Schema.Schema<GeneratePlayGroupingApiTokenResponse>;

export interface GenerateRecallPlayGroupingApiTokenResponse {
  /** Token for accessing the Play Grouping API. */
  token?: PlayGroupingApiToken;
}

export const GenerateRecallPlayGroupingApiTokenResponse: Schema.Schema<GenerateRecallPlayGroupingApiTokenResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(PlayGroupingApiToken),
    }),
  ).annotate({
    identifier: "GenerateRecallPlayGroupingApiTokenResponse",
  }) as any as Schema.Schema<GenerateRecallPlayGroupingApiTokenResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListAchievementDefinitionsRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of achievement resources to return in the response, used for paging. For any response, the actual number of achievement resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListAchievementDefinitionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/achievements" }),
    svc,
  ) as unknown as Schema.Schema<ListAchievementDefinitionsRequest>;

export type ListAchievementDefinitionsResponse =
  AchievementDefinitionsListResponse;
export const ListAchievementDefinitionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementDefinitionsListResponse;

export type ListAchievementDefinitionsError = DefaultErrors;

/** Lists all the achievement definitions for your application. */
export const listAchievementDefinitions: API.PaginatedOperationMethod<
  ListAchievementDefinitionsRequest,
  ListAchievementDefinitionsResponse,
  ListAchievementDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAchievementDefinitionsRequest,
  output: ListAchievementDefinitionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface IncrementAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
  /** A randomly generated numeric ID for each request specified by the caller. This number is used at the server to ensure that the request is handled correctly across retries. */
  requestId?: string;
  /** Required. The number of steps to increment. */
  stepsToIncrement: number;
}

export const IncrementAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
    requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
    stepsToIncrement: Schema.Number.pipe(T.HttpQuery("stepsToIncrement")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/achievements/{achievementId}/increment",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<IncrementAchievementsRequest>;

export type IncrementAchievementsResponse = AchievementIncrementResponse;
export const IncrementAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementIncrementResponse;

export type IncrementAchievementsError = DefaultErrors;

/** Increments the steps of the achievement with the given ID for the currently authenticated player. */
export const incrementAchievements: API.OperationMethod<
  IncrementAchievementsRequest,
  IncrementAchievementsResponse,
  IncrementAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: IncrementAchievementsRequest,
  output: IncrementAchievementsResponse,
  errors: [],
}));

export interface ListAchievementsRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of achievement resources to return in the response, used for paging. For any response, the actual number of achievement resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** Tells the server to return only achievements with the specified state. If this parameter isn't specified, all achievements are returned. */
  state?: "ALL" | "HIDDEN" | "REVEALED" | "UNLOCKED" | (string & {});
}

export const ListAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    playerId: Schema.String.pipe(T.HttpPath("playerId")),
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    state: Schema.optional(Schema.String).pipe(T.HttpQuery("state")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/players/{playerId}/achievements" }),
    svc,
  ) as unknown as Schema.Schema<ListAchievementsRequest>;

export type ListAchievementsResponse = PlayerAchievementListResponse;
export const ListAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerAchievementListResponse;

export type ListAchievementsError = DefaultErrors;

/** Lists the progress for all your application's achievements for the currently authenticated player. */
export const listAchievements: API.PaginatedOperationMethod<
  ListAchievementsRequest,
  ListAchievementsResponse,
  ListAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAchievementsRequest,
  output: ListAchievementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface RevealAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const RevealAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/achievements/{achievementId}/reveal",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RevealAchievementsRequest>;

export type RevealAchievementsResponse = AchievementRevealResponse;
export const RevealAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementRevealResponse;

export type RevealAchievementsError = DefaultErrors;

/** Sets the state of the achievement with the given ID to `REVEALED` for the currently authenticated player. */
export const revealAchievements: API.OperationMethod<
  RevealAchievementsRequest,
  RevealAchievementsResponse,
  RevealAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RevealAchievementsRequest,
  output: RevealAchievementsResponse,
  errors: [],
}));

export interface SetStepsAtLeastAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
  /** Required. The minimum value to set the steps to. */
  steps: number;
}

export const SetStepsAtLeastAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
    steps: Schema.Number.pipe(T.HttpQuery("steps")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/achievements/{achievementId}/setStepsAtLeast",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetStepsAtLeastAchievementsRequest>;

export type SetStepsAtLeastAchievementsResponse =
  AchievementSetStepsAtLeastResponse;
export const SetStepsAtLeastAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementSetStepsAtLeastResponse;

export type SetStepsAtLeastAchievementsError = DefaultErrors;

/** Sets the steps for the currently authenticated player towards unlocking an achievement. If the steps parameter is less than the current number of steps that the player already gained for the achievement, the achievement is not modified. */
export const setStepsAtLeastAchievements: API.OperationMethod<
  SetStepsAtLeastAchievementsRequest,
  SetStepsAtLeastAchievementsResponse,
  SetStepsAtLeastAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetStepsAtLeastAchievementsRequest,
  output: SetStepsAtLeastAchievementsResponse,
  errors: [],
}));

export interface UnlockAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const UnlockAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/achievements/{achievementId}/unlock",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UnlockAchievementsRequest>;

export type UnlockAchievementsResponse = AchievementUnlockResponse;
export const UnlockAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementUnlockResponse;

export type UnlockAchievementsError = DefaultErrors;

/** Unlocks this achievement for the currently authenticated player. */
export const unlockAchievements: API.OperationMethod<
  UnlockAchievementsRequest,
  UnlockAchievementsResponse,
  UnlockAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnlockAchievementsRequest,
  output: UnlockAchievementsResponse,
  errors: [],
}));

export interface UpdateMultipleAchievementsRequest {
  /** Request body */
  body?: AchievementUpdateMultipleRequest;
}

export const UpdateMultipleAchievementsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(AchievementUpdateMultipleRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/achievements/updateMultiple",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateMultipleAchievementsRequest>;

export type UpdateMultipleAchievementsResponse =
  AchievementUpdateMultipleResponse;
export const UpdateMultipleAchievementsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AchievementUpdateMultipleResponse;

export type UpdateMultipleAchievementsError = DefaultErrors;

/** Updates multiple achievements for the currently authenticated player. */
export const updateMultipleAchievements: API.OperationMethod<
  UpdateMultipleAchievementsRequest,
  UpdateMultipleAchievementsResponse,
  UpdateMultipleAchievementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMultipleAchievementsRequest,
  output: UpdateMultipleAchievementsResponse,
  errors: [],
}));

export interface GetApplicationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Restrict application details returned to the specific platform. */
  platformType?: "ANDROID" | "IOS" | "WEB_APP" | (string & {});
}

export const GetApplicationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    platformType: Schema.optional(Schema.String).pipe(
      T.HttpQuery("platformType"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "games/v1/applications/{applicationId}" }),
  svc,
) as unknown as Schema.Schema<GetApplicationsRequest>;

export type GetApplicationsResponse = Application;
export const GetApplicationsResponse = /*@__PURE__*/ /*#__PURE__*/ Application;

export type GetApplicationsError = DefaultErrors;

/** Retrieves the metadata of the application with the given ID. If the requested application is not available for the specified `platformType`, the returned response will not include any instance data. */
export const getApplications: API.OperationMethod<
  GetApplicationsRequest,
  GetApplicationsResponse,
  GetApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationsRequest,
  output: GetApplicationsResponse,
  errors: [],
}));

export interface PlayedApplicationsRequest {}

export const PlayedApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/applications/played",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PlayedApplicationsRequest>;

export interface PlayedApplicationsResponse {}
export const PlayedApplicationsResponse: Schema.Schema<PlayedApplicationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<PlayedApplicationsResponse>;

export type PlayedApplicationsError = DefaultErrors;

/** Indicate that the currently authenticated user is playing your application. */
export const playedApplications: API.OperationMethod<
  PlayedApplicationsRequest,
  PlayedApplicationsResponse,
  PlayedApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PlayedApplicationsRequest,
  output: PlayedApplicationsResponse,
  errors: [],
}));

export interface VerifyApplicationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
}

export const VerifyApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/applications/{applicationId}/verify",
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyApplicationsRequest>;

export type VerifyApplicationsResponse = ApplicationVerifyResponse;
export const VerifyApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ApplicationVerifyResponse;

export type VerifyApplicationsError = DefaultErrors;

/** Verifies the auth token provided with this request is for the application with the specified ID, and returns the ID of the player it was granted for. */
export const verifyApplications: API.OperationMethod<
  VerifyApplicationsRequest,
  VerifyApplicationsResponse,
  VerifyApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyApplicationsRequest,
  output: VerifyApplicationsResponse,
  errors: [],
}));

export interface GetEndPointApplicationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId?: string;
  /** Type of endpoint being requested. */
  endPointType?: "PROFILE_CREATION" | "PROFILE_SETTINGS" | (string & {});
}

export const GetEndPointApplicationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("applicationId"),
    ),
    endPointType: Schema.optional(Schema.String).pipe(
      T.HttpQuery("endPointType"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/applications/getEndPoint",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GetEndPointApplicationsRequest>;

export type GetEndPointApplicationsResponse = EndPoint;
export const GetEndPointApplicationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ EndPoint;

export type GetEndPointApplicationsError = DefaultErrors;

/** Returns a URL for the requested end point type. */
export const getEndPointApplications: API.OperationMethod<
  GetEndPointApplicationsRequest,
  GetEndPointApplicationsResponse,
  GetEndPointApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEndPointApplicationsRequest,
  output: GetEndPointApplicationsResponse,
  errors: [],
}));

export interface ListByPlayerEventsRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of events to return in the response, used for paging. For any response, the actual number of events to return may be less than the specified maxResults. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListByPlayerEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/events" }),
    svc,
  ) as unknown as Schema.Schema<ListByPlayerEventsRequest>;

export type ListByPlayerEventsResponse = PlayerEventListResponse;
export const ListByPlayerEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerEventListResponse;

export type ListByPlayerEventsError = DefaultErrors;

/** Returns a list showing the current progress on events in this application for the currently authenticated user. */
export const listByPlayerEvents: API.PaginatedOperationMethod<
  ListByPlayerEventsRequest,
  ListByPlayerEventsResponse,
  ListByPlayerEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListByPlayerEventsRequest,
  output: ListByPlayerEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListDefinitionsEventsRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of event definitions to return in the response, used for paging. For any response, the actual number of event definitions to return may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListDefinitionsEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/eventDefinitions" }),
    svc,
  ) as unknown as Schema.Schema<ListDefinitionsEventsRequest>;

export type ListDefinitionsEventsResponse = EventDefinitionListResponse;
export const ListDefinitionsEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ EventDefinitionListResponse;

export type ListDefinitionsEventsError = DefaultErrors;

/** Returns a list of the event definitions in this application. */
export const listDefinitionsEvents: API.PaginatedOperationMethod<
  ListDefinitionsEventsRequest,
  ListDefinitionsEventsResponse,
  ListDefinitionsEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDefinitionsEventsRequest,
  output: ListDefinitionsEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface RecordEventsRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Request body */
  body?: EventRecordRequest;
}

export const RecordEventsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  body: Schema.optional(EventRecordRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "games/v1/events", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RecordEventsRequest>;

export type RecordEventsResponse = EventUpdateResponse;
export const RecordEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ EventUpdateResponse;

export type RecordEventsError = DefaultErrors;

/** Records a batch of changes to the number of times events have occurred for the currently authenticated user of this application. */
export const recordEvents: API.OperationMethod<
  RecordEventsRequest,
  RecordEventsResponse,
  RecordEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RecordEventsRequest,
  output: RecordEventsResponse,
  errors: [],
}));

export interface GetLeaderboardsRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
}

export const GetLeaderboardsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  },
).pipe(
  T.Http({ method: "GET", path: "games/v1/leaderboards/{leaderboardId}" }),
  svc,
) as unknown as Schema.Schema<GetLeaderboardsRequest>;

export type GetLeaderboardsResponse = Leaderboard;
export const GetLeaderboardsResponse = /*@__PURE__*/ /*#__PURE__*/ Leaderboard;

export type GetLeaderboardsError = DefaultErrors;

/** Retrieves the metadata of the leaderboard with the given ID. */
export const getLeaderboards: API.OperationMethod<
  GetLeaderboardsRequest,
  GetLeaderboardsResponse,
  GetLeaderboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLeaderboardsRequest,
  output: GetLeaderboardsResponse,
  errors: [],
}));

export interface ListLeaderboardsRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of leaderboards to return in the response. For any response, the actual number of leaderboards returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListLeaderboardsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/leaderboards" }),
    svc,
  ) as unknown as Schema.Schema<ListLeaderboardsRequest>;

export type ListLeaderboardsResponse = LeaderboardListResponse;
export const ListLeaderboardsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LeaderboardListResponse;

export type ListLeaderboardsError = DefaultErrors;

/** Lists all the leaderboard metadata for your application. */
export const listLeaderboards: API.PaginatedOperationMethod<
  ListLeaderboardsRequest,
  ListLeaderboardsResponse,
  ListLeaderboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLeaderboardsRequest,
  output: ListLeaderboardsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetMetagameConfigMetagameRequest {}

export const GetMetagameConfigMetagameRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "games/v1/metagameConfig" }),
    svc,
  ) as unknown as Schema.Schema<GetMetagameConfigMetagameRequest>;

export type GetMetagameConfigMetagameResponse = MetagameConfig;
export const GetMetagameConfigMetagameResponse =
  /*@__PURE__*/ /*#__PURE__*/ MetagameConfig;

export type GetMetagameConfigMetagameError = DefaultErrors;

/** Return the metagame configuration data for the calling application. */
export const getMetagameConfigMetagame: API.OperationMethod<
  GetMetagameConfigMetagameRequest,
  GetMetagameConfigMetagameResponse,
  GetMetagameConfigMetagameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMetagameConfigMetagameRequest,
  output: GetMetagameConfigMetagameResponse,
  errors: [],
}));

export interface ListCategoriesByPlayerMetagameRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The collection of categories for which data will be returned. */
  collection: "ALL" | (string & {});
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of category resources to return in the response, used for paging. For any response, the actual number of category resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListCategoriesByPlayerMetagameRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    playerId: Schema.String.pipe(T.HttpPath("playerId")),
    collection: Schema.String.pipe(T.HttpPath("collection")),
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/players/{playerId}/categories/{collection}",
    }),
    svc,
  ) as unknown as Schema.Schema<ListCategoriesByPlayerMetagameRequest>;

export type ListCategoriesByPlayerMetagameResponse = CategoryListResponse;
export const ListCategoriesByPlayerMetagameResponse =
  /*@__PURE__*/ /*#__PURE__*/ CategoryListResponse;

export type ListCategoriesByPlayerMetagameError = DefaultErrors;

/** List play data aggregated per category for the player corresponding to `playerId`. */
export const listCategoriesByPlayerMetagame: API.PaginatedOperationMethod<
  ListCategoriesByPlayerMetagameRequest,
  ListCategoriesByPlayerMetagameResponse,
  ListCategoriesByPlayerMetagameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCategoriesByPlayerMetagameRequest,
  output: ListCategoriesByPlayerMetagameResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetPlayersRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Consistency token of the player id. The call returns a 'not found' result when the token is present and invalid. Empty value is ignored. See also GlobalPlayerIdConsistencyTokenProto */
  playerIdConsistencyToken?: string;
}

export const GetPlayersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  playerId: Schema.String.pipe(T.HttpPath("playerId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  playerIdConsistencyToken: Schema.optional(Schema.String).pipe(
    T.HttpQuery("playerIdConsistencyToken"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "games/v1/players/{playerId}" }),
  svc,
) as unknown as Schema.Schema<GetPlayersRequest>;

export type GetPlayersResponse = Player;
export const GetPlayersResponse = /*@__PURE__*/ /*#__PURE__*/ Player;

export type GetPlayersError = DefaultErrors;

/** Retrieves the Player resource with the given ID. To retrieve the player for the currently authenticated user, set `playerId` to `me`. */
export const getPlayers: API.OperationMethod<
  GetPlayersRequest,
  GetPlayersResponse,
  GetPlayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlayersRequest,
  output: GetPlayersResponse,
  errors: [],
}));

export interface GetScopedPlayerIdsPlayersRequest {}

export const GetScopedPlayerIdsPlayersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "games/v1/players/me/scopedIds" }),
    svc,
  ) as unknown as Schema.Schema<GetScopedPlayerIdsPlayersRequest>;

export type GetScopedPlayerIdsPlayersResponse = ScopedPlayerIds;
export const GetScopedPlayerIdsPlayersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ScopedPlayerIds;

export type GetScopedPlayerIdsPlayersError = DefaultErrors;

/** Retrieves scoped player identifiers for currently authenticated user. */
export const getScopedPlayerIdsPlayers: API.OperationMethod<
  GetScopedPlayerIdsPlayersRequest,
  GetScopedPlayerIdsPlayersResponse,
  GetScopedPlayerIdsPlayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetScopedPlayerIdsPlayersRequest,
  output: GetScopedPlayerIdsPlayersResponse,
  errors: [],
}));

export interface GetMultipleApplicationPlayerIdsPlayersRequest {
  /** Required. The application IDs from the Google Play developer console for the games to return scoped ids for. */
  applicationIds?: string[];
}

export const GetMultipleApplicationPlayerIdsPlayersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applicationIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("applicationIds"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/players/me/multipleApplicationPlayerIds",
    }),
    svc,
  ) as unknown as Schema.Schema<GetMultipleApplicationPlayerIdsPlayersRequest>;

export type GetMultipleApplicationPlayerIdsPlayersResponse =
  GetMultipleApplicationPlayerIdsResponse;
export const GetMultipleApplicationPlayerIdsPlayersResponse =
  /*@__PURE__*/ /*#__PURE__*/ GetMultipleApplicationPlayerIdsResponse;

export type GetMultipleApplicationPlayerIdsPlayersError = DefaultErrors;

/** Get the application player ids for the currently authenticated player across all requested games by the same developer as the calling application. This will only return ids for players that actually have an id (scoped or otherwise) with that game. */
export const getMultipleApplicationPlayerIdsPlayers: API.OperationMethod<
  GetMultipleApplicationPlayerIdsPlayersRequest,
  GetMultipleApplicationPlayerIdsPlayersResponse,
  GetMultipleApplicationPlayerIdsPlayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMultipleApplicationPlayerIdsPlayersRequest,
  output: GetMultipleApplicationPlayerIdsPlayersResponse,
  errors: [],
}));

export interface ListPlayersRequest {
  /** Collection of players being retrieved */
  collection: "CONNECTED" | "VISIBLE" | "FRIENDS_ALL" | (string & {});
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of player resources to return in the response, used for paging. For any response, the actual number of player resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListPlayersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  collection: Schema.String.pipe(T.HttpPath("collection")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "games/v1/players/me/players/{collection}" }),
  svc,
) as unknown as Schema.Schema<ListPlayersRequest>;

export type ListPlayersResponse = PlayerListResponse;
export const ListPlayersResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerListResponse;

export type ListPlayersError = DefaultErrors;

/** Get the collection of players for the currently authenticated user. */
export const listPlayers: API.PaginatedOperationMethod<
  ListPlayersRequest,
  ListPlayersResponse,
  ListPlayersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlayersRequest,
  output: ListPlayersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface CheckRevisionsRequest {
  /** Required. The revision of the client SDK used by your application. Format: `[PLATFORM_TYPE]:[VERSION_NUMBER]`. Possible values of `PLATFORM_TYPE` are: * `ANDROID` - Client is running the Android SDK. * `IOS` - Client is running the iOS SDK. * `WEB_APP` - Client is running as a Web App. */
  clientRevision: string;
}

export const CheckRevisionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  clientRevision: Schema.String.pipe(T.HttpQuery("clientRevision")),
}).pipe(
  T.Http({ method: "GET", path: "games/v1/revisions/check" }),
  svc,
) as unknown as Schema.Schema<CheckRevisionsRequest>;

export type CheckRevisionsResponse = RevisionCheckResponse;
export const CheckRevisionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ RevisionCheckResponse;

export type CheckRevisionsError = DefaultErrors;

/** Checks whether the games client is out of date. */
export const checkRevisions: API.OperationMethod<
  CheckRevisionsRequest,
  CheckRevisionsResponse,
  CheckRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CheckRevisionsRequest,
  output: CheckRevisionsResponse,
  errors: [],
}));

export interface GetScoresRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The ID of the leaderboard. Can be set to 'ALL' to retrieve data for all leaderboards for this application. */
  leaderboardId: string;
  /** The time span for the scores and ranks you're requesting. */
  timeSpan: "ALL" | "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The types of ranks to return. If the parameter is omitted, no ranks will be returned. */
  includeRankType?: "ALL" | "PUBLIC" | "SOCIAL" | "FRIENDS" | (string & {});
  /** The maximum number of leaderboard scores to return in the response. For any response, the actual number of leaderboard scores returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const GetScoresRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  playerId: Schema.String.pipe(T.HttpPath("playerId")),
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
  timeSpan: Schema.String.pipe(T.HttpPath("timeSpan")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  includeRankType: Schema.optional(Schema.String).pipe(
    T.HttpQuery("includeRankType"),
  ),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1/players/{playerId}/leaderboards/{leaderboardId}/scores/{timeSpan}",
  }),
  svc,
) as unknown as Schema.Schema<GetScoresRequest>;

export type GetScoresResponse = PlayerLeaderboardScoreListResponse;
export const GetScoresResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerLeaderboardScoreListResponse;

export type GetScoresError = DefaultErrors;

/** Get high scores, and optionally ranks, in leaderboards for the currently authenticated player. For a specific time span, `leaderboardId` can be set to `ALL` to retrieve data for all leaderboards in a given time span. `NOTE: You cannot ask for 'ALL' leaderboards and 'ALL' timeSpans in the same request; only one parameter may be set to 'ALL'. */
export const getScores: API.PaginatedOperationMethod<
  GetScoresRequest,
  GetScoresResponse,
  GetScoresError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetScoresRequest,
  output: GetScoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListScoresRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
  /** The collection of scores you're requesting. */
  collection: "PUBLIC" | "SOCIAL" | "FRIENDS" | (string & {});
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Required. The time span for the scores and ranks you're requesting. */
  timeSpan: "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The maximum number of leaderboard scores to return in the response. For any response, the actual number of leaderboard scores returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListScoresRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
  collection: Schema.String.pipe(T.HttpPath("collection")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  timeSpan: Schema.String.pipe(T.HttpQuery("timeSpan")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1/leaderboards/{leaderboardId}/scores/{collection}",
  }),
  svc,
) as unknown as Schema.Schema<ListScoresRequest>;

export type ListScoresResponse = LeaderboardScores;
export const ListScoresResponse = /*@__PURE__*/ /*#__PURE__*/ LeaderboardScores;

export type ListScoresError = DefaultErrors;

/** Lists the scores in a leaderboard, starting from the top. */
export const listScores: API.PaginatedOperationMethod<
  ListScoresRequest,
  ListScoresResponse,
  ListScoresError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScoresRequest,
  output: ListScoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListWindowScoresRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
  /** The collection of scores you're requesting. */
  collection: "PUBLIC" | "SOCIAL" | "FRIENDS" | (string & {});
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Required. The time span for the scores and ranks you're requesting. */
  timeSpan: "ALL_TIME" | "WEEKLY" | "DAILY" | (string & {});
  /** The maximum number of leaderboard scores to return in the response. For any response, the actual number of leaderboard scores returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The preferred number of scores to return above the player's score. More scores may be returned if the player is at the bottom of the leaderboard; fewer may be returned if the player is at the top. Must be less than or equal to maxResults. */
  resultsAbove?: number;
  /** True if the top scores should be returned when the player is not in the leaderboard. Defaults to true. */
  returnTopIfAbsent?: boolean;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListWindowScoresRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
    collection: Schema.String.pipe(T.HttpPath("collection")),
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    timeSpan: Schema.String.pipe(T.HttpQuery("timeSpan")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    resultsAbove: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("resultsAbove"),
    ),
    returnTopIfAbsent: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnTopIfAbsent"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/leaderboards/{leaderboardId}/window/{collection}",
    }),
    svc,
  ) as unknown as Schema.Schema<ListWindowScoresRequest>;

export type ListWindowScoresResponse = LeaderboardScores;
export const ListWindowScoresResponse =
  /*@__PURE__*/ /*#__PURE__*/ LeaderboardScores;

export type ListWindowScoresError = DefaultErrors;

/** Lists the scores in a leaderboard around (and including) a player's score. */
export const listWindowScores: API.PaginatedOperationMethod<
  ListWindowScoresRequest,
  ListWindowScoresResponse,
  ListWindowScoresError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWindowScoresRequest,
  output: ListWindowScoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface SubmitScoresRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Required. The score you're submitting. The submitted score is ignored if it is worse than a previously submitted score, where worse depends on the leaderboard sort order. The meaning of the score value depends on the leaderboard format type. For fixed-point, the score represents the raw value. For time, the score represents elapsed time in milliseconds. For currency, the score represents a value in micro units. */
  score: string;
  /** Additional information about the score you're submitting. Values must contain no more than 64 URI-safe characters as defined by section 2.3 of RFC 3986. */
  scoreTag?: string;
}

export const SubmitScoresRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  score: Schema.String.pipe(T.HttpQuery("score")),
  scoreTag: Schema.optional(Schema.String).pipe(T.HttpQuery("scoreTag")),
}).pipe(
  T.Http({
    method: "POST",
    path: "games/v1/leaderboards/{leaderboardId}/scores",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SubmitScoresRequest>;

export type SubmitScoresResponse = PlayerScoreResponse;
export const SubmitScoresResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerScoreResponse;

export type SubmitScoresError = DefaultErrors;

/** Submits a score to the specified leaderboard. */
export const submitScores: API.OperationMethod<
  SubmitScoresRequest,
  SubmitScoresResponse,
  SubmitScoresError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitScoresRequest,
  output: SubmitScoresResponse,
  errors: [],
}));

export interface SubmitMultipleScoresRequest {
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** Request body */
  body?: PlayerScoreSubmissionList;
}

export const SubmitMultipleScoresRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
    body: Schema.optional(PlayerScoreSubmissionList).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/leaderboards/scores",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SubmitMultipleScoresRequest>;

export type SubmitMultipleScoresResponse = PlayerScoreListResponse;
export const SubmitMultipleScoresResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlayerScoreListResponse;

export type SubmitMultipleScoresError = DefaultErrors;

/** Submits multiple scores to leaderboards. */
export const submitMultipleScores: API.OperationMethod<
  SubmitMultipleScoresRequest,
  SubmitMultipleScoresResponse,
  SubmitMultipleScoresError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitMultipleScoresRequest,
  output: SubmitMultipleScoresResponse,
  errors: [],
}));

export interface GetSnapshotsRequest {
  /** The ID of the snapshot. */
  snapshotId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
}

export const GetSnapshotsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  snapshotId: Schema.String.pipe(T.HttpPath("snapshotId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
}).pipe(
  T.Http({ method: "GET", path: "games/v1/snapshots/{snapshotId}" }),
  svc,
) as unknown as Schema.Schema<GetSnapshotsRequest>;

export type GetSnapshotsResponse = Snapshot;
export const GetSnapshotsResponse = /*@__PURE__*/ /*#__PURE__*/ Snapshot;

export type GetSnapshotsError = DefaultErrors;

/** Retrieves the metadata for a given snapshot ID. */
export const getSnapshots: API.OperationMethod<
  GetSnapshotsRequest,
  GetSnapshotsResponse,
  GetSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSnapshotsRequest,
  output: GetSnapshotsResponse,
  errors: [],
}));

export interface ListSnapshotsRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The preferred language to use for strings returned by this method. */
  language?: string;
  /** The maximum number of snapshot resources to return in the response, used for paging. For any response, the actual number of snapshot resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListSnapshotsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  playerId: Schema.String.pipe(T.HttpPath("playerId")),
  language: Schema.optional(Schema.String).pipe(T.HttpQuery("language")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "games/v1/players/{playerId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListSnapshotsRequest>;

export type ListSnapshotsResponse = SnapshotListResponse;
export const ListSnapshotsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SnapshotListResponse;

export type ListSnapshotsError = DefaultErrors;

/** Retrieves a list of snapshots created by your application for the player corresponding to the player ID. */
export const listSnapshots: API.PaginatedOperationMethod<
  ListSnapshotsRequest,
  ListSnapshotsResponse,
  ListSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSnapshotsRequest,
  output: ListSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface GetStatsRequest {}

export const GetStatsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "games/v1/stats" }),
  svc,
) as unknown as Schema.Schema<GetStatsRequest>;

export type GetStatsResponse = StatsResponse;
export const GetStatsResponse = /*@__PURE__*/ /*#__PURE__*/ StatsResponse;

export type GetStatsError = DefaultErrors;

/** Returns engagement and spend statistics in this application for the currently authenticated user. */
export const getStats: API.OperationMethod<
  GetStatsRequest,
  GetStatsResponse,
  GetStatsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStatsRequest,
  output: GetStatsResponse,
  errors: [],
}));

export interface LinkPersonaRecallRequest {
  /** Request body */
  body?: LinkPersonaRequest;
}

export const LinkPersonaRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(LinkPersonaRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/recall:linkPersona",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LinkPersonaRecallRequest>;

export type LinkPersonaRecallResponse = LinkPersonaResponse;
export const LinkPersonaRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ LinkPersonaResponse;

export type LinkPersonaRecallError = DefaultErrors;

/** Associate the PGS Player principal encoded in the provided recall session id with an in-game account */
export const linkPersonaRecall: API.OperationMethod<
  LinkPersonaRecallRequest,
  LinkPersonaRecallResponse,
  LinkPersonaRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LinkPersonaRecallRequest,
  output: LinkPersonaRecallResponse,
  errors: [],
}));

export interface RetrieveTokensRecallRequest {
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. */
  sessionId: string;
}

export const RetrieveTokensRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  }).pipe(
    T.Http({ method: "GET", path: "games/v1/recall/tokens/{sessionId}" }),
    svc,
  ) as unknown as Schema.Schema<RetrieveTokensRecallRequest>;

export type RetrieveTokensRecallResponse = RetrievePlayerTokensResponse;
export const RetrieveTokensRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ RetrievePlayerTokensResponse;

export type RetrieveTokensRecallError = DefaultErrors;

/** Retrieve all Recall tokens associated with the PGS Player encoded in the provided recall session id. The API is only available for users that have active PGS Player profile. */
export const retrieveTokensRecall: API.OperationMethod<
  RetrieveTokensRecallRequest,
  RetrieveTokensRecallResponse,
  RetrieveTokensRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetrieveTokensRecallRequest,
  output: RetrieveTokensRecallResponse,
  errors: [],
}));

export interface LastTokenFromAllDeveloperGamesRecallRequest {
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. */
  sessionId: string;
}

export const LastTokenFromAllDeveloperGamesRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/recall/developerGamesLastPlayerToken/{sessionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<LastTokenFromAllDeveloperGamesRecallRequest>;

export type LastTokenFromAllDeveloperGamesRecallResponse =
  RetrieveDeveloperGamesLastPlayerTokenResponse;
export const LastTokenFromAllDeveloperGamesRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ RetrieveDeveloperGamesLastPlayerTokenResponse;

export type LastTokenFromAllDeveloperGamesRecallError = DefaultErrors;

/** Retrieve the last Recall token from all developer games that is associated with the PGS Player encoded in the provided recall session id. The API is only available for users that have active PGS Player profile. */
export const lastTokenFromAllDeveloperGamesRecall: API.OperationMethod<
  LastTokenFromAllDeveloperGamesRecallRequest,
  LastTokenFromAllDeveloperGamesRecallResponse,
  LastTokenFromAllDeveloperGamesRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LastTokenFromAllDeveloperGamesRecallRequest,
  output: LastTokenFromAllDeveloperGamesRecallResponse,
  errors: [],
}));

export interface GamesPlayerTokensRecallRequest {
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. */
  sessionId: string;
  /** Required. The application IDs from the Google Play developer console for the games to return scoped ids for. */
  applicationIds?: string[];
}

export const GamesPlayerTokensRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
    applicationIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("applicationIds"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "games/v1/recall/gamesPlayerTokens/{sessionId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GamesPlayerTokensRecallRequest>;

export type GamesPlayerTokensRecallResponse = RetrieveGamesPlayerTokensResponse;
export const GamesPlayerTokensRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ RetrieveGamesPlayerTokensResponse;

export type GamesPlayerTokensRecallError = DefaultErrors;

/** Retrieve the Recall tokens from all requested games that is associated with the PGS Player encoded in the provided recall session id. The API is only available for users that have an active PGS Player profile. */
export const gamesPlayerTokensRecall: API.OperationMethod<
  GamesPlayerTokensRecallRequest,
  GamesPlayerTokensRecallResponse,
  GamesPlayerTokensRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GamesPlayerTokensRecallRequest,
  output: GamesPlayerTokensRecallResponse,
  errors: [],
}));

export interface UnlinkPersonaRecallRequest {
  /** Request body */
  body?: UnlinkPersonaRequest;
}

export const UnlinkPersonaRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(UnlinkPersonaRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/recall:unlinkPersona",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UnlinkPersonaRecallRequest>;

export type UnlinkPersonaRecallResponse = UnlinkPersonaResponse;
export const UnlinkPersonaRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ UnlinkPersonaResponse;

export type UnlinkPersonaRecallError = DefaultErrors;

/** Delete a Recall token linking the PGS Player principal identified by the Recall session and an in-game account identified either by the 'persona' or by the token value. */
export const unlinkPersonaRecall: API.OperationMethod<
  UnlinkPersonaRecallRequest,
  UnlinkPersonaRecallResponse,
  UnlinkPersonaRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnlinkPersonaRecallRequest,
  output: UnlinkPersonaRecallResponse,
  errors: [],
}));

export interface ResetPersonaRecallRequest {
  /** Request body */
  body?: ResetPersonaRequest;
}

export const ResetPersonaRecallRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ResetPersonaRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/recall:resetPersona",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ResetPersonaRecallRequest>;

export type ResetPersonaRecallResponse = ResetPersonaResponse;
export const ResetPersonaRecallResponse =
  /*@__PURE__*/ /*#__PURE__*/ ResetPersonaResponse;

export type ResetPersonaRecallError = DefaultErrors;

/** Delete all Recall tokens linking the given persona to any player (with or without a profile). */
export const resetPersonaRecall: API.OperationMethod<
  ResetPersonaRecallRequest,
  ResetPersonaRecallResponse,
  ResetPersonaRecallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ResetPersonaRecallRequest,
  output: ResetPersonaRecallResponse,
  errors: [],
}));

export interface GeneratePlayGroupingApiTokenAccesstokensRequest {
  /** Required. App package name to generate the token for (e.g. com.example.mygame). */
  packageName?: string;
  /** Required. Persona to associate with the token. Persona is a developer-provided stable identifier of the user. Must be deterministically generated (e.g. as a one-way hash) from the user account ID and user profile ID (if the app has the concept), according to the developer's own user identity system. */
  persona?: string;
}

export const GeneratePlayGroupingApiTokenAccesstokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    packageName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("packageName"),
    ),
    persona: Schema.optional(Schema.String).pipe(T.HttpQuery("persona")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/accesstokens/generatePlayGroupingApiToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GeneratePlayGroupingApiTokenAccesstokensRequest>;

export type GeneratePlayGroupingApiTokenAccesstokensResponse =
  GeneratePlayGroupingApiTokenResponse;
export const GeneratePlayGroupingApiTokenAccesstokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GeneratePlayGroupingApiTokenResponse;

export type GeneratePlayGroupingApiTokenAccesstokensError = DefaultErrors;

/** Generates a Play Grouping API token for the PGS user identified by the attached credential. */
export const generatePlayGroupingApiTokenAccesstokens: API.OperationMethod<
  GeneratePlayGroupingApiTokenAccesstokensRequest,
  GeneratePlayGroupingApiTokenAccesstokensResponse,
  GeneratePlayGroupingApiTokenAccesstokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GeneratePlayGroupingApiTokenAccesstokensRequest,
  output: GeneratePlayGroupingApiTokenAccesstokensResponse,
  errors: [],
}));

export interface GenerateRecallPlayGroupingApiTokenAccesstokensRequest {
  /** Required. App package name to generate the token for (e.g. com.example.mygame). */
  packageName?: string;
  /** Required. Persona to associate with the token. Persona is a developer-provided stable identifier of the user. Must be deterministically generated (e.g. as a one-way hash) from the user account ID and user profile ID (if the app has the concept), according to the developer's own user identity system. */
  persona?: string;
  /** Required. Opaque server-generated string that encodes all the necessary information to identify the PGS player / Google user and application. See https://developer.android.com/games/pgs/recall/recall-setup on how to integrate with Recall and get session ID. */
  recallSessionId?: string;
}

export const GenerateRecallPlayGroupingApiTokenAccesstokensRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    packageName: Schema.optional(Schema.String).pipe(
      T.HttpQuery("packageName"),
    ),
    persona: Schema.optional(Schema.String).pipe(T.HttpQuery("persona")),
    recallSessionId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("recallSessionId"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "games/v1/accesstokens/generateRecallPlayGroupingApiToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateRecallPlayGroupingApiTokenAccesstokensRequest>;

export type GenerateRecallPlayGroupingApiTokenAccesstokensResponse =
  GenerateRecallPlayGroupingApiTokenResponse;
export const GenerateRecallPlayGroupingApiTokenAccesstokensResponse =
  /*@__PURE__*/ /*#__PURE__*/ GenerateRecallPlayGroupingApiTokenResponse;

export type GenerateRecallPlayGroupingApiTokenAccesstokensError = DefaultErrors;

/** Generates a Play Grouping API token for the PGS user identified by the Recall session ID provided in the request. */
export const generateRecallPlayGroupingApiTokenAccesstokens: API.OperationMethod<
  GenerateRecallPlayGroupingApiTokenAccesstokensRequest,
  GenerateRecallPlayGroupingApiTokenAccesstokensResponse,
  GenerateRecallPlayGroupingApiTokenAccesstokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GenerateRecallPlayGroupingApiTokenAccesstokensRequest,
  output: GenerateRecallPlayGroupingApiTokenAccesstokensResponse,
  errors: [],
}));
