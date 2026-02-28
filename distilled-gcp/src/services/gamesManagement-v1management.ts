// ==========================================================================
// Google Play Games Services Management API (gamesManagement v1management)
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
  name: "gamesManagement",
  version: "v1management",
  rootUrl: "https://gamesmanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AchievementResetMultipleForAllRequest {
  /** The IDs of achievements to reset. */
  achievement_ids?: Array<string>;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#achievementResetMultipleForAllRequest`. */
  kind?: string;
}

export const AchievementResetMultipleForAllRequest: Schema.Schema<AchievementResetMultipleForAllRequest> = Schema.suspend(() => Schema.Struct({
  achievement_ids: Schema.optional(Schema.Array(Schema.String)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AchievementResetMultipleForAllRequest" }) as any as Schema.Schema<AchievementResetMultipleForAllRequest>;

export interface ProfileSettings {
  profileVisible?: boolean;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#profileSettings`. */
  kind?: string;
}

export const ProfileSettings: Schema.Schema<ProfileSettings> = Schema.suspend(() => Schema.Struct({
  profileVisible: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "ProfileSettings" }) as any as Schema.Schema<ProfileSettings>;

export interface PlayerScoreResetResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#playerScoreResetResponse`. */
  kind?: string;
  /** The ID of an leaderboard for which player state has been updated. */
  definitionId?: string;
  /** The time spans of the updated score. Possible values are: - "`ALL_TIME`" - The score is an all-time score. - "`WEEKLY`" - The score is a weekly score. - "`DAILY`" - The score is a daily score. */
  resetScoreTimeSpans?: Array<string>;
}

export const PlayerScoreResetResponse: Schema.Schema<PlayerScoreResetResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  definitionId: Schema.optional(Schema.String),
  resetScoreTimeSpans: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PlayerScoreResetResponse" }) as any as Schema.Schema<PlayerScoreResetResponse>;

export interface PlayerScoreResetAllResponse {
  /** The leaderboard reset results. */
  results?: Array<PlayerScoreResetResponse>;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#playerScoreResetAllResponse`. */
  kind?: string;
}

export const PlayerScoreResetAllResponse: Schema.Schema<PlayerScoreResetAllResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(PlayerScoreResetResponse)),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "PlayerScoreResetAllResponse" }) as any as Schema.Schema<PlayerScoreResetAllResponse>;

export interface GamesPlayerLevelResource {
  /** The level for the user. */
  level?: number;
  /** The minimum experience points for this level. */
  minExperiencePoints?: string;
  /** The maximum experience points for this level. */
  maxExperiencePoints?: string;
}

export const GamesPlayerLevelResource: Schema.Schema<GamesPlayerLevelResource> = Schema.suspend(() => Schema.Struct({
  level: Schema.optional(Schema.Number),
  minExperiencePoints: Schema.optional(Schema.String),
  maxExperiencePoints: Schema.optional(Schema.String),
})).annotate({ identifier: "GamesPlayerLevelResource" }) as any as Schema.Schema<GamesPlayerLevelResource>;

export interface GamesPlayerExperienceInfoResource {
  /** The current level of the player. */
  currentLevel?: GamesPlayerLevelResource;
  /** The current number of experience points for the player. */
  currentExperiencePoints?: string;
  /** The next level of the player. If the current level is the maximum level, this should be same as the current level. */
  nextLevel?: GamesPlayerLevelResource;
  /** The timestamp when the player was leveled up, in millis since Unix epoch UTC. */
  lastLevelUpTimestampMillis?: string;
}

export const GamesPlayerExperienceInfoResource: Schema.Schema<GamesPlayerExperienceInfoResource> = Schema.suspend(() => Schema.Struct({
  currentLevel: Schema.optional(GamesPlayerLevelResource),
  currentExperiencePoints: Schema.optional(Schema.String),
  nextLevel: Schema.optional(GamesPlayerLevelResource),
  lastLevelUpTimestampMillis: Schema.optional(Schema.String),
})).annotate({ identifier: "GamesPlayerExperienceInfoResource" }) as any as Schema.Schema<GamesPlayerExperienceInfoResource>;

export interface Player {
  /** The url to the portrait mode player banner image. */
  bannerUrlPortrait?: string;
  /** An object representation of the individual components of the player's name. For some players, these fields may not be present. */
  name?: { familyName?: string; givenName?: string };
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#player`. */
  kind?: string;
  /** The player's profile settings. Controls whether or not the player's profile is visible to other players. */
  profileSettings?: ProfileSettings;
  /** The url to the landscape mode player banner image. */
  bannerUrlLandscape?: string;
  /** The ID of the player. */
  playerId?: string;
  /** The player ID that was used for this player the first time they signed into the game in question. This is only populated for calls to player.get for the requesting player, only if the player ID has subsequently changed, and only to clients that support remapping player IDs. */
  originalPlayerId?: string;
  /** An object to represent Play Game experience information for the player. */
  experienceInfo?: GamesPlayerExperienceInfoResource;
  /** The base URL for the image that represents the player. */
  avatarImageUrl?: string;
  /** The name to display for the player. */
  displayName?: string;
  /** The player's title rewarded for their game activities. */
  title?: string;
}

export const Player: Schema.Schema<Player> = Schema.suspend(() => Schema.Struct({
  bannerUrlPortrait: Schema.optional(Schema.String),
  name: Schema.optional(Schema.Struct({ familyName: Schema.optional(Schema.String), givenName: Schema.optional(Schema.String) })),
  kind: Schema.optional(Schema.String),
  profileSettings: Schema.optional(ProfileSettings),
  bannerUrlLandscape: Schema.optional(Schema.String),
  playerId: Schema.optional(Schema.String),
  originalPlayerId: Schema.optional(Schema.String),
  experienceInfo: Schema.optional(GamesPlayerExperienceInfoResource),
  avatarImageUrl: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Player" }) as any as Schema.Schema<Player>;

export interface HiddenPlayer {
  /** Output only. The time this player was hidden. */
  hiddenTimeMillis?: string;
  /** Output only. Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#hiddenPlayer`. */
  kind?: string;
  /** Output only. The player information. */
  player?: Player;
}

export const HiddenPlayer: Schema.Schema<HiddenPlayer> = Schema.suspend(() => Schema.Struct({
  hiddenTimeMillis: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  player: Schema.optional(Player),
})).annotate({ identifier: "HiddenPlayer" }) as any as Schema.Schema<HiddenPlayer>;

export interface HiddenPlayerList {
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#hiddenPlayerList`. */
  kind?: string;
  /** The players. */
  items?: Array<HiddenPlayer>;
}

export const HiddenPlayerList: Schema.Schema<HiddenPlayerList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(HiddenPlayer)),
})).annotate({ identifier: "HiddenPlayerList" }) as any as Schema.Schema<HiddenPlayerList>;

export interface EventsResetMultipleForAllRequest {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#eventsResetMultipleForAllRequest`. */
  kind?: string;
  /** The IDs of events to reset. */
  event_ids?: Array<string>;
}

export const EventsResetMultipleForAllRequest: Schema.Schema<EventsResetMultipleForAllRequest> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  event_ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "EventsResetMultipleForAllRequest" }) as any as Schema.Schema<EventsResetMultipleForAllRequest>;

export interface AchievementResetResponse {
  /** The ID of an achievement for which player state has been updated. */
  definitionId?: string;
  /** Flag to indicate if the requested update actually occurred. */
  updateOccurred?: boolean;
  /** The current state of the achievement. This is the same as the initial state of the achievement. Possible values are: - "`HIDDEN`"- Achievement is hidden. - "`REVEALED`" - Achievement is revealed. - "`UNLOCKED`" - Achievement is unlocked. */
  currentState?: string;
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#achievementResetResponse`. */
  kind?: string;
}

export const AchievementResetResponse: Schema.Schema<AchievementResetResponse> = Schema.suspend(() => Schema.Struct({
  definitionId: Schema.optional(Schema.String),
  updateOccurred: Schema.optional(Schema.Boolean),
  currentState: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AchievementResetResponse" }) as any as Schema.Schema<AchievementResetResponse>;

export interface AchievementResetAllResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#achievementResetAllResponse`. */
  kind?: string;
  /** The achievement reset results. */
  results?: Array<AchievementResetResponse>;
}

export const AchievementResetAllResponse: Schema.Schema<AchievementResetAllResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(AchievementResetResponse)),
})).annotate({ identifier: "AchievementResetAllResponse" }) as any as Schema.Schema<AchievementResetAllResponse>;

export interface ScoresResetMultipleForAllRequest {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesManagement#scoresResetMultipleForAllRequest`. */
  kind?: string;
  /** The IDs of leaderboards to reset. */
  leaderboard_ids?: Array<string>;
}

export const ScoresResetMultipleForAllRequest: Schema.Schema<ScoresResetMultipleForAllRequest> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  leaderboard_ids: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ScoresResetMultipleForAllRequest" }) as any as Schema.Schema<ScoresResetMultipleForAllRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get the list of players hidden from the given application. This method is only available to user accounts for your developer console. */
export interface ListHiddenApplicationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** The token returned by the previous request. */
  pageToken?: string;
  /** The maximum number of player resources to return in the response, used for paging. For any response, the actual number of player resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
}

export const ListHiddenApplicationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "games/v1management/applications/{applicationId}/players/hidden" }),
  svc,
) as unknown as Schema.Schema<ListHiddenApplicationsRequest>;

export type ListHiddenApplicationsResponse = HiddenPlayerList;
export const ListHiddenApplicationsResponse = HiddenPlayerList;

export type ListHiddenApplicationsError = CommonErrors;

export const listHiddenApplications = API.makePaginated(() => ({
  input: ListHiddenApplicationsRequest,
  output: ListHiddenApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

/** Unhide the given player's leaderboard scores from the given application. This method is only available to user accounts for your developer console. */
export interface UnhidePlayersRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
}

export const UnhidePlayersRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  playerId: Schema.String.pipe(T.HttpPath("playerId")),
}).pipe(
  T.Http({ method: "DELETE", path: "games/v1management/applications/{applicationId}/players/hidden/{playerId}" }),
  svc,
) as unknown as Schema.Schema<UnhidePlayersRequest>;

export interface UnhidePlayersResponse {}
export const UnhidePlayersResponse: Schema.Schema<UnhidePlayersResponse> = Schema.Struct({}) as any as Schema.Schema<UnhidePlayersResponse>;

export type UnhidePlayersError = CommonErrors;

export const unhidePlayers: API.OperationMethod<UnhidePlayersRequest, UnhidePlayersResponse, UnhidePlayersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnhidePlayersRequest,
  output: UnhidePlayersResponse,
  errors: [],
}));

/** Hide the given player's leaderboard scores from the given application. This method is only available to user accounts for your developer console. */
export interface HidePlayersRequest {
  /** A player ID. A value of `me` may be used in place of the authenticated player's ID. */
  playerId: string;
  /** The application ID from the Google Play developer console. */
  applicationId: string;
}

export const HidePlayersRequest = Schema.Struct({
  playerId: Schema.String.pipe(T.HttpPath("playerId")),
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/applications/{applicationId}/players/hidden/{playerId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<HidePlayersRequest>;

export interface HidePlayersResponse {}
export const HidePlayersResponse: Schema.Schema<HidePlayersResponse> = Schema.Struct({}) as any as Schema.Schema<HidePlayersResponse>;

export type HidePlayersError = CommonErrors;

export const hidePlayers: API.OperationMethod<HidePlayersRequest, HidePlayersResponse, HidePlayersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HidePlayersRequest,
  output: HidePlayersResponse,
  errors: [],
}));

/** Resets all draft achievements for all players. This method is only available to user accounts for your developer console. */
export interface ResetAllForAllPlayersAchievementsRequest {
}

export const ResetAllForAllPlayersAchievementsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/achievements/resetAllForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllForAllPlayersAchievementsRequest>;

export interface ResetAllForAllPlayersAchievementsResponse {}
export const ResetAllForAllPlayersAchievementsResponse: Schema.Schema<ResetAllForAllPlayersAchievementsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetAllForAllPlayersAchievementsResponse>;

export type ResetAllForAllPlayersAchievementsError = CommonErrors;

export const resetAllForAllPlayersAchievements: API.OperationMethod<ResetAllForAllPlayersAchievementsRequest, ResetAllForAllPlayersAchievementsResponse, ResetAllForAllPlayersAchievementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllForAllPlayersAchievementsRequest,
  output: ResetAllForAllPlayersAchievementsResponse,
  errors: [],
}));

/** Resets all achievements for the currently authenticated player for your application. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetAllAchievementsRequest {
}

export const ResetAllAchievementsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/achievements/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllAchievementsRequest>;

export type ResetAllAchievementsResponse = AchievementResetAllResponse;
export const ResetAllAchievementsResponse = AchievementResetAllResponse;

export type ResetAllAchievementsError = CommonErrors;

export const resetAllAchievements: API.OperationMethod<ResetAllAchievementsRequest, ResetAllAchievementsResponse, ResetAllAchievementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllAchievementsRequest,
  output: ResetAllAchievementsResponse,
  errors: [],
}));

/** Resets achievements with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft achievements may be reset. */
export interface ResetMultipleForAllPlayersAchievementsRequest {
  /** Request body */
  body?: AchievementResetMultipleForAllRequest;
}

export const ResetMultipleForAllPlayersAchievementsRequest = Schema.Struct({
  body: Schema.optional(AchievementResetMultipleForAllRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/achievements/resetMultipleForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetMultipleForAllPlayersAchievementsRequest>;

export interface ResetMultipleForAllPlayersAchievementsResponse {}
export const ResetMultipleForAllPlayersAchievementsResponse: Schema.Schema<ResetMultipleForAllPlayersAchievementsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetMultipleForAllPlayersAchievementsResponse>;

export type ResetMultipleForAllPlayersAchievementsError = CommonErrors;

export const resetMultipleForAllPlayersAchievements: API.OperationMethod<ResetMultipleForAllPlayersAchievementsRequest, ResetMultipleForAllPlayersAchievementsResponse, ResetMultipleForAllPlayersAchievementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetMultipleForAllPlayersAchievementsRequest,
  output: ResetMultipleForAllPlayersAchievementsResponse,
  errors: [],
}));

/** Resets the achievement with the given ID for all players. This method is only available to user accounts for your developer console. Only draft achievements can be reset. */
export interface ResetForAllPlayersAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const ResetForAllPlayersAchievementsRequest = Schema.Struct({
  achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/achievements/{achievementId}/resetForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetForAllPlayersAchievementsRequest>;

export interface ResetForAllPlayersAchievementsResponse {}
export const ResetForAllPlayersAchievementsResponse: Schema.Schema<ResetForAllPlayersAchievementsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetForAllPlayersAchievementsResponse>;

export type ResetForAllPlayersAchievementsError = CommonErrors;

export const resetForAllPlayersAchievements: API.OperationMethod<ResetForAllPlayersAchievementsRequest, ResetForAllPlayersAchievementsResponse, ResetForAllPlayersAchievementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetForAllPlayersAchievementsRequest,
  output: ResetForAllPlayersAchievementsResponse,
  errors: [],
}));

/** Resets the achievement with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetAchievementsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const ResetAchievementsRequest = Schema.Struct({
  achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/achievements/{achievementId}/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAchievementsRequest>;

export type ResetAchievementsResponse = AchievementResetResponse;
export const ResetAchievementsResponse = AchievementResetResponse;

export type ResetAchievementsError = CommonErrors;

export const resetAchievements: API.OperationMethod<ResetAchievementsRequest, ResetAchievementsResponse, ResetAchievementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAchievementsRequest,
  output: ResetAchievementsResponse,
  errors: [],
}));

/** Resets all player progress on all events for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetAllEventsRequest {
}

export const ResetAllEventsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/events/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllEventsRequest>;

export interface ResetAllEventsResponse {}
export const ResetAllEventsResponse: Schema.Schema<ResetAllEventsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetAllEventsResponse>;

export type ResetAllEventsError = CommonErrors;

export const resetAllEvents: API.OperationMethod<ResetAllEventsRequest, ResetAllEventsResponse, ResetAllEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllEventsRequest,
  output: ResetAllEventsResponse,
  errors: [],
}));

/** Resets the event with the given ID for all players. This method is only available to user accounts for your developer console. Only draft events can be reset. */
export interface ResetForAllPlayersEventsRequest {
  /** The ID of the event. */
  eventId: string;
}

export const ResetForAllPlayersEventsRequest = Schema.Struct({
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/events/{eventId}/resetForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetForAllPlayersEventsRequest>;

export interface ResetForAllPlayersEventsResponse {}
export const ResetForAllPlayersEventsResponse: Schema.Schema<ResetForAllPlayersEventsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetForAllPlayersEventsResponse>;

export type ResetForAllPlayersEventsError = CommonErrors;

export const resetForAllPlayersEvents: API.OperationMethod<ResetForAllPlayersEventsRequest, ResetForAllPlayersEventsResponse, ResetForAllPlayersEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetForAllPlayersEventsRequest,
  output: ResetForAllPlayersEventsResponse,
  errors: [],
}));

/** Resets all draft events for all players. This method is only available to user accounts for your developer console. */
export interface ResetAllForAllPlayersEventsRequest {
}

export const ResetAllForAllPlayersEventsRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/events/resetAllForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllForAllPlayersEventsRequest>;

export interface ResetAllForAllPlayersEventsResponse {}
export const ResetAllForAllPlayersEventsResponse: Schema.Schema<ResetAllForAllPlayersEventsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetAllForAllPlayersEventsResponse>;

export type ResetAllForAllPlayersEventsError = CommonErrors;

export const resetAllForAllPlayersEvents: API.OperationMethod<ResetAllForAllPlayersEventsRequest, ResetAllForAllPlayersEventsResponse, ResetAllForAllPlayersEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllForAllPlayersEventsRequest,
  output: ResetAllForAllPlayersEventsResponse,
  errors: [],
}));

/** Resets events with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft events may be reset. */
export interface ResetMultipleForAllPlayersEventsRequest {
  /** Request body */
  body?: EventsResetMultipleForAllRequest;
}

export const ResetMultipleForAllPlayersEventsRequest = Schema.Struct({
  body: Schema.optional(EventsResetMultipleForAllRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/events/resetMultipleForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetMultipleForAllPlayersEventsRequest>;

export interface ResetMultipleForAllPlayersEventsResponse {}
export const ResetMultipleForAllPlayersEventsResponse: Schema.Schema<ResetMultipleForAllPlayersEventsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetMultipleForAllPlayersEventsResponse>;

export type ResetMultipleForAllPlayersEventsError = CommonErrors;

export const resetMultipleForAllPlayersEvents: API.OperationMethod<ResetMultipleForAllPlayersEventsRequest, ResetMultipleForAllPlayersEventsResponse, ResetMultipleForAllPlayersEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetMultipleForAllPlayersEventsRequest,
  output: ResetMultipleForAllPlayersEventsResponse,
  errors: [],
}));

/** Resets all player progress on the event with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetEventsRequest {
  /** The ID of the event. */
  eventId: string;
}

export const ResetEventsRequest = Schema.Struct({
  eventId: Schema.String.pipe(T.HttpPath("eventId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/events/{eventId}/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetEventsRequest>;

export interface ResetEventsResponse {}
export const ResetEventsResponse: Schema.Schema<ResetEventsResponse> = Schema.Struct({}) as any as Schema.Schema<ResetEventsResponse>;

export type ResetEventsError = CommonErrors;

export const resetEvents: API.OperationMethod<ResetEventsRequest, ResetEventsResponse, ResetEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetEventsRequest,
  output: ResetEventsResponse,
  errors: [],
}));

/** Resets scores for the leaderboard with the given ID for the currently authenticated player. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetScoresRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
}

export const ResetScoresRequest = Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/leaderboards/{leaderboardId}/scores/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetScoresRequest>;

export type ResetScoresResponse = PlayerScoreResetResponse;
export const ResetScoresResponse = PlayerScoreResetResponse;

export type ResetScoresError = CommonErrors;

export const resetScores: API.OperationMethod<ResetScoresRequest, ResetScoresResponse, ResetScoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetScoresRequest,
  output: ResetScoresResponse,
  errors: [],
}));

/** Resets scores for the leaderboards with the given IDs for all players. This method is only available to user accounts for your developer console. Only draft leaderboards may be reset. */
export interface ResetMultipleForAllPlayersScoresRequest {
  /** Request body */
  body?: ScoresResetMultipleForAllRequest;
}

export const ResetMultipleForAllPlayersScoresRequest = Schema.Struct({
  body: Schema.optional(ScoresResetMultipleForAllRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/scores/resetMultipleForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetMultipleForAllPlayersScoresRequest>;

export interface ResetMultipleForAllPlayersScoresResponse {}
export const ResetMultipleForAllPlayersScoresResponse: Schema.Schema<ResetMultipleForAllPlayersScoresResponse> = Schema.Struct({}) as any as Schema.Schema<ResetMultipleForAllPlayersScoresResponse>;

export type ResetMultipleForAllPlayersScoresError = CommonErrors;

export const resetMultipleForAllPlayersScores: API.OperationMethod<ResetMultipleForAllPlayersScoresRequest, ResetMultipleForAllPlayersScoresResponse, ResetMultipleForAllPlayersScoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetMultipleForAllPlayersScoresRequest,
  output: ResetMultipleForAllPlayersScoresResponse,
  errors: [],
}));

/** Resets scores for the leaderboard with the given ID for all players. This method is only available to user accounts for your developer console. Only draft leaderboards can be reset. */
export interface ResetForAllPlayersScoresRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
}

export const ResetForAllPlayersScoresRequest = Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/leaderboards/{leaderboardId}/scores/resetForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetForAllPlayersScoresRequest>;

export interface ResetForAllPlayersScoresResponse {}
export const ResetForAllPlayersScoresResponse: Schema.Schema<ResetForAllPlayersScoresResponse> = Schema.Struct({}) as any as Schema.Schema<ResetForAllPlayersScoresResponse>;

export type ResetForAllPlayersScoresError = CommonErrors;

export const resetForAllPlayersScores: API.OperationMethod<ResetForAllPlayersScoresRequest, ResetForAllPlayersScoresResponse, ResetForAllPlayersScoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetForAllPlayersScoresRequest,
  output: ResetForAllPlayersScoresResponse,
  errors: [],
}));

/** Resets all scores for all leaderboards for the currently authenticated players. This method is only accessible to whitelisted tester accounts for your application. */
export interface ResetAllScoresRequest {
}

export const ResetAllScoresRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/scores/reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllScoresRequest>;

export type ResetAllScoresResponse = PlayerScoreResetAllResponse;
export const ResetAllScoresResponse = PlayerScoreResetAllResponse;

export type ResetAllScoresError = CommonErrors;

export const resetAllScores: API.OperationMethod<ResetAllScoresRequest, ResetAllScoresResponse, ResetAllScoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllScoresRequest,
  output: ResetAllScoresResponse,
  errors: [],
}));

/** Resets scores for all draft leaderboards for all players. This method is only available to user accounts for your developer console. */
export interface ResetAllForAllPlayersScoresRequest {
}

export const ResetAllForAllPlayersScoresRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "POST", path: "games/v1management/scores/resetAllForAllPlayers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetAllForAllPlayersScoresRequest>;

export interface ResetAllForAllPlayersScoresResponse {}
export const ResetAllForAllPlayersScoresResponse: Schema.Schema<ResetAllForAllPlayersScoresResponse> = Schema.Struct({}) as any as Schema.Schema<ResetAllForAllPlayersScoresResponse>;

export type ResetAllForAllPlayersScoresError = CommonErrors;

export const resetAllForAllPlayersScores: API.OperationMethod<ResetAllForAllPlayersScoresRequest, ResetAllForAllPlayersScoresResponse, ResetAllForAllPlayersScoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetAllForAllPlayersScoresRequest,
  output: ResetAllForAllPlayersScoresResponse,
  errors: [],
}));

