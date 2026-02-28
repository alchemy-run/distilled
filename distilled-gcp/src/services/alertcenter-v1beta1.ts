// ==========================================================================
// Google Workspace Alert Center API (alertcenter v1beta1)
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
  name: "alertcenter",
  version: "v1beta1",
  rootUrl: "https://alertcenter.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AlertMetadata {
  /** Output only. The unique identifier of the Google Workspace account of the customer. */
  customerId?: string;
  /** Output only. The alert identifier. */
  alertId?: string;
  /** The current status of the alert. The supported values are the following: * NOT_STARTED * IN_PROGRESS * CLOSED */
  status?: string;
  /** The email address of the user assigned to the alert. */
  assignee?: string;
  /** Output only. The time this metadata was last updated. */
  updateTime?: string;
  /** The severity value of the alert. Alert Center will set this field at alert creation time, default's to an empty string when it could not be determined. The supported values for update actions on this field are the following: * HIGH * MEDIUM * LOW */
  severity?: string;
  /** Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of an alert metadata from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform metadata updates in order to avoid race conditions: An `etag` is returned in the response which contains alert metadata, and systems are expected to put that etag in the request to update alert metadata to ensure that their change will be applied to the same version of the alert metadata. If no `etag` is provided in the call to update alert metadata, then the existing alert metadata is overwritten blindly. */
  etag?: string;
}

export const AlertMetadata: Schema.Schema<AlertMetadata> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  alertId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  assignee: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertMetadata" }) as any as Schema.Schema<AlertMetadata>;

export interface Alert {
  /** Output only. The unique identifier of the Google Workspace account of the customer. */
  customerId?: string;
  /** Output only. The unique identifier for the alert. */
  alertId?: string;
  /** Output only. The time this alert was created. */
  createTime?: string;
  /** Required. The time the event that caused this alert was started or detected. */
  startTime?: string;
  /** Optional. The time the event that caused this alert ceased being active. If provided, the end time must not be earlier than the start time. If not provided, it indicates an ongoing alert. */
  endTime?: string;
  /** Required. The type of the alert. This is output only after alert is created. For a list of available alert types see [Google Workspace Alert types](https://developers.google.com/workspace/admin/alertcenter/reference/alert-types). */
  type?: string;
  /** Required. A unique identifier for the system that reported the alert. This is output only after alert is created. Supported sources are any of the following: * Google Operations * Mobile device management * Gmail phishing * Data Loss Prevention * Domain wide takeout * State sponsored attack * Google identity * Apps outage */
  source?: string;
  /** Optional. The data associated with this alert, for example google.apps.alertcenter.type.DeviceCompromised. */
  data?: Record<string, unknown>;
  /** Output only. An optional [Security Investigation Tool](https://support.google.com/a/answer/7575955) query for this alert. */
  securityInvestigationToolLink?: string;
  /** Output only. `True` if this alert is marked for deletion. */
  deleted?: boolean;
  /** Output only. The metadata associated with this alert. */
  metadata?: AlertMetadata;
  /** Output only. The time this alert was last updated. */
  updateTime?: string;
  /** Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of an alert from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform alert updates in order to avoid race conditions: An `etag` is returned in the response which contains alerts, and systems are expected to put that etag in the request to update alert to ensure that their change will be applied to the same version of the alert. If no `etag` is provided in the call to update alert, then the existing alert is overwritten blindly. */
  etag?: string;
}

export const Alert: Schema.Schema<Alert> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  alertId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  securityInvestigationToolLink: Schema.optional(Schema.String),
  deleted: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(AlertMetadata),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Alert" }) as any as Schema.Schema<Alert>;

export interface ListAlertsResponse {
  /** The list of alerts. */
  alerts?: Array<Alert>;
  /** The token for the next page. If not empty, indicates that there may be more alerts that match the listing request; this value can be used in a subsequent ListAlertsRequest to get alerts continuing from last result of the current list call. */
  nextPageToken?: string;
}

export const ListAlertsResponse: Schema.Schema<ListAlertsResponse> = Schema.suspend(() => Schema.Struct({
  alerts: Schema.optional(Schema.Array(Alert)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAlertsResponse" }) as any as Schema.Schema<ListAlertsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface UndeleteAlertRequest {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
}

export const UndeleteAlertRequest: Schema.Schema<UndeleteAlertRequest> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteAlertRequest" }) as any as Schema.Schema<UndeleteAlertRequest>;

export interface AlertFeedback {
  /** Output only. The unique identifier of the Google Workspace account of the customer. */
  customerId?: string;
  /** Output only. The alert identifier. */
  alertId?: string;
  /** Output only. The unique identifier for the feedback. */
  feedbackId?: string;
  /** Output only. The time this feedback was created. */
  createTime?: string;
  /** Required. The type of the feedback. */
  type?: "ALERT_FEEDBACK_TYPE_UNSPECIFIED" | "NOT_USEFUL" | "SOMEWHAT_USEFUL" | "VERY_USEFUL" | (string & {});
  /** Output only. The email of the user that provided the feedback. */
  email?: string;
}

export const AlertFeedback: Schema.Schema<AlertFeedback> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  alertId: Schema.optional(Schema.String),
  feedbackId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "AlertFeedback" }) as any as Schema.Schema<AlertFeedback>;

export interface ListAlertFeedbackResponse {
  /** The list of alert feedback. Feedback entries for each alert are ordered by creation time descending. */
  feedback?: Array<AlertFeedback>;
}

export const ListAlertFeedbackResponse: Schema.Schema<ListAlertFeedbackResponse> = Schema.suspend(() => Schema.Struct({
  feedback: Schema.optional(Schema.Array(AlertFeedback)),
})).annotate({ identifier: "ListAlertFeedbackResponse" }) as any as Schema.Schema<ListAlertFeedbackResponse>;

export interface CloudPubsubTopic {
  /** The `name` field of a Cloud Pubsub [Topic] (https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic). */
  topicName?: string;
  /** Optional. The format of the payload that would be sent. If not specified the format will be JSON. */
  payloadFormat?: "PAYLOAD_FORMAT_UNSPECIFIED" | "JSON" | (string & {});
}

export const CloudPubsubTopic: Schema.Schema<CloudPubsubTopic> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
  payloadFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudPubsubTopic" }) as any as Schema.Schema<CloudPubsubTopic>;

export interface Notification {
  /** A Google Cloud Pub/sub topic destination. */
  cloudPubsubTopic?: CloudPubsubTopic;
}

export const Notification: Schema.Schema<Notification> = Schema.suspend(() => Schema.Struct({
  cloudPubsubTopic: Schema.optional(CloudPubsubTopic),
})).annotate({ identifier: "Notification" }) as any as Schema.Schema<Notification>;

export interface Settings {
  /** The list of notifications. */
  notifications?: Array<Notification>;
}

export const Settings: Schema.Schema<Settings> = Schema.suspend(() => Schema.Struct({
  notifications: Schema.optional(Schema.Array(Notification)),
})).annotate({ identifier: "Settings" }) as any as Schema.Schema<Settings>;

export interface BatchDeleteAlertsRequest {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alerts are associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Required. The list of alert IDs to delete. */
  alertId?: Array<string>;
}

export const BatchDeleteAlertsRequest: Schema.Schema<BatchDeleteAlertsRequest> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  alertId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeleteAlertsRequest" }) as any as Schema.Schema<BatchDeleteAlertsRequest>;

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

export interface BatchDeleteAlertsResponse {
  /** The successful list of alert IDs. */
  successAlertIds?: Array<string>;
  /** The status details for each failed `alert_id`. */
  failedAlertStatus?: Record<string, Status>;
}

export const BatchDeleteAlertsResponse: Schema.Schema<BatchDeleteAlertsResponse> = Schema.suspend(() => Schema.Struct({
  successAlertIds: Schema.optional(Schema.Array(Schema.String)),
  failedAlertStatus: Schema.optional(Schema.Record(Schema.String, Status)),
})).annotate({ identifier: "BatchDeleteAlertsResponse" }) as any as Schema.Schema<BatchDeleteAlertsResponse>;

export interface BatchUndeleteAlertsRequest {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alerts are associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Required. The list of alert IDs to undelete. */
  alertId?: Array<string>;
}

export const BatchUndeleteAlertsRequest: Schema.Schema<BatchUndeleteAlertsRequest> = Schema.suspend(() => Schema.Struct({
  customerId: Schema.optional(Schema.String),
  alertId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchUndeleteAlertsRequest" }) as any as Schema.Schema<BatchUndeleteAlertsRequest>;

export interface BatchUndeleteAlertsResponse {
  /** The successful list of alert IDs. */
  successAlertIds?: Array<string>;
  /** The status details for each failed `alert_id`. */
  failedAlertStatus?: Record<string, Status>;
}

export const BatchUndeleteAlertsResponse: Schema.Schema<BatchUndeleteAlertsResponse> = Schema.suspend(() => Schema.Struct({
  successAlertIds: Schema.optional(Schema.Array(Schema.String)),
  failedAlertStatus: Schema.optional(Schema.Record(Schema.String, Status)),
})).annotate({ identifier: "BatchUndeleteAlertsResponse" }) as any as Schema.Schema<BatchUndeleteAlertsResponse>;

export interface DomainId {
  /** The primary domain for the customer. */
  customerPrimaryDomain?: string;
}

export const DomainId: Schema.Schema<DomainId> = Schema.suspend(() => Schema.Struct({
  customerPrimaryDomain: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainId" }) as any as Schema.Schema<DomainId>;

export interface User {
  /** Email address of the user. */
  emailAddress?: string;
  /** Display name of the user. */
  displayName?: string;
}

export const User: Schema.Schema<User> = Schema.suspend(() => Schema.Struct({
  emailAddress: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "User" }) as any as Schema.Schema<User>;

export interface MaliciousEntity {
  /** The sender email address. */
  fromHeader?: string;
  /** The header from display name. */
  displayName?: string;
  /** The actor who triggered a gmail phishing alert. */
  entity?: User;
}

export const MaliciousEntity: Schema.Schema<MaliciousEntity> = Schema.suspend(() => Schema.Struct({
  fromHeader: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entity: Schema.optional(User),
})).annotate({ identifier: "MaliciousEntity" }) as any as Schema.Schema<MaliciousEntity>;

export interface GmailMessageInfo {
  /** The message ID. */
  messageId?: string;
  /** The hash of the message body text. */
  md5HashMessageBody?: string;
  /** The snippet of the message body text (only available for reported emails). */
  messageBodySnippet?: string;
  /** The MD5 Hash of email's subject (only available for reported emails). */
  md5HashSubject?: string;
  /** The email subject text (only available for reported emails). */
  subjectText?: string;
  /** The `SHA256` hash of email's attachment and all MIME parts. */
  attachmentsSha256Hash?: Array<string>;
  /** The recipient of this email. */
  recipient?: string;
  /** The date of the event related to this email. */
  date?: string;
  /** The sent time of the email. */
  sentTime?: string;
}

export const GmailMessageInfo: Schema.Schema<GmailMessageInfo> = Schema.suspend(() => Schema.Struct({
  messageId: Schema.optional(Schema.String),
  md5HashMessageBody: Schema.optional(Schema.String),
  messageBodySnippet: Schema.optional(Schema.String),
  md5HashSubject: Schema.optional(Schema.String),
  subjectText: Schema.optional(Schema.String),
  attachmentsSha256Hash: Schema.optional(Schema.Array(Schema.String)),
  recipient: Schema.optional(Schema.String),
  date: Schema.optional(Schema.String),
  sentTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GmailMessageInfo" }) as any as Schema.Schema<GmailMessageInfo>;

export interface BadWhitelist {
  /** The domain ID. */
  domainId?: DomainId;
  /** The entity whose actions triggered a Gmail phishing alert. */
  maliciousEntity?: MaliciousEntity;
  /** The list of messages contained by this alert. */
  messages?: Array<GmailMessageInfo>;
  /** The source IP address of the malicious email, for example, `127.0.0.1`. */
  sourceIp?: string;
}

export const BadWhitelist: Schema.Schema<BadWhitelist> = Schema.suspend(() => Schema.Struct({
  domainId: Schema.optional(DomainId),
  maliciousEntity: Schema.optional(MaliciousEntity),
  messages: Schema.optional(Schema.Array(GmailMessageInfo)),
  sourceIp: Schema.optional(Schema.String),
})).annotate({ identifier: "BadWhitelist" }) as any as Schema.Schema<BadWhitelist>;

export interface DeviceCompromisedSecurityDetail {
  /** Required. The device ID. */
  deviceId?: string;
  /** The serial number of the device. */
  serialNumber?: string;
  /** The type of the device. */
  deviceType?: string;
  /** The model of the device. */
  deviceModel?: string;
  /** The device resource ID. */
  resourceId?: string;
  /** Required for iOS, empty for others. */
  iosVendorId?: string;
  /** The device compromised state. Possible values are "`Compromised`" or "`Not Compromised`". */
  deviceCompromisedState?: string;
}

export const DeviceCompromisedSecurityDetail: Schema.Schema<DeviceCompromisedSecurityDetail> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  deviceModel: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  iosVendorId: Schema.optional(Schema.String),
  deviceCompromisedState: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceCompromisedSecurityDetail" }) as any as Schema.Schema<DeviceCompromisedSecurityDetail>;

export interface DeviceCompromised {
  /** The email of the user this alert was created for. */
  email?: string;
  /** Required. The list of security events. */
  events?: Array<DeviceCompromisedSecurityDetail>;
}

export const DeviceCompromised: Schema.Schema<DeviceCompromised> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(DeviceCompromisedSecurityDetail)),
})).annotate({ identifier: "DeviceCompromised" }) as any as Schema.Schema<DeviceCompromised>;

export interface CsvRow {
  /** The data entries in a CSV file row, as a string array rather than a single comma-separated string. */
  entries?: Array<string>;
}

export const CsvRow: Schema.Schema<CsvRow> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CsvRow" }) as any as Schema.Schema<CsvRow>;

export interface Csv {
  /** The list of headers for data columns in a CSV file. */
  headers?: Array<string>;
  /** The list of data rows in a CSV file, as string arrays rather than as a single comma-separated string. */
  dataRows?: Array<CsvRow>;
}

export const Csv: Schema.Schema<Csv> = Schema.suspend(() => Schema.Struct({
  headers: Schema.optional(Schema.Array(Schema.String)),
  dataRows: Schema.optional(Schema.Array(CsvRow)),
})).annotate({ identifier: "Csv" }) as any as Schema.Schema<Csv>;

export interface Attachment {
  /** A CSV file attachment. */
  csv?: Csv;
}

export const Attachment: Schema.Schema<Attachment> = Schema.suspend(() => Schema.Struct({
  csv: Schema.optional(Csv),
})).annotate({ identifier: "Attachment" }) as any as Schema.Schema<Attachment>;

export interface GoogleOperations {
  /** A one-line incident description. */
  title?: string;
  /** A detailed, freeform incident description. */
  description?: string;
  /** The list of emails which correspond to the users directly affected by the incident. */
  affectedUserEmails?: Array<string>;
  /** Optional. Application-specific data for an incident, provided when the Google Workspace application which reported the incident cannot be completely restored to a valid state. */
  attachmentData?: Attachment;
  /** A header to display above the incident message. Typically used to attach a localized notice on the timeline for followup comms translations. */
  header?: string;
  /** Customer domain for email template personalization. */
  domain?: string;
}

export const GoogleOperations: Schema.Schema<GoogleOperations> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  affectedUserEmails: Schema.optional(Schema.Array(Schema.String)),
  attachmentData: Schema.optional(Attachment),
  header: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleOperations" }) as any as Schema.Schema<GoogleOperations>;

export interface MailPhishing {
  /** The domain ID. */
  domainId?: DomainId;
  /** The entity whose actions triggered a Gmail phishing alert. */
  maliciousEntity?: MaliciousEntity;
  /** The list of messages contained by this alert. */
  messages?: Array<GmailMessageInfo>;
  /** If `true`, the email originated from within the organization. */
  isInternal?: boolean;
  /** System actions on the messages. */
  systemActionType?: "SYSTEM_ACTION_TYPE_UNSPECIFIED" | "NO_OPERATION" | "REMOVED_FROM_INBOX" | (string & {});
}

export const MailPhishing: Schema.Schema<MailPhishing> = Schema.suspend(() => Schema.Struct({
  domainId: Schema.optional(DomainId),
  maliciousEntity: Schema.optional(MaliciousEntity),
  messages: Schema.optional(Schema.Array(GmailMessageInfo)),
  isInternal: Schema.optional(Schema.Boolean),
  systemActionType: Schema.optional(Schema.String),
})).annotate({ identifier: "MailPhishing" }) as any as Schema.Schema<MailPhishing>;

export interface PhishingSpike {
  /** The domain ID. */
  domainId?: DomainId;
  /** The entity whose actions triggered a Gmail phishing alert. */
  maliciousEntity?: MaliciousEntity;
  /** The list of messages contained by this alert. */
  messages?: Array<GmailMessageInfo>;
  /** If `true`, the email originated from within the organization. */
  isInternal?: boolean;
}

export const PhishingSpike: Schema.Schema<PhishingSpike> = Schema.suspend(() => Schema.Struct({
  domainId: Schema.optional(DomainId),
  maliciousEntity: Schema.optional(MaliciousEntity),
  messages: Schema.optional(Schema.Array(GmailMessageInfo)),
  isInternal: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "PhishingSpike" }) as any as Schema.Schema<PhishingSpike>;

export interface SuspiciousActivitySecurityDetail {
  /** Required. The device ID. */
  deviceId?: string;
  /** The serial number of the device. */
  serialNumber?: string;
  /** The type of the device. */
  deviceType?: string;
  /** The model of the device. */
  deviceModel?: string;
  /** The device resource ID. */
  resourceId?: string;
  /** Required for iOS, empty for others. */
  iosVendorId?: string;
  /** The device property which was changed. */
  deviceProperty?: string;
  /** The old value of the device property before the change. */
  oldValue?: string;
  /** The new value of the device property after the change. */
  newValue?: string;
}

export const SuspiciousActivitySecurityDetail: Schema.Schema<SuspiciousActivitySecurityDetail> = Schema.suspend(() => Schema.Struct({
  deviceId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  deviceModel: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  iosVendorId: Schema.optional(Schema.String),
  deviceProperty: Schema.optional(Schema.String),
  oldValue: Schema.optional(Schema.String),
  newValue: Schema.optional(Schema.String),
})).annotate({ identifier: "SuspiciousActivitySecurityDetail" }) as any as Schema.Schema<SuspiciousActivitySecurityDetail>;

export interface SuspiciousActivity {
  /** The email of the user this alert was created for. */
  email?: string;
  /** Required. The list of security events. */
  events?: Array<SuspiciousActivitySecurityDetail>;
}

export const SuspiciousActivity: Schema.Schema<SuspiciousActivity> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(SuspiciousActivitySecurityDetail)),
})).annotate({ identifier: "SuspiciousActivity" }) as any as Schema.Schema<SuspiciousActivity>;

export interface DomainWideTakeoutInitiated {
  /** The takeout request ID. */
  takeoutRequestId?: string;
  /** The email of the admin who initiated the takeout. */
  email?: string;
}

export const DomainWideTakeoutInitiated: Schema.Schema<DomainWideTakeoutInitiated> = Schema.suspend(() => Schema.Struct({
  takeoutRequestId: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "DomainWideTakeoutInitiated" }) as any as Schema.Schema<DomainWideTakeoutInitiated>;

export interface StateSponsoredAttack {
  /** The email of the user this incident was created for. */
  email?: string;
}

export const StateSponsoredAttack: Schema.Schema<StateSponsoredAttack> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "StateSponsoredAttack" }) as any as Schema.Schema<StateSponsoredAttack>;

export interface LoginDetails {
  /** Optional. The successful login time that is associated with the warning event. This isn't present for blocked login attempts. */
  loginTime?: string;
  /** Optional. The human-readable IP address (for example, `11.22.33.44`) that is associated with the warning event. */
  ipAddress?: string;
}

export const LoginDetails: Schema.Schema<LoginDetails> = Schema.suspend(() => Schema.Struct({
  loginTime: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
})).annotate({ identifier: "LoginDetails" }) as any as Schema.Schema<LoginDetails>;

export interface AccountWarning {
  /** Required. The email of the user that this event belongs to. */
  email?: string;
  /** Optional. Details of the login action associated with the warning event. This is only available for: * Suspicious login * Suspicious login (less secure app) * Suspicious programmatic login * User suspended (suspicious activity) */
  loginDetails?: LoginDetails;
}

export const AccountWarning: Schema.Schema<AccountWarning> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  loginDetails: Schema.optional(LoginDetails),
})).annotate({ identifier: "AccountWarning" }) as any as Schema.Schema<AccountWarning>;

export interface RequestInfo {
  /** Required. The application that requires the SQL setup. */
  appKey?: string;
  /** List of app developers who triggered notifications for above application. */
  appDeveloperEmail?: Array<string>;
  /** Required. Number of requests sent for this application to set up default SQL instance. */
  numberOfRequests?: string;
}

export const RequestInfo: Schema.Schema<RequestInfo> = Schema.suspend(() => Schema.Struct({
  appKey: Schema.optional(Schema.String),
  appDeveloperEmail: Schema.optional(Schema.Array(Schema.String)),
  numberOfRequests: Schema.optional(Schema.String),
})).annotate({ identifier: "RequestInfo" }) as any as Schema.Schema<RequestInfo>;

export interface AppMakerSqlSetupNotification {
  /** List of applications with requests for default SQL set up. */
  requestInfo?: Array<RequestInfo>;
}

export const AppMakerSqlSetupNotification: Schema.Schema<AppMakerSqlSetupNotification> = Schema.suspend(() => Schema.Struct({
  requestInfo: Schema.optional(Schema.Array(RequestInfo)),
})).annotate({ identifier: "AppMakerSqlSetupNotification" }) as any as Schema.Schema<AppMakerSqlSetupNotification>;

export interface ActivityRule {
  /** Rule name. */
  name?: string;
  /** Alert display name. */
  displayName?: string;
  /** Description of the rule. */
  description?: string;
  /** Rule window size. Possible values are 1 hour or 24 hours. */
  windowSize?: string;
  /** Alert threshold is for example “COUNT > 5”. */
  threshold?: string;
  /** Rule create timestamp. */
  createTime?: string;
  /** The timestamp of the last update to the rule. */
  updateTime?: string;
  /** The trigger sources for this rule. * GMAIL_EVENTS * DEVICE_EVENTS * USER_EVENTS */
  triggerSource?: string;
  /** List of alert IDs superseded by this alert. It is used to indicate that this alert is essentially extension of superseded alerts and we found the relationship after creating these alerts. */
  supersededAlerts?: Array<string>;
  /** Alert ID superseding this alert. It is used to indicate that superseding alert is essentially extension of this alert and we found the relationship after creating both alerts. */
  supersedingAlert?: string;
  /** List of action names associated with the rule threshold. */
  actionNames?: Array<string>;
  /** Query that is used to get the data from the associated source. */
  query?: string;
}

export const ActivityRule: Schema.Schema<ActivityRule> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  windowSize: Schema.optional(Schema.String),
  threshold: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  triggerSource: Schema.optional(Schema.String),
  supersededAlerts: Schema.optional(Schema.Array(Schema.String)),
  supersedingAlert: Schema.optional(Schema.String),
  actionNames: Schema.optional(Schema.Array(Schema.String)),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivityRule" }) as any as Schema.Schema<ActivityRule>;

export interface ReportingRule {
  /** Any other associated alert details, for example, AlertConfiguration. */
  alertDetails?: string;
  /** Rule name */
  name?: string;
  /** Alert Rule query Sample Query query { condition { filter { expected_application_id: 777491262838 expected_event_name: "indexable_content_change" filter_op: IN } } conjunction_operator: OR } */
  query?: string;
}

export const ReportingRule: Schema.Schema<ReportingRule> = Schema.suspend(() => Schema.Struct({
  alertDetails: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportingRule" }) as any as Schema.Schema<ReportingRule>;

export interface AppSettingsChanged {
  /** Any other associated alert details, for example, AlertConfiguration. */
  alertDetails?: string;
  /** Rule name */
  name?: string;
}

export const AppSettingsChanged: Schema.Schema<AppSettingsChanged> = Schema.suspend(() => Schema.Struct({
  alertDetails: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AppSettingsChanged" }) as any as Schema.Schema<AppSettingsChanged>;

export interface UserChanges {
  /** Rule name */
  name?: string;
}

export const UserChanges: Schema.Schema<UserChanges> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "UserChanges" }) as any as Schema.Schema<UserChanges>;

export interface RuleInfo {
  /** Resource name that uniquely identifies the rule. */
  resourceName?: string;
  /** User provided name of the rule. */
  displayName?: string;
}

export const RuleInfo: Schema.Schema<RuleInfo> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "RuleInfo" }) as any as Schema.Schema<RuleInfo>;

export interface ResourceInfo {
  /** Drive file ID. */
  documentId?: string;
  /** RFC2822 message ID. */
  messageId?: string;
  /** Chat message ID. */
  chatMessageId?: string;
  /** Chat attachment ID. */
  chatAttachmentId?: string;
  /** Title of the resource, for example email subject, or document title. */
  resourceTitle?: string;
  /** Id to identify a device. For example, for Android devices, this is the "Android Device Id" and for Chrome OS devices, it's the "Device Virtual Id". */
  deviceId?: string;
}

export const ResourceInfo: Schema.Schema<ResourceInfo> = Schema.suspend(() => Schema.Struct({
  documentId: Schema.optional(Schema.String),
  messageId: Schema.optional(Schema.String),
  chatMessageId: Schema.optional(Schema.String),
  chatAttachmentId: Schema.optional(Schema.String),
  resourceTitle: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceInfo" }) as any as Schema.Schema<ResourceInfo>;

export interface UserDefinedDetectorInfo {
  /** Resource name that uniquely identifies the detector. */
  resourceName?: string;
  /** Display name of the detector. */
  displayName?: string;
}

export const UserDefinedDetectorInfo: Schema.Schema<UserDefinedDetectorInfo> = Schema.suspend(() => Schema.Struct({
  resourceName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "UserDefinedDetectorInfo" }) as any as Schema.Schema<UserDefinedDetectorInfo>;

export interface PredefinedDetectorInfo {
  /** Name that uniquely identifies the detector. */
  detectorName?: string;
}

export const PredefinedDetectorInfo: Schema.Schema<PredefinedDetectorInfo> = Schema.suspend(() => Schema.Struct({
  detectorName: Schema.optional(Schema.String),
})).annotate({ identifier: "PredefinedDetectorInfo" }) as any as Schema.Schema<PredefinedDetectorInfo>;

export interface MatchInfo {
  /** For matched detector defined by administrators. */
  userDefinedDetector?: UserDefinedDetectorInfo;
  /** For matched detector predefined by Google. */
  predefinedDetector?: PredefinedDetectorInfo;
}

export const MatchInfo: Schema.Schema<MatchInfo> = Schema.suspend(() => Schema.Struct({
  userDefinedDetector: Schema.optional(UserDefinedDetectorInfo),
  predefinedDetector: Schema.optional(PredefinedDetectorInfo),
})).annotate({ identifier: "MatchInfo" }) as any as Schema.Schema<MatchInfo>;

export interface ActionInfo {
}

export const ActionInfo: Schema.Schema<ActionInfo> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ActionInfo" }) as any as Schema.Schema<ActionInfo>;

export interface RuleViolationInfo {
  /** Details of the violated rule. */
  ruleInfo?: RuleInfo;
  /** Source of the data. */
  dataSource?: "DATA_SOURCE_UNSPECIFIED" | "DRIVE" | "CHROME" | "CHAT" | (string & {});
  /** Trigger of the rule. */
  trigger?: "TRIGGER_UNSPECIFIED" | "DRIVE_SHARE" | "CHROME_FILE_DOWNLOAD" | "CHROME_FILE_UPLOAD" | "CHROME_WEB_CONTENT_UPLOAD" | "CHAT_MESSAGE_SENT" | "CHAT_ATTACHMENT_UPLOADED" | "CHROME_PAGE_PRINT" | "CHROME_URL_VISITED" | (string & {});
  /** Email of the user who caused the violation. Value could be empty if not applicable, for example, a violation found by drive continuous scan. */
  triggeringUserEmail?: string;
  /** Resource recipients. For Drive, they are grantees that the Drive file was shared with at the time of rule triggering. Valid values include user emails, group emails, domains, or 'anyone' if the file was publicly accessible. If the file was private the recipients list will be empty. For Gmail, they are emails of the users or groups that the Gmail message was sent to. */
  recipients?: Array<string>;
  /** Details of the resource which violated the rule. */
  resourceInfo?: ResourceInfo;
  /** List of matches that were found in the resource content. */
  matchInfo?: Array<MatchInfo>;
  /** Actions applied as a consequence of the rule being triggered. */
  triggeredActionTypes?: Array<"ACTION_TYPE_UNSPECIFIED" | "DRIVE_BLOCK_EXTERNAL_SHARING" | "DRIVE_WARN_ON_EXTERNAL_SHARING" | "DRIVE_RESTRICT_DOWNLOAD_PRINT_COPY" | "DRIVE_APPLY_DRIVE_LABELS" | "CHROME_BLOCK_FILE_DOWNLOAD" | "CHROME_WARN_FILE_DOWNLOAD" | "CHROME_BLOCK_FILE_UPLOAD" | "CHROME_WARN_FILE_UPLOAD" | "CHROME_BLOCK_WEB_CONTENT_UPLOAD" | "CHROME_WARN_WEB_CONTENT_UPLOAD" | "CHROME_BLOCK_PAGE_PRINT" | "CHROME_WARN_PAGE_PRINT" | "CHROME_BLOCK_URL_VISITED" | "CHROME_WARN_URL_VISITED" | "CHROME_BLOCK_SCREENSHOT" | "CHROME_STORE_CONTENT" | "DELETE_WEBPROTECT_EVIDENCE" | "CHAT_BLOCK_CONTENT" | "CHAT_WARN_USER" | "ALERT" | "RULE_ACTIVATE" | "RULE_DEACTIVATE" | (string & {})>;
  /** Metadata related to the triggered actions. */
  triggeredActionInfo?: Array<ActionInfo>;
  /** Actions suppressed due to other actions with higher priority. */
  suppressedActionTypes?: Array<"ACTION_TYPE_UNSPECIFIED" | "DRIVE_BLOCK_EXTERNAL_SHARING" | "DRIVE_WARN_ON_EXTERNAL_SHARING" | "DRIVE_RESTRICT_DOWNLOAD_PRINT_COPY" | "DRIVE_APPLY_DRIVE_LABELS" | "CHROME_BLOCK_FILE_DOWNLOAD" | "CHROME_WARN_FILE_DOWNLOAD" | "CHROME_BLOCK_FILE_UPLOAD" | "CHROME_WARN_FILE_UPLOAD" | "CHROME_BLOCK_WEB_CONTENT_UPLOAD" | "CHROME_WARN_WEB_CONTENT_UPLOAD" | "CHROME_BLOCK_PAGE_PRINT" | "CHROME_WARN_PAGE_PRINT" | "CHROME_BLOCK_URL_VISITED" | "CHROME_WARN_URL_VISITED" | "CHROME_BLOCK_SCREENSHOT" | "CHROME_STORE_CONTENT" | "DELETE_WEBPROTECT_EVIDENCE" | "CHAT_BLOCK_CONTENT" | "CHAT_WARN_USER" | "ALERT" | "RULE_ACTIVATE" | "RULE_DEACTIVATE" | (string & {})>;
  /** Event associated with this alert after applying the rule. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "ACCESS_BLOCKED" | "SHARING_BLOCKED" | (string & {});
}

export const RuleViolationInfo: Schema.Schema<RuleViolationInfo> = Schema.suspend(() => Schema.Struct({
  ruleInfo: Schema.optional(RuleInfo),
  dataSource: Schema.optional(Schema.String),
  trigger: Schema.optional(Schema.String),
  triggeringUserEmail: Schema.optional(Schema.String),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  resourceInfo: Schema.optional(ResourceInfo),
  matchInfo: Schema.optional(Schema.Array(MatchInfo)),
  triggeredActionTypes: Schema.optional(Schema.Array(Schema.String)),
  triggeredActionInfo: Schema.optional(Schema.Array(ActionInfo)),
  suppressedActionTypes: Schema.optional(Schema.Array(Schema.String)),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "RuleViolationInfo" }) as any as Schema.Schema<RuleViolationInfo>;

export interface DlpRuleViolation {
  /** Details about the violated DLP rule. Admins can use the predefined detectors provided by Google Cloud DLP https://cloud.google.com/dlp/ when setting up a DLP rule. Matched Cloud DLP detectors in this violation if any will be captured in the MatchInfo.predefined_detector. */
  ruleViolationInfo?: RuleViolationInfo;
}

export const DlpRuleViolation: Schema.Schema<DlpRuleViolation> = Schema.suspend(() => Schema.Struct({
  ruleViolationInfo: Schema.optional(RuleViolationInfo),
})).annotate({ identifier: "DlpRuleViolation" }) as any as Schema.Schema<DlpRuleViolation>;

export interface VoicemailRecipientError {
  /** Reason for the error. */
  invalidReason?: "EMAIL_INVALID_REASON_UNSPECIFIED" | "OUT_OF_QUOTA" | "RECIPIENT_DELETED" | (string & {});
  /** Email address of the invalid recipient. This may be unavailable if the recipient was deleted. */
  email?: string;
}

export const VoicemailRecipientError: Schema.Schema<VoicemailRecipientError> = Schema.suspend(() => Schema.Struct({
  invalidReason: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "VoicemailRecipientError" }) as any as Schema.Schema<VoicemailRecipientError>;

export interface VoicemailMisconfiguration {
  /** Issue(s) with voicemail recipients. */
  errors?: Array<VoicemailRecipientError>;
}

export const VoicemailMisconfiguration: Schema.Schema<VoicemailMisconfiguration> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(VoicemailRecipientError)),
})).annotate({ identifier: "VoicemailMisconfiguration" }) as any as Schema.Schema<VoicemailMisconfiguration>;

export interface TransferError {
  /** Type of entity being transferred to. For ring group members, this should always be USER. */
  entityType?: "TRANSFER_ENTITY_TYPE_UNSPECIFIED" | "TRANSFER_AUTO_ATTENDANT" | "TRANSFER_RING_GROUP" | "TRANSFER_USER" | (string & {});
  /** Reason for the error. */
  invalidReason?: "TRANSFER_INVALID_REASON_UNSPECIFIED" | "TRANSFER_TARGET_DELETED" | "UNLICENSED" | "SUSPENDED" | "NO_PHONE_NUMBER" | (string & {});
  /** Ring group or auto attendant ID. Not set for users. */
  id?: string;
  /** User's full name, or the ring group / auto attendant name. This may be unavailable if the entity was deleted. */
  name?: string;
  /** User's email address. This may be unavailable if the entity was deleted. */
  email?: string;
}

export const TransferError: Schema.Schema<TransferError> = Schema.suspend(() => Schema.Struct({
  entityType: Schema.optional(Schema.String),
  invalidReason: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferError" }) as any as Schema.Schema<TransferError>;

export interface TransferMisconfiguration {
  /** Details for each invalid transfer or forward. */
  errors?: Array<TransferError>;
}

export const TransferMisconfiguration: Schema.Schema<TransferMisconfiguration> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(TransferError)),
})).annotate({ identifier: "TransferMisconfiguration" }) as any as Schema.Schema<TransferMisconfiguration>;

export interface VoiceMisconfiguration {
  /** Name of the entity whose configuration is now invalid. */
  entityName?: string;
  /** Type of the entity whose configuration is now invalid. */
  entityType?: "ENTITY_TYPE_UNSPECIFIED" | "AUTO_ATTENDANT" | "RING_GROUP" | (string & {});
  /** Issue(s) with sending to voicemail. */
  voicemailMisconfiguration?: VoicemailMisconfiguration;
  /** Issue(s) with transferring or forwarding to an external entity. */
  transferMisconfiguration?: TransferMisconfiguration;
  /** Issue(s) with members of a ring group. */
  membersMisconfiguration?: TransferMisconfiguration;
  /** Link that the admin can follow to fix the issue. */
  fixUri?: string;
}

export const VoiceMisconfiguration: Schema.Schema<VoiceMisconfiguration> = Schema.suspend(() => Schema.Struct({
  entityName: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  voicemailMisconfiguration: Schema.optional(VoicemailMisconfiguration),
  transferMisconfiguration: Schema.optional(TransferMisconfiguration),
  membersMisconfiguration: Schema.optional(TransferMisconfiguration),
  fixUri: Schema.optional(Schema.String),
})).annotate({ identifier: "VoiceMisconfiguration" }) as any as Schema.Schema<VoiceMisconfiguration>;

export interface AccountSuspensionDetails {
  /** The reason why this account is receiving an account suspension warning. */
  abuseReason?: "ACCOUNT_SUSPENSION_ABUSE_REASON_UNSPECIFIED" | "TOS_VIOLATION" | "SPAM" | "PHISHING" | "TRAFFIC_PUMPING" | "FRAUD" | "NUMBER_HARVESTING" | "PAYMENTS_FRAUD" | "UNWANTED_CONTENT" | "UNQUALIFIED_EDU" | (string & {});
  /** The name of the product being abused. This is restricted to only the following values: "Gmail" "Google Workspace" "Payments" "Voice" "YouTube" "Other" */
  productName?: string;
}

export const AccountSuspensionDetails: Schema.Schema<AccountSuspensionDetails> = Schema.suspend(() => Schema.Struct({
  abuseReason: Schema.optional(Schema.String),
  productName: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountSuspensionDetails" }) as any as Schema.Schema<AccountSuspensionDetails>;

export interface AccountSuspensionWarning {
  /** Account suspension warning state. */
  state?: "ACCOUNT_SUSPENSION_WARNING_STATE_UNSPECIFIED" | "WARNING" | "SUSPENDED" | "APPEAL_APPROVED" | "APPEAL_SUBMITTED" | (string & {});
  /** Details about why an account is being suspended. */
  suspensionDetails?: Array<AccountSuspensionDetails>;
  /** The amount of time remaining to appeal an imminent suspension. After this window has elapsed, the account will be suspended. Only populated if the account suspension is in WARNING state. */
  appealWindow?: string;
}

export const AccountSuspensionWarning: Schema.Schema<AccountSuspensionWarning> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  suspensionDetails: Schema.optional(Schema.Array(AccountSuspensionDetails)),
  appealWindow: Schema.optional(Schema.String),
})).annotate({ identifier: "AccountSuspensionWarning" }) as any as Schema.Schema<AccountSuspensionWarning>;

export interface MergeInfo {
  /** The new tracking ID from the parent incident. */
  newIncidentTrackingId?: string;
  /** Optional. New alert ID. Reference the [google.apps.alertcenter.Alert] with this ID for the current state. */
  newAlertId?: string;
}

export const MergeInfo: Schema.Schema<MergeInfo> = Schema.suspend(() => Schema.Struct({
  newIncidentTrackingId: Schema.optional(Schema.String),
  newAlertId: Schema.optional(Schema.String),
})).annotate({ identifier: "MergeInfo" }) as any as Schema.Schema<MergeInfo>;

export interface AppsOutage {
  /** List of products impacted by the outage. */
  products?: Array<string>;
  /** Timestamp by which the next update is expected to arrive. */
  nextUpdateTime?: string;
  /** Timestamp when the outage is expected to be resolved, or has confirmed resolution. Provided only when known. */
  resolutionTime?: string;
  /** Link to the outage event in Google Workspace Status Dashboard */
  dashboardUri?: string;
  /** Current outage status. */
  status?: "STATUS_UNSPECIFIED" | "NEW" | "ONGOING" | "RESOLVED" | "FALSE_POSITIVE" | "PARTIALLY_RESOLVED" | "MERGED" | "DOWNGRADED" | (string & {});
  /** Incident tracking ID. */
  incidentTrackingId?: string;
  /** Indicates new alert details under which the outage is communicated. Only populated when Status is MERGED. */
  mergeInfo?: MergeInfo;
}

export const AppsOutage: Schema.Schema<AppsOutage> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(Schema.String)),
  nextUpdateTime: Schema.optional(Schema.String),
  resolutionTime: Schema.optional(Schema.String),
  dashboardUri: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  incidentTrackingId: Schema.optional(Schema.String),
  mergeInfo: Schema.optional(MergeInfo),
})).annotate({ identifier: "AppsOutage" }) as any as Schema.Schema<AppsOutage>;

export interface SupportTicket {
  /** Support ticket ID */
  ticketId?: string;
  /** Link to support ticket */
  ticketUrl?: string;
}

export const SupportTicket: Schema.Schema<SupportTicket> = Schema.suspend(() => Schema.Struct({
  ticketId: Schema.optional(Schema.String),
  ticketUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "SupportTicket" }) as any as Schema.Schema<SupportTicket>;

export interface AccessApproval {
  /** ID of the Access Approvals request. This is a helpful field when requesting support from Google. */
  requestId?: string;
  /** Scope of access, also known as a resource. This is further narrowed down by the product field. */
  scope?: string;
  /** Support tickets related to this Access Approvals request. Populated if there is an associated case number. */
  tickets?: Array<SupportTicket>;
  /** Office location of Google staff requesting access such as "US". */
  officeLocation?: string;
  /** Justification for data access based on justification enums. */
  justificationReason?: Array<"JUSTIFICATION_UNSPECIFIED" | "CUSTOMER_INITIATED_SUPPORT" | "GOOGLE_INITIATED_REVIEW" | "GOOGLE_INITIATED_SERVICE" | "THIRD_PARTY_DATA_REQUEST" | "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT" | (string & {})>;
  /** Products within scope of the Access Approvals request. */
  products?: Array<string>;
}

export const AccessApproval: Schema.Schema<AccessApproval> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  tickets: Schema.optional(Schema.Array(SupportTicket)),
  officeLocation: Schema.optional(Schema.String),
  justificationReason: Schema.optional(Schema.Array(Schema.String)),
  products: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AccessApproval" }) as any as Schema.Schema<AccessApproval>;

export interface MandatoryServiceAnnouncement {
  /** One line summary of the announcement */
  title?: string;
  /** Detailed, freeform text describing the announcement */
  description?: string;
}

export const MandatoryServiceAnnouncement: Schema.Schema<MandatoryServiceAnnouncement> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "MandatoryServiceAnnouncement" }) as any as Schema.Schema<MandatoryServiceAnnouncement>;

export interface PrimaryAdminChangedEvent {
  /** domain in which actioned occurred */
  domain?: string;
  /** Email of person who was the primary admin before the action */
  previousAdminEmail?: string;
  /** Email of person who is the primary admin after the action */
  updatedAdminEmail?: string;
}

export const PrimaryAdminChangedEvent: Schema.Schema<PrimaryAdminChangedEvent> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  previousAdminEmail: Schema.optional(Schema.String),
  updatedAdminEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "PrimaryAdminChangedEvent" }) as any as Schema.Schema<PrimaryAdminChangedEvent>;

export interface SSOProfileCreatedEvent {
  /** sso profile name which got created */
  inboundSsoProfileName?: string;
}

export const SSOProfileCreatedEvent: Schema.Schema<SSOProfileCreatedEvent> = Schema.suspend(() => Schema.Struct({
  inboundSsoProfileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SSOProfileCreatedEvent" }) as any as Schema.Schema<SSOProfileCreatedEvent>;

export interface SSOProfileUpdatedEvent {
  /** sso profile name which got updated */
  inboundSsoProfileName?: string;
  /** changes made to sso profile */
  inboundSsoProfileChanges?: string;
}

export const SSOProfileUpdatedEvent: Schema.Schema<SSOProfileUpdatedEvent> = Schema.suspend(() => Schema.Struct({
  inboundSsoProfileName: Schema.optional(Schema.String),
  inboundSsoProfileChanges: Schema.optional(Schema.String),
})).annotate({ identifier: "SSOProfileUpdatedEvent" }) as any as Schema.Schema<SSOProfileUpdatedEvent>;

export interface SSOProfileDeletedEvent {
  /** sso profile name which got deleted */
  inboundSsoProfileName?: string;
}

export const SSOProfileDeletedEvent: Schema.Schema<SSOProfileDeletedEvent> = Schema.suspend(() => Schema.Struct({
  inboundSsoProfileName: Schema.optional(Schema.String),
})).annotate({ identifier: "SSOProfileDeletedEvent" }) as any as Schema.Schema<SSOProfileDeletedEvent>;

export interface SuperAdminPasswordResetEvent {
  /** email of person whose password was reset */
  userEmail?: string;
}

export const SuperAdminPasswordResetEvent: Schema.Schema<SuperAdminPasswordResetEvent> = Schema.suspend(() => Schema.Struct({
  userEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "SuperAdminPasswordResetEvent" }) as any as Schema.Schema<SuperAdminPasswordResetEvent>;

export interface SensitiveAdminAction {
  /** The time at which event occurred */
  eventTime?: string;
  /** Email of person who performed the action */
  actorEmail?: string;
  /** Event occurred when primary admin changed in customer's account */
  primaryAdminChangedEvent?: PrimaryAdminChangedEvent;
  /** Event occurred when SSO Profile created in customer's account */
  ssoProfileCreatedEvent?: SSOProfileCreatedEvent;
  /** Event occurred when SSO Profile updated in customer's account */
  ssoProfileUpdatedEvent?: SSOProfileUpdatedEvent;
  /** Event occurred when SSO Profile deleted in customer's account */
  ssoProfileDeletedEvent?: SSOProfileDeletedEvent;
  /** Event occurred when password was reset for super admin in customer's account */
  superAdminPasswordResetEvent?: SuperAdminPasswordResetEvent;
}

export const SensitiveAdminAction: Schema.Schema<SensitiveAdminAction> = Schema.suspend(() => Schema.Struct({
  eventTime: Schema.optional(Schema.String),
  actorEmail: Schema.optional(Schema.String),
  primaryAdminChangedEvent: Schema.optional(PrimaryAdminChangedEvent),
  ssoProfileCreatedEvent: Schema.optional(SSOProfileCreatedEvent),
  ssoProfileUpdatedEvent: Schema.optional(SSOProfileUpdatedEvent),
  ssoProfileDeletedEvent: Schema.optional(SSOProfileDeletedEvent),
  superAdminPasswordResetEvent: Schema.optional(SuperAdminPasswordResetEvent),
})).annotate({ identifier: "SensitiveAdminAction" }) as any as Schema.Schema<SensitiveAdminAction>;

export interface ApnsCertificateExpirationInfo {
  /** The expiration date of the APNS certificate. */
  expirationTime?: string;
  /** The Apple ID used to create the certificate. It may be blank if admins didn't enter it. */
  appleId?: string;
  /** The UID of the certificate. */
  uid?: string;
}

export const ApnsCertificateExpirationInfo: Schema.Schema<ApnsCertificateExpirationInfo> = Schema.suspend(() => Schema.Struct({
  expirationTime: Schema.optional(Schema.String),
  appleId: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "ApnsCertificateExpirationInfo" }) as any as Schema.Schema<ApnsCertificateExpirationInfo>;

export interface Entity {
  /** Human-readable name of this entity, such as an email address, file ID, or device name. */
  name?: string;
  /** Link to a Security Investigation Tool search based on this entity, if available. */
  link?: string;
  /** Extra values beyond name. The order of values should align with headers in EntityList. */
  values?: Array<string>;
}

export const Entity: Schema.Schema<Entity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  link: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface EntityList {
  /** Name of the key detail used to display this entity list. */
  name?: string;
  /** Headers of the values in entities. If no value is defined in Entity, this field should be empty. */
  headers?: Array<string>;
  /** List of entities affected by the alert. */
  entities?: Array<Entity>;
}

export const EntityList: Schema.Schema<EntityList> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Array(Schema.String)),
  entities: Schema.optional(Schema.Array(Entity)),
})).annotate({ identifier: "EntityList" }) as any as Schema.Schema<EntityList>;

export interface AbuseDetected {
  /** Unique identifier of each sub alert that is onboarded. */
  subAlertId?: string;
  /** Product that the abuse is originating from. */
  product?: string;
  /** List of abusive users/entities to be displayed in a table in the alert. */
  additionalDetails?: EntityList;
  /** Variation of AbuseDetected alerts. The variation_type determines the texts displayed the alert details. This differs from sub_alert_id because each sub alert can have multiple variation_types, representing different stages of the alert. */
  variationType?: "ABUSE_DETECTED_VARIATION_TYPE_UNSPECIFIED" | "DRIVE_ABUSIVE_CONTENT" | "LIMITED_DISABLE" | (string & {});
}

export const AbuseDetected: Schema.Schema<AbuseDetected> = Schema.suspend(() => Schema.Struct({
  subAlertId: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  additionalDetails: Schema.optional(EntityList),
  variationType: Schema.optional(Schema.String),
})).annotate({ identifier: "AbuseDetected" }) as any as Schema.Schema<AbuseDetected>;

export interface DeviceManagementRule {
  /** The email of the user this alert was created for. */
  email?: string;
  /** Required. The device ID. */
  deviceId?: string;
  /** The serial number of the device. */
  serialNumber?: string;
  /** The type of the device. */
  deviceType?: string;
  /** The model of the device. */
  deviceModel?: string;
  /** The device resource ID. */
  resourceId?: string;
  /** Required for iOS, empty for others. */
  iosVendorId?: string;
  /** Action taken as result of the rule */
  ruleAction?: string;
  /** Obfuscated ID of the owner of the device */
  ownerId?: string;
  /** ID of the rule that triggered the alert */
  id?: string;
}

export const DeviceManagementRule: Schema.Schema<DeviceManagementRule> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
  serialNumber: Schema.optional(Schema.String),
  deviceType: Schema.optional(Schema.String),
  deviceModel: Schema.optional(Schema.String),
  resourceId: Schema.optional(Schema.String),
  iosVendorId: Schema.optional(Schema.String),
  ruleAction: Schema.optional(Schema.String),
  ownerId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceManagementRule" }) as any as Schema.Schema<DeviceManagementRule>;

export interface VaultAcceleratedDeletion {
  /** The action can be one of create and cancel */
  actionType?: "VAULT_ACCELERATED_DELETION_ACTION_TYPE_UNSPECIFIED" | "VAULT_ACCELERATED_DELETION_ACTION_TYPE_CREATE" | "VAULT_ACCELERATED_DELETION_ACTION_TYPE_CANCEL" | (string & {});
  /** Currentlty only Gmail is supported as app type */
  appType?: "VAULT_ACCELERATED_DELETION_APP_TYPE_UNSPECIFIED" | "VAULT_ACCELERATED_DELETION_APP_TYPE_GMAIL" | (string & {});
  /** Matter ID of the accelerated deletion request intended to be used to construct the Vault UI link to the AD request */
  matterId?: string;
  /** Accelerated deletion request ID intended to be used to construct the Vault UI link to the AD request */
  deletionRequestId?: string;
  /** The UTC timestamp of when the AD request was created */
  createTime?: string;
}

export const VaultAcceleratedDeletion: Schema.Schema<VaultAcceleratedDeletion> = Schema.suspend(() => Schema.Struct({
  actionType: Schema.optional(Schema.String),
  appType: Schema.optional(Schema.String),
  matterId: Schema.optional(Schema.String),
  deletionRequestId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "VaultAcceleratedDeletion" }) as any as Schema.Schema<VaultAcceleratedDeletion>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists the alerts. */
export interface ListAlertsRequest {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alerts are associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Optional. The requested page size. Server may return fewer items than requested. If unspecified, server picks an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. If empty, a new iteration is started. To continue an iteration, pass in the value from the previous ListAlertsResponse's next_page_token field. */
  pageToken?: string;
  /** Optional. A query string for filtering alert results. For more details, see [Query filters](https://developers.google.com/workspace/admin/alertcenter/guides/query-filters) and [Supported query filter fields](https://developers.google.com/workspace/admin/alertcenter/reference/filter-fields#alerts.list). */
  filter?: string;
  /** Optional. The sort order of the list results. If not specified results may be returned in arbitrary order. You can sort the results in descending order based on the creation timestamp using `order_by="create_time desc"`. Currently, supported sorting are `create_time asc`, `create_time desc`, `update_time desc` */
  orderBy?: string;
}

export const ListAlertsRequest = Schema.Struct({
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/alerts" }),
  svc,
) as unknown as Schema.Schema<ListAlertsRequest>;

export type ListAlertsResponse_Op = ListAlertsResponse;
export const ListAlertsResponse_Op = ListAlertsResponse;

export type ListAlertsError = CommonErrors;

export const listAlerts = API.makePaginated(() => ({
  input: ListAlertsRequest,
  output: ListAlertsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified alert. Attempting to get a nonexistent alert returns `NOT_FOUND` error. */
export interface GetAlertsRequest {
  /** Required. The identifier of the alert to retrieve. */
  alertId: string;
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
}

export const GetAlertsRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/alerts/{alertId}" }),
  svc,
) as unknown as Schema.Schema<GetAlertsRequest>;

export type GetAlertsResponse = Alert;
export const GetAlertsResponse = Alert;

export type GetAlertsError = CommonErrors;

export const getAlerts: API.OperationMethod<GetAlertsRequest, GetAlertsResponse, GetAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAlertsRequest,
  output: GetAlertsResponse,
  errors: [],
}));

/** Marks the specified alert for deletion. An alert that has been marked for deletion is removed from Alert Center after 30 days. Marking an alert for deletion has no effect on an alert which has already been marked for deletion. Attempting to mark a nonexistent alert for deletion results in a `NOT_FOUND` error. */
export interface DeleteAlertsRequest {
  /** Required. The identifier of the alert to delete. */
  alertId: string;
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
}

export const DeleteAlertsRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/alerts/{alertId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAlertsRequest>;

export type DeleteAlertsResponse = Empty;
export const DeleteAlertsResponse = Empty;

export type DeleteAlertsError = CommonErrors;

export const deleteAlerts: API.OperationMethod<DeleteAlertsRequest, DeleteAlertsResponse, DeleteAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAlertsRequest,
  output: DeleteAlertsResponse,
  errors: [],
}));

/** Restores, or "undeletes", an alert that was marked for deletion within the past 30 days. Attempting to undelete an alert which was marked for deletion over 30 days ago (which has been removed from the Alert Center database) or a nonexistent alert returns a `NOT_FOUND` error. Attempting to undelete an alert which has not been marked for deletion has no effect. */
export interface UndeleteAlertsRequest {
  /** Required. The identifier of the alert to undelete. */
  alertId: string;
  /** Request body */
  body?: UndeleteAlertRequest;
}

export const UndeleteAlertsRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  body: Schema.optional(UndeleteAlertRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/alerts/{alertId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteAlertsRequest>;

export type UndeleteAlertsResponse = Alert;
export const UndeleteAlertsResponse = Alert;

export type UndeleteAlertsError = CommonErrors;

export const undeleteAlerts: API.OperationMethod<UndeleteAlertsRequest, UndeleteAlertsResponse, UndeleteAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteAlertsRequest,
  output: UndeleteAlertsResponse,
  errors: [],
}));

/** Returns the metadata of an alert. Attempting to get metadata for a non-existent alert returns `NOT_FOUND` error. */
export interface GetMetadataAlertsRequest {
  /** Required. The identifier of the alert this metadata belongs to. */
  alertId: string;
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert metadata is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
}

export const GetMetadataAlertsRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/alerts/{alertId}/metadata" }),
  svc,
) as unknown as Schema.Schema<GetMetadataAlertsRequest>;

export type GetMetadataAlertsResponse = AlertMetadata;
export const GetMetadataAlertsResponse = AlertMetadata;

export type GetMetadataAlertsError = CommonErrors;

export const getMetadataAlerts: API.OperationMethod<GetMetadataAlertsRequest, GetMetadataAlertsResponse, GetMetadataAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetMetadataAlertsRequest,
  output: GetMetadataAlertsResponse,
  errors: [],
}));

/** Performs batch delete operation on alerts. */
export interface BatchDeleteAlertsRequest_Op {
  /** Request body */
  body?: BatchDeleteAlertsRequest;
}

export const BatchDeleteAlertsRequest_Op = Schema.Struct({
  body: Schema.optional(BatchDeleteAlertsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/alerts:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteAlertsRequest_Op>;

export type BatchDeleteAlertsResponse_Op = BatchDeleteAlertsResponse;
export const BatchDeleteAlertsResponse_Op = BatchDeleteAlertsResponse;

export type BatchDeleteAlertsError = CommonErrors;

export const batchDeleteAlerts: API.OperationMethod<BatchDeleteAlertsRequest_Op, BatchDeleteAlertsResponse_Op, BatchDeleteAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteAlertsRequest_Op,
  output: BatchDeleteAlertsResponse_Op,
  errors: [],
}));

/** Performs batch undelete operation on alerts. */
export interface BatchUndeleteAlertsRequest_Op {
  /** Request body */
  body?: BatchUndeleteAlertsRequest;
}

export const BatchUndeleteAlertsRequest_Op = Schema.Struct({
  body: Schema.optional(BatchUndeleteAlertsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/alerts:batchUndelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUndeleteAlertsRequest_Op>;

export type BatchUndeleteAlertsResponse_Op = BatchUndeleteAlertsResponse;
export const BatchUndeleteAlertsResponse_Op = BatchUndeleteAlertsResponse;

export type BatchUndeleteAlertsError = CommonErrors;

export const batchUndeleteAlerts: API.OperationMethod<BatchUndeleteAlertsRequest_Op, BatchUndeleteAlertsResponse_Op, BatchUndeleteAlertsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUndeleteAlertsRequest_Op,
  output: BatchUndeleteAlertsResponse_Op,
  errors: [],
}));

/** Creates new feedback for an alert. Attempting to create a feedback for a non-existent alert returns `NOT_FOUND` error. Attempting to create a feedback for an alert that is marked for deletion returns `FAILED_PRECONDITION' error. */
export interface CreateAlertsFeedbackRequest {
  /** Required. The identifier of the alert this feedback belongs to. */
  alertId: string;
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Request body */
  body?: AlertFeedback;
}

export const CreateAlertsFeedbackRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  body: Schema.optional(AlertFeedback).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/alerts/{alertId}/feedback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAlertsFeedbackRequest>;

export type CreateAlertsFeedbackResponse = AlertFeedback;
export const CreateAlertsFeedbackResponse = AlertFeedback;

export type CreateAlertsFeedbackError = CommonErrors;

export const createAlertsFeedback: API.OperationMethod<CreateAlertsFeedbackRequest, CreateAlertsFeedbackResponse, CreateAlertsFeedbackError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAlertsFeedbackRequest,
  output: CreateAlertsFeedbackResponse,
  errors: [],
}));

/** Lists all the feedback for an alert. Attempting to list feedbacks for a non-existent alert returns `NOT_FOUND` error. */
export interface ListAlertsFeedbackRequest {
  /** Required. The alert identifier. The "-" wildcard could be used to represent all alerts. */
  alertId: string;
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert is associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Optional. A query string for filtering alert feedback results. For more details, see [Query filters](https://developers.google.com/workspace/admin/alertcenter/guides/query-filters) and [Supported query filter fields](https://developers.google.com/workspace/admin/alertcenter/reference/filter-fields#alerts.feedback.list). */
  filter?: string;
}

export const ListAlertsFeedbackRequest = Schema.Struct({
  alertId: Schema.String.pipe(T.HttpPath("alertId")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/alerts/{alertId}/feedback" }),
  svc,
) as unknown as Schema.Schema<ListAlertsFeedbackRequest>;

export type ListAlertsFeedbackResponse = ListAlertFeedbackResponse;
export const ListAlertsFeedbackResponse = ListAlertFeedbackResponse;

export type ListAlertsFeedbackError = CommonErrors;

export const listAlertsFeedback: API.OperationMethod<ListAlertsFeedbackRequest, ListAlertsFeedbackResponse, ListAlertsFeedbackError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAlertsFeedbackRequest,
  output: ListAlertsFeedbackResponse,
  errors: [],
}));

/** Returns customer-level settings. */
export interface GetSettingsV1beta1Request {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert settings are associated with. The `customer_id` must/ have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
}

export const GetSettingsV1beta1Request = Schema.Struct({
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/settings" }),
  svc,
) as unknown as Schema.Schema<GetSettingsV1beta1Request>;

export type GetSettingsV1beta1Response = Settings;
export const GetSettingsV1beta1Response = Settings;

export type GetSettingsV1beta1Error = CommonErrors;

export const getSettingsV1beta1: API.OperationMethod<GetSettingsV1beta1Request, GetSettingsV1beta1Response, GetSettingsV1beta1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSettingsV1beta1Request,
  output: GetSettingsV1beta1Response,
  errors: [],
}));

/** Updates the customer-level settings. */
export interface UpdateSettingsV1beta1Request {
  /** Optional. The unique identifier of the Google Workspace account of the customer the alert settings are associated with. The `customer_id` must have the initial "C" stripped (for example, `046psxkn`). Inferred from the caller identity if not provided. [Find your customer ID](https://support.google.com/cloudidentity/answer/10070793). */
  customerId?: string;
  /** Request body */
  body?: Settings;
}

export const UpdateSettingsV1beta1Request = Schema.Struct({
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  body: Schema.optional(Settings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1beta1/settings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateSettingsV1beta1Request>;

export type UpdateSettingsV1beta1Response = Settings;
export const UpdateSettingsV1beta1Response = Settings;

export type UpdateSettingsV1beta1Error = CommonErrors;

export const updateSettingsV1beta1: API.OperationMethod<UpdateSettingsV1beta1Request, UpdateSettingsV1beta1Response, UpdateSettingsV1beta1Error, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateSettingsV1beta1Request,
  output: UpdateSettingsV1beta1Response,
  errors: [],
}));

