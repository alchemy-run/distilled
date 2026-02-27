/**
 * Cloudflare REALTIME-KIT API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service realtime-kit
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
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
            createdAt: Schema.optional(Schema.String),
            disabled: Schema.optional(Schema.String),
            ingestServer: Schema.optional(Schema.String),
            meetingId: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            playbackUrl: Schema.optional(Schema.String),
            status: Schema.optional(
              Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
            ),
            streamKey: Schema.optional(Schema.String),
            updatedAt: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              disabled: "disabled",
              ingestServer: "ingest_server",
              meetingId: "meeting_id",
              name: "name",
              playbackUrl: "playback_url",
              status: "status",
              streamKey: "stream_key",
              updatedAt: "updated_at",
            }),
          ),
        ),
        session: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String),
            errMessage: Schema.optional(Schema.String),
            ingestSeconds: Schema.optional(Schema.Number),
            invokedTime: Schema.optional(Schema.String),
            livestreamId: Schema.optional(Schema.String),
            startedTime: Schema.optional(Schema.String),
            stoppedTime: Schema.optional(Schema.String),
            updatedAt: Schema.optional(Schema.String),
            viewerSeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              errMessage: "err_message",
              ingestSeconds: "ingest_seconds",
              invokedTime: "invoked_time",
              livestreamId: "livestream_id",
              startedTime: "started_time",
              stoppedTime: "stopped_time",
              updatedAt: "updated_at",
              viewerSeconds: "viewer_seconds",
            }),
          ),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetActiveLivestreamsForLivestreamIdLivestreamResponse>;

export type GetActiveLivestreamsForLivestreamIdLivestreamError = CommonErrors;

export const getActiveLivestreamsForLivestreamIdLivestream: API.OperationMethod<
  GetActiveLivestreamsForLivestreamIdLivestreamRequest,
  GetActiveLivestreamsForLivestreamIdLivestreamResponse,
  GetActiveLivestreamsForLivestreamIdLivestreamError,
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
    audioDownloadUrl: Schema.Union([Schema.String, Schema.Null]),
    downloadUrl: Schema.Union([Schema.String, Schema.Null]),
    downloadUrlExpiry: Schema.Union([Schema.String, Schema.Null]),
    fileSize: Schema.Union([Schema.Number, Schema.Null]),
    invokedTime: Schema.String,
    outputFileName: Schema.String,
    sessionId: Schema.Union([Schema.String, Schema.Null]),
    startedTime: Schema.Union([Schema.String, Schema.Null]),
    status: Schema.Literals([
      "INVOKED",
      "RECORDING",
      "UPLOADING",
      "UPLOADED",
      "ERRORED",
      "PAUSED",
    ]),
    stoppedTime: Schema.Union([Schema.String, Schema.Null]),
    recordingDuration: Schema.optional(Schema.Number),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      audioDownloadUrl: "audio_download_url",
      downloadUrl: "download_url",
      downloadUrlExpiry: "download_url_expiry",
      fileSize: "file_size",
      invokedTime: "invoked_time",
      outputFileName: "output_file_name",
      sessionId: "session_id",
      startedTime: "started_time",
      status: "status",
      stoppedTime: "stopped_time",
      recordingDuration: "recording_duration",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetActiveRecordingsRecordingResponse>;

export type GetActiveRecordingsRecordingError = CommonErrors;

export const getActiveRecordingsRecording: API.OperationMethod<
  GetActiveRecordingsRecordingRequest,
  GetActiveRecordingsRecordingResponse,
  GetActiveRecordingsRecordingError,
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
      associatedId: Schema.String,
      createdAt: Schema.String,
      liveParticipants: Schema.Number,
      maxConcurrentParticipants: Schema.Number,
      meetingDisplayName: Schema.String,
      minutesConsumed: Schema.Number,
      organizationId: Schema.String,
      startedAt: Schema.String,
      status: Schema.Literals(["LIVE", "ENDED"]),
      type: Schema.Literals(["meeting", "livestream", "participant"]),
      updatedAt: Schema.String,
      breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)),
      endedAt: Schema.optional(Schema.String),
      meta: Schema.optional(Schema.Unknown),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        associatedId: "associated_id",
        createdAt: "created_at",
        liveParticipants: "live_participants",
        maxConcurrentParticipants: "max_concurrent_participants",
        meetingDisplayName: "meeting_display_name",
        minutesConsumed: "minutes_consumed",
        organizationId: "organization_id",
        startedAt: "started_at",
        status: "status",
        type: "type",
        updatedAt: "updated_at",
        breakoutRooms: "breakout_rooms",
        endedAt: "ended_at",
        meta: "meta",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetActiveSessionActiveSessionResponse>;

export type GetActiveSessionActiveSessionError = CommonErrors;

export const getActiveSessionActiveSession: API.OperationMethod<
  GetActiveSessionActiveSessionRequest,
  GetActiveSessionActiveSessionResponse,
  GetActiveSessionActiveSessionError,
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
  sortOrder: Schema.optional(Schema.Literals(["ASC", "DSC"])).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(
    Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
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
      createdAt: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.String),
      ingestServer: Schema.optional(Schema.String),
      meetingId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      paging: Schema.optional(
        Schema.Struct({
          endOffset: Schema.optional(Schema.Number),
          startOffset: Schema.optional(Schema.Number),
          totalCount: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            endOffset: "end_offset",
            startOffset: "start_offset",
            totalCount: "total_count",
          }),
        ),
      ),
      playbackUrl: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
      ),
      streamKey: Schema.optional(Schema.String),
      updatedAt: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        disabled: "disabled",
        ingestServer: "ingest_server",
        meetingId: "meeting_id",
        name: "name",
        paging: "paging",
        playbackUrl: "playback_url",
        status: "status",
        streamKey: "stream_key",
        updatedAt: "updated_at",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetAllLivestreamsLivestreamResponse>;

export type GetAllLivestreamsLivestreamError = CommonErrors;

export const getAllLivestreamsLivestream: API.OperationMethod<
  GetAllLivestreamsLivestreamRequest,
  GetAllLivestreamsLivestreamResponse,
  GetAllLivestreamsLivestreamError,
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
      kickedParticipantsCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        action: "action",
        kickedParticipantsCount: "kicked_participants_count",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<KickAllParticipantsActiveSessionResponse>;

export type KickAllParticipantsActiveSessionError = CommonErrors;

export const kickAllParticipantsActiveSession: API.OperationMethod<
  KickAllParticipantsActiveSessionRequest,
  KickAllParticipantsActiveSessionResponse,
  KickAllParticipantsActiveSessionError,
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
        createdAt: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({ id: "id", createdAt: "created_at", name: "name" }),
      ),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetAppResponse>;

export type GetAppError = CommonErrors;

export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResponse,
  GetAppError,
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
          createdAt: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            createdAt: "created_at",
            name: "name",
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<PostAppResponse>;

export type PostAppError = CommonErrors;

export const postApp: API.OperationMethod<
  PostAppRequest,
  PostAppResponse,
  PostAppError,
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
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
      ingestServer: Schema.optional(Schema.String),
      meetingId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.String),
      playbackUrl: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
      ),
      streamKey: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        disabled: "disabled",
        ingestServer: "ingest_server",
        meetingId: "meeting_id",
        name: "name",
        playbackUrl: "playback_url",
        status: "status",
        streamKey: "stream_key",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreateIndependentLivestreamLivestreamResponse>;

export type CreateIndependentLivestreamLivestreamError = CommonErrors;

export const createIndependentLivestreamLivestream: API.OperationMethod<
  CreateIndependentLivestreamLivestreamRequest,
  CreateIndependentLivestreamLivestreamResponse,
  CreateIndependentLivestreamLivestreamError,
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
      totalIngestSeconds: Schema.optional(Schema.Number),
      totalViewerSeconds: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        totalIngestSeconds: "total_ingest_seconds",
        totalViewerSeconds: "total_viewer_seconds",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetLivestreamAnalyticsCompleteLivestreamResponse>;

export type GetLivestreamAnalyticsCompleteLivestreamError = CommonErrors;

export const getLivestreamAnalyticsCompleteLivestream: API.OperationMethod<
  GetLivestreamAnalyticsCompleteLivestreamRequest,
  GetLivestreamAnalyticsCompleteLivestreamResponse,
  GetLivestreamAnalyticsCompleteLivestreamError,
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
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  videoConfig: Schema.optional(
    Schema.Struct({
      height: Schema.optional(Schema.Number),
      width: Schema.optional(Schema.Number),
    }),
  ),
}).pipe(
  Schema.encodeKeys({ name: "name", videoConfig: "video_config" }),
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
      ingestServer: Schema.optional(Schema.String),
      playbackUrl: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
      ),
      streamKey: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        ingestServer: "ingest_server",
        playbackUrl: "playback_url",
        status: "status",
        streamKey: "stream_key",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<StartLivestreamingAMeetingLivestreamResponse>;

export type StartLivestreamingAMeetingLivestreamError = CommonErrors;

export const startLivestreamingAMeetingLivestream: API.OperationMethod<
  StartLivestreamingAMeetingLivestreamRequest,
  StartLivestreamingAMeetingLivestreamResponse,
  StartLivestreamingAMeetingLivestreamError,
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

export type StopLivestreamingAMeetingLivestreamError = CommonErrors;

export const stopLivestreamingAMeetingLivestream: API.OperationMethod<
  StopLivestreamingAMeetingLivestreamRequest,
  StopLivestreamingAMeetingLivestreamResponse,
  StopLivestreamingAMeetingLivestreamError,
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
        createdAt: Schema.optional(Schema.String),
        errMessage: Schema.optional(Schema.String),
        ingestSeconds: Schema.optional(Schema.Number),
        livestreamId: Schema.optional(Schema.String),
        startedTime: Schema.optional(Schema.String),
        stoppedTime: Schema.optional(Schema.String),
        updatedAt: Schema.optional(Schema.String),
        viewerSeconds: Schema.optional(Schema.Number),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          createdAt: "created_at",
          errMessage: "err_message",
          ingestSeconds: "ingest_seconds",
          livestreamId: "livestream_id",
          startedTime: "started_time",
          stoppedTime: "stopped_time",
          updatedAt: "updated_at",
          viewerSeconds: "viewer_seconds",
        }),
      ),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetLivestreamSessionDetailsForSessionIdLivestreamResponse>;

export type GetLivestreamSessionDetailsForSessionIdLivestreamError =
  CommonErrors;

export const getLivestreamSessionDetailsForSessionIdLivestream: API.OperationMethod<
  GetLivestreamSessionDetailsForSessionIdLivestreamRequest,
  GetLivestreamSessionDetailsForSessionIdLivestreamResponse,
  GetLivestreamSessionDetailsForSessionIdLivestreamError,
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
            createdAt: Schema.optional(Schema.String),
            disabled: Schema.optional(Schema.String),
            ingestServer: Schema.optional(Schema.String),
            meetingId: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            playbackUrl: Schema.optional(Schema.String),
            status: Schema.optional(
              Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
            ),
            streamKey: Schema.optional(Schema.String),
            updatedAt: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              disabled: "disabled",
              ingestServer: "ingest_server",
              meetingId: "meeting_id",
              name: "name",
              playbackUrl: "playback_url",
              status: "status",
              streamKey: "stream_key",
              updatedAt: "updated_at",
            }),
          ),
        ),
        paging: Schema.optional(
          Schema.Struct({
            endOffset: Schema.optional(Schema.Number),
            startOffset: Schema.optional(Schema.Number),
            totalCount: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              endOffset: "end_offset",
              startOffset: "start_offset",
              totalCount: "total_count",
            }),
          ),
        ),
        session: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            createdAt: Schema.optional(Schema.String),
            errMessage: Schema.optional(Schema.String),
            ingestSeconds: Schema.optional(Schema.Number),
            invokedTime: Schema.optional(Schema.String),
            livestreamId: Schema.optional(Schema.String),
            startedTime: Schema.optional(Schema.String),
            stoppedTime: Schema.optional(Schema.String),
            updatedAt: Schema.optional(Schema.String),
            viewerSeconds: Schema.optional(Schema.Number),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              errMessage: "err_message",
              ingestSeconds: "ingest_seconds",
              invokedTime: "invoked_time",
              livestreamId: "livestream_id",
              startedTime: "started_time",
              stoppedTime: "stopped_time",
              updatedAt: "updated_at",
              viewerSeconds: "viewer_seconds",
            }),
          ),
        ),
      }),
    ),
    success: Schema.optional(Schema.Boolean),
  }) as unknown as Schema.Schema<GetLivestreamSessionForLivestreamIdLivestreamResponse>;

export type GetLivestreamSessionForLivestreamIdLivestreamError = CommonErrors;

export const getLivestreamSessionForLivestreamIdLivestream: API.OperationMethod<
  GetLivestreamSessionForLivestreamIdLivestreamRequest,
  GetLivestreamSessionForLivestreamIdLivestreamResponse,
  GetLivestreamSessionForLivestreamIdLivestreamError,
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
      createdAt: Schema.String,
      updatedAt: Schema.String,
      liveStreamOnStart: Schema.optional(Schema.Boolean),
      persistChat: Schema.optional(Schema.Boolean),
      recordOnStart: Schema.optional(Schema.Boolean),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
      summarizeOnEnd: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        liveStreamOnStart: "live_stream_on_start",
        persistChat: "persist_chat",
        recordOnStart: "record_on_start",
        sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
        status: "status",
        summarizeOnEnd: "summarize_on_end",
        title: "title",
      }),
    ),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number,
    startOffset: Schema.Number,
    totalCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      endOffset: "end_offset",
      startOffset: "start_offset",
      totalCount: "total_count",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingResponse>;

export type GetMeetingError = CommonErrors;

export const getMeeting: API.OperationMethod<
  GetMeetingRequest,
  GetMeetingResponse,
  GetMeetingError,
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
            Schema.Literals([
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ]),
          ),
          textFormat: Schema.optional(
            Schema.Literals(["plain_text", "markdown"]),
          ),
          wordLimit: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            summaryType: "summary_type",
            textFormat: "text_format",
            wordLimit: "word_limit",
          }),
        ),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literals([
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
            ]),
          ),
          profanityFilter: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            keywords: "keywords",
            language: "language",
            profanityFilter: "profanity_filter",
          }),
        ),
      ),
    }),
  ),
  liveStreamOnStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  persistChat: Schema.optional(Schema.Boolean),
  recordOnStart: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  recordingConfig: Schema.optional(
    Schema.Struct({
      audioConfig: Schema.optional(
        Schema.Struct({
          channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
          codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
          exportFile: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            channel: "channel",
            codec: "codec",
            exportFile: "export_file",
          }),
        ),
      ),
      fileNamePrefix: Schema.optional(Schema.String),
      liveStreamingConfig: Schema.optional(
        Schema.Struct({
          rtmpUrl: Schema.optional(Schema.String),
        }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
      ),
      maxSeconds: Schema.optional(Schema.Number),
      realtimekitBucketConfig: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            accessKey: Schema.optional(Schema.String),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              accessKey: "access_key",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
      videoConfig: Schema.optional(
        Schema.Struct({
          codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
          exportFile: Schema.optional(Schema.Boolean),
          height: Schema.optional(Schema.Number),
          watermark: Schema.optional(
            Schema.Struct({
              position: Schema.optional(
                Schema.Literals([
                  "left top",
                  "right top",
                  "left bottom",
                  "right bottom",
                ]),
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
        }).pipe(
          Schema.encodeKeys({
            codec: "codec",
            exportFile: "export_file",
            height: "height",
            watermark: "watermark",
            width: "width",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        audioConfig: "audio_config",
        fileNamePrefix: "file_name_prefix",
        liveStreamingConfig: "live_streaming_config",
        maxSeconds: "max_seconds",
        realtimekitBucketConfig: "realtimekit_bucket_config",
        storageConfig: "storage_config",
        videoConfig: "video_config",
      }),
    ),
  ),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
  summarizeOnEnd: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    aiConfig: "ai_config",
    liveStreamOnStart: "live_stream_on_start",
    persistChat: "persist_chat",
    recordOnStart: "record_on_start",
    recordingConfig: "recording_config",
    sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
    summarizeOnEnd: "summarize_on_end",
    title: "title",
  }),
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
      createdAt: Schema.String,
      updatedAt: Schema.String,
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literals([
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ]),
              ),
              textFormat: Schema.optional(
                Schema.Literals(["plain_text", "markdown"]),
              ),
              wordLimit: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                summaryType: "summary_type",
                textFormat: "text_format",
                wordLimit: "word_limit",
              }),
            ),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literals([
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
                ]),
              ),
              profanityFilter: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                keywords: "keywords",
                language: "language",
                profanityFilter: "profanity_filter",
              }),
            ),
          ),
        }),
      ),
      liveStreamOnStart: Schema.optional(Schema.Boolean),
      persistChat: Schema.optional(Schema.Boolean),
      recordOnStart: Schema.optional(Schema.Boolean),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
              codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
              exportFile: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                channel: "channel",
                codec: "codec",
                exportFile: "export_file",
              }),
            ),
          ),
          fileNamePrefix: Schema.optional(Schema.String),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String),
            }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
          ),
          maxSeconds: Schema.optional(Schema.Number),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ),
          storageConfig: Schema.optional(
            Schema.Union([
              Schema.Struct({
                type: Schema.Literals([
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ]),
                accessKey: Schema.optional(Schema.String),
                authMethod: Schema.optional(
                  Schema.Literals(["KEY", "PASSWORD"]),
                ),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  accessKey: "access_key",
                  authMethod: "auth_method",
                  bucket: "bucket",
                  host: "host",
                  password: "password",
                  path: "path",
                  port: "port",
                  privateKey: "private_key",
                  region: "region",
                  secret: "secret",
                  username: "username",
                }),
              ),
              Schema.Null,
            ]),
          ),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
              exportFile: Schema.optional(Schema.Boolean),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literals([
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ]),
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
            }).pipe(
              Schema.encodeKeys({
                codec: "codec",
                exportFile: "export_file",
                height: "height",
                watermark: "watermark",
                width: "width",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            audioConfig: "audio_config",
            fileNamePrefix: "file_name_prefix",
            liveStreamingConfig: "live_streaming_config",
            maxSeconds: "max_seconds",
            realtimekitBucketConfig: "realtimekit_bucket_config",
            storageConfig: "storage_config",
            videoConfig: "video_config",
          }),
        ),
      ),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
      summarizeOnEnd: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        aiConfig: "ai_config",
        liveStreamOnStart: "live_stream_on_start",
        persistChat: "persist_chat",
        recordOnStart: "record_on_start",
        recordingConfig: "recording_config",
        sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
        status: "status",
        summarizeOnEnd: "summarize_on_end",
        title: "title",
      }),
    ),
  ),
}) as unknown as Schema.Schema<CreateMeetingResponse>;

export type CreateMeetingError = CommonErrors;

export const createMeeting: API.OperationMethod<
  CreateMeetingRequest,
  CreateMeetingResponse,
  CreateMeetingError,
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
      createdAt: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.String),
      ingestServer: Schema.optional(Schema.String),
      meetingId: Schema.optional(Schema.String),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      playbackUrl: Schema.optional(Schema.String),
      status: Schema.optional(
        Schema.Literals(["LIVE", "IDLE", "ERRORED", "INVOKED"]),
      ),
      streamKey: Schema.optional(Schema.String),
      updatedAt: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        disabled: "disabled",
        ingestServer: "ingest_server",
        meetingId: "meeting_id",
        name: "name",
        playbackUrl: "playback_url",
        status: "status",
        streamKey: "stream_key",
        updatedAt: "updated_at",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetMeetingActiveLivestreamsLivestreamResponse>;

export type GetMeetingActiveLivestreamsLivestreamError = CommonErrors;

export const getMeetingActiveLivestreamsLivestream: API.OperationMethod<
  GetMeetingActiveLivestreamsLivestreamRequest,
  GetMeetingActiveLivestreamsLivestreamResponse,
  GetMeetingActiveLivestreamsLivestreamError,
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
      createdAt: Schema.String,
      updatedAt: Schema.String,
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literals([
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ]),
              ),
              textFormat: Schema.optional(
                Schema.Literals(["plain_text", "markdown"]),
              ),
              wordLimit: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                summaryType: "summary_type",
                textFormat: "text_format",
                wordLimit: "word_limit",
              }),
            ),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literals([
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
                ]),
              ),
              profanityFilter: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                keywords: "keywords",
                language: "language",
                profanityFilter: "profanity_filter",
              }),
            ),
          ),
        }),
      ),
      liveStreamOnStart: Schema.optional(Schema.Boolean),
      persistChat: Schema.optional(Schema.Boolean),
      recordOnStart: Schema.optional(Schema.Boolean),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
              codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
              exportFile: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                channel: "channel",
                codec: "codec",
                exportFile: "export_file",
              }),
            ),
          ),
          fileNamePrefix: Schema.optional(Schema.String),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String),
            }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
          ),
          maxSeconds: Schema.optional(Schema.Number),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ),
          storageConfig: Schema.optional(
            Schema.Union([
              Schema.Struct({
                type: Schema.Literals([
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ]),
                accessKey: Schema.optional(Schema.String),
                authMethod: Schema.optional(
                  Schema.Literals(["KEY", "PASSWORD"]),
                ),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  accessKey: "access_key",
                  authMethod: "auth_method",
                  bucket: "bucket",
                  host: "host",
                  password: "password",
                  path: "path",
                  port: "port",
                  privateKey: "private_key",
                  region: "region",
                  secret: "secret",
                  username: "username",
                }),
              ),
              Schema.Null,
            ]),
          ),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
              exportFile: Schema.optional(Schema.Boolean),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literals([
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ]),
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
            }).pipe(
              Schema.encodeKeys({
                codec: "codec",
                exportFile: "export_file",
                height: "height",
                watermark: "watermark",
                width: "width",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            audioConfig: "audio_config",
            fileNamePrefix: "file_name_prefix",
            liveStreamingConfig: "live_streaming_config",
            maxSeconds: "max_seconds",
            realtimekitBucketConfig: "realtimekit_bucket_config",
            storageConfig: "storage_config",
            videoConfig: "video_config",
          }),
        ),
      ),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
      summarizeOnEnd: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        aiConfig: "ai_config",
        liveStreamOnStart: "live_stream_on_start",
        persistChat: "persist_chat",
        recordOnStart: "record_on_start",
        recordingConfig: "recording_config",
        sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
        status: "status",
        summarizeOnEnd: "summarize_on_end",
        title: "title",
      }),
    ),
  ),
}) as unknown as Schema.Schema<GetMeetingByIdMeetingResponse>;

export type GetMeetingByIdMeetingError = CommonErrors;

export const getMeetingByIdMeeting: API.OperationMethod<
  GetMeetingByIdMeetingRequest,
  GetMeetingByIdMeetingResponse,
  GetMeetingByIdMeetingError,
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
            Schema.Literals([
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ]),
          ),
          textFormat: Schema.optional(
            Schema.Literals(["plain_text", "markdown"]),
          ),
          wordLimit: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            summaryType: "summary_type",
            textFormat: "text_format",
            wordLimit: "word_limit",
          }),
        ),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literals([
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
            ]),
          ),
          profanityFilter: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            keywords: "keywords",
            language: "language",
            profanityFilter: "profanity_filter",
          }),
        ),
      ),
    }),
  ),
  liveStreamOnStart: Schema.optional(Schema.Boolean),
  persistChat: Schema.optional(Schema.Boolean),
  recordOnStart: Schema.optional(Schema.Boolean),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
  summarizeOnEnd: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    aiConfig: "ai_config",
    liveStreamOnStart: "live_stream_on_start",
    persistChat: "persist_chat",
    recordOnStart: "record_on_start",
    sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
    status: "status",
    summarizeOnEnd: "summarize_on_end",
    title: "title",
  }),
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
      createdAt: Schema.String,
      updatedAt: Schema.String,
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literals([
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ]),
              ),
              textFormat: Schema.optional(
                Schema.Literals(["plain_text", "markdown"]),
              ),
              wordLimit: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                summaryType: "summary_type",
                textFormat: "text_format",
                wordLimit: "word_limit",
              }),
            ),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literals([
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
                ]),
              ),
              profanityFilter: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                keywords: "keywords",
                language: "language",
                profanityFilter: "profanity_filter",
              }),
            ),
          ),
        }),
      ),
      liveStreamOnStart: Schema.optional(Schema.Boolean),
      persistChat: Schema.optional(Schema.Boolean),
      recordOnStart: Schema.optional(Schema.Boolean),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
              codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
              exportFile: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                channel: "channel",
                codec: "codec",
                exportFile: "export_file",
              }),
            ),
          ),
          fileNamePrefix: Schema.optional(Schema.String),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String),
            }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
          ),
          maxSeconds: Schema.optional(Schema.Number),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ),
          storageConfig: Schema.optional(
            Schema.Union([
              Schema.Struct({
                type: Schema.Literals([
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ]),
                accessKey: Schema.optional(Schema.String),
                authMethod: Schema.optional(
                  Schema.Literals(["KEY", "PASSWORD"]),
                ),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  accessKey: "access_key",
                  authMethod: "auth_method",
                  bucket: "bucket",
                  host: "host",
                  password: "password",
                  path: "path",
                  port: "port",
                  privateKey: "private_key",
                  region: "region",
                  secret: "secret",
                  username: "username",
                }),
              ),
              Schema.Null,
            ]),
          ),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
              exportFile: Schema.optional(Schema.Boolean),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literals([
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ]),
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
            }).pipe(
              Schema.encodeKeys({
                codec: "codec",
                exportFile: "export_file",
                height: "height",
                watermark: "watermark",
                width: "width",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            audioConfig: "audio_config",
            fileNamePrefix: "file_name_prefix",
            liveStreamingConfig: "live_streaming_config",
            maxSeconds: "max_seconds",
            realtimekitBucketConfig: "realtimekit_bucket_config",
            storageConfig: "storage_config",
            videoConfig: "video_config",
          }),
        ),
      ),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
      summarizeOnEnd: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        aiConfig: "ai_config",
        liveStreamOnStart: "live_stream_on_start",
        persistChat: "persist_chat",
        recordOnStart: "record_on_start",
        recordingConfig: "recording_config",
        sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
        status: "status",
        summarizeOnEnd: "summarize_on_end",
        title: "title",
      }),
    ),
  ),
}) as unknown as Schema.Schema<UpdateMeetingByIdMeetingResponse>;

export type UpdateMeetingByIdMeetingError = CommonErrors;

export const updateMeetingByIdMeeting: API.OperationMethod<
  UpdateMeetingByIdMeetingRequest,
  UpdateMeetingByIdMeetingResponse,
  UpdateMeetingByIdMeetingError,
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
            Schema.Literals([
              "general",
              "team_meeting",
              "sales_call",
              "client_check_in",
              "interview",
              "daily_standup",
              "one_on_one_meeting",
              "lecture",
              "code_review",
            ]),
          ),
          textFormat: Schema.optional(
            Schema.Literals(["plain_text", "markdown"]),
          ),
          wordLimit: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            summaryType: "summary_type",
            textFormat: "text_format",
            wordLimit: "word_limit",
          }),
        ),
      ),
      transcription: Schema.optional(
        Schema.Struct({
          keywords: Schema.optional(Schema.Array(Schema.String)),
          language: Schema.optional(
            Schema.Literals([
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
            ]),
          ),
          profanityFilter: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            keywords: "keywords",
            language: "language",
            profanityFilter: "profanity_filter",
          }),
        ),
      ),
    }),
  ),
  liveStreamOnStart: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  persistChat: Schema.optional(Schema.Boolean),
  recordOnStart: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  recordingConfig: Schema.optional(
    Schema.Struct({
      audioConfig: Schema.optional(
        Schema.Struct({
          channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
          codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
          exportFile: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            channel: "channel",
            codec: "codec",
            exportFile: "export_file",
          }),
        ),
      ),
      fileNamePrefix: Schema.optional(Schema.String),
      liveStreamingConfig: Schema.optional(
        Schema.Struct({
          rtmpUrl: Schema.optional(Schema.String),
        }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
      ),
      maxSeconds: Schema.optional(Schema.Number),
      realtimekitBucketConfig: Schema.optional(
        Schema.Struct({
          enabled: Schema.Boolean,
        }),
      ),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            accessKey: Schema.optional(Schema.String),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              accessKey: "access_key",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
      videoConfig: Schema.optional(
        Schema.Struct({
          codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
          exportFile: Schema.optional(Schema.Boolean),
          height: Schema.optional(Schema.Number),
          watermark: Schema.optional(
            Schema.Struct({
              position: Schema.optional(
                Schema.Literals([
                  "left top",
                  "right top",
                  "left bottom",
                  "right bottom",
                ]),
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
        }).pipe(
          Schema.encodeKeys({
            codec: "codec",
            exportFile: "export_file",
            height: "height",
            watermark: "watermark",
            width: "width",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        audioConfig: "audio_config",
        fileNamePrefix: "file_name_prefix",
        liveStreamingConfig: "live_streaming_config",
        maxSeconds: "max_seconds",
        realtimekitBucketConfig: "realtimekit_bucket_config",
        storageConfig: "storage_config",
        videoConfig: "video_config",
      }),
    ),
  ),
  sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
  summarizeOnEnd: Schema.optional(Schema.Boolean),
  title: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    aiConfig: "ai_config",
    liveStreamOnStart: "live_stream_on_start",
    persistChat: "persist_chat",
    recordOnStart: "record_on_start",
    recordingConfig: "recording_config",
    sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
    summarizeOnEnd: "summarize_on_end",
    title: "title",
  }),
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
      createdAt: Schema.String,
      updatedAt: Schema.String,
      aiConfig: Schema.optional(
        Schema.Struct({
          summarization: Schema.optional(
            Schema.Struct({
              summaryType: Schema.optional(
                Schema.Literals([
                  "general",
                  "team_meeting",
                  "sales_call",
                  "client_check_in",
                  "interview",
                  "daily_standup",
                  "one_on_one_meeting",
                  "lecture",
                  "code_review",
                ]),
              ),
              textFormat: Schema.optional(
                Schema.Literals(["plain_text", "markdown"]),
              ),
              wordLimit: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                summaryType: "summary_type",
                textFormat: "text_format",
                wordLimit: "word_limit",
              }),
            ),
          ),
          transcription: Schema.optional(
            Schema.Struct({
              keywords: Schema.optional(Schema.Array(Schema.String)),
              language: Schema.optional(
                Schema.Literals([
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
                ]),
              ),
              profanityFilter: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                keywords: "keywords",
                language: "language",
                profanityFilter: "profanity_filter",
              }),
            ),
          ),
        }),
      ),
      liveStreamOnStart: Schema.optional(Schema.Boolean),
      persistChat: Schema.optional(Schema.Boolean),
      recordOnStart: Schema.optional(Schema.Boolean),
      recordingConfig: Schema.optional(
        Schema.Struct({
          audioConfig: Schema.optional(
            Schema.Struct({
              channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
              codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
              exportFile: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                channel: "channel",
                codec: "codec",
                exportFile: "export_file",
              }),
            ),
          ),
          fileNamePrefix: Schema.optional(Schema.String),
          liveStreamingConfig: Schema.optional(
            Schema.Struct({
              rtmpUrl: Schema.optional(Schema.String),
            }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
          ),
          maxSeconds: Schema.optional(Schema.Number),
          realtimekitBucketConfig: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
          ),
          storageConfig: Schema.optional(
            Schema.Union([
              Schema.Struct({
                type: Schema.Literals([
                  "aws",
                  "azure",
                  "digitalocean",
                  "gcs",
                  "sftp",
                ]),
                accessKey: Schema.optional(Schema.String),
                authMethod: Schema.optional(
                  Schema.Literals(["KEY", "PASSWORD"]),
                ),
                bucket: Schema.optional(Schema.String),
                host: Schema.optional(Schema.String),
                password: Schema.optional(Schema.String),
                path: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
                privateKey: Schema.optional(Schema.String),
                region: Schema.optional(Schema.String),
                secret: Schema.optional(Schema.String),
                username: Schema.optional(Schema.String),
              }).pipe(
                Schema.encodeKeys({
                  type: "type",
                  accessKey: "access_key",
                  authMethod: "auth_method",
                  bucket: "bucket",
                  host: "host",
                  password: "password",
                  path: "path",
                  port: "port",
                  privateKey: "private_key",
                  region: "region",
                  secret: "secret",
                  username: "username",
                }),
              ),
              Schema.Null,
            ]),
          ),
          videoConfig: Schema.optional(
            Schema.Struct({
              codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
              exportFile: Schema.optional(Schema.Boolean),
              height: Schema.optional(Schema.Number),
              watermark: Schema.optional(
                Schema.Struct({
                  position: Schema.optional(
                    Schema.Literals([
                      "left top",
                      "right top",
                      "left bottom",
                      "right bottom",
                    ]),
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
            }).pipe(
              Schema.encodeKeys({
                codec: "codec",
                exportFile: "export_file",
                height: "height",
                watermark: "watermark",
                width: "width",
              }),
            ),
          ),
        }).pipe(
          Schema.encodeKeys({
            audioConfig: "audio_config",
            fileNamePrefix: "file_name_prefix",
            liveStreamingConfig: "live_streaming_config",
            maxSeconds: "max_seconds",
            realtimekitBucketConfig: "realtimekit_bucket_config",
            storageConfig: "storage_config",
            videoConfig: "video_config",
          }),
        ),
      ),
      sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
      status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
      summarizeOnEnd: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        updatedAt: "updated_at",
        aiConfig: "ai_config",
        liveStreamOnStart: "live_stream_on_start",
        persistChat: "persist_chat",
        recordOnStart: "record_on_start",
        recordingConfig: "recording_config",
        sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
        status: "status",
        summarizeOnEnd: "summarize_on_end",
        title: "title",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ReplaceMeetingByIdMeetingResponse>;

export type ReplaceMeetingByIdMeetingError = CommonErrors;

export const replaceMeetingByIdMeeting: API.OperationMethod<
  ReplaceMeetingByIdMeetingRequest,
  ReplaceMeetingByIdMeetingResponse,
  ReplaceMeetingByIdMeetingError,
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
    createdAt: Schema.String,
    customParticipantId: Schema.String,
    presetName: Schema.String,
    updatedAt: Schema.String,
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      customParticipantId: "custom_participant_id",
      presetName: "preset_name",
      updatedAt: "updated_at",
      name: "name",
      picture: "picture",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingParticipantMeetingResponse>;

export type GetMeetingParticipantMeetingError = CommonErrors;

export const getMeetingParticipantMeeting: API.OperationMethod<
  GetMeetingParticipantMeetingRequest,
  GetMeetingParticipantMeetingResponse,
  GetMeetingParticipantMeetingError,
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
      createdAt: Schema.String,
      customParticipantId: Schema.String,
      presetId: Schema.String,
      updatedAt: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        createdAt: "created_at",
        customParticipantId: "custom_participant_id",
        presetId: "preset_id",
        updatedAt: "updated_at",
      }),
    ),
  ),
}) as unknown as Schema.Schema<DeleteMeetingParticipantMeetingResponse>;

export type DeleteMeetingParticipantMeetingError = CommonErrors;

export const deleteMeetingParticipantMeeting: API.OperationMethod<
  DeleteMeetingParticipantMeetingRequest,
  DeleteMeetingParticipantMeetingResponse,
  DeleteMeetingParticipantMeetingError,
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
      createdAt: Schema.String,
      customParticipantId: Schema.String,
      presetName: Schema.String,
      updatedAt: Schema.String,
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        customParticipantId: "custom_participant_id",
        presetName: "preset_name",
        updatedAt: "updated_at",
        name: "name",
        picture: "picture",
      }),
    ),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number,
    startOffset: Schema.Number,
    totalCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      endOffset: "end_offset",
      startOffset: "start_offset",
      totalCount: "total_count",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetMeetingParticipantsMeetingResponse>;

export type GetMeetingParticipantsMeetingError = CommonErrors;

export const getMeetingParticipantsMeeting: API.OperationMethod<
  GetMeetingParticipantsMeetingRequest,
  GetMeetingParticipantsMeetingResponse,
  GetMeetingParticipantsMeetingError,
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
      audioDownloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrlExpiry: Schema.Union([Schema.String, Schema.Null]),
      fileSize: Schema.Union([Schema.Number, Schema.Null]),
      invokedTime: Schema.String,
      outputFileName: Schema.String,
      sessionId: Schema.Union([Schema.String, Schema.Null]),
      startedTime: Schema.Union([Schema.String, Schema.Null]),
      status: Schema.Literals([
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ]),
      stoppedTime: Schema.Union([Schema.String, Schema.Null]),
      recordingDuration: Schema.optional(Schema.Number),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "RECORD_ON_START"]),
          ),
        }),
      ),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"]),
          ),
        }),
      ),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        audioDownloadUrl: "audio_download_url",
        downloadUrl: "download_url",
        downloadUrlExpiry: "download_url_expiry",
        fileSize: "file_size",
        invokedTime: "invoked_time",
        outputFileName: "output_file_name",
        sessionId: "session_id",
        startedTime: "started_time",
        status: "status",
        stoppedTime: "stopped_time",
        recordingDuration: "recording_duration",
        startReason: "start_reason",
        stopReason: "stop_reason",
        storageConfig: "storage_config",
      }),
    ),
  ),
}) as unknown as Schema.Schema<GetOneRecordingRecordingResponse>;

export type GetOneRecordingRecordingError = CommonErrors;

export const getOneRecordingRecording: API.OperationMethod<
  GetOneRecordingRecordingRequest,
  GetOneRecordingRecordingResponse,
  GetOneRecordingRecordingError,
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
                totalRecordingMinutes: Schema.optional(Schema.Number),
                totalRecordings: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  day: "day",
                  totalRecordingMinutes: "total_recording_minutes",
                  totalRecordings: "total_recordings",
                }),
              ),
            ),
          ),
          recordingCount: Schema.optional(Schema.Number),
          recordingMinutesConsumed: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            dayStats: "day_stats",
            recordingCount: "recording_count",
            recordingMinutesConsumed: "recording_minutes_consumed",
          }),
        ),
      ),
      sessionStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalSessionMinutes: Schema.optional(Schema.Number),
                totalSessions: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  day: "day",
                  totalSessionMinutes: "total_session_minutes",
                  totalSessions: "total_sessions",
                }),
              ),
            ),
          ),
          sessionsCount: Schema.optional(Schema.Number),
          sessionsMinutesConsumed: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            dayStats: "day_stats",
            sessionsCount: "sessions_count",
            sessionsMinutesConsumed: "sessions_minutes_consumed",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        recordingStats: "recording_stats",
        sessionStats: "session_stats",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetOrgAnalyticsAnalyticResponse>;

export type GetOrgAnalyticsAnalyticError = CommonErrors;

export const getOrgAnalyticsAnalytic: API.OperationMethod<
  GetOrgAnalyticsAnalyticRequest,
  GetOrgAnalyticsAnalyticResponse,
  GetOrgAnalyticsAnalyticError,
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
                totalRecordingMinutes: Schema.optional(Schema.Number),
                totalRecordings: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  day: "day",
                  totalRecordingMinutes: "total_recording_minutes",
                  totalRecordings: "total_recordings",
                }),
              ),
            ),
          ),
          recordingCount: Schema.optional(Schema.Number),
          recordingMinutesConsumed: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            dayStats: "day_stats",
            recordingCount: "recording_count",
            recordingMinutesConsumed: "recording_minutes_consumed",
          }),
        ),
      ),
      sessionStats: Schema.optional(
        Schema.Struct({
          dayStats: Schema.optional(
            Schema.Array(
              Schema.Struct({
                day: Schema.optional(Schema.String),
                totalSessionMinutes: Schema.optional(Schema.Number),
                totalSessions: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  day: "day",
                  totalSessionMinutes: "total_session_minutes",
                  totalSessions: "total_sessions",
                }),
              ),
            ),
          ),
          sessionsCount: Schema.optional(Schema.Number),
          sessionsMinutesConsumed: Schema.optional(Schema.Number),
        }).pipe(
          Schema.encodeKeys({
            dayStats: "day_stats",
            sessionsCount: "sessions_count",
            sessionsMinutesConsumed: "sessions_minutes_consumed",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        recordingStats: "recording_stats",
        sessionStats: "session_stats",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetOrgAnalyticsLivestreamResponse>;

export type GetOrgAnalyticsLivestreamError = CommonErrors;

export const getOrgAnalyticsLivestream: API.OperationMethod<
  GetOrgAnalyticsLivestreamRequest,
  GetOrgAnalyticsLivestreamResponse,
  GetOrgAnalyticsLivestreamError,
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
    Schema.Literals([
      "device_info",
      "ip_information",
      "precall_network_information",
      "events",
      "quality_stats",
    ]),
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
          createdAt: Schema.optional(Schema.String),
          customParticipantId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          duration: Schema.optional(Schema.Number),
          joinedAt: Schema.optional(Schema.String),
          leftAt: Schema.optional(Schema.String),
          presetName: Schema.optional(Schema.String),
          updatedAt: Schema.optional(Schema.String),
          userId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            createdAt: "created_at",
            customParticipantId: "custom_participant_id",
            displayName: "display_name",
            duration: "duration",
            joinedAt: "joined_at",
            leftAt: "left_at",
            presetName: "preset_name",
            updatedAt: "updated_at",
            userId: "user_id",
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetParticipantDataFromPeerIdSessionResponse>;

export type GetParticipantDataFromPeerIdSessionError = CommonErrors;

export const getParticipantDataFromPeerIdSession: API.OperationMethod<
  GetParticipantDataFromPeerIdSessionRequest,
  GetParticipantDataFromPeerIdSessionResponse,
  GetParticipantDataFromPeerIdSessionError,
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
  customParticipantId: Schema.String,
  presetName: Schema.String,
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    customParticipantId: "custom_participant_id",
    presetName: "preset_name",
    name: "name",
    picture: "picture",
  }),
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
      createdAt: Schema.String,
      customParticipantId: Schema.String,
      presetName: Schema.String,
      updatedAt: Schema.String,
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        token: "token",
        createdAt: "created_at",
        customParticipantId: "custom_participant_id",
        presetName: "preset_name",
        updatedAt: "updated_at",
        name: "name",
        picture: "picture",
      }),
    ),
  ),
}) as unknown as Schema.Schema<AddParticipantMeetingResponse>;

export type AddParticipantMeetingError = CommonErrors;

export const addParticipantMeeting: API.OperationMethod<
  AddParticipantMeetingRequest,
  AddParticipantMeetingResponse,
  AddParticipantMeetingError,
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
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  presetName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    picture: "picture",
    presetName: "preset_name",
  }),
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
      createdAt: Schema.String,
      customParticipantId: Schema.String,
      presetName: Schema.String,
      updatedAt: Schema.String,
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      picture: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        token: "token",
        createdAt: "created_at",
        customParticipantId: "custom_participant_id",
        presetName: "preset_name",
        updatedAt: "updated_at",
        name: "name",
        picture: "picture",
      }),
    ),
  ),
}) as unknown as Schema.Schema<EditParticipantMeetingResponse>;

export type EditParticipantMeetingError = CommonErrors;

export const editParticipantMeeting: API.OperationMethod<
  EditParticipantMeetingRequest,
  EditParticipantMeetingResponse,
  EditParticipantMeetingError,
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
  customParticipantIds: Schema.Array(Schema.String),
  participantIds: Schema.Array(Schema.String),
}).pipe(
  Schema.encodeKeys({
    customParticipantIds: "custom_participant_ids",
    participantIds: "participant_ids",
  }),
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
            createdAt: Schema.String,
            updatedAt: Schema.String,
            email: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            picture: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              updatedAt: "updated_at",
              email: "email",
              name: "name",
              picture: "picture",
            }),
          ),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<KickParticipantsActiveSessionResponse>;

export type KickParticipantsActiveSessionError = CommonErrors;

export const kickParticipantsActiveSession: API.OperationMethod<
  KickParticipantsActiveSessionRequest,
  KickParticipantsActiveSessionResponse,
  KickParticipantsActiveSessionError,
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

export type RefreshParticipantTokenMeetingError = CommonErrors;

export const refreshParticipantTokenMeeting: API.OperationMethod<
  RefreshParticipantTokenMeetingRequest,
  RefreshParticipantTokenMeetingResponse,
  RefreshParticipantTokenMeetingError,
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
  hideVotes: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    options: "options",
    question: "question",
    anonymous: "anonymous",
    hideVotes: "hide_votes",
  }),
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
          createdBy: Schema.optional(Schema.String),
          hideVotes: Schema.optional(Schema.Boolean),
          voted: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            options: "options",
            question: "question",
            anonymous: "anonymous",
            createdBy: "created_by",
            hideVotes: "hide_votes",
            voted: "voted",
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreatePollActiveSessionResponse>;

export type CreatePollActiveSessionError = CommonErrors;

export const createPollActiveSession: API.OperationMethod<
  CreatePollActiveSessionRequest,
  CreatePollActiveSessionResponse,
  CreatePollActiveSessionError,
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
      createdAt: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      updatedAt: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        name: "name",
        updatedAt: "updated_at",
      }),
    ),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number,
    startOffset: Schema.Number,
    totalCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      endOffset: "end_offset",
      startOffset: "start_offset",
      totalCount: "total_count",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetPresetResponse>;

export type GetPresetError = CommonErrors;

export const getPreset: API.OperationMethod<
  GetPresetRequest,
  GetPresetResponse,
  GetPresetError,
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
    maxScreenshareCount: Schema.Number,
    maxVideoStreams: Schema.Struct({
      desktop: Schema.optional(Schema.Number),
      mobile: Schema.optional(Schema.Number),
    }),
    media: Schema.Struct({
      screenshare: Schema.optional(
        Schema.Struct({
          canProduce: Schema.optional(
            Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
          ),
        }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
      ),
      video: Schema.optional(
        Schema.Struct({
          canProduce: Schema.optional(
            Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
          ),
        }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
      ),
    }),
    viewType: Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
  }).pipe(
    Schema.encodeKeys({
      maxScreenshareCount: "max_screenshare_count",
      maxVideoStreams: "max_video_streams",
      media: "media",
      viewType: "view_type",
    }),
  ),
  name: Schema.String,
  ui: Schema.Struct({
    designTokens: Schema.Struct({
      borderRadius: Schema.optional(Schema.Literal("rounded")),
      borderWidth: Schema.optional(Schema.Literal("thin")),
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
          textOnBrand: Schema.optional(Schema.String),
          videoBg: Schema.optional(Schema.String),
          warning: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            background: "background",
            brand: "brand",
            danger: "danger",
            success: "success",
            text: "text",
            textOnBrand: "text_on_brand",
            videoBg: "video_bg",
            warning: "warning",
          }),
        ),
      ),
      logo: Schema.optional(Schema.String),
      spacingBase: Schema.optional(Schema.Number),
      theme: Schema.optional(Schema.Literal("dark")),
    }).pipe(
      Schema.encodeKeys({
        borderRadius: "border_radius",
        borderWidth: "border_width",
        colors: "colors",
        logo: "logo",
        spacingBase: "spacing_base",
        theme: "theme",
      }),
    ),
    configDiff: Schema.optional(Schema.Unknown),
  }).pipe(
    Schema.encodeKeys({
      designTokens: "design_tokens",
      configDiff: "config_diff",
    }),
  ),
  permissions: Schema.optional(
    Schema.Struct({
      acceptWaitingRequests: Schema.Boolean,
      canAcceptProductionRequests: Schema.Boolean,
      canChangeParticipantPermissions: Schema.Boolean,
      canEditDisplayName: Schema.Boolean,
      canLivestream: Schema.Boolean,
      canRecord: Schema.Boolean,
      canSpotlight: Schema.Boolean,
      chat: Schema.Struct({
        private: Schema.optional(
          Schema.Struct({
            canReceive: Schema.optional(Schema.Boolean),
            canSend: Schema.optional(Schema.Boolean),
            files: Schema.optional(Schema.Boolean),
            text: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              canReceive: "can_receive",
              canSend: "can_send",
              files: "files",
              text: "text",
            }),
          ),
        ),
        public: Schema.optional(
          Schema.Struct({
            canSend: Schema.optional(Schema.Boolean),
            files: Schema.optional(Schema.Boolean),
            text: Schema.optional(Schema.Boolean),
          }).pipe(
            Schema.encodeKeys({
              canSend: "can_send",
              files: "files",
              text: "text",
            }),
          ),
        ),
      }),
      connectedMeetings: Schema.Struct({
        canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
        canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
        canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          canAlterConnectedMeetings: "can_alter_connected_meetings",
          canSwitchConnectedMeetings: "can_switch_connected_meetings",
          canSwitchToParentMeeting: "can_switch_to_parent_meeting",
        }),
      ),
      disableParticipantAudio: Schema.Boolean,
      disableParticipantScreensharing: Schema.Boolean,
      disableParticipantVideo: Schema.Boolean,
      hiddenParticipant: Schema.Boolean,
      kickParticipant: Schema.Boolean,
      media: Schema.Struct({
        audio: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
      }),
      pinParticipant: Schema.Boolean,
      plugins: Schema.Struct({
        canClose: Schema.optional(Schema.Boolean),
        canEditConfig: Schema.optional(Schema.Boolean),
        canStart: Schema.optional(Schema.Boolean),
        config: Schema.optional(
          Schema.Union([
            Schema.String,
            Schema.Struct({
              accessControl: Schema.optional(
                Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
              ),
              handlesViewOnly: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                accessControl: "access_control",
                handlesViewOnly: "handles_view_only",
              }),
            ),
          ]),
        ),
      }).pipe(
        Schema.encodeKeys({
          canClose: "can_close",
          canEditConfig: "can_edit_config",
          canStart: "can_start",
          config: "config",
        }),
      ),
      polls: Schema.Struct({
        canCreate: Schema.optional(Schema.Boolean),
        canView: Schema.optional(Schema.Boolean),
        canVote: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          canCreate: "can_create",
          canView: "can_view",
          canVote: "can_vote",
        }),
      ),
      recorderType: Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
      showParticipantList: Schema.Boolean,
      waitingRoomType: Schema.Literals([
        "SKIP",
        "ON_PRIVILEGED_USER_ENTRY",
        "SKIP_ON_ACCEPT",
      ]),
      isRecorder: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        acceptWaitingRequests: "accept_waiting_requests",
        canAcceptProductionRequests: "can_accept_production_requests",
        canChangeParticipantPermissions: "can_change_participant_permissions",
        canEditDisplayName: "can_edit_display_name",
        canLivestream: "can_livestream",
        canRecord: "can_record",
        canSpotlight: "can_spotlight",
        chat: "chat",
        connectedMeetings: "connected_meetings",
        disableParticipantAudio: "disable_participant_audio",
        disableParticipantScreensharing: "disable_participant_screensharing",
        disableParticipantVideo: "disable_participant_video",
        hiddenParticipant: "hidden_participant",
        kickParticipant: "kick_participant",
        media: "media",
        pinParticipant: "pin_participant",
        plugins: "plugins",
        polls: "polls",
        recorderType: "recorder_type",
        showParticipantList: "show_participant_list",
        waitingRoomType: "waiting_room_type",
        isRecorder: "is_recorder",
      }),
    ),
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
      maxScreenshareCount: Schema.Number,
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
      }),
      viewType: Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
    }).pipe(
      Schema.encodeKeys({
        maxScreenshareCount: "max_screenshare_count",
        maxVideoStreams: "max_video_streams",
        media: "media",
        viewType: "view_type",
      }),
    ),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")),
        borderWidth: Schema.optional(Schema.Literal("thin")),
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
            textOnBrand: Schema.optional(Schema.String),
            videoBg: Schema.optional(Schema.String),
            warning: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              background: "background",
              brand: "brand",
              danger: "danger",
              success: "success",
              text: "text",
              textOnBrand: "text_on_brand",
              videoBg: "video_bg",
              warning: "warning",
            }),
          ),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(
        Schema.encodeKeys({
          borderRadius: "border_radius",
          borderWidth: "border_width",
          colors: "colors",
          logo: "logo",
          spacingBase: "spacing_base",
          theme: "theme",
        }),
      ),
      configDiff: Schema.optional(Schema.Unknown),
    }).pipe(
      Schema.encodeKeys({
        designTokens: "design_tokens",
        configDiff: "config_diff",
      }),
    ),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean,
        canAcceptProductionRequests: Schema.Boolean,
        canChangeParticipantPermissions: Schema.Boolean,
        canEditDisplayName: Schema.Boolean,
        canLivestream: Schema.Boolean,
        canRecord: Schema.Boolean,
        canSpotlight: Schema.Boolean,
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean),
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canReceive: "can_receive",
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canAlterConnectedMeetings: "can_alter_connected_meetings",
            canSwitchConnectedMeetings: "can_switch_connected_meetings",
            canSwitchToParentMeeting: "can_switch_to_parent_meeting",
          }),
        ),
        disableParticipantAudio: Schema.Boolean,
        disableParticipantScreensharing: Schema.Boolean,
        disableParticipantVideo: Schema.Boolean,
        hiddenParticipant: Schema.Boolean,
        kickParticipant: Schema.Boolean,
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
        pinParticipant: Schema.Boolean,
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean),
          canEditConfig: Schema.optional(Schema.Boolean),
          canStart: Schema.optional(Schema.Boolean),
          config: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
                ),
                handlesViewOnly: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  accessControl: "access_control",
                  handlesViewOnly: "handles_view_only",
                }),
              ),
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            canClose: "can_close",
            canEditConfig: "can_edit_config",
            canStart: "can_start",
            config: "config",
          }),
        ),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean),
          canView: Schema.optional(Schema.Boolean),
          canVote: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canCreate: "can_create",
            canView: "can_view",
            canVote: "can_vote",
          }),
        ),
        recorderType: Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
        showParticipantList: Schema.Boolean,
        waitingRoomType: Schema.Literals([
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ]),
        isRecorder: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          acceptWaitingRequests: "accept_waiting_requests",
          canAcceptProductionRequests: "can_accept_production_requests",
          canChangeParticipantPermissions: "can_change_participant_permissions",
          canEditDisplayName: "can_edit_display_name",
          canLivestream: "can_livestream",
          canRecord: "can_record",
          canSpotlight: "can_spotlight",
          chat: "chat",
          connectedMeetings: "connected_meetings",
          disableParticipantAudio: "disable_participant_audio",
          disableParticipantScreensharing: "disable_participant_screensharing",
          disableParticipantVideo: "disable_participant_video",
          hiddenParticipant: "hidden_participant",
          kickParticipant: "kick_participant",
          media: "media",
          pinParticipant: "pin_participant",
          plugins: "plugins",
          polls: "polls",
          recorderType: "recorder_type",
          showParticipantList: "show_participant_list",
          waitingRoomType: "waiting_room_type",
          isRecorder: "is_recorder",
        }),
      ),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<CreatePresetResponse>;

export type CreatePresetError = CommonErrors;

export const createPreset: API.OperationMethod<
  CreatePresetRequest,
  CreatePresetResponse,
  CreatePresetError,
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
      maxScreenshareCount: Schema.optional(Schema.Number),
      maxVideoStreams: Schema.optional(
        Schema.Struct({
          desktop: Schema.optional(Schema.Number),
          mobile: Schema.optional(Schema.Number),
        }),
      ),
      media: Schema.optional(
        Schema.Struct({
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
      ),
      viewType: Schema.optional(
        Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
      ),
    }).pipe(
      Schema.encodeKeys({
        maxScreenshareCount: "max_screenshare_count",
        maxVideoStreams: "max_video_streams",
        media: "media",
        viewType: "view_type",
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  permissions: Schema.optional(
    Schema.Struct({
      acceptWaitingRequests: Schema.optional(Schema.Boolean),
      canAcceptProductionRequests: Schema.optional(Schema.Boolean),
      canChangeParticipantPermissions: Schema.optional(Schema.Boolean),
      canEditDisplayName: Schema.optional(Schema.Boolean),
      canLivestream: Schema.optional(Schema.Boolean),
      canRecord: Schema.optional(Schema.Boolean),
      canSpotlight: Schema.optional(Schema.Boolean),
      chat: Schema.optional(
        Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean),
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canReceive: "can_receive",
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
        }),
      ),
      connectedMeetings: Schema.optional(
        Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canAlterConnectedMeetings: "can_alter_connected_meetings",
            canSwitchConnectedMeetings: "can_switch_connected_meetings",
            canSwitchToParentMeeting: "can_switch_to_parent_meeting",
          }),
        ),
      ),
      disableParticipantAudio: Schema.optional(Schema.Boolean),
      disableParticipantScreensharing: Schema.optional(Schema.Boolean),
      disableParticipantVideo: Schema.optional(Schema.Boolean),
      hiddenParticipant: Schema.optional(Schema.Boolean),
      isRecorder: Schema.optional(Schema.Boolean),
      kickParticipant: Schema.optional(Schema.Boolean),
      media: Schema.optional(
        Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
      ),
      pinParticipant: Schema.optional(Schema.Boolean),
      plugins: Schema.optional(
        Schema.Struct({
          canClose: Schema.optional(Schema.Boolean),
          canEditConfig: Schema.optional(Schema.Boolean),
          canStart: Schema.optional(Schema.Boolean),
          config: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
                ),
                handlesViewOnly: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  accessControl: "access_control",
                  handlesViewOnly: "handles_view_only",
                }),
              ),
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            canClose: "can_close",
            canEditConfig: "can_edit_config",
            canStart: "can_start",
            config: "config",
          }),
        ),
      ),
      polls: Schema.optional(
        Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean),
          canView: Schema.optional(Schema.Boolean),
          canVote: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canCreate: "can_create",
            canView: "can_view",
            canVote: "can_vote",
          }),
        ),
      ),
      recorderType: Schema.optional(
        Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
      ),
      showParticipantList: Schema.optional(Schema.Boolean),
      waitingRoomType: Schema.optional(
        Schema.Literals(["SKIP", "ON_PRIVILEGED_USER_ENTRY", "SKIP_ON_ACCEPT"]),
      ),
    }).pipe(
      Schema.encodeKeys({
        acceptWaitingRequests: "accept_waiting_requests",
        canAcceptProductionRequests: "can_accept_production_requests",
        canChangeParticipantPermissions: "can_change_participant_permissions",
        canEditDisplayName: "can_edit_display_name",
        canLivestream: "can_livestream",
        canRecord: "can_record",
        canSpotlight: "can_spotlight",
        chat: "chat",
        connectedMeetings: "connected_meetings",
        disableParticipantAudio: "disable_participant_audio",
        disableParticipantScreensharing: "disable_participant_screensharing",
        disableParticipantVideo: "disable_participant_video",
        hiddenParticipant: "hidden_participant",
        isRecorder: "is_recorder",
        kickParticipant: "kick_participant",
        media: "media",
        pinParticipant: "pin_participant",
        plugins: "plugins",
        polls: "polls",
        recorderType: "recorder_type",
        showParticipantList: "show_participant_list",
        waitingRoomType: "waiting_room_type",
      }),
    ),
  ),
  ui: Schema.optional(
    Schema.Struct({
      configDiff: Schema.optional(Schema.Unknown),
      designTokens: Schema.optional(
        Schema.Struct({
          borderRadius: Schema.optional(Schema.Literal("rounded")),
          borderWidth: Schema.optional(Schema.Literal("thin")),
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
              textOnBrand: Schema.optional(Schema.String),
              videoBg: Schema.optional(Schema.String),
              warning: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                background: "background",
                brand: "brand",
                danger: "danger",
                success: "success",
                text: "text",
                textOnBrand: "text_on_brand",
                videoBg: "video_bg",
                warning: "warning",
              }),
            ),
          ),
          logo: Schema.optional(Schema.String),
          spacingBase: Schema.optional(Schema.Number),
          theme: Schema.optional(Schema.Literal("dark")),
        }).pipe(
          Schema.encodeKeys({
            borderRadius: "border_radius",
            borderWidth: "border_width",
            colors: "colors",
            logo: "logo",
            spacingBase: "spacing_base",
            theme: "theme",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        configDiff: "config_diff",
        designTokens: "design_tokens",
      }),
    ),
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
      maxScreenshareCount: Schema.Number,
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
      }),
      viewType: Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
    }).pipe(
      Schema.encodeKeys({
        maxScreenshareCount: "max_screenshare_count",
        maxVideoStreams: "max_video_streams",
        media: "media",
        viewType: "view_type",
      }),
    ),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")),
        borderWidth: Schema.optional(Schema.Literal("thin")),
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
            textOnBrand: Schema.optional(Schema.String),
            videoBg: Schema.optional(Schema.String),
            warning: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              background: "background",
              brand: "brand",
              danger: "danger",
              success: "success",
              text: "text",
              textOnBrand: "text_on_brand",
              videoBg: "video_bg",
              warning: "warning",
            }),
          ),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(
        Schema.encodeKeys({
          borderRadius: "border_radius",
          borderWidth: "border_width",
          colors: "colors",
          logo: "logo",
          spacingBase: "spacing_base",
          theme: "theme",
        }),
      ),
      configDiff: Schema.optional(Schema.Unknown),
    }).pipe(
      Schema.encodeKeys({
        designTokens: "design_tokens",
        configDiff: "config_diff",
      }),
    ),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean,
        canAcceptProductionRequests: Schema.Boolean,
        canChangeParticipantPermissions: Schema.Boolean,
        canEditDisplayName: Schema.Boolean,
        canLivestream: Schema.Boolean,
        canRecord: Schema.Boolean,
        canSpotlight: Schema.Boolean,
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean),
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canReceive: "can_receive",
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canAlterConnectedMeetings: "can_alter_connected_meetings",
            canSwitchConnectedMeetings: "can_switch_connected_meetings",
            canSwitchToParentMeeting: "can_switch_to_parent_meeting",
          }),
        ),
        disableParticipantAudio: Schema.Boolean,
        disableParticipantScreensharing: Schema.Boolean,
        disableParticipantVideo: Schema.Boolean,
        hiddenParticipant: Schema.Boolean,
        kickParticipant: Schema.Boolean,
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
        pinParticipant: Schema.Boolean,
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean),
          canEditConfig: Schema.optional(Schema.Boolean),
          canStart: Schema.optional(Schema.Boolean),
          config: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
                ),
                handlesViewOnly: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  accessControl: "access_control",
                  handlesViewOnly: "handles_view_only",
                }),
              ),
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            canClose: "can_close",
            canEditConfig: "can_edit_config",
            canStart: "can_start",
            config: "config",
          }),
        ),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean),
          canView: Schema.optional(Schema.Boolean),
          canVote: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canCreate: "can_create",
            canView: "can_view",
            canVote: "can_vote",
          }),
        ),
        recorderType: Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
        showParticipantList: Schema.Boolean,
        waitingRoomType: Schema.Literals([
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ]),
        isRecorder: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          acceptWaitingRequests: "accept_waiting_requests",
          canAcceptProductionRequests: "can_accept_production_requests",
          canChangeParticipantPermissions: "can_change_participant_permissions",
          canEditDisplayName: "can_edit_display_name",
          canLivestream: "can_livestream",
          canRecord: "can_record",
          canSpotlight: "can_spotlight",
          chat: "chat",
          connectedMeetings: "connected_meetings",
          disableParticipantAudio: "disable_participant_audio",
          disableParticipantScreensharing: "disable_participant_screensharing",
          disableParticipantVideo: "disable_participant_video",
          hiddenParticipant: "hidden_participant",
          kickParticipant: "kick_participant",
          media: "media",
          pinParticipant: "pin_participant",
          plugins: "plugins",
          polls: "polls",
          recorderType: "recorder_type",
          showParticipantList: "show_participant_list",
          waitingRoomType: "waiting_room_type",
          isRecorder: "is_recorder",
        }),
      ),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<PatchPresetResponse>;

export type PatchPresetError = CommonErrors;

export const patchPreset: API.OperationMethod<
  PatchPresetRequest,
  PatchPresetResponse,
  PatchPresetError,
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
      maxScreenshareCount: Schema.Number,
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
      }),
      viewType: Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
    }).pipe(
      Schema.encodeKeys({
        maxScreenshareCount: "max_screenshare_count",
        maxVideoStreams: "max_video_streams",
        media: "media",
        viewType: "view_type",
      }),
    ),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")),
        borderWidth: Schema.optional(Schema.Literal("thin")),
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
            textOnBrand: Schema.optional(Schema.String),
            videoBg: Schema.optional(Schema.String),
            warning: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              background: "background",
              brand: "brand",
              danger: "danger",
              success: "success",
              text: "text",
              textOnBrand: "text_on_brand",
              videoBg: "video_bg",
              warning: "warning",
            }),
          ),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(
        Schema.encodeKeys({
          borderRadius: "border_radius",
          borderWidth: "border_width",
          colors: "colors",
          logo: "logo",
          spacingBase: "spacing_base",
          theme: "theme",
        }),
      ),
      configDiff: Schema.optional(Schema.Unknown),
    }).pipe(
      Schema.encodeKeys({
        designTokens: "design_tokens",
        configDiff: "config_diff",
      }),
    ),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean,
        canAcceptProductionRequests: Schema.Boolean,
        canChangeParticipantPermissions: Schema.Boolean,
        canEditDisplayName: Schema.Boolean,
        canLivestream: Schema.Boolean,
        canRecord: Schema.Boolean,
        canSpotlight: Schema.Boolean,
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean),
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canReceive: "can_receive",
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canAlterConnectedMeetings: "can_alter_connected_meetings",
            canSwitchConnectedMeetings: "can_switch_connected_meetings",
            canSwitchToParentMeeting: "can_switch_to_parent_meeting",
          }),
        ),
        disableParticipantAudio: Schema.Boolean,
        disableParticipantScreensharing: Schema.Boolean,
        disableParticipantVideo: Schema.Boolean,
        hiddenParticipant: Schema.Boolean,
        kickParticipant: Schema.Boolean,
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
        pinParticipant: Schema.Boolean,
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean),
          canEditConfig: Schema.optional(Schema.Boolean),
          canStart: Schema.optional(Schema.Boolean),
          config: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
                ),
                handlesViewOnly: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  accessControl: "access_control",
                  handlesViewOnly: "handles_view_only",
                }),
              ),
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            canClose: "can_close",
            canEditConfig: "can_edit_config",
            canStart: "can_start",
            config: "config",
          }),
        ),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean),
          canView: Schema.optional(Schema.Boolean),
          canVote: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canCreate: "can_create",
            canView: "can_view",
            canVote: "can_vote",
          }),
        ),
        recorderType: Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
        showParticipantList: Schema.Boolean,
        waitingRoomType: Schema.Literals([
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ]),
        isRecorder: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          acceptWaitingRequests: "accept_waiting_requests",
          canAcceptProductionRequests: "can_accept_production_requests",
          canChangeParticipantPermissions: "can_change_participant_permissions",
          canEditDisplayName: "can_edit_display_name",
          canLivestream: "can_livestream",
          canRecord: "can_record",
          canSpotlight: "can_spotlight",
          chat: "chat",
          connectedMeetings: "connected_meetings",
          disableParticipantAudio: "disable_participant_audio",
          disableParticipantScreensharing: "disable_participant_screensharing",
          disableParticipantVideo: "disable_participant_video",
          hiddenParticipant: "hidden_participant",
          kickParticipant: "kick_participant",
          media: "media",
          pinParticipant: "pin_participant",
          plugins: "plugins",
          polls: "polls",
          recorderType: "recorder_type",
          showParticipantList: "show_participant_list",
          waitingRoomType: "waiting_room_type",
          isRecorder: "is_recorder",
        }),
      ),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeletePresetResponse>;

export type DeletePresetError = CommonErrors;

export const deletePreset: API.OperationMethod<
  DeletePresetRequest,
  DeletePresetResponse,
  DeletePresetError,
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
      maxScreenshareCount: Schema.Number,
      maxVideoStreams: Schema.Struct({
        desktop: Schema.optional(Schema.Number),
        mobile: Schema.optional(Schema.Number),
      }),
      media: Schema.Struct({
        screenshare: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
        video: Schema.optional(
          Schema.Struct({
            canProduce: Schema.optional(
              Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
            ),
          }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
        ),
      }),
      viewType: Schema.Literals(["GROUP_CALL", "WEBINAR", "AUDIO_ROOM"]),
    }).pipe(
      Schema.encodeKeys({
        maxScreenshareCount: "max_screenshare_count",
        maxVideoStreams: "max_video_streams",
        media: "media",
        viewType: "view_type",
      }),
    ),
    name: Schema.String,
    ui: Schema.Struct({
      designTokens: Schema.Struct({
        borderRadius: Schema.optional(Schema.Literal("rounded")),
        borderWidth: Schema.optional(Schema.Literal("thin")),
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
            textOnBrand: Schema.optional(Schema.String),
            videoBg: Schema.optional(Schema.String),
            warning: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              background: "background",
              brand: "brand",
              danger: "danger",
              success: "success",
              text: "text",
              textOnBrand: "text_on_brand",
              videoBg: "video_bg",
              warning: "warning",
            }),
          ),
        ),
        logo: Schema.optional(Schema.String),
        spacingBase: Schema.optional(Schema.Number),
        theme: Schema.optional(Schema.Literal("dark")),
      }).pipe(
        Schema.encodeKeys({
          borderRadius: "border_radius",
          borderWidth: "border_width",
          colors: "colors",
          logo: "logo",
          spacingBase: "spacing_base",
          theme: "theme",
        }),
      ),
      configDiff: Schema.optional(Schema.Unknown),
    }).pipe(
      Schema.encodeKeys({
        designTokens: "design_tokens",
        configDiff: "config_diff",
      }),
    ),
    permissions: Schema.optional(
      Schema.Struct({
        acceptWaitingRequests: Schema.Boolean,
        canAcceptProductionRequests: Schema.Boolean,
        canChangeParticipantPermissions: Schema.Boolean,
        canEditDisplayName: Schema.Boolean,
        canLivestream: Schema.Boolean,
        canRecord: Schema.Boolean,
        canSpotlight: Schema.Boolean,
        chat: Schema.Struct({
          private: Schema.optional(
            Schema.Struct({
              canReceive: Schema.optional(Schema.Boolean),
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canReceive: "can_receive",
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
          public: Schema.optional(
            Schema.Struct({
              canSend: Schema.optional(Schema.Boolean),
              files: Schema.optional(Schema.Boolean),
              text: Schema.optional(Schema.Boolean),
            }).pipe(
              Schema.encodeKeys({
                canSend: "can_send",
                files: "files",
                text: "text",
              }),
            ),
          ),
        }),
        connectedMeetings: Schema.Struct({
          canAlterConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchConnectedMeetings: Schema.optional(Schema.Boolean),
          canSwitchToParentMeeting: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canAlterConnectedMeetings: "can_alter_connected_meetings",
            canSwitchConnectedMeetings: "can_switch_connected_meetings",
            canSwitchToParentMeeting: "can_switch_to_parent_meeting",
          }),
        ),
        disableParticipantAudio: Schema.Boolean,
        disableParticipantScreensharing: Schema.Boolean,
        disableParticipantVideo: Schema.Boolean,
        hiddenParticipant: Schema.Boolean,
        kickParticipant: Schema.Boolean,
        media: Schema.Struct({
          audio: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          screenshare: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
          video: Schema.optional(
            Schema.Struct({
              canProduce: Schema.optional(
                Schema.Literals(["ALLOWED", "NOT_ALLOWED", "CAN_REQUEST"]),
              ),
            }).pipe(Schema.encodeKeys({ canProduce: "can_produce" })),
          ),
        }),
        pinParticipant: Schema.Boolean,
        plugins: Schema.Struct({
          canClose: Schema.optional(Schema.Boolean),
          canEditConfig: Schema.optional(Schema.Boolean),
          canStart: Schema.optional(Schema.Boolean),
          config: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Struct({
                accessControl: Schema.optional(
                  Schema.Literals(["FULL_ACCESS", "VIEW_ONLY"]),
                ),
                handlesViewOnly: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  accessControl: "access_control",
                  handlesViewOnly: "handles_view_only",
                }),
              ),
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            canClose: "can_close",
            canEditConfig: "can_edit_config",
            canStart: "can_start",
            config: "config",
          }),
        ),
        polls: Schema.Struct({
          canCreate: Schema.optional(Schema.Boolean),
          canView: Schema.optional(Schema.Boolean),
          canVote: Schema.optional(Schema.Boolean),
        }).pipe(
          Schema.encodeKeys({
            canCreate: "can_create",
            canView: "can_view",
            canVote: "can_vote",
          }),
        ),
        recorderType: Schema.Literals(["RECORDER", "LIVESTREAMER", "NONE"]),
        showParticipantList: Schema.Boolean,
        waitingRoomType: Schema.Literals([
          "SKIP",
          "ON_PRIVILEGED_USER_ENTRY",
          "SKIP_ON_ACCEPT",
        ]),
        isRecorder: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          acceptWaitingRequests: "accept_waiting_requests",
          canAcceptProductionRequests: "can_accept_production_requests",
          canChangeParticipantPermissions: "can_change_participant_permissions",
          canEditDisplayName: "can_edit_display_name",
          canLivestream: "can_livestream",
          canRecord: "can_record",
          canSpotlight: "can_spotlight",
          chat: "chat",
          connectedMeetings: "connected_meetings",
          disableParticipantAudio: "disable_participant_audio",
          disableParticipantScreensharing: "disable_participant_screensharing",
          disableParticipantVideo: "disable_participant_video",
          hiddenParticipant: "hidden_participant",
          kickParticipant: "kick_participant",
          media: "media",
          pinParticipant: "pin_participant",
          plugins: "plugins",
          polls: "polls",
          recorderType: "recorder_type",
          showParticipantList: "show_participant_list",
          waitingRoomType: "waiting_room_type",
          isRecorder: "is_recorder",
        }),
      ),
    ),
  }),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetPresetByIdPresetResponse>;

export type GetPresetByIdPresetError = CommonErrors;

export const getPresetByIdPreset: API.OperationMethod<
  GetPresetByIdPresetRequest,
  GetPresetByIdPresetResponse,
  GetPresetByIdPresetError,
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
  sortOrder: Schema.optional(Schema.Literals(["ASC", "DESC"])).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(
    Schema.Array(
      Schema.Literals(["INVOKED", "RECORDING", "UPLOADING", "UPLOADED"]),
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
      audioDownloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrlExpiry: Schema.Union([Schema.String, Schema.Null]),
      fileSize: Schema.Union([Schema.Number, Schema.Null]),
      invokedTime: Schema.String,
      outputFileName: Schema.String,
      sessionId: Schema.Union([Schema.String, Schema.Null]),
      startedTime: Schema.Union([Schema.String, Schema.Null]),
      status: Schema.Literals([
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ]),
      stoppedTime: Schema.Union([Schema.String, Schema.Null]),
      meeting: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          createdAt: Schema.String,
          updatedAt: Schema.String,
          liveStreamOnStart: Schema.optional(Schema.Boolean),
          persistChat: Schema.optional(Schema.Boolean),
          recordOnStart: Schema.optional(Schema.Boolean),
          sessionKeepAliveTimeInSecs: Schema.optional(Schema.Number),
          status: Schema.optional(Schema.Literals(["ACTIVE", "INACTIVE"])),
          summarizeOnEnd: Schema.optional(Schema.Boolean),
          title: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            createdAt: "created_at",
            updatedAt: "updated_at",
            liveStreamOnStart: "live_stream_on_start",
            persistChat: "persist_chat",
            recordOnStart: "record_on_start",
            sessionKeepAliveTimeInSecs: "session_keep_alive_time_in_secs",
            status: "status",
            summarizeOnEnd: "summarize_on_end",
            title: "title",
          }),
        ),
      ),
      recordingDuration: Schema.optional(Schema.Number),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        audioDownloadUrl: "audio_download_url",
        downloadUrl: "download_url",
        downloadUrlExpiry: "download_url_expiry",
        fileSize: "file_size",
        invokedTime: "invoked_time",
        outputFileName: "output_file_name",
        sessionId: "session_id",
        startedTime: "started_time",
        status: "status",
        stoppedTime: "stopped_time",
        meeting: "meeting",
        recordingDuration: "recording_duration",
        storageConfig: "storage_config",
      }),
    ),
  ),
  paging: Schema.Struct({
    endOffset: Schema.Number,
    startOffset: Schema.Number,
    totalCount: Schema.Number,
  }).pipe(
    Schema.encodeKeys({
      endOffset: "end_offset",
      startOffset: "start_offset",
      totalCount: "total_count",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetRecordingsRecordingResponse>;

export type GetRecordingsRecordingError = CommonErrors;

export const getRecordingsRecording: API.OperationMethod<
  GetRecordingsRecordingRequest,
  GetRecordingsRecordingResponse,
  GetRecordingsRecordingError,
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
  allowMultipleRecordings: Schema.optional(Schema.Boolean),
  audioConfig: Schema.optional(
    Schema.Struct({
      channel: Schema.optional(Schema.Literals(["mono", "stereo"])),
      codec: Schema.optional(Schema.Literals(["MP3", "AAC"])),
      exportFile: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        channel: "channel",
        codec: "codec",
        exportFile: "export_file",
      }),
    ),
  ),
  fileNamePrefix: Schema.optional(Schema.String),
  interactiveConfig: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.Literal("ID3")),
    }),
  ),
  maxSeconds: Schema.optional(Schema.Number),
  meetingId: Schema.optional(Schema.String),
  realtimekitBucketConfig: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ),
  rtmpOutConfig: Schema.optional(
    Schema.Struct({
      rtmpUrl: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ rtmpUrl: "rtmp_url" })),
  ),
  storageConfig: Schema.optional(
    Schema.Union([
      Schema.Struct({
        type: Schema.Literals(["aws", "azure", "digitalocean", "gcs", "sftp"]),
        accessKey: Schema.optional(Schema.String),
        authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
        bucket: Schema.optional(Schema.String),
        host: Schema.optional(Schema.String),
        password: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
        port: Schema.optional(Schema.Number),
        privateKey: Schema.optional(Schema.String),
        region: Schema.optional(Schema.String),
        secret: Schema.optional(Schema.String),
        username: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          type: "type",
          accessKey: "access_key",
          authMethod: "auth_method",
          bucket: "bucket",
          host: "host",
          password: "password",
          path: "path",
          port: "port",
          privateKey: "private_key",
          region: "region",
          secret: "secret",
          username: "username",
        }),
      ),
      Schema.Null,
    ]),
  ),
  url: Schema.optional(Schema.String),
  videoConfig: Schema.optional(
    Schema.Struct({
      codec: Schema.optional(Schema.Literals(["H264", "VP8"])),
      exportFile: Schema.optional(Schema.Boolean),
      height: Schema.optional(Schema.Number),
      watermark: Schema.optional(
        Schema.Struct({
          position: Schema.optional(
            Schema.Literals([
              "left top",
              "right top",
              "left bottom",
              "right bottom",
            ]),
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
    }).pipe(
      Schema.encodeKeys({
        codec: "codec",
        exportFile: "export_file",
        height: "height",
        watermark: "watermark",
        width: "width",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    allowMultipleRecordings: "allow_multiple_recordings",
    audioConfig: "audio_config",
    fileNamePrefix: "file_name_prefix",
    interactiveConfig: "interactive_config",
    maxSeconds: "max_seconds",
    meetingId: "meeting_id",
    realtimekitBucketConfig: "realtimekit_bucket_config",
    rtmpOutConfig: "rtmp_out_config",
    storageConfig: "storage_config",
    url: "url",
    videoConfig: "video_config",
  }),
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
      audioDownloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrlExpiry: Schema.Union([Schema.String, Schema.Null]),
      fileSize: Schema.Union([Schema.Number, Schema.Null]),
      invokedTime: Schema.String,
      outputFileName: Schema.String,
      sessionId: Schema.Union([Schema.String, Schema.Null]),
      startedTime: Schema.Union([Schema.String, Schema.Null]),
      status: Schema.Literals([
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ]),
      stoppedTime: Schema.Union([Schema.String, Schema.Null]),
      recordingDuration: Schema.optional(Schema.Number),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "RECORD_ON_START"]),
          ),
        }),
      ),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"]),
          ),
        }),
      ),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        audioDownloadUrl: "audio_download_url",
        downloadUrl: "download_url",
        downloadUrlExpiry: "download_url_expiry",
        fileSize: "file_size",
        invokedTime: "invoked_time",
        outputFileName: "output_file_name",
        sessionId: "session_id",
        startedTime: "started_time",
        status: "status",
        stoppedTime: "stopped_time",
        recordingDuration: "recording_duration",
        startReason: "start_reason",
        stopReason: "stop_reason",
        storageConfig: "storage_config",
      }),
    ),
  ),
}) as unknown as Schema.Schema<StartRecordingsRecordingResponse>;

export type StartRecordingsRecordingError = CommonErrors;

export const startRecordingsRecording: API.OperationMethod<
  StartRecordingsRecordingRequest,
  StartRecordingsRecordingResponse,
  StartRecordingsRecordingError,
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
  action: Schema.Literals(["stop", "pause", "resume"]),
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
      audioDownloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrl: Schema.Union([Schema.String, Schema.Null]),
      downloadUrlExpiry: Schema.Union([Schema.String, Schema.Null]),
      fileSize: Schema.Union([Schema.Number, Schema.Null]),
      invokedTime: Schema.String,
      outputFileName: Schema.String,
      sessionId: Schema.Union([Schema.String, Schema.Null]),
      startedTime: Schema.Union([Schema.String, Schema.Null]),
      status: Schema.Literals([
        "INVOKED",
        "RECORDING",
        "UPLOADING",
        "UPLOADED",
        "ERRORED",
        "PAUSED",
      ]),
      stoppedTime: Schema.Union([Schema.String, Schema.Null]),
      recordingDuration: Schema.optional(Schema.Number),
      startReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "RECORD_ON_START"]),
          ),
        }),
      ),
      stopReason: Schema.optional(
        Schema.Struct({
          caller: Schema.optional(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["ORGANIZATION", "USER"])),
              user_Id: Schema.optional(Schema.String),
            }),
          ),
          reason: Schema.optional(
            Schema.Literals(["API_CALL", "INTERNAL_ERROR", "ALL_PEERS_LEFT"]),
          ),
        }),
      ),
      storageConfig: Schema.optional(
        Schema.Union([
          Schema.Struct({
            type: Schema.Literals([
              "aws",
              "azure",
              "digitalocean",
              "gcs",
              "sftp",
            ]),
            authMethod: Schema.optional(Schema.Literals(["KEY", "PASSWORD"])),
            bucket: Schema.optional(Schema.String),
            host: Schema.optional(Schema.String),
            password: Schema.optional(Schema.String),
            path: Schema.optional(Schema.String),
            port: Schema.optional(Schema.Number),
            privateKey: Schema.optional(Schema.String),
            region: Schema.optional(Schema.String),
            secret: Schema.optional(Schema.String),
            username: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              type: "type",
              authMethod: "auth_method",
              bucket: "bucket",
              host: "host",
              password: "password",
              path: "path",
              port: "port",
              privateKey: "private_key",
              region: "region",
              secret: "secret",
              username: "username",
            }),
          ),
          Schema.Null,
        ]),
      ),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        audioDownloadUrl: "audio_download_url",
        downloadUrl: "download_url",
        downloadUrlExpiry: "download_url_expiry",
        fileSize: "file_size",
        invokedTime: "invoked_time",
        outputFileName: "output_file_name",
        sessionId: "session_id",
        startedTime: "started_time",
        status: "status",
        stoppedTime: "stopped_time",
        recordingDuration: "recording_duration",
        startReason: "start_reason",
        stopReason: "stop_reason",
        storageConfig: "storage_config",
      }),
    ),
  ),
}) as unknown as Schema.Schema<PauseResumeStopRecordingRecordingResponse>;

export type PauseResumeStopRecordingRecordingError = CommonErrors;

export const pauseResumeStopRecordingRecording: API.OperationMethod<
  PauseResumeStopRecordingRecordingRequest,
  PauseResumeStopRecordingRecordingResponse,
  PauseResumeStopRecordingRecordingError,
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
      chatDownloadUrl: Schema.String,
      chatDownloadUrlExpiry: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        chatDownloadUrl: "chat_download_url",
        chatDownloadUrlExpiry: "chat_download_url_expiry",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionChatSessionResponse>;

export type GetSessionChatSessionError = CommonErrors;

export const getSessionChatSession: API.OperationMethod<
  GetSessionChatSessionRequest,
  GetSessionChatSessionResponse,
  GetSessionChatSessionError,
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
          associatedId: Schema.String,
          createdAt: Schema.String,
          liveParticipants: Schema.Number,
          maxConcurrentParticipants: Schema.Number,
          meetingDisplayName: Schema.String,
          minutesConsumed: Schema.Number,
          organizationId: Schema.String,
          startedAt: Schema.String,
          status: Schema.Literals(["LIVE", "ENDED"]),
          type: Schema.Literals(["meeting", "livestream", "participant"]),
          updatedAt: Schema.String,
          breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)),
          endedAt: Schema.optional(Schema.String),
          meta: Schema.optional(Schema.Unknown),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            associatedId: "associated_id",
            createdAt: "created_at",
            liveParticipants: "live_participants",
            maxConcurrentParticipants: "max_concurrent_participants",
            meetingDisplayName: "meeting_display_name",
            minutesConsumed: "minutes_consumed",
            organizationId: "organization_id",
            startedAt: "started_at",
            status: "status",
            type: "type",
            updatedAt: "updated_at",
            breakoutRooms: "breakout_rooms",
            endedAt: "ended_at",
            meta: "meta",
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionDetailsSessionResponse>;

export type GetSessionDetailsSessionError = CommonErrors;

export const getSessionDetailsSession: API.OperationMethod<
  GetSessionDetailsSessionRequest,
  GetSessionDetailsSessionResponse,
  GetSessionDetailsSessionError,
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
    Schema.Literals([
      "device_info",
      "ip_information",
      "precall_network_information",
      "events",
      "quality_stats",
    ]),
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
          createdAt: Schema.optional(Schema.String),
          customParticipantId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          duration: Schema.optional(Schema.Number),
          joinedAt: Schema.optional(Schema.String),
          leftAt: Schema.optional(Schema.String),
          presetName: Schema.optional(Schema.String),
          updatedAt: Schema.optional(Schema.String),
          userId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            createdAt: "created_at",
            customParticipantId: "custom_participant_id",
            displayName: "display_name",
            duration: "duration",
            joinedAt: "joined_at",
            leftAt: "left_at",
            presetName: "preset_name",
            updatedAt: "updated_at",
            userId: "user_id",
          }),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionParticipantDetailsSessionResponse>;

export type GetSessionParticipantDetailsSessionError = CommonErrors;

export const getSessionParticipantDetailsSession: API.OperationMethod<
  GetSessionParticipantDetailsSessionRequest,
  GetSessionParticipantDetailsSessionResponse,
  GetSessionParticipantDetailsSessionError,
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
  sortBy: Schema.optional(Schema.Literals(["joinedAt", "duration"])).pipe(
    T.HttpQuery("sort_by"),
  ),
  sortOrder: Schema.optional(Schema.Literals(["ASC", "DESC"])).pipe(
    T.HttpQuery("sort_order"),
  ),
  view: Schema.optional(Schema.Literals(["raw", "consolidated"])).pipe(
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
            createdAt: Schema.optional(Schema.String),
            customParticipantId: Schema.optional(Schema.String),
            displayName: Schema.optional(Schema.String),
            duration: Schema.optional(Schema.Number),
            joinedAt: Schema.optional(Schema.String),
            leftAt: Schema.optional(Schema.String),
            presetName: Schema.optional(Schema.String),
            updatedAt: Schema.optional(Schema.String),
            userId: Schema.optional(Schema.String),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              createdAt: "created_at",
              customParticipantId: "custom_participant_id",
              displayName: "display_name",
              duration: "duration",
              joinedAt: "joined_at",
              leftAt: "left_at",
              presetName: "preset_name",
              updatedAt: "updated_at",
              userId: "user_id",
            }),
          ),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionParticipantsSessionResponse>;

export type GetSessionParticipantsSessionError = CommonErrors;

export const getSessionParticipantsSession: API.OperationMethod<
  GetSessionParticipantsSessionRequest,
  GetSessionParticipantsSessionResponse,
  GetSessionParticipantsSessionError,
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
  sortBy: Schema.optional(
    Schema.Literals(["minutesConsumed", "createdAt"]),
  ).pipe(T.HttpQuery("sort_by")),
  sortOrder: Schema.optional(Schema.Literals(["ASC", "DESC"])).pipe(
    T.HttpQuery("sort_order"),
  ),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("start_time")),
  status: Schema.optional(Schema.Literals(["LIVE", "ENDED"])).pipe(
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
            associatedId: Schema.String,
            createdAt: Schema.String,
            liveParticipants: Schema.Number,
            maxConcurrentParticipants: Schema.Number,
            meetingDisplayName: Schema.String,
            minutesConsumed: Schema.Number,
            organizationId: Schema.String,
            startedAt: Schema.String,
            status: Schema.Literals(["LIVE", "ENDED"]),
            type: Schema.Literals(["meeting", "livestream", "participant"]),
            updatedAt: Schema.String,
            breakoutRooms: Schema.optional(Schema.Array(Schema.Unknown)),
            endedAt: Schema.optional(Schema.String),
            meta: Schema.optional(Schema.Unknown),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              associatedId: "associated_id",
              createdAt: "created_at",
              liveParticipants: "live_participants",
              maxConcurrentParticipants: "max_concurrent_participants",
              meetingDisplayName: "meeting_display_name",
              minutesConsumed: "minutes_consumed",
              organizationId: "organization_id",
              startedAt: "started_at",
              status: "status",
              type: "type",
              updatedAt: "updated_at",
              breakoutRooms: "breakout_rooms",
              endedAt: "ended_at",
              meta: "meta",
            }),
          ),
        ),
      ),
    }),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionsSessionResponse>;

export type GetSessionsSessionError = CommonErrors;

export const getSessionsSession: API.OperationMethod<
  GetSessionsSessionRequest,
  GetSessionsSessionResponse,
  GetSessionsSessionError,
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

export type GetSessionSummarySessionError = CommonErrors;

export const getSessionSummarySession: API.OperationMethod<
  GetSessionSummarySessionRequest,
  GetSessionSummarySessionResponse,
  GetSessionSummarySessionError,
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
      transcriptDownloadUrl: Schema.String,
      transcriptDownloadUrlExpiry: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        sessionId: "sessionId",
        transcriptDownloadUrl: "transcript_download_url",
        transcriptDownloadUrlExpiry: "transcript_download_url_expiry",
      }),
    ),
  ),
  success: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetSessionTranscriptsSessionResponse>;

export type GetSessionTranscriptsSessionError = CommonErrors;

export const getSessionTranscriptsSession: API.OperationMethod<
  GetSessionTranscriptsSessionRequest,
  GetSessionTranscriptsSessionResponse,
  GetSessionTranscriptsSessionError,
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

export type GenerateSummaryOfTranscriptsSessionError = CommonErrors;

export const generateSummaryOfTranscriptsSession: API.OperationMethod<
  GenerateSummaryOfTranscriptsSessionRequest,
  GenerateSummaryOfTranscriptsSessionResponse,
  GenerateSummaryOfTranscriptsSessionError,
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
  meetingId: Schema.String,
  maxSeconds: Schema.optional(Schema.Number),
}).pipe(
  Schema.encodeKeys({
    layers: "layers",
    meetingId: "meeting_id",
    maxSeconds: "max_seconds",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/realtime/kit/{appId}/recordings/track",
  }),
) as unknown as Schema.Schema<StartTrackRecordingRecordingRequest>;

export type StartTrackRecordingRecordingResponse = unknown;

export const StartTrackRecordingRecordingResponse =
  Schema.Unknown as unknown as Schema.Schema<StartTrackRecordingRecordingResponse>;

export type StartTrackRecordingRecordingError = CommonErrors;

export const startTrackRecordingRecording: API.OperationMethod<
  StartTrackRecordingRecordingRequest,
  StartTrackRecordingRecordingResponse,
  StartTrackRecordingRecordingError,
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
    createdAt: Schema.String,
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ]),
    ),
    name: Schema.String,
    updatedAt: Schema.String,
    url: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      enabled: "enabled",
      events: "events",
      name: "name",
      updatedAt: "updated_at",
      url: "url",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetWebhookByIdWebhookResponse>;

export type GetWebhookByIdWebhookError = CommonErrors;

export const getWebhookByIdWebhook: API.OperationMethod<
  GetWebhookByIdWebhookRequest,
  GetWebhookByIdWebhookResponse,
  GetWebhookByIdWebhookError,
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
      createdAt: Schema.String,
      enabled: Schema.Boolean,
      events: Schema.Array(
        Schema.Literals([
          "meeting.started",
          "meeting.ended",
          "meeting.participantJoined",
          "meeting.participantLeft",
          "meeting.chatSynced",
          "recording.statusUpdate",
          "livestreaming.statusUpdate",
          "meeting.transcript",
          "meeting.summary",
        ]),
      ),
      name: Schema.String,
      updatedAt: Schema.String,
      url: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        enabled: "enabled",
        events: "events",
        name: "name",
        updatedAt: "updated_at",
        url: "url",
      }),
    ),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<GetWebhooksWebhookResponse>;

export type GetWebhooksWebhookError = CommonErrors;

export const getWebhooksWebhook: API.OperationMethod<
  GetWebhooksWebhookRequest,
  GetWebhooksWebhookResponse,
  GetWebhooksWebhookError,
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
    Schema.Literals([
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary",
    ]),
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
    createdAt: Schema.String,
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ]),
    ),
    name: Schema.String,
    updatedAt: Schema.String,
    url: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      enabled: "enabled",
      events: "events",
      name: "name",
      updatedAt: "updated_at",
      url: "url",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<CreateWebhookWebhookResponse>;

export type CreateWebhookWebhookError = CommonErrors;

export const createWebhookWebhook: API.OperationMethod<
  CreateWebhookWebhookRequest,
  CreateWebhookWebhookResponse,
  CreateWebhookWebhookError,
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
    createdAt: Schema.String,
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ]),
    ),
    name: Schema.String,
    updatedAt: Schema.String,
    url: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      enabled: "enabled",
      events: "events",
      name: "name",
      updatedAt: "updated_at",
      url: "url",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DeleteWebhookWebhookResponse>;

export type DeleteWebhookWebhookError = CommonErrors;

export const deleteWebhookWebhook: API.OperationMethod<
  DeleteWebhookWebhookRequest,
  DeleteWebhookWebhookResponse,
  DeleteWebhookWebhookError,
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
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.chatSynced",
        "meeting.transcript",
        "meeting.summary",
      ]),
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
    createdAt: Schema.String,
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ]),
    ),
    name: Schema.String,
    updatedAt: Schema.String,
    url: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      enabled: "enabled",
      events: "events",
      name: "name",
      updatedAt: "updated_at",
      url: "url",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<EditWebhookWebhookResponse>;

export type EditWebhookWebhookError = CommonErrors;

export const editWebhookWebhook: API.OperationMethod<
  EditWebhookWebhookRequest,
  EditWebhookWebhookResponse,
  EditWebhookWebhookError,
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
    Schema.Literals([
      "meeting.started",
      "meeting.ended",
      "meeting.participantJoined",
      "meeting.participantLeft",
      "meeting.chatSynced",
      "recording.statusUpdate",
      "livestreaming.statusUpdate",
      "meeting.transcript",
      "meeting.summary",
    ]),
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
    createdAt: Schema.String,
    enabled: Schema.Boolean,
    events: Schema.Array(
      Schema.Literals([
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary",
      ]),
    ),
    name: Schema.String,
    updatedAt: Schema.String,
    url: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      enabled: "enabled",
      events: "events",
      name: "name",
      updatedAt: "updated_at",
      url: "url",
    }),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<ReplaceWebhookWebhookResponse>;

export type ReplaceWebhookWebhookError = CommonErrors;

export const replaceWebhookWebhook: API.OperationMethod<
  ReplaceWebhookWebhookRequest,
  ReplaceWebhookWebhookResponse,
  ReplaceWebhookWebhookError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ReplaceWebhookWebhookRequest,
  output: ReplaceWebhookWebhookResponse,
  errors: [],
}));
