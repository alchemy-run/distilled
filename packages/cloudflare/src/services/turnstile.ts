/**
 * Cloudflare TURNSTILE API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service turnstile
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// SecretWidget
// =============================================================================

export interface RotateSecretWidgetRequest {
  sitekey: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: If `invalidate_immediately` is set to `false`, the previous secret will remain valid for two hours. Otherwise, the secret is immediately invalidated, and requests using it will be rejected */
  invalidateImmediately?: boolean;
}

export const RotateSecretWidgetRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sitekey: Schema.String.pipe(T.HttpPath("sitekey")),
    accountId: Schema.String.pipe(T.HttpPath("account_id")),
    invalidateImmediately: Schema.optional(Schema.Boolean),
  }).pipe(
    Schema.encodeKeys({ invalidateImmediately: "invalidate_immediately" }),
    T.Http({
      method: "POST",
      path: "/accounts/{account_id}/challenges/widgets/{sitekey}/rotate_secret",
    }),
  ) as unknown as Schema.Schema<RotateSecretWidgetRequest>;

export interface RotateSecretWidgetResponse {
  /** If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode: boolean;
  /** If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** When the widget was created. */
  createdOn: string;
  domains: string[];
  /** Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId: boolean;
  /** Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** When the widget was modified. */
  modifiedOn: string;
  /** Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel: boolean;
  /** Region where this widget can be used. This cannot be changed after creation. */
  region: "world" | "china";
  /** Secret key for this widget. */
  secret: string;
  /** Widget item identifier tag. */
  sitekey: string;
}

export const RotateSecretWidgetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    botFightMode: Schema.Boolean,
    clearanceLevel: Schema.Literals([
      "no_clearance",
      "jschallenge",
      "managed",
      "interactive",
    ]),
    createdOn: Schema.String,
    domains: Schema.Array(Schema.String),
    ephemeralId: Schema.Boolean,
    mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
    modifiedOn: Schema.String,
    name: Schema.String,
    offlabel: Schema.Boolean,
    region: Schema.Literals(["world", "china"]),
    secret: Schema.String,
    sitekey: Schema.String,
  })
    .pipe(
      Schema.encodeKeys({
        botFightMode: "bot_fight_mode",
        clearanceLevel: "clearance_level",
        createdOn: "created_on",
        domains: "domains",
        ephemeralId: "ephemeral_id",
        mode: "mode",
        modifiedOn: "modified_on",
        name: "name",
        offlabel: "offlabel",
        region: "region",
        secret: "secret",
        sitekey: "sitekey",
      }),
    )
    .pipe(
      T.ResponsePath("result"),
    ) as unknown as Schema.Schema<RotateSecretWidgetResponse>;

export type RotateSecretWidgetError = DefaultErrors;

export const rotateSecretWidget: API.OperationMethod<
  RotateSecretWidgetRequest,
  RotateSecretWidgetResponse,
  RotateSecretWidgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RotateSecretWidgetRequest,
  output: RotateSecretWidgetResponse,
  errors: [],
}));

// =============================================================================
// Widget
// =============================================================================

export interface GetWidgetRequest {
  sitekey: string;
  /** Identifier */
  accountId: string;
}

export const GetWidgetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  sitekey: Schema.String.pipe(T.HttpPath("sitekey")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/challenges/widgets/{sitekey}",
  }),
) as unknown as Schema.Schema<GetWidgetRequest>;

export interface GetWidgetResponse {
  /** If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode: boolean;
  /** If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** When the widget was created. */
  createdOn: string;
  domains: string[];
  /** Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId: boolean;
  /** Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** When the widget was modified. */
  modifiedOn: string;
  /** Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel: boolean;
  /** Region where this widget can be used. This cannot be changed after creation. */
  region: "world" | "china";
  /** Secret key for this widget. */
  secret: string;
  /** Widget item identifier tag. */
  sitekey: string;
}

export const GetWidgetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  botFightMode: Schema.Boolean,
  clearanceLevel: Schema.Literals([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]),
  createdOn: Schema.String,
  domains: Schema.Array(Schema.String),
  ephemeralId: Schema.Boolean,
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  modifiedOn: Schema.String,
  name: Schema.String,
  offlabel: Schema.Boolean,
  region: Schema.Literals(["world", "china"]),
  secret: Schema.String,
  sitekey: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      botFightMode: "bot_fight_mode",
      clearanceLevel: "clearance_level",
      createdOn: "created_on",
      domains: "domains",
      ephemeralId: "ephemeral_id",
      mode: "mode",
      modifiedOn: "modified_on",
      name: "name",
      offlabel: "offlabel",
      region: "region",
      secret: "secret",
      sitekey: "sitekey",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetWidgetResponse>;

export type GetWidgetError = DefaultErrors;

export const getWidget: API.OperationMethod<
  GetWidgetRequest,
  GetWidgetResponse,
  GetWidgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWidgetRequest,
  output: GetWidgetResponse,
  errors: [],
}));

export interface ListWidgetsRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Direction to order widgets. */
  direction?: "asc" | "desc";
  /** Query param: Field to order widgets by. */
  order?: "id" | "sitekey" | "name" | "created_on" | "modified_on";
}

export const ListWidgetsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals(["id", "sitekey", "name", "created_on", "modified_on"]),
  ).pipe(T.HttpQuery("order")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/challenges/widgets" }),
) as unknown as Schema.Schema<ListWidgetsRequest>;

export interface ListWidgetsResponse {
  result: {
    botFightMode: boolean;
    clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
    createdOn: string;
    domains: string[];
    ephemeralId: boolean;
    mode: "non-interactive" | "invisible" | "managed";
    modifiedOn: string;
    name: string;
    offlabel: boolean;
    region: "world" | "china";
    sitekey: string;
  }[];
  resultInfo: {
    count?: number | null;
    page?: number | null;
    perPage?: number | null;
    totalCount?: number | null;
  };
}

export const ListWidgetsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      botFightMode: Schema.Boolean,
      clearanceLevel: Schema.Literals([
        "no_clearance",
        "jschallenge",
        "managed",
        "interactive",
      ]),
      createdOn: Schema.String,
      domains: Schema.Array(Schema.String),
      ephemeralId: Schema.Boolean,
      mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
      modifiedOn: Schema.String,
      name: Schema.String,
      offlabel: Schema.Boolean,
      region: Schema.Literals(["world", "china"]),
      sitekey: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        botFightMode: "bot_fight_mode",
        clearanceLevel: "clearance_level",
        createdOn: "created_on",
        domains: "domains",
        ephemeralId: "ephemeral_id",
        mode: "mode",
        modifiedOn: "modified_on",
        name: "name",
        offlabel: "offlabel",
        region: "region",
        sitekey: "sitekey",
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
) as unknown as Schema.Schema<ListWidgetsResponse>;

export type ListWidgetsError = DefaultErrors;

export const listWidgets: API.PaginatedOperationMethod<
  ListWidgetsRequest,
  ListWidgetsResponse,
  ListWidgetsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListWidgetsRequest,
  ) => stream.Stream<
    ListWidgetsResponse,
    ListWidgetsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListWidgetsRequest) => stream.Stream<
    {
      botFightMode: boolean;
      clearanceLevel:
        | "no_clearance"
        | "jschallenge"
        | "managed"
        | "interactive";
      createdOn: string;
      domains: string[];
      ephemeralId: boolean;
      mode: "non-interactive" | "invisible" | "managed";
      modifiedOn: string;
      name: string;
      offlabel: boolean;
      region: "world" | "china";
      sitekey: string;
    },
    ListWidgetsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWidgetsRequest,
  output: ListWidgetsResponse,
  errors: [],
  pagination: {
    mode: "page",
    inputToken: "page",
    outputToken: "resultInfo.page",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateWidgetRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Query param: Direction to order widgets. */
  direction?: "asc" | "desc";
  /** Query param: Field to order widgets by. */
  order?: "id" | "sitekey" | "name" | "created_on" | "modified_on";
  /** Query param: Page number of paginated results. */
  page?: number;
  /** Query param: Number of items per page. */
  perPage?: number;
  /** Body param: */
  domains: string[];
  /** Body param: Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** Body param: Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Body param: If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode?: boolean;
  /** Body param: If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel?: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** Body param: Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId?: boolean;
  /** Body param: Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel?: boolean;
  /** Body param: Region where this widget can be used. This cannot be changed after creation. */
  region?: "world" | "china";
}

export const CreateWidgetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals(["id", "sitekey", "name", "created_on", "modified_on"]),
  ).pipe(T.HttpQuery("order")),
  page: Schema.optional(Schema.Number).pipe(T.HttpQuery("page")),
  perPage: Schema.optional(Schema.Number).pipe(T.HttpQuery("per_page")),
  domains: Schema.Array(Schema.String),
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  name: Schema.String,
  botFightMode: Schema.optional(Schema.Boolean),
  clearanceLevel: Schema.optional(
    Schema.Literals(["no_clearance", "jschallenge", "managed", "interactive"]),
  ),
  ephemeralId: Schema.optional(Schema.Boolean),
  offlabel: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.Literals(["world", "china"])),
}).pipe(
  Schema.encodeKeys({
    domains: "domains",
    mode: "mode",
    name: "name",
    botFightMode: "bot_fight_mode",
    clearanceLevel: "clearance_level",
    ephemeralId: "ephemeral_id",
    offlabel: "offlabel",
    region: "region",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/challenges/widgets" }),
) as unknown as Schema.Schema<CreateWidgetRequest>;

export interface CreateWidgetResponse {
  /** If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode: boolean;
  /** If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** When the widget was created. */
  createdOn: string;
  domains: string[];
  /** Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId: boolean;
  /** Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** When the widget was modified. */
  modifiedOn: string;
  /** Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel: boolean;
  /** Region where this widget can be used. This cannot be changed after creation. */
  region: "world" | "china";
  /** Secret key for this widget. */
  secret: string;
  /** Widget item identifier tag. */
  sitekey: string;
}

export const CreateWidgetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  botFightMode: Schema.Boolean,
  clearanceLevel: Schema.Literals([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]),
  createdOn: Schema.String,
  domains: Schema.Array(Schema.String),
  ephemeralId: Schema.Boolean,
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  modifiedOn: Schema.String,
  name: Schema.String,
  offlabel: Schema.Boolean,
  region: Schema.Literals(["world", "china"]),
  secret: Schema.String,
  sitekey: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      botFightMode: "bot_fight_mode",
      clearanceLevel: "clearance_level",
      createdOn: "created_on",
      domains: "domains",
      ephemeralId: "ephemeral_id",
      mode: "mode",
      modifiedOn: "modified_on",
      name: "name",
      offlabel: "offlabel",
      region: "region",
      secret: "secret",
      sitekey: "sitekey",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateWidgetResponse>;

export type CreateWidgetError = DefaultErrors;

export const createWidget: API.OperationMethod<
  CreateWidgetRequest,
  CreateWidgetResponse,
  CreateWidgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWidgetRequest,
  output: CreateWidgetResponse,
  errors: [],
}));

export interface UpdateWidgetRequest {
  sitekey: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: */
  domains: string[];
  /** Body param: Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** Body param: Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Body param: If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode?: boolean;
  /** Body param: If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel?: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** Body param: Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId?: boolean;
  /** Body param: Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel?: boolean;
  /** Body param: Region where this widget can be used. This cannot be changed after creation. */
  region?: "world" | "china";
}

export const UpdateWidgetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  sitekey: Schema.String.pipe(T.HttpPath("sitekey")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  domains: Schema.Array(Schema.String),
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  name: Schema.String,
  botFightMode: Schema.optional(Schema.Boolean),
  clearanceLevel: Schema.optional(
    Schema.Literals(["no_clearance", "jschallenge", "managed", "interactive"]),
  ),
  ephemeralId: Schema.optional(Schema.Boolean),
  offlabel: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.Literals(["world", "china"])),
}).pipe(
  Schema.encodeKeys({
    domains: "domains",
    mode: "mode",
    name: "name",
    botFightMode: "bot_fight_mode",
    clearanceLevel: "clearance_level",
    ephemeralId: "ephemeral_id",
    offlabel: "offlabel",
    region: "region",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/challenges/widgets/{sitekey}",
  }),
) as unknown as Schema.Schema<UpdateWidgetRequest>;

export interface UpdateWidgetResponse {
  /** If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode: boolean;
  /** If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** When the widget was created. */
  createdOn: string;
  domains: string[];
  /** Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId: boolean;
  /** Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** When the widget was modified. */
  modifiedOn: string;
  /** Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel: boolean;
  /** Region where this widget can be used. This cannot be changed after creation. */
  region: "world" | "china";
  /** Secret key for this widget. */
  secret: string;
  /** Widget item identifier tag. */
  sitekey: string;
}

export const UpdateWidgetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  botFightMode: Schema.Boolean,
  clearanceLevel: Schema.Literals([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]),
  createdOn: Schema.String,
  domains: Schema.Array(Schema.String),
  ephemeralId: Schema.Boolean,
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  modifiedOn: Schema.String,
  name: Schema.String,
  offlabel: Schema.Boolean,
  region: Schema.Literals(["world", "china"]),
  secret: Schema.String,
  sitekey: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      botFightMode: "bot_fight_mode",
      clearanceLevel: "clearance_level",
      createdOn: "created_on",
      domains: "domains",
      ephemeralId: "ephemeral_id",
      mode: "mode",
      modifiedOn: "modified_on",
      name: "name",
      offlabel: "offlabel",
      region: "region",
      secret: "secret",
      sitekey: "sitekey",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateWidgetResponse>;

export type UpdateWidgetError = DefaultErrors;

export const updateWidget: API.OperationMethod<
  UpdateWidgetRequest,
  UpdateWidgetResponse,
  UpdateWidgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWidgetRequest,
  output: UpdateWidgetResponse,
  errors: [],
}));

export interface DeleteWidgetRequest {
  sitekey: string;
  /** Identifier */
  accountId: string;
}

export const DeleteWidgetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  sitekey: Schema.String.pipe(T.HttpPath("sitekey")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/challenges/widgets/{sitekey}",
  }),
) as unknown as Schema.Schema<DeleteWidgetRequest>;

export interface DeleteWidgetResponse {
  /** If bot_fight_mode is set to `true`, Cloudflare issues computationally expensive challenges in response to malicious bots (ENT only). */
  botFightMode: boolean;
  /** If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance, this setting can determine the clearance level to be set */
  clearanceLevel: "no_clearance" | "jschallenge" | "managed" | "interactive";
  /** When the widget was created. */
  createdOn: string;
  domains: string[];
  /** Return the Ephemeral ID in /siteverify (ENT only). */
  ephemeralId: boolean;
  /** Widget Mode */
  mode: "non-interactive" | "invisible" | "managed";
  /** When the widget was modified. */
  modifiedOn: string;
  /** Human readable widget name. Not unique. Cloudflare suggests that you set this to a meaningful string to make it easier to identify your widget, and where it is used. */
  name: string;
  /** Do not show any Cloudflare branding on the widget (ENT only). */
  offlabel: boolean;
  /** Region where this widget can be used. This cannot be changed after creation. */
  region: "world" | "china";
  /** Secret key for this widget. */
  secret: string;
  /** Widget item identifier tag. */
  sitekey: string;
}

export const DeleteWidgetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  botFightMode: Schema.Boolean,
  clearanceLevel: Schema.Literals([
    "no_clearance",
    "jschallenge",
    "managed",
    "interactive",
  ]),
  createdOn: Schema.String,
  domains: Schema.Array(Schema.String),
  ephemeralId: Schema.Boolean,
  mode: Schema.Literals(["non-interactive", "invisible", "managed"]),
  modifiedOn: Schema.String,
  name: Schema.String,
  offlabel: Schema.Boolean,
  region: Schema.Literals(["world", "china"]),
  secret: Schema.String,
  sitekey: Schema.String,
})
  .pipe(
    Schema.encodeKeys({
      botFightMode: "bot_fight_mode",
      clearanceLevel: "clearance_level",
      createdOn: "created_on",
      domains: "domains",
      ephemeralId: "ephemeral_id",
      mode: "mode",
      modifiedOn: "modified_on",
      name: "name",
      offlabel: "offlabel",
      region: "region",
      secret: "secret",
      sitekey: "sitekey",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteWidgetResponse>;

export type DeleteWidgetError = DefaultErrors;

export const deleteWidget: API.OperationMethod<
  DeleteWidgetRequest,
  DeleteWidgetResponse,
  DeleteWidgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWidgetRequest,
  output: DeleteWidgetResponse,
  errors: [],
}));
