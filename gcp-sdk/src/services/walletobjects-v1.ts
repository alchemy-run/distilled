// ==========================================================================
// Google Wallet API (walletobjects v1)
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
  name: "walletobjects",
  version: "v1",
  rootUrl: "https://walletobjects.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DateTime {
  /** An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of `2018-06-19T18:30:00-04:00` will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles. Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of `2018-06-19T18:30:00` will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones. */
  date?: string;
}

export const DateTime: Schema.Schema<DateTime> = Schema.suspend(() =>
  Schema.Struct({
    date: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DateTime" }) as any as Schema.Schema<DateTime>;

export interface TimeInterval {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#timeInterval"`. */
  kind?: string;
  /** End time of the interval. Offset is not required. If an offset is provided and `start` time is set, `start` must also include an offset. */
  end?: DateTime;
  /** Start time of the interval. Offset is not required. If an offset is provided and `end` time is set, `end` must also include an offset. */
  start?: DateTime;
}

export const TimeInterval: Schema.Schema<TimeInterval> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    end: Schema.optional(DateTime),
    start: Schema.optional(DateTime),
  }),
).annotate({
  identifier: "TimeInterval",
}) as any as Schema.Schema<TimeInterval>;

export interface TranslatedString {
  /** The UTF-8 encoded translated string. */
  value?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#translatedString"`. */
  kind?: string;
  /** Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT". */
  language?: string;
}

export const TranslatedString: Schema.Schema<TranslatedString> = Schema.suspend(
  () =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      language: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TranslatedString",
}) as any as Schema.Schema<TranslatedString>;

export interface LocalizedString {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#localizedString"`. */
  kind?: string;
  /** Contains the string to be displayed if no appropriate translation is available. */
  defaultValue?: TranslatedString;
  /** Contains the translations for the string. */
  translatedValues?: Array<TranslatedString>;
}

export const LocalizedString: Schema.Schema<LocalizedString> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      defaultValue: Schema.optional(TranslatedString),
      translatedValues: Schema.optional(Schema.Array(TranslatedString)),
    }),
).annotate({
  identifier: "LocalizedString",
}) as any as Schema.Schema<LocalizedString>;

export interface ImageUri {
  /** Translated strings for the description, which are unused and retained only for backward compatibility. */
  localizedDescription?: LocalizedString;
  /** Additional information about the image, which is unused and retained only for backward compatibility. */
  description?: string;
  /** The location of the image. URIs must have a scheme. */
  uri?: string;
}

export const ImageUri: Schema.Schema<ImageUri> = Schema.suspend(() =>
  Schema.Struct({
    localizedDescription: Schema.optional(LocalizedString),
    description: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ImageUri" }) as any as Schema.Schema<ImageUri>;

export interface Image {
  /** An ID for an already uploaded private image. Either this or source_uri should be set. Requests setting both or neither will be rejected. Please contact support to use private images. */
  privateImageId?: string;
  /** A URI for the image. Either this or private_image_id should be set. Requests setting both or neither will be rejected. */
  sourceUri?: ImageUri;
  /** Description of the image used for accessibility. */
  contentDescription?: LocalizedString;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#image"`. */
  kind?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() =>
  Schema.Struct({
    privateImageId: Schema.optional(Schema.String),
    sourceUri: Schema.optional(ImageUri),
    contentDescription: Schema.optional(LocalizedString),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface RotatingBarcodeTotpDetailsTotpParameters {
  /** The secret key used for the TOTP value generation, encoded as a Base16 string. */
  key?: string;
  /** The length of the TOTP value in decimal digits. */
  valueLength?: number;
}

export const RotatingBarcodeTotpDetailsTotpParameters: Schema.Schema<RotatingBarcodeTotpDetailsTotpParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      valueLength: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "RotatingBarcodeTotpDetailsTotpParameters",
  }) as any as Schema.Schema<RotatingBarcodeTotpDetailsTotpParameters>;

export interface RotatingBarcodeTotpDetails {
  /** The TOTP algorithm used to generate the OTP. */
  algorithm?: "TOTP_ALGORITHM_UNSPECIFIED" | "TOTP_SHA1" | (string & {});
  /** The time interval used for the TOTP value generation, in milliseconds. */
  periodMillis?: string;
  /** The TOTP parameters for each of the {totp_value_*} substitutions. The TotpParameters at index n is used for the {totp_value_n} substitution. */
  parameters?: Array<RotatingBarcodeTotpDetailsTotpParameters>;
}

export const RotatingBarcodeTotpDetails: Schema.Schema<RotatingBarcodeTotpDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      algorithm: Schema.optional(Schema.String),
      periodMillis: Schema.optional(Schema.String),
      parameters: Schema.optional(
        Schema.Array(RotatingBarcodeTotpDetailsTotpParameters),
      ),
    }),
  ).annotate({
    identifier: "RotatingBarcodeTotpDetails",
  }) as any as Schema.Schema<RotatingBarcodeTotpDetails>;

export interface RotatingBarcodeValues {
  /** Required. The values to encode in the barcode. At least one value is required. */
  values?: Array<string>;
  /** Required. The date/time the first barcode is valid from. Barcodes will be rotated through using period_millis defined on the object's RotatingBarcodeValueInfo. This is an ISO 8601 extended format date/time, with an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. */
  startDateTime?: string;
  /** Required. The amount of time each barcode is valid for. */
  periodMillis?: string;
}

export const RotatingBarcodeValues: Schema.Schema<RotatingBarcodeValues> =
  Schema.suspend(() =>
    Schema.Struct({
      values: Schema.optional(Schema.Array(Schema.String)),
      startDateTime: Schema.optional(Schema.String),
      periodMillis: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RotatingBarcodeValues",
  }) as any as Schema.Schema<RotatingBarcodeValues>;

export interface RotatingBarcode {
  /** An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned. */
  alternateText?: string;
  /** Optional text that will be shown when the barcode is hidden behind a click action. This happens in cases where a pass has Smart Tap enabled. If not specified, a default is chosen by Google. */
  showCodeText?: LocalizedString;
  /** The type of this barcode. */
  type?:
    | "BARCODE_TYPE_UNSPECIFIED"
    | "AZTEC"
    | "aztec"
    | "CODE_39"
    | "code39"
    | "CODE_128"
    | "code128"
    | "CODABAR"
    | "codabar"
    | "DATA_MATRIX"
    | "dataMatrix"
    | "EAN_8"
    | "ean8"
    | "EAN_13"
    | "ean13"
    | "EAN13"
    | "ITF_14"
    | "itf14"
    | "PDF_417"
    | "pdf417"
    | "PDF417"
    | "QR_CODE"
    | "qrCode"
    | "qrcode"
    | "UPC_A"
    | "upcA"
    | "TEXT_ONLY"
    | "textOnly"
    | (string & {});
  /** The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google. */
  renderEncoding?: "RENDER_ENCODING_UNSPECIFIED" | "UTF_8" | (string & {});
  /** Details used to evaluate the {totp_value_n} substitutions. */
  totpDetails?: RotatingBarcodeTotpDetails;
  /** String encoded barcode value. This string supports the following substitutions: * {totp_value_n}: Replaced with the TOTP value (see TotpDetails.parameters). * {totp_timestamp_millis}: Replaced with the timestamp (millis since epoch) at which the barcode was generated. * {totp_timestamp_seconds}: Replaced with the timestamp (seconds since epoch) at which the barcode was generated. */
  valuePattern?: string;
  /** Input only. NOTE: This feature is only available for the transit vertical. Optional set of initial rotating barcode values. This allows a small subset of barcodes to be included with the object. Further rotating barcode values must be uploaded with the UploadRotatingBarcodeValues endpoint. */
  initialRotatingBarcodeValues?: RotatingBarcodeValues;
}

export const RotatingBarcode: Schema.Schema<RotatingBarcode> = Schema.suspend(
  () =>
    Schema.Struct({
      alternateText: Schema.optional(Schema.String),
      showCodeText: Schema.optional(LocalizedString),
      type: Schema.optional(Schema.String),
      renderEncoding: Schema.optional(Schema.String),
      totpDetails: Schema.optional(RotatingBarcodeTotpDetails),
      valuePattern: Schema.optional(Schema.String),
      initialRotatingBarcodeValues: Schema.optional(RotatingBarcodeValues),
    }),
).annotate({
  identifier: "RotatingBarcode",
}) as any as Schema.Schema<RotatingBarcode>;

export interface Barcode {
  /** Optional text that will be shown when the barcode is hidden behind a click action. This happens in cases where a pass has Smart Tap enabled. If not specified, a default is chosen by Google. */
  showCodeText?: LocalizedString;
  /** An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned. */
  alternateText?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#barcode"`. */
  kind?: string;
  /** The type of barcode. */
  type?:
    | "BARCODE_TYPE_UNSPECIFIED"
    | "AZTEC"
    | "aztec"
    | "CODE_39"
    | "code39"
    | "CODE_128"
    | "code128"
    | "CODABAR"
    | "codabar"
    | "DATA_MATRIX"
    | "dataMatrix"
    | "EAN_8"
    | "ean8"
    | "EAN_13"
    | "ean13"
    | "EAN13"
    | "ITF_14"
    | "itf14"
    | "PDF_417"
    | "pdf417"
    | "PDF417"
    | "QR_CODE"
    | "qrCode"
    | "qrcode"
    | "UPC_A"
    | "upcA"
    | "TEXT_ONLY"
    | "textOnly"
    | (string & {});
  /** The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google. */
  renderEncoding?: "RENDER_ENCODING_UNSPECIFIED" | "UTF_8" | (string & {});
  /** The value encoded in the barcode. */
  value?: string;
}

export const Barcode: Schema.Schema<Barcode> = Schema.suspend(() =>
  Schema.Struct({
    showCodeText: Schema.optional(LocalizedString),
    alternateText: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    renderEncoding: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Barcode" }) as any as Schema.Schema<Barcode>;

export interface SaveRestrictions {
  /** Restrict the save of the referencing object to the given email address only. This is the hex output of SHA256 sum of the email address, all lowercase and without any notations like "." or "+", except "@". For example, for example@example.com, this value will be 31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66 and for Example@example.com, this value will be bc34f262c93ad7122763684ccea6f07fb7f5d8a2d11e60ce15a6f43fe70ce632 If email address of the logged-in user who tries to save this pass does not match with the defined value here, users won't be allowed to save this pass. They will instead be prompted with an error to contact the issuer. This information should be gathered from the user with an explicit consent via Sign in with Google integration https://developers.google.com/identity/authentication. Please contact with support before using Save Restrictions. */
  restrictToEmailSha256?: string;
}

export const SaveRestrictions: Schema.Schema<SaveRestrictions> = Schema.suspend(
  () =>
    Schema.Struct({
      restrictToEmailSha256: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "SaveRestrictions",
}) as any as Schema.Schema<SaveRestrictions>;

export interface ExpiryNotification {
  /** Indicates if the object needs to have expiry notification enabled. */
  enableNotification?: boolean;
}

export const ExpiryNotification: Schema.Schema<ExpiryNotification> =
  Schema.suspend(() =>
    Schema.Struct({
      enableNotification: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ExpiryNotification",
  }) as any as Schema.Schema<ExpiryNotification>;

export interface UpcomingNotification {
  /** Indicates if the object needs to have upcoming notification enabled. */
  enableNotification?: boolean;
}

export const UpcomingNotification: Schema.Schema<UpcomingNotification> =
  Schema.suspend(() =>
    Schema.Struct({
      enableNotification: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "UpcomingNotification",
  }) as any as Schema.Schema<UpcomingNotification>;

export interface Notifications {
  /** A notification would be triggered at a specific time before the card expires. */
  expiryNotification?: ExpiryNotification;
  /** A notification would be triggered at a specific time before the card becomes usable. */
  upcomingNotification?: UpcomingNotification;
}

export const Notifications: Schema.Schema<Notifications> = Schema.suspend(() =>
  Schema.Struct({
    expiryNotification: Schema.optional(ExpiryNotification),
    upcomingNotification: Schema.optional(UpcomingNotification),
  }),
).annotate({
  identifier: "Notifications",
}) as any as Schema.Schema<Notifications>;

export interface TextModuleData {
  /** The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens. */
  header?: string;
  /** Translated strings for the body. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens. */
  localizedBody?: LocalizedString;
  /** The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides. */
  id?: string;
  /** The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens. */
  body?: string;
  /** Translated strings for the header. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens. */
  localizedHeader?: LocalizedString;
}

export const TextModuleData: Schema.Schema<TextModuleData> = Schema.suspend(
  () =>
    Schema.Struct({
      header: Schema.optional(Schema.String),
      localizedBody: Schema.optional(LocalizedString),
      id: Schema.optional(Schema.String),
      body: Schema.optional(Schema.String),
      localizedHeader: Schema.optional(LocalizedString),
    }),
).annotate({
  identifier: "TextModuleData",
}) as any as Schema.Schema<TextModuleData>;

export interface MerchantLocation {
  /** The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected. */
  longitude?: number;
  /** The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected. */
  latitude?: number;
}

export const MerchantLocation: Schema.Schema<MerchantLocation> = Schema.suspend(
  () =>
    Schema.Struct({
      longitude: Schema.optional(Schema.Number),
      latitude: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "MerchantLocation",
}) as any as Schema.Schema<MerchantLocation>;

export interface ImageModuleData {
  /** A 100% width image. */
  mainImage?: Image;
  /** The ID associated with an image module. This field is here to enable ease of management of image modules. */
  id?: string;
}

export const ImageModuleData: Schema.Schema<ImageModuleData> = Schema.suspend(
  () =>
    Schema.Struct({
      mainImage: Schema.optional(Image),
      id: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ImageModuleData",
}) as any as Schema.Schema<ImageModuleData>;

export interface Uri {
  /** The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. Note that in some contexts this text is not used, such as when `description` is part of an image. */
  description?: string;
  /** The location of a web page, image, or other resource. URIs in the `LinksModuleData` module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme. */
  uri?: string;
  /** The ID associated with a uri. This field is here to enable ease of management of uris. */
  id?: string;
  /** Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens. */
  localizedDescription?: LocalizedString;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#uri"`. */
  kind?: string;
}

export const Uri: Schema.Schema<Uri> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedDescription: Schema.optional(LocalizedString),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Uri" }) as any as Schema.Schema<Uri>;

export interface AppLinkDataAppLinkInfoAppTarget {
  /** URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application. */
  targetUri?: Uri;
  /** Package name for AppTarget. For example: com.google.android.gm */
  packageName?: string;
}

export const AppLinkDataAppLinkInfoAppTarget: Schema.Schema<AppLinkDataAppLinkInfoAppTarget> =
  Schema.suspend(() =>
    Schema.Struct({
      targetUri: Schema.optional(Uri),
      packageName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppLinkDataAppLinkInfoAppTarget",
  }) as any as Schema.Schema<AppLinkDataAppLinkInfoAppTarget>;

export interface AppLinkDataAppLinkInfo {
  /** Deprecated. Title isn't supported in the app link module. */
  title?: LocalizedString;
  /** Deprecated. Description isn't supported in the app link module. */
  description?: LocalizedString;
  /** Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage. */
  appTarget?: AppLinkDataAppLinkInfoAppTarget;
  /** Deprecated. Image isn't supported in the app link module. */
  appLogoImage?: Image;
}

export const AppLinkDataAppLinkInfo: Schema.Schema<AppLinkDataAppLinkInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(LocalizedString),
      description: Schema.optional(LocalizedString),
      appTarget: Schema.optional(AppLinkDataAppLinkInfoAppTarget),
      appLogoImage: Schema.optional(Image),
    }),
  ).annotate({
    identifier: "AppLinkDataAppLinkInfo",
  }) as any as Schema.Schema<AppLinkDataAppLinkInfo>;

export interface AppLinkData {
  /** Deprecated. Links to open iOS apps are not supported. */
  iosAppLinkInfo?: AppLinkDataAppLinkInfo;
  /** Optional display text for the app link button. Character limit is 30. */
  displayText?: LocalizedString;
  /** Optional information about the partner web link. */
  webAppLinkInfo?: AppLinkDataAppLinkInfo;
  /** Optional information about the partner app link. */
  androidAppLinkInfo?: AppLinkDataAppLinkInfo;
}

export const AppLinkData: Schema.Schema<AppLinkData> = Schema.suspend(() =>
  Schema.Struct({
    iosAppLinkInfo: Schema.optional(AppLinkDataAppLinkInfo),
    displayText: Schema.optional(LocalizedString),
    webAppLinkInfo: Schema.optional(AppLinkDataAppLinkInfo),
    androidAppLinkInfo: Schema.optional(AppLinkDataAppLinkInfo),
  }),
).annotate({ identifier: "AppLinkData" }) as any as Schema.Schema<AppLinkData>;

export interface Message {
  /** The message header. */
  header?: string;
  /** The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message. */
  id?: string;
  /** Translated strings for the message body. */
  localizedBody?: LocalizedString;
  /** The message type. */
  messageType?:
    | "MESSAGE_TYPE_UNSPECIFIED"
    | "TEXT"
    | "text"
    | "EXPIRATION_NOTIFICATION"
    | "expirationNotification"
    | "TEXT_AND_NOTIFY"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#walletObjectMessage"`. */
  kind?: string;
  /** The message body. */
  body?: string;
  /** The period of time that the message will be displayed to users. You can define both a `startTime` and `endTime` for each message. A message is displayed immediately after a Wallet Object is inserted unless a `startTime` is set. The message will appear in a list of messages indefinitely if `endTime` is not provided. */
  displayInterval?: TimeInterval;
  /** Translated strings for the message header. */
  localizedHeader?: LocalizedString;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() =>
  Schema.Struct({
    header: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedBody: Schema.optional(LocalizedString),
    messageType: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    body: Schema.optional(Schema.String),
    displayInterval: Schema.optional(TimeInterval),
    localizedHeader: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface LinksModuleData {
  /** The list of URIs. */
  uris?: Array<Uri>;
}

export const LinksModuleData: Schema.Schema<LinksModuleData> = Schema.suspend(
  () =>
    Schema.Struct({
      uris: Schema.optional(Schema.Array(Uri)),
    }),
).annotate({
  identifier: "LinksModuleData",
}) as any as Schema.Schema<LinksModuleData>;

export interface GroupingInfo {
  /** Optional index for sorting the passes when they are grouped with other passes. Passes with lower sort index are shown before passes with higher sort index. If unspecified, the value is assumed to be INT_MAX. For two passes with the same sort index, the sorting behavior is undefined. */
  sortIndex?: number;
  /** Optional grouping ID for grouping the passes with the same ID visually together. Grouping with different types of passes is allowed. */
  groupingId?: string;
}

export const GroupingInfo: Schema.Schema<GroupingInfo> = Schema.suspend(() =>
  Schema.Struct({
    sortIndex: Schema.optional(Schema.Number),
    groupingId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "GroupingInfo",
}) as any as Schema.Schema<GroupingInfo>;

export interface ModuleViewConstraints {
  /** The period of time that the module will be displayed to users. Can define both a `startTime` and `endTime`. The module is displayed immediately after insertion unless a `startTime` is set. The module is displayed indefinitely if `endTime` is not set. */
  displayInterval?: TimeInterval;
}

export const ModuleViewConstraints: Schema.Schema<ModuleViewConstraints> =
  Schema.suspend(() =>
    Schema.Struct({
      displayInterval: Schema.optional(TimeInterval),
    }),
  ).annotate({
    identifier: "ModuleViewConstraints",
  }) as any as Schema.Schema<ModuleViewConstraints>;

export interface ValueAddedModuleData {
  /** Header to be displayed on the module. Character limit is 60 and longer strings will be truncated. */
  header?: LocalizedString;
  /** URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking. */
  uri?: string;
  /** Constraints that all must be met for the module to be shown. */
  viewConstraints?: ModuleViewConstraints;
  /** Body to be displayed on the module. Character limit is 50 and longer strings will be truncated. */
  body?: LocalizedString;
  /** Image to be displayed on the module. Recommended image ratio is 1:1. Images will be resized to fit this ratio. */
  image?: Image;
  /** The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined. */
  sortIndex?: number;
}

export const ValueAddedModuleData: Schema.Schema<ValueAddedModuleData> =
  Schema.suspend(() =>
    Schema.Struct({
      header: Schema.optional(LocalizedString),
      uri: Schema.optional(Schema.String),
      viewConstraints: Schema.optional(ModuleViewConstraints),
      body: Schema.optional(LocalizedString),
      image: Schema.optional(Image),
      sortIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ValueAddedModuleData",
  }) as any as Schema.Schema<ValueAddedModuleData>;

export interface PassConstraints {
  /** The screenshot eligibility for the pass. */
  screenshotEligibility?:
    | "SCREENSHOT_ELIGIBILITY_UNSPECIFIED"
    | "ELIGIBLE"
    | "INELIGIBLE"
    | (string & {});
  /** The NFC constraints for the pass. */
  nfcConstraint?: Array<
    | "NFC_CONSTRAINT_UNSPECIFIED"
    | "BLOCK_PAYMENT"
    | "BLOCK_CLOSED_LOOP_TRANSIT"
    | (string & {})
  >;
}

export const PassConstraints: Schema.Schema<PassConstraints> = Schema.suspend(
  () =>
    Schema.Struct({
      screenshotEligibility: Schema.optional(Schema.String),
      nfcConstraint: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "PassConstraints",
}) as any as Schema.Schema<PassConstraints>;

export interface GenericObject {
  /** The background color for the card. If not set, the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used and if logo is not set, a color would be chosen by Google. */
  hexBackgroundColor?: string;
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Banner image displayed on the front of the card if present. The image will be displayed at 100% width. */
  heroImage?: Image;
  /** The rotating barcode settings/details. */
  rotatingBarcode?: RotatingBarcode;
  /** The barcode type and value. If pass does not have a barcode, we can allow the issuer to set Barcode.alternate_text and display just that. */
  barcode?: Barcode;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. */
  classId?: string;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** The notification settings that are enabled for this object. */
  notifications?: Notifications;
  /** Text module data. If `textModulesData` is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object. */
  textModulesData?: Array<TextModuleData>;
  /** The logo image of the pass. This image is displayed in the card detail view in upper left, and also on the list/thumbnail view. If the logo is not present, the first letter of `cardTitle` would be shown as logo. */
  logo?: Image;
  /** The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. If this is not provided, the object would be considered `ACTIVE`. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The header of the pass. This is usually the Business name such as "XXX Gym", "AAA Insurance". This field is required and appears in the header row at the very top of the pass. */
  cardTitle?: LocalizedString;
  /** Required. The title of the pass, such as "50% off coupon" or "Library card" or "Voucher". This field is required and appears in the title row of the pass detail view. */
  header?: LocalizedString;
  /** Image module data. Only one of the image from class and one from object level will be rendered when both set. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** The wide logo of the pass. When provided, this will be used in place of the logo in the top left of the card view. */
  wideLogo?: Image;
  /** The time period this object will be considered valid or usable. When the time period is passed, the object will be considered expired, which will affect the rendering on user's devices. */
  validTimeInterval?: TimeInterval;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Links module data. If `linksModuleData` is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object. */
  linksModuleData?: LinksModuleData;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this generic object. If a user had saved this generic card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** The title label of the pass, such as location where this pass can be used. Appears right above the title in the title row in the pass detail view. */
  subheader?: LocalizedString;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  id?: string;
  /** Specify which `GenericType` the card belongs to. */
  genericType?:
    | "GENERIC_TYPE_UNSPECIFIED"
    | "GENERIC_SEASON_PASS"
    | "GENERIC_UTILITY_BILLS"
    | "GENERIC_PARKING_PASS"
    | "GENERIC_VOUCHER"
    | "GENERIC_GYM_MEMBERSHIP"
    | "GENERIC_LIBRARY_MEMBERSHIP"
    | "GENERIC_RESERVATIONS"
    | "GENERIC_AUTO_INSURANCE"
    | "GENERIC_HOME_INSURANCE"
    | "GENERIC_ENTRY_TICKET"
    | "GENERIC_RECEIPT"
    | "GENERIC_LOYALTY_CARD"
    | "GENERIC_OTHER"
    | (string & {});
}

export const GenericObject: Schema.Schema<GenericObject> = Schema.suspend(() =>
  Schema.Struct({
    hexBackgroundColor: Schema.optional(Schema.String),
    hasUsers: Schema.optional(Schema.Boolean),
    heroImage: Schema.optional(Image),
    rotatingBarcode: Schema.optional(RotatingBarcode),
    barcode: Schema.optional(Barcode),
    classId: Schema.optional(Schema.String),
    saveRestrictions: Schema.optional(SaveRestrictions),
    notifications: Schema.optional(Notifications),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    logo: Schema.optional(Image),
    state: Schema.optional(Schema.String),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    cardTitle: Schema.optional(LocalizedString),
    header: Schema.optional(LocalizedString),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    wideLogo: Schema.optional(Image),
    validTimeInterval: Schema.optional(TimeInterval),
    messages: Schema.optional(Schema.Array(Message)),
    linksModuleData: Schema.optional(LinksModuleData),
    smartTapRedemptionValue: Schema.optional(Schema.String),
    groupingInfo: Schema.optional(GroupingInfo),
    linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    passConstraints: Schema.optional(PassConstraints),
    subheader: Schema.optional(LocalizedString),
    id: Schema.optional(Schema.String),
    genericType: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "GenericObject",
}) as any as Schema.Schema<GenericObject>;

export interface Pagination {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#pagination"`. */
  kind?: string;
  /** Number of results returned in this page. */
  resultsPerPage?: number;
  /** Page token to send to fetch the next page. */
  nextPageToken?: string;
}

export const Pagination: Schema.Schema<Pagination> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    resultsPerPage: Schema.optional(Schema.Number),
    nextPageToken: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Pagination" }) as any as Schema.Schema<Pagination>;

export interface FrequentFlyerInfo {
  /** Frequent flyer program name. eg: "Lufthansa Miles & More" */
  frequentFlyerProgramName?: LocalizedString;
  /** Frequent flyer number. Required for each nested object of kind `walletobjects#frequentFlyerInfo`. */
  frequentFlyerNumber?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#frequentFlyerInfo"`. */
  kind?: string;
}

export const FrequentFlyerInfo: Schema.Schema<FrequentFlyerInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      frequentFlyerProgramName: Schema.optional(LocalizedString),
      frequentFlyerNumber: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FrequentFlyerInfo",
  }) as any as Schema.Schema<FrequentFlyerInfo>;

export interface ReservationInfo {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#reservationInfo"`. */
  kind?: string;
  /** Confirmation code needed to check into this flight. This is the number that the passenger would enter into a kiosk at the airport to look up the flight and print a boarding pass. */
  confirmationCode?: string;
  /** E-ticket number. */
  eticketNumber?: string;
  /** Frequent flyer membership information. */
  frequentFlyerInfo?: FrequentFlyerInfo;
}

export const ReservationInfo: Schema.Schema<ReservationInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      confirmationCode: Schema.optional(Schema.String),
      eticketNumber: Schema.optional(Schema.String),
      frequentFlyerInfo: Schema.optional(FrequentFlyerInfo),
    }),
).annotate({
  identifier: "ReservationInfo",
}) as any as Schema.Schema<ReservationInfo>;

export interface BoardingAndSeatingInfo {
  /** The sequence number on the boarding pass. This usually matches the sequence in which the passengers checked in. Airline might use the number for manual boarding and bag tags. eg: "49" */
  sequenceNumber?: string;
  /** The value of boarding group (or zone) this passenger shall board with. eg: "B" The label for this value will be determined by the `boardingPolicy` field in the `flightClass` referenced by this object. */
  boardingGroup?: string;
  /** A small image shown above the boarding barcode. Airlines can use it to communicate any special boarding privileges. In the event the security program logo is also set, this image might be rendered alongside the logo for that security program. */
  boardingPrivilegeImage?: Image;
  /** The value of passenger seat. If there is no specific identifier, use `seatAssignment` instead. eg: "25A" */
  seatNumber?: string;
  /** The passenger's seat assignment. To be used when there is no specific identifier to use in `seatNumber`. eg: "assigned at gate" */
  seatAssignment?: LocalizedString;
  /** The value of the seat class. eg: "Economy" or "Economy Plus" */
  seatClass?: string;
  /** Set this field only if this flight boards through more than one door or bridge and you want to explicitly print the door location on the boarding pass. Most airlines route their passengers to the right door or bridge by refering to doors/bridges by the `seatClass`. In those cases `boardingDoor` should not be set. */
  boardingDoor?:
    | "BOARDING_DOOR_UNSPECIFIED"
    | "FRONT"
    | "front"
    | "BACK"
    | "back"
    | (string & {});
  /** The value of boarding position. eg: "76" */
  boardingPosition?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#boardingAndSeatingInfo"`. */
  kind?: string;
}

export const BoardingAndSeatingInfo: Schema.Schema<BoardingAndSeatingInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sequenceNumber: Schema.optional(Schema.String),
      boardingGroup: Schema.optional(Schema.String),
      boardingPrivilegeImage: Schema.optional(Image),
      seatNumber: Schema.optional(Schema.String),
      seatAssignment: Schema.optional(LocalizedString),
      seatClass: Schema.optional(Schema.String),
      boardingDoor: Schema.optional(Schema.String),
      boardingPosition: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BoardingAndSeatingInfo",
  }) as any as Schema.Schema<BoardingAndSeatingInfo>;

export interface LabelValue {
  /** The label for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout. */
  label?: string;
  /** The value for a specific row and column. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout. */
  value?: string;
  /** Translated strings for the label. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout. */
  localizedLabel?: LocalizedString;
  /** Translated strings for the value. Recommended maximum is 15 characters for a two-column layout and 30 characters for a one-column layout. */
  localizedValue?: LocalizedString;
}

export const LabelValue: Schema.Schema<LabelValue> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
    localizedLabel: Schema.optional(LocalizedString),
    localizedValue: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "LabelValue" }) as any as Schema.Schema<LabelValue>;

export interface LabelValueRow {
  /** A list of labels and values. These will be displayed in a singular column, one after the other, not in multiple columns, despite the field name. */
  columns?: Array<LabelValue>;
}

export const LabelValueRow: Schema.Schema<LabelValueRow> = Schema.suspend(() =>
  Schema.Struct({
    columns: Schema.optional(Schema.Array(LabelValue)),
  }),
).annotate({
  identifier: "LabelValueRow",
}) as any as Schema.Schema<LabelValueRow>;

export interface InfoModuleData {
  /** A list of collections of labels and values. These will be displayed one after the other in a singular column. */
  labelValueRows?: Array<LabelValueRow>;
  showLastUpdateTime?: boolean;
}

export const InfoModuleData: Schema.Schema<InfoModuleData> = Schema.suspend(
  () =>
    Schema.Struct({
      labelValueRows: Schema.optional(Schema.Array(LabelValueRow)),
      showLastUpdateTime: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "InfoModuleData",
}) as any as Schema.Schema<InfoModuleData>;

export interface LatLongPoint {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#latLongPoint"`. */
  kind?: string;
  /** The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected. */
  latitude?: number;
  /** The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected. */
  longitude?: number;
}

export const LatLongPoint: Schema.Schema<LatLongPoint> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    latitude: Schema.optional(Schema.Number),
    longitude: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "LatLongPoint",
}) as any as Schema.Schema<LatLongPoint>;

export interface AirportInfo {
  /** Three character IATA airport code. This is a required field for `origin` and `destination`. Eg: "SFO" */
  airportIataCode?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#airportInfo"`. */
  kind?: string;
  /** Terminal name. Eg: "INTL" or "I" */
  terminal?: string;
  /** Optional field that overrides the airport city name defined by IATA. By default, Google takes the `airportIataCode` provided and maps it to the official airport city name defined by IATA. Official IATA airport city names can be found at IATA airport city names website. For example, for the airport IATA code "LTN", IATA website tells us that the corresponding airport city is "London". If this field is not populated, Google would display "London". However, populating this field with a custom name (eg: "London Luton") would override it. */
  airportNameOverride?: LocalizedString;
  /** A name of the gate. Eg: "B59" or "59" */
  gate?: string;
}

export const AirportInfo: Schema.Schema<AirportInfo> = Schema.suspend(() =>
  Schema.Struct({
    airportIataCode: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    terminal: Schema.optional(Schema.String),
    airportNameOverride: Schema.optional(LocalizedString),
    gate: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AirportInfo" }) as any as Schema.Schema<AirportInfo>;

export interface BoardingAndSeatingPolicy {
  /** Seating policy which dictates how we display the seat class. If unset, Google will default to `cabinBased`. */
  seatClassPolicy?:
    | "SEAT_CLASS_POLICY_UNSPECIFIED"
    | "CABIN_BASED"
    | "cabinBased"
    | "CLASS_BASED"
    | "classBased"
    | "TIER_BASED"
    | "tierBased"
    | "SEAT_CLASS_POLICY_OTHER"
    | "seatClassPolicyOther"
    | (string & {});
  /** Indicates the policy the airline uses for boarding. If unset, Google will default to `zoneBased`. */
  boardingPolicy?:
    | "BOARDING_POLICY_UNSPECIFIED"
    | "ZONE_BASED"
    | "zoneBased"
    | "GROUP_BASED"
    | "groupBased"
    | "BOARDING_POLICY_OTHER"
    | "boardingPolicyOther"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#boardingAndSeatingPolicy"`. */
  kind?: string;
}

export const BoardingAndSeatingPolicy: Schema.Schema<BoardingAndSeatingPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      seatClassPolicy: Schema.optional(Schema.String),
      boardingPolicy: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BoardingAndSeatingPolicy",
  }) as any as Schema.Schema<BoardingAndSeatingPolicy>;

export interface SecurityAnimation {
  /** Type of animation. */
  animationType?:
    | "ANIMATION_UNSPECIFIED"
    | "FOIL_SHIMMER"
    | "foilShimmer"
    | (string & {});
}

export const SecurityAnimation: Schema.Schema<SecurityAnimation> =
  Schema.suspend(() =>
    Schema.Struct({
      animationType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SecurityAnimation",
  }) as any as Schema.Schema<SecurityAnimation>;

export interface Review {
  comments?: string;
}

export const Review: Schema.Schema<Review> = Schema.suspend(() =>
  Schema.Struct({
    comments: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Review" }) as any as Schema.Schema<Review>;

export interface FieldReference {
  /** Only valid if the `fieldPath` references a date field. Chooses how the date field will be formatted and displayed in the UI. */
  dateFormat?:
    | "DATE_FORMAT_UNSPECIFIED"
    | "DATE_TIME"
    | "dateTime"
    | "DATE_ONLY"
    | "dateOnly"
    | "TIME_ONLY"
    | "timeOnly"
    | "DATE_TIME_YEAR"
    | "dateTimeYear"
    | "DATE_YEAR"
    | "dateYear"
    | "YEAR_MONTH"
    | "YEAR_MONTH_DAY"
    | (string & {});
  /** Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice". */
  fieldPath?: string;
}

export const FieldReference: Schema.Schema<FieldReference> = Schema.suspend(
  () =>
    Schema.Struct({
      dateFormat: Schema.optional(Schema.String),
      fieldPath: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FieldReference",
}) as any as Schema.Schema<FieldReference>;

export interface FieldSelector {
  /** If more than one reference is supplied, then the first one that references a non-empty field will be displayed. */
  fields?: Array<FieldReference>;
}

export const FieldSelector: Schema.Schema<FieldSelector> = Schema.suspend(() =>
  Schema.Struct({
    fields: Schema.optional(Schema.Array(FieldReference)),
  }),
).annotate({
  identifier: "FieldSelector",
}) as any as Schema.Schema<FieldSelector>;

export interface BarcodeSectionDetail {
  /** A reference to an existing text-based or image field to display. */
  fieldSelector?: FieldSelector;
}

export const BarcodeSectionDetail: Schema.Schema<BarcodeSectionDetail> =
  Schema.suspend(() =>
    Schema.Struct({
      fieldSelector: Schema.optional(FieldSelector),
    }),
  ).annotate({
    identifier: "BarcodeSectionDetail",
  }) as any as Schema.Schema<BarcodeSectionDetail>;

export interface CardBarcodeSectionDetails {
  /** Optional information to display below the barcode. */
  firstBottomDetail?: BarcodeSectionDetail;
  /** Optional second piece of information to display above the barcode. If `firstTopDetail` is defined, this will be displayed to the end side of this detail section. */
  secondTopDetail?: BarcodeSectionDetail;
  /** Optional information to display above the barcode. If `secondTopDetail` is defined, this will be displayed to the start side of this detail section. */
  firstTopDetail?: BarcodeSectionDetail;
}

export const CardBarcodeSectionDetails: Schema.Schema<CardBarcodeSectionDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      firstBottomDetail: Schema.optional(BarcodeSectionDetail),
      secondTopDetail: Schema.optional(BarcodeSectionDetail),
      firstTopDetail: Schema.optional(BarcodeSectionDetail),
    }),
  ).annotate({
    identifier: "CardBarcodeSectionDetails",
  }) as any as Schema.Schema<CardBarcodeSectionDetails>;

export interface TemplateItem {
  /** A reference to a field to display. This may only be populated if the `firstValue` field is populated. */
  secondValue?: FieldSelector;
  /** A reference to a field to display. If both `firstValue` and `secondValue` are populated, they will both appear as one item with a slash between them. For example, values A and B would be shown as "A / B". */
  firstValue?: FieldSelector;
  /** A predefined item to display. Only one of `firstValue` or `predefinedItem` may be set. */
  predefinedItem?:
    | "PREDEFINED_ITEM_UNSPECIFIED"
    | "FREQUENT_FLYER_PROGRAM_NAME_AND_NUMBER"
    | "frequentFlyerProgramNameAndNumber"
    | "FLIGHT_NUMBER_AND_OPERATING_FLIGHT_NUMBER"
    | "flightNumberAndOperatingFlightNumber"
    | (string & {});
}

export const TemplateItem: Schema.Schema<TemplateItem> = Schema.suspend(() =>
  Schema.Struct({
    secondValue: Schema.optional(FieldSelector),
    firstValue: Schema.optional(FieldSelector),
    predefinedItem: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "TemplateItem",
}) as any as Schema.Schema<TemplateItem>;

export interface DetailsItemInfo {
  /** The item to be displayed in the details list. */
  item?: TemplateItem;
}

export const DetailsItemInfo: Schema.Schema<DetailsItemInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      item: Schema.optional(TemplateItem),
    }),
).annotate({
  identifier: "DetailsItemInfo",
}) as any as Schema.Schema<DetailsItemInfo>;

export interface DetailsTemplateOverride {
  /** Information for the "nth" item displayed in the details list. */
  detailsItemInfos?: Array<DetailsItemInfo>;
}

export const DetailsTemplateOverride: Schema.Schema<DetailsTemplateOverride> =
  Schema.suspend(() =>
    Schema.Struct({
      detailsItemInfos: Schema.optional(Schema.Array(DetailsItemInfo)),
    }),
  ).annotate({
    identifier: "DetailsTemplateOverride",
  }) as any as Schema.Schema<DetailsTemplateOverride>;

export interface FirstRowOption {
  transitOption?:
    | "TRANSIT_OPTION_UNSPECIFIED"
    | "ORIGIN_AND_DESTINATION_NAMES"
    | "originAndDestinationNames"
    | "ORIGIN_AND_DESTINATION_CODES"
    | "originAndDestinationCodes"
    | "ORIGIN_NAME"
    | "originName"
    | (string & {});
  /** A reference to the field to be displayed in the first row. */
  fieldOption?: FieldSelector;
}

export const FirstRowOption: Schema.Schema<FirstRowOption> = Schema.suspend(
  () =>
    Schema.Struct({
      transitOption: Schema.optional(Schema.String),
      fieldOption: Schema.optional(FieldSelector),
    }),
).annotate({
  identifier: "FirstRowOption",
}) as any as Schema.Schema<FirstRowOption>;

export interface ListTemplateOverride {
  /** An unused/deprecated field. Setting it will have no effect on what the user sees. */
  thirdRowOption?: FieldSelector;
  /** Specifies from a predefined set of options or from a reference to the field what will be displayed in the first row. To set this override, set the FirstRowOption.fieldOption to the FieldSelector of your choice. */
  firstRowOption?: FirstRowOption;
  /** A reference to the field to be displayed in the second row. This option is only displayed if there are not multiple user objects in a group. If there is a group, the second row will always display a field shared by all objects. To set this override, please set secondRowOption to the FieldSelector of you choice. */
  secondRowOption?: FieldSelector;
}

export const ListTemplateOverride: Schema.Schema<ListTemplateOverride> =
  Schema.suspend(() =>
    Schema.Struct({
      thirdRowOption: Schema.optional(FieldSelector),
      firstRowOption: Schema.optional(FirstRowOption),
      secondRowOption: Schema.optional(FieldSelector),
    }),
  ).annotate({
    identifier: "ListTemplateOverride",
  }) as any as Schema.Schema<ListTemplateOverride>;

export interface CardRowTwoItems {
  /** The item to be displayed at the start of the row. This item will be aligned to the left. */
  startItem?: TemplateItem;
  /** The item to be displayed at the end of the row. This item will be aligned to the right. */
  endItem?: TemplateItem;
}

export const CardRowTwoItems: Schema.Schema<CardRowTwoItems> = Schema.suspend(
  () =>
    Schema.Struct({
      startItem: Schema.optional(TemplateItem),
      endItem: Schema.optional(TemplateItem),
    }),
).annotate({
  identifier: "CardRowTwoItems",
}) as any as Schema.Schema<CardRowTwoItems>;

export interface CardRowThreeItems {
  /** The item to be displayed in the middle of the row. This item will be centered between the start and end items. */
  middleItem?: TemplateItem;
  /** The item to be displayed at the start of the row. This item will be aligned to the left. */
  startItem?: TemplateItem;
  /** The item to be displayed at the end of the row. This item will be aligned to the right. */
  endItem?: TemplateItem;
}

export const CardRowThreeItems: Schema.Schema<CardRowThreeItems> =
  Schema.suspend(() =>
    Schema.Struct({
      middleItem: Schema.optional(TemplateItem),
      startItem: Schema.optional(TemplateItem),
      endItem: Schema.optional(TemplateItem),
    }),
  ).annotate({
    identifier: "CardRowThreeItems",
  }) as any as Schema.Schema<CardRowThreeItems>;

export interface CardRowOneItem {
  /** The item to be displayed in the row. This item will be automatically centered. */
  item?: TemplateItem;
}

export const CardRowOneItem: Schema.Schema<CardRowOneItem> = Schema.suspend(
  () =>
    Schema.Struct({
      item: Schema.optional(TemplateItem),
    }),
).annotate({
  identifier: "CardRowOneItem",
}) as any as Schema.Schema<CardRowOneItem>;

export interface CardRowTemplateInfo {
  /** Template for a row containing two items. Exactly one of "one_item", "two_items", "three_items" must be set. */
  twoItems?: CardRowTwoItems;
  /** Template for a row containing three items. Exactly one of "one_item", "two_items", "three_items" must be set. */
  threeItems?: CardRowThreeItems;
  /** Template for a row containing one item. Exactly one of "one_item", "two_items", "three_items" must be set. */
  oneItem?: CardRowOneItem;
}

export const CardRowTemplateInfo: Schema.Schema<CardRowTemplateInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      twoItems: Schema.optional(CardRowTwoItems),
      threeItems: Schema.optional(CardRowThreeItems),
      oneItem: Schema.optional(CardRowOneItem),
    }),
  ).annotate({
    identifier: "CardRowTemplateInfo",
  }) as any as Schema.Schema<CardRowTemplateInfo>;

export interface CardTemplateOverride {
  /** Template information for rows in the card view. At most three rows are allowed to be specified. */
  cardRowTemplateInfos?: Array<CardRowTemplateInfo>;
}

export const CardTemplateOverride: Schema.Schema<CardTemplateOverride> =
  Schema.suspend(() =>
    Schema.Struct({
      cardRowTemplateInfos: Schema.optional(Schema.Array(CardRowTemplateInfo)),
    }),
  ).annotate({
    identifier: "CardTemplateOverride",
  }) as any as Schema.Schema<CardTemplateOverride>;

export interface ClassTemplateInfo {
  /** Specifies extra information to be displayed above and below the barcode. */
  cardBarcodeSectionDetails?: CardBarcodeSectionDetails;
  /** Override for the details view (beneath the card view). */
  detailsTemplateOverride?: DetailsTemplateOverride;
  /** Override for the passes list view. */
  listTemplateOverride?: ListTemplateOverride;
  /** Override for the card view. */
  cardTemplateOverride?: CardTemplateOverride;
}

export const ClassTemplateInfo: Schema.Schema<ClassTemplateInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      cardBarcodeSectionDetails: Schema.optional(CardBarcodeSectionDetails),
      detailsTemplateOverride: Schema.optional(DetailsTemplateOverride),
      listTemplateOverride: Schema.optional(ListTemplateOverride),
      cardTemplateOverride: Schema.optional(CardTemplateOverride),
    }),
  ).annotate({
    identifier: "ClassTemplateInfo",
  }) as any as Schema.Schema<ClassTemplateInfo>;

export interface CallbackOptions {
  /** The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. */
  url?: string;
  /** URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated. */
  updateRequestUrl?: string;
}

export const CallbackOptions: Schema.Schema<CallbackOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      updateRequestUrl: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CallbackOptions",
}) as any as Schema.Schema<CallbackOptions>;

export interface FlightCarrier {
  /** A logo for the airline described by carrierIataCode and localizedAirlineName. This logo will be rendered at the top of the detailed card view. */
  airlineLogo?: Image;
  /** Two character IATA airline code of the marketing carrier (as opposed to operating carrier). Exactly one of this or `carrierIcaoCode` needs to be provided for `carrier` and `operatingCarrier`. eg: "LX" for Swiss Air */
  carrierIataCode?: string;
  /** The wide logo of the airline. When provided, this will be used in place of the airline logo in the top left of the card view. */
  wideAirlineLogo?: Image;
  /** Three character ICAO airline code of the marketing carrier (as opposed to operating carrier). Exactly one of this or `carrierIataCode` needs to be provided for `carrier` and `operatingCarrier`. eg: "EZY" for Easy Jet */
  carrierIcaoCode?: string;
  /** A localized name of the airline specified by carrierIataCode. If unset, `issuer_name` or `localized_issuer_name` from `FlightClass` will be used for display purposes. eg: "Swiss Air" for "LX" */
  airlineName?: LocalizedString;
  /** A logo for the airline alliance, displayed below the QR code that the passenger scans to board. */
  airlineAllianceLogo?: Image;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#flightCarrier"`. */
  kind?: string;
}

export const FlightCarrier: Schema.Schema<FlightCarrier> = Schema.suspend(() =>
  Schema.Struct({
    airlineLogo: Schema.optional(Image),
    carrierIataCode: Schema.optional(Schema.String),
    wideAirlineLogo: Schema.optional(Image),
    carrierIcaoCode: Schema.optional(Schema.String),
    airlineName: Schema.optional(LocalizedString),
    airlineAllianceLogo: Schema.optional(Image),
    kind: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FlightCarrier",
}) as any as Schema.Schema<FlightCarrier>;

export interface FlightHeader {
  /** Override value to use for flight number. The default value used for display purposes is carrier + flight_number. If a different value needs to be shown to passengers, use this field to override the default behavior. eg: "XX1234 / YY576" */
  flightNumberDisplayOverride?: string;
  /** Information about airline carrier. This is a required property of `flightHeader`. */
  carrier?: FlightCarrier;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#flightHeader"`. */
  kind?: string;
  /** The flight number without IATA carrier code. This field should contain only digits. This is a required property of `flightHeader`. eg: "123" */
  flightNumber?: string;
  /** Information about operating airline carrier. */
  operatingCarrier?: FlightCarrier;
  /** The flight number used by the operating carrier without IATA carrier code. This field should contain only digits. eg: "234" */
  operatingFlightNumber?: string;
}

export const FlightHeader: Schema.Schema<FlightHeader> = Schema.suspend(() =>
  Schema.Struct({
    flightNumberDisplayOverride: Schema.optional(Schema.String),
    carrier: Schema.optional(FlightCarrier),
    kind: Schema.optional(Schema.String),
    flightNumber: Schema.optional(Schema.String),
    operatingCarrier: Schema.optional(FlightCarrier),
    operatingFlightNumber: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FlightHeader",
}) as any as Schema.Schema<FlightHeader>;

export interface FlightClass {
  /** Required. Origin airport. */
  origin?: AirportInfo;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Policies for boarding and seating. These will inform which labels will be shown to users. */
  boardingAndSeatingPolicy?: BoardingAndSeatingPolicy;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected by the validator. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** If this field is present, boarding passes served to a user's device will always be in this language. Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT". */
  languageOverride?: string;
  /** The gate closing time as it would be printed on the boarding pass. Do not set this field if you do not want to print it in the boarding pass. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on departure airport. */
  localGateClosingDateTime?: string;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** The boarding time as it would be printed on the boarding pass. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on departure airport. */
  localBoardingDateTime?: string;
  /** Deprecated */
  version?: string;
  /** The scheduled time the aircraft plans to reach the destination gate (not the runway). Note: This field should not change too close to the flight time. For updates to departure times (delays, etc), please set `localEstimatedOrActualArrivalDateTime`. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on arrival airport. */
  localScheduledArrivalDateTime?: string;
  /** Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#flightClass"`. */
  kind?: string;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** The estimated time the aircraft plans to pull from the gate or the actual time the aircraft already pulled from the gate. Note: This is not the runway time. This field should be set if at least one of the below is true: - It differs from the scheduled time. Google will use it to calculate the delay. - The aircraft already pulled from the gate. Google will use it to inform the user when the flight actually departed. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on departure airport. */
  localEstimatedOrActualDepartureDateTime?: string;
  /** Deprecated. */
  wordMark?: Image;
  /** Status of this flight. If unset, Google will compute status based on data from other sources, such as FlightStats, etc. Note: Google-computed status will not be returned in API responses. */
  flightStatus?:
    | "FLIGHT_STATUS_UNSPECIFIED"
    | "SCHEDULED"
    | "scheduled"
    | "ACTIVE"
    | "active"
    | "LANDED"
    | "landed"
    | "CANCELLED"
    | "cancelled"
    | "REDIRECTED"
    | "redirected"
    | "DIVERTED"
    | "diverted"
    | (string & {});
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** View Unlock Requirement options for the boarding pass. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** Required. The scheduled date and time when the aircraft is expected to depart the gate (not the runway) Note: This field should not change too close to the departure time. For updates to departure times (delays, etc), please set `localEstimatedOrActualDepartureDateTime`. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on departure airport. */
  localScheduledDepartureDateTime?: string;
  /** Required. Information about the flight carrier and number. */
  flightHeader?: FlightHeader;
  /** Required. Destination airport. */
  destination?: AirportInfo;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** The estimated time the aircraft plans to reach the destination gate (not the runway) or the actual time it reached the gate. This field should be set if at least one of the below is true: - It differs from the scheduled time. Google will use it to calculate the delay. - The aircraft already arrived at the gate. Google will use it to inform the user that the flight has arrived at the gate. This is an ISO 8601 extended format date/time without an offset. Time may be specified up to millisecond precision. eg: `2027-03-05T06:30:00` This should be the local date/time at the airport (not a UTC time). Google will reject the request if UTC offset is provided. Time zones will be calculated by Google based on arrival airport. */
  localEstimatedOrActualArrivalDateTime?: string;
}

export const FlightClass: Schema.Schema<FlightClass> = Schema.suspend(() =>
  Schema.Struct({
    origin: Schema.optional(AirportInfo),
    enableSmartTap: Schema.optional(Schema.Boolean),
    homepageUri: Schema.optional(Uri),
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    boardingAndSeatingPolicy: Schema.optional(BoardingAndSeatingPolicy),
    countryCode: Schema.optional(Schema.String),
    heroImage: Schema.optional(Image),
    securityAnimation: Schema.optional(SecurityAnimation),
    hexBackgroundColor: Schema.optional(Schema.String),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    languageOverride: Schema.optional(Schema.String),
    localGateClosingDateTime: Schema.optional(Schema.String),
    review: Schema.optional(Review),
    allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    localBoardingDateTime: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    localScheduledArrivalDateTime: Schema.optional(Schema.String),
    reviewStatus: Schema.optional(Schema.String),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    infoModuleData: Schema.optional(InfoModuleData),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    kind: Schema.optional(Schema.String),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    notifyPreference: Schema.optional(Schema.String),
    localEstimatedOrActualDepartureDateTime: Schema.optional(Schema.String),
    wordMark: Schema.optional(Image),
    flightStatus: Schema.optional(Schema.String),
    issuerName: Schema.optional(Schema.String),
    viewUnlockRequirement: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedIssuerName: Schema.optional(LocalizedString),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    localScheduledDepartureDateTime: Schema.optional(Schema.String),
    flightHeader: Schema.optional(FlightHeader),
    destination: Schema.optional(AirportInfo),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    localEstimatedOrActualArrivalDateTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "FlightClass" }) as any as Schema.Schema<FlightClass>;

export interface FlightObject {
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** An image for the security program that applies to the passenger. */
  securityProgramLogo?: Image;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
  /** Required. Information about flight reservation. */
  reservationInfo?: ReservationInfo;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#flightObject"`. */
  kind?: string;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** Passenger specific information about boarding and seating. */
  boardingAndSeatingInfo?: BoardingAndSeatingInfo;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this flight object. If a user had saved this boarding pass, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: FlightClass;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for Flights. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** Required. Passenger name as it would appear on the boarding pass. eg: "Dave M Gahan" or "Gahan/Dave" or "GAHAN/DAVEM" */
  passengerName?: string;
}

export const FlightObject: Schema.Schema<FlightObject> = Schema.suspend(() =>
  Schema.Struct({
    hasUsers: Schema.optional(Schema.Boolean),
    hasLinkedDevice: Schema.optional(Schema.Boolean),
    hexBackgroundColor: Schema.optional(Schema.String),
    securityProgramLogo: Schema.optional(Image),
    barcode: Schema.optional(Barcode),
    rotatingBarcode: Schema.optional(RotatingBarcode),
    heroImage: Schema.optional(Image),
    saveRestrictions: Schema.optional(SaveRestrictions),
    classId: Schema.optional(Schema.String),
    reservationInfo: Schema.optional(ReservationInfo),
    version: Schema.optional(Schema.String),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    state: Schema.optional(Schema.String),
    notifyPreference: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    validTimeInterval: Schema.optional(TimeInterval),
    groupingInfo: Schema.optional(GroupingInfo),
    boardingAndSeatingInfo: Schema.optional(BoardingAndSeatingInfo),
    smartTapRedemptionValue: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
    id: Schema.optional(Schema.String),
    classReference: Schema.optional(FlightClass),
    disableExpirationNotification: Schema.optional(Schema.Boolean),
    passConstraints: Schema.optional(PassConstraints),
    passengerName: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FlightObject",
}) as any as Schema.Schema<FlightObject>;

export interface FlightObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<FlightObject>;
}

export const FlightObjectListResponse: Schema.Schema<FlightObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(FlightObject)),
    }),
  ).annotate({
    identifier: "FlightObjectListResponse",
  }) as any as Schema.Schema<FlightObjectListResponse>;

export interface ActivationStatus {
  state?:
    | "UNKNOWN_STATE"
    | "NOT_ACTIVATED"
    | "not_activated"
    | "ACTIVATED"
    | "activated"
    | (string & {});
}

export const ActivationStatus: Schema.Schema<ActivationStatus> = Schema.suspend(
  () =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ActivationStatus",
}) as any as Schema.Schema<ActivationStatus>;

export interface EventDateTime {
  /** A custom label to use for the doors open value (`doorsOpen`) on the card detail view. This should only be used if the default "Doors Open" label or one of the `doorsOpenLabel` options is not sufficient. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used. */
  customDoorsOpenLabel?: LocalizedString;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventDateTime"`. */
  kind?: string;
  /** The label to use for the doors open value (`doorsOpen`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `doorsOpenLabel` and `customDoorsOpenLabel` may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used. */
  doorsOpenLabel?:
    | "DOORS_OPEN_LABEL_UNSPECIFIED"
    | "DOORS_OPEN"
    | "doorsOpen"
    | "GATES_OPEN"
    | "gatesOpen"
    | (string & {});
  /** The date/time when the doors open at the venue. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available. */
  doorsOpen?: string;
  /** The date/time when the event starts. If the event spans multiple days, it should be the start date/time on the first day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available. */
  start?: string;
  /** The date/time when the event ends. If the event spans multiple days, it should be the end date/time on the last day. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the venue is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available. */
  end?: string;
}

export const EventDateTime: Schema.Schema<EventDateTime> = Schema.suspend(() =>
  Schema.Struct({
    customDoorsOpenLabel: Schema.optional(LocalizedString),
    kind: Schema.optional(Schema.String),
    doorsOpenLabel: Schema.optional(Schema.String),
    doorsOpen: Schema.optional(Schema.String),
    start: Schema.optional(Schema.String),
    end: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "EventDateTime",
}) as any as Schema.Schema<EventDateTime>;

export interface EventVenue {
  /** The address of the venue, such as "24 Willie Mays Plaza\nSan Francisco, CA 94107". Address lines are separated by line feed (`\n`) characters. This is required. */
  address?: LocalizedString;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventVenue"`. */
  kind?: string;
  /** The name of the venue, such as "AT&T Park". This is required. */
  name?: LocalizedString;
}

export const EventVenue: Schema.Schema<EventVenue> = Schema.suspend(() =>
  Schema.Struct({
    address: Schema.optional(LocalizedString),
    kind: Schema.optional(Schema.String),
    name: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "EventVenue" }) as any as Schema.Schema<EventVenue>;

export interface EventTicketClass {
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** A custom label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. This should only be used if the default "Seat" label or one of the `seatLabel` options is not sufficient. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used. */
  customSeatLabel?: LocalizedString;
  /** View Unlock Requirement options for the event ticket. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** The label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used. */
  rowLabel?: "ROW_LABEL_UNSPECIFIED" | "ROW" | "row" | (string & {});
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventTicketClass"`. */
  kind?: string;
  /** The wide logo of the ticket. When provided, this will be used in place of the logo in the top left of the card view. */
  wideLogo?: Image;
  /** A custom label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. This should only be used if the default "Gate" label or one of the `gateLabel` options is not sufficient. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used. */
  customGateLabel?: LocalizedString;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** The date & time information of the event. */
  dateTime?: EventDateTime;
  /** The fine print, terms, or conditions of the ticket. */
  finePrint?: LocalizedString;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Deprecated. */
  wordMark?: Image;
  /** The label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used. */
  sectionLabel?:
    | "SECTION_LABEL_UNSPECIFIED"
    | "SECTION"
    | "section"
    | "THEATER"
    | "theater"
    | (string & {});
  /** Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** The ID of the event. This ID should be unique for every event in an account. It is used to group tickets together if the user has saved multiple tickets for the same event. It can be at most 64 characters. If provided, the grouping will be stable. Be wary of unintentional collision to avoid grouping tickets that should not be grouped. If you use only one class per event, you can simply set this to the `classId` (with or without the issuer ID portion). If not provided, the platform will attempt to use other data to group tickets (potentially unstable). */
  eventId?: string;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** The label to use for the seat value (`eventTicketObject.seatInfo.seat`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `seatLabel` and `customSeatLabel` may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used. */
  seatLabel?: "SEAT_LABEL_UNSPECIFIED" | "SEAT" | "seat" | (string & {});
  /** Deprecated */
  version?: string;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** The logo image of the ticket. This image is displayed in the card detail view of the app. */
  logo?: Image;
  /** A custom label to use for the row value (`eventTicketObject.seatInfo.row`) on the card detail view. This should only be used if the default "Row" label or one of the `rowLabel` options is not sufficient. Both `rowLabel` and `customRowLabel` may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used. */
  customRowLabel?: LocalizedString;
  /** The label to use for the gate value (`eventTicketObject.seatInfo.gate`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `gateLabel` and `customGateLabel` may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used. */
  gateLabel?:
    | "GATE_LABEL_UNSPECIFIED"
    | "GATE"
    | "gate"
    | "DOOR"
    | "door"
    | "ENTRANCE"
    | "entrance"
    | (string & {});
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** Event venue details. */
  venue?: EventVenue;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** A custom label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. This should only be used if the default "Confirmation Code" label or one of the `confirmationCodeLabel` options is not sufficient. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used. */
  customConfirmationCodeLabel?: LocalizedString;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** Required. The name of the event, such as "LA Dodgers at SF Giants". */
  eventName?: LocalizedString;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** The label to use for the confirmation code value (`eventTicketObject.reservationInfo.confirmationCode`) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale. Both `confirmationCodeLabel` and `customConfirmationCodeLabel` may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used. */
  confirmationCodeLabel?:
    | "CONFIRMATION_CODE_LABEL_UNSPECIFIED"
    | "CONFIRMATION_CODE"
    | "confirmationCode"
    | "CONFIRMATION_NUMBER"
    | "confirmationNumber"
    | "ORDER_NUMBER"
    | "orderNumber"
    | "RESERVATION_NUMBER"
    | "reservationNumber"
    | (string & {});
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** A custom label to use for the section value (`eventTicketObject.seatInfo.section`) on the card detail view. This should only be used if the default "Section" label or one of the `sectionLabel` options is not sufficient. Both `sectionLabel` and `customSectionLabel` may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used. */
  customSectionLabel?: LocalizedString;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
}

export const EventTicketClass: Schema.Schema<EventTicketClass> = Schema.suspend(
  () =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(LatLongPoint)),
      valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
      issuerName: Schema.optional(Schema.String),
      customSeatLabel: Schema.optional(LocalizedString),
      viewUnlockRequirement: Schema.optional(Schema.String),
      rowLabel: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      localizedIssuerName: Schema.optional(LocalizedString),
      multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
      callbackOptions: Schema.optional(CallbackOptions),
      kind: Schema.optional(Schema.String),
      wideLogo: Schema.optional(Image),
      customGateLabel: Schema.optional(LocalizedString),
      imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
      appLinkData: Schema.optional(AppLinkData),
      dateTime: Schema.optional(EventDateTime),
      finePrint: Schema.optional(LocalizedString),
      notifyPreference: Schema.optional(Schema.String),
      wordMark: Schema.optional(Image),
      sectionLabel: Schema.optional(Schema.String),
      reviewStatus: Schema.optional(Schema.String),
      infoModuleData: Schema.optional(InfoModuleData),
      eventId: Schema.optional(Schema.String),
      classTemplateInfo: Schema.optional(ClassTemplateInfo),
      linksModuleData: Schema.optional(LinksModuleData),
      messages: Schema.optional(Schema.Array(Message)),
      textModulesData: Schema.optional(Schema.Array(TextModuleData)),
      seatLabel: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
      logo: Schema.optional(Image),
      customRowLabel: Schema.optional(LocalizedString),
      gateLabel: Schema.optional(Schema.String),
      allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
      review: Schema.optional(Review),
      venue: Schema.optional(EventVenue),
      heroImage: Schema.optional(Image),
      customConfirmationCodeLabel: Schema.optional(LocalizedString),
      securityAnimation: Schema.optional(SecurityAnimation),
      eventName: Schema.optional(LocalizedString),
      hexBackgroundColor: Schema.optional(Schema.String),
      enableSmartTap: Schema.optional(Schema.Boolean),
      confirmationCodeLabel: Schema.optional(Schema.String),
      homepageUri: Schema.optional(Uri),
      redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
      customSectionLabel: Schema.optional(LocalizedString),
      countryCode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EventTicketClass",
}) as any as Schema.Schema<EventTicketClass>;

export interface JwtResource {
  /** Required. A string representing a JWT of the format described at https://developers.google.com/wallet/reference/rest/v1/Jwt */
  jwt?: string;
}

export const JwtResource: Schema.Schema<JwtResource> = Schema.suspend(() =>
  Schema.Struct({
    jwt: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "JwtResource" }) as any as Schema.Schema<JwtResource>;

export interface DiscoverableProgramMerchantSignupInfo {
  /** The URL to direct the user to for the merchant's signup site. */
  signupWebsite?: Uri;
  /** User data that is sent in a POST request to the signup website URL. This information is encoded and then shared so that the merchant's website can prefill fields used to enroll the user for the discoverable program. */
  signupSharedDatas?: Array<
    | "SHARED_DATA_TYPE_UNSPECIFIED"
    | "FIRST_NAME"
    | "LAST_NAME"
    | "STREET_ADDRESS"
    | "ADDRESS_LINE_1"
    | "ADDRESS_LINE_2"
    | "ADDRESS_LINE_3"
    | "CITY"
    | "STATE"
    | "ZIPCODE"
    | "COUNTRY"
    | "EMAIL"
    | "PHONE"
    | (string & {})
  >;
}

export const DiscoverableProgramMerchantSignupInfo: Schema.Schema<DiscoverableProgramMerchantSignupInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      signupWebsite: Schema.optional(Uri),
      signupSharedDatas: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DiscoverableProgramMerchantSignupInfo",
  }) as any as Schema.Schema<DiscoverableProgramMerchantSignupInfo>;

export interface DiscoverableProgramMerchantSigninInfo {
  /** The URL to direct the user to for the merchant's signin site. */
  signinWebsite?: Uri;
}

export const DiscoverableProgramMerchantSigninInfo: Schema.Schema<DiscoverableProgramMerchantSigninInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      signinWebsite: Schema.optional(Uri),
    }),
  ).annotate({
    identifier: "DiscoverableProgramMerchantSigninInfo",
  }) as any as Schema.Schema<DiscoverableProgramMerchantSigninInfo>;

export interface DiscoverableProgram {
  /** Visibility state of the discoverable program. */
  state?:
    | "STATE_UNSPECIFIED"
    | "TRUSTED_TESTERS"
    | "trustedTesters"
    | "LIVE"
    | "live"
    | "DISABLED"
    | "disabled"
    | (string & {});
  /** Information about the ability to signup and add a valuable for this program through a merchant site. Used when MERCHANT_HOSTED_SIGNUP is enabled. */
  merchantSignupInfo?: DiscoverableProgramMerchantSignupInfo;
  /** Information about the ability to signin and add a valuable for this program through a merchant site. Used when MERCHANT_HOSTED_SIGNIN is enabled. */
  merchantSigninInfo?: DiscoverableProgramMerchantSigninInfo;
}

export const DiscoverableProgram: Schema.Schema<DiscoverableProgram> =
  Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      merchantSignupInfo: Schema.optional(
        DiscoverableProgramMerchantSignupInfo,
      ),
      merchantSigninInfo: Schema.optional(
        DiscoverableProgramMerchantSigninInfo,
      ),
    }),
  ).annotate({
    identifier: "DiscoverableProgram",
  }) as any as Schema.Schema<DiscoverableProgram>;

export interface LoyaltyClass {
  /** The rewards tier, such as "Gold" or "Platinum." Recommended maximum length is 7 characters to ensure full string is displayed on smaller screens. */
  rewardsTier?: string;
  /** Translated strings for the secondary_rewards_tier. */
  localizedSecondaryRewardsTier?: LocalizedString;
  /** Translated strings for the rewards_tier_label. Recommended maximum length is 9 characters to ensure full string is displayed on smaller screens. */
  localizedRewardsTierLabel?: LocalizedString;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and one of object level `smartTapRedemptionLevel`, barcode.value`, or `accountId` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and one of object level `smartTapRedemptionValue`, barcode.value`, or `accountId` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Translated strings for the account_name_label. Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens. */
  localizedAccountNameLabel?: LocalizedString;
  /** Information about how the class may be discovered and instantiated from within the Google Pay app. */
  discoverableProgram?: DiscoverableProgram;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** The account name label, such as "Member Name." Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens. */
  accountNameLabel?: string;
  /** The secondary rewards tier, such as "Gold" or "Platinum." */
  secondaryRewardsTier?: string;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Translated strings for the account_id_label. Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens. */
  localizedAccountIdLabel?: LocalizedString;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** The rewards tier label, such as "Rewards Tier." Recommended maximum length is 9 characters to ensure full string is displayed on smaller screens. */
  rewardsTierLabel?: string;
  /** Deprecated */
  version?: string;
  /** The wide logo of the loyalty program or company. When provided, this will be used in place of the program logo in the top left of the card view. */
  wideProgramLogo?: Image;
  /** The secondary rewards tier label, such as "Rewards Tier." */
  secondaryRewardsTierLabel?: string;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#loyaltyClass"`. */
  kind?: string;
  /** Required. The logo of the loyalty program or company. This logo is displayed in both the details and list views of the app. */
  programLogo?: Image;
  /** Deprecated. */
  wordMark?: Image;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Translated strings for the program_name. The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens. */
  localizedProgramName?: LocalizedString;
  /** View Unlock Requirement options for the loyalty card. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** Required. The program name, such as "Adam's Apparel". The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens. */
  programName?: string;
  /** Translated strings for the rewards_tier. Recommended maximum length is 7 characters to ensure full string is displayed on smaller screens. */
  localizedRewardsTier?: LocalizedString;
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** The account ID label, such as "Member ID." Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens. */
  accountIdLabel?: string;
  /** Translated strings for the secondary_rewards_tier_label. */
  localizedSecondaryRewardsTierLabel?: LocalizedString;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
}

export const LoyaltyClass: Schema.Schema<LoyaltyClass> = Schema.suspend(() =>
  Schema.Struct({
    rewardsTier: Schema.optional(Schema.String),
    localizedSecondaryRewardsTier: Schema.optional(LocalizedString),
    localizedRewardsTierLabel: Schema.optional(LocalizedString),
    enableSmartTap: Schema.optional(Schema.Boolean),
    countryCode: Schema.optional(Schema.String),
    homepageUri: Schema.optional(Uri),
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    localizedAccountNameLabel: Schema.optional(LocalizedString),
    discoverableProgram: Schema.optional(DiscoverableProgram),
    heroImage: Schema.optional(Image),
    accountNameLabel: Schema.optional(Schema.String),
    secondaryRewardsTier: Schema.optional(Schema.String),
    hexBackgroundColor: Schema.optional(Schema.String),
    localizedAccountIdLabel: Schema.optional(LocalizedString),
    securityAnimation: Schema.optional(SecurityAnimation),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    review: Schema.optional(Review),
    allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    rewardsTierLabel: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    wideProgramLogo: Schema.optional(Image),
    secondaryRewardsTierLabel: Schema.optional(Schema.String),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    infoModuleData: Schema.optional(InfoModuleData),
    reviewStatus: Schema.optional(Schema.String),
    messages: Schema.optional(Schema.Array(Message)),
    linksModuleData: Schema.optional(LinksModuleData),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    kind: Schema.optional(Schema.String),
    programLogo: Schema.optional(Image),
    wordMark: Schema.optional(Image),
    notifyPreference: Schema.optional(Schema.String),
    localizedProgramName: Schema.optional(LocalizedString),
    viewUnlockRequirement: Schema.optional(Schema.String),
    programName: Schema.optional(Schema.String),
    localizedRewardsTier: Schema.optional(LocalizedString),
    issuerName: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedIssuerName: Schema.optional(LocalizedString),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    accountIdLabel: Schema.optional(Schema.String),
    localizedSecondaryRewardsTierLabel: Schema.optional(LocalizedString),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
  }),
).annotate({
  identifier: "LoyaltyClass",
}) as any as Schema.Schema<LoyaltyClass>;

export interface LoyaltyClassAddMessageResponse {
  /** The updated LoyaltyClass resource. */
  resource?: LoyaltyClass;
}

export const LoyaltyClassAddMessageResponse: Schema.Schema<LoyaltyClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(LoyaltyClass),
    }),
  ).annotate({
    identifier: "LoyaltyClassAddMessageResponse",
  }) as any as Schema.Schema<LoyaltyClassAddMessageResponse>;

export interface ObjectId {
  /** Generation of the object. Generations are monotonically increasing across writes, allowing them to be be compared to determine which generation is newer. If this is omitted in a request, then you are requesting the live object. See http://go/bigstore-versions */
  generation?: string;
  /** The name of the bucket to which this object belongs. */
  bucketName?: string;
  /** The name of the object. */
  objectName?: string;
}

export const ObjectId: Schema.Schema<ObjectId> = Schema.suspend(() =>
  Schema.Struct({
    generation: Schema.optional(Schema.String),
    bucketName: Schema.optional(Schema.String),
    objectName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ObjectId" }) as any as Schema.Schema<ObjectId>;

export interface Blobstore2Info {
  /** The blob generation id. */
  blobGeneration?: string;
  /** Metadata passed from Blobstore -> Scotty for a new GCS upload. This is a signed, serialized blobstore2.BlobMetadataContainer proto which must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  uploadMetadataContainer?: string;
  /** The blob id, e.g., /blobstore/prod/playground/scotty */
  blobId?: string;
  /** The blob read token. Needed to read blobs that have not been replicated. Might not be available until the final call. */
  readToken?: string;
  /** A serialized External Read Token passed from Bigstore -> Scotty for a GCS download. This field must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  downloadExternalReadToken?: string;
  /** Read handle passed from Bigstore -> Scotty for a GCS download. This is a signed, serialized blobstore2.ReadHandle proto which must never be set outside of Bigstore, and is not applicable to non-GCS media downloads. */
  downloadReadHandle?: string;
  /** A serialized Object Fragment List Creation Info passed from Bigstore -> Scotty for a GCS upload. This field must never be consumed outside of Bigstore, and is not applicable to non-GCS media uploads. */
  uploadFragmentListCreationInfo?: string;
}

export const Blobstore2Info: Schema.Schema<Blobstore2Info> = Schema.suspend(
  () =>
    Schema.Struct({
      blobGeneration: Schema.optional(Schema.String),
      uploadMetadataContainer: Schema.optional(Schema.String),
      blobId: Schema.optional(Schema.String),
      readToken: Schema.optional(Schema.String),
      downloadExternalReadToken: Schema.optional(Schema.String),
      downloadReadHandle: Schema.optional(Schema.String),
      uploadFragmentListCreationInfo: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "Blobstore2Info",
}) as any as Schema.Schema<Blobstore2Info>;

export interface CompositeMedia {
  /** Reference to a TI Blob, set if reference_type is BIGSTORE_REF. */
  objectId?: ObjectId;
  /** SHA-1 hash for the payload. */
  sha1Hash?: string;
  /** Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef. */
  blobRef?: string;
  /** A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn't support JavaScript. This prevents us from including the actual type of this field. */
  cosmoBinaryReference?: string;
  /** Path to the data, set if reference_type is PATH */
  path?: string;
  /** MD5 hash for the payload. */
  md5Hash?: string;
  /** Media data, set if reference_type is INLINE */
  inline?: string;
  /** crc32.c hash for the payload. */
  crc32cHash?: number;
  /** Describes what the field reference contains. */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "BIGSTORE_REF"
    | "COSMO_BINARY_REFERENCE"
    | (string & {});
  /** Size of the data, in bytes */
  length?: string;
  /** Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob. */
  blobstore2Info?: Blobstore2Info;
}

export const CompositeMedia: Schema.Schema<CompositeMedia> = Schema.suspend(
  () =>
    Schema.Struct({
      objectId: Schema.optional(ObjectId),
      sha1Hash: Schema.optional(Schema.String),
      blobRef: Schema.optional(Schema.String),
      cosmoBinaryReference: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      md5Hash: Schema.optional(Schema.String),
      inline: Schema.optional(Schema.String),
      crc32cHash: Schema.optional(Schema.Number),
      referenceType: Schema.optional(Schema.String),
      length: Schema.optional(Schema.String),
      blobstore2Info: Schema.optional(Blobstore2Info),
    }),
).annotate({
  identifier: "CompositeMedia",
}) as any as Schema.Schema<CompositeMedia>;

export interface EventTicketClassAddMessageResponse {
  /** The updated EventTicketClass resource. */
  resource?: EventTicketClass;
}

export const EventTicketClassAddMessageResponse: Schema.Schema<EventTicketClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(EventTicketClass),
    }),
  ).annotate({
    identifier: "EventTicketClassAddMessageResponse",
  }) as any as Schema.Schema<EventTicketClassAddMessageResponse>;

export interface LoyaltyClassListResponse {
  /** Resources corresponding to the list request. */
  resources?: Array<LoyaltyClass>;
  /** Pagination of the response. */
  pagination?: Pagination;
}

export const LoyaltyClassListResponse: Schema.Schema<LoyaltyClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(LoyaltyClass)),
      pagination: Schema.optional(Pagination),
    }),
  ).annotate({
    identifier: "LoyaltyClassListResponse",
  }) as any as Schema.Schema<LoyaltyClassListResponse>;

export interface GiftCardClass {
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** The label to display for event number, such as "Target Event #". */
  eventNumberLabel?: string;
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** Deprecated */
  version?: string;
  /** The wide logo of the gift card program or company. When provided, this will be used in place of the program logo in the top left of the card view. */
  wideProgramLogo?: Image;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** Translated strings for the pin_label. */
  localizedPinLabel?: LocalizedString;
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
  /** Translated strings for the merchant_name. The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens. */
  localizedMerchantName?: LocalizedString;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** Translated strings for the event_number_label. */
  localizedEventNumberLabel?: LocalizedString;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** View Unlock Requirement options for the gift card. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** The label to display for the card number, such as "Card Number". */
  cardNumberLabel?: string;
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** Translated strings for the card_number_label. */
  localizedCardNumberLabel?: LocalizedString;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Determines whether the merchant supports gift card redemption using barcode. If true, app displays a barcode for the gift card on the Gift card details screen. If false, a barcode is not displayed. */
  allowBarcodeRedemption?: boolean;
  /** Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** The label to display for the PIN, such as "4-digit PIN". */
  pinLabel?: string;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#giftCardClass"`. */
  kind?: string;
  /** The logo of the gift card program or company. This logo is displayed in both the details and list views of the app. */
  programLogo?: Image;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** Merchant name, such as "Adam's Apparel". The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens. */
  merchantName?: string;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Deprecated. */
  wordMark?: Image;
}

export const GiftCardClass: Schema.Schema<GiftCardClass> = Schema.suspend(() =>
  Schema.Struct({
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    eventNumberLabel: Schema.optional(Schema.String),
    allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
    review: Schema.optional(Review),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    version: Schema.optional(Schema.String),
    wideProgramLogo: Schema.optional(Image),
    enableSmartTap: Schema.optional(Schema.Boolean),
    localizedPinLabel: Schema.optional(LocalizedString),
    homepageUri: Schema.optional(Uri),
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    countryCode: Schema.optional(Schema.String),
    localizedMerchantName: Schema.optional(LocalizedString),
    heroImage: Schema.optional(Image),
    securityAnimation: Schema.optional(SecurityAnimation),
    localizedEventNumberLabel: Schema.optional(LocalizedString),
    hexBackgroundColor: Schema.optional(Schema.String),
    issuerName: Schema.optional(Schema.String),
    viewUnlockRequirement: Schema.optional(Schema.String),
    cardNumberLabel: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedIssuerName: Schema.optional(LocalizedString),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    localizedCardNumberLabel: Schema.optional(LocalizedString),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    allowBarcodeRedemption: Schema.optional(Schema.Boolean),
    reviewStatus: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    linksModuleData: Schema.optional(LinksModuleData),
    pinLabel: Schema.optional(Schema.String),
    messages: Schema.optional(Schema.Array(Message)),
    kind: Schema.optional(Schema.String),
    programLogo: Schema.optional(Image),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    merchantName: Schema.optional(Schema.String),
    notifyPreference: Schema.optional(Schema.String),
    wordMark: Schema.optional(Image),
  }),
).annotate({
  identifier: "GiftCardClass",
}) as any as Schema.Schema<GiftCardClass>;

export interface GiftCardClassAddMessageResponse {
  /** The updated GiftCardClass resource. */
  resource?: GiftCardClass;
}

export const GiftCardClassAddMessageResponse: Schema.Schema<GiftCardClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(GiftCardClass),
    }),
  ).annotate({
    identifier: "GiftCardClassAddMessageResponse",
  }) as any as Schema.Schema<GiftCardClassAddMessageResponse>;

export interface DiffChecksumsResponse {
  /** If set, calculate the checksums based on the contents and return them to the caller. */
  objectLocation?: CompositeMedia;
  /** The object version of the object the checksums are being returned for. */
  objectVersion?: string;
  /** The total size of the server object. */
  objectSizeBytes?: string;
  /** The chunk size of checksums. Must be a multiple of 256KB. */
  chunkSizeBytes?: string;
  /** Exactly one of these fields must be populated. If checksums_location is filled, the server will return the corresponding contents to the user. If object_location is filled, the server will calculate the checksums based on the content there and return that to the user. For details on the format of the checksums, see http://go/scotty-diff-protocol. */
  checksumsLocation?: CompositeMedia;
}

export const DiffChecksumsResponse: Schema.Schema<DiffChecksumsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(CompositeMedia),
      objectVersion: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
      chunkSizeBytes: Schema.optional(Schema.String),
      checksumsLocation: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffChecksumsResponse",
  }) as any as Schema.Schema<DiffChecksumsResponse>;

export interface TransitObjectUploadRotatingBarcodeValuesResponse {}

export const TransitObjectUploadRotatingBarcodeValuesResponse: Schema.Schema<TransitObjectUploadRotatingBarcodeValuesResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "TransitObjectUploadRotatingBarcodeValuesResponse",
  }) as any as Schema.Schema<TransitObjectUploadRotatingBarcodeValuesResponse>;

export interface EventSeat {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventSeat"`. */
  kind?: string;
  /** The row of the seat, such as "1", E", "BB", or "A5". This field is localizable so you may translate words or use different alphabets for the characters in an identifier. */
  row?: LocalizedString;
  /** The gate the ticket holder should enter to get to their seat, such as "A" or "West". This field is localizable so you may translate words or use different alphabets for the characters in an identifier. */
  gate?: LocalizedString;
  /** The seat number, such as "1", "2", "3", or any other seat identifier. This field is localizable so you may translate words or use different alphabets for the characters in an identifier. */
  seat?: LocalizedString;
  /** The section of the seat, such as "121". This field is localizable so you may translate words or use different alphabets for the characters in an identifier. */
  section?: LocalizedString;
}

export const EventSeat: Schema.Schema<EventSeat> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    row: Schema.optional(LocalizedString),
    gate: Schema.optional(LocalizedString),
    seat: Schema.optional(LocalizedString),
    section: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "EventSeat" }) as any as Schema.Schema<EventSeat>;

export interface EventReservationInfo {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventReservationInfo"`. */
  kind?: string;
  /** The confirmation code of the event reservation. This may also take the form of an "order number", "confirmation number", "reservation number", or other equivalent. */
  confirmationCode?: string;
}

export const EventReservationInfo: Schema.Schema<EventReservationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      kind: Schema.optional(Schema.String),
      confirmationCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EventReservationInfo",
  }) as any as Schema.Schema<EventReservationInfo>;

export interface Money {
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#money"`. */
  kind?: string;
  /** The unit of money amount in micros. For example, $1 USD would be represented as 1000000 micros. */
  micros?: string;
  /** The currency code, such as "USD" or "EUR." */
  currencyCode?: string;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() =>
  Schema.Struct({
    kind: Schema.optional(Schema.String),
    micros: Schema.optional(Schema.String),
    currencyCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface EventTicketObject {
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#eventTicketObject"`. */
  kind?: string;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: EventTicketClass;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** Seating details for this ticket. */
  seatInfo?: EventSeat;
  /** Name of the ticket holder, if the ticket is assigned to a person. E.g. "John Doe" or "Jane Doe". */
  ticketHolderName?: string;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this event ticket object. If a user had saved this event ticket, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** The type of the ticket, such as "Adult" or "Child", or "VIP" or "Standard". */
  ticketType?: LocalizedString;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
  /** Reservation details for this ticket. This is expected to be shared amongst all tickets that were purchased in the same order. */
  reservationInfo?: EventReservationInfo;
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** The face value of the ticket, matching what would be printed on a physical version of the ticket. */
  faceValue?: Money;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** The number of the ticket. This can be a unique identifier across all tickets in an issuer's system, all tickets for the event (e.g. XYZ1234512345), or all tickets in the order (1, 2, 3, etc.). */
  ticketNumber?: string;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** A list of offer objects linked to this event ticket. The offer objects must already exist. Offer object IDs should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. */
  linkedOfferIds?: Array<string>;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
}

export const EventTicketObject: Schema.Schema<EventTicketObject> =
  Schema.suspend(() =>
    Schema.Struct({
      linksModuleData: Schema.optional(LinksModuleData),
      messages: Schema.optional(Schema.Array(Message)),
      validTimeInterval: Schema.optional(TimeInterval),
      groupingInfo: Schema.optional(GroupingInfo),
      smartTapRedemptionValue: Schema.optional(Schema.String),
      infoModuleData: Schema.optional(InfoModuleData),
      notifyPreference: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
      appLinkData: Schema.optional(AppLinkData),
      id: Schema.optional(Schema.String),
      classReference: Schema.optional(EventTicketClass),
      disableExpirationNotification: Schema.optional(Schema.Boolean),
      passConstraints: Schema.optional(PassConstraints),
      seatInfo: Schema.optional(EventSeat),
      ticketHolderName: Schema.optional(Schema.String),
      locations: Schema.optional(Schema.Array(LatLongPoint)),
      valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
      linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
      ticketType: Schema.optional(LocalizedString),
      saveRestrictions: Schema.optional(SaveRestrictions),
      classId: Schema.optional(Schema.String),
      reservationInfo: Schema.optional(EventReservationInfo),
      hasUsers: Schema.optional(Schema.Boolean),
      hasLinkedDevice: Schema.optional(Schema.Boolean),
      hexBackgroundColor: Schema.optional(Schema.String),
      faceValue: Schema.optional(Money),
      barcode: Schema.optional(Barcode),
      ticketNumber: Schema.optional(Schema.String),
      rotatingBarcode: Schema.optional(RotatingBarcode),
      heroImage: Schema.optional(Image),
      merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
      state: Schema.optional(Schema.String),
      linkedOfferIds: Schema.optional(Schema.Array(Schema.String)),
      version: Schema.optional(Schema.String),
      textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    }),
  ).annotate({
    identifier: "EventTicketObject",
  }) as any as Schema.Schema<EventTicketObject>;

export interface AuthenticationKey {
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  id?: number;
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  publicKeyPem?: string;
}

export const AuthenticationKey: Schema.Schema<AuthenticationKey> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.Number),
      publicKeyPem: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthenticationKey",
  }) as any as Schema.Schema<AuthenticationKey>;

export interface LoyaltyPointsBalance {
  /** The integer form of a balance. Only one of these subtypes (string, int, double, money) should be populated. */
  int?: number;
  /** The double form of a balance. Only one of these subtypes (string, int, double, money) should be populated. */
  double?: number;
  /** The money form of a balance. Only one of these subtypes (string, int, double, money) should be populated. */
  money?: Money;
  /** The string form of a balance. Only one of these subtypes (string, int, double, money) should be populated. */
  string?: string;
}

export const LoyaltyPointsBalance: Schema.Schema<LoyaltyPointsBalance> =
  Schema.suspend(() =>
    Schema.Struct({
      int: Schema.optional(Schema.Number),
      double: Schema.optional(Schema.Number),
      money: Schema.optional(Money),
      string: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LoyaltyPointsBalance",
  }) as any as Schema.Schema<LoyaltyPointsBalance>;

export interface LoyaltyPoints {
  /** Translated strings for the label. Recommended maximum length is 9 characters. */
  localizedLabel?: LocalizedString;
  /** The loyalty points label, such as "Points". Recommended maximum length is 9 characters. */
  label?: string;
  /** The account holder's loyalty point balance, such as "500" or "$10.00". Recommended maximum length is 7 characters. This is a required field of `loyaltyPoints` and `secondaryLoyaltyPoints`. */
  balance?: LoyaltyPointsBalance;
}

export const LoyaltyPoints: Schema.Schema<LoyaltyPoints> = Schema.suspend(() =>
  Schema.Struct({
    localizedLabel: Schema.optional(LocalizedString),
    label: Schema.optional(Schema.String),
    balance: Schema.optional(LoyaltyPointsBalance),
  }),
).annotate({
  identifier: "LoyaltyPoints",
}) as any as Schema.Schema<LoyaltyPoints>;

export interface LoyaltyObject {
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** The loyalty reward points label, balance, and type. */
  loyaltyPoints?: LoyaltyPoints;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this loyalty object. If a user had saved this loyalty card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** The secondary loyalty reward points label, balance, and type. Shown in addition to the primary loyalty points. */
  secondaryLoyaltyPoints?: LoyaltyPoints;
  /** The loyalty account identifier. Recommended maximum length is 20 characters. */
  accountId?: string;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: LoyaltyClass;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** The loyalty account holder name, such as "John Smith." Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  accountName?: string;
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#loyaltyObject"`. */
  kind?: string;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. If this value is not set but the class level fields `enableSmartTap` and `redemptionIssuers` are set up correctly, the `barcode.value` or the `accountId` fields are used as fallback if present. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** A list of offer objects linked to this loyalty card. The offer objects must already exist. Offer object IDs should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. */
  linkedOfferIds?: Array<string>;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
}

export const LoyaltyObject: Schema.Schema<LoyaltyObject> = Schema.suspend(() =>
  Schema.Struct({
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    loyaltyPoints: Schema.optional(LoyaltyPoints),
    linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
    secondaryLoyaltyPoints: Schema.optional(LoyaltyPoints),
    accountId: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    classReference: Schema.optional(LoyaltyClass),
    disableExpirationNotification: Schema.optional(Schema.Boolean),
    passConstraints: Schema.optional(PassConstraints),
    accountName: Schema.optional(Schema.String),
    notifyPreference: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    validTimeInterval: Schema.optional(TimeInterval),
    groupingInfo: Schema.optional(GroupingInfo),
    smartTapRedemptionValue: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    linkedOfferIds: Schema.optional(Schema.Array(Schema.String)),
    version: Schema.optional(Schema.String),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    state: Schema.optional(Schema.String),
    hasUsers: Schema.optional(Schema.Boolean),
    hasLinkedDevice: Schema.optional(Schema.Boolean),
    barcode: Schema.optional(Barcode),
    rotatingBarcode: Schema.optional(RotatingBarcode),
    heroImage: Schema.optional(Image),
    saveRestrictions: Schema.optional(SaveRestrictions),
    classId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "LoyaltyObject",
}) as any as Schema.Schema<LoyaltyObject>;

export interface LoyaltyObjectAddMessageResponse {
  /** The updated LoyaltyObject resource. */
  resource?: LoyaltyObject;
}

export const LoyaltyObjectAddMessageResponse: Schema.Schema<LoyaltyObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(LoyaltyObject),
    }),
  ).annotate({
    identifier: "LoyaltyObjectAddMessageResponse",
  }) as any as Schema.Schema<LoyaltyObjectAddMessageResponse>;

export interface GiftCardClassListResponse {
  /** Resources corresponding to the list request. */
  resources?: Array<GiftCardClass>;
  /** Pagination of the response. */
  pagination?: Pagination;
}

export const GiftCardClassListResponse: Schema.Schema<GiftCardClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(GiftCardClass)),
      pagination: Schema.optional(Pagination),
    }),
  ).annotate({
    identifier: "GiftCardClassListResponse",
  }) as any as Schema.Schema<GiftCardClassListResponse>;

export interface IssuerContactInfo {
  /** The primary contact email address. */
  email?: string;
  /** Email addresses which will receive alerts. */
  alertsEmails?: Array<string>;
  /** The primary contact name. */
  name?: string;
  /** The primary contact phone number. */
  phone?: string;
}

export const IssuerContactInfo: Schema.Schema<IssuerContactInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      alertsEmails: Schema.optional(Schema.Array(Schema.String)),
      name: Schema.optional(Schema.String),
      phone: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "IssuerContactInfo",
  }) as any as Schema.Schema<IssuerContactInfo>;

export interface DiffUploadResponse {
  /** The object version of the object at the server. Must be included in the end notification response. The version in the end notification response must correspond to the new version of the object that is now stored at the server, after the upload. */
  objectVersion?: string;
  /** The location of the original file for a diff upload request. Must be filled in if responding to an upload start notification. */
  originalObject?: CompositeMedia;
}

export const DiffUploadResponse: Schema.Schema<DiffUploadResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      originalObject: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffUploadResponse",
  }) as any as Schema.Schema<DiffUploadResponse>;

export interface GiftCardObject {
  /** The card's event number, an optional field used by some gift cards. */
  eventNumber?: string;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** Deprecated */
  version?: string;
  /** The date and time when the balance was last updated. Offset is required. If balance is updated and this property is not provided, system will default to the current time. */
  balanceUpdateTime?: DateTime;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** Required. The card's number. */
  cardNumber?: string;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** The card's monetary balance. */
  balance?: Money;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The card's PIN. */
  pin?: string;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: GiftCardClass;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this giftcard object. If a user had saved this gift card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#giftCardObject"`. */
  kind?: string;
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
}

export const GiftCardObject: Schema.Schema<GiftCardObject> = Schema.suspend(
  () =>
    Schema.Struct({
      eventNumber: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
      textModulesData: Schema.optional(Schema.Array(TextModuleData)),
      version: Schema.optional(Schema.String),
      balanceUpdateTime: Schema.optional(DateTime),
      classId: Schema.optional(Schema.String),
      saveRestrictions: Schema.optional(SaveRestrictions),
      cardNumber: Schema.optional(Schema.String),
      rotatingBarcode: Schema.optional(RotatingBarcode),
      balance: Schema.optional(Money),
      heroImage: Schema.optional(Image),
      barcode: Schema.optional(Barcode),
      hasUsers: Schema.optional(Schema.Boolean),
      hasLinkedDevice: Schema.optional(Schema.Boolean),
      pin: Schema.optional(Schema.String),
      disableExpirationNotification: Schema.optional(Schema.Boolean),
      passConstraints: Schema.optional(PassConstraints),
      id: Schema.optional(Schema.String),
      classReference: Schema.optional(GiftCardClass),
      linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
      locations: Schema.optional(Schema.Array(LatLongPoint)),
      valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
      groupingInfo: Schema.optional(GroupingInfo),
      smartTapRedemptionValue: Schema.optional(Schema.String),
      infoModuleData: Schema.optional(InfoModuleData),
      messages: Schema.optional(Schema.Array(Message)),
      validTimeInterval: Schema.optional(TimeInterval),
      linksModuleData: Schema.optional(LinksModuleData),
      imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
      appLinkData: Schema.optional(AppLinkData),
      kind: Schema.optional(Schema.String),
      notifyPreference: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "GiftCardObject",
}) as any as Schema.Schema<GiftCardObject>;

export interface GiftCardObjectAddMessageResponse {
  /** The updated GiftCardObject resource. */
  resource?: GiftCardObject;
}

export const GiftCardObjectAddMessageResponse: Schema.Schema<GiftCardObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(GiftCardObject),
    }),
  ).annotate({
    identifier: "GiftCardObjectAddMessageResponse",
  }) as any as Schema.Schema<GiftCardObjectAddMessageResponse>;

export interface ActivationOptions {
  /** Flag to allow users to make activation call from different device. This allows client to render the activation button enabled even if the activationStatus is ACTIVATED but the requested device is different than the current device. */
  allowReactivation?: boolean;
  /** HTTPS URL that supports REST semantics. Would be used for requesting activation from partners for given valuable, triggered by the users. */
  activationUrl?: string;
}

export const ActivationOptions: Schema.Schema<ActivationOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      allowReactivation: Schema.optional(Schema.Boolean),
      activationUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActivationOptions",
  }) as any as Schema.Schema<ActivationOptions>;

export interface TransitClass {
  /** A custom label to use for the carriage value (`transitObject.ticketLeg.carriage`). */
  customCarriageLabel?: LocalizedString;
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** A custom label to use for the time restrictions details value (`transitObject.ticketRestrictions.timeRestrictions`). */
  customTimeRestrictionsLabel?: LocalizedString;
  /** Watermark image to display on the user's device. */
  watermark?: Image;
  /** A custom label to use for the confirmation code value (`transitObject.purchaseDetails.confirmationCode`). */
  customConfirmationCodeLabel?: LocalizedString;
  /** A custom label to use for the route restrictions details value (`transitObject.ticketRestrictions.routeRestrictionsDetails`). */
  customRouteRestrictionsDetailsLabel?: LocalizedString;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** The name of the transit operator. */
  transitOperatorName?: LocalizedString;
  /** Required. The logo image of the ticket. This image is displayed in the card detail view of the app. */
  logo?: Image;
  /** A custom label to use for the coach value (`transitObject.ticketLeg.ticketSeat.coach`). */
  customCoachLabel?: LocalizedString;
  /** A custom label to use for the transit terminus name value (`transitObject.ticketLeg.transitTerminusName`). */
  customTransitTerminusNameLabel?: LocalizedString;
  /** Required. The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** A custom label to use for the other restrictions value (`transitObject.ticketRestrictions.otherRestrictions`). */
  customOtherRestrictionsLabel?: LocalizedString;
  /** Deprecated. */
  wordMark?: Image;
  /** The wide logo of the ticket. When provided, this will be used in place of the logo in the top left of the card view. */
  wideLogo?: Image;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Controls the display of the single-leg itinerary for this class. By default, an itinerary will only display for multi-leg trips. */
  enableSingleLegItinerary?: boolean;
  /** A custom label to use for the seat location value (`transitObject.ticketLeg.ticketSeat.seat`). */
  customSeatLabel?: LocalizedString;
  /** A custom label to use for the purchase price value (`transitObject.purchaseDetails.ticketCost.purchasePrice`). */
  customPurchasePriceLabel?: LocalizedString;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** A custom label to use for the boarding zone value (`transitObject.ticketLeg.zone`). */
  customZoneLabel?: LocalizedString;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** A custom label to use for the purchase face value (`transitObject.purchaseDetails.ticketCost.faceValue`). */
  customPurchaseFaceValueLabel?: LocalizedString;
  /** If this field is present, transit tickets served to a user's device will always be in this language. Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT". */
  languageOverride?: string;
  /** A custom label to use for the fare class value (`transitObject.ticketLeg.ticketSeat.fareClass`). */
  customFareClassLabel?: LocalizedString;
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** A custom label to use for the route restrictions value (`transitObject.ticketRestrictions.routeRestrictions`). */
  customRouteRestrictionsLabel?: LocalizedString;
  /** Deprecated */
  version?: string;
  /** A custom label to use for the purchase receipt number value (`transitObject.purchaseDetails.purchaseReceiptNumber`). */
  customPurchaseReceiptNumberLabel?: LocalizedString;
  /** A custom label to use for the boarding platform value (`transitObject.ticketLeg.platform`). */
  customPlatformLabel?: LocalizedString;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** A custom label to use for the transit discount message value (`transitObject.purchaseDetails.ticketCost.discountMessage`). */
  customDiscountMessageLabel?: LocalizedString;
  /** A custom label to use for the transit fare name value (`transitObject.ticketLeg.fareName`). */
  customFareNameLabel?: LocalizedString;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** A custom label to use for the transit concession category value (`transitObject.concessionCategory`). */
  customConcessionCategoryLabel?: LocalizedString;
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** Required. The type of transit this class represents, such as "bus". */
  transitType?:
    | "TRANSIT_TYPE_UNSPECIFIED"
    | "BUS"
    | "bus"
    | "RAIL"
    | "rail"
    | "TRAM"
    | "tram"
    | "FERRY"
    | "ferry"
    | "OTHER"
    | "other"
    | (string & {});
  /** View Unlock Requirement options for the transit ticket. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** Activation options for an activatable ticket. */
  activationOptions?: ActivationOptions;
  /** A custom label to use for the ticket number value (`transitObject.ticketNumber`). */
  customTicketNumberLabel?: LocalizedString;
}

export const TransitClass: Schema.Schema<TransitClass> = Schema.suspend(() =>
  Schema.Struct({
    customCarriageLabel: Schema.optional(LocalizedString),
    homepageUri: Schema.optional(Uri),
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    enableSmartTap: Schema.optional(Schema.Boolean),
    customTimeRestrictionsLabel: Schema.optional(LocalizedString),
    watermark: Schema.optional(Image),
    customConfirmationCodeLabel: Schema.optional(LocalizedString),
    customRouteRestrictionsDetailsLabel: Schema.optional(LocalizedString),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    transitOperatorName: Schema.optional(LocalizedString),
    logo: Schema.optional(Image),
    customCoachLabel: Schema.optional(LocalizedString),
    customTransitTerminusNameLabel: Schema.optional(LocalizedString),
    reviewStatus: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    customOtherRestrictionsLabel: Schema.optional(LocalizedString),
    wordMark: Schema.optional(Image),
    wideLogo: Schema.optional(Image),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    localizedIssuerName: Schema.optional(LocalizedString),
    enableSingleLegItinerary: Schema.optional(Schema.Boolean),
    customSeatLabel: Schema.optional(LocalizedString),
    customPurchasePriceLabel: Schema.optional(LocalizedString),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    customZoneLabel: Schema.optional(LocalizedString),
    countryCode: Schema.optional(Schema.String),
    securityAnimation: Schema.optional(SecurityAnimation),
    hexBackgroundColor: Schema.optional(Schema.String),
    heroImage: Schema.optional(Image),
    customPurchaseFaceValueLabel: Schema.optional(LocalizedString),
    languageOverride: Schema.optional(Schema.String),
    customFareClassLabel: Schema.optional(LocalizedString),
    allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
    review: Schema.optional(Review),
    customRouteRestrictionsLabel: Schema.optional(LocalizedString),
    version: Schema.optional(Schema.String),
    customPurchaseReceiptNumberLabel: Schema.optional(LocalizedString),
    customPlatformLabel: Schema.optional(LocalizedString),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    customDiscountMessageLabel: Schema.optional(LocalizedString),
    customFareNameLabel: Schema.optional(LocalizedString),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    notifyPreference: Schema.optional(Schema.String),
    appLinkData: Schema.optional(AppLinkData),
    id: Schema.optional(Schema.String),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    customConcessionCategoryLabel: Schema.optional(LocalizedString),
    issuerName: Schema.optional(Schema.String),
    transitType: Schema.optional(Schema.String),
    viewUnlockRequirement: Schema.optional(Schema.String),
    activationOptions: Schema.optional(ActivationOptions),
    customTicketNumberLabel: Schema.optional(LocalizedString),
  }),
).annotate({
  identifier: "TransitClass",
}) as any as Schema.Schema<TransitClass>;

export interface Permission {
  /** The role granted by this permission. */
  role?:
    | "ROLE_UNSPECIFIED"
    | "OWNER"
    | "owner"
    | "READER"
    | "reader"
    | "WRITER"
    | "writer"
    | (string & {});
  /** The email address of the user, group, or service account to which this permission refers to. */
  emailAddress?: string;
}

export const Permission: Schema.Schema<Permission> = Schema.suspend(() =>
  Schema.Struct({
    role: Schema.optional(Schema.String),
    emailAddress: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Permission" }) as any as Schema.Schema<Permission>;

export interface Permissions {
  /** ID of the issuer the list of permissions refer to. */
  issuerId?: string;
  /** The complete list of permissions for the issuer account. */
  permissions?: Array<Permission>;
}

export const Permissions: Schema.Schema<Permissions> = Schema.suspend(() =>
  Schema.Struct({
    issuerId: Schema.optional(Schema.String),
    permissions: Schema.optional(Schema.Array(Permission)),
  }),
).annotate({ identifier: "Permissions" }) as any as Schema.Schema<Permissions>;

export interface DiffUploadRequest {
  /** The location of the checksums for the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received. For details on the format of the checksums, see http://go/scotty-diff-protocol. */
  checksumsInfo?: CompositeMedia;
  /** The object version of the object that is the base version the incoming diff script will be applied to. This field will always be filled in. */
  objectVersion?: string;
  /** The location of the new object. Agents must clone the object located here, as the upload server will delete the contents once a response is received. */
  objectInfo?: CompositeMedia;
}

export const DiffUploadRequest: Schema.Schema<DiffUploadRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      checksumsInfo: Schema.optional(CompositeMedia),
      objectVersion: Schema.optional(Schema.String),
      objectInfo: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffUploadRequest",
  }) as any as Schema.Schema<DiffUploadRequest>;

export interface DownloadParameters {
  /** A boolean to be returned in the response to Scotty. Allows/disallows gzip encoding of the payload content when the server thinks it's advantageous (hence, does not guarantee compression) which allows Scotty to GZip the response to the client. */
  allowGzipCompression?: boolean;
  /** Determining whether or not Apiary should skip the inclusion of any Content-Range header on its response to Scotty. */
  ignoreRange?: boolean;
}

export const DownloadParameters: Schema.Schema<DownloadParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      allowGzipCompression: Schema.optional(Schema.Boolean),
      ignoreRange: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DownloadParameters",
  }) as any as Schema.Schema<DownloadParameters>;

export interface DiffDownloadResponse {
  /** The original object location. */
  objectLocation?: CompositeMedia;
}

export const DiffDownloadResponse: Schema.Schema<DiffDownloadResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      objectLocation: Schema.optional(CompositeMedia),
    }),
  ).annotate({
    identifier: "DiffDownloadResponse",
  }) as any as Schema.Schema<DiffDownloadResponse>;

export interface DiffVersionResponse {
  /** The version of the object stored at the server. */
  objectVersion?: string;
  /** The total size of the server object. */
  objectSizeBytes?: string;
}

export const DiffVersionResponse: Schema.Schema<DiffVersionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      objectVersion: Schema.optional(Schema.String),
      objectSizeBytes: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DiffVersionResponse",
  }) as any as Schema.Schema<DiffVersionResponse>;

export interface ContentTypeInfo {
  /** The content type of the file as specified in the request headers, multipart headers, or RUPIO start request. */
  fromHeader?: string;
  /** Scotty's best guess of what the content type of the file is. */
  bestGuess?: string;
  /** The content type of the file derived from the file extension of the original file name used by the client. */
  fromFileName?: string;
  /** The content type of the file derived from the file extension of the URL path. The URL path is assumed to represent a file name (which is typically only true for agents that are providing a REST API). */
  fromUrlPath?: string;
  /** The content type of the file derived by looking at specific bytes (i.e. "magic bytes") of the actual file. */
  fromBytes?: string;
}

export const ContentTypeInfo: Schema.Schema<ContentTypeInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      fromHeader: Schema.optional(Schema.String),
      bestGuess: Schema.optional(Schema.String),
      fromFileName: Schema.optional(Schema.String),
      fromUrlPath: Schema.optional(Schema.String),
      fromBytes: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ContentTypeInfo",
}) as any as Schema.Schema<ContentTypeInfo>;

export interface Media {
  /** MIME type of the data */
  contentType?: string;
  /** Set if reference_type is DIFF_UPLOAD_REQUEST. */
  diffUploadRequest?: DiffUploadRequest;
  /** For Scotty Uploads: Scotty-provided hashes for uploads For Scotty Downloads: (WARNING: DO NOT USE WITHOUT PERMISSION FROM THE SCOTTY TEAM.) A Hash provided by the agent to be used to verify the data being downloaded. Currently only supported for inline payloads. Further, only crc32c_hash is currently supported. */
  crc32cHash?: number;
  /** Use object_id instead. */
  bigstoreObjectRef?: string;
  /** Scotty-provided SHA1 hash for an upload. */
  sha1Hash?: string;
  /** Parameters for a media download. */
  downloadParameters?: DownloadParameters;
  /** For Scotty uploads only. If a user sends a hash code and the backend has requested that Scotty verify the upload against the client hash, Scotty will perform the check on behalf of the backend and will reject it if the hashes don't match. This is set to true if Scotty performed this verification. */
  hashVerified?: boolean;
  /** Set if reference_type is DIFF_DOWNLOAD_RESPONSE. */
  diffDownloadResponse?: DiffDownloadResponse;
  /** Original file name */
  filename?: string;
  /** Path to the data, set if reference_type is PATH */
  path?: string;
  /** Scotty-provided MD5 hash for an upload. */
  md5Hash?: string;
  /** Set if reference_type is DIFF_VERSION_RESPONSE. */
  diffVersionResponse?: DiffVersionResponse;
  /** Extended content type information provided for Scotty uploads. */
  contentTypeInfo?: ContentTypeInfo;
  /** Media id to forward to the operation GetMedia. Can be set if reference_type is GET_MEDIA. */
  mediaId?: string;
  /** Set if reference_type is DIFF_CHECKSUMS_RESPONSE. */
  diffChecksumsResponse?: DiffChecksumsResponse;
  /** Media data, set if reference_type is INLINE */
  inline?: string;
  /** Set if reference_type is DIFF_UPLOAD_RESPONSE. */
  diffUploadResponse?: DiffUploadResponse;
  /** Deprecated, use one of explicit hash type fields instead. Algorithm used for calculating the hash. As of 2011/01/21, "MD5" is the only possible value for this field. New values may be added at any time. */
  algorithm?: string;
  /** A composite media composed of one or more media objects, set if reference_type is COMPOSITE_MEDIA. The media length field must be set to the sum of the lengths of all composite media objects. Note: All composite media must have length specified. */
  compositeMedia?: Array<CompositeMedia>;
  /** Size of the data, in bytes */
  length?: string;
  /** Blobstore v2 info, set if reference_type is BLOBSTORE_REF and it refers to a v2 blob. */
  blobstore2Info?: Blobstore2Info;
  /** Describes what the field reference contains. */
  referenceType?:
    | "PATH"
    | "BLOB_REF"
    | "INLINE"
    | "GET_MEDIA"
    | "COMPOSITE_MEDIA"
    | "BIGSTORE_REF"
    | "DIFF_VERSION_RESPONSE"
    | "DIFF_CHECKSUMS_RESPONSE"
    | "DIFF_DOWNLOAD_RESPONSE"
    | "DIFF_UPLOAD_REQUEST"
    | "DIFF_UPLOAD_RESPONSE"
    | "COSMO_BINARY_REFERENCE"
    | "ARBITRARY_BYTES"
    | (string & {});
  /** Time at which the media data was last updated, in milliseconds since UNIX epoch */
  timestamp?: string;
  /** Blobstore v1 reference, set if reference_type is BLOBSTORE_REF This should be the byte representation of a blobstore.BlobRef. Since Blobstore is deprecating v1, use blobstore2_info instead. For now, any v2 blob will also be represented in this field as v1 BlobRef. */
  blobRef?: string;
  /** A binary data reference for a media download. Serves as a technology-agnostic binary reference in some Google infrastructure. This value is a serialized storage_cosmo.BinaryReference proto. Storing it as bytes is a hack to get around the fact that the cosmo proto (as well as others it includes) doesn't support JavaScript. This prevents us from including the actual type of this field. */
  cosmoBinaryReference?: string;
  /** Deprecated, use one of explicit hash type fields instead. These two hash related fields will only be populated on Scotty based media uploads and will contain the content of the hash group in the NotificationRequest: http://cs/#google3/blobstore2/api/scotty/service/proto/upload_listener.proto&q=class:Hash Hex encoded hash value of the uploaded media. */
  hash?: string;
  /** Reference to a TI Blob, set if reference_type is BIGSTORE_REF. */
  objectId?: ObjectId;
  /** Scotty-provided SHA256 hash for an upload. */
  sha256Hash?: string;
  /** A unique fingerprint/version id for the media data */
  token?: string;
  /** |is_potential_retry| is set false only when Scotty is certain that it has not sent the request before. When a client resumes an upload, this field must be set true in agent calls, because Scotty cannot be certain that it has never sent the request before due to potential failure in the session state persistence. */
  isPotentialRetry?: boolean;
}

export const Media: Schema.Schema<Media> = Schema.suspend(() =>
  Schema.Struct({
    contentType: Schema.optional(Schema.String),
    diffUploadRequest: Schema.optional(DiffUploadRequest),
    crc32cHash: Schema.optional(Schema.Number),
    bigstoreObjectRef: Schema.optional(Schema.String),
    sha1Hash: Schema.optional(Schema.String),
    downloadParameters: Schema.optional(DownloadParameters),
    hashVerified: Schema.optional(Schema.Boolean),
    diffDownloadResponse: Schema.optional(DiffDownloadResponse),
    filename: Schema.optional(Schema.String),
    path: Schema.optional(Schema.String),
    md5Hash: Schema.optional(Schema.String),
    diffVersionResponse: Schema.optional(DiffVersionResponse),
    contentTypeInfo: Schema.optional(ContentTypeInfo),
    mediaId: Schema.optional(Schema.String),
    diffChecksumsResponse: Schema.optional(DiffChecksumsResponse),
    inline: Schema.optional(Schema.String),
    diffUploadResponse: Schema.optional(DiffUploadResponse),
    algorithm: Schema.optional(Schema.String),
    compositeMedia: Schema.optional(Schema.Array(CompositeMedia)),
    length: Schema.optional(Schema.String),
    blobstore2Info: Schema.optional(Blobstore2Info),
    referenceType: Schema.optional(Schema.String),
    timestamp: Schema.optional(Schema.String),
    blobRef: Schema.optional(Schema.String),
    cosmoBinaryReference: Schema.optional(Schema.String),
    hash: Schema.optional(Schema.String),
    objectId: Schema.optional(ObjectId),
    sha256Hash: Schema.optional(Schema.String),
    token: Schema.optional(Schema.String),
    isPotentialRetry: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Media" }) as any as Schema.Schema<Media>;

export interface EventTicketObjectAddMessageResponse {
  /** The updated EventTicketObject resource. */
  resource?: EventTicketObject;
}

export const EventTicketObjectAddMessageResponse: Schema.Schema<EventTicketObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(EventTicketObject),
    }),
  ).annotate({
    identifier: "EventTicketObjectAddMessageResponse",
  }) as any as Schema.Schema<EventTicketObjectAddMessageResponse>;

export interface GenericClass {
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Links module data. If `linksModuleData` is also defined on the object, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  enableSmartTap?: boolean;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** Image module data. If `imageModulesData` is also defined on the object, both will be displayed. Only one of the image from class and one from object level will be rendered when both set. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** Required. The unique identifier for the class. This ID must be unique across all from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  id?: string;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** View Unlock Requirement options for the generic pass. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Text module data. If `textModulesData` is also defined on the object, both will be displayed. The maximum number of these fields displayed is 10 from class and 10 from object. */
  textModulesData?: Array<TextModuleData>;
}

export const GenericClass: Schema.Schema<GenericClass> = Schema.suspend(() =>
  Schema.Struct({
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    enableSmartTap: Schema.optional(Schema.Boolean),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    securityAnimation: Schema.optional(SecurityAnimation),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    id: Schema.optional(Schema.String),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    viewUnlockRequirement: Schema.optional(Schema.String),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
  }),
).annotate({
  identifier: "GenericClass",
}) as any as Schema.Schema<GenericClass>;

export interface GenericClassListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<GenericClass>;
}

export const GenericClassListResponse: Schema.Schema<GenericClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(GenericClass)),
    }),
  ).annotate({
    identifier: "GenericClassListResponse",
  }) as any as Schema.Schema<GenericClassListResponse>;

export interface ModifyLinkedOfferObjects {
  /** The linked offer object ids to add to the object. */
  addLinkedOfferObjectIds?: Array<string>;
  /** The linked offer object ids to remove from the object. */
  removeLinkedOfferObjectIds?: Array<string>;
}

export const ModifyLinkedOfferObjects: Schema.Schema<ModifyLinkedOfferObjects> =
  Schema.suspend(() =>
    Schema.Struct({
      addLinkedOfferObjectIds: Schema.optional(Schema.Array(Schema.String)),
      removeLinkedOfferObjectIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ModifyLinkedOfferObjects",
  }) as any as Schema.Schema<ModifyLinkedOfferObjects>;

export interface ModifyLinkedOfferObjectsRequest {
  /** The linked offer object ids to add or remove from the object. */
  linkedOfferObjectIds?: ModifyLinkedOfferObjects;
}

export const ModifyLinkedOfferObjectsRequest: Schema.Schema<ModifyLinkedOfferObjectsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      linkedOfferObjectIds: Schema.optional(ModifyLinkedOfferObjects),
    }),
  ).annotate({
    identifier: "ModifyLinkedOfferObjectsRequest",
  }) as any as Schema.Schema<ModifyLinkedOfferObjectsRequest>;

export interface TicketRestrictions {
  /** Extra restrictions that don't fall under the "route" or "time" categories. */
  otherRestrictions?: LocalizedString;
  /** More details about the above `routeRestrictions`. */
  routeRestrictionsDetails?: LocalizedString;
  /** Restrictions about routes that may be taken. For example, this may be the string "Reserved CrossCountry trains only". */
  routeRestrictions?: LocalizedString;
  /** Restrictions about times this ticket may be used. */
  timeRestrictions?: LocalizedString;
}

export const TicketRestrictions: Schema.Schema<TicketRestrictions> =
  Schema.suspend(() =>
    Schema.Struct({
      otherRestrictions: Schema.optional(LocalizedString),
      routeRestrictionsDetails: Schema.optional(LocalizedString),
      routeRestrictions: Schema.optional(LocalizedString),
      timeRestrictions: Schema.optional(LocalizedString),
    }),
  ).annotate({
    identifier: "TicketRestrictions",
  }) as any as Schema.Schema<TicketRestrictions>;

export interface SignUpInfo {
  /** ID of the class the user can sign up for. */
  classId?: string;
}

export const SignUpInfo: Schema.Schema<SignUpInfo> = Schema.suspend(() =>
  Schema.Struct({
    classId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SignUpInfo" }) as any as Schema.Schema<SignUpInfo>;

export interface SmartTapMerchantData {
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  smartTapMerchantId?: string;
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  authenticationKeys?: Array<AuthenticationKey>;
}

export const SmartTapMerchantData: Schema.Schema<SmartTapMerchantData> =
  Schema.suspend(() =>
    Schema.Struct({
      smartTapMerchantId: Schema.optional(Schema.String),
      authenticationKeys: Schema.optional(Schema.Array(AuthenticationKey)),
    }),
  ).annotate({
    identifier: "SmartTapMerchantData",
  }) as any as Schema.Schema<SmartTapMerchantData>;

export interface Issuer {
  /** Allows the issuer to provide their callback settings. */
  callbackOptions?: CallbackOptions;
  /** The unique identifier for an issuer account. This is automatically generated when the issuer is inserted. */
  issuerId?: string;
  /** URL for the issuer's home page. */
  homepageUrl?: string;
  /** Issuer contact information. */
  contactInfo?: IssuerContactInfo;
  /** The account name of the issuer. */
  name?: string;
  /** Available only to Smart Tap enabled partners. Contact support for additional guidance. */
  smartTapMerchantData?: SmartTapMerchantData;
}

export const Issuer: Schema.Schema<Issuer> = Schema.suspend(() =>
  Schema.Struct({
    callbackOptions: Schema.optional(CallbackOptions),
    issuerId: Schema.optional(Schema.String),
    homepageUrl: Schema.optional(Schema.String),
    contactInfo: Schema.optional(IssuerContactInfo),
    name: Schema.optional(Schema.String),
    smartTapMerchantData: Schema.optional(SmartTapMerchantData),
  }),
).annotate({ identifier: "Issuer" }) as any as Schema.Schema<Issuer>;

export interface GenericObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<GenericObject>;
}

export const GenericObjectListResponse: Schema.Schema<GenericObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(GenericObject)),
    }),
  ).annotate({
    identifier: "GenericObjectListResponse",
  }) as any as Schema.Schema<GenericObjectListResponse>;

export interface OfferClass {
  /** Deprecated. Use `multipleDevicesAndHoldersAllowedStatus` instead. */
  allowMultipleUsersPerObject?: boolean;
  /** The review comments set by the platform when a class is marked `approved` or `rejected`. */
  review?: Review;
  /** Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Translated strings for the short title. Recommended maximum length is 20 characters. */
  localizedShortTitle?: LocalizedString;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** The wide title image of the offer. When provided, this will be used in place of the title image in the top left of the card view. */
  wideTitleImage?: Image;
  /** Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale. */
  countryCode?: string;
  /** The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object). */
  homepageUri?: Uri;
  /** Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured. The `enableSmartTap` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  redemptionIssuers?: Array<string>;
  /** Identifies whether this class supports Smart Tap. The `redemptionIssuers` and object level `smartTapRedemptionLevel` fields must also be set up correctly in order for a pass to support Smart Tap. */
  enableSmartTap?: boolean;
  /** Required. The offer provider (either the aggregator name or merchant name). Recommended maximum length is 12 characters to ensure full string is displayed on smaller screens. */
  provider?: string;
  /** The title image of the offer. This image is displayed in both the details and list views of the app. */
  titleImage?: Image;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** Optional information about the security animation. If this is set a security animation will be rendered on pass details. */
  securityAnimation?: SecurityAnimation;
  /** Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width. */
  heroImage?: Image;
  /** Translated strings for the fine_print. */
  localizedFinePrint?: LocalizedString;
  /** Required. The redemption channels applicable to this offer. */
  redemptionChannel?:
    | "REDEMPTION_CHANNEL_UNSPECIFIED"
    | "INSTORE"
    | "instore"
    | "ONLINE"
    | "online"
    | "BOTH"
    | "both"
    | "TEMPORARY_PRICE_REDUCTION"
    | "temporaryPriceReduction"
    | (string & {});
  /** Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Translated strings for the issuer_name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  localizedIssuerName?: LocalizedString;
  /** Identifies whether multiple users and devices will save the same object referencing this class. */
  multipleDevicesAndHoldersAllowedStatus?:
    | "STATUS_UNSPECIFIED"
    | "MULTIPLE_HOLDERS"
    | "ONE_USER_ALL_DEVICES"
    | "ONE_USER_ONE_DEVICE"
    | "multipleHolders"
    | "oneUserAllDevices"
    | "oneUserOneDevice"
    | (string & {});
  /** Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback. */
  callbackOptions?: CallbackOptions;
  /** The help link for the offer, such as `http://myownpersonaldomain.com/help` */
  helpUri?: Uri;
  /** A shortened version of the title of the offer, such as "20% off," shown to users as a quick reference to the offer contents. Recommended maximum length is 20 characters. */
  shortTitle?: string;
  /** View Unlock Requirement options for the offer. */
  viewUnlockRequirement?:
    | "VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED"
    | "UNLOCK_NOT_REQUIRED"
    | "UNLOCK_REQUIRED_TO_VIEW"
    | (string & {});
  /** The details of the offer. */
  details?: string;
  /** Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens. */
  issuerName?: string;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the class. For a pass only fifteen will be displayed, prioritizing those from the object. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** Links module data. If links module data is also defined on the object, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** Translated strings for the details. */
  localizedDetails?: LocalizedString;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display. */
  classTemplateInfo?: ClassTemplateInfo;
  /** Required. The status of the class. This field can be set to `draft` or The status of the class. This field can be set to `draft` or `underReview` using the insert, patch, or update API calls. Once the review state is changed from `draft` it may not be changed back to `draft`. You should keep this field to `draft` when the class is under development. A `draft` class cannot be used to create any object. You should set this field to `underReview` when you believe the class is ready for use. The platform will automatically set this field to `approved` and it can be immediately used to create or migrate objects. When updating an already `approved` class you should keep setting this field to `underReview`. */
  reviewStatus?:
    | "REVIEW_STATUS_UNSPECIFIED"
    | "UNDER_REVIEW"
    | "underReview"
    | "APPROVED"
    | "approved"
    | "REJECTED"
    | "rejected"
    | "DRAFT"
    | "draft"
    | (string & {});
  /** Deprecated. */
  wordMark?: Image;
  /** Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Required. The title of the offer, such as "20% off any t-shirt." Recommended maximum length is 60 characters to ensure full string is displayed on smaller screens. */
  title?: string;
  /** Translated strings for the provider. Recommended maximum length is 12 characters to ensure full string is displayed on smaller screens. */
  localizedProvider?: LocalizedString;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead. */
  appLinkData?: AppLinkData;
  /** The fine print or terms of the offer, such as "20% off any t-shirt at Adam's Apparel." */
  finePrint?: string;
  /** Translated strings for the title. Recommended maximum length is 60 characters to ensure full string is displayed on smaller screens. */
  localizedTitle?: LocalizedString;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#offerClass"`. */
  kind?: string;
}

export const OfferClass: Schema.Schema<OfferClass> = Schema.suspend(() =>
  Schema.Struct({
    allowMultipleUsersPerObject: Schema.optional(Schema.Boolean),
    review: Schema.optional(Review),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    localizedShortTitle: Schema.optional(LocalizedString),
    version: Schema.optional(Schema.String),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    wideTitleImage: Schema.optional(Image),
    countryCode: Schema.optional(Schema.String),
    homepageUri: Schema.optional(Uri),
    redemptionIssuers: Schema.optional(Schema.Array(Schema.String)),
    enableSmartTap: Schema.optional(Schema.Boolean),
    provider: Schema.optional(Schema.String),
    titleImage: Schema.optional(Image),
    hexBackgroundColor: Schema.optional(Schema.String),
    securityAnimation: Schema.optional(SecurityAnimation),
    heroImage: Schema.optional(Image),
    localizedFinePrint: Schema.optional(LocalizedString),
    redemptionChannel: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    localizedIssuerName: Schema.optional(LocalizedString),
    multipleDevicesAndHoldersAllowedStatus: Schema.optional(Schema.String),
    callbackOptions: Schema.optional(CallbackOptions),
    helpUri: Schema.optional(Uri),
    shortTitle: Schema.optional(Schema.String),
    viewUnlockRequirement: Schema.optional(Schema.String),
    details: Schema.optional(Schema.String),
    issuerName: Schema.optional(Schema.String),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    messages: Schema.optional(Schema.Array(Message)),
    linksModuleData: Schema.optional(LinksModuleData),
    localizedDetails: Schema.optional(LocalizedString),
    infoModuleData: Schema.optional(InfoModuleData),
    classTemplateInfo: Schema.optional(ClassTemplateInfo),
    reviewStatus: Schema.optional(Schema.String),
    wordMark: Schema.optional(Image),
    notifyPreference: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    localizedProvider: Schema.optional(LocalizedString),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    finePrint: Schema.optional(Schema.String),
    localizedTitle: Schema.optional(LocalizedString),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "OfferClass" }) as any as Schema.Schema<OfferClass>;

export interface OfferObject {
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this offer object. If a user had saved this offer, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID.identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: OfferClass;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#offerObject"`. */
  kind?: string;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
}

export const OfferObject: Schema.Schema<OfferObject> = Schema.suspend(() =>
  Schema.Struct({
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
    id: Schema.optional(Schema.String),
    classReference: Schema.optional(OfferClass),
    disableExpirationNotification: Schema.optional(Schema.Boolean),
    passConstraints: Schema.optional(PassConstraints),
    notifyPreference: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    validTimeInterval: Schema.optional(TimeInterval),
    groupingInfo: Schema.optional(GroupingInfo),
    smartTapRedemptionValue: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    version: Schema.optional(Schema.String),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    state: Schema.optional(Schema.String),
    hasUsers: Schema.optional(Schema.Boolean),
    hasLinkedDevice: Schema.optional(Schema.Boolean),
    barcode: Schema.optional(Barcode),
    rotatingBarcode: Schema.optional(RotatingBarcode),
    heroImage: Schema.optional(Image),
    saveRestrictions: Schema.optional(SaveRestrictions),
    classId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "OfferObject" }) as any as Schema.Schema<OfferObject>;

export interface DeviceContext {
  /** If set, redemption information will only be returned to the given device upon activation of the object. This should not be used as a stable identifier to trace a user's device. It can change across different passes for the same device or even across different activations for the same device. When setting this, callers must also set has_linked_device on the object being activated. */
  deviceToken?: string;
}

export const DeviceContext: Schema.Schema<DeviceContext> = Schema.suspend(() =>
  Schema.Struct({
    deviceToken: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DeviceContext",
}) as any as Schema.Schema<DeviceContext>;

export interface TicketCost {
  /** The actual purchase price of the ticket, after tax and/or discounts. */
  purchasePrice?: Money;
  /** The face value of the ticket. */
  faceValue?: Money;
  /** A message describing any kind of discount that was applied. */
  discountMessage?: LocalizedString;
}

export const TicketCost: Schema.Schema<TicketCost> = Schema.suspend(() =>
  Schema.Struct({
    purchasePrice: Schema.optional(Money),
    faceValue: Schema.optional(Money),
    discountMessage: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "TicketCost" }) as any as Schema.Schema<TicketCost>;

export interface PurchaseDetails {
  /** The purchase date/time of the ticket. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. Without offset information, some rich features may not be available. */
  purchaseDateTime?: string;
  /** ID of the account used to purchase the ticket. */
  accountId?: string;
  /** The confirmation code for the purchase. This may be the same for multiple different tickets and is used to group tickets together. */
  confirmationCode?: string;
  /** The cost of the ticket. */
  ticketCost?: TicketCost;
  /** Receipt number/identifier for tracking the ticket purchase via the body that sold the ticket. */
  purchaseReceiptNumber?: string;
}

export const PurchaseDetails: Schema.Schema<PurchaseDetails> = Schema.suspend(
  () =>
    Schema.Struct({
      purchaseDateTime: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      confirmationCode: Schema.optional(Schema.String),
      ticketCost: Schema.optional(TicketCost),
      purchaseReceiptNumber: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PurchaseDetails",
}) as any as Schema.Schema<PurchaseDetails>;

export interface TicketSeat {
  /** The fare class of the ticketed seat. */
  fareClass?:
    | "FARE_CLASS_UNSPECIFIED"
    | "ECONOMY"
    | "economy"
    | "FIRST"
    | "first"
    | "BUSINESS"
    | "business"
    | (string & {});
  /** The identifier of where the ticketed seat is located. Eg. "42". If there is no specific identifier, use `seatAssigment` instead. */
  seat?: string;
  /** The identifier of the train car or coach in which the ticketed seat is located. Eg. "10" */
  coach?: string;
  /** A custome fare class to be used if no `fareClass` applies. Both `fareClass` and `customFareClass` may not be set. */
  customFareClass?: LocalizedString;
  /** The passenger's seat assignment. Eg. "no specific seat". To be used when there is no specific identifier to use in `seat`. */
  seatAssignment?: LocalizedString;
}

export const TicketSeat: Schema.Schema<TicketSeat> = Schema.suspend(() =>
  Schema.Struct({
    fareClass: Schema.optional(Schema.String),
    seat: Schema.optional(Schema.String),
    coach: Schema.optional(Schema.String),
    customFareClass: Schema.optional(LocalizedString),
    seatAssignment: Schema.optional(LocalizedString),
  }),
).annotate({ identifier: "TicketSeat" }) as any as Schema.Schema<TicketSeat>;

export interface TicketLeg {
  /** The zone of boarding within the platform. */
  zone?: string;
  /** The platform or gate where the passenger can board the carriage. */
  platform?: string;
  /** The destination name. */
  destinationName?: LocalizedString;
  /** Short description/name of the fare for this leg of travel. Eg "Anytime Single Use". */
  fareName?: LocalizedString;
  /** The date/time of arrival. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the destination station. For example, if the event occurs at the 20th hour of June 5th, 2018 at the destination station, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the destination station is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available. */
  arrivalDateTime?: string;
  /** The origin station code. This is required if `destinationStationCode` is present or if `originName` is not present. */
  originStationCode?: string;
  /** Terminus station or destination of the train/bus/etc. */
  transitTerminusName?: LocalizedString;
  /** The date/time of departure. This is required if there is no validity time interval set on the transit object. This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601). For example: `1985-04-12T23:20:50.52Z` would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC. `1985-04-12T19:20:50.52-04:00` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year. `1985-04-12T19:20:50.52` would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information. The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the origin station. For example, if the departure occurs at the 20th hour of June 5th, 2018 at the origin station, the local date/time portion should be `2018-06-05T20:00:00`. If the local date/time at the origin station is 4 hours before UTC, an offset of `-04:00` may be appended. Without offset information, some rich features may not be available. */
  departureDateTime?: string;
  /** The name of the origin station. This is required if `desinationName` is present or if `originStationCode` is not present. */
  originName?: LocalizedString;
  /** The name of the transit operator that is operating this leg of a trip. */
  transitOperatorName?: LocalizedString;
  /** The destination station code. */
  destinationStationCode?: string;
  /** The reserved seat for the passenger(s). If more than one seat is to be specified then use the `ticketSeats` field instead. Both `ticketSeat` and `ticketSeats` may not be set. */
  ticketSeat?: TicketSeat;
  /** The reserved seat for the passenger(s). If only one seat is to be specified then use the `ticketSeat` field instead. Both `ticketSeat` and `ticketSeats` may not be set. */
  ticketSeats?: Array<TicketSeat>;
  /** The train or ship name/number that the passsenger needs to board. */
  carriage?: string;
}

export const TicketLeg: Schema.Schema<TicketLeg> = Schema.suspend(() =>
  Schema.Struct({
    zone: Schema.optional(Schema.String),
    platform: Schema.optional(Schema.String),
    destinationName: Schema.optional(LocalizedString),
    fareName: Schema.optional(LocalizedString),
    arrivalDateTime: Schema.optional(Schema.String),
    originStationCode: Schema.optional(Schema.String),
    transitTerminusName: Schema.optional(LocalizedString),
    departureDateTime: Schema.optional(Schema.String),
    originName: Schema.optional(LocalizedString),
    transitOperatorName: Schema.optional(LocalizedString),
    destinationStationCode: Schema.optional(Schema.String),
    ticketSeat: Schema.optional(TicketSeat),
    ticketSeats: Schema.optional(Schema.Array(TicketSeat)),
    carriage: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TicketLeg" }) as any as Schema.Schema<TicketLeg>;

export interface TransitObject {
  /** Links module data. If links module data is also defined on the class, both will be displayed. */
  linksModuleData?: LinksModuleData;
  /** An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10. */
  messages?: Array<Message>;
  /** The time period this object will be `active` and object can be used. An object's state will be changed to `expired` when this time period has passed. */
  validTimeInterval?: TimeInterval;
  /** Device context associated with the object. */
  deviceContext?: DeviceContext;
  /** The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields `enableSmartTap` and `redemptionIssuers` must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported. */
  smartTapRedemptionValue?: string;
  /** Deprecated. Use textModulesData instead. */
  infoModuleData?: InfoModuleData;
  /** The activation status for the object. Required if the class has `activationOptions` set. */
  activationStatus?: ActivationStatus;
  /** The status of the ticket. For states which affect display, use the `state` field instead. */
  ticketStatus?:
    | "TICKET_STATUS_UNSPECIFIED"
    | "USED"
    | "used"
    | "REFUNDED"
    | "refunded"
    | "EXCHANGED"
    | "exchanged"
    | (string & {});
  /** Information that controls how passes are grouped together. */
  groupingInfo?: GroupingInfo;
  /** Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered. */
  notifyPreference?:
    | "NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED"
    | "NOTIFY_ON_UPDATE"
    | (string & {});
  /** Purchase details for this ticket. */
  purchaseDetails?: PurchaseDetails;
  /** Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level. */
  imageModulesData?: Array<ImageModuleData>;
  /** Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed. */
  appLinkData?: AppLinkData;
  /** A copy of the inherited fields of the parent class. These fields are retrieved during a GET. */
  classReference?: TransitClass;
  /** Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  id?: string;
  /** Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the `messages` field, expiration notifications to the user will be suppressed. By default, this field is set to false. Currently, this can only be set for offers. */
  disableExpirationNotification?: boolean;
  /** Pass constraints for the object. Includes limiting NFC and screenshot behaviors. */
  passConstraints?: PassConstraints;
  /** The name(s) of the passengers the ticket is assigned to. The above `passengerType` field is meant to give Google context on this field. */
  passengerNames?: string;
  /** The concession category for the ticket. */
  concessionCategory?:
    | "CONCESSION_CATEGORY_UNSPECIFIED"
    | "ADULT"
    | "adult"
    | "CHILD"
    | "child"
    | "SENIOR"
    | "senior"
    | (string & {});
  /** Required. The type of trip this transit object represents. Used to determine the pass title and/or which symbol to use between the origin and destination. */
  tripType?:
    | "TRIP_TYPE_UNSPECIFIED"
    | "ROUND_TRIP"
    | "roundTrip"
    | "ONE_WAY"
    | "oneWay"
    | (string & {});
  /** A custom status to use for the ticket status value when `ticketStatus` does not provide the right option. Both `ticketStatus` and `customTicketStatus` may not be set. */
  customTicketStatus?: LocalizedString;
  /** Note: This field is currently not supported to trigger geo notifications. */
  locations?: Array<LatLongPoint>;
  /** Optional value added module data. Maximum of fifteen on the object. For a pass only fifteen will be displayed. */
  valueAddedModuleData?: Array<ValueAddedModuleData>;
  /** Information about what kind of restrictions there are on using this ticket. For example, which days of the week it must be used, or which routes are allowed to be taken. */
  ticketRestrictions?: TicketRestrictions;
  /** linked_object_ids are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this transit object. If a user had saved this transit card, then these linked_object_ids would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes). Make sure that objects present in linked_object_ids are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently. Object IDs should follow the format issuer ID. identifier where the former is issued by Google and the latter is chosen by you. */
  linkedObjectIds?: Array<string>;
  /** Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass. */
  saveRestrictions?: SaveRestrictions;
  /** A custom concession category to use when `concessionCategory` does not provide the right option. Both `concessionCategory` and `customConcessionCategory` may not be set. */
  customConcessionCategory?: LocalizedString;
  /** Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved. Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. */
  classId?: string;
  /** Indicates if the object has users. This field is set by the platform. */
  hasUsers?: boolean;
  /** Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information. */
  hasLinkedDevice?: boolean;
  /** The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as `#ffcc00`. You can also use the shorthand version of the RGB triplet which is #rgb, such as `#fc0`. */
  hexBackgroundColor?: string;
  /** The barcode type and value. */
  barcode?: Barcode;
  /** Each ticket may contain one or more legs. Each leg contains departure and arrival information along with boarding and seating information. If only one leg is to be specified then use the `ticketLeg` field instead. Both `ticketLeg` and `ticketLegs` may not be set. */
  ticketLegs?: Array<TicketLeg>;
  /** Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed. */
  heroImage?: Image;
  /** The number of the ticket. This is a unique identifier for the ticket in the transit operator's system. */
  ticketNumber?: string;
  /** A single ticket leg contains departure and arrival information along with boarding and seating information. If more than one leg is to be specified then use the `ticketLegs` field instead. Both `ticketLeg` and `ticketLegs` may not be set. */
  ticketLeg?: TicketLeg;
  /** The rotating barcode type and value. */
  rotatingBarcode?: RotatingBarcode;
  /** Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints. */
  merchantLocations?: Array<MerchantLocation>;
  /** Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an `inactive` object is moved to the "Expired passes" section. */
  state?:
    | "STATE_UNSPECIFIED"
    | "ACTIVE"
    | "active"
    | "COMPLETED"
    | "completed"
    | "EXPIRED"
    | "expired"
    | "INACTIVE"
    | "inactive"
    | (string & {});
  /** The number of passengers. */
  passengerType?:
    | "PASSENGER_TYPE_UNSPECIFIED"
    | "SINGLE_PASSENGER"
    | "singlePassenger"
    | "MULTIPLE_PASSENGERS"
    | "multiplePassengers"
    | (string & {});
  /** This id is used to group tickets together if the user has saved multiple tickets for the same trip. */
  tripId?: string;
  /** Deprecated */
  version?: string;
  /** Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class. */
  textModulesData?: Array<TextModuleData>;
}

export const TransitObject: Schema.Schema<TransitObject> = Schema.suspend(() =>
  Schema.Struct({
    linksModuleData: Schema.optional(LinksModuleData),
    messages: Schema.optional(Schema.Array(Message)),
    validTimeInterval: Schema.optional(TimeInterval),
    deviceContext: Schema.optional(DeviceContext),
    smartTapRedemptionValue: Schema.optional(Schema.String),
    infoModuleData: Schema.optional(InfoModuleData),
    activationStatus: Schema.optional(ActivationStatus),
    ticketStatus: Schema.optional(Schema.String),
    groupingInfo: Schema.optional(GroupingInfo),
    notifyPreference: Schema.optional(Schema.String),
    purchaseDetails: Schema.optional(PurchaseDetails),
    imageModulesData: Schema.optional(Schema.Array(ImageModuleData)),
    appLinkData: Schema.optional(AppLinkData),
    classReference: Schema.optional(TransitClass),
    id: Schema.optional(Schema.String),
    disableExpirationNotification: Schema.optional(Schema.Boolean),
    passConstraints: Schema.optional(PassConstraints),
    passengerNames: Schema.optional(Schema.String),
    concessionCategory: Schema.optional(Schema.String),
    tripType: Schema.optional(Schema.String),
    customTicketStatus: Schema.optional(LocalizedString),
    locations: Schema.optional(Schema.Array(LatLongPoint)),
    valueAddedModuleData: Schema.optional(Schema.Array(ValueAddedModuleData)),
    ticketRestrictions: Schema.optional(TicketRestrictions),
    linkedObjectIds: Schema.optional(Schema.Array(Schema.String)),
    saveRestrictions: Schema.optional(SaveRestrictions),
    customConcessionCategory: Schema.optional(LocalizedString),
    classId: Schema.optional(Schema.String),
    hasUsers: Schema.optional(Schema.Boolean),
    hasLinkedDevice: Schema.optional(Schema.Boolean),
    hexBackgroundColor: Schema.optional(Schema.String),
    barcode: Schema.optional(Barcode),
    ticketLegs: Schema.optional(Schema.Array(TicketLeg)),
    heroImage: Schema.optional(Image),
    ticketNumber: Schema.optional(Schema.String),
    ticketLeg: Schema.optional(TicketLeg),
    rotatingBarcode: Schema.optional(RotatingBarcode),
    merchantLocations: Schema.optional(Schema.Array(MerchantLocation)),
    state: Schema.optional(Schema.String),
    passengerType: Schema.optional(Schema.String),
    tripId: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    textModulesData: Schema.optional(Schema.Array(TextModuleData)),
  }),
).annotate({
  identifier: "TransitObject",
}) as any as Schema.Schema<TransitObject>;

export interface Resources {
  /** A list of gift card classes. */
  giftCardClasses?: Array<GiftCardClass>;
  /** A list of offer objects. */
  offerObjects?: Array<OfferObject>;
  /** A list of offer classes. */
  offerClasses?: Array<OfferClass>;
  /** A list of loyalty objects. */
  loyaltyObjects?: Array<LoyaltyObject>;
  /** A list of transit objects. */
  transitObjects?: Array<TransitObject>;
  /** A list of gift card objects. */
  giftCardObjects?: Array<GiftCardObject>;
  /** A list of generic objects. */
  genericObjects?: Array<GenericObject>;
  /** A list of generic classes. */
  genericClasses?: Array<GenericClass>;
  /** A list of transit classes. */
  transitClasses?: Array<TransitClass>;
  /** A list of event ticket objects. */
  eventTicketObjects?: Array<EventTicketObject>;
  /** A list of loyalty classes. */
  loyaltyClasses?: Array<LoyaltyClass>;
  /** A list of flight objects. */
  flightObjects?: Array<FlightObject>;
  /** A list of flight classes. */
  flightClasses?: Array<FlightClass>;
  /** A list of event ticket classes. */
  eventTicketClasses?: Array<EventTicketClass>;
}

export const Resources: Schema.Schema<Resources> = Schema.suspend(() =>
  Schema.Struct({
    giftCardClasses: Schema.optional(Schema.Array(GiftCardClass)),
    offerObjects: Schema.optional(Schema.Array(OfferObject)),
    offerClasses: Schema.optional(Schema.Array(OfferClass)),
    loyaltyObjects: Schema.optional(Schema.Array(LoyaltyObject)),
    transitObjects: Schema.optional(Schema.Array(TransitObject)),
    giftCardObjects: Schema.optional(Schema.Array(GiftCardObject)),
    genericObjects: Schema.optional(Schema.Array(GenericObject)),
    genericClasses: Schema.optional(Schema.Array(GenericClass)),
    transitClasses: Schema.optional(Schema.Array(TransitClass)),
    eventTicketObjects: Schema.optional(Schema.Array(EventTicketObject)),
    loyaltyClasses: Schema.optional(Schema.Array(LoyaltyClass)),
    flightObjects: Schema.optional(Schema.Array(FlightObject)),
    flightClasses: Schema.optional(Schema.Array(FlightClass)),
    eventTicketClasses: Schema.optional(Schema.Array(EventTicketClass)),
  }),
).annotate({ identifier: "Resources" }) as any as Schema.Schema<Resources>;

export interface JwtInsertResponse {
  /** A URI that, when opened, will allow the end user to save the object(s) identified in the JWT to their Google account. */
  saveUri?: string;
  /** Data that corresponds to the ids of the provided classes and objects in the JWT. resources will only include the non-empty arrays (i.e. if the JWT only includes eventTicketObjects, then that is the only field that will be present in resources). */
  resources?: Resources;
}

export const JwtInsertResponse: Schema.Schema<JwtInsertResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      saveUri: Schema.optional(Schema.String),
      resources: Schema.optional(Resources),
    }),
  ).annotate({
    identifier: "JwtInsertResponse",
  }) as any as Schema.Schema<JwtInsertResponse>;

export interface EventTicketClassListResponse {
  /** Resources corresponding to the list request. */
  resources?: Array<EventTicketClass>;
  /** Pagination of the response. */
  pagination?: Pagination;
}

export const EventTicketClassListResponse: Schema.Schema<EventTicketClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(EventTicketClass)),
      pagination: Schema.optional(Pagination),
    }),
  ).annotate({
    identifier: "EventTicketClassListResponse",
  }) as any as Schema.Schema<EventTicketClassListResponse>;

export interface GenericObjectAddMessageResponse {
  /** The updated GenericObject resource. */
  resource?: GenericObject;
}

export const GenericObjectAddMessageResponse: Schema.Schema<GenericObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(GenericObject),
    }),
  ).annotate({
    identifier: "GenericObjectAddMessageResponse",
  }) as any as Schema.Schema<GenericObjectAddMessageResponse>;

export interface AddMessageRequest {
  message?: Message;
}

export const AddMessageRequest: Schema.Schema<AddMessageRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "AddMessageRequest",
  }) as any as Schema.Schema<AddMessageRequest>;

export interface EventTicketObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<EventTicketObject>;
}

export const EventTicketObjectListResponse: Schema.Schema<EventTicketObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(EventTicketObject)),
    }),
  ).annotate({
    identifier: "EventTicketObjectListResponse",
  }) as any as Schema.Schema<EventTicketObjectListResponse>;

export interface UploadPrivateImageRequest {}

export const UploadPrivateImageRequest: Schema.Schema<UploadPrivateImageRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "UploadPrivateImageRequest",
  }) as any as Schema.Schema<UploadPrivateImageRequest>;

export interface FlightClassListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<FlightClass>;
}

export const FlightClassListResponse: Schema.Schema<FlightClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(FlightClass)),
    }),
  ).annotate({
    identifier: "FlightClassListResponse",
  }) as any as Schema.Schema<FlightClassListResponse>;

export interface MediaRequestInfo {
  /** The Scotty request ID. */
  requestId?: string;
  /** The total size of the file. */
  totalBytes?: string;
  /** Whether the total bytes field contains an estimated data. */
  totalBytesIsEstimated?: boolean;
  /** The number of current bytes uploaded or downloaded. */
  currentBytes?: string;
  /** The existence of the final_status field indicates that this is the last call to the agent for this request_id. http://google3/uploader/agent/scotty_agent.proto?l=737&rcl=347601929 */
  finalStatus?: number;
  /** The partition of the Scotty server handling this request. type is uploader_service.RequestReceivedParamsServingInfo LINT.IfChange(request_received_params_serving_info_annotations) LINT.ThenChange() */
  requestReceivedParamsServingInfo?: string;
  /** The physical headers provided by RequestReceivedParameters in Scotty request. type is uploader_service.KeyValuePairs. */
  physicalHeaders?: string;
  /** Data to be copied to backend requests. Custom data is returned to Scotty in the agent_state field, which Scotty will then provide in subsequent upload notifications. */
  customData?: string;
  /** The type of notification received from Scotty. */
  notificationType?:
    | "START"
    | "PROGRESS"
    | "END"
    | "RESPONSE_SENT"
    | "ERROR"
    | (string & {});
  /** Set if the http request info is diff encoded. The value of this field is the version number of the base revision. This is corresponding to Apiary's mediaDiffObjectVersion (//depot/google3/java/com/google/api/server/media/variable/DiffObjectVersionVariable.java). See go/esf-scotty-diff-upload for more information. */
  diffObjectVersion?: string;
}

export const MediaRequestInfo: Schema.Schema<MediaRequestInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      totalBytes: Schema.optional(Schema.String),
      totalBytesIsEstimated: Schema.optional(Schema.Boolean),
      currentBytes: Schema.optional(Schema.String),
      finalStatus: Schema.optional(Schema.Number),
      requestReceivedParamsServingInfo: Schema.optional(Schema.String),
      physicalHeaders: Schema.optional(Schema.String),
      customData: Schema.optional(Schema.String),
      notificationType: Schema.optional(Schema.String),
      diffObjectVersion: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "MediaRequestInfo",
}) as any as Schema.Schema<MediaRequestInfo>;

export interface TransitClassAddMessageResponse {
  /** The updated TransitClass resource. */
  resource?: TransitClass;
}

export const TransitClassAddMessageResponse: Schema.Schema<TransitClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(TransitClass),
    }),
  ).annotate({
    identifier: "TransitClassAddMessageResponse",
  }) as any as Schema.Schema<TransitClassAddMessageResponse>;

export interface OfferClassListResponse {
  /** Resources corresponding to the list request. */
  resources?: Array<OfferClass>;
  /** Pagination of the response. */
  pagination?: Pagination;
}

export const OfferClassListResponse: Schema.Schema<OfferClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(OfferClass)),
      pagination: Schema.optional(Pagination),
    }),
  ).annotate({
    identifier: "OfferClassListResponse",
  }) as any as Schema.Schema<OfferClassListResponse>;

export interface IssuerListResponse {
  /** Resources corresponding to the list request. */
  resources?: Array<Issuer>;
}

export const IssuerListResponse: Schema.Schema<IssuerListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resources: Schema.optional(Schema.Array(Issuer)),
    }),
  ).annotate({
    identifier: "IssuerListResponse",
  }) as any as Schema.Schema<IssuerListResponse>;

export interface SetPassUpdateNoticeRequest {
  /** Required. The JWT signature of the updated pass that the issuer wants to notify Google about. Only devices that report a different JWT signature than this JWT signature will receive the update notification. */
  updatedPassJwtSignature?: string;
  /** Required. The issuer endpoint URI the pass holder needs to follow in order to receive an updated pass JWT. It can not contain any sensitive information. The endpoint needs to authenticate the user before giving the user the updated JWT. Example update URI https://someissuer.com/update/passId=someExternalPassId */
  updateUri?: string;
  /** Required. A fully qualified identifier of the pass that the issuer wants to notify the pass holder(s) about. Formatted as . */
  externalPassId?: string;
}

export const SetPassUpdateNoticeRequest: Schema.Schema<SetPassUpdateNoticeRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      updatedPassJwtSignature: Schema.optional(Schema.String),
      updateUri: Schema.optional(Schema.String),
      externalPassId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetPassUpdateNoticeRequest",
  }) as any as Schema.Schema<SetPassUpdateNoticeRequest>;

export interface TransitObjectUploadRotatingBarcodeValuesRequest {
  /** A reference to the rotating barcode values payload that was uploaded. */
  blob?: Media;
  /** Extra information about the uploaded media. */
  mediaRequestInfo?: MediaRequestInfo;
}

export const TransitObjectUploadRotatingBarcodeValuesRequest: Schema.Schema<TransitObjectUploadRotatingBarcodeValuesRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      blob: Schema.optional(Media),
      mediaRequestInfo: Schema.optional(MediaRequestInfo),
    }),
  ).annotate({
    identifier: "TransitObjectUploadRotatingBarcodeValuesRequest",
  }) as any as Schema.Schema<TransitObjectUploadRotatingBarcodeValuesRequest>;

export interface UploadPrivateImageResponse {
  /** Unique ID of the uploaded image to be referenced later in Image.private_image_id. */
  privateImageId?: string;
}

export const UploadPrivateImageResponse: Schema.Schema<UploadPrivateImageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      privateImageId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadPrivateImageResponse",
  }) as any as Schema.Schema<UploadPrivateImageResponse>;

export interface FlightClassAddMessageResponse {
  /** The updated FlightClass resource. */
  resource?: FlightClass;
}

export const FlightClassAddMessageResponse: Schema.Schema<FlightClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(FlightClass),
    }),
  ).annotate({
    identifier: "FlightClassAddMessageResponse",
  }) as any as Schema.Schema<FlightClassAddMessageResponse>;

export interface GiftCardObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<GiftCardObject>;
}

export const GiftCardObjectListResponse: Schema.Schema<GiftCardObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(GiftCardObject)),
    }),
  ).annotate({
    identifier: "GiftCardObjectListResponse",
  }) as any as Schema.Schema<GiftCardObjectListResponse>;

export interface OfferObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<OfferObject>;
}

export const OfferObjectListResponse: Schema.Schema<OfferObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(OfferObject)),
    }),
  ).annotate({
    identifier: "OfferObjectListResponse",
  }) as any as Schema.Schema<OfferObjectListResponse>;

export interface IssuerToUserInfo {
  /** JSON web token for action S2AP. */
  value?: string;
  /** Currently not used, consider deprecating. */
  url?: string;
  signUpInfo?: SignUpInfo;
  action?:
    | "ACTION_UNSPECIFIED"
    | "S2AP"
    | "s2ap"
    | "SIGN_UP"
    | "signUp"
    | (string & {});
}

export const IssuerToUserInfo: Schema.Schema<IssuerToUserInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      signUpInfo: Schema.optional(SignUpInfo),
      action: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "IssuerToUserInfo",
}) as any as Schema.Schema<IssuerToUserInfo>;

export interface TransitClassListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<TransitClass>;
}

export const TransitClassListResponse: Schema.Schema<TransitClassListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(TransitClass)),
    }),
  ).annotate({
    identifier: "TransitClassListResponse",
  }) as any as Schema.Schema<TransitClassListResponse>;

export interface OfferClassAddMessageResponse {
  /** The updated OfferClass resource. */
  resource?: OfferClass;
}

export const OfferClassAddMessageResponse: Schema.Schema<OfferClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(OfferClass),
    }),
  ).annotate({
    identifier: "OfferClassAddMessageResponse",
  }) as any as Schema.Schema<OfferClassAddMessageResponse>;

export interface GenericClassAddMessageResponse {
  /** The updated EventTicketClass resource. */
  resource?: GenericClass;
}

export const GenericClassAddMessageResponse: Schema.Schema<GenericClassAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(GenericClass),
    }),
  ).annotate({
    identifier: "GenericClassAddMessageResponse",
  }) as any as Schema.Schema<GenericClassAddMessageResponse>;

export interface LoyaltyObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<LoyaltyObject>;
}

export const LoyaltyObjectListResponse: Schema.Schema<LoyaltyObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(LoyaltyObject)),
    }),
  ).annotate({
    identifier: "LoyaltyObjectListResponse",
  }) as any as Schema.Schema<LoyaltyObjectListResponse>;

export interface SetPassUpdateNoticeResponse {}

export const SetPassUpdateNoticeResponse: Schema.Schema<SetPassUpdateNoticeResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SetPassUpdateNoticeResponse",
  }) as any as Schema.Schema<SetPassUpdateNoticeResponse>;

export interface OfferObjectAddMessageResponse {
  /** The updated OfferObject resource. */
  resource?: OfferObject;
}

export const OfferObjectAddMessageResponse: Schema.Schema<OfferObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(OfferObject),
    }),
  ).annotate({
    identifier: "OfferObjectAddMessageResponse",
  }) as any as Schema.Schema<OfferObjectAddMessageResponse>;

export interface SmartTap {
  /** Smart Tap merchant ID of who engaged in the Smart Tap interaction. */
  merchantId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string `"walletobjects#smartTap"`. */
  kind?: string;
  /** The unique identifier for a smart tap. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is the Smart Tap id. The Smart Tap id is a Base64 encoded string which represents the id which was generated by the Google Pay app. */
  id?: string;
  /** Communication from merchant to user. */
  infos?: Array<IssuerToUserInfo>;
}

export const SmartTap: Schema.Schema<SmartTap> = Schema.suspend(() =>
  Schema.Struct({
    merchantId: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    infos: Schema.optional(Schema.Array(IssuerToUserInfo)),
  }),
).annotate({ identifier: "SmartTap" }) as any as Schema.Schema<SmartTap>;

export interface FlightObjectAddMessageResponse {
  /** The updated FlightObject resource. */
  resource?: FlightObject;
}

export const FlightObjectAddMessageResponse: Schema.Schema<FlightObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(FlightObject),
    }),
  ).annotate({
    identifier: "FlightObjectAddMessageResponse",
  }) as any as Schema.Schema<FlightObjectAddMessageResponse>;

export interface TransitObjectAddMessageResponse {
  /** The updated TransitObject resource. */
  resource?: TransitObject;
}

export const TransitObjectAddMessageResponse: Schema.Schema<TransitObjectAddMessageResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(TransitObject),
    }),
  ).annotate({
    identifier: "TransitObjectAddMessageResponse",
  }) as any as Schema.Schema<TransitObjectAddMessageResponse>;

export interface TransitObjectListResponse {
  /** Pagination of the response. */
  pagination?: Pagination;
  /** Resources corresponding to the list request. */
  resources?: Array<TransitObject>;
}

export const TransitObjectListResponse: Schema.Schema<TransitObjectListResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      pagination: Schema.optional(Pagination),
      resources: Schema.optional(Schema.Array(TransitObject)),
    }),
  ).annotate({
    identifier: "TransitObjectListResponse",
  }) as any as Schema.Schema<TransitObjectListResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface InsertSmarttapRequest {
  /** Request body */
  body?: SmartTap;
}

export const InsertSmarttapRequest = Schema.Struct({
  body: Schema.optional(SmartTap).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "walletobjects/v1/smartTap", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSmarttapRequest>;

export type InsertSmarttapResponse = SmartTap;
export const InsertSmarttapResponse = SmartTap;

export type InsertSmarttapError = DefaultErrors;

/** Inserts the smart tap. */
export const insertSmarttap: API.OperationMethod<
  InsertSmarttapRequest,
  InsertSmarttapResponse,
  InsertSmarttapError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertSmarttapRequest,
  output: InsertSmarttapResponse,
  errors: [],
}));

export interface GetLoyaltyclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetLoyaltyclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/loyaltyClass/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetLoyaltyclassRequest>;

export type GetLoyaltyclassResponse = LoyaltyClass;
export const GetLoyaltyclassResponse = LoyaltyClass;

export type GetLoyaltyclassError = DefaultErrors;

/** Returns the loyalty class with the given class ID. */
export const getLoyaltyclass: API.OperationMethod<
  GetLoyaltyclassRequest,
  GetLoyaltyclassResponse,
  GetLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLoyaltyclassRequest,
  output: GetLoyaltyclassResponse,
  errors: [],
}));

export interface PatchLoyaltyclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: LoyaltyClass;
}

export const PatchLoyaltyclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(LoyaltyClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/loyaltyClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLoyaltyclassRequest>;

export type PatchLoyaltyclassResponse = LoyaltyClass;
export const PatchLoyaltyclassResponse = LoyaltyClass;

export type PatchLoyaltyclassError = DefaultErrors;

/** Updates the loyalty class referenced by the given class ID. This method supports patch semantics. */
export const patchLoyaltyclass: API.OperationMethod<
  PatchLoyaltyclassRequest,
  PatchLoyaltyclassResponse,
  PatchLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLoyaltyclassRequest,
  output: PatchLoyaltyclassResponse,
  errors: [],
}));

export interface AddmessageLoyaltyclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageLoyaltyclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/loyaltyClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageLoyaltyclassRequest>;

export type AddmessageLoyaltyclassResponse = LoyaltyClassAddMessageResponse;
export const AddmessageLoyaltyclassResponse = LoyaltyClassAddMessageResponse;

export type AddmessageLoyaltyclassError = DefaultErrors;

/** Adds a message to the loyalty class referenced by the given class ID. */
export const addmessageLoyaltyclass: API.OperationMethod<
  AddmessageLoyaltyclassRequest,
  AddmessageLoyaltyclassResponse,
  AddmessageLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageLoyaltyclassRequest,
  output: AddmessageLoyaltyclassResponse,
  errors: [],
}));

export interface InsertLoyaltyclassRequest {
  /** Request body */
  body?: LoyaltyClass;
}

export const InsertLoyaltyclassRequest = Schema.Struct({
  body: Schema.optional(LoyaltyClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/loyaltyClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertLoyaltyclassRequest>;

export type InsertLoyaltyclassResponse = LoyaltyClass;
export const InsertLoyaltyclassResponse = LoyaltyClass;

export type InsertLoyaltyclassError = DefaultErrors;

/** Inserts an loyalty class with the given ID and properties. */
export const insertLoyaltyclass: API.OperationMethod<
  InsertLoyaltyclassRequest,
  InsertLoyaltyclassResponse,
  InsertLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertLoyaltyclassRequest,
  output: InsertLoyaltyclassResponse,
  errors: [],
}));

export interface UpdateLoyaltyclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: LoyaltyClass;
}

export const UpdateLoyaltyclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(LoyaltyClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/loyaltyClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateLoyaltyclassRequest>;

export type UpdateLoyaltyclassResponse = LoyaltyClass;
export const UpdateLoyaltyclassResponse = LoyaltyClass;

export type UpdateLoyaltyclassError = DefaultErrors;

/** Updates the loyalty class referenced by the given class ID. */
export const updateLoyaltyclass: API.OperationMethod<
  UpdateLoyaltyclassRequest,
  UpdateLoyaltyclassResponse,
  UpdateLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateLoyaltyclassRequest,
  output: UpdateLoyaltyclassResponse,
  errors: [],
}));

export interface ListLoyaltyclassRequest {
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListLoyaltyclassRequest = Schema.Struct({
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/loyaltyClass" }),
  svc,
) as unknown as Schema.Schema<ListLoyaltyclassRequest>;

export type ListLoyaltyclassResponse = LoyaltyClassListResponse;
export const ListLoyaltyclassResponse = LoyaltyClassListResponse;

export type ListLoyaltyclassError = DefaultErrors;

/** Returns a list of all loyalty classes for a given issuer ID. */
export const listLoyaltyclass: API.OperationMethod<
  ListLoyaltyclassRequest,
  ListLoyaltyclassResponse,
  ListLoyaltyclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLoyaltyclassRequest,
  output: ListLoyaltyclassResponse,
  errors: [],
}));

export interface InsertGiftcardobjectRequest {
  /** Request body */
  body?: GiftCardObject;
}

export const InsertGiftcardobjectRequest = Schema.Struct({
  body: Schema.optional(GiftCardObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/giftCardObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertGiftcardobjectRequest>;

export type InsertGiftcardobjectResponse = GiftCardObject;
export const InsertGiftcardobjectResponse = GiftCardObject;

export type InsertGiftcardobjectError = DefaultErrors;

/** Inserts an gift card object with the given ID and properties. */
export const insertGiftcardobject: API.OperationMethod<
  InsertGiftcardobjectRequest,
  InsertGiftcardobjectResponse,
  InsertGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertGiftcardobjectRequest,
  output: InsertGiftcardobjectResponse,
  errors: [],
}));

export interface UpdateGiftcardobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: GiftCardObject;
}

export const UpdateGiftcardobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GiftCardObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/giftCardObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateGiftcardobjectRequest>;

export type UpdateGiftcardobjectResponse = GiftCardObject;
export const UpdateGiftcardobjectResponse = GiftCardObject;

export type UpdateGiftcardobjectError = DefaultErrors;

/** Updates the gift card object referenced by the given object ID. */
export const updateGiftcardobject: API.OperationMethod<
  UpdateGiftcardobjectRequest,
  UpdateGiftcardobjectResponse,
  UpdateGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateGiftcardobjectRequest,
  output: UpdateGiftcardobjectResponse,
  errors: [],
}));

export interface ListGiftcardobjectRequest {
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
  /** The ID of the class whose objects will be listed. */
  classId?: string;
}

export const ListGiftcardobjectRequest = Schema.Struct({
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/giftCardObject" }),
  svc,
) as unknown as Schema.Schema<ListGiftcardobjectRequest>;

export type ListGiftcardobjectResponse = GiftCardObjectListResponse;
export const ListGiftcardobjectResponse = GiftCardObjectListResponse;

export type ListGiftcardobjectError = DefaultErrors;

/** Returns a list of all gift card objects for a given issuer ID. */
export const listGiftcardobject: API.OperationMethod<
  ListGiftcardobjectRequest,
  ListGiftcardobjectResponse,
  ListGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListGiftcardobjectRequest,
  output: ListGiftcardobjectResponse,
  errors: [],
}));

export interface AddmessageGiftcardobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageGiftcardobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/giftCardObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageGiftcardobjectRequest>;

export type AddmessageGiftcardobjectResponse = GiftCardObjectAddMessageResponse;
export const AddmessageGiftcardobjectResponse =
  GiftCardObjectAddMessageResponse;

export type AddmessageGiftcardobjectError = DefaultErrors;

/** Adds a message to the gift card object referenced by the given object ID. */
export const addmessageGiftcardobject: API.OperationMethod<
  AddmessageGiftcardobjectRequest,
  AddmessageGiftcardobjectResponse,
  AddmessageGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageGiftcardobjectRequest,
  output: AddmessageGiftcardobjectResponse,
  errors: [],
}));

export interface GetGiftcardobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetGiftcardobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/giftCardObject/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetGiftcardobjectRequest>;

export type GetGiftcardobjectResponse = GiftCardObject;
export const GetGiftcardobjectResponse = GiftCardObject;

export type GetGiftcardobjectError = DefaultErrors;

/** Returns the gift card object with the given object ID. */
export const getGiftcardobject: API.OperationMethod<
  GetGiftcardobjectRequest,
  GetGiftcardobjectResponse,
  GetGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGiftcardobjectRequest,
  output: GetGiftcardobjectResponse,
  errors: [],
}));

export interface PatchGiftcardobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: GiftCardObject;
}

export const PatchGiftcardobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GiftCardObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/giftCardObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchGiftcardobjectRequest>;

export type PatchGiftcardobjectResponse = GiftCardObject;
export const PatchGiftcardobjectResponse = GiftCardObject;

export type PatchGiftcardobjectError = DefaultErrors;

/** Updates the gift card object referenced by the given object ID. This method supports patch semantics. */
export const patchGiftcardobject: API.OperationMethod<
  PatchGiftcardobjectRequest,
  PatchGiftcardobjectResponse,
  PatchGiftcardobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchGiftcardobjectRequest,
  output: PatchGiftcardobjectResponse,
  errors: [],
}));

export interface InsertJwtRequest {
  /** Request body */
  body?: JwtResource;
}

export const InsertJwtRequest = Schema.Struct({
  body: Schema.optional(JwtResource).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "walletobjects/v1/jwt", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertJwtRequest>;

export type InsertJwtResponse = JwtInsertResponse;
export const InsertJwtResponse = JwtInsertResponse;

export type InsertJwtError = DefaultErrors;

/** Inserts the resources in the JWT. */
export const insertJwt: API.OperationMethod<
  InsertJwtRequest,
  InsertJwtResponse,
  InsertJwtError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertJwtRequest,
  output: InsertJwtResponse,
  errors: [],
}));

export interface InsertFlightobjectRequest {
  /** Request body */
  body?: FlightObject;
}

export const InsertFlightobjectRequest = Schema.Struct({
  body: Schema.optional(FlightObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/flightObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertFlightobjectRequest>;

export type InsertFlightobjectResponse = FlightObject;
export const InsertFlightobjectResponse = FlightObject;

export type InsertFlightobjectError = DefaultErrors;

/** Inserts an flight object with the given ID and properties. */
export const insertFlightobject: API.OperationMethod<
  InsertFlightobjectRequest,
  InsertFlightobjectResponse,
  InsertFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertFlightobjectRequest,
  output: InsertFlightobjectResponse,
  errors: [],
}));

export interface UpdateFlightobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: FlightObject;
}

export const UpdateFlightobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(FlightObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/flightObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateFlightobjectRequest>;

export type UpdateFlightobjectResponse = FlightObject;
export const UpdateFlightobjectResponse = FlightObject;

export type UpdateFlightobjectError = DefaultErrors;

/** Updates the flight object referenced by the given object ID. */
export const updateFlightobject: API.OperationMethod<
  UpdateFlightobjectRequest,
  UpdateFlightobjectResponse,
  UpdateFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateFlightobjectRequest,
  output: UpdateFlightobjectResponse,
  errors: [],
}));

export interface ListFlightobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListFlightobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/flightObject" }),
  svc,
) as unknown as Schema.Schema<ListFlightobjectRequest>;

export type ListFlightobjectResponse = FlightObjectListResponse;
export const ListFlightobjectResponse = FlightObjectListResponse;

export type ListFlightobjectError = DefaultErrors;

/** Returns a list of all flight objects for a given issuer ID. */
export const listFlightobject: API.OperationMethod<
  ListFlightobjectRequest,
  ListFlightobjectResponse,
  ListFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFlightobjectRequest,
  output: ListFlightobjectResponse,
  errors: [],
}));

export interface AddmessageFlightobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageFlightobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/flightObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageFlightobjectRequest>;

export type AddmessageFlightobjectResponse = FlightObjectAddMessageResponse;
export const AddmessageFlightobjectResponse = FlightObjectAddMessageResponse;

export type AddmessageFlightobjectError = DefaultErrors;

/** Adds a message to the flight object referenced by the given object ID. */
export const addmessageFlightobject: API.OperationMethod<
  AddmessageFlightobjectRequest,
  AddmessageFlightobjectResponse,
  AddmessageFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageFlightobjectRequest,
  output: AddmessageFlightobjectResponse,
  errors: [],
}));

export interface GetFlightobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetFlightobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/flightObject/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetFlightobjectRequest>;

export type GetFlightobjectResponse = FlightObject;
export const GetFlightobjectResponse = FlightObject;

export type GetFlightobjectError = DefaultErrors;

/** Returns the flight object with the given object ID. */
export const getFlightobject: API.OperationMethod<
  GetFlightobjectRequest,
  GetFlightobjectResponse,
  GetFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetFlightobjectRequest,
  output: GetFlightobjectResponse,
  errors: [],
}));

export interface PatchFlightobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: FlightObject;
}

export const PatchFlightobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(FlightObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/flightObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchFlightobjectRequest>;

export type PatchFlightobjectResponse = FlightObject;
export const PatchFlightobjectResponse = FlightObject;

export type PatchFlightobjectError = DefaultErrors;

/** Updates the flight object referenced by the given object ID. This method supports patch semantics. */
export const patchFlightobject: API.OperationMethod<
  PatchFlightobjectRequest,
  PatchFlightobjectResponse,
  PatchFlightobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchFlightobjectRequest,
  output: PatchFlightobjectResponse,
  errors: [],
}));

export interface InsertIssuerRequest {
  /** Request body */
  body?: Issuer;
}

export const InsertIssuerRequest = Schema.Struct({
  body: Schema.optional(Issuer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "walletobjects/v1/issuer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertIssuerRequest>;

export type InsertIssuerResponse = Issuer;
export const InsertIssuerResponse = Issuer;

export type InsertIssuerError = DefaultErrors;

/** Inserts an issuer with the given ID and properties. */
export const insertIssuer: API.OperationMethod<
  InsertIssuerRequest,
  InsertIssuerResponse,
  InsertIssuerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertIssuerRequest,
  output: InsertIssuerResponse,
  errors: [],
}));

export interface UpdateIssuerRequest {
  /** The unique identifier for an issuer. */
  resourceId: string;
  /** Request body */
  body?: Issuer;
}

export const UpdateIssuerRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(Issuer).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/issuer/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateIssuerRequest>;

export type UpdateIssuerResponse = Issuer;
export const UpdateIssuerResponse = Issuer;

export type UpdateIssuerError = DefaultErrors;

/** Updates the issuer referenced by the given issuer ID. */
export const updateIssuer: API.OperationMethod<
  UpdateIssuerRequest,
  UpdateIssuerResponse,
  UpdateIssuerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateIssuerRequest,
  output: UpdateIssuerResponse,
  errors: [],
}));

export interface ListIssuerRequest {}

export const ListIssuerRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/issuer" }),
  svc,
) as unknown as Schema.Schema<ListIssuerRequest>;

export type ListIssuerResponse = IssuerListResponse;
export const ListIssuerResponse = IssuerListResponse;

export type ListIssuerError = DefaultErrors;

/** Returns a list of all issuers shared to the caller. */
export const listIssuer: API.OperationMethod<
  ListIssuerRequest,
  ListIssuerResponse,
  ListIssuerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListIssuerRequest,
  output: ListIssuerResponse,
  errors: [],
}));

export interface GetIssuerRequest {
  /** The unique identifier for an issuer. */
  resourceId: string;
}

export const GetIssuerRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/issuer/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetIssuerRequest>;

export type GetIssuerResponse = Issuer;
export const GetIssuerResponse = Issuer;

export type GetIssuerError = DefaultErrors;

/** Returns the issuer with the given issuer ID. */
export const getIssuer: API.OperationMethod<
  GetIssuerRequest,
  GetIssuerResponse,
  GetIssuerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIssuerRequest,
  output: GetIssuerResponse,
  errors: [],
}));

export interface PatchIssuerRequest {
  /** The unique identifier for an issuer. */
  resourceId: string;
  /** Request body */
  body?: Issuer;
}

export const PatchIssuerRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(Issuer).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/issuer/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchIssuerRequest>;

export type PatchIssuerResponse = Issuer;
export const PatchIssuerResponse = Issuer;

export type PatchIssuerError = DefaultErrors;

/** Updates the issuer referenced by the given issuer ID. This method supports patch semantics. */
export const patchIssuer: API.OperationMethod<
  PatchIssuerRequest,
  PatchIssuerResponse,
  PatchIssuerError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchIssuerRequest,
  output: PatchIssuerResponse,
  errors: [],
}));

export interface DownloadMediaRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const DownloadMediaRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/transitObject/{resourceId}/downloadRotatingBarcodeValues",
  }),
  svc,
) as unknown as Schema.Schema<DownloadMediaRequest>;

export type DownloadMediaResponse = Media;
export const DownloadMediaResponse = Media;

export type DownloadMediaError = DefaultErrors;

/** Downloads rotating barcode values for the transit object referenced by the given object ID. */
export const downloadMedia: API.OperationMethod<
  DownloadMediaRequest,
  DownloadMediaResponse,
  DownloadMediaError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DownloadMediaRequest,
  output: DownloadMediaResponse,
  errors: [],
}));

export interface UploadMediaRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: TransitObjectUploadRotatingBarcodeValuesRequest;
}

export const UploadMediaRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(TransitObjectUploadRotatingBarcodeValuesRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/transitObject/{resourceId}/uploadRotatingBarcodeValues",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UploadMediaRequest>;

export type UploadMediaResponse =
  TransitObjectUploadRotatingBarcodeValuesResponse;
export const UploadMediaResponse =
  TransitObjectUploadRotatingBarcodeValuesResponse;

export type UploadMediaError = DefaultErrors;

/** Uploads rotating barcode values for the transit object referenced by the given object ID. Note the max upload size is specified in google3/production/config/cdd/apps-upload/customers/payments-consumer-passes/config.gcl and enforced by Scotty. */
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

export interface AddmessageOfferclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageOfferclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/offerClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageOfferclassRequest>;

export type AddmessageOfferclassResponse = OfferClassAddMessageResponse;
export const AddmessageOfferclassResponse = OfferClassAddMessageResponse;

export type AddmessageOfferclassError = DefaultErrors;

/** Adds a message to the offer class referenced by the given class ID. */
export const addmessageOfferclass: API.OperationMethod<
  AddmessageOfferclassRequest,
  AddmessageOfferclassResponse,
  AddmessageOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageOfferclassRequest,
  output: AddmessageOfferclassResponse,
  errors: [],
}));

export interface GetOfferclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetOfferclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/offerClass/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetOfferclassRequest>;

export type GetOfferclassResponse = OfferClass;
export const GetOfferclassResponse = OfferClass;

export type GetOfferclassError = DefaultErrors;

/** Returns the offer class with the given class ID. */
export const getOfferclass: API.OperationMethod<
  GetOfferclassRequest,
  GetOfferclassResponse,
  GetOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOfferclassRequest,
  output: GetOfferclassResponse,
  errors: [],
}));

export interface PatchOfferclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: OfferClass;
}

export const PatchOfferclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(OfferClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/offerClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchOfferclassRequest>;

export type PatchOfferclassResponse = OfferClass;
export const PatchOfferclassResponse = OfferClass;

export type PatchOfferclassError = DefaultErrors;

/** Updates the offer class referenced by the given class ID. This method supports patch semantics. */
export const patchOfferclass: API.OperationMethod<
  PatchOfferclassRequest,
  PatchOfferclassResponse,
  PatchOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOfferclassRequest,
  output: PatchOfferclassResponse,
  errors: [],
}));

export interface InsertOfferclassRequest {
  /** Request body */
  body?: OfferClass;
}

export const InsertOfferclassRequest = Schema.Struct({
  body: Schema.optional(OfferClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/offerClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertOfferclassRequest>;

export type InsertOfferclassResponse = OfferClass;
export const InsertOfferclassResponse = OfferClass;

export type InsertOfferclassError = DefaultErrors;

/** Inserts an offer class with the given ID and properties. */
export const insertOfferclass: API.OperationMethod<
  InsertOfferclassRequest,
  InsertOfferclassResponse,
  InsertOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertOfferclassRequest,
  output: InsertOfferclassResponse,
  errors: [],
}));

export interface UpdateOfferclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: OfferClass;
}

export const UpdateOfferclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(OfferClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/offerClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateOfferclassRequest>;

export type UpdateOfferclassResponse = OfferClass;
export const UpdateOfferclassResponse = OfferClass;

export type UpdateOfferclassError = DefaultErrors;

/** Updates the offer class referenced by the given class ID. */
export const updateOfferclass: API.OperationMethod<
  UpdateOfferclassRequest,
  UpdateOfferclassResponse,
  UpdateOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateOfferclassRequest,
  output: UpdateOfferclassResponse,
  errors: [],
}));

export interface ListOfferclassRequest {
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListOfferclassRequest = Schema.Struct({
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/offerClass" }),
  svc,
) as unknown as Schema.Schema<ListOfferclassRequest>;

export type ListOfferclassResponse = OfferClassListResponse;
export const ListOfferclassResponse = OfferClassListResponse;

export type ListOfferclassError = DefaultErrors;

/** Returns a list of all offer classes for a given issuer ID. */
export const listOfferclass: API.OperationMethod<
  ListOfferclassRequest,
  ListOfferclassResponse,
  ListOfferclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOfferclassRequest,
  output: ListOfferclassResponse,
  errors: [],
}));

export interface ListGiftcardclassRequest {
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
}

export const ListGiftcardclassRequest = Schema.Struct({
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/giftCardClass" }),
  svc,
) as unknown as Schema.Schema<ListGiftcardclassRequest>;

export type ListGiftcardclassResponse = GiftCardClassListResponse;
export const ListGiftcardclassResponse = GiftCardClassListResponse;

export type ListGiftcardclassError = DefaultErrors;

/** Returns a list of all gift card classes for a given issuer ID. */
export const listGiftcardclass: API.OperationMethod<
  ListGiftcardclassRequest,
  ListGiftcardclassResponse,
  ListGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListGiftcardclassRequest,
  output: ListGiftcardclassResponse,
  errors: [],
}));

export interface InsertGiftcardclassRequest {
  /** Request body */
  body?: GiftCardClass;
}

export const InsertGiftcardclassRequest = Schema.Struct({
  body: Schema.optional(GiftCardClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/giftCardClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertGiftcardclassRequest>;

export type InsertGiftcardclassResponse = GiftCardClass;
export const InsertGiftcardclassResponse = GiftCardClass;

export type InsertGiftcardclassError = DefaultErrors;

/** Inserts an gift card class with the given ID and properties. */
export const insertGiftcardclass: API.OperationMethod<
  InsertGiftcardclassRequest,
  InsertGiftcardclassResponse,
  InsertGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertGiftcardclassRequest,
  output: InsertGiftcardclassResponse,
  errors: [],
}));

export interface UpdateGiftcardclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: GiftCardClass;
}

export const UpdateGiftcardclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GiftCardClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/giftCardClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateGiftcardclassRequest>;

export type UpdateGiftcardclassResponse = GiftCardClass;
export const UpdateGiftcardclassResponse = GiftCardClass;

export type UpdateGiftcardclassError = DefaultErrors;

/** Updates the gift card class referenced by the given class ID. */
export const updateGiftcardclass: API.OperationMethod<
  UpdateGiftcardclassRequest,
  UpdateGiftcardclassResponse,
  UpdateGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateGiftcardclassRequest,
  output: UpdateGiftcardclassResponse,
  errors: [],
}));

export interface GetGiftcardclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetGiftcardclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/giftCardClass/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetGiftcardclassRequest>;

export type GetGiftcardclassResponse = GiftCardClass;
export const GetGiftcardclassResponse = GiftCardClass;

export type GetGiftcardclassError = DefaultErrors;

/** Returns the gift card class with the given class ID. */
export const getGiftcardclass: API.OperationMethod<
  GetGiftcardclassRequest,
  GetGiftcardclassResponse,
  GetGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGiftcardclassRequest,
  output: GetGiftcardclassResponse,
  errors: [],
}));

export interface PatchGiftcardclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: GiftCardClass;
}

export const PatchGiftcardclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GiftCardClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/giftCardClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchGiftcardclassRequest>;

export type PatchGiftcardclassResponse = GiftCardClass;
export const PatchGiftcardclassResponse = GiftCardClass;

export type PatchGiftcardclassError = DefaultErrors;

/** Updates the gift card class referenced by the given class ID. This method supports patch semantics. */
export const patchGiftcardclass: API.OperationMethod<
  PatchGiftcardclassRequest,
  PatchGiftcardclassResponse,
  PatchGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchGiftcardclassRequest,
  output: PatchGiftcardclassResponse,
  errors: [],
}));

export interface AddmessageGiftcardclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageGiftcardclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/giftCardClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageGiftcardclassRequest>;

export type AddmessageGiftcardclassResponse = GiftCardClassAddMessageResponse;
export const AddmessageGiftcardclassResponse = GiftCardClassAddMessageResponse;

export type AddmessageGiftcardclassError = DefaultErrors;

/** Adds a message to the gift card class referenced by the given class ID. */
export const addmessageGiftcardclass: API.OperationMethod<
  AddmessageGiftcardclassRequest,
  AddmessageGiftcardclassResponse,
  AddmessageGiftcardclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageGiftcardclassRequest,
  output: AddmessageGiftcardclassResponse,
  errors: [],
}));

export interface InsertOfferobjectRequest {
  /** Request body */
  body?: OfferObject;
}

export const InsertOfferobjectRequest = Schema.Struct({
  body: Schema.optional(OfferObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/offerObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertOfferobjectRequest>;

export type InsertOfferobjectResponse = OfferObject;
export const InsertOfferobjectResponse = OfferObject;

export type InsertOfferobjectError = DefaultErrors;

/** Inserts an offer object with the given ID and properties. */
export const insertOfferobject: API.OperationMethod<
  InsertOfferobjectRequest,
  InsertOfferobjectResponse,
  InsertOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertOfferobjectRequest,
  output: InsertOfferobjectResponse,
  errors: [],
}));

export interface UpdateOfferobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: OfferObject;
}

export const UpdateOfferobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(OfferObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/offerObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateOfferobjectRequest>;

export type UpdateOfferobjectResponse = OfferObject;
export const UpdateOfferobjectResponse = OfferObject;

export type UpdateOfferobjectError = DefaultErrors;

/** Updates the offer object referenced by the given object ID. */
export const updateOfferobject: API.OperationMethod<
  UpdateOfferobjectRequest,
  UpdateOfferobjectResponse,
  UpdateOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateOfferobjectRequest,
  output: UpdateOfferobjectResponse,
  errors: [],
}));

export interface ListOfferobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListOfferobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/offerObject" }),
  svc,
) as unknown as Schema.Schema<ListOfferobjectRequest>;

export type ListOfferobjectResponse = OfferObjectListResponse;
export const ListOfferobjectResponse = OfferObjectListResponse;

export type ListOfferobjectError = DefaultErrors;

/** Returns a list of all offer objects for a given issuer ID. */
export const listOfferobject: API.OperationMethod<
  ListOfferobjectRequest,
  ListOfferobjectResponse,
  ListOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOfferobjectRequest,
  output: ListOfferobjectResponse,
  errors: [],
}));

export interface GetOfferobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetOfferobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/offerObject/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetOfferobjectRequest>;

export type GetOfferobjectResponse = OfferObject;
export const GetOfferobjectResponse = OfferObject;

export type GetOfferobjectError = DefaultErrors;

/** Returns the offer object with the given object ID. */
export const getOfferobject: API.OperationMethod<
  GetOfferobjectRequest,
  GetOfferobjectResponse,
  GetOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOfferobjectRequest,
  output: GetOfferobjectResponse,
  errors: [],
}));

export interface PatchOfferobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: OfferObject;
}

export const PatchOfferobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(OfferObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/offerObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchOfferobjectRequest>;

export type PatchOfferobjectResponse = OfferObject;
export const PatchOfferobjectResponse = OfferObject;

export type PatchOfferobjectError = DefaultErrors;

/** Updates the offer object referenced by the given object ID. This method supports patch semantics. */
export const patchOfferobject: API.OperationMethod<
  PatchOfferobjectRequest,
  PatchOfferobjectResponse,
  PatchOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOfferobjectRequest,
  output: PatchOfferobjectResponse,
  errors: [],
}));

export interface AddmessageOfferobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageOfferobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/offerObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageOfferobjectRequest>;

export type AddmessageOfferobjectResponse = OfferObjectAddMessageResponse;
export const AddmessageOfferobjectResponse = OfferObjectAddMessageResponse;

export type AddmessageOfferobjectError = DefaultErrors;

/** Adds a message to the offer object referenced by the given object ID. */
export const addmessageOfferobject: API.OperationMethod<
  AddmessageOfferobjectRequest,
  AddmessageOfferobjectResponse,
  AddmessageOfferobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageOfferobjectRequest,
  output: AddmessageOfferobjectResponse,
  errors: [],
}));

export interface SetPassUpdateNoticeWalletobjectsV1PrivateContentRequest {
  /** Request body */
  body?: SetPassUpdateNoticeRequest;
}

export const SetPassUpdateNoticeWalletobjectsV1PrivateContentRequest =
  Schema.Struct({
    body: Schema.optional(SetPassUpdateNoticeRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "walletobjects/v1/privateContent/setPassUpdateNotice",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetPassUpdateNoticeWalletobjectsV1PrivateContentRequest>;

export type SetPassUpdateNoticeWalletobjectsV1PrivateContentResponse =
  SetPassUpdateNoticeResponse;
export const SetPassUpdateNoticeWalletobjectsV1PrivateContentResponse =
  SetPassUpdateNoticeResponse;

export type SetPassUpdateNoticeWalletobjectsV1PrivateContentError =
  DefaultErrors;

/** Provide Google with information about awaiting private pass update. This will allow Google to provide the update notification to the device that currently holds this pass. */
export const setPassUpdateNoticeWalletobjectsV1PrivateContent: API.OperationMethod<
  SetPassUpdateNoticeWalletobjectsV1PrivateContentRequest,
  SetPassUpdateNoticeWalletobjectsV1PrivateContentResponse,
  SetPassUpdateNoticeWalletobjectsV1PrivateContentError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetPassUpdateNoticeWalletobjectsV1PrivateContentRequest,
  output: SetPassUpdateNoticeWalletobjectsV1PrivateContentResponse,
  errors: [],
}));

export interface InsertGenericobjectRequest {
  /** Request body */
  body?: GenericObject;
}

export const InsertGenericobjectRequest = Schema.Struct({
  body: Schema.optional(GenericObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/genericObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertGenericobjectRequest>;

export type InsertGenericobjectResponse = GenericObject;
export const InsertGenericobjectResponse = GenericObject;

export type InsertGenericobjectError = DefaultErrors;

/** Inserts a generic object with the given ID and properties. */
export const insertGenericobject: API.OperationMethod<
  InsertGenericobjectRequest,
  InsertGenericobjectResponse,
  InsertGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertGenericobjectRequest,
  output: InsertGenericobjectResponse,
  errors: [],
}));

export interface UpdateGenericobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
  /** Request body */
  body?: GenericObject;
}

export const UpdateGenericobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GenericObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/genericObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateGenericobjectRequest>;

export type UpdateGenericobjectResponse = GenericObject;
export const UpdateGenericobjectResponse = GenericObject;

export type UpdateGenericobjectError = DefaultErrors;

/** Updates the generic object referenced by the given object ID. */
export const updateGenericobject: API.OperationMethod<
  UpdateGenericobjectRequest,
  UpdateGenericobjectResponse,
  UpdateGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateGenericobjectRequest,
  output: UpdateGenericobjectResponse,
  errors: [],
}));

export interface ListGenericobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListGenericobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/genericObject" }),
  svc,
) as unknown as Schema.Schema<ListGenericobjectRequest>;

export type ListGenericobjectResponse = GenericObjectListResponse;
export const ListGenericobjectResponse = GenericObjectListResponse;

export type ListGenericobjectError = DefaultErrors;

/** Returns a list of all generic objects for a given issuer ID. */
export const listGenericobject: API.OperationMethod<
  ListGenericobjectRequest,
  ListGenericobjectResponse,
  ListGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListGenericobjectRequest,
  output: ListGenericobjectResponse,
  errors: [],
}));

export interface GetGenericobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
}

export const GetGenericobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/genericObject/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetGenericobjectRequest>;

export type GetGenericobjectResponse = GenericObject;
export const GetGenericobjectResponse = GenericObject;

export type GetGenericobjectError = DefaultErrors;

/** Returns the generic object with the given object ID. */
export const getGenericobject: API.OperationMethod<
  GetGenericobjectRequest,
  GetGenericobjectResponse,
  GetGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGenericobjectRequest,
  output: GetGenericobjectResponse,
  errors: [],
}));

export interface PatchGenericobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
  /** Request body */
  body?: GenericObject;
}

export const PatchGenericobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GenericObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/genericObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchGenericobjectRequest>;

export type PatchGenericobjectResponse = GenericObject;
export const PatchGenericobjectResponse = GenericObject;

export type PatchGenericobjectError = DefaultErrors;

/** Updates the generic object referenced by the given object ID. This method supports patch semantics. */
export const patchGenericobject: API.OperationMethod<
  PatchGenericobjectRequest,
  PatchGenericobjectResponse,
  PatchGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchGenericobjectRequest,
  output: PatchGenericobjectResponse,
  errors: [],
}));

export interface AddmessageGenericobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageGenericobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/genericObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageGenericobjectRequest>;

export type AddmessageGenericobjectResponse = GenericObjectAddMessageResponse;
export const AddmessageGenericobjectResponse = GenericObjectAddMessageResponse;

export type AddmessageGenericobjectError = DefaultErrors;

/** Adds a message to the generic object referenced by the given object ID. */
export const addmessageGenericobject: API.OperationMethod<
  AddmessageGenericobjectRequest,
  AddmessageGenericobjectResponse,
  AddmessageGenericobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageGenericobjectRequest,
  output: AddmessageGenericobjectResponse,
  errors: [],
}));

export interface AddmessageLoyaltyobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageLoyaltyobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/loyaltyObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageLoyaltyobjectRequest>;

export type AddmessageLoyaltyobjectResponse = LoyaltyObjectAddMessageResponse;
export const AddmessageLoyaltyobjectResponse = LoyaltyObjectAddMessageResponse;

export type AddmessageLoyaltyobjectError = DefaultErrors;

/** Adds a message to the loyalty object referenced by the given object ID. */
export const addmessageLoyaltyobject: API.OperationMethod<
  AddmessageLoyaltyobjectRequest,
  AddmessageLoyaltyobjectResponse,
  AddmessageLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageLoyaltyobjectRequest,
  output: AddmessageLoyaltyobjectResponse,
  errors: [],
}));

export interface GetLoyaltyobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetLoyaltyobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/loyaltyObject/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetLoyaltyobjectRequest>;

export type GetLoyaltyobjectResponse = LoyaltyObject;
export const GetLoyaltyobjectResponse = LoyaltyObject;

export type GetLoyaltyobjectError = DefaultErrors;

/** Returns the loyalty object with the given object ID. */
export const getLoyaltyobject: API.OperationMethod<
  GetLoyaltyobjectRequest,
  GetLoyaltyobjectResponse,
  GetLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLoyaltyobjectRequest,
  output: GetLoyaltyobjectResponse,
  errors: [],
}));

export interface PatchLoyaltyobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: LoyaltyObject;
}

export const PatchLoyaltyobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(LoyaltyObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/loyaltyObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchLoyaltyobjectRequest>;

export type PatchLoyaltyobjectResponse = LoyaltyObject;
export const PatchLoyaltyobjectResponse = LoyaltyObject;

export type PatchLoyaltyobjectError = DefaultErrors;

/** Updates the loyalty object referenced by the given object ID. This method supports patch semantics. */
export const patchLoyaltyobject: API.OperationMethod<
  PatchLoyaltyobjectRequest,
  PatchLoyaltyobjectResponse,
  PatchLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchLoyaltyobjectRequest,
  output: PatchLoyaltyobjectResponse,
  errors: [],
}));

export interface ModifylinkedofferobjectsLoyaltyobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: ModifyLinkedOfferObjectsRequest;
}

export const ModifylinkedofferobjectsLoyaltyobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(ModifyLinkedOfferObjectsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/loyaltyObject/{resourceId}/modifyLinkedOfferObjects",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ModifylinkedofferobjectsLoyaltyobjectRequest>;

export type ModifylinkedofferobjectsLoyaltyobjectResponse = LoyaltyObject;
export const ModifylinkedofferobjectsLoyaltyobjectResponse = LoyaltyObject;

export type ModifylinkedofferobjectsLoyaltyobjectError = DefaultErrors;

/** Deprecated: Use Auto Linked Passes instead. Modifies linked offer objects for the loyalty object with the given ID. */
export const modifylinkedofferobjectsLoyaltyobject: API.OperationMethod<
  ModifylinkedofferobjectsLoyaltyobjectRequest,
  ModifylinkedofferobjectsLoyaltyobjectResponse,
  ModifylinkedofferobjectsLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ModifylinkedofferobjectsLoyaltyobjectRequest,
  output: ModifylinkedofferobjectsLoyaltyobjectResponse,
  errors: [],
}));

export interface InsertLoyaltyobjectRequest {
  /** Request body */
  body?: LoyaltyObject;
}

export const InsertLoyaltyobjectRequest = Schema.Struct({
  body: Schema.optional(LoyaltyObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/loyaltyObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertLoyaltyobjectRequest>;

export type InsertLoyaltyobjectResponse = LoyaltyObject;
export const InsertLoyaltyobjectResponse = LoyaltyObject;

export type InsertLoyaltyobjectError = DefaultErrors;

/** Inserts an loyalty object with the given ID and properties. */
export const insertLoyaltyobject: API.OperationMethod<
  InsertLoyaltyobjectRequest,
  InsertLoyaltyobjectResponse,
  InsertLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertLoyaltyobjectRequest,
  output: InsertLoyaltyobjectResponse,
  errors: [],
}));

export interface UpdateLoyaltyobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: LoyaltyObject;
}

export const UpdateLoyaltyobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(LoyaltyObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/loyaltyObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateLoyaltyobjectRequest>;

export type UpdateLoyaltyobjectResponse = LoyaltyObject;
export const UpdateLoyaltyobjectResponse = LoyaltyObject;

export type UpdateLoyaltyobjectError = DefaultErrors;

/** Updates the loyalty object referenced by the given object ID. */
export const updateLoyaltyobject: API.OperationMethod<
  UpdateLoyaltyobjectRequest,
  UpdateLoyaltyobjectResponse,
  UpdateLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateLoyaltyobjectRequest,
  output: UpdateLoyaltyobjectResponse,
  errors: [],
}));

export interface ListLoyaltyobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListLoyaltyobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/loyaltyObject" }),
  svc,
) as unknown as Schema.Schema<ListLoyaltyobjectRequest>;

export type ListLoyaltyobjectResponse = LoyaltyObjectListResponse;
export const ListLoyaltyobjectResponse = LoyaltyObjectListResponse;

export type ListLoyaltyobjectError = DefaultErrors;

/** Returns a list of all loyalty objects for a given issuer ID. */
export const listLoyaltyobject: API.OperationMethod<
  ListLoyaltyobjectRequest,
  ListLoyaltyobjectResponse,
  ListLoyaltyobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLoyaltyobjectRequest,
  output: ListLoyaltyobjectResponse,
  errors: [],
}));

export interface InsertGenericclassRequest {
  /** Request body */
  body?: GenericClass;
}

export const InsertGenericclassRequest = Schema.Struct({
  body: Schema.optional(GenericClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/genericClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertGenericclassRequest>;

export type InsertGenericclassResponse = GenericClass;
export const InsertGenericclassResponse = GenericClass;

export type InsertGenericclassError = DefaultErrors;

/** Inserts a generic class with the given ID and properties. */
export const insertGenericclass: API.OperationMethod<
  InsertGenericclassRequest,
  InsertGenericclassResponse,
  InsertGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertGenericclassRequest,
  output: InsertGenericclassResponse,
  errors: [],
}));

export interface UpdateGenericclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
  /** Request body */
  body?: GenericClass;
}

export const UpdateGenericclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GenericClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/genericClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateGenericclassRequest>;

export type UpdateGenericclassResponse = GenericClass;
export const UpdateGenericclassResponse = GenericClass;

export type UpdateGenericclassError = DefaultErrors;

/** Updates the Generic class referenced by the given class ID. */
export const updateGenericclass: API.OperationMethod<
  UpdateGenericclassRequest,
  UpdateGenericclassResponse,
  UpdateGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateGenericclassRequest,
  output: UpdateGenericclassResponse,
  errors: [],
}));

export interface ListGenericclassRequest {
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
}

export const ListGenericclassRequest = Schema.Struct({
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/genericClass" }),
  svc,
) as unknown as Schema.Schema<ListGenericclassRequest>;

export type ListGenericclassResponse = GenericClassListResponse;
export const ListGenericclassResponse = GenericClassListResponse;

export type ListGenericclassError = DefaultErrors;

/** Returns a list of all generic classes for a given issuer ID. */
export const listGenericclass: API.OperationMethod<
  ListGenericclassRequest,
  ListGenericclassResponse,
  ListGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListGenericclassRequest,
  output: ListGenericclassResponse,
  errors: [],
}));

export interface AddmessageGenericclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageGenericclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/genericClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageGenericclassRequest>;

export type AddmessageGenericclassResponse = GenericClassAddMessageResponse;
export const AddmessageGenericclassResponse = GenericClassAddMessageResponse;

export type AddmessageGenericclassError = DefaultErrors;

/** Adds a message to the generic class referenced by the given class ID. */
export const addmessageGenericclass: API.OperationMethod<
  AddmessageGenericclassRequest,
  AddmessageGenericclassResponse,
  AddmessageGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageGenericclassRequest,
  output: AddmessageGenericclassResponse,
  errors: [],
}));

export interface GetGenericclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
}

export const GetGenericclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/genericClass/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetGenericclassRequest>;

export type GetGenericclassResponse = GenericClass;
export const GetGenericclassResponse = GenericClass;

export type GetGenericclassError = DefaultErrors;

/** Returns the generic class with the given class ID. */
export const getGenericclass: API.OperationMethod<
  GetGenericclassRequest,
  GetGenericclassResponse,
  GetGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetGenericclassRequest,
  output: GetGenericclassResponse,
  errors: [],
}));

export interface PatchGenericclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value needs to follow the format `issuerID.identifier` where `issuerID` is issued by Google and `identifier` is chosen by you. The unique identifier can only include alphanumeric characters, `.`, `_`, or `-`. */
  resourceId: string;
  /** Request body */
  body?: GenericClass;
}

export const PatchGenericclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(GenericClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/genericClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchGenericclassRequest>;

export type PatchGenericclassResponse = GenericClass;
export const PatchGenericclassResponse = GenericClass;

export type PatchGenericclassError = DefaultErrors;

/** Updates the generic class referenced by the given class ID. This method supports patch semantics. */
export const patchGenericclass: API.OperationMethod<
  PatchGenericclassRequest,
  PatchGenericclassResponse,
  PatchGenericclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchGenericclassRequest,
  output: PatchGenericclassResponse,
  errors: [],
}));

export interface ListTransitclassRequest {
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListTransitclassRequest = Schema.Struct({
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/transitClass" }),
  svc,
) as unknown as Schema.Schema<ListTransitclassRequest>;

export type ListTransitclassResponse = TransitClassListResponse;
export const ListTransitclassResponse = TransitClassListResponse;

export type ListTransitclassError = DefaultErrors;

/** Returns a list of all transit classes for a given issuer ID. */
export const listTransitclass: API.OperationMethod<
  ListTransitclassRequest,
  ListTransitclassResponse,
  ListTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTransitclassRequest,
  output: ListTransitclassResponse,
  errors: [],
}));

export interface InsertTransitclassRequest {
  /** Request body */
  body?: TransitClass;
}

export const InsertTransitclassRequest = Schema.Struct({
  body: Schema.optional(TransitClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/transitClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertTransitclassRequest>;

export type InsertTransitclassResponse = TransitClass;
export const InsertTransitclassResponse = TransitClass;

export type InsertTransitclassError = DefaultErrors;

/** Inserts a transit class with the given ID and properties. */
export const insertTransitclass: API.OperationMethod<
  InsertTransitclassRequest,
  InsertTransitclassResponse,
  InsertTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertTransitclassRequest,
  output: InsertTransitclassResponse,
  errors: [],
}));

export interface UpdateTransitclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: TransitClass;
}

export const UpdateTransitclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(TransitClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/transitClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateTransitclassRequest>;

export type UpdateTransitclassResponse = TransitClass;
export const UpdateTransitclassResponse = TransitClass;

export type UpdateTransitclassError = DefaultErrors;

/** Updates the transit class referenced by the given class ID. */
export const updateTransitclass: API.OperationMethod<
  UpdateTransitclassRequest,
  UpdateTransitclassResponse,
  UpdateTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTransitclassRequest,
  output: UpdateTransitclassResponse,
  errors: [],
}));

export interface AddmessageTransitclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageTransitclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/transitClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageTransitclassRequest>;

export type AddmessageTransitclassResponse = TransitClassAddMessageResponse;
export const AddmessageTransitclassResponse = TransitClassAddMessageResponse;

export type AddmessageTransitclassError = DefaultErrors;

/** Adds a message to the transit class referenced by the given class ID. */
export const addmessageTransitclass: API.OperationMethod<
  AddmessageTransitclassRequest,
  AddmessageTransitclassResponse,
  AddmessageTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageTransitclassRequest,
  output: AddmessageTransitclassResponse,
  errors: [],
}));

export interface GetTransitclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetTransitclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/transitClass/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetTransitclassRequest>;

export type GetTransitclassResponse = TransitClass;
export const GetTransitclassResponse = TransitClass;

export type GetTransitclassError = DefaultErrors;

/** Returns the transit class with the given class ID. */
export const getTransitclass: API.OperationMethod<
  GetTransitclassRequest,
  GetTransitclassResponse,
  GetTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTransitclassRequest,
  output: GetTransitclassResponse,
  errors: [],
}));

export interface PatchTransitclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: TransitClass;
}

export const PatchTransitclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(TransitClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/transitClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchTransitclassRequest>;

export type PatchTransitclassResponse = TransitClass;
export const PatchTransitclassResponse = TransitClass;

export type PatchTransitclassError = DefaultErrors;

/** Updates the transit class referenced by the given class ID. This method supports patch semantics. */
export const patchTransitclass: API.OperationMethod<
  PatchTransitclassRequest,
  PatchTransitclassResponse,
  PatchTransitclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchTransitclassRequest,
  output: PatchTransitclassResponse,
  errors: [],
}));

export interface ListEventticketclassRequest {
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
}

export const ListEventticketclassRequest = Schema.Struct({
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/eventTicketClass" }),
  svc,
) as unknown as Schema.Schema<ListEventticketclassRequest>;

export type ListEventticketclassResponse = EventTicketClassListResponse;
export const ListEventticketclassResponse = EventTicketClassListResponse;

export type ListEventticketclassError = DefaultErrors;

/** Returns a list of all event ticket classes for a given issuer ID. */
export const listEventticketclass: API.OperationMethod<
  ListEventticketclassRequest,
  ListEventticketclassResponse,
  ListEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListEventticketclassRequest,
  output: ListEventticketclassResponse,
  errors: [],
}));

export interface InsertEventticketclassRequest {
  /** Request body */
  body?: EventTicketClass;
}

export const InsertEventticketclassRequest = Schema.Struct({
  body: Schema.optional(EventTicketClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/eventTicketClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertEventticketclassRequest>;

export type InsertEventticketclassResponse = EventTicketClass;
export const InsertEventticketclassResponse = EventTicketClass;

export type InsertEventticketclassError = DefaultErrors;

/** Inserts an event ticket class with the given ID and properties. */
export const insertEventticketclass: API.OperationMethod<
  InsertEventticketclassRequest,
  InsertEventticketclassResponse,
  InsertEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertEventticketclassRequest,
  output: InsertEventticketclassResponse,
  errors: [],
}));

export interface UpdateEventticketclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: EventTicketClass;
}

export const UpdateEventticketclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(EventTicketClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/eventTicketClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateEventticketclassRequest>;

export type UpdateEventticketclassResponse = EventTicketClass;
export const UpdateEventticketclassResponse = EventTicketClass;

export type UpdateEventticketclassError = DefaultErrors;

/** Updates the event ticket class referenced by the given class ID. */
export const updateEventticketclass: API.OperationMethod<
  UpdateEventticketclassRequest,
  UpdateEventticketclassResponse,
  UpdateEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEventticketclassRequest,
  output: UpdateEventticketclassResponse,
  errors: [],
}));

export interface GetEventticketclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetEventticketclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/eventTicketClass/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetEventticketclassRequest>;

export type GetEventticketclassResponse = EventTicketClass;
export const GetEventticketclassResponse = EventTicketClass;

export type GetEventticketclassError = DefaultErrors;

/** Returns the event ticket class with the given class ID. */
export const getEventticketclass: API.OperationMethod<
  GetEventticketclassRequest,
  GetEventticketclassResponse,
  GetEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEventticketclassRequest,
  output: GetEventticketclassResponse,
  errors: [],
}));

export interface PatchEventticketclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: EventTicketClass;
}

export const PatchEventticketclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(EventTicketClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/eventTicketClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchEventticketclassRequest>;

export type PatchEventticketclassResponse = EventTicketClass;
export const PatchEventticketclassResponse = EventTicketClass;

export type PatchEventticketclassError = DefaultErrors;

/** Updates the event ticket class referenced by the given class ID. This method supports patch semantics. */
export const patchEventticketclass: API.OperationMethod<
  PatchEventticketclassRequest,
  PatchEventticketclassResponse,
  PatchEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchEventticketclassRequest,
  output: PatchEventticketclassResponse,
  errors: [],
}));

export interface AddmessageEventticketclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageEventticketclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/eventTicketClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageEventticketclassRequest>;

export type AddmessageEventticketclassResponse =
  EventTicketClassAddMessageResponse;
export const AddmessageEventticketclassResponse =
  EventTicketClassAddMessageResponse;

export type AddmessageEventticketclassError = DefaultErrors;

/** Adds a message to the event ticket class referenced by the given class ID. */
export const addmessageEventticketclass: API.OperationMethod<
  AddmessageEventticketclassRequest,
  AddmessageEventticketclassResponse,
  AddmessageEventticketclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageEventticketclassRequest,
  output: AddmessageEventticketclassResponse,
  errors: [],
}));

export interface AddmessageTransitobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageTransitobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/transitObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageTransitobjectRequest>;

export type AddmessageTransitobjectResponse = TransitObjectAddMessageResponse;
export const AddmessageTransitobjectResponse = TransitObjectAddMessageResponse;

export type AddmessageTransitobjectError = DefaultErrors;

/** Adds a message to the transit object referenced by the given object ID. */
export const addmessageTransitobject: API.OperationMethod<
  AddmessageTransitobjectRequest,
  AddmessageTransitobjectResponse,
  AddmessageTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageTransitobjectRequest,
  output: AddmessageTransitobjectResponse,
  errors: [],
}));

export interface GetTransitobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetTransitobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/transitObject/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetTransitobjectRequest>;

export type GetTransitobjectResponse = TransitObject;
export const GetTransitobjectResponse = TransitObject;

export type GetTransitobjectError = DefaultErrors;

/** Returns the transit object with the given object ID. */
export const getTransitobject: API.OperationMethod<
  GetTransitobjectRequest,
  GetTransitobjectResponse,
  GetTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTransitobjectRequest,
  output: GetTransitobjectResponse,
  errors: [],
}));

export interface PatchTransitobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: TransitObject;
}

export const PatchTransitobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(TransitObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/transitObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchTransitobjectRequest>;

export type PatchTransitobjectResponse = TransitObject;
export const PatchTransitobjectResponse = TransitObject;

export type PatchTransitobjectError = DefaultErrors;

/** Updates the transit object referenced by the given object ID. This method supports patch semantics. */
export const patchTransitobject: API.OperationMethod<
  PatchTransitobjectRequest,
  PatchTransitobjectResponse,
  PatchTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchTransitobjectRequest,
  output: PatchTransitobjectResponse,
  errors: [],
}));

export interface ListTransitobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListTransitobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/transitObject" }),
  svc,
) as unknown as Schema.Schema<ListTransitobjectRequest>;

export type ListTransitobjectResponse = TransitObjectListResponse;
export const ListTransitobjectResponse = TransitObjectListResponse;

export type ListTransitobjectError = DefaultErrors;

/** Returns a list of all transit objects for a given issuer ID. */
export const listTransitobject: API.OperationMethod<
  ListTransitobjectRequest,
  ListTransitobjectResponse,
  ListTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTransitobjectRequest,
  output: ListTransitobjectResponse,
  errors: [],
}));

export interface InsertTransitobjectRequest {
  /** Request body */
  body?: TransitObject;
}

export const InsertTransitobjectRequest = Schema.Struct({
  body: Schema.optional(TransitObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/transitObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertTransitobjectRequest>;

export type InsertTransitobjectResponse = TransitObject;
export const InsertTransitobjectResponse = TransitObject;

export type InsertTransitobjectError = DefaultErrors;

/** Inserts an transit object with the given ID and properties. */
export const insertTransitobject: API.OperationMethod<
  InsertTransitobjectRequest,
  InsertTransitobjectResponse,
  InsertTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertTransitobjectRequest,
  output: InsertTransitobjectResponse,
  errors: [],
}));

export interface UpdateTransitobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: TransitObject;
}

export const UpdateTransitobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(TransitObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/transitObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateTransitobjectRequest>;

export type UpdateTransitobjectResponse = TransitObject;
export const UpdateTransitobjectResponse = TransitObject;

export type UpdateTransitobjectError = DefaultErrors;

/** Updates the transit object referenced by the given object ID. */
export const updateTransitobject: API.OperationMethod<
  UpdateTransitobjectRequest,
  UpdateTransitobjectResponse,
  UpdateTransitobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTransitobjectRequest,
  output: UpdateTransitobjectResponse,
  errors: [],
}));

export interface InsertFlightclassRequest {
  /** Request body */
  body?: FlightClass;
}

export const InsertFlightclassRequest = Schema.Struct({
  body: Schema.optional(FlightClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/flightClass",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertFlightclassRequest>;

export type InsertFlightclassResponse = FlightClass;
export const InsertFlightclassResponse = FlightClass;

export type InsertFlightclassError = DefaultErrors;

/** Inserts an flight class with the given ID and properties. */
export const insertFlightclass: API.OperationMethod<
  InsertFlightclassRequest,
  InsertFlightclassResponse,
  InsertFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertFlightclassRequest,
  output: InsertFlightclassResponse,
  errors: [],
}));

export interface UpdateFlightclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: FlightClass;
}

export const UpdateFlightclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(FlightClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/flightClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateFlightclassRequest>;

export type UpdateFlightclassResponse = FlightClass;
export const UpdateFlightclassResponse = FlightClass;

export type UpdateFlightclassError = DefaultErrors;

/** Updates the flight class referenced by the given class ID. */
export const updateFlightclass: API.OperationMethod<
  UpdateFlightclassRequest,
  UpdateFlightclassResponse,
  UpdateFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateFlightclassRequest,
  output: UpdateFlightclassResponse,
  errors: [],
}));

export interface ListFlightclassRequest {
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` classes are available in a list. For example, if you have a list of 200 classes and you call list with `maxResults` set to 20, list will return the first 20 classes and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 classes. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
  /** The ID of the issuer authorized to list classes. */
  issuerId?: string;
}

export const ListFlightclassRequest = Schema.Struct({
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  issuerId: Schema.optional(Schema.String).pipe(T.HttpQuery("issuerId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/flightClass" }),
  svc,
) as unknown as Schema.Schema<ListFlightclassRequest>;

export type ListFlightclassResponse = FlightClassListResponse;
export const ListFlightclassResponse = FlightClassListResponse;

export type ListFlightclassError = DefaultErrors;

/** Returns a list of all flight classes for a given issuer ID. */
export const listFlightclass: API.OperationMethod<
  ListFlightclassRequest,
  ListFlightclassResponse,
  ListFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListFlightclassRequest,
  output: ListFlightclassResponse,
  errors: [],
}));

export interface GetFlightclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetFlightclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/flightClass/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetFlightclassRequest>;

export type GetFlightclassResponse = FlightClass;
export const GetFlightclassResponse = FlightClass;

export type GetFlightclassError = DefaultErrors;

/** Returns the flight class with the given class ID. */
export const getFlightclass: API.OperationMethod<
  GetFlightclassRequest,
  GetFlightclassResponse,
  GetFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetFlightclassRequest,
  output: GetFlightclassResponse,
  errors: [],
}));

export interface PatchFlightclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: FlightClass;
}

export const PatchFlightclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(FlightClass).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/flightClass/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchFlightclassRequest>;

export type PatchFlightclassResponse = FlightClass;
export const PatchFlightclassResponse = FlightClass;

export type PatchFlightclassError = DefaultErrors;

/** Updates the flight class referenced by the given class ID. This method supports patch semantics. */
export const patchFlightclass: API.OperationMethod<
  PatchFlightclassRequest,
  PatchFlightclassResponse,
  PatchFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchFlightclassRequest,
  output: PatchFlightclassResponse,
  errors: [],
}));

export interface AddmessageFlightclassRequest {
  /** The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageFlightclassRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/flightClass/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageFlightclassRequest>;

export type AddmessageFlightclassResponse = FlightClassAddMessageResponse;
export const AddmessageFlightclassResponse = FlightClassAddMessageResponse;

export type AddmessageFlightclassError = DefaultErrors;

/** Adds a message to the flight class referenced by the given class ID. */
export const addmessageFlightclass: API.OperationMethod<
  AddmessageFlightclassRequest,
  AddmessageFlightclassResponse,
  AddmessageFlightclassError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageFlightclassRequest,
  output: AddmessageFlightclassResponse,
  errors: [],
}));

export interface ListEventticketobjectRequest {
  /** The ID of the class whose objects will be listed. */
  classId?: string;
  /** Used to get the next set of results if `maxResults` is specified, but more than `maxResults` objects are available in a list. For example, if you have a list of 200 objects and you call list with `maxResults` set to 20, list will return the first 20 objects and a token. Call list again with `maxResults` set to 20 and the token to get the next 20 objects. */
  token?: string;
  /** Identifies the max number of results returned by a list. All results are returned if `maxResults` isn't defined. */
  maxResults?: number;
}

export const ListEventticketobjectRequest = Schema.Struct({
  classId: Schema.optional(Schema.String).pipe(T.HttpQuery("classId")),
  token: Schema.optional(Schema.String).pipe(T.HttpQuery("token")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/eventTicketObject" }),
  svc,
) as unknown as Schema.Schema<ListEventticketobjectRequest>;

export type ListEventticketobjectResponse = EventTicketObjectListResponse;
export const ListEventticketobjectResponse = EventTicketObjectListResponse;

export type ListEventticketobjectError = DefaultErrors;

/** Returns a list of all event ticket objects for a given issuer ID. */
export const listEventticketobject: API.OperationMethod<
  ListEventticketobjectRequest,
  ListEventticketobjectResponse,
  ListEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListEventticketobjectRequest,
  output: ListEventticketobjectResponse,
  errors: [],
}));

export interface InsertEventticketobjectRequest {
  /** Request body */
  body?: EventTicketObject;
}

export const InsertEventticketobjectRequest = Schema.Struct({
  body: Schema.optional(EventTicketObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/eventTicketObject",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<InsertEventticketobjectRequest>;

export type InsertEventticketobjectResponse = EventTicketObject;
export const InsertEventticketobjectResponse = EventTicketObject;

export type InsertEventticketobjectError = DefaultErrors;

/** Inserts an event ticket object with the given ID and properties. */
export const insertEventticketobject: API.OperationMethod<
  InsertEventticketobjectRequest,
  InsertEventticketobjectResponse,
  InsertEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: InsertEventticketobjectRequest,
  output: InsertEventticketobjectResponse,
  errors: [],
}));

export interface UpdateEventticketobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: EventTicketObject;
}

export const UpdateEventticketobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(EventTicketObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/eventTicketObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateEventticketobjectRequest>;

export type UpdateEventticketobjectResponse = EventTicketObject;
export const UpdateEventticketobjectResponse = EventTicketObject;

export type UpdateEventticketobjectError = DefaultErrors;

/** Updates the event ticket object referenced by the given object ID. */
export const updateEventticketobject: API.OperationMethod<
  UpdateEventticketobjectRequest,
  UpdateEventticketobjectResponse,
  UpdateEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateEventticketobjectRequest,
  output: UpdateEventticketobjectResponse,
  errors: [],
}));

export interface ModifylinkedofferobjectsEventticketobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: ModifyLinkedOfferObjectsRequest;
}

export const ModifylinkedofferobjectsEventticketobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(ModifyLinkedOfferObjectsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/eventTicketObject/{resourceId}/modifyLinkedOfferObjects",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ModifylinkedofferobjectsEventticketobjectRequest>;

export type ModifylinkedofferobjectsEventticketobjectResponse =
  EventTicketObject;
export const ModifylinkedofferobjectsEventticketobjectResponse =
  EventTicketObject;

export type ModifylinkedofferobjectsEventticketobjectError = DefaultErrors;

/** Deprecated: Use Auto Linked Passes instead. Modifies linked offer objects for the event ticket object with the given ID. */
export const modifylinkedofferobjectsEventticketobject: API.OperationMethod<
  ModifylinkedofferobjectsEventticketobjectRequest,
  ModifylinkedofferobjectsEventticketobjectResponse,
  ModifylinkedofferobjectsEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ModifylinkedofferobjectsEventticketobjectRequest,
  output: ModifylinkedofferobjectsEventticketobjectResponse,
  errors: [],
}));

export interface GetEventticketobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
}

export const GetEventticketobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "walletobjects/v1/eventTicketObject/{resourceId}",
  }),
  svc,
) as unknown as Schema.Schema<GetEventticketobjectRequest>;

export type GetEventticketobjectResponse = EventTicketObject;
export const GetEventticketobjectResponse = EventTicketObject;

export type GetEventticketobjectError = DefaultErrors;

/** Returns the event ticket object with the given object ID. */
export const getEventticketobject: API.OperationMethod<
  GetEventticketobjectRequest,
  GetEventticketobjectResponse,
  GetEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEventticketobjectRequest,
  output: GetEventticketobjectResponse,
  errors: [],
}));

export interface PatchEventticketobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: EventTicketObject;
}

export const PatchEventticketobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(EventTicketObject).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "walletobjects/v1/eventTicketObject/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchEventticketobjectRequest>;

export type PatchEventticketobjectResponse = EventTicketObject;
export const PatchEventticketobjectResponse = EventTicketObject;

export type PatchEventticketobjectError = DefaultErrors;

/** Updates the event ticket object referenced by the given object ID. This method supports patch semantics. */
export const patchEventticketobject: API.OperationMethod<
  PatchEventticketobjectRequest,
  PatchEventticketobjectResponse,
  PatchEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchEventticketobjectRequest,
  output: PatchEventticketobjectResponse,
  errors: [],
}));

export interface AddmessageEventticketobjectRequest {
  /** The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID. identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'. */
  resourceId: string;
  /** Request body */
  body?: AddMessageRequest;
}

export const AddmessageEventticketobjectRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(AddMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "walletobjects/v1/eventTicketObject/{resourceId}/addMessage",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AddmessageEventticketobjectRequest>;

export type AddmessageEventticketobjectResponse =
  EventTicketObjectAddMessageResponse;
export const AddmessageEventticketobjectResponse =
  EventTicketObjectAddMessageResponse;

export type AddmessageEventticketobjectError = DefaultErrors;

/** Adds a message to the event ticket object referenced by the given object ID. */
export const addmessageEventticketobject: API.OperationMethod<
  AddmessageEventticketobjectRequest,
  AddmessageEventticketobjectResponse,
  AddmessageEventticketobjectError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AddmessageEventticketobjectRequest,
  output: AddmessageEventticketobjectResponse,
  errors: [],
}));

export interface GetPermissionsRequest {
  /** The unique identifier for an issuer. This ID must be unique across all issuers. */
  resourceId: string;
}

export const GetPermissionsRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
}).pipe(
  T.Http({ method: "GET", path: "walletobjects/v1/permissions/{resourceId}" }),
  svc,
) as unknown as Schema.Schema<GetPermissionsRequest>;

export type GetPermissionsResponse = Permissions;
export const GetPermissionsResponse = Permissions;

export type GetPermissionsError = DefaultErrors;

/** Returns the permissions for the given issuer id. */
export const getPermissions: API.OperationMethod<
  GetPermissionsRequest,
  GetPermissionsResponse,
  GetPermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPermissionsRequest,
  output: GetPermissionsResponse,
  errors: [],
}));

export interface UpdatePermissionsRequest {
  /** The unique identifier for an issuer. This ID must be unique across all issuers. */
  resourceId: string;
  /** Request body */
  body?: Permissions;
}

export const UpdatePermissionsRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  body: Schema.optional(Permissions).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "walletobjects/v1/permissions/{resourceId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdatePermissionsRequest>;

export type UpdatePermissionsResponse = Permissions;
export const UpdatePermissionsResponse = Permissions;

export type UpdatePermissionsError = DefaultErrors;

/** Updates the permissions for the given issuer. */
export const updatePermissions: API.OperationMethod<
  UpdatePermissionsRequest,
  UpdatePermissionsResponse,
  UpdatePermissionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePermissionsRequest,
  output: UpdatePermissionsResponse,
  errors: [],
}));
