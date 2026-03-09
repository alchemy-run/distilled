/**
 * Cloudflare STREAM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service stream
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// AudioTrack
// =============================================================================

export interface GetAudioTrackRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetAudioTrackRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/{identifier}/audio",
  }),
) as unknown as Schema.Schema<GetAudioTrackRequest>;

export type GetAudioTrackResponse = {
  default?: boolean | null;
  label?: string | null;
  status?: "queued" | "ready" | "error" | null;
  uid?: string | null;
}[];

export const GetAudioTrackResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    default: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["queued", "ready", "error"]),
        Schema.Null,
      ]),
    ),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<GetAudioTrackResponse>;

export type GetAudioTrackError = DefaultErrors;

export const getAudioTrack: API.OperationMethod<
  GetAudioTrackRequest,
  GetAudioTrackResponse,
  GetAudioTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAudioTrackRequest,
  output: GetAudioTrackResponse,
  errors: [],
}));

export interface PatchAudioTrackRequest {
  identifier: string;
  audioIdentifier: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Denotes whether the audio track will be played by default in a player. */
  default?: boolean;
  /** Body param: A string to uniquely identify the track amongst other audio track labels for the specified video. */
  label?: string;
}

export const PatchAudioTrackRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    audioIdentifier: Schema.String.pipe(T.HttpPath("audioIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    default: Schema.optional(Schema.Boolean),
    label: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/stream/{identifier}/audio/{audioIdentifier}",
  }),
) as unknown as Schema.Schema<PatchAudioTrackRequest>;

export interface PatchAudioTrackResponse {
  /** Denotes whether the audio track will be played by default in a player. */
  default?: boolean | null;
  /** A string to uniquely identify the track amongst other audio track labels for the specified video. */
  label?: string | null;
  /** Specifies the processing status of the video. */
  status?: "queued" | "ready" | "error" | null;
  /** A Cloudflare-generated unique identifier for a media item. */
  uid?: string | null;
}

export const PatchAudioTrackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    default: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["queued", "ready", "error"]),
        Schema.Null,
      ]),
    ),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<PatchAudioTrackResponse>;

export type PatchAudioTrackError = DefaultErrors;

export const patchAudioTrack: API.OperationMethod<
  PatchAudioTrackRequest,
  PatchAudioTrackResponse,
  PatchAudioTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAudioTrackRequest,
  output: PatchAudioTrackResponse,
  errors: [],
}));

export interface DeleteAudioTrackRequest {
  identifier: string;
  audioIdentifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteAudioTrackRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    audioIdentifier: Schema.String.pipe(T.HttpPath("audioIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/stream/{identifier}/audio/{audioIdentifier}",
    }),
  ) as unknown as Schema.Schema<DeleteAudioTrackRequest>;

export type DeleteAudioTrackResponse = string;

export const DeleteAudioTrackResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteAudioTrackResponse>;

export type DeleteAudioTrackError = DefaultErrors;

export const deleteAudioTrack: API.OperationMethod<
  DeleteAudioTrackRequest,
  DeleteAudioTrackResponse,
  DeleteAudioTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAudioTrackRequest,
  output: DeleteAudioTrackResponse,
  errors: [],
}));

export interface CopyAudioTrackRequest {
  identifier: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: A string to uniquely identify the track amongst other audio track labels for the specified video. */
  label: string;
  /** Body param: An audio track URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-r */
  url?: string;
}

export const CopyAudioTrackRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  label: Schema.String,
  url: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/stream/{identifier}/audio/copy",
  }),
) as unknown as Schema.Schema<CopyAudioTrackRequest>;

export interface CopyAudioTrackResponse {
  /** Denotes whether the audio track will be played by default in a player. */
  default?: boolean | null;
  /** A string to uniquely identify the track amongst other audio track labels for the specified video. */
  label?: string | null;
  /** Specifies the processing status of the video. */
  status?: "queued" | "ready" | "error" | null;
  /** A Cloudflare-generated unique identifier for a media item. */
  uid?: string | null;
}

export const CopyAudioTrackResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    default: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["queued", "ready", "error"]),
        Schema.Null,
      ]),
    ),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
) as unknown as Schema.Schema<CopyAudioTrackResponse>;

export type CopyAudioTrackError = DefaultErrors;

export const copyAudioTrack: API.OperationMethod<
  CopyAudioTrackRequest,
  CopyAudioTrackResponse,
  CopyAudioTrackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CopyAudioTrackRequest,
  output: CopyAudioTrackResponse,
  errors: [],
}));

// =============================================================================
// Caption
// =============================================================================

export interface GetCaptionRequest {
  identifier: string;
  /** Identifier. */
  accountId: string;
}

export const GetCaptionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/{identifier}/captions",
  }),
) as unknown as Schema.Schema<GetCaptionRequest>;

export type GetCaptionResponse = {
  generated?: boolean | null;
  label?: string | null;
  language?: string | null;
  status?: "ready" | "inprogress" | "error" | null;
}[];

export const GetCaptionResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    generated: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    label: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    language: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["ready", "inprogress", "error"]),
        Schema.Null,
      ]),
    ),
  }),
) as unknown as Schema.Schema<GetCaptionResponse>;

export type GetCaptionError = DefaultErrors;

export const getCaption: API.OperationMethod<
  GetCaptionRequest,
  GetCaptionResponse,
  GetCaptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCaptionRequest,
  output: GetCaptionResponse,
  errors: [],
}));

// =============================================================================
// CaptionLanguage
// =============================================================================

export interface GetCaptionLanguageRequest {
  identifier: string;
  language: string;
  /** Identifier. */
  accountId: string;
}

export const GetCaptionLanguageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    language: Schema.String.pipe(T.HttpPath("language")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/stream/{identifier}/captions/{language}",
    }),
  ) as unknown as Schema.Schema<GetCaptionLanguageRequest>;

export type GetCaptionLanguageResponse = unknown;

export const GetCaptionLanguageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetCaptionLanguageResponse>;

export type GetCaptionLanguageError = DefaultErrors;

export const getCaptionLanguage: API.OperationMethod<
  GetCaptionLanguageRequest,
  GetCaptionLanguageResponse,
  GetCaptionLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCaptionLanguageRequest,
  output: GetCaptionLanguageResponse,
  errors: [],
}));

export interface CreateCaptionLanguageRequest {
  identifier: string;
  language: string;
  /** Identifier. */
  accountId: string;
}

export const CreateCaptionLanguageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    language: Schema.String.pipe(T.HttpPath("language")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/stream/{identifier}/captions/{language}/generate",
    }),
  ) as unknown as Schema.Schema<CreateCaptionLanguageRequest>;

export type CreateCaptionLanguageResponse = unknown;

export const CreateCaptionLanguageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateCaptionLanguageResponse>;

export type CreateCaptionLanguageError = DefaultErrors;

export const createCaptionLanguage: API.OperationMethod<
  CreateCaptionLanguageRequest,
  CreateCaptionLanguageResponse,
  CreateCaptionLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCaptionLanguageRequest,
  output: CreateCaptionLanguageResponse,
  errors: [],
}));

export interface UpdateCaptionLanguageRequest {
  identifier: string;
  language: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The WebVTT file containing the caption or subtitle content. */
  file: string;
}

export const UpdateCaptionLanguageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    language: Schema.String.pipe(T.HttpPath("language")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    file: Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/stream/{identifier}/captions/{language}",
      contentType: "multipart",
    }),
  ) as unknown as Schema.Schema<UpdateCaptionLanguageRequest>;

export type UpdateCaptionLanguageResponse = unknown;

export const UpdateCaptionLanguageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<UpdateCaptionLanguageResponse>;

export type UpdateCaptionLanguageError = DefaultErrors;

export const updateCaptionLanguage: API.OperationMethod<
  UpdateCaptionLanguageRequest,
  UpdateCaptionLanguageResponse,
  UpdateCaptionLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCaptionLanguageRequest,
  output: UpdateCaptionLanguageResponse,
  errors: [],
}));

export interface DeleteCaptionLanguageRequest {
  identifier: string;
  language: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteCaptionLanguageRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    language: Schema.String.pipe(T.HttpPath("language")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/stream/{identifier}/captions/{language}",
    }),
  ) as unknown as Schema.Schema<DeleteCaptionLanguageRequest>;

export type DeleteCaptionLanguageResponse = string;

export const DeleteCaptionLanguageResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteCaptionLanguageResponse>;

export type DeleteCaptionLanguageError = DefaultErrors;

export const deleteCaptionLanguage: API.OperationMethod<
  DeleteCaptionLanguageRequest,
  DeleteCaptionLanguageResponse,
  DeleteCaptionLanguageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCaptionLanguageRequest,
  output: DeleteCaptionLanguageResponse,
  errors: [],
}));

// =============================================================================
// CaptionLanguageVtt
// =============================================================================

export interface GetCaptionLanguageVttRequest {
  identifier: string;
  language: string;
  /** Identifier. */
  accountId: string;
}

export const GetCaptionLanguageVttRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    language: Schema.String.pipe(T.HttpPath("language")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt",
    }),
  ) as unknown as Schema.Schema<GetCaptionLanguageVttRequest>;

export type GetCaptionLanguageVttResponse = unknown;

export const GetCaptionLanguageVttResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetCaptionLanguageVttResponse>;

export type GetCaptionLanguageVttError = DefaultErrors;

export const getCaptionLanguageVtt: API.OperationMethod<
  GetCaptionLanguageVttRequest,
  GetCaptionLanguageVttResponse,
  GetCaptionLanguageVttError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCaptionLanguageVttRequest,
  output: GetCaptionLanguageVttResponse,
  errors: [],
}));

// =============================================================================
// Clip
// =============================================================================

export interface CreateClipRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The unique video identifier (UID). */
  clippedFromVideoUID: string;
  /** Body param: Specifies the end time for the video clip in seconds. */
  endTimeSeconds: number;
  /** Body param: Specifies the start time for the video clip in seconds. */
  startTimeSeconds: number;
  /** Body param: Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[];
  /** Body param: A user-defined identifier for the media creator. */
  creator?: string;
  /** Body param: The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during proce */
  maxDurationSeconds?: number;
  /** Body param: Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean;
  /** Body param: The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the t */
  thumbnailTimestampPct?: number;
  /** Body param: */
  watermark?: { uid?: string };
}

export const CreateClipRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  clippedFromVideoUID: Schema.String,
  endTimeSeconds: Schema.Number,
  startTimeSeconds: Schema.Number,
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  creator: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  watermark: Schema.optional(
    Schema.Struct({
      uid: Schema.optional(Schema.String),
    }),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/clip" }),
) as unknown as Schema.Schema<CreateClipRequest>;

export interface CreateClipResponse {
  /** Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[] | null;
  /** The unique video identifier (UID). */
  clippedFromVideoUID?: string | null;
  /** The date and time the clip was created. */
  created?: string | null;
  /** A user-defined identifier for the media creator. */
  creator?: string | null;
  /** Specifies the end time for the video clip in seconds. */
  endTimeSeconds?: number | null;
  /** The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A val */
  maxDurationSeconds?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown | null;
  /** The date and time the live input was last modified. */
  modified?: string | null;
  playback?: { dash?: string | null; hls?: string | null } | null;
  /** The video's preview page URI. This field is omitted until encoding is complete. */
  preview?: string | null;
  /** Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean | null;
  /** Specifies the start time for the video clip in seconds. */
  startTimeSeconds?: number | null;
  /** Specifies the processing status for all quality levels for a video. */
  status?:
    | "pendingupload"
    | "downloading"
    | "queued"
    | "inprogress"
    | "ready"
    | "error"
    | "live-inprogress"
    | null;
  /** The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duratio */
  thumbnailTimestampPct?: number | null;
  watermark?: { uid?: string | null } | null;
}

export const CreateClipResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  allowedOrigins: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  clippedFromVideoUID: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  endTimeSeconds: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  maxDurationSeconds: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  playback: Schema.optional(
    Schema.Union([
      Schema.Struct({
        dash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        hls: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  preview: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  startTimeSeconds: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "pendingupload",
        "downloading",
        "queued",
        "inprogress",
        "ready",
        "error",
        "live-inprogress",
      ]),
      Schema.Null,
    ]),
  ),
  thumbnailTimestampPct: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  watermark: Schema.optional(
    Schema.Union([
      Schema.Struct({
        uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<CreateClipResponse>;

export type CreateClipError = DefaultErrors;

export const createClip: API.OperationMethod<
  CreateClipRequest,
  CreateClipResponse,
  CreateClipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateClipRequest,
  output: CreateClipResponse,
  errors: [],
}));

// =============================================================================
// Copy
// =============================================================================

export interface CreateCopyRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Header param: A user-defined identifier for the media creator. */
  uploadCreator?: string;
  /** Body param: A video's URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` */
  url: string;
  /** Body param: Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[];
  /** Body param: A user-defined identifier for the media creator. */
  creator?: string;
  /** Body param: A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown;
  /** Body param: Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean;
  /** Body param: Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, */
  scheduledDeletion?: string;
  /** Body param: The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the t */
  thumbnailTimestampPct?: number;
  /** Body param: */
  watermark?: { uid?: string };
}

export const CreateCopyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  uploadCreator: Schema.optional(Schema.String).pipe(
    T.HttpHeader("Upload-Creator"),
  ),
  url: Schema.String,
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  creator: Schema.optional(Schema.String),
  meta: Schema.optional(Schema.Unknown),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  watermark: Schema.optional(
    Schema.Struct({
      uid: Schema.optional(Schema.String),
    }),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/copy" }),
) as unknown as Schema.Schema<CreateCopyRequest>;

export type CreateCopyResponse = unknown;

export const CreateCopyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateCopyResponse>;

export type CreateCopyError = DefaultErrors;

export const createCopy: API.OperationMethod<
  CreateCopyRequest,
  CreateCopyResponse,
  CreateCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCopyRequest,
  output: CreateCopyResponse,
  errors: [],
}));

// =============================================================================
// DirectUpload
// =============================================================================

export interface CreateDirectUploadRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Header param: A user-defined identifier for the media creator. */
  uploadCreator?: string;
  /** Body param: The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during proce */
  maxDurationSeconds: number;
  /** Body param: Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[];
  /** Body param: A user-defined identifier for the media creator. */
  creator?: string;
  /** Body param: The date and time after upload when videos will not be accepted. */
  expiry?: string;
  /** Body param: A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown;
  /** Body param: Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean;
  /** Body param: Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, */
  scheduledDeletion?: string;
  /** Body param: The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the t */
  thumbnailTimestampPct?: number;
  /** Body param: */
  watermark?: { uid?: string };
}

export const CreateDirectUploadRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    uploadCreator: Schema.optional(Schema.String).pipe(
      T.HttpHeader("Upload-Creator"),
    ),
    maxDurationSeconds: Schema.Number,
    allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
    creator: Schema.optional(Schema.String),
    expiry: Schema.optional(Schema.String),
    meta: Schema.optional(Schema.Unknown),
    requireSignedURLs: Schema.optional(Schema.Boolean),
    scheduledDeletion: Schema.optional(Schema.String),
    thumbnailTimestampPct: Schema.optional(Schema.Number),
    watermark: Schema.optional(
      Schema.Struct({
        uid: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/stream/direct_upload",
    }),
  ) as unknown as Schema.Schema<CreateDirectUploadRequest>;

export interface CreateDirectUploadResponse {
  /** Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at  */
  scheduledDeletion?: string | null;
  /** A Cloudflare-generated unique identifier for a media item. */
  uid?: string | null;
  /** The URL an unauthenticated upload can use for a single `HTTP POST multipart/form-data` request. */
  uploadURL?: string | null;
  watermark?: unknown | null;
}

export const CreateDirectUploadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scheduledDeletion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadURL: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    watermark: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  }) as unknown as Schema.Schema<CreateDirectUploadResponse>;

export type CreateDirectUploadError = DefaultErrors;

export const createDirectUpload: API.OperationMethod<
  CreateDirectUploadRequest,
  CreateDirectUploadResponse,
  CreateDirectUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDirectUploadRequest,
  output: CreateDirectUploadResponse,
  errors: [],
}));

// =============================================================================
// Download
// =============================================================================

export interface GetDownloadRequest {
  identifier: string;
  /** Identifier. */
  accountId: string;
}

export const GetDownloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/{identifier}/downloads",
  }),
) as unknown as Schema.Schema<GetDownloadRequest>;

export interface GetDownloadResponse {
  /** The audio-only download. Only present if this download type has been created. */
  audio?: {
    percentComplete?: number | null;
    status?: "ready" | "inprogress" | "error" | null;
    url?: string | null;
  } | null;
  /** The default video download. Only present if this download type has been created. */
  default?: {
    percentComplete?: number | null;
    status?: "ready" | "inprogress" | "error" | null;
    url?: string | null;
  } | null;
}

export const GetDownloadResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  audio: Schema.optional(
    Schema.Union([
      Schema.Struct({
        percentComplete: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals(["ready", "inprogress", "error"]),
            Schema.Null,
          ]),
        ),
        url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  default: Schema.optional(
    Schema.Union([
      Schema.Struct({
        percentComplete: Schema.optional(
          Schema.Union([Schema.Number, Schema.Null]),
        ),
        status: Schema.optional(
          Schema.Union([
            Schema.Literals(["ready", "inprogress", "error"]),
            Schema.Null,
          ]),
        ),
        url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<GetDownloadResponse>;

export type GetDownloadError = DefaultErrors;

export const getDownload: API.OperationMethod<
  GetDownloadRequest,
  GetDownloadResponse,
  GetDownloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDownloadRequest,
  output: GetDownloadResponse,
  errors: [],
}));

export interface CreateDownloadRequest {
  identifier: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const CreateDownloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/stream/{identifier}/downloads",
  }),
) as unknown as Schema.Schema<CreateDownloadRequest>;

export interface CreateDownloadResponse {
  /** Indicates the progress as a percentage between 0 and 100. */
  percentComplete?: number | null;
  /** The status of a generated download. */
  status?: "ready" | "inprogress" | "error" | null;
  /** The URL to access the generated download. */
  url?: string | null;
}

export const CreateDownloadResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    percentComplete: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["ready", "inprogress", "error"]),
        Schema.Null,
      ]),
    ),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
) as unknown as Schema.Schema<CreateDownloadResponse>;

export type CreateDownloadError = DefaultErrors;

export const createDownload: API.OperationMethod<
  CreateDownloadRequest,
  CreateDownloadResponse,
  CreateDownloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDownloadRequest,
  output: CreateDownloadResponse,
  errors: [],
}));

export interface DeleteDownloadRequest {
  identifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteDownloadRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/stream/{identifier}/downloads",
  }),
) as unknown as Schema.Schema<DeleteDownloadRequest>;

export type DeleteDownloadResponse = string;

export const DeleteDownloadResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteDownloadResponse>;

export type DeleteDownloadError = DefaultErrors;

export const deleteDownload: API.OperationMethod<
  DeleteDownloadRequest,
  DeleteDownloadResponse,
  DeleteDownloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDownloadRequest,
  output: DeleteDownloadResponse,
  errors: [],
}));

// =============================================================================
// Embed
// =============================================================================

export interface GetEmbedRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetEmbedRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/{identifier}/embed",
  }),
) as unknown as Schema.Schema<GetEmbedRequest>;

export type GetEmbedResponse = unknown;

export const GetEmbedResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetEmbedResponse>;

export type GetEmbedError = DefaultErrors;

export const getEmbed: API.OperationMethod<
  GetEmbedRequest,
  GetEmbedResponse,
  GetEmbedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEmbedRequest,
  output: GetEmbedResponse,
  errors: [],
}));

// =============================================================================
// Key
// =============================================================================

export interface GetKeyRequest {
  /** Identifier. */
  accountId: string;
}

export const GetKeyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/keys" }),
) as unknown as Schema.Schema<GetKeyRequest>;

export type GetKeyResponse = { id?: string | null; created?: string | null }[];

export const GetKeyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<GetKeyResponse>;

export type GetKeyError = DefaultErrors;

export const getKey: API.OperationMethod<
  GetKeyRequest,
  GetKeyResponse,
  GetKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKeyRequest,
  output: GetKeyResponse,
  errors: [],
}));

export interface CreateKeyRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const CreateKeyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/keys" }),
) as unknown as Schema.Schema<CreateKeyRequest>;

export interface CreateKeyResponse {
  /** Identifier. */
  id?: string | null;
  /** The date and time a signing key was created. */
  created?: string | null;
  /** The signing key in JWK format. */
  jwk?: string | null;
  /** The signing key in PEM format. */
  pem?: string | null;
}

export const CreateKeyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  jwk: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  pem: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<CreateKeyResponse>;

export type CreateKeyError = DefaultErrors;

export const createKey: API.OperationMethod<
  CreateKeyRequest,
  CreateKeyResponse,
  CreateKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKeyRequest,
  output: CreateKeyResponse,
  errors: [],
}));

export interface DeleteKeyRequest {
  identifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteKeyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/stream/keys/{identifier}",
  }),
) as unknown as Schema.Schema<DeleteKeyRequest>;

export type DeleteKeyResponse = string;

export const DeleteKeyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteKeyResponse>;

export type DeleteKeyError = DefaultErrors;

export const deleteKey: API.OperationMethod<
  DeleteKeyRequest,
  DeleteKeyResponse,
  DeleteKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKeyRequest,
  output: DeleteKeyResponse,
  errors: [],
}));

// =============================================================================
// LiveInput
// =============================================================================

export interface GetLiveInputRequest {
  liveInputIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const GetLiveInputRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}",
  }),
) as unknown as Schema.Schema<GetLiveInputRequest>;

export interface GetLiveInputResponse {
  /** The date and time the live input was created. */
  created?: string | null;
  /** Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for th */
  deleteRecordingAfterDays?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing live inputs. */
  meta?: unknown | null;
  /** The date and time the live input was last modified. */
  modified?: string | null;
  /** A unique identifier for a live input. */
  uid?: string | null;
}

export const GetLiveInputResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  deleteRecordingAfterDays: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<GetLiveInputResponse>;

export type GetLiveInputError = DefaultErrors;

export const getLiveInput: API.OperationMethod<
  GetLiveInputRequest,
  GetLiveInputResponse,
  GetLiveInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLiveInputRequest,
  output: GetLiveInputResponse,
  errors: [],
}));

export interface ListLiveInputsRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Includes the total number of videos associated with the submitted query parameters. */
  includeCounts?: boolean;
}

export const ListLiveInputsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  includeCounts: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_counts"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/live_inputs" }),
) as unknown as Schema.Schema<ListLiveInputsRequest>;

export interface ListLiveInputsResponse {
  liveInputs?:
    | {
        created?: string | null;
        deleteRecordingAfterDays?: number | null;
        meta?: unknown | null;
        modified?: string | null;
        uid?: string | null;
      }[]
    | null;
  /** The total number of remaining live inputs based on cursor position. */
  range?: number | null;
  /** The total number of live inputs that match the provided filters. */
  total?: number | null;
}

export const ListLiveInputsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    liveInputs: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Struct({
            created: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            deleteRecordingAfterDays: Schema.optional(
              Schema.Union([Schema.Number, Schema.Null]),
            ),
            meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
            modified: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          }),
        ),
        Schema.Null,
      ]),
    ),
    range: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    total: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  },
) as unknown as Schema.Schema<ListLiveInputsResponse>;

export type ListLiveInputsError = DefaultErrors;

export const listLiveInputs: API.OperationMethod<
  ListLiveInputsRequest,
  ListLiveInputsResponse,
  ListLiveInputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListLiveInputsRequest,
  output: ListLiveInputsResponse,
  errors: [],
}));

export interface CreateLiveInputRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Sets the creator ID asssociated with this live input. */
  defaultCreator?: string;
  /** Body param: Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion */
  deleteRecordingAfterDays?: number;
  /** Body param: A user modifiable key-value store used to reference other systems of record for managing live inputs. */
  meta?: unknown;
  /** Body param: Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condit */
  recording?: {
    allowedOrigins?: string[];
    hideLiveViewerCount?: boolean;
    mode?: "off" | "automatic";
    requireSignedURLs?: boolean;
    timeoutSeconds?: number;
  };
}

export const CreateLiveInputRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    defaultCreator: Schema.optional(Schema.String),
    deleteRecordingAfterDays: Schema.optional(Schema.Number),
    meta: Schema.optional(Schema.Unknown),
    recording: Schema.optional(
      Schema.Struct({
        allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
        hideLiveViewerCount: Schema.optional(Schema.Boolean),
        mode: Schema.optional(Schema.Literals(["off", "automatic"])),
        requireSignedURLs: Schema.optional(Schema.Boolean),
        timeoutSeconds: Schema.optional(Schema.Number),
      }),
    ),
  },
).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream/live_inputs" }),
) as unknown as Schema.Schema<CreateLiveInputRequest>;

export interface CreateLiveInputResponse {
  /** The date and time the live input was created. */
  created?: string | null;
  /** Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for th */
  deleteRecordingAfterDays?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing live inputs. */
  meta?: unknown | null;
  /** The date and time the live input was last modified. */
  modified?: string | null;
  /** A unique identifier for a live input. */
  uid?: string | null;
}

export const CreateLiveInputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    deleteRecordingAfterDays: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateLiveInputResponse>;

export type CreateLiveInputError = DefaultErrors;

export const createLiveInput: API.OperationMethod<
  CreateLiveInputRequest,
  CreateLiveInputResponse,
  CreateLiveInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLiveInputRequest,
  output: CreateLiveInputResponse,
  errors: [],
}));

export interface UpdateLiveInputRequest {
  liveInputIdentifier: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: Sets the creator ID asssociated with this live input. */
  defaultCreator?: string;
  /** Body param: Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion */
  deleteRecordingAfterDays?: number;
  /** Body param: A user modifiable key-value store used to reference other systems of record for managing live inputs. */
  meta?: unknown;
  /** Body param: Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condit */
  recording?: {
    allowedOrigins?: string[];
    hideLiveViewerCount?: boolean;
    mode?: "off" | "automatic";
    requireSignedURLs?: boolean;
    timeoutSeconds?: number;
  };
}

export const UpdateLiveInputRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    defaultCreator: Schema.optional(Schema.String),
    deleteRecordingAfterDays: Schema.optional(Schema.Number),
    meta: Schema.optional(Schema.Unknown),
    recording: Schema.optional(
      Schema.Struct({
        allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
        hideLiveViewerCount: Schema.optional(Schema.Boolean),
        mode: Schema.optional(Schema.Literals(["off", "automatic"])),
        requireSignedURLs: Schema.optional(Schema.Boolean),
        timeoutSeconds: Schema.optional(Schema.Number),
      }),
    ),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}",
  }),
) as unknown as Schema.Schema<UpdateLiveInputRequest>;

export interface UpdateLiveInputResponse {
  /** The date and time the live input was created. */
  created?: string | null;
  /** Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for th */
  deleteRecordingAfterDays?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing live inputs. */
  meta?: unknown | null;
  /** The date and time the live input was last modified. */
  modified?: string | null;
  /** A unique identifier for a live input. */
  uid?: string | null;
}

export const UpdateLiveInputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    deleteRecordingAfterDays: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<UpdateLiveInputResponse>;

export type UpdateLiveInputError = DefaultErrors;

export const updateLiveInput: API.OperationMethod<
  UpdateLiveInputRequest,
  UpdateLiveInputResponse,
  UpdateLiveInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLiveInputRequest,
  output: UpdateLiveInputResponse,
  errors: [],
}));

export interface DeleteLiveInputRequest {
  liveInputIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteLiveInputRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteLiveInputRequest>;

export type DeleteLiveInputResponse = unknown;

export const DeleteLiveInputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteLiveInputResponse>;

export type DeleteLiveInputError = DefaultErrors;

export const deleteLiveInput: API.OperationMethod<
  DeleteLiveInputRequest,
  DeleteLiveInputResponse,
  DeleteLiveInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveInputRequest,
  output: DeleteLiveInputResponse,
  errors: [],
}));

// =============================================================================
// LiveInputOutput
// =============================================================================

export interface ListLiveInputOutputsRequest {
  liveInputIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const ListLiveInputOutputsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}/outputs",
    }),
  ) as unknown as Schema.Schema<ListLiveInputOutputsRequest>;

export type ListLiveInputOutputsResponse = {
  enabled?: boolean | null;
  streamKey?: string | null;
  uid?: string | null;
  url?: string | null;
}[];

export const ListLiveInputOutputsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      streamKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ) as unknown as Schema.Schema<ListLiveInputOutputsResponse>;

export type ListLiveInputOutputsError = DefaultErrors;

export const listLiveInputOutputs: API.OperationMethod<
  ListLiveInputOutputsRequest,
  ListLiveInputOutputsResponse,
  ListLiveInputOutputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListLiveInputOutputsRequest,
  output: ListLiveInputOutputsResponse,
  errors: [],
}));

export interface CreateLiveInputOutputRequest {
  liveInputIdentifier: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The streamKey used to authenticate against an output's target. */
  streamKey: string;
  /** Body param: The URL an output uses to restream. */
  url: string;
  /** Body param: When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the asso */
  enabled?: boolean;
}

export const CreateLiveInputOutputRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    streamKey: Schema.String,
    url: Schema.String,
    enabled: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}/outputs",
    }),
  ) as unknown as Schema.Schema<CreateLiveInputOutputRequest>;

export interface CreateLiveInputOutputResponse {
  /** When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live  */
  enabled?: boolean | null;
  /** The streamKey used to authenticate against an output's target. */
  streamKey?: string | null;
  /** A unique identifier for the output. */
  uid?: string | null;
  /** The URL an output uses to restream. */
  url?: string | null;
}

export const CreateLiveInputOutputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    streamKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<CreateLiveInputOutputResponse>;

export type CreateLiveInputOutputError = DefaultErrors;

export const createLiveInputOutput: API.OperationMethod<
  CreateLiveInputOutputRequest,
  CreateLiveInputOutputResponse,
  CreateLiveInputOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLiveInputOutputRequest,
  output: CreateLiveInputOutputResponse,
  errors: [],
}));

export interface UpdateLiveInputOutputRequest {
  liveInputIdentifier: string;
  outputIdentifier: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the asso */
  enabled: boolean;
}

export const UpdateLiveInputOutputRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    outputIdentifier: Schema.String.pipe(T.HttpPath("outputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    enabled: Schema.Boolean,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}/outputs/{outputIdentifier}",
    }),
  ) as unknown as Schema.Schema<UpdateLiveInputOutputRequest>;

export interface UpdateLiveInputOutputResponse {
  /** When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live  */
  enabled?: boolean | null;
  /** The streamKey used to authenticate against an output's target. */
  streamKey?: string | null;
  /** A unique identifier for the output. */
  uid?: string | null;
  /** The URL an output uses to restream. */
  url?: string | null;
}

export const UpdateLiveInputOutputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    streamKey: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<UpdateLiveInputOutputResponse>;

export type UpdateLiveInputOutputError = DefaultErrors;

export const updateLiveInputOutput: API.OperationMethod<
  UpdateLiveInputOutputRequest,
  UpdateLiveInputOutputResponse,
  UpdateLiveInputOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLiveInputOutputRequest,
  output: UpdateLiveInputOutputResponse,
  errors: [],
}));

export interface DeleteLiveInputOutputRequest {
  liveInputIdentifier: string;
  outputIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteLiveInputOutputRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    liveInputIdentifier: Schema.String.pipe(T.HttpPath("liveInputIdentifier")),
    outputIdentifier: Schema.String.pipe(T.HttpPath("outputIdentifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/stream/live_inputs/{liveInputIdentifier}/outputs/{outputIdentifier}",
    }),
  ) as unknown as Schema.Schema<DeleteLiveInputOutputRequest>;

export type DeleteLiveInputOutputResponse = unknown;

export const DeleteLiveInputOutputResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteLiveInputOutputResponse>;

export type DeleteLiveInputOutputError = DefaultErrors;

export const deleteLiveInputOutput: API.OperationMethod<
  DeleteLiveInputOutputRequest,
  DeleteLiveInputOutputResponse,
  DeleteLiveInputOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveInputOutputRequest,
  output: DeleteLiveInputOutputResponse,
  errors: [],
}));

// =============================================================================
// Stream
// =============================================================================

export interface GetStreamRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/{identifier}" }),
) as unknown as Schema.Schema<GetStreamRequest>;

export interface GetStreamResponse {
  /** Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[] | null;
  /** The date and time the media item was created. */
  created?: string | null;
  /** A user-defined identifier for the media creator. */
  creator?: string | null;
  /** The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready. */
  duration?: number | null;
  input?: { height?: number | null; width?: number | null } | null;
  /** The live input ID used to upload a video with Stream Live. */
  liveInput?: string | null;
  /** The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A val */
  maxDurationSeconds?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown | null;
  /** The date and time the media item was last modified. */
  modified?: string | null;
  playback?: { dash?: string | null; hls?: string | null } | null;
  /** The video's preview page URI. This field is omitted until encoding is complete. */
  preview?: string | null;
  /** Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress. */
  readyToStream?: boolean | null;
  /** Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress. */
  readyToStreamAt?: string | null;
  /** Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean | null;
  /** Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at  */
  scheduledDeletion?: string | null;
  /** The size of the media item in bytes. */
  size?: number | null;
  /** Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number be */
  status?: {
    errorReasonCode?: string | null;
    errorReasonText?: string | null;
    pctComplete?: string | null;
    state?:
      | "pendingupload"
      | "downloading"
      | "queued"
      | "inprogress"
      | "ready"
      | "error"
      | "live-inprogress"
      | null;
  } | null;
  /** The media item's thumbnail URI. This field is omitted until encoding is complete. */
  thumbnail?: string | null;
  /** The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duratio */
  thumbnailTimestampPct?: number | null;
  /** A Cloudflare-generated unique identifier for a media item. */
  uid?: string | null;
  /** The date and time the media item was uploaded. */
  uploaded?: string | null;
  /** The date and time when the video upload URL is no longer valid for direct user uploads. */
  uploadExpiry?: string | null;
  watermark?: unknown | null;
}

export const GetStreamResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  allowedOrigins: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  duration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  input: Schema.optional(
    Schema.Union([
      Schema.Struct({
        height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  liveInput: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  maxDurationSeconds: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  playback: Schema.optional(
    Schema.Union([
      Schema.Struct({
        dash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        hls: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  preview: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  readyToStream: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  readyToStreamAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  scheduledDeletion: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Struct({
        errorReasonCode: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        errorReasonText: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        pctComplete: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        state: Schema.optional(
          Schema.Union([
            Schema.Literals([
              "pendingupload",
              "downloading",
              "queued",
              "inprogress",
              "ready",
              "error",
              "live-inprogress",
            ]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
  thumbnail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  thumbnailTimestampPct: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  uploadExpiry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  watermark: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
}) as unknown as Schema.Schema<GetStreamResponse>;

export type GetStreamError = DefaultErrors;

export const getStream: API.OperationMethod<
  GetStreamRequest,
  GetStreamResponse,
  GetStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStreamRequest,
  output: GetStreamResponse,
  errors: [],
}));

export interface ListStreamsRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Lists videos in ascending order of creation. */
  asc?: boolean;
  /** Query param: A user-defined identifier for the media creator. */
  creator?: string;
  /** Query param: Lists videos created before the specified date. */
  end?: string;
  /** Query param: Includes the total number of videos associated with the submitted query parameters. */
  includeCounts?: boolean;
  /** Query param: Provides a partial word match of the `name` key in the `meta` field. Slow for medium to large video libraries. May be unavailable for very large libraries. */
  search?: string;
  /** Query param: Lists videos created after the specified date. */
  start?: string;
  /** Query param: Specifies the processing status for all quality levels for a video. */
  status?:
    | "pendingupload"
    | "downloading"
    | "queued"
    | "inprogress"
    | "ready"
    | "error"
    | "live-inprogress";
  /** Query param: Specifies whether the video is `vod` or `live`. */
  type?: string;
  /** Query param: Provides a fast, exact string match on the `name` key in the `meta` field. */
  videoName?: string;
}

export const ListStreamsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  asc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("asc")),
  creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator")),
  end: Schema.optional(Schema.String).pipe(T.HttpQuery("end")),
  includeCounts: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("include_counts"),
  ),
  search: Schema.optional(Schema.String).pipe(T.HttpQuery("search")),
  start: Schema.optional(Schema.String).pipe(T.HttpQuery("start")),
  status: Schema.optional(
    Schema.Literals([
      "pendingupload",
      "downloading",
      "queued",
      "inprogress",
      "ready",
      "error",
      "live-inprogress",
    ]),
  ).pipe(T.HttpQuery("status")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  videoName: Schema.optional(Schema.String).pipe(T.HttpQuery("video_name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream" }),
) as unknown as Schema.Schema<ListStreamsRequest>;

export type ListStreamsResponse = {
  allowedOrigins?: string[] | null;
  created?: string | null;
  creator?: string | null;
  duration?: number | null;
  input?: { height?: number | null; width?: number | null } | null;
  liveInput?: string | null;
  maxDurationSeconds?: number | null;
  meta?: unknown | null;
  modified?: string | null;
  playback?: { dash?: string | null; hls?: string | null } | null;
  preview?: string | null;
  readyToStream?: boolean | null;
  readyToStreamAt?: string | null;
  requireSignedURLs?: boolean | null;
  scheduledDeletion?: string | null;
  size?: number | null;
  status?: {
    errorReasonCode?: string | null;
    errorReasonText?: string | null;
    pctComplete?: string | null;
    state?:
      | "pendingupload"
      | "downloading"
      | "queued"
      | "inprogress"
      | "ready"
      | "error"
      | "live-inprogress"
      | null;
  } | null;
  thumbnail?: string | null;
  thumbnailTimestampPct?: number | null;
  uid?: string | null;
  uploaded?: string | null;
  uploadExpiry?: string | null;
  watermark?: unknown | null;
}[];

export const ListStreamsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    allowedOrigins: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    duration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    input: Schema.optional(
      Schema.Union([
        Schema.Struct({
          height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
          width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    liveInput: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    maxDurationSeconds: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    playback: Schema.optional(
      Schema.Union([
        Schema.Struct({
          dash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          hls: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    preview: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    readyToStream: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    readyToStreamAt: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    requireSignedURLs: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    scheduledDeletion: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    status: Schema.optional(
      Schema.Union([
        Schema.Struct({
          errorReasonCode: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          errorReasonText: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          pctComplete: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          state: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "pendingupload",
                "downloading",
                "queued",
                "inprogress",
                "ready",
                "error",
                "live-inprogress",
              ]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    thumbnail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    thumbnailTimestampPct: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    uploadExpiry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    watermark: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListStreamsResponse>;

export type ListStreamsError = DefaultErrors;

export const listStreams: API.OperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListStreamsRequest,
  output: ListStreamsResponse,
  errors: [],
}));

export interface CreateStreamRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: Provisions a URL to let your end users upload videos directly to Cloudflare Stream without exposing your API token to clients. */
  directUser?: boolean;
  /** Header param: Specifies the TUS protocol version. This value must be included in every upload request. Notes: The only supported version of TUS protocol is 1.0.0. */
  tusResumable: "1.0.0";
  /** Header param: Indicates the size of the entire upload in bytes. The value must be a non-negative integer. */
  uploadLength: number;
  /** Header param: A user-defined identifier for the media creator. */
  uploadCreator?: string;
  /** Header param: Comma-separated key-value pairs following the TUS protocol specification. Values are Base-64 encoded. Supported keys: `name`, `requiresignedurls`, `allowedorigins`, `thumbnailtimestamppc */
  uploadMetadata?: string;
  /** Body param: */
  body: unknown;
}

export const CreateStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  directUser: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("direct_user")),
  tusResumable: Schema.Literal("1.0.0").pipe(T.HttpHeader("Tus-Resumable")),
  uploadLength: Schema.Number.pipe(T.HttpHeader("Upload-Length")),
  uploadCreator: Schema.optional(Schema.String).pipe(
    T.HttpHeader("Upload-Creator"),
  ),
  uploadMetadata: Schema.optional(Schema.String).pipe(
    T.HttpHeader("Upload-Metadata"),
  ),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/stream" }),
) as unknown as Schema.Schema<CreateStreamRequest>;

export type CreateStreamResponse = unknown;

export const CreateStreamResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<CreateStreamResponse>;

export type CreateStreamError = DefaultErrors;

export const createStream: API.OperationMethod<
  CreateStreamRequest,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateStreamRequest,
  output: CreateStreamResponse,
  errors: [],
}));

export interface DeleteStreamRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/stream/{identifier}",
  }),
) as unknown as Schema.Schema<DeleteStreamRequest>;

export type DeleteStreamResponse = unknown;

export const DeleteStreamResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteStreamResponse>;

export type DeleteStreamError = DefaultErrors;

export const deleteStream: API.OperationMethod<
  DeleteStreamRequest,
  DeleteStreamResponse,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteStreamRequest,
  output: DeleteStreamResponse,
  errors: [],
}));

export interface EditStreamRequest {
  identifier: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[];
  /** Body param: A user-defined identifier for the media creator. */
  creator?: string;
  /** Body param: The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during proce */
  maxDurationSeconds?: number;
  /** Body param: A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown;
  /** Body param: Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean;
  /** Body param: Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, */
  scheduledDeletion?: string;
  /** Body param: The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the t */
  thumbnailTimestampPct?: number;
  /** Body param: The date and time when the video upload URL is no longer valid for direct user uploads. */
  uploadExpiry?: string;
}

export const EditStreamRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
  creator: Schema.optional(Schema.String),
  maxDurationSeconds: Schema.optional(Schema.Number),
  meta: Schema.optional(Schema.Unknown),
  requireSignedURLs: Schema.optional(Schema.Boolean),
  scheduledDeletion: Schema.optional(Schema.String),
  thumbnailTimestampPct: Schema.optional(Schema.Number),
  uploadExpiry: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/stream/{identifier}",
  }),
) as unknown as Schema.Schema<EditStreamRequest>;

export interface EditStreamResponse {
  /** Lists the origins allowed to display the video. Enter allowed origin domains in an array and use ` ` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin. */
  allowedOrigins?: string[] | null;
  /** The date and time the media item was created. */
  created?: string | null;
  /** A user-defined identifier for the media creator. */
  creator?: string | null;
  /** The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready. */
  duration?: number | null;
  input?: { height?: number | null; width?: number | null } | null;
  /** The live input ID used to upload a video with Stream Live. */
  liveInput?: string | null;
  /** The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A val */
  maxDurationSeconds?: number | null;
  /** A user modifiable key-value store used to reference other systems of record for managing videos. */
  meta?: unknown | null;
  /** The date and time the media item was last modified. */
  modified?: string | null;
  playback?: { dash?: string | null; hls?: string | null } | null;
  /** The video's preview page URI. This field is omitted until encoding is complete. */
  preview?: string | null;
  /** Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress. */
  readyToStream?: boolean | null;
  /** Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress. */
  readyToStreamAt?: string | null;
  /** Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video. */
  requireSignedURLs?: boolean | null;
  /** Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at  */
  scheduledDeletion?: string | null;
  /** The size of the media item in bytes. */
  size?: number | null;
  /** Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number be */
  status?: {
    errorReasonCode?: string | null;
    errorReasonText?: string | null;
    pctComplete?: string | null;
    state?:
      | "pendingupload"
      | "downloading"
      | "queued"
      | "inprogress"
      | "ready"
      | "error"
      | "live-inprogress"
      | null;
  } | null;
  /** The media item's thumbnail URI. This field is omitted until encoding is complete. */
  thumbnail?: string | null;
  /** The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duratio */
  thumbnailTimestampPct?: number | null;
  /** A Cloudflare-generated unique identifier for a media item. */
  uid?: string | null;
  /** The date and time the media item was uploaded. */
  uploaded?: string | null;
  /** The date and time when the video upload URL is no longer valid for direct user uploads. */
  uploadExpiry?: string | null;
  watermark?: unknown | null;
}

export const EditStreamResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  allowedOrigins: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  duration: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  input: Schema.optional(
    Schema.Union([
      Schema.Struct({
        height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  liveInput: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  maxDurationSeconds: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  meta: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  playback: Schema.optional(
    Schema.Union([
      Schema.Struct({
        dash: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        hls: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  preview: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  readyToStream: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  readyToStreamAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  requireSignedURLs: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  scheduledDeletion: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  status: Schema.optional(
    Schema.Union([
      Schema.Struct({
        errorReasonCode: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        errorReasonText: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        pctComplete: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        state: Schema.optional(
          Schema.Union([
            Schema.Literals([
              "pendingupload",
              "downloading",
              "queued",
              "inprogress",
              "ready",
              "error",
              "live-inprogress",
            ]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
  thumbnail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  thumbnailTimestampPct: Schema.optional(
    Schema.Union([Schema.Number, Schema.Null]),
  ),
  uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  uploaded: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  uploadExpiry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  watermark: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
}) as unknown as Schema.Schema<EditStreamResponse>;

export type EditStreamError = DefaultErrors;

export const editStream: API.OperationMethod<
  EditStreamRequest,
  EditStreamResponse,
  EditStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EditStreamRequest,
  output: EditStreamResponse,
  errors: [],
}));

// =============================================================================
// Token
// =============================================================================

export interface CreateTokenRequest {
  identifier: string;
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The optional ID of a Stream signing key. If present, the `pem` field is also required. */
  id?: string;
  /** Body param: The optional list of access rule constraints on the token. Access can be blocked or allowed based on an IP, IP range, or by country. Access rules are evaluated from first to last. If a rul */
  accessRules?: {
    action?: "allow" | "block";
    country?: string[];
    ip?: string[];
    type?: "any" | "ip.src" | "ip.geoip.country";
  }[];
  /** Body param: The optional boolean value that enables using signed tokens to access MP4 download links for a video. */
  downloadable?: boolean;
  /** Body param: The optional unix epoch timestamp that specficies the time after a token is not accepted. The maximum time specification is 24 hours from issuing time. If this field is not set, the defaul */
  exp?: number;
  /** Body param: The optional unix epoch timestamp that specifies the time before a the token is not accepted. If this field is not set, the default is one hour before issuing. */
  nbf?: number;
  /** Body param: The optional base64 encoded private key in PEM format associated with a Stream signing key. If present, the `id` field is also required. */
  pem?: string;
}

export const CreateTokenRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.optional(Schema.String),
  accessRules: Schema.optional(
    Schema.Array(
      Schema.Struct({
        action: Schema.optional(Schema.Literals(["allow", "block"])),
        country: Schema.optional(Schema.Array(Schema.String)),
        ip: Schema.optional(Schema.Array(Schema.String)),
        type: Schema.optional(
          Schema.Literals(["any", "ip.src", "ip.geoip.country"]),
        ),
      }),
    ),
  ),
  downloadable: Schema.optional(Schema.Boolean),
  exp: Schema.optional(Schema.Number),
  nbf: Schema.optional(Schema.Number),
  pem: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/stream/{identifier}/token",
  }),
) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  /** The signed token used with the signed URLs feature. */
  token?: string | null;
}

export const CreateTokenResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  token: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<CreateTokenResponse>;

export type CreateTokenError = DefaultErrors;

export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [],
}));

// =============================================================================
// UsageVideo
// =============================================================================

export interface StorageUsageVideoRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Query param: A user-defined identifier for the media creator. */
  creator?: string;
}

export const StorageUsageVideoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    creator: Schema.optional(Schema.String).pipe(T.HttpQuery("creator")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/stream/storage-usage",
    }),
  ) as unknown as Schema.Schema<StorageUsageVideoRequest>;

export interface StorageUsageVideoResponse {
  /** A user-defined identifier for the media creator. */
  creator?: string | null;
  /** The total minutes of video content stored in the account. */
  totalStorageMinutes?: number | null;
  /** The storage capacity alloted for the account. */
  totalStorageMinutesLimit?: number | null;
  /** The total count of videos associated with the account. */
  videoCount?: number | null;
}

export const StorageUsageVideoResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    creator: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    totalStorageMinutes: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    totalStorageMinutesLimit: Schema.optional(
      Schema.Union([Schema.Number, Schema.Null]),
    ),
    videoCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }) as unknown as Schema.Schema<StorageUsageVideoResponse>;

export type StorageUsageVideoError = DefaultErrors;

export const storageUsageVideo: API.OperationMethod<
  StorageUsageVideoRequest,
  StorageUsageVideoResponse,
  StorageUsageVideoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StorageUsageVideoRequest,
  output: StorageUsageVideoResponse,
  errors: [],
}));

// =============================================================================
// Watermark
// =============================================================================

export interface GetWatermarkRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const GetWatermarkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/stream/watermarks/{identifier}",
  }),
) as unknown as Schema.Schema<GetWatermarkRequest>;

export interface GetWatermarkResponse {
  /** The date and a time a watermark profile was created. */
  created?: string | null;
  /** The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null. */
  downloadedFrom?: string | null;
  /** The height of the image in pixels. */
  height?: number | null;
  /** A short description of the watermark profile. */
  name?: string | null;
  /** The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to */
  opacity?: number | null;
  /** The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length, as determined by th */
  padding?: number | null;
  /** The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignores the `padding` parameter. */
  position?: string | null;
  /** The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. `0.0` indicates no scaling (use the size of the image as-is) */
  scale?: number | null;
  /** The size of the image in bytes. */
  size?: number | null;
  /** The unique identifier for a watermark profile. */
  uid?: string | null;
  /** The width of the image in pixels. */
  width?: number | null;
}

export const GetWatermarkResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  downloadedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  opacity: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  padding: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  position: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  scale: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}) as unknown as Schema.Schema<GetWatermarkResponse>;

export type GetWatermarkError = DefaultErrors;

export const getWatermark: API.OperationMethod<
  GetWatermarkRequest,
  GetWatermarkResponse,
  GetWatermarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWatermarkRequest,
  output: GetWatermarkResponse,
  errors: [],
}));

export interface ListWatermarksRequest {
  /** The account identifier tag. */
  accountId: string;
}

export const ListWatermarksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/watermarks" }),
) as unknown as Schema.Schema<ListWatermarksRequest>;

export type ListWatermarksResponse = {
  created?: string | null;
  downloadedFrom?: string | null;
  height?: number | null;
  name?: string | null;
  opacity?: number | null;
  padding?: number | null;
  position?: string | null;
  scale?: number | null;
  size?: number | null;
  uid?: string | null;
  width?: number | null;
}[];

export const ListWatermarksResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    downloadedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    opacity: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    padding: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    position: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scale: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListWatermarksResponse>;

export type ListWatermarksError = DefaultErrors;

export const listWatermarks: API.OperationMethod<
  ListWatermarksRequest,
  ListWatermarksResponse,
  ListWatermarksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListWatermarksRequest,
  output: ListWatermarksResponse,
  errors: [],
}));

export interface CreateWatermarkRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The image file to upload. */
  file: string;
  /** Body param: A short description of the watermark profile. */
  name?: string;
  /** Body param: The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, set */
  opacity?: number;
  /** Body param: The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length, as dete */
  padding?: number;
  /** Body param: The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignores the `padding` parameter. */
  position?: string;
  /** Body param: The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. `0.0` indicates no scaling (use the size of the  */
  scale?: number;
}

export const CreateWatermarkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    file: Schema.String,
    name: Schema.optional(Schema.String),
    opacity: Schema.optional(Schema.Number),
    padding: Schema.optional(Schema.Number),
    position: Schema.optional(Schema.String),
    scale: Schema.optional(Schema.Number),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/stream/watermarks",
    contentType: "multipart",
  }),
) as unknown as Schema.Schema<CreateWatermarkRequest>;

export interface CreateWatermarkResponse {
  /** The date and a time a watermark profile was created. */
  created?: string | null;
  /** The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null. */
  downloadedFrom?: string | null;
  /** The height of the image in pixels. */
  height?: number | null;
  /** A short description of the watermark profile. */
  name?: string | null;
  /** The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to */
  opacity?: number | null;
  /** The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length, as determined by th */
  padding?: number | null;
  /** The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignores the `padding` parameter. */
  position?: string | null;
  /** The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. `0.0` indicates no scaling (use the size of the image as-is) */
  scale?: number | null;
  /** The size of the image in bytes. */
  size?: number | null;
  /** The unique identifier for a watermark profile. */
  uid?: string | null;
  /** The width of the image in pixels. */
  width?: number | null;
}

export const CreateWatermarkResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    downloadedFrom: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    height: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    opacity: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    padding: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    position: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scale: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    size: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    uid: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    width: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }) as unknown as Schema.Schema<CreateWatermarkResponse>;

export type CreateWatermarkError = DefaultErrors;

export const createWatermark: API.OperationMethod<
  CreateWatermarkRequest,
  CreateWatermarkResponse,
  CreateWatermarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWatermarkRequest,
  output: CreateWatermarkResponse,
  errors: [],
}));

export interface DeleteWatermarkRequest {
  identifier: string;
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteWatermarkRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    identifier: Schema.String.pipe(T.HttpPath("identifier")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/stream/watermarks/{identifier}",
  }),
) as unknown as Schema.Schema<DeleteWatermarkRequest>;

export type DeleteWatermarkResponse = string;

export const DeleteWatermarkResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteWatermarkResponse>;

export type DeleteWatermarkError = DefaultErrors;

export const deleteWatermark: API.OperationMethod<
  DeleteWatermarkRequest,
  DeleteWatermarkResponse,
  DeleteWatermarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWatermarkRequest,
  output: DeleteWatermarkResponse,
  errors: [],
}));

// =============================================================================
// Webhook
// =============================================================================

export interface GetWebhookRequest {
  /** The account identifier tag. */
  accountId: string;
}

export const GetWebhookRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/stream/webhook" }),
) as unknown as Schema.Schema<GetWebhookRequest>;

export type GetWebhookResponse = unknown;

export const GetWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<GetWebhookResponse>;

export type GetWebhookError = DefaultErrors;

export const getWebhook: API.OperationMethod<
  GetWebhookRequest,
  GetWebhookResponse,
  GetWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWebhookRequest,
  output: GetWebhookResponse,
  errors: [],
}));

export interface PutWebhookRequest {
  /** Path param: The account identifier tag. */
  accountId: string;
  /** Body param: The URL where webhooks will be sent. */
  notificationUrl: string;
}

export const PutWebhookRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  notificationUrl: Schema.String,
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/stream/webhook" }),
) as unknown as Schema.Schema<PutWebhookRequest>;

export type PutWebhookResponse = unknown;

export const PutWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PutWebhookResponse>;

export type PutWebhookError = DefaultErrors;

export const putWebhook: API.OperationMethod<
  PutWebhookRequest,
  PutWebhookResponse,
  PutWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutWebhookRequest,
  output: PutWebhookResponse,
  errors: [],
}));

export interface DeleteWebhookRequest {
  /** The account identifier tag. */
  accountId: string;
}

export const DeleteWebhookRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/stream/webhook" }),
) as unknown as Schema.Schema<DeleteWebhookRequest>;

export type DeleteWebhookResponse = string;

export const DeleteWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String as unknown as Schema.Schema<DeleteWebhookResponse>;

export type DeleteWebhookError = DefaultErrors;

export const deleteWebhook: API.OperationMethod<
  DeleteWebhookRequest,
  DeleteWebhookResponse,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWebhookRequest,
  output: DeleteWebhookResponse,
  errors: [],
}));
