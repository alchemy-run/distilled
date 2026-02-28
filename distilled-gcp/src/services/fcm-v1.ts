// ==========================================================================
// Firebase Cloud Messaging API (fcm v1)
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
  name: "fcm",
  version: "v1",
  rootUrl: "https://fcm.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Notification {
  /** The notification's title. */
  title?: string;
  /** The notification's body text. */
  body?: string;
  /** Contains the URL of an image that is going to be downloaded on the device and displayed in a notification. JPEG, PNG, BMP have full support across platforms. Animated GIF and video only work on iOS. WebP and HEIF have varying levels of support across platforms and platform versions. Android has 1MB image size limit. Quota usage and implications/costs for hosting image on Firebase Storage: https://firebase.google.com/pricing */
  image?: string;
}

export const Notification: Schema.Schema<Notification> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "Notification" }) as any as Schema.Schema<Notification>;

export interface Color {
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0). */
  alpha?: number;
}

export const Color: Schema.Schema<Color> = Schema.suspend(() => Schema.Struct({
  red: Schema.optional(Schema.Number),
  green: Schema.optional(Schema.Number),
  blue: Schema.optional(Schema.Number),
  alpha: Schema.optional(Schema.Number),
})).annotate({ identifier: "Color" }) as any as Schema.Schema<Color>;

export interface LightSettings {
  /** Required. Set `color` of the LED with [google.type.Color](https://github.com/googleapis/googleapis/blob/master/google/type/color.proto). */
  color?: Color;
  /** Required. Along with `light_off_duration`, define the blink rate of LED flashes. Resolution defined by [proto.Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration) */
  lightOnDuration?: string;
  /** Required. Along with `light_on_duration `, define the blink rate of LED flashes. Resolution defined by [proto.Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration) */
  lightOffDuration?: string;
}

export const LightSettings: Schema.Schema<LightSettings> = Schema.suspend(() => Schema.Struct({
  color: Schema.optional(Color),
  lightOnDuration: Schema.optional(Schema.String),
  lightOffDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "LightSettings" }) as any as Schema.Schema<LightSettings>;

export interface AndroidNotification {
  /** The notification's title. If present, it will override google.firebase.fcm.v1.Notification.title. */
  title?: string;
  /** The notification's body text. If present, it will override google.firebase.fcm.v1.Notification.body. */
  body?: string;
  /** The notification's icon. Sets the notification icon to myicon for drawable resource myicon. If you don't send this key in the request, FCM displays the launcher icon specified in your app manifest. */
  icon?: string;
  /** The notification's icon color, expressed in #rrggbb format. */
  color?: string;
  /** The sound to play when the device receives the notification. Supports "default" or the filename of a sound resource bundled in the app. Sound files must reside in /res/raw/. */
  sound?: string;
  /** Identifier used to replace existing notifications in the notification drawer. If not specified, each request creates a new notification. If specified and a notification with the same tag is already being shown, the new notification replaces the existing one in the notification drawer. */
  tag?: string;
  /** The action associated with a user click on the notification. If specified, an activity with a matching intent filter is launched when a user clicks on the notification. */
  clickAction?: string;
  /** The key to the body string in the app's string resources to use to localize the body text to the user's current localization. See [String Resources](https://goo.gl/NdFZGI) for more information. */
  bodyLocKey?: string;
  /** Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization. See [Formatting and Styling](https://goo.gl/MalYE3) for more information. */
  bodyLocArgs?: Array<string>;
  /** The key to the title string in the app's string resources to use to localize the title text to the user's current localization. See [String Resources](https://goo.gl/NdFZGI) for more information. */
  titleLocKey?: string;
  /** Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization. See [Formatting and Styling](https://goo.gl/MalYE3) for more information. */
  titleLocArgs?: Array<string>;
  /** The [notification's channel id](https://developer.android.com/guide/topics/ui/notifiers/notifications#ManageChannels) (new in Android O). The app must create a channel with this channel ID before any notification with this channel ID is received. If you don't send this channel ID in the request, or if the channel ID provided has not yet been created by the app, FCM uses the channel ID specified in the app manifest. */
  channelId?: string;
  /** Sets the "ticker" text, which is sent to accessibility services. Prior to API level 21 (`Lollipop`), sets the text that is displayed in the status bar when the notification first arrives. */
  ticker?: string;
  /** When set to false or unset, the notification is automatically dismissed when the user clicks it in the panel. When set to true, the notification persists even when the user clicks it. */
  sticky?: boolean;
  /** Set the time that the event in the notification occurred. Notifications in the panel are sorted by this time. A point in time is represented using [protobuf.Timestamp](https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/Timestamp). */
  eventTime?: string;
  /** Set whether or not this notification is relevant only to the current device. Some notifications can be bridged to other devices for remote display, such as a Wear OS watch. This hint can be set to recommend this notification not be bridged. See [Wear OS guides](https://developer.android.com/training/wearables/notifications/bridger#existing-method-of-preventing-bridging) */
  localOnly?: boolean;
  /** Set the relative priority for this notification. Priority is an indication of how much of the user's attention should be consumed by this notification. Low-priority notifications may be hidden from the user in certain situations, while the user might be interrupted for a higher-priority notification. The effect of setting the same priorities may differ slightly on different platforms. Note this priority differs from `AndroidMessagePriority`. This priority is processed by the client after the message has been delivered, whereas [AndroidMessagePriority](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#androidmessagepriority) is an FCM concept that controls when the message is delivered. */
  notificationPriority?: "PRIORITY_UNSPECIFIED" | "PRIORITY_MIN" | "PRIORITY_LOW" | "PRIORITY_DEFAULT" | "PRIORITY_HIGH" | "PRIORITY_MAX" | (string & {});
  /** If set to true, use the Android framework's default sound for the notification. Default values are specified in [config.xml](https://android.googlesource.com/platform/frameworks/base/+/master/core/res/res/values/config.xml). */
  defaultSound?: boolean;
  /** If set to true, use the Android framework's default vibrate pattern for the notification. Default values are specified in [config.xml](https://android.googlesource.com/platform/frameworks/base/+/master/core/res/res/values/config.xml). If `default_vibrate_timings` is set to true and `vibrate_timings` is also set, the default value is used instead of the user-specified `vibrate_timings`. */
  defaultVibrateTimings?: boolean;
  /** If set to true, use the Android framework's default LED light settings for the notification. Default values are specified in [config.xml](https://android.googlesource.com/platform/frameworks/base/+/master/core/res/res/values/config.xml). If `default_light_settings` is set to true and `light_settings` is also set, the user-specified `light_settings` is used instead of the default value. */
  defaultLightSettings?: boolean;
  /** Set the vibration pattern to use. Pass in an array of [protobuf.Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration) to turn on or off the vibrator. The first value indicates the `Duration` to wait before turning the vibrator on. The next value indicates the `Duration` to keep the vibrator on. Subsequent values alternate between `Duration` to turn the vibrator off and to turn the vibrator on. If `vibrate_timings` is set and `default_vibrate_timings` is set to `true`, the default value is used instead of the user-specified `vibrate_timings`. */
  vibrateTimings?: Array<string>;
  /** Set the [Notification.visibility](https://developer.android.com/reference/android/app/Notification.html#visibility) of the notification. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "PRIVATE" | "PUBLIC" | "SECRET" | (string & {});
  /** Sets the number of items this notification represents. May be displayed as a badge count for launchers that support badging.See [Notification Badge](https://developer.android.com/training/notify-user/badges). For example, this might be useful if you're using just one notification to represent multiple new messages but you want the count here to represent the number of total new messages. If zero or unspecified, systems that support badging use the default, which is to increment a number displayed on the long-press menu each time a new notification arrives. */
  notificationCount?: number;
  /** Settings to control the notification's LED blinking rate and color if LED is available on the device. The total blinking time is controlled by the OS. */
  lightSettings?: LightSettings;
  /** Contains the URL of an image that is going to be displayed in a notification. If present, it will override google.firebase.fcm.v1.Notification.image. */
  image?: string;
  /** If set, display notifications delivered to the device will be handled by the app instead of the proxy. */
  bypassProxyNotification?: boolean;
  /** Setting to control when a notification may be proxied. */
  proxy?: "PROXY_UNSPECIFIED" | "ALLOW" | "DENY" | "IF_PRIORITY_LOWERED" | (string & {});
}

export const AndroidNotification: Schema.Schema<AndroidNotification> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  color: Schema.optional(Schema.String),
  sound: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  clickAction: Schema.optional(Schema.String),
  bodyLocKey: Schema.optional(Schema.String),
  bodyLocArgs: Schema.optional(Schema.Array(Schema.String)),
  titleLocKey: Schema.optional(Schema.String),
  titleLocArgs: Schema.optional(Schema.Array(Schema.String)),
  channelId: Schema.optional(Schema.String),
  ticker: Schema.optional(Schema.String),
  sticky: Schema.optional(Schema.Boolean),
  eventTime: Schema.optional(Schema.String),
  localOnly: Schema.optional(Schema.Boolean),
  notificationPriority: Schema.optional(Schema.String),
  defaultSound: Schema.optional(Schema.Boolean),
  defaultVibrateTimings: Schema.optional(Schema.Boolean),
  defaultLightSettings: Schema.optional(Schema.Boolean),
  vibrateTimings: Schema.optional(Schema.Array(Schema.String)),
  visibility: Schema.optional(Schema.String),
  notificationCount: Schema.optional(Schema.Number),
  lightSettings: Schema.optional(LightSettings),
  image: Schema.optional(Schema.String),
  bypassProxyNotification: Schema.optional(Schema.Boolean),
  proxy: Schema.optional(Schema.String),
})).annotate({ identifier: "AndroidNotification" }) as any as Schema.Schema<AndroidNotification>;

export interface AndroidFcmOptions {
  /** Label associated with the message's analytics data. */
  analyticsLabel?: string;
}

export const AndroidFcmOptions: Schema.Schema<AndroidFcmOptions> = Schema.suspend(() => Schema.Struct({
  analyticsLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "AndroidFcmOptions" }) as any as Schema.Schema<AndroidFcmOptions>;

export interface AndroidConfig {
  /** An identifier of a group of messages that can be collapsed, so that only the last message gets sent when delivery can be resumed. A maximum of 4 different collapse keys is allowed at any given time. */
  collapseKey?: string;
  /** Message priority. Can take "normal" and "high" values. For more information, see [Setting the priority of a message](https://goo.gl/GjONJv). */
  priority?: "NORMAL" | "HIGH" | (string & {});
  /** How long (in seconds) the message should be kept in FCM storage if the device is offline. The maximum time to live supported is 4 weeks, and the default value is 4 weeks if not set. Set it to 0 if want to send the message immediately. In JSON format, the Duration type is encoded as a string rather than an object, where the string ends in the suffix "s" (indicating seconds) and is preceded by the number of seconds, with nanoseconds expressed as fractional seconds. For example, 3 seconds with 0 nanoseconds should be encoded in JSON format as "3s", while 3 seconds and 1 nanosecond should be expressed in JSON format as "3.000000001s". The ttl will be rounded down to the nearest second. */
  ttl?: string;
  /** Package name of the application where the registration token must match in order to receive the message. */
  restrictedPackageName?: string;
  /** Arbitrary key/value payload. If present, it will override google.firebase.fcm.v1.Message.data. */
  data?: Record<string, string>;
  /** Notification to send to android devices. */
  notification?: AndroidNotification;
  /** Options for features provided by the FCM SDK for Android. */
  fcmOptions?: AndroidFcmOptions;
  /** Optional. If set to true, messages will be allowed to be delivered to the app while the device is in direct boot mode. See [Support Direct Boot mode](https://developer.android.com/training/articles/direct-boot). */
  directBootOk?: boolean;
  /** Optional. If set to true, messages will be allowed to be delivered to the app while the device is in bandwidth constrained mode. This should only be enabled when the app has been tested to properly handle messages in bandwidth constrained mode. */
  bandwidthConstrainedOk?: boolean;
  /** Optional. If set to true, messages will be allowed to be delivered to the app while the device is connected over a restricted satellite network. This should only be enabled for messages that can be handled over a restricted satellite network and only for apps that are enabled to work over a restricted satellite network. Note that the ability of the app to connect to a restricted satellite network is dependent on the carrier's settings and the device model. */
  restrictedSatelliteOk?: boolean;
}

export const AndroidConfig: Schema.Schema<AndroidConfig> = Schema.suspend(() => Schema.Struct({
  collapseKey: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  restrictedPackageName: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  notification: Schema.optional(AndroidNotification),
  fcmOptions: Schema.optional(AndroidFcmOptions),
  directBootOk: Schema.optional(Schema.Boolean),
  bandwidthConstrainedOk: Schema.optional(Schema.Boolean),
  restrictedSatelliteOk: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AndroidConfig" }) as any as Schema.Schema<AndroidConfig>;

export interface WebpushFcmOptions {
  /** The link to open when the user clicks on the notification. For all URL values, HTTPS is required. */
  link?: string;
  /** Label associated with the message's analytics data. */
  analyticsLabel?: string;
}

export const WebpushFcmOptions: Schema.Schema<WebpushFcmOptions> = Schema.suspend(() => Schema.Struct({
  link: Schema.optional(Schema.String),
  analyticsLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "WebpushFcmOptions" }) as any as Schema.Schema<WebpushFcmOptions>;

export interface WebpushConfig {
  /** HTTP headers defined in webpush protocol. Refer to [Webpush protocol](https://tools.ietf.org/html/rfc8030#section-5) for supported headers, e.g. "TTL": "15". */
  headers?: Record<string, string>;
  /** Arbitrary key/value payload. If present, it will override google.firebase.fcm.v1.Message.data. */
  data?: Record<string, string>;
  /** Web Notification options as a JSON object. Supports Notification instance properties as defined in [Web Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification). If present, "title" and "body" fields override [google.firebase.fcm.v1.Notification.title] and [google.firebase.fcm.v1.Notification.body]. */
  notification?: Record<string, unknown>;
  /** Options for features provided by the FCM SDK for Web. */
  fcmOptions?: WebpushFcmOptions;
}

export const WebpushConfig: Schema.Schema<WebpushConfig> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  notification: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fcmOptions: Schema.optional(WebpushFcmOptions),
})).annotate({ identifier: "WebpushConfig" }) as any as Schema.Schema<WebpushConfig>;

export interface ApnsFcmOptions {
  /** Label associated with the message's analytics data. */
  analyticsLabel?: string;
  /** Contains the URL of an image that is going to be displayed in a notification. If present, it will override google.firebase.fcm.v1.Notification.image. */
  image?: string;
}

export const ApnsFcmOptions: Schema.Schema<ApnsFcmOptions> = Schema.suspend(() => Schema.Struct({
  analyticsLabel: Schema.optional(Schema.String),
  image: Schema.optional(Schema.String),
})).annotate({ identifier: "ApnsFcmOptions" }) as any as Schema.Schema<ApnsFcmOptions>;

export interface ApnsConfig {
  /** HTTP request headers defined in Apple Push Notification Service. Refer to [APNs request headers](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns) for supported headers such as `apns-expiration` and `apns-priority`. The backend sets a default value for `apns-expiration` of 30 days and a default value for `apns-priority` of 10 if not explicitly set. */
  headers?: Record<string, string>;
  /** APNs payload as a JSON object, including both `aps` dictionary and custom payload. See [Payload Key Reference](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification). If present, it overrides google.firebase.fcm.v1.Notification.title and google.firebase.fcm.v1.Notification.body. */
  payload?: Record<string, unknown>;
  /** Options for features provided by the FCM SDK for iOS. */
  fcmOptions?: ApnsFcmOptions;
  /** Optional. [Apple Live Activity](https://developer.apple.com/design/human-interface-guidelines/live-activities) token to send updates to. This token can either be a push token or [push-to-start](https://developer.apple.com/documentation/activitykit/activity/pushtostarttoken) token from Apple. To start, update, or end a live activity remotely using FCM, construct an [`aps payload`](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications#Construct-the-payload-that-starts-a-Live-Activity) and put it in the [`apns.payload`](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#ApnsConfig) field. */
  liveActivityToken?: string;
}

export const ApnsConfig: Schema.Schema<ApnsConfig> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fcmOptions: Schema.optional(ApnsFcmOptions),
  liveActivityToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ApnsConfig" }) as any as Schema.Schema<ApnsConfig>;

export interface FcmOptions {
  /** Label associated with the message's analytics data. */
  analyticsLabel?: string;
}

export const FcmOptions: Schema.Schema<FcmOptions> = Schema.suspend(() => Schema.Struct({
  analyticsLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "FcmOptions" }) as any as Schema.Schema<FcmOptions>;

export interface Message {
  /** Output Only. The identifier of the message sent, in the format of `projects/* /messages/{message_id}`. */
  name?: string;
  /** Registration token to send a message to. */
  token?: string;
  /** Topic name to send a message to, e.g. "weather". Note: "/topics/" prefix should not be provided. */
  topic?: string;
  /** Condition to send a message to, e.g. "'foo' in topics && 'bar' in topics". */
  condition?: string;
  /** Input only. Arbitrary key/value payload, which must be UTF-8 encoded. The key should not be a reserved word ("from", "message_type", or any word starting with "google." or "gcm.notification."). When sending payloads containing only data fields to iOS devices, only normal priority (`"apns-priority": "5"`) is allowed in [`ApnsConfig`](/docs/reference/fcm/rest/v1/projects.messages#apnsconfig). */
  data?: Record<string, string>;
  /** Input only. Basic notification template to use across all platforms. */
  notification?: Notification;
  /** Input only. Android specific options for messages sent through [FCM connection server](https://goo.gl/4GLdUl). */
  android?: AndroidConfig;
  /** Input only. [Webpush protocol](https://tools.ietf.org/html/rfc8030) options. */
  webpush?: WebpushConfig;
  /** Input only. [Apple Push Notification Service](https://goo.gl/MXRTPa) specific options. */
  apns?: ApnsConfig;
  /** Input only. Template for FCM SDK feature options to use across all platforms. */
  fcmOptions?: FcmOptions;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  notification: Schema.optional(Notification),
  android: Schema.optional(AndroidConfig),
  webpush: Schema.optional(WebpushConfig),
  apns: Schema.optional(ApnsConfig),
  fcmOptions: Schema.optional(FcmOptions),
})).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface SendMessageRequest {
  /** Flag for testing the request without actually delivering the message. */
  validateOnly?: boolean;
  /** Required. Message to send. */
  message?: Message;
}

export const SendMessageRequest: Schema.Schema<SendMessageRequest> = Schema.suspend(() => Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean),
  message: Schema.optional(Message),
})).annotate({ identifier: "SendMessageRequest" }) as any as Schema.Schema<SendMessageRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Send a message to specified target (a registration token, topic or condition). */
export interface SendProjectsMessagesRequest {
  /** Required. It contains the Firebase project id (i.e. the unique identifier for your Firebase project), in the format of `projects/{project_id}`. The numeric project number with no padding is also supported in the format of `projects/{project_number}`. */
  parent: string;
  /** Request body */
  body?: SendMessageRequest;
}

export const SendProjectsMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SendMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/messages:send", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SendProjectsMessagesRequest>;

export type SendProjectsMessagesResponse = Message;
export const SendProjectsMessagesResponse = Message;

export type SendProjectsMessagesError = CommonErrors;

export const sendProjectsMessages: API.OperationMethod<SendProjectsMessagesRequest, SendProjectsMessagesResponse, SendProjectsMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SendProjectsMessagesRequest,
  output: SendProjectsMessagesResponse,
  errors: [],
}));

