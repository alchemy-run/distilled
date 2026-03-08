// ==========================================================================
// Campaign Manager 360 API (dfareporting v3.5)
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
  name: "dfareporting",
  version: "v3.5",
  rootUrl: "https://dfareporting.googleapis.com/",
  servicePath: "dfareporting/v3.5/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface CreativeClickThroughUrl {
  /** Custom click-through URL. Applicable if the landingPageId field is left unset. */
  customClickThroughUrl?: string;
  /** Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field. */
  computedClickThroughUrl?: string;
  /** ID of the landing page for the click-through URL. */
  landingPageId?: string;
}

export const CreativeClickThroughUrl: Schema.Schema<CreativeClickThroughUrl> =
  Schema.suspend(() =>
    Schema.Struct({
      customClickThroughUrl: Schema.optional(Schema.String),
      computedClickThroughUrl: Schema.optional(Schema.String),
      landingPageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreativeClickThroughUrl",
  }) as any as Schema.Schema<CreativeClickThroughUrl>;

export interface OffsetPosition {
  /** Offset distance from top side of an asset or a window. */
  top?: number;
  /** Offset distance from left side of an asset or a window. */
  left?: number;
}

export const OffsetPosition: Schema.Schema<OffsetPosition> = Schema.suspend(
  () =>
    Schema.Struct({
      top: Schema.optional(Schema.Number),
      left: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "OffsetPosition",
}) as any as Schema.Schema<OffsetPosition>;

export interface Size {
  /** IAB standard size. This is a read-only, auto-generated field. */
  iab?: boolean;
  /** ID of this size. This is a read-only, auto-generated field. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#size". */
  kind?: string;
  /** Height of this size. Acceptable values are 0 to 32767, inclusive. */
  height?: number;
  /** Width of this size. Acceptable values are 0 to 32767, inclusive. */
  width?: number;
}

export const Size: Schema.Schema<Size> = Schema.suspend(() =>
  Schema.Struct({
    iab: Schema.optional(Schema.Boolean),
    id: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    height: Schema.optional(Schema.Number),
    width: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Size" }) as any as Schema.Schema<Size>;

export interface PopupWindowProperties {
  /** Whether to display the browser scroll bar. */
  showScrollBar?: boolean;
  /** Upper-left corner coordinates of the popup window. Applicable if positionType is COORDINATES. */
  offset?: OffsetPosition;
  /** Whether to display the browser status bar. */
  showStatusBar?: boolean;
  /** Popup window position either centered or at specific coordinate. */
  positionType?: "CENTER" | "COORDINATES" | (string & {});
  /** Whether to display the browser menu bar. */
  showMenuBar?: boolean;
  /** Popup dimension for a creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA and all VPAID */
  dimension?: Size;
  /** Title of popup window. */
  title?: string;
  /** Whether to display the browser tool bar. */
  showToolBar?: boolean;
  /** Whether to display the browser address bar. */
  showAddressBar?: boolean;
}

export const PopupWindowProperties: Schema.Schema<PopupWindowProperties> =
  Schema.suspend(() =>
    Schema.Struct({
      showScrollBar: Schema.optional(Schema.Boolean),
      offset: Schema.optional(OffsetPosition),
      showStatusBar: Schema.optional(Schema.Boolean),
      positionType: Schema.optional(Schema.String),
      showMenuBar: Schema.optional(Schema.Boolean),
      dimension: Schema.optional(Size),
      title: Schema.optional(Schema.String),
      showToolBar: Schema.optional(Schema.Boolean),
      showAddressBar: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PopupWindowProperties",
  }) as any as Schema.Schema<PopupWindowProperties>;

export interface CreativeCustomEvent {
  /** Exit click-through URL for the event. This field is used only for exit events. */
  exitClickThroughUrl?: CreativeClickThroughUrl;
  /** User-entered name for the event. */
  advertiserCustomEventName?: string;
  /** ID of this event. This is a required field and should not be modified after insertion. */
  id?: string;
  /** Properties for rich media popup windows. This field is used only for exit events. */
  popupWindowProperties?: PopupWindowProperties;
  /** Artwork type used by the creative.This is a read-only field. */
  artworkType?:
    | "ARTWORK_TYPE_FLASH"
    | "ARTWORK_TYPE_HTML5"
    | "ARTWORK_TYPE_MIXED"
    | "ARTWORK_TYPE_IMAGE"
    | (string & {});
  /** Target type used by the event. */
  targetType?:
    | "TARGET_BLANK"
    | "TARGET_TOP"
    | "TARGET_SELF"
    | "TARGET_PARENT"
    | "TARGET_POPUP"
    | (string & {});
  /** Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion. */
  artworkLabel?: string;
  /** Unique ID of this event used by Reporting and Data Transfer. This is a read-only field. */
  advertiserCustomEventId?: string;
  /** Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field. */
  videoReportingId?: string;
  /** Type of the event. This is a read-only field. */
  advertiserCustomEventType?:
    | "ADVERTISER_EVENT_TIMER"
    | "ADVERTISER_EVENT_EXIT"
    | "ADVERTISER_EVENT_COUNTER"
    | (string & {});
}

export const CreativeCustomEvent: Schema.Schema<CreativeCustomEvent> =
  Schema.suspend(() =>
    Schema.Struct({
      exitClickThroughUrl: Schema.optional(CreativeClickThroughUrl),
      advertiserCustomEventName: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      popupWindowProperties: Schema.optional(PopupWindowProperties),
      artworkType: Schema.optional(Schema.String),
      targetType: Schema.optional(Schema.String),
      artworkLabel: Schema.optional(Schema.String),
      advertiserCustomEventId: Schema.optional(Schema.String),
      videoReportingId: Schema.optional(Schema.String),
      advertiserCustomEventType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreativeCustomEvent",
  }) as any as Schema.Schema<CreativeCustomEvent>;

export interface CreativeAssetId {
  /** Type of asset to upload. This is a required field. FLASH and IMAGE are no longer supported for new uploads. All image assets should use HTML_IMAGE. */
  type?:
    | "IMAGE"
    | "FLASH"
    | "VIDEO"
    | "HTML"
    | "HTML_IMAGE"
    | "AUDIO"
    | (string & {});
  /** Name of the creative asset. This is a required field while inserting an asset. After insertion, this assetIdentifier is used to identify the uploaded asset. Characters in the name must be alphanumeric or one of the following: ".-_ ". Spaces are allowed. */
  name?: string;
}

export const CreativeAssetId: Schema.Schema<CreativeAssetId> = Schema.suspend(
  () =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CreativeAssetId",
}) as any as Schema.Schema<CreativeAssetId>;

export interface ClickTag {
  /** Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY creative assets, this field must match the value of the creative asset's creativeAssetId.name field. */
  name?: string;
  /** Advertiser event name associated with the click tag. This field is used by DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. */
  eventName?: string;
  /** Parameter value for the specified click tag. This field contains a click-through url. */
  clickThroughUrl?: CreativeClickThroughUrl;
}

export const ClickTag: Schema.Schema<ClickTag> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    eventName: Schema.optional(Schema.String),
    clickThroughUrl: Schema.optional(CreativeClickThroughUrl),
  }),
).annotate({ identifier: "ClickTag" }) as any as Schema.Schema<ClickTag>;

export interface DimensionValue {
  /** The kind of resource this is, in this case dfareporting#dimensionValue. */
  kind?: string;
  /** Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT. */
  matchType?:
    | "EXACT"
    | "BEGINS_WITH"
    | "CONTAINS"
    | "WILDCARD_EXPRESSION"
    | (string & {});
  /** The ID associated with the value if available. */
  id?: string;
  /** The name of the dimension. */
  dimensionName?: string;
  /** The value of the dimension. */
  value?: string;
  /** The eTag of this response for caching purposes. */
  etag?: string;
}

export const DimensionValue: Schema.Schema<DimensionValue> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      matchType: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      dimensionName: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      etag: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DimensionValue",
}) as any as Schema.Schema<DimensionValue>;

export interface CreativeAssetMetadata {
  /** List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. */
  detectedFeatures?: Array<
    | "CSS_FONT_FACE"
    | "CSS_BACKGROUND_SIZE"
    | "CSS_BORDER_IMAGE"
    | "CSS_BORDER_RADIUS"
    | "CSS_BOX_SHADOW"
    | "CSS_FLEX_BOX"
    | "CSS_HSLA"
    | "CSS_MULTIPLE_BGS"
    | "CSS_OPACITY"
    | "CSS_RGBA"
    | "CSS_TEXT_SHADOW"
    | "CSS_ANIMATIONS"
    | "CSS_COLUMNS"
    | "CSS_GENERATED_CONTENT"
    | "CSS_GRADIENTS"
    | "CSS_REFLECTIONS"
    | "CSS_TRANSFORMS"
    | "CSS_TRANSFORMS3D"
    | "CSS_TRANSITIONS"
    | "APPLICATION_CACHE"
    | "CANVAS"
    | "CANVAS_TEXT"
    | "DRAG_AND_DROP"
    | "HASH_CHANGE"
    | "HISTORY"
    | "AUDIO"
    | "VIDEO"
    | "INDEXED_DB"
    | "INPUT_ATTR_AUTOCOMPLETE"
    | "INPUT_ATTR_AUTOFOCUS"
    | "INPUT_ATTR_LIST"
    | "INPUT_ATTR_PLACEHOLDER"
    | "INPUT_ATTR_MAX"
    | "INPUT_ATTR_MIN"
    | "INPUT_ATTR_MULTIPLE"
    | "INPUT_ATTR_PATTERN"
    | "INPUT_ATTR_REQUIRED"
    | "INPUT_ATTR_STEP"
    | "INPUT_TYPE_SEARCH"
    | "INPUT_TYPE_TEL"
    | "INPUT_TYPE_URL"
    | "INPUT_TYPE_EMAIL"
    | "INPUT_TYPE_DATETIME"
    | "INPUT_TYPE_DATE"
    | "INPUT_TYPE_MONTH"
    | "INPUT_TYPE_WEEK"
    | "INPUT_TYPE_TIME"
    | "INPUT_TYPE_DATETIME_LOCAL"
    | "INPUT_TYPE_NUMBER"
    | "INPUT_TYPE_RANGE"
    | "INPUT_TYPE_COLOR"
    | "LOCAL_STORAGE"
    | "POST_MESSAGE"
    | "SESSION_STORAGE"
    | "WEB_SOCKETS"
    | "WEB_SQL_DATABASE"
    | "WEB_WORKERS"
    | "GEO_LOCATION"
    | "INLINE_SVG"
    | "SMIL"
    | "SVG_HREF"
    | "SVG_CLIP_PATHS"
    | "TOUCH"
    | "WEBGL"
    | "SVG_FILTERS"
    | "SVG_FE_IMAGE"
    | (string & {})
  >;
  /** Numeric ID of the asset. This is a read-only, auto-generated field. */
  id?: string;
  /** ID of the creative asset. This is a required field. */
  assetIdentifier?: CreativeAssetId;
  /** Rules validated during code generation that generated a warning. This is a read-only, auto-generated field. Possible values are: - "ADMOB_REFERENCED" - "ASSET_FORMAT_UNSUPPORTED_DCM" - "ASSET_INVALID" - "CLICK_TAG_HARD_CODED" - "CLICK_TAG_INVALID" - "CLICK_TAG_IN_GWD" - "CLICK_TAG_MISSING" - "CLICK_TAG_MORE_THAN_ONE" - "CLICK_TAG_NON_TOP_LEVEL" - "COMPONENT_UNSUPPORTED_DCM" - "ENABLER_UNSUPPORTED_METHOD_DCM" - "EXTERNAL_FILE_REFERENCED" - "FILE_DETAIL_EMPTY" - "FILE_TYPE_INVALID" - "GWD_PROPERTIES_INVALID" - "HTML5_FEATURE_UNSUPPORTED" - "LINKED_FILE_NOT_FOUND" - "MAX_FLASH_VERSION_11" - "MRAID_REFERENCED" - "NOT_SSL_COMPLIANT" - "ORPHANED_ASSET" - "PRIMARY_HTML_MISSING" - "SVG_INVALID" - "ZIP_INVALID" */
  warnedValidationRules?: Array<
    | "CLICK_TAG_NON_TOP_LEVEL"
    | "CLICK_TAG_MISSING"
    | "CLICK_TAG_MORE_THAN_ONE"
    | "CLICK_TAG_INVALID"
    | "ORPHANED_ASSET"
    | "PRIMARY_HTML_MISSING"
    | "EXTERNAL_FILE_REFERENCED"
    | "MRAID_REFERENCED"
    | "ADMOB_REFERENCED"
    | "FILE_TYPE_INVALID"
    | "ZIP_INVALID"
    | "LINKED_FILE_NOT_FOUND"
    | "MAX_FLASH_VERSION_11"
    | "NOT_SSL_COMPLIANT"
    | "FILE_DETAIL_EMPTY"
    | "ASSET_INVALID"
    | "GWD_PROPERTIES_INVALID"
    | "ENABLER_UNSUPPORTED_METHOD_DCM"
    | "ASSET_FORMAT_UNSUPPORTED_DCM"
    | "COMPONENT_UNSUPPORTED_DCM"
    | "HTML5_FEATURE_UNSUPPORTED"
    | "CLICK_TAG_IN_GWD"
    | "CLICK_TAG_HARD_CODED"
    | "SVG_INVALID"
    | "CLICK_TAG_IN_RICH_MEDIA"
    | "MISSING_ENABLER_REFERENCE"
    | (string & {})
  >;
  /** List of detected click tags for assets. This is a read-only, auto-generated field. This field is empty for a rich media asset. */
  clickTags?: Array<ClickTag>;
  /** List of exit events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  exitCustomEvents?: Array<CreativeCustomEvent>;
  /** Dimension value for the numeric ID of the asset. This is a read-only, auto-generated field. */
  idDimensionValue?: DimensionValue;
  /** Identifies what kind of resource this is. Value: the fixed string "dfareporting#creativeAssetMetadata". */
  kind?: string;
  /** True if the uploaded asset is a rich media asset. This is a read-only, auto-generated field. */
  richMedia?: boolean;
  /** List of timer events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  timerCustomEvents?: Array<CreativeCustomEvent>;
  /** List of counter events configured for the asset. This is a read-only, auto-generated field and only applicable to a rich media asset. */
  counterCustomEvents?: Array<CreativeCustomEvent>;
}

export const CreativeAssetMetadata: Schema.Schema<CreativeAssetMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      detectedFeatures: Schema.optional(Schema.Array(Schema.String)),
      id: Schema.optional(Schema.String),
      assetIdentifier: Schema.optional(CreativeAssetId),
      warnedValidationRules: Schema.optional(Schema.Array(Schema.String)),
      clickTags: Schema.optional(Schema.Array(ClickTag)),
      exitCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
      idDimensionValue: Schema.optional(DimensionValue),
      kind: Schema.optional(Schema.String),
      richMedia: Schema.optional(Schema.Boolean),
      timerCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
      counterCustomEvents: Schema.optional(Schema.Array(CreativeCustomEvent)),
    }),
  ).annotate({
    identifier: "CreativeAssetMetadata",
  }) as any as Schema.Schema<CreativeAssetMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface UploadMediaRequest {
  /** Advertiser ID of this creative. This is a required field. */
  advertiserId: string;
  /** User profile ID associated with this request. */
  profileId: string;
  /** Request body */
  body?: CreativeAssetMetadata;
}

export const UploadMediaRequest = Schema.Struct({
  advertiserId: Schema.String.pipe(T.HttpPath("advertiserId")),
  profileId: Schema.String.pipe(T.HttpPath("profileId")),
  body: Schema.optional(CreativeAssetMetadata).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "userprofiles/{userprofilesId}/creativeAssets/{creativeAssetsId}/creativeAssets",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse = CreativeAssetMetadata;
export const UploadMediaResponse = CreativeAssetMetadata;

export type UploadMediaError = DefaultErrors;

/** Inserts a new creative asset. */
export const uploadMedia: API.OperationMethod<
  UploadMediaRequest,
  UploadMediaResponse,
  UploadMediaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UploadMediaRequest,
  output: UploadMediaResponse,
  errors: [],
}));
