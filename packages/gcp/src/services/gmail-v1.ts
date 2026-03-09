// ==========================================================================
// Gmail API (gmail v1)
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
  name: "gmail",
  version: "v1",
  rootUrl: "https://gmail.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PopSettings {
  /** The range of messages which are accessible via POP. */
  accessWindow?:
    | "accessWindowUnspecified"
    | "disabled"
    | "fromNowOn"
    | "allMail"
    | (string & {});
  /** The action that will be executed on a message after it has been fetched via POP. */
  disposition?:
    | "dispositionUnspecified"
    | "leaveInInbox"
    | "archive"
    | "trash"
    | "markRead"
    | (string & {});
}

export const PopSettings: Schema.Schema<PopSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      accessWindow: Schema.optional(Schema.String),
      disposition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PopSettings",
  }) as any as Schema.Schema<PopSettings>;

export interface LabelColor {
  /** The text color of the label, represented as hex string. This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: \#000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765 */
  textColor?: string;
  /** The background color represented as hex string #RRGGBB (ex #000000). This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: \#000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765 */
  backgroundColor?: string;
}

export const LabelColor: Schema.Schema<LabelColor> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textColor: Schema.optional(Schema.String),
      backgroundColor: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "LabelColor" }) as any as Schema.Schema<LabelColor>;

export interface Label {
  /** The visibility of messages with this label in the message list in the Gmail web interface. */
  messageListVisibility?: "show" | "hide" | (string & {});
  /** The number of unread messages with the label. */
  messagesUnread?: number;
  /** The color to assign to the label. Color is only available for labels that have their `type` set to `user`. */
  color?: LabelColor;
  /** The display name of the label. */
  name?: string;
  /** The number of unread threads with the label. */
  threadsUnread?: number;
  /** The owner type for the label. User labels are created by the user and can be modified and deleted by the user and can be applied to any message or thread. System labels are internally created and cannot be added, modified, or deleted. System labels may be able to be applied to or removed from messages and threads under some circumstances but this is not guaranteed. For example, users can apply and remove the `INBOX` and `UNREAD` labels from messages and threads, but cannot apply or remove the `DRAFTS` or `SENT` labels from messages or threads. */
  type?: "system" | "user" | (string & {});
  /** The visibility of the label in the label list in the Gmail web interface. */
  labelListVisibility?:
    | "labelShow"
    | "labelShowIfUnread"
    | "labelHide"
    | (string & {});
  /** The total number of messages with the label. */
  messagesTotal?: number;
  /** The total number of threads with the label. */
  threadsTotal?: number;
  /** The immutable ID of the label. */
  id?: string;
}

export const Label: Schema.Schema<Label> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageListVisibility: Schema.optional(Schema.String),
      messagesUnread: Schema.optional(Schema.Number),
      color: Schema.optional(LabelColor),
      name: Schema.optional(Schema.String),
      threadsUnread: Schema.optional(Schema.Number),
      type: Schema.optional(Schema.String),
      labelListVisibility: Schema.optional(Schema.String),
      messagesTotal: Schema.optional(Schema.Number),
      threadsTotal: Schema.optional(Schema.Number),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface ClassificationLabelFieldValue {
  /** Required. The field ID for the Classification Label Value. Maps to the ID field of the Google Drive `Label.Field` object. */
  fieldId?: string;
  /** Selection choice ID for the selection option. Should only be set if the field type is `SELECTION` in the Google Drive `Label.Field` object. Maps to the id field of the Google Drive `Label.Field.SelectionOptions` resource. */
  selection?: string;
}

export const ClassificationLabelFieldValue: Schema.Schema<ClassificationLabelFieldValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldId: Schema.optional(Schema.String),
      selection: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClassificationLabelFieldValue",
  }) as any as Schema.Schema<ClassificationLabelFieldValue>;

export interface ClassificationLabelValue {
  /** Required. The canonical or raw alphanumeric classification label ID. Maps to the ID field of the Google Drive Label resource. */
  labelId?: string;
  /** Field values for the given classification label ID. */
  fields?: Array<ClassificationLabelFieldValue>;
}

export const ClassificationLabelValue: Schema.Schema<ClassificationLabelValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelId: Schema.optional(Schema.String),
      fields: Schema.optional(Schema.Array(ClassificationLabelFieldValue)),
    }),
  ).annotate({
    identifier: "ClassificationLabelValue",
  }) as any as Schema.Schema<ClassificationLabelValue>;

export interface MessagePartBody {
  /** The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment. */
  data?: string;
  /** Number of bytes for the message part data (encoding notwithstanding). */
  size?: number;
  /** When present, contains the ID of an external attachment that can be retrieved in a separate `messages.attachments.get` request. When not present, the entire content of the message part body is contained in the data field. */
  attachmentId?: string;
}

export const MessagePartBody: Schema.Schema<MessagePartBody> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      size: Schema.optional(Schema.Number),
      attachmentId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MessagePartBody",
  }) as any as Schema.Schema<MessagePartBody>;

export interface MessagePartHeader {
  /** The value of the header after the `:` separator. For example, `someuser@example.com`. */
  value?: string;
  /** The name of the header before the `:` separator. For example, `To`. */
  name?: string;
}

export const MessagePartHeader: Schema.Schema<MessagePartHeader> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "MessagePartHeader",
  }) as any as Schema.Schema<MessagePartHeader>;

export interface MessagePart {
  /** The filename of the attachment. Only present if this message part represents an attachment. */
  filename?: string;
  /** The message part body for this part, which may be empty for container MIME message parts. */
  body?: MessagePartBody;
  /** The immutable ID of the message part. */
  partId?: string;
  /** List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as `To`, `From`, and `Subject`. */
  headers?: Array<MessagePartHeader>;
  /** The MIME type of the message part. */
  mimeType?: string;
  /** The child MIME message parts of this part. This only applies to container MIME message parts, for example `multipart/*`. For non- container MIME message part types, such as `text/plain`, this field is empty. For more information, see RFC 1521. */
  parts?: Array<MessagePart>;
}

export const MessagePart: Schema.Schema<MessagePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filename: Schema.optional(Schema.String),
      body: Schema.optional(MessagePartBody),
      partId: Schema.optional(Schema.String),
      headers: Schema.optional(Schema.Array(MessagePartHeader)),
      mimeType: Schema.optional(Schema.String),
      parts: Schema.optional(Schema.Array(MessagePart)),
    }),
  ).annotate({
    identifier: "MessagePart",
  }) as any as Schema.Schema<MessagePart>;

export interface Message {
  /** The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match. */
  threadId?: string;
  /** List of IDs of labels applied to this message. */
  labelIds?: Array<string>;
  /** The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header. */
  internalDate?: string;
  /** A short part of the message text. */
  snippet?: string;
  /** Classification Label values on the message. Available Classification Label schemas can be queried using the Google Drive Labels API. Each classification label ID must be unique. If duplicate IDs are provided, only one will be retained, and the selection is arbitrary. Only used for Google Workspace accounts. */
  classificationLabelValues?: Array<ClassificationLabelValue>;
  /** The immutable ID of the message. */
  id?: string;
  /** The ID of the last history record that modified this message. */
  historyId?: string;
  /** Estimated size in bytes of the message. */
  sizeEstimate?: number;
  /** The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied. */
  raw?: string;
  /** The parsed email structure in the message parts. */
  payload?: MessagePart;
}

export const Message: Schema.Schema<Message> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      threadId: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      internalDate: Schema.optional(Schema.String),
      snippet: Schema.optional(Schema.String),
      classificationLabelValues: Schema.optional(
        Schema.Array(ClassificationLabelValue),
      ),
      id: Schema.optional(Schema.String),
      historyId: Schema.optional(Schema.String),
      sizeEstimate: Schema.optional(Schema.Number),
      raw: Schema.optional(Schema.String),
      payload: Schema.optional(MessagePart),
    }),
  ).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface Thread {
  /** The unique ID of the thread. */
  id?: string;
  /** The ID of the last history record that modified this thread. */
  historyId?: string;
  /** A short part of the message text. */
  snippet?: string;
  /** The list of messages in the thread. */
  messages?: Array<Message>;
}

export const Thread: Schema.Schema<Thread> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      historyId: Schema.optional(Schema.String),
      snippet: Schema.optional(Schema.String),
      messages: Schema.optional(Schema.Array(Message)),
    }),
  ).annotate({ identifier: "Thread" }) as any as Schema.Schema<Thread>;

export interface ListLabelsResponse {
  /** List of labels. Note that each label resource only contains an `id`, `name`, `messageListVisibility`, `labelListVisibility`, and `type`. The [`labels.get`](https://developers.google.com/workspace/gmail/api/v1/reference/users/labels/get) method can fetch additional label details. */
  labels?: Array<Label>;
}

export const ListLabelsResponse: Schema.Schema<ListLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labels: Schema.optional(Schema.Array(Label)),
    }),
  ).annotate({
    identifier: "ListLabelsResponse",
  }) as any as Schema.Schema<ListLabelsResponse>;

export interface HistoryMessageAdded {
  message?: Message;
}

export const HistoryMessageAdded: Schema.Schema<HistoryMessageAdded> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "HistoryMessageAdded",
  }) as any as Schema.Schema<HistoryMessageAdded>;

export interface BatchModifyMessagesRequest {
  /** The IDs of the messages to modify. There is a limit of 1000 ids per request. */
  ids?: Array<string>;
  /** A list of label IDs to remove from messages. */
  removeLabelIds?: Array<string>;
  /** A list of label IDs to add to messages. */
  addLabelIds?: Array<string>;
}

export const BatchModifyMessagesRequest: Schema.Schema<BatchModifyMessagesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ids: Schema.optional(Schema.Array(Schema.String)),
      removeLabelIds: Schema.optional(Schema.Array(Schema.String)),
      addLabelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BatchModifyMessagesRequest",
  }) as any as Schema.Schema<BatchModifyMessagesRequest>;

export interface WatchResponse {
  /** The ID of the mailbox's current history record. */
  historyId?: string;
  /** When Gmail will stop sending notifications for mailbox updates (epoch millis). Call `watch` again before this time to renew the watch. */
  expiration?: string;
}

export const WatchResponse: Schema.Schema<WatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      historyId: Schema.optional(Schema.String),
      expiration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WatchResponse",
  }) as any as Schema.Schema<WatchResponse>;

export interface SmtpMsa {
  /** The password that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses. */
  password?: string;
  /** The hostname of the SMTP service. Required. */
  host?: string;
  /** The protocol that will be used to secure communication with the SMTP service. Required. */
  securityMode?:
    | "securityModeUnspecified"
    | "none"
    | "ssl"
    | "starttls"
    | (string & {});
  /** The username that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses. */
  username?: string;
  /** The port of the SMTP service. Required. */
  port?: number;
}

export const SmtpMsa: Schema.Schema<SmtpMsa> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      password: Schema.optional(Schema.String),
      host: Schema.optional(Schema.String),
      securityMode: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "SmtpMsa" }) as any as Schema.Schema<SmtpMsa>;

export interface Profile {
  /** The user's email address. */
  emailAddress?: string;
  /** The total number of threads in the mailbox. */
  threadsTotal?: number;
  /** The total number of messages in the mailbox. */
  messagesTotal?: number;
  /** The ID of the mailbox's current history record. */
  historyId?: string;
}

export const Profile: Schema.Schema<Profile> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emailAddress: Schema.optional(Schema.String),
      threadsTotal: Schema.optional(Schema.Number),
      messagesTotal: Schema.optional(Schema.Number),
      historyId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Profile" }) as any as Schema.Schema<Profile>;

export interface FilterCriteria {
  /** Whether the response should exclude chats. */
  excludeChats?: boolean;
  /** Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  query?: string;
  /** The size of the entire RFC822 message in bytes, including all headers and attachments. */
  size?: number;
  /** Whether the message has any attachment. */
  hasAttachment?: boolean;
  /** The recipient's display name or email address. Includes recipients in the "to", "cc", and "bcc" header fields. You can use simply the local part of the email address. For example, "example" and "example@" both match "example@gmail.com". This field is case-insensitive. */
  to?: string;
  /** The sender's display name or email address. */
  from?: string;
  /** Only return messages not matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  negatedQuery?: string;
  /** How the message size in bytes should be in relation to the size field. */
  sizeComparison?: "unspecified" | "smaller" | "larger" | (string & {});
  /** Case-insensitive phrase found in the message's subject. Trailing and leading whitespace are be trimmed and adjacent spaces are collapsed. */
  subject?: string;
}

export const FilterCriteria: Schema.Schema<FilterCriteria> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      excludeChats: Schema.optional(Schema.Boolean),
      query: Schema.optional(Schema.String),
      size: Schema.optional(Schema.Number),
      hasAttachment: Schema.optional(Schema.Boolean),
      to: Schema.optional(Schema.String),
      from: Schema.optional(Schema.String),
      negatedQuery: Schema.optional(Schema.String),
      sizeComparison: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "FilterCriteria",
  }) as any as Schema.Schema<FilterCriteria>;

export interface FilterAction {
  /** Email address that the message should be forwarded to. */
  forward?: string;
  /** List of labels to add to the message. */
  addLabelIds?: Array<string>;
  /** List of labels to remove from the message. */
  removeLabelIds?: Array<string>;
}

export const FilterAction: Schema.Schema<FilterAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      forward: Schema.optional(Schema.String),
      addLabelIds: Schema.optional(Schema.Array(Schema.String)),
      removeLabelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "FilterAction",
  }) as any as Schema.Schema<FilterAction>;

export interface Filter {
  /** The server assigned ID of the filter. */
  id?: string;
  /** Matching criteria for the filter. */
  criteria?: FilterCriteria;
  /** Action that the filter performs. */
  action?: FilterAction;
}

export const Filter: Schema.Schema<Filter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      criteria: Schema.optional(FilterCriteria),
      action: Schema.optional(FilterAction),
    }),
  ).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface SendAs {
  /** Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only. */
  isPrimary?: boolean;
  /** An optional SMTP service that will be used as an outbound relay for mail sent using this alias. If this is empty, outbound mail will be sent directly from Gmail's servers to the destination SMTP service. This setting only applies to custom "from" aliases. */
  smtpMsa?: SmtpMsa;
  /** Whether Gmail should treat this address as an alias for the user's primary email address. This setting only applies to custom "from" aliases. */
  treatAsAlias?: boolean;
  /** Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases. */
  verificationStatus?:
    | "verificationStatusUnspecified"
    | "accepted"
    | "pending"
    | (string & {});
  /** An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header. */
  replyToAddress?: string;
  /** A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail. */
  displayName?: string;
  /** Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address. */
  isDefault?: boolean;
  /** An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only. */
  signature?: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create. */
  sendAsEmail?: string;
}

export const SendAs: Schema.Schema<SendAs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isPrimary: Schema.optional(Schema.Boolean),
      smtpMsa: Schema.optional(SmtpMsa),
      treatAsAlias: Schema.optional(Schema.Boolean),
      verificationStatus: Schema.optional(Schema.String),
      replyToAddress: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      isDefault: Schema.optional(Schema.Boolean),
      signature: Schema.optional(Schema.String),
      sendAsEmail: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SendAs" }) as any as Schema.Schema<SendAs>;

export interface KaclsKeyMetadata {
  /** Opaque data generated and used by the key access control list service. Maximum size: 8 KiB. */
  kaclsData?: string;
  /** The URI of the key access control list service that manages the private key. */
  kaclsUri?: string;
}

export const KaclsKeyMetadata: Schema.Schema<KaclsKeyMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      kaclsData: Schema.optional(Schema.String),
      kaclsUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "KaclsKeyMetadata",
  }) as any as Schema.Schema<KaclsKeyMetadata>;

export interface Draft {
  /** The message content of the draft. */
  message?: Message;
  /** The immutable ID of the draft. */
  id?: string;
}

export const Draft: Schema.Schema<Draft> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Draft" }) as any as Schema.Schema<Draft>;

export interface ListDraftsResponse {
  /** Token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
  /** List of drafts. Note that the `Message` property in each `Draft` resource only contains an `id` and a `threadId`. The [`messages.get`](https://developers.google.com/workspace/gmail/api/v1/reference/users/messages/get) method can fetch additional message details. */
  drafts?: Array<Draft>;
}

export const ListDraftsResponse: Schema.Schema<ListDraftsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      resultSizeEstimate: Schema.optional(Schema.Number),
      drafts: Schema.optional(Schema.Array(Draft)),
    }),
  ).annotate({
    identifier: "ListDraftsResponse",
  }) as any as Schema.Schema<ListDraftsResponse>;

export interface HardwareKeyMetadata {
  /** Description about the hardware key. */
  description?: string;
}

export const HardwareKeyMetadata: Schema.Schema<HardwareKeyMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HardwareKeyMetadata",
  }) as any as Schema.Schema<HardwareKeyMetadata>;

export interface CsePrivateKeyMetadata {
  /** Metadata for hardware keys. */
  hardwareKeyMetadata?: HardwareKeyMetadata;
  /** Metadata for a private key instance managed by an external key access control list service. */
  kaclsKeyMetadata?: KaclsKeyMetadata;
  /** Output only. The immutable ID for the private key metadata instance. */
  privateKeyMetadataId?: string;
}

export const CsePrivateKeyMetadata: Schema.Schema<CsePrivateKeyMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      hardwareKeyMetadata: Schema.optional(HardwareKeyMetadata),
      kaclsKeyMetadata: Schema.optional(KaclsKeyMetadata),
      privateKeyMetadataId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CsePrivateKeyMetadata",
  }) as any as Schema.Schema<CsePrivateKeyMetadata>;

export interface WatchRequest {
  /** A fully qualified Google Cloud Pub/Sub API topic name to publish the events to. This topic name **must** already exist in Cloud Pub/Sub and you **must** have already granted gmail "publish" permission on it. For example, "projects/my-project-identifier/topics/my-topic-name" (using the Cloud Pub/Sub "v1" topic naming format). Note that the "my-project-identifier" portion must exactly match your Google developer project id (the one executing this watch request). */
  topicName?: string;
  /** Filtering behavior of `labelIds list` specified. This field replaces `label_filter_action`; if set, `label_filter_action` is ignored. */
  labelFilterBehavior?: "include" | "exclude" | (string & {});
  /** List of label_ids to restrict notifications about. By default, if unspecified, all changes are pushed out. If specified then dictates which labels are required for a push notification to be generated. */
  labelIds?: Array<string>;
  /** Filtering behavior of `labelIds list` specified. This field is deprecated because it caused incorrect behavior in some cases; use `label_filter_behavior` instead. */
  labelFilterAction?: "include" | "exclude" | (string & {});
}

export const WatchRequest: Schema.Schema<WatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topicName: Schema.optional(Schema.String),
      labelFilterBehavior: Schema.optional(Schema.String),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      labelFilterAction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "WatchRequest",
  }) as any as Schema.Schema<WatchRequest>;

export interface HistoryMessageDeleted {
  message?: Message;
}

export const HistoryMessageDeleted: Schema.Schema<HistoryMessageDeleted> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "HistoryMessageDeleted",
  }) as any as Schema.Schema<HistoryMessageDeleted>;

export interface SmimeInfo {
  /** Whether this SmimeInfo is the default one for this user's send-as address. */
  isDefault?: boolean;
  /** The S/MIME certificate issuer's common name. */
  issuerCn?: string;
  /** PKCS#12 format containing a single private/public key pair and certificate chain. This format is only accepted from client for creating a new SmimeInfo and is never returned, because the private key is not intended to be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword should be set appropriately. */
  pkcs12?: string;
  /** PEM formatted X509 concatenated certificate string (standard base64 encoding). Format used for returning key, which includes public key as well as certificate chain (not private key). */
  pem?: string;
  /** Encrypted key password, when key is encrypted. */
  encryptedKeyPassword?: string;
  /** The immutable ID for the SmimeInfo. */
  id?: string;
  /** When the certificate expires (in milliseconds since epoch). */
  expiration?: string;
}

export const SmimeInfo: Schema.Schema<SmimeInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isDefault: Schema.optional(Schema.Boolean),
      issuerCn: Schema.optional(Schema.String),
      pkcs12: Schema.optional(Schema.String),
      pem: Schema.optional(Schema.String),
      encryptedKeyPassword: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      expiration: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "SmimeInfo" }) as any as Schema.Schema<SmimeInfo>;

export interface VacationSettings {
  /** An optional end time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives before the end time. If both `startTime` and `endTime` are specified, `startTime` must precede `endTime`. */
  endTime?: string;
  /** Optional text to prepend to the subject line in vacation responses. In order to enable auto-replies, either the response subject or the response body must be nonempty. */
  responseSubject?: string;
  /** Flag that controls whether Gmail automatically replies to messages. */
  enableAutoReply?: boolean;
  /** Response body in HTML format. Gmail will sanitize the HTML before storing it. If both `response_body_plain_text` and `response_body_html` are specified, `response_body_html` will be used. */
  responseBodyHtml?: string;
  /** Flag that determines whether responses are sent to recipients who are not in the user's list of contacts. */
  restrictToContacts?: boolean;
  /** Flag that determines whether responses are sent to recipients who are outside of the user's domain. This feature is only available for Google Workspace users. */
  restrictToDomain?: boolean;
  /** Response body in plain text format. If both `response_body_plain_text` and `response_body_html` are specified, `response_body_html` will be used. */
  responseBodyPlainText?: string;
  /** An optional start time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives after the start time. If both `startTime` and `endTime` are specified, `startTime` must precede `endTime`. */
  startTime?: string;
}

export const VacationSettings: Schema.Schema<VacationSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      responseSubject: Schema.optional(Schema.String),
      enableAutoReply: Schema.optional(Schema.Boolean),
      responseBodyHtml: Schema.optional(Schema.String),
      restrictToContacts: Schema.optional(Schema.Boolean),
      restrictToDomain: Schema.optional(Schema.Boolean),
      responseBodyPlainText: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VacationSettings",
  }) as any as Schema.Schema<VacationSettings>;

export interface HistoryLabelRemoved {
  /** Label IDs removed from the message. */
  labelIds?: Array<string>;
  message?: Message;
}

export const HistoryLabelRemoved: Schema.Schema<HistoryLabelRemoved> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelIds: Schema.optional(Schema.Array(Schema.String)),
      message: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "HistoryLabelRemoved",
  }) as any as Schema.Schema<HistoryLabelRemoved>;

export interface DisableCseKeyPairRequest {}

export const DisableCseKeyPairRequest: Schema.Schema<DisableCseKeyPairRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DisableCseKeyPairRequest",
  }) as any as Schema.Schema<DisableCseKeyPairRequest>;

export interface ListThreadsResponse {
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
  /** List of threads. Note that each thread resource does not contain a list of `messages`. The list of `messages` for a given thread can be fetched using the [`threads.get`](https://developers.google.com/workspace/gmail/api/v1/reference/users/threads/get) method. */
  threads?: Array<Thread>;
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
}

export const ListThreadsResponse: Schema.Schema<ListThreadsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resultSizeEstimate: Schema.optional(Schema.Number),
      threads: Schema.optional(Schema.Array(Thread)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListThreadsResponse",
  }) as any as Schema.Schema<ListThreadsResponse>;

export interface SignAndEncryptKeyPairs {
  /** The ID of the CseKeyPair that signs outgoing mail. */
  signingKeyPairId?: string;
  /** The ID of the CseKeyPair that encrypts signed outgoing mail. */
  encryptionKeyPairId?: string;
}

export const SignAndEncryptKeyPairs: Schema.Schema<SignAndEncryptKeyPairs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      signingKeyPairId: Schema.optional(Schema.String),
      encryptionKeyPairId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SignAndEncryptKeyPairs",
  }) as any as Schema.Schema<SignAndEncryptKeyPairs>;

export interface CseIdentity {
  /** The email address for the sending identity. The email address must be the primary email address of the authenticated user. */
  emailAddress?: string;
  /** The configuration of a CSE identity that uses different key pairs for signing and encryption. */
  signAndEncryptKeyPairs?: SignAndEncryptKeyPairs;
  /** If a key pair is associated, the ID of the key pair, CseKeyPair. */
  primaryKeyPairId?: string;
}

export const CseIdentity: Schema.Schema<CseIdentity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      emailAddress: Schema.optional(Schema.String),
      signAndEncryptKeyPairs: Schema.optional(SignAndEncryptKeyPairs),
      primaryKeyPairId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CseIdentity",
  }) as any as Schema.Schema<CseIdentity>;

export interface ForwardingAddress {
  /** Indicates whether this address has been verified and is usable for forwarding. Read-only. */
  verificationStatus?:
    | "verificationStatusUnspecified"
    | "accepted"
    | "pending"
    | (string & {});
  /** An email address to which messages can be forwarded. */
  forwardingEmail?: string;
}

export const ForwardingAddress: Schema.Schema<ForwardingAddress> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verificationStatus: Schema.optional(Schema.String),
      forwardingEmail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ForwardingAddress",
  }) as any as Schema.Schema<ForwardingAddress>;

export interface ListSendAsResponse {
  /** List of send-as aliases. */
  sendAs?: Array<SendAs>;
}

export const ListSendAsResponse: Schema.Schema<ListSendAsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sendAs: Schema.optional(Schema.Array(SendAs)),
    }),
  ).annotate({
    identifier: "ListSendAsResponse",
  }) as any as Schema.Schema<ListSendAsResponse>;

export interface EnableCseKeyPairRequest {}

export const EnableCseKeyPairRequest: Schema.Schema<EnableCseKeyPairRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "EnableCseKeyPairRequest",
  }) as any as Schema.Schema<EnableCseKeyPairRequest>;

export interface ImapSettings {
  /** An optional limit on the number of messages that an IMAP folder may contain. Legal values are 0, 1000, 2000, 5000 or 10000. A value of zero is interpreted to mean that there is no limit. */
  maxFolderSize?: number;
  /** Whether IMAP is enabled for the account. */
  enabled?: boolean;
  /** If this value is true, Gmail will immediately expunge a message when it is marked as deleted in IMAP. Otherwise, Gmail will wait for an update from the client before expunging messages marked as deleted. */
  autoExpunge?: boolean;
  /** The action that will be executed on a message when it is marked as deleted and expunged from the last visible IMAP folder. */
  expungeBehavior?:
    | "expungeBehaviorUnspecified"
    | "archive"
    | "trash"
    | "deleteForever"
    | (string & {});
}

export const ImapSettings: Schema.Schema<ImapSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      maxFolderSize: Schema.optional(Schema.Number),
      enabled: Schema.optional(Schema.Boolean),
      autoExpunge: Schema.optional(Schema.Boolean),
      expungeBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImapSettings",
  }) as any as Schema.Schema<ImapSettings>;

export interface ListMessagesResponse {
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
  /** Token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** List of messages. Note that each message resource contains only an `id` and a `threadId`. Additional message details can be fetched using the messages.get method. */
  messages?: Array<Message>;
}

export const ListMessagesResponse: Schema.Schema<ListMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resultSizeEstimate: Schema.optional(Schema.Number),
      nextPageToken: Schema.optional(Schema.String),
      messages: Schema.optional(Schema.Array(Message)),
    }),
  ).annotate({
    identifier: "ListMessagesResponse",
  }) as any as Schema.Schema<ListMessagesResponse>;

export interface ModifyMessageRequest {
  /** A list of IDs of labels to add to this message. You can add up to 100 labels with each update. */
  addLabelIds?: Array<string>;
  /** A list IDs of labels to remove from this message. You can remove up to 100 labels with each update. */
  removeLabelIds?: Array<string>;
}

export const ModifyMessageRequest: Schema.Schema<ModifyMessageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      addLabelIds: Schema.optional(Schema.Array(Schema.String)),
      removeLabelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ModifyMessageRequest",
  }) as any as Schema.Schema<ModifyMessageRequest>;

export interface HistoryLabelAdded {
  message?: Message;
  /** Label IDs added to the message. */
  labelIds?: Array<string>;
}

export const HistoryLabelAdded: Schema.Schema<HistoryLabelAdded> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Message),
      labelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "HistoryLabelAdded",
  }) as any as Schema.Schema<HistoryLabelAdded>;

export interface ListFiltersResponse {
  /** List of a user's filters. */
  filter?: Array<Filter>;
}

export const ListFiltersResponse: Schema.Schema<ListFiltersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(Schema.Array(Filter)),
    }),
  ).annotate({
    identifier: "ListFiltersResponse",
  }) as any as Schema.Schema<ListFiltersResponse>;

export interface ListSmimeInfoResponse {
  /** List of SmimeInfo. */
  smimeInfo?: Array<SmimeInfo>;
}

export const ListSmimeInfoResponse: Schema.Schema<ListSmimeInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      smimeInfo: Schema.optional(Schema.Array(SmimeInfo)),
    }),
  ).annotate({
    identifier: "ListSmimeInfoResponse",
  }) as any as Schema.Schema<ListSmimeInfoResponse>;

export interface LanguageSettings {
  /** The language to display Gmail in, formatted as an RFC 3066 Language Tag (for example `en-GB`, `fr` or `ja` for British English, French, or Japanese respectively). The set of languages supported by Gmail evolves over time, so please refer to the "Language" dropdown in the Gmail settings for all available options, as described in the language settings help article. For a table of sample values, see [Manage language settings](https://developers.google.com/workspace/gmail/api/guides/language-settings). Not all Gmail clients can display the same set of languages. In the case that a user's display language is not available for use on a particular client, said client automatically chooses to display in the closest supported variant (or a reasonable default). */
  displayLanguage?: string;
}

export const LanguageSettings: Schema.Schema<LanguageSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayLanguage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LanguageSettings",
  }) as any as Schema.Schema<LanguageSettings>;

export interface BatchDeleteMessagesRequest {
  /** The IDs of the messages to delete. */
  ids?: Array<string>;
}

export const BatchDeleteMessagesRequest: Schema.Schema<BatchDeleteMessagesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ids: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BatchDeleteMessagesRequest",
  }) as any as Schema.Schema<BatchDeleteMessagesRequest>;

export interface CseKeyPair {
  /** Output only. If a key pair is set to `DISABLED`, the time that the key pair's state changed from `ENABLED` to `DISABLED`. This field is present only when the key pair is in state `DISABLED`. */
  disableTime?: string;
  /** Output only. The email address identities that are specified on the leaf certificate. */
  subjectEmailAddresses?: Array<string>;
  /** Output only. The immutable ID for the client-side encryption S/MIME key pair. */
  keyPairId?: string;
  /** Output only. The current state of the key pair. */
  enablementState?: "stateUnspecified" | "enabled" | "disabled" | (string & {});
  /** Output only. The public key and its certificate chain, in [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format. */
  pem?: string;
  /** Input only. The public key and its certificate chain. The chain must be in [PKCS#7](https://en.wikipedia.org/wiki/PKCS_7) format and use PEM encoding and ASCII armor. */
  pkcs7?: string;
  /** Metadata for instances of this key pair's private key. */
  privateKeyMetadata?: Array<CsePrivateKeyMetadata>;
}

export const CseKeyPair: Schema.Schema<CseKeyPair> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disableTime: Schema.optional(Schema.String),
      subjectEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
      keyPairId: Schema.optional(Schema.String),
      enablementState: Schema.optional(Schema.String),
      pem: Schema.optional(Schema.String),
      pkcs7: Schema.optional(Schema.String),
      privateKeyMetadata: Schema.optional(Schema.Array(CsePrivateKeyMetadata)),
    }),
  ).annotate({ identifier: "CseKeyPair" }) as any as Schema.Schema<CseKeyPair>;

export interface ListCseKeyPairsResponse {
  /** One page of the list of CSE key pairs installed for the user. */
  cseKeyPairs?: Array<CseKeyPair>;
  /** Pagination token to be passed to a subsequent ListCseKeyPairs call in order to retrieve the next page of key pairs. If this value is not returned, then no further pages remain. */
  nextPageToken?: string;
}

export const ListCseKeyPairsResponse: Schema.Schema<ListCseKeyPairsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cseKeyPairs: Schema.optional(Schema.Array(CseKeyPair)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCseKeyPairsResponse",
  }) as any as Schema.Schema<ListCseKeyPairsResponse>;

export interface ModifyThreadRequest {
  /** A list of IDs of labels to add to this thread. You can add up to 100 labels with each update. */
  addLabelIds?: Array<string>;
  /** A list of IDs of labels to remove from this thread. You can remove up to 100 labels with each update. */
  removeLabelIds?: Array<string>;
}

export const ModifyThreadRequest: Schema.Schema<ModifyThreadRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      addLabelIds: Schema.optional(Schema.Array(Schema.String)),
      removeLabelIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ModifyThreadRequest",
  }) as any as Schema.Schema<ModifyThreadRequest>;

export interface ListForwardingAddressesResponse {
  /** List of addresses that may be used for forwarding. */
  forwardingAddresses?: Array<ForwardingAddress>;
}

export const ListForwardingAddressesResponse: Schema.Schema<ListForwardingAddressesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      forwardingAddresses: Schema.optional(Schema.Array(ForwardingAddress)),
    }),
  ).annotate({
    identifier: "ListForwardingAddressesResponse",
  }) as any as Schema.Schema<ListForwardingAddressesResponse>;

export interface AutoForwarding {
  /** The state that a message should be left in after it has been forwarded. */
  disposition?:
    | "dispositionUnspecified"
    | "leaveInInbox"
    | "archive"
    | "trash"
    | "markRead"
    | (string & {});
  /** Email address to which all incoming messages are forwarded. This email address must be a verified member of the forwarding addresses. */
  emailAddress?: string;
  /** Whether all incoming mail is automatically forwarded to another address. */
  enabled?: boolean;
}

export const AutoForwarding: Schema.Schema<AutoForwarding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      disposition: Schema.optional(Schema.String),
      emailAddress: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "AutoForwarding",
  }) as any as Schema.Schema<AutoForwarding>;

export interface History {
  /** Labels added to messages in this history record. */
  labelsAdded?: Array<HistoryLabelAdded>;
  /** List of messages changed in this history record. The fields for specific change types, such as `messagesAdded` may duplicate messages in this field. We recommend using the specific change-type fields instead of this. */
  messages?: Array<Message>;
  /** Messages added to the mailbox in this history record. */
  messagesAdded?: Array<HistoryMessageAdded>;
  /** Messages deleted (not Trashed) from the mailbox in this history record. */
  messagesDeleted?: Array<HistoryMessageDeleted>;
  /** Labels removed from messages in this history record. */
  labelsRemoved?: Array<HistoryLabelRemoved>;
  /** The mailbox sequence ID. */
  id?: string;
}

export const History: Schema.Schema<History> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      labelsAdded: Schema.optional(Schema.Array(HistoryLabelAdded)),
      messages: Schema.optional(Schema.Array(Message)),
      messagesAdded: Schema.optional(Schema.Array(HistoryMessageAdded)),
      messagesDeleted: Schema.optional(Schema.Array(HistoryMessageDeleted)),
      labelsRemoved: Schema.optional(Schema.Array(HistoryLabelRemoved)),
      id: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "History" }) as any as Schema.Schema<History>;

export interface Delegate {
  /** Indicates whether this address has been verified and can act as a delegate for the account. Read-only. */
  verificationStatus?:
    | "verificationStatusUnspecified"
    | "accepted"
    | "pending"
    | "rejected"
    | "expired"
    | (string & {});
  /** The email address of the delegate. */
  delegateEmail?: string;
}

export const Delegate: Schema.Schema<Delegate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      verificationStatus: Schema.optional(Schema.String),
      delegateEmail: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Delegate" }) as any as Schema.Schema<Delegate>;

export interface ListHistoryResponse {
  /** List of history records. Any `messages` contained in the response will typically only have `id` and `threadId` fields populated. */
  history?: Array<History>;
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** The ID of the mailbox's current history record. */
  historyId?: string;
}

export const ListHistoryResponse: Schema.Schema<ListHistoryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      history: Schema.optional(Schema.Array(History)),
      nextPageToken: Schema.optional(Schema.String),
      historyId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListHistoryResponse",
  }) as any as Schema.Schema<ListHistoryResponse>;

export interface ListCseIdentitiesResponse {
  /** Pagination token to be passed to a subsequent ListCseIdentities call in order to retrieve the next page of identities. If this value is not returned or is the empty string, then no further pages remain. */
  nextPageToken?: string;
  /** One page of the list of CSE identities configured for the user. */
  cseIdentities?: Array<CseIdentity>;
}

export const ListCseIdentitiesResponse: Schema.Schema<ListCseIdentitiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      cseIdentities: Schema.optional(Schema.Array(CseIdentity)),
    }),
  ).annotate({
    identifier: "ListCseIdentitiesResponse",
  }) as any as Schema.Schema<ListCseIdentitiesResponse>;

export interface ListDelegatesResponse {
  /** List of the user's delegates (with any verification status). If an account doesn't have delegates, this field doesn't appear. */
  delegates?: Array<Delegate>;
}

export const ListDelegatesResponse: Schema.Schema<ListDelegatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      delegates: Schema.optional(Schema.Array(Delegate)),
    }),
  ).annotate({
    identifier: "ListDelegatesResponse",
  }) as any as Schema.Schema<ListDelegatesResponse>;

export interface ObliterateCseKeyPairRequest {}

export const ObliterateCseKeyPairRequest: Schema.Schema<ObliterateCseKeyPairRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ObliterateCseKeyPairRequest",
  }) as any as Schema.Schema<ObliterateCseKeyPairRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetProfileUsersRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const GetProfileUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userId: Schema.String.pipe(T.HttpPath("userId")),
  },
).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/profile" }),
  svc,
) as unknown as Schema.Schema<GetProfileUsersRequest>;

export type GetProfileUsersResponse = Profile;
export const GetProfileUsersResponse = /*@__PURE__*/ /*#__PURE__*/ Profile;

export type GetProfileUsersError = DefaultErrors;

/** Gets the current user's Gmail profile. */
export const getProfileUsers: API.OperationMethod<
  GetProfileUsersRequest,
  GetProfileUsersResponse,
  GetProfileUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProfileUsersRequest,
  output: GetProfileUsersResponse,
  errors: [],
}));

export interface WatchUsersRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: WatchRequest;
}

export const WatchUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  body: Schema.optional(WatchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "gmail/v1/users/{userId}/watch",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<WatchUsersRequest>;

export type WatchUsersResponse = WatchResponse;
export const WatchUsersResponse = /*@__PURE__*/ /*#__PURE__*/ WatchResponse;

export type WatchUsersError = DefaultErrors;

/** Set up or update a push notification watch on the given user mailbox. */
export const watchUsers: API.OperationMethod<
  WatchUsersRequest,
  WatchUsersResponse,
  WatchUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: WatchUsersRequest,
  output: WatchUsersResponse,
  errors: [],
}));

export interface StopUsersRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const StopUsersRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({
    method: "POST",
    path: "gmail/v1/users/{userId}/stop",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<StopUsersRequest>;

export interface StopUsersResponse {}
export const StopUsersResponse: Schema.Schema<StopUsersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<StopUsersResponse>;

export type StopUsersError = DefaultErrors;

/** Stop receiving push notifications for the given user mailbox. */
export const stopUsers: API.OperationMethod<
  StopUsersRequest,
  StopUsersResponse,
  StopUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopUsersRequest,
  output: StopUsersResponse,
  errors: [],
}));

export interface UntrashUsersThreadsRequest {
  /** The ID of the thread to remove from Trash. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const UntrashUsersThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/threads/{id}/untrash",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UntrashUsersThreadsRequest>;

export type UntrashUsersThreadsResponse = Thread;
export const UntrashUsersThreadsResponse = /*@__PURE__*/ /*#__PURE__*/ Thread;

export type UntrashUsersThreadsError = DefaultErrors;

/** Removes the specified thread from the trash. Any messages that belong to the thread are also removed from the trash. */
export const untrashUsersThreads: API.OperationMethod<
  UntrashUsersThreadsRequest,
  UntrashUsersThreadsResponse,
  UntrashUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntrashUsersThreadsRequest,
  output: UntrashUsersThreadsResponse,
  errors: [],
}));

export interface DeleteUsersThreadsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** ID of the Thread to delete. */
  id: string;
}

export const DeleteUsersThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "gmail/v1/users/{userId}/threads/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersThreadsRequest>;

export interface DeleteUsersThreadsResponse {}
export const DeleteUsersThreadsResponse: Schema.Schema<DeleteUsersThreadsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersThreadsResponse>;

export type DeleteUsersThreadsError = DefaultErrors;

/** Immediately and permanently deletes the specified thread. Any messages that belong to the thread are also deleted. This operation cannot be undone. Prefer `threads.trash` instead. */
export const deleteUsersThreads: API.OperationMethod<
  DeleteUsersThreadsRequest,
  DeleteUsersThreadsResponse,
  DeleteUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersThreadsRequest,
  output: DeleteUsersThreadsResponse,
  errors: [],
}));

export interface TrashUsersThreadsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to Trash. */
  id: string;
}

export const TrashUsersThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/threads/{id}/trash",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TrashUsersThreadsRequest>;

export type TrashUsersThreadsResponse = Thread;
export const TrashUsersThreadsResponse = /*@__PURE__*/ /*#__PURE__*/ Thread;

export type TrashUsersThreadsError = DefaultErrors;

/** Moves the specified thread to the trash. Any messages that belong to the thread are also moved to the trash. */
export const trashUsersThreads: API.OperationMethod<
  TrashUsersThreadsRequest,
  TrashUsersThreadsResponse,
  TrashUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TrashUsersThreadsRequest,
  output: TrashUsersThreadsResponse,
  errors: [],
}));

export interface GetUsersThreadsRequest {
  /** The ID of the thread to retrieve. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The format to return the messages in. */
  format?: "full" | "metadata" | "minimal" | (string & {});
  /** When given and format is METADATA, only include headers specified. */
  metadataHeaders?: string[];
}

export const GetUsersThreadsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    format: Schema.optional(Schema.String).pipe(T.HttpQuery("format")),
    metadataHeaders: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("metadataHeaders"),
    ),
  },
).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/threads/{id}" }),
  svc,
) as unknown as Schema.Schema<GetUsersThreadsRequest>;

export type GetUsersThreadsResponse = Thread;
export const GetUsersThreadsResponse = /*@__PURE__*/ /*#__PURE__*/ Thread;

export type GetUsersThreadsError = DefaultErrors;

/** Gets the specified thread. */
export const getUsersThreads: API.OperationMethod<
  GetUsersThreadsRequest,
  GetUsersThreadsResponse,
  GetUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersThreadsRequest,
  output: GetUsersThreadsResponse,
  errors: [],
}));

export interface ModifyUsersThreadsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to modify. */
  id: string;
  /** Request body */
  body?: ModifyThreadRequest;
}

export const ModifyUsersThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ModifyThreadRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/threads/{id}/modify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyUsersThreadsRequest>;

export type ModifyUsersThreadsResponse = Thread;
export const ModifyUsersThreadsResponse = /*@__PURE__*/ /*#__PURE__*/ Thread;

export type ModifyUsersThreadsError = DefaultErrors;

/** Modifies the labels applied to the thread. This applies to all messages in the thread. */
export const modifyUsersThreads: API.OperationMethod<
  ModifyUsersThreadsRequest,
  ModifyUsersThreadsResponse,
  ModifyUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyUsersThreadsRequest,
  output: ModifyUsersThreadsResponse,
  errors: [],
}));

export interface ListUsersThreadsRequest {
  /** Maximum number of threads to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** Only return threads with labels that match all of the specified label IDs. */
  labelIds?: string[];
  /** Include threads from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope. */
  q?: string;
}

export const ListUsersThreadsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    labelIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("labelIds"),
    ),
    includeSpamTrash: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("includeSpamTrash"),
    ),
    q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/threads" }),
    svc,
  ) as unknown as Schema.Schema<ListUsersThreadsRequest>;

export type ListUsersThreadsResponse = ListThreadsResponse;
export const ListUsersThreadsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListThreadsResponse;

export type ListUsersThreadsError = DefaultErrors;

/** Lists the threads in the user's mailbox. */
export const listUsersThreads: API.PaginatedOperationMethod<
  ListUsersThreadsRequest,
  ListUsersThreadsResponse,
  ListUsersThreadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersThreadsRequest,
  output: ListUsersThreadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetUsersMessagesRequest {
  /** The ID of the message to retrieve. This ID is usually retrieved using `messages.list`. The ID is also contained in the result when a message is inserted (`messages.insert`) or imported (`messages.import`). */
  id: string;
  /** When given and format is `METADATA`, only include headers specified. */
  metadataHeaders?: string[];
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The format to return the message in. */
  format?: "minimal" | "full" | "raw" | "metadata" | (string & {});
}

export const GetUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    metadataHeaders: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("metadataHeaders"),
    ),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    format: Schema.optional(Schema.String).pipe(T.HttpQuery("format")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/messages/{id}" }),
    svc,
  ) as unknown as Schema.Schema<GetUsersMessagesRequest>;

export type GetUsersMessagesResponse = Message;
export const GetUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type GetUsersMessagesError = DefaultErrors;

/** Gets the specified message. */
export const getUsersMessages: API.OperationMethod<
  GetUsersMessagesRequest,
  GetUsersMessagesResponse,
  GetUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersMessagesRequest,
  output: GetUsersMessagesResponse,
  errors: [],
}));

export interface ImportUsersMessagesRequest {
  /** Source for Gmail's internal date of the message. */
  internalDateSource?: "receivedTime" | "dateHeader" | (string & {});
  /** Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox. */
  neverMarkSpam?: boolean;
  /** Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user. */
  processForCalendar?: boolean;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts. */
  deleted?: boolean;
  /** Request body */
  body?: Message;
}

export const ImportUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    internalDateSource: Schema.optional(Schema.String).pipe(
      T.HttpQuery("internalDateSource"),
    ),
    neverMarkSpam: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("neverMarkSpam"),
    ),
    processForCalendar: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("processForCalendar"),
    ),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportUsersMessagesRequest>;

export type ImportUsersMessagesResponse = Message;
export const ImportUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type ImportUsersMessagesError = DefaultErrors;

/** Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. This method doesn't perform SPF checks, so it might not work for some spam messages, such as those attempting to perform domain spoofing. This method does not send a message. Note that the maximum size of the message is 150MB. */
export const importUsersMessages: API.OperationMethod<
  ImportUsersMessagesRequest,
  ImportUsersMessagesResponse,
  ImportUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportUsersMessagesRequest,
  output: ImportUsersMessagesResponse,
  errors: [],
}));

export interface TrashUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to Trash. */
  id: string;
}

export const TrashUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/{id}/trash",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TrashUsersMessagesRequest>;

export type TrashUsersMessagesResponse = Message;
export const TrashUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type TrashUsersMessagesError = DefaultErrors;

/** Moves the specified message to the trash. */
export const trashUsersMessages: API.OperationMethod<
  TrashUsersMessagesRequest,
  TrashUsersMessagesResponse,
  TrashUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TrashUsersMessagesRequest,
  output: TrashUsersMessagesResponse,
  errors: [],
}));

export interface DeleteUsersMessagesRequest {
  /** The ID of the message to delete. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const DeleteUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "gmail/v1/users/{userId}/messages/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersMessagesRequest>;

export interface DeleteUsersMessagesResponse {}
export const DeleteUsersMessagesResponse: Schema.Schema<DeleteUsersMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersMessagesResponse>;

export type DeleteUsersMessagesError = DefaultErrors;

/** Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer `messages.trash` instead. */
export const deleteUsersMessages: API.OperationMethod<
  DeleteUsersMessagesRequest,
  DeleteUsersMessagesResponse,
  DeleteUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersMessagesRequest,
  output: DeleteUsersMessagesResponse,
  errors: [],
}));

export interface SendUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Message;
}

export const SendUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/send",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SendUsersMessagesRequest>;

export type SendUsersMessagesResponse = Message;
export const SendUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type SendUsersMessagesError = DefaultErrors;

/** Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. For example usage, see [Sending email](https://developers.google.com/workspace/gmail/api/guides/sending). */
export const sendUsersMessages: API.OperationMethod<
  SendUsersMessagesRequest,
  SendUsersMessagesResponse,
  SendUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendUsersMessagesRequest,
  output: SendUsersMessagesResponse,
  errors: [],
}));

export interface UntrashUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to remove from Trash. */
  id: string;
}

export const UntrashUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/{id}/untrash",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UntrashUsersMessagesRequest>;

export type UntrashUsersMessagesResponse = Message;
export const UntrashUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type UntrashUsersMessagesError = DefaultErrors;

/** Removes the specified message from the trash. */
export const untrashUsersMessages: API.OperationMethod<
  UntrashUsersMessagesRequest,
  UntrashUsersMessagesResponse,
  UntrashUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntrashUsersMessagesRequest,
  output: UntrashUsersMessagesResponse,
  errors: [],
}));

export interface ModifyUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to modify. */
  id: string;
  /** Request body */
  body?: ModifyMessageRequest;
}

export const ModifyUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(ModifyMessageRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/{id}/modify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyUsersMessagesRequest>;

export type ModifyUsersMessagesResponse = Message;
export const ModifyUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type ModifyUsersMessagesError = DefaultErrors;

/** Modifies the labels on the specified message. */
export const modifyUsersMessages: API.OperationMethod<
  ModifyUsersMessagesRequest,
  ModifyUsersMessagesResponse,
  ModifyUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyUsersMessagesRequest,
  output: ModifyUsersMessagesResponse,
  errors: [],
}));

export interface BatchDeleteUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: BatchDeleteMessagesRequest;
}

export const BatchDeleteUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(BatchDeleteMessagesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteUsersMessagesRequest>;

export interface BatchDeleteUsersMessagesResponse {}
export const BatchDeleteUsersMessagesResponse: Schema.Schema<BatchDeleteUsersMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<BatchDeleteUsersMessagesResponse>;

export type BatchDeleteUsersMessagesError = DefaultErrors;

/** Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all. */
export const batchDeleteUsersMessages: API.OperationMethod<
  BatchDeleteUsersMessagesRequest,
  BatchDeleteUsersMessagesResponse,
  BatchDeleteUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteUsersMessagesRequest,
  output: BatchDeleteUsersMessagesResponse,
  errors: [],
}));

export interface BatchModifyUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: BatchModifyMessagesRequest;
}

export const BatchModifyUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(BatchModifyMessagesRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages/batchModify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchModifyUsersMessagesRequest>;

export interface BatchModifyUsersMessagesResponse {}
export const BatchModifyUsersMessagesResponse: Schema.Schema<BatchModifyUsersMessagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<BatchModifyUsersMessagesResponse>;

export type BatchModifyUsersMessagesError = DefaultErrors;

/** Modifies the labels on the specified messages. */
export const batchModifyUsersMessages: API.OperationMethod<
  BatchModifyUsersMessagesRequest,
  BatchModifyUsersMessagesResponse,
  BatchModifyUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchModifyUsersMessagesRequest,
  output: BatchModifyUsersMessagesResponse,
  errors: [],
}));

export interface InsertUsersMessagesRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts. */
  deleted?: boolean;
  /** Source for Gmail's internal date of the message. */
  internalDateSource?: "receivedTime" | "dateHeader" | (string & {});
  /** Request body */
  body?: Message;
}

export const InsertUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    deleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleted")),
    internalDateSource: Schema.optional(Schema.String).pipe(
      T.HttpQuery("internalDateSource"),
    ),
    body: Schema.optional(Message).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/messages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertUsersMessagesRequest>;

export type InsertUsersMessagesResponse = Message;
export const InsertUsersMessagesResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type InsertUsersMessagesError = DefaultErrors;

/** Directly inserts a message into only this user's mailbox similar to `IMAP APPEND`, bypassing most scanning and classification. Does not send a message. */
export const insertUsersMessages: API.OperationMethod<
  InsertUsersMessagesRequest,
  InsertUsersMessagesResponse,
  InsertUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertUsersMessagesRequest,
  output: InsertUsersMessagesResponse,
  errors: [],
}));

export interface ListUsersMessagesRequest {
  /** Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Include messages from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope. */
  q?: string;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Only return messages with labels that match all of the specified label IDs. Messages in a thread might have labels that other messages in the same thread don't have. To learn more, see [Manage labels on messages and threads](https://developers.google.com/workspace/gmail/api/guides/labels#manage_labels_on_messages_threads). */
  labelIds?: string[];
}

export const ListUsersMessagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    includeSpamTrash: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("includeSpamTrash"),
    ),
    q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    labelIds: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("labelIds"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/messages" }),
    svc,
  ) as unknown as Schema.Schema<ListUsersMessagesRequest>;

export type ListUsersMessagesResponse = ListMessagesResponse;
export const ListUsersMessagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListMessagesResponse;

export type ListUsersMessagesError = DefaultErrors;

/** Lists the messages in the user's mailbox. For example usage, see [List Gmail messages](https://developers.google.com/workspace/gmail/api/guides/list-messages). */
export const listUsersMessages: API.PaginatedOperationMethod<
  ListUsersMessagesRequest,
  ListUsersMessagesResponse,
  ListUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersMessagesRequest,
  output: ListUsersMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetUsersMessagesAttachmentsRequest {
  /** The ID of the attachment. */
  id: string;
  /** The ID of the message containing the attachment. */
  messageId: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const GetUsersMessagesAttachmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    messageId: Schema.String.pipe(T.HttpPath("messageId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/messages/{messageId}/attachments/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersMessagesAttachmentsRequest>;

export type GetUsersMessagesAttachmentsResponse = MessagePartBody;
export const GetUsersMessagesAttachmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ MessagePartBody;

export type GetUsersMessagesAttachmentsError = DefaultErrors;

/** Gets the specified message attachment. */
export const getUsersMessagesAttachments: API.OperationMethod<
  GetUsersMessagesAttachmentsRequest,
  GetUsersMessagesAttachmentsResponse,
  GetUsersMessagesAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersMessagesAttachmentsRequest,
  output: GetUsersMessagesAttachmentsResponse,
  errors: [],
}));

export interface ListUsersHistoryRequest {
  /** Only return messages with a label matching the ID. */
  labelId?: string;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** History types to be returned by the function */
  historyTypes?:
    | "messageAdded"
    | "messageDeleted"
    | "labelAdded"
    | "labelRemoved"
    | (string & {})[];
  /** Required. Returns history records after the specified `startHistoryId`. The supplied `startHistoryId` should be obtained from the `historyId` of a message, thread, or previous `list` response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date `startHistoryId` typically returns an `HTTP 404` error code. A `historyId` is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an `HTTP 404` error response, your application should perform a full sync. If you receive no `nextPageToken` in the response, there are no updates to retrieve and you can store the returned `historyId` for a future request. */
  startHistoryId?: string;
  /** Maximum number of history records to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
}

export const ListUsersHistoryRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    labelId: Schema.optional(Schema.String).pipe(T.HttpQuery("labelId")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    historyTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("historyTypes"),
    ),
    startHistoryId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("startHistoryId"),
    ),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/history" }),
    svc,
  ) as unknown as Schema.Schema<ListUsersHistoryRequest>;

export type ListUsersHistoryResponse = ListHistoryResponse;
export const ListUsersHistoryResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListHistoryResponse;

export type ListUsersHistoryError = DefaultErrors;

/** Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing `historyId`). */
export const listUsersHistory: API.PaginatedOperationMethod<
  ListUsersHistoryRequest,
  ListUsersHistoryResponse,
  ListUsersHistoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersHistoryRequest,
  output: ListUsersHistoryResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdatePopUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: PopSettings;
}

export const UpdatePopUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(PopSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/pop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdatePopUsersSettingsRequest>;

export type UpdatePopUsersSettingsResponse = PopSettings;
export const UpdatePopUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PopSettings;

export type UpdatePopUsersSettingsError = DefaultErrors;

/** Updates POP settings. */
export const updatePopUsersSettings: API.OperationMethod<
  UpdatePopUsersSettingsRequest,
  UpdatePopUsersSettingsResponse,
  UpdatePopUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePopUsersSettingsRequest,
  output: UpdatePopUsersSettingsResponse,
  errors: [],
}));

export interface UpdateAutoForwardingUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: AutoForwarding;
}

export const UpdateAutoForwardingUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(AutoForwarding).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/autoForwarding",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateAutoForwardingUsersSettingsRequest>;

export type UpdateAutoForwardingUsersSettingsResponse = AutoForwarding;
export const UpdateAutoForwardingUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoForwarding;

export type UpdateAutoForwardingUsersSettingsError = DefaultErrors;

/** Updates the auto-forwarding setting for the specified account. A verified forwarding address must be specified when auto-forwarding is enabled. This method is only available to service account clients that have been delegated domain-wide authority. */
export const updateAutoForwardingUsersSettings: API.OperationMethod<
  UpdateAutoForwardingUsersSettingsRequest,
  UpdateAutoForwardingUsersSettingsResponse,
  UpdateAutoForwardingUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAutoForwardingUsersSettingsRequest,
  output: UpdateAutoForwardingUsersSettingsResponse,
  errors: [],
}));

export interface GetVacationUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetVacationUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/vacation",
    }),
    svc,
  ) as unknown as Schema.Schema<GetVacationUsersSettingsRequest>;

export type GetVacationUsersSettingsResponse = VacationSettings;
export const GetVacationUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ VacationSettings;

export type GetVacationUsersSettingsError = DefaultErrors;

/** Gets vacation responder settings. */
export const getVacationUsersSettings: API.OperationMethod<
  GetVacationUsersSettingsRequest,
  GetVacationUsersSettingsResponse,
  GetVacationUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVacationUsersSettingsRequest,
  output: GetVacationUsersSettingsResponse,
  errors: [],
}));

export interface UpdateVacationUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: VacationSettings;
}

export const UpdateVacationUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(VacationSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/vacation",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateVacationUsersSettingsRequest>;

export type UpdateVacationUsersSettingsResponse = VacationSettings;
export const UpdateVacationUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ VacationSettings;

export type UpdateVacationUsersSettingsError = DefaultErrors;

/** Updates vacation responder settings. */
export const updateVacationUsersSettings: API.OperationMethod<
  UpdateVacationUsersSettingsRequest,
  UpdateVacationUsersSettingsResponse,
  UpdateVacationUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVacationUsersSettingsRequest,
  output: UpdateVacationUsersSettingsResponse,
  errors: [],
}));

export interface GetLanguageUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetLanguageUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/language",
    }),
    svc,
  ) as unknown as Schema.Schema<GetLanguageUsersSettingsRequest>;

export type GetLanguageUsersSettingsResponse = LanguageSettings;
export const GetLanguageUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LanguageSettings;

export type GetLanguageUsersSettingsError = DefaultErrors;

/** Gets language settings. */
export const getLanguageUsersSettings: API.OperationMethod<
  GetLanguageUsersSettingsRequest,
  GetLanguageUsersSettingsResponse,
  GetLanguageUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetLanguageUsersSettingsRequest,
  output: GetLanguageUsersSettingsResponse,
  errors: [],
}));

export interface UpdateImapUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: ImapSettings;
}

export const UpdateImapUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(ImapSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/imap",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateImapUsersSettingsRequest>;

export type UpdateImapUsersSettingsResponse = ImapSettings;
export const UpdateImapUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ImapSettings;

export type UpdateImapUsersSettingsError = DefaultErrors;

/** Updates IMAP settings. */
export const updateImapUsersSettings: API.OperationMethod<
  UpdateImapUsersSettingsRequest,
  UpdateImapUsersSettingsResponse,
  UpdateImapUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateImapUsersSettingsRequest,
  output: UpdateImapUsersSettingsResponse,
  errors: [],
}));

export interface UpdateLanguageUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: LanguageSettings;
}

export const UpdateLanguageUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(LanguageSettings).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/language",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateLanguageUsersSettingsRequest>;

export type UpdateLanguageUsersSettingsResponse = LanguageSettings;
export const UpdateLanguageUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LanguageSettings;

export type UpdateLanguageUsersSettingsError = DefaultErrors;

/** Updates language settings. If successful, the return object contains the `displayLanguage` that was saved for the user, which may differ from the value passed into the request. This is because the requested `displayLanguage` may not be directly supported by Gmail but have a close variant that is, and so the variant may be chosen and saved instead. */
export const updateLanguageUsersSettings: API.OperationMethod<
  UpdateLanguageUsersSettingsRequest,
  UpdateLanguageUsersSettingsResponse,
  UpdateLanguageUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLanguageUsersSettingsRequest,
  output: UpdateLanguageUsersSettingsResponse,
  errors: [],
}));

export interface GetImapUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetImapUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/settings/imap" }),
    svc,
  ) as unknown as Schema.Schema<GetImapUsersSettingsRequest>;

export type GetImapUsersSettingsResponse = ImapSettings;
export const GetImapUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ImapSettings;

export type GetImapUsersSettingsError = DefaultErrors;

/** Gets IMAP settings. */
export const getImapUsersSettings: API.OperationMethod<
  GetImapUsersSettingsRequest,
  GetImapUsersSettingsResponse,
  GetImapUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetImapUsersSettingsRequest,
  output: GetImapUsersSettingsResponse,
  errors: [],
}));

export interface GetAutoForwardingUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetAutoForwardingUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/autoForwarding",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAutoForwardingUsersSettingsRequest>;

export type GetAutoForwardingUsersSettingsResponse = AutoForwarding;
export const GetAutoForwardingUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ AutoForwarding;

export type GetAutoForwardingUsersSettingsError = DefaultErrors;

/** Gets the auto-forwarding setting for the specified account. */
export const getAutoForwardingUsersSettings: API.OperationMethod<
  GetAutoForwardingUsersSettingsRequest,
  GetAutoForwardingUsersSettingsResponse,
  GetAutoForwardingUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAutoForwardingUsersSettingsRequest,
  output: GetAutoForwardingUsersSettingsResponse,
  errors: [],
}));

export interface GetPopUsersSettingsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetPopUsersSettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/settings/pop" }),
    svc,
  ) as unknown as Schema.Schema<GetPopUsersSettingsRequest>;

export type GetPopUsersSettingsResponse = PopSettings;
export const GetPopUsersSettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PopSettings;

export type GetPopUsersSettingsError = DefaultErrors;

/** Gets POP settings. */
export const getPopUsersSettings: API.OperationMethod<
  GetPopUsersSettingsRequest,
  GetPopUsersSettingsResponse,
  GetPopUsersSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPopUsersSettingsRequest,
  output: GetPopUsersSettingsResponse,
  errors: [],
}));

export interface ListUsersSettingsCseIdentitiesRequest {
  /** The number of identities to return. If not provided, the page size will default to 20 entries. */
  pageSize?: number;
  /** Pagination token indicating which page of identities to return. If the token is not supplied, then the API will return the first page of results. */
  pageToken?: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
}

export const ListUsersSettingsCseIdentitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/cse/identities",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsCseIdentitiesRequest>;

export type ListUsersSettingsCseIdentitiesResponse = ListCseIdentitiesResponse;
export const ListUsersSettingsCseIdentitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCseIdentitiesResponse;

export type ListUsersSettingsCseIdentitiesError = DefaultErrors;

/** Lists the client-side encrypted identities for an authenticated user. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const listUsersSettingsCseIdentities: API.PaginatedOperationMethod<
  ListUsersSettingsCseIdentitiesRequest,
  ListUsersSettingsCseIdentitiesResponse,
  ListUsersSettingsCseIdentitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersSettingsCseIdentitiesRequest,
  output: ListUsersSettingsCseIdentitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchUsersSettingsCseIdentitiesRequest {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The email address of the client-side encryption identity to update. */
  emailAddress: string;
  /** Request body */
  body?: CseIdentity;
}

export const PatchUsersSettingsCseIdentitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    emailAddress: Schema.String.pipe(T.HttpPath("emailAddress")),
    body: Schema.optional(CseIdentity).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUsersSettingsCseIdentitiesRequest>;

export type PatchUsersSettingsCseIdentitiesResponse = CseIdentity;
export const PatchUsersSettingsCseIdentitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseIdentity;

export type PatchUsersSettingsCseIdentitiesError = DefaultErrors;

/** Associates a different key pair with an existing client-side encryption identity. The updated key pair must validate against Google's [S/MIME certificate profiles](https://support.google.com/a/answer/7300887). For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const patchUsersSettingsCseIdentities: API.OperationMethod<
  PatchUsersSettingsCseIdentitiesRequest,
  PatchUsersSettingsCseIdentitiesResponse,
  PatchUsersSettingsCseIdentitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersSettingsCseIdentitiesRequest,
  output: PatchUsersSettingsCseIdentitiesResponse,
  errors: [],
}));

export interface GetUsersSettingsCseIdentitiesRequest {
  /** The primary email address associated with the client-side encryption identity configuration that's retrieved. */
  cseEmailAddress: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
}

export const GetUsersSettingsCseIdentitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cseEmailAddress: Schema.String.pipe(T.HttpPath("cseEmailAddress")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsCseIdentitiesRequest>;

export type GetUsersSettingsCseIdentitiesResponse = CseIdentity;
export const GetUsersSettingsCseIdentitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseIdentity;

export type GetUsersSettingsCseIdentitiesError = DefaultErrors;

/** Retrieves a client-side encryption identity configuration. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const getUsersSettingsCseIdentities: API.OperationMethod<
  GetUsersSettingsCseIdentitiesRequest,
  GetUsersSettingsCseIdentitiesResponse,
  GetUsersSettingsCseIdentitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsCseIdentitiesRequest,
  output: GetUsersSettingsCseIdentitiesResponse,
  errors: [],
}));

export interface DeleteUsersSettingsCseIdentitiesRequest {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The primary email address associated with the client-side encryption identity configuration that's removed. */
  cseEmailAddress: string;
}

export const DeleteUsersSettingsCseIdentitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    cseEmailAddress: Schema.String.pipe(T.HttpPath("cseEmailAddress")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsCseIdentitiesRequest>;

export interface DeleteUsersSettingsCseIdentitiesResponse {}
export const DeleteUsersSettingsCseIdentitiesResponse: Schema.Schema<DeleteUsersSettingsCseIdentitiesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsCseIdentitiesResponse>;

export type DeleteUsersSettingsCseIdentitiesError = DefaultErrors;

/** Deletes a client-side encryption identity. The authenticated user can no longer use the identity to send encrypted messages. You cannot restore the identity after you delete it. Instead, use the CreateCseIdentity method to create another identity with the same configuration. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const deleteUsersSettingsCseIdentities: API.OperationMethod<
  DeleteUsersSettingsCseIdentitiesRequest,
  DeleteUsersSettingsCseIdentitiesResponse,
  DeleteUsersSettingsCseIdentitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsCseIdentitiesRequest,
  output: DeleteUsersSettingsCseIdentitiesResponse,
  errors: [],
}));

export interface CreateUsersSettingsCseIdentitiesRequest {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** Request body */
  body?: CseIdentity;
}

export const CreateUsersSettingsCseIdentitiesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(CseIdentity).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/cse/identities",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsCseIdentitiesRequest>;

export type CreateUsersSettingsCseIdentitiesResponse = CseIdentity;
export const CreateUsersSettingsCseIdentitiesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseIdentity;

export type CreateUsersSettingsCseIdentitiesError = DefaultErrors;

/** Creates and configures a client-side encryption identity that's authorized to send mail from the user account. Google publishes the S/MIME certificate to a shared domain-wide directory so that people within a Google Workspace organization can encrypt and send mail to the identity. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const createUsersSettingsCseIdentities: API.OperationMethod<
  CreateUsersSettingsCseIdentitiesRequest,
  CreateUsersSettingsCseIdentitiesResponse,
  CreateUsersSettingsCseIdentitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsCseIdentitiesRequest,
  output: CreateUsersSettingsCseIdentitiesResponse,
  errors: [],
}));

export interface ObliterateUsersSettingsCseKeypairsRequest {
  /** The identifier of the key pair to obliterate. */
  keyPairId: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** Request body */
  body?: ObliterateCseKeyPairRequest;
}

export const ObliterateUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyPairId: Schema.String.pipe(T.HttpPath("keyPairId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(ObliterateCseKeyPairRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ObliterateUsersSettingsCseKeypairsRequest>;

export interface ObliterateUsersSettingsCseKeypairsResponse {}
export const ObliterateUsersSettingsCseKeypairsResponse: Schema.Schema<ObliterateUsersSettingsCseKeypairsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<ObliterateUsersSettingsCseKeypairsResponse>;

export type ObliterateUsersSettingsCseKeypairsError = DefaultErrors;

/** Deletes a client-side encryption key pair permanently and immediately. You can only permanently delete key pairs that have been turned off for more than 30 days. To turn off a key pair, use the DisableCseKeyPair method. Gmail can't restore or decrypt any messages that were encrypted by an obliterated key. Authenticated users and Google Workspace administrators lose access to reading the encrypted messages. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const obliterateUsersSettingsCseKeypairs: API.OperationMethod<
  ObliterateUsersSettingsCseKeypairsRequest,
  ObliterateUsersSettingsCseKeypairsResponse,
  ObliterateUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ObliterateUsersSettingsCseKeypairsRequest,
  output: ObliterateUsersSettingsCseKeypairsResponse,
  errors: [],
}));

export interface ListUsersSettingsCseKeypairsRequest {
  /** Pagination token indicating which page of key pairs to return. If the token is not supplied, then the API will return the first page of results. */
  pageToken?: string;
  /** The number of key pairs to return. If not provided, the page size will default to 20 entries. */
  pageSize?: number;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
}

export const ListUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsCseKeypairsRequest>;

export type ListUsersSettingsCseKeypairsResponse = ListCseKeyPairsResponse;
export const ListUsersSettingsCseKeypairsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCseKeyPairsResponse;

export type ListUsersSettingsCseKeypairsError = DefaultErrors;

/** Lists client-side encryption key pairs for an authenticated user. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const listUsersSettingsCseKeypairs: API.PaginatedOperationMethod<
  ListUsersSettingsCseKeypairsRequest,
  ListUsersSettingsCseKeypairsResponse,
  ListUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersSettingsCseKeypairsRequest,
  output: ListUsersSettingsCseKeypairsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface EnableUsersSettingsCseKeypairsRequest {
  /** The identifier of the key pair to turn on. */
  keyPairId: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** Request body */
  body?: EnableCseKeyPairRequest;
}

export const EnableUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyPairId: Schema.String.pipe(T.HttpPath("keyPairId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(EnableCseKeyPairRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<EnableUsersSettingsCseKeypairsRequest>;

export type EnableUsersSettingsCseKeypairsResponse = CseKeyPair;
export const EnableUsersSettingsCseKeypairsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseKeyPair;

export type EnableUsersSettingsCseKeypairsError = DefaultErrors;

/** Turns on a client-side encryption key pair that was turned off. The key pair becomes active again for any associated client-side encryption identities. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const enableUsersSettingsCseKeypairs: API.OperationMethod<
  EnableUsersSettingsCseKeypairsRequest,
  EnableUsersSettingsCseKeypairsResponse,
  EnableUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableUsersSettingsCseKeypairsRequest,
  output: EnableUsersSettingsCseKeypairsResponse,
  errors: [],
}));

export interface GetUsersSettingsCseKeypairsRequest {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The identifier of the key pair to retrieve. */
  keyPairId: string;
}

export const GetUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    keyPairId: Schema.String.pipe(T.HttpPath("keyPairId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsCseKeypairsRequest>;

export type GetUsersSettingsCseKeypairsResponse = CseKeyPair;
export const GetUsersSettingsCseKeypairsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseKeyPair;

export type GetUsersSettingsCseKeypairsError = DefaultErrors;

/** Retrieves an existing client-side encryption key pair. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const getUsersSettingsCseKeypairs: API.OperationMethod<
  GetUsersSettingsCseKeypairsRequest,
  GetUsersSettingsCseKeypairsResponse,
  GetUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsCseKeypairsRequest,
  output: GetUsersSettingsCseKeypairsResponse,
  errors: [],
}));

export interface CreateUsersSettingsCseKeypairsRequest {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** Request body */
  body?: CseKeyPair;
}

export const CreateUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(CseKeyPair).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsCseKeypairsRequest>;

export type CreateUsersSettingsCseKeypairsResponse = CseKeyPair;
export const CreateUsersSettingsCseKeypairsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseKeyPair;

export type CreateUsersSettingsCseKeypairsError = DefaultErrors;

/** Creates and uploads a client-side encryption S/MIME public key certificate chain and private key metadata for the authenticated user. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const createUsersSettingsCseKeypairs: API.OperationMethod<
  CreateUsersSettingsCseKeypairsRequest,
  CreateUsersSettingsCseKeypairsResponse,
  CreateUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsCseKeypairsRequest,
  output: CreateUsersSettingsCseKeypairsResponse,
  errors: [],
}));

export interface DisableUsersSettingsCseKeypairsRequest {
  /** The identifier of the key pair to turn off. */
  keyPairId: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** Request body */
  body?: DisableCseKeyPairRequest;
}

export const DisableUsersSettingsCseKeypairsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyPairId: Schema.String.pipe(T.HttpPath("keyPairId")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(DisableCseKeyPairRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DisableUsersSettingsCseKeypairsRequest>;

export type DisableUsersSettingsCseKeypairsResponse = CseKeyPair;
export const DisableUsersSettingsCseKeypairsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CseKeyPair;

export type DisableUsersSettingsCseKeypairsError = DefaultErrors;

/** Turns off a client-side encryption key pair. The authenticated user can no longer use the key pair to decrypt incoming CSE message texts or sign outgoing CSE mail. To regain access, use the EnableCseKeyPair to turn on the key pair. After 30 days, you can permanently delete the key pair by using the ObliterateCseKeyPair method. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured. */
export const disableUsersSettingsCseKeypairs: API.OperationMethod<
  DisableUsersSettingsCseKeypairsRequest,
  DisableUsersSettingsCseKeypairsResponse,
  DisableUsersSettingsCseKeypairsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableUsersSettingsCseKeypairsRequest,
  output: DisableUsersSettingsCseKeypairsResponse,
  errors: [],
}));

export interface ListUsersSettingsFiltersRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const ListUsersSettingsFiltersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/settings/filters" }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsFiltersRequest>;

export type ListUsersSettingsFiltersResponse = ListFiltersResponse;
export const ListUsersSettingsFiltersResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListFiltersResponse;

export type ListUsersSettingsFiltersError = DefaultErrors;

/** Lists the message filters of a Gmail user. */
export const listUsersSettingsFilters: API.OperationMethod<
  ListUsersSettingsFiltersRequest,
  ListUsersSettingsFiltersResponse,
  ListUsersSettingsFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersSettingsFiltersRequest,
  output: ListUsersSettingsFiltersResponse,
  errors: [],
}));

export interface CreateUsersSettingsFiltersRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Filter;
}

export const CreateUsersSettingsFiltersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Filter).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/filters",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsFiltersRequest>;

export type CreateUsersSettingsFiltersResponse = Filter;
export const CreateUsersSettingsFiltersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Filter;

export type CreateUsersSettingsFiltersError = DefaultErrors;

/** Creates a filter. Note: you can only create a maximum of 1,000 filters. */
export const createUsersSettingsFilters: API.OperationMethod<
  CreateUsersSettingsFiltersRequest,
  CreateUsersSettingsFiltersResponse,
  CreateUsersSettingsFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsFiltersRequest,
  output: CreateUsersSettingsFiltersResponse,
  errors: [],
}));

export interface GetUsersSettingsFiltersRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the filter to be fetched. */
  id: string;
}

export const GetUsersSettingsFiltersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/filters/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsFiltersRequest>;

export type GetUsersSettingsFiltersResponse = Filter;
export const GetUsersSettingsFiltersResponse =
  /*@__PURE__*/ /*#__PURE__*/ Filter;

export type GetUsersSettingsFiltersError = DefaultErrors;

/** Gets a filter. */
export const getUsersSettingsFilters: API.OperationMethod<
  GetUsersSettingsFiltersRequest,
  GetUsersSettingsFiltersResponse,
  GetUsersSettingsFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsFiltersRequest,
  output: GetUsersSettingsFiltersResponse,
  errors: [],
}));

export interface DeleteUsersSettingsFiltersRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the filter to be deleted. */
  id: string;
}

export const DeleteUsersSettingsFiltersRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/filters/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsFiltersRequest>;

export interface DeleteUsersSettingsFiltersResponse {}
export const DeleteUsersSettingsFiltersResponse: Schema.Schema<DeleteUsersSettingsFiltersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsFiltersResponse>;

export type DeleteUsersSettingsFiltersError = DefaultErrors;

/** Immediately and permanently deletes the specified filter. */
export const deleteUsersSettingsFilters: API.OperationMethod<
  DeleteUsersSettingsFiltersRequest,
  DeleteUsersSettingsFiltersResponse,
  DeleteUsersSettingsFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsFiltersRequest,
  output: DeleteUsersSettingsFiltersResponse,
  errors: [],
}));

export interface GetUsersSettingsSendAsRequest {
  /** The send-as alias to be retrieved. */
  sendAsEmail: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsSendAsRequest>;

export type GetUsersSettingsSendAsResponse = SendAs;
export const GetUsersSettingsSendAsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SendAs;

export type GetUsersSettingsSendAsError = DefaultErrors;

/** Gets the specified send-as alias. Fails with an HTTP 404 error if the specified address is not a member of the collection. */
export const getUsersSettingsSendAs: API.OperationMethod<
  GetUsersSettingsSendAsRequest,
  GetUsersSettingsSendAsResponse,
  GetUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsSendAsRequest,
  output: GetUsersSettingsSendAsResponse,
  errors: [],
}));

export interface DeleteUsersSettingsSendAsRequest {
  /** The send-as alias to be deleted. */
  sendAsEmail: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const DeleteUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsSendAsRequest>;

export interface DeleteUsersSettingsSendAsResponse {}
export const DeleteUsersSettingsSendAsResponse: Schema.Schema<DeleteUsersSettingsSendAsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsSendAsResponse>;

export type DeleteUsersSettingsSendAsError = DefaultErrors;

/** Deletes the specified send-as alias. Revokes any verification that may have been required for using it. This method is only available to service account clients that have been delegated domain-wide authority. */
export const deleteUsersSettingsSendAs: API.OperationMethod<
  DeleteUsersSettingsSendAsRequest,
  DeleteUsersSettingsSendAsResponse,
  DeleteUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsSendAsRequest,
  output: DeleteUsersSettingsSendAsResponse,
  errors: [],
}));

export interface VerifyUsersSettingsSendAsRequest {
  /** The send-as alias to be verified. */
  sendAsEmail: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const VerifyUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<VerifyUsersSettingsSendAsRequest>;

export interface VerifyUsersSettingsSendAsResponse {}
export const VerifyUsersSettingsSendAsResponse: Schema.Schema<VerifyUsersSettingsSendAsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<VerifyUsersSettingsSendAsResponse>;

export type VerifyUsersSettingsSendAsError = DefaultErrors;

/** Sends a verification email to the specified send-as alias address. The verification status must be `pending`. This method is only available to service account clients that have been delegated domain-wide authority. */
export const verifyUsersSettingsSendAs: API.OperationMethod<
  VerifyUsersSettingsSendAsRequest,
  VerifyUsersSettingsSendAsResponse,
  VerifyUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: VerifyUsersSettingsSendAsRequest,
  output: VerifyUsersSettingsSendAsResponse,
  errors: [],
}));

export interface UpdateUsersSettingsSendAsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The send-as alias to be updated. */
  sendAsEmail: string;
  /** Request body */
  body?: SendAs;
}

export const UpdateUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    body: Schema.optional(SendAs).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateUsersSettingsSendAsRequest>;

export type UpdateUsersSettingsSendAsResponse = SendAs;
export const UpdateUsersSettingsSendAsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SendAs;

export type UpdateUsersSettingsSendAsError = DefaultErrors;

/** Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority. */
export const updateUsersSettingsSendAs: API.OperationMethod<
  UpdateUsersSettingsSendAsRequest,
  UpdateUsersSettingsSendAsResponse,
  UpdateUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUsersSettingsSendAsRequest,
  output: UpdateUsersSettingsSendAsResponse,
  errors: [],
}));

export interface PatchUsersSettingsSendAsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The send-as alias to be updated. */
  sendAsEmail: string;
  /** Request body */
  body?: SendAs;
}

export const PatchUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    body: Schema.optional(SendAs).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUsersSettingsSendAsRequest>;

export type PatchUsersSettingsSendAsResponse = SendAs;
export const PatchUsersSettingsSendAsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SendAs;

export type PatchUsersSettingsSendAsError = DefaultErrors;

/** Patch the specified send-as alias. */
export const patchUsersSettingsSendAs: API.OperationMethod<
  PatchUsersSettingsSendAsRequest,
  PatchUsersSettingsSendAsResponse,
  PatchUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersSettingsSendAsRequest,
  output: PatchUsersSettingsSendAsResponse,
  errors: [],
}));

export interface ListUsersSettingsSendAsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const ListUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "GET", path: "gmail/v1/users/{userId}/settings/sendAs" }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsSendAsRequest>;

export type ListUsersSettingsSendAsResponse = ListSendAsResponse;
export const ListUsersSettingsSendAsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSendAsResponse;

export type ListUsersSettingsSendAsError = DefaultErrors;

/** Lists the send-as aliases for the specified account. The result includes the primary send-as address associated with the account as well as any custom "from" aliases. */
export const listUsersSettingsSendAs: API.OperationMethod<
  ListUsersSettingsSendAsRequest,
  ListUsersSettingsSendAsResponse,
  ListUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersSettingsSendAsRequest,
  output: ListUsersSettingsSendAsResponse,
  errors: [],
}));

export interface CreateUsersSettingsSendAsRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: SendAs;
}

export const CreateUsersSettingsSendAsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(SendAs).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/sendAs",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsSendAsRequest>;

export type CreateUsersSettingsSendAsResponse = SendAs;
export const CreateUsersSettingsSendAsResponse =
  /*@__PURE__*/ /*#__PURE__*/ SendAs;

export type CreateUsersSettingsSendAsError = DefaultErrors;

/** Creates a custom "from" send-as alias. If an SMTP MSA is specified, Gmail will attempt to connect to the SMTP service to validate the configuration before creating the alias. If ownership verification is required for the alias, a message will be sent to the email address and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. This method is only available to service account clients that have been delegated domain-wide authority. */
export const createUsersSettingsSendAs: API.OperationMethod<
  CreateUsersSettingsSendAsRequest,
  CreateUsersSettingsSendAsResponse,
  CreateUsersSettingsSendAsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsSendAsRequest,
  output: CreateUsersSettingsSendAsResponse,
  errors: [],
}));

export interface DeleteUsersSettingsSendAsSmimeInfoRequest {
  /** The immutable ID for the SmimeInfo. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
}

export const DeleteUsersSettingsSendAsSmimeInfoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsSendAsSmimeInfoRequest>;

export interface DeleteUsersSettingsSendAsSmimeInfoResponse {}
export const DeleteUsersSettingsSendAsSmimeInfoResponse: Schema.Schema<DeleteUsersSettingsSendAsSmimeInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsSendAsSmimeInfoResponse>;

export type DeleteUsersSettingsSendAsSmimeInfoError = DefaultErrors;

/** Deletes the specified S/MIME config for the specified send-as alias. */
export const deleteUsersSettingsSendAsSmimeInfo: API.OperationMethod<
  DeleteUsersSettingsSendAsSmimeInfoRequest,
  DeleteUsersSettingsSendAsSmimeInfoResponse,
  DeleteUsersSettingsSendAsSmimeInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsSendAsSmimeInfoRequest,
  output: DeleteUsersSettingsSendAsSmimeInfoResponse,
  errors: [],
}));

export interface ListUsersSettingsSendAsSmimeInfoRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
}

export const ListUsersSettingsSendAsSmimeInfoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsSendAsSmimeInfoRequest>;

export type ListUsersSettingsSendAsSmimeInfoResponse = ListSmimeInfoResponse;
export const ListUsersSettingsSendAsSmimeInfoResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSmimeInfoResponse;

export type ListUsersSettingsSendAsSmimeInfoError = DefaultErrors;

/** Lists S/MIME configs for the specified send-as alias. */
export const listUsersSettingsSendAsSmimeInfo: API.OperationMethod<
  ListUsersSettingsSendAsSmimeInfoRequest,
  ListUsersSettingsSendAsSmimeInfoResponse,
  ListUsersSettingsSendAsSmimeInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersSettingsSendAsSmimeInfoRequest,
  output: ListUsersSettingsSendAsSmimeInfoResponse,
  errors: [],
}));

export interface InsertUsersSettingsSendAsSmimeInfoRequest {
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: SmimeInfo;
}

export const InsertUsersSettingsSendAsSmimeInfoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(SmimeInfo).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<InsertUsersSettingsSendAsSmimeInfoRequest>;

export type InsertUsersSettingsSendAsSmimeInfoResponse = SmimeInfo;
export const InsertUsersSettingsSendAsSmimeInfoResponse =
  /*@__PURE__*/ /*#__PURE__*/ SmimeInfo;

export type InsertUsersSettingsSendAsSmimeInfoError = DefaultErrors;

/** Insert (upload) the given S/MIME config for the specified send-as alias. Note that pkcs12 format is required for the key. */
export const insertUsersSettingsSendAsSmimeInfo: API.OperationMethod<
  InsertUsersSettingsSendAsSmimeInfoRequest,
  InsertUsersSettingsSendAsSmimeInfoResponse,
  InsertUsersSettingsSendAsSmimeInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InsertUsersSettingsSendAsSmimeInfoRequest,
  output: InsertUsersSettingsSendAsSmimeInfoResponse,
  errors: [],
}));

export interface SetDefaultUsersSettingsSendAsSmimeInfoRequest {
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The immutable ID for the SmimeInfo. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const SetDefaultUsersSettingsSendAsSmimeInfoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetDefaultUsersSettingsSendAsSmimeInfoRequest>;

export interface SetDefaultUsersSettingsSendAsSmimeInfoResponse {}
export const SetDefaultUsersSettingsSendAsSmimeInfoResponse: Schema.Schema<SetDefaultUsersSettingsSendAsSmimeInfoResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<SetDefaultUsersSettingsSendAsSmimeInfoResponse>;

export type SetDefaultUsersSettingsSendAsSmimeInfoError = DefaultErrors;

/** Sets the default S/MIME config for the specified send-as alias. */
export const setDefaultUsersSettingsSendAsSmimeInfo: API.OperationMethod<
  SetDefaultUsersSettingsSendAsSmimeInfoRequest,
  SetDefaultUsersSettingsSendAsSmimeInfoResponse,
  SetDefaultUsersSettingsSendAsSmimeInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetDefaultUsersSettingsSendAsSmimeInfoRequest,
  output: SetDefaultUsersSettingsSendAsSmimeInfoResponse,
  errors: [],
}));

export interface GetUsersSettingsSendAsSmimeInfoRequest {
  /** The immutable ID for the SmimeInfo. */
  id: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const GetUsersSettingsSendAsSmimeInfoRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    sendAsEmail: Schema.String.pipe(T.HttpPath("sendAsEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsSendAsSmimeInfoRequest>;

export type GetUsersSettingsSendAsSmimeInfoResponse = SmimeInfo;
export const GetUsersSettingsSendAsSmimeInfoResponse =
  /*@__PURE__*/ /*#__PURE__*/ SmimeInfo;

export type GetUsersSettingsSendAsSmimeInfoError = DefaultErrors;

/** Gets the specified S/MIME config for the specified send-as alias. */
export const getUsersSettingsSendAsSmimeInfo: API.OperationMethod<
  GetUsersSettingsSendAsSmimeInfoRequest,
  GetUsersSettingsSendAsSmimeInfoResponse,
  GetUsersSettingsSendAsSmimeInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsSendAsSmimeInfoRequest,
  output: GetUsersSettingsSendAsSmimeInfoResponse,
  errors: [],
}));

export interface DeleteUsersSettingsForwardingAddressesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The forwarding address to be deleted. */
  forwardingEmail: string;
}

export const DeleteUsersSettingsForwardingAddressesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    forwardingEmail: Schema.String.pipe(T.HttpPath("forwardingEmail")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsForwardingAddressesRequest>;

export interface DeleteUsersSettingsForwardingAddressesResponse {}
export const DeleteUsersSettingsForwardingAddressesResponse: Schema.Schema<DeleteUsersSettingsForwardingAddressesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsForwardingAddressesResponse>;

export type DeleteUsersSettingsForwardingAddressesError = DefaultErrors;

/** Deletes the specified forwarding address and revokes any verification that may have been required. This method is only available to service account clients that have been delegated domain-wide authority. */
export const deleteUsersSettingsForwardingAddresses: API.OperationMethod<
  DeleteUsersSettingsForwardingAddressesRequest,
  DeleteUsersSettingsForwardingAddressesResponse,
  DeleteUsersSettingsForwardingAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsForwardingAddressesRequest,
  output: DeleteUsersSettingsForwardingAddressesResponse,
  errors: [],
}));

export interface GetUsersSettingsForwardingAddressesRequest {
  /** The forwarding address to be retrieved. */
  forwardingEmail: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetUsersSettingsForwardingAddressesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    forwardingEmail: Schema.String.pipe(T.HttpPath("forwardingEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsForwardingAddressesRequest>;

export type GetUsersSettingsForwardingAddressesResponse = ForwardingAddress;
export const GetUsersSettingsForwardingAddressesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ForwardingAddress;

export type GetUsersSettingsForwardingAddressesError = DefaultErrors;

/** Gets the specified forwarding address. */
export const getUsersSettingsForwardingAddresses: API.OperationMethod<
  GetUsersSettingsForwardingAddressesRequest,
  GetUsersSettingsForwardingAddressesResponse,
  GetUsersSettingsForwardingAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsForwardingAddressesRequest,
  output: GetUsersSettingsForwardingAddressesResponse,
  errors: [],
}));

export interface ListUsersSettingsForwardingAddressesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const ListUsersSettingsForwardingAddressesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/forwardingAddresses",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsForwardingAddressesRequest>;

export type ListUsersSettingsForwardingAddressesResponse =
  ListForwardingAddressesResponse;
export const ListUsersSettingsForwardingAddressesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListForwardingAddressesResponse;

export type ListUsersSettingsForwardingAddressesError = DefaultErrors;

/** Lists the forwarding addresses for the specified account. */
export const listUsersSettingsForwardingAddresses: API.OperationMethod<
  ListUsersSettingsForwardingAddressesRequest,
  ListUsersSettingsForwardingAddressesResponse,
  ListUsersSettingsForwardingAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersSettingsForwardingAddressesRequest,
  output: ListUsersSettingsForwardingAddressesResponse,
  errors: [],
}));

export interface CreateUsersSettingsForwardingAddressesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: ForwardingAddress;
}

export const CreateUsersSettingsForwardingAddressesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(ForwardingAddress).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/forwardingAddresses",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsForwardingAddressesRequest>;

export type CreateUsersSettingsForwardingAddressesResponse = ForwardingAddress;
export const CreateUsersSettingsForwardingAddressesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ForwardingAddress;

export type CreateUsersSettingsForwardingAddressesError = DefaultErrors;

/** Creates a forwarding address. If ownership verification is required, a message will be sent to the recipient and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. This method is only available to service account clients that have been delegated domain-wide authority. */
export const createUsersSettingsForwardingAddresses: API.OperationMethod<
  CreateUsersSettingsForwardingAddressesRequest,
  CreateUsersSettingsForwardingAddressesResponse,
  CreateUsersSettingsForwardingAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsForwardingAddressesRequest,
  output: CreateUsersSettingsForwardingAddressesResponse,
  errors: [],
}));

export interface CreateUsersSettingsDelegatesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Delegate;
}

export const CreateUsersSettingsDelegatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Delegate).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/settings/delegates",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersSettingsDelegatesRequest>;

export type CreateUsersSettingsDelegatesResponse = Delegate;
export const CreateUsersSettingsDelegatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Delegate;

export type CreateUsersSettingsDelegatesError = DefaultErrors;

/** Adds a delegate with its verification status set directly to `accepted`, without sending any verification email. The delegate user must be a member of the same Google Workspace organization as the delegator user. Gmail imposes limitations on the number of delegates and delegators each user in a Google Workspace organization can have. These limits depend on your organization, but in general each user can have up to 25 delegates and up to 10 delegators. Note that a delegate user must be referred to by their primary email address, and not an email alias. Also note that when a new delegate is created, there may be up to a one minute delay before the new delegate is available for use. This method is only available to service account clients that have been delegated domain-wide authority. */
export const createUsersSettingsDelegates: API.OperationMethod<
  CreateUsersSettingsDelegatesRequest,
  CreateUsersSettingsDelegatesResponse,
  CreateUsersSettingsDelegatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersSettingsDelegatesRequest,
  output: CreateUsersSettingsDelegatesResponse,
  errors: [],
}));

export interface GetUsersSettingsDelegatesRequest {
  /** The email address of the user whose delegate relationship is to be retrieved. */
  delegateEmail: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const GetUsersSettingsDelegatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delegateEmail: Schema.String.pipe(T.HttpPath("delegateEmail")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/delegates/{delegateEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetUsersSettingsDelegatesRequest>;

export type GetUsersSettingsDelegatesResponse = Delegate;
export const GetUsersSettingsDelegatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Delegate;

export type GetUsersSettingsDelegatesError = DefaultErrors;

/** Gets the specified delegate. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority. */
export const getUsersSettingsDelegates: API.OperationMethod<
  GetUsersSettingsDelegatesRequest,
  GetUsersSettingsDelegatesResponse,
  GetUsersSettingsDelegatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersSettingsDelegatesRequest,
  output: GetUsersSettingsDelegatesResponse,
  errors: [],
}));

export interface DeleteUsersSettingsDelegatesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The email address of the user to be removed as a delegate. */
  delegateEmail: string;
}

export const DeleteUsersSettingsDelegatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    delegateEmail: Schema.String.pipe(T.HttpPath("delegateEmail")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "gmail/v1/users/{userId}/settings/delegates/{delegateEmail}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersSettingsDelegatesRequest>;

export interface DeleteUsersSettingsDelegatesResponse {}
export const DeleteUsersSettingsDelegatesResponse: Schema.Schema<DeleteUsersSettingsDelegatesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersSettingsDelegatesResponse>;

export type DeleteUsersSettingsDelegatesError = DefaultErrors;

/** Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority. */
export const deleteUsersSettingsDelegates: API.OperationMethod<
  DeleteUsersSettingsDelegatesRequest,
  DeleteUsersSettingsDelegatesResponse,
  DeleteUsersSettingsDelegatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersSettingsDelegatesRequest,
  output: DeleteUsersSettingsDelegatesResponse,
  errors: [],
}));

export interface ListUsersSettingsDelegatesRequest {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
}

export const ListUsersSettingsDelegatesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "gmail/v1/users/{userId}/settings/delegates",
    }),
    svc,
  ) as unknown as Schema.Schema<ListUsersSettingsDelegatesRequest>;

export type ListUsersSettingsDelegatesResponse = ListDelegatesResponse;
export const ListUsersSettingsDelegatesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDelegatesResponse;

export type ListUsersSettingsDelegatesError = DefaultErrors;

/** Lists the delegates for the specified account. This method is only available to service account clients that have been delegated domain-wide authority. */
export const listUsersSettingsDelegates: API.OperationMethod<
  ListUsersSettingsDelegatesRequest,
  ListUsersSettingsDelegatesResponse,
  ListUsersSettingsDelegatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersSettingsDelegatesRequest,
  output: ListUsersSettingsDelegatesResponse,
  errors: [],
}));

export interface UpdateUsersLabelsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the label to update. */
  id: string;
  /** Request body */
  body?: Label;
}

export const UpdateUsersLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
    body: Schema.optional(Label).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/labels/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateUsersLabelsRequest>;

export type UpdateUsersLabelsResponse = Label;
export const UpdateUsersLabelsResponse = /*@__PURE__*/ /*#__PURE__*/ Label;

export type UpdateUsersLabelsError = DefaultErrors;

/** Updates the specified label. */
export const updateUsersLabels: API.OperationMethod<
  UpdateUsersLabelsRequest,
  UpdateUsersLabelsResponse,
  UpdateUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUsersLabelsRequest,
  output: UpdateUsersLabelsResponse,
  errors: [],
}));

export interface GetUsersLabelsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the label to retrieve. */
  id: string;
}

export const GetUsersLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/labels/{id}" }),
  svc,
) as unknown as Schema.Schema<GetUsersLabelsRequest>;

export type GetUsersLabelsResponse = Label;
export const GetUsersLabelsResponse = /*@__PURE__*/ /*#__PURE__*/ Label;

export type GetUsersLabelsError = DefaultErrors;

/** Gets the specified label. */
export const getUsersLabels: API.OperationMethod<
  GetUsersLabelsRequest,
  GetUsersLabelsResponse,
  GetUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersLabelsRequest,
  output: GetUsersLabelsResponse,
  errors: [],
}));

export interface CreateUsersLabelsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Label;
}

export const CreateUsersLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Label).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/labels",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersLabelsRequest>;

export type CreateUsersLabelsResponse = Label;
export const CreateUsersLabelsResponse = /*@__PURE__*/ /*#__PURE__*/ Label;

export type CreateUsersLabelsError = DefaultErrors;

/** Creates a new label. */
export const createUsersLabels: API.OperationMethod<
  CreateUsersLabelsRequest,
  CreateUsersLabelsResponse,
  CreateUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersLabelsRequest,
  output: CreateUsersLabelsResponse,
  errors: [],
}));

export interface PatchUsersLabelsRequest {
  /** The ID of the label to update. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Label;
}

export const PatchUsersLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Label).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "gmail/v1/users/{userId}/labels/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchUsersLabelsRequest>;

export type PatchUsersLabelsResponse = Label;
export const PatchUsersLabelsResponse = /*@__PURE__*/ /*#__PURE__*/ Label;

export type PatchUsersLabelsError = DefaultErrors;

/** Patch the specified label. */
export const patchUsersLabels: API.OperationMethod<
  PatchUsersLabelsRequest,
  PatchUsersLabelsResponse,
  PatchUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchUsersLabelsRequest,
  output: PatchUsersLabelsResponse,
  errors: [],
}));

export interface ListUsersLabelsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const ListUsersLabelsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userId: Schema.String.pipe(T.HttpPath("userId")),
  },
).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/labels" }),
  svc,
) as unknown as Schema.Schema<ListUsersLabelsRequest>;

export type ListUsersLabelsResponse = ListLabelsResponse;
export const ListUsersLabelsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListLabelsResponse;

export type ListUsersLabelsError = DefaultErrors;

/** Lists all labels in the user's mailbox. */
export const listUsersLabels: API.OperationMethod<
  ListUsersLabelsRequest,
  ListUsersLabelsResponse,
  ListUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListUsersLabelsRequest,
  output: ListUsersLabelsResponse,
  errors: [],
}));

export interface DeleteUsersLabelsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the label to delete. */
  id: string;
}

export const DeleteUsersLabelsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    id: Schema.String.pipe(T.HttpPath("id")),
  }).pipe(
    T.Http({ method: "DELETE", path: "gmail/v1/users/{userId}/labels/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersLabelsRequest>;

export interface DeleteUsersLabelsResponse {}
export const DeleteUsersLabelsResponse: Schema.Schema<DeleteUsersLabelsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersLabelsResponse>;

export type DeleteUsersLabelsError = DefaultErrors;

/** Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to. */
export const deleteUsersLabels: API.OperationMethod<
  DeleteUsersLabelsRequest,
  DeleteUsersLabelsResponse,
  DeleteUsersLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersLabelsRequest,
  output: DeleteUsersLabelsResponse,
  errors: [],
}));

export interface CreateUsersDraftsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Draft;
}

export const CreateUsersDraftsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Draft).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "gmail/v1/users/{userId}/drafts",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateUsersDraftsRequest>;

export type CreateUsersDraftsResponse = Draft;
export const CreateUsersDraftsResponse = /*@__PURE__*/ /*#__PURE__*/ Draft;

export type CreateUsersDraftsError = DefaultErrors;

/** Creates a new draft with the `DRAFT` label. */
export const createUsersDrafts: API.OperationMethod<
  CreateUsersDraftsRequest,
  CreateUsersDraftsResponse,
  CreateUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUsersDraftsRequest,
  output: CreateUsersDraftsResponse,
  errors: [],
}));

export interface DeleteUsersDraftsRequest {
  /** The ID of the draft to delete. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
}

export const DeleteUsersDraftsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "gmail/v1/users/{userId}/drafts/{id}" }),
    svc,
  ) as unknown as Schema.Schema<DeleteUsersDraftsRequest>;

export interface DeleteUsersDraftsResponse {}
export const DeleteUsersDraftsResponse: Schema.Schema<DeleteUsersDraftsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
    {},
  ) as any as Schema.Schema<DeleteUsersDraftsResponse>;

export type DeleteUsersDraftsError = DefaultErrors;

/** Immediately and permanently deletes the specified draft. Does not simply trash it. */
export const deleteUsersDrafts: API.OperationMethod<
  DeleteUsersDraftsRequest,
  DeleteUsersDraftsResponse,
  DeleteUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUsersDraftsRequest,
  output: DeleteUsersDraftsResponse,
  errors: [],
}));

export interface SendUsersDraftsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Draft;
}

export const SendUsersDraftsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Draft).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "gmail/v1/users/{userId}/drafts/send",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SendUsersDraftsRequest>;

export type SendUsersDraftsResponse = Message;
export const SendUsersDraftsResponse = /*@__PURE__*/ /*#__PURE__*/ Message;

export type SendUsersDraftsError = DefaultErrors;

/** Sends the specified, existing draft to the recipients in the `To`, `Cc`, and `Bcc` headers. */
export const sendUsersDrafts: API.OperationMethod<
  SendUsersDraftsRequest,
  SendUsersDraftsResponse,
  SendUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendUsersDraftsRequest,
  output: SendUsersDraftsResponse,
  errors: [],
}));

export interface GetUsersDraftsRequest {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The format to return the draft in. */
  format?: "minimal" | "full" | "raw" | "metadata" | (string & {});
  /** The ID of the draft to retrieve. */
  id: string;
}

export const GetUsersDraftsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  userId: Schema.String.pipe(T.HttpPath("userId")),
  format: Schema.optional(Schema.String).pipe(T.HttpQuery("format")),
  id: Schema.String.pipe(T.HttpPath("id")),
}).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/drafts/{id}" }),
  svc,
) as unknown as Schema.Schema<GetUsersDraftsRequest>;

export type GetUsersDraftsResponse = Draft;
export const GetUsersDraftsResponse = /*@__PURE__*/ /*#__PURE__*/ Draft;

export type GetUsersDraftsError = DefaultErrors;

/** Gets the specified draft. */
export const getUsersDrafts: API.OperationMethod<
  GetUsersDraftsRequest,
  GetUsersDraftsResponse,
  GetUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUsersDraftsRequest,
  output: GetUsersDraftsResponse,
  errors: [],
}));

export interface ListUsersDraftsRequest {
  /** Include drafts from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  q?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Maximum number of drafts to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
}

export const ListUsersDraftsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    includeSpamTrash: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("includeSpamTrash"),
    ),
    q: Schema.optional(Schema.String).pipe(T.HttpQuery("q")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({ method: "GET", path: "gmail/v1/users/{userId}/drafts" }),
  svc,
) as unknown as Schema.Schema<ListUsersDraftsRequest>;

export type ListUsersDraftsResponse = ListDraftsResponse;
export const ListUsersDraftsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListDraftsResponse;

export type ListUsersDraftsError = DefaultErrors;

/** Lists the drafts in the user's mailbox. */
export const listUsersDrafts: API.PaginatedOperationMethod<
  ListUsersDraftsRequest,
  ListUsersDraftsResponse,
  ListUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersDraftsRequest,
  output: ListUsersDraftsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UpdateUsersDraftsRequest {
  /** The ID of the draft to update. */
  id: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** Request body */
  body?: Draft;
}

export const UpdateUsersDraftsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.HttpPath("id")),
    userId: Schema.String.pipe(T.HttpPath("userId")),
    body: Schema.optional(Draft).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "gmail/v1/users/{userId}/drafts/{id}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateUsersDraftsRequest>;

export type UpdateUsersDraftsResponse = Draft;
export const UpdateUsersDraftsResponse = /*@__PURE__*/ /*#__PURE__*/ Draft;

export type UpdateUsersDraftsError = DefaultErrors;

/** Replaces a draft's content. */
export const updateUsersDrafts: API.OperationMethod<
  UpdateUsersDraftsRequest,
  UpdateUsersDraftsResponse,
  UpdateUsersDraftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUsersDraftsRequest,
  output: UpdateUsersDraftsResponse,
  errors: [],
}));
