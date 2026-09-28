import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Kinesis Video Archived Media",
  target: "AWSAcuityReader",
  version: "2017-09-30",
  sigv4: "kinesisvideo",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ClientLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClientLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidCodecPrivateDataException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCodecPrivateDataException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidMediaFrameException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidMediaFrameException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MissingCodecPrivateDataException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingCodecPrivateDataException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NoDataRetentionException
  extends /*@__PURE__*/ TE.TaggedError(
    "NoDataRetentionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnsupportedStreamMediaTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedStreamMediaTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type StreamName = string;
export type ResourceARN = string;
export type ClipFragmentSelectorType =
  | "PRODUCER_TIMESTAMP"
  | "SERVER_TIMESTAMP"
  | (string & {});
export interface ClipTimestampRange {
  StartTimestamp: Date;
  EndTimestamp: Date;
}
export interface ClipFragmentSelector {
  FragmentSelectorType: ClipFragmentSelectorType;
  TimestampRange: ClipTimestampRange;
}
export interface GetClipInput {
  StreamName?: string;
  StreamARN?: string;
  ClipFragmentSelector: ClipFragmentSelector;
}
export type ContentType = string;
export interface GetClipOutput {
  ContentType?: string;
  Payload?: T.StreamingOutputBody;
}
export type DASHPlaybackMode =
  | "LIVE"
  | "LIVE_REPLAY"
  | "ON_DEMAND"
  | (string & {});
export type DASHDisplayFragmentTimestamp = "ALWAYS" | "NEVER" | (string & {});
export type DASHDisplayFragmentNumber = "ALWAYS" | "NEVER" | (string & {});
export type DASHFragmentSelectorType =
  | "PRODUCER_TIMESTAMP"
  | "SERVER_TIMESTAMP"
  | (string & {});
export interface DASHTimestampRange {
  StartTimestamp?: Date;
  EndTimestamp?: Date;
}
export interface DASHFragmentSelector {
  FragmentSelectorType?: DASHFragmentSelectorType;
  TimestampRange?: DASHTimestampRange;
}
export type Expires = number;
export type DASHMaxResults = number;
export interface GetDASHStreamingSessionURLInput {
  StreamName?: string;
  StreamARN?: string;
  PlaybackMode?: DASHPlaybackMode;
  DisplayFragmentTimestamp?: DASHDisplayFragmentTimestamp;
  DisplayFragmentNumber?: DASHDisplayFragmentNumber;
  DASHFragmentSelector?: DASHFragmentSelector;
  Expires?: number;
  MaxManifestFragmentResults?: number;
}
export type DASHStreamingSessionURL = string;
export interface GetDASHStreamingSessionURLOutput {
  DASHStreamingSessionURL?: string;
}
export type HLSPlaybackMode =
  | "LIVE"
  | "LIVE_REPLAY"
  | "ON_DEMAND"
  | (string & {});
export type HLSFragmentSelectorType =
  | "PRODUCER_TIMESTAMP"
  | "SERVER_TIMESTAMP"
  | (string & {});
export interface HLSTimestampRange {
  StartTimestamp?: Date;
  EndTimestamp?: Date;
}
export interface HLSFragmentSelector {
  FragmentSelectorType?: HLSFragmentSelectorType;
  TimestampRange?: HLSTimestampRange;
}
export type ContainerFormat = "FRAGMENTED_MP4" | "MPEG_TS" | (string & {});
export type HLSDiscontinuityMode =
  | "ALWAYS"
  | "NEVER"
  | "ON_DISCONTINUITY"
  | (string & {});
export type HLSDisplayFragmentTimestamp = "ALWAYS" | "NEVER" | (string & {});
export type HLSMaxResults = number;
export interface GetHLSStreamingSessionURLInput {
  StreamName?: string;
  StreamARN?: string;
  PlaybackMode?: HLSPlaybackMode;
  HLSFragmentSelector?: HLSFragmentSelector;
  ContainerFormat?: ContainerFormat;
  DiscontinuityMode?: HLSDiscontinuityMode;
  DisplayFragmentTimestamp?: HLSDisplayFragmentTimestamp;
  Expires?: number;
  MaxMediaPlaylistFragmentResults?: number;
}
export type HLSStreamingSessionURL = string;
export interface GetHLSStreamingSessionURLOutput {
  HLSStreamingSessionURL?: string;
}
export type ImageSelectorType =
  | "PRODUCER_TIMESTAMP"
  | "SERVER_TIMESTAMP"
  | (string & {});
export type SamplingInterval = number;
export type Format = "JPEG" | "PNG" | (string & {});
export type FormatConfigKey = "JPEGQuality" | (string & {});
export type FormatConfigValue = string;
export type FormatConfig = { [key in FormatConfigKey]?: string };
export type WidthPixels = number;
export type HeightPixels = number;
export type GetImagesMaxResults = number;
export type NextToken = string;
export interface GetImagesInput {
  StreamName?: string;
  StreamARN?: string;
  ImageSelectorType: ImageSelectorType;
  StartTimestamp: Date;
  EndTimestamp: Date;
  SamplingInterval?: number;
  Format: Format;
  FormatConfig?: { [key: string]: string | undefined };
  WidthPixels?: number;
  HeightPixels?: number;
  MaxResults?: number;
  NextToken?: string;
}
export type ImageError = "NO_MEDIA" | "MEDIA_ERROR" | (string & {});
export type ImageContent = string;
export interface Image {
  TimeStamp?: Date;
  Error?: ImageError;
  ImageContent?: string;
}
export type Images = Image[];
export interface GetImagesOutput {
  Images?: Image[];
  NextToken?: string;
}
export type FragmentNumberString = string;
export type FragmentNumberList = string[];
export interface GetMediaForFragmentListInput {
  StreamName?: string;
  StreamARN?: string;
  Fragments: string[];
}
export interface GetMediaForFragmentListOutput {
  ContentType?: string;
  Payload?: T.StreamingOutputBody;
}
export type ListFragmentsMaxResults = number;
export type FragmentSelectorType =
  | "PRODUCER_TIMESTAMP"
  | "SERVER_TIMESTAMP"
  | (string & {});
export interface TimestampRange {
  StartTimestamp: Date;
  EndTimestamp: Date;
}
export interface FragmentSelector {
  FragmentSelectorType: FragmentSelectorType;
  TimestampRange: TimestampRange;
}
export interface ListFragmentsInput {
  StreamName?: string;
  StreamARN?: string;
  MaxResults?: number;
  NextToken?: string;
  FragmentSelector?: FragmentSelector;
}
export interface Fragment {
  FragmentNumber?: string;
  FragmentSizeInBytes?: number;
  ProducerTimestamp?: Date;
  ServerTimestamp?: Date;
  FragmentLengthInMilliseconds?: number;
}
export type FragmentList = Fragment[];
export interface ListFragmentsOutput {
  Fragments?: Fragment[];
  NextToken?: string;
}
export type ErrorMessage = string;
export type GetClipError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidCodecPrivateDataException
  | InvalidMediaFrameException
  | MissingCodecPrivateDataException
  | NoDataRetentionException
  | NotAuthorizedException
  | ResourceNotFoundException
  | UnsupportedStreamMediaTypeException
  | CommonErrors;
/**
 * Downloads an MP4 file (clip) containing the archived, on-demand media from the
 * specified video stream over the specified time range.
 *
 * Both the StreamName and the StreamARN parameters are optional, but you must specify
 * either the StreamName or the StreamARN when invoking this API operation.
 *
 * As a prerequisite to using GetCLip API, you must obtain an endpoint using
 * `GetDataEndpoint`, specifying GET_CLIP for`` the
 * `APIName` parameter.
 *
 * An Amazon Kinesis video stream has the following requirements for providing data
 * through MP4:
 *
 * - The media must contain h.264 or h.265 encoded video and, optionally, AAC or
 * G.711 encoded audio. Specifically, the codec ID of track 1 should be
 * `V_MPEG/ISO/AVC` (for h.264) or V_MPEGH/ISO/HEVC (for H.265).
 * Optionally, the codec ID of track 2 should be `A_AAC` (for AAC) or
 * A_MS/ACM (for G.711).
 *
 * - Data retention must be greater than 0.
 *
 * - The video track of each fragment must contain codec private data in the
 * Advanced Video Coding (AVC) for H.264 format and HEVC for H.265 format. For more
 * information, see MPEG-4
 * specification ISO/IEC 14496-15. For information about adapting
 * stream data to a given format, see NAL Adaptation Flags.
 *
 * - The audio track (if present) of each fragment must contain codec private data
 * in the AAC format (AAC
 * specification ISO/IEC 13818-7) or the MS
 * Wave format.
 *
 * You can monitor the amount of outgoing data by monitoring the
 * `GetClip.OutgoingBytes` Amazon CloudWatch metric. For information about
 * using CloudWatch to monitor Kinesis Video Streams, see Monitoring Kinesis Video Streams. For pricing information, see Amazon Kinesis Video
 * Streams Pricing and Amazon Web Services
 * Pricing. Charges for outgoing Amazon Web Services data apply.
 */
export const getClip: API.OperationMethod<
  GetClipInput,
  GetClipOutput,
  GetClipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getClip",
    input: {
      StreamName: 0,
      StreamARN: 0,
      ClipFragmentSelector: {
        FragmentSelectorType: 0,
        TimestampRange: { StartTimestamp: 0, EndTimestamp: 0 },
      },
    },
    output: {
      ContentType: D.m({ header: "Content-Type" }),
      Payload: D.m({ payload: true, shape: D.stream }),
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidCodecPrivateDataException,
    InvalidMediaFrameException,
    MissingCodecPrivateDataException,
    NoDataRetentionException,
    NotAuthorizedException,
    ResourceNotFoundException,
    UnsupportedStreamMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClip",
})) as any;

export type GetDASHStreamingSessionURLError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidCodecPrivateDataException
  | MissingCodecPrivateDataException
  | NoDataRetentionException
  | NotAuthorizedException
  | ResourceNotFoundException
  | UnsupportedStreamMediaTypeException
  | CommonErrors;
/**
 * Retrieves an MPEG Dynamic Adaptive Streaming over HTTP (DASH) URL for the stream. You
 * can then open the URL in a media player to view the stream contents.
 *
 * Both the `StreamName` and the `StreamARN` parameters are
 * optional, but you must specify either the `StreamName` or the
 * `StreamARN` when invoking this API operation.
 *
 * An Amazon Kinesis video stream has the following requirements for providing data
 * through MPEG-DASH:
 *
 * - The media must contain h.264 or h.265 encoded video and, optionally, AAC or
 * G.711 encoded audio. Specifically, the codec ID of track 1 should be
 * `V_MPEG/ISO/AVC` (for h.264) or V_MPEGH/ISO/HEVC (for H.265).
 * Optionally, the codec ID of track 2 should be `A_AAC` (for AAC) or
 * A_MS/ACM (for G.711).
 *
 * - Data retention must be greater than 0.
 *
 * - The video track of each fragment must contain codec private data in the
 * Advanced Video Coding (AVC) for H.264 format and HEVC for H.265 format. For more
 * information, see MPEG-4
 * specification ISO/IEC 14496-15. For information about adapting
 * stream data to a given format, see NAL Adaptation Flags.
 *
 * - The audio track (if present) of each fragment must contain codec private data
 * in the AAC format (AAC
 * specification ISO/IEC 13818-7) or the MS
 * Wave format.
 *
 * The following procedure shows how to use MPEG-DASH with Kinesis Video Streams:
 *
 * - Get an endpoint using GetDataEndpoint, specifying
 * `GET_DASH_STREAMING_SESSION_URL` for the `APIName`
 * parameter.
 *
 * - Retrieve the MPEG-DASH URL using `GetDASHStreamingSessionURL`.
 * Kinesis Video Streams creates an MPEG-DASH streaming session to be used for
 * accessing content in a stream using the MPEG-DASH protocol.
 * `GetDASHStreamingSessionURL` returns an authenticated URL (that
 * includes an encrypted session token) for the session's MPEG-DASH
 * *manifest* (the root resource needed for streaming with
 * MPEG-DASH).
 *
 * Don't share or store this token where an unauthorized entity can access
 * it. The token provides access to the content of the stream. Safeguard the
 * token with the same measures that you use with your Amazon Web Services credentials.
 *
 * The media that is made available through the manifest consists only of the
 * requested stream, time range, and format. No other media data (such as frames
 * outside the requested window or alternate bitrates) is made available.
 *
 * - Provide the URL (containing the encrypted session token) for the MPEG-DASH
 * manifest to a media player that supports the MPEG-DASH protocol. Kinesis Video
 * Streams makes the initialization fragment and media fragments available through
 * the manifest URL. The initialization fragment contains the codec private data
 * for the stream, and other data needed to set up the video or audio decoder and
 * renderer. The media fragments contain encoded video frames or encoded audio
 * samples.
 *
 * - The media player receives the authenticated URL and requests stream metadata
 * and media data normally. When the media player requests data, it calls the
 * following actions:
 *
 * - **GetDASHManifest:** Retrieves an MPEG DASH
 * manifest, which contains the metadata for the media that you want to
 * playback.
 *
 * - **GetMP4InitFragment:** Retrieves the MP4
 * initialization fragment. The media player typically loads the
 * initialization fragment before loading any media fragments. This
 * fragment contains the "`fytp`" and "`moov`" MP4
 * atoms, and the child atoms that are needed to initialize the media
 * player decoder.
 *
 * The initialization fragment does not correspond to a fragment in a
 * Kinesis video stream. It contains only the codec private data for the
 * stream and respective track, which the media player needs to decode the
 * media frames.
 *
 * - **GetMP4MediaFragment:** Retrieves MP4
 * media fragments. These fragments contain the "`moof`" and
 * "`mdat`" MP4 atoms and their child atoms, containing the
 * encoded fragment's media frames and their timestamps.
 *
 * After the first media fragment is made available in a streaming
 * session, any fragments that don't contain the same codec private
 * data cause an error to be returned when those different media
 * fragments are loaded. Therefore, the codec private data should not
 * change between fragments in a session. This also means that the
 * session fails if the fragments in a stream change from having only
 * video to having both audio and video.
 *
 * Data retrieved with this action is billable. See Pricing for details.
 *
 * For restrictions that apply to MPEG-DASH sessions, see Kinesis Video Streams Limits.
 *
 * You can monitor the amount of data that the media player consumes by monitoring the
 * `GetMP4MediaFragment.OutgoingBytes` Amazon CloudWatch metric. For
 * information about using CloudWatch to monitor Kinesis Video Streams, see Monitoring Kinesis Video Streams. For pricing information, see Amazon Kinesis Video
 * Streams Pricing and Amazon Web Services
 * Pricing. Charges for both HLS sessions and outgoing Amazon Web Services data apply.
 *
 * For more information about HLS, see HTTP Live Streaming on the
 * Apple Developer site.
 *
 * If an error is thrown after invoking a Kinesis Video Streams archived media API,
 * in addition to the HTTP status code and the response body, it includes the following
 * pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error
 * type in addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to
 * Amazon Web Services the support team can better diagnose the problem if given the Request
 * Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make
 * programmatic decisions about whether errors are retry-able and under what
 * conditions, as well as provide information on what actions the client programmer
 * might need to take in order to successfully try again.
 *
 * For more information, see the **Errors** section at
 * the bottom of this topic, as well as Common Errors.
 */
export const getDASHStreamingSessionURL: API.OperationMethod<
  GetDASHStreamingSessionURLInput,
  GetDASHStreamingSessionURLOutput,
  GetDASHStreamingSessionURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getDASHStreamingSessionURL",
    input: {
      StreamName: 0,
      StreamARN: 0,
      PlaybackMode: 0,
      DisplayFragmentTimestamp: 0,
      DisplayFragmentNumber: 0,
      DASHFragmentSelector: {
        FragmentSelectorType: 0,
        TimestampRange: { StartTimestamp: 0, EndTimestamp: 0 },
      },
      Expires: 0,
      MaxManifestFragmentResults: 0,
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidCodecPrivateDataException,
    MissingCodecPrivateDataException,
    NoDataRetentionException,
    NotAuthorizedException,
    ResourceNotFoundException,
    UnsupportedStreamMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDASHStreamingSessionURL",
})) as any;

export type GetHLSStreamingSessionURLError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidCodecPrivateDataException
  | MissingCodecPrivateDataException
  | NoDataRetentionException
  | NotAuthorizedException
  | ResourceNotFoundException
  | UnsupportedStreamMediaTypeException
  | CommonErrors;
/**
 * Retrieves an HTTP Live Streaming (HLS) URL for the stream. You can then open the URL
 * in a browser or media player to view the stream contents.
 *
 * Both the `StreamName` and the `StreamARN` parameters are
 * optional, but you must specify either the `StreamName` or the
 * `StreamARN` when invoking this API operation.
 *
 * An Amazon Kinesis video stream has the following requirements for providing data
 * through HLS:
 *
 * - For streaming video, the media must contain H.264 or H.265 encoded video and, optionally, AAC
 * encoded audio. Specifically, the codec ID of track 1 should be
 * `V_MPEG/ISO/AVC` (for H.264) or `V_MPEG/ISO/HEVC` (for
 * H.265). Optionally, the codec ID of track 2 should be `A_AAC`. For audio only streaming, the codec ID of track 1 should be
 * `A_AAC`.
 *
 * - Data retention must be greater than 0.
 *
 * - The video track of each fragment must contain codec private data in the
 * Advanced Video Coding (AVC) for H.264 format or HEVC for H.265 format (MPEG-4 specification ISO/IEC
 * 14496-15). For information about adapting stream data to a given
 * format, see NAL Adaptation Flags.
 *
 * - The audio track (if present) of each fragment must contain codec private data
 * in the AAC format (AAC
 * specification ISO/IEC 13818-7).
 *
 * Kinesis Video Streams HLS sessions contain fragments in the fragmented MPEG-4 form
 * (also called fMP4 or CMAF) or the MPEG-2 form (also called TS chunks, which the HLS
 * specification also supports). For more information about HLS fragment types, see the
 * HLS
 * specification.
 *
 * The following procedure shows how to use HLS with Kinesis Video Streams:
 *
 * - Get an endpoint using GetDataEndpoint, specifying
 * `GET_HLS_STREAMING_SESSION_URL` for the `APIName`
 * parameter.
 *
 * - Retrieve the HLS URL using `GetHLSStreamingSessionURL`. Kinesis
 * Video Streams creates an HLS streaming session to be used for accessing content
 * in a stream using the HLS protocol. `GetHLSStreamingSessionURL`
 * returns an authenticated URL (that includes an encrypted session token) for the
 * session's HLS *master playlist* (the root resource needed for
 * streaming with HLS).
 *
 * Don't share or store this token where an unauthorized entity could access
 * it. The token provides access to the content of the stream. Safeguard the
 * token with the same measures that you would use with your Amazon Web Services
 * credentials.
 *
 * The media that is made available through the playlist consists only of the
 * requested stream, time range, and format. No other media data (such as frames
 * outside the requested window or alternate bitrates) is made available.
 *
 * - Provide the URL (containing the encrypted session token) for the HLS master
 * playlist to a media player that supports the HLS protocol. Kinesis Video Streams
 * makes the HLS media playlist, initialization fragment, and media fragments
 * available through the master playlist URL. The initialization fragment contains
 * the codec private data for the stream, and other data needed to set up the video
 * or audio decoder and renderer. The media fragments contain H.264-encoded video
 * frames or AAC-encoded audio samples.
 *
 * - The media player receives the authenticated URL and requests stream metadata
 * and media data normally. When the media player requests data, it calls the
 * following actions:
 *
 * - **GetHLSMasterPlaylist:** Retrieves an HLS
 * master playlist, which contains a URL for the
 * `GetHLSMediaPlaylist` action for each track, and
 * additional metadata for the media player, including estimated bitrate
 * and resolution.
 *
 * - **GetHLSMediaPlaylist:** Retrieves an HLS
 * media playlist, which contains a URL to access the MP4 initialization
 * fragment with the `GetMP4InitFragment` action, and URLs to
 * access the MP4 media fragments with the `GetMP4MediaFragment`
 * actions. The HLS media playlist also contains metadata about the stream
 * that the player needs to play it, such as whether the
 * `PlaybackMode` is `LIVE` or
 * `ON_DEMAND`. The HLS media playlist is typically static
 * for sessions with a `PlaybackType` of `ON_DEMAND`.
 * The HLS media playlist is continually updated with new fragments for
 * sessions with a `PlaybackType` of `LIVE`. There is
 * a distinct HLS media playlist for the video track and the audio track
 * (if applicable) that contains MP4 media URLs for the specific track.
 *
 * - **GetMP4InitFragment:** Retrieves the MP4
 * initialization fragment. The media player typically loads the
 * initialization fragment before loading any media fragments. This
 * fragment contains the "`fytp`" and "`moov`" MP4
 * atoms, and the child atoms that are needed to initialize the media
 * player decoder.
 *
 * The initialization fragment does not correspond to a fragment in a
 * Kinesis video stream. It contains only the codec private data for the
 * stream and respective track, which the media player needs to decode the
 * media frames.
 *
 * - **GetMP4MediaFragment:** Retrieves MP4
 * media fragments. These fragments contain the "`moof`" and
 * "`mdat`" MP4 atoms and their child atoms, containing the
 * encoded fragment's media frames and their timestamps.
 *
 * For the HLS streaming session, in-track codec private data (CPD)
 * changes are supported. After the first media fragment is made
 * available in a streaming session, fragments can contain CPD changes
 * for each track. Therefore, the fragments in a session can have a
 * different resolution, bit rate, or other information in the CPD
 * without interrupting playback. However, any change made in the track
 * number or track codec format can return an error when those
 * different media fragments are loaded. For example, streaming will
 * fail if the fragments in the stream change from having only video to
 * having both audio and video, or if an AAC audio track is changed to
 * an ALAW audio track. For each streaming session, only 500 CPD
 * changes are allowed.
 *
 * Data retrieved with this action is billable. For information, see
 * Pricing.
 *
 * - **GetTSFragment:** Retrieves MPEG TS
 * fragments containing both initialization and media data for all tracks
 * in the stream.
 *
 * If the `ContainerFormat` is `MPEG_TS`, this
 * API is used instead of `GetMP4InitFragment` and
 * `GetMP4MediaFragment` to retrieve stream
 * media.
 *
 * Data retrieved with this action is billable. For more information, see
 * Kinesis Video Streams pricing.
 *
 * A streaming session URL must not be shared between players. The service
 * might throttle a session if multiple media players are sharing it. For
 * connection limits, see Kinesis Video Streams Limits.
 *
 * You can monitor the amount of data that the media player consumes by monitoring the
 * `GetMP4MediaFragment.OutgoingBytes` Amazon CloudWatch metric. For
 * information about using CloudWatch to monitor Kinesis Video Streams, see Monitoring Kinesis Video Streams. For pricing information, see Amazon Kinesis Video
 * Streams Pricing and Amazon Web Services
 * Pricing. Charges for both HLS sessions and outgoing Amazon Web Services data apply.
 *
 * For more information about HLS, see HTTP Live Streaming on the
 * Apple Developer site.
 *
 * If an error is thrown after invoking a Kinesis Video Streams archived media API,
 * in addition to the HTTP status code and the response body, it includes the following
 * pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error
 * type in addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to
 * Amazon Web Services, the support team can better diagnose the problem if given the Request
 * Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make
 * programmatic decisions about whether errors are retry-able and under what
 * conditions, as well as provide information on what actions the client programmer
 * might need to take in order to successfully try again.
 *
 * For more information, see the **Errors** section at
 * the bottom of this topic, as well as Common Errors.
 */
export const getHLSStreamingSessionURL: API.OperationMethod<
  GetHLSStreamingSessionURLInput,
  GetHLSStreamingSessionURLOutput,
  GetHLSStreamingSessionURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getHLSStreamingSessionURL",
    input: {
      StreamName: 0,
      StreamARN: 0,
      PlaybackMode: 0,
      HLSFragmentSelector: {
        FragmentSelectorType: 0,
        TimestampRange: { StartTimestamp: 0, EndTimestamp: 0 },
      },
      ContainerFormat: 0,
      DiscontinuityMode: 0,
      DisplayFragmentTimestamp: 0,
      Expires: 0,
      MaxMediaPlaylistFragmentResults: 0,
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidCodecPrivateDataException,
    MissingCodecPrivateDataException,
    NoDataRetentionException,
    NotAuthorizedException,
    ResourceNotFoundException,
    UnsupportedStreamMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHLSStreamingSessionURL",
})) as any;

export type GetImagesError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of images corresponding to each timestamp for a given time range,
 * sampling interval, and image format configuration.
 */
export const getImages: API.PaginatedOperationMethod<
  GetImagesInput,
  GetImagesOutput,
  GetImagesError,
  Credentials | HttpClient.HttpClient,
  Image
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /getImages",
    input: {
      StreamName: 0,
      StreamARN: 0,
      ImageSelectorType: 0,
      StartTimestamp: 0,
      EndTimestamp: 0,
      SamplingInterval: 0,
      Format: 0,
      FormatConfig: 0,
      WidthPixels: 0,
      HeightPixels: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Images: D.list({ TimeStamp: D.ts }) },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Images",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMediaForFragmentListError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets media for a list of fragments (specified by fragment number) from the archived
 * data in an Amazon Kinesis video stream.
 *
 * You must first call the `GetDataEndpoint` API to get an endpoint.
 * Then send the `GetMediaForFragmentList` requests to this endpoint using
 * the --endpoint-url
 * parameter.
 *
 * For limits, see Kinesis Video Streams Limits.
 *
 * If an error is thrown after invoking a Kinesis Video Streams archived media API,
 * in addition to the HTTP status code and the response body, it includes the following
 * pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error
 * type in addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to
 * Amazon Web Services, the support team can better diagnose the problem if given the Request
 * Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make
 * programmatic decisions about whether errors are retry-able and under what
 * conditions, as well as provide information on what actions the client programmer
 * might need to take in order to successfully try again.
 *
 * For more information, see the **Errors** section at
 * the bottom of this topic, as well as Common Errors.
 */
export const getMediaForFragmentList: API.OperationMethod<
  GetMediaForFragmentListInput,
  GetMediaForFragmentListOutput,
  GetMediaForFragmentListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getMediaForFragmentList",
    input: { StreamName: 0, StreamARN: 0, Fragments: 0 },
    output: {
      ContentType: D.m({ header: "Content-Type" }),
      Payload: D.m({ payload: true, shape: D.stream }),
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaForFragmentList",
})) as any;

export type ListFragmentsError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of Fragment objects from the specified stream and
 * timestamp range within the archived data.
 *
 * Listing fragments is eventually consistent. This means that even if the producer
 * receives an acknowledgment that a fragment is persisted, the result might not be
 * returned immediately from a request to `ListFragments`. However, results are
 * typically available in less than one second.
 *
 * You must first call the `GetDataEndpoint` API to get an endpoint.
 * Then send the `ListFragments` requests to this endpoint using the --endpoint-url
 * parameter.
 *
 * If an error is thrown after invoking a Kinesis Video Streams archived media API,
 * in addition to the HTTP status code and the response body, it includes the following
 * pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error
 * type in addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to
 * Amazon Web Services, the support team can better diagnose the problem if given the Request
 * Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make
 * programmatic decisions about whether errors are retry-able and under what
 * conditions, as well as provide information on what actions the client programmer
 * might need to take in order to successfully try again.
 *
 * For more information, see the **Errors** section at
 * the bottom of this topic, as well as Common Errors.
 */
export const listFragments: API.PaginatedOperationMethod<
  ListFragmentsInput,
  ListFragmentsOutput,
  ListFragmentsError,
  Credentials | HttpClient.HttpClient,
  Fragment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /listFragments",
    input: {
      StreamName: 0,
      StreamARN: 0,
      MaxResults: 0,
      NextToken: 0,
      FragmentSelector: {
        FragmentSelectorType: 0,
        TimestampRange: { StartTimestamp: 0, EndTimestamp: 0 },
      },
    },
    output: {
      Fragments: D.list({ ProducerTimestamp: D.ts, ServerTimestamp: D.ts }),
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFragments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Fragments",
    pageSize: "MaxResults",
  } as const,
})) as any;
