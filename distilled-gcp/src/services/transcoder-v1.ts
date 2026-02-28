// ==========================================================================
// Transcoder API (transcoder v1)
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
  name: "transcoder",
  version: "v1",
  rootUrl: "https://transcoder.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Color {
  /** Control color saturation of the video. Enter a value between -1 and 1, where -1 is fully desaturated and 1 is maximum saturation. 0 is no change. The default is 0. */
  saturation?: number;
  /** Control black and white contrast of the video. Enter a value between -1 and 1, where -1 is minimum contrast and 1 is maximum contrast. 0 is no change. The default is 0. */
  contrast?: number;
  /** Control brightness of the video. Enter a value between -1 and 1, where -1 is minimum brightness and 1 is maximum brightness. 0 is no change. The default is 0. */
  brightness?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() => Schema.Struct({
  saturation: Schema.optional(Schema.Number),
  contrast: Schema.optional(Schema.Number),
  brightness: Schema.optional(Schema.Number),
})).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface Denoise {
  /** Set strength of the denoise. Enter a value between 0 and 1. The higher the value, the smoother the image. 0 is no denoising. The default is 0. */
  strength?: number;
  /** Set the denoiser mode. The default is `standard`. Supported denoiser modes: - `standard` - `grain` */
  tune?: string;
}

export const Denoise: Schema.Schema<Denoise> = Schema.suspend(() => Schema.Struct({
  strength: Schema.optional(Schema.Number),
  tune: Schema.optional(Schema.String),
})).annotate({ identifier: "Denoise" }) as any as Schema.Schema<Denoise>;

export interface Deblock {
  /** Set strength of the deblocker. Enter a value between 0 and 1. The higher the value, the stronger the block removal. 0 is no deblocking. The default is 0. */
  strength?: number;
  /** Enable deblocker. The default is `false`. */
  enabled?: boolean;
}

export const Deblock: Schema.Schema<Deblock> = Schema.suspend(() => Schema.Struct({
  strength: Schema.optional(Schema.Number),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Deblock" }) as any as Schema.Schema<Deblock>;

export interface Audio {
  /** Specify audio loudness normalization in loudness units relative to full scale (LUFS). Enter a value between -24 and 0 (the default), where: * -24 is the Advanced Television Systems Committee (ATSC A/85) standard * -23 is the EU R128 broadcast standard * -19 is the prior standard for online mono audio * -18 is the ReplayGain standard * -16 is the prior standard for stereo audio * -14 is the new online audio standard recommended by Spotify, as well as Amazon Echo * 0 disables normalization */
  lufs?: number;
  /** Enable boosting high frequency components. The default is `false`. **Note:** This field is not supported. */
  highBoost?: boolean;
  /** Enable boosting low frequency components. The default is `false`. **Note:** This field is not supported. */
  lowBoost?: boolean;
}

export const Audio: Schema.Schema<Audio> = Schema.suspend(() => Schema.Struct({
  lufs: Schema.optional(Schema.Number),
  highBoost: Schema.optional(Schema.Boolean),
  lowBoost: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Audio" }) as any as Schema.Schema<Audio>;

export interface Crop {
  /** The number of pixels to crop from the top. The default is 0. */
  topPixels?: number;
  /** The number of pixels to crop from the bottom. The default is 0. */
  bottomPixels?: number;
  /** The number of pixels to crop from the left. The default is 0. */
  leftPixels?: number;
  /** The number of pixels to crop from the right. The default is 0. */
  rightPixels?: number;
}

export const Crop: Schema.Schema<Crop> = Schema.suspend(() => Schema.Struct({
  topPixels: Schema.optional(Schema.Number),
  bottomPixels: Schema.optional(Schema.Number),
  leftPixels: Schema.optional(Schema.Number),
  rightPixels: Schema.optional(Schema.Number),
})).annotate({ identifier: "Crop" }) as any as Schema.Schema<Crop>;

export interface Pad {
  /** The number of pixels to add to the top. The default is 0. */
  topPixels?: number;
  /** The number of pixels to add to the bottom. The default is 0. */
  bottomPixels?: number;
  /** The number of pixels to add to the left. The default is 0. */
  leftPixels?: number;
  /** The number of pixels to add to the right. The default is 0. */
  rightPixels?: number;
}

export const Pad: Schema.Schema<Pad> = Schema.suspend(() => Schema.Struct({
  topPixels: Schema.optional(Schema.Number),
  bottomPixels: Schema.optional(Schema.Number),
  leftPixels: Schema.optional(Schema.Number),
  rightPixels: Schema.optional(Schema.Number),
})).annotate({ identifier: "Pad" }) as any as Schema.Schema<Pad>;

export interface YadifConfig {
  /** Specifies the deinterlacing mode to adopt. The default is `send_frame`. Supported values: - `send_frame`: Output one frame for each frame - `send_field`: Output one frame for each field */
  mode?: string;
  /** Disable spacial interlacing. The default is `false`. */
  disableSpatialInterlacing?: boolean;
  /** The picture field parity assumed for the input interlaced video. The default is `auto`. Supported values: - `tff`: Assume the top field is first - `bff`: Assume the bottom field is first - `auto`: Enable automatic detection of field parity */
  parity?: string;
  /** Deinterlace all frames rather than just the frames identified as interlaced. The default is `false`. */
  deinterlaceAllFrames?: boolean;
}

export const YadifConfig: Schema.Schema<YadifConfig> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  disableSpatialInterlacing: Schema.optional(Schema.Boolean),
  parity: Schema.optional(Schema.String),
  deinterlaceAllFrames: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "YadifConfig" }) as any as Schema.Schema<YadifConfig>;

export interface BwdifConfig {
  /** Specifies the deinterlacing mode to adopt. The default is `send_frame`. Supported values: - `send_frame`: Output one frame for each frame - `send_field`: Output one frame for each field */
  mode?: string;
  /** The picture field parity assumed for the input interlaced video. The default is `auto`. Supported values: - `tff`: Assume the top field is first - `bff`: Assume the bottom field is first - `auto`: Enable automatic detection of field parity */
  parity?: string;
  /** Deinterlace all frames rather than just the frames identified as interlaced. The default is `false`. */
  deinterlaceAllFrames?: boolean;
}

export const BwdifConfig: Schema.Schema<BwdifConfig> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  parity: Schema.optional(Schema.String),
  deinterlaceAllFrames: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BwdifConfig" }) as any as Schema.Schema<BwdifConfig>;

export interface Deinterlace {
  /** Specifies the Yet Another Deinterlacing Filter Configuration. */
  yadif?: YadifConfig;
  /** Specifies the Bob Weaver Deinterlacing Filter Configuration. */
  bwdif?: BwdifConfig;
}

export const Deinterlace: Schema.Schema<Deinterlace> = Schema.suspend(() => Schema.Struct({
  yadif: Schema.optional(YadifConfig),
  bwdif: Schema.optional(BwdifConfig),
})).annotate({ identifier: "Deinterlace" }) as any as Schema.Schema<Deinterlace>;

export interface PreprocessingConfig {
  /** Color preprocessing configuration. */
  color?: Color;
  /** Denoise preprocessing configuration. */
  denoise?: Denoise;
  /** Deblock preprocessing configuration. */
  deblock?: Deblock;
  /** Audio preprocessing configuration. */
  audio?: Audio;
  /** Specify the video cropping configuration. */
  crop?: Crop;
  /** Specify the video pad filter configuration. */
  pad?: Pad;
  /** Specify the video deinterlace configuration. */
  deinterlace?: Deinterlace;
}

export const PreprocessingConfig: Schema.Schema<PreprocessingConfig> = Schema.suspend(() => Schema.Struct({
  color: Schema.optional(Color),
  denoise: Schema.optional(Denoise),
  deblock: Schema.optional(Deblock),
  audio: Schema.optional(Audio),
  crop: Schema.optional(Crop),
  pad: Schema.optional(Pad),
  deinterlace: Schema.optional(Deinterlace),
})).annotate({ identifier: "PreprocessingConfig" }) as any as Schema.Schema<PreprocessingConfig>;

export interface TrackDefinition {
  /** The input track. */
  inputTrack?: number;
  /** Optional. A list of languages spoken in the input asset, represented by a BCP 47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languages?: Array<string>;
  /** Optional. Whether to automatically detect the languages present in the track. If true, the system will attempt to identify all the languages present in the track and populate the languages field. */
  detectLanguages?: boolean;
  /** Output only. A list of languages detected in the input asset, represented by a BCP 47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. This field is only populated if the detect_languages field is set to true. */
  detectedLanguages?: Array<string>;
}

export const TrackDefinition: Schema.Schema<TrackDefinition> = Schema.suspend(() => Schema.Struct({
  inputTrack: Schema.optional(Schema.Number),
  languages: Schema.optional(Schema.Array(Schema.String)),
  detectLanguages: Schema.optional(Schema.Boolean),
  detectedLanguages: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TrackDefinition" }) as any as Schema.Schema<TrackDefinition>;

export interface InputAttributes {
  /** Optional. A list of track definitions for the input asset. */
  trackDefinitions?: Array<TrackDefinition>;
}

export const InputAttributes: Schema.Schema<InputAttributes> = Schema.suspend(() => Schema.Struct({
  trackDefinitions: Schema.optional(Schema.Array(TrackDefinition)),
})).annotate({ identifier: "InputAttributes" }) as any as Schema.Schema<InputAttributes>;

export interface Input {
  /** A unique key for this input. Must be specified when using advanced mapping and edit lists. */
  key?: string;
  /** URI of the media. Input files must be at least 5 seconds in duration and stored in Cloud Storage (for example, `gs://bucket/inputs/file.mp4`). If empty, the value is populated from Job.input_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats). */
  uri?: string;
  /** Preprocessing configurations. */
  preprocessingConfig?: PreprocessingConfig;
  /** Optional. Input Attributes. */
  attributes?: InputAttributes;
}

export const Input: Schema.Schema<Input> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  preprocessingConfig: Schema.optional(PreprocessingConfig),
  attributes: Schema.optional(InputAttributes),
})).annotate({ identifier: "Input" }) as any as Schema.Schema<Input>;

export interface EditAtom {
  /** A unique key for this atom. Must be specified when using advanced mapping. */
  key?: string;
  /** List of Input.key values identifying files that should be used in this atom. The listed `inputs` must have the same timeline. */
  inputs?: Array<string>;
  /** End time in seconds for the atom, relative to the input file timeline. When `end_time_offset` is not specified, the `inputs` are used until the end of the atom. */
  endTimeOffset?: string;
  /** Start time in seconds for the atom, relative to the input file timeline. The default is `0s`. */
  startTimeOffset?: string;
}

export const EditAtom: Schema.Schema<EditAtom> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  inputs: Schema.optional(Schema.Array(Schema.String)),
  endTimeOffset: Schema.optional(Schema.String),
  startTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "EditAtom" }) as any as Schema.Schema<EditAtom>;

export interface H264ColorFormatSDR {
}

export const H264ColorFormatSDR: Schema.Schema<H264ColorFormatSDR> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "H264ColorFormatSDR" }) as any as Schema.Schema<H264ColorFormatSDR>;

export interface H264ColorFormatHLG {
}

export const H264ColorFormatHLG: Schema.Schema<H264ColorFormatHLG> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "H264ColorFormatHLG" }) as any as Schema.Schema<H264ColorFormatHLG>;

export interface H264CodecSettings {
  /** The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  widthPixels?: number;
  /** The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  heightPixels?: number;
  /** Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120. */
  frameRate?: number;
  /** Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`. */
  frameRateConversionStrategy?: "FRAME_RATE_CONVERSION_STRATEGY_UNSPECIFIED" | "DOWNSAMPLE" | "DROP_DUPLICATE" | (string & {});
  /** Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000. */
  bitrateBps?: number;
  /** Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format */
  pixelFormat?: string;
  /** Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor */
  rateControlMode?: string;
  /** Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21. */
  crfLevel?: number;
  /** Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`. */
  allowOpenGop?: boolean;
  /** Select the GOP size based on the specified frame count. Must be greater than zero. */
  gopFrameCount?: number;
  /** Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`. */
  gopDuration?: string;
  /** Use two-pass encoding strategy to achieve better video quality. H264CodecSettings.rate_control_mode must be `vbr`. The default is `false`. */
  enableTwoPass?: boolean;
  /** Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to H264CodecSettings.bitrate_bps. */
  vbvSizeBits?: number;
  /** Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H264CodecSettings.vbv_size_bits. */
  vbvFullnessBits?: number;
  /** The entropy coder to use. The default is `cabac`. Supported entropy coders: - `cavlc` - `cabac` */
  entropyCoder?: string;
  /** Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`. */
  bPyramid?: boolean;
  /** The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H264CodecSettings.gop_frame_count if set. The default is 0. */
  bFrameCount?: number;
  /** Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0. */
  aqStrength?: number;
  /** Enforces the specified codec profile. The following profiles are supported: * `baseline` * `main` * `high` (default) The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message. */
  profile?: string;
  /** Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message. */
  tune?: string;
  /** Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Preset). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message. */
  preset?: string;
  /** Optional. SDR color format setting for H264. */
  sdr?: H264ColorFormatSDR;
  /** Optional. HLG color format setting for H264. */
  hlg?: H264ColorFormatHLG;
}

export const H264CodecSettings: Schema.Schema<H264CodecSettings> = Schema.suspend(() => Schema.Struct({
  widthPixels: Schema.optional(Schema.Number),
  heightPixels: Schema.optional(Schema.Number),
  frameRate: Schema.optional(Schema.Number),
  frameRateConversionStrategy: Schema.optional(Schema.String),
  bitrateBps: Schema.optional(Schema.Number),
  pixelFormat: Schema.optional(Schema.String),
  rateControlMode: Schema.optional(Schema.String),
  crfLevel: Schema.optional(Schema.Number),
  allowOpenGop: Schema.optional(Schema.Boolean),
  gopFrameCount: Schema.optional(Schema.Number),
  gopDuration: Schema.optional(Schema.String),
  enableTwoPass: Schema.optional(Schema.Boolean),
  vbvSizeBits: Schema.optional(Schema.Number),
  vbvFullnessBits: Schema.optional(Schema.Number),
  entropyCoder: Schema.optional(Schema.String),
  bPyramid: Schema.optional(Schema.Boolean),
  bFrameCount: Schema.optional(Schema.Number),
  aqStrength: Schema.optional(Schema.Number),
  profile: Schema.optional(Schema.String),
  tune: Schema.optional(Schema.String),
  preset: Schema.optional(Schema.String),
  sdr: Schema.optional(H264ColorFormatSDR),
  hlg: Schema.optional(H264ColorFormatHLG),
})).annotate({ identifier: "H264CodecSettings" }) as any as Schema.Schema<H264CodecSettings>;

export interface H265ColorFormatSDR {
}

export const H265ColorFormatSDR: Schema.Schema<H265ColorFormatSDR> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "H265ColorFormatSDR" }) as any as Schema.Schema<H265ColorFormatSDR>;

export interface H265ColorFormatHLG {
}

export const H265ColorFormatHLG: Schema.Schema<H265ColorFormatHLG> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "H265ColorFormatHLG" }) as any as Schema.Schema<H265ColorFormatHLG>;

export interface H265ColorFormatHDR10 {
}

export const H265ColorFormatHDR10: Schema.Schema<H265ColorFormatHDR10> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "H265ColorFormatHDR10" }) as any as Schema.Schema<H265ColorFormatHDR10>;

export interface H265CodecSettings {
  /** The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  widthPixels?: number;
  /** The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  heightPixels?: number;
  /** Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120. */
  frameRate?: number;
  /** Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`. */
  frameRateConversionStrategy?: "FRAME_RATE_CONVERSION_STRATEGY_UNSPECIFIED" | "DOWNSAMPLE" | "DROP_DUPLICATE" | (string & {});
  /** Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000. */
  bitrateBps?: number;
  /** Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format */
  pixelFormat?: string;
  /** Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor */
  rateControlMode?: string;
  /** Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21. */
  crfLevel?: number;
  /** Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`. */
  allowOpenGop?: boolean;
  /** Select the GOP size based on the specified frame count. Must be greater than zero. */
  gopFrameCount?: number;
  /** Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`. */
  gopDuration?: string;
  /** Use two-pass encoding strategy to achieve better video quality. H265CodecSettings.rate_control_mode must be `vbr`. The default is `false`. */
  enableTwoPass?: boolean;
  /** Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to `VideoStream.bitrate_bps`. */
  vbvSizeBits?: number;
  /** Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H265CodecSettings.vbv_size_bits. */
  vbvFullnessBits?: number;
  /** Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`. */
  bPyramid?: boolean;
  /** The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H265CodecSettings.gop_frame_count if set. The default is 0. */
  bFrameCount?: number;
  /** Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0. */
  aqStrength?: number;
  /** Enforces the specified codec profile. The following profiles are supported: * 8-bit profiles * `main` (default) * `main-intra` * `mainstillpicture` * 10-bit profiles * `main10` (default) * `main10-intra` * `main422-10` * `main422-10-intra` * `main444-10` * `main444-10-intra` * 12-bit profiles * `main12` (default) * `main12-intra` * `main422-12` * `main422-12-intra` * `main444-12` * `main444-12-intra` The available options are [FFmpeg-compatible](https://x265.readthedocs.io/). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message. */
  profile?: string;
  /** Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message. */
  tune?: string;
  /** Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message. */
  preset?: string;
  /** Optional. SDR color format setting for H265. */
  sdr?: H265ColorFormatSDR;
  /** Optional. HLG color format setting for H265. */
  hlg?: H265ColorFormatHLG;
  /** Optional. HDR10 color format setting for H265. */
  hdr10?: H265ColorFormatHDR10;
}

export const H265CodecSettings: Schema.Schema<H265CodecSettings> = Schema.suspend(() => Schema.Struct({
  widthPixels: Schema.optional(Schema.Number),
  heightPixels: Schema.optional(Schema.Number),
  frameRate: Schema.optional(Schema.Number),
  frameRateConversionStrategy: Schema.optional(Schema.String),
  bitrateBps: Schema.optional(Schema.Number),
  pixelFormat: Schema.optional(Schema.String),
  rateControlMode: Schema.optional(Schema.String),
  crfLevel: Schema.optional(Schema.Number),
  allowOpenGop: Schema.optional(Schema.Boolean),
  gopFrameCount: Schema.optional(Schema.Number),
  gopDuration: Schema.optional(Schema.String),
  enableTwoPass: Schema.optional(Schema.Boolean),
  vbvSizeBits: Schema.optional(Schema.Number),
  vbvFullnessBits: Schema.optional(Schema.Number),
  bPyramid: Schema.optional(Schema.Boolean),
  bFrameCount: Schema.optional(Schema.Number),
  aqStrength: Schema.optional(Schema.Number),
  profile: Schema.optional(Schema.String),
  tune: Schema.optional(Schema.String),
  preset: Schema.optional(Schema.String),
  sdr: Schema.optional(H265ColorFormatSDR),
  hlg: Schema.optional(H265ColorFormatHLG),
  hdr10: Schema.optional(H265ColorFormatHDR10),
})).annotate({ identifier: "H265CodecSettings" }) as any as Schema.Schema<H265CodecSettings>;

export interface Vp9ColorFormatSDR {
}

export const Vp9ColorFormatSDR: Schema.Schema<Vp9ColorFormatSDR> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Vp9ColorFormatSDR" }) as any as Schema.Schema<Vp9ColorFormatSDR>;

export interface Vp9ColorFormatHLG {
}

export const Vp9ColorFormatHLG: Schema.Schema<Vp9ColorFormatHLG> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Vp9ColorFormatHLG" }) as any as Schema.Schema<Vp9ColorFormatHLG>;

export interface Vp9CodecSettings {
  /** The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  widthPixels?: number;
  /** The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  heightPixels?: number;
  /** Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120. */
  frameRate?: number;
  /** Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`. */
  frameRateConversionStrategy?: "FRAME_RATE_CONVERSION_STRATEGY_UNSPECIFIED" | "DOWNSAMPLE" | "DROP_DUPLICATE" | (string & {});
  /** Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 480,000,000. */
  bitrateBps?: number;
  /** Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format */
  pixelFormat?: string;
  /** Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate */
  rateControlMode?: string;
  /** Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21. **Note:** This field is not supported. */
  crfLevel?: number;
  /** Select the GOP size based on the specified frame count. Must be greater than zero. */
  gopFrameCount?: number;
  /** Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`. */
  gopDuration?: string;
  /** Enforces the specified codec profile. The following profiles are supported: * `profile0` (default) * `profile1` * `profile2` * `profile3` The available options are [WebM-compatible](https://www.webmproject.org/vp9/profiles/). Note that certain values for this field may cause the transcoder to override other fields you set in the `Vp9CodecSettings` message. */
  profile?: string;
  /** Optional. SDR color format setting for VP9. */
  sdr?: Vp9ColorFormatSDR;
  /** Optional. HLG color format setting for VP9. */
  hlg?: Vp9ColorFormatHLG;
}

export const Vp9CodecSettings: Schema.Schema<Vp9CodecSettings> = Schema.suspend(() => Schema.Struct({
  widthPixels: Schema.optional(Schema.Number),
  heightPixels: Schema.optional(Schema.Number),
  frameRate: Schema.optional(Schema.Number),
  frameRateConversionStrategy: Schema.optional(Schema.String),
  bitrateBps: Schema.optional(Schema.Number),
  pixelFormat: Schema.optional(Schema.String),
  rateControlMode: Schema.optional(Schema.String),
  crfLevel: Schema.optional(Schema.Number),
  gopFrameCount: Schema.optional(Schema.Number),
  gopDuration: Schema.optional(Schema.String),
  profile: Schema.optional(Schema.String),
  sdr: Schema.optional(Vp9ColorFormatSDR),
  hlg: Schema.optional(Vp9ColorFormatHLG),
})).annotate({ identifier: "Vp9CodecSettings" }) as any as Schema.Schema<Vp9CodecSettings>;

export interface VideoStream {
  /** H264 codec settings. */
  h264?: H264CodecSettings;
  /** H265 codec settings. */
  h265?: H265CodecSettings;
  /** VP9 codec settings. */
  vp9?: Vp9CodecSettings;
}

export const VideoStream: Schema.Schema<VideoStream> = Schema.suspend(() => Schema.Struct({
  h264: Schema.optional(H264CodecSettings),
  h265: Schema.optional(H265CodecSettings),
  vp9: Schema.optional(Vp9CodecSettings),
})).annotate({ identifier: "VideoStream" }) as any as Schema.Schema<VideoStream>;

export interface AudioMapping {
  /** Required. The EditAtom.key that references the atom with audio inputs in the JobConfig.edit_list. */
  atomKey?: string;
  /** Required. The Input.key that identifies the input file. */
  inputKey?: string;
  /** Required. The zero-based index of the track in the input file. */
  inputTrack?: number;
  /** Required. The zero-based index of the channel in the input audio stream. */
  inputChannel?: number;
  /** Required. The zero-based index of the channel in the output audio stream. */
  outputChannel?: number;
  /** Audio volume control in dB. Negative values decrease volume, positive values increase. The default is 0. */
  gainDb?: number;
}

export const AudioMapping: Schema.Schema<AudioMapping> = Schema.suspend(() => Schema.Struct({
  atomKey: Schema.optional(Schema.String),
  inputKey: Schema.optional(Schema.String),
  inputTrack: Schema.optional(Schema.Number),
  inputChannel: Schema.optional(Schema.Number),
  outputChannel: Schema.optional(Schema.Number),
  gainDb: Schema.optional(Schema.Number),
})).annotate({ identifier: "AudioMapping" }) as any as Schema.Schema<AudioMapping>;

export interface AudioStream {
  /** The codec for this audio stream. The default is `aac`. Supported audio codecs: - `aac` - `aac-he` - `aac-he-v2` - `mp3` - `ac3` - `eac3` - `vorbis` */
  codec?: string;
  /** Required. Audio bitrate in bits per second. Must be between 1 and 10,000,000. */
  bitrateBps?: number;
  /** Number of audio channels. Must be between 1 and 6. The default is 2. */
  channelCount?: number;
  /** A list of channel names specifying layout of the audio channels. This only affects the metadata embedded in the container headers, if supported by the specified format. The default is `["fl", "fr"]`. Supported channel names: - `fl` - Front left channel - `fr` - Front right channel - `sl` - Side left channel - `sr` - Side right channel - `fc` - Front center channel - `lfe` - Low frequency */
  channelLayout?: Array<string>;
  /** The mapping for the JobConfig.edit_list atoms with audio EditAtom.inputs. */
  mapping?: Array<AudioMapping>;
  /** The audio sample rate in Hertz. The default is 48000 Hertz. */
  sampleRateHertz?: number;
  /** The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files. */
  languageCode?: string;
  /** The name for this particular audio stream that will be added to the HLS/DASH manifest. Not supported in MP4 files. */
  displayName?: string;
}

export const AudioStream: Schema.Schema<AudioStream> = Schema.suspend(() => Schema.Struct({
  codec: Schema.optional(Schema.String),
  bitrateBps: Schema.optional(Schema.Number),
  channelCount: Schema.optional(Schema.Number),
  channelLayout: Schema.optional(Schema.Array(Schema.String)),
  mapping: Schema.optional(Schema.Array(AudioMapping)),
  sampleRateHertz: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "AudioStream" }) as any as Schema.Schema<AudioStream>;

export interface TextMapping {
  /** Required. The EditAtom.key that references atom with text inputs in the JobConfig.edit_list. */
  atomKey?: string;
  /** Required. The Input.key that identifies the input file. */
  inputKey?: string;
  /** Required. The zero-based index of the track in the input file. */
  inputTrack?: number;
}

export const TextMapping: Schema.Schema<TextMapping> = Schema.suspend(() => Schema.Struct({
  atomKey: Schema.optional(Schema.String),
  inputKey: Schema.optional(Schema.String),
  inputTrack: Schema.optional(Schema.Number),
})).annotate({ identifier: "TextMapping" }) as any as Schema.Schema<TextMapping>;

export interface TextStream {
  /** The codec for this text stream. The default is `webvtt`. Supported text codecs: - `srt` - `ttml` - `cea608` - `cea708` - `webvtt` */
  codec?: string;
  /** The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files. */
  languageCode?: string;
  /** The mapping for the JobConfig.edit_list atoms with text EditAtom.inputs. */
  mapping?: Array<TextMapping>;
  /** The name for this particular text stream that will be added to the HLS/DASH manifest. Not supported in MP4 files. */
  displayName?: string;
}

export const TextStream: Schema.Schema<TextStream> = Schema.suspend(() => Schema.Struct({
  codec: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  mapping: Schema.optional(Schema.Array(TextMapping)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "TextStream" }) as any as Schema.Schema<TextStream>;

export interface ElementaryStream {
  /** A unique key for this elementary stream. */
  key?: string;
  /** Encoding of a video stream. */
  videoStream?: VideoStream;
  /** Encoding of an audio stream. */
  audioStream?: AudioStream;
  /** Encoding of a text stream. For example, closed captions or subtitles. */
  textStream?: TextStream;
}

export const ElementaryStream: Schema.Schema<ElementaryStream> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  videoStream: Schema.optional(VideoStream),
  audioStream: Schema.optional(AudioStream),
  textStream: Schema.optional(TextStream),
})).annotate({ identifier: "ElementaryStream" }) as any as Schema.Schema<ElementaryStream>;

export interface SegmentSettings {
  /** Duration of the segments in seconds. The default is `6.0s`. Note that `segmentDuration` must be greater than or equal to [`gopDuration`](#videostream), and `segmentDuration` must be divisible by [`gopDuration`](#videostream). */
  segmentDuration?: string;
  /** Required. Create an individual segment file. The default is `false`. */
  individualSegments?: boolean;
}

export const SegmentSettings: Schema.Schema<SegmentSettings> = Schema.suspend(() => Schema.Struct({
  segmentDuration: Schema.optional(Schema.String),
  individualSegments: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SegmentSettings" }) as any as Schema.Schema<SegmentSettings>;

export interface Fmp4Config {
  /** Optional. Specify the codec tag string that will be used in the media bitstream. When not specified, the codec appropriate value is used. Supported H265 codec tags: - `hvc1` (default) - `hev1` */
  codecTag?: string;
}

export const Fmp4Config: Schema.Schema<Fmp4Config> = Schema.suspend(() => Schema.Struct({
  codecTag: Schema.optional(Schema.String),
})).annotate({ identifier: "Fmp4Config" }) as any as Schema.Schema<Fmp4Config>;

export interface MuxStream {
  /** A unique key for this multiplexed stream. */
  key?: string;
  /** The name of the generated file. The default is MuxStream.key with the extension suffix corresponding to the MuxStream.container. Individual segments also have an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `mux_stream0000000123.ts`. */
  fileName?: string;
  /** The container format. The default is `mp4` Supported streaming formats: - `ts` - `fmp4`- the corresponding file extension is `.m4s` Supported standalone file formats: - `mp4` - `mp3` - `ogg` - `vtt` See also: [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats) */
  container?: string;
  /** List of ElementaryStream.key values multiplexed in this stream. */
  elementaryStreams?: Array<string>;
  /** Segment settings for `ts`, `fmp4` and `vtt`. */
  segmentSettings?: SegmentSettings;
  /** Identifier of the encryption configuration to use. If omitted, output will be unencrypted. */
  encryptionId?: string;
  /** Optional. `fmp4` container configuration. */
  fmp4?: Fmp4Config;
}

export const MuxStream: Schema.Schema<MuxStream> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  fileName: Schema.optional(Schema.String),
  container: Schema.optional(Schema.String),
  elementaryStreams: Schema.optional(Schema.Array(Schema.String)),
  segmentSettings: Schema.optional(SegmentSettings),
  encryptionId: Schema.optional(Schema.String),
  fmp4: Schema.optional(Fmp4Config),
})).annotate({ identifier: "MuxStream" }) as any as Schema.Schema<MuxStream>;

export interface DashConfig {
  /** The segment reference scheme for a `DASH` manifest. The default is `SEGMENT_LIST`. */
  segmentReferenceScheme?: "SEGMENT_REFERENCE_SCHEME_UNSPECIFIED" | "SEGMENT_LIST" | "SEGMENT_TEMPLATE_NUMBER" | (string & {});
}

export const DashConfig: Schema.Schema<DashConfig> = Schema.suspend(() => Schema.Struct({
  segmentReferenceScheme: Schema.optional(Schema.String),
})).annotate({ identifier: "DashConfig" }) as any as Schema.Schema<DashConfig>;

export interface Manifest {
  /** The name of the generated file. The default is `manifest` with the extension suffix corresponding to the Manifest.type. */
  fileName?: string;
  /** Required. Type of the manifest. */
  type?: "MANIFEST_TYPE_UNSPECIFIED" | "HLS" | "DASH" | (string & {});
  /** Required. List of user supplied MuxStream.key values that should appear in this manifest. When Manifest.type is `HLS`, a media manifest with name MuxStream.key and `.m3u8` extension is generated for each element in this list. */
  muxStreams?: Array<string>;
  /** `DASH` manifest configuration. */
  dash?: DashConfig;
}

export const Manifest: Schema.Schema<Manifest> = Schema.suspend(() => Schema.Struct({
  fileName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  muxStreams: Schema.optional(Schema.Array(Schema.String)),
  dash: Schema.optional(DashConfig),
})).annotate({ identifier: "Manifest" }) as any as Schema.Schema<Manifest>;

export interface Output {
  /** URI for the output file(s). For example, `gs://my-bucket/outputs/`. Must be a directory and not a top-level bucket. If empty, the value is populated from Job.output_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats). */
  uri?: string;
}

export const Output: Schema.Schema<Output> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "Output" }) as any as Schema.Schema<Output>;

export interface AdBreak {
  /** Start time in seconds for the ad break, relative to the output file timeline. The default is `0s`. */
  startTimeOffset?: string;
}

export const AdBreak: Schema.Schema<AdBreak> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "AdBreak" }) as any as Schema.Schema<AdBreak>;

export interface PubsubDestination {
  /** The name of the Pub/Sub topic to publish job completion notification to. For example: `projects/{project}/topics/{topic}`. */
  topic?: string;
}

export const PubsubDestination: Schema.Schema<PubsubDestination> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubDestination" }) as any as Schema.Schema<PubsubDestination>;

export interface SpriteSheet {
  /** Format type. The default is `jpeg`. Supported formats: - `jpeg` */
  format?: string;
  /** Required. File name prefix for the generated sprite sheets. Each sprite sheet has an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `sprite_sheet0000000123.jpeg`. */
  filePrefix?: string;
  /** Required. The width of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_width_pixels field or the SpriteSheet.sprite_height_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  spriteWidthPixels?: number;
  /** Required. The height of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_height_pixels field or the SpriteSheet.sprite_width_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output. */
  spriteHeightPixels?: number;
  /** The maximum number of sprites per row in a sprite sheet. The default is 0, which indicates no maximum limit. */
  columnCount?: number;
  /** The maximum number of rows per sprite sheet. When the sprite sheet is full, a new sprite sheet is created. The default is 0, which indicates no maximum limit. */
  rowCount?: number;
  /** Start time in seconds, relative to the output file timeline. Determines the first sprite to pick. The default is `0s`. */
  startTimeOffset?: string;
  /** End time in seconds, relative to the output file timeline. When `end_time_offset` is not specified, the sprites are generated until the end of the output file. */
  endTimeOffset?: string;
  /** Total number of sprites. Create the specified number of sprites distributed evenly across the timeline of the output media. The default is 100. */
  totalCount?: number;
  /** Starting from `0s`, create sprites at regular intervals. Specify the interval value in seconds. */
  interval?: string;
  /** The quality of the generated sprite sheet. Enter a value between 1 and 100, where 1 is the lowest quality and 100 is the highest quality. The default is 100. A high quality value corresponds to a low image data compression ratio. */
  quality?: number;
}

export const SpriteSheet: Schema.Schema<SpriteSheet> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  filePrefix: Schema.optional(Schema.String),
  spriteWidthPixels: Schema.optional(Schema.Number),
  spriteHeightPixels: Schema.optional(Schema.Number),
  columnCount: Schema.optional(Schema.Number),
  rowCount: Schema.optional(Schema.Number),
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
  totalCount: Schema.optional(Schema.Number),
  interval: Schema.optional(Schema.String),
  quality: Schema.optional(Schema.Number),
})).annotate({ identifier: "SpriteSheet" }) as any as Schema.Schema<SpriteSheet>;

export interface NormalizedCoordinate {
  /** Normalized x coordinate. */
  x?: number;
  /** Normalized y coordinate. */
  y?: number;
}

export const NormalizedCoordinate: Schema.Schema<NormalizedCoordinate> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "NormalizedCoordinate" }) as any as Schema.Schema<NormalizedCoordinate>;

export interface Image {
  /** Required. URI of the image in Cloud Storage. For example, `gs://bucket/inputs/image.png`. Only PNG and JPEG images are supported. */
  uri?: string;
  /** Normalized image resolution, based on output video resolution. Valid values: `0.0`–`1.0`. To respect the original image aspect ratio, set either `x` or `y` to `0.0`. To use the original image resolution, set both `x` and `y` to `0.0`. */
  resolution?: NormalizedCoordinate;
  /** Target image opacity. Valid values are from `1.0` (solid, default) to `0.0` (transparent), exclusive. Set this to a value greater than `0.0`. */
  alpha?: number;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  resolution: Schema.optional(NormalizedCoordinate),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface AnimationStatic {
  /** Normalized coordinates based on output video resolution. Valid values: `0.0`–`1.0`. `xy` is the upper-left coordinate of the overlay object. For example, use the x and y coordinates {0,0} to position the top-left corner of the overlay animation in the top-left corner of the output video. */
  xy?: NormalizedCoordinate;
  /** The time to start displaying the overlay object, in seconds. Default: 0 */
  startTimeOffset?: string;
}

export const AnimationStatic: Schema.Schema<AnimationStatic> = Schema.suspend(() => Schema.Struct({
  xy: Schema.optional(NormalizedCoordinate),
  startTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "AnimationStatic" }) as any as Schema.Schema<AnimationStatic>;

export interface AnimationFade {
  /** Required. Type of fade animation: `FADE_IN` or `FADE_OUT`. */
  fadeType?: "FADE_TYPE_UNSPECIFIED" | "FADE_IN" | "FADE_OUT" | (string & {});
  /** Normalized coordinates based on output video resolution. Valid values: `0.0`–`1.0`. `xy` is the upper-left coordinate of the overlay object. For example, use the x and y coordinates {0,0} to position the top-left corner of the overlay animation in the top-left corner of the output video. */
  xy?: NormalizedCoordinate;
  /** The time to start the fade animation, in seconds. Default: 0 */
  startTimeOffset?: string;
  /** The time to end the fade animation, in seconds. Default: `start_time_offset` + 1s */
  endTimeOffset?: string;
}

export const AnimationFade: Schema.Schema<AnimationFade> = Schema.suspend(() => Schema.Struct({
  fadeType: Schema.optional(Schema.String),
  xy: Schema.optional(NormalizedCoordinate),
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "AnimationFade" }) as any as Schema.Schema<AnimationFade>;

export interface AnimationEnd {
  /** The time to end overlay object, in seconds. Default: 0 */
  startTimeOffset?: string;
}

export const AnimationEnd: Schema.Schema<AnimationEnd> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "AnimationEnd" }) as any as Schema.Schema<AnimationEnd>;

export interface Animation {
  /** Display static overlay object. */
  animationStatic?: AnimationStatic;
  /** Display overlay object with fade animation. */
  animationFade?: AnimationFade;
  /** End previous animation. */
  animationEnd?: AnimationEnd;
}

export const Animation: Schema.Schema<Animation> = Schema.suspend(() => Schema.Struct({
  animationStatic: Schema.optional(AnimationStatic),
  animationFade: Schema.optional(AnimationFade),
  animationEnd: Schema.optional(AnimationEnd),
})).annotate({ identifier: "Animation" }) as any as Schema.Schema<Animation>;

export interface Overlay {
  /** Image overlay. */
  image?: Image;
  /** List of animations. The list should be chronological, without any time overlap. */
  animations?: Array<Animation>;
}

export const Overlay: Schema.Schema<Overlay> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Image),
  animations: Schema.optional(Schema.Array(Animation)),
})).annotate({ identifier: "Overlay" }) as any as Schema.Schema<Overlay>;

export interface Aes128Encryption {
}

export const Aes128Encryption: Schema.Schema<Aes128Encryption> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Aes128Encryption" }) as any as Schema.Schema<Aes128Encryption>;

export interface SampleAesEncryption {
}

export const SampleAesEncryption: Schema.Schema<SampleAesEncryption> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SampleAesEncryption" }) as any as Schema.Schema<SampleAesEncryption>;

export interface MpegCommonEncryption {
  /** Required. Specify the encryption scheme. Supported encryption schemes: - `cenc` - `cbcs` */
  scheme?: string;
}

export const MpegCommonEncryption: Schema.Schema<MpegCommonEncryption> = Schema.suspend(() => Schema.Struct({
  scheme: Schema.optional(Schema.String),
})).annotate({ identifier: "MpegCommonEncryption" }) as any as Schema.Schema<MpegCommonEncryption>;

export interface SecretManagerSource {
  /** Required. The name of the Secret Version containing the encryption key in the following format: `projects/{project}/secrets/{secret_id}/versions/{version_number}` Note that only numbered versions are supported. Aliases like "latest" are not supported. */
  secretVersion?: string;
}

export const SecretManagerSource: Schema.Schema<SecretManagerSource> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretManagerSource" }) as any as Schema.Schema<SecretManagerSource>;

export interface Widevine {
}

export const Widevine: Schema.Schema<Widevine> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Widevine" }) as any as Schema.Schema<Widevine>;

export interface Fairplay {
}

export const Fairplay: Schema.Schema<Fairplay> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Fairplay" }) as any as Schema.Schema<Fairplay>;

export interface Playready {
}

export const Playready: Schema.Schema<Playready> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Playready" }) as any as Schema.Schema<Playready>;

export interface Clearkey {
}

export const Clearkey: Schema.Schema<Clearkey> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Clearkey" }) as any as Schema.Schema<Clearkey>;

export interface DrmSystems {
  /** Widevine configuration. */
  widevine?: Widevine;
  /** Fairplay configuration. */
  fairplay?: Fairplay;
  /** Playready configuration. */
  playready?: Playready;
  /** Clearkey configuration. */
  clearkey?: Clearkey;
}

export const DrmSystems: Schema.Schema<DrmSystems> = Schema.suspend(() => Schema.Struct({
  widevine: Schema.optional(Widevine),
  fairplay: Schema.optional(Fairplay),
  playready: Schema.optional(Playready),
  clearkey: Schema.optional(Clearkey),
})).annotate({ identifier: "DrmSystems" }) as any as Schema.Schema<DrmSystems>;

export interface Encryption {
  /** Required. Identifier for this set of encryption options. */
  id?: string;
  /** Configuration for AES-128 encryption. */
  aes128?: Aes128Encryption;
  /** Configuration for SAMPLE-AES encryption. */
  sampleAes?: SampleAesEncryption;
  /** Configuration for MPEG Common Encryption (MPEG-CENC). */
  mpegCenc?: MpegCommonEncryption;
  /** Keys are stored in Google Secret Manager. */
  secretManagerKeySource?: SecretManagerSource;
  /** Required. DRM system(s) to use; at least one must be specified. If a DRM system is omitted, it is considered disabled. */
  drmSystems?: DrmSystems;
}

export const Encryption: Schema.Schema<Encryption> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  aes128: Schema.optional(Aes128Encryption),
  sampleAes: Schema.optional(SampleAesEncryption),
  mpegCenc: Schema.optional(MpegCommonEncryption),
  secretManagerKeySource: Schema.optional(SecretManagerSource),
  drmSystems: Schema.optional(DrmSystems),
})).annotate({ identifier: "Encryption" }) as any as Schema.Schema<Encryption>;

export interface JobConfig {
  /** List of input assets stored in Cloud Storage. */
  inputs?: Array<Input>;
  /** List of edit atoms. Defines the ultimate timeline of the resulting file or manifest. */
  editList?: Array<EditAtom>;
  /** List of elementary streams. */
  elementaryStreams?: Array<ElementaryStream>;
  /** List of multiplexing settings for output streams. */
  muxStreams?: Array<MuxStream>;
  /** List of output manifests. */
  manifests?: Array<Manifest>;
  /** Output configuration. */
  output?: Output;
  /** List of ad breaks. Specifies where to insert ad break tags in the output manifests. */
  adBreaks?: Array<AdBreak>;
  /** Destination on Pub/Sub. */
  pubsubDestination?: PubsubDestination;
  /** List of output sprite sheets. Spritesheets require at least one VideoStream in the Jobconfig. */
  spriteSheets?: Array<SpriteSheet>;
  /** List of overlays on the output video, in descending Z-order. */
  overlays?: Array<Overlay>;
  /** List of encryption configurations for the content. Each configuration has an ID. Specify this ID in the MuxStream.encryption_id field to indicate the configuration to use for that `MuxStream` output. */
  encryptions?: Array<Encryption>;
}

export const JobConfig: Schema.Schema<JobConfig> = Schema.suspend(() => Schema.Struct({
  inputs: Schema.optional(Schema.Array(Input)),
  editList: Schema.optional(Schema.Array(EditAtom)),
  elementaryStreams: Schema.optional(Schema.Array(ElementaryStream)),
  muxStreams: Schema.optional(Schema.Array(MuxStream)),
  manifests: Schema.optional(Schema.Array(Manifest)),
  output: Schema.optional(Output),
  adBreaks: Schema.optional(Schema.Array(AdBreak)),
  pubsubDestination: Schema.optional(PubsubDestination),
  spriteSheets: Schema.optional(Schema.Array(SpriteSheet)),
  overlays: Schema.optional(Schema.Array(Overlay)),
  encryptions: Schema.optional(Schema.Array(Encryption)),
})).annotate({ identifier: "JobConfig" }) as any as Schema.Schema<JobConfig>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Job {
  /** The resource name of the job. Format: `projects/{project_number}/locations/{location}/jobs/{job}` */
  name?: string;
  /** Input only. Specify the `input_uri` to populate empty `uri` fields in each element of `Job.config.inputs` or `JobTemplate.config.inputs` when using template. URI of the media. Input files must be at least 5 seconds in duration and stored in Cloud Storage (for example, `gs://bucket/inputs/file.mp4`). See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats). */
  inputUri?: string;
  /** Input only. Specify the `output_uri` to populate an empty `Job.config.output.uri` or `JobTemplate.config.output.uri` when using template. URI for the output file(s). For example, `gs://my-bucket/outputs/`. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats). */
  outputUri?: string;
  /** Input only. Specify the `template_id` to use for populating `Job.config`. The default is `preset/web-hd`, which is the only supported preset. User defined JobTemplate: `{job_template_id}` */
  templateId?: string;
  /** The configuration for this job. */
  config?: JobConfig;
  /** Output only. The current state of the job. */
  state?: "PROCESSING_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. The time the job was created. */
  createTime?: string;
  /** Output only. The time the transcoding started. */
  startTime?: string;
  /** Output only. The time the transcoding finished. */
  endTime?: string;
  /** Job time to live value in days, which will be effective after job completion. Job should be deleted automatically after the given TTL. Enter a value between 1 and 90. The default is 30. */
  ttlAfterCompletionDays?: number;
  /** The labels associated with this job. You can use these to organize and group your jobs. */
  labels?: Record<string, string>;
  /** Output only. An error object that describes the reason for the failure. This property is always present when ProcessingState is `FAILED`. */
  error?: Status;
  /** The processing mode of the job. The default is `PROCESSING_MODE_INTERACTIVE`. */
  mode?: "PROCESSING_MODE_UNSPECIFIED" | "PROCESSING_MODE_INTERACTIVE" | "PROCESSING_MODE_BATCH" | (string & {});
  /** The processing priority of a batch job. This field can only be set for batch mode jobs. The default value is 0. This value cannot be negative. Higher values correspond to higher priorities for the job. */
  batchModePriority?: number;
  /** Optional. The optimization strategy of the job. The default is `AUTODETECT`. */
  optimization?: "OPTIMIZATION_STRATEGY_UNSPECIFIED" | "AUTODETECT" | "DISABLED" | (string & {});
  /** Optional. Insert silence and duplicate frames when timestamp gaps are detected in a given stream. */
  fillContentGaps?: boolean;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inputUri: Schema.optional(Schema.String),
  outputUri: Schema.optional(Schema.String),
  templateId: Schema.optional(Schema.String),
  config: Schema.optional(JobConfig),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  ttlAfterCompletionDays: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  error: Schema.optional(Status),
  mode: Schema.optional(Schema.String),
  batchModePriority: Schema.optional(Schema.Number),
  optimization: Schema.optional(Schema.String),
  fillContentGaps: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** List of jobs in the specified region. */
  jobs?: Array<Job>;
  /** The pagination token. */
  nextPageToken?: string;
  /** List of regions that could not be reached. */
  unreachable?: Array<string>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface JobTemplate {
  /** The resource name of the job template. Format: `projects/{project_number}/locations/{location}/jobTemplates/{job_template}` */
  name?: string;
  /** The configuration for this template. */
  config?: JobConfig;
  /** The labels associated with this job template. You can use these to organize and group your job templates. */
  labels?: Record<string, string>;
}

export const JobTemplate: Schema.Schema<JobTemplate> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  config: Schema.optional(JobConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "JobTemplate" }) as any as Schema.Schema<JobTemplate>;

export interface ListJobTemplatesResponse {
  /** List of job templates in the specified region. */
  jobTemplates?: Array<JobTemplate>;
  /** The pagination token. */
  nextPageToken?: string;
  /** List of regions that could not be reached. */
  unreachable?: Array<string>;
}

export const ListJobTemplatesResponse: Schema.Schema<ListJobTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  jobTemplates: Schema.optional(Schema.Array(JobTemplate)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListJobTemplatesResponse" }) as any as Schema.Schema<ListJobTemplatesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a job in the specified region. */
export interface CreateProjectsLocationsJobsRequest {
  /** Required. The parent location to create and process this job. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Request body */
  body?: Job;
}

export const CreateProjectsLocationsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsJobsRequest>;

export type CreateProjectsLocationsJobsResponse = Job;
export const CreateProjectsLocationsJobsResponse = Job;

export type CreateProjectsLocationsJobsError = CommonErrors;

export const createProjectsLocationsJobs: API.OperationMethod<CreateProjectsLocationsJobsRequest, CreateProjectsLocationsJobsResponse, CreateProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsJobsRequest,
  output: CreateProjectsLocationsJobsResponse,
  errors: [],
}));

/** Lists jobs in the specified region. */
export interface ListProjectsLocationsJobsRequest {
  /** Required. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous List request, if any. */
  pageToken?: string;
  /** The filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
}

export const ListProjectsLocationsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobsRequest>;

export type ListProjectsLocationsJobsResponse = ListJobsResponse;
export const ListProjectsLocationsJobsResponse = ListJobsResponse;

export type ListProjectsLocationsJobsError = CommonErrors;

export const listProjectsLocationsJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsJobsRequest,
  output: ListProjectsLocationsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the job data. */
export interface GetProjectsLocationsJobsRequest {
  /** Required. The name of the job to retrieve. Format: `projects/{project}/locations/{location}/jobs/{job}` */
  name: string;
}

export const GetProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsJobsRequest>;

export type GetProjectsLocationsJobsResponse = Job;
export const GetProjectsLocationsJobsResponse = Job;

export type GetProjectsLocationsJobsError = CommonErrors;

export const getProjectsLocationsJobs: API.OperationMethod<GetProjectsLocationsJobsRequest, GetProjectsLocationsJobsResponse, GetProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsJobsRequest,
  output: GetProjectsLocationsJobsResponse,
  errors: [],
}));

/** Deletes a job. */
export interface DeleteProjectsLocationsJobsRequest {
  /** Required. The name of the job to delete. Format: `projects/{project}/locations/{location}/jobs/{job}` */
  name: string;
  /** If set to true, and the job is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsJobsRequest>;

export type DeleteProjectsLocationsJobsResponse = Empty;
export const DeleteProjectsLocationsJobsResponse = Empty;

export type DeleteProjectsLocationsJobsError = CommonErrors;

export const deleteProjectsLocationsJobs: API.OperationMethod<DeleteProjectsLocationsJobsRequest, DeleteProjectsLocationsJobsResponse, DeleteProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsJobsRequest,
  output: DeleteProjectsLocationsJobsResponse,
  errors: [],
}));

/** Creates a job template in the specified region. */
export interface CreateProjectsLocationsJobTemplatesRequest {
  /** Required. The parent location to create this job template. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** Required. The ID to use for the job template, which will become the final component of the job template's resource name. This value should be 4-63 characters, and valid characters must match the regular expression `a-zA-Z*`. */
  jobTemplateId?: string;
  /** Request body */
  body?: JobTemplate;
}

export const CreateProjectsLocationsJobTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  jobTemplateId: Schema.optional(Schema.String).pipe(T.HttpQuery("jobTemplateId")),
  body: Schema.optional(JobTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsJobTemplatesRequest>;

export type CreateProjectsLocationsJobTemplatesResponse = JobTemplate;
export const CreateProjectsLocationsJobTemplatesResponse = JobTemplate;

export type CreateProjectsLocationsJobTemplatesError = CommonErrors;

export const createProjectsLocationsJobTemplates: API.OperationMethod<CreateProjectsLocationsJobTemplatesRequest, CreateProjectsLocationsJobTemplatesResponse, CreateProjectsLocationsJobTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsJobTemplatesRequest,
  output: CreateProjectsLocationsJobTemplatesResponse,
  errors: [],
}));

/** Lists job templates in the specified region. */
export interface ListProjectsLocationsJobTemplatesRequest {
  /** Required. The parent location from which to retrieve the collection of job templates. Format: `projects/{project}/locations/{location}` */
  parent: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The `next_page_token` value returned from a previous List request, if any. */
  pageToken?: string;
  /** The filter expression, following the syntax outlined in https://google.aip.dev/160. */
  filter?: string;
  /** One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. */
  orderBy?: string;
}

export const ListProjectsLocationsJobTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobTemplatesRequest>;

export type ListProjectsLocationsJobTemplatesResponse = ListJobTemplatesResponse;
export const ListProjectsLocationsJobTemplatesResponse = ListJobTemplatesResponse;

export type ListProjectsLocationsJobTemplatesError = CommonErrors;

export const listProjectsLocationsJobTemplates = API.makePaginated(() => ({
  input: ListProjectsLocationsJobTemplatesRequest,
  output: ListProjectsLocationsJobTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the job template data. */
export interface GetProjectsLocationsJobTemplatesRequest {
  /** Required. The name of the job template to retrieve. Format: `projects/{project}/locations/{location}/jobTemplates/{job_template}` */
  name: string;
}

export const GetProjectsLocationsJobTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobTemplates/{jobTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsJobTemplatesRequest>;

export type GetProjectsLocationsJobTemplatesResponse = JobTemplate;
export const GetProjectsLocationsJobTemplatesResponse = JobTemplate;

export type GetProjectsLocationsJobTemplatesError = CommonErrors;

export const getProjectsLocationsJobTemplates: API.OperationMethod<GetProjectsLocationsJobTemplatesRequest, GetProjectsLocationsJobTemplatesResponse, GetProjectsLocationsJobTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsJobTemplatesRequest,
  output: GetProjectsLocationsJobTemplatesResponse,
  errors: [],
}));

/** Deletes a job template. */
export interface DeleteProjectsLocationsJobTemplatesRequest {
  /** Required. The name of the job template to delete. `projects/{project}/locations/{location}/jobTemplates/{job_template}` */
  name: string;
  /** If set to true, and the job template is not found, the request will succeed but no action will be taken on the server. */
  allowMissing?: boolean;
}

export const DeleteProjectsLocationsJobTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/jobTemplates/{jobTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsJobTemplatesRequest>;

export type DeleteProjectsLocationsJobTemplatesResponse = Empty;
export const DeleteProjectsLocationsJobTemplatesResponse = Empty;

export type DeleteProjectsLocationsJobTemplatesError = CommonErrors;

export const deleteProjectsLocationsJobTemplates: API.OperationMethod<DeleteProjectsLocationsJobTemplatesRequest, DeleteProjectsLocationsJobTemplatesResponse, DeleteProjectsLocationsJobTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsJobTemplatesRequest,
  output: DeleteProjectsLocationsJobTemplatesResponse,
  errors: [],
}));

