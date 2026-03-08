// ==========================================================================
// Google Play Games Services Publishing API (gamesConfiguration v1configuration)
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
  name: "gamesConfiguration",
  version: "v1configuration",
  rootUrl: "https://gamesconfiguration.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LocalizedString {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`. */
  kind?: string;
  /** The locale string. */
  locale?: string;
  /** The string value. */
  value?: string;
}

export const LocalizedString: Schema.Schema<LocalizedString> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      locale: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LocalizedString",
}) as any as Schema.Schema<LocalizedString>;

export interface LocalizedStringBundle {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`. */
  kind?: string;
  /** The locale strings. */
  translations?: Array<LocalizedString>;
}

export const LocalizedStringBundle: Schema.Schema<LocalizedStringBundle> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      translations: Schema.optional(Schema.Array(LocalizedString)),
    }),
  ).annotate({
    identifier: "LocalizedStringBundle",
  }) as any as Schema.Schema<LocalizedStringBundle>;

export interface AchievementConfigurationDetail {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`. */
  kind?: string;
  /** Localized strings for the achievement name. */
  name?: LocalizedStringBundle;
  /** Localized strings for the achievement description. */
  description?: LocalizedStringBundle;
  /** Point value for the achievement. */
  pointValue?: number;
  /** The icon url of this achievement. Writes to this field are ignored. */
  iconUrl?: string;
  /** The sort rank of this achievement. Writes to this field are ignored. */
  sortRank?: number;
}

export const AchievementConfigurationDetail: Schema.Schema<AchievementConfigurationDetail> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      name: Schema.optional(LocalizedStringBundle),
      description: Schema.optional(LocalizedStringBundle),
      pointValue: Schema.optional(Schema.Number),
      iconUrl: Schema.optional(Schema.String),
      sortRank: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AchievementConfigurationDetail",
  }) as any as Schema.Schema<AchievementConfigurationDetail>;

export interface AchievementConfiguration {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfiguration`. */
  kind?: string;
  /** The token for this resource. */
  token?: string;
  /** The ID of the achievement. */
  id?: string;
  /** The type of the achievement. */
  achievementType?:
    | "ACHIEVEMENT_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "INCREMENTAL"
    | (string & {});
  /** The initial state of the achievement. */
  initialState?:
    | "INITIAL_STATE_UNSPECIFIED"
    | "HIDDEN"
    | "REVEALED"
    | (string & {});
  /** Steps to unlock. Only applicable to incremental achievements. */
  stepsToUnlock?: number;
  /** The draft data of the achievement. */
  draft?: AchievementConfigurationDetail;
  /** The read-only published data of the achievement. */
  published?: AchievementConfigurationDetail;
}

export const AchievementConfiguration: Schema.Schema<AchievementConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      achievementType: Schema.optional(Schema.String),
      initialState: Schema.optional(Schema.String),
      stepsToUnlock: Schema.optional(Schema.Number),
      draft: Schema.optional(AchievementConfigurationDetail),
      published: Schema.optional(AchievementConfigurationDetail),
    }),
  ).annotate({
    identifier: "AchievementConfiguration",
  }) as any as Schema.Schema<AchievementConfiguration>;

export interface AchievementConfigurationListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationListResponse`. */
  kind?: string;
  /** The achievement configurations. */
  items?: Array<AchievementConfiguration>;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
}

export const AchievementConfigurationListResponse: Schema.Schema<AchievementConfigurationListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(AchievementConfiguration)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AchievementConfigurationListResponse",
  }) as any as Schema.Schema<AchievementConfigurationListResponse>;

export interface GamesNumberAffixConfiguration {
  /** When the language requires special treatment of the number 0 (as in Arabic). */
  zero?: LocalizedStringBundle;
  /** When the language requires special treatment of numbers like one (as with the number 1 in English and most other languages; in Russian, any number ending in 1 but not ending in 11 is in this class). */
  one?: LocalizedStringBundle;
  /** When the language requires special treatment of numbers like two (as with 2 in Welsh, or 102 in Slovenian). */
  two?: LocalizedStringBundle;
  /** When the language requires special treatment of "small" numbers (as with 2, 3, and 4 in Czech; or numbers ending 2, 3, or 4 but not 12, 13, or 14 in Polish). */
  few?: LocalizedStringBundle;
  /** When the language requires special treatment of "large" numbers (as with numbers ending 11-99 in Maltese). */
  many?: LocalizedStringBundle;
  /** When the language does not require special treatment of the given quantity (as with all numbers in Chinese, or 42 in English). */
  other?: LocalizedStringBundle;
}

export const GamesNumberAffixConfiguration: Schema.Schema<GamesNumberAffixConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      zero: Schema.optional(LocalizedStringBundle),
      one: Schema.optional(LocalizedStringBundle),
      two: Schema.optional(LocalizedStringBundle),
      few: Schema.optional(LocalizedStringBundle),
      many: Schema.optional(LocalizedStringBundle),
      other: Schema.optional(LocalizedStringBundle),
    }),
  ).annotate({
    identifier: "GamesNumberAffixConfiguration",
  }) as any as Schema.Schema<GamesNumberAffixConfiguration>;

export interface GamesNumberFormatConfiguration {
  /** The formatting for the number. */
  numberFormatType?:
    | "NUMBER_FORMAT_TYPE_UNSPECIFIED"
    | "NUMERIC"
    | "TIME_DURATION"
    | "CURRENCY"
    | (string & {});
  /** An optional suffix for the NUMERIC format type. These strings follow the same plural rules as all Android string resources. */
  suffix?: GamesNumberAffixConfiguration;
  /** The number of decimal places for number. Only used for NUMERIC format type. */
  numDecimalPlaces?: number;
  /** The curreny code string. Only used for CURRENCY format type. */
  currencyCode?: string;
}

export const GamesNumberFormatConfiguration: Schema.Schema<GamesNumberFormatConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      numberFormatType: Schema.optional(Schema.String),
      suffix: Schema.optional(GamesNumberAffixConfiguration),
      numDecimalPlaces: Schema.optional(Schema.Number),
      currencyCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GamesNumberFormatConfiguration",
  }) as any as Schema.Schema<GamesNumberFormatConfiguration>;

export interface LeaderboardConfigurationDetail {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`. */
  kind?: string;
  /** Localized strings for the leaderboard name. */
  name?: LocalizedStringBundle;
  /** The icon url of this leaderboard. Writes to this field are ignored. */
  iconUrl?: string;
  /** The sort rank of this leaderboard. Writes to this field are ignored. */
  sortRank?: number;
  /** The score formatting for the leaderboard. */
  scoreFormat?: GamesNumberFormatConfiguration;
}

export const LeaderboardConfigurationDetail: Schema.Schema<LeaderboardConfigurationDetail> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      name: Schema.optional(LocalizedStringBundle),
      iconUrl: Schema.optional(Schema.String),
      sortRank: Schema.optional(Schema.Number),
      scoreFormat: Schema.optional(GamesNumberFormatConfiguration),
    }),
  ).annotate({
    identifier: "LeaderboardConfigurationDetail",
  }) as any as Schema.Schema<LeaderboardConfigurationDetail>;

export interface LeaderboardConfiguration {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfiguration`. */
  kind?: string;
  /** The token for this resource. */
  token?: string;
  /** The ID of the leaderboard. */
  id?: string;
  scoreOrder?:
    | "SCORE_ORDER_UNSPECIFIED"
    | "LARGER_IS_BETTER"
    | "SMALLER_IS_BETTER"
    | (string & {});
  /** Minimum score that can be posted to this leaderboard. */
  scoreMin?: string;
  /** Maximum score that can be posted to this leaderboard. */
  scoreMax?: string;
  /** The draft data of the leaderboard. */
  draft?: LeaderboardConfigurationDetail;
  /** The read-only published data of the leaderboard. */
  published?: LeaderboardConfigurationDetail;
}

export const LeaderboardConfiguration: Schema.Schema<LeaderboardConfiguration> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      token: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      scoreOrder: Schema.optional(Schema.String),
      scoreMin: Schema.optional(Schema.String),
      scoreMax: Schema.optional(Schema.String),
      draft: Schema.optional(LeaderboardConfigurationDetail),
      published: Schema.optional(LeaderboardConfigurationDetail),
    }),
  ).annotate({
    identifier: "LeaderboardConfiguration",
  }) as any as Schema.Schema<LeaderboardConfiguration>;

export interface LeaderboardConfigurationListResponse {
  /** Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationListResponse`. */
  kind?: string;
  /** The leaderboard configurations. */
  items?: Array<LeaderboardConfiguration>;
  /** The pagination token for the next page of results. */
  nextPageToken?: string;
}

export const LeaderboardConfigurationListResponse: Schema.Schema<LeaderboardConfigurationListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(LeaderboardConfiguration)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LeaderboardConfigurationListResponse",
  }) as any as Schema.Schema<LeaderboardConfigurationListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface DeleteAchievementConfigurationsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const DeleteAchievementConfigurationsRequest = Schema.Struct({
  achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "games/v1configuration/achievements/{achievementId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAchievementConfigurationsRequest>;

export interface DeleteAchievementConfigurationsResponse {}
export const DeleteAchievementConfigurationsResponse: Schema.Schema<DeleteAchievementConfigurationsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteAchievementConfigurationsResponse>;

export type DeleteAchievementConfigurationsError = DefaultErrors;

/** Delete the achievement configuration with the given ID. */
export const deleteAchievementConfigurations: API.OperationMethod<
  DeleteAchievementConfigurationsRequest,
  DeleteAchievementConfigurationsResponse,
  DeleteAchievementConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAchievementConfigurationsRequest,
  output: DeleteAchievementConfigurationsResponse,
  errors: [],
}));

export interface GetAchievementConfigurationsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
}

export const GetAchievementConfigurationsRequest = Schema.Struct({
  achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1configuration/achievements/{achievementId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAchievementConfigurationsRequest>;

export type GetAchievementConfigurationsResponse = AchievementConfiguration;
export const GetAchievementConfigurationsResponse = AchievementConfiguration;

export type GetAchievementConfigurationsError = DefaultErrors;

/** Retrieves the metadata of the achievement configuration with the given ID. */
export const getAchievementConfigurations: API.OperationMethod<
  GetAchievementConfigurationsRequest,
  GetAchievementConfigurationsResponse,
  GetAchievementConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAchievementConfigurationsRequest,
  output: GetAchievementConfigurationsResponse,
  errors: [],
}));

export interface InsertAchievementConfigurationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** Request body */
  body?: AchievementConfiguration;
}

export const InsertAchievementConfigurationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  body: Schema.optional(AchievementConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "games/v1configuration/applications/{applicationId}/achievements",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertAchievementConfigurationsRequest>;

export type InsertAchievementConfigurationsResponse = AchievementConfiguration;
export const InsertAchievementConfigurationsResponse = AchievementConfiguration;

export type InsertAchievementConfigurationsError = DefaultErrors;

/** Insert a new achievement configuration in this application. */
export const insertAchievementConfigurations: API.OperationMethod<
  InsertAchievementConfigurationsRequest,
  InsertAchievementConfigurationsResponse,
  InsertAchievementConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertAchievementConfigurationsRequest,
  output: InsertAchievementConfigurationsResponse,
  errors: [],
}));

export interface ListAchievementConfigurationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListAchievementConfigurationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1configuration/applications/{applicationId}/achievements",
  }),
  svc,
) as unknown as Schema.Schema<ListAchievementConfigurationsRequest>;

export type ListAchievementConfigurationsResponse =
  AchievementConfigurationListResponse;
export const ListAchievementConfigurationsResponse =
  AchievementConfigurationListResponse;

export type ListAchievementConfigurationsError = DefaultErrors;

/** Returns a list of the achievement configurations in this application. */
export const listAchievementConfigurations: API.PaginatedOperationMethod<
  ListAchievementConfigurationsRequest,
  ListAchievementConfigurationsResponse,
  ListAchievementConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAchievementConfigurationsRequest,
  output: ListAchievementConfigurationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateAchievementConfigurationsRequest {
  /** The ID of the achievement used by this method. */
  achievementId: string;
  /** Request body */
  body?: AchievementConfiguration;
}

export const UpdateAchievementConfigurationsRequest = Schema.Struct({
  achievementId: Schema.String.pipe(T.HttpPath("achievementId")),
  body: Schema.optional(AchievementConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "games/v1configuration/achievements/{achievementId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateAchievementConfigurationsRequest>;

export type UpdateAchievementConfigurationsResponse = AchievementConfiguration;
export const UpdateAchievementConfigurationsResponse = AchievementConfiguration;

export type UpdateAchievementConfigurationsError = DefaultErrors;

/** Update the metadata of the achievement configuration with the given ID. */
export const updateAchievementConfigurations: API.OperationMethod<
  UpdateAchievementConfigurationsRequest,
  UpdateAchievementConfigurationsResponse,
  UpdateAchievementConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAchievementConfigurationsRequest,
  output: UpdateAchievementConfigurationsResponse,
  errors: [],
}));

export interface DeleteLeaderboardConfigurationsRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
}

export const DeleteLeaderboardConfigurationsRequest = Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "games/v1configuration/leaderboards/{leaderboardId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteLeaderboardConfigurationsRequest>;

export interface DeleteLeaderboardConfigurationsResponse {}
export const DeleteLeaderboardConfigurationsResponse: Schema.Schema<DeleteLeaderboardConfigurationsResponse> =
  Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLeaderboardConfigurationsResponse>;

export type DeleteLeaderboardConfigurationsError = DefaultErrors;

/** Delete the leaderboard configuration with the given ID. */
export const deleteLeaderboardConfigurations: API.OperationMethod<
  DeleteLeaderboardConfigurationsRequest,
  DeleteLeaderboardConfigurationsResponse,
  DeleteLeaderboardConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLeaderboardConfigurationsRequest,
  output: DeleteLeaderboardConfigurationsResponse,
  errors: [],
}));

export interface GetLeaderboardConfigurationsRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
}

export const GetLeaderboardConfigurationsRequest = Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1configuration/leaderboards/{leaderboardId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLeaderboardConfigurationsRequest>;

export type GetLeaderboardConfigurationsResponse = LeaderboardConfiguration;
export const GetLeaderboardConfigurationsResponse = LeaderboardConfiguration;

export type GetLeaderboardConfigurationsError = DefaultErrors;

/** Retrieves the metadata of the leaderboard configuration with the given ID. */
export const getLeaderboardConfigurations: API.OperationMethod<
  GetLeaderboardConfigurationsRequest,
  GetLeaderboardConfigurationsResponse,
  GetLeaderboardConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLeaderboardConfigurationsRequest,
  output: GetLeaderboardConfigurationsResponse,
  errors: [],
}));

export interface InsertLeaderboardConfigurationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** Request body */
  body?: LeaderboardConfiguration;
}

export const InsertLeaderboardConfigurationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  body: Schema.optional(LeaderboardConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "games/v1configuration/applications/{applicationId}/leaderboards",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertLeaderboardConfigurationsRequest>;

export type InsertLeaderboardConfigurationsResponse = LeaderboardConfiguration;
export const InsertLeaderboardConfigurationsResponse = LeaderboardConfiguration;

export type InsertLeaderboardConfigurationsError = DefaultErrors;

/** Insert a new leaderboard configuration in this application. */
export const insertLeaderboardConfigurations: API.OperationMethod<
  InsertLeaderboardConfigurationsRequest,
  InsertLeaderboardConfigurationsResponse,
  InsertLeaderboardConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertLeaderboardConfigurationsRequest,
  output: InsertLeaderboardConfigurationsResponse,
  errors: [],
}));

export interface ListLeaderboardConfigurationsRequest {
  /** The application ID from the Google Play developer console. */
  applicationId: string;
  /** The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`. */
  maxResults?: number;
  /** The token returned by the previous request. */
  pageToken?: string;
}

export const ListLeaderboardConfigurationsRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "games/v1configuration/applications/{applicationId}/leaderboards",
  }),
  svc,
) as unknown as Schema.Schema<ListLeaderboardConfigurationsRequest>;

export type ListLeaderboardConfigurationsResponse =
  LeaderboardConfigurationListResponse;
export const ListLeaderboardConfigurationsResponse =
  LeaderboardConfigurationListResponse;

export type ListLeaderboardConfigurationsError = DefaultErrors;

/** Returns a list of the leaderboard configurations in this application. */
export const listLeaderboardConfigurations: API.PaginatedOperationMethod<
  ListLeaderboardConfigurationsRequest,
  ListLeaderboardConfigurationsResponse,
  ListLeaderboardConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListLeaderboardConfigurationsRequest,
  output: ListLeaderboardConfigurationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateLeaderboardConfigurationsRequest {
  /** The ID of the leaderboard. */
  leaderboardId: string;
  /** Request body */
  body?: LeaderboardConfiguration;
}

export const UpdateLeaderboardConfigurationsRequest = Schema.Struct({
  leaderboardId: Schema.String.pipe(T.HttpPath("leaderboardId")),
  body: Schema.optional(LeaderboardConfiguration).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "games/v1configuration/leaderboards/{leaderboardId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateLeaderboardConfigurationsRequest>;

export type UpdateLeaderboardConfigurationsResponse = LeaderboardConfiguration;
export const UpdateLeaderboardConfigurationsResponse = LeaderboardConfiguration;

export type UpdateLeaderboardConfigurationsError = DefaultErrors;

/** Update the metadata of the leaderboard configuration with the given ID. */
export const updateLeaderboardConfigurations: API.OperationMethod<
  UpdateLeaderboardConfigurationsRequest,
  UpdateLeaderboardConfigurationsResponse,
  UpdateLeaderboardConfigurationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateLeaderboardConfigurationsRequest,
  output: UpdateLeaderboardConfigurationsResponse,
  errors: [],
}));
