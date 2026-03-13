// ==========================================================================
// YouTube Data API v3 (youtube v3)
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
  name: "youtube",
  version: "v3",
  rootUrl: "https://youtube.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PlaylistItemStatus {
  /** This resource's privacy status. */
  privacyStatus?: "public" | "unlisted" | "private" | (string & {});
}

export const PlaylistItemStatus: Schema.Schema<PlaylistItemStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      privacyStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistItemStatus",
  }) as any as Schema.Schema<PlaylistItemStatus>;

export interface PageInfo {
  /** The total number of results in the result set. */
  totalResults?: number;
  /** The number of results included in the API response. */
  resultsPerPage?: number;
}

export const PageInfo: Schema.Schema<PageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalResults: Schema.optional(Schema.Number),
      resultsPerPage: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "PageInfo" }) as any as Schema.Schema<PageInfo>;

export interface PlaylistImageSnippet {
  /** The image height. */
  height?: number;
  /** The Playlist ID of the playlist this image is associated with. */
  playlistId?: string;
  /** The image type. */
  type?: "hero" | (string & {});
  /** The image width. */
  width?: number;
}

export const PlaylistImageSnippet: Schema.Schema<PlaylistImageSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      height: Schema.optional(Schema.Number),
      playlistId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      width: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PlaylistImageSnippet",
  }) as any as Schema.Schema<PlaylistImageSnippet>;

export interface PlaylistImage {
  /** Identifies this resource (playlist id and image type). */
  id?: string;
  snippet?: PlaylistImageSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistImages". */
  kind?: string;
}

export const PlaylistImage: Schema.Schema<PlaylistImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(PlaylistImageSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistImage",
  }) as any as Schema.Schema<PlaylistImage>;

export interface PlaylistImageListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistImageListResponse". */
  kind?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  items?: Array<PlaylistImage>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
}

export const PlaylistImageListResponse: Schema.Schema<PlaylistImageListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      items: Schema.optional(Schema.Array(PlaylistImage)),
      prevPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistImageListResponse",
  }) as any as Schema.Schema<PlaylistImageListResponse>;

export interface ThirdPartyLinkStatus {
  linkStatus?: "unknown" | "failed" | "pending" | "linked" | (string & {});
}

export const ThirdPartyLinkStatus: Schema.Schema<ThirdPartyLinkStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      linkStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThirdPartyLinkStatus",
  }) as any as Schema.Schema<ThirdPartyLinkStatus>;

export interface VideoProjectDetails {}

export const VideoProjectDetails: Schema.Schema<VideoProjectDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "VideoProjectDetails",
  }) as any as Schema.Schema<VideoProjectDetails>;

export interface Thumbnail {
  /** (Optional) Height of the thumbnail image. */
  height?: number;
  /** (Optional) Width of the thumbnail image. */
  width?: number;
  /** The thumbnail image's URL. */
  url?: string;
}

export const Thumbnail: Schema.Schema<Thumbnail> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      height: Schema.optional(Schema.Number),
      width: Schema.optional(Schema.Number),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Thumbnail" }) as any as Schema.Schema<Thumbnail>;

export interface ThumbnailDetails {
  /** The medium quality image for this resource. */
  medium?: Thumbnail;
  /** The standard quality image for this resource. */
  standard?: Thumbnail;
  /** The high quality image for this resource. */
  high?: Thumbnail;
  /** The maximum resolution quality image for this resource. */
  maxres?: Thumbnail;
  /** The default image for this resource. */
  default?: Thumbnail;
}

export const ThumbnailDetails: Schema.Schema<ThumbnailDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      medium: Schema.optional(Thumbnail),
      standard: Schema.optional(Thumbnail),
      high: Schema.optional(Thumbnail),
      maxres: Schema.optional(Thumbnail),
      default: Schema.optional(Thumbnail),
    }),
  ).annotate({
    identifier: "ThumbnailDetails",
  }) as any as Schema.Schema<ThumbnailDetails>;

export interface SearchResultSnippet {
  /** The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies. */
  channelId?: string;
  /** A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The creation date and time of the resource that the search result identifies. */
  publishedAt?: string;
  /** The title of the channel that published the resource that the search result identifies. */
  channelTitle?: string;
  /** It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it's "none" if there is not any upcoming/active live broadcasts. */
  liveBroadcastContent?:
    | "none"
    | "upcoming"
    | "live"
    | "completed"
    | (string & {});
  /** The title of the search result. */
  title?: string;
  /** A description of the search result. */
  description?: string;
}

export const SearchResultSnippet: Schema.Schema<SearchResultSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
      publishedAt: Schema.optional(Schema.String),
      channelTitle: Schema.optional(Schema.String),
      liveBroadcastContent: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchResultSnippet",
  }) as any as Schema.Schema<SearchResultSnippet>;

export interface AccessPolicy {
  /** A list of region codes that identify countries where the default policy do not apply. */
  exception?: Array<string>;
  /** The value of allowed indicates whether the access to the policy is allowed or denied by default. */
  allowed?: boolean;
}

export const AccessPolicy: Schema.Schema<AccessPolicy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exception: Schema.optional(Schema.Array(Schema.String)),
      allowed: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AccessPolicy",
  }) as any as Schema.Schema<AccessPolicy>;

export interface MonitorStreamInfo {
  /** If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay. */
  broadcastStreamDelayMs?: number;
  /** HTML code that embeds a player that plays the monitor stream. */
  embedHtml?: string;
  /** This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state. */
  enableMonitorStream?: boolean;
}

export const MonitorStreamInfo: Schema.Schema<MonitorStreamInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      broadcastStreamDelayMs: Schema.optional(Schema.Number),
      embedHtml: Schema.optional(Schema.String),
      enableMonitorStream: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MonitorStreamInfo",
  }) as any as Schema.Schema<MonitorStreamInfo>;

export interface ResourceId {
  /** The type of the API resource. */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel. */
  channelId?: string;
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist. */
  playlistId?: string;
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video. */
  videoId?: string;
}

export const ResourceId: Schema.Schema<ResourceId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      playlistId: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ResourceId" }) as any as Schema.Schema<ResourceId>;

export interface ActivityContentDetailsFavorite {
  /** The resourceId object contains information that identifies the resource that was marked as a favorite. */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsFavorite: Schema.Schema<ActivityContentDetailsFavorite> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsFavorite",
  }) as any as Schema.Schema<ActivityContentDetailsFavorite>;

export interface I18nLanguageSnippet {
  /** The human-readable name of the language in the language itself. */
  name?: string;
  /** A short BCP-47 code that uniquely identifies a language. */
  hl?: string;
}

export const I18nLanguageSnippet: Schema.Schema<I18nLanguageSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      hl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "I18nLanguageSnippet",
  }) as any as Schema.Schema<I18nLanguageSnippet>;

export interface I18nLanguage {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the i18n language. */
  id?: string;
  /** The snippet object contains basic details about the i18n language, such as language code and human-readable name. */
  snippet?: I18nLanguageSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguage". */
  kind?: string;
}

export const I18nLanguage: Schema.Schema<I18nLanguage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(I18nLanguageSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "I18nLanguage",
  }) as any as Schema.Schema<I18nLanguage>;

export interface ChannelToStoreLinkDetailsBillingDetails {
  /** The current billing profile status. */
  billingStatus?:
    | "billingStatusUnspecified"
    | "billingStatusPending"
    | "billingStatusActive"
    | "billingStatusInactive"
    | (string & {});
}

export const ChannelToStoreLinkDetailsBillingDetails: Schema.Schema<ChannelToStoreLinkDetailsBillingDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      billingStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelToStoreLinkDetailsBillingDetails",
  }) as any as Schema.Schema<ChannelToStoreLinkDetailsBillingDetails>;

export interface ChannelConversionPing {
  /** Defines the context of the ping. */
  context?: "subscribe" | "unsubscribe" | "cview" | (string & {});
  /** The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping. */
  conversionUrl?: string;
}

export const ChannelConversionPing: Schema.Schema<ChannelConversionPing> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      context: Schema.optional(Schema.String),
      conversionUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelConversionPing",
  }) as any as Schema.Schema<ChannelConversionPing>;

export interface ActivityContentDetailsUpload {
  /** The ID that YouTube uses to uniquely identify the uploaded video. */
  videoId?: string;
}

export const ActivityContentDetailsUpload: Schema.Schema<ActivityContentDetailsUpload> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsUpload",
  }) as any as Schema.Schema<ActivityContentDetailsUpload>;

export interface IngestionInfo {
  /** The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL. */
  backupIngestionAddress?: string;
  /** The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME* */
  ingestionAddress?: string;
  /** This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
  rtmpsIngestionAddress?: string;
  /** This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
  rtmpsBackupIngestionAddress?: string;
  /** The stream name that YouTube assigns to the video stream. */
  streamName?: string;
}

export const IngestionInfo: Schema.Schema<IngestionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      backupIngestionAddress: Schema.optional(Schema.String),
      ingestionAddress: Schema.optional(Schema.String),
      rtmpsIngestionAddress: Schema.optional(Schema.String),
      rtmpsBackupIngestionAddress: Schema.optional(Schema.String),
      streamName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IngestionInfo",
  }) as any as Schema.Schema<IngestionInfo>;

export interface CdnSettings {
  /** The method or protocol used to transmit the video stream. */
  ingestionType?: "rtmp" | "dash" | "webrtc" | "hls" | (string & {});
  /** The frame rate of the inbound video data. */
  frameRate?: "30fps" | "60fps" | "variable" | (string & {});
  /** The ingestionInfo object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube. */
  ingestionInfo?: IngestionInfo;
  /** The format of the video stream that you are sending to Youtube. */
  format?: string;
  /** The resolution of the inbound video data. */
  resolution?:
    | "240p"
    | "360p"
    | "480p"
    | "720p"
    | "1080p"
    | "1440p"
    | "2160p"
    | "variable"
    | (string & {});
}

export const CdnSettings: Schema.Schema<CdnSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ingestionType: Schema.optional(Schema.String),
      frameRate: Schema.optional(Schema.String),
      ingestionInfo: Schema.optional(IngestionInfo),
      format: Schema.optional(Schema.String),
      resolution: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CdnSettings",
  }) as any as Schema.Schema<CdnSettings>;

export interface ActivityContentDetailsSubscription {
  /** The resourceId object contains information that identifies the resource that the user subscribed to. */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsSubscription: Schema.Schema<ActivityContentDetailsSubscription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsSubscription",
  }) as any as Schema.Schema<ActivityContentDetailsSubscription>;

export interface VideoPaidProductPlacementDetails {
  /** This boolean represents whether the video contains Paid Product Placement, Studio equivalent: https://screenshot.googleplex.com/4Me79DE6AfT2ktp.png */
  hasPaidProductPlacement?: boolean;
}

export const VideoPaidProductPlacementDetails: Schema.Schema<VideoPaidProductPlacementDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hasPaidProductPlacement: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VideoPaidProductPlacementDetails",
  }) as any as Schema.Schema<VideoPaidProductPlacementDetails>;

export interface Entity {
  id?: string;
  typeId?: string;
  url?: string;
}

export const Entity: Schema.Schema<Entity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      typeId: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface AbuseType {
  id?: string;
}

export const AbuseType: Schema.Schema<AbuseType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "AbuseType" }) as any as Schema.Schema<AbuseType>;

export interface CommentSnippetAuthorChannelId {
  /** The id of the author's YouTube channel. */
  value?: string;
}

export const CommentSnippetAuthorChannelId: Schema.Schema<CommentSnippetAuthorChannelId> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommentSnippetAuthorChannelId",
  }) as any as Schema.Schema<CommentSnippetAuthorChannelId>;

export interface CommentSnippet {
  /** Link to the author's YouTube channel, if any. */
  authorChannelUrl?: string;
  /** The date and time when the comment was originally published. */
  publishedAt?: string;
  /** The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future. */
  viewerRating?: "none" | "like" | "dislike" | (string & {});
  /** The total number of likes this comment has received. */
  likeCount?: number;
  /** The date and time when the comment was last updated. */
  updatedAt?: string;
  /** The comment's moderation status. Will not be set if the comments were requested through the id filter. */
  moderationStatus?:
    | "published"
    | "heldForReview"
    | "likelySpam"
    | "rejected"
    | (string & {});
  /** The name of the user who posted the comment. */
  authorDisplayName?: string;
  /** The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc. */
  textDisplay?: string;
  /** The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video or post comment it's the video/post's channel. */
  channelId?: string;
  authorChannelId?: CommentSnippetAuthorChannelId;
  /** The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author. */
  textOriginal?: string;
  /** The unique id of the top-level comment, only set for replies. */
  parentId?: string;
  /** The URL for the avatar of the user who posted the comment. */
  authorProfileImageUrl?: string;
  /** Whether the current viewer can rate this comment. */
  canRate?: boolean;
  /** The ID of the video the comment refers to, if any. */
  videoId?: string;
  /** The ID of the post the comment refers to, if any. */
  postId?: string;
}

export const CommentSnippet: Schema.Schema<CommentSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      authorChannelUrl: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      viewerRating: Schema.optional(Schema.String),
      likeCount: Schema.optional(Schema.Number),
      updatedAt: Schema.optional(Schema.String),
      moderationStatus: Schema.optional(Schema.String),
      authorDisplayName: Schema.optional(Schema.String),
      textDisplay: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      authorChannelId: Schema.optional(CommentSnippetAuthorChannelId),
      textOriginal: Schema.optional(Schema.String),
      parentId: Schema.optional(Schema.String),
      authorProfileImageUrl: Schema.optional(Schema.String),
      canRate: Schema.optional(Schema.Boolean),
      videoId: Schema.optional(Schema.String),
      postId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommentSnippet",
  }) as any as Schema.Schema<CommentSnippet>;

export interface Comment {
  /** The ID that YouTube uses to uniquely identify the comment. */
  id?: string;
  /** The snippet object contains basic details about the comment. */
  snippet?: CommentSnippet;
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#comment". */
  kind?: string;
}

export const Comment: Schema.Schema<Comment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(CommentSnippet),
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Comment" }) as any as Schema.Schema<Comment>;

export interface CommentThreadSnippet {
  /** The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If neither video_id nor post_id is set the comments refer to the channel itself. */
  channelId?: string;
  /** Whether the thread (and therefore all its comments) is visible to all YouTube users. */
  isPublic?: boolean;
  /** The top level comment of this thread. */
  topLevelComment?: Comment;
  /** Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field. */
  canReply?: boolean;
  /** The ID of the video the comments refer to, if any. */
  videoId?: string;
  /** The ID of the post the comments refer to, if any. */
  postId?: string;
  /** The total number of replies (not including the top level comment). */
  totalReplyCount?: number;
}

export const CommentThreadSnippet: Schema.Schema<CommentThreadSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      isPublic: Schema.optional(Schema.Boolean),
      topLevelComment: Schema.optional(Comment),
      canReply: Schema.optional(Schema.Boolean),
      videoId: Schema.optional(Schema.String),
      postId: Schema.optional(Schema.String),
      totalReplyCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "CommentThreadSnippet",
  }) as any as Schema.Schema<CommentThreadSnippet>;

export interface CommentThreadReplies {
  /** A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies. */
  comments?: Array<Comment>;
}

export const CommentThreadReplies: Schema.Schema<CommentThreadReplies> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      comments: Schema.optional(Schema.Array(Comment)),
    }),
  ).annotate({
    identifier: "CommentThreadReplies",
  }) as any as Schema.Schema<CommentThreadReplies>;

export interface CommentThread {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread". */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the comment thread. */
  id?: string;
  /** The snippet object contains basic details about the comment thread and also the top level comment. */
  snippet?: CommentThreadSnippet;
  /** Etag of this resource. */
  etag?: string;
  /** The replies object contains a limited number of replies (if any) to the top level comment found in the snippet. */
  replies?: CommentThreadReplies;
}

export const CommentThread: Schema.Schema<CommentThread> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(CommentThreadSnippet),
      etag: Schema.optional(Schema.String),
      replies: Schema.optional(CommentThreadReplies),
    }),
  ).annotate({
    identifier: "CommentThread",
  }) as any as Schema.Schema<CommentThread>;

export interface LiveStreamContentDetails {
  /** The ingestion URL where the closed captions of this stream are sent. */
  closedCaptionsIngestionUrl?: string;
  /** Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream. */
  isReusable?: boolean;
}

export const LiveStreamContentDetails: Schema.Schema<LiveStreamContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      closedCaptionsIngestionUrl: Schema.optional(Schema.String),
      isReusable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LiveStreamContentDetails",
  }) as any as Schema.Schema<LiveStreamContentDetails>;

export interface LiveStreamSnippet {
  /** The stream's title. The value must be between 1 and 128 characters long. */
  title?: string;
  /** The stream's description. The value cannot be longer than 10000 characters. */
  description?: string;
  /** The ID that YouTube uses to uniquely identify the channel that is transmitting the stream. */
  channelId?: string;
  isDefaultStream?: boolean;
  /** The date and time that the stream was created. */
  publishedAt?: string;
}

export const LiveStreamSnippet: Schema.Schema<LiveStreamSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      isDefaultStream: Schema.optional(Schema.Boolean),
      publishedAt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveStreamSnippet",
  }) as any as Schema.Schema<LiveStreamSnippet>;

export interface LiveStreamConfigurationIssue {
  /** The kind of error happening. */
  type?:
    | "gopSizeOver"
    | "gopSizeLong"
    | "gopSizeShort"
    | "openGop"
    | "badContainer"
    | "audioBitrateHigh"
    | "audioBitrateLow"
    | "audioSampleRate"
    | "bitrateHigh"
    | "bitrateLow"
    | "audioCodec"
    | "videoCodec"
    | "noAudioStream"
    | "noVideoStream"
    | "multipleVideoStreams"
    | "multipleAudioStreams"
    | "audioTooManyChannels"
    | "interlacedVideo"
    | "frameRateHigh"
    | "resolutionMismatch"
    | "videoCodecMismatch"
    | "videoInterlaceMismatch"
    | "videoProfileMismatch"
    | "videoBitrateMismatch"
    | "framerateMismatch"
    | "gopMismatch"
    | "audioSampleRateMismatch"
    | "audioStereoMismatch"
    | "audioCodecMismatch"
    | "audioBitrateMismatch"
    | "videoResolutionSuboptimal"
    | "videoResolutionUnsupported"
    | "videoIngestionStarved"
    | "videoIngestionFasterThanRealtime"
    | (string & {});
  /** The long-form description of the issue and how to resolve it. */
  description?: string;
  /** The short-form reason for this issue. */
  reason?: string;
  /** How severe this issue is to the stream. */
  severity?: "info" | "warning" | "error" | (string & {});
}

export const LiveStreamConfigurationIssue: Schema.Schema<LiveStreamConfigurationIssue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      reason: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveStreamConfigurationIssue",
  }) as any as Schema.Schema<LiveStreamConfigurationIssue>;

export interface LiveStreamHealthStatus {
  /** The status code of this stream */
  status?: "good" | "ok" | "bad" | "noData" | "revoked" | (string & {});
  /** The configurations issues on this stream */
  configurationIssues?: Array<LiveStreamConfigurationIssue>;
  /** The last time this status was updated (in seconds) */
  lastUpdateTimeSeconds?: string;
}

export const LiveStreamHealthStatus: Schema.Schema<LiveStreamHealthStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      configurationIssues: Schema.optional(
        Schema.Array(LiveStreamConfigurationIssue),
      ),
      lastUpdateTimeSeconds: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveStreamHealthStatus",
  }) as any as Schema.Schema<LiveStreamHealthStatus>;

export interface LiveStreamStatus {
  streamStatus?:
    | "created"
    | "ready"
    | "active"
    | "inactive"
    | "error"
    | (string & {});
  /** The health status of the stream. */
  healthStatus?: LiveStreamHealthStatus;
}

export const LiveStreamStatus: Schema.Schema<LiveStreamStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      streamStatus: Schema.optional(Schema.String),
      healthStatus: Schema.optional(LiveStreamHealthStatus),
    }),
  ).annotate({
    identifier: "LiveStreamStatus",
  }) as any as Schema.Schema<LiveStreamStatus>;

export interface LiveStream {
  /** The content_details object contains information about the stream, including the closed captions ingestion URL. */
  contentDetails?: LiveStreamContentDetails;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream". */
  kind?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube assigns to uniquely identify the stream. */
  id?: string;
  /** The snippet object contains basic details about the stream, including its channel, title, and description. */
  snippet?: LiveStreamSnippet;
  /** The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube. */
  cdn?: CdnSettings;
  /** The status object contains information about live stream's status. */
  status?: LiveStreamStatus;
}

export const LiveStream: Schema.Schema<LiveStream> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDetails: Schema.optional(LiveStreamContentDetails),
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(LiveStreamSnippet),
      cdn: Schema.optional(CdnSettings),
      status: Schema.optional(LiveStreamStatus),
    }),
  ).annotate({ identifier: "LiveStream" }) as any as Schema.Schema<LiveStream>;

export interface TokenPagination {}

export const TokenPagination: Schema.Schema<TokenPagination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "TokenPagination",
  }) as any as Schema.Schema<TokenPagination>;

export interface LiveStreamListResponse {
  /** A list of live streams that match the request criteria. */
  items?: Array<LiveStream>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStreamListResponse". */
  kind?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
}

export const LiveStreamListResponse: Schema.Schema<LiveStreamListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(Schema.Array(LiveStream)),
      prevPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveStreamListResponse",
  }) as any as Schema.Schema<LiveStreamListResponse>;

export interface ChannelLocalization {
  /** The localized strings for channel's title. */
  title?: string;
  /** The localized strings for channel's description. */
  description?: string;
}

export const ChannelLocalization: Schema.Schema<ChannelLocalization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelLocalization",
  }) as any as Schema.Schema<ChannelLocalization>;

export interface ChannelSnippet {
  /** The language of the channel's default title and description. */
  defaultLanguage?: string;
  /** The channel's title. */
  title?: string;
  /** The description of the channel. */
  description?: string;
  /** The custom url of the channel. */
  customUrl?: string;
  /** The date and time that the channel was created. */
  publishedAt?: string;
  /** Localized title and description, read-only. */
  localized?: ChannelLocalization;
  /** The country of the channel. */
  country?: string;
  /** A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate. */
  thumbnails?: ThumbnailDetails;
}

export const ChannelSnippet: Schema.Schema<ChannelSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultLanguage: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      customUrl: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      localized: Schema.optional(ChannelLocalization),
      country: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
    }),
  ).annotate({
    identifier: "ChannelSnippet",
  }) as any as Schema.Schema<ChannelSnippet>;

export interface ChannelProfileDetails {
  /** The channels's avatar URL. */
  profileImageUrl?: string;
  /** The YouTube channel ID. */
  channelId?: string;
  /** The channel's display name. */
  displayName?: string;
  /** The channel's URL. */
  channelUrl?: string;
}

export const ChannelProfileDetails: Schema.Schema<ChannelProfileDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      profileImageUrl: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      channelUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelProfileDetails",
  }) as any as Schema.Schema<ChannelProfileDetails>;

export interface LiveChatBanSnippet {
  /** The chat this ban is pertinent to. */
  liveChatId?: string;
  /** The type of ban. */
  type?:
    | "liveChatBanTypeUnspecified"
    | "permanent"
    | "temporary"
    | (string & {});
  /** The duration of a ban, only filled if the ban has type TEMPORARY. */
  banDurationSeconds?: string;
  bannedUserDetails?: ChannelProfileDetails;
}

export const LiveChatBanSnippet: Schema.Schema<LiveChatBanSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      liveChatId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      banDurationSeconds: Schema.optional(Schema.String),
      bannedUserDetails: Schema.optional(ChannelProfileDetails),
    }),
  ).annotate({
    identifier: "LiveChatBanSnippet",
  }) as any as Schema.Schema<LiveChatBanSnippet>;

export interface VideoCategorySnippet {
  /** The video category's title. */
  title?: string;
  /** The YouTube channel that created the video category. */
  channelId?: string;
  assignable?: boolean;
}

export const VideoCategorySnippet: Schema.Schema<VideoCategorySnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      assignable: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VideoCategorySnippet",
  }) as any as Schema.Schema<VideoCategorySnippet>;

export interface LiveChatPollDetailsPollMetadataPollOption {
  optionText?: string;
  tally?: string;
}

export const LiveChatPollDetailsPollMetadataPollOption: Schema.Schema<LiveChatPollDetailsPollMetadataPollOption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      optionText: Schema.optional(Schema.String),
      tally: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatPollDetailsPollMetadataPollOption",
  }) as any as Schema.Schema<LiveChatPollDetailsPollMetadataPollOption>;

export interface PropertyValue {
  /** A property. */
  property?: string;
  /** The property's value. */
  value?: string;
}

export const PropertyValue: Schema.Schema<PropertyValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      property: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PropertyValue",
  }) as any as Schema.Schema<PropertyValue>;

export interface SubscriptionSnippet {
  /** The id object contains information about the channel that the user subscribed to. */
  resourceId?: ResourceId;
  /** A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The ID that YouTube uses to uniquely identify the subscriber's channel. */
  channelId?: string;
  /** The date and time that the subscription was created. */
  publishedAt?: string;
  /** The subscription's title. */
  title?: string;
  /** The subscription's details. */
  description?: string;
}

export const SubscriptionSnippet: Schema.Schema<SubscriptionSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
      thumbnails: Schema.optional(ThumbnailDetails),
      channelId: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubscriptionSnippet",
  }) as any as Schema.Schema<SubscriptionSnippet>;

export interface SubscriptionSubscriberSnippet {
  /** The channel ID of the subscriber. */
  channelId?: string;
  /** The title of the subscriber. */
  title?: string;
  /** The description of the subscriber. */
  description?: string;
  /** Thumbnails for this subscriber. */
  thumbnails?: ThumbnailDetails;
}

export const SubscriptionSubscriberSnippet: Schema.Schema<SubscriptionSubscriberSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelId: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
    }),
  ).annotate({
    identifier: "SubscriptionSubscriberSnippet",
  }) as any as Schema.Schema<SubscriptionSubscriberSnippet>;

export interface SubscriptionContentDetails {
  /** The approximate number of items that the subscription points to. */
  totalItemCount?: number;
  /** The number of new items in the subscription since its content was last read. */
  newItemCount?: number;
  /** The type of activity this subscription is for (only uploads, everything). */
  activityType?:
    | "subscriptionActivityTypeUnspecified"
    | "all"
    | "uploads"
    | (string & {});
}

export const SubscriptionContentDetails: Schema.Schema<SubscriptionContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      totalItemCount: Schema.optional(Schema.Number),
      newItemCount: Schema.optional(Schema.Number),
      activityType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubscriptionContentDetails",
  }) as any as Schema.Schema<SubscriptionContentDetails>;

export interface Subscription {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the subscription. */
  id?: string;
  /** The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to. */
  snippet?: SubscriptionSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscription". */
  kind?: string;
  /** The subscriberSnippet object contains basic details about the subscriber. */
  subscriberSnippet?: SubscriptionSubscriberSnippet;
  /** The contentDetails object contains basic statistics about the subscription. */
  contentDetails?: SubscriptionContentDetails;
}

export const Subscription: Schema.Schema<Subscription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(SubscriptionSnippet),
      kind: Schema.optional(Schema.String),
      subscriberSnippet: Schema.optional(SubscriptionSubscriberSnippet),
      contentDetails: Schema.optional(SubscriptionContentDetails),
    }),
  ).annotate({
    identifier: "Subscription",
  }) as any as Schema.Schema<Subscription>;

export interface SubscriptionListResponse {
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscriptionListResponse". */
  kind?: string;
  /** A list of subscriptions that match the request criteria. */
  items?: Array<Subscription>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
}

export const SubscriptionListResponse: Schema.Schema<SubscriptionListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Subscription)),
      prevPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SubscriptionListResponse",
  }) as any as Schema.Schema<SubscriptionListResponse>;

export interface SuperStickerMetadata {
  /** Internationalized alt text that describes the sticker image and any animation associated with it. */
  altText?: string;
  /** Specifies the localization language in which the alt text is returned. */
  altTextLanguage?: string;
  /** Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker. */
  stickerId?: string;
}

export const SuperStickerMetadata: Schema.Schema<SuperStickerMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      altText: Schema.optional(Schema.String),
      altTextLanguage: Schema.optional(Schema.String),
      stickerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SuperStickerMetadata",
  }) as any as Schema.Schema<SuperStickerMetadata>;

export interface SuperChatEventSnippet {
  /** Details about the supporter. */
  supporterDetails?: ChannelProfileDetails;
  /** The currency in which the purchase was made. ISO 4217. */
  currency?: string;
  /** The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000. */
  amountMicros?: string;
  /** The date and time when the event occurred. */
  createdAt?: string;
  /** A rendered string that displays the purchase amount and currency (e.g., "$1.00"). The string is rendered for the given language. */
  displayString?: string;
  /** The tier for the paid message, which is based on the amount of money spent to purchase the message. */
  messageType?: number;
  /** If this event is a Super Sticker event, this field will contain metadata about the Super Sticker. */
  superStickerMetadata?: SuperStickerMetadata;
  /** The text contents of the comment left by the user. */
  commentText?: string;
  /** Channel id where the event occurred. */
  channelId?: string;
  /** True if this event is a Super Sticker event. */
  isSuperStickerEvent?: boolean;
}

export const SuperChatEventSnippet: Schema.Schema<SuperChatEventSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      supporterDetails: Schema.optional(ChannelProfileDetails),
      currency: Schema.optional(Schema.String),
      amountMicros: Schema.optional(Schema.String),
      createdAt: Schema.optional(Schema.String),
      displayString: Schema.optional(Schema.String),
      messageType: Schema.optional(Schema.Number),
      superStickerMetadata: Schema.optional(SuperStickerMetadata),
      commentText: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      isSuperStickerEvent: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "SuperChatEventSnippet",
  }) as any as Schema.Schema<SuperChatEventSnippet>;

export interface SuperChatEvent {
  /** Identifies what kind of resource this is. Value: the fixed string `"youtube#superChatEvent"`. */
  kind?: string;
  /** The ID that YouTube assigns to uniquely identify the Super Chat event. */
  id?: string;
  /** The `snippet` object contains basic details about the Super Chat event. */
  snippet?: SuperChatEventSnippet;
  /** Etag of this resource. */
  etag?: string;
}

export const SuperChatEvent: Schema.Schema<SuperChatEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(SuperChatEventSnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SuperChatEvent",
  }) as any as Schema.Schema<SuperChatEvent>;

export interface ChannelSectionTargeting {
  /** The country the channel section is targeting. */
  countries?: Array<string>;
  /** The language the channel section is targeting. */
  languages?: Array<string>;
  /** The region the channel section is targeting. */
  regions?: Array<string>;
}

export const ChannelSectionTargeting: Schema.Schema<ChannelSectionTargeting> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      countries: Schema.optional(Schema.Array(Schema.String)),
      languages: Schema.optional(Schema.Array(Schema.String)),
      regions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ChannelSectionTargeting",
  }) as any as Schema.Schema<ChannelSectionTargeting>;

export interface WatchSettings {
  /** The background color for the video watch page's branded area. */
  textColor?: string;
  /** The text color for the video watch page's branded area. */
  backgroundColor?: string;
  /** An ID that uniquely identifies a playlist that displays next to the video player. */
  featuredPlaylistId?: string;
}

export const WatchSettings: Schema.Schema<WatchSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textColor: Schema.optional(Schema.String),
      backgroundColor: Schema.optional(Schema.String),
      featuredPlaylistId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WatchSettings",
  }) as any as Schema.Schema<WatchSettings>;

export interface LiveChatSuperStickerDetails {
  /** A rendered string that displays the fund amount and currency to the user. */
  amountDisplayString?: string;
  /** The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1. */
  tier?: number;
  /** The currency in which the purchase was made. */
  currency?: string;
  /** Information about the Super Sticker. */
  superStickerMetadata?: SuperStickerMetadata;
  /** The amount purchased by the user, in micros (1,750,000 micros = 1.75). */
  amountMicros?: string;
}

export const LiveChatSuperStickerDetails: Schema.Schema<LiveChatSuperStickerDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      amountDisplayString: Schema.optional(Schema.String),
      tier: Schema.optional(Schema.Number),
      currency: Schema.optional(Schema.String),
      superStickerMetadata: Schema.optional(SuperStickerMetadata),
      amountMicros: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatSuperStickerDetails",
  }) as any as Schema.Schema<LiveChatSuperStickerDetails>;

export interface LiveChatMessageDeletedDetails {
  deletedMessageId?: string;
}

export const LiveChatMessageDeletedDetails: Schema.Schema<LiveChatMessageDeletedDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deletedMessageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatMessageDeletedDetails",
  }) as any as Schema.Schema<LiveChatMessageDeletedDetails>;

export interface LiveChatFanFundingEventDetails {
  /** The currency in which the fund was made. */
  currency?: string;
  /** The amount of the fund. */
  amountMicros?: string;
  /** A rendered string that displays the fund amount and currency to the user. */
  amountDisplayString?: string;
  /** The comment added by the user to this fan funding event. */
  userComment?: string;
}

export const LiveChatFanFundingEventDetails: Schema.Schema<LiveChatFanFundingEventDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currency: Schema.optional(Schema.String),
      amountMicros: Schema.optional(Schema.String),
      amountDisplayString: Schema.optional(Schema.String),
      userComment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatFanFundingEventDetails",
  }) as any as Schema.Schema<LiveChatFanFundingEventDetails>;

export interface LiveChatMembershipGiftingDetails {
  /** The number of gift memberships purchased by the user. */
  giftMembershipsCount?: number;
  /** The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
  giftMembershipsLevelName?: string;
}

export const LiveChatMembershipGiftingDetails: Schema.Schema<LiveChatMembershipGiftingDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      giftMembershipsCount: Schema.optional(Schema.Number),
      giftMembershipsLevelName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatMembershipGiftingDetails",
  }) as any as Schema.Schema<LiveChatMembershipGiftingDetails>;

export interface LiveChatPollDetailsPollMetadata {
  /** The options will be returned in the order that is displayed in 1P */
  options?: Array<LiveChatPollDetailsPollMetadataPollOption>;
  questionText?: string;
}

export const LiveChatPollDetailsPollMetadata: Schema.Schema<LiveChatPollDetailsPollMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(
        Schema.Array(LiveChatPollDetailsPollMetadataPollOption),
      ),
      questionText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatPollDetailsPollMetadata",
  }) as any as Schema.Schema<LiveChatPollDetailsPollMetadata>;

export interface LiveChatPollDetails {
  status?: "unknown" | "active" | "closed" | (string & {});
  metadata?: LiveChatPollDetailsPollMetadata;
}

export const LiveChatPollDetails: Schema.Schema<LiveChatPollDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      metadata: Schema.optional(LiveChatPollDetailsPollMetadata),
    }),
  ).annotate({
    identifier: "LiveChatPollDetails",
  }) as any as Schema.Schema<LiveChatPollDetails>;

export interface LiveChatMemberMilestoneChatDetails {
  /** The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
  memberLevelName?: string;
  /** The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member. */
  userComment?: string;
  /** The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube users. */
  memberMonth?: number;
}

export const LiveChatMemberMilestoneChatDetails: Schema.Schema<LiveChatMemberMilestoneChatDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberLevelName: Schema.optional(Schema.String),
      userComment: Schema.optional(Schema.String),
      memberMonth: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LiveChatMemberMilestoneChatDetails",
  }) as any as Schema.Schema<LiveChatMemberMilestoneChatDetails>;

export interface LiveChatSuperChatDetails {
  /** A rendered string that displays the fund amount and currency to the user. */
  amountDisplayString?: string;
  /** The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1. */
  tier?: number;
  /** The amount purchased by the user, in micros (1,750,000 micros = 1.75). */
  amountMicros?: string;
  /** The comment added by the user to this Super Chat event. */
  userComment?: string;
  /** The currency in which the purchase was made. */
  currency?: string;
}

export const LiveChatSuperChatDetails: Schema.Schema<LiveChatSuperChatDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      amountDisplayString: Schema.optional(Schema.String),
      tier: Schema.optional(Schema.Number),
      amountMicros: Schema.optional(Schema.String),
      userComment: Schema.optional(Schema.String),
      currency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatSuperChatDetails",
  }) as any as Schema.Schema<LiveChatSuperChatDetails>;

export interface LiveChatGiftDetails {
  /** The duration of the gift. */
  giftDuration?: string;
  /** The BCP-47 language code of the gift. */
  language?: string;
  /** The URL of the gift image. */
  giftUrl?: string;
  /** Whether the gift involves a visual effect. */
  hasVisualEffect?: boolean;
  /** The name of the gift. */
  giftName?: string;
  /** The cost of the gift in jewels. */
  jewelsCount?: number;
  /** The alternative text to be used for accessibility. */
  altText?: string;
  /** The number of times the gift has been sent in a row. */
  comboCount?: number;
}

export const LiveChatGiftDetails: Schema.Schema<LiveChatGiftDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      giftDuration: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
      giftUrl: Schema.optional(Schema.String),
      hasVisualEffect: Schema.optional(Schema.Boolean),
      giftName: Schema.optional(Schema.String),
      jewelsCount: Schema.optional(Schema.Number),
      altText: Schema.optional(Schema.String),
      comboCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LiveChatGiftDetails",
  }) as any as Schema.Schema<LiveChatGiftDetails>;

export interface LiveChatMessageRetractedDetails {
  retractedMessageId?: string;
}

export const LiveChatMessageRetractedDetails: Schema.Schema<LiveChatMessageRetractedDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      retractedMessageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatMessageRetractedDetails",
  }) as any as Schema.Schema<LiveChatMessageRetractedDetails>;

export interface LiveChatNewSponsorDetails {
  /** The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
  memberLevelName?: string;
  /** If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false. */
  isUpgrade?: boolean;
}

export const LiveChatNewSponsorDetails: Schema.Schema<LiveChatNewSponsorDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberLevelName: Schema.optional(Schema.String),
      isUpgrade: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LiveChatNewSponsorDetails",
  }) as any as Schema.Schema<LiveChatNewSponsorDetails>;

export interface LiveChatTextMessageDetails {
  /** The user's message. */
  messageText?: string;
}

export const LiveChatTextMessageDetails: Schema.Schema<LiveChatTextMessageDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatTextMessageDetails",
  }) as any as Schema.Schema<LiveChatTextMessageDetails>;

export interface LiveChatUserBannedMessageDetails {
  /** The details of the user that was banned. */
  bannedUserDetails?: ChannelProfileDetails;
  /** The type of ban. */
  banType?: "permanent" | "temporary" | (string & {});
  /** The duration of the ban. This property is only present if the banType is temporary. */
  banDurationSeconds?: string;
}

export const LiveChatUserBannedMessageDetails: Schema.Schema<LiveChatUserBannedMessageDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bannedUserDetails: Schema.optional(ChannelProfileDetails),
      banType: Schema.optional(Schema.String),
      banDurationSeconds: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatUserBannedMessageDetails",
  }) as any as Schema.Schema<LiveChatUserBannedMessageDetails>;

export interface LiveChatGiftMembershipReceivedDetails {
  /** The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
  memberLevelName?: string;
  /** The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message. */
  gifterChannelId?: string;
  /** The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'. */
  associatedMembershipGiftingMessageId?: string;
}

export const LiveChatGiftMembershipReceivedDetails: Schema.Schema<LiveChatGiftMembershipReceivedDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberLevelName: Schema.optional(Schema.String),
      gifterChannelId: Schema.optional(Schema.String),
      associatedMembershipGiftingMessageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatGiftMembershipReceivedDetails",
  }) as any as Schema.Schema<LiveChatGiftMembershipReceivedDetails>;

export interface LiveChatMessageSnippet {
  /** Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'. */
  superStickerDetails?: LiveChatSuperStickerDetails;
  liveChatId?: string;
  messageDeletedDetails?: LiveChatMessageDeletedDetails;
  /** Details about the funding event, this is only set if the type is 'fanFundingEvent'. */
  fanFundingEventDetails?: LiveChatFanFundingEventDetails;
  /** Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'. */
  membershipGiftingDetails?: LiveChatMembershipGiftingDetails;
  /** Details about the poll event, this is only set if the type is 'pollEvent'. */
  pollDetails?: LiveChatPollDetails;
  /** Whether the message has display content that should be displayed to users. */
  hasDisplayContent?: boolean;
  /** Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'. */
  memberMilestoneChatDetails?: LiveChatMemberMilestoneChatDetails;
  /** The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase pollEvent - the user that created the poll */
  authorChannelId?: string;
  /** Details about the Super Chat event, this is only set if the type is 'superChatEvent'. */
  superChatDetails?: LiveChatSuperChatDetails;
  /** Details about the gift event, this is only set if the type is 'giftEvent'. */
  giftDetails?: LiveChatGiftDetails;
  /** Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent. */
  displayMessage?: string;
  messageRetractedDetails?: LiveChatMessageRetractedDetails;
  /** Details about the New Member Announcement event, this is only set if the type is 'newSponsorEvent'. Please note that "member" is the new term for "sponsor". */
  newSponsorDetails?: LiveChatNewSponsorDetails;
  /** The date and time when the message was orignally published. */
  publishedAt?: string;
  /** The type of message, this will always be present, it determines the contents of the message as well as which fields will be present. */
  type?:
    | "invalidType"
    | "textMessageEvent"
    | "tombstone"
    | "fanFundingEvent"
    | "chatEndedEvent"
    | "sponsorOnlyModeStartedEvent"
    | "sponsorOnlyModeEndedEvent"
    | "newSponsorEvent"
    | "memberMilestoneChatEvent"
    | "membershipGiftingEvent"
    | "giftMembershipReceivedEvent"
    | "messageDeletedEvent"
    | "messageRetractedEvent"
    | "userBannedEvent"
    | "superChatEvent"
    | "superStickerEvent"
    | "pollEvent"
    | "giftEvent"
    | (string & {});
  /** Details about the text message, this is only set if the type is 'textMessageEvent'. */
  textMessageDetails?: LiveChatTextMessageDetails;
  userBannedDetails?: LiveChatUserBannedMessageDetails;
  /** Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'. */
  giftMembershipReceivedDetails?: LiveChatGiftMembershipReceivedDetails;
}

export const LiveChatMessageSnippet: Schema.Schema<LiveChatMessageSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      superStickerDetails: Schema.optional(LiveChatSuperStickerDetails),
      liveChatId: Schema.optional(Schema.String),
      messageDeletedDetails: Schema.optional(LiveChatMessageDeletedDetails),
      fanFundingEventDetails: Schema.optional(LiveChatFanFundingEventDetails),
      membershipGiftingDetails: Schema.optional(
        LiveChatMembershipGiftingDetails,
      ),
      pollDetails: Schema.optional(LiveChatPollDetails),
      hasDisplayContent: Schema.optional(Schema.Boolean),
      memberMilestoneChatDetails: Schema.optional(
        LiveChatMemberMilestoneChatDetails,
      ),
      authorChannelId: Schema.optional(Schema.String),
      superChatDetails: Schema.optional(LiveChatSuperChatDetails),
      giftDetails: Schema.optional(LiveChatGiftDetails),
      displayMessage: Schema.optional(Schema.String),
      messageRetractedDetails: Schema.optional(LiveChatMessageRetractedDetails),
      newSponsorDetails: Schema.optional(LiveChatNewSponsorDetails),
      publishedAt: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      textMessageDetails: Schema.optional(LiveChatTextMessageDetails),
      userBannedDetails: Schema.optional(LiveChatUserBannedMessageDetails),
      giftMembershipReceivedDetails: Schema.optional(
        LiveChatGiftMembershipReceivedDetails,
      ),
    }),
  ).annotate({
    identifier: "LiveChatMessageSnippet",
  }) as any as Schema.Schema<LiveChatMessageSnippet>;

export interface LiveChatMessageAuthorDetails {
  /** The channel's display name. */
  displayName?: string;
  /** The channel's URL. */
  channelUrl?: string;
  /** Whether the author is the owner of the live chat. */
  isChatOwner?: boolean;
  /** The YouTube channel ID. */
  channelId?: string;
  /** Whether the author's identity has been verified by YouTube. */
  isVerified?: boolean;
  /** The channels's avatar URL. */
  profileImageUrl?: string;
  /** Whether the author is a sponsor of the live chat. */
  isChatSponsor?: boolean;
  /** Whether the author is a moderator of the live chat. */
  isChatModerator?: boolean;
}

export const LiveChatMessageAuthorDetails: Schema.Schema<LiveChatMessageAuthorDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      channelUrl: Schema.optional(Schema.String),
      isChatOwner: Schema.optional(Schema.Boolean),
      channelId: Schema.optional(Schema.String),
      isVerified: Schema.optional(Schema.Boolean),
      profileImageUrl: Schema.optional(Schema.String),
      isChatSponsor: Schema.optional(Schema.Boolean),
      isChatModerator: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LiveChatMessageAuthorDetails",
  }) as any as Schema.Schema<LiveChatMessageAuthorDetails>;

export interface LiveChatMessage {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage". */
  kind?: string;
  /** The ID that YouTube assigns to uniquely identify the message. */
  id?: string;
  /** The snippet object contains basic details about the message. */
  snippet?: LiveChatMessageSnippet;
  /** Etag of this resource. */
  etag?: string;
  /** The authorDetails object contains basic details about the user that posted this message. */
  authorDetails?: LiveChatMessageAuthorDetails;
}

export const LiveChatMessage: Schema.Schema<LiveChatMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(LiveChatMessageSnippet),
      etag: Schema.optional(Schema.String),
      authorDetails: Schema.optional(LiveChatMessageAuthorDetails),
    }),
  ).annotate({
    identifier: "LiveChatMessage",
  }) as any as Schema.Schema<LiveChatMessage>;

export interface LiveChatMessageListResponse {
  /** The date and time when the underlying stream went offline. */
  offlineAt?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  nextPageToken?: string;
  /** Etag of this resource. */
  etag?: string;
  /** Set when there is an active poll. */
  activePollItem?: LiveChatMessage;
  /** The amount of time the client should wait before polling again. */
  pollingIntervalMillis?: number;
  items?: Array<LiveChatMessage>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessageListResponse". */
  kind?: string;
}

export const LiveChatMessageListResponse: Schema.Schema<LiveChatMessageListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      offlineAt: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      nextPageToken: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      activePollItem: Schema.optional(LiveChatMessage),
      pollingIntervalMillis: Schema.optional(Schema.Number),
      items: Schema.optional(Schema.Array(LiveChatMessage)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatMessageListResponse",
  }) as any as Schema.Schema<LiveChatMessageListResponse>;

export interface PlaylistStatus {
  /** The playlist's privacy status. */
  privacyStatus?: "public" | "unlisted" | "private" | (string & {});
  /** The playlist's podcast status. */
  podcastStatus?: "enabled" | "disabled" | (string & {});
}

export const PlaylistStatus: Schema.Schema<PlaylistStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      privacyStatus: Schema.optional(Schema.String),
      podcastStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistStatus",
  }) as any as Schema.Schema<PlaylistStatus>;

export interface ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails {
  /** The current merchant affiliate program status. */
  status?:
    | "merchantAffiliateProgramStatusUnspecified"
    | "merchantAffiliateProgramStatusEligible"
    | "merchantAffiliateProgramStatusActive"
    | "merchantAffiliateProgramStatusPaused"
    | (string & {});
}

export const ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails: Schema.Schema<ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails",
  }) as any as Schema.Schema<ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails>;

export interface ChannelToStoreLinkDetails {
  /** Name of the store. */
  storeName?: string;
  /** Information specific to merchant affiliate program (read-only). */
  merchantAffiliateProgramDetails?: ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails;
  /** Landing page of the store. */
  storeUrl?: string;
  /** Information specific to billing (read-only). */
  billingDetails?: ChannelToStoreLinkDetailsBillingDetails;
  /** Google Merchant Center id of the store. */
  merchantId?: string;
}

export const ChannelToStoreLinkDetails: Schema.Schema<ChannelToStoreLinkDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      storeName: Schema.optional(Schema.String),
      merchantAffiliateProgramDetails: Schema.optional(
        ChannelToStoreLinkDetailsMerchantAffiliateProgramDetails,
      ),
      storeUrl: Schema.optional(Schema.String),
      billingDetails: Schema.optional(ChannelToStoreLinkDetailsBillingDetails),
      merchantId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelToStoreLinkDetails",
  }) as any as Schema.Schema<ChannelToStoreLinkDetails>;

export interface VideoSuggestionsTagSuggestion {
  /** The keyword tag suggested for the video. */
  tag?: string;
  /** A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword. */
  categoryRestricts?: Array<string>;
}

export const VideoSuggestionsTagSuggestion: Schema.Schema<VideoSuggestionsTagSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tag: Schema.optional(Schema.String),
      categoryRestricts: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoSuggestionsTagSuggestion",
  }) as any as Schema.Schema<VideoSuggestionsTagSuggestion>;

export interface VideoContentDetailsRegionRestriction {
  /** A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries. */
  allowed?: Array<string>;
  /** A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries. */
  blocked?: Array<string>;
}

export const VideoContentDetailsRegionRestriction: Schema.Schema<VideoContentDetailsRegionRestriction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowed: Schema.optional(Schema.Array(Schema.String)),
      blocked: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoContentDetailsRegionRestriction",
  }) as any as Schema.Schema<VideoContentDetailsRegionRestriction>;

export interface I18nRegionSnippet {
  /** The region code as a 2-letter ISO country code. */
  gl?: string;
  /** The human-readable name of the region. */
  name?: string;
}

export const I18nRegionSnippet: Schema.Schema<I18nRegionSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gl: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "I18nRegionSnippet",
  }) as any as Schema.Schema<I18nRegionSnippet>;

export interface VideoRating {
  /** Rating of a video. */
  rating?: "none" | "like" | "dislike" | (string & {});
  /** The ID that YouTube uses to uniquely identify the video. */
  videoId?: string;
}

export const VideoRating: Schema.Schema<VideoRating> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rating: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoRating",
  }) as any as Schema.Schema<VideoRating>;

export interface ContentRating {
  /** The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands). */
  kijkwijzerRating?:
    | "kijkwijzerUnspecified"
    | "kijkwijzerAl"
    | "kijkwijzer6"
    | "kijkwijzer9"
    | "kijkwijzer12"
    | "kijkwijzer16"
    | "kijkwijzer18"
    | "kijkwijzerUnrated"
    | (string & {});
  /** The video's rating in Peru. */
  pefilmRating?:
    | "pefilmUnspecified"
    | "pefilmPt"
    | "pefilmPg"
    | "pefilm14"
    | "pefilm18"
    | "pefilmUnrated"
    | (string & {});
  /** The video's rating from Malaysia's Film Censorship Board. */
  fcbmRating?:
    | "fcbmUnspecified"
    | "fcbmU"
    | "fcbmPg13"
    | "fcbmP13"
    | "fcbm18"
    | "fcbm18sx"
    | "fcbm18pa"
    | "fcbm18sg"
    | "fcbm18pl"
    | "fcbmUnrated"
    | (string & {});
  /** The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia). */
  nkclvRating?:
    | "nkclvUnspecified"
    | "nkclvU"
    | "nkclv7plus"
    | "nkclv12plus"
    | "nkclv16plus"
    | "nkclv18plus"
    | "nkclvUnrated"
    | (string & {});
  /** The video's rating from Indonesia's Lembaga Sensor Film. */
  lsfRating?:
    | "lsfUnspecified"
    | "lsfSu"
    | "lsfA"
    | "lsfBo"
    | "lsf13"
    | "lsfR"
    | "lsf17"
    | "lsfD"
    | "lsf21"
    | "lsfUnrated"
    | (string & {});
  /** The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating. */
  djctqRating?:
    | "djctqUnspecified"
    | "djctqL"
    | "djctq10"
    | "djctq12"
    | "djctq14"
    | "djctq16"
    | "djctq18"
    | "djctqEr"
    | "djctqL10"
    | "djctqL12"
    | "djctqL14"
    | "djctqL16"
    | "djctqL18"
    | "djctq1012"
    | "djctq1014"
    | "djctq1016"
    | "djctq1018"
    | "djctq1214"
    | "djctq1216"
    | "djctq1218"
    | "djctq1416"
    | "djctq1418"
    | "djctq1618"
    | "djctqUnrated"
    | (string & {});
  /** The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM). */
  agcomRating?:
    | "agcomUnspecified"
    | "agcomT"
    | "agcomVm14"
    | "agcomVm18"
    | "agcomUnrated"
    | (string & {});
  /** The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy). */
  mibacRating?:
    | "mibacUnspecified"
    | "mibacT"
    | "mibacVap"
    | "mibacVm6"
    | "mibacVm12"
    | "mibacVm14"
    | "mibacVm16"
    | "mibacVm18"
    | "mibacUnrated"
    | (string & {});
  /** The video's rating from Ireland's Raidió Teilifís Éireann. */
  rteRating?:
    | "rteUnspecified"
    | "rteGa"
    | "rteCh"
    | "rtePs"
    | "rteMa"
    | "rteUnrated"
    | (string & {});
  /** The video's rating from the Maldives National Bureau of Classification. */
  nbcRating?:
    | "nbcUnspecified"
    | "nbcG"
    | "nbcPg"
    | "nbc12plus"
    | "nbc15plus"
    | "nbc18plus"
    | "nbc18plusr"
    | "nbcPu"
    | "nbcUnrated"
    | (string & {});
  /** The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian Broadcast Standards Council website. */
  catvfrRating?:
    | "catvfrUnspecified"
    | "catvfrG"
    | "catvfr8plus"
    | "catvfr13plus"
    | "catvfr16plus"
    | "catvfr18plus"
    | "catvfrUnrated"
    | "catvfrE"
    | (string & {});
  /** The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information. */
  ifcoRating?:
    | "ifcoUnspecified"
    | "ifcoG"
    | "ifcoPg"
    | "ifco12"
    | "ifco12a"
    | "ifco15"
    | "ifco15a"
    | "ifco16"
    | "ifco18"
    | "ifcoUnrated"
    | (string & {});
  /** Rating system in France - Commission de classification cinematographique */
  cncRating?:
    | "cncUnspecified"
    | "cncT"
    | "cnc10"
    | "cnc12"
    | "cnc16"
    | "cnc18"
    | "cncE"
    | "cncInterdiction"
    | "cncUnrated"
    | (string & {});
  /** The video's rating from Statens medieråd (Sweden's National Media Council). */
  smsaRating?:
    | "smsaUnspecified"
    | "smsaA"
    | "smsa7"
    | "smsa11"
    | "smsa15"
    | "smsaUnrated"
    | (string & {});
  /** The video's rating in the Czech Republic. */
  czfilmRating?:
    | "czfilmUnspecified"
    | "czfilmU"
    | "czfilm12"
    | "czfilm14"
    | "czfilm18"
    | "czfilmUnrated"
    | (string & {});
  /** The video's rating in Slovakia. */
  skfilmRating?:
    | "skfilmUnspecified"
    | "skfilmG"
    | "skfilmP2"
    | "skfilmP5"
    | "skfilmP8"
    | "skfilmUnrated"
    | (string & {});
  /** Reasons that explain why the video received its DJCQT (Brazil) rating. */
  djctqRatingReasons?: Array<
    | "djctqRatingReasonUnspecified"
    | "djctqViolence"
    | "djctqExtremeViolence"
    | "djctqSexualContent"
    | "djctqNudity"
    | "djctqSex"
    | "djctqExplicitSex"
    | "djctqDrugs"
    | "djctqLegalDrugs"
    | "djctqIllegalDrugs"
    | "djctqInappropriateLanguage"
    | "djctqCriminalActs"
    | "djctqImpactingContent"
    | "djctqFear"
    | "djctqMedicalProcedures"
    | "djctqSensitiveTopics"
    | "djctqFantasyViolence"
    | (string & {})
  >;
  /** The video's rating from France's Conseil supérieur de l’audiovisuel, which rates broadcast content. */
  csaRating?:
    | "csaUnspecified"
    | "csaT"
    | "csa10"
    | "csa12"
    | "csa16"
    | "csa18"
    | "csaInterdiction"
    | "csaUnrated"
    | (string & {});
  /** The video's TV Parental Guidelines (TVPG) rating. */
  tvpgRating?:
    | "tvpgUnspecified"
    | "tvpgY"
    | "tvpgY7"
    | "tvpgY7Fv"
    | "tvpgG"
    | "tvpgPg"
    | "pg14"
    | "tvpgMa"
    | "tvpgUnrated"
    | (string & {});
  /** The video's General Directorate of Radio, Television and Cinematography (Mexico) rating. */
  rtcRating?:
    | "rtcUnspecified"
    | "rtcAa"
    | "rtcA"
    | "rtcB"
    | "rtcB15"
    | "rtcC"
    | "rtcD"
    | "rtcUnrated"
    | (string & {});
  /** The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration. */
  fcoRating?:
    | "fcoUnspecified"
    | "fcoI"
    | "fcoIia"
    | "fcoIib"
    | "fcoIi"
    | "fcoIii"
    | "fcoUnrated"
    | (string & {});
  /** The video's rating from Malta's Film Age-Classification Board. */
  mccaaRating?:
    | "mccaaUnspecified"
    | "mccaaU"
    | "mccaaPg"
    | "mccaa12a"
    | "mccaa12"
    | "mccaa14"
    | "mccaa15"
    | "mccaa16"
    | "mccaa18"
    | "mccaaUnrated"
    | (string & {});
  /** The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC). */
  mdaRating?:
    | "mdaUnspecified"
    | "mdaG"
    | "mdaPg"
    | "mdaPg13"
    | "mdaNc16"
    | "mdaM18"
    | "mdaR21"
    | "mdaUnrated"
    | (string & {});
  /** The video's rating from the Movie and Television Review and Classification Board (Philippines). */
  mtrcbRating?:
    | "mtrcbUnspecified"
    | "mtrcbG"
    | "mtrcbPg"
    | "mtrcbR13"
    | "mtrcbR16"
    | "mtrcbR18"
    | "mtrcbX"
    | "mtrcbUnrated"
    | (string & {});
  /** The video's rating from South Africa's Film and Publication Board. */
  fpbRating?:
    | "fpbUnspecified"
    | "fpbA"
    | "fpbPg"
    | "fpb79Pg"
    | "fpb1012Pg"
    | "fpb13"
    | "fpb16"
    | "fpb18"
    | "fpbX18"
    | "fpbXx"
    | "fpbUnrated"
    | "fpb10"
    | (string & {});
  /** The video's rating from Taiwan's Ministry of Culture (文化部). */
  moctwRating?:
    | "moctwUnspecified"
    | "moctwG"
    | "moctwP"
    | "moctwPg"
    | "moctwR"
    | "moctwUnrated"
    | "moctwR12"
    | "moctwR15"
    | (string & {});
  /** The video's Canadian Home Video Rating System (CHVRS) rating. */
  chvrsRating?:
    | "chvrsUnspecified"
    | "chvrsG"
    | "chvrsPg"
    | "chvrs14a"
    | "chvrs18a"
    | "chvrsR"
    | "chvrsE"
    | "chvrsUnrated"
    | (string & {});
  /** The video's rating in Iceland. */
  smaisRating?:
    | "smaisUnspecified"
    | "smaisL"
    | "smais7"
    | "smais12"
    | "smais14"
    | "smais16"
    | "smais18"
    | "smaisUnrated"
    | (string & {});
  /** The video's rating in Greece. */
  grfilmRating?:
    | "grfilmUnspecified"
    | "grfilmK"
    | "grfilmE"
    | "grfilmK12"
    | "grfilmK13"
    | "grfilmK15"
    | "grfilmK17"
    | "grfilmK18"
    | "grfilmUnrated"
    | (string & {});
  /** The video's rating from Medietilsynet, the Norwegian Media Authority. */
  medietilsynetRating?:
    | "medietilsynetUnspecified"
    | "medietilsynetA"
    | "medietilsynet6"
    | "medietilsynet7"
    | "medietilsynet9"
    | "medietilsynet11"
    | "medietilsynet12"
    | "medietilsynet15"
    | "medietilsynet18"
    | "medietilsynetUnrated"
    | (string & {});
  /** The video's rating from Portugal's Comissão de Classificação de Espect´culos. */
  cceRating?:
    | "cceUnspecified"
    | "cceM4"
    | "cceM6"
    | "cceM12"
    | "cceM16"
    | "cceM18"
    | "cceUnrated"
    | "cceM14"
    | (string & {});
  /** The video's rating from the Bulgarian National Film Center. */
  nfrcRating?:
    | "nfrcUnspecified"
    | "nfrcA"
    | "nfrcB"
    | "nfrcC"
    | "nfrcD"
    | "nfrcX"
    | "nfrcUnrated"
    | (string & {});
  /** The video's rating in Switzerland. */
  chfilmRating?:
    | "chfilmUnspecified"
    | "chfilm0"
    | "chfilm6"
    | "chfilm12"
    | "chfilm16"
    | "chfilm18"
    | "chfilmUnrated"
    | (string & {});
  /** The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People. */
  mccypRating?:
    | "mccypUnspecified"
    | "mccypA"
    | "mccyp7"
    | "mccyp11"
    | "mccyp15"
    | "mccypUnrated"
    | (string & {});
  /** The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating. */
  fskRating?:
    | "fskUnspecified"
    | "fsk0"
    | "fsk6"
    | "fsk12"
    | "fsk16"
    | "fsk18"
    | "fskUnrated"
    | (string & {});
  /** The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA). */
  cnaRating?:
    | "cnaUnspecified"
    | "cnaAp"
    | "cna12"
    | "cna15"
    | "cna18"
    | "cna18plus"
    | "cnaUnrated"
    | (string & {});
  /** The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute). */
  mekuRating?:
    | "mekuUnspecified"
    | "mekuS"
    | "meku7"
    | "meku12"
    | "meku16"
    | "meku18"
    | "mekuUnrated"
    | (string & {});
  /** This property has been deprecated. Use the contentDetails.contentRating.cncRating instead. */
  fmocRating?:
    | "fmocUnspecified"
    | "fmocU"
    | "fmoc10"
    | "fmoc12"
    | "fmoc16"
    | "fmoc18"
    | "fmocE"
    | "fmocUnrated"
    | (string & {});
  /** The video's rating in Poland. */
  nbcplRating?:
    | "nbcplUnspecified"
    | "nbcplI"
    | "nbcplIi"
    | "nbcplIii"
    | "nbcplIv"
    | "nbcpl18plus"
    | "nbcplUnrated"
    | (string & {});
  /** The video's British Board of Film Classification (BBFC) rating. */
  bbfcRating?:
    | "bbfcUnspecified"
    | "bbfcU"
    | "bbfcPg"
    | "bbfc12a"
    | "bbfc12"
    | "bbfc15"
    | "bbfc18"
    | "bbfcR18"
    | "bbfcUnrated"
    | (string & {});
  /** The video's rating in Venezuela. */
  resorteviolenciaRating?:
    | "resorteviolenciaUnspecified"
    | "resorteviolenciaA"
    | "resorteviolenciaB"
    | "resorteviolenciaC"
    | "resorteviolenciaD"
    | "resorteviolenciaE"
    | "resorteviolenciaUnrated"
    | (string & {});
  /** The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details. */
  menaMpaaRating?:
    | "menaMpaaUnspecified"
    | "menaMpaaG"
    | "menaMpaaPg"
    | "menaMpaaPg13"
    | "menaMpaaR"
    | "menaMpaaUnrated"
    | (string & {});
  /** The video's Consejo de Calificación Cinematográfica (Chile) rating. */
  cccRating?:
    | "cccUnspecified"
    | "cccTe"
    | "ccc6"
    | "ccc14"
    | "ccc18"
    | "ccc18v"
    | "ccc18s"
    | "cccUnrated"
    | (string & {});
  /** The video's Ministerio de Cultura (Colombia) rating. */
  mocRating?:
    | "mocUnspecified"
    | "mocE"
    | "mocT"
    | "moc7"
    | "moc12"
    | "moc15"
    | "moc18"
    | "mocX"
    | "mocBanned"
    | "mocUnrated"
    | (string & {});
  /** Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism */
  ecbmctRating?:
    | "ecbmctUnspecified"
    | "ecbmctG"
    | "ecbmct7a"
    | "ecbmct7plus"
    | "ecbmct13a"
    | "ecbmct13plus"
    | "ecbmct15a"
    | "ecbmct15plus"
    | "ecbmct18plus"
    | "ecbmctUnrated"
    | (string & {});
  /** The video's rating from Nigeria's National Film and Video Censors Board. */
  nfvcbRating?:
    | "nfvcbUnspecified"
    | "nfvcbG"
    | "nfvcbPg"
    | "nfvcb12"
    | "nfvcb12a"
    | "nfvcb15"
    | "nfvcb18"
    | "nfvcbRe"
    | "nfvcbUnrated"
    | (string & {});
  /** The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television programming. */
  acbRating?:
    | "acbUnspecified"
    | "acbE"
    | "acbP"
    | "acbC"
    | "acbG"
    | "acbPg"
    | "acbM"
    | "acbMa15plus"
    | "acbR18plus"
    | "acbUnrated"
    | (string & {});
  /** The video's rating system for Vietnam - MCST */
  mcstRating?:
    | "mcstUnspecified"
    | "mcstP"
    | "mcst0"
    | "mcstC13"
    | "mcstC16"
    | "mcst16plus"
    | "mcstC18"
    | "mcstGPg"
    | "mcstUnrated"
    | (string & {});
  /** The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html. */
  mpaatRating?: "mpaatUnspecified" | "mpaatGb" | "mpaatRb" | (string & {});
  /** The video's Eirin (映倫) rating. Eirin is the Japanese rating system. */
  eirinRating?:
    | "eirinUnspecified"
    | "eirinG"
    | "eirinPg12"
    | "eirinR15plus"
    | "eirinR18plus"
    | "eirinUnrated"
    | (string & {});
  /** The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur). */
  bmukkRating?:
    | "bmukkUnspecified"
    | "bmukkAa"
    | "bmukk6"
    | "bmukk8"
    | "bmukk10"
    | "bmukk12"
    | "bmukk14"
    | "bmukk16"
    | "bmukkUnrated"
    | (string & {});
  /** The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film. */
  rcnofRating?:
    | "rcnofUnspecified"
    | "rcnofI"
    | "rcnofIi"
    | "rcnofIii"
    | "rcnofIv"
    | "rcnofV"
    | "rcnofVi"
    | "rcnofUnrated"
    | (string & {});
  /** The video's Central Board of Film Certification (CBFC - India) rating. */
  cbfcRating?:
    | "cbfcUnspecified"
    | "cbfcU"
    | "cbfcUA"
    | "cbfcUA7plus"
    | "cbfcUA13plus"
    | "cbfcUA16plus"
    | "cbfcA"
    | "cbfcS"
    | "cbfcUnrated"
    | (string & {});
  /** The video's rating in Estonia. */
  eefilmRating?:
    | "eefilmUnspecified"
    | "eefilmPere"
    | "eefilmL"
    | "eefilmMs6"
    | "eefilmK6"
    | "eefilmMs12"
    | "eefilmK12"
    | "eefilmK14"
    | "eefilmK16"
    | "eefilmUnrated"
    | (string & {});
  /** The National Media Council ratings system for United Arab Emirates. */
  nmcRating?:
    | "nmcUnspecified"
    | "nmcG"
    | "nmcPg"
    | "nmcPg13"
    | "nmcPg15"
    | "nmc15plus"
    | "nmc18plus"
    | "nmc18tc"
    | "nmcUnrated"
    | (string & {});
  /** The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating. */
  icaaRating?:
    | "icaaUnspecified"
    | "icaaApta"
    | "icaa7"
    | "icaa12"
    | "icaa13"
    | "icaa16"
    | "icaa18"
    | "icaaX"
    | "icaaUnrated"
    | (string & {});
  /** The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF). */
  cscfRating?:
    | "cscfUnspecified"
    | "cscfAl"
    | "cscfA"
    | "cscf6"
    | "cscf9"
    | "cscf12"
    | "cscf16"
    | "cscf18"
    | "cscfUnrated"
    | (string & {});
  /** The video's National Film Registry of the Russian Federation (MKRF - Russia) rating. */
  russiaRating?:
    | "russiaUnspecified"
    | "russia0"
    | "russia6"
    | "russia12"
    | "russia16"
    | "russia18"
    | "russiaUnrated"
    | (string & {});
  /** The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea. */
  kmrbRating?:
    | "kmrbUnspecified"
    | "kmrbAll"
    | "kmrb12plus"
    | "kmrb15plus"
    | "kmrbTeenr"
    | "kmrbR"
    | "kmrbUnrated"
    | (string & {});
  /** The video's rating from the Kenya Film Classification Board. */
  kfcbRating?:
    | "kfcbUnspecified"
    | "kfcbG"
    | "kfcbPg"
    | "kfcb16plus"
    | "kfcbR"
    | "kfcbUnrated"
    | (string & {});
  /** The video's rating from Thailand's Board of Film and Video Censors. */
  bfvcRating?:
    | "bfvcUnspecified"
    | "bfvcG"
    | "bfvcE"
    | "bfvc13"
    | "bfvc15"
    | "bfvc18"
    | "bfvc20"
    | "bfvcB"
    | "bfvcUnrated"
    | (string & {});
  /** The video's Office of Film and Literature Classification (OFLC - New Zealand) rating. */
  oflcRating?:
    | "oflcUnspecified"
    | "oflcG"
    | "oflcPg"
    | "oflcM"
    | "oflcR13"
    | "oflcR15"
    | "oflcR16"
    | "oflcR18"
    | "oflcUnrated"
    | "oflcRp13"
    | "oflcRp16"
    | "oflcRp18"
    | (string & {});
  /** The video's rating from the Commission de Contrôle des Films (Belgium). */
  cicfRating?:
    | "cicfUnspecified"
    | "cicfE"
    | "cicfKtEa"
    | "cicfKntEna"
    | "cicfUnrated"
    | (string & {});
  /** The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating. */
  incaaRating?:
    | "incaaUnspecified"
    | "incaaAtp"
    | "incaaSam13"
    | "incaaSam16"
    | "incaaSam18"
    | "incaaC"
    | "incaaUnrated"
    | (string & {});
  /** The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television. */
  anatelRating?:
    | "anatelUnspecified"
    | "anatelF"
    | "anatelI"
    | "anatelI7"
    | "anatelI10"
    | "anatelI12"
    | "anatelR"
    | "anatelA"
    | "anatelUnrated"
    | (string & {});
  /** The video's rating in Israel. */
  ilfilmRating?:
    | "ilfilmUnspecified"
    | "ilfilmAa"
    | "ilfilm12"
    | "ilfilm14"
    | "ilfilm16"
    | "ilfilm18"
    | "ilfilmUnrated"
    | (string & {});
  /** Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website. */
  catvRating?:
    | "catvUnspecified"
    | "catvC"
    | "catvC8"
    | "catvG"
    | "catvPg"
    | "catv14plus"
    | "catv18plus"
    | "catvUnrated"
    | "catvE"
    | (string & {});
  /** A rating that YouTube uses to identify age-restricted content. */
  ytRating?: "ytUnspecified" | "ytAgeRestricted" | (string & {});
  /** The video's rating in Egypt. */
  egfilmRating?:
    | "egfilmUnspecified"
    | "egfilmGn"
    | "egfilm18"
    | "egfilmBn"
    | "egfilmUnrated"
    | (string & {});
  /** Reasons that explain why the video received its FPB (South Africa) rating. */
  fpbRatingReasons?: Array<
    | "fpbRatingReasonUnspecified"
    | "fpbBlasphemy"
    | "fpbLanguage"
    | "fpbNudity"
    | "fpbPrejudice"
    | "fpbSex"
    | "fpbViolence"
    | "fpbDrugs"
    | "fpbSexualViolence"
    | "fpbHorror"
    | "fpbCriminalTechniques"
    | "fpbImitativeActsTechniques"
    | (string & {})
  >;
  /** The video's Motion Picture Association of America (MPAA) rating. */
  mpaaRating?:
    | "mpaaUnspecified"
    | "mpaaG"
    | "mpaaPg"
    | "mpaaPg13"
    | "mpaaR"
    | "mpaaNc17"
    | "mpaaX"
    | "mpaaUnrated"
    | (string & {});
}

export const ContentRating: Schema.Schema<ContentRating> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kijkwijzerRating: Schema.optional(Schema.String),
      pefilmRating: Schema.optional(Schema.String),
      fcbmRating: Schema.optional(Schema.String),
      nkclvRating: Schema.optional(Schema.String),
      lsfRating: Schema.optional(Schema.String),
      djctqRating: Schema.optional(Schema.String),
      agcomRating: Schema.optional(Schema.String),
      mibacRating: Schema.optional(Schema.String),
      rteRating: Schema.optional(Schema.String),
      nbcRating: Schema.optional(Schema.String),
      catvfrRating: Schema.optional(Schema.String),
      ifcoRating: Schema.optional(Schema.String),
      cncRating: Schema.optional(Schema.String),
      smsaRating: Schema.optional(Schema.String),
      czfilmRating: Schema.optional(Schema.String),
      skfilmRating: Schema.optional(Schema.String),
      djctqRatingReasons: Schema.optional(Schema.Array(Schema.String)),
      csaRating: Schema.optional(Schema.String),
      tvpgRating: Schema.optional(Schema.String),
      rtcRating: Schema.optional(Schema.String),
      fcoRating: Schema.optional(Schema.String),
      mccaaRating: Schema.optional(Schema.String),
      mdaRating: Schema.optional(Schema.String),
      mtrcbRating: Schema.optional(Schema.String),
      fpbRating: Schema.optional(Schema.String),
      moctwRating: Schema.optional(Schema.String),
      chvrsRating: Schema.optional(Schema.String),
      smaisRating: Schema.optional(Schema.String),
      grfilmRating: Schema.optional(Schema.String),
      medietilsynetRating: Schema.optional(Schema.String),
      cceRating: Schema.optional(Schema.String),
      nfrcRating: Schema.optional(Schema.String),
      chfilmRating: Schema.optional(Schema.String),
      mccypRating: Schema.optional(Schema.String),
      fskRating: Schema.optional(Schema.String),
      cnaRating: Schema.optional(Schema.String),
      mekuRating: Schema.optional(Schema.String),
      fmocRating: Schema.optional(Schema.String),
      nbcplRating: Schema.optional(Schema.String),
      bbfcRating: Schema.optional(Schema.String),
      resorteviolenciaRating: Schema.optional(Schema.String),
      menaMpaaRating: Schema.optional(Schema.String),
      cccRating: Schema.optional(Schema.String),
      mocRating: Schema.optional(Schema.String),
      ecbmctRating: Schema.optional(Schema.String),
      nfvcbRating: Schema.optional(Schema.String),
      acbRating: Schema.optional(Schema.String),
      mcstRating: Schema.optional(Schema.String),
      mpaatRating: Schema.optional(Schema.String),
      eirinRating: Schema.optional(Schema.String),
      bmukkRating: Schema.optional(Schema.String),
      rcnofRating: Schema.optional(Schema.String),
      cbfcRating: Schema.optional(Schema.String),
      eefilmRating: Schema.optional(Schema.String),
      nmcRating: Schema.optional(Schema.String),
      icaaRating: Schema.optional(Schema.String),
      cscfRating: Schema.optional(Schema.String),
      russiaRating: Schema.optional(Schema.String),
      kmrbRating: Schema.optional(Schema.String),
      kfcbRating: Schema.optional(Schema.String),
      bfvcRating: Schema.optional(Schema.String),
      oflcRating: Schema.optional(Schema.String),
      cicfRating: Schema.optional(Schema.String),
      incaaRating: Schema.optional(Schema.String),
      anatelRating: Schema.optional(Schema.String),
      ilfilmRating: Schema.optional(Schema.String),
      catvRating: Schema.optional(Schema.String),
      ytRating: Schema.optional(Schema.String),
      egfilmRating: Schema.optional(Schema.String),
      fpbRatingReasons: Schema.optional(Schema.Array(Schema.String)),
      mpaaRating: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContentRating",
  }) as any as Schema.Schema<ContentRating>;

export interface VideoContentDetails {
  /** The value of is_license_content indicates whether the video is licensed content. */
  licensedContent?: boolean;
  /** The value of dimension indicates whether the video is available in 3D or in 2D. */
  dimension?: string;
  /** The value of definition indicates whether the video is available in high definition or only in standard definition. */
  definition?: "sd" | "hd" | (string & {});
  /** Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader. */
  hasCustomThumbnail?: boolean;
  /** Specifies the projection format of the video. */
  projection?: "rectangular" | "360" | (string & {});
  /** The regionRestriction object contains information about the countries where a video is (or is not) viewable. The object will contain either the contentDetails.regionRestriction.allowed property or the contentDetails.regionRestriction.blocked property. */
  regionRestriction?: VideoContentDetailsRegionRestriction;
  /** The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long. */
  duration?: string;
  /** The countryRestriction object contains information about the countries where a video is (or is not) viewable. */
  countryRestriction?: AccessPolicy;
  /** Specifies the ratings that the video received under various rating schemes. */
  contentRating?: ContentRating;
  /** The value of captions indicates whether the video has captions or not. */
  caption?: "true" | "false" | (string & {});
}

export const VideoContentDetails: Schema.Schema<VideoContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      licensedContent: Schema.optional(Schema.Boolean),
      dimension: Schema.optional(Schema.String),
      definition: Schema.optional(Schema.String),
      hasCustomThumbnail: Schema.optional(Schema.Boolean),
      projection: Schema.optional(Schema.String),
      regionRestriction: Schema.optional(VideoContentDetailsRegionRestriction),
      duration: Schema.optional(Schema.String),
      countryRestriction: Schema.optional(AccessPolicy),
      contentRating: Schema.optional(ContentRating),
      caption: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoContentDetails",
  }) as any as Schema.Schema<VideoContentDetails>;

export interface VideoStatus {
  /** This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update */
  publicStatsViewable?: boolean;
  /** The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private.. */
  publishAt?: string;
  /** The video's license. @mutable youtube.videos.insert youtube.videos.update */
  license?: "youtube" | "creativeCommon" | (string & {});
  /** This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected. */
  rejectionReason?:
    | "copyright"
    | "inappropriate"
    | "duplicate"
    | "termsOfUse"
    | "uploaderAccountSuspended"
    | "length"
    | "claim"
    | "uploaderAccountClosed"
    | "trademark"
    | "legal"
    | (string & {});
  /** This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update */
  embeddable?: boolean;
  /** The status of the uploaded video. */
  uploadStatus?:
    | "uploaded"
    | "processed"
    | "failed"
    | "rejected"
    | "deleted"
    | (string & {});
  selfDeclaredMadeForKids?: boolean;
  /** This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed. */
  failureReason?:
    | "conversion"
    | "invalidFile"
    | "emptyFile"
    | "tooSmall"
    | "codec"
    | "uploadAborted"
    | (string & {});
  madeForKids?: boolean;
  /** Indicates if the video contains altered or synthetic media. */
  containsSyntheticMedia?: boolean;
  /** The video's privacy status. */
  privacyStatus?: "public" | "unlisted" | "private" | (string & {});
}

export const VideoStatus: Schema.Schema<VideoStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      publicStatsViewable: Schema.optional(Schema.Boolean),
      publishAt: Schema.optional(Schema.String),
      license: Schema.optional(Schema.String),
      rejectionReason: Schema.optional(Schema.String),
      embeddable: Schema.optional(Schema.Boolean),
      uploadStatus: Schema.optional(Schema.String),
      selfDeclaredMadeForKids: Schema.optional(Schema.Boolean),
      failureReason: Schema.optional(Schema.String),
      madeForKids: Schema.optional(Schema.Boolean),
      containsSyntheticMedia: Schema.optional(Schema.Boolean),
      privacyStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoStatus",
  }) as any as Schema.Schema<VideoStatus>;

export interface VideoFileDetailsVideoStream {
  /** The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels. */
  widthPixels?: number;
  /** The video stream's bitrate, in bits per second. */
  bitrateBps?: string;
  /** The amount that YouTube needs to rotate the original source content to properly display the video. */
  rotation?:
    | "none"
    | "clockwise"
    | "upsideDown"
    | "counterClockwise"
    | "other"
    | (string & {});
  /** A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
  vendor?: string;
  /** The encoded video content's height in pixels. */
  heightPixels?: number;
  /** The video stream's frame rate, in frames per second. */
  frameRateFps?: number;
  /** The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed. */
  aspectRatio?: number;
  /** The video codec that the stream uses. */
  codec?: string;
}

export const VideoFileDetailsVideoStream: Schema.Schema<VideoFileDetailsVideoStream> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      widthPixels: Schema.optional(Schema.Number),
      bitrateBps: Schema.optional(Schema.String),
      rotation: Schema.optional(Schema.String),
      vendor: Schema.optional(Schema.String),
      heightPixels: Schema.optional(Schema.Number),
      frameRateFps: Schema.optional(Schema.Number),
      aspectRatio: Schema.optional(Schema.Number),
      codec: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoFileDetailsVideoStream",
  }) as any as Schema.Schema<VideoFileDetailsVideoStream>;

export interface VideoFileDetailsAudioStream {
  /** The audio stream's bitrate, in bits per second. */
  bitrateBps?: string;
  /** The number of audio channels that the stream contains. */
  channelCount?: number;
  /** The audio codec that the stream uses. */
  codec?: string;
  /** A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
  vendor?: string;
}

export const VideoFileDetailsAudioStream: Schema.Schema<VideoFileDetailsAudioStream> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      bitrateBps: Schema.optional(Schema.String),
      channelCount: Schema.optional(Schema.Number),
      codec: Schema.optional(Schema.String),
      vendor: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoFileDetailsAudioStream",
  }) as any as Schema.Schema<VideoFileDetailsAudioStream>;

export interface VideoFileDetails {
  /** The uploaded video file's container format. */
  container?: string;
  /** The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded. */
  fileSize?: string;
  /** A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream. */
  videoStreams?: Array<VideoFileDetailsVideoStream>;
  /** The length of the uploaded video in milliseconds. */
  durationMs?: string;
  /** A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream. */
  audioStreams?: Array<VideoFileDetailsAudioStream>;
  /** The uploaded video file's combined (video and audio) bitrate in bits per second. */
  bitrateBps?: string;
  /** The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM */
  creationTime?: string;
  /** The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded. */
  fileType?:
    | "video"
    | "audio"
    | "image"
    | "archive"
    | "document"
    | "project"
    | "other"
    | (string & {});
  /** The uploaded file's name. This field is present whether a video file or another type of file was uploaded. */
  fileName?: string;
}

export const VideoFileDetails: Schema.Schema<VideoFileDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      container: Schema.optional(Schema.String),
      fileSize: Schema.optional(Schema.String),
      videoStreams: Schema.optional(Schema.Array(VideoFileDetailsVideoStream)),
      durationMs: Schema.optional(Schema.String),
      audioStreams: Schema.optional(Schema.Array(VideoFileDetailsAudioStream)),
      bitrateBps: Schema.optional(Schema.String),
      creationTime: Schema.optional(Schema.String),
      fileType: Schema.optional(Schema.String),
      fileName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoFileDetails",
  }) as any as Schema.Schema<VideoFileDetails>;

export interface VideoLiveStreamingDetails {
  /** The time that the broadcast actually ended. This value will not be available until the broadcast is over. */
  actualEndTime?: string;
  /** The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended. */
  concurrentViewers?: string;
  /** The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page. */
  activeLiveChatId?: string;
  /** The time that the broadcast is scheduled to begin. */
  scheduledStartTime?: string;
  /** The time that the broadcast actually started. This value will not be available until the broadcast begins. */
  actualStartTime?: string;
  /** The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to continue indefinitely. */
  scheduledEndTime?: string;
}

export const VideoLiveStreamingDetails: Schema.Schema<VideoLiveStreamingDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      actualEndTime: Schema.optional(Schema.String),
      concurrentViewers: Schema.optional(Schema.String),
      activeLiveChatId: Schema.optional(Schema.String),
      scheduledStartTime: Schema.optional(Schema.String),
      actualStartTime: Schema.optional(Schema.String),
      scheduledEndTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoLiveStreamingDetails",
  }) as any as Schema.Schema<VideoLiveStreamingDetails>;

export interface VideoStatistics {
  /** The number of users who have indicated that they liked the video by giving it a positive rating. */
  likeCount?: string;
  /** The number of users who currently have the video marked as a favorite video. */
  favoriteCount?: string;
  /** The number of times the video has been viewed. */
  viewCount?: string;
  /** The number of comments for the video. */
  commentCount?: string;
  /** The number of users who have indicated that they disliked the video by giving it a negative rating. */
  dislikeCount?: string;
}

export const VideoStatistics: Schema.Schema<VideoStatistics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      likeCount: Schema.optional(Schema.String),
      favoriteCount: Schema.optional(Schema.String),
      viewCount: Schema.optional(Schema.String),
      commentCount: Schema.optional(Schema.String),
      dislikeCount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoStatistics",
  }) as any as Schema.Schema<VideoStatistics>;

export interface VideoMonetizationDetails {
  /** The value of access indicates whether the video can be monetized or not. */
  access?: AccessPolicy;
}

export const VideoMonetizationDetails: Schema.Schema<VideoMonetizationDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      access: Schema.optional(AccessPolicy),
    }),
  ).annotate({
    identifier: "VideoMonetizationDetails",
  }) as any as Schema.Schema<VideoMonetizationDetails>;

export interface VideoLocalization {
  /** Localized version of the video's title. */
  title?: string;
  /** Localized version of the video's description. */
  description?: string;
}

export const VideoLocalization: Schema.Schema<VideoLocalization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoLocalization",
  }) as any as Schema.Schema<VideoLocalization>;

export interface VideoSnippet {
  /** Indicates if the video is an upcoming/active live broadcast. Or it's "none" if the video is not an upcoming/active live broadcast. */
  liveBroadcastContent?:
    | "none"
    | "upcoming"
    | "live"
    | "completed"
    | (string & {});
  /** The language of the videos's default snippet. */
  defaultLanguage?: string;
  /** The default_audio_language property specifies the language spoken in the video's default audio track. */
  defaultAudioLanguage?: string;
  /** A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The date and time when the video was uploaded. */
  publishedAt?: string;
  /** Channel title for the channel that the video belongs to. */
  channelTitle?: string;
  /** A list of keyword tags associated with the video. Tags may contain spaces. */
  tags?: Array<string>;
  /** The video's title. @mutable youtube.videos.insert youtube.videos.update */
  title?: string;
  /** The video's description. @mutable youtube.videos.insert youtube.videos.update */
  description?: string;
  /** The YouTube video category associated with the video. */
  categoryId?: string;
  /** The ID that YouTube uses to uniquely identify the channel that the video was uploaded to. */
  channelId?: string;
  /** Localized snippet selected with the hl parameter. If no such localization exists, this field is populated with the default snippet. (Read-only) */
  localized?: VideoLocalization;
}

export const VideoSnippet: Schema.Schema<VideoSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      liveBroadcastContent: Schema.optional(Schema.String),
      defaultLanguage: Schema.optional(Schema.String),
      defaultAudioLanguage: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
      publishedAt: Schema.optional(Schema.String),
      channelTitle: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      categoryId: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      localized: Schema.optional(VideoLocalization),
    }),
  ).annotate({
    identifier: "VideoSnippet",
  }) as any as Schema.Schema<VideoSnippet>;

export interface GeoPoint {
  /** Latitude in degrees. */
  latitude?: number;
  /** Longitude in degrees. */
  longitude?: number;
  /** Altitude above the reference ellipsoid, in meters. */
  altitude?: number;
}

export const GeoPoint: Schema.Schema<GeoPoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      latitude: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
      altitude: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "GeoPoint" }) as any as Schema.Schema<GeoPoint>;

export interface VideoRecordingDetails {
  /** The text description of the location where the video was recorded. */
  locationDescription?: string;
  /** The date and time when the video was recorded. */
  recordingDate?: string;
  /** The geolocation information associated with the video. */
  location?: GeoPoint;
}

export const VideoRecordingDetails: Schema.Schema<VideoRecordingDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locationDescription: Schema.optional(Schema.String),
      recordingDate: Schema.optional(Schema.String),
      location: Schema.optional(GeoPoint),
    }),
  ).annotate({
    identifier: "VideoRecordingDetails",
  }) as any as Schema.Schema<VideoRecordingDetails>;

export interface VideoSuggestions {
  /** A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status, eventually, that status will almost certainly be failed. */
  processingErrors?: Array<
    | "audioFile"
    | "imageFile"
    | "projectFile"
    | "notAVideoFile"
    | "docFile"
    | "archiveFile"
    | "unsupportedSpatialAudioLayout"
    | (string & {})
  >;
  /** A list of suggestions that may improve YouTube's ability to process the video. */
  processingHints?: Array<
    | "nonStreamableMov"
    | "sendBestQualityVideo"
    | "sphericalVideo"
    | "spatialAudio"
    | "vrVideo"
    | "hdrVideo"
    | (string & {})
  >;
  /** A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track. */
  processingWarnings?: Array<
    | "unknownContainer"
    | "unknownVideoCodec"
    | "unknownAudioCodec"
    | "inconsistentResolution"
    | "hasEditlist"
    | "problematicVideoCodec"
    | "problematicAudioCodec"
    | "unsupportedVrStereoMode"
    | "unsupportedSphericalProjectionType"
    | "unsupportedHdrPixelFormat"
    | "unsupportedHdrColorMetadata"
    | "problematicHdrLookupTable"
    | (string & {})
  >;
  /** A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube. */
  tagSuggestions?: Array<VideoSuggestionsTagSuggestion>;
  /** A list of video editing operations that might improve the video quality or playback experience of the uploaded video. */
  editorSuggestions?: Array<
    | "videoAutoLevels"
    | "videoStabilize"
    | "videoCrop"
    | "audioQuietAudioSwap"
    | (string & {})
  >;
}

export const VideoSuggestions: Schema.Schema<VideoSuggestions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      processingErrors: Schema.optional(Schema.Array(Schema.String)),
      processingHints: Schema.optional(Schema.Array(Schema.String)),
      processingWarnings: Schema.optional(Schema.Array(Schema.String)),
      tagSuggestions: Schema.optional(
        Schema.Array(VideoSuggestionsTagSuggestion),
      ),
      editorSuggestions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoSuggestions",
  }) as any as Schema.Schema<VideoSuggestions>;

export interface VideoAgeGating {
  /** Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content. */
  alcoholContent?: boolean;
  /** Video game rating, if any. */
  videoGameRating?:
    | "anyone"
    | "m15Plus"
    | "m16Plus"
    | "m17Plus"
    | (string & {});
  /** Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged 18+. Otherwise The field won't be present. */
  restricted?: boolean;
}

export const VideoAgeGating: Schema.Schema<VideoAgeGating> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alcoholContent: Schema.optional(Schema.Boolean),
      videoGameRating: Schema.optional(Schema.String),
      restricted: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "VideoAgeGating",
  }) as any as Schema.Schema<VideoAgeGating>;

export interface VideoTopicDetails {
  /** A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the < a href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API. */
  topicIds?: Array<string>;
  /** A list of Wikipedia URLs that provide a high-level description of the video's content. */
  topicCategories?: Array<string>;
  /** Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using Freebase Topic API. */
  relevantTopicIds?: Array<string>;
}

export const VideoTopicDetails: Schema.Schema<VideoTopicDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topicIds: Schema.optional(Schema.Array(Schema.String)),
      topicCategories: Schema.optional(Schema.Array(Schema.String)),
      relevantTopicIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoTopicDetails",
  }) as any as Schema.Schema<VideoTopicDetails>;

export interface VideoProcessingDetailsProcessingProgress {
  /** The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video. */
  partsProcessed?: string;
  /** An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video. */
  timeLeftMs?: string;
  /** An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video. */
  partsTotal?: string;
}

export const VideoProcessingDetailsProcessingProgress: Schema.Schema<VideoProcessingDetailsProcessingProgress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      partsProcessed: Schema.optional(Schema.String),
      timeLeftMs: Schema.optional(Schema.String),
      partsTotal: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoProcessingDetailsProcessingProgress",
  }) as any as Schema.Schema<VideoProcessingDetailsProcessingProgress>;

export interface VideoProcessingDetails {
  /** This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list() request. */
  fileDetailsAvailability?: string;
  /** This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
  tagSuggestionsAvailability?: string;
  /** The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed. */
  processingStatus?:
    | "processing"
    | "succeeded"
    | "failed"
    | "terminated"
    | (string & {});
  /** The processingProgress object contains information about the progress YouTube has made in processing the video. The values are really only relevant if the video's processing status is processing. */
  processingProgress?: VideoProcessingDetailsProcessingProgress;
  /** This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
  editorSuggestionsAvailability?: string;
  /** This value indicates whether thumbnail images have been generated for the video. */
  thumbnailsAvailability?: string;
  /** The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed. */
  processingFailureReason?:
    | "uploadFailed"
    | "transcodeFailed"
    | "streamingFailed"
    | "other"
    | (string & {});
  /** This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request. */
  processingIssuesAvailability?: string;
}

export const VideoProcessingDetails: Schema.Schema<VideoProcessingDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileDetailsAvailability: Schema.optional(Schema.String),
      tagSuggestionsAvailability: Schema.optional(Schema.String),
      processingStatus: Schema.optional(Schema.String),
      processingProgress: Schema.optional(
        VideoProcessingDetailsProcessingProgress,
      ),
      editorSuggestionsAvailability: Schema.optional(Schema.String),
      thumbnailsAvailability: Schema.optional(Schema.String),
      processingFailureReason: Schema.optional(Schema.String),
      processingIssuesAvailability: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoProcessingDetails",
  }) as any as Schema.Schema<VideoProcessingDetails>;

export interface VideoPlayer {
  /** An <iframe> tag that embeds a player that will play the video. */
  embedHtml?: string;
  embedHeight?: string;
  /** The embed width */
  embedWidth?: string;
}

export const VideoPlayer: Schema.Schema<VideoPlayer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      embedHtml: Schema.optional(Schema.String),
      embedHeight: Schema.optional(Schema.String),
      embedWidth: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoPlayer",
  }) as any as Schema.Schema<VideoPlayer>;

export interface Video {
  /** The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
  contentDetails?: VideoContentDetails;
  /** The ID that YouTube uses to uniquely identify the video. */
  id?: string;
  /** The status object contains information about the video's uploading, processing, and privacy statuses. */
  status?: VideoStatus;
  paidProductPlacementDetails?: VideoPaidProductPlacementDetails;
  /** The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner. */
  fileDetails?: VideoFileDetails;
  /** The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed live broadcast. */
  liveStreamingDetails?: VideoLiveStreamingDetails;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#video". */
  kind?: string;
  /** The statistics object contains statistics about the video. */
  statistics?: VideoStatistics;
  /** The monetizationDetails object encapsulates information about the monetization status of the video. */
  monetizationDetails?: VideoMonetizationDetails;
  /** The snippet object contains basic details about the video, such as its title, description, and category. */
  snippet?: VideoSnippet;
  /** Etag of this resource. */
  etag?: string;
  /** The recordingDetails object encapsulates information about the location, date and address where the video was recorded. */
  recordingDetails?: VideoRecordingDetails;
  /** The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner. */
  suggestions?: VideoSuggestions;
  /** Age restriction details related to a video. This data can only be retrieved by the video owner. */
  ageGating?: VideoAgeGating;
  /** The topicDetails object encapsulates information about Freebase topics associated with the video. */
  topicDetails?: VideoTopicDetails;
  /** The localizations object contains localized versions of the basic details about the video, such as its title and description. */
  localizations?: Record<string, VideoLocalization>;
  /** The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner. */
  processingDetails?: VideoProcessingDetails;
  /** The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677 */
  projectDetails?: VideoProjectDetails;
  /** The player object contains information that you would use to play the video in an embedded player. */
  player?: VideoPlayer;
}

export const Video: Schema.Schema<Video> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDetails: Schema.optional(VideoContentDetails),
      id: Schema.optional(Schema.String),
      status: Schema.optional(VideoStatus),
      paidProductPlacementDetails: Schema.optional(
        VideoPaidProductPlacementDetails,
      ),
      fileDetails: Schema.optional(VideoFileDetails),
      liveStreamingDetails: Schema.optional(VideoLiveStreamingDetails),
      kind: Schema.optional(Schema.String),
      statistics: Schema.optional(VideoStatistics),
      monetizationDetails: Schema.optional(VideoMonetizationDetails),
      snippet: Schema.optional(VideoSnippet),
      etag: Schema.optional(Schema.String),
      recordingDetails: Schema.optional(VideoRecordingDetails),
      suggestions: Schema.optional(VideoSuggestions),
      ageGating: Schema.optional(VideoAgeGating),
      topicDetails: Schema.optional(VideoTopicDetails),
      localizations: Schema.optional(
        Schema.Record(Schema.String, VideoLocalization),
      ),
      processingDetails: Schema.optional(VideoProcessingDetails),
      projectDetails: Schema.optional(VideoProjectDetails),
      player: Schema.optional(VideoPlayer),
    }),
  ).annotate({ identifier: "Video" }) as any as Schema.Schema<Video>;

export interface CaptionSnippet {
  /** The caption track's status. */
  status?: "serving" | "syncing" | "failed" | (string & {});
  /** The type of audio track associated with the caption track. */
  audioTrackType?:
    | "unknown"
    | "primary"
    | "commentary"
    | "descriptive"
    | (string & {});
  /** Indicates whether the caption track uses large text for the vision-impaired. The default value is false. */
  isLarge?: boolean;
  /** The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed. */
  failureReason?:
    | "unknownFormat"
    | "unsupportedFormat"
    | "processingFailed"
    | (string & {});
  /** Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false. */
  isEasyReader?: boolean;
  /** The language of the caption track. The property value is a BCP-47 language tag. */
  language?: string;
  /** Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions. */
  isAutoSynced?: boolean;
  /** The name of the caption track. The name is intended to be visible to the user as an option during playback. */
  name?: string;
  /** The date and time when the caption track was last updated. */
  lastUpdated?: string;
  /** The caption track's type. */
  trackKind?: "standard" | "ASR" | "forced" | (string & {});
  /** Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false. */
  isCC?: boolean;
  /** Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update */
  isDraft?: boolean;
  /** The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert */
  videoId?: string;
}

export const CaptionSnippet: Schema.Schema<CaptionSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      status: Schema.optional(Schema.String),
      audioTrackType: Schema.optional(Schema.String),
      isLarge: Schema.optional(Schema.Boolean),
      failureReason: Schema.optional(Schema.String),
      isEasyReader: Schema.optional(Schema.Boolean),
      language: Schema.optional(Schema.String),
      isAutoSynced: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
      trackKind: Schema.optional(Schema.String),
      isCC: Schema.optional(Schema.Boolean),
      isDraft: Schema.optional(Schema.Boolean),
      videoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CaptionSnippet",
  }) as any as Schema.Schema<CaptionSnippet>;

export interface Caption {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#caption". */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the caption track. */
  id?: string;
  /** The snippet object contains basic details about the caption. */
  snippet?: CaptionSnippet;
  /** Etag of this resource. */
  etag?: string;
}

export const Caption: Schema.Schema<Caption> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(CaptionSnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Caption" }) as any as Schema.Schema<Caption>;

export interface CaptionListResponse {
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#captionListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** A list of captions that match the request criteria. */
  items?: Array<Caption>;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const CaptionListResponse: Schema.Schema<CaptionListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Caption)),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CaptionListResponse",
  }) as any as Schema.Schema<CaptionListResponse>;

export interface VideoAbuseReportSecondaryReason {
  /** The ID of this abuse report secondary reason. */
  id?: string;
  /** The localized label for this abuse report secondary reason. */
  label?: string;
}

export const VideoAbuseReportSecondaryReason: Schema.Schema<VideoAbuseReportSecondaryReason> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoAbuseReportSecondaryReason",
  }) as any as Schema.Schema<VideoAbuseReportSecondaryReason>;

export interface VideoAbuseReportReasonSnippet {
  /** The localized label belonging to this abuse report reason. */
  label?: string;
  /** The secondary reasons associated with this reason, if any are available. (There might be 0 or more.) */
  secondaryReasons?: Array<VideoAbuseReportSecondaryReason>;
}

export const VideoAbuseReportReasonSnippet: Schema.Schema<VideoAbuseReportReasonSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      label: Schema.optional(Schema.String),
      secondaryReasons: Schema.optional(
        Schema.Array(VideoAbuseReportSecondaryReason),
      ),
    }),
  ).annotate({
    identifier: "VideoAbuseReportReasonSnippet",
  }) as any as Schema.Schema<VideoAbuseReportReasonSnippet>;

export interface VideoAbuseReportReason {
  /** Etag of this resource. */
  etag?: string;
  /** The ID of this abuse report reason. */
  id?: string;
  /** The `snippet` object contains basic details about the abuse report reason. */
  snippet?: VideoAbuseReportReasonSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReason"`. */
  kind?: string;
}

export const VideoAbuseReportReason: Schema.Schema<VideoAbuseReportReason> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(VideoAbuseReportReasonSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoAbuseReportReason",
  }) as any as Schema.Schema<VideoAbuseReportReason>;

export interface LiveBroadcastSnippet {
  /** The date and time that the broadcast was added to YouTube's live broadcast schedule. */
  publishedAt?: string;
  /** Indicates whether this broadcast is the default broadcast. Internal only. */
  isDefaultBroadcast?: boolean;
  /** The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete. */
  actualEndTime?: string;
  /** A map of thumbnail images associated with the broadcast. For each nested object in this object, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The date and time that the broadcast is scheduled to end. */
  scheduledEndTime?: string;
  /** The id of the live chat for this broadcast. */
  liveChatId?: string;
  /** The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast. */
  channelId?: string;
  /** The date and time that the broadcast actually started. This information is only available once the broadcast's state is live. */
  actualStartTime?: string;
  /** The date and time that the broadcast is scheduled to start. */
  scheduledStartTime?: string;
  /** The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the corresponding video resource. */
  title?: string;
  /** The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource. */
  description?: string;
}

export const LiveBroadcastSnippet: Schema.Schema<LiveBroadcastSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      publishedAt: Schema.optional(Schema.String),
      isDefaultBroadcast: Schema.optional(Schema.Boolean),
      actualEndTime: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
      scheduledEndTime: Schema.optional(Schema.String),
      liveChatId: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      actualStartTime: Schema.optional(Schema.String),
      scheduledStartTime: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveBroadcastSnippet",
  }) as any as Schema.Schema<LiveBroadcastSnippet>;

export interface LiveBroadcastStatus {
  /** This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work. */
  selfDeclaredMadeForKids?: boolean;
  /** The broadcast's recording status. */
  recordingStatus?:
    | "liveBroadcastRecordingStatusUnspecified"
    | "notRecording"
    | "recording"
    | "recorded"
    | (string & {});
  /** The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource. */
  privacyStatus?: "public" | "unlisted" | "private" | (string & {});
  /** Priority of the live broadcast event (internal state). */
  liveBroadcastPriority?:
    | "liveBroadcastPriorityUnspecified"
    | "low"
    | "normal"
    | "high"
    | (string & {});
  /** The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method. */
  lifeCycleStatus?:
    | "lifeCycleStatusUnspecified"
    | "created"
    | "ready"
    | "testing"
    | "live"
    | "complete"
    | "revoked"
    | "testStarting"
    | "liveStarting"
    | (string & {});
  /** Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only. */
  madeForKids?: boolean;
}

export const LiveBroadcastStatus: Schema.Schema<LiveBroadcastStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selfDeclaredMadeForKids: Schema.optional(Schema.Boolean),
      recordingStatus: Schema.optional(Schema.String),
      privacyStatus: Schema.optional(Schema.String),
      liveBroadcastPriority: Schema.optional(Schema.String),
      lifeCycleStatus: Schema.optional(Schema.String),
      madeForKids: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LiveBroadcastStatus",
  }) as any as Schema.Schema<LiveBroadcastStatus>;

export interface LiveBroadcastStatistics {
  /** The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended. */
  concurrentViewers?: string;
}

export const LiveBroadcastStatistics: Schema.Schema<LiveBroadcastStatistics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      concurrentViewers: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveBroadcastStatistics",
  }) as any as Schema.Schema<LiveBroadcastStatistics>;

export interface CuepointSchedule {
  /** If set, automatic cuepoint insertion is paused until this timestamp ("No Ad Zone"). The value is specified in ISO 8601 format. */
  pauseAdsUntil?: string;
  /** The strategy to use when scheduling cuepoints. */
  scheduleStrategy?:
    | "scheduleStrategyUnspecified"
    | "concurrent"
    | "nonConcurrent"
    | (string & {});
  /** Interval frequency in seconds that api uses to insert cuepoints automatically. */
  repeatIntervalSecs?: number;
  /** This field is semantically required. If it is set false or not set, other fields in this message will be ignored. */
  enabled?: boolean;
}

export const CuepointSchedule: Schema.Schema<CuepointSchedule> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pauseAdsUntil: Schema.optional(Schema.String),
      scheduleStrategy: Schema.optional(Schema.String),
      repeatIntervalSecs: Schema.optional(Schema.Number),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CuepointSchedule",
  }) as any as Schema.Schema<CuepointSchedule>;

export interface LiveBroadcastMonetizationDetails {
  cuepointSchedule?: CuepointSchedule;
}

export const LiveBroadcastMonetizationDetails: Schema.Schema<LiveBroadcastMonetizationDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cuepointSchedule: Schema.optional(CuepointSchedule),
    }),
  ).annotate({
    identifier: "LiveBroadcastMonetizationDetails",
  }) as any as Schema.Schema<LiveBroadcastMonetizationDetails>;

export interface LiveBroadcastContentDetails {
  /** The monitorStream object contains information about the monitor stream, which the broadcaster can use to review the event content before the broadcast stream is shown publicly. */
  monitorStream?: MonitorStreamInfo;
  /** This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
  enableAutoStart?: boolean;
  /** This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also apply to the archived video. */
  enableEmbed?: boolean;
  closedCaptionsType?:
    | "closedCaptionsTypeUnspecified"
    | "closedCaptionsDisabled"
    | "closedCaptionsHttpPost"
    | "closedCaptionsEmbedded"
    | (string & {});
  /** The date and time that the live stream referenced by boundStreamId was last updated. */
  boundStreamLastUpdateTimeMs?: string;
  /** This value uniquely identifies the live stream bound to the broadcast. */
  boundStreamId?: string;
  /** This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers. */
  startWithSlate?: boolean;
  /** The 3D stereo layout of this broadcast. This defaults to mono. */
  stereoLayout?:
    | "stereoLayoutUnspecified"
    | "mono"
    | "leftRight"
    | "topBottom"
    | (string & {});
  /** This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST. */
  enableClosedCaptions?: boolean;
  /** This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
  enableAutoStop?: boolean;
  /** This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to true if you want to make playback available immediately after the broadcast ends. */
  enableDvr?: boolean;
  /** Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a delay of around one day before the archived video will be available for playback. */
  recordFromStart?: boolean;
  /** If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted. */
  latencyPreference?:
    | "latencyPreferenceUnspecified"
    | "normal"
    | "low"
    | "ultraLow"
    | (string & {});
  /** This setting indicates whether YouTube should enable content encryption for the broadcast. */
  enableContentEncryption?: boolean;
  /** Indicates whether this broadcast has low latency enabled. */
  enableLowLatency?: boolean;
  /** The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2 RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags. */
  mesh?: string;
  /** The projection format of this broadcast. This defaults to rectangular. */
  projection?:
    | "projectionUnspecified"
    | "rectangular"
    | "360"
    | "mesh"
    | (string & {});
}

export const LiveBroadcastContentDetails: Schema.Schema<LiveBroadcastContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      monitorStream: Schema.optional(MonitorStreamInfo),
      enableAutoStart: Schema.optional(Schema.Boolean),
      enableEmbed: Schema.optional(Schema.Boolean),
      closedCaptionsType: Schema.optional(Schema.String),
      boundStreamLastUpdateTimeMs: Schema.optional(Schema.String),
      boundStreamId: Schema.optional(Schema.String),
      startWithSlate: Schema.optional(Schema.Boolean),
      stereoLayout: Schema.optional(Schema.String),
      enableClosedCaptions: Schema.optional(Schema.Boolean),
      enableAutoStop: Schema.optional(Schema.Boolean),
      enableDvr: Schema.optional(Schema.Boolean),
      recordFromStart: Schema.optional(Schema.Boolean),
      latencyPreference: Schema.optional(Schema.String),
      enableContentEncryption: Schema.optional(Schema.Boolean),
      enableLowLatency: Schema.optional(Schema.Boolean),
      mesh: Schema.optional(Schema.String),
      projection: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveBroadcastContentDetails",
  }) as any as Schema.Schema<LiveBroadcastContentDetails>;

export interface LiveBroadcast {
  /** The ID that YouTube assigns to uniquely identify the broadcast. */
  id?: string;
  /** The snippet object contains basic details about the event, including its title, description, start time, and end time. */
  snippet?: LiveBroadcastSnippet;
  /** The status object contains information about the event's status. */
  status?: LiveBroadcastStatus;
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast". */
  kind?: string;
  /** The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live. */
  statistics?: LiveBroadcastStatistics;
  /** The monetizationDetails object contains information about the event's monetization details. */
  monetizationDetails?: LiveBroadcastMonetizationDetails;
  /** The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded. */
  contentDetails?: LiveBroadcastContentDetails;
}

export const LiveBroadcast: Schema.Schema<LiveBroadcast> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(LiveBroadcastSnippet),
      status: Schema.optional(LiveBroadcastStatus),
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      statistics: Schema.optional(LiveBroadcastStatistics),
      monetizationDetails: Schema.optional(LiveBroadcastMonetizationDetails),
      contentDetails: Schema.optional(LiveBroadcastContentDetails),
    }),
  ).annotate({
    identifier: "LiveBroadcast",
  }) as any as Schema.Schema<LiveBroadcast>;

export interface LiveBroadcastListResponse {
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcastListResponse". */
  kind?: string;
  /** A list of broadcasts that match the request criteria. */
  items?: Array<LiveBroadcast>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
}

export const LiveBroadcastListResponse: Schema.Schema<LiveBroadcastListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(LiveBroadcast)),
      prevPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveBroadcastListResponse",
  }) as any as Schema.Schema<LiveBroadcastListResponse>;

export interface ThirdPartyLinkSnippet {
  /** Type of the link named after the entities that are being linked. */
  type?: "linkUnspecified" | "channelToStoreLink" | (string & {});
  /** Information specific to a link between a channel and a store on a merchandising platform. */
  channelToStoreLink?: ChannelToStoreLinkDetails;
}

export const ThirdPartyLinkSnippet: Schema.Schema<ThirdPartyLinkSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      channelToStoreLink: Schema.optional(ChannelToStoreLinkDetails),
    }),
  ).annotate({
    identifier: "ThirdPartyLinkSnippet",
  }) as any as Schema.Schema<ThirdPartyLinkSnippet>;

export interface ThirdPartyLink {
  /** The linking_token identifies a YouTube account and channel with which the third party account is linked. */
  linkingToken?: string;
  /** Etag of this resource */
  etag?: string;
  /** The status object contains information about the status of the link. */
  status?: ThirdPartyLinkStatus;
  /** The snippet object contains basic details about the third- party account link. */
  snippet?: ThirdPartyLinkSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink". */
  kind?: string;
}

export const ThirdPartyLink: Schema.Schema<ThirdPartyLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      linkingToken: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      status: Schema.optional(ThirdPartyLinkStatus),
      snippet: Schema.optional(ThirdPartyLinkSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThirdPartyLink",
  }) as any as Schema.Schema<ThirdPartyLink>;

export interface ThirdPartyLinkListResponse {
  /** Etag of this resource. */
  etag?: string;
  items?: Array<ThirdPartyLink>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLinkListResponse". */
  kind?: string;
}

export const ThirdPartyLinkListResponse: Schema.Schema<ThirdPartyLinkListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(ThirdPartyLink)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ThirdPartyLinkListResponse",
  }) as any as Schema.Schema<ThirdPartyLinkListResponse>;

export interface PlaylistPlayer {
  /** An <iframe> tag that embeds a player that will play the playlist. */
  embedHtml?: string;
}

export const PlaylistPlayer: Schema.Schema<PlaylistPlayer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      embedHtml: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistPlayer",
  }) as any as Schema.Schema<PlaylistPlayer>;

export interface PlaylistLocalization {
  /** The localized strings for playlist's title. */
  title?: string;
  /** The localized strings for playlist's description. */
  description?: string;
}

export const PlaylistLocalization: Schema.Schema<PlaylistLocalization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistLocalization",
  }) as any as Schema.Schema<PlaylistLocalization>;

export interface PlaylistSnippet {
  /** A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The date and time that the playlist was created. */
  publishedAt?: string;
  /** The language of the playlist's default title and description. */
  defaultLanguage?: string;
  /** The ID that YouTube uses to uniquely identify the channel that published the playlist. */
  channelId?: string;
  /** Localized title and description, read-only. */
  localized?: PlaylistLocalization;
  /** The channel title of the channel that the video belongs to. */
  channelTitle?: string;
  /** Keyword tags associated with the playlist. */
  tags?: Array<string>;
  /** The playlist's title. */
  title?: string;
  /** The playlist's description. */
  description?: string;
  /** Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted. */
  thumbnailVideoId?: string;
}

export const PlaylistSnippet: Schema.Schema<PlaylistSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thumbnails: Schema.optional(ThumbnailDetails),
      publishedAt: Schema.optional(Schema.String),
      defaultLanguage: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      localized: Schema.optional(PlaylistLocalization),
      channelTitle: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      thumbnailVideoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistSnippet",
  }) as any as Schema.Schema<PlaylistSnippet>;

export interface PlaylistContentDetails {
  /** The number of videos in the playlist. */
  itemCount?: number;
}

export const PlaylistContentDetails: Schema.Schema<PlaylistContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      itemCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PlaylistContentDetails",
  }) as any as Schema.Schema<PlaylistContentDetails>;

export interface Playlist {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlist". */
  kind?: string;
  /** The player object contains information that you would use to play the playlist in an embedded player. */
  player?: PlaylistPlayer;
  /** The ID that YouTube uses to uniquely identify the playlist. */
  id?: string;
  /** The snippet object contains basic details about the playlist, such as its title and description. */
  snippet?: PlaylistSnippet;
  /** The status object contains status information for the playlist. */
  status?: PlaylistStatus;
  /** Localizations for different languages */
  localizations?: Record<string, PlaylistLocalization>;
  /** Etag of this resource. */
  etag?: string;
  /** The contentDetails object contains information like video count. */
  contentDetails?: PlaylistContentDetails;
}

export const Playlist: Schema.Schema<Playlist> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      player: Schema.optional(PlaylistPlayer),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(PlaylistSnippet),
      status: Schema.optional(PlaylistStatus),
      localizations: Schema.optional(
        Schema.Record(Schema.String, PlaylistLocalization),
      ),
      etag: Schema.optional(Schema.String),
      contentDetails: Schema.optional(PlaylistContentDetails),
    }),
  ).annotate({ identifier: "Playlist" }) as any as Schema.Schema<Playlist>;

export interface PlaylistListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  /** A list of playlists that match the request criteria */
  items?: Array<Playlist>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistListResponse". */
  kind?: string;
}

export const PlaylistListResponse: Schema.Schema<PlaylistListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Playlist)),
      prevPageToken: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistListResponse",
  }) as any as Schema.Schema<PlaylistListResponse>;

export interface ChannelSectionContentDetails {
  /** The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed. */
  playlists?: Array<string>;
  /** The channel ids for type multiple_channels. */
  channels?: Array<string>;
}

export const ChannelSectionContentDetails: Schema.Schema<ChannelSectionContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playlists: Schema.optional(Schema.Array(Schema.String)),
      channels: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ChannelSectionContentDetails",
  }) as any as Schema.Schema<ChannelSectionContentDetails>;

export interface ActivityContentDetailsPlaylistItem {
  /** ID of the item within the playlist. */
  playlistItemId?: string;
  /** The resourceId object contains information about the resource that was added to the playlist. */
  resourceId?: ResourceId;
  /** The value that YouTube uses to uniquely identify the playlist. */
  playlistId?: string;
}

export const ActivityContentDetailsPlaylistItem: Schema.Schema<ActivityContentDetailsPlaylistItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playlistItemId: Schema.optional(Schema.String),
      resourceId: Schema.optional(ResourceId),
      playlistId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsPlaylistItem",
  }) as any as Schema.Schema<ActivityContentDetailsPlaylistItem>;

export interface ChannelAuditDetails {
  /** Whether or not the channel has any copyright strikes. */
  copyrightStrikesGoodStanding?: boolean;
  /** Whether or not the channel respects the community guidelines. */
  communityGuidelinesGoodStanding?: boolean;
  /** Whether or not the channel has any unresolved claims. */
  contentIdClaimsGoodStanding?: boolean;
}

export const ChannelAuditDetails: Schema.Schema<ChannelAuditDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      copyrightStrikesGoodStanding: Schema.optional(Schema.Boolean),
      communityGuidelinesGoodStanding: Schema.optional(Schema.Boolean),
      contentIdClaimsGoodStanding: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelAuditDetails",
  }) as any as Schema.Schema<ChannelAuditDetails>;

export interface ChannelTopicDetails {
  /** A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API. */
  topicIds?: Array<string>;
  /** A list of Wikipedia URLs that describe the channel's content. */
  topicCategories?: Array<string>;
}

export const ChannelTopicDetails: Schema.Schema<ChannelTopicDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topicIds: Schema.optional(Schema.Array(Schema.String)),
      topicCategories: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ChannelTopicDetails",
  }) as any as Schema.Schema<ChannelTopicDetails>;

export interface LocalizedString {
  value?: string;
  language?: string;
}

export const LocalizedString: Schema.Schema<LocalizedString> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalizedString",
  }) as any as Schema.Schema<LocalizedString>;

export interface LanguageTag {
  value?: string;
}

export const LanguageTag: Schema.Schema<LanguageTag> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LanguageTag",
  }) as any as Schema.Schema<LanguageTag>;

export interface LocalizedProperty {
  default?: string;
  localized?: Array<LocalizedString>;
  /** The language of the default property. */
  defaultLanguage?: LanguageTag;
}

export const LocalizedProperty: Schema.Schema<LocalizedProperty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      default: Schema.optional(Schema.String),
      localized: Schema.optional(Schema.Array(LocalizedString)),
      defaultLanguage: Schema.optional(LanguageTag),
    }),
  ).annotate({
    identifier: "LocalizedProperty",
  }) as any as Schema.Schema<LocalizedProperty>;

export interface ImageSettings {
  /** The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels. */
  smallBrandedBannerImageUrl?: LocalizedProperty;
  /** The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page. */
  largeBrandedBannerImageUrl?: LocalizedProperty;
  /** Banner image. Tablet size low resolution (1138x188). */
  bannerTabletLowImageUrl?: string;
  /** Banner image. Mobile size high resolution (1280x360). */
  bannerMobileHdImageUrl?: string;
  /** Banner image. Mobile size high resolution (1440x395). */
  bannerMobileExtraHdImageUrl?: string;
  /** Banner image. TV size high resolution (1920x1080). */
  bannerTvHighImageUrl?: string;
  /** Banner image. Desktop size (1060x175). */
  bannerImageUrl?: string;
  /** Banner image. Mobile size (640x175). */
  bannerMobileImageUrl?: string;
  /** Banner image. Mobile size medium/high resolution (960x263). */
  bannerMobileMediumHdImageUrl?: string;
  /** The image map script for the small banner image. */
  smallBrandedBannerImageImapScript?: LocalizedProperty;
  /** Banner image. Tablet size extra high resolution (2560x424). */
  bannerTabletExtraHdImageUrl?: string;
  /** Banner image. Tablet size high resolution (2276x377). */
  bannerTabletHdImageUrl?: string;
  /** Banner image. TV size low resolution (854x480). */
  bannerTvLowImageUrl?: string;
  /** Banner image. Tablet size (1707x283). */
  bannerTabletImageUrl?: string;
  /** Banner image. Mobile size low resolution (320x88). */
  bannerMobileLowImageUrl?: string;
  /** This is generated when a ChannelBanner.Insert request has succeeded for the given channel. */
  bannerExternalUrl?: string;
  watchIconImageUrl?: string;
  /** The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages. */
  trackingImageUrl?: string;
  /** Banner image. TV size medium resolution (1280x720). */
  bannerTvMediumImageUrl?: string;
  /** The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k. */
  backgroundImageUrl?: LocalizedProperty;
  /** Banner image. TV size extra high resolution (2120x1192). */
  bannerTvImageUrl?: string;
  /** The image map script for the large banner image. */
  largeBrandedBannerImageImapScript?: LocalizedProperty;
}

export const ImageSettings: Schema.Schema<ImageSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      smallBrandedBannerImageUrl: Schema.optional(LocalizedProperty),
      largeBrandedBannerImageUrl: Schema.optional(LocalizedProperty),
      bannerTabletLowImageUrl: Schema.optional(Schema.String),
      bannerMobileHdImageUrl: Schema.optional(Schema.String),
      bannerMobileExtraHdImageUrl: Schema.optional(Schema.String),
      bannerTvHighImageUrl: Schema.optional(Schema.String),
      bannerImageUrl: Schema.optional(Schema.String),
      bannerMobileImageUrl: Schema.optional(Schema.String),
      bannerMobileMediumHdImageUrl: Schema.optional(Schema.String),
      smallBrandedBannerImageImapScript: Schema.optional(LocalizedProperty),
      bannerTabletExtraHdImageUrl: Schema.optional(Schema.String),
      bannerTabletHdImageUrl: Schema.optional(Schema.String),
      bannerTvLowImageUrl: Schema.optional(Schema.String),
      bannerTabletImageUrl: Schema.optional(Schema.String),
      bannerMobileLowImageUrl: Schema.optional(Schema.String),
      bannerExternalUrl: Schema.optional(Schema.String),
      watchIconImageUrl: Schema.optional(Schema.String),
      trackingImageUrl: Schema.optional(Schema.String),
      bannerTvMediumImageUrl: Schema.optional(Schema.String),
      backgroundImageUrl: Schema.optional(LocalizedProperty),
      bannerTvImageUrl: Schema.optional(Schema.String),
      largeBrandedBannerImageImapScript: Schema.optional(LocalizedProperty),
    }),
  ).annotate({
    identifier: "ImageSettings",
  }) as any as Schema.Schema<ImageSettings>;

export interface ChannelSettings {
  /** A prominent color that can be rendered on this channel page. */
  profileColor?: string;
  /** The country of the channel. */
  country?: string;
  defaultLanguage?: string;
  /** The ID for a Google Analytics account to track and measure traffic to the channels. */
  trackingAnalyticsAccountId?: string;
  /** Whether related channels should be proposed. */
  showRelatedChannels?: boolean;
  /** Specifies the channel title. */
  title?: string;
  /** Specifies the channel description. */
  description?: string;
  /** The trailer of the channel, for users that are not subscribers. */
  unsubscribedTrailer?: string;
  /** Title for the featured channels tab. */
  featuredChannelsTitle?: string;
  /** Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible. */
  moderateComments?: boolean;
  /** The list of featured channels. */
  featuredChannelsUrls?: Array<string>;
  /** Which content tab users should see when viewing the channel. */
  defaultTab?: string;
  /** Lists keywords associated with the channel, comma-separated. */
  keywords?: string;
  /** Whether the tab to browse the videos should be displayed. */
  showBrowseView?: boolean;
}

export const ChannelSettings: Schema.Schema<ChannelSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      profileColor: Schema.optional(Schema.String),
      country: Schema.optional(Schema.String),
      defaultLanguage: Schema.optional(Schema.String),
      trackingAnalyticsAccountId: Schema.optional(Schema.String),
      showRelatedChannels: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      unsubscribedTrailer: Schema.optional(Schema.String),
      featuredChannelsTitle: Schema.optional(Schema.String),
      moderateComments: Schema.optional(Schema.Boolean),
      featuredChannelsUrls: Schema.optional(Schema.Array(Schema.String)),
      defaultTab: Schema.optional(Schema.String),
      keywords: Schema.optional(Schema.String),
      showBrowseView: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelSettings",
  }) as any as Schema.Schema<ChannelSettings>;

export interface ChannelBrandingSettings {
  /** Branding properties for branding images. */
  image?: ImageSettings;
  /** Branding properties for the watch page. */
  watch?: WatchSettings;
  /** Branding properties for the channel view. */
  channel?: ChannelSettings;
  /** Additional experimental branding properties. */
  hints?: Array<PropertyValue>;
}

export const ChannelBrandingSettings: Schema.Schema<ChannelBrandingSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      image: Schema.optional(ImageSettings),
      watch: Schema.optional(WatchSettings),
      channel: Schema.optional(ChannelSettings),
      hints: Schema.optional(Schema.Array(PropertyValue)),
    }),
  ).annotate({
    identifier: "ChannelBrandingSettings",
  }) as any as Schema.Schema<ChannelBrandingSettings>;

export interface ChannelStatus {
  /** The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information. */
  longUploadsStatus?:
    | "longUploadsUnspecified"
    | "allowed"
    | "eligible"
    | "disallowed"
    | (string & {});
  /** Whether the channel is considered ypp monetization enabled. See go/yppornot for more details. */
  isChannelMonetizationEnabled?: boolean;
  selfDeclaredMadeForKids?: boolean;
  /** Privacy status of the channel. */
  privacyStatus?: "public" | "unlisted" | "private" | (string & {});
  madeForKids?: boolean;
  /** If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity. */
  isLinked?: boolean;
}

export const ChannelStatus: Schema.Schema<ChannelStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      longUploadsStatus: Schema.optional(Schema.String),
      isChannelMonetizationEnabled: Schema.optional(Schema.Boolean),
      selfDeclaredMadeForKids: Schema.optional(Schema.Boolean),
      privacyStatus: Schema.optional(Schema.String),
      madeForKids: Schema.optional(Schema.Boolean),
      isLinked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelStatus",
  }) as any as Schema.Schema<ChannelStatus>;

export interface ChannelContentDetails {
  relatedPlaylists?: {
    uploads?: string;
    watchLater?: string;
    likes?: string;
    favorites?: string;
    watchHistory?: string;
  };
}

export const ChannelContentDetails: Schema.Schema<ChannelContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      relatedPlaylists: Schema.optional(
        Schema.Struct({
          uploads: Schema.optional(Schema.String),
          watchLater: Schema.optional(Schema.String),
          likes: Schema.optional(Schema.String),
          favorites: Schema.optional(Schema.String),
          watchHistory: Schema.optional(Schema.String),
        }),
      ),
    }),
  ).annotate({
    identifier: "ChannelContentDetails",
  }) as any as Schema.Schema<ChannelContentDetails>;

export interface ChannelStatistics {
  /** The number of subscribers that the channel has. */
  subscriberCount?: string;
  /** The number of videos uploaded to the channel. */
  videoCount?: string;
  /** The number of times the channel has been viewed. */
  viewCount?: string;
  /** The number of comments for the channel. */
  commentCount?: string;
  /** Whether or not the number of subscribers is shown for this user. */
  hiddenSubscriberCount?: boolean;
}

export const ChannelStatistics: Schema.Schema<ChannelStatistics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscriberCount: Schema.optional(Schema.String),
      videoCount: Schema.optional(Schema.String),
      viewCount: Schema.optional(Schema.String),
      commentCount: Schema.optional(Schema.String),
      hiddenSubscriberCount: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelStatistics",
  }) as any as Schema.Schema<ChannelStatistics>;

export interface ChannelContentOwnerDetails {
  /** The date and time when the channel was linked to the content owner. */
  timeLinked?: string;
  /** The ID of the content owner linked to the channel. */
  contentOwner?: string;
}

export const ChannelContentOwnerDetails: Schema.Schema<ChannelContentOwnerDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeLinked: Schema.optional(Schema.String),
      contentOwner: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelContentOwnerDetails",
  }) as any as Schema.Schema<ChannelContentOwnerDetails>;

export interface ChannelConversionPings {
  /** Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping. */
  pings?: Array<ChannelConversionPing>;
}

export const ChannelConversionPings: Schema.Schema<ChannelConversionPings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pings: Schema.optional(Schema.Array(ChannelConversionPing)),
    }),
  ).annotate({
    identifier: "ChannelConversionPings",
  }) as any as Schema.Schema<ChannelConversionPings>;

export interface Channel {
  /** Etag of this resource. */
  etag?: string;
  /** The snippet object contains basic details about the channel, such as its title, description, and thumbnail images. */
  snippet?: ChannelSnippet;
  /** The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process. */
  auditDetails?: ChannelAuditDetails;
  /** Localizations for different languages */
  localizations?: Record<string, ChannelLocalization>;
  /** The topicDetails object encapsulates information about Freebase topics associated with the channel. */
  topicDetails?: ChannelTopicDetails;
  /** The brandingSettings object encapsulates information about the branding of the channel. */
  brandingSettings?: ChannelBrandingSettings;
  /** The ID that YouTube uses to uniquely identify the channel. */
  id?: string;
  /** The status object encapsulates information about the privacy status of the channel. */
  status?: ChannelStatus;
  /** The contentDetails object encapsulates information about the channel's content. */
  contentDetails?: ChannelContentDetails;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channel". */
  kind?: string;
  /** The statistics object encapsulates statistics for the channel. */
  statistics?: ChannelStatistics;
  /** The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel. */
  contentOwnerDetails?: ChannelContentOwnerDetails;
  /** The conversionPings object encapsulates information about conversion pings that need to be respected by the channel. */
  conversionPings?: ChannelConversionPings;
}

export const Channel: Schema.Schema<Channel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      snippet: Schema.optional(ChannelSnippet),
      auditDetails: Schema.optional(ChannelAuditDetails),
      localizations: Schema.optional(
        Schema.Record(Schema.String, ChannelLocalization),
      ),
      topicDetails: Schema.optional(ChannelTopicDetails),
      brandingSettings: Schema.optional(ChannelBrandingSettings),
      id: Schema.optional(Schema.String),
      status: Schema.optional(ChannelStatus),
      contentDetails: Schema.optional(ChannelContentDetails),
      kind: Schema.optional(Schema.String),
      statistics: Schema.optional(ChannelStatistics),
      contentOwnerDetails: Schema.optional(ChannelContentOwnerDetails),
      conversionPings: Schema.optional(ChannelConversionPings),
    }),
  ).annotate({ identifier: "Channel" }) as any as Schema.Schema<Channel>;

export interface ChannelListResponse {
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Etag of this resource. */
  etag?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelListResponse". */
  kind?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  items?: Array<Channel>;
}

export const ChannelListResponse: Schema.Schema<ChannelListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      etag: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      eventId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      prevPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Channel)),
    }),
  ).annotate({
    identifier: "ChannelListResponse",
  }) as any as Schema.Schema<ChannelListResponse>;

export interface ActivityContentDetailsChannelItem {
  /** The resourceId object contains information that identifies the resource that was added to the channel. */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsChannelItem: Schema.Schema<ActivityContentDetailsChannelItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsChannelItem",
  }) as any as Schema.Schema<ActivityContentDetailsChannelItem>;

export interface PlaylistItemContentDetails {
  /** The date and time that the video was published to YouTube. */
  videoPublishedAt?: string;
  /** The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video. */
  endAt?: string;
  /** The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0. */
  startAt?: string;
  /** A user-generated note for this item. */
  note?: string;
  /** The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request. */
  videoId?: string;
}

export const PlaylistItemContentDetails: Schema.Schema<PlaylistItemContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      videoPublishedAt: Schema.optional(Schema.String),
      endAt: Schema.optional(Schema.String),
      startAt: Schema.optional(Schema.String),
      note: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistItemContentDetails",
  }) as any as Schema.Schema<PlaylistItemContentDetails>;

export interface PlaylistItemSnippet {
  /** The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth. */
  position?: number;
  /** Channel title for the channel this video belongs to. */
  videoOwnerChannelTitle?: string;
  /** Channel id for the channel this video belongs to. */
  videoOwnerChannelId?: string;
  /** The ID that YouTube uses to uniquely identify the user that added the item to the playlist. */
  channelId?: string;
  /** The item's title. */
  title?: string;
  /** The item's description. */
  description?: string;
  /** Channel title for the channel that the playlist item belongs to. */
  channelTitle?: string;
  /** The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in. */
  playlistId?: string;
  /** The date and time that the item was added to the playlist. */
  publishedAt?: string;
  /** A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item. */
  resourceId?: ResourceId;
}

export const PlaylistItemSnippet: Schema.Schema<PlaylistItemSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      position: Schema.optional(Schema.Number),
      videoOwnerChannelTitle: Schema.optional(Schema.String),
      videoOwnerChannelId: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      channelTitle: Schema.optional(Schema.String),
      playlistId: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      thumbnails: Schema.optional(ThumbnailDetails),
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "PlaylistItemSnippet",
  }) as any as Schema.Schema<PlaylistItemSnippet>;

export interface PlaylistItem {
  /** The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
  contentDetails?: PlaylistItemContentDetails;
  /** The ID that YouTube uses to uniquely identify the playlist item. */
  id?: string;
  /** The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
  snippet?: PlaylistItemSnippet;
  /** The status object contains information about the playlist item's privacy status. */
  status?: PlaylistItemStatus;
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem". */
  kind?: string;
}

export const PlaylistItem: Schema.Schema<PlaylistItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDetails: Schema.optional(PlaylistItemContentDetails),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(PlaylistItemSnippet),
      status: Schema.optional(PlaylistItemStatus),
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistItem",
  }) as any as Schema.Schema<PlaylistItem>;

export interface PlaylistItemListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItemListResponse". */
  kind?: string;
  /** A list of playlist items that match the request criteria. */
  items?: Array<PlaylistItem>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  etag?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const PlaylistItemListResponse: Schema.Schema<PlaylistItemListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(PlaylistItem)),
      prevPageToken: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlaylistItemListResponse",
  }) as any as Schema.Schema<PlaylistItemListResponse>;

export interface MembershipsDurationAtLevel {
  /** Pricing level ID. */
  level?: string;
  /** The date and time when the user became a continuous member for the given level. */
  memberSince?: string;
  /** The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer). */
  memberTotalDurationMonths?: number;
}

export const MembershipsDurationAtLevel: Schema.Schema<MembershipsDurationAtLevel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      level: Schema.optional(Schema.String),
      memberSince: Schema.optional(Schema.String),
      memberTotalDurationMonths: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "MembershipsDurationAtLevel",
  }) as any as Schema.Schema<MembershipsDurationAtLevel>;

export interface CommentThreadListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of comment threads that match the request criteria. */
  items?: Array<CommentThread>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentThreadListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Etag of this resource. */
  etag?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
}

export const CommentThreadListResponse: Schema.Schema<CommentThreadListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(CommentThread)),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      etag: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
    }),
  ).annotate({
    identifier: "CommentThreadListResponse",
  }) as any as Schema.Schema<CommentThreadListResponse>;

export interface LiveChatModeratorSnippet {
  /** Details about the moderator. */
  moderatorDetails?: ChannelProfileDetails;
  /** The ID of the live chat this moderator can act on. */
  liveChatId?: string;
}

export const LiveChatModeratorSnippet: Schema.Schema<LiveChatModeratorSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      moderatorDetails: Schema.optional(ChannelProfileDetails),
      liveChatId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatModeratorSnippet",
  }) as any as Schema.Schema<LiveChatModeratorSnippet>;

export interface LiveChatModerator {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator". */
  kind?: string;
  /** The ID that YouTube assigns to uniquely identify the moderator. */
  id?: string;
  /** The snippet object contains basic details about the moderator. */
  snippet?: LiveChatModeratorSnippet;
  /** Etag of this resource. */
  etag?: string;
}

export const LiveChatModerator: Schema.Schema<LiveChatModerator> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(LiveChatModeratorSnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatModerator",
  }) as any as Schema.Schema<LiveChatModerator>;

export interface LiveChatModeratorListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModeratorListResponse". */
  kind?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  /** A list of moderators that match the request criteria. */
  items?: Array<LiveChatModerator>;
  /** Etag of this resource. */
  etag?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const LiveChatModeratorListResponse: Schema.Schema<LiveChatModeratorListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      prevPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(LiveChatModerator)),
      etag: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      nextPageToken: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatModeratorListResponse",
  }) as any as Schema.Schema<LiveChatModeratorListResponse>;

export interface ChannelSectionLocalization {
  /** The localized strings for channel section's title. */
  title?: string;
}

export const ChannelSectionLocalization: Schema.Schema<ChannelSectionLocalization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelSectionLocalization",
  }) as any as Schema.Schema<ChannelSectionLocalization>;

export interface ChannelSectionSnippet {
  /** Localized title, read-only. */
  localized?: ChannelSectionLocalization;
  /** The position of the channel section in the channel. */
  position?: number;
  /** The type of the channel section. */
  type?:
    | "channelsectionTypeUndefined"
    | "singlePlaylist"
    | "multiplePlaylists"
    | "popularUploads"
    | "recentUploads"
    | "likes"
    | "allPlaylists"
    | "likedPlaylists"
    | "recentPosts"
    | "recentActivity"
    | "liveEvents"
    | "upcomingEvents"
    | "completedEvents"
    | "multipleChannels"
    | "postedVideos"
    | "postedPlaylists"
    | "subscriptions"
    | (string & {});
  /** The ID that YouTube uses to uniquely identify the channel that published the channel section. */
  channelId?: string;
  /** The style of the channel section. */
  style?:
    | "channelsectionStyleUnspecified"
    | "horizontalRow"
    | "verticalList"
    | (string & {});
  /** The language of the channel section's default title and description. */
  defaultLanguage?: string;
  /** The channel section's title for multiple_playlists and multiple_channels. */
  title?: string;
}

export const ChannelSectionSnippet: Schema.Schema<ChannelSectionSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      localized: Schema.optional(ChannelSectionLocalization),
      position: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.String),
      channelId: Schema.optional(Schema.String),
      style: Schema.optional(Schema.String),
      defaultLanguage: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelSectionSnippet",
  }) as any as Schema.Schema<ChannelSectionSnippet>;

export interface ChannelSection {
  /** The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section. */
  contentDetails?: ChannelSectionContentDetails;
  /** The targeting object contains basic targeting settings about the channel section. */
  targeting?: ChannelSectionTargeting;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection". */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the channel section. */
  id?: string;
  /** The snippet object contains basic details about the channel section, such as its type, style and title. */
  snippet?: ChannelSectionSnippet;
  /** Localizations for different languages */
  localizations?: Record<string, ChannelSectionLocalization>;
  /** Etag of this resource. */
  etag?: string;
}

export const ChannelSection: Schema.Schema<ChannelSection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDetails: Schema.optional(ChannelSectionContentDetails),
      targeting: Schema.optional(ChannelSectionTargeting),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(ChannelSectionSnippet),
      localizations: Schema.optional(
        Schema.Record(Schema.String, ChannelSectionLocalization),
      ),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelSection",
  }) as any as Schema.Schema<ChannelSection>;

export interface ChannelSectionListResponse {
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSectionListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** A list of ChannelSections that match the request criteria. */
  items?: Array<ChannelSection>;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const ChannelSectionListResponse: Schema.Schema<ChannelSectionListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(ChannelSection)),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelSectionListResponse",
  }) as any as Schema.Schema<ChannelSectionListResponse>;

export interface LevelDetails {
  /** The name that should be used when referring to this level. */
  displayName?: string;
}

export const LevelDetails: Schema.Schema<LevelDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LevelDetails",
  }) as any as Schema.Schema<LevelDetails>;

export interface MembershipsLevelSnippet {
  /** The id of the channel that's offering channel memberships. */
  creatorChannelId?: string;
  /** Details about the pricing level. */
  levelDetails?: LevelDetails;
}

export const MembershipsLevelSnippet: Schema.Schema<MembershipsLevelSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      creatorChannelId: Schema.optional(Schema.String),
      levelDetails: Schema.optional(LevelDetails),
    }),
  ).annotate({
    identifier: "MembershipsLevelSnippet",
  }) as any as Schema.Schema<MembershipsLevelSnippet>;

export interface VideoTrainability {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoTrainability". */
  kind?: string;
  /** The ID of the video. */
  videoId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** Specifies who is allowed to train on the video. Valid values are: - a single string "all" - a single string "none" - a list of allowed parties */
  permitted?: Array<string>;
}

export const VideoTrainability: Schema.Schema<VideoTrainability> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      permitted: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "VideoTrainability",
  }) as any as Schema.Schema<VideoTrainability>;

export interface I18nRegion {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegion". */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the i18n region. */
  id?: string;
  /** The snippet object contains basic details about the i18n region, such as region code and human-readable name. */
  snippet?: I18nRegionSnippet;
  /** Etag of this resource. */
  etag?: string;
}

export const I18nRegion: Schema.Schema<I18nRegion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(I18nRegionSnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "I18nRegion" }) as any as Schema.Schema<I18nRegion>;

export interface VideoCategory {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategory". */
  kind?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the video category. */
  id?: string;
  /** The snippet object contains basic details about the video category, including its title. */
  snippet?: VideoCategorySnippet;
}

export const VideoCategory: Schema.Schema<VideoCategory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(VideoCategorySnippet),
    }),
  ).annotate({
    identifier: "VideoCategory",
  }) as any as Schema.Schema<VideoCategory>;

export interface VideoCategoryListResponse {
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategoryListResponse". */
  kind?: string;
  /** A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding videoCategory resource. */
  items?: Array<VideoCategory>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
}

export const VideoCategoryListResponse: Schema.Schema<VideoCategoryListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(VideoCategory)),
      prevPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoCategoryListResponse",
  }) as any as Schema.Schema<VideoCategoryListResponse>;

export interface I18nLanguageListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding i18nLanguage resource. */
  items?: Array<I18nLanguage>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguageListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Etag of this resource. */
  etag?: string;
}

export const I18nLanguageListResponse: Schema.Schema<I18nLanguageListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(I18nLanguage)),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "I18nLanguageListResponse",
  }) as any as Schema.Schema<I18nLanguageListResponse>;

export interface VideoGetRatingResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoGetRatingResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** A list of ratings that match the request criteria. */
  items?: Array<VideoRating>;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const VideoGetRatingResponse: Schema.Schema<VideoGetRatingResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(VideoRating)),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoGetRatingResponse",
  }) as any as Schema.Schema<VideoGetRatingResponse>;

export interface LiveChatBan {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube assigns to uniquely identify the ban. */
  id?: string;
  /** The `snippet` object contains basic details about the ban. */
  snippet?: LiveChatBanSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string `"youtube#liveChatBan"`. */
  kind?: string;
}

export const LiveChatBan: Schema.Schema<LiveChatBan> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(LiveChatBanSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LiveChatBan",
  }) as any as Schema.Schema<LiveChatBan>;

export interface ActivitySnippet {
  /** A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. */
  thumbnails?: ThumbnailDetails;
  /** The ID that YouTube uses to uniquely identify the channel associated with the activity. */
  channelId?: string;
  /** The type of activity that the resource describes. */
  type?:
    | "typeUnspecified"
    | "upload"
    | "like"
    | "favorite"
    | "comment"
    | "subscription"
    | "playlistItem"
    | "recommendation"
    | "bulletin"
    | "social"
    | "channelItem"
    | "promotedItem"
    | (string & {});
  /** The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the same video as a favorite, the entries for those events would have the same group ID in the user's activity feed. In your user interface, you can avoid repetition by grouping events with the same groupId value. */
  groupId?: string;
  /** The date and time that the video was uploaded. */
  publishedAt?: string;
  /** The title of the resource primarily associated with the activity. */
  title?: string;
  /** The description of the resource primarily associated with the activity. @mutable youtube.activities.insert */
  description?: string;
  /** Channel title for the channel responsible for this activity */
  channelTitle?: string;
}

export const ActivitySnippet: Schema.Schema<ActivitySnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      thumbnails: Schema.optional(ThumbnailDetails),
      channelId: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      groupId: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      channelTitle: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivitySnippet",
  }) as any as Schema.Schema<ActivitySnippet>;

export interface RelatedEntity {
  entity?: Entity;
}

export const RelatedEntity: Schema.Schema<RelatedEntity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entity: Schema.optional(Entity),
    }),
  ).annotate({
    identifier: "RelatedEntity",
  }) as any as Schema.Schema<RelatedEntity>;

export interface SuperChatEventListResponse {
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  tokenPagination?: TokenPagination;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEventListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** A list of Super Chat purchases that match the request criteria. */
  items?: Array<SuperChatEvent>;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const SuperChatEventListResponse: Schema.Schema<SuperChatEventListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(SuperChatEvent)),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SuperChatEventListResponse",
  }) as any as Schema.Schema<SuperChatEventListResponse>;

export interface MembershipsDuration {
  /** The date and time when the user became a continuous member across all levels. */
  memberSince?: string;
  /** The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer). */
  memberTotalDurationMonths?: number;
}

export const MembershipsDuration: Schema.Schema<MembershipsDuration> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberSince: Schema.optional(Schema.String),
      memberTotalDurationMonths: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "MembershipsDuration",
  }) as any as Schema.Schema<MembershipsDuration>;

export interface SearchResult {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#searchResult". */
  kind?: string;
  /** The id object contains information that can be used to uniquely identify the resource that matches the search request. */
  id?: ResourceId;
  /** The snippet object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video's title and the description will be the video's description. */
  snippet?: SearchResultSnippet;
  /** Etag of this resource. */
  etag?: string;
}

export const SearchResult: Schema.Schema<SearchResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      id: Schema.optional(ResourceId),
      snippet: Schema.optional(SearchResultSnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SearchResult",
  }) as any as Schema.Schema<SearchResult>;

export interface ChannelBannerResource {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelBannerResource". */
  kind?: string;
  etag?: string;
  /** The URL of this banner image. */
  url?: string;
}

export const ChannelBannerResource: Schema.Schema<ChannelBannerResource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelBannerResource",
  }) as any as Schema.Schema<ChannelBannerResource>;

export interface MembershipsDetails {
  /** Id of the highest level that the user has access to at the moment. */
  highestAccessibleLevel?: string;
  /** Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase. */
  accessibleLevels?: Array<string>;
  /** Data about memberships duration without taking into consideration pricing levels. */
  membershipsDuration?: MembershipsDuration;
  /** Display name for the highest level that the user has access to at the moment. */
  highestAccessibleLevelDisplayName?: string;
  /** Data about memberships duration on particular pricing levels. */
  membershipsDurationAtLevels?: Array<MembershipsDurationAtLevel>;
}

export const MembershipsDetails: Schema.Schema<MembershipsDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      highestAccessibleLevel: Schema.optional(Schema.String),
      accessibleLevels: Schema.optional(Schema.Array(Schema.String)),
      membershipsDuration: Schema.optional(MembershipsDuration),
      highestAccessibleLevelDisplayName: Schema.optional(Schema.String),
      membershipsDurationAtLevels: Schema.optional(
        Schema.Array(MembershipsDurationAtLevel),
      ),
    }),
  ).annotate({
    identifier: "MembershipsDetails",
  }) as any as Schema.Schema<MembershipsDetails>;

export interface MemberSnippet {
  /** Details about the member. */
  memberDetails?: ChannelProfileDetails;
  /** The id of the channel that's offering memberships. */
  creatorChannelId?: string;
  /** Details about the user's membership. */
  membershipsDetails?: MembershipsDetails;
}

export const MemberSnippet: Schema.Schema<MemberSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      memberDetails: Schema.optional(ChannelProfileDetails),
      creatorChannelId: Schema.optional(Schema.String),
      membershipsDetails: Schema.optional(MembershipsDetails),
    }),
  ).annotate({
    identifier: "MemberSnippet",
  }) as any as Schema.Schema<MemberSnippet>;

export interface Member {
  /** Etag of this resource. */
  etag?: string;
  /** The snippet object contains basic details about the member. */
  snippet?: MemberSnippet;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#member". */
  kind?: string;
}

export const Member: Schema.Schema<Member> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      snippet: Schema.optional(MemberSnippet),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Member" }) as any as Schema.Schema<Member>;

export interface MemberListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of members that match the request criteria. */
  items?: Array<Member>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#memberListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Etag of this resource. */
  etag?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  pageInfo?: PageInfo;
}

export const MemberListResponse: Schema.Schema<MemberListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Member)),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      etag: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
    }),
  ).annotate({
    identifier: "MemberListResponse",
  }) as any as Schema.Schema<MemberListResponse>;

export interface ActivityContentDetailsLike {
  /** The resourceId object contains information that identifies the rated resource. */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsLike: Schema.Schema<ActivityContentDetailsLike> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsLike",
  }) as any as Schema.Schema<ActivityContentDetailsLike>;

export interface VideoAbuseReportReasonListResponse {
  /** Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReasonListResponse"`. */
  kind?: string;
  /** The `visitorId` identifies the visitor. */
  visitorId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** A list of valid abuse reasons that are used with `video.ReportAbuse`. */
  items?: Array<VideoAbuseReportReason>;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
}

export const VideoAbuseReportReasonListResponse: Schema.Schema<VideoAbuseReportReasonListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(VideoAbuseReportReason)),
      eventId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoAbuseReportReasonListResponse",
  }) as any as Schema.Schema<VideoAbuseReportReasonListResponse>;

export interface I18nRegionListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding i18nRegion resource. */
  items?: Array<I18nRegion>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegionListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Etag of this resource. */
  etag?: string;
}

export const I18nRegionListResponse: Schema.Schema<I18nRegionListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(I18nRegion)),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "I18nRegionListResponse",
  }) as any as Schema.Schema<I18nRegionListResponse>;

export interface ActivityContentDetailsRecommendation {
  /** The resourceId object contains information that identifies the recommended resource. */
  resourceId?: ResourceId;
  /** The reason that the resource is recommended to the user. */
  reason?:
    | "reasonUnspecified"
    | "videoFavorited"
    | "videoLiked"
    | "videoWatched"
    | (string & {});
  /** The seedResourceId object contains information about the resource that caused the recommendation. */
  seedResourceId?: ResourceId;
}

export const ActivityContentDetailsRecommendation: Schema.Schema<ActivityContentDetailsRecommendation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
      reason: Schema.optional(Schema.String),
      seedResourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsRecommendation",
  }) as any as Schema.Schema<ActivityContentDetailsRecommendation>;

export interface MembershipsLevel {
  /** The ID that YouTube assigns to uniquely identify the memberships level. */
  id?: string;
  /** The snippet object contains basic details about the level. */
  snippet?: MembershipsLevelSnippet;
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse". */
  kind?: string;
}

export const MembershipsLevel: Schema.Schema<MembershipsLevel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(MembershipsLevelSnippet),
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MembershipsLevel",
  }) as any as Schema.Schema<MembershipsLevel>;

export interface MembershipsLevelListResponse {
  /** Etag of this resource. */
  etag?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of pricing levels offered by a creator to the fans. */
  items?: Array<MembershipsLevel>;
}

export const MembershipsLevelListResponse: Schema.Schema<MembershipsLevelListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(MembershipsLevel)),
    }),
  ).annotate({
    identifier: "MembershipsLevelListResponse",
  }) as any as Schema.Schema<MembershipsLevelListResponse>;

export interface SearchListResponse {
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  regionCode?: string;
  /** Pagination information for token pagination. */
  items?: Array<SearchResult>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#searchListResponse". */
  kind?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Etag of this resource. */
  etag?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
}

export const SearchListResponse: Schema.Schema<SearchListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      prevPageToken: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(SearchResult)),
      kind: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      etag: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
    }),
  ).annotate({
    identifier: "SearchListResponse",
  }) as any as Schema.Schema<SearchListResponse>;

export interface ActivityContentDetailsComment {
  /** The resourceId object contains information that identifies the resource associated with the comment. */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsComment: Schema.Schema<ActivityContentDetailsComment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsComment",
  }) as any as Schema.Schema<ActivityContentDetailsComment>;

export interface InvideoPosition {
  /** Defines the position type. */
  type?: "corner" | (string & {});
  /** Describes in which corner of the video the visual widget will appear. */
  cornerPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | (string & {});
}

export const InvideoPosition: Schema.Schema<InvideoPosition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      cornerPosition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InvideoPosition",
  }) as any as Schema.Schema<InvideoPosition>;

export interface InvideoTiming {
  /** Describes a timing type. If the value is offsetFromStart, then the offsetMs field represents an offset from the start of the video. If the value is offsetFromEnd, then the offsetMs field represents an offset from the end of the video. */
  type?: "offsetFromStart" | "offsetFromEnd" | (string & {});
  /** Defines the time at which the promotion will appear. Depending on the value of type the value of the offsetMs field will represent a time offset from the start or from the end of the video, expressed in milliseconds. */
  offsetMs?: string;
  /** Defines the duration in milliseconds for which the promotion should be displayed. If missing, the client should use the default. */
  durationMs?: string;
}

export const InvideoTiming: Schema.Schema<InvideoTiming> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      offsetMs: Schema.optional(Schema.String),
      durationMs: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InvideoTiming",
  }) as any as Schema.Schema<InvideoTiming>;

export interface InvideoBranding {
  /** The temporal position within the video where watermark will be displayed. */
  timing?: InvideoTiming;
  /** The url of the uploaded image. Only used in apiary to api communication. */
  imageUrl?: string;
  /** The bytes the uploaded image. Only used in api to youtube communication. */
  imageBytes?: string;
  /** The channel to which this branding links. If not present it defaults to the current channel. */
  targetChannelId?: string;
  /** The spatial position within the video where the branding watermark will be displayed. */
  position?: InvideoPosition;
}

export const InvideoBranding: Schema.Schema<InvideoBranding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timing: Schema.optional(InvideoTiming),
      imageUrl: Schema.optional(Schema.String),
      imageBytes: Schema.optional(Schema.String),
      targetChannelId: Schema.optional(Schema.String),
      position: Schema.optional(InvideoPosition),
    }),
  ).annotate({
    identifier: "InvideoBranding",
  }) as any as Schema.Schema<InvideoBranding>;

export interface ActivityContentDetailsSocial {
  /** The URL of the social network post. */
  referenceUrl?: string;
  /** The resourceId object encapsulates information that identifies the resource associated with a social network post. */
  resourceId?: ResourceId;
  /** The author of the social network post. */
  author?: string;
  /** An image of the post's author. */
  imageUrl?: string;
  /** The name of the social network. */
  type?: "unspecified" | "googlePlus" | "facebook" | "twitter" | (string & {});
}

export const ActivityContentDetailsSocial: Schema.Schema<ActivityContentDetailsSocial> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      referenceUrl: Schema.optional(Schema.String),
      resourceId: Schema.optional(ResourceId),
      author: Schema.optional(Schema.String),
      imageUrl: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsSocial",
  }) as any as Schema.Schema<ActivityContentDetailsSocial>;

export interface ActivityContentDetailsBulletin {
  /** The resourceId object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert */
  resourceId?: ResourceId;
}

export const ActivityContentDetailsBulletin: Schema.Schema<ActivityContentDetailsBulletin> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceId: Schema.optional(ResourceId),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsBulletin",
  }) as any as Schema.Schema<ActivityContentDetailsBulletin>;

export interface ActivityContentDetailsPromotedItem {
  /** The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item. */
  impressionUrl?: Array<string>;
  /** The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown. */
  forecastingUrl?: Array<string>;
  /** The URL the client should fetch to request a promoted item. */
  adTag?: string;
  /** The ID that YouTube uses to uniquely identify the promoted video. */
  videoId?: string;
  /** The text description to accompany the promoted item. */
  descriptionText?: string;
  /** The type of call-to-action, a message to the user indicating action that can be taken. */
  ctaType?: "ctaTypeUnspecified" | "visitAdvertiserSite" | (string & {});
  /** The URL the client should ping to indicate that the user clicked through on this promoted item. */
  clickTrackingUrl?: string;
  /** The URL the client should ping to indicate that the user was shown this promoted item. */
  creativeViewUrl?: string;
  /** The URL the client should direct the user to, if the user chooses to visit the advertiser's website. */
  destinationUrl?: string;
  /** The custom call-to-action button text. If specified, it will override the default button text for the cta_type. */
  customCtaButtonText?: string;
}

export const ActivityContentDetailsPromotedItem: Schema.Schema<ActivityContentDetailsPromotedItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      impressionUrl: Schema.optional(Schema.Array(Schema.String)),
      forecastingUrl: Schema.optional(Schema.Array(Schema.String)),
      adTag: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
      descriptionText: Schema.optional(Schema.String),
      ctaType: Schema.optional(Schema.String),
      clickTrackingUrl: Schema.optional(Schema.String),
      creativeViewUrl: Schema.optional(Schema.String),
      destinationUrl: Schema.optional(Schema.String),
      customCtaButtonText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivityContentDetailsPromotedItem",
  }) as any as Schema.Schema<ActivityContentDetailsPromotedItem>;

export interface ActivityContentDetails {
  /** The channelItem object contains details about a resource which was added to a channel. This property is only present if the snippet.type is channelItem. */
  channelItem?: ActivityContentDetailsChannelItem;
  /** The social object contains details about a social network post. This property is only present if the snippet.type is social. */
  social?: ActivityContentDetailsSocial;
  /** The comment object contains information about a resource that received a comment. This property is only present if the snippet.type is comment. */
  comment?: ActivityContentDetailsComment;
  /** The favorite object contains information about a video that was marked as a favorite video. This property is only present if the snippet.type is favorite. */
  favorite?: ActivityContentDetailsFavorite;
  /** The upload object contains information about the uploaded video. This property is only present if the snippet.type is upload. */
  upload?: ActivityContentDetailsUpload;
  /** The subscription object contains information about a channel that a user subscribed to. This property is only present if the snippet.type is subscription. */
  subscription?: ActivityContentDetailsSubscription;
  /** The recommendation object contains information about a recommended resource. This property is only present if the snippet.type is recommendation. */
  recommendation?: ActivityContentDetailsRecommendation;
  /** The playlistItem object contains information about a new playlist item. This property is only present if the snippet.type is playlistItem. */
  playlistItem?: ActivityContentDetailsPlaylistItem;
  /** The bulletin object contains details about a channel bulletin post. This object is only present if the snippet.type is bulletin. */
  bulletin?: ActivityContentDetailsBulletin;
  /** The like object contains information about a resource that received a positive (like) rating. This property is only present if the snippet.type is like. */
  like?: ActivityContentDetailsLike;
  /** The promotedItem object contains details about a resource which is being promoted. This property is only present if the snippet.type is promotedItem. */
  promotedItem?: ActivityContentDetailsPromotedItem;
}

export const ActivityContentDetails: Schema.Schema<ActivityContentDetails> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      channelItem: Schema.optional(ActivityContentDetailsChannelItem),
      social: Schema.optional(ActivityContentDetailsSocial),
      comment: Schema.optional(ActivityContentDetailsComment),
      favorite: Schema.optional(ActivityContentDetailsFavorite),
      upload: Schema.optional(ActivityContentDetailsUpload),
      subscription: Schema.optional(ActivityContentDetailsSubscription),
      recommendation: Schema.optional(ActivityContentDetailsRecommendation),
      playlistItem: Schema.optional(ActivityContentDetailsPlaylistItem),
      bulletin: Schema.optional(ActivityContentDetailsBulletin),
      like: Schema.optional(ActivityContentDetailsLike),
      promotedItem: Schema.optional(ActivityContentDetailsPromotedItem),
    }),
  ).annotate({
    identifier: "ActivityContentDetails",
  }) as any as Schema.Schema<ActivityContentDetails>;

export interface CommentListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of comments that match the request criteria. */
  items?: Array<Comment>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentListResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** Etag of this resource. */
  etag?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
}

export const CommentListResponse: Schema.Schema<CommentListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Comment)),
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      etag: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CommentListResponse",
  }) as any as Schema.Schema<CommentListResponse>;

export interface ThumbnailSetResponse {
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#thumbnailSetResponse". */
  kind?: string;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** A list of thumbnails. */
  items?: Array<ThumbnailDetails>;
}

export const ThumbnailSetResponse: Schema.Schema<ThumbnailSetResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      visitorId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(ThumbnailDetails)),
    }),
  ).annotate({
    identifier: "ThumbnailSetResponse",
  }) as any as Schema.Schema<ThumbnailSetResponse>;

export interface Activity {
  /** The contentDetails object contains information about the content associated with the activity. For example, if the snippet.type value is videoRated, then the contentDetails object's content identifies the rated video. */
  contentDetails?: ActivityContentDetails;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#activity". */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the activity. */
  id?: string;
  /** The snippet object contains basic details about the activity, including the activity's type and group ID. */
  snippet?: ActivitySnippet;
  /** Etag of this resource */
  etag?: string;
}

export const Activity: Schema.Schema<Activity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      contentDetails: Schema.optional(ActivityContentDetails),
      kind: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      snippet: Schema.optional(ActivitySnippet),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Activity" }) as any as Schema.Schema<Activity>;

export interface ActivityListResponse {
  tokenPagination?: TokenPagination;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** Etag of this resource. */
  etag?: string;
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#activityListResponse". */
  kind?: string;
  items?: Array<Activity>;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
}

export const ActivityListResponse: Schema.Schema<ActivityListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tokenPagination: Schema.optional(TokenPagination),
      visitorId: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      etag: Schema.optional(Schema.String),
      eventId: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Activity)),
      prevPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivityListResponse",
  }) as any as Schema.Schema<ActivityListResponse>;

export interface VideoListResponse {
  /** Serialized EventId of the request which produced this response. */
  eventId?: string;
  /** Etag of this resource. */
  etag?: string;
  /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
  nextPageToken?: string;
  /** General pagination information. */
  pageInfo?: PageInfo;
  /** The visitorId identifies the visitor. */
  visitorId?: string;
  tokenPagination?: TokenPagination;
  /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
  prevPageToken?: string;
  items?: Array<Video>;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoListResponse". */
  kind?: string;
}

export const VideoListResponse: Schema.Schema<VideoListResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventId: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
      nextPageToken: Schema.optional(Schema.String),
      pageInfo: Schema.optional(PageInfo),
      visitorId: Schema.optional(Schema.String),
      tokenPagination: Schema.optional(TokenPagination),
      prevPageToken: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(Video)),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoListResponse",
  }) as any as Schema.Schema<VideoListResponse>;

export interface TestItemTestItemSnippet {}

export const TestItemTestItemSnippet: Schema.Schema<TestItemTestItemSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "TestItemTestItemSnippet",
  }) as any as Schema.Schema<TestItemTestItemSnippet>;

export interface VideoAbuseReport {
  /** Additional comments regarding the abuse report. */
  comments?: string;
  /** The language that the content was viewed in. */
  language?: string;
  /** The high-level, or primary, reason that the content is abusive. The value is an abuse report reason ID. */
  reasonId?: string;
  /** The ID that YouTube uses to uniquely identify the video. */
  videoId?: string;
  /** The specific, or secondary, reason that this content is abusive (if available). The value is an abuse report reason ID that is a valid secondary reason for the primary reason. */
  secondaryReasonId?: string;
}

export const VideoAbuseReport: Schema.Schema<VideoAbuseReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      comments: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
      reasonId: Schema.optional(Schema.String),
      videoId: Schema.optional(Schema.String),
      secondaryReasonId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VideoAbuseReport",
  }) as any as Schema.Schema<VideoAbuseReport>;

export interface AbuseReport {
  subject?: Entity;
  abuseTypes?: Array<AbuseType>;
  relatedEntities?: Array<RelatedEntity>;
  description?: string;
}

export const AbuseReport: Schema.Schema<AbuseReport> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subject: Schema.optional(Entity),
      abuseTypes: Schema.optional(Schema.Array(AbuseType)),
      relatedEntities: Schema.optional(Schema.Array(RelatedEntity)),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AbuseReport",
  }) as any as Schema.Schema<AbuseReport>;

export interface Cuepoint {
  /** The duration of this cuepoint. */
  durationSecs?: number;
  cueType?: "cueTypeUnspecified" | "cueTypeAd" | (string & {});
  /** The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time. */
  walltimeMs?: string;
  /** The identifier for cuepoint resource. */
  id?: string;
  /** The time when the cuepoint should be inserted by offset to the broadcast actual start time. */
  insertionOffsetTimeMs?: string;
  etag?: string;
}

export const Cuepoint: Schema.Schema<Cuepoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      durationSecs: Schema.optional(Schema.Number),
      cueType: Schema.optional(Schema.String),
      walltimeMs: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      insertionOffsetTimeMs: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Cuepoint" }) as any as Schema.Schema<Cuepoint>;

export interface TestItem {
  id?: string;
  featuredPart?: boolean;
  snippet?: TestItemTestItemSnippet;
  /** Etag for the resource. See https://en.wikipedia.org/wiki/HTTP_ETag. */
  etag?: string;
  gaia?: string;
}

export const TestItem: Schema.Schema<TestItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      featuredPart: Schema.optional(Schema.Boolean),
      snippet: Schema.optional(TestItemTestItemSnippet),
      etag: Schema.optional(Schema.String),
      gaia: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TestItem" }) as any as Schema.Schema<TestItem>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListI18nLanguagesRequest {
  hl?: string;
  /** The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet. */
  part: string[];
}

export const ListI18nLanguagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/i18nLanguages" }),
    svc,
  ) as unknown as Schema.Schema<ListI18nLanguagesRequest>;

export type ListI18nLanguagesResponse = I18nLanguageListResponse;
export const ListI18nLanguagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ I18nLanguageListResponse;

export type ListI18nLanguagesError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listI18nLanguages: API.OperationMethod<
  ListI18nLanguagesRequest,
  ListI18nLanguagesResponse,
  ListI18nLanguagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListI18nLanguagesRequest,
  output: ListI18nLanguagesResponse,
  errors: [],
}));

export interface UnsetWatermarksRequest {
  channelId: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const UnsetWatermarksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    channelId: Schema.String.pipe(T.HttpQuery("channelId")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "youtube/v3/watermarks/unset",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UnsetWatermarksRequest>;

export interface UnsetWatermarksResponse {}
export const UnsetWatermarksResponse: Schema.Schema<UnsetWatermarksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<UnsetWatermarksResponse>;

export type UnsetWatermarksError = DefaultErrors;

/** Allows removal of channel watermark. */
export const unsetWatermarks: API.OperationMethod<
  UnsetWatermarksRequest,
  UnsetWatermarksResponse,
  UnsetWatermarksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnsetWatermarksRequest,
  output: UnsetWatermarksResponse,
  errors: [],
}));

export interface SetWatermarksRequest {
  channelId: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: InvideoBranding;
}

export const SetWatermarksRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  channelId: Schema.String.pipe(T.HttpQuery("channelId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  body: Schema.optional(InvideoBranding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/watermarks/set", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetWatermarksRequest>;

export interface SetWatermarksResponse {}
export const SetWatermarksResponse: Schema.Schema<SetWatermarksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<SetWatermarksResponse>;

export type SetWatermarksError = DefaultErrors;

/** Allows upload of watermark image and setting it for a channel. */
export const setWatermarks: API.OperationMethod<
  SetWatermarksRequest,
  SetWatermarksResponse,
  SetWatermarksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetWatermarksRequest,
  output: SetWatermarksResponse,
  errors: [],
}));

export interface ListLiveChatMessagesRequest {
  /** The id of the live chat for which comments should be returned. */
  liveChatId: string;
  /** Specifies the localization language in which the system messages should be returned. */
  hl?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. Not used in the streaming RPC. */
  maxResults?: number;
  /** The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id, snippet, and authorDetails. */
  part: string[];
  /** Specifies the size of the profile image that should be returned for each user. */
  profileImageSize?: number;
}

export const ListLiveChatMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    liveChatId: Schema.String.pipe(T.HttpQuery("liveChatId")),
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    profileImageSize: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("profileImageSize"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/liveChat/messages" }),
    svc,
  ) as unknown as Schema.Schema<ListLiveChatMessagesRequest>;

export type ListLiveChatMessagesResponse = LiveChatMessageListResponse;
export const ListLiveChatMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatMessageListResponse;

export type ListLiveChatMessagesError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listLiveChatMessages: API.PaginatedOperationMethod<
  ListLiveChatMessagesRequest,
  ListLiveChatMessagesResponse,
  ListLiveChatMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLiveChatMessagesRequest,
  output: ListLiveChatMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface TransitionLiveChatMessagesRequest {
  /** The ID that uniquely identify the chat message event to transition. */
  id?: string;
  /** The status to which the chat event is going to transition. */
  status?: "statusUnspecified" | "closed" | (string & {});
}

export const TransitionLiveChatMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    status: Schema.optional(Schema.String).pipe(T.HttpQuery("status")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveChat/messages/transition",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TransitionLiveChatMessagesRequest>;

export type TransitionLiveChatMessagesResponse = LiveChatMessage;
export const TransitionLiveChatMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatMessage;

export type TransitionLiveChatMessagesError = DefaultErrors;

/** Transition a durable chat event. */
export const transitionLiveChatMessages: API.OperationMethod<
  TransitionLiveChatMessagesRequest,
  TransitionLiveChatMessagesResponse,
  TransitionLiveChatMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TransitionLiveChatMessagesRequest,
  output: TransitionLiveChatMessagesResponse,
  errors: [],
}));

export interface InsertLiveChatMessagesRequest {
  /** The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet. */
  part: string[];
  /** Request body */
  body?: LiveChatMessage;
}

export const InsertLiveChatMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(LiveChatMessage).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveChat/messages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertLiveChatMessagesRequest>;

export type InsertLiveChatMessagesResponse = LiveChatMessage;
export const InsertLiveChatMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatMessage;

export type InsertLiveChatMessagesError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertLiveChatMessages: API.OperationMethod<
  InsertLiveChatMessagesRequest,
  InsertLiveChatMessagesResponse,
  InsertLiveChatMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLiveChatMessagesRequest,
  output: InsertLiveChatMessagesResponse,
  errors: [],
}));

export interface DeleteLiveChatMessagesRequest {
  id: string;
}

export const DeleteLiveChatMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/liveChat/messages" }),
    svc,
  ) as unknown as Schema.Schema<DeleteLiveChatMessagesRequest>;

export interface DeleteLiveChatMessagesResponse {}
export const DeleteLiveChatMessagesResponse: Schema.Schema<DeleteLiveChatMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLiveChatMessagesResponse>;

export type DeleteLiveChatMessagesError = DefaultErrors;

/** Deletes a chat message. */
export const deleteLiveChatMessages: API.OperationMethod<
  DeleteLiveChatMessagesRequest,
  DeleteLiveChatMessagesResponse,
  DeleteLiveChatMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveChatMessagesRequest,
  output: DeleteLiveChatMessagesResponse,
  errors: [],
}));

export interface ListMembersRequest {
  /** Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response. */
  filterByMemberChannelId?: string;
  /** The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet. */
  part: string[];
  /** Filter members in the results set to the ones that have access to a level. */
  hasAccessToLevel?: string;
  /** Parameter that specifies which channel members to return. */
  mode?: "listMembersModeUnknown" | "updates" | "all_current" | (string & {});
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
}

export const ListMembersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  filterByMemberChannelId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("filterByMemberChannelId"),
  ),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  hasAccessToLevel: Schema.optional(Schema.String).pipe(
    T.HttpQuery("hasAccessToLevel"),
  ),
  mode: Schema.optional(Schema.String).pipe(T.HttpQuery("mode")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/members" }),
  svc,
) as unknown as Schema.Schema<ListMembersRequest>;

export type ListMembersResponse = MemberListResponse;
export const ListMembersResponse =
  /*@__PURE__*/ /*#__PURE__*/ MemberListResponse;

export type ListMembersError = DefaultErrors;

/** Retrieves a list of members that match the request criteria for a channel. */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListSuperChatEventsRequest {
  /** The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported. */
  part: string[];
  /** Return rendered funding amounts in specified language. */
  hl?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
}

export const ListSuperChatEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/superChatEvents" }),
    svc,
  ) as unknown as Schema.Schema<ListSuperChatEventsRequest>;

export type ListSuperChatEventsResponse = SuperChatEventListResponse;
export const ListSuperChatEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SuperChatEventListResponse;

export type ListSuperChatEventsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listSuperChatEvents: API.PaginatedOperationMethod<
  ListSuperChatEventsRequest,
  ListSuperChatEventsResponse,
  ListSuperChatEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSuperChatEventsRequest,
  output: ListSuperChatEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ReportAbuseVideosRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: VideoAbuseReport;
}

export const ReportAbuseVideosRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(VideoAbuseReport).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/videos/reportAbuse",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReportAbuseVideosRequest>;

export interface ReportAbuseVideosResponse {}
export const ReportAbuseVideosResponse: Schema.Schema<ReportAbuseVideosResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<ReportAbuseVideosResponse>;

export type ReportAbuseVideosError = DefaultErrors;

/** Report abuse for a video. */
export const reportAbuseVideos: API.OperationMethod<
  ReportAbuseVideosRequest,
  ReportAbuseVideosResponse,
  ReportAbuseVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReportAbuseVideosRequest,
  output: ReportAbuseVideosResponse,
  errors: [],
}));

export interface RateVideosRequest {
  rating: "none" | "like" | "dislike" | (string & {});
  id: string;
}

export const RateVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rating: Schema.String.pipe(T.HttpQuery("rating")),
  id: Schema.String.pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/videos/rate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RateVideosRequest>;

export interface RateVideosResponse {}
export const RateVideosResponse: Schema.Schema<RateVideosResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<RateVideosResponse>;

export type RateVideosError = DefaultErrors;

/** Adds a like or dislike rating to a video or removes a rating from a video. */
export const rateVideos: API.OperationMethod<
  RateVideosRequest,
  RateVideosResponse,
  RateVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RateVideosRequest,
  output: RateVideosResponse,
  errors: [],
}));

export interface DeleteVideosRequest {
  id: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeleteVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpQuery("id")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "youtube/v3/videos" }),
  svc,
) as unknown as Schema.Schema<DeleteVideosRequest>;

export interface DeleteVideosResponse {}
export const DeleteVideosResponse: Schema.Schema<DeleteVideosResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteVideosResponse>;

export type DeleteVideosError = DefaultErrors;

/** Deletes a resource. */
export const deleteVideos: API.OperationMethod<
  DeleteVideosRequest,
  DeleteVideosResponse,
  DeleteVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVideosRequest,
  output: DeleteVideosResponse,
  errors: [],
}));

export interface GetRatingVideosRequest {
  id: string[];
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const GetRatingVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.Array(Schema.String).pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "youtube/v3/videos/getRating" }),
  svc,
) as unknown as Schema.Schema<GetRatingVideosRequest>;

export type GetRatingVideosResponse = VideoGetRatingResponse;
export const GetRatingVideosResponse =
  /*@__PURE__*/ /*#__PURE__*/ VideoGetRatingResponse;

export type GetRatingVideosError = DefaultErrors;

/** Retrieves the ratings that the authorized user gave to a list of specified videos. */
export const getRatingVideos: API.OperationMethod<
  GetRatingVideosRequest,
  GetRatingVideosResponse,
  GetRatingVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRatingVideosRequest,
  output: GetRatingVideosResponse,
  errors: [],
}));

export interface InsertVideosRequest {
  /** Notify the channel subscribers about the new video. As default, the notification is enabled. */
  notifySubscribers?: boolean;
  /** Should auto-levels be applied to the upload. */
  autoLevels?: boolean;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Should stabilize be applied to the upload. */
  stabilize?: boolean;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Request body */
  body?: Video;
}

export const InsertVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  notifySubscribers: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("notifySubscribers"),
  ),
  autoLevels: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autoLevels")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  stabilize: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("stabilize")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwnerChannel"),
  ),
  body: Schema.optional(Video).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/videos", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertVideosRequest>;

export type InsertVideosResponse = Video;
export const InsertVideosResponse = /*@__PURE__*/ /*#__PURE__*/ Video;

export type InsertVideosError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertVideos: API.OperationMethod<
  InsertVideosRequest,
  InsertVideosResponse,
  InsertVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertVideosRequest,
  output: InsertVideosResponse,
  errors: [],
}));

export interface UpdateVideosRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still be included in the API response. */
  part: string[];
  /** Request body */
  body?: Video;
}

export const UpdateVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  body: Schema.optional(Video).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "youtube/v3/videos", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateVideosRequest>;

export type UpdateVideosResponse = Video;
export const UpdateVideosResponse = /*@__PURE__*/ /*#__PURE__*/ Video;

export type UpdateVideosError = DefaultErrors;

/** Updates an existing resource. */
export const updateVideos: API.OperationMethod<
  UpdateVideosRequest,
  UpdateVideosResponse,
  UpdateVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVideosRequest,
  output: UpdateVideosResponse,
  errors: [],
}));

export interface ListVideosRequest {
  /** Return the player with maximum height specified in */
  maxWidth?: number;
  locale?: string;
  /** Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE. */
  myRating?: "none" | "like" | "dislike" | (string & {});
  /** Return the videos that are in the specified chart. */
  chart?: "chartUnspecified" | "mostPopular" | (string & {});
  maxHeight?: number;
  /** Return videos with the given ids. */
  id?: string[];
  /** Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
  hl?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
  pageToken?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction with the id parameter. */
  maxResults?: number;
  /** The *part* parameter specifies a comma-separated list of one or more video resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
  part: string[];
  /** Use a chart that is specific to the specified region */
  regionCode?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Use chart that is specific to the specified video category */
  videoCategoryId?: string;
}

export const ListVideosRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  maxWidth: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxWidth")),
  locale: Schema.optional(Schema.String).pipe(T.HttpQuery("locale")),
  myRating: Schema.optional(Schema.String).pipe(T.HttpQuery("myRating")),
  chart: Schema.optional(Schema.String).pipe(T.HttpQuery("chart")),
  maxHeight: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxHeight")),
  id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
  hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  videoCategoryId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoCategoryId"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/videos" }),
  svc,
) as unknown as Schema.Schema<ListVideosRequest>;

export type ListVideosResponse = VideoListResponse;
export const ListVideosResponse = /*@__PURE__*/ /*#__PURE__*/ VideoListResponse;

export type ListVideosError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listVideos: API.PaginatedOperationMethod<
  ListVideosRequest,
  ListVideosResponse,
  ListVideosError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVideosRequest,
  output: ListVideosResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateCommentThreadsYoutubeV3Request {
  /** The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
  part?: string[];
  /** Request body */
  body?: CommentThread;
}

export const UpdateCommentThreadsYoutubeV3Request =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    body: Schema.optional(CommentThread).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "youtube/v3/commentThreads", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<UpdateCommentThreadsYoutubeV3Request>;

export type UpdateCommentThreadsYoutubeV3Response = CommentThread;
export const UpdateCommentThreadsYoutubeV3Response =
  /*@__PURE__*/ /*#__PURE__*/ CommentThread;

export type UpdateCommentThreadsYoutubeV3Error = DefaultErrors;

/** Updates an existing resource. */
export const updateCommentThreadsYoutubeV3: API.OperationMethod<
  UpdateCommentThreadsYoutubeV3Request,
  UpdateCommentThreadsYoutubeV3Response,
  UpdateCommentThreadsYoutubeV3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCommentThreadsYoutubeV3Request,
  output: UpdateCommentThreadsYoutubeV3Response,
  errors: [],
}));

export interface StreamYoutubeV3LiveChatMessagesRequest {
  /** Specifies the size of the profile image that should be returned for each user. */
  profileImageSize?: number;
  /** The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id, snippet, and authorDetails. */
  part?: string[];
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. Not used in the streaming RPC. */
  maxResults?: number;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be retrieved. */
  pageToken?: string;
  /** Specifies the localization language in which the system messages should be returned. */
  hl?: string;
  /** The id of the live chat for which comments should be returned. */
  liveChatId?: string;
}

export const StreamYoutubeV3LiveChatMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    profileImageSize: Schema.optional(Schema.Number).pipe(
      T.HttpQuery("profileImageSize"),
    ),
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    liveChatId: Schema.optional(Schema.String).pipe(T.HttpQuery("liveChatId")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/liveChat/messages/stream" }),
    svc,
  ) as unknown as Schema.Schema<StreamYoutubeV3LiveChatMessagesRequest>;

export type StreamYoutubeV3LiveChatMessagesResponse =
  LiveChatMessageListResponse;
export const StreamYoutubeV3LiveChatMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatMessageListResponse;

export type StreamYoutubeV3LiveChatMessagesError = DefaultErrors;

/** Allows a user to load live chat through a server-streamed RPC. */
export const streamYoutubeV3LiveChatMessages: API.PaginatedOperationMethod<
  StreamYoutubeV3LiveChatMessagesRequest,
  StreamYoutubeV3LiveChatMessagesResponse,
  StreamYoutubeV3LiveChatMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: StreamYoutubeV3LiveChatMessagesRequest,
  output: StreamYoutubeV3LiveChatMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface DeleteCaptionsRequest {
  id: string;
  /** ID of the Google+ Page for the channel that the request is be on behalf of */
  onBehalfOf?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeleteCaptionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpQuery("id")),
  onBehalfOf: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOf")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "DELETE", path: "youtube/v3/captions" }),
  svc,
) as unknown as Schema.Schema<DeleteCaptionsRequest>;

export interface DeleteCaptionsResponse {}
export const DeleteCaptionsResponse: Schema.Schema<DeleteCaptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteCaptionsResponse>;

export type DeleteCaptionsError = DefaultErrors;

/** Deletes a resource. */
export const deleteCaptions: API.OperationMethod<
  DeleteCaptionsRequest,
  DeleteCaptionsResponse,
  DeleteCaptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCaptionsRequest,
  output: DeleteCaptionsResponse,
  errors: [],
}));

export interface DownloadCaptionsRequest {
  /** The ID of the caption track to download, required for One Platform. */
  id: string;
  /** tlang is the language code; machine translate the captions into this language. */
  tlang?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Convert the captions into this format. Supported options are sbv, srt, and vtt. */
  tfmt?: string;
  /** ID of the Google+ Page for the channel that the request is be on behalf of */
  onBehalfOf?: string;
}

export const DownloadCaptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    tlang: Schema.optional(Schema.String).pipe(T.HttpQuery("tlang")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    tfmt: Schema.optional(Schema.String).pipe(T.HttpQuery("tfmt")),
    onBehalfOf: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOf")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/captions/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DownloadCaptionsRequest>;

export interface DownloadCaptionsResponse {}
export const DownloadCaptionsResponse: Schema.Schema<DownloadCaptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DownloadCaptionsResponse>;

export type DownloadCaptionsError = DefaultErrors;

/** Downloads a caption track. */
export const downloadCaptions: API.OperationMethod<
  DownloadCaptionsRequest,
  DownloadCaptionsResponse,
  DownloadCaptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DownloadCaptionsRequest,
  output: DownloadCaptionsResponse,
  errors: [],
}));

export interface InsertCaptionsRequest {
  /** ID of the Google+ Page for the channel that the request is be on behalf of */
  onBehalfOf?: string;
  /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
  sync?: boolean;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet. */
  part: string[];
  /** Request body */
  body?: Caption;
}

export const InsertCaptionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOf: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOf")),
  sync: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sync")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  body: Schema.optional(Caption).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/captions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCaptionsRequest>;

export type InsertCaptionsResponse = Caption;
export const InsertCaptionsResponse = /*@__PURE__*/ /*#__PURE__*/ Caption;

export type InsertCaptionsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertCaptions: API.OperationMethod<
  InsertCaptionsRequest,
  InsertCaptionsResponse,
  InsertCaptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertCaptionsRequest,
  output: InsertCaptionsResponse,
  errors: [],
}));

export interface UpdateCaptionsRequest {
  /** ID of the Google+ Page for the channel that the request is on behalf of. */
  onBehalfOf?: string;
  /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
  sync?: boolean;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
  part: string[];
  /** Request body */
  body?: Caption;
}

export const UpdateCaptionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOf: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOf")),
  sync: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("sync")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  body: Schema.optional(Caption).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "youtube/v3/captions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCaptionsRequest>;

export type UpdateCaptionsResponse = Caption;
export const UpdateCaptionsResponse = /*@__PURE__*/ /*#__PURE__*/ Caption;

export type UpdateCaptionsError = DefaultErrors;

/** Updates an existing resource. */
export const updateCaptions: API.OperationMethod<
  UpdateCaptionsRequest,
  UpdateCaptionsResponse,
  UpdateCaptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCaptionsRequest,
  output: UpdateCaptionsResponse,
  errors: [],
}));

export interface ListCaptionsRequest {
  /** Returns the captions for the specified video. */
  videoId: string;
  /** ID of the Google+ Page for the channel that the request is on behalf of. */
  onBehalfOf?: string;
  /** Returns the captions with the given IDs for Stubby or Apiary. */
  id?: string[];
  /** The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the parameter value are id and snippet. */
  part: string[];
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const ListCaptionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  videoId: Schema.String.pipe(T.HttpQuery("videoId")),
  onBehalfOf: Schema.optional(Schema.String).pipe(T.HttpQuery("onBehalfOf")),
  id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/captions" }),
  svc,
) as unknown as Schema.Schema<ListCaptionsRequest>;

export type ListCaptionsResponse = CaptionListResponse;
export const ListCaptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CaptionListResponse;

export type ListCaptionsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listCaptions: API.OperationMethod<
  ListCaptionsRequest,
  ListCaptionsResponse,
  ListCaptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListCaptionsRequest,
  output: ListCaptionsResponse,
  errors: [],
}));

export interface DeleteLiveStreamsRequest {
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  id: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeleteLiveStreamsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    id: Schema.String.pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/liveStreams" }),
    svc,
  ) as unknown as Schema.Schema<DeleteLiveStreamsRequest>;

export interface DeleteLiveStreamsResponse {}
export const DeleteLiveStreamsResponse: Schema.Schema<DeleteLiveStreamsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLiveStreamsResponse>;

export type DeleteLiveStreamsError = DefaultErrors;

/** Deletes an existing stream for the authenticated user. */
export const deleteLiveStreams: API.OperationMethod<
  DeleteLiveStreamsRequest,
  DeleteLiveStreamsResponse,
  DeleteLiveStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveStreamsRequest,
  output: DeleteLiveStreamsResponse,
  errors: [],
}));

export interface InsertLiveStreamsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Request body */
  body?: LiveStream;
}

export const InsertLiveStreamsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    body: Schema.optional(LiveStream).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "youtube/v3/liveStreams", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<InsertLiveStreamsRequest>;

export type InsertLiveStreamsResponse = LiveStream;
export const InsertLiveStreamsResponse = /*@__PURE__*/ /*#__PURE__*/ LiveStream;

export type InsertLiveStreamsError = DefaultErrors;

/** Inserts a new stream for the authenticated user. */
export const insertLiveStreams: API.OperationMethod<
  InsertLiveStreamsRequest,
  InsertLiveStreamsResponse,
  InsertLiveStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLiveStreamsRequest,
  output: InsertLiveStreamsResponse,
  errors: [],
}));

export interface UpdateLiveStreamsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value for that property will be removed. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Request body */
  body?: LiveStream;
}

export const UpdateLiveStreamsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    body: Schema.optional(LiveStream).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "youtube/v3/liveStreams", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<UpdateLiveStreamsRequest>;

export type UpdateLiveStreamsResponse = LiveStream;
export const UpdateLiveStreamsResponse = /*@__PURE__*/ /*#__PURE__*/ LiveStream;

export type UpdateLiveStreamsError = DefaultErrors;

/** Updates an existing stream for the authenticated user. */
export const updateLiveStreams: API.OperationMethod<
  UpdateLiveStreamsRequest,
  UpdateLiveStreamsResponse,
  UpdateLiveStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLiveStreamsRequest,
  output: UpdateLiveStreamsResponse,
  errors: [],
}));

export interface ListLiveStreamsRequest {
  mine?: boolean;
  /** Return LiveStreams with the given ids from Stubby or Apiary. */
  id?: string[];
  /** The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, cdn, and status. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
}

export const ListLiveStreamsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "youtube/v3/liveStreams" }),
  svc,
) as unknown as Schema.Schema<ListLiveStreamsRequest>;

export type ListLiveStreamsResponse = LiveStreamListResponse;
export const ListLiveStreamsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveStreamListResponse;

export type ListLiveStreamsError = DefaultErrors;

/** Retrieve the list of streams associated with the given channel. -- */
export const listLiveStreams: API.PaginatedOperationMethod<
  ListLiveStreamsRequest,
  ListLiveStreamsResponse,
  ListLiveStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLiveStreamsRequest,
  output: ListLiveStreamsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface DeleteLiveChatBansRequest {
  id: string;
}

export const DeleteLiveChatBansRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/liveChat/bans" }),
    svc,
  ) as unknown as Schema.Schema<DeleteLiveChatBansRequest>;

export interface DeleteLiveChatBansResponse {}
export const DeleteLiveChatBansResponse: Schema.Schema<DeleteLiveChatBansResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLiveChatBansResponse>;

export type DeleteLiveChatBansError = DefaultErrors;

/** Deletes a chat ban. */
export const deleteLiveChatBans: API.OperationMethod<
  DeleteLiveChatBansRequest,
  DeleteLiveChatBansResponse,
  DeleteLiveChatBansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveChatBansRequest,
  output: DeleteLiveChatBansResponse,
  errors: [],
}));

export interface InsertLiveChatBansRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet. */
  part: string[];
  /** Request body */
  body?: LiveChatBan;
}

export const InsertLiveChatBansRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(LiveChatBan).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "youtube/v3/liveChat/bans", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<InsertLiveChatBansRequest>;

export type InsertLiveChatBansResponse = LiveChatBan;
export const InsertLiveChatBansResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatBan;

export type InsertLiveChatBansError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertLiveChatBans: API.OperationMethod<
  InsertLiveChatBansRequest,
  InsertLiveChatBansResponse,
  InsertLiveChatBansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLiveChatBansRequest,
  output: InsertLiveChatBansResponse,
  errors: [],
}));

export interface InsertPlaylistsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Request body */
  body?: Playlist;
}

export const InsertPlaylistsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    body: Schema.optional(Playlist).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "POST", path: "youtube/v3/playlists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertPlaylistsRequest>;

export type InsertPlaylistsResponse = Playlist;
export const InsertPlaylistsResponse = /*@__PURE__*/ /*#__PURE__*/ Playlist;

export type InsertPlaylistsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertPlaylists: API.OperationMethod<
  InsertPlaylistsRequest,
  InsertPlaylistsResponse,
  InsertPlaylistsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPlaylistsRequest,
  output: InsertPlaylistsResponse,
  errors: [],
}));

export interface UpdatePlaylistsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description property, the playlist's existing description will be deleted. */
  part: string[];
  /** Request body */
  body?: Playlist;
}

export const UpdatePlaylistsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(Playlist).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "PUT", path: "youtube/v3/playlists", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdatePlaylistsRequest>;

export type UpdatePlaylistsResponse = Playlist;
export const UpdatePlaylistsResponse = /*@__PURE__*/ /*#__PURE__*/ Playlist;

export type UpdatePlaylistsError = DefaultErrors;

/** Updates an existing resource. */
export const updatePlaylists: API.OperationMethod<
  UpdatePlaylistsRequest,
  UpdatePlaylistsResponse,
  UpdatePlaylistsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePlaylistsRequest,
  output: UpdatePlaylistsResponse,
  errors: [],
}));

export interface DeletePlaylistsRequest {
  id: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeletePlaylistsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  },
).pipe(
  T.Http({ method: "DELETE", path: "youtube/v3/playlists" }),
  svc,
) as unknown as Schema.Schema<DeletePlaylistsRequest>;

export interface DeletePlaylistsResponse {}
export const DeletePlaylistsResponse: Schema.Schema<DeletePlaylistsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePlaylistsResponse>;

export type DeletePlaylistsError = DefaultErrors;

/** Deletes a resource. */
export const deletePlaylists: API.OperationMethod<
  DeletePlaylistsRequest,
  DeletePlaylistsResponse,
  DeletePlaylistsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlaylistsRequest,
  output: DeletePlaylistsResponse,
  errors: [],
}));

export interface ListPlaylistsRequest {
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Return the playlists owned by the specified channel ID. */
  channelId?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author, title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Return content in specified language */
  hl?: string;
  /** Return the playlists owned by the authenticated user. */
  mine?: boolean;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Return the playlists with the given IDs for Stubby or Apiary. */
  id?: string[];
}

export const ListPlaylistsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwnerChannel"),
  ),
  hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/playlists" }),
  svc,
) as unknown as Schema.Schema<ListPlaylistsRequest>;

export type ListPlaylistsResponse = PlaylistListResponse;
export const ListPlaylistsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistListResponse;

export type ListPlaylistsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listPlaylists: API.PaginatedOperationMethod<
  ListPlaylistsRequest,
  ListPlaylistsResponse,
  ListPlaylistsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlaylistsRequest,
  output: ListPlaylistsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListI18nRegionsRequest {
  /** The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet. */
  part: string[];
  hl?: string;
}

export const ListI18nRegionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  },
).pipe(
  T.Http({ method: "GET", path: "youtube/v3/i18nRegions" }),
  svc,
) as unknown as Schema.Schema<ListI18nRegionsRequest>;

export type ListI18nRegionsResponse = I18nRegionListResponse;
export const ListI18nRegionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ I18nRegionListResponse;

export type ListI18nRegionsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listI18nRegions: API.OperationMethod<
  ListI18nRegionsRequest,
  ListI18nRegionsResponse,
  ListI18nRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListI18nRegionsRequest,
  output: ListI18nRegionsResponse,
  errors: [],
}));

export interface InsertThirdPartyLinksRequest {
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
  part: string[];
  /** Request body */
  body?: ThirdPartyLink;
}

export const InsertThirdPartyLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    externalChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("externalChannelId"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(ThirdPartyLink).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/thirdPartyLinks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertThirdPartyLinksRequest>;

export type InsertThirdPartyLinksResponse = ThirdPartyLink;
export const InsertThirdPartyLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ ThirdPartyLink;

export type InsertThirdPartyLinksError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertThirdPartyLinks: API.OperationMethod<
  InsertThirdPartyLinksRequest,
  InsertThirdPartyLinksResponse,
  InsertThirdPartyLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertThirdPartyLinksRequest,
  output: InsertThirdPartyLinksResponse,
  errors: [],
}));

export interface UpdateThirdPartyLinksRequest {
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
  part: string[];
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
  /** Request body */
  body?: ThirdPartyLink;
}

export const UpdateThirdPartyLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    externalChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("externalChannelId"),
    ),
    body: Schema.optional(ThirdPartyLink).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "youtube/v3/thirdPartyLinks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateThirdPartyLinksRequest>;

export type UpdateThirdPartyLinksResponse = ThirdPartyLink;
export const UpdateThirdPartyLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ ThirdPartyLink;

export type UpdateThirdPartyLinksError = DefaultErrors;

/** Updates an existing resource. */
export const updateThirdPartyLinks: API.OperationMethod<
  UpdateThirdPartyLinksRequest,
  UpdateThirdPartyLinksResponse,
  UpdateThirdPartyLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateThirdPartyLinksRequest,
  output: UpdateThirdPartyLinksResponse,
  errors: [],
}));

export interface DeleteThirdPartyLinksRequest {
  /** Delete the partner links with the given linking token. */
  linkingToken: string;
  /** Do not use. Required for compatibility. */
  part?: string[];
  /** Type of the link to be deleted. */
  type: "linkUnspecified" | "channelToStoreLink" | (string & {});
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
}

export const DeleteThirdPartyLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    linkingToken: Schema.String.pipe(T.HttpQuery("linkingToken")),
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    type: Schema.String.pipe(T.HttpQuery("type")),
    externalChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("externalChannelId"),
    ),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/thirdPartyLinks" }),
    svc,
  ) as unknown as Schema.Schema<DeleteThirdPartyLinksRequest>;

export interface DeleteThirdPartyLinksResponse {}
export const DeleteThirdPartyLinksResponse: Schema.Schema<DeleteThirdPartyLinksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteThirdPartyLinksResponse>;

export type DeleteThirdPartyLinksError = DefaultErrors;

/** Deletes a resource. */
export const deleteThirdPartyLinks: API.OperationMethod<
  DeleteThirdPartyLinksRequest,
  DeleteThirdPartyLinksResponse,
  DeleteThirdPartyLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteThirdPartyLinksRequest,
  output: DeleteThirdPartyLinksResponse,
  errors: [],
}));

export interface ListThirdPartyLinksRequest {
  /** Get a third party link with the given linking token. */
  linkingToken?: string;
  /** The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet. */
  part: string[];
  /** Get a third party link of the given type. */
  type?: "linkUnspecified" | "channelToStoreLink" | (string & {});
  /** Channel ID to which changes should be applied, for delegation. */
  externalChannelId?: string;
}

export const ListThirdPartyLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    linkingToken: Schema.optional(Schema.String).pipe(
      T.HttpQuery("linkingToken"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
    externalChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("externalChannelId"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/thirdPartyLinks" }),
    svc,
  ) as unknown as Schema.Schema<ListThirdPartyLinksRequest>;

export type ListThirdPartyLinksResponse = ThirdPartyLinkListResponse;
export const ListThirdPartyLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ ThirdPartyLinkListResponse;

export type ListThirdPartyLinksError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listThirdPartyLinks: API.OperationMethod<
  ListThirdPartyLinksRequest,
  ListThirdPartyLinksResponse,
  ListThirdPartyLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListThirdPartyLinksRequest,
  output: ListThirdPartyLinksResponse,
  errors: [],
}));

export interface GetVideoTrainabilityRequest {
  /** The ID of the video to retrieve. */
  id?: string;
}

export const GetVideoTrainabilityRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/videoTrainability" }),
    svc,
  ) as unknown as Schema.Schema<GetVideoTrainabilityRequest>;

export type GetVideoTrainabilityResponse = VideoTrainability;
export const GetVideoTrainabilityResponse =
  /*@__PURE__*/ /*#__PURE__*/ VideoTrainability;

export type GetVideoTrainabilityError = DefaultErrors;

/** Returns the trainability status of a video. */
export const getVideoTrainability: API.OperationMethod<
  GetVideoTrainabilityRequest,
  GetVideoTrainabilityResponse,
  GetVideoTrainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVideoTrainabilityRequest,
  output: GetVideoTrainabilityResponse,
  errors: [],
}));

export interface InsertSubscriptionsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
  part: string[];
  /** Request body */
  body?: Subscription;
}

export const InsertSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(Subscription).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "youtube/v3/subscriptions", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<InsertSubscriptionsRequest>;

export type InsertSubscriptionsResponse = Subscription;
export const InsertSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Subscription;

export type InsertSubscriptionsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertSubscriptions: API.OperationMethod<
  InsertSubscriptionsRequest,
  InsertSubscriptionsResponse,
  InsertSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertSubscriptionsRequest,
  output: InsertSubscriptionsResponse,
  errors: [],
}));

export interface DeleteSubscriptionsRequest {
  id: string;
}

export const DeleteSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/subscriptions" }),
    svc,
  ) as unknown as Schema.Schema<DeleteSubscriptionsRequest>;

export interface DeleteSubscriptionsResponse {}
export const DeleteSubscriptionsResponse: Schema.Schema<DeleteSubscriptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteSubscriptionsResponse>;

export type DeleteSubscriptionsError = DefaultErrors;

/** Deletes a resource. */
export const deleteSubscriptions: API.OperationMethod<
  DeleteSubscriptionsRequest,
  DeleteSubscriptionsResponse,
  DeleteSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionsRequest,
  output: DeleteSubscriptionsResponse,
  errors: [],
}));

export interface ListSubscriptionsRequest {
  /** The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties, such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** The order of the returned subscriptions */
  order?:
    | "subscriptionOrderUnspecified"
    | "relevance"
    | "unread"
    | "alphabetical"
    | (string & {});
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Return the subscriptions of the given channel owner. */
  channelId?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Return the subscriptions with the given IDs for Stubby or Apiary. */
  id?: string[];
  /** Return the subscriptions to the subset of these channels that the authenticated user is subscribed to. */
  forChannelId?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Return the subscribers of the given channel owner. */
  mySubscribers?: boolean;
  /** Flag for returning the subscriptions of the authenticated user. */
  mine?: boolean;
  myRecentSubscribers?: boolean;
}

export const ListSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    order: Schema.optional(Schema.String).pipe(T.HttpQuery("order")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    forChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("forChannelId"),
    ),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    mySubscribers: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("mySubscribers"),
    ),
    mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
    myRecentSubscribers: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("myRecentSubscribers"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/subscriptions" }),
    svc,
  ) as unknown as Schema.Schema<ListSubscriptionsRequest>;

export type ListSubscriptionsResponse = SubscriptionListResponse;
export const ListSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SubscriptionListResponse;

export type ListSubscriptionsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface ListLiveChatModeratorsRequest {
  /** The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet. */
  part: string[];
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The id of the live chat for which moderators should be returned. */
  liveChatId: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
}

export const ListLiveChatModeratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    liveChatId: Schema.String.pipe(T.HttpQuery("liveChatId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/liveChat/moderators" }),
    svc,
  ) as unknown as Schema.Schema<ListLiveChatModeratorsRequest>;

export type ListLiveChatModeratorsResponse = LiveChatModeratorListResponse;
export const ListLiveChatModeratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatModeratorListResponse;

export type ListLiveChatModeratorsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listLiveChatModerators: API.PaginatedOperationMethod<
  ListLiveChatModeratorsRequest,
  ListLiveChatModeratorsResponse,
  ListLiveChatModeratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLiveChatModeratorsRequest,
  output: ListLiveChatModeratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface DeleteLiveChatModeratorsRequest {
  id: string;
}

export const DeleteLiveChatModeratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/liveChat/moderators" }),
    svc,
  ) as unknown as Schema.Schema<DeleteLiveChatModeratorsRequest>;

export interface DeleteLiveChatModeratorsResponse {}
export const DeleteLiveChatModeratorsResponse: Schema.Schema<DeleteLiveChatModeratorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLiveChatModeratorsResponse>;

export type DeleteLiveChatModeratorsError = DefaultErrors;

/** Deletes a chat moderator. */
export const deleteLiveChatModerators: API.OperationMethod<
  DeleteLiveChatModeratorsRequest,
  DeleteLiveChatModeratorsResponse,
  DeleteLiveChatModeratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveChatModeratorsRequest,
  output: DeleteLiveChatModeratorsResponse,
  errors: [],
}));

export interface InsertLiveChatModeratorsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet. */
  part: string[];
  /** Request body */
  body?: LiveChatModerator;
}

export const InsertLiveChatModeratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(LiveChatModerator).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveChat/moderators",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertLiveChatModeratorsRequest>;

export type InsertLiveChatModeratorsResponse = LiveChatModerator;
export const InsertLiveChatModeratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveChatModerator;

export type InsertLiveChatModeratorsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertLiveChatModerators: API.OperationMethod<
  InsertLiveChatModeratorsRequest,
  InsertLiveChatModeratorsResponse,
  InsertLiveChatModeratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLiveChatModeratorsRequest,
  output: InsertLiveChatModeratorsResponse,
  errors: [],
}));

export interface ListMembershipsLevelsRequest {
  /** The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet. */
  part: string[];
}

export const ListMembershipsLevelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/membershipsLevels" }),
    svc,
  ) as unknown as Schema.Schema<ListMembershipsLevelsRequest>;

export type ListMembershipsLevelsResponse = MembershipsLevelListResponse;
export const ListMembershipsLevelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ MembershipsLevelListResponse;

export type ListMembershipsLevelsError = DefaultErrors;

/** Retrieves a list of all pricing levels offered by a creator to the fans. */
export const listMembershipsLevels: API.OperationMethod<
  ListMembershipsLevelsRequest,
  ListMembershipsLevelsResponse,
  ListMembershipsLevelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListMembershipsLevelsRequest,
  output: ListMembershipsLevelsResponse,
  errors: [],
}));

export interface InsertAbuseReportsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
  part: string[];
  /** Request body */
  body?: AbuseReport;
}

export const InsertAbuseReportsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(AbuseReport).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "youtube/v3/abuseReports", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<InsertAbuseReportsRequest>;

export type InsertAbuseReportsResponse = AbuseReport;
export const InsertAbuseReportsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AbuseReport;

export type InsertAbuseReportsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertAbuseReports: API.OperationMethod<
  InsertAbuseReportsRequest,
  InsertAbuseReportsResponse,
  InsertAbuseReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertAbuseReportsRequest,
  output: InsertAbuseReportsResponse,
  errors: [],
}));

export interface ListVideoCategoriesRequest {
  hl?: string;
  /** The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet. */
  part: string[];
  /** Returns the video categories with the given IDs for Stubby or Apiary. */
  id?: string[];
  regionCode?: string;
}

export const ListVideoCategoriesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/videoCategories" }),
    svc,
  ) as unknown as Schema.Schema<ListVideoCategoriesRequest>;

export type ListVideoCategoriesResponse = VideoCategoryListResponse;
export const ListVideoCategoriesResponse =
  /*@__PURE__*/ /*#__PURE__*/ VideoCategoryListResponse;

export type ListVideoCategoriesError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listVideoCategories: API.OperationMethod<
  ListVideoCategoriesRequest,
  ListVideoCategoriesResponse,
  ListVideoCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVideoCategoriesRequest,
  output: ListVideoCategoriesResponse,
  errors: [],
}));

export interface ListPlaylistImagesRequest {
  /** Return PlaylistImages for this playlist id. */
  parent?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter specifies a comma-separated list of one or more playlistImage resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. */
  part?: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
}

export const ListPlaylistImagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/playlistImages" }),
    svc,
  ) as unknown as Schema.Schema<ListPlaylistImagesRequest>;

export type ListPlaylistImagesResponse = PlaylistImageListResponse;
export const ListPlaylistImagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistImageListResponse;

export type ListPlaylistImagesError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listPlaylistImages: API.PaginatedOperationMethod<
  ListPlaylistImagesRequest,
  ListPlaylistImagesResponse,
  ListPlaylistImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlaylistImagesRequest,
  output: ListPlaylistImagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface InsertPlaylistImagesRequest {
  /** The *part* parameter specifies the properties that the API response will include. */
  part?: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: PlaylistImage;
}

export const InsertPlaylistImagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(PlaylistImage).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/playlistImages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertPlaylistImagesRequest>;

export type InsertPlaylistImagesResponse = PlaylistImage;
export const InsertPlaylistImagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistImage;

export type InsertPlaylistImagesError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertPlaylistImages: API.OperationMethod<
  InsertPlaylistImagesRequest,
  InsertPlaylistImagesResponse,
  InsertPlaylistImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPlaylistImagesRequest,
  output: InsertPlaylistImagesResponse,
  errors: [],
}));

export interface UpdatePlaylistImagesRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter specifies the properties that the API response will include. */
  part?: string[];
  /** Request body */
  body?: PlaylistImage;
}

export const UpdatePlaylistImagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    body: Schema.optional(PlaylistImage).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "youtube/v3/playlistImages", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<UpdatePlaylistImagesRequest>;

export type UpdatePlaylistImagesResponse = PlaylistImage;
export const UpdatePlaylistImagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistImage;

export type UpdatePlaylistImagesError = DefaultErrors;

/** Updates an existing resource. */
export const updatePlaylistImages: API.OperationMethod<
  UpdatePlaylistImagesRequest,
  UpdatePlaylistImagesResponse,
  UpdatePlaylistImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePlaylistImagesRequest,
  output: UpdatePlaylistImagesResponse,
  errors: [],
}));

export interface DeletePlaylistImagesRequest {
  /** Id to identify this image. This is returned from by the List method. */
  id?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeletePlaylistImagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/playlistImages" }),
    svc,
  ) as unknown as Schema.Schema<DeletePlaylistImagesRequest>;

export interface DeletePlaylistImagesResponse {}
export const DeletePlaylistImagesResponse: Schema.Schema<DeletePlaylistImagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePlaylistImagesResponse>;

export type DeletePlaylistImagesError = DefaultErrors;

/** Deletes a resource. */
export const deletePlaylistImages: API.OperationMethod<
  DeletePlaylistImagesRequest,
  DeletePlaylistImagesResponse,
  DeletePlaylistImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlaylistImagesRequest,
  output: DeletePlaylistImagesResponse,
  errors: [],
}));

export interface ListCommentThreadsRequest {
  /** Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter. */
  searchTerms?: string;
  /** Returns the comment threads of the specified video. */
  videoId?: string;
  /** Returns the comment threads of the specified post. */
  postId?: string;
  /** Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam. */
  moderationStatus?:
    | "published"
    | "heldForReview"
    | "likelySpam"
    | "rejected"
    | (string & {});
  /** Returns the comment threads for all the channel comments (ie does not include comments left on videos). */
  channelId?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Returns the comment threads of all videos of the channel and the channel comments as well. */
  allThreadsRelatedToChannelId?: string;
  order?: "orderUnspecified" | "time" | "relevance" | (string & {});
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The *part* parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include. */
  part: string[];
  /** The requested text format for the returned comments. */
  textFormat?: "textFormatUnspecified" | "html" | "plainText" | (string & {});
  /** Returns the comment threads with the given IDs for Stubby or Apiary. */
  id?: string[];
}

export const ListCommentThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    searchTerms: Schema.optional(Schema.String).pipe(
      T.HttpQuery("searchTerms"),
    ),
    videoId: Schema.optional(Schema.String).pipe(T.HttpQuery("videoId")),
    postId: Schema.optional(Schema.String).pipe(T.HttpQuery("postId")),
    moderationStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("moderationStatus"),
    ),
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    allThreadsRelatedToChannelId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("allThreadsRelatedToChannelId"),
    ),
    order: Schema.optional(Schema.String).pipe(T.HttpQuery("order")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    textFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("textFormat")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/commentThreads" }),
    svc,
  ) as unknown as Schema.Schema<ListCommentThreadsRequest>;

export type ListCommentThreadsResponse = CommentThreadListResponse;
export const ListCommentThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CommentThreadListResponse;

export type ListCommentThreadsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listCommentThreads: API.PaginatedOperationMethod<
  ListCommentThreadsRequest,
  ListCommentThreadsResponse,
  ListCommentThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCommentThreadsRequest,
  output: ListCommentThreadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface InsertCommentThreadsRequest {
  /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
  part: string[];
  /** Request body */
  body?: CommentThread;
}

export const InsertCommentThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(CommentThread).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/commentThreads",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertCommentThreadsRequest>;

export type InsertCommentThreadsResponse = CommentThread;
export const InsertCommentThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CommentThread;

export type InsertCommentThreadsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertCommentThreads: API.OperationMethod<
  InsertCommentThreadsRequest,
  InsertCommentThreadsResponse,
  InsertCommentThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertCommentThreadsRequest,
  output: InsertCommentThreadsResponse,
  errors: [],
}));

export interface SetThumbnailsRequest {
  /** Returns the Thumbnail with the given video IDs for Stubby or Apiary. */
  videoId: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const SetThumbnailsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  videoId: Schema.String.pipe(T.HttpQuery("videoId")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/thumbnails/set", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetThumbnailsRequest>;

export type SetThumbnailsResponse = ThumbnailSetResponse;
export const SetThumbnailsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ThumbnailSetResponse;

export type SetThumbnailsError = DefaultErrors;

/** As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom verb here. */
export const setThumbnails: API.OperationMethod<
  SetThumbnailsRequest,
  SetThumbnailsResponse,
  SetThumbnailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetThumbnailsRequest,
  output: SetThumbnailsResponse,
  errors: [],
}));

export interface ListChannelSectionsRequest {
  /** Return the ChannelSections owned by the authenticated user. */
  mine?: boolean;
  /** Return content in specified language */
  hl?: string;
  /** The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*, the API response will also contain all of those nested properties. */
  part: string[];
  /** Return the ChannelSections with the given IDs for Stubby or Apiary. */
  id?: string[];
  /** Return the ChannelSections owned by the specified channel ID. */
  channelId?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const ListChannelSectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/channelSections" }),
    svc,
  ) as unknown as Schema.Schema<ListChannelSectionsRequest>;

export type ListChannelSectionsResponse = ChannelSectionListResponse;
export const ListChannelSectionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ChannelSectionListResponse;

export type ListChannelSectionsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listChannelSections: API.OperationMethod<
  ListChannelSectionsRequest,
  ListChannelSectionsResponse,
  ListChannelSectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListChannelSectionsRequest,
  output: ListChannelSectionsResponse,
  errors: [],
}));

export interface DeleteChannelSectionsRequest {
  id: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeleteChannelSectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/channelSections" }),
    svc,
  ) as unknown as Schema.Schema<DeleteChannelSectionsRequest>;

export interface DeleteChannelSectionsResponse {}
export const DeleteChannelSectionsResponse: Schema.Schema<DeleteChannelSectionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteChannelSectionsResponse>;

export type DeleteChannelSectionsError = DefaultErrors;

/** Deletes a resource. */
export const deleteChannelSections: API.OperationMethod<
  DeleteChannelSectionsRequest,
  DeleteChannelSectionsResponse,
  DeleteChannelSectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteChannelSectionsRequest,
  output: DeleteChannelSectionsResponse,
  errors: [],
}));

export interface InsertChannelSectionsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: ChannelSection;
}

export const InsertChannelSectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(ChannelSection).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/channelSections",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertChannelSectionsRequest>;

export type InsertChannelSectionsResponse = ChannelSection;
export const InsertChannelSectionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ChannelSection;

export type InsertChannelSectionsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertChannelSections: API.OperationMethod<
  InsertChannelSectionsRequest,
  InsertChannelSectionsResponse,
  InsertChannelSectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertChannelSectionsRequest,
  output: InsertChannelSectionsResponse,
  errors: [],
}));

export interface UpdateChannelSectionsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails. */
  part: string[];
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: ChannelSection;
}

export const UpdateChannelSectionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(ChannelSection).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "youtube/v3/channelSections",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateChannelSectionsRequest>;

export type UpdateChannelSectionsResponse = ChannelSection;
export const UpdateChannelSectionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ChannelSection;

export type UpdateChannelSectionsError = DefaultErrors;

/** Updates an existing resource. */
export const updateChannelSections: API.OperationMethod<
  UpdateChannelSectionsRequest,
  UpdateChannelSectionsResponse,
  UpdateChannelSectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateChannelSectionsRequest,
  output: UpdateChannelSectionsResponse,
  errors: [],
}));

export interface ListSearchRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Return results relevant to this language. */
  relevanceLanguage?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet. */
  part: string[];
  /** Filter on the livestream status of the videos. */
  eventType?: "none" | "upcoming" | "live" | "completed" | (string & {});
  /** Display the content as seen by viewers in this country. */
  regionCode?: string;
  /** Filter on the definition of the videos. */
  videoDefinition?: "any" | "standard" | "high" | (string & {});
  /** Filter on videos of a specific type. */
  videoType?:
    | "videoTypeUnspecified"
    | "any"
    | "movie"
    | "episode"
    | (string & {});
  /** Filter on the license of the videos. */
  videoLicense?: "any" | "youtube" | "creativeCommon" | (string & {});
  /** Sort order of the results. */
  order?:
    | "searchSortUnspecified"
    | "date"
    | "rating"
    | "viewCount"
    | "relevance"
    | "title"
    | "videoCount"
    | (string & {});
  /** Filter on distance from the location (specified above). */
  locationRadius?: string;
  /** Filter on videos in a specific category. */
  videoCategoryId?: string;
  /** Restrict results to a particular topic. */
  topicId?: string;
  videoPaidProductPlacement?:
    | "videoPaidProductPlacementUnspecified"
    | "any"
    | "true"
    | (string & {});
  /** Restrict the search to only retrieve videos uploaded using the project id of the authenticated user. */
  forDeveloper?: boolean;
  /** Search for the private videos of the authenticated user. */
  forMine?: boolean;
  /** Filter on resources belonging to this channelId. */
  channelId?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** Textual search terms to match. */
  q?: string;
  /** Indicates whether the search results should include restricted content as well as standard content. */
  safeSearch?:
    | "safeSearchSettingUnspecified"
    | "none"
    | "moderate"
    | "strict"
    | (string & {});
  /** Filter on resources published after this date. */
  publishedAfter?: string;
  /** Restrict results to a particular set of resource types from One Platform. */
  type?: string[];
  /** Filter on the presence of captions on the videos. */
  videoCaption?:
    | "videoCaptionUnspecified"
    | "any"
    | "closedCaption"
    | "none"
    | (string & {});
  /** Filter on embeddable videos. */
  videoEmbeddable?:
    | "videoEmbeddableUnspecified"
    | "any"
    | "true"
    | (string & {});
  /** Filter on location of the video */
  location?: string;
  /** Filter on resources published before this date. */
  publishedBefore?: string;
  /** Filter on the duration of the videos. */
  videoDuration?:
    | "videoDurationUnspecified"
    | "any"
    | "short"
    | "medium"
    | "long"
    | (string & {});
  /** Filter on syndicated videos. */
  videoSyndicated?:
    | "videoSyndicatedUnspecified"
    | "any"
    | "true"
    | (string & {});
  /** Add a filter on the channel search. */
  channelType?: "channelTypeUnspecified" | "any" | "show" | (string & {});
  /** Filter on 3d videos. */
  videoDimension?: "any" | "2d" | "3d" | (string & {});
  /** Search owned by a content owner. */
  forContentOwner?: boolean;
}

export const ListSearchRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  relevanceLanguage: Schema.optional(Schema.String).pipe(
    T.HttpQuery("relevanceLanguage"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  eventType: Schema.optional(Schema.String).pipe(T.HttpQuery("eventType")),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  videoDefinition: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoDefinition"),
  ),
  videoType: Schema.optional(Schema.String).pipe(T.HttpQuery("videoType")),
  videoLicense: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoLicense"),
  ),
  order: Schema.optional(Schema.String).pipe(T.HttpQuery("order")),
  locationRadius: Schema.optional(Schema.String).pipe(
    T.HttpQuery("locationRadius"),
  ),
  videoCategoryId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoCategoryId"),
  ),
  topicId: Schema.optional(Schema.String).pipe(T.HttpQuery("topicId")),
  videoPaidProductPlacement: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoPaidProductPlacement"),
  ),
  forDeveloper: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("forDeveloper"),
  ),
  forMine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("forMine")),
  channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  safeSearch: Schema.optional(Schema.String).pipe(T.HttpQuery("safeSearch")),
  publishedAfter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publishedAfter"),
  ),
  type: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("type")),
  videoCaption: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoCaption"),
  ),
  videoEmbeddable: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoEmbeddable"),
  ),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  publishedBefore: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publishedBefore"),
  ),
  videoDuration: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoDuration"),
  ),
  videoSyndicated: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoSyndicated"),
  ),
  channelType: Schema.optional(Schema.String).pipe(T.HttpQuery("channelType")),
  videoDimension: Schema.optional(Schema.String).pipe(
    T.HttpQuery("videoDimension"),
  ),
  forContentOwner: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("forContentOwner"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/search" }),
  svc,
) as unknown as Schema.Schema<ListSearchRequest>;

export type ListSearchResponse = SearchListResponse;
export const ListSearchResponse =
  /*@__PURE__*/ /*#__PURE__*/ SearchListResponse;

export type ListSearchError = DefaultErrors;

/** Retrieves a list of search resources */
export const listSearch: API.PaginatedOperationMethod<
  ListSearchRequest,
  ListSearchResponse,
  ListSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSearchRequest,
  output: ListSearchResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface DeleteLiveBroadcastsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Broadcast to delete. */
  id: string;
}

export const DeleteLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/liveBroadcasts" }),
    svc,
  ) as unknown as Schema.Schema<DeleteLiveBroadcastsRequest>;

export interface DeleteLiveBroadcastsResponse {}
export const DeleteLiveBroadcastsResponse: Schema.Schema<DeleteLiveBroadcastsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteLiveBroadcastsResponse>;

export type DeleteLiveBroadcastsError = DefaultErrors;

/** Delete a given broadcast. */
export const deleteLiveBroadcasts: API.OperationMethod<
  DeleteLiveBroadcastsRequest,
  DeleteLiveBroadcastsResponse,
  DeleteLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLiveBroadcastsRequest,
  output: DeleteLiveBroadcastsResponse,
  errors: [],
}));

export interface InsertLiveBroadcastsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Request body */
  body?: LiveBroadcast;
}

export const InsertLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    body: Schema.optional(LiveBroadcast).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveBroadcasts",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertLiveBroadcastsRequest>;

export type InsertLiveBroadcastsResponse = LiveBroadcast;
export const InsertLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveBroadcast;

export type InsertLiveBroadcastsError = DefaultErrors;

/** Inserts a new stream for the authenticated user. */
export const insertLiveBroadcasts: API.OperationMethod<
  InsertLiveBroadcastsRequest,
  InsertLiveBroadcastsResponse,
  InsertLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertLiveBroadcastsRequest,
  output: InsertLiveBroadcastsResponse,
  errors: [],
}));

export interface UpdateLiveBroadcastsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to the default privacy setting. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: LiveBroadcast;
}

export const UpdateLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(LiveBroadcast).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "youtube/v3/liveBroadcasts", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<UpdateLiveBroadcastsRequest>;

export type UpdateLiveBroadcastsResponse = LiveBroadcast;
export const UpdateLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveBroadcast;

export type UpdateLiveBroadcastsError = DefaultErrors;

/** Updates an existing broadcast for the authenticated user. */
export const updateLiveBroadcasts: API.OperationMethod<
  UpdateLiveBroadcastsRequest,
  UpdateLiveBroadcastsResponse,
  UpdateLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLiveBroadcastsRequest,
  output: UpdateLiveBroadcastsResponse,
  errors: [],
}));

export interface InsertCuepointLiveBroadcastsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
  part?: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Broadcast to insert ads to, or equivalently `external_video_id` for internal use. */
  id?: string;
  /** Request body */
  body?: Cuepoint;
}

export const InsertCuepointLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("part"),
    ),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
    body: Schema.optional(Cuepoint).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveBroadcasts/cuepoint",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertCuepointLiveBroadcastsRequest>;

export type InsertCuepointLiveBroadcastsResponse = Cuepoint;
export const InsertCuepointLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Cuepoint;

export type InsertCuepointLiveBroadcastsError = DefaultErrors;

/** Insert cuepoints in a broadcast */
export const insertCuepointLiveBroadcasts: API.OperationMethod<
  InsertCuepointLiveBroadcastsRequest,
  InsertCuepointLiveBroadcastsResponse,
  InsertCuepointLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertCuepointLiveBroadcastsRequest,
  output: InsertCuepointLiveBroadcastsResponse,
  errors: [],
}));

export interface BindLiveBroadcastsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Stream to bind, if not set unbind the current one. */
  streamId?: string;
  /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Broadcast to bind to the stream */
  id: string;
}

export const BindLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    streamId: Schema.optional(Schema.String).pipe(T.HttpQuery("streamId")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    id: Schema.String.pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveBroadcasts/bind",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BindLiveBroadcastsRequest>;

export type BindLiveBroadcastsResponse = LiveBroadcast;
export const BindLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveBroadcast;

export type BindLiveBroadcastsError = DefaultErrors;

/** Bind a broadcast to a stream. */
export const bindLiveBroadcasts: API.OperationMethod<
  BindLiveBroadcastsRequest,
  BindLiveBroadcastsResponse,
  BindLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BindLiveBroadcastsRequest,
  output: BindLiveBroadcastsResponse,
  errors: [],
}));

export interface ListLiveBroadcastsRequest {
  mine?: boolean;
  /** Return broadcasts with the given ids from Stubby or Apiary. */
  id?: string[];
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Return broadcasts with a certain status, e.g. active broadcasts. */
  broadcastStatus?:
    | "broadcastStatusFilterUnspecified"
    | "all"
    | "active"
    | "upcoming"
    | "completed"
    | (string & {});
  /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, status and statistics. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Return only broadcasts with the selected type. */
  broadcastType?:
    | "broadcastTypeFilterUnspecified"
    | "all"
    | "event"
    | "persistent"
    | (string & {});
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
}

export const ListLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    broadcastStatus: Schema.optional(Schema.String).pipe(
      T.HttpQuery("broadcastStatus"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    broadcastType: Schema.optional(Schema.String).pipe(
      T.HttpQuery("broadcastType"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/liveBroadcasts" }),
    svc,
  ) as unknown as Schema.Schema<ListLiveBroadcastsRequest>;

export type ListLiveBroadcastsResponse = LiveBroadcastListResponse;
export const ListLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveBroadcastListResponse;

export type ListLiveBroadcastsError = DefaultErrors;

/** Retrieve the list of broadcasts associated with the given channel. */
export const listLiveBroadcasts: API.PaginatedOperationMethod<
  ListLiveBroadcastsRequest,
  ListLiveBroadcastsResponse,
  ListLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListLiveBroadcastsRequest,
  output: ListLiveBroadcastsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface TransitionLiveBroadcastsRequest {
  /** The status to which the broadcast is going to transition. */
  broadcastStatus:
    | "statusUnspecified"
    | "testing"
    | "live"
    | "complete"
    | (string & {});
  /** Broadcast to transition. */
  id: string;
  /** The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status. */
  part: string[];
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const TransitionLiveBroadcastsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    broadcastStatus: Schema.String.pipe(T.HttpQuery("broadcastStatus")),
    id: Schema.String.pipe(T.HttpQuery("id")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/liveBroadcasts/transition",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TransitionLiveBroadcastsRequest>;

export type TransitionLiveBroadcastsResponse = LiveBroadcast;
export const TransitionLiveBroadcastsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LiveBroadcast;

export type TransitionLiveBroadcastsError = DefaultErrors;

/** Transition a broadcast to a given status. */
export const transitionLiveBroadcasts: API.OperationMethod<
  TransitionLiveBroadcastsRequest,
  TransitionLiveBroadcastsResponse,
  TransitionLiveBroadcastsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TransitionLiveBroadcastsRequest,
  output: TransitionLiveBroadcastsResponse,
  errors: [],
}));

export interface ListPlaylistItemsRequest {
  id?: string[];
  /** The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields, including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties. */
  part: string[];
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Return the playlist items associated with the given video ID. */
  videoId?: string;
  /** Return the playlist items within the given playlist. */
  playlistId?: string;
}

export const ListPlaylistItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    videoId: Schema.optional(Schema.String).pipe(T.HttpQuery("videoId")),
    playlistId: Schema.optional(Schema.String).pipe(T.HttpQuery("playlistId")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/playlistItems" }),
    svc,
  ) as unknown as Schema.Schema<ListPlaylistItemsRequest>;

export type ListPlaylistItemsResponse = PlaylistItemListResponse;
export const ListPlaylistItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistItemListResponse;

export type ListPlaylistItemsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listPlaylistItems: API.PaginatedOperationMethod<
  ListPlaylistItemsRequest,
  ListPlaylistItemsResponse,
  ListPlaylistItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlaylistItemsRequest,
  output: ListPlaylistItemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface InsertPlaylistItemsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. */
  part: string[];
  /** Request body */
  body?: PlaylistItem;
}

export const InsertPlaylistItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(PlaylistItem).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "youtube/v3/playlistItems", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<InsertPlaylistItemsRequest>;

export type InsertPlaylistItemsResponse = PlaylistItem;
export const InsertPlaylistItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistItem;

export type InsertPlaylistItemsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertPlaylistItems: API.OperationMethod<
  InsertPlaylistItemsRequest,
  InsertPlaylistItemsResponse,
  InsertPlaylistItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertPlaylistItemsRequest,
  output: InsertPlaylistItemsResponse,
  errors: [],
}));

export interface UpdatePlaylistItemsRequest {
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the default settings. */
  part: string[];
  /** Request body */
  body?: PlaylistItem;
}

export const UpdatePlaylistItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
    body: Schema.optional(PlaylistItem).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "PUT", path: "youtube/v3/playlistItems", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<UpdatePlaylistItemsRequest>;

export type UpdatePlaylistItemsResponse = PlaylistItem;
export const UpdatePlaylistItemsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlaylistItem;

export type UpdatePlaylistItemsError = DefaultErrors;

/** Updates an existing resource. */
export const updatePlaylistItems: API.OperationMethod<
  UpdatePlaylistItemsRequest,
  UpdatePlaylistItemsResponse,
  UpdatePlaylistItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePlaylistItemsRequest,
  output: UpdatePlaylistItemsResponse,
  errors: [],
}));

export interface DeletePlaylistItemsRequest {
  id: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
}

export const DeletePlaylistItemsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpQuery("id")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
  }).pipe(
    T.Http({ method: "DELETE", path: "youtube/v3/playlistItems" }),
    svc,
  ) as unknown as Schema.Schema<DeletePlaylistItemsRequest>;

export interface DeletePlaylistItemsResponse {}
export const DeletePlaylistItemsResponse: Schema.Schema<DeletePlaylistItemsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeletePlaylistItemsResponse>;

export type DeletePlaylistItemsError = DefaultErrors;

/** Deletes a resource. */
export const deletePlaylistItems: API.OperationMethod<
  DeletePlaylistItemsRequest,
  DeletePlaylistItemsResponse,
  DeletePlaylistItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlaylistItemsRequest,
  output: DeletePlaylistItemsResponse,
  errors: [],
}));

export interface ListActivitiesRequest {
  mine?: boolean;
  publishedBefore?: string;
  publishedAfter?: string;
  regionCode?: string;
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  channelId?: string;
  home?: boolean;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties. */
  part: string[];
}

export const ListActivitiesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
  publishedBefore: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publishedBefore"),
  ),
  publishedAfter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("publishedAfter"),
  ),
  regionCode: Schema.optional(Schema.String).pipe(T.HttpQuery("regionCode")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
  home: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("home")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/activities" }),
  svc,
) as unknown as Schema.Schema<ListActivitiesRequest>;

export type ListActivitiesResponse = ActivityListResponse;
export const ListActivitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ActivityListResponse;

export type ListActivitiesError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listActivities: API.PaginatedOperationMethod<
  ListActivitiesRequest,
  ListActivitiesResponse,
  ListActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListActivitiesRequest,
  output: ListActivitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface InsertChannelBannersRequest {
  /** This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel. */
  onBehalfOfContentOwnerChannel?: string;
  /** Unused, channel_id is currently derived from the security context of the requestor. */
  channelId?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: ChannelBannerResource;
}

export const InsertChannelBannersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    onBehalfOfContentOwnerChannel: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwnerChannel"),
    ),
    channelId: Schema.optional(Schema.String).pipe(T.HttpQuery("channelId")),
    onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
      T.HttpQuery("onBehalfOfContentOwner"),
    ),
    body: Schema.optional(ChannelBannerResource).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/channelBanners/insert",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertChannelBannersRequest>;

export type InsertChannelBannersResponse = ChannelBannerResource;
export const InsertChannelBannersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ChannelBannerResource;

export type InsertChannelBannersError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertChannelBanners: API.OperationMethod<
  InsertChannelBannersRequest,
  InsertChannelBannersResponse,
  InsertChannelBannersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertChannelBannersRequest,
  output: InsertChannelBannersResponse,
  errors: [],
}));

export interface InsertTestsRequest {
  part: string[];
  externalChannelId?: string;
  /** Request body */
  body?: TestItem;
}

export const InsertTestsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  externalChannelId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("externalChannelId"),
  ),
  body: Schema.optional(TestItem).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/tests", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTestsRequest>;

export type InsertTestsResponse = TestItem;
export const InsertTestsResponse = /*@__PURE__*/ /*#__PURE__*/ TestItem;

export type InsertTestsError = DefaultErrors;

/** POST method. */
export const insertTests: API.OperationMethod<
  InsertTestsRequest,
  InsertTestsResponse,
  InsertTestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertTestsRequest,
  output: InsertTestsResponse,
  errors: [],
}));

export interface ListCommentsRequest {
  /** The requested text format for the returned comments. */
  textFormat?: "textFormatUnspecified" | "html" | "plainText" | (string & {});
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Returns the comments with the given IDs for One Platform. */
  id?: string[];
  /** Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future. */
  parentId?: string;
  /** The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include. */
  part: string[];
}

export const ListCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  textFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("textFormat")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
  parentId: Schema.optional(Schema.String).pipe(T.HttpQuery("parentId")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/comments" }),
  svc,
) as unknown as Schema.Schema<ListCommentsRequest>;

export type ListCommentsResponse = CommentListResponse;
export const ListCommentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CommentListResponse;

export type ListCommentsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface SetModerationStatusCommentsRequest {
  /** Modifies the moderation status of the comments with the given IDs */
  id: string[];
  /** Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: 'heldForReview', 'published' or 'rejected'. */
  moderationStatus:
    | "published"
    | "heldForReview"
    | "likelySpam"
    | "rejected"
    | (string & {});
  /** If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED. */
  banAuthor?: boolean;
}

export const SetModerationStatusCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.Array(Schema.String).pipe(T.HttpQuery("id")),
    moderationStatus: Schema.String.pipe(T.HttpQuery("moderationStatus")),
    banAuthor: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("banAuthor")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/comments/setModerationStatus",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetModerationStatusCommentsRequest>;

export interface SetModerationStatusCommentsResponse {}
export const SetModerationStatusCommentsResponse: Schema.Schema<SetModerationStatusCommentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<SetModerationStatusCommentsResponse>;

export type SetModerationStatusCommentsError = DefaultErrors;

/** Sets the moderation status of one or more comments. */
export const setModerationStatusComments: API.OperationMethod<
  SetModerationStatusCommentsRequest,
  SetModerationStatusCommentsResponse,
  SetModerationStatusCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetModerationStatusCommentsRequest,
  output: SetModerationStatusCommentsResponse,
  errors: [],
}));

export interface DeleteCommentsRequest {
  id: string;
}

export const DeleteCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.HttpQuery("id")),
}).pipe(
  T.Http({ method: "DELETE", path: "youtube/v3/comments" }),
  svc,
) as unknown as Schema.Schema<DeleteCommentsRequest>;

export interface DeleteCommentsResponse {}
export const DeleteCommentsResponse: Schema.Schema<DeleteCommentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteCommentsResponse>;

export type DeleteCommentsError = DefaultErrors;

/** Deletes a resource. */
export const deleteComments: API.OperationMethod<
  DeleteCommentsRequest,
  DeleteCommentsResponse,
  DeleteCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCommentsRequest,
  output: DeleteCommentsResponse,
  errors: [],
}));

export interface MarkAsSpamCommentsRequest {
  /** Flags the comments with the given IDs as spam in the caller's opinion. */
  id: string[];
}

export const MarkAsSpamCommentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.Array(Schema.String).pipe(T.HttpQuery("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "youtube/v3/comments/markAsSpam",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MarkAsSpamCommentsRequest>;

export interface MarkAsSpamCommentsResponse {}
export const MarkAsSpamCommentsResponse: Schema.Schema<MarkAsSpamCommentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<MarkAsSpamCommentsResponse>;

export type MarkAsSpamCommentsError = DefaultErrors;

/** Expresses the caller's opinion that one or more comments should be flagged as spam. */
export const markAsSpamComments: API.OperationMethod<
  MarkAsSpamCommentsRequest,
  MarkAsSpamCommentsResponse,
  MarkAsSpamCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MarkAsSpamCommentsRequest,
  output: MarkAsSpamCommentsResponse,
  errors: [],
}));

export interface InsertCommentsRequest {
  /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
  part: string[];
  /** Request body */
  body?: Comment;
}

export const InsertCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "youtube/v3/comments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCommentsRequest>;

export type InsertCommentsResponse = Comment;
export const InsertCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type InsertCommentsError = DefaultErrors;

/** Inserts a new resource into this collection. */
export const insertComments: API.OperationMethod<
  InsertCommentsRequest,
  InsertCommentsResponse,
  InsertCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertCommentsRequest,
  output: InsertCommentsResponse,
  errors: [],
}));

export interface UpdateCommentsRequest {
  /** The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all of the properties that the API request can update. */
  part: string[];
  /** Request body */
  body?: Comment;
}

export const UpdateCommentsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  body: Schema.optional(Comment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "youtube/v3/comments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCommentsRequest>;

export type UpdateCommentsResponse = Comment;
export const UpdateCommentsResponse = /*@__PURE__*/ /*#__PURE__*/ Comment;

export type UpdateCommentsError = DefaultErrors;

/** Updates an existing resource. */
export const updateComments: API.OperationMethod<
  UpdateCommentsRequest,
  UpdateCommentsResponse,
  UpdateCommentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateCommentsRequest,
  output: UpdateCommentsResponse,
  errors: [],
}));

export interface ListVideoAbuseReportReasonsRequest {
  hl?: string;
  /** The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet. */
  part: string[];
}

export const ListVideoAbuseReportReasonsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
    part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  }).pipe(
    T.Http({ method: "GET", path: "youtube/v3/videoAbuseReportReasons" }),
    svc,
  ) as unknown as Schema.Schema<ListVideoAbuseReportReasonsRequest>;

export type ListVideoAbuseReportReasonsResponse =
  VideoAbuseReportReasonListResponse;
export const ListVideoAbuseReportReasonsResponse =
  /*@__PURE__*/ /*#__PURE__*/ VideoAbuseReportReasonListResponse;

export type ListVideoAbuseReportReasonsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listVideoAbuseReportReasons: API.OperationMethod<
  ListVideoAbuseReportReasonsRequest,
  ListVideoAbuseReportReasonsResponse,
  ListVideoAbuseReportReasonsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVideoAbuseReportReasonsRequest,
  output: ListVideoAbuseReportReasonsResponse,
  errors: [],
}));

export interface ListChannelsRequest {
  /** Return the channels with the specified IDs. */
  id?: string[];
  /** Return the channel associated with a YouTube username. */
  forUsername?: string;
  /** *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Return the channels subscribed to the authenticated user */
  mySubscribers?: boolean;
  /** Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX). */
  hl?: string;
  /** Return the ids of channels owned by the authenticated user. */
  mine?: boolean;
  /** Return the channel associated with a YouTube handle. */
  forHandle?: string;
  /** The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties. */
  part: string[];
  /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
  maxResults?: number;
  /** The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved. */
  pageToken?: string;
  /** Return the channels within the specified guide category ID. */
  categoryId?: string;
  /** Return the channels managed by the authenticated user. */
  managedByMe?: boolean;
}

export const ListChannelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("id")),
  forUsername: Schema.optional(Schema.String).pipe(T.HttpQuery("forUsername")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  mySubscribers: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("mySubscribers"),
  ),
  hl: Schema.optional(Schema.String).pipe(T.HttpQuery("hl")),
  mine: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("mine")),
  forHandle: Schema.optional(Schema.String).pipe(T.HttpQuery("forHandle")),
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  categoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("categoryId")),
  managedByMe: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("managedByMe")),
}).pipe(
  T.Http({ method: "GET", path: "youtube/v3/channels" }),
  svc,
) as unknown as Schema.Schema<ListChannelsRequest>;

export type ListChannelsResponse = ChannelListResponse;
export const ListChannelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ChannelListResponse;

export type ListChannelsError = DefaultErrors;

/** Retrieves a list of resources, possibly filtered. */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "items",
  },
}));

export interface UpdateChannelsRequest {
  /** The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. */
  part: string[];
  /** The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner. */
  onBehalfOfContentOwner?: string;
  /** Request body */
  body?: Channel;
}

export const UpdateChannelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  part: Schema.Array(Schema.String).pipe(T.HttpQuery("part")),
  onBehalfOfContentOwner: Schema.optional(Schema.String).pipe(
    T.HttpQuery("onBehalfOfContentOwner"),
  ),
  body: Schema.optional(Channel).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "youtube/v3/channels", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateChannelsRequest>;

export type UpdateChannelsResponse = Channel;
export const UpdateChannelsResponse = /*@__PURE__*/ /*#__PURE__*/ Channel;

export type UpdateChannelsError = DefaultErrors;

/** Updates an existing resource. */
export const updateChannels: API.OperationMethod<
  UpdateChannelsRequest,
  UpdateChannelsResponse,
  UpdateChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateChannelsRequest,
  output: UpdateChannelsResponse,
  errors: [],
}));
