/**
 * Cloudflare ALERTING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service alerting
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

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

export const ListAvailableAlertsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/alerting/v3/available_alerts",
    }),
  ) as unknown as Schema.Schema<ListAvailableAlertsRequest>;

export type ListAvailableAlertsResponse = Record<string, unknown>;

export const ListAvailableAlertsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<ListAvailableAlertsResponse>;

export type ListAvailableAlertsError = DefaultErrors | InvalidRoute;

export const listAvailableAlerts: API.OperationMethod<
  ListAvailableAlertsRequest,
  ListAvailableAlertsResponse,
  ListAvailableAlertsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetDestinationEligibleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/alerting/v3/destinations/eligible",
    }),
  ) as unknown as Schema.Schema<GetDestinationEligibleRequest>;

export type GetDestinationEligibleResponse = Record<string, unknown>;

export const GetDestinationEligibleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDestinationEligibleResponse>;

export type GetDestinationEligibleError = DefaultErrors | InvalidRoute;

export const getDestinationEligible: API.OperationMethod<
  GetDestinationEligibleRequest,
  GetDestinationEligibleResponse,
  GetDestinationEligibleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetDestinationPagerdutyRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty",
    }),
  ) as unknown as Schema.Schema<GetDestinationPagerdutyRequest>;

export interface GetDestinationPagerdutyResponse {
  result: { id?: string | null; name?: string | null }[];
}

export const GetDestinationPagerdutyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
  }) as unknown as Schema.Schema<GetDestinationPagerdutyResponse>;

export type GetDestinationPagerdutyError = DefaultErrors;

export const getDestinationPagerduty: API.PaginatedOperationMethod<
  GetDestinationPagerdutyRequest,
  GetDestinationPagerdutyResponse,
  GetDestinationPagerdutyError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: GetDestinationPagerdutyRequest,
  ) => stream.Stream<
    GetDestinationPagerdutyResponse,
    GetDestinationPagerdutyError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: GetDestinationPagerdutyRequest,
  ) => stream.Stream<
    { id?: string | null; name?: string | null },
    GetDestinationPagerdutyError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetDestinationPagerdutyRequest,
  output: GetDestinationPagerdutyResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateDestinationPagerdutyRequest {
  /** The account id */
  accountId: string;
}

export const CreateDestinationPagerdutyRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect",
    }),
  ) as unknown as Schema.Schema<CreateDestinationPagerdutyRequest>;

export interface CreateDestinationPagerdutyResponse {
  /** token in form of UUID */
  id?: string | null;
}

export const CreateDestinationPagerdutyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateDestinationPagerdutyResponse>;

export type CreateDestinationPagerdutyError = DefaultErrors | InvalidRoute;

export const createDestinationPagerduty: API.OperationMethod<
  CreateDestinationPagerdutyRequest,
  CreateDestinationPagerdutyResponse,
  CreateDestinationPagerdutyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDestinationPagerdutyRequest,
  output: CreateDestinationPagerdutyResponse,
  errors: [InvalidRoute],
}));

export interface DeleteDestinationPagerdutyRequest {
  /** The account id */
  accountId: string;
}

export const DeleteDestinationPagerdutyRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/alerting/v3/destinations/pagerduty",
    }),
  ) as unknown as Schema.Schema<DeleteDestinationPagerdutyRequest>;

export interface DeleteDestinationPagerdutyResponse {
  errors: { message: string; code?: number | null }[];
  messages: { message: string; code?: number | null }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteDestinationPagerdutyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
    ),
    messages: Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteDestinationPagerdutyResponse>;

export type DeleteDestinationPagerdutyError = DefaultErrors | InvalidRoute;

export const deleteDestinationPagerduty: API.OperationMethod<
  DeleteDestinationPagerdutyRequest,
  DeleteDestinationPagerdutyResponse,
  DeleteDestinationPagerdutyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDestinationPagerdutyRequest,
  output: DeleteDestinationPagerdutyResponse,
  errors: [InvalidRoute],
}));

export interface LinkDestinationPagerdutyRequest {
  tokenId: string;
  /** The account id */
  accountId: string;
}

export const LinkDestinationPagerdutyRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const LinkDestinationPagerdutyResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<LinkDestinationPagerdutyResponse>;

export type LinkDestinationPagerdutyError = DefaultErrors | InvalidRoute;

export const linkDestinationPagerduty: API.OperationMethod<
  LinkDestinationPagerdutyRequest,
  LinkDestinationPagerdutyResponse,
  LinkDestinationPagerdutyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetDestinationWebhookRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Timestamp of when the webhook destination was created. */
  createdAt?: string | null;
  /** Timestamp of the last time an attempt to dispatch a notification to this webhook failed. */
  lastFailure?: string | null;
  /** Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook. */
  lastSuccess?: string | null;
  /** The name of the webhook destination. This will be included in the request body when you receive a webhook notification. */
  name?: string | null;
  /** Type of webhook endpoint. */
  type?:
    | "datadog"
    | "discord"
    | "feishu"
    | "gchat"
    | "generic"
    | "opsgenie"
    | "slack"
    | "splunk"
    | null;
  /** The POST endpoint to call when dispatching a notification. */
  url?: string | null;
}

export const GetDestinationWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastFailure: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    lastSuccess: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    type: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  })
    .pipe(
      Schema.encodeKeys({
        id: "id",
        createdAt: "created_at",
        lastFailure: "last_failure",
        lastSuccess: "last_success",
        name: "name",
        type: "type",
        url: "url",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<GetDestinationWebhookResponse>;

export type GetDestinationWebhookError =
  | DefaultErrors
  | InvalidRoute
  | WebhookNotFound;

export const getDestinationWebhook: API.OperationMethod<
  GetDestinationWebhookRequest,
  GetDestinationWebhookResponse,
  GetDestinationWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDestinationWebhookRequest,
  output: GetDestinationWebhookResponse,
  errors: [InvalidRoute, WebhookNotFound],
}));

export interface ListDestinationWebhooksRequest {
  /** The account id */
  accountId: string;
}

export const ListDestinationWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/accounts/{account_id}/alerting/v3/destinations/webhooks",
    }),
  ) as unknown as Schema.Schema<ListDestinationWebhooksRequest>;

export interface ListDestinationWebhooksResponse {
  result: {
    id?: string | null;
    createdAt?: string | null;
    lastFailure?: string | null;
    lastSuccess?: string | null;
    name?: string | null;
    type?:
      | "datadog"
      | "discord"
      | "feishu"
      | "gchat"
      | "generic"
      | "opsgenie"
      | "slack"
      | "splunk"
      | null;
    url?: string | null;
  }[];
}

export const ListDestinationWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        lastFailure: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        lastSuccess: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([
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
            Schema.Null,
          ]),
        ),
        url: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
    ),
  }) as unknown as Schema.Schema<ListDestinationWebhooksResponse>;

export type ListDestinationWebhooksError = DefaultErrors;

export const listDestinationWebhooks: API.PaginatedOperationMethod<
  ListDestinationWebhooksRequest,
  ListDestinationWebhooksResponse,
  ListDestinationWebhooksError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDestinationWebhooksRequest,
  ) => stream.Stream<
    ListDestinationWebhooksResponse,
    ListDestinationWebhooksError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListDestinationWebhooksRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      createdAt?: string | null;
      lastFailure?: string | null;
      lastSuccess?: string | null;
      name?: string | null;
      type?:
        | "datadog"
        | "discord"
        | "feishu"
        | "gchat"
        | "generic"
        | "opsgenie"
        | "slack"
        | "splunk"
        | null;
      url?: string | null;
    },
    ListDestinationWebhooksError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDestinationWebhooksRequest,
  output: ListDestinationWebhooksResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const CreateDestinationWebhookRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const CreateDestinationWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateDestinationWebhookResponse>;

export type CreateDestinationWebhookError =
  | DefaultErrors
  | InvalidRoute
  | WebhookTestFailed;

export const createDestinationWebhook: API.OperationMethod<
  CreateDestinationWebhookRequest,
  CreateDestinationWebhookResponse,
  CreateDestinationWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateDestinationWebhookRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const UpdateDestinationWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateDestinationWebhookResponse>;

export type UpdateDestinationWebhookError =
  | DefaultErrors
  | InvalidRoute
  | InvalidWebhookId;

export const updateDestinationWebhook: API.OperationMethod<
  UpdateDestinationWebhookRequest,
  UpdateDestinationWebhookResponse,
  UpdateDestinationWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDestinationWebhookRequest,
  output: UpdateDestinationWebhookResponse,
  errors: [InvalidRoute, InvalidWebhookId],
}));

export interface DeleteDestinationWebhookRequest {
  webhookId: string;
  /** The account id */
  accountId: string;
}

export const DeleteDestinationWebhookRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    webhookId: Schema.String.pipe(T.HttpPath("webhookId")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhookId}",
    }),
  ) as unknown as Schema.Schema<DeleteDestinationWebhookRequest>;

export interface DeleteDestinationWebhookResponse {
  errors: { message: string; code?: number | null }[];
  messages: { message: string; code?: number | null }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteDestinationWebhookResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
    ),
    messages: Schema.Array(
      Schema.Struct({
        message: Schema.String,
        code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }),
    ),
    success: Schema.Literal(true),
  }) as unknown as Schema.Schema<DeleteDestinationWebhookResponse>;

export type DeleteDestinationWebhookError =
  | DefaultErrors
  | InvalidRoute
  | InternalServerError;

export const deleteDestinationWebhook: API.OperationMethod<
  DeleteDestinationWebhookRequest,
  DeleteDestinationWebhookResponse,
  DeleteDestinationWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListHistoriesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  before: Schema.optional(Schema.String).pipe(T.HttpQuery("before")),
  since: Schema.optional(Schema.String).pipe(T.HttpQuery("since")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/alerting/v3/history" }),
) as unknown as Schema.Schema<ListHistoriesRequest>;

export interface ListHistoriesResponse {
  result: {
    id?: string | null;
    alertBody?: string | null;
    alertType?: string | null;
    description?: string | null;
    mechanism?: string | null;
    mechanismType?: "email" | "pagerduty" | "webhook" | null;
    name?: string | null;
    policyId?: string | null;
    sent?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListHistoriesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      alertBody: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      alertType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      mechanism: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      mechanismType: Schema.optional(
        Schema.Union([
          Schema.Literals(["email", "pagerduty", "webhook"]),
          Schema.Null,
        ]),
      ),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      policyId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      sent: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      page: "page",
      perPage: "per_page",
      totalCount: "total_count",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListHistoriesResponse>;

export type ListHistoriesError = DefaultErrors;

export const listHistories: API.PaginatedOperationMethod<
  ListHistoriesRequest,
  ListHistoriesResponse,
  ListHistoriesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListHistoriesRequest,
  ) => stream.Stream<
    ListHistoriesResponse,
    ListHistoriesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListHistoriesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      alertBody?: string | null;
      alertType?: string | null;
      description?: string | null;
      mechanism?: string | null;
      mechanismType?: "email" | "pagerduty" | "webhook" | null;
      name?: string | null;
      policyId?: string | null;
      sent?: string | null;
    },
    ListHistoriesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListHistoriesRequest,
  output: ListHistoriesResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

// =============================================================================
// Policy
// =============================================================================

export interface GetPolicyRequest {
  policyId: string;
  /** The account id */
  accountId: string;
}

export const GetPolicyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** Optional specification of how often to re-alert from the same incident, not support on all alert types. */
  alertInterval?: string | null;
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
    | "zone_aop_custom_certificate_expiration_type"
    | null;
  created?: string | null;
  /** Optional description for the Notification policy. */
  description?: string | null;
  /** Whether or not the Notification policy is enabled. */
  enabled?: boolean | null;
  /** Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for mor */
  filters?: {
    actions?: string[] | null;
    affectedAsns?: string[] | null;
    affectedComponents?: string[] | null;
    affectedLocations?: string[] | null;
    airportCode?: string[] | null;
    alertTriggerPreferences?: string[] | null;
    alertTriggerPreferencesValue?: string[] | null;
    enabled?: string[] | null;
    environment?: string[] | null;
    event?: string[] | null;
    eventSource?: string[] | null;
    eventType?: string[] | null;
    groupBy?: string[] | null;
    healthCheckId?: string[] | null;
    incidentImpact?:
      | (
          | "INCIDENT_IMPACT_NONE"
          | "INCIDENT_IMPACT_MINOR"
          | "INCIDENT_IMPACT_MAJOR"
          | "INCIDENT_IMPACT_CRITICAL"
        )[]
      | null;
    inputId?: string[] | null;
    insightClass?: string[] | null;
    limit?: string[] | null;
    logoTag?: string[] | null;
    megabitsPerSecond?: string[] | null;
    newHealth?: string[] | null;
    newStatus?: string[] | null;
    packetsPerSecond?: string[] | null;
    poolId?: string[] | null;
    popNames?: string[] | null;
    product?: string[] | null;
    projectId?: string[] | null;
    protocol?: string[] | null;
    queryTag?: string[] | null;
    requestsPerSecond?: string[] | null;
    selectors?: string[] | null;
    services?: string[] | null;
    slo?: string[] | null;
    status?: string[] | null;
    targetHostname?: string[] | null;
    targetIp?: string[] | null;
    targetZoneName?: string[] | null;
    trafficExclusions?: "security_events"[] | null;
    tunnelId?: string[] | null;
    tunnelName?: string[] | null;
    type?: string[] | null;
    where?: string[] | null;
    zones?: string[] | null;
  } | null;
  /** List of IDs that will be used when dispatching a notification. IDs for email type will be the email address. */
  mechanisms?: {
    email?: { id?: string | null }[] | null;
    pagerduty?: { id?: string | null }[] | null;
    webhooks?: { id?: string | null }[] | null;
  } | null;
  modified?: string | null;
  /** Name of the policy. */
  name?: string | null;
}

export const GetPolicyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  alertInterval: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  alertType: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  filters: Schema.optional(
    Schema.Union([
      Schema.Struct({
        actions: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        affectedAsns: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        affectedComponents: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        affectedLocations: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        airportCode: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        alertTriggerPreferences: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        alertTriggerPreferencesValue: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        enabled: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        environment: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        event: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        eventSource: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        eventType: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        groupBy: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        healthCheckId: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        incidentImpact: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Literals([
                "INCIDENT_IMPACT_NONE",
                "INCIDENT_IMPACT_MINOR",
                "INCIDENT_IMPACT_MAJOR",
                "INCIDENT_IMPACT_CRITICAL",
              ]),
            ),
            Schema.Null,
          ]),
        ),
        inputId: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        insightClass: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        limit: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        logoTag: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        megabitsPerSecond: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        newHealth: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        newStatus: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        packetsPerSecond: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        poolId: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        popNames: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        product: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        projectId: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        protocol: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        queryTag: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        requestsPerSecond: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        selectors: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        services: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        slo: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        status: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        targetHostname: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        targetIp: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        targetZoneName: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        trafficExclusions: Schema.optional(
          Schema.Union([
            Schema.Array(Schema.Literal("security_events")),
            Schema.Null,
          ]),
        ),
        tunnelId: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        tunnelName: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        type: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        where: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        zones: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
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
      Schema.Null,
    ]),
  ),
  mechanisms: Schema.optional(
    Schema.Union([
      Schema.Struct({
        email: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              }),
            ),
            Schema.Null,
          ]),
        ),
        pagerduty: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              }),
            ),
            Schema.Null,
          ]),
        ),
        webhooks: Schema.optional(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
  modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
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
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetPolicyResponse>;

export type GetPolicyError = DefaultErrors | InvalidRoute | PolicyNotFound;

export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [InvalidRoute, PolicyNotFound],
}));

export interface ListPoliciesRequest {
  /** The account id */
  accountId: string;
}

export const ListPoliciesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/policies",
  }),
) as unknown as Schema.Schema<ListPoliciesRequest>;

export interface ListPoliciesResponse {
  result: {
    id?: string | null;
    alertInterval?: string | null;
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
      | "zone_aop_custom_certificate_expiration_type"
      | null;
    created?: string | null;
    description?: string | null;
    enabled?: boolean | null;
    filters?: {
      actions?: string[] | null;
      affectedAsns?: string[] | null;
      affectedComponents?: string[] | null;
      affectedLocations?: string[] | null;
      airportCode?: string[] | null;
      alertTriggerPreferences?: string[] | null;
      alertTriggerPreferencesValue?: string[] | null;
      enabled?: string[] | null;
      environment?: string[] | null;
      event?: string[] | null;
      eventSource?: string[] | null;
      eventType?: string[] | null;
      groupBy?: string[] | null;
      healthCheckId?: string[] | null;
      incidentImpact?:
        | (
            | "INCIDENT_IMPACT_NONE"
            | "INCIDENT_IMPACT_MINOR"
            | "INCIDENT_IMPACT_MAJOR"
            | "INCIDENT_IMPACT_CRITICAL"
          )[]
        | null;
      inputId?: string[] | null;
      insightClass?: string[] | null;
      limit?: string[] | null;
      logoTag?: string[] | null;
      megabitsPerSecond?: string[] | null;
      newHealth?: string[] | null;
      newStatus?: string[] | null;
      packetsPerSecond?: string[] | null;
      poolId?: string[] | null;
      popNames?: string[] | null;
      product?: string[] | null;
      projectId?: string[] | null;
      protocol?: string[] | null;
      queryTag?: string[] | null;
      requestsPerSecond?: string[] | null;
      selectors?: string[] | null;
      services?: string[] | null;
      slo?: string[] | null;
      status?: string[] | null;
      targetHostname?: string[] | null;
      targetIp?: string[] | null;
      targetZoneName?: string[] | null;
      trafficExclusions?: "security_events"[] | null;
      tunnelId?: string[] | null;
      tunnelName?: string[] | null;
      type?: string[] | null;
      where?: string[] | null;
      zones?: string[] | null;
    } | null;
    mechanisms?: {
      email?: { id?: string | null }[] | null;
      pagerduty?: { id?: string | null }[] | null;
      webhooks?: { id?: string | null }[] | null;
    } | null;
    modified?: string | null;
    name?: string | null;
  }[];
}

export const ListPoliciesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      alertInterval: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      alertType: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      filters: Schema.optional(
        Schema.Union([
          Schema.Struct({
            actions: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            affectedAsns: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            affectedComponents: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            affectedLocations: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            airportCode: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            alertTriggerPreferences: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            alertTriggerPreferencesValue: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            enabled: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            environment: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            event: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            eventSource: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            eventType: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            groupBy: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            healthCheckId: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            incidentImpact: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Literals([
                    "INCIDENT_IMPACT_NONE",
                    "INCIDENT_IMPACT_MINOR",
                    "INCIDENT_IMPACT_MAJOR",
                    "INCIDENT_IMPACT_CRITICAL",
                  ]),
                ),
                Schema.Null,
              ]),
            ),
            inputId: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            insightClass: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            limit: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            logoTag: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            megabitsPerSecond: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            newHealth: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            newStatus: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            packetsPerSecond: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            poolId: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            popNames: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            product: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            projectId: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            protocol: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            queryTag: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            requestsPerSecond: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            selectors: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            services: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            slo: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            status: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            targetHostname: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            targetIp: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            targetZoneName: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            trafficExclusions: Schema.optional(
              Schema.Union([
                Schema.Array(Schema.Literal("security_events")),
                Schema.Null,
              ]),
            ),
            tunnelId: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            tunnelName: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            type: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            where: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
            zones: Schema.optional(
              Schema.Union([Schema.Array(Schema.String), Schema.Null]),
            ),
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
          Schema.Null,
        ]),
      ),
      mechanisms: Schema.optional(
        Schema.Union([
          Schema.Struct({
            email: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                ),
                Schema.Null,
              ]),
            ),
            pagerduty: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                ),
                Schema.Null,
              ]),
            ),
            webhooks: Schema.optional(
              Schema.Union([
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                  }),
                ),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Null,
        ]),
      ),
      modified: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ),
}) as unknown as Schema.Schema<ListPoliciesResponse>;

export type ListPoliciesError = DefaultErrors;

export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListPoliciesRequest,
  ) => stream.Stream<
    ListPoliciesResponse,
    ListPoliciesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListPoliciesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      alertInterval?: string | null;
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
        | "zone_aop_custom_certificate_expiration_type"
        | null;
      created?: string | null;
      description?: string | null;
      enabled?: boolean | null;
      filters?: {
        actions?: string[] | null;
        affectedAsns?: string[] | null;
        affectedComponents?: string[] | null;
        affectedLocations?: string[] | null;
        airportCode?: string[] | null;
        alertTriggerPreferences?: string[] | null;
        alertTriggerPreferencesValue?: string[] | null;
        enabled?: string[] | null;
        environment?: string[] | null;
        event?: string[] | null;
        eventSource?: string[] | null;
        eventType?: string[] | null;
        groupBy?: string[] | null;
        healthCheckId?: string[] | null;
        incidentImpact?:
          | (
              | "INCIDENT_IMPACT_NONE"
              | "INCIDENT_IMPACT_MINOR"
              | "INCIDENT_IMPACT_MAJOR"
              | "INCIDENT_IMPACT_CRITICAL"
            )[]
          | null;
        inputId?: string[] | null;
        insightClass?: string[] | null;
        limit?: string[] | null;
        logoTag?: string[] | null;
        megabitsPerSecond?: string[] | null;
        newHealth?: string[] | null;
        newStatus?: string[] | null;
        packetsPerSecond?: string[] | null;
        poolId?: string[] | null;
        popNames?: string[] | null;
        product?: string[] | null;
        projectId?: string[] | null;
        protocol?: string[] | null;
        queryTag?: string[] | null;
        requestsPerSecond?: string[] | null;
        selectors?: string[] | null;
        services?: string[] | null;
        slo?: string[] | null;
        status?: string[] | null;
        targetHostname?: string[] | null;
        targetIp?: string[] | null;
        targetZoneName?: string[] | null;
        trafficExclusions?: "security_events"[] | null;
        tunnelId?: string[] | null;
        tunnelName?: string[] | null;
        type?: string[] | null;
        where?: string[] | null;
        zones?: string[] | null;
      } | null;
      mechanisms?: {
        email?: { id?: string | null }[] | null;
        pagerduty?: { id?: string | null }[] | null;
        webhooks?: { id?: string | null }[] | null;
      } | null;
      modified?: string | null;
      name?: string | null;
    },
    ListPoliciesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const CreatePolicyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const CreatePolicyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<CreatePolicyResponse>;

export type CreatePolicyError =
  | DefaultErrors
  | InvalidRoute
  | FiltersRequired
  | MechanismRequired;

export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdatePolicyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const UpdatePolicyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  T.ResponsePath("result"),
) as unknown as Schema.Schema<UpdatePolicyResponse>;

export type UpdatePolicyError =
  | DefaultErrors
  | InvalidRoute
  | PolicyNotFound
  | InvalidAlertType
  | MechanismRequired;

export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
  errors: [InvalidRoute, PolicyNotFound, InvalidAlertType, MechanismRequired],
}));

export interface DeletePolicyRequest {
  policyId: string;
  /** The account id */
  accountId: string;
}

export const DeletePolicyRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/policies/{policyId}",
  }),
) as unknown as Schema.Schema<DeletePolicyRequest>;

export interface DeletePolicyResponse {
  errors?: { message: string; code?: number | null }[] | null;
  messages?: { message: string; code?: number | null }[] | null;
  /** Whether the API call was successful */
  success?: true | null;
  resultInfo?: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  } | null;
}

export const DeletePolicyResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  errors: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          message: Schema.String,
          code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  messages: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          message: Schema.String,
          code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }),
      ),
      Schema.Null,
    ]),
  ),
  success: Schema.optional(Schema.Union([Schema.Literal(true), Schema.Null])),
  resultInfo: Schema.optional(
    Schema.Union([
      Schema.Struct({
        count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        page: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        totalCount: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          count: "count",
          page: "page",
          perPage: "per_page",
          totalCount: "total_count",
        }),
      ),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    errors: "errors",
    messages: "messages",
    success: "success",
    resultInfo: "result_info",
  }),
) as unknown as Schema.Schema<DeletePolicyResponse>;

export type DeletePolicyError = DefaultErrors | InvalidRoute | PolicyNotFound;

export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetSilenceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** When the silence was created. */
  createdAt?: string | null;
  /** When the silence ends. */
  endTime?: string | null;
  /** The unique identifier of a notification policy */
  policyId?: string | null;
  /** When the silence starts. */
  startTime?: string | null;
  /** When the silence was modified. */
  updatedAt?: string | null;
}

export const GetSilenceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  endTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  policyId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  startTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      createdAt: "created_at",
      endTime: "end_time",
      policyId: "policy_id",
      startTime: "start_time",
      updatedAt: "updated_at",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetSilenceResponse>;

export type GetSilenceError =
  | DefaultErrors
  | InvalidRoute
  | InternalServerError;

export const getSilence: API.OperationMethod<
  GetSilenceRequest,
  GetSilenceResponse,
  GetSilenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSilenceRequest,
  output: GetSilenceResponse,
  errors: [InvalidRoute, InternalServerError],
}));

export interface ListSilencesRequest {
  /** The account id */
  accountId: string;
}

export const ListSilencesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/alerting/v3/silences",
  }),
) as unknown as Schema.Schema<ListSilencesRequest>;

export interface ListSilencesResponse {
  result: {
    id?: string | null;
    createdAt?: string | null;
    endTime?: string | null;
    policyId?: string | null;
    startTime?: string | null;
    updatedAt?: string | null;
  }[];
}

export const ListSilencesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      endTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      policyId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      startTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ),
}) as unknown as Schema.Schema<ListSilencesResponse>;

export type ListSilencesError = DefaultErrors;

export const listSilences: API.PaginatedOperationMethod<
  ListSilencesRequest,
  ListSilencesResponse,
  ListSilencesError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListSilencesRequest,
  ) => stream.Stream<
    ListSilencesResponse,
    ListSilencesError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: ListSilencesRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      createdAt?: string | null;
      endTime?: string | null;
      policyId?: string | null;
      startTime?: string | null;
      updatedAt?: string | null;
    },
    ListSilencesError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSilencesRequest,
  output: ListSilencesResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface CreateSilenceRequest {
  /** Path param: The account id */
  accountId: string;
  /** Body param: */
  body: { endTime?: string; policyId?: string; startTime?: string }[];
}

export const CreateSilenceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  errors: { message: string; code?: number | null }[];
  messages: { message: string; code?: number | null }[];
  /** Whether the API call was successful */
  success: true;
}

export const CreateSilenceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<CreateSilenceResponse>;

export type CreateSilenceError = DefaultErrors | InvalidRoute;

export const createSilence: API.OperationMethod<
  CreateSilenceRequest,
  CreateSilenceResponse,
  CreateSilenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateSilenceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    method: "PUT",
    path: "/accounts/{account_id}/alerting/v3/silences",
  }),
) as unknown as Schema.Schema<UpdateSilenceRequest>;

export interface UpdateSilenceResponse {
  result: {
    id?: string | null;
    createdAt?: string | null;
    endTime?: string | null;
    policyId?: string | null;
    startTime?: string | null;
    updatedAt?: string | null;
  }[];
}

export const UpdateSilenceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      endTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      policyId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      startTime: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ),
}) as unknown as Schema.Schema<UpdateSilenceResponse>;

export type UpdateSilenceError = DefaultErrors;

export const updateSilence: API.PaginatedOperationMethod<
  UpdateSilenceRequest,
  UpdateSilenceResponse,
  UpdateSilenceError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: UpdateSilenceRequest,
  ) => stream.Stream<
    UpdateSilenceResponse,
    UpdateSilenceError,
    Credentials | HttpClient.HttpClient
  >;
  items: (
    input: UpdateSilenceRequest,
  ) => stream.Stream<
    {
      id?: string | null;
      createdAt?: string | null;
      endTime?: string | null;
      policyId?: string | null;
      startTime?: string | null;
      updatedAt?: string | null;
    },
    UpdateSilenceError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: UpdateSilenceRequest,
  output: UpdateSilenceResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface DeleteSilenceRequest {
  silenceId: string;
  /** The account id */
  accountId: string;
}

export const DeleteSilenceRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  silenceId: Schema.String.pipe(T.HttpPath("silenceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/alerting/v3/silences/{silenceId}",
  }),
) as unknown as Schema.Schema<DeleteSilenceRequest>;

export interface DeleteSilenceResponse {
  errors: { message: string; code?: number | null }[];
  messages: { message: string; code?: number | null }[];
  /** Whether the API call was successful */
  success: true;
}

export const DeleteSilenceResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  messages: Schema.Array(
    Schema.Struct({
      message: Schema.String,
      code: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    }),
  ),
  success: Schema.Literal(true),
}) as unknown as Schema.Schema<DeleteSilenceResponse>;

export type DeleteSilenceError = DefaultErrors | InvalidRoute;

export const deleteSilence: API.OperationMethod<
  DeleteSilenceRequest,
  DeleteSilenceResponse,
  DeleteSilenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSilenceRequest,
  output: DeleteSilenceResponse,
  errors: [InvalidRoute],
}));
