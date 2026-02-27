/**
 * Cloudflare ALERTING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service alerting
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
// Errors
// =============================================================================

export class FiltersRequired extends Schema.TaggedErrorClass<FiltersRequired>()(
  "FiltersRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(FiltersRequired, [{ code: 17103 }]);

export class InternalServerError extends Schema.TaggedErrorClass<InternalServerError>()(
  "InternalServerError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InternalServerError, [{ code: 15000 }]);

export class InvalidAlertType extends Schema.TaggedErrorClass<InvalidAlertType>()(
  "InvalidAlertType",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidAlertType, [{ code: 17004 }]);

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class InvalidWebhookId extends Schema.TaggedErrorClass<InvalidWebhookId>()(
  "InvalidWebhookId",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidWebhookId, [
  { code: 0, message: { includes: "invalid Webhook ID" } },
]);

export class MechanismRequired extends Schema.TaggedErrorClass<MechanismRequired>()(
  "MechanismRequired",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MechanismRequired, [{ code: 17102 }]);

export class PolicyNotFound extends Schema.TaggedErrorClass<PolicyNotFound>()(
  "PolicyNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(PolicyNotFound, [
  { code: 0, message: { includes: "Policy not found" } },
]);

export class WebhookNotFound extends Schema.TaggedErrorClass<WebhookNotFound>()(
  "WebhookNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WebhookNotFound, [
  { code: 0, message: { includes: "Webhook not found" } },
]);

export class WebhookTestFailed extends Schema.TaggedErrorClass<WebhookTestFailed>()(
  "WebhookTestFailed",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(WebhookTestFailed, [
  { code: 0, message: { includes: "Webhook test failed" } },
]);

// =============================================================================
// AvailableAlert
// =============================================================================

export interface ListAvailableAlertsRequest {
  /** The account id */
  accountId: string;
}

export const ListAvailableAlertsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/available_alerts",
  }),
) as unknown as Schema.Schema<ListAvailableAlertsRequest>;

export type ListAvailableAlertsResponse = Record<string, unknown>;

export const ListAvailableAlertsResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<ListAvailableAlertsResponse>;

export type ListAvailableAlertsError = CommonErrors | InvalidRoute;

export const listAvailableAlerts: API.OperationMethod<
  ListAvailableAlertsRequest,
  ListAvailableAlertsResponse,
  ListAvailableAlertsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAvailableAlertsRequest,
  output: ListAvailableAlertsResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// DestinationEligible
// =============================================================================

export interface GetDestinationEligibleRequest {
  /** The account id */
  accountId: string;
}

export const GetDestinationEligibleRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/destinations/eligible",
  }),
) as unknown as Schema.Schema<GetDestinationEligibleRequest>;

export type GetDestinationEligibleResponse = Record<string, unknown>;

export const GetDestinationEligibleResponse = Schema.Struct(
  {},
) as unknown as Schema.Schema<GetDestinationEligibleResponse>;

export type GetDestinationEligibleError = CommonErrors | InvalidRoute;

export const getDestinationEligible: API.OperationMethod<
  GetDestinationEligibleRequest,
  GetDestinationEligibleResponse,
  GetDestinationEligibleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDestinationEligibleRequest,
  output: GetDestinationEligibleResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// DestinationPagerduty
// =============================================================================

export interface GetDestinationPagerdutyRequest {
  /** The account id */
  accountId: string;
}

export const GetDestinationPagerdutyRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty",
  }),
) as unknown as Schema.Schema<GetDestinationPagerdutyRequest>;

export type GetDestinationPagerdutyResponse = { id?: string; name?: string }[];

export const GetDestinationPagerdutyResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<GetDestinationPagerdutyResponse>;

export type GetDestinationPagerdutyError = CommonErrors;

export const getDestinationPagerduty: API.OperationMethod<
  GetDestinationPagerdutyRequest,
  GetDestinationPagerdutyResponse,
  GetDestinationPagerdutyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDestinationPagerdutyRequest,
  output: GetDestinationPagerdutyResponse,
  errors: [],
}));

export interface CreateDestinationPagerdutyRequest {
  /** The account id */
  accountId: string;
}

export const CreateDestinationPagerdutyRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect",
  }),
) as unknown as Schema.Schema<CreateDestinationPagerdutyRequest>;

export interface CreateDestinationPagerdutyResponse {
  /** token in form of UUID */
  id?: string;
}

export const CreateDestinationPagerdutyResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateDestinationPagerdutyResponse>;

export type CreateDestinationPagerdutyError = CommonErrors | InvalidRoute;

export const createDestinationPagerduty: API.OperationMethod<
  CreateDestinationPagerdutyRequest,
  CreateDestinationPagerdutyResponse,
  CreateDestinationPagerdutyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDestinationPagerdutyRequest,
  output: CreateDestinationPagerdutyResponse,
  errors: [InvalidRoute],
}));

export interface DeleteDestinationPagerdutyRequest {
  /** The account id */
  accountId: string;
}

export const DeleteDestinationPagerdutyRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty",
  }),
) as unknown as Schema.Schema<DeleteDestinationPagerdutyRequest>;

export interface DeleteDestinationPagerdutyResponse {
  errors: { message: string; code?: number }[];
  messages: { message: string; code?: number }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteDestinationPagerdutyResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteDestinationPagerdutyResponse>;

export type DeleteDestinationPagerdutyError = CommonErrors | InvalidRoute;

export const deleteDestinationPagerduty: API.OperationMethod<
  DeleteDestinationPagerdutyRequest,
  DeleteDestinationPagerdutyResponse,
  DeleteDestinationPagerdutyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDestinationPagerdutyRequest,
  output: DeleteDestinationPagerdutyResponse,
  errors: [InvalidRoute],
}));

export interface LinkDestinationPagerdutyRequest {
  tokenId: string;
  /** The account id */
  accountId: string;
}

export const LinkDestinationPagerdutyRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect/{tokenId}",
  }),
) as unknown as Schema.Schema<LinkDestinationPagerdutyRequest>;

export interface LinkDestinationPagerdutyResponse {
  /** UUID */
  id?: string;
}

export const LinkDestinationPagerdutyResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<LinkDestinationPagerdutyResponse>;

export type LinkDestinationPagerdutyError = CommonErrors | InvalidRoute;

export const linkDestinationPagerduty: API.OperationMethod<
  LinkDestinationPagerdutyRequest,
  LinkDestinationPagerdutyResponse,
  LinkDestinationPagerdutyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: LinkDestinationPagerdutyRequest,
  output: LinkDestinationPagerdutyResponse,
  errors: [InvalidRoute],
}));

// =============================================================================
// DestinationWebhook
// =============================================================================

export interface GetDestinationWebhookRequest {
  webhookId: string;
  /** The account id */
  accountId: string;
}

export const GetDestinationWebhookRequest = Schema.Struct({
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<GetDestinationWebhookRequest>;

export interface GetDestinationWebhookResponse {
  /** The unique identifier of a webhook */
  id?: string;
  /** Timestamp of when the webhook destination was created. */
  createdAt?: string;
  /** Timestamp of the last time an attempt to dispatch a notification to this webhook failed. */
  lastFailure?: string;
  /** Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook. */
  lastSuccess?: string;
  /** The name of the webhook destination. This will be included in the request body when you receive a webhook notification. */
  name?: string;
  /** Type of webhook endpoint. */
  type?:
    | "datadog"
    | "discord"
    | "feishu"
    | "gchat"
    | "generic"
    | "opsgenie"
    | "slack"
    | "splunk";
  /** The POST endpoint to call when dispatching a notification. */
  url?: string;
}

export const GetDestinationWebhookResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  lastFailure: Schema.optional(Schema.String),
  lastSuccess: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(
    Schema.Literals([
      "datadog",
      "discord",
      "feishu",
      "gchat",
      "generic",
      "opsgenie",
      "slack",
      "splunk",
    ]),
  ),
  url: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdAt: "created_at",
    lastFailure: "last_failure",
    lastSuccess: "last_success",
    name: "name",
    type: "type",
    url: "url",
  }),
) as unknown as Schema.Schema<GetDestinationWebhookResponse>;

export type GetDestinationWebhookError =
  | CommonErrors
  | InvalidRoute
  | WebhookNotFound;

export const getDestinationWebhook: API.OperationMethod<
  GetDestinationWebhookRequest,
  GetDestinationWebhookResponse,
  GetDestinationWebhookError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDestinationWebhookRequest,
  output: GetDestinationWebhookResponse,
  errors: [InvalidRoute, WebhookNotFound],
}));

export interface ListDestinationWebhooksRequest {
  /** The account id */
  accountId: string;
}

export const ListDestinationWebhooksRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/destinations/webhooks",
  }),
) as unknown as Schema.Schema<ListDestinationWebhooksRequest>;

export type ListDestinationWebhooksResponse = {
  id?: string;
  createdAt?: string;
  lastFailure?: string;
  lastSuccess?: string;
  name?: string;
  type?:
    | "datadog"
    | "discord"
    | "feishu"
    | "gchat"
    | "generic"
    | "opsgenie"
    | "slack"
    | "splunk";
  url?: string;
}[];

export const ListDestinationWebhooksResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    lastFailure: Schema.optional(Schema.String),
    lastSuccess: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(
      Schema.Literals([
        "datadog",
        "discord",
        "feishu",
        "gchat",
        "generic",
        "opsgenie",
        "slack",
        "splunk",
      ]),
    ),
    url: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      lastFailure: "last_failure",
      lastSuccess: "last_success",
      name: "name",
      type: "type",
      url: "url",
    }),
  ),
) as unknown as Schema.Schema<ListDestinationWebhooksResponse>;

export type ListDestinationWebhooksError = CommonErrors;

export const listDestinationWebhooks: API.OperationMethod<
  ListDestinationWebhooksRequest,
  ListDestinationWebhooksResponse,
  ListDestinationWebhooksError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDestinationWebhooksRequest,
  output: ListDestinationWebhooksResponse,
  errors: [],
}));

export interface CreateDestinationWebhookRequest {
  /** Path param: The account id */
  accountId: string;
  /** Body param: The name of the webhook destination. This will be included in the request body when you receive a webhook notification. */
  name: string;
  /** Body param: The POST endpoint to call when dispatching a notification. */
  url: string;
  /** Body param: Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any  */
  secret?: string;
}

export const CreateDestinationWebhookRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  url: Schema.String,
  secret: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/alerting/v3/destinations/webhooks",
  }),
) as unknown as Schema.Schema<CreateDestinationWebhookRequest>;

export interface CreateDestinationWebhookResponse {
  /** UUID */
  id?: string;
}

export const CreateDestinationWebhookResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateDestinationWebhookResponse>;

export type CreateDestinationWebhookError =
  | CommonErrors
  | InvalidRoute
  | WebhookTestFailed;

export const createDestinationWebhook: API.OperationMethod<
  CreateDestinationWebhookRequest,
  CreateDestinationWebhookResponse,
  CreateDestinationWebhookError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDestinationWebhookRequest,
  output: CreateDestinationWebhookResponse,
  errors: [InvalidRoute, WebhookTestFailed],
}));

export interface UpdateDestinationWebhookRequest {
  webhookId: string;
  /** Path param: The account id */
  accountId: string;
  /** Body param: The name of the webhook destination. This will be included in the request body when you receive a webhook notification. */
  name: string;
  /** Body param: The POST endpoint to call when dispatching a notification. */
  url: string;
  /** Body param: Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any  */
  secret?: string;
}

export const UpdateDestinationWebhookRequest = Schema.Struct({
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  url: Schema.String,
  secret: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<UpdateDestinationWebhookRequest>;

export interface UpdateDestinationWebhookResponse {
  /** UUID */
  id?: string;
}

export const UpdateDestinationWebhookResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpdateDestinationWebhookResponse>;

export type UpdateDestinationWebhookError =
  | CommonErrors
  | InvalidRoute
  | InvalidWebhookId;

export const updateDestinationWebhook: API.OperationMethod<
  UpdateDestinationWebhookRequest,
  UpdateDestinationWebhookResponse,
  UpdateDestinationWebhookError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateDestinationWebhookRequest,
  output: UpdateDestinationWebhookResponse,
  errors: [InvalidRoute, InvalidWebhookId],
}));

export interface DeleteDestinationWebhookRequest {
  webhookId: string;
  /** The account id */
  accountId: string;
}

export const DeleteDestinationWebhookRequest = Schema.Struct({
  webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhookId}",
  }),
) as unknown as Schema.Schema<DeleteDestinationWebhookRequest>;

export interface DeleteDestinationWebhookResponse {
  errors: { message: string; code?: number }[];
  messages: { message: string; code?: number }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteDestinationWebhookResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteDestinationWebhookResponse>;

export type DeleteDestinationWebhookError =
  | CommonErrors
  | InvalidRoute
  | InternalServerError;

export const deleteDestinationWebhook: API.OperationMethod<
  DeleteDestinationWebhookRequest,
  DeleteDestinationWebhookResponse,
  DeleteDestinationWebhookError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDestinationWebhookRequest,
  output: DeleteDestinationWebhookResponse,
  errors: [InvalidRoute, InternalServerError],
}));

// =============================================================================
// History
// =============================================================================

export interface ListHistoriesRequest {
  /** Path param: The account id */
  accountId: string;
  /** Query param: Limit the returned results to history records older than the specified date. This must be a timestamp that conforms to RFC3339. */
  before?: string;
  /** Query param: Limit the returned results to history records newer than the specified date. This must be a timestamp that conforms to RFC3339. */
  since?: string;
}

export const ListHistoriesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  before: Schema.optional(Schema.String).pipe(T.HttpQuery("before")),
  since: Schema.optional(Schema.String).pipe(T.HttpQuery("since")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/alerting/v3/history" }),
) as unknown as Schema.Schema<ListHistoriesRequest>;

export type ListHistoriesResponse = {
  id?: string;
  alertBody?: string;
  alertType?: string;
  description?: string;
  mechanism?: string;
  mechanismType?: "email" | "pagerduty" | "webhook";
  name?: string;
  policyId?: string;
  sent?: string;
}[];

export const ListHistoriesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    alertBody: Schema.optional(Schema.String),
    alertType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    mechanism: Schema.optional(Schema.String),
    mechanismType: Schema.optional(
      Schema.Literals(["email", "pagerduty", "webhook"]),
    ),
    name: Schema.optional(Schema.String),
    policyId: Schema.optional(Schema.String),
    sent: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      alertBody: "alert_body",
      alertType: "alert_type",
      description: "description",
      mechanism: "mechanism",
      mechanismType: "mechanism_type",
      name: "name",
      policyId: "policy_id",
      sent: "sent",
    }),
  ),
) as unknown as Schema.Schema<ListHistoriesResponse>;

export type ListHistoriesError = CommonErrors;

export const listHistories: API.OperationMethod<
  ListHistoriesRequest,
  ListHistoriesResponse,
  ListHistoriesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListHistoriesRequest,
  output: ListHistoriesResponse,
  errors: [],
}));

// =============================================================================
// Policy
// =============================================================================

export interface GetPolicyRequest {
  policyId: string;
  /** The account id */
  accountId: string;
}

export const GetPolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/policies/{policyId}",
  }),
) as unknown as Schema.Schema<GetPolicyRequest>;

export interface GetPolicyResponse {
  /** The unique identifier of a notification policy */
  id?: string;
  /** Optional specification of how often to re-alert from the same incident, not support on all alert types. */
  alertInterval?: string;
  /** Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values. */
  alertType?:
    | "abuse_report_alert"
    | "access_custom_certificate_expiration_type"
    | "advanced_ddos_attack_l4_alert"
    | "advanced_ddos_attack_l7_alert"
    | "advanced_http_alert_error"
    | "bgp_hijack_notification"
    | "billing_usage_alert"
    | "block_notification_block_removed"
    | "block_notification_new_block"
    | "block_notification_review_rejected"
    | "bot_traffic_basic_alert"
    | "brand_protection_alert"
    | "brand_protection_digest"
    | "clickhouse_alert_fw_anomaly"
    | "clickhouse_alert_fw_ent_anomaly"
    | "cloudforce_one_request_notification"
    | "custom_analytics"
    | "custom_bot_detection_alert"
    | "custom_ssl_certificate_event_type"
    | "dedicated_ssl_certificate_event_type"
    | "device_connectivity_anomaly_alert"
    | "dos_attack_l4"
    | "dos_attack_l7"
    | "expiring_service_token_alert"
    | "failing_logpush_job_disabled_alert"
    | "fbm_auto_advertisement"
    | "fbm_dosd_attack"
    | "fbm_volumetric_attack"
    | "health_check_status_notification"
    | "hostname_aop_custom_certificate_expiration_type"
    | "http_alert_edge_error"
    | "http_alert_origin_error"
    | "image_notification"
    | "image_resizing_notification"
    | "incident_alert"
    | "load_balancing_health_alert"
    | "load_balancing_pool_enablement_alert"
    | "logo_match_alert"
    | "magic_tunnel_health_check_event"
    | "magic_wan_tunnel_health"
    | "maintenance_event_notification"
    | "mtls_certificate_store_certificate_expiration_type"
    | "pages_event_alert"
    | "radar_notification"
    | "real_origin_monitoring"
    | "scriptmonitor_alert_new_code_change_detections"
    | "scriptmonitor_alert_new_hosts"
    | "scriptmonitor_alert_new_malicious_hosts"
    | "scriptmonitor_alert_new_malicious_scripts"
    | "scriptmonitor_alert_new_malicious_url"
    | "scriptmonitor_alert_new_max_length_resource_url"
    | "scriptmonitor_alert_new_resources"
    | "secondary_dns_all_primaries_failing"
    | "secondary_dns_primaries_failing"
    | "secondary_dns_warning"
    | "secondary_dns_zone_successfully_updated"
    | "secondary_dns_zone_validation_warning"
    | "security_insights_alert"
    | "sentinel_alert"
    | "stream_live_notifications"
    | "synthetic_test_latency_alert"
    | "synthetic_test_low_availability_alert"
    | "traffic_anomalies_alert"
    | "tunnel_health_event"
    | "tunnel_update_event"
    | "universal_ssl_event_type"
    | "web_analytics_metrics_update"
    | "zone_aop_custom_certificate_expiration_type";
  created?: string;
  /** Optional description for the Notification policy. */
  description?: string;
  /** Whether or not the Notification policy is enabled. */
  enabled?: boolean;
  /** Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for mor */
  filters?: {
    actions?: string[];
    affectedAsns?: string[];
    affectedComponents?: string[];
    affectedLocations?: string[];
    airportCode?: string[];
    alertTriggerPreferences?: string[];
    alertTriggerPreferencesValue?: string[];
    enabled?: string[];
    environment?: string[];
    event?: string[];
    eventSource?: string[];
    eventType?: string[];
    groupBy?: string[];
    healthCheckId?: string[];
    incidentImpact?: (
      | "INCIDENT_IMPACT_NONE"
      | "INCIDENT_IMPACT_MINOR"
      | "INCIDENT_IMPACT_MAJOR"
      | "INCIDENT_IMPACT_CRITICAL"
    )[];
    inputId?: string[];
    insightClass?: string[];
    limit?: string[];
    logoTag?: string[];
    megabitsPerSecond?: string[];
    newHealth?: string[];
    newStatus?: string[];
    packetsPerSecond?: string[];
    poolId?: string[];
    popNames?: string[];
    product?: string[];
    projectId?: string[];
    protocol?: string[];
    queryTag?: string[];
    requestsPerSecond?: string[];
    selectors?: string[];
    services?: string[];
    slo?: string[];
    status?: string[];
    targetHostname?: string[];
    targetIp?: string[];
    targetZoneName?: string[];
    trafficExclusions?: "security_events"[];
    tunnelId?: string[];
    tunnelName?: string[];
    type?: string[];
    where?: string[];
    zones?: string[];
  };
  /** List of IDs that will be used when dispatching a notification. IDs for email type will be the email address. */
  mechanisms?: {
    email?: { id?: string }[];
    pagerduty?: { id?: string }[];
    webhooks?: { id?: string }[];
  };
  modified?: string;
  /** Name of the policy. */
  name?: string;
}

export const GetPolicyResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  alertInterval: Schema.optional(Schema.String),
  alertType: Schema.optional(
    Schema.Literals([
      "abuse_report_alert",
      "access_custom_certificate_expiration_type",
      "advanced_ddos_attack_l4_alert",
      "advanced_ddos_attack_l7_alert",
      "advanced_http_alert_error",
      "bgp_hijack_notification",
      "billing_usage_alert",
      "block_notification_block_removed",
      "block_notification_new_block",
      "block_notification_review_rejected",
      "bot_traffic_basic_alert",
      "brand_protection_alert",
      "brand_protection_digest",
      "clickhouse_alert_fw_anomaly",
      "clickhouse_alert_fw_ent_anomaly",
      "cloudforce_one_request_notification",
      "custom_analytics",
      "custom_bot_detection_alert",
      "custom_ssl_certificate_event_type",
      "dedicated_ssl_certificate_event_type",
      "device_connectivity_anomaly_alert",
      "dos_attack_l4",
      "dos_attack_l7",
      "expiring_service_token_alert",
      "failing_logpush_job_disabled_alert",
      "fbm_auto_advertisement",
      "fbm_dosd_attack",
      "fbm_volumetric_attack",
      "health_check_status_notification",
      "hostname_aop_custom_certificate_expiration_type",
      "http_alert_edge_error",
      "http_alert_origin_error",
      "image_notification",
      "image_resizing_notification",
      "incident_alert",
      "load_balancing_health_alert",
      "load_balancing_pool_enablement_alert",
      "logo_match_alert",
      "magic_tunnel_health_check_event",
      "magic_wan_tunnel_health",
      "maintenance_event_notification",
      "mtls_certificate_store_certificate_expiration_type",
      "pages_event_alert",
      "radar_notification",
      "real_origin_monitoring",
      "scriptmonitor_alert_new_code_change_detections",
      "scriptmonitor_alert_new_hosts",
      "scriptmonitor_alert_new_malicious_hosts",
      "scriptmonitor_alert_new_malicious_scripts",
      "scriptmonitor_alert_new_malicious_url",
      "scriptmonitor_alert_new_max_length_resource_url",
      "scriptmonitor_alert_new_resources",
      "secondary_dns_all_primaries_failing",
      "secondary_dns_primaries_failing",
      "secondary_dns_warning",
      "secondary_dns_zone_successfully_updated",
      "secondary_dns_zone_validation_warning",
      "security_insights_alert",
      "sentinel_alert",
      "stream_live_notifications",
      "synthetic_test_latency_alert",
      "synthetic_test_low_availability_alert",
      "traffic_anomalies_alert",
      "tunnel_health_event",
      "tunnel_update_event",
      "universal_ssl_event_type",
      "web_analytics_metrics_update",
      "zone_aop_custom_certificate_expiration_type",
    ]),
  ),
  created: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  filters: Schema.optional(
    Schema.Struct({
      actions: Schema.optional(Schema.Array(Schema.String)),
      affectedAsns: Schema.optional(Schema.Array(Schema.String)),
      affectedComponents: Schema.optional(Schema.Array(Schema.String)),
      affectedLocations: Schema.optional(Schema.Array(Schema.String)),
      airportCode: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferences: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferencesValue: Schema.optional(
        Schema.Array(Schema.String),
      ),
      enabled: Schema.optional(Schema.Array(Schema.String)),
      environment: Schema.optional(Schema.Array(Schema.String)),
      event: Schema.optional(Schema.Array(Schema.String)),
      eventSource: Schema.optional(Schema.Array(Schema.String)),
      eventType: Schema.optional(Schema.Array(Schema.String)),
      groupBy: Schema.optional(Schema.Array(Schema.String)),
      healthCheckId: Schema.optional(Schema.Array(Schema.String)),
      incidentImpact: Schema.optional(
        Schema.Array(
          Schema.Literals([
            "INCIDENT_IMPACT_NONE",
            "INCIDENT_IMPACT_MINOR",
            "INCIDENT_IMPACT_MAJOR",
            "INCIDENT_IMPACT_CRITICAL",
          ]),
        ),
      ),
      inputId: Schema.optional(Schema.Array(Schema.String)),
      insightClass: Schema.optional(Schema.Array(Schema.String)),
      limit: Schema.optional(Schema.Array(Schema.String)),
      logoTag: Schema.optional(Schema.Array(Schema.String)),
      megabitsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      newHealth: Schema.optional(Schema.Array(Schema.String)),
      newStatus: Schema.optional(Schema.Array(Schema.String)),
      packetsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      poolId: Schema.optional(Schema.Array(Schema.String)),
      popNames: Schema.optional(Schema.Array(Schema.String)),
      product: Schema.optional(Schema.Array(Schema.String)),
      projectId: Schema.optional(Schema.Array(Schema.String)),
      protocol: Schema.optional(Schema.Array(Schema.String)),
      queryTag: Schema.optional(Schema.Array(Schema.String)),
      requestsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      selectors: Schema.optional(Schema.Array(Schema.String)),
      services: Schema.optional(Schema.Array(Schema.String)),
      slo: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.Array(Schema.String)),
      targetHostname: Schema.optional(Schema.Array(Schema.String)),
      targetIp: Schema.optional(Schema.Array(Schema.String)),
      targetZoneName: Schema.optional(Schema.Array(Schema.String)),
      trafficExclusions: Schema.optional(
        Schema.Array(Schema.Literal("security_events")),
      ),
      tunnelId: Schema.optional(Schema.Array(Schema.String)),
      tunnelName: Schema.optional(Schema.Array(Schema.String)),
      type: Schema.optional(Schema.Array(Schema.String)),
      where: Schema.optional(Schema.Array(Schema.String)),
      zones: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        actions: "actions",
        affectedAsns: "affected_asns",
        affectedComponents: "affected_components",
        affectedLocations: "affected_locations",
        airportCode: "airport_code",
        alertTriggerPreferences: "alert_trigger_preferences",
        alertTriggerPreferencesValue: "alert_trigger_preferences_value",
        enabled: "enabled",
        environment: "environment",
        event: "event",
        eventSource: "event_source",
        eventType: "event_type",
        groupBy: "group_by",
        healthCheckId: "health_check_id",
        incidentImpact: "incident_impact",
        inputId: "input_id",
        insightClass: "insight_class",
        limit: "limit",
        logoTag: "logo_tag",
        megabitsPerSecond: "megabits_per_second",
        newHealth: "new_health",
        newStatus: "new_status",
        packetsPerSecond: "packets_per_second",
        poolId: "pool_id",
        popNames: "pop_names",
        product: "product",
        projectId: "project_id",
        protocol: "protocol",
        queryTag: "query_tag",
        requestsPerSecond: "requests_per_second",
        selectors: "selectors",
        services: "services",
        slo: "slo",
        status: "status",
        targetHostname: "target_hostname",
        targetIp: "target_ip",
        targetZoneName: "target_zone_name",
        trafficExclusions: "traffic_exclusions",
        tunnelId: "tunnel_id",
        tunnelName: "tunnel_name",
        type: "type",
        where: "where",
        zones: "zones",
      }),
    ),
  ),
  mechanisms: Schema.optional(
    Schema.Struct({
      email: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
      pagerduty: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
      webhooks: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  modified: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    alertInterval: "alert_interval",
    alertType: "alert_type",
    created: "created",
    description: "description",
    enabled: "enabled",
    filters: "filters",
    mechanisms: "mechanisms",
    modified: "modified",
    name: "name",
  }),
) as unknown as Schema.Schema<GetPolicyResponse>;

export type GetPolicyError = CommonErrors | InvalidRoute | PolicyNotFound;

export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [InvalidRoute, PolicyNotFound],
}));

export interface ListPoliciesRequest {
  /** The account id */
  accountId: string;
}

export const ListPoliciesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/policies",
  }),
) as unknown as Schema.Schema<ListPoliciesRequest>;

export type ListPoliciesResponse = {
  id?: string;
  alertInterval?: string;
  alertType?:
    | "abuse_report_alert"
    | "access_custom_certificate_expiration_type"
    | "advanced_ddos_attack_l4_alert"
    | "advanced_ddos_attack_l7_alert"
    | "advanced_http_alert_error"
    | "bgp_hijack_notification"
    | "billing_usage_alert"
    | "block_notification_block_removed"
    | "block_notification_new_block"
    | "block_notification_review_rejected"
    | "bot_traffic_basic_alert"
    | "brand_protection_alert"
    | "brand_protection_digest"
    | "clickhouse_alert_fw_anomaly"
    | "clickhouse_alert_fw_ent_anomaly"
    | "cloudforce_one_request_notification"
    | "custom_analytics"
    | "custom_bot_detection_alert"
    | "custom_ssl_certificate_event_type"
    | "dedicated_ssl_certificate_event_type"
    | "device_connectivity_anomaly_alert"
    | "dos_attack_l4"
    | "dos_attack_l7"
    | "expiring_service_token_alert"
    | "failing_logpush_job_disabled_alert"
    | "fbm_auto_advertisement"
    | "fbm_dosd_attack"
    | "fbm_volumetric_attack"
    | "health_check_status_notification"
    | "hostname_aop_custom_certificate_expiration_type"
    | "http_alert_edge_error"
    | "http_alert_origin_error"
    | "image_notification"
    | "image_resizing_notification"
    | "incident_alert"
    | "load_balancing_health_alert"
    | "load_balancing_pool_enablement_alert"
    | "logo_match_alert"
    | "magic_tunnel_health_check_event"
    | "magic_wan_tunnel_health"
    | "maintenance_event_notification"
    | "mtls_certificate_store_certificate_expiration_type"
    | "pages_event_alert"
    | "radar_notification"
    | "real_origin_monitoring"
    | "scriptmonitor_alert_new_code_change_detections"
    | "scriptmonitor_alert_new_hosts"
    | "scriptmonitor_alert_new_malicious_hosts"
    | "scriptmonitor_alert_new_malicious_scripts"
    | "scriptmonitor_alert_new_malicious_url"
    | "scriptmonitor_alert_new_max_length_resource_url"
    | "scriptmonitor_alert_new_resources"
    | "secondary_dns_all_primaries_failing"
    | "secondary_dns_primaries_failing"
    | "secondary_dns_warning"
    | "secondary_dns_zone_successfully_updated"
    | "secondary_dns_zone_validation_warning"
    | "security_insights_alert"
    | "sentinel_alert"
    | "stream_live_notifications"
    | "synthetic_test_latency_alert"
    | "synthetic_test_low_availability_alert"
    | "traffic_anomalies_alert"
    | "tunnel_health_event"
    | "tunnel_update_event"
    | "universal_ssl_event_type"
    | "web_analytics_metrics_update"
    | "zone_aop_custom_certificate_expiration_type";
  created?: string;
  description?: string;
  enabled?: boolean;
  filters?: {
    actions?: string[];
    affectedAsns?: string[];
    affectedComponents?: string[];
    affectedLocations?: string[];
    airportCode?: string[];
    alertTriggerPreferences?: string[];
    alertTriggerPreferencesValue?: string[];
    enabled?: string[];
    environment?: string[];
    event?: string[];
    eventSource?: string[];
    eventType?: string[];
    groupBy?: string[];
    healthCheckId?: string[];
    incidentImpact?: (
      | "INCIDENT_IMPACT_NONE"
      | "INCIDENT_IMPACT_MINOR"
      | "INCIDENT_IMPACT_MAJOR"
      | "INCIDENT_IMPACT_CRITICAL"
    )[];
    inputId?: string[];
    insightClass?: string[];
    limit?: string[];
    logoTag?: string[];
    megabitsPerSecond?: string[];
    newHealth?: string[];
    newStatus?: string[];
    packetsPerSecond?: string[];
    poolId?: string[];
    popNames?: string[];
    product?: string[];
    projectId?: string[];
    protocol?: string[];
    queryTag?: string[];
    requestsPerSecond?: string[];
    selectors?: string[];
    services?: string[];
    slo?: string[];
    status?: string[];
    targetHostname?: string[];
    targetIp?: string[];
    targetZoneName?: string[];
    trafficExclusions?: "security_events"[];
    tunnelId?: string[];
    tunnelName?: string[];
    type?: string[];
    where?: string[];
    zones?: string[];
  };
  mechanisms?: {
    email?: { id?: string }[];
    pagerduty?: { id?: string }[];
    webhooks?: { id?: string }[];
  };
  modified?: string;
  name?: string;
}[];

export const ListPoliciesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    alertInterval: Schema.optional(Schema.String),
    alertType: Schema.optional(
      Schema.Literals([
        "abuse_report_alert",
        "access_custom_certificate_expiration_type",
        "advanced_ddos_attack_l4_alert",
        "advanced_ddos_attack_l7_alert",
        "advanced_http_alert_error",
        "bgp_hijack_notification",
        "billing_usage_alert",
        "block_notification_block_removed",
        "block_notification_new_block",
        "block_notification_review_rejected",
        "bot_traffic_basic_alert",
        "brand_protection_alert",
        "brand_protection_digest",
        "clickhouse_alert_fw_anomaly",
        "clickhouse_alert_fw_ent_anomaly",
        "cloudforce_one_request_notification",
        "custom_analytics",
        "custom_bot_detection_alert",
        "custom_ssl_certificate_event_type",
        "dedicated_ssl_certificate_event_type",
        "device_connectivity_anomaly_alert",
        "dos_attack_l4",
        "dos_attack_l7",
        "expiring_service_token_alert",
        "failing_logpush_job_disabled_alert",
        "fbm_auto_advertisement",
        "fbm_dosd_attack",
        "fbm_volumetric_attack",
        "health_check_status_notification",
        "hostname_aop_custom_certificate_expiration_type",
        "http_alert_edge_error",
        "http_alert_origin_error",
        "image_notification",
        "image_resizing_notification",
        "incident_alert",
        "load_balancing_health_alert",
        "load_balancing_pool_enablement_alert",
        "logo_match_alert",
        "magic_tunnel_health_check_event",
        "magic_wan_tunnel_health",
        "maintenance_event_notification",
        "mtls_certificate_store_certificate_expiration_type",
        "pages_event_alert",
        "radar_notification",
        "real_origin_monitoring",
        "scriptmonitor_alert_new_code_change_detections",
        "scriptmonitor_alert_new_hosts",
        "scriptmonitor_alert_new_malicious_hosts",
        "scriptmonitor_alert_new_malicious_scripts",
        "scriptmonitor_alert_new_malicious_url",
        "scriptmonitor_alert_new_max_length_resource_url",
        "scriptmonitor_alert_new_resources",
        "secondary_dns_all_primaries_failing",
        "secondary_dns_primaries_failing",
        "secondary_dns_warning",
        "secondary_dns_zone_successfully_updated",
        "secondary_dns_zone_validation_warning",
        "security_insights_alert",
        "sentinel_alert",
        "stream_live_notifications",
        "synthetic_test_latency_alert",
        "synthetic_test_low_availability_alert",
        "traffic_anomalies_alert",
        "tunnel_health_event",
        "tunnel_update_event",
        "universal_ssl_event_type",
        "web_analytics_metrics_update",
        "zone_aop_custom_certificate_expiration_type",
      ]),
    ),
    created: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    filters: Schema.optional(
      Schema.Struct({
        actions: Schema.optional(Schema.Array(Schema.String)),
        affectedAsns: Schema.optional(Schema.Array(Schema.String)),
        affectedComponents: Schema.optional(Schema.Array(Schema.String)),
        affectedLocations: Schema.optional(Schema.Array(Schema.String)),
        airportCode: Schema.optional(Schema.Array(Schema.String)),
        alertTriggerPreferences: Schema.optional(Schema.Array(Schema.String)),
        alertTriggerPreferencesValue: Schema.optional(
          Schema.Array(Schema.String),
        ),
        enabled: Schema.optional(Schema.Array(Schema.String)),
        environment: Schema.optional(Schema.Array(Schema.String)),
        event: Schema.optional(Schema.Array(Schema.String)),
        eventSource: Schema.optional(Schema.Array(Schema.String)),
        eventType: Schema.optional(Schema.Array(Schema.String)),
        groupBy: Schema.optional(Schema.Array(Schema.String)),
        healthCheckId: Schema.optional(Schema.Array(Schema.String)),
        incidentImpact: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "INCIDENT_IMPACT_NONE",
              "INCIDENT_IMPACT_MINOR",
              "INCIDENT_IMPACT_MAJOR",
              "INCIDENT_IMPACT_CRITICAL",
            ]),
          ),
        ),
        inputId: Schema.optional(Schema.Array(Schema.String)),
        insightClass: Schema.optional(Schema.Array(Schema.String)),
        limit: Schema.optional(Schema.Array(Schema.String)),
        logoTag: Schema.optional(Schema.Array(Schema.String)),
        megabitsPerSecond: Schema.optional(Schema.Array(Schema.String)),
        newHealth: Schema.optional(Schema.Array(Schema.String)),
        newStatus: Schema.optional(Schema.Array(Schema.String)),
        packetsPerSecond: Schema.optional(Schema.Array(Schema.String)),
        poolId: Schema.optional(Schema.Array(Schema.String)),
        popNames: Schema.optional(Schema.Array(Schema.String)),
        product: Schema.optional(Schema.Array(Schema.String)),
        projectId: Schema.optional(Schema.Array(Schema.String)),
        protocol: Schema.optional(Schema.Array(Schema.String)),
        queryTag: Schema.optional(Schema.Array(Schema.String)),
        requestsPerSecond: Schema.optional(Schema.Array(Schema.String)),
        selectors: Schema.optional(Schema.Array(Schema.String)),
        services: Schema.optional(Schema.Array(Schema.String)),
        slo: Schema.optional(Schema.Array(Schema.String)),
        status: Schema.optional(Schema.Array(Schema.String)),
        targetHostname: Schema.optional(Schema.Array(Schema.String)),
        targetIp: Schema.optional(Schema.Array(Schema.String)),
        targetZoneName: Schema.optional(Schema.Array(Schema.String)),
        trafficExclusions: Schema.optional(
          Schema.Array(Schema.Literal("security_events")),
        ),
        tunnelId: Schema.optional(Schema.Array(Schema.String)),
        tunnelName: Schema.optional(Schema.Array(Schema.String)),
        type: Schema.optional(Schema.Array(Schema.String)),
        where: Schema.optional(Schema.Array(Schema.String)),
        zones: Schema.optional(Schema.Array(Schema.String)),
      }).pipe(
        Schema.encodeKeys({
          actions: "actions",
          affectedAsns: "affected_asns",
          affectedComponents: "affected_components",
          affectedLocations: "affected_locations",
          airportCode: "airport_code",
          alertTriggerPreferences: "alert_trigger_preferences",
          alertTriggerPreferencesValue: "alert_trigger_preferences_value",
          enabled: "enabled",
          environment: "environment",
          event: "event",
          eventSource: "event_source",
          eventType: "event_type",
          groupBy: "group_by",
          healthCheckId: "health_check_id",
          incidentImpact: "incident_impact",
          inputId: "input_id",
          insightClass: "insight_class",
          limit: "limit",
          logoTag: "logo_tag",
          megabitsPerSecond: "megabits_per_second",
          newHealth: "new_health",
          newStatus: "new_status",
          packetsPerSecond: "packets_per_second",
          poolId: "pool_id",
          popNames: "pop_names",
          product: "product",
          projectId: "project_id",
          protocol: "protocol",
          queryTag: "query_tag",
          requestsPerSecond: "requests_per_second",
          selectors: "selectors",
          services: "services",
          slo: "slo",
          status: "status",
          targetHostname: "target_hostname",
          targetIp: "target_ip",
          targetZoneName: "target_zone_name",
          trafficExclusions: "traffic_exclusions",
          tunnelId: "tunnel_id",
          tunnelName: "tunnel_name",
          type: "type",
          where: "where",
          zones: "zones",
        }),
      ),
    ),
    mechanisms: Schema.optional(
      Schema.Struct({
        email: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
            }),
          ),
        ),
        pagerduty: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
            }),
          ),
        ),
        webhooks: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    modified: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      alertInterval: "alert_interval",
      alertType: "alert_type",
      created: "created",
      description: "description",
      enabled: "enabled",
      filters: "filters",
      mechanisms: "mechanisms",
      modified: "modified",
      name: "name",
    }),
  ),
) as unknown as Schema.Schema<ListPoliciesResponse>;

export type ListPoliciesError = CommonErrors;

export const listPolicies: API.OperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [],
}));

export interface CreatePolicyRequest {
  /** Path param: The account id */
  accountId: string;
  /** Body param: Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values. */
  alertType:
    | "abuse_report_alert"
    | "access_custom_certificate_expiration_type"
    | "advanced_ddos_attack_l4_alert"
    | "advanced_ddos_attack_l7_alert"
    | "advanced_http_alert_error"
    | "bgp_hijack_notification"
    | "billing_usage_alert"
    | "block_notification_block_removed"
    | "block_notification_new_block"
    | "block_notification_review_rejected"
    | "bot_traffic_basic_alert"
    | "brand_protection_alert"
    | "brand_protection_digest"
    | "clickhouse_alert_fw_anomaly"
    | "clickhouse_alert_fw_ent_anomaly"
    | "cloudforce_one_request_notification"
    | "custom_analytics"
    | "custom_bot_detection_alert"
    | "custom_ssl_certificate_event_type"
    | "dedicated_ssl_certificate_event_type"
    | "device_connectivity_anomaly_alert"
    | "dos_attack_l4"
    | "dos_attack_l7"
    | "expiring_service_token_alert"
    | "failing_logpush_job_disabled_alert"
    | "fbm_auto_advertisement"
    | "fbm_dosd_attack"
    | "fbm_volumetric_attack"
    | "health_check_status_notification"
    | "hostname_aop_custom_certificate_expiration_type"
    | "http_alert_edge_error"
    | "http_alert_origin_error"
    | "image_notification"
    | "image_resizing_notification"
    | "incident_alert"
    | "load_balancing_health_alert"
    | "load_balancing_pool_enablement_alert"
    | "logo_match_alert"
    | "magic_tunnel_health_check_event"
    | "magic_wan_tunnel_health"
    | "maintenance_event_notification"
    | "mtls_certificate_store_certificate_expiration_type"
    | "pages_event_alert"
    | "radar_notification"
    | "real_origin_monitoring"
    | "scriptmonitor_alert_new_code_change_detections"
    | "scriptmonitor_alert_new_hosts"
    | "scriptmonitor_alert_new_malicious_hosts"
    | "scriptmonitor_alert_new_malicious_scripts"
    | "scriptmonitor_alert_new_malicious_url"
    | "scriptmonitor_alert_new_max_length_resource_url"
    | "scriptmonitor_alert_new_resources"
    | "secondary_dns_all_primaries_failing"
    | "secondary_dns_primaries_failing"
    | "secondary_dns_warning"
    | "secondary_dns_zone_successfully_updated"
    | "secondary_dns_zone_validation_warning"
    | "security_insights_alert"
    | "sentinel_alert"
    | "stream_live_notifications"
    | "synthetic_test_latency_alert"
    | "synthetic_test_low_availability_alert"
    | "traffic_anomalies_alert"
    | "tunnel_health_event"
    | "tunnel_update_event"
    | "universal_ssl_event_type"
    | "web_analytics_metrics_update"
    | "zone_aop_custom_certificate_expiration_type";
  /** Body param: Whether or not the Notification policy is enabled. */
  enabled: boolean;
  /** Body param: List of IDs that will be used when dispatching a notification. IDs for email type will be the email address. */
  mechanisms: {
    email?: { id?: string }[];
    pagerduty?: { id?: string }[];
    webhooks?: { id?: string }[];
  };
  /** Body param: Name of the policy. */
  name: string;
  /** Body param: Optional specification of how often to re-alert from the same incident, not support on all alert types. */
  alertInterval?: string;
  /** Body param: Optional description for the Notification policy. */
  description?: string;
  /** Body param: Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documenta */
  filters?: {
    actions?: string[];
    affectedAsns?: string[];
    affectedComponents?: string[];
    affectedLocations?: string[];
    airportCode?: string[];
    alertTriggerPreferences?: string[];
    alertTriggerPreferencesValue?: string[];
    enabled?: string[];
    environment?: string[];
    event?: string[];
    eventSource?: string[];
    eventType?: string[];
    groupBy?: string[];
    healthCheckId?: string[];
    incidentImpact?: (
      | "INCIDENT_IMPACT_NONE"
      | "INCIDENT_IMPACT_MINOR"
      | "INCIDENT_IMPACT_MAJOR"
      | "INCIDENT_IMPACT_CRITICAL"
    )[];
    inputId?: string[];
    insightClass?: string[];
    limit?: string[];
    logoTag?: string[];
    megabitsPerSecond?: string[];
    newHealth?: string[];
    newStatus?: string[];
    packetsPerSecond?: string[];
    poolId?: string[];
    popNames?: string[];
    product?: string[];
    projectId?: string[];
    protocol?: string[];
    queryTag?: string[];
    requestsPerSecond?: string[];
    selectors?: string[];
    services?: string[];
    slo?: string[];
    status?: string[];
    targetHostname?: string[];
    targetIp?: string[];
    targetZoneName?: string[];
    trafficExclusions?: "security_events"[];
    tunnelId?: string[];
    tunnelName?: string[];
    type?: string[];
    where?: string[];
    zones?: string[];
  };
}

export const CreatePolicyRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  alertType: Schema.Literals([
    "abuse_report_alert",
    "access_custom_certificate_expiration_type",
    "advanced_ddos_attack_l4_alert",
    "advanced_ddos_attack_l7_alert",
    "advanced_http_alert_error",
    "bgp_hijack_notification",
    "billing_usage_alert",
    "block_notification_block_removed",
    "block_notification_new_block",
    "block_notification_review_rejected",
    "bot_traffic_basic_alert",
    "brand_protection_alert",
    "brand_protection_digest",
    "clickhouse_alert_fw_anomaly",
    "clickhouse_alert_fw_ent_anomaly",
    "cloudforce_one_request_notification",
    "custom_analytics",
    "custom_bot_detection_alert",
    "custom_ssl_certificate_event_type",
    "dedicated_ssl_certificate_event_type",
    "device_connectivity_anomaly_alert",
    "dos_attack_l4",
    "dos_attack_l7",
    "expiring_service_token_alert",
    "failing_logpush_job_disabled_alert",
    "fbm_auto_advertisement",
    "fbm_dosd_attack",
    "fbm_volumetric_attack",
    "health_check_status_notification",
    "hostname_aop_custom_certificate_expiration_type",
    "http_alert_edge_error",
    "http_alert_origin_error",
    "image_notification",
    "image_resizing_notification",
    "incident_alert",
    "load_balancing_health_alert",
    "load_balancing_pool_enablement_alert",
    "logo_match_alert",
    "magic_tunnel_health_check_event",
    "magic_wan_tunnel_health",
    "maintenance_event_notification",
    "mtls_certificate_store_certificate_expiration_type",
    "pages_event_alert",
    "radar_notification",
    "real_origin_monitoring",
    "scriptmonitor_alert_new_code_change_detections",
    "scriptmonitor_alert_new_hosts",
    "scriptmonitor_alert_new_malicious_hosts",
    "scriptmonitor_alert_new_malicious_scripts",
    "scriptmonitor_alert_new_malicious_url",
    "scriptmonitor_alert_new_max_length_resource_url",
    "scriptmonitor_alert_new_resources",
    "secondary_dns_all_primaries_failing",
    "secondary_dns_primaries_failing",
    "secondary_dns_warning",
    "secondary_dns_zone_successfully_updated",
    "secondary_dns_zone_validation_warning",
    "security_insights_alert",
    "sentinel_alert",
    "stream_live_notifications",
    "synthetic_test_latency_alert",
    "synthetic_test_low_availability_alert",
    "traffic_anomalies_alert",
    "tunnel_health_event",
    "tunnel_update_event",
    "universal_ssl_event_type",
    "web_analytics_metrics_update",
    "zone_aop_custom_certificate_expiration_type",
  ]),
  enabled: Schema.Boolean,
  mechanisms: Schema.Struct({
    email: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    pagerduty: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    webhooks: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
  }),
  name: Schema.String,
  alertInterval: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  filters: Schema.optional(
    Schema.Struct({
      actions: Schema.optional(Schema.Array(Schema.String)),
      affectedAsns: Schema.optional(Schema.Array(Schema.String)),
      affectedComponents: Schema.optional(Schema.Array(Schema.String)),
      affectedLocations: Schema.optional(Schema.Array(Schema.String)),
      airportCode: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferences: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferencesValue: Schema.optional(
        Schema.Array(Schema.String),
      ),
      enabled: Schema.optional(Schema.Array(Schema.String)),
      environment: Schema.optional(Schema.Array(Schema.String)),
      event: Schema.optional(Schema.Array(Schema.String)),
      eventSource: Schema.optional(Schema.Array(Schema.String)),
      eventType: Schema.optional(Schema.Array(Schema.String)),
      groupBy: Schema.optional(Schema.Array(Schema.String)),
      healthCheckId: Schema.optional(Schema.Array(Schema.String)),
      incidentImpact: Schema.optional(
        Schema.Array(
          Schema.Literals([
            "INCIDENT_IMPACT_NONE",
            "INCIDENT_IMPACT_MINOR",
            "INCIDENT_IMPACT_MAJOR",
            "INCIDENT_IMPACT_CRITICAL",
          ]),
        ),
      ),
      inputId: Schema.optional(Schema.Array(Schema.String)),
      insightClass: Schema.optional(Schema.Array(Schema.String)),
      limit: Schema.optional(Schema.Array(Schema.String)),
      logoTag: Schema.optional(Schema.Array(Schema.String)),
      megabitsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      newHealth: Schema.optional(Schema.Array(Schema.String)),
      newStatus: Schema.optional(Schema.Array(Schema.String)),
      packetsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      poolId: Schema.optional(Schema.Array(Schema.String)),
      popNames: Schema.optional(Schema.Array(Schema.String)),
      product: Schema.optional(Schema.Array(Schema.String)),
      projectId: Schema.optional(Schema.Array(Schema.String)),
      protocol: Schema.optional(Schema.Array(Schema.String)),
      queryTag: Schema.optional(Schema.Array(Schema.String)),
      requestsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      selectors: Schema.optional(Schema.Array(Schema.String)),
      services: Schema.optional(Schema.Array(Schema.String)),
      slo: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.Array(Schema.String)),
      targetHostname: Schema.optional(Schema.Array(Schema.String)),
      targetIp: Schema.optional(Schema.Array(Schema.String)),
      targetZoneName: Schema.optional(Schema.Array(Schema.String)),
      trafficExclusions: Schema.optional(
        Schema.Array(Schema.Literal("security_events")),
      ),
      tunnelId: Schema.optional(Schema.Array(Schema.String)),
      tunnelName: Schema.optional(Schema.Array(Schema.String)),
      type: Schema.optional(Schema.Array(Schema.String)),
      where: Schema.optional(Schema.Array(Schema.String)),
      zones: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        actions: "actions",
        affectedAsns: "affected_asns",
        affectedComponents: "affected_components",
        affectedLocations: "affected_locations",
        airportCode: "airport_code",
        alertTriggerPreferences: "alert_trigger_preferences",
        alertTriggerPreferencesValue: "alert_trigger_preferences_value",
        enabled: "enabled",
        environment: "environment",
        event: "event",
        eventSource: "event_source",
        eventType: "event_type",
        groupBy: "group_by",
        healthCheckId: "health_check_id",
        incidentImpact: "incident_impact",
        inputId: "input_id",
        insightClass: "insight_class",
        limit: "limit",
        logoTag: "logo_tag",
        megabitsPerSecond: "megabits_per_second",
        newHealth: "new_health",
        newStatus: "new_status",
        packetsPerSecond: "packets_per_second",
        poolId: "pool_id",
        popNames: "pop_names",
        product: "product",
        projectId: "project_id",
        protocol: "protocol",
        queryTag: "query_tag",
        requestsPerSecond: "requests_per_second",
        selectors: "selectors",
        services: "services",
        slo: "slo",
        status: "status",
        targetHostname: "target_hostname",
        targetIp: "target_ip",
        targetZoneName: "target_zone_name",
        trafficExclusions: "traffic_exclusions",
        tunnelId: "tunnel_id",
        tunnelName: "tunnel_name",
        type: "type",
        where: "where",
        zones: "zones",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    alertType: "alert_type",
    enabled: "enabled",
    mechanisms: "mechanisms",
    name: "name",
    alertInterval: "alert_interval",
    description: "description",
    filters: "filters",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/alerting/v3/policies",
  }),
) as unknown as Schema.Schema<CreatePolicyRequest>;

export interface CreatePolicyResponse {
  /** UUID */
  id?: string;
}

export const CreatePolicyResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreatePolicyResponse>;

export type CreatePolicyError =
  | CommonErrors
  | InvalidRoute
  | FiltersRequired
  | MechanismRequired;

export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: [InvalidRoute, FiltersRequired, MechanismRequired],
}));

export interface UpdatePolicyRequest {
  policyId: string;
  /** Path param: The account id */
  accountId: string;
  /** Body param: Optional specification of how often to re-alert from the same incident, not support on all alert types. */
  alertInterval?: string;
  /** Body param: Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values. */
  alertType?:
    | "abuse_report_alert"
    | "access_custom_certificate_expiration_type"
    | "advanced_ddos_attack_l4_alert"
    | "advanced_ddos_attack_l7_alert"
    | "advanced_http_alert_error"
    | "bgp_hijack_notification"
    | "billing_usage_alert"
    | "block_notification_block_removed"
    | "block_notification_new_block"
    | "block_notification_review_rejected"
    | "bot_traffic_basic_alert"
    | "brand_protection_alert"
    | "brand_protection_digest"
    | "clickhouse_alert_fw_anomaly"
    | "clickhouse_alert_fw_ent_anomaly"
    | "cloudforce_one_request_notification"
    | "custom_analytics"
    | "custom_bot_detection_alert"
    | "custom_ssl_certificate_event_type"
    | "dedicated_ssl_certificate_event_type"
    | "device_connectivity_anomaly_alert"
    | "dos_attack_l4"
    | "dos_attack_l7"
    | "expiring_service_token_alert"
    | "failing_logpush_job_disabled_alert"
    | "fbm_auto_advertisement"
    | "fbm_dosd_attack"
    | "fbm_volumetric_attack"
    | "health_check_status_notification"
    | "hostname_aop_custom_certificate_expiration_type"
    | "http_alert_edge_error"
    | "http_alert_origin_error"
    | "image_notification"
    | "image_resizing_notification"
    | "incident_alert"
    | "load_balancing_health_alert"
    | "load_balancing_pool_enablement_alert"
    | "logo_match_alert"
    | "magic_tunnel_health_check_event"
    | "magic_wan_tunnel_health"
    | "maintenance_event_notification"
    | "mtls_certificate_store_certificate_expiration_type"
    | "pages_event_alert"
    | "radar_notification"
    | "real_origin_monitoring"
    | "scriptmonitor_alert_new_code_change_detections"
    | "scriptmonitor_alert_new_hosts"
    | "scriptmonitor_alert_new_malicious_hosts"
    | "scriptmonitor_alert_new_malicious_scripts"
    | "scriptmonitor_alert_new_malicious_url"
    | "scriptmonitor_alert_new_max_length_resource_url"
    | "scriptmonitor_alert_new_resources"
    | "secondary_dns_all_primaries_failing"
    | "secondary_dns_primaries_failing"
    | "secondary_dns_warning"
    | "secondary_dns_zone_successfully_updated"
    | "secondary_dns_zone_validation_warning"
    | "security_insights_alert"
    | "sentinel_alert"
    | "stream_live_notifications"
    | "synthetic_test_latency_alert"
    | "synthetic_test_low_availability_alert"
    | "traffic_anomalies_alert"
    | "tunnel_health_event"
    | "tunnel_update_event"
    | "universal_ssl_event_type"
    | "web_analytics_metrics_update"
    | "zone_aop_custom_certificate_expiration_type";
  /** Body param: Optional description for the Notification policy. */
  description?: string;
  /** Body param: Whether or not the Notification policy is enabled. */
  enabled?: boolean;
  /** Body param: Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documenta */
  filters?: {
    actions?: string[];
    affectedAsns?: string[];
    affectedComponents?: string[];
    affectedLocations?: string[];
    airportCode?: string[];
    alertTriggerPreferences?: string[];
    alertTriggerPreferencesValue?: string[];
    enabled?: string[];
    environment?: string[];
    event?: string[];
    eventSource?: string[];
    eventType?: string[];
    groupBy?: string[];
    healthCheckId?: string[];
    incidentImpact?: (
      | "INCIDENT_IMPACT_NONE"
      | "INCIDENT_IMPACT_MINOR"
      | "INCIDENT_IMPACT_MAJOR"
      | "INCIDENT_IMPACT_CRITICAL"
    )[];
    inputId?: string[];
    insightClass?: string[];
    limit?: string[];
    logoTag?: string[];
    megabitsPerSecond?: string[];
    newHealth?: string[];
    newStatus?: string[];
    packetsPerSecond?: string[];
    poolId?: string[];
    popNames?: string[];
    product?: string[];
    projectId?: string[];
    protocol?: string[];
    queryTag?: string[];
    requestsPerSecond?: string[];
    selectors?: string[];
    services?: string[];
    slo?: string[];
    status?: string[];
    targetHostname?: string[];
    targetIp?: string[];
    targetZoneName?: string[];
    trafficExclusions?: "security_events"[];
    tunnelId?: string[];
    tunnelName?: string[];
    type?: string[];
    where?: string[];
    zones?: string[];
  };
  /** Body param: List of IDs that will be used when dispatching a notification. IDs for email type will be the email address. */
  mechanisms?: {
    email?: { id?: string }[];
    pagerduty?: { id?: string }[];
    webhooks?: { id?: string }[];
  };
  /** Body param: Name of the policy. */
  name?: string;
}

export const UpdatePolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  alertInterval: Schema.optional(Schema.String),
  alertType: Schema.optional(
    Schema.Literals([
      "abuse_report_alert",
      "access_custom_certificate_expiration_type",
      "advanced_ddos_attack_l4_alert",
      "advanced_ddos_attack_l7_alert",
      "advanced_http_alert_error",
      "bgp_hijack_notification",
      "billing_usage_alert",
      "block_notification_block_removed",
      "block_notification_new_block",
      "block_notification_review_rejected",
      "bot_traffic_basic_alert",
      "brand_protection_alert",
      "brand_protection_digest",
      "clickhouse_alert_fw_anomaly",
      "clickhouse_alert_fw_ent_anomaly",
      "cloudforce_one_request_notification",
      "custom_analytics",
      "custom_bot_detection_alert",
      "custom_ssl_certificate_event_type",
      "dedicated_ssl_certificate_event_type",
      "device_connectivity_anomaly_alert",
      "dos_attack_l4",
      "dos_attack_l7",
      "expiring_service_token_alert",
      "failing_logpush_job_disabled_alert",
      "fbm_auto_advertisement",
      "fbm_dosd_attack",
      "fbm_volumetric_attack",
      "health_check_status_notification",
      "hostname_aop_custom_certificate_expiration_type",
      "http_alert_edge_error",
      "http_alert_origin_error",
      "image_notification",
      "image_resizing_notification",
      "incident_alert",
      "load_balancing_health_alert",
      "load_balancing_pool_enablement_alert",
      "logo_match_alert",
      "magic_tunnel_health_check_event",
      "magic_wan_tunnel_health",
      "maintenance_event_notification",
      "mtls_certificate_store_certificate_expiration_type",
      "pages_event_alert",
      "radar_notification",
      "real_origin_monitoring",
      "scriptmonitor_alert_new_code_change_detections",
      "scriptmonitor_alert_new_hosts",
      "scriptmonitor_alert_new_malicious_hosts",
      "scriptmonitor_alert_new_malicious_scripts",
      "scriptmonitor_alert_new_malicious_url",
      "scriptmonitor_alert_new_max_length_resource_url",
      "scriptmonitor_alert_new_resources",
      "secondary_dns_all_primaries_failing",
      "secondary_dns_primaries_failing",
      "secondary_dns_warning",
      "secondary_dns_zone_successfully_updated",
      "secondary_dns_zone_validation_warning",
      "security_insights_alert",
      "sentinel_alert",
      "stream_live_notifications",
      "synthetic_test_latency_alert",
      "synthetic_test_low_availability_alert",
      "traffic_anomalies_alert",
      "tunnel_health_event",
      "tunnel_update_event",
      "universal_ssl_event_type",
      "web_analytics_metrics_update",
      "zone_aop_custom_certificate_expiration_type",
    ]),
  ),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  filters: Schema.optional(
    Schema.Struct({
      actions: Schema.optional(Schema.Array(Schema.String)),
      affectedAsns: Schema.optional(Schema.Array(Schema.String)),
      affectedComponents: Schema.optional(Schema.Array(Schema.String)),
      affectedLocations: Schema.optional(Schema.Array(Schema.String)),
      airportCode: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferences: Schema.optional(Schema.Array(Schema.String)),
      alertTriggerPreferencesValue: Schema.optional(
        Schema.Array(Schema.String),
      ),
      enabled: Schema.optional(Schema.Array(Schema.String)),
      environment: Schema.optional(Schema.Array(Schema.String)),
      event: Schema.optional(Schema.Array(Schema.String)),
      eventSource: Schema.optional(Schema.Array(Schema.String)),
      eventType: Schema.optional(Schema.Array(Schema.String)),
      groupBy: Schema.optional(Schema.Array(Schema.String)),
      healthCheckId: Schema.optional(Schema.Array(Schema.String)),
      incidentImpact: Schema.optional(
        Schema.Array(
          Schema.Literals([
            "INCIDENT_IMPACT_NONE",
            "INCIDENT_IMPACT_MINOR",
            "INCIDENT_IMPACT_MAJOR",
            "INCIDENT_IMPACT_CRITICAL",
          ]),
        ),
      ),
      inputId: Schema.optional(Schema.Array(Schema.String)),
      insightClass: Schema.optional(Schema.Array(Schema.String)),
      limit: Schema.optional(Schema.Array(Schema.String)),
      logoTag: Schema.optional(Schema.Array(Schema.String)),
      megabitsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      newHealth: Schema.optional(Schema.Array(Schema.String)),
      newStatus: Schema.optional(Schema.Array(Schema.String)),
      packetsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      poolId: Schema.optional(Schema.Array(Schema.String)),
      popNames: Schema.optional(Schema.Array(Schema.String)),
      product: Schema.optional(Schema.Array(Schema.String)),
      projectId: Schema.optional(Schema.Array(Schema.String)),
      protocol: Schema.optional(Schema.Array(Schema.String)),
      queryTag: Schema.optional(Schema.Array(Schema.String)),
      requestsPerSecond: Schema.optional(Schema.Array(Schema.String)),
      selectors: Schema.optional(Schema.Array(Schema.String)),
      services: Schema.optional(Schema.Array(Schema.String)),
      slo: Schema.optional(Schema.Array(Schema.String)),
      status: Schema.optional(Schema.Array(Schema.String)),
      targetHostname: Schema.optional(Schema.Array(Schema.String)),
      targetIp: Schema.optional(Schema.Array(Schema.String)),
      targetZoneName: Schema.optional(Schema.Array(Schema.String)),
      trafficExclusions: Schema.optional(
        Schema.Array(Schema.Literal("security_events")),
      ),
      tunnelId: Schema.optional(Schema.Array(Schema.String)),
      tunnelName: Schema.optional(Schema.Array(Schema.String)),
      type: Schema.optional(Schema.Array(Schema.String)),
      where: Schema.optional(Schema.Array(Schema.String)),
      zones: Schema.optional(Schema.Array(Schema.String)),
    }).pipe(
      Schema.encodeKeys({
        actions: "actions",
        affectedAsns: "affected_asns",
        affectedComponents: "affected_components",
        affectedLocations: "affected_locations",
        airportCode: "airport_code",
        alertTriggerPreferences: "alert_trigger_preferences",
        alertTriggerPreferencesValue: "alert_trigger_preferences_value",
        enabled: "enabled",
        environment: "environment",
        event: "event",
        eventSource: "event_source",
        eventType: "event_type",
        groupBy: "group_by",
        healthCheckId: "health_check_id",
        incidentImpact: "incident_impact",
        inputId: "input_id",
        insightClass: "insight_class",
        limit: "limit",
        logoTag: "logo_tag",
        megabitsPerSecond: "megabits_per_second",
        newHealth: "new_health",
        newStatus: "new_status",
        packetsPerSecond: "packets_per_second",
        poolId: "pool_id",
        popNames: "pop_names",
        product: "product",
        projectId: "project_id",
        protocol: "protocol",
        queryTag: "query_tag",
        requestsPerSecond: "requests_per_second",
        selectors: "selectors",
        services: "services",
        slo: "slo",
        status: "status",
        targetHostname: "target_hostname",
        targetIp: "target_ip",
        targetZoneName: "target_zone_name",
        trafficExclusions: "traffic_exclusions",
        tunnelId: "tunnel_id",
        tunnelName: "tunnel_name",
        type: "type",
        where: "where",
        zones: "zones",
      }),
    ),
  ),
  mechanisms: Schema.optional(
    Schema.Struct({
      email: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
      pagerduty: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
      webhooks: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  name: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    alertInterval: "alert_interval",
    alertType: "alert_type",
    description: "description",
    enabled: "enabled",
    filters: "filters",
    mechanisms: "mechanisms",
    name: "name",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/alerting/v3/policies/{policyId}",
  }),
) as unknown as Schema.Schema<UpdatePolicyRequest>;

export interface UpdatePolicyResponse {
  /** UUID */
  id?: string;
}

export const UpdatePolicyResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpdatePolicyResponse>;

export type UpdatePolicyError =
  | CommonErrors
  | InvalidRoute
  | PolicyNotFound
  | InvalidAlertType
  | MechanismRequired;

export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
  errors: [InvalidRoute, PolicyNotFound, InvalidAlertType, MechanismRequired],
}));

export interface DeletePolicyRequest {
  policyId: string;
  /** The account id */
  accountId: string;
}

export const DeletePolicyRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/policies/{policyId}",
  }),
) as unknown as Schema.Schema<DeletePolicyRequest>;

export interface DeletePolicyResponse {
  errors?: { message: string; code?: number }[];
  messages?: { message: string; code?: number }[];
  /** Whether the API call was successful */
  success?: true;
  resultInfo?: {
    count?: number;
    page?: number;
    perPage?: number;
    totalCount?: number;
  };
}

export const DeletePolicyResponse = Schema.Struct({
  errors: Schema.optional(
    Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Number),
      }),
    ),
  ),
  messages: Schema.optional(
    Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Number),
      }),
    ),
  ),
  success: Schema.optional(Schema.Literal(true)),
  resultInfo: Schema.optional(
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      page: Schema.optional(Schema.Number),
      perPage: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
    }).pipe(
      Schema.encodeKeys({
        count: "count",
        page: "page",
        perPage: "per_page",
        totalCount: "total_count",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    errors: "errors",
    messages: "messages",
    success: "success",
    resultInfo: "result_info",
  }),
) as unknown as Schema.Schema<DeletePolicyResponse>;

export type DeletePolicyError = CommonErrors | InvalidRoute | PolicyNotFound;

export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [InvalidRoute, PolicyNotFound],
}));

// =============================================================================
// Silence
// =============================================================================

export interface GetSilenceRequest {
  silenceId: string;
  /** The account id */
  accountId: string;
}

export const GetSilenceRequest = Schema.Struct({
  silenceId: Schema.String.pipe(T.HttpPath("silenceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/silences/{silenceId}",
  }),
) as unknown as Schema.Schema<GetSilenceRequest>;

export interface GetSilenceResponse {
  /** Silence ID */
  id?: string;
  /** When the silence was created. */
  createdAt?: string;
  /** When the silence ends. */
  endTime?: string;
  /** The unique identifier of a notification policy */
  policyId?: string;
  /** When the silence starts. */
  startTime?: string;
  /** When the silence was modified. */
  updatedAt?: string;
}

export const GetSilenceResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  createdAt: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createdAt: "created_at",
    endTime: "end_time",
    policyId: "policy_id",
    startTime: "start_time",
    updatedAt: "updated_at",
  }),
) as unknown as Schema.Schema<GetSilenceResponse>;

export type GetSilenceError = CommonErrors | InvalidRoute | InternalServerError;

export const getSilence: API.OperationMethod<
  GetSilenceRequest,
  GetSilenceResponse,
  GetSilenceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSilenceRequest,
  output: GetSilenceResponse,
  errors: [InvalidRoute, InternalServerError],
}));

export interface ListSilencesRequest {
  /** The account id */
  accountId: string;
}

export const ListSilencesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/silences",
  }),
) as unknown as Schema.Schema<ListSilencesRequest>;

export type ListSilencesResponse = {
  id?: string;
  createdAt?: string;
  endTime?: string;
  policyId?: string;
  startTime?: string;
  updatedAt?: string;
}[];

export const ListSilencesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    policyId: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      endTime: "end_time",
      policyId: "policy_id",
      startTime: "start_time",
      updatedAt: "updated_at",
    }),
  ),
) as unknown as Schema.Schema<ListSilencesResponse>;

export type ListSilencesError = CommonErrors;

export const listSilences: API.OperationMethod<
  ListSilencesRequest,
  ListSilencesResponse,
  ListSilencesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSilencesRequest,
  output: ListSilencesResponse,
  errors: [],
}));

export interface CreateSilenceRequest {
  /** Path param: The account id */
  accountId: string;
  /** Body param: */
  body: { endTime?: string; policyId?: string; startTime?: string }[];
}

export const CreateSilenceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      policyId: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        endTime: "end_time",
        policyId: "policy_id",
        startTime: "start_time",
      }),
    ),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/alerting/v3/silences",
  }),
) as unknown as Schema.Schema<CreateSilenceRequest>;

export interface CreateSilenceResponse {
  errors: { message: string; code?: number }[];
  messages: { message: string; code?: number }[];
  /** Whether the API call was successful */
  success: true;
}

export const CreateSilenceResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<CreateSilenceResponse>;

export type CreateSilenceError = CommonErrors | InvalidRoute;

export const createSilence: API.OperationMethod<
  CreateSilenceRequest,
  CreateSilenceResponse,
  CreateSilenceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSilenceRequest,
  output: CreateSilenceResponse,
  errors: [InvalidRoute],
}));

export interface UpdateSilenceRequest {
  /** Path param: The account id */
  accountId: string;
  /** Body param: */
  body: { id?: string; endTime?: string; startTime?: string }[];
}

export const UpdateSilenceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        endTime: "end_time",
        startTime: "start_time",
      }),
    ),
  ).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/silences",
  }),
) as unknown as Schema.Schema<UpdateSilenceRequest>;

export type UpdateSilenceResponse = {
  id?: string;
  createdAt?: string;
  endTime?: string;
  policyId?: string;
  startTime?: string;
  updatedAt?: string;
}[];

export const UpdateSilenceResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    createdAt: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    policyId: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      endTime: "end_time",
      policyId: "policy_id",
      startTime: "start_time",
      updatedAt: "updated_at",
    }),
  ),
) as unknown as Schema.Schema<UpdateSilenceResponse>;

export type UpdateSilenceError = CommonErrors;

export const updateSilence: API.OperationMethod<
  UpdateSilenceRequest,
  UpdateSilenceResponse,
  UpdateSilenceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSilenceRequest,
  output: UpdateSilenceResponse,
  errors: [],
}));

export interface DeleteSilenceRequest {
  silenceId: string;
  /** The account id */
  accountId: string;
}

export const DeleteSilenceRequest = Schema.Struct({
  silenceId: Schema.String.pipe(T.HttpPath("silenceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/silences/{silenceId}",
  }),
) as unknown as Schema.Schema<DeleteSilenceRequest>;

export interface DeleteSilenceResponse {
  errors: { message: string; code?: number }[];
  messages: { message: string; code?: number }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteSilenceResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Number),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteSilenceResponse>;

export type DeleteSilenceError = CommonErrors | InvalidRoute;

export const deleteSilence: API.OperationMethod<
  DeleteSilenceRequest,
  DeleteSilenceResponse,
  DeleteSilenceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSilenceRequest,
  output: DeleteSilenceResponse,
  errors: [InvalidRoute],
}));
