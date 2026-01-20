/**
 * Cloudflare REALTIME-KIT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service realtime-kit
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

// =============================================================================
// ActiveLivestreamsForLivestreamIdLivestream
// =============================================================================

export interface GetActiveLivestreamsForLivestreamIdLivestreamRequest {
  appId: string;
  livestreamId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetActiveLivestreamsForLivestreamIdLivestreamRequest =
  Schema.Struct({
    appId: Schema.String.pipe(T.HttpPath("appId")),
    livestreamId: Schema.String.pipe(T.HttpPath("livestreamId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/realtime/kit/{appId}/livestreams/{livestreamId}/active-livestream-session",
    }),
  ) as unknown as Schema.Schema<GetActiveLivestreamsForLivestreamIdLivestreamRequest>;

export interface GetActiveLivestreamsForLivestreamIdLivestreamResponse {
  data?: {
    livestream?: {
      id?: string;
      createdAt?: string;
      disabled?: string;
      ingestServer?: string;
      meetingId?: string;
      name?: string;
      playbackUrl?: string;
      status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
      streamKey?: string;
      updatedAt?: string;
    };
    session?: {
      id?: string;
      createdAt?: string;
      errMessage?: string;
      ingestSeconds?: number;
      invokedTime?: string;
      livestreamId?: string;
      startedTime?: string;
      stoppedTime?: string;
      updatedAt?: string;
      viewerSeconds?: number;
    };
  };
  success?: boolean;
}

export const GetActiveLivestreamsForLivestreamIdLivestreamResponse =
  Schema.Struct({
    data: Schema.optional(
      Schema.Struct({
        livestream: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String).pipe(
              T.JsonName("created_at"),
            ),
            disabled: Schema.optional(Schema.String),
            ingestServer: Schema.optional(Schema.String).pipe(
              T.JsonName("ingest_server"),
            ),
            meetingId: Schema.optional(Schema.String).pipe(
              T.JsonName("meeting_id"),
            ),
            name: Schema.optional(Schema.String),
            playbackUrl: Schema.optional(Schema.String).pipe(
              T.JsonName("playback_url"),
            ),
            status: Schema.optional(
              Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
            ),
            streamKey: Schema.optional(Schema.String).pipe(
              T.JsonName("stream_key"),
            ),
            updatedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("updated_at"),
            ),
          }),
        ),
        session: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String).pipe(
              T.JsonName("created_at"),
            ),
            errMessage: Schema.optional(Schema.String).pipe(
              T.JsonName("err_message"),
            ),
            ingestSeconds: Schema.optional(Schema.Number).pipe(
              T.JsonName("ingest_seconds"),
            ),
            invokedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("invoked_time"),
            ),
            livestreamId: Schema.optional(Schema.String).pipe(
              T.JsonName("livestream_id"),
            ),
            startedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("started_time"),
            ),
            stoppedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("stopped_time"),
            ),
            updatedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("updated_at"),
            ),
            viewerSeconds: Schema.optional(Schema.Number).pipe(
              T.JsonName("viewer_seconds"),
            ),
          }),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetActiveLivestreamsForLivestreamIdLivestreamResponse>;

export const getActiveLivestreamsForLivestreamIdLivestream: (
  input: GetActiveLivestreamsForLivestreamIdLivestreamRequest,
) => Effect.Effect<
  GetActiveLivestreamsForLivestreamIdLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetActiveLivestreamsForLivestreamIdLivestreamRequest,
  output: GetActiveLivestreamsForLivestreamIdLivestreamResponse,
  errors: [],
}));

// =============================================================================
// ActiveRecordingsRecording
// =============================================================================

export interface GetActiveRecordingsRecordingRequest {
  appId: string;
  meetingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetActiveRecordingsRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings/active-recording/{meetingId}",
  }),
) as unknown as Schema.Schema<GetActiveRecordingsRecordingRequest>;

export interface GetActiveRecordingsRecordingResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    audioDownloadUrl: string | null;
    downloadUrl: string | null;
    downloadUrlExpiry: string | null;
    fileSize: number | null;
    invokedTime: string;
    outputFileName: string;
    sessionId: string | null;
    startedTime: string | null;
    status:
      | "INVOKED"
      | "RECORDING"
      | "UPLOADING"
      | "UPLOADED"
      | "ERRORED"
      | "PAUSED";
    stoppedTime: string | null;
    recordingDuration?: number;
  };
  /** Success status of the operation */
  success: boolean;
}

export const GetActiveRecordingsRecordingResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    audioDownloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("audio_download_url"),
    ),
    downloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("download_url"),
    ),
    downloadUrlExpiry: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("download_url_expiry"),
    ),
    fileSize: Schema.Union(Schema.Number, Schema.Null).pipe(
      T.JsonName("file_size"),
    ),
    invokedTime: Schema.String.pipe(T.JsonName("invoked_time")),
    outputFileName: Schema.String.pipe(T.JsonName("output_file_name")),
    sessionId: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("session_id"),
    ),
    startedTime: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("started_time"),
    ),
    status: Schema.Literal(
      "INVOKED",
      "RECORDING",
      "UPLOADING",
      "UPLOADED",
      "ERRORED",
      "PAUSED",
    ),
    stoppedTime: Schema.Union(Schema.String, Schema.Null).pipe(
      T.JsonName("stopped_time"),
    ),
    recordingDuration: Schema.optional(Schema.Number).pipe(
      T.JsonName("recording_duration"),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetActiveRecordingsRecordingResponse>;

export const getActiveRecordingsRecording: (
  input: GetActiveRecordingsRecordingRequest,
) => Effect.Effect<
  GetActiveRecordingsRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetActiveRecordingsRecordingRequest,
  output: GetActiveRecordingsRecordingResponse,
  errors: [],
}));

// =============================================================================
// ActiveSessionActiveSession
// =============================================================================

export interface GetActiveSessionActiveSessionRequest {
  appId: string;
  meetingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetActiveSessionActiveSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-session",
  }),
) as unknown as Schema.Schema<GetActiveSessionActiveSessionRequest>;

export interface GetActiveSessionActiveSessionResponse {
  data?: {
    id: string;
    associatedId: string;
    createdAt: string;
    liveParticipants: number;
    maxConcurrentParticipants: number;
    meetingDisplayName: string;
    minutesConsumed: number;
    organizationId: string;
    startedAt: string;
    status: "LIVE" | "ENDED";
    type: "meeting" | "livestream" | "participant";
    updatedAt: string;
    breakoutRooms?: unknown[];
    endedAt?: string;
    meta?: unknown;
  };
  success?: boolean;
}

export const GetActiveSessionActiveSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      associatedId: Schema.String.pipe(T.JsonName("associated_id")),
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      liveParticipants: Schema.Number.pipe(T.JsonName("live_participants")),
      maxConcurrentParticipants: Schema.Number.pipe(
        T.JsonName("max_concurrent_participants"),
      ),
      meetingDisplayName: Schema.String.pipe(
        T.JsonName("meeting_display_name"),
      ),
      minutesConsumed: Schema.Number.pipe(T.JsonName("minutes_consumed")),
      organizationId: Schema.String.pipe(T.JsonName("organization_id")),
      startedAt: Schema.String.pipe(T.JsonName("started_at")),
      status: Schema.Literal("LIVE", "ENDED"),
      type: Schema.Literal("meeting", "livestream", "participant"),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)).pipe(
        T.JsonName("breakout_rooms"),
      ),
      endedAt: Schema.optional(Schema.String).pipe(T.JsonName("ended_at")),
      meta: Schema.optional(Schema.Unknown),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetActiveSessionActiveSessionResponse>;

export const getActiveSessionActiveSession: (
  input: GetActiveSessionActiveSessionRequest,
) => Effect.Effect<
  GetActiveSessionActiveSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetActiveSessionActiveSessionRequest,
  output: GetActiveSessionActiveSessionResponse,
  errors: [],
}));

// =============================================================================
// AllLivestreamsLivestream
// =============================================================================

export interface GetAllLivestreamsLivestreamRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Specify the end time range in ISO format to access the live stream. */
  endTime?: string;
  /** Query param: Exclude the RealtimeKit meetings that are livestreamed. */
  excludeMeetings?: boolean;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page. */
  perPage?: number;
  /** Query param: Specifies the sorting order for the results. */
  sortOrder?: "ASC" | "DSC";
  /** Query param: Specify the start time range in ISO format to access the live stream. */
  startTime?: string;
  /** Query param: Specifies the status of the operation. */
  status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
}

export const GetAllLivestreamsLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("end_time")),
  excludeMeetings: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("exclude_meetings"),
  ),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  sortOrder: Schema.optional(Schema.Literal("ASC", "DSC")).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(
    Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/livestreams",
  }),
) as unknown as Schema.Schema<GetAllLivestreamsLivestreamRequest>;

export interface GetAllLivestreamsLivestreamResponse {
  data?: {
    id?: string;
    createdAt?: string;
    disabled?: string;
    ingestServer?: string;
    meetingId?: string;
    name?: string;
    paging?: { endOffset?: number; startOffset?: number; totalCount?: number };
    playbackUrl?: string;
    status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
    streamKey?: string;
    updatedAt?: string;
  };
  success?: boolean;
}

export const GetAllLivestreamsLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String).pipe(T.JsonName("created_at")),
      disabled: Schema.optional(Schema.String),
      ingestServer: Schema.optional(Schema.String).pipe(
        T.JsonName("ingest_server"),
      ),
      meetingId: Schema.optional(Schema.String).pipe(T.JsonName("meeting_id")),
      name: Schema.optional(Schema.String),
      paging: Schema.optional(
        Schema.Struct({
          endOffset: Schema.optional(Schema.Number).pipe(
            T.JsonName("end_offset"),
          ),
          startOffset: Schema.optional(Schema.Number).pipe(
            T.JsonName("start_offset"),
          ),
          totalCount: Schema.optional(Schema.Number).pipe(
            T.JsonName("total_count"),
          ),
        }),
      ),
      playbackUrl: Schema.optional(Schema.String).pipe(
        T.JsonName("playback_url"),
      ),
      status: Schema.optional(
        Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
      ),
      streamKey: Schema.optional(Schema.String).pipe(T.JsonName("stream_key")),
      updatedAt: Schema.optional(Schema.String).pipe(T.JsonName("updated_at")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetAllLivestreamsLivestreamResponse>;

export const getAllLivestreamsLivestream: (
  input: GetAllLivestreamsLivestreamRequest,
) => Effect.Effect<
  GetAllLivestreamsLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAllLivestreamsLivestreamRequest,
  output: GetAllLivestreamsLivestreamResponse,
  errors: [],
}));

// =============================================================================
// AllParticipantsActiveSession
// =============================================================================

export interface KickAllParticipantsActiveSessionRequest {
  appId: string;
  meetingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const KickAllParticipantsActiveSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-session/kick-all",
  }),
) as unknown as Schema.Schema<KickAllParticipantsActiveSessionRequest>;

export interface KickAllParticipantsActiveSessionResponse {
  data?: { action?: string; kickedParticipantsCount?: number };
  success?: boolean;
}

export const KickAllParticipantsActiveSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      action: Schema.optional(Schema.String),
      kickedParticipantsCount: Schema.optional(Schema.Number).pipe(
        T.JsonName("kicked_participants_count"),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<KickAllParticipantsActiveSessionResponse>;

export const kickAllParticipantsActiveSession: (
  input: KickAllParticipantsActiveSessionRequest,
) => Effect.Effect<
  KickAllParticipantsActiveSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: KickAllParticipantsActiveSessionRequest,
  output: KickAllParticipantsActiveSessionResponse,
  errors: [],
}));

// =============================================================================
// App
// =============================================================================

export interface GetAppRequest {
  /** The account identifier tag. */
  accountId: string;
}

export const GetAppRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/realtime/kit/apps" }),
) as unknown as Schema.Schema<GetAppRequest>;

export interface GetAppResponse {
  data?: { id?: string; createdAt?: string; name?: string }[];
  success?: boolean;
}

export const GetAppResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String).pipe(
          T.JsonName("created_at"),
        ),
        name: Schema.optional(Schema.String),
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetAppResponse>;

export const getApp: (
  input: GetAppRequest,
) => Effect.Effect<
  GetAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAppRequest,
  output: GetAppResponse,
  errors: [],
}));

export interface PostAppRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  name: string;
}

export const PostAppRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/realtime/kit/apps" }),
) as unknown as Schema.Schema<PostAppRequest>;

export interface PostAppResponse {
  data?: { app?: { id?: string; createdAt?: string; name?: string } };
  success?: boolean;
}

export const PostAppResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      app: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          createdAt: Schema.optional(Schema.String).pipe(
            T.JsonName("created_at"),
          ),
          name: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<PostAppResponse>;

export const postApp: (
  input: PostAppRequest,
) => Effect.Effect<
  PostAppResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PostAppRequest,
  output: PostAppResponse,
  errors: [],
}));

// =============================================================================
// IndependentLivestreamLivestream
// =============================================================================

export interface CreateIndependentLivestreamLivestreamRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Name of the livestream */
  name?: string | null;
}

export const CreateIndependentLivestreamLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/livestreams",
  }),
) as unknown as Schema.Schema<CreateIndependentLivestreamLivestreamRequest>;

export interface CreateIndependentLivestreamLivestreamResponse {
  data?: {
    id?: string;
    disabled?: boolean;
    ingestServer?: string;
    meetingId?: string | null;
    name?: string;
    playbackUrl?: string;
    status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
    streamKey?: string;
  };
  success?: boolean;
}

export const CreateIndependentLivestreamLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
      ingestServer: Schema.optional(Schema.String).pipe(
        T.JsonName("ingest_server"),
      ),
      meetingId: Schema.optional(Schema.Union(Schema.String, Schema.Null)).pipe(
        T.JsonName("meeting_id"),
      ),
      name: Schema.optional(Schema.String),
      playbackUrl: Schema.optional(Schema.String).pipe(
        T.JsonName("playback_url"),
      ),
      status: Schema.optional(
        Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
      ),
      streamKey: Schema.optional(Schema.String).pipe(T.JsonName("stream_key")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreateIndependentLivestreamLivestreamResponse>;

export const createIndependentLivestreamLivestream: (
  input: CreateIndependentLivestreamLivestreamRequest,
) => Effect.Effect<
  CreateIndependentLivestreamLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateIndependentLivestreamLivestreamRequest,
  output: CreateIndependentLivestreamLivestreamResponse,
  errors: [],
}));

// =============================================================================
// LivestreamAnalyticsCompleteLivestream
// =============================================================================

export interface GetLivestreamAnalyticsCompleteLivestreamRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Specify the end time range in ISO format to access the livestream analytics. */
  endTime?: string;
  /** Query param: Specify the start time range in ISO format to access the livestream analytics. */
  startTime?: string;
}

export const GetLivestreamAnalyticsCompleteLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("end_time")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/analytics/livestreams/overall",
  }),
) as unknown as Schema.Schema<GetLivestreamAnalyticsCompleteLivestreamRequest>;

export interface GetLivestreamAnalyticsCompleteLivestreamResponse {
  data?: {
    count?: number;
    totalIngestSeconds?: number;
    totalViewerSeconds?: number;
  };
  success?: boolean;
}

export const GetLivestreamAnalyticsCompleteLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      totalIngestSeconds: Schema.optional(Schema.Number).pipe(
        T.JsonName("total_ingest_seconds"),
      ),
      totalViewerSeconds: Schema.optional(Schema.Number).pipe(
        T.JsonName("total_viewer_seconds"),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetLivestreamAnalyticsCompleteLivestreamResponse>;

export const getLivestreamAnalyticsCompleteLivestream: (
  input: GetLivestreamAnalyticsCompleteLivestreamRequest,
) => Effect.Effect<
  GetLivestreamAnalyticsCompleteLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLivestreamAnalyticsCompleteLivestreamRequest,
  output: GetLivestreamAnalyticsCompleteLivestreamResponse,
  errors: [],
}));

// =============================================================================
// LivestreamingAMeetingLivestream
// =============================================================================

export interface StartLivestreamingAMeetingLivestreamRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  name?: string | null;
  /** Body param: */
  videoConfig?: { height?: number; width?: number };
}

export const StartLivestreamingAMeetingLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
  videoConfig: Schema.optional(
    Schema.Struct({
      height: Schema.optional(Schema.Number),
      width: Schema.optional(Schema.Number),
    }),
  ).pipe(T.JsonName("video_config")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/livestreams",
  }),
) as unknown as Schema.Schema<StartLivestreamingAMeetingLivestreamRequest>;

export interface StartLivestreamingAMeetingLivestreamResponse {
  data?: {
    id?: string;
    ingestServer?: string;
    playbackUrl?: string;
    status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
    streamKey?: string;
  };
  success?: boolean;
}

export const StartLivestreamingAMeetingLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      ingestServer: Schema.optional(Schema.String).pipe(
        T.JsonName("ingest_server"),
      ),
      playbackUrl: Schema.optional(Schema.String).pipe(
        T.JsonName("playback_url"),
      ),
      status: Schema.optional(
        Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
      ),
      streamKey: Schema.optional(Schema.String).pipe(T.JsonName("stream_key")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<StartLivestreamingAMeetingLivestreamResponse>;

export const startLivestreamingAMeetingLivestream: (
  input: StartLivestreamingAMeetingLivestreamRequest,
) => Effect.Effect<
  StartLivestreamingAMeetingLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StartLivestreamingAMeetingLivestreamRequest,
  output: StartLivestreamingAMeetingLivestreamResponse,
  errors: [],
}));

export interface StopLivestreamingAMeetingLivestreamRequest {
  appId: string;
  meetingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const StopLivestreamingAMeetingLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-livestream/stop",
  }),
) as unknown as Schema.Schema<StopLivestreamingAMeetingLivestreamRequest>;

export interface StopLivestreamingAMeetingLivestreamResponse {
  data?: { message?: string };
  success?: boolean;
}

export const StopLivestreamingAMeetingLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<StopLivestreamingAMeetingLivestreamResponse>;

export const stopLivestreamingAMeetingLivestream: (
  input: StopLivestreamingAMeetingLivestreamRequest,
) => Effect.Effect<
  StopLivestreamingAMeetingLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StopLivestreamingAMeetingLivestreamRequest,
  output: StopLivestreamingAMeetingLivestreamResponse,
  errors: [],
}));

// =============================================================================
// LivestreamSessionDetailsForSessionIdLivestream
// =============================================================================

export interface GetLivestreamSessionDetailsForSessionIdLivestreamRequest {
  appId: string;
  livestreamSessionId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetLivestreamSessionDetailsForSessionIdLivestreamRequest =
  Schema.Struct({
    appId: Schema.String.pipe(T.HttpPath("appId")),
    livestreamSessionId: Schema.String.pipe(T.HttpPath("livestreamSessionId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/realtime/kit/{appId}/livestreams/sessions/{livestreamSessionId}",
    }),
  ) as unknown as Schema.Schema<GetLivestreamSessionDetailsForSessionIdLivestreamRequest>;

export interface GetLivestreamSessionDetailsForSessionIdLivestreamResponse {
  data?: {
    id?: string;
    createdAt?: string;
    errMessage?: string;
    ingestSeconds?: number;
    livestreamId?: string;
    startedTime?: string;
    stoppedTime?: string;
    updatedAt?: string;
    viewerSeconds?: number;
  };
  success?: boolean;
}

export const GetLivestreamSessionDetailsForSessionIdLivestreamResponse =
  Schema.Struct({
    data: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        createdAt: Schema.optional(Schema.String).pipe(
          T.JsonName("created_at"),
        ),
        errMessage: Schema.optional(Schema.String).pipe(
          T.JsonName("err_message"),
        ),
        ingestSeconds: Schema.optional(Schema.Number).pipe(
          T.JsonName("ingest_seconds"),
        ),
        livestreamId: Schema.optional(Schema.String).pipe(
          T.JsonName("livestream_id"),
        ),
        startedTime: Schema.optional(Schema.String).pipe(
          T.JsonName("started_time"),
        ),
        stoppedTime: Schema.optional(Schema.String).pipe(
          T.JsonName("stopped_time"),
        ),
        updatedAt: Schema.optional(Schema.String).pipe(
          T.JsonName("updated_at"),
        ),
        viewerSeconds: Schema.optional(Schema.Number).pipe(
          T.JsonName("viewer_seconds"),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetLivestreamSessionDetailsForSessionIdLivestreamResponse>;

export const getLivestreamSessionDetailsForSessionIdLivestream: (
  input: GetLivestreamSessionDetailsForSessionIdLivestreamRequest,
) => Effect.Effect<
  GetLivestreamSessionDetailsForSessionIdLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLivestreamSessionDetailsForSessionIdLivestreamRequest,
  output: GetLivestreamSessionDetailsForSessionIdLivestreamResponse,
  errors: [],
}));

// =============================================================================
// LivestreamSessionForLivestreamIdLivestream
// =============================================================================

export interface GetLivestreamSessionForLivestreamIdLivestreamRequest {
  appId: string;
  livestreamId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page. */
  perPage?: number;
}

export const GetLivestreamSessionForLivestreamIdLivestreamRequest =
  Schema.Struct({
    appId: Schema.String.pipe(T.HttpPath("appId")),
    livestreamId: Schema.String.pipe(T.HttpPath("livestreamId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
    perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/realtime/kit/{appId}/livestreams/{livestreamId}",
    }),
  ) as unknown as Schema.Schema<GetLivestreamSessionForLivestreamIdLivestreamRequest>;

export interface GetLivestreamSessionForLivestreamIdLivestreamResponse {
  data?: {
    livestream?: {
      id?: string;
      createdAt?: string;
      disabled?: string;
      ingestServer?: string;
      meetingId?: string;
      name?: string;
      playbackUrl?: string;
      status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
      streamKey?: string;
      updatedAt?: string;
    };
    paging?: { endOffset?: number; startOffset?: number; totalCount?: number };
    session?: {
      id?: string;
      createdAt?: string;
      errMessage?: string;
      ingestSeconds?: number;
      invokedTime?: string;
      livestreamId?: string;
      startedTime?: string;
      stoppedTime?: string;
      updatedAt?: string;
      viewerSeconds?: number;
    };
  };
  success?: boolean;
}

export const GetLivestreamSessionForLivestreamIdLivestreamResponse =
  Schema.Struct({
    data: Schema.optional(
      Schema.Struct({
        livestream: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String).pipe(
              T.JsonName("created_at"),
            ),
            disabled: Schema.optional(Schema.String),
            ingestServer: Schema.optional(Schema.String).pipe(
              T.JsonName("ingest_server"),
            ),
            meetingId: Schema.optional(Schema.String).pipe(
              T.JsonName("meeting_id"),
            ),
            name: Schema.optional(Schema.String),
            playbackUrl: Schema.optional(Schema.String).pipe(
              T.JsonName("playback_url"),
            ),
            status: Schema.optional(
              Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
            ),
            streamKey: Schema.optional(Schema.String).pipe(
              T.JsonName("stream_key"),
            ),
            updatedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("updated_at"),
            ),
          }),
        ),
        paging: Schema.optional(
          Schema.Struct({
            endOffset: Schema.optional(Schema.Number).pipe(
              T.JsonName("end_offset"),
            ),
            startOffset: Schema.optional(Schema.Number).pipe(
              T.JsonName("start_offset"),
            ),
            totalCount: Schema.optional(Schema.Number).pipe(
              T.JsonName("total_count"),
            ),
          }),
        ),
        session: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String).pipe(
              T.JsonName("created_at"),
            ),
            errMessage: Schema.optional(Schema.String).pipe(
              T.JsonName("err_message"),
            ),
            ingestSeconds: Schema.optional(Schema.Number).pipe(
              T.JsonName("ingest_seconds"),
            ),
            invokedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("invoked_time"),
            ),
            livestreamId: Schema.optional(Schema.String).pipe(
              T.JsonName("livestream_id"),
            ),
            startedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("started_time"),
            ),
            stoppedTime: Schema.optional(Schema.String).pipe(
              T.JsonName("stopped_time"),
            ),
            updatedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("updated_at"),
            ),
            viewerSeconds: Schema.optional(Schema.Number).pipe(
              T.JsonName("viewer_seconds"),
            ),
          }),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetLivestreamSessionForLivestreamIdLivestreamResponse>;

export const getLivestreamSessionForLivestreamIdLivestream: (
  input: GetLivestreamSessionForLivestreamIdLivestreamRequest,
) => Effect.Effect<
  GetLivestreamSessionForLivestreamIdLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLivestreamSessionForLivestreamIdLivestreamRequest,
  output: GetLivestreamSessionForLivestreamIdLivestreamResponse,
  errors: [],
}));

// =============================================================================
// Meeting
// =============================================================================

export interface GetMeetingRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: The end time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  endTime?: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page */
  perPage?: number;
  /** Query param: The search query string. You can search using the meeting ID or title. */
  search?: string;
  /** Query param: The start time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  startTime?: string;
}

export const GetMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("end_time")),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings",
  }),
) as unknown as Schema.Schema<GetMeetingRequest>;

export interface GetMeetingResponse {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    liveStreamOnStart?: boolean;
    persistChat?: boolean;
    recordOnStart?: boolean;
    sessionKeepAliveTimeInSecs?: number;
    status?: "ACTIVE" | "INACTIVE";
    summarizeOnEnd?: boolean;
    title?: string;
  }[];
  paging: { endOffset: number; startOffset: number; totalCount: number };
  success: boolean;
}

export const GetMeetingResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("live_stream_on_start"),
      ),
      persistChat: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("persist_chat"),
      ),
      recordOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("record_on_start"),
      ),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
        T.JsonName("session_keep_alive_time_in_secs"),
      ),
      status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
      summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("summarize_on_end"),
      ),
      title: Schema.optional(Schema.String),
    }),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number.pipe(T.JsonName("end_offset")),
    startOffset: Schema.Number.pipe(T.JsonName("start_offset")),
    totalCount: Schema.Number.pipe(T.JsonName("total_count")),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingResponse>;

export const getMeeting: (
  input: GetMeetingRequest,
) => Effect.Effect<
  GetMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMeetingRequest,
  output: GetMeetingResponse,
  errors: [],
}));

export interface CreateMeetingRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The AI Config allows you to customize the behavior of meeting transcriptions and summaries */
  aiConfig?: {
    summarization?: {
      summaryType?:
        | "general"
        | "team_meeting"
        | "sales_call"
        | "client_check_in"
        | "interview"
        | "daily_standup"
        | "one_on_one_meeting"
        | "lecture"
        | "code_review";
      textFormat?: "plain_text" | "markdown";
      wordLimit?: number;
    };
    transcription?: {
      keywords?: string[];
      language?:
        | "en-US"
        | "en-IN"
        | "de"
        | "hi"
        | "sv"
        | "ru"
        | "pl"
        | "el"
        | "fr"
        | "nl";
      profanityFilter?: boolean;
    };
  };
  /** Body param: Specifies if the meeting should start getting livestreamed on start. */
  liveStreamOnStart?: boolean | null;
  /** Body param: If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space. */
  persistChat?: boolean;
  /** Body param: Specifies if the meeting should start getting recorded as soon as someone joins the meeting. */
  recordOnStart?: boolean | null;
  /** Body param: Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal. */
  recordingConfig?: {
    audioConfig?: {
      channel?: "mono" | "stereo";
      codec?: "MP3" | "AAC";
      exportFile?: boolean;
    };
    fileNamePrefix?: string;
    liveStreamingConfig?: { rtmpUrl?: string };
    maxSeconds?: number;
    realtimekitBucketConfig?: { enabled: boolean };
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      accessKey?: string;
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
    videoConfig?: {
      codec?: "H264" | "VP8";
      exportFile?: boolean;
      height?: number;
      watermark?: {
        position?: "left top" | "right top" | "left bottom" | "right bottom";
        size?: { height?: number; width?: number };
        url?: string;
      };
      width?: number;
    };
  };
  /** Body param: Time in seconds, for which a session remains active, after the last participant has left the meeting. */
  sessionKeepAliveTimeInSecs?: number;
  /** Body param: Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API. */
  summarizeOnEnd?: boolean;
  /** Body param: Title of the meeting */
  title?: string | null;
}

export const CreateMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  aiConfig: Schema.optional(
    Schema.Struct({
      summarization: Schema.optional(
        Schema.Struct({
          summaryType: Schema.optional(
            Schema.Literal(
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ),
          ).pipe(T.JsonName("summary_type")),
          textFormat: Schema.optional(
            Schema.Literal("plain_text", "markdown"),
          ).pipe(T.JsonName("text_format")),
          wordLimit: Schema.optional(Schema.Number).pipe(
            T.JsonName("word_limit"),
          ),
        }),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literal(
              "en-US",
              "en-IN",
              "de",
              "hi",
              "sv",
              "ru",
              "pl",
              "el",
              "fr",
              "nl",
            ),
          ),
          profanityFilter: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("profanity_filter"),
          ),
        }),
      ),
    }),
  ).pipe(T.JsonName("ai_config")),
  liveStreamOnStart: Schema.optional(
    Schema.Union(Schema.Boolean, Schema.Null),
  ).pipe(T.JsonName("live_stream_on_start")),
  persistChat: Schema.optional(Schema.Boolean).pipe(T.JsonName("persist_chat")),
  recordOnStart: Schema.optional(
    Schema.Union(Schema.Boolean, Schema.Null),
  ).pipe(T.JsonName("record_on_start")),
  recordingConfig: Schema.optional(
    Schema.Struct({
      audioConfig: Schema.optional(
        Schema.Struct({
          channel: Schema.optional(Schema.Literal("mono", "stereo")),
          codec: Schema.optional(Schema.Literal("MP3", "AAC")),
          exportFile: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("export_file"),
          ),
        }),
      ).pipe(T.JsonName("audio_config")),
      fileNamePrefix: Schema.optional(Schema.String).pipe(
        T.JsonName("file_name_prefix"),
      ),
      liveStreamingConfig: Schema.optional(
        Schema.Struct({
          rtmpUrl: Schema.optional(Schema.String).pipe(T.JsonName("rtmp_url")),
        }),
      ).pipe(T.JsonName("live_streaming_config")),
      maxSeconds: Schema.optional(Schema.Number).pipe(
        T.JsonName("max_seconds"),
      ),
      realtimekitBucketConfig: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ).pipe(T.JsonName("realtimekit_bucket_config")),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            accessKey: Schema.optional(Schema.String).pipe(
              T.JsonName("access_key"),
            ),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
      videoConfig: Schema.optional(
        Schema.Struct({
          codec: Schema.optional(Schema.Literal("H264", "VP8")),
          exportFile: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("export_file"),
          ),
          height: Schema.optional(Schema.Number),
          watermark: Schema.optional(
            Schema.Struct({
              position: Schema.optional(
                Schema.Literal(
                  "left top",
                  "right top",
                  "left bottom",
                  "right bottom",
                ),
              ),
              size: Schema.optional(
                Schema.Struct({
                  height: Schema.optional(Schema.Number),
                  width: Schema.optional(Schema.Number),
                }),
              ),
              url: Schema.optional(Schema.String),
            }),
          ),
          width: Schema.optional(Schema.Number),
        }),
      ).pipe(T.JsonName("video_config")),
    }),
  ).pipe(T.JsonName("recording_config")),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
    T.JsonName("session_keep_alive_time_in_secs"),
  ),
  summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("summarize_on_end"),
  ),
  title: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings",
  }),
) as unknown as Schema.Schema<CreateMeetingRequest>;

export interface CreateMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    aiConfig?: {
      summarization?: {
        summaryType?:
          | "general"
          | "team_meeting"
          | "sales_call"
          | "client_check_in"
          | "interview"
          | "daily_standup"
          | "one_on_one_meeting"
          | "lecture"
          | "code_review";
        textFormat?: "plain_text" | "markdown";
        wordLimit?: number;
      };
      transcription?: {
        keywords?: string[];
        language?:
          | "en-US"
          | "en-IN"
          | "de"
          | "hi"
          | "sv"
          | "ru"
          | "pl"
          | "el"
          | "fr"
          | "nl";
        profanityFilter?: boolean;
      };
    };
    liveStreamOnStart?: boolean;
    persistChat?: boolean;
    recordOnStart?: boolean;
    recordingConfig?: {
      audioConfig?: {
        channel?: "mono" | "stereo";
        codec?: "MP3" | "AAC";
        exportFile?: boolean;
      };
      fileNamePrefix?: string;
      liveStreamingConfig?: { rtmpUrl?: string };
      maxSeconds?: number;
      realtimekitBucketConfig?: { enabled: boolean };
      storageConfig?: {
        type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
        accessKey?: string;
        authMethod?: "KEY" | "PASSWORD";
        bucket?: string;
        host?: string;
        password?: string;
        path?: string;
        port?: number;
        privateKey?: string;
        region?: string;
        secret?: string;
        username?: string;
      } | null;
      videoConfig?: {
        codec?: "H264" | "VP8";
        exportFile?: boolean;
        height?: number;
        watermark?: {
          position?: "left top" | "right top" | "left bottom" | "right bottom";
          size?: { height?: number; width?: number };
          url?: string;
        };
        width?: number;
      };
    };
    sessionKeepAliveTimeInSecs?: number;
    status?: "ACTIVE" | "INACTIVE";
    summarizeOnEnd?: boolean;
    title?: string;
  };
}

export const CreateMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literal(
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ),
              ).pipe(T.JsonName("summary_type")),
              textFormat: Schema.optional(
                Schema.Literal("plain_text", "markdown"),
              ).pipe(T.JsonName("text_format")),
              wordLimit: Schema.optional(Schema.Number).pipe(
                T.JsonName("word_limit"),
              ),
            }),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literal(
                  "en-US",
                  "en-IN",
                  "de",
                  "hi",
                  "sv",
                  "ru",
                  "pl",
                  "el",
                  "fr",
                  "nl",
                ),
              ),
              profanityFilter: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("profanity_filter"),
              ),
            }),
          ),
        }),
      ).pipe(T.JsonName("ai_config")),
      liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("live_stream_on_start"),
      ),
      persistChat: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("persist_chat"),
      ),
      recordOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("record_on_start"),
      ),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literal("mono", "stereo")),
              codec: Schema.optional(Schema.Literal("MP3", "AAC")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
            }),
          ).pipe(T.JsonName("audio_config")),
          fileNamePrefix: Schema.optional(Schema.String).pipe(
            T.JsonName("file_name_prefix"),
          ),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String).pipe(
                T.JsonName("rtmp_url"),
              ),
            }),
          ).pipe(T.JsonName("live_streaming_config")),
          maxSeconds: Schema.optional(Schema.Number).pipe(
            T.JsonName("max_seconds"),
          ),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ).pipe(T.JsonName("realtimekit_bucket_config")),
          storageConfig: Schema.optional(
            Schema.Union(
              Schema.Struct({
                type: Schema.Literal(
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ),
                accessKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("access_key"),
                ),
                authMethod: Schema.optional(
                  Schema.Literal("KEY", "PASSWORD"),
                ).pipe(T.JsonName("auth_method")),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("private_key"),
                ),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }),
              Schema.Null,
            ),
          ).pipe(T.JsonName("storage_config")),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literal("H264", "VP8")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literal(
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ),
                  ),
                  size: Schema.optional(
                    Schema.Struct({
                      height: Schema.optional(Schema.Number),
                      width: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              width: Schema.optional(Schema.Number),
            }),
          ).pipe(T.JsonName("video_config")),
        }),
      ).pipe(T.JsonName("recording_config")),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
        T.JsonName("session_keep_alive_time_in_secs"),
      ),
      status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
      summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("summarize_on_end"),
      ),
      title: Schema.optional(Schema.String),
    }),
  ),
}) as unknown as Schema.Schema<CreateMeetingResponse>;

export const createMeeting: (
  input: CreateMeetingRequest,
) => Effect.Effect<
  CreateMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateMeetingRequest,
  output: CreateMeetingResponse,
  errors: [],
}));

// =============================================================================
// MeetingActiveLivestreamsLivestream
// =============================================================================

export interface GetMeetingActiveLivestreamsLivestreamRequest {
  appId: string;
  meetingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetMeetingActiveLivestreamsLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-livestream",
  }),
) as unknown as Schema.Schema<GetMeetingActiveLivestreamsLivestreamRequest>;

export interface GetMeetingActiveLivestreamsLivestreamResponse {
  data?: {
    id?: string;
    createdAt?: string;
    disabled?: string;
    ingestServer?: string;
    meetingId?: string;
    name?: string | null;
    playbackUrl?: string;
    status?: "LIVE" | "IDLE" | "ERRORED" | "INVOKED";
    streamKey?: string;
    updatedAt?: string;
  };
  success?: boolean;
}

export const GetMeetingActiveLivestreamsLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String).pipe(T.JsonName("created_at")),
      disabled: Schema.optional(Schema.String),
      ingestServer: Schema.optional(Schema.String).pipe(
        T.JsonName("ingest_server"),
      ),
      meetingId: Schema.optional(Schema.String).pipe(T.JsonName("meeting_id")),
      name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
      playbackUrl: Schema.optional(Schema.String).pipe(
        T.JsonName("playback_url"),
      ),
      status: Schema.optional(
        Schema.Literal("LIVE", "IDLE", "ERRORED", "INVOKED"),
      ),
      streamKey: Schema.optional(Schema.String).pipe(T.JsonName("stream_key")),
      updatedAt: Schema.optional(Schema.String).pipe(T.JsonName("updated_at")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetMeetingActiveLivestreamsLivestreamResponse>;

export const getMeetingActiveLivestreamsLivestream: (
  input: GetMeetingActiveLivestreamsLivestreamRequest,
) => Effect.Effect<
  GetMeetingActiveLivestreamsLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMeetingActiveLivestreamsLivestreamRequest,
  output: GetMeetingActiveLivestreamsLivestreamResponse,
  errors: [],
}));

// =============================================================================
// MeetingByIdMeeting
// =============================================================================

export interface GetMeetingByIdMeetingRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: */
  name?: string;
}

export const GetMeetingByIdMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}",
  }),
) as unknown as Schema.Schema<GetMeetingByIdMeetingRequest>;

export interface GetMeetingByIdMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    aiConfig?: {
      summarization?: {
        summaryType?:
          | "general"
          | "team_meeting"
          | "sales_call"
          | "client_check_in"
          | "interview"
          | "daily_standup"
          | "one_on_one_meeting"
          | "lecture"
          | "code_review";
        textFormat?: "plain_text" | "markdown";
        wordLimit?: number;
      };
      transcription?: {
        keywords?: string[];
        language?:
          | "en-US"
          | "en-IN"
          | "de"
          | "hi"
          | "sv"
          | "ru"
          | "pl"
          | "el"
          | "fr"
          | "nl";
        profanityFilter?: boolean;
      };
    };
    liveStreamOnStart?: boolean;
    persistChat?: boolean;
    recordOnStart?: boolean;
    recordingConfig?: {
      audioConfig?: {
        channel?: "mono" | "stereo";
        codec?: "MP3" | "AAC";
        exportFile?: boolean;
      };
      fileNamePrefix?: string;
      liveStreamingConfig?: { rtmpUrl?: string };
      maxSeconds?: number;
      realtimekitBucketConfig?: { enabled: boolean };
      storageConfig?: {
        type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
        accessKey?: string;
        authMethod?: "KEY" | "PASSWORD";
        bucket?: string;
        host?: string;
        password?: string;
        path?: string;
        port?: number;
        privateKey?: string;
        region?: string;
        secret?: string;
        username?: string;
      } | null;
      videoConfig?: {
        codec?: "H264" | "VP8";
        exportFile?: boolean;
        height?: number;
        watermark?: {
          position?: "left top" | "right top" | "left bottom" | "right bottom";
          size?: { height?: number; width?: number };
          url?: string;
        };
        width?: number;
      };
    };
    sessionKeepAliveTimeInSecs?: number;
    status?: "ACTIVE" | "INACTIVE";
    summarizeOnEnd?: boolean;
    title?: string;
  };
}

export const GetMeetingByIdMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literal(
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ),
              ).pipe(T.JsonName("summary_type")),
              textFormat: Schema.optional(
                Schema.Literal("plain_text", "markdown"),
              ).pipe(T.JsonName("text_format")),
              wordLimit: Schema.optional(Schema.Number).pipe(
                T.JsonName("word_limit"),
              ),
            }),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literal(
                  "en-US",
                  "en-IN",
                  "de",
                  "hi",
                  "sv",
                  "ru",
                  "pl",
                  "el",
                  "fr",
                  "nl",
                ),
              ),
              profanityFilter: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("profanity_filter"),
              ),
            }),
          ),
        }),
      ).pipe(T.JsonName("ai_config")),
      liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("live_stream_on_start"),
      ),
      persistChat: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("persist_chat"),
      ),
      recordOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("record_on_start"),
      ),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literal("mono", "stereo")),
              codec: Schema.optional(Schema.Literal("MP3", "AAC")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
            }),
          ).pipe(T.JsonName("audio_config")),
          fileNamePrefix: Schema.optional(Schema.String).pipe(
            T.JsonName("file_name_prefix"),
          ),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String).pipe(
                T.JsonName("rtmp_url"),
              ),
            }),
          ).pipe(T.JsonName("live_streaming_config")),
          maxSeconds: Schema.optional(Schema.Number).pipe(
            T.JsonName("max_seconds"),
          ),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ).pipe(T.JsonName("realtimekit_bucket_config")),
          storageConfig: Schema.optional(
            Schema.Union(
              Schema.Struct({
                type: Schema.Literal(
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ),
                accessKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("access_key"),
                ),
                authMethod: Schema.optional(
                  Schema.Literal("KEY", "PASSWORD"),
                ).pipe(T.JsonName("auth_method")),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("private_key"),
                ),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }),
              Schema.Null,
            ),
          ).pipe(T.JsonName("storage_config")),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literal("H264", "VP8")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literal(
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ),
                  ),
                  size: Schema.optional(
                    Schema.Struct({
                      height: Schema.optional(Schema.Number),
                      width: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              width: Schema.optional(Schema.Number),
            }),
          ).pipe(T.JsonName("video_config")),
        }),
      ).pipe(T.JsonName("recording_config")),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
        T.JsonName("session_keep_alive_time_in_secs"),
      ),
      status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
      summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("summarize_on_end"),
      ),
      title: Schema.optional(Schema.String),
    }),
  ),
}) as unknown as Schema.Schema<GetMeetingByIdMeetingResponse>;

export const getMeetingByIdMeeting: (
  input: GetMeetingByIdMeetingRequest,
) => Effect.Effect<
  GetMeetingByIdMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMeetingByIdMeetingRequest,
  output: GetMeetingByIdMeetingResponse,
  errors: [],
}));

export interface UpdateMeetingByIdMeetingRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The AI Config allows you to customize the behavior of meeting transcriptions and summaries */
  aiConfig?: {
    summarization?: {
      summaryType?:
        | "general"
        | "team_meeting"
        | "sales_call"
        | "client_check_in"
        | "interview"
        | "daily_standup"
        | "one_on_one_meeting"
        | "lecture"
        | "code_review";
      textFormat?: "plain_text" | "markdown";
      wordLimit?: number;
    };
    transcription?: {
      keywords?: string[];
      language?:
        | "en-US"
        | "en-IN"
        | "de"
        | "hi"
        | "sv"
        | "ru"
        | "pl"
        | "el"
        | "fr"
        | "nl";
      profanityFilter?: boolean;
    };
  };
  /** Body param: Specifies if the meeting should start getting livestreamed on start. */
  liveStreamOnStart?: boolean;
  /** Body param: If a meeting is updated to persist_chat, meeting chat would remain for a week within the meeting space. */
  persistChat?: boolean;
  /** Body param: Specifies if the meeting should start getting recorded as soon as someone joins the meeting. */
  recordOnStart?: boolean;
  /** Body param: Time in seconds, for which a session remains active, after the last participant has left the meeting. */
  sessionKeepAliveTimeInSecs?: number;
  /** Body param: Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting. */
  status?: "ACTIVE" | "INACTIVE";
  /** Body param: Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API. */
  summarizeOnEnd?: boolean;
  /** Body param: Title of the meeting */
  title?: string;
}

export const UpdateMeetingByIdMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  aiConfig: Schema.optional(
    Schema.Struct({
      summarization: Schema.optional(
        Schema.Struct({
          summaryType: Schema.optional(
            Schema.Literal(
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ),
          ).pipe(T.JsonName("summary_type")),
          textFormat: Schema.optional(
            Schema.Literal("plain_text", "markdown"),
          ).pipe(T.JsonName("text_format")),
          wordLimit: Schema.optional(Schema.Number).pipe(
            T.JsonName("word_limit"),
          ),
        }),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literal(
              "en-US",
              "en-IN",
              "de",
              "hi",
              "sv",
              "ru",
              "pl",
              "el",
              "fr",
              "nl",
            ),
          ),
          profanityFilter: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("profanity_filter"),
          ),
        }),
      ),
    }),
  ).pipe(T.JsonName("ai_config")),
  liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("live_stream_on_start"),
  ),
  persistChat: Schema.optional(Schema.Boolean).pipe(T.JsonName("persist_chat")),
  recordOnStart: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("record_on_start"),
  ),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
    T.JsonName("session_keep_alive_time_in_secs"),
  ),
  status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
  summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("summarize_on_end"),
  ),
  title: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}",
  }),
) as unknown as Schema.Schema<UpdateMeetingByIdMeetingRequest>;

export interface UpdateMeetingByIdMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    aiConfig?: {
      summarization?: {
        summaryType?:
          | "general"
          | "team_meeting"
          | "sales_call"
          | "client_check_in"
          | "interview"
          | "daily_standup"
          | "one_on_one_meeting"
          | "lecture"
          | "code_review";
        textFormat?: "plain_text" | "markdown";
        wordLimit?: number;
      };
      transcription?: {
        keywords?: string[];
        language?:
          | "en-US"
          | "en-IN"
          | "de"
          | "hi"
          | "sv"
          | "ru"
          | "pl"
          | "el"
          | "fr"
          | "nl";
        profanityFilter?: boolean;
      };
    };
    liveStreamOnStart?: boolean;
    persistChat?: boolean;
    recordOnStart?: boolean;
    recordingConfig?: {
      audioConfig?: {
        channel?: "mono" | "stereo";
        codec?: "MP3" | "AAC";
        exportFile?: boolean;
      };
      fileNamePrefix?: string;
      liveStreamingConfig?: { rtmpUrl?: string };
      maxSeconds?: number;
      realtimekitBucketConfig?: { enabled: boolean };
      storageConfig?: {
        type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
        accessKey?: string;
        authMethod?: "KEY" | "PASSWORD";
        bucket?: string;
        host?: string;
        password?: string;
        path?: string;
        port?: number;
        privateKey?: string;
        region?: string;
        secret?: string;
        username?: string;
      } | null;
      videoConfig?: {
        codec?: "H264" | "VP8";
        exportFile?: boolean;
        height?: number;
        watermark?: {
          position?: "left top" | "right top" | "left bottom" | "right bottom";
          size?: { height?: number; width?: number };
          url?: string;
        };
        width?: number;
      };
    };
    sessionKeepAliveTimeInSecs?: number;
    status?: "ACTIVE" | "INACTIVE";
    summarizeOnEnd?: boolean;
    title?: string;
  };
}

export const UpdateMeetingByIdMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literal(
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ),
              ).pipe(T.JsonName("summary_type")),
              textFormat: Schema.optional(
                Schema.Literal("plain_text", "markdown"),
              ).pipe(T.JsonName("text_format")),
              wordLimit: Schema.optional(Schema.Number).pipe(
                T.JsonName("word_limit"),
              ),
            }),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literal(
                  "en-US",
                  "en-IN",
                  "de",
                  "hi",
                  "sv",
                  "ru",
                  "pl",
                  "el",
                  "fr",
                  "nl",
                ),
              ),
              profanityFilter: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("profanity_filter"),
              ),
            }),
          ),
        }),
      ).pipe(T.JsonName("ai_config")),
      liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("live_stream_on_start"),
      ),
      persistChat: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("persist_chat"),
      ),
      recordOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("record_on_start"),
      ),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literal("mono", "stereo")),
              codec: Schema.optional(Schema.Literal("MP3", "AAC")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
            }),
          ).pipe(T.JsonName("audio_config")),
          fileNamePrefix: Schema.optional(Schema.String).pipe(
            T.JsonName("file_name_prefix"),
          ),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String).pipe(
                T.JsonName("rtmp_url"),
              ),
            }),
          ).pipe(T.JsonName("live_streaming_config")),
          maxSeconds: Schema.optional(Schema.Number).pipe(
            T.JsonName("max_seconds"),
          ),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ).pipe(T.JsonName("realtimekit_bucket_config")),
          storageConfig: Schema.optional(
            Schema.Union(
              Schema.Struct({
                type: Schema.Literal(
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ),
                accessKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("access_key"),
                ),
                authMethod: Schema.optional(
                  Schema.Literal("KEY", "PASSWORD"),
                ).pipe(T.JsonName("auth_method")),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("private_key"),
                ),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }),
              Schema.Null,
            ),
          ).pipe(T.JsonName("storage_config")),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literal("H264", "VP8")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literal(
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ),
                  ),
                  size: Schema.optional(
                    Schema.Struct({
                      height: Schema.optional(Schema.Number),
                      width: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              width: Schema.optional(Schema.Number),
            }),
          ).pipe(T.JsonName("video_config")),
        }),
      ).pipe(T.JsonName("recording_config")),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
        T.JsonName("session_keep_alive_time_in_secs"),
      ),
      status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
      summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("summarize_on_end"),
      ),
      title: Schema.optional(Schema.String),
    }),
  ),
}) as unknown as Schema.Schema<UpdateMeetingByIdMeetingResponse>;

export const updateMeetingByIdMeeting: (
  input: UpdateMeetingByIdMeetingRequest,
) => Effect.Effect<
  UpdateMeetingByIdMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMeetingByIdMeetingRequest,
  output: UpdateMeetingByIdMeetingResponse,
  errors: [],
}));

export interface ReplaceMeetingByIdMeetingRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The AI Config allows you to customize the behavior of meeting transcriptions and summaries */
  aiConfig?: {
    summarization?: {
      summaryType?:
        | "general"
        | "team_meeting"
        | "sales_call"
        | "client_check_in"
        | "interview"
        | "daily_standup"
        | "one_on_one_meeting"
        | "lecture"
        | "code_review";
      textFormat?: "plain_text" | "markdown";
      wordLimit?: number;
    };
    transcription?: {
      keywords?: string[];
      language?:
        | "en-US"
        | "en-IN"
        | "de"
        | "hi"
        | "sv"
        | "ru"
        | "pl"
        | "el"
        | "fr"
        | "nl";
      profanityFilter?: boolean;
    };
  };
  /** Body param: Specifies if the meeting should start getting livestreamed on start. */
  liveStreamOnStart?: boolean | null;
  /** Body param: If a meeting is set to persist_chat, meeting chat would remain for a week within the meeting space. */
  persistChat?: boolean;
  /** Body param: Specifies if the meeting should start getting recorded as soon as someone joins the meeting. */
  recordOnStart?: boolean | null;
  /** Body param: Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal. */
  recordingConfig?: {
    audioConfig?: {
      channel?: "mono" | "stereo";
      codec?: "MP3" | "AAC";
      exportFile?: boolean;
    };
    fileNamePrefix?: string;
    liveStreamingConfig?: { rtmpUrl?: string };
    maxSeconds?: number;
    realtimekitBucketConfig?: { enabled: boolean };
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      accessKey?: string;
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
    videoConfig?: {
      codec?: "H264" | "VP8";
      exportFile?: boolean;
      height?: number;
      watermark?: {
        position?: "left top" | "right top" | "left bottom" | "right bottom";
        size?: { height?: number; width?: number };
        url?: string;
      };
      width?: number;
    };
  };
  /** Body param: Time in seconds, for which a session remains active, after the last participant has left the meeting. */
  sessionKeepAliveTimeInSecs?: number;
  /** Body param: Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API. */
  summarizeOnEnd?: boolean;
  /** Body param: Title of the meeting */
  title?: string | null;
}

export const ReplaceMeetingByIdMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  aiConfig: Schema.optional(
    Schema.Struct({
      summarization: Schema.optional(
        Schema.Struct({
          summaryType: Schema.optional(
            Schema.Literal(
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ),
          ).pipe(T.JsonName("summary_type")),
          textFormat: Schema.optional(
            Schema.Literal("plain_text", "markdown"),
          ).pipe(T.JsonName("text_format")),
          wordLimit: Schema.optional(Schema.Number).pipe(
            T.JsonName("word_limit"),
          ),
        }),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literal(
              "en-US",
              "en-IN",
              "de",
              "hi",
              "sv",
              "ru",
              "pl",
              "el",
              "fr",
              "nl",
            ),
          ),
          profanityFilter: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("profanity_filter"),
          ),
        }),
      ),
    }),
  ).pipe(T.JsonName("ai_config")),
  liveStreamOnStart: Schema.optional(
    Schema.Union(Schema.Boolean, Schema.Null),
  ).pipe(T.JsonName("live_stream_on_start")),
  persistChat: Schema.optional(Schema.Boolean).pipe(T.JsonName("persist_chat")),
  recordOnStart: Schema.optional(
    Schema.Union(Schema.Boolean, Schema.Null),
  ).pipe(T.JsonName("record_on_start")),
  recordingConfig: Schema.optional(
    Schema.Struct({
      audioConfig: Schema.optional(
        Schema.Struct({
          channel: Schema.optional(Schema.Literal("mono", "stereo")),
          codec: Schema.optional(Schema.Literal("MP3", "AAC")),
          exportFile: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("export_file"),
          ),
        }),
      ).pipe(T.JsonName("audio_config")),
      fileNamePrefix: Schema.optional(Schema.String).pipe(
        T.JsonName("file_name_prefix"),
      ),
      liveStreamingConfig: Schema.optional(
        Schema.Struct({
          rtmpUrl: Schema.optional(Schema.String).pipe(T.JsonName("rtmp_url")),
        }),
      ).pipe(T.JsonName("live_streaming_config")),
      maxSeconds: Schema.optional(Schema.Number).pipe(
        T.JsonName("max_seconds"),
      ),
      realtimekitBucketConfig: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ).pipe(T.JsonName("realtimekit_bucket_config")),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            accessKey: Schema.optional(Schema.String).pipe(
              T.JsonName("access_key"),
            ),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
      videoConfig: Schema.optional(
        Schema.Struct({
          codec: Schema.optional(Schema.Literal("H264", "VP8")),
          exportFile: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("export_file"),
          ),
          height: Schema.optional(Schema.Number),
          watermark: Schema.optional(
            Schema.Struct({
              position: Schema.optional(
                Schema.Literal(
                  "left top",
                  "right top",
                  "left bottom",
                  "right bottom",
                ),
              ),
              size: Schema.optional(
                Schema.Struct({
                  height: Schema.optional(Schema.Number),
                  width: Schema.optional(Schema.Number),
                }),
              ),
              url: Schema.optional(Schema.String),
            }),
          ),
          width: Schema.optional(Schema.Number),
        }),
      ).pipe(T.JsonName("video_config")),
    }),
  ).pipe(T.JsonName("recording_config")),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
    T.JsonName("session_keep_alive_time_in_secs"),
  ),
  summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("summarize_on_end"),
  ),
  title: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}",
  }),
) as unknown as Schema.Schema<ReplaceMeetingByIdMeetingRequest>;

export interface ReplaceMeetingByIdMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    aiConfig?: {
      summarization?: {
        summaryType?:
          | "general"
          | "team_meeting"
          | "sales_call"
          | "client_check_in"
          | "interview"
          | "daily_standup"
          | "one_on_one_meeting"
          | "lecture"
          | "code_review";
        textFormat?: "plain_text" | "markdown";
        wordLimit?: number;
      };
      transcription?: {
        keywords?: string[];
        language?:
          | "en-US"
          | "en-IN"
          | "de"
          | "hi"
          | "sv"
          | "ru"
          | "pl"
          | "el"
          | "fr"
          | "nl";
        profanityFilter?: boolean;
      };
    };
    liveStreamOnStart?: boolean;
    persistChat?: boolean;
    recordOnStart?: boolean;
    recordingConfig?: {
      audioConfig?: {
        channel?: "mono" | "stereo";
        codec?: "MP3" | "AAC";
        exportFile?: boolean;
      };
      fileNamePrefix?: string;
      liveStreamingConfig?: { rtmpUrl?: string };
      maxSeconds?: number;
      realtimekitBucketConfig?: { enabled: boolean };
      storageConfig?: {
        type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
        accessKey?: string;
        authMethod?: "KEY" | "PASSWORD";
        bucket?: string;
        host?: string;
        password?: string;
        path?: string;
        port?: number;
        privateKey?: string;
        region?: string;
        secret?: string;
        username?: string;
      } | null;
      videoConfig?: {
        codec?: "H264" | "VP8";
        exportFile?: boolean;
        height?: number;
        watermark?: {
          position?: "left top" | "right top" | "left bottom" | "right bottom";
          size?: { height?: number; width?: number };
          url?: string;
        };
        width?: number;
      };
    };
    sessionKeepAliveTimeInSecs?: number;
    status?: "ACTIVE" | "INACTIVE";
    summarizeOnEnd?: boolean;
    title?: string;
  };
}

export const ReplaceMeetingByIdMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literal(
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ),
              ).pipe(T.JsonName("summary_type")),
              textFormat: Schema.optional(
                Schema.Literal("plain_text", "markdown"),
              ).pipe(T.JsonName("text_format")),
              wordLimit: Schema.optional(Schema.Number).pipe(
                T.JsonName("word_limit"),
              ),
            }),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literal(
                  "en-US",
                  "en-IN",
                  "de",
                  "hi",
                  "sv",
                  "ru",
                  "pl",
                  "el",
                  "fr",
                  "nl",
                ),
              ),
              profanityFilter: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("profanity_filter"),
              ),
            }),
          ),
        }),
      ).pipe(T.JsonName("ai_config")),
      liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("live_stream_on_start"),
      ),
      persistChat: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("persist_chat"),
      ),
      recordOnStart: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("record_on_start"),
      ),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literal("mono", "stereo")),
              codec: Schema.optional(Schema.Literal("MP3", "AAC")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
            }),
          ).pipe(T.JsonName("audio_config")),
          fileNamePrefix: Schema.optional(Schema.String).pipe(
            T.JsonName("file_name_prefix"),
          ),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String).pipe(
                T.JsonName("rtmp_url"),
              ),
            }),
          ).pipe(T.JsonName("live_streaming_config")),
          maxSeconds: Schema.optional(Schema.Number).pipe(
            T.JsonName("max_seconds"),
          ),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ).pipe(T.JsonName("realtimekit_bucket_config")),
          storageConfig: Schema.optional(
            Schema.Union(
              Schema.Struct({
                type: Schema.Literal(
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ),
                accessKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("access_key"),
                ),
                authMethod: Schema.optional(
                  Schema.Literal("KEY", "PASSWORD"),
                ).pipe(T.JsonName("auth_method")),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String).pipe(
                  T.JsonName("private_key"),
                ),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }),
              Schema.Null,
            ),
          ).pipe(T.JsonName("storage_config")),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literal("H264", "VP8")),
              exportFile: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("export_file"),
              ),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literal(
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ),
                  ),
                  size: Schema.optional(
                    Schema.Struct({
                      height: Schema.optional(Schema.Number),
                      width: Schema.optional(Schema.Number),
                    }),
                  ),
                  url: Schema.optional(Schema.String),
                }),
              ),
              width: Schema.optional(Schema.Number),
            }),
          ).pipe(T.JsonName("video_config")),
        }),
      ).pipe(T.JsonName("recording_config")),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
        T.JsonName("session_keep_alive_time_in_secs"),
      ),
      status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
      summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("summarize_on_end"),
      ),
      title: Schema.optional(Schema.String),
    }),
  ),
}) as unknown as Schema.Schema<ReplaceMeetingByIdMeetingResponse>;

export const replaceMeetingByIdMeeting: (
  input: ReplaceMeetingByIdMeetingRequest,
) => Effect.Effect<
  ReplaceMeetingByIdMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReplaceMeetingByIdMeetingRequest,
  output: ReplaceMeetingByIdMeetingResponse,
  errors: [],
}));

// =============================================================================
// MeetingParticipantMeeting
// =============================================================================

export interface GetMeetingParticipantMeetingRequest {
  appId: string;
  meetingId: string;
  participantId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetMeetingParticipantMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  participantId: Schema.String.pipe(T.HttpPath("participantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}",
  }),
) as unknown as Schema.Schema<GetMeetingParticipantMeetingRequest>;

export interface GetMeetingParticipantMeetingResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    createdAt: string;
    customParticipantId: string;
    presetName: string;
    updatedAt: string;
    name?: string | null;
    picture?: string | null;
  };
  /** Success status of the operation */
  success: boolean;
}

export const GetMeetingParticipantMeetingResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    customParticipantId: Schema.String.pipe(
      T.JsonName("custom_participant_id"),
    ),
    presetName: Schema.String.pipe(T.JsonName("preset_name")),
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
    picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingParticipantMeetingResponse>;

export const getMeetingParticipantMeeting: (
  input: GetMeetingParticipantMeetingRequest,
) => Effect.Effect<
  GetMeetingParticipantMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMeetingParticipantMeetingRequest,
  output: GetMeetingParticipantMeetingResponse,
  errors: [],
}));

export interface DeleteMeetingParticipantMeetingRequest {
  appId: string;
  meetingId: string;
  participantId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteMeetingParticipantMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  participantId: Schema.String.pipe(T.HttpPath("participantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}",
  }),
) as unknown as Schema.Schema<DeleteMeetingParticipantMeetingRequest>;

export interface DeleteMeetingParticipantMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    createdAt: string;
    customParticipantId: string;
    presetId: string;
    updatedAt: string;
  };
}

export const DeleteMeetingParticipantMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      customParticipantId: Schema.String.pipe(
        T.JsonName("custom_participant_id"),
      ),
      presetId: Schema.String.pipe(T.JsonName("preset_id")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    }),
  ),
}) as unknown as Schema.Schema<DeleteMeetingParticipantMeetingResponse>;

export const deleteMeetingParticipantMeeting: (
  input: DeleteMeetingParticipantMeetingRequest,
) => Effect.Effect<
  DeleteMeetingParticipantMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMeetingParticipantMeetingRequest,
  output: DeleteMeetingParticipantMeetingResponse,
  errors: [],
}));

// =============================================================================
// MeetingParticipantsMeeting
// =============================================================================

export interface GetMeetingParticipantsMeetingRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page */
  perPage?: number;
}

export const GetMeetingParticipantsMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants",
  }),
) as unknown as Schema.Schema<GetMeetingParticipantsMeetingRequest>;

export interface GetMeetingParticipantsMeetingResponse {
  data: {
    id: string;
    createdAt: string;
    customParticipantId: string;
    presetName: string;
    updatedAt: string;
    name?: string | null;
    picture?: string | null;
  }[];
  paging: { endOffset: number; startOffset: number; totalCount: number };
  success: boolean;
}

export const GetMeetingParticipantsMeetingResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      customParticipantId: Schema.String.pipe(
        T.JsonName("custom_participant_id"),
      ),
      presetName: Schema.String.pipe(T.JsonName("preset_name")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
      picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
    }),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number.pipe(T.JsonName("end_offset")),
    startOffset: Schema.Number.pipe(T.JsonName("start_offset")),
    totalCount: Schema.Number.pipe(T.JsonName("total_count")),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingParticipantsMeetingResponse>;

export const getMeetingParticipantsMeeting: (
  input: GetMeetingParticipantsMeetingRequest,
) => Effect.Effect<
  GetMeetingParticipantsMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMeetingParticipantsMeetingRequest,
  output: GetMeetingParticipantsMeetingResponse,
  errors: [],
}));

// =============================================================================
// OneRecordingRecording
// =============================================================================

export interface GetOneRecordingRecordingRequest {
  appId: string;
  recordingId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetOneRecordingRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  recordingId: Schema.String.pipe(T.HttpPath("recordingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings/{recordingId}",
  }),
) as unknown as Schema.Schema<GetOneRecordingRecordingRequest>;

export interface GetOneRecordingRecordingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    audioDownloadUrl: string | null;
    downloadUrl: string | null;
    downloadUrlExpiry: string | null;
    fileSize: number | null;
    invokedTime: string;
    outputFileName: string;
    sessionId: string | null;
    startedTime: string | null;
    status:
      | "INVOKED"
      | "RECORDING"
      | "UPLOADING"
      | "UPLOADED"
      | "ERRORED"
      | "PAUSED";
    stoppedTime: string | null;
    recordingDuration?: number;
    startReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "RECORD_ON_START";
    };
    stopReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "INTERNAL_ERROR" | "ALL_PEERS_LEFT";
    };
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
  };
}

export const GetOneRecordingRecordingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      audioDownloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("audio_download_url"),
      ),
      downloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url"),
      ),
      downloadUrlExpiry: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url_expiry"),
      ),
      fileSize: Schema.Union(Schema.Number, Schema.Null).pipe(
        T.JsonName("file_size"),
      ),
      invokedTime: Schema.String.pipe(T.JsonName("invoked_time")),
      outputFileName: Schema.String.pipe(T.JsonName("output_file_name")),
      sessionId: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("session_id"),
      ),
      startedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("started_time"),
      ),
      status: Schema.Literal(
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ),
      stoppedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("stopped_time"),
      ),
      recordingDuration: Schema.optional(Schema.Number).pipe(
        T.JsonName("recording_duration"),
      ),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "RECORD_ON_START"),
          ),
        }),
      ).pipe(T.JsonName("start_reason")),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"),
          ),
        }),
      ).pipe(T.JsonName("stop_reason")),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
    }),
  ),
}) as unknown as Schema.Schema<GetOneRecordingRecordingResponse>;

export const getOneRecordingRecording: (
  input: GetOneRecordingRecordingRequest,
) => Effect.Effect<
  GetOneRecordingRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOneRecordingRecordingRequest,
  output: GetOneRecordingRecordingResponse,
  errors: [],
}));

// =============================================================================
// OrgAnalyticsAnalytic
// =============================================================================

export interface GetOrgAnalyticsAnalyticRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: end date in YYYY-MM-DD format */
  endDate?: string;
  /** Query param: start date in YYYY-MM-DD format */
  startDate?: string;
}

export const GetOrgAnalyticsAnalyticRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("end_date")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("start_date")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/analytics/daywise",
  }),
) as unknown as Schema.Schema<GetOrgAnalyticsAnalyticRequest>;

export interface GetOrgAnalyticsAnalyticResponse {
  data?: {
    recordingStats?: {
      dayStats?: {
        day?: string;
        totalRecordingMinutes?: number;
        totalRecordings?: number;
      }[];
      recordingCount?: number;
      recordingMinutesConsumed?: number;
    };
    sessionStats?: {
      dayStats?: {
        day?: string;
        totalSessionMinutes?: number;
        totalSessions?: number;
      }[];
      sessionsCount?: number;
      sessionsMinutesConsumed?: number;
    };
  };
  success?: boolean;
}

export const GetOrgAnalyticsAnalyticResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      recordingStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalRecordingMinutes: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_recording_minutes"),
                ),
                totalRecordings: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_recordings"),
                ),
              }),
            ),
          ).pipe(T.JsonName("day_stats")),
          recordingCount: Schema.optional(Schema.Number).pipe(
            T.JsonName("recording_count"),
          ),
          recordingMinutesConsumed: Schema.optional(Schema.Number).pipe(
            T.JsonName("recording_minutes_consumed"),
          ),
        }),
      ).pipe(T.JsonName("recording_stats")),
      sessionStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalSessionMinutes: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_session_minutes"),
                ),
                totalSessions: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_sessions"),
                ),
              }),
            ),
          ).pipe(T.JsonName("day_stats")),
          sessionsCount: Schema.optional(Schema.Number).pipe(
            T.JsonName("sessions_count"),
          ),
          sessionsMinutesConsumed: Schema.optional(Schema.Number).pipe(
            T.JsonName("sessions_minutes_consumed"),
          ),
        }),
      ).pipe(T.JsonName("session_stats")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetOrgAnalyticsAnalyticResponse>;

export const getOrgAnalyticsAnalytic: (
  input: GetOrgAnalyticsAnalyticRequest,
) => Effect.Effect<
  GetOrgAnalyticsAnalyticResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrgAnalyticsAnalyticRequest,
  output: GetOrgAnalyticsAnalyticResponse,
  errors: [],
}));

// =============================================================================
// OrgAnalyticsLivestream
// =============================================================================

export interface GetOrgAnalyticsLivestreamRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: end date in YYYY-MM-DD format */
  endDate?: string;
  /** Query param: start date in YYYY-MM-DD format */
  startDate?: string;
}

export const GetOrgAnalyticsLivestreamRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endDate: Schema.optional(Schema.String).pipe(T.HttpQuery("end_date")),
  startDate: Schema.optional(Schema.String).pipe(T.HttpQuery("start_date")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/analytics/daywise",
  }),
) as unknown as Schema.Schema<GetOrgAnalyticsLivestreamRequest>;

export interface GetOrgAnalyticsLivestreamResponse {
  data?: {
    recordingStats?: {
      dayStats?: {
        day?: string;
        totalRecordingMinutes?: number;
        totalRecordings?: number;
      }[];
      recordingCount?: number;
      recordingMinutesConsumed?: number;
    };
    sessionStats?: {
      dayStats?: {
        day?: string;
        totalSessionMinutes?: number;
        totalSessions?: number;
      }[];
      sessionsCount?: number;
      sessionsMinutesConsumed?: number;
    };
  };
  success?: boolean;
}

export const GetOrgAnalyticsLivestreamResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      recordingStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalRecordingMinutes: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_recording_minutes"),
                ),
                totalRecordings: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_recordings"),
                ),
              }),
            ),
          ).pipe(T.JsonName("day_stats")),
          recordingCount: Schema.optional(Schema.Number).pipe(
            T.JsonName("recording_count"),
          ),
          recordingMinutesConsumed: Schema.optional(Schema.Number).pipe(
            T.JsonName("recording_minutes_consumed"),
          ),
        }),
      ).pipe(T.JsonName("recording_stats")),
      sessionStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalSessionMinutes: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_session_minutes"),
                ),
                totalSessions: Schema.optional(Schema.Number).pipe(
                  T.JsonName("total_sessions"),
                ),
              }),
            ),
          ).pipe(T.JsonName("day_stats")),
          sessionsCount: Schema.optional(Schema.Number).pipe(
            T.JsonName("sessions_count"),
          ),
          sessionsMinutesConsumed: Schema.optional(Schema.Number).pipe(
            T.JsonName("sessions_minutes_consumed"),
          ),
        }),
      ).pipe(T.JsonName("session_stats")),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetOrgAnalyticsLivestreamResponse>;

export const getOrgAnalyticsLivestream: (
  input: GetOrgAnalyticsLivestreamRequest,
) => Effect.Effect<
  GetOrgAnalyticsLivestreamResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrgAnalyticsLivestreamRequest,
  output: GetOrgAnalyticsLivestreamResponse,
  errors: [],
}));

// =============================================================================
// ParticipantDataFromPeerIdSession
// =============================================================================

export interface GetParticipantDataFromPeerIdSessionRequest {
  appId: string;
  peerId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Comma separated list of filters to apply. Note that there must be no spaces between the filters. */
  filters?:
    | "device_info"
    | "ip_information"
    | "precall_network_information"
    | "events"
    | "quality_stats";
}

export const GetParticipantDataFromPeerIdSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  peerId: Schema.String.pipe(T.HttpPath("peerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  filters: Schema.optional(
    Schema.Literal(
      "device_info",
      "ip_information",
      "precall_network_information",
      "events",
      "quality_stats",
    ),
  ).pipe(T.HttpQuery("filters")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/peer-report/{peerId}",
  }),
) as unknown as Schema.Schema<GetParticipantDataFromPeerIdSessionRequest>;

export interface GetParticipantDataFromPeerIdSessionResponse {
  data?: {
    participant?: {
      id?: string;
      createdAt?: string;
      customParticipantId?: string;
      displayName?: string;
      duration?: number;
      joinedAt?: string;
      leftAt?: string;
      presetName?: string;
      updatedAt?: string;
      userId?: string;
    };
  };
  success?: boolean;
}

export const GetParticipantDataFromPeerIdSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      participant: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          createdAt: Schema.optional(Schema.String).pipe(
            T.JsonName("created_at"),
          ),
          customParticipantId: Schema.optional(Schema.String).pipe(
            T.JsonName("custom_participant_id"),
          ),
          displayName: Schema.optional(Schema.String).pipe(
            T.JsonName("display_name"),
          ),
          duration: Schema.optional(Schema.Number),
          joinedAt: Schema.optional(Schema.String).pipe(
            T.JsonName("joined_at"),
          ),
          leftAt: Schema.optional(Schema.String).pipe(T.JsonName("left_at")),
          presetName: Schema.optional(Schema.String).pipe(
            T.JsonName("preset_name"),
          ),
          updatedAt: Schema.optional(Schema.String).pipe(
            T.JsonName("updated_at"),
          ),
          userId: Schema.optional(Schema.String).pipe(T.JsonName("user_id")),
        }),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetParticipantDataFromPeerIdSessionResponse>;

export const getParticipantDataFromPeerIdSession: (
  input: GetParticipantDataFromPeerIdSessionRequest,
) => Effect.Effect<
  GetParticipantDataFromPeerIdSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetParticipantDataFromPeerIdSessionRequest,
  output: GetParticipantDataFromPeerIdSessionResponse,
  errors: [],
}));

// =============================================================================
// ParticipantMeeting
// =============================================================================

export interface AddParticipantMeetingRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: A unique participant ID. You must specify a unique ID for the participant, for example, UUID, email address, and so on. */
  customParticipantId: string;
  /** Body param: Name of the preset to apply to this participant. */
  presetName: string;
  /** Body param: (Optional) Name of the participant. */
  name?: string | null;
  /** Body param: (Optional) A URL to a picture to be used for the participant. */
  picture?: string | null;
}

export const AddParticipantMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  customParticipantId: Schema.String.pipe(T.JsonName("custom_participant_id")),
  presetName: Schema.String.pipe(T.JsonName("preset_name")),
  name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
  picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants",
  }),
) as unknown as Schema.Schema<AddParticipantMeetingRequest>;

export interface AddParticipantMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Represents a participant. */
  data?: {
    id: string;
    token: string;
    createdAt: string;
    customParticipantId: string;
    presetName: string;
    updatedAt: string;
    name?: string | null;
    picture?: string | null;
  };
}

export const AddParticipantMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      token: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      customParticipantId: Schema.String.pipe(
        T.JsonName("custom_participant_id"),
      ),
      presetName: Schema.String.pipe(T.JsonName("preset_name")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
      picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
    }),
  ),
}) as unknown as Schema.Schema<AddParticipantMeetingResponse>;

export const addParticipantMeeting: (
  input: AddParticipantMeetingRequest,
) => Effect.Effect<
  AddParticipantMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: AddParticipantMeetingRequest,
  output: AddParticipantMeetingResponse,
  errors: [],
}));

export interface EditParticipantMeetingRequest {
  appId: string;
  meetingId: string;
  participantId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: (Optional) Name of the participant. */
  name?: string | null;
  /** Body param: (Optional) A URL to a picture to be used for the participant. */
  picture?: string | null;
  /** Body param: (Optional) Name of the preset to apply to this participant. */
  presetName?: string | null;
}

export const EditParticipantMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  participantId: Schema.String.pipe(T.HttpPath("participantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
  picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
  presetName: Schema.optional(Schema.Union(Schema.String, Schema.Null)).pipe(
    T.JsonName("preset_name"),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}",
  }),
) as unknown as Schema.Schema<EditParticipantMeetingRequest>;

export interface EditParticipantMeetingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Represents a participant. */
  data?: {
    id: string;
    token: string;
    createdAt: string;
    customParticipantId: string;
    presetName: string;
    updatedAt: string;
    name?: string | null;
    picture?: string | null;
  };
}

export const EditParticipantMeetingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      token: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      customParticipantId: Schema.String.pipe(
        T.JsonName("custom_participant_id"),
      ),
      presetName: Schema.String.pipe(T.JsonName("preset_name")),
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      name: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
      picture: Schema.optional(Schema.Union(Schema.String, Schema.Null)),
    }),
  ),
}) as unknown as Schema.Schema<EditParticipantMeetingResponse>;

export const editParticipantMeeting: (
  input: EditParticipantMeetingRequest,
) => Effect.Effect<
  EditParticipantMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditParticipantMeetingRequest,
  output: EditParticipantMeetingResponse,
  errors: [],
}));

// =============================================================================
// ParticipantsActiveSession
// =============================================================================

export interface KickParticipantsActiveSessionRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  customParticipantIds: string[];
  /** Body param: */
  participantIds: string[];
}

export const KickParticipantsActiveSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  customParticipantIds: Schema.Array(Schema.String).pipe(
    T.JsonName("custom_participant_ids"),
  ),
  participantIds: Schema.Array(Schema.String).pipe(
    T.JsonName("participant_ids"),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-session/kick",
  }),
) as unknown as Schema.Schema<KickParticipantsActiveSessionRequest>;

export interface KickParticipantsActiveSessionResponse {
  data?: {
    action?: string;
    participants?: {
      id: string;
      createdAt: string;
      updatedAt: string;
      email?: string;
      name?: string;
      picture?: string;
    }[];
  };
  success?: boolean;
}

export const KickParticipantsActiveSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      action: Schema.optional(Schema.String),
      participants: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            createdAt: Schema.String.pipe(T.JsonName("created_at")),
            updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
            email: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            picture: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<KickParticipantsActiveSessionResponse>;

export const kickParticipantsActiveSession: (
  input: KickParticipantsActiveSessionRequest,
) => Effect.Effect<
  KickParticipantsActiveSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: KickParticipantsActiveSessionRequest,
  output: KickParticipantsActiveSessionResponse,
  errors: [],
}));

// =============================================================================
// ParticipantTokenMeeting
// =============================================================================

export interface RefreshParticipantTokenMeetingRequest {
  appId: string;
  meetingId: string;
  participantId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const RefreshParticipantTokenMeetingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  participantId: Schema.String.pipe(T.HttpPath("participantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/participants/{participantId}/token",
  }),
) as unknown as Schema.Schema<RefreshParticipantTokenMeetingRequest>;

export interface RefreshParticipantTokenMeetingResponse {
  /** Data returned by the operation */
  data: { token: string };
  /** Success status of the operation */
  success: boolean;
}

export const RefreshParticipantTokenMeetingResponse = Schema.Struct({
  data: Schema.Struct({
    token: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<RefreshParticipantTokenMeetingResponse>;

export const refreshParticipantTokenMeeting: (
  input: RefreshParticipantTokenMeetingRequest,
) => Effect.Effect<
  RefreshParticipantTokenMeetingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RefreshParticipantTokenMeetingRequest,
  output: RefreshParticipantTokenMeetingResponse,
  errors: [],
}));

// =============================================================================
// PollActiveSession
// =============================================================================

export interface CreatePollActiveSessionRequest {
  appId: string;
  meetingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Different options for the question */
  options: string[];
  /** Body param: Question of the poll */
  question: string;
  /** Body param: if voters on a poll are anonymous */
  anonymous?: boolean;
  /** Body param: if votes on an option are visible before a person votes */
  hideVotes?: boolean;
}

export const CreatePollActiveSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  meetingId: Schema.String.pipe(T.HttpPath("meetingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  options: Schema.Array(Schema.String),
  question: Schema.String,
  anonymous: Schema.optional(Schema.Boolean),
  hideVotes: Schema.optional(Schema.Boolean).pipe(T.JsonName("hide_votes")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/meetings/{meetingId}/active-session/poll",
  }),
) as unknown as Schema.Schema<CreatePollActiveSessionRequest>;

export interface CreatePollActiveSessionResponse {
  data?: {
    action?: string;
    poll?: {
      id: string;
      options: {
        count: number;
        text: string;
        votes: { id: string; name: string }[];
      }[];
      question: string;
      anonymous?: boolean;
      createdBy?: string;
      hideVotes?: boolean;
      voted?: string[];
    };
  };
  success?: boolean;
}

export const CreatePollActiveSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      action: Schema.optional(Schema.String),
      poll: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          options: Schema.Array(
            Schema.Struct({
              count: Schema.Number,
              text: Schema.String,
              votes: Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  name: Schema.String,
                }),
              ),
            }),
          ),
          question: Schema.String,
          anonymous: Schema.optional(Schema.Boolean),
          createdBy: Schema.optional(Schema.String).pipe(
            T.JsonName("created_by"),
          ),
          hideVotes: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("hide_votes"),
          ),
          voted: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreatePollActiveSessionResponse>;

export const createPollActiveSession: (
  input: CreatePollActiveSessionRequest,
) => Effect.Effect<
  CreatePollActiveSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePollActiveSessionRequest,
  output: CreatePollActiveSessionResponse,
  errors: [],
}));

// =============================================================================
// Preset
// =============================================================================

export interface GetPresetRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page */
  perPage?: number;
}

export const GetPresetRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/presets",
  }),
) as unknown as Schema.Schema<GetPresetRequest>;

export interface GetPresetResponse {
  data: {
    id?: string;
    createdAt?: string;
    name?: string;
    updatedAt?: string;
  }[];
  paging: { endOffset: number; startOffset: number; totalCount: number };
  success: boolean;
}

export const GetPresetResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String).pipe(T.JsonName("created_at")),
      name: Schema.optional(Schema.String),
      updatedAt: Schema.optional(Schema.String).pipe(T.JsonName("updated_at")),
    }),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number.pipe(T.JsonName("end_offset")),
    startOffset: Schema.Number.pipe(T.JsonName("start_offset")),
    totalCount: Schema.Number.pipe(T.JsonName("total_count")),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetPresetResponse>;

export const getPreset: (
  input: GetPresetRequest,
) => Effect.Effect<
  GetPresetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPresetRequest,
  output: GetPresetResponse,
  errors: [],
}));

export interface CreatePresetRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  config: {
    maxScreenshareCount: number;
    maxVideoStreams: { desktop?: number; mobile?: number };
    media: {
      screenshare?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
    };
    viewType: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
  };
  /** Body param: Name of the preset */
  name: string;
  /** Body param: */
  ui: {
    designTokens: {
      borderRadius?: "rounded";
      borderWidth?: "thin";
      colors?: {
        background?: {
          "1000"?: string;
          "600"?: string;
          "700"?: string;
          "800"?: string;
          "900"?: string;
        };
        brand?: {
          "300"?: string;
          "400"?: string;
          "500"?: string;
          "600"?: string;
          "700"?: string;
        };
        danger?: string;
        success?: string;
        text?: string;
        textOnBrand?: string;
        videoBg?: string;
        warning?: string;
      };
      logo?: string;
      spacingBase?: number;
      theme?: "dark";
    };
    configDiff?: unknown;
  };
  /** Body param: */
  permissions?: {
    acceptWaitingRequests: boolean;
    canAcceptProductionRequests: boolean;
    canChangeParticipantPermissions: boolean;
    canEditDisplayName: boolean;
    canLivestream: boolean;
    canRecord: boolean;
    canSpotlight: boolean;
    chat: {
      private?: {
        canReceive?: boolean;
        canSend?: boolean;
        files?: boolean;
        text?: boolean;
      };
      public?: { canSend?: boolean; files?: boolean; text?: boolean };
    };
    connectedMeetings: {
      canAlterConnectedMeetings?: boolean;
      canSwitchConnectedMeetings?: boolean;
      canSwitchToParentMeeting?: boolean;
    };
    disableParticipantAudio: boolean;
    disableParticipantScreensharing: boolean;
    disableParticipantVideo: boolean;
    hiddenParticipant: boolean;
    kickParticipant: boolean;
    media: {
      audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      screenshare?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
    };
    pinParticipant: boolean;
    plugins: {
      canClose?: boolean;
      canEditConfig?: boolean;
      canStart?: boolean;
      config?:
        | string
        | {
            accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
            handlesViewOnly?: boolean;
          };
    };
    polls: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
    recorderType: "RECORDER" | "LIVESTREAMER" | "NONE";
    showParticipantList: boolean;
    waitingRoomType: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
    isRecorder?: boolean;
  };
}

export const CreatePresetRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  config: Schema.Struct({
    maxScreenshareCount: Schema.Number.pipe(
      T.JsonName("max_screenshare_count"),
    ),
    maxVideoStreams: Schema.Struct({
      desktop: Schema.optional(Schema.Number),
      mobile: Schema.optional(Schema.Number),
    }).pipe(T.JsonName("max_video_streams")),
    media: Schema.Struct({
      screenshare: Schema.optional(
        Schema.Struct({
          canProduce: Schema.optional(
            Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
          ).pipe(T.JsonName("can_produce")),
        }),
      ),
      video: Schema.optional(
        Schema.Struct({
          canProduce: Schema.optional(
            Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
          ).pipe(T.JsonName("can_produce")),
        }),
      ),
    }),
    viewType: Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM").pipe(
      T.JsonName("view_type"),
    ),
  }),
  name: Schema.String,
  ui: Schema.Struct({
    designTokens: Schema.Struct({
      borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
        T.JsonName("border_radius"),
      ),
      borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
        T.JsonName("border_width"),
      ),
      colors: Schema.optional(
        Schema.Struct({
          background: Schema.optional(
            Schema.Struct({
              "1000": Schema.optional(Schema.String),
              "600": Schema.optional(Schema.String),
              "700": Schema.optional(Schema.String),
              "800": Schema.optional(Schema.String),
              "900": Schema.optional(Schema.String),
            }),
          ),
          brand: Schema.optional(
            Schema.Struct({
              "300": Schema.optional(Schema.String),
              "400": Schema.optional(Schema.String),
              "500": Schema.optional(Schema.String),
              "600": Schema.optional(Schema.String),
              "700": Schema.optional(Schema.String),
            }),
          ),
          danger: Schema.optional(Schema.String),
          success: Schema.optional(Schema.String),
          text: Schema.optional(Schema.String),
          textOnBrand: Schema.optional(Schema.String).pipe(
            T.JsonName("text_on_brand"),
          ),
          videoBg: Schema.optional(Schema.String).pipe(T.JsonName("video_bg")),
          warning: Schema.optional(Schema.String),
        }),
      ),
      logo: Schema.optional(Schema.String),
      spacingBase: Schema.optional(Schema.Number).pipe(
        T.JsonName("spacing_base"),
      ),
      theme: Schema.optional(Schema.Literal("dark")),
    }).pipe(T.JsonName("design_tokens")),
    configDiff: Schema.optional(Schema.Unknown).pipe(T.JsonName("config_diff")),
  }),
  permissions: Schema.optional(
    Schema.Struct({
      acceptWaitingRequests: Schema.Boolean.pipe(
        T.JsonName("accept_waiting_requests"),
      ),
      canAcceptProductionRequests: Schema.Boolean.pipe(
        T.JsonName("can_accept_production_requests"),
      ),
      canChangeParticipantPermissions: Schema.Boolean.pipe(
        T.JsonName("can_change_participant_permissions"),
      ),
      canEditDisplayName: Schema.Boolean.pipe(
        T.JsonName("can_edit_display_name"),
      ),
      canLivestream: Schema.Boolean.pipe(T.JsonName("can_livestream")),
      canRecord: Schema.Boolean.pipe(T.JsonName("can_record")),
      canSpotlight: Schema.Boolean.pipe(T.JsonName("can_spotlight")),
      chat: Schema.Struct({
        private: Schema.optional(
          Schema.Struct({
            canReceive: Schema.optional(Schema.Boolean).pipe(
              T.JsonName("can_receive"),
            ),
            canSend: Schema.optional(Schema.Boolean).pipe(
              T.JsonName("can_send"),
            ),
            files: Schema.optional(Schema.Boolean),
            text: Schema.optional(Schema.Boolean),
          }),
        ),
        public: Schema.optional(
          Schema.Struct({
            canSend: Schema.optional(Schema.Boolean).pipe(
              T.JsonName("can_send"),
            ),
            files: Schema.optional(Schema.Boolean),
            text: Schema.optional(Schema.Boolean),
          }),
        ),
      }),
      connectedMeetings: Schema.Struct({
        canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("can_alter_connected_meetings"),
        ),
        canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("can_switch_connected_meetings"),
        ),
        canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("can_switch_to_parent_meeting"),
        ),
      }).pipe(T.JsonName("connected_meetings")),
      disableParticipantAudio: Schema.Boolean.pipe(
        T.JsonName("disable_participant_audio"),
      ),
      disableParticipantScreensharing: Schema.Boolean.pipe(
        T.JsonName("disable_participant_screensharing"),
      ),
      disableParticipantVideo: Schema.Boolean.pipe(
        T.JsonName("disable_participant_video"),
      ),
      hiddenParticipant: Schema.Boolean.pipe(T.JsonName("hidden_participant")),
      kickParticipant: Schema.Boolean.pipe(T.JsonName("kick_participant")),
      media: Schema.Struct({
        audio: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
      }),
      pinParticipant: Schema.Boolean.pipe(T.JsonName("pin_participant")),
      plugins: Schema.Struct({
        canClose: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_close")),
        canEditConfig: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("can_edit_config"),
        ),
        canStart: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_start")),
        config: Schema.optional(
          Schema.Union(
            Schema.String,
            Schema.Struct({
              accessControl: Schema.optional(
                Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
              ).pipe(T.JsonName("access_control")),
              handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("handles_view_only"),
              ),
            }),
          ),
        ),
      }),
      polls: Schema.Struct({
        canCreate: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("can_create"),
        ),
        canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
        canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
      }),
      recorderType: Schema.Literal("RECORDER", "LIVESTREAMER", "NONE").pipe(
        T.JsonName("recorder_type"),
      ),
      showParticipantList: Schema.Boolean.pipe(
        T.JsonName("show_participant_list"),
      ),
      waitingRoomType: Schema.Literal(
        "SKIP",
        "ON_PRIVILEGED_USER_ENTRY",
        "SKIP_ON_ACCEPT",
      ).pipe(T.JsonName("waiting_room_type")),
      isRecorder: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("is_recorder"),
      ),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/presets",
  }),
) as unknown as Schema.Schema<CreatePresetRequest>;

export interface CreatePresetResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    config: {
      maxScreenshareCount: number;
      maxVideoStreams: { desktop?: number; mobile?: number };
      media: {
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      viewType: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
    };
    name: string;
    ui: {
      designTokens: {
        borderRadius?: "rounded";
        borderWidth?: "thin";
        colors?: {
          background?: {
            "1000"?: string;
            "600"?: string;
            "700"?: string;
            "800"?: string;
            "900"?: string;
          };
          brand?: {
            "300"?: string;
            "400"?: string;
            "500"?: string;
            "600"?: string;
            "700"?: string;
          };
          danger?: string;
          success?: string;
          text?: string;
          textOnBrand?: string;
          videoBg?: string;
          warning?: string;
        };
        logo?: string;
        spacingBase?: number;
        theme?: "dark";
      };
      configDiff?: unknown;
    };
    permissions?: {
      acceptWaitingRequests: boolean;
      canAcceptProductionRequests: boolean;
      canChangeParticipantPermissions: boolean;
      canEditDisplayName: boolean;
      canLivestream: boolean;
      canRecord: boolean;
      canSpotlight: boolean;
      chat: {
        private?: {
          canReceive?: boolean;
          canSend?: boolean;
          files?: boolean;
          text?: boolean;
        };
        public?: { canSend?: boolean; files?: boolean; text?: boolean };
      };
      connectedMeetings: {
        canAlterConnectedMeetings?: boolean;
        canSwitchConnectedMeetings?: boolean;
        canSwitchToParentMeeting?: boolean;
      };
      disableParticipantAudio: boolean;
      disableParticipantScreensharing: boolean;
      disableParticipantVideo: boolean;
      hiddenParticipant: boolean;
      kickParticipant: boolean;
      media: {
        audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      pinParticipant: boolean;
      plugins: {
        canClose?: boolean;
        canEditConfig?: boolean;
        canStart?: boolean;
        config?:
          | string
          | {
              accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
              handlesViewOnly?: boolean;
            };
      };
      polls: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
      recorderType: "RECORDER" | "LIVESTREAMER" | "NONE";
      showParticipantList: boolean;
      waitingRoomType: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
      isRecorder?: boolean;
    };
  };
  /** Success status of the operation */
  success: boolean;
}

export const CreatePresetResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    config: Schema.Struct({
      maxScreenshareCount: Schema.Number.pipe(
        T.JsonName("max_screenshare_count"),
      ),
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }).pipe(T.JsonName("max_video_streams")),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
      }),
      viewType: Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM").pipe(
        T.JsonName("view_type"),
      ),
    }),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
          T.JsonName("border_radius"),
        ),
        borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
          T.JsonName("border_width"),
        ),
        colors: Schema.optional(
          Schema.Struct({
            background: Schema.optional(
              Schema.Struct({
                "1000": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
                "800": Schema.optional(Schema.String),
                "900": Schema.optional(Schema.String),
              }),
            ),
            brand: Schema.optional(
              Schema.Struct({
                "300": Schema.optional(Schema.String),
                "400": Schema.optional(Schema.String),
                "500": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
              }),
            ),
            danger: Schema.optional(Schema.String),
            success: Schema.optional(Schema.String),
            text: Schema.optional(Schema.String),
            textOnBrand: Schema.optional(Schema.String).pipe(
              T.JsonName("text_on_brand"),
            ),
            videoBg: Schema.optional(Schema.String).pipe(
              T.JsonName("video_bg"),
            ),
            warning: Schema.optional(Schema.String),
          }),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number).pipe(
          T.JsonName("spacing_base"),
        ),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(T.JsonName("design_tokens")),
      configDiff: Schema.optional(Schema.Unknown).pipe(
        T.JsonName("config_diff"),
      ),
    }),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean.pipe(
          T.JsonName("accept_waiting_requests"),
        ),
        canAcceptProductionRequests: Schema.Boolean.pipe(
          T.JsonName("can_accept_production_requests"),
        ),
        canChangeParticipantPermissions: Schema.Boolean.pipe(
          T.JsonName("can_change_participant_permissions"),
        ),
        canEditDisplayName: Schema.Boolean.pipe(
          T.JsonName("can_edit_display_name"),
        ),
        canLivestream: Schema.Boolean.pipe(T.JsonName("can_livestream")),
        canRecord: Schema.Boolean.pipe(T.JsonName("can_record")),
        canSpotlight: Schema.Boolean.pipe(T.JsonName("can_spotlight")),
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_receive"),
              ),
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_alter_connected_meetings"),
          ),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_connected_meetings"),
          ),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_to_parent_meeting"),
          ),
        }).pipe(T.JsonName("connected_meetings")),
        disableParticipantAudio: Schema.Boolean.pipe(
          T.JsonName("disable_participant_audio"),
        ),
        disableParticipantScreensharing: Schema.Boolean.pipe(
          T.JsonName("disable_participant_screensharing"),
        ),
        disableParticipantVideo: Schema.Boolean.pipe(
          T.JsonName("disable_participant_video"),
        ),
        hiddenParticipant: Schema.Boolean.pipe(
          T.JsonName("hidden_participant"),
        ),
        kickParticipant: Schema.Boolean.pipe(T.JsonName("kick_participant")),
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
        pinParticipant: Schema.Boolean.pipe(T.JsonName("pin_participant")),
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_close"),
          ),
          canEditConfig: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_edit_config"),
          ),
          canStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_start"),
          ),
          config: Schema.optional(
            Schema.Union(
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
                ).pipe(T.JsonName("access_control")),
                handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("handles_view_only"),
                ),
              }),
            ),
          ),
        }),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_create"),
          ),
          canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
          canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
        }),
        recorderType: Schema.Literal("RECORDER", "LIVESTREAMER", "NONE").pipe(
          T.JsonName("recorder_type"),
        ),
        showParticipantList: Schema.Boolean.pipe(
          T.JsonName("show_participant_list"),
        ),
        waitingRoomType: Schema.Literal(
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ).pipe(T.JsonName("waiting_room_type")),
        isRecorder: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("is_recorder"),
        ),
      }),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<CreatePresetResponse>;

export const createPreset: (
  input: CreatePresetRequest,
) => Effect.Effect<
  CreatePresetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePresetRequest,
  output: CreatePresetResponse,
  errors: [],
}));

export interface PatchPresetRequest {
  appId: string;
  presetId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  config?: {
    maxScreenshareCount?: number;
    maxVideoStreams?: { desktop?: number; mobile?: number };
    media?: {
      screenshare?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
    };
    viewType?: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
  };
  /** Body param: Name of the preset */
  name?: string;
  /** Body param: */
  permissions?: {
    acceptWaitingRequests?: boolean;
    canAcceptProductionRequests?: boolean;
    canChangeParticipantPermissions?: boolean;
    canEditDisplayName?: boolean;
    canLivestream?: boolean;
    canRecord?: boolean;
    canSpotlight?: boolean;
    chat?: {
      private?: {
        canReceive?: boolean;
        canSend?: boolean;
        files?: boolean;
        text?: boolean;
      };
      public?: { canSend?: boolean; files?: boolean; text?: boolean };
    };
    connectedMeetings?: {
      canAlterConnectedMeetings?: boolean;
      canSwitchConnectedMeetings?: boolean;
      canSwitchToParentMeeting?: boolean;
    };
    disableParticipantAudio?: boolean;
    disableParticipantScreensharing?: boolean;
    disableParticipantVideo?: boolean;
    hiddenParticipant?: boolean;
    isRecorder?: boolean;
    kickParticipant?: boolean;
    media?: {
      audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      screenshare?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
    };
    pinParticipant?: boolean;
    plugins?: {
      canClose?: boolean;
      canEditConfig?: boolean;
      canStart?: boolean;
      config?:
        | string
        | {
            accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
            handlesViewOnly?: boolean;
          };
    };
    polls?: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
    recorderType?: "RECORDER" | "LIVESTREAMER" | "NONE";
    showParticipantList?: boolean;
    waitingRoomType?: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
  };
  /** Body param: */
  ui?: {
    configDiff?: unknown;
    designTokens?: {
      borderRadius?: "rounded";
      borderWidth?: "thin";
      colors?: {
        background?: {
          "1000"?: string;
          "600"?: string;
          "700"?: string;
          "800"?: string;
          "900"?: string;
        };
        brand?: {
          "300"?: string;
          "400"?: string;
          "500"?: string;
          "600"?: string;
          "700"?: string;
        };
        danger?: string;
        success?: string;
        text?: string;
        textOnBrand?: string;
        videoBg?: string;
        warning?: string;
      };
      logo?: string;
      spacingBase?: number;
      theme?: "dark";
    };
  };
}

export const PatchPresetRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  presetId: Schema.String.pipe(T.HttpPath("presetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  config: Schema.optional(
    Schema.Struct({
      maxScreenshareCount: Schema.optional(Schema.Number).pipe(
        T.JsonName("max_screenshare_count"),
      ),
      maxVideoStreams: Schema.optional(
        Schema.Struct({
          desktop: Schema.optional(Schema.Number),
          mobile: Schema.optional(Schema.Number),
        }),
      ).pipe(T.JsonName("max_video_streams")),
      media: Schema.optional(
        Schema.Struct({
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
      ),
      viewType: Schema.optional(
        Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM"),
      ).pipe(T.JsonName("view_type")),
    }),
  ),
  name: Schema.optional(Schema.String),
  permissions: Schema.optional(
    Schema.Struct({
      acceptWaitingRequests: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("accept_waiting_requests"),
      ),
      canAcceptProductionRequests: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("can_accept_production_requests"),
      ),
      canChangeParticipantPermissions: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("can_change_participant_permissions"),
      ),
      canEditDisplayName: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("can_edit_display_name"),
      ),
      canLivestream: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("can_livestream"),
      ),
      canRecord: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_record")),
      canSpotlight: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("can_spotlight"),
      ),
      chat: Schema.optional(
        Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_receive"),
              ),
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
      ),
      connectedMeetings: Schema.optional(
        Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_alter_connected_meetings"),
          ),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_connected_meetings"),
          ),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_to_parent_meeting"),
          ),
        }),
      ).pipe(T.JsonName("connected_meetings")),
      disableParticipantAudio: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("disable_participant_audio"),
      ),
      disableParticipantScreensharing: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("disable_participant_screensharing"),
      ),
      disableParticipantVideo: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("disable_participant_video"),
      ),
      hiddenParticipant: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("hidden_participant"),
      ),
      isRecorder: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("is_recorder"),
      ),
      kickParticipant: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("kick_participant"),
      ),
      media: Schema.optional(
        Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
      ),
      pinParticipant: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("pin_participant"),
      ),
      plugins: Schema.optional(
        Schema.Struct({
          canClose: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_close"),
          ),
          canEditConfig: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_edit_config"),
          ),
          canStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_start"),
          ),
          config: Schema.optional(
            Schema.Union(
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
                ).pipe(T.JsonName("access_control")),
                handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("handles_view_only"),
                ),
              }),
            ),
          ),
        }),
      ),
      polls: Schema.optional(
        Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_create"),
          ),
          canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
          canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
        }),
      ),
      recorderType: Schema.optional(
        Schema.Literal("RECORDER", "LIVESTREAMER", "NONE"),
      ).pipe(T.JsonName("recorder_type")),
      showParticipantList: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("show_participant_list"),
      ),
      waitingRoomType: Schema.optional(
        Schema.Literal("SKIP", "ON_PRIVILEGED_USER_ENTRY", "SKIP_ON_ACCEPT"),
      ).pipe(T.JsonName("waiting_room_type")),
    }),
  ),
  ui: Schema.optional(
    Schema.Struct({
      configDiff: Schema.optional(Schema.Unknown).pipe(
        T.JsonName("config_diff"),
      ),
      designTokens: Schema.optional(
        Schema.Struct({
          borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
            T.JsonName("border_radius"),
          ),
          borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
            T.JsonName("border_width"),
          ),
          colors: Schema.optional(
            Schema.Struct({
              background: Schema.optional(
                Schema.Struct({
                  "1000": Schema.optional(Schema.String),
                  "600": Schema.optional(Schema.String),
                  "700": Schema.optional(Schema.String),
                  "800": Schema.optional(Schema.String),
                  "900": Schema.optional(Schema.String),
                }),
              ),
              brand: Schema.optional(
                Schema.Struct({
                  "300": Schema.optional(Schema.String),
                  "400": Schema.optional(Schema.String),
                  "500": Schema.optional(Schema.String),
                  "600": Schema.optional(Schema.String),
                  "700": Schema.optional(Schema.String),
                }),
              ),
              danger: Schema.optional(Schema.String),
              success: Schema.optional(Schema.String),
              text: Schema.optional(Schema.String),
              textOnBrand: Schema.optional(Schema.String).pipe(
                T.JsonName("text_on_brand"),
              ),
              videoBg: Schema.optional(Schema.String).pipe(
                T.JsonName("video_bg"),
              ),
              warning: Schema.optional(Schema.String),
            }),
          ),
          logo: Schema.optional(Schema.String),
          spacingBase: Schema.optional(Schema.Number).pipe(
            T.JsonName("spacing_base"),
          ),
          theme: Schema.optional(Schema.Literal("dark")),
        }),
      ).pipe(T.JsonName("design_tokens")),
    }),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/realtime/kit/{appId}/presets/{presetId}",
  }),
) as unknown as Schema.Schema<PatchPresetRequest>;

export interface PatchPresetResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    config: {
      maxScreenshareCount: number;
      maxVideoStreams: { desktop?: number; mobile?: number };
      media: {
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      viewType: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
    };
    name: string;
    ui: {
      designTokens: {
        borderRadius?: "rounded";
        borderWidth?: "thin";
        colors?: {
          background?: {
            "1000"?: string;
            "600"?: string;
            "700"?: string;
            "800"?: string;
            "900"?: string;
          };
          brand?: {
            "300"?: string;
            "400"?: string;
            "500"?: string;
            "600"?: string;
            "700"?: string;
          };
          danger?: string;
          success?: string;
          text?: string;
          textOnBrand?: string;
          videoBg?: string;
          warning?: string;
        };
        logo?: string;
        spacingBase?: number;
        theme?: "dark";
      };
      configDiff?: unknown;
    };
    permissions?: {
      acceptWaitingRequests: boolean;
      canAcceptProductionRequests: boolean;
      canChangeParticipantPermissions: boolean;
      canEditDisplayName: boolean;
      canLivestream: boolean;
      canRecord: boolean;
      canSpotlight: boolean;
      chat: {
        private?: {
          canReceive?: boolean;
          canSend?: boolean;
          files?: boolean;
          text?: boolean;
        };
        public?: { canSend?: boolean; files?: boolean; text?: boolean };
      };
      connectedMeetings: {
        canAlterConnectedMeetings?: boolean;
        canSwitchConnectedMeetings?: boolean;
        canSwitchToParentMeeting?: boolean;
      };
      disableParticipantAudio: boolean;
      disableParticipantScreensharing: boolean;
      disableParticipantVideo: boolean;
      hiddenParticipant: boolean;
      kickParticipant: boolean;
      media: {
        audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      pinParticipant: boolean;
      plugins: {
        canClose?: boolean;
        canEditConfig?: boolean;
        canStart?: boolean;
        config?:
          | string
          | {
              accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
              handlesViewOnly?: boolean;
            };
      };
      polls: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
      recorderType: "RECORDER" | "LIVESTREAMER" | "NONE";
      showParticipantList: boolean;
      waitingRoomType: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
      isRecorder?: boolean;
    };
  };
  /** Success status of the operation */
  success: boolean;
}

export const PatchPresetResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    config: Schema.Struct({
      maxScreenshareCount: Schema.Number.pipe(
        T.JsonName("max_screenshare_count"),
      ),
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }).pipe(T.JsonName("max_video_streams")),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
      }),
      viewType: Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM").pipe(
        T.JsonName("view_type"),
      ),
    }),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
          T.JsonName("border_radius"),
        ),
        borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
          T.JsonName("border_width"),
        ),
        colors: Schema.optional(
          Schema.Struct({
            background: Schema.optional(
              Schema.Struct({
                "1000": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
                "800": Schema.optional(Schema.String),
                "900": Schema.optional(Schema.String),
              }),
            ),
            brand: Schema.optional(
              Schema.Struct({
                "300": Schema.optional(Schema.String),
                "400": Schema.optional(Schema.String),
                "500": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
              }),
            ),
            danger: Schema.optional(Schema.String),
            success: Schema.optional(Schema.String),
            text: Schema.optional(Schema.String),
            textOnBrand: Schema.optional(Schema.String).pipe(
              T.JsonName("text_on_brand"),
            ),
            videoBg: Schema.optional(Schema.String).pipe(
              T.JsonName("video_bg"),
            ),
            warning: Schema.optional(Schema.String),
          }),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number).pipe(
          T.JsonName("spacing_base"),
        ),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(T.JsonName("design_tokens")),
      configDiff: Schema.optional(Schema.Unknown).pipe(
        T.JsonName("config_diff"),
      ),
    }),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean.pipe(
          T.JsonName("accept_waiting_requests"),
        ),
        canAcceptProductionRequests: Schema.Boolean.pipe(
          T.JsonName("can_accept_production_requests"),
        ),
        canChangeParticipantPermissions: Schema.Boolean.pipe(
          T.JsonName("can_change_participant_permissions"),
        ),
        canEditDisplayName: Schema.Boolean.pipe(
          T.JsonName("can_edit_display_name"),
        ),
        canLivestream: Schema.Boolean.pipe(T.JsonName("can_livestream")),
        canRecord: Schema.Boolean.pipe(T.JsonName("can_record")),
        canSpotlight: Schema.Boolean.pipe(T.JsonName("can_spotlight")),
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_receive"),
              ),
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_alter_connected_meetings"),
          ),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_connected_meetings"),
          ),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_to_parent_meeting"),
          ),
        }).pipe(T.JsonName("connected_meetings")),
        disableParticipantAudio: Schema.Boolean.pipe(
          T.JsonName("disable_participant_audio"),
        ),
        disableParticipantScreensharing: Schema.Boolean.pipe(
          T.JsonName("disable_participant_screensharing"),
        ),
        disableParticipantVideo: Schema.Boolean.pipe(
          T.JsonName("disable_participant_video"),
        ),
        hiddenParticipant: Schema.Boolean.pipe(
          T.JsonName("hidden_participant"),
        ),
        kickParticipant: Schema.Boolean.pipe(T.JsonName("kick_participant")),
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
        pinParticipant: Schema.Boolean.pipe(T.JsonName("pin_participant")),
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_close"),
          ),
          canEditConfig: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_edit_config"),
          ),
          canStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_start"),
          ),
          config: Schema.optional(
            Schema.Union(
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
                ).pipe(T.JsonName("access_control")),
                handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("handles_view_only"),
                ),
              }),
            ),
          ),
        }),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_create"),
          ),
          canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
          canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
        }),
        recorderType: Schema.Literal("RECORDER", "LIVESTREAMER", "NONE").pipe(
          T.JsonName("recorder_type"),
        ),
        showParticipantList: Schema.Boolean.pipe(
          T.JsonName("show_participant_list"),
        ),
        waitingRoomType: Schema.Literal(
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ).pipe(T.JsonName("waiting_room_type")),
        isRecorder: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("is_recorder"),
        ),
      }),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<PatchPresetResponse>;

export const patchPreset: (
  input: PatchPresetRequest,
) => Effect.Effect<
  PatchPresetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPresetRequest,
  output: PatchPresetResponse,
  errors: [],
}));

export interface DeletePresetRequest {
  appId: string;
  presetId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeletePresetRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  presetId: Schema.String.pipe(T.HttpPath("presetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/realtime/kit/{appId}/presets/{presetId}",
  }),
) as unknown as Schema.Schema<DeletePresetRequest>;

export interface DeletePresetResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    config: {
      maxScreenshareCount: number;
      maxVideoStreams: { desktop?: number; mobile?: number };
      media: {
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      viewType: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
    };
    name: string;
    ui: {
      designTokens: {
        borderRadius?: "rounded";
        borderWidth?: "thin";
        colors?: {
          background?: {
            "1000"?: string;
            "600"?: string;
            "700"?: string;
            "800"?: string;
            "900"?: string;
          };
          brand?: {
            "300"?: string;
            "400"?: string;
            "500"?: string;
            "600"?: string;
            "700"?: string;
          };
          danger?: string;
          success?: string;
          text?: string;
          textOnBrand?: string;
          videoBg?: string;
          warning?: string;
        };
        logo?: string;
        spacingBase?: number;
        theme?: "dark";
      };
      configDiff?: unknown;
    };
    permissions?: {
      acceptWaitingRequests: boolean;
      canAcceptProductionRequests: boolean;
      canChangeParticipantPermissions: boolean;
      canEditDisplayName: boolean;
      canLivestream: boolean;
      canRecord: boolean;
      canSpotlight: boolean;
      chat: {
        private?: {
          canReceive?: boolean;
          canSend?: boolean;
          files?: boolean;
          text?: boolean;
        };
        public?: { canSend?: boolean; files?: boolean; text?: boolean };
      };
      connectedMeetings: {
        canAlterConnectedMeetings?: boolean;
        canSwitchConnectedMeetings?: boolean;
        canSwitchToParentMeeting?: boolean;
      };
      disableParticipantAudio: boolean;
      disableParticipantScreensharing: boolean;
      disableParticipantVideo: boolean;
      hiddenParticipant: boolean;
      kickParticipant: boolean;
      media: {
        audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      pinParticipant: boolean;
      plugins: {
        canClose?: boolean;
        canEditConfig?: boolean;
        canStart?: boolean;
        config?:
          | string
          | {
              accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
              handlesViewOnly?: boolean;
            };
      };
      polls: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
      recorderType: "RECORDER" | "LIVESTREAMER" | "NONE";
      showParticipantList: boolean;
      waitingRoomType: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
      isRecorder?: boolean;
    };
  };
  /** Success status of the operation */
  success: boolean;
}

export const DeletePresetResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    config: Schema.Struct({
      maxScreenshareCount: Schema.Number.pipe(
        T.JsonName("max_screenshare_count"),
      ),
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }).pipe(T.JsonName("max_video_streams")),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
      }),
      viewType: Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM").pipe(
        T.JsonName("view_type"),
      ),
    }),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
          T.JsonName("border_radius"),
        ),
        borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
          T.JsonName("border_width"),
        ),
        colors: Schema.optional(
          Schema.Struct({
            background: Schema.optional(
              Schema.Struct({
                "1000": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
                "800": Schema.optional(Schema.String),
                "900": Schema.optional(Schema.String),
              }),
            ),
            brand: Schema.optional(
              Schema.Struct({
                "300": Schema.optional(Schema.String),
                "400": Schema.optional(Schema.String),
                "500": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
              }),
            ),
            danger: Schema.optional(Schema.String),
            success: Schema.optional(Schema.String),
            text: Schema.optional(Schema.String),
            textOnBrand: Schema.optional(Schema.String).pipe(
              T.JsonName("text_on_brand"),
            ),
            videoBg: Schema.optional(Schema.String).pipe(
              T.JsonName("video_bg"),
            ),
            warning: Schema.optional(Schema.String),
          }),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number).pipe(
          T.JsonName("spacing_base"),
        ),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(T.JsonName("design_tokens")),
      configDiff: Schema.optional(Schema.Unknown).pipe(
        T.JsonName("config_diff"),
      ),
    }),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean.pipe(
          T.JsonName("accept_waiting_requests"),
        ),
        canAcceptProductionRequests: Schema.Boolean.pipe(
          T.JsonName("can_accept_production_requests"),
        ),
        canChangeParticipantPermissions: Schema.Boolean.pipe(
          T.JsonName("can_change_participant_permissions"),
        ),
        canEditDisplayName: Schema.Boolean.pipe(
          T.JsonName("can_edit_display_name"),
        ),
        canLivestream: Schema.Boolean.pipe(T.JsonName("can_livestream")),
        canRecord: Schema.Boolean.pipe(T.JsonName("can_record")),
        canSpotlight: Schema.Boolean.pipe(T.JsonName("can_spotlight")),
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_receive"),
              ),
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_alter_connected_meetings"),
          ),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_connected_meetings"),
          ),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_to_parent_meeting"),
          ),
        }).pipe(T.JsonName("connected_meetings")),
        disableParticipantAudio: Schema.Boolean.pipe(
          T.JsonName("disable_participant_audio"),
        ),
        disableParticipantScreensharing: Schema.Boolean.pipe(
          T.JsonName("disable_participant_screensharing"),
        ),
        disableParticipantVideo: Schema.Boolean.pipe(
          T.JsonName("disable_participant_video"),
        ),
        hiddenParticipant: Schema.Boolean.pipe(
          T.JsonName("hidden_participant"),
        ),
        kickParticipant: Schema.Boolean.pipe(T.JsonName("kick_participant")),
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
        pinParticipant: Schema.Boolean.pipe(T.JsonName("pin_participant")),
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_close"),
          ),
          canEditConfig: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_edit_config"),
          ),
          canStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_start"),
          ),
          config: Schema.optional(
            Schema.Union(
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
                ).pipe(T.JsonName("access_control")),
                handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("handles_view_only"),
                ),
              }),
            ),
          ),
        }),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_create"),
          ),
          canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
          canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
        }),
        recorderType: Schema.Literal("RECORDER", "LIVESTREAMER", "NONE").pipe(
          T.JsonName("recorder_type"),
        ),
        showParticipantList: Schema.Boolean.pipe(
          T.JsonName("show_participant_list"),
        ),
        waitingRoomType: Schema.Literal(
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ).pipe(T.JsonName("waiting_room_type")),
        isRecorder: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("is_recorder"),
        ),
      }),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeletePresetResponse>;

export const deletePreset: (
  input: DeletePresetRequest,
) => Effect.Effect<
  DeletePresetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePresetRequest,
  output: DeletePresetResponse,
  errors: [],
}));

// =============================================================================
// PresetByIdPreset
// =============================================================================

export interface GetPresetByIdPresetRequest {
  appId: string;
  presetId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetPresetByIdPresetRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  presetId: Schema.String.pipe(T.HttpPath("presetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/presets/{presetId}",
  }),
) as unknown as Schema.Schema<GetPresetByIdPresetRequest>;

export interface GetPresetByIdPresetResponse {
  /** Data returned by the operation */
  data: {
    id: string;
    config: {
      maxScreenshareCount: number;
      maxVideoStreams: { desktop?: number; mobile?: number };
      media: {
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      viewType: "GROUP_CALL" | "WEBINAR" | "AUDIO_ROOM";
    };
    name: string;
    ui: {
      designTokens: {
        borderRadius?: "rounded";
        borderWidth?: "thin";
        colors?: {
          background?: {
            "1000"?: string;
            "600"?: string;
            "700"?: string;
            "800"?: string;
            "900"?: string;
          };
          brand?: {
            "300"?: string;
            "400"?: string;
            "500"?: string;
            "600"?: string;
            "700"?: string;
          };
          danger?: string;
          success?: string;
          text?: string;
          textOnBrand?: string;
          videoBg?: string;
          warning?: string;
        };
        logo?: string;
        spacingBase?: number;
        theme?: "dark";
      };
      configDiff?: unknown;
    };
    permissions?: {
      acceptWaitingRequests: boolean;
      canAcceptProductionRequests: boolean;
      canChangeParticipantPermissions: boolean;
      canEditDisplayName: boolean;
      canLivestream: boolean;
      canRecord: boolean;
      canSpotlight: boolean;
      chat: {
        private?: {
          canReceive?: boolean;
          canSend?: boolean;
          files?: boolean;
          text?: boolean;
        };
        public?: { canSend?: boolean; files?: boolean; text?: boolean };
      };
      connectedMeetings: {
        canAlterConnectedMeetings?: boolean;
        canSwitchConnectedMeetings?: boolean;
        canSwitchToParentMeeting?: boolean;
      };
      disableParticipantAudio: boolean;
      disableParticipantScreensharing: boolean;
      disableParticipantVideo: boolean;
      hiddenParticipant: boolean;
      kickParticipant: boolean;
      media: {
        audio?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
        screenshare?: {
          canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST";
        };
        video?: { canProduce?: "ALLOWED" | "NOT_ALLOWED" | "CAN_REQUEST" };
      };
      pinParticipant: boolean;
      plugins: {
        canClose?: boolean;
        canEditConfig?: boolean;
        canStart?: boolean;
        config?:
          | string
          | {
              accessControl?: "FULL_ACCESS" | "VIEW_ONLY";
              handlesViewOnly?: boolean;
            };
      };
      polls: { canCreate?: boolean; canView?: boolean; canVote?: boolean };
      recorderType: "RECORDER" | "LIVESTREAMER" | "NONE";
      showParticipantList: boolean;
      waitingRoomType: "SKIP" | "ON_PRIVILEGED_USER_ENTRY" | "SKIP_ON_ACCEPT";
      isRecorder?: boolean;
    };
  };
  /** Success status of the operation */
  success: boolean;
}

export const GetPresetByIdPresetResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    config: Schema.Struct({
      maxScreenshareCount: Schema.Number.pipe(
        T.JsonName("max_screenshare_count"),
      ),
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }).pipe(T.JsonName("max_video_streams")),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
            ).pipe(T.JsonName("can_produce")),
          }),
        ),
      }),
      viewType: Schema.Literal("GROUP_CALL", "WEBINAR", "AUDIO_ROOM").pipe(
        T.JsonName("view_type"),
      ),
    }),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")).pipe(
          T.JsonName("border_radius"),
        ),
        borderWidth: Schema.optional(Schema.Literal("thin")).pipe(
          T.JsonName("border_width"),
        ),
        colors: Schema.optional(
          Schema.Struct({
            background: Schema.optional(
              Schema.Struct({
                "1000": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
                "800": Schema.optional(Schema.String),
                "900": Schema.optional(Schema.String),
              }),
            ),
            brand: Schema.optional(
              Schema.Struct({
                "300": Schema.optional(Schema.String),
                "400": Schema.optional(Schema.String),
                "500": Schema.optional(Schema.String),
                "600": Schema.optional(Schema.String),
                "700": Schema.optional(Schema.String),
              }),
            ),
            danger: Schema.optional(Schema.String),
            success: Schema.optional(Schema.String),
            text: Schema.optional(Schema.String),
            textOnBrand: Schema.optional(Schema.String).pipe(
              T.JsonName("text_on_brand"),
            ),
            videoBg: Schema.optional(Schema.String).pipe(
              T.JsonName("video_bg"),
            ),
            warning: Schema.optional(Schema.String),
          }),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number).pipe(
          T.JsonName("spacing_base"),
        ),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(T.JsonName("design_tokens")),
      configDiff: Schema.optional(Schema.Unknown).pipe(
        T.JsonName("config_diff"),
      ),
    }),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean.pipe(
          T.JsonName("accept_waiting_requests"),
        ),
        canAcceptProductionRequests: Schema.Boolean.pipe(
          T.JsonName("can_accept_production_requests"),
        ),
        canChangeParticipantPermissions: Schema.Boolean.pipe(
          T.JsonName("can_change_participant_permissions"),
        ),
        canEditDisplayName: Schema.Boolean.pipe(
          T.JsonName("can_edit_display_name"),
        ),
        canLivestream: Schema.Boolean.pipe(T.JsonName("can_livestream")),
        canRecord: Schema.Boolean.pipe(T.JsonName("can_record")),
        canSpotlight: Schema.Boolean.pipe(T.JsonName("can_spotlight")),
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_receive"),
              ),
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean).pipe(
                T.JsonName("can_send"),
              ),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_alter_connected_meetings"),
          ),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_connected_meetings"),
          ),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_switch_to_parent_meeting"),
          ),
        }).pipe(T.JsonName("connected_meetings")),
        disableParticipantAudio: Schema.Boolean.pipe(
          T.JsonName("disable_participant_audio"),
        ),
        disableParticipantScreensharing: Schema.Boolean.pipe(
          T.JsonName("disable_participant_screensharing"),
        ),
        disableParticipantVideo: Schema.Boolean.pipe(
          T.JsonName("disable_participant_video"),
        ),
        hiddenParticipant: Schema.Boolean.pipe(
          T.JsonName("hidden_participant"),
        ),
        kickParticipant: Schema.Boolean.pipe(T.JsonName("kick_participant")),
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literal("ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"),
              ).pipe(T.JsonName("can_produce")),
            }),
          ),
        }),
        pinParticipant: Schema.Boolean.pipe(T.JsonName("pin_participant")),
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_close"),
          ),
          canEditConfig: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_edit_config"),
          ),
          canStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_start"),
          ),
          config: Schema.optional(
            Schema.Union(
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literal("FULL_ACCESS", "VIEW_ONLY"),
                ).pipe(T.JsonName("access_control")),
                handlesViewOnly: Schema.optional(Schema.Boolean).pipe(
                  T.JsonName("handles_view_only"),
                ),
              }),
            ),
          ),
        }),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("can_create"),
          ),
          canView: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_view")),
          canVote: Schema.optional(Schema.Boolean).pipe(T.JsonName("can_vote")),
        }),
        recorderType: Schema.Literal("RECORDER", "LIVESTREAMER", "NONE").pipe(
          T.JsonName("recorder_type"),
        ),
        showParticipantList: Schema.Boolean.pipe(
          T.JsonName("show_participant_list"),
        ),
        waitingRoomType: Schema.Literal(
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ).pipe(T.JsonName("waiting_room_type")),
        isRecorder: Schema.optional(Schema.Boolean).pipe(
          T.JsonName("is_recorder"),
        ),
      }),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetPresetByIdPresetResponse>;

export const getPresetByIdPreset: (
  input: GetPresetByIdPresetRequest,
) => Effect.Effect<
  GetPresetByIdPresetResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPresetByIdPresetRequest,
  output: GetPresetByIdPresetResponse,
  errors: [],
}));

// =============================================================================
// RecordingsRecording
// =============================================================================

export interface GetRecordingsRecordingRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: The end time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  endTime?: string;
  /** Query param: If passed, only shows expired/non-expired recordings on RealtimeKit's bucket */
  expired?: boolean;
  /** Query param: ID of a meeting. Optional. Will limit results to only this meeting if passed. */
  meetingId?: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page */
  perPage?: number;
  /** Query param: The search query string. You can search using the meeting ID or title. */
  search?: string;
  /** Query param: */
  sortBy?: "invokedTime";
  /** Query param: */
  sortOrder?: "ASC" | "DESC";
  /** Query param: The start time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  startTime?: string;
  /** Query param: Filter by one or more recording status */
  status?: ("INVOKED" | "RECORDING" | "UPLOADING" | "UPLOADED")[];
}

export const GetRecordingsRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("end_time")),
  expired: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("expired")),
  meetingId: Schema.optional(Schema.String).pipe(T.HttpQuery("meeting_id")),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  sortBy: Schema.optional(Schema.Literal("invokedTime")).pipe(
    T.HttpQuery("sort_by"),
  ),
  sortOrder: Schema.optional(Schema.Literal("ASC", "DESC")).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(
    Schema.Array(
      Schema.Literal("INVOKED", "RECORDING", "UPLOADING", "UPLOADED"),
    ),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings",
  }),
) as unknown as Schema.Schema<GetRecordingsRecordingRequest>;

export interface GetRecordingsRecordingResponse {
  data: {
    id: string;
    audioDownloadUrl: string | null;
    downloadUrl: string | null;
    downloadUrlExpiry: string | null;
    fileSize: number | null;
    invokedTime: string;
    outputFileName: string;
    sessionId: string | null;
    startedTime: string | null;
    status:
      | "INVOKED"
      | "RECORDING"
      | "UPLOADING"
      | "UPLOADED"
      | "ERRORED"
      | "PAUSED";
    stoppedTime: string | null;
    meeting?: {
      id: string;
      createdAt: string;
      updatedAt: string;
      liveStreamOnStart?: boolean;
      persistChat?: boolean;
      recordOnStart?: boolean;
      sessionKeepAliveTimeInSecs?: number;
      status?: "ACTIVE" | "INACTIVE";
      summarizeOnEnd?: boolean;
      title?: string;
    };
    recordingDuration?: number;
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
  }[];
  paging: { endOffset: number; startOffset: number; totalCount: number };
  success: boolean;
}

export const GetRecordingsRecordingResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      audioDownloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("audio_download_url"),
      ),
      downloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url"),
      ),
      downloadUrlExpiry: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url_expiry"),
      ),
      fileSize: Schema.Union(Schema.Number, Schema.Null).pipe(
        T.JsonName("file_size"),
      ),
      invokedTime: Schema.String.pipe(T.JsonName("invoked_time")),
      outputFileName: Schema.String.pipe(T.JsonName("output_file_name")),
      sessionId: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("session_id"),
      ),
      startedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("started_time"),
      ),
      status: Schema.Literal(
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ),
      stoppedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("stopped_time"),
      ),
      meeting: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          createdAt: Schema.String.pipe(T.JsonName("created_at")),
          updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
          liveStreamOnStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("live_stream_on_start"),
          ),
          persistChat: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("persist_chat"),
          ),
          recordOnStart: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("record_on_start"),
          ),
          sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number).pipe(
            T.JsonName("session_keep_alive_time_in_secs"),
          ),
          status: Schema.optional(Schema.Literal("ACTIVE", "INACTIVE")),
          summarizeOnEnd: Schema.optional(Schema.Boolean).pipe(
            T.JsonName("summarize_on_end"),
          ),
          title: Schema.optional(Schema.String),
        }),
      ),
      recordingDuration: Schema.optional(Schema.Number).pipe(
        T.JsonName("recording_duration"),
      ),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
    }),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number.pipe(T.JsonName("end_offset")),
    startOffset: Schema.Number.pipe(T.JsonName("start_offset")),
    totalCount: Schema.Number.pipe(T.JsonName("total_count")),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetRecordingsRecordingResponse>;

export const getRecordingsRecording: (
  input: GetRecordingsRecordingRequest,
) => Effect.Effect<
  GetRecordingsRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRecordingsRecordingRequest,
  output: GetRecordingsRecordingResponse,
  errors: [],
}));

export interface StartRecordingsRecordingRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: By default, a meeting allows only one recording to run at a time. Enabling the `allow_multiple_recordings` parameter to true allows you to initiate multiple recordings concurrently in the  */
  allowMultipleRecordings?: boolean;
  /** Body param: Object containing configuration regarding the audio that is being recorded. */
  audioConfig?: {
    channel?: "mono" | "stereo";
    codec?: "MP3" | "AAC";
    exportFile?: boolean;
  };
  /** Body param: Update the recording file name. */
  fileNamePrefix?: string;
  /** Body param: Allows you to add timed metadata to your recordings, which are digital markers inserted into a video file to provide contextual information at specific points in the content range. The ID3 */
  interactiveConfig?: { type?: "ID3" };
  /** Body param: Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours. */
  maxSeconds?: number;
  /** Body param: ID of the meeting to record. */
  meetingId?: string;
  /** Body param: */
  realtimekitBucketConfig?: { enabled: boolean };
  /** Body param: */
  rtmpOutConfig?: { rtmpUrl?: string };
  /** Body param: */
  storageConfig?: {
    type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
    accessKey?: string;
    authMethod?: "KEY" | "PASSWORD";
    bucket?: string;
    host?: string;
    password?: string;
    path?: string;
    port?: number;
    privateKey?: string;
    region?: string;
    secret?: string;
    username?: string;
  } | null;
  /** Body param: Pass a custom url to record arbitary screen */
  url?: string;
  /** Body param: */
  videoConfig?: {
    codec?: "H264" | "VP8";
    exportFile?: boolean;
    height?: number;
    watermark?: {
      position?: "left top" | "right top" | "left bottom" | "right bottom";
      size?: { height?: number; width?: number };
      url?: string;
    };
    width?: number;
  };
}

export const StartRecordingsRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowMultipleRecordings: Schema.optional(Schema.Boolean).pipe(
    T.JsonName("allow_multiple_recordings"),
  ),
  audioConfig: Schema.optional(
    Schema.Struct({
      channel: Schema.optional(Schema.Literal("mono", "stereo")),
      codec: Schema.optional(Schema.Literal("MP3", "AAC")),
      exportFile: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("export_file"),
      ),
    }),
  ).pipe(T.JsonName("audio_config")),
  fileNamePrefix: Schema.optional(Schema.String).pipe(
    T.JsonName("file_name_prefix"),
  ),
  interactiveConfig: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.Literal("ID3")),
    }),
  ).pipe(T.JsonName("interactive_config")),
  maxSeconds: Schema.optional(Schema.Number).pipe(T.JsonName("max_seconds")),
  meetingId: Schema.optional(Schema.String).pipe(T.JsonName("meeting_id")),
  realtimekitBucketConfig: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ).pipe(T.JsonName("realtimekit_bucket_config")),
  rtmpOutConfig: Schema.optional(
    Schema.Struct({
      rtmpUrl: Schema.optional(Schema.String).pipe(T.JsonName("rtmp_url")),
    }),
  ).pipe(T.JsonName("rtmp_out_config")),
  storageConfig: Schema.optional(
    Schema.Union(
      Schema.Struct({
        type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
        accessKey: Schema.optional(Schema.String).pipe(
          T.JsonName("access_key"),
        ),
        authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
          T.JsonName("auth_method"),
        ),
        bucket: Schema.optional(Schema.String),
        host: Schema.optional(Schema.String),
        password: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
        port: Schema.optional(Schema.Number),
        privateKey: Schema.optional(Schema.String).pipe(
          T.JsonName("private_key"),
        ),
        region: Schema.optional(Schema.String),
        secret: Schema.optional(Schema.String),
        username: Schema.optional(Schema.String),
      }),
      Schema.Null,
    ),
  ).pipe(T.JsonName("storage_config")),
  url: Schema.optional(Schema.String),
  videoConfig: Schema.optional(
    Schema.Struct({
      codec: Schema.optional(Schema.Literal("H264", "VP8")),
      exportFile: Schema.optional(Schema.Boolean).pipe(
        T.JsonName("export_file"),
      ),
      height: Schema.optional(Schema.Number),
      watermark: Schema.optional(
        Schema.Struct({
          position: Schema.optional(
            Schema.Literal(
              "left top",
              "right top",
              "left bottom",
              "right bottom",
            ),
          ),
          size: Schema.optional(
            Schema.Struct({
              height: Schema.optional(Schema.Number),
              width: Schema.optional(Schema.Number),
            }),
          ),
          url: Schema.optional(Schema.String),
        }),
      ),
      width: Schema.optional(Schema.Number),
    }),
  ).pipe(T.JsonName("video_config")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings",
  }),
) as unknown as Schema.Schema<StartRecordingsRecordingRequest>;

export interface StartRecordingsRecordingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    audioDownloadUrl: string | null;
    downloadUrl: string | null;
    downloadUrlExpiry: string | null;
    fileSize: number | null;
    invokedTime: string;
    outputFileName: string;
    sessionId: string | null;
    startedTime: string | null;
    status:
      | "INVOKED"
      | "RECORDING"
      | "UPLOADING"
      | "UPLOADED"
      | "ERRORED"
      | "PAUSED";
    stoppedTime: string | null;
    recordingDuration?: number;
    startReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "RECORD_ON_START";
    };
    stopReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "INTERNAL_ERROR" | "ALL_PEERS_LEFT";
    };
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
  };
}

export const StartRecordingsRecordingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      audioDownloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("audio_download_url"),
      ),
      downloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url"),
      ),
      downloadUrlExpiry: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url_expiry"),
      ),
      fileSize: Schema.Union(Schema.Number, Schema.Null).pipe(
        T.JsonName("file_size"),
      ),
      invokedTime: Schema.String.pipe(T.JsonName("invoked_time")),
      outputFileName: Schema.String.pipe(T.JsonName("output_file_name")),
      sessionId: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("session_id"),
      ),
      startedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("started_time"),
      ),
      status: Schema.Literal(
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ),
      stoppedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("stopped_time"),
      ),
      recordingDuration: Schema.optional(Schema.Number).pipe(
        T.JsonName("recording_duration"),
      ),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "RECORD_ON_START"),
          ),
        }),
      ).pipe(T.JsonName("start_reason")),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"),
          ),
        }),
      ).pipe(T.JsonName("stop_reason")),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
    }),
  ),
}) as unknown as Schema.Schema<StartRecordingsRecordingResponse>;

export const startRecordingsRecording: (
  input: StartRecordingsRecordingRequest,
) => Effect.Effect<
  StartRecordingsRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StartRecordingsRecordingRequest,
  output: StartRecordingsRecordingResponse,
  errors: [],
}));

// =============================================================================
// ResumeStopRecordingRecording
// =============================================================================

export interface PauseResumeStopRecordingRecordingRequest {
  appId: string;
  recordingId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  action: "stop" | "pause" | "resume";
}

export const PauseResumeStopRecordingRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  recordingId: Schema.String.pipe(T.HttpPath("recordingId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  action: Schema.Literal("stop", "pause", "resume"),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings/{recordingId}",
  }),
) as unknown as Schema.Schema<PauseResumeStopRecordingRecordingRequest>;

export interface PauseResumeStopRecordingRecordingResponse {
  /** Success status of the operation */
  success: boolean;
  /** Data returned by the operation */
  data?: {
    id: string;
    audioDownloadUrl: string | null;
    downloadUrl: string | null;
    downloadUrlExpiry: string | null;
    fileSize: number | null;
    invokedTime: string;
    outputFileName: string;
    sessionId: string | null;
    startedTime: string | null;
    status:
      | "INVOKED"
      | "RECORDING"
      | "UPLOADING"
      | "UPLOADED"
      | "ERRORED"
      | "PAUSED";
    stoppedTime: string | null;
    recordingDuration?: number;
    startReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "RECORD_ON_START";
    };
    stopReason?: {
      caller?: {
        name?: string;
        type?: "ORGANIZATION" | "USER";
        user_Id?: string;
      };
      reason?: "API_CALL" | "INTERNAL_ERROR" | "ALL_PEERS_LEFT";
    };
    storageConfig?: {
      type: "aws" | "azure" | "digitalocean" | "gcs" | "sftp";
      authMethod?: "KEY" | "PASSWORD";
      bucket?: string;
      host?: string;
      password?: string;
      path?: string;
      port?: number;
      privateKey?: string;
      region?: string;
      secret?: string;
      username?: string;
    } | null;
  };
}

export const PauseResumeStopRecordingRecordingResponse = Schema.Struct({
  success: Schema.Boolean,
  data: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      audioDownloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("audio_download_url"),
      ),
      downloadUrl: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url"),
      ),
      downloadUrlExpiry: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("download_url_expiry"),
      ),
      fileSize: Schema.Union(Schema.Number, Schema.Null).pipe(
        T.JsonName("file_size"),
      ),
      invokedTime: Schema.String.pipe(T.JsonName("invoked_time")),
      outputFileName: Schema.String.pipe(T.JsonName("output_file_name")),
      sessionId: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("session_id"),
      ),
      startedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("started_time"),
      ),
      status: Schema.Literal(
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ),
      stoppedTime: Schema.Union(Schema.String, Schema.Null).pipe(
        T.JsonName("stopped_time"),
      ),
      recordingDuration: Schema.optional(Schema.Number).pipe(
        T.JsonName("recording_duration"),
      ),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "RECORD_ON_START"),
          ),
        }),
      ).pipe(T.JsonName("start_reason")),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literal("ORGANIZATION", "USER")),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literal("API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"),
          ),
        }),
      ).pipe(T.JsonName("stop_reason")),
      storageConfig: Schema.optional(
        Schema.Union(
          Schema.Struct({
            type: Schema.Literal("aws", "azure", "digitalocean", "gcs", "sftp"),
            authMethod: Schema.optional(Schema.Literal("KEY", "PASSWORD")).pipe(
              T.JsonName("auth_method"),
            ),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String).pipe(
              T.JsonName("private_key"),
            ),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }),
          Schema.Null,
        ),
      ).pipe(T.JsonName("storage_config")),
    }),
  ),
}) as unknown as Schema.Schema<PauseResumeStopRecordingRecordingResponse>;

export const pauseResumeStopRecordingRecording: (
  input: PauseResumeStopRecordingRecordingRequest,
) => Effect.Effect<
  PauseResumeStopRecordingRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PauseResumeStopRecordingRecordingRequest,
  output: PauseResumeStopRecordingRecordingResponse,
  errors: [],
}));

// =============================================================================
// SessionChatSession
// =============================================================================

export interface GetSessionChatSessionRequest {
  appId: string;
  sessionId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetSessionChatSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/chat",
  }),
) as unknown as Schema.Schema<GetSessionChatSessionRequest>;

export interface GetSessionChatSessionResponse {
  data?: { chatDownloadUrl: string; chatDownloadUrlExpiry: string };
  success?: boolean;
}

export const GetSessionChatSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      chatDownloadUrl: Schema.String.pipe(T.JsonName("chat_download_url")),
      chatDownloadUrlExpiry: Schema.String.pipe(
        T.JsonName("chat_download_url_expiry"),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionChatSessionResponse>;

export const getSessionChatSession: (
  input: GetSessionChatSessionRequest,
) => Effect.Effect<
  GetSessionChatSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionChatSessionRequest,
  output: GetSessionChatSessionResponse,
  errors: [],
}));

// =============================================================================
// SessionDetailsSession
// =============================================================================

export interface GetSessionDetailsSessionRequest {
  appId: string;
  sessionId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: List all breakout rooms */
  includeBreakoutRooms?: boolean;
}

export const GetSessionDetailsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  includeBreakoutRooms: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_breakout_rooms"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}",
  }),
) as unknown as Schema.Schema<GetSessionDetailsSessionRequest>;

export interface GetSessionDetailsSessionResponse {
  data?: {
    session?: {
      id: string;
      associatedId: string;
      createdAt: string;
      liveParticipants: number;
      maxConcurrentParticipants: number;
      meetingDisplayName: string;
      minutesConsumed: number;
      organizationId: string;
      startedAt: string;
      status: "LIVE" | "ENDED";
      type: "meeting" | "livestream" | "participant";
      updatedAt: string;
      breakoutRooms?: unknown[];
      endedAt?: string;
      meta?: unknown;
    };
  };
  success?: boolean;
}

export const GetSessionDetailsSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      session: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          associatedId: Schema.String.pipe(T.JsonName("associated_id")),
          createdAt: Schema.String.pipe(T.JsonName("created_at")),
          liveParticipants: Schema.Number.pipe(T.JsonName("live_participants")),
          maxConcurrentParticipants: Schema.Number.pipe(
            T.JsonName("max_concurrent_participants"),
          ),
          meetingDisplayName: Schema.String.pipe(
            T.JsonName("meeting_display_name"),
          ),
          minutesConsumed: Schema.Number.pipe(T.JsonName("minutes_consumed")),
          organizationId: Schema.String.pipe(T.JsonName("organization_id")),
          startedAt: Schema.String.pipe(T.JsonName("started_at")),
          status: Schema.Literal("LIVE", "ENDED"),
          type: Schema.Literal("meeting", "livestream", "participant"),
          updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
          breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)).pipe(
            T.JsonName("breakout_rooms"),
          ),
          endedAt: Schema.optional(Schema.String).pipe(T.JsonName("ended_at")),
          meta: Schema.optional(Schema.Unknown),
        }),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionDetailsSessionResponse>;

export const getSessionDetailsSession: (
  input: GetSessionDetailsSessionRequest,
) => Effect.Effect<
  GetSessionDetailsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionDetailsSessionRequest,
  output: GetSessionDetailsSessionResponse,
  errors: [],
}));

// =============================================================================
// SessionParticipantDetailsSession
// =============================================================================

export interface GetSessionParticipantDetailsSessionRequest {
  appId: string;
  sessionId: string;
  participantId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Comma separated list of filters to apply. Note that there must be no spaces between the filters. */
  filters?:
    | "device_info"
    | "ip_information"
    | "precall_network_information"
    | "events"
    | "quality_stats";
  /** Query param: if true, response includes all the peer events of participant. */
  includePeerEvents?: boolean;
}

export const GetSessionParticipantDetailsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  participantId: Schema.String.pipe(T.HttpPath("participantId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  filters: Schema.optional(
    Schema.Literal(
      "device_info",
      "ip_information",
      "precall_network_information",
      "events",
      "quality_stats",
    ),
  ).pipe(T.HttpQuery("filters")),
  includePeerEvents: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_peer_events"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/participants/{participantId}",
  }),
) as unknown as Schema.Schema<GetSessionParticipantDetailsSessionRequest>;

export interface GetSessionParticipantDetailsSessionResponse {
  data?: {
    participant?: {
      id?: string;
      createdAt?: string;
      customParticipantId?: string;
      displayName?: string;
      duration?: number;
      joinedAt?: string;
      leftAt?: string;
      presetName?: string;
      updatedAt?: string;
      userId?: string;
    };
  };
  success?: boolean;
}

export const GetSessionParticipantDetailsSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      participant: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          createdAt: Schema.optional(Schema.String).pipe(
            T.JsonName("created_at"),
          ),
          customParticipantId: Schema.optional(Schema.String).pipe(
            T.JsonName("custom_participant_id"),
          ),
          displayName: Schema.optional(Schema.String).pipe(
            T.JsonName("display_name"),
          ),
          duration: Schema.optional(Schema.Number),
          joinedAt: Schema.optional(Schema.String).pipe(
            T.JsonName("joined_at"),
          ),
          leftAt: Schema.optional(Schema.String).pipe(T.JsonName("left_at")),
          presetName: Schema.optional(Schema.String).pipe(
            T.JsonName("preset_name"),
          ),
          updatedAt: Schema.optional(Schema.String).pipe(
            T.JsonName("updated_at"),
          ),
          userId: Schema.optional(Schema.String).pipe(T.JsonName("user_id")),
        }),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionParticipantDetailsSessionResponse>;

export const getSessionParticipantDetailsSession: (
  input: GetSessionParticipantDetailsSessionRequest,
) => Effect.Effect<
  GetSessionParticipantDetailsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionParticipantDetailsSessionRequest,
  output: GetSessionParticipantDetailsSessionResponse,
  errors: [],
}));

// =============================================================================
// SessionParticipantsSession
// =============================================================================

export interface GetSessionParticipantsSessionRequest {
  appId: string;
  sessionId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: if true, response includes all the peer events of participants. */
  includePeerEvents?: boolean;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: Number of results per page */
  perPage?: number;
  /** Query param: The search query string. You can search using the meeting ID or title. */
  search?: string;
  /** Query param: */
  sortBy?: "joinedAt" | "duration";
  /** Query param: */
  sortOrder?: "ASC" | "DESC";
  /** Query param: In breakout room sessions, the view parameter can be set to `raw` for session specific duration for participants or `consolidated` to accumulate breakout room durations. */
  view?: "raw" | "consolidated";
}

export const GetSessionParticipantsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  includePeerEvents: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_peer_events"),
  ),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  sortBy: Schema.optional(Schema.Literal("joinedAt", "duration")).pipe(
    T.HttpQuery("sort_by"),
  ),
  sortOrder: Schema.optional(Schema.Literal("ASC", "DESC")).pipe(
    T.HttpQuery("sort_order"),
  ),
  view: Schema.optional(Schema.Literal("raw", "consolidated")).pipe(
    T.HttpQuery("view"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/participants",
  }),
) as unknown as Schema.Schema<GetSessionParticipantsSessionRequest>;

export interface GetSessionParticipantsSessionResponse {
  data?: {
    participants?: {
      id?: string;
      createdAt?: string;
      customParticipantId?: string;
      displayName?: string;
      duration?: number;
      joinedAt?: string;
      leftAt?: string;
      presetName?: string;
      updatedAt?: string;
      userId?: string;
    }[];
  };
  success?: boolean;
}

export const GetSessionParticipantsSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      participants: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String).pipe(
              T.JsonName("created_at"),
            ),
            customParticipantId: Schema.optional(Schema.String).pipe(
              T.JsonName("custom_participant_id"),
            ),
            displayName: Schema.optional(Schema.String).pipe(
              T.JsonName("display_name"),
            ),
            duration: Schema.optional(Schema.Number),
            joinedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("joined_at"),
            ),
            leftAt: Schema.optional(Schema.String).pipe(T.JsonName("left_at")),
            presetName: Schema.optional(Schema.String).pipe(
              T.JsonName("preset_name"),
            ),
            updatedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("updated_at"),
            ),
            userId: Schema.optional(Schema.String).pipe(T.JsonName("user_id")),
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionParticipantsSessionResponse>;

export const getSessionParticipantsSession: (
  input: GetSessionParticipantsSessionRequest,
) => Effect.Effect<
  GetSessionParticipantsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionParticipantsSessionRequest,
  output: GetSessionParticipantsSessionResponse,
  errors: [],
}));

// =============================================================================
// SessionsSession
// =============================================================================

export interface GetSessionsSessionRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: ID of the meeting that sessions should be associated with */
  associatedId?: string;
  /** Query param: The end time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  endTime?: string;
  /** Query param: The page number from which you want your page search results to be displayed. */
  pageNo?: number;
  /** Query param: */
  participants?: string;
  /** Query param: Number of results per page */
  perPage?: number;
  /** Query param: Search string that matches sessions based on meeting title, meeting ID, and session ID */
  search?: string;
  /** Query param: */
  sortBy?: "minutesConsumed" | "createdAt";
  /** Query param: */
  sortOrder?: "ASC" | "DESC";
  /** Query param: The start time range for which you want to retrieve the meetings. The time must be specified in ISO format. */
  startTime?: string;
  /** Query param: */
  status?: "LIVE" | "ENDED";
}

export const GetSessionsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  associatedId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("associated_id"),
  ),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("end_time")),
  pageNo: Schema.optional(Schema.Number).pipe(T.HttpQuery("page_no")),
  participants: Schema.optional(Schema.String).pipe(
    T.HttpQuery("participants"),
  ),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  sortBy: Schema.optional(Schema.Literal("minutesConsumed", "createdAt")).pipe(
    T.HttpQuery("sort_by"),
  ),
  sortOrder: Schema.optional(Schema.Literal("ASC", "DESC")).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(Schema.Literal("LIVE", "ENDED")).pipe(
    T.HttpQuery("status"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions",
  }),
) as unknown as Schema.Schema<GetSessionsSessionRequest>;

export interface GetSessionsSessionResponse {
  data?: {
    sessions?: {
      id: string;
      associatedId: string;
      createdAt: string;
      liveParticipants: number;
      maxConcurrentParticipants: number;
      meetingDisplayName: string;
      minutesConsumed: number;
      organizationId: string;
      startedAt: string;
      status: "LIVE" | "ENDED";
      type: "meeting" | "livestream" | "participant";
      updatedAt: string;
      breakoutRooms?: unknown[];
      endedAt?: string;
      meta?: unknown;
    }[];
  };
  success?: boolean;
}

export const GetSessionsSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      sessions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            associatedId: Schema.String.pipe(T.JsonName("associated_id")),
            createdAt: Schema.String.pipe(T.JsonName("created_at")),
            liveParticipants: Schema.Number.pipe(
              T.JsonName("live_participants"),
            ),
            maxConcurrentParticipants: Schema.Number.pipe(
              T.JsonName("max_concurrent_participants"),
            ),
            meetingDisplayName: Schema.String.pipe(
              T.JsonName("meeting_display_name"),
            ),
            minutesConsumed: Schema.Number.pipe(T.JsonName("minutes_consumed")),
            organizationId: Schema.String.pipe(T.JsonName("organization_id")),
            startedAt: Schema.String.pipe(T.JsonName("started_at")),
            status: Schema.Literal("LIVE", "ENDED"),
            type: Schema.Literal("meeting", "livestream", "participant"),
            updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
            breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)).pipe(
              T.JsonName("breakout_rooms"),
            ),
            endedAt: Schema.optional(Schema.String).pipe(
              T.JsonName("ended_at"),
            ),
            meta: Schema.optional(Schema.Unknown),
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionsSessionResponse>;

export const getSessionsSession: (
  input: GetSessionsSessionRequest,
) => Effect.Effect<
  GetSessionsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionsSessionRequest,
  output: GetSessionsSessionResponse,
  errors: [],
}));

// =============================================================================
// SessionSummarySession
// =============================================================================

export interface GetSessionSummarySessionRequest {
  appId: string;
  sessionId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetSessionSummarySessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/summary",
  }),
) as unknown as Schema.Schema<GetSessionSummarySessionRequest>;

export interface GetSessionSummarySessionResponse {
  data?: {
    sessionId: string;
    summaryDownloadUrl: string;
    summaryDownloadUrlExpiry: string;
  };
  success?: boolean;
}

export const GetSessionSummarySessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      sessionId: Schema.String,
      summaryDownloadUrl: Schema.String,
      summaryDownloadUrlExpiry: Schema.String,
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionSummarySessionResponse>;

export const getSessionSummarySession: (
  input: GetSessionSummarySessionRequest,
) => Effect.Effect<
  GetSessionSummarySessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionSummarySessionRequest,
  output: GetSessionSummarySessionResponse,
  errors: [],
}));

// =============================================================================
// SessionTranscriptsSession
// =============================================================================

export interface GetSessionTranscriptsSessionRequest {
  appId: string;
  sessionId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetSessionTranscriptsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/transcript",
  }),
) as unknown as Schema.Schema<GetSessionTranscriptsSessionRequest>;

export interface GetSessionTranscriptsSessionResponse {
  data?: {
    sessionId: string;
    transcriptDownloadUrl: string;
    transcriptDownloadUrlExpiry: string;
  };
  success?: boolean;
}

export const GetSessionTranscriptsSessionResponse = Schema.Struct({
  data: Schema.optional(
    Schema.Struct({
      sessionId: Schema.String,
      transcriptDownloadUrl: Schema.String.pipe(
        T.JsonName("transcript_download_url"),
      ),
      transcriptDownloadUrlExpiry: Schema.String.pipe(
        T.JsonName("transcript_download_url_expiry"),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionTranscriptsSessionResponse>;

export const getSessionTranscriptsSession: (
  input: GetSessionTranscriptsSessionRequest,
) => Effect.Effect<
  GetSessionTranscriptsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSessionTranscriptsSessionRequest,
  output: GetSessionTranscriptsSessionResponse,
  errors: [],
}));

// =============================================================================
// SummaryOfTranscriptsSession
// =============================================================================

export interface GenerateSummaryOfTranscriptsSessionRequest {
  appId: string;
  sessionId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GenerateSummaryOfTranscriptsSessionRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  sessionId: Schema.String.pipe(T.HttpPath("sessionId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/sessions/{sessionId}/summary",
  }),
) as unknown as Schema.Schema<GenerateSummaryOfTranscriptsSessionRequest>;

export type GenerateSummaryOfTranscriptsSessionResponse = unknown;

export const GenerateSummaryOfTranscriptsSessionResponse =
  Schema.Unknown as unknown as Schema.Schema<GenerateSummaryOfTranscriptsSessionResponse>;

export const generateSummaryOfTranscriptsSession: (
  input: GenerateSummaryOfTranscriptsSessionRequest,
) => Effect.Effect<
  GenerateSummaryOfTranscriptsSessionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateSummaryOfTranscriptsSessionRequest,
  output: GenerateSummaryOfTranscriptsSessionResponse,
  errors: [],
}));

// =============================================================================
// TrackRecordingRecording
// =============================================================================

export interface StartTrackRecordingRecordingRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  layers: Record<string, unknown>;
  /** Body param: ID of the meeting to record. */
  meetingId: string;
  /** Body param: Maximum seconds this recording should be active for (beta) */
  maxSeconds?: number;
}

export const StartTrackRecordingRecordingRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  layers: Schema.Struct({}),
  meetingId: Schema.String.pipe(T.JsonName("meeting_id")),
  maxSeconds: Schema.optional(Schema.Number).pipe(T.JsonName("max_seconds")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings/track",
  }),
) as unknown as Schema.Schema<StartTrackRecordingRecordingRequest>;

export type StartTrackRecordingRecordingResponse = unknown;

export const StartTrackRecordingRecordingResponse =
  Schema.Unknown as unknown as Schema.Schema<StartTrackRecordingRecordingResponse>;

export const startTrackRecordingRecording: (
  input: StartTrackRecordingRecordingRequest,
) => Effect.Effect<
  StartTrackRecordingRecordingResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: StartTrackRecordingRecordingRequest,
  output: StartTrackRecordingRecordingResponse,
  errors: [],
}));

// =============================================================================
// WebhookByIdWebhook
// =============================================================================

export interface GetWebhookByIdWebhookRequest {
  appId: string;
  webhookId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetWebhookByIdWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<GetWebhookByIdWebhookRequest>;

export interface GetWebhookByIdWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  };
  success: boolean;
}

export const GetWebhookByIdWebhookResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
    name: Schema.String,
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    url: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetWebhookByIdWebhookResponse>;

export const getWebhookByIdWebhook: (
  input: GetWebhookByIdWebhookRequest,
) => Effect.Effect<
  GetWebhookByIdWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWebhookByIdWebhookRequest,
  output: GetWebhookByIdWebhookResponse,
  errors: [],
}));

// =============================================================================
// WebhooksWebhook
// =============================================================================

export interface GetWebhooksWebhookRequest {
  appId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetWebhooksWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks",
  }),
) as unknown as Schema.Schema<GetWebhooksWebhookRequest>;

export interface GetWebhooksWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  }[];
  success: boolean;
}

export const GetWebhooksWebhookResponse = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createdAt: Schema.String.pipe(T.JsonName("created_at")),
      enabled: Schema.Boolean,
      events: Schema.Array(
        Schema.Literal(
          "meeting.started",
          "meeting.ended",
          "meeting.participantJoined",
          "meeting.participantLeft",
          "meeting.chatSynced",
          "recording.statusUpdate",
          "livestreaming.statusUpdate",
          "meeting.transcript",
          "meeting.summary",
        ),
      ),
      name: Schema.String,
      updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
      url: Schema.String,
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetWebhooksWebhookResponse>;

export const getWebhooksWebhook: (
  input: GetWebhooksWebhookRequest,
) => Effect.Effect<
  GetWebhooksWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWebhooksWebhookRequest,
  output: GetWebhooksWebhookResponse,
  errors: [],
}));

// =============================================================================
// WebhookWebhook
// =============================================================================

export interface CreateWebhookWebhookRequest {
  appId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Events that this webhook will get triggered by */
  events: (
    | "meeting.started"
    | "meeting.ended"
    | "meeting.participantJoined"
    | "meeting.participantLeft"
    | "meeting.chatSynced"
    | "recording.statusUpdate"
    | "livestreaming.statusUpdate"
    | "meeting.transcript"
    | "meeting.summary"
  )[];
  /** Body param: Name of the webhook */
  name: string;
  /** Body param: URL this webhook will send events to */
  url: string;
  /** Body param: Set whether or not the webhook should be active when created */
  enabled?: boolean;
}

export const CreateWebhookWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  events: Schema.Array(
    Schema.Literal(
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary",
    ),
  ),
  name: Schema.String,
  url: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks",
  }),
) as unknown as Schema.Schema<CreateWebhookWebhookRequest>;

export interface CreateWebhookWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  };
  success: boolean;
}

export const CreateWebhookWebhookResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
    name: Schema.String,
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    url: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<CreateWebhookWebhookResponse>;

export const createWebhookWebhook: (
  input: CreateWebhookWebhookRequest,
) => Effect.Effect<
  CreateWebhookWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWebhookWebhookRequest,
  output: CreateWebhookWebhookResponse,
  errors: [],
}));

export interface DeleteWebhookWebhookRequest {
  appId: string;
  webhookId: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteWebhookWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<DeleteWebhookWebhookRequest>;

export interface DeleteWebhookWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  };
  success: boolean;
}

export const DeleteWebhookWebhookResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
    name: Schema.String,
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    url: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeleteWebhookWebhookResponse>;

export const deleteWebhookWebhook: (
  input: DeleteWebhookWebhookRequest,
) => Effect.Effect<
  DeleteWebhookWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWebhookWebhookRequest,
  output: DeleteWebhookWebhookResponse,
  errors: [],
}));

export interface EditWebhookWebhookRequest {
  appId: string;
  webhookId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: */
  enabled?: boolean;
  /** Body param: Events that the webhook will get triggered by */
  events?: (
    | "meeting.started"
    | "meeting.ended"
    | "meeting.participantJoined"
    | "meeting.participantLeft"
    | "recording.statusUpdate"
    | "livestreaming.statusUpdate"
    | "meeting.chatSynced"
    | "meeting.transcript"
    | "meeting.summary"
  )[];
  /** Body param: Name of the webhook */
  name?: string;
  /** Body param: URL the webhook will send events to */
  url?: string;
}

export const EditWebhookWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  enabled: Schema.optional(Schema.Boolean),
  events: Schema.optional(
    Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.chatSynced",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
  ),
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<EditWebhookWebhookRequest>;

export interface EditWebhookWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  };
  success: boolean;
}

export const EditWebhookWebhookResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
    name: Schema.String,
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    url: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<EditWebhookWebhookResponse>;

export const editWebhookWebhook: (
  input: EditWebhookWebhookRequest,
) => Effect.Effect<
  EditWebhookWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditWebhookWebhookRequest,
  output: EditWebhookWebhookResponse,
  errors: [],
}));

export interface ReplaceWebhookWebhookRequest {
  appId: string;
  webhookId: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Events that this webhook will get triggered by */
  events: (
    | "meeting.started"
    | "meeting.ended"
    | "meeting.participantJoined"
    | "meeting.participantLeft"
    | "meeting.chatSynced"
    | "recording.statusUpdate"
    | "livestreaming.statusUpdate"
    | "meeting.transcript"
    | "meeting.summary"
  )[];
  /** Body param: Name of the webhook */
  name: string;
  /** Body param: URL this webhook will send events to */
  url: string;
  /** Body param: Set whether or not the webhook should be active when created */
  enabled?: boolean;
}

export const ReplaceWebhookWebhookRequest = Schema.Struct({
  appId: Schema.String.pipe(T.HttpPath("appId")),
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  events: Schema.Array(
    Schema.Literal(
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary",
    ),
  ),
  name: Schema.String,
  url: Schema.String,
  enabled: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/realtime/kit/{appId}/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<ReplaceWebhookWebhookRequest>;

export interface ReplaceWebhookWebhookResponse {
  data: {
    id: string;
    createdAt: string;
    enabled: boolean;
    events: (
      | "meeting.started"
      | "meeting.ended"
      | "meeting.participantJoined"
      | "meeting.participantLeft"
      | "meeting.chatSynced"
      | "recording.statusUpdate"
      | "livestreaming.statusUpdate"
      | "meeting.transcript"
      | "meeting.summary"
    )[];
    name: string;
    updatedAt: string;
    url: string;
  };
  success: boolean;
}

export const ReplaceWebhookWebhookResponse = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    createdAt: Schema.String.pipe(T.JsonName("created_at")),
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literal(
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ),
    ),
    name: Schema.String,
    updatedAt: Schema.String.pipe(T.JsonName("updated_at")),
    url: Schema.String,
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<ReplaceWebhookWebhookResponse>;

export const replaceWebhookWebhook: (
  input: ReplaceWebhookWebhookRequest,
) => Effect.Effect<
  ReplaceWebhookWebhookResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReplaceWebhookWebhookRequest,
  output: ReplaceWebhookWebhookResponse,
  errors: [],
}));
