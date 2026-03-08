/**
 * Cloudflare RUM API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service rum
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
// Rule
// =============================================================================

export interface ListRulesRequest {
  rulesetId: string;
  /** Identifier. */
  accountId: string;
}

export const ListRulesRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/rum/v2/{rulesetId}/rules",
  }),
) as unknown as Schema.Schema<ListRulesRequest>;

export interface ListRulesResponse {
  /** A list of rules. */
  rules?: {
    id?: string | null;
    created?: string | null;
    host?: string | null;
    inclusive?: boolean | null;
    isPaused?: boolean | null;
    paths?: string[] | null;
    priority?: number | null;
  }[];
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  };
}

export const ListRulesResponse = Schema.Struct({
  rules: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          inclusive: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          isPaused: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          paths: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            created: "created",
            host: "host",
            inclusive: "inclusive",
            isPaused: "is_paused",
            paths: "paths",
            priority: "priority",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  ruleset: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          zoneName: "zone_name",
          zoneTag: "zone_tag",
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError = CommonErrors;

export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [],
}));

export interface CreateRuleRequest {
  rulesetId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  host?: string;
  /** Body param: Whether the rule includes or excludes traffic from being measured. */
  inclusive?: boolean;
  /** Body param: Whether the rule is paused or not. */
  isPaused?: boolean;
  /** Body param: */
  paths?: string[];
}

export const CreateRuleRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  host: Schema.optional(Schema.String),
  inclusive: Schema.optional(Schema.Boolean),
  isPaused: Schema.optional(Schema.Boolean),
  paths: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    host: "host",
    inclusive: "inclusive",
    isPaused: "is_paused",
    paths: "paths",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/rum/v2/{rulesetId}/rule",
  }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export interface CreateRuleResponse {
  /** The Web Analytics rule identifier. */
  id?: string;
  created?: string;
  /** The hostname the rule will be applied to. */
  host?: string;
  /** Whether the rule includes or excludes traffic from being measured. */
  inclusive?: boolean;
  /** Whether the rule is paused or not. */
  isPaused?: boolean;
  /** The paths the rule will be applied to. */
  paths?: string[];
  priority?: number;
}

export const CreateRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  inclusive: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  isPaused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  paths: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    created: "created",
    host: "host",
    inclusive: "inclusive",
    isPaused: "is_paused",
    paths: "paths",
    priority: "priority",
  }),
) as unknown as Schema.Schema<CreateRuleResponse>;

export type CreateRuleError = CommonErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [],
}));

export interface UpdateRuleRequest {
  rulesetId: string;
  ruleId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: */
  host?: string;
  /** Body param: Whether the rule includes or excludes traffic from being measured. */
  inclusive?: boolean;
  /** Body param: Whether the rule is paused or not. */
  isPaused?: boolean;
  /** Body param: */
  paths?: string[];
}

export const UpdateRuleRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  host: Schema.optional(Schema.String),
  inclusive: Schema.optional(Schema.Boolean),
  isPaused: Schema.optional(Schema.Boolean),
  paths: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    host: "host",
    inclusive: "inclusive",
    isPaused: "is_paused",
    paths: "paths",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/rum/v2/{rulesetId}/rule/{ruleId}",
  }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export interface UpdateRuleResponse {
  /** The Web Analytics rule identifier. */
  id?: string;
  created?: string;
  /** The hostname the rule will be applied to. */
  host?: string;
  /** Whether the rule includes or excludes traffic from being measured. */
  inclusive?: boolean;
  /** Whether the rule is paused or not. */
  isPaused?: boolean;
  /** The paths the rule will be applied to. */
  paths?: string[];
  priority?: number;
}

export const UpdateRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  inclusive: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  isPaused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  paths: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    created: "created",
    host: "host",
    inclusive: "inclusive",
    isPaused: "is_paused",
    paths: "paths",
    priority: "priority",
  }),
) as unknown as Schema.Schema<UpdateRuleResponse>;

export type UpdateRuleError = CommonErrors;

export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  rulesetId: string;
  ruleId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/rum/v2/{rulesetId}/rule/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  /** The Web Analytics rule identifier. */
  id?: string;
}

export const DeleteRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = CommonErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

export interface BulkCreateRulesRequest {
  rulesetId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: A list of rule identifiers to delete. */
  deleteRules?: string[];
  /** Body param: A list of rules to create or update. */
  rules?: {
    id?: string;
    host?: string;
    inclusive?: boolean;
    isPaused?: boolean;
    paths?: string[];
  }[];
}

export const BulkCreateRulesRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  deleteRules: Schema.optional(Schema.Array(Schema.String)),
  rules: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        host: Schema.optional(Schema.String),
        inclusive: Schema.optional(Schema.Boolean),
        isPaused: Schema.optional(Schema.Boolean),
        paths: Schema.optional(Schema.Array(Schema.String)),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          host: "host",
          inclusive: "inclusive",
          isPaused: "is_paused",
          paths: "paths",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({ deleteRules: "delete_rules", rules: "rules" }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/rum/v2/{rulesetId}/rules",
  }),
) as unknown as Schema.Schema<BulkCreateRulesRequest>;

export interface BulkCreateRulesResponse {
  /** A list of rules. */
  rules?: {
    id?: string | null;
    created?: string | null;
    host?: string | null;
    inclusive?: boolean | null;
    isPaused?: boolean | null;
    paths?: string[] | null;
    priority?: number | null;
  }[];
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  };
}

export const BulkCreateRulesResponse = Schema.Struct({
  rules: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          host: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          inclusive: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          isPaused: Schema.optional(
            Schema.Union([Schema.Boolean, Schema.Null]),
          ),
          paths: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            created: "created",
            host: "host",
            inclusive: "inclusive",
            isPaused: "is_paused",
            paths: "paths",
            priority: "priority",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  ruleset: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          zoneName: "zone_name",
          zoneTag: "zone_tag",
        }),
      ),
      Schema.Null,
    ]),
  ),
}) as unknown as Schema.Schema<BulkCreateRulesResponse>;

export type BulkCreateRulesError = CommonErrors;

export const bulkCreateRules: API.OperationMethod<
  BulkCreateRulesRequest,
  BulkCreateRulesResponse,
  BulkCreateRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkCreateRulesRequest,
  output: BulkCreateRulesResponse,
  errors: [],
}));

// =============================================================================
// SiteInfo
// =============================================================================

export interface GetSiteInfoRequest {
  siteId: string;
  /** Identifier. */
  accountId: string;
}

export const GetSiteInfoRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/rum/site_info/{siteId}",
  }),
) as unknown as Schema.Schema<GetSiteInfoRequest>;

export interface GetSiteInfoResponse {
  /** If enabled, the JavaScript snippet is automatically injected for orange-clouded sites. */
  autoInstall?: boolean;
  created?: string;
  /** A list of rules. */
  rules?: unknown[];
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  };
  /** The Web Analytics site identifier. */
  siteTag?: string;
  /** The Web Analytics site token. */
  siteToken?: string;
  /** Encoded JavaScript snippet. */
  snippet?: string;
}

export const GetSiteInfoResponse = Schema.Struct({
  autoInstall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  rules: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  ruleset: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          zoneName: "zone_name",
          zoneTag: "zone_tag",
        }),
      ),
      Schema.Null,
    ]),
  ),
  siteTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  siteToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  snippet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    autoInstall: "auto_install",
    created: "created",
    rules: "rules",
    ruleset: "ruleset",
    siteTag: "site_tag",
    siteToken: "site_token",
    snippet: "snippet",
  }),
) as unknown as Schema.Schema<GetSiteInfoResponse>;

export type GetSiteInfoError = CommonErrors;

export const getSiteInfo: API.OperationMethod<
  GetSiteInfoRequest,
  GetSiteInfoResponse,
  GetSiteInfoError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSiteInfoRequest,
  output: GetSiteInfoResponse,
  errors: [],
}));

export interface ListSiteInfosRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: The property used to sort the list of results. */
  orderBy?: "host" | "created";
}

export const ListSiteInfosRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  orderBy: Schema.optional(Schema.Literals(["host", "created"])).pipe(
    T.HttpQuery("order_by"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/rum/site_info/list" }),
) as unknown as Schema.Schema<ListSiteInfosRequest>;

export type ListSiteInfosResponse = {
  autoInstall?: boolean | null;
  created?: string | null;
  rules?: unknown[] | null;
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  } | null;
  siteTag?: string | null;
  siteToken?: string | null;
  snippet?: string | null;
}[];

export const ListSiteInfosResponse = Schema.Array(
  Schema.Struct({
    autoInstall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    rules: Schema.optional(
      Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
    ),
    ruleset: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            enabled: "enabled",
            zoneName: "zone_name",
            zoneTag: "zone_tag",
          }),
        ),
        Schema.Null,
      ]),
    ),
    siteTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    siteToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    snippet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      autoInstall: "auto_install",
      created: "created",
      rules: "rules",
      ruleset: "ruleset",
      siteTag: "site_tag",
      siteToken: "site_token",
      snippet: "snippet",
    }),
  ),
) as unknown as Schema.Schema<ListSiteInfosResponse>;

export type ListSiteInfosError = CommonErrors;

export const listSiteInfos: API.OperationMethod<
  ListSiteInfosRequest,
  ListSiteInfosResponse,
  ListSiteInfosError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListSiteInfosRequest,
  output: ListSiteInfosResponse,
  errors: [],
}));

export interface CreateSiteInfoRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: If enabled, the JavaScript snippet is automatically injected for orange-clouded sites. */
  autoInstall?: boolean;
  /** Body param: The hostname to use for gray-clouded sites. */
  host?: string;
  /** Body param: The zone identifier. */
  zoneTag?: string;
}

export const CreateSiteInfoRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  autoInstall: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  zoneTag: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    autoInstall: "auto_install",
    host: "host",
    zoneTag: "zone_tag",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/rum/site_info" }),
) as unknown as Schema.Schema<CreateSiteInfoRequest>;

export interface CreateSiteInfoResponse {
  /** If enabled, the JavaScript snippet is automatically injected for orange-clouded sites. */
  autoInstall?: boolean;
  created?: string;
  /** A list of rules. */
  rules?: unknown[];
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  };
  /** The Web Analytics site identifier. */
  siteTag?: string;
  /** The Web Analytics site token. */
  siteToken?: string;
  /** Encoded JavaScript snippet. */
  snippet?: string;
}

export const CreateSiteInfoResponse = Schema.Struct({
  autoInstall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  rules: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  ruleset: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          zoneName: "zone_name",
          zoneTag: "zone_tag",
        }),
      ),
      Schema.Null,
    ]),
  ),
  siteTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  siteToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  snippet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    autoInstall: "auto_install",
    created: "created",
    rules: "rules",
    ruleset: "ruleset",
    siteTag: "site_tag",
    siteToken: "site_token",
    snippet: "snippet",
  }),
) as unknown as Schema.Schema<CreateSiteInfoResponse>;

export type CreateSiteInfoError = CommonErrors;

export const createSiteInfo: API.OperationMethod<
  CreateSiteInfoRequest,
  CreateSiteInfoResponse,
  CreateSiteInfoError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSiteInfoRequest,
  output: CreateSiteInfoResponse,
  errors: [],
}));

export interface UpdateSiteInfoRequest {
  siteId: string;
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: If enabled, the JavaScript snippet is automatically injected for orange-clouded sites. */
  autoInstall?: boolean;
  /** Body param: Enables or disables RUM. This option can be used only when auto_install is set to true. */
  enabled?: boolean;
  /** Body param: The hostname to use for gray-clouded sites. */
  host?: string;
  /** Body param: If enabled, the JavaScript snippet will not be injected for visitors from the EU. */
  lite?: boolean;
  /** Body param: The zone identifier. */
  zoneTag?: string;
}

export const UpdateSiteInfoRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  autoInstall: Schema.optional(Schema.Boolean),
  enabled: Schema.optional(Schema.Boolean),
  host: Schema.optional(Schema.String),
  lite: Schema.optional(Schema.Boolean),
  zoneTag: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    autoInstall: "auto_install",
    enabled: "enabled",
    host: "host",
    lite: "lite",
    zoneTag: "zone_tag",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/rum/site_info/{siteId}",
  }),
) as unknown as Schema.Schema<UpdateSiteInfoRequest>;

export interface UpdateSiteInfoResponse {
  /** If enabled, the JavaScript snippet is automatically injected for orange-clouded sites. */
  autoInstall?: boolean;
  created?: string;
  /** A list of rules. */
  rules?: unknown[];
  ruleset?: {
    id?: string | null;
    enabled?: boolean | null;
    zoneName?: string | null;
    zoneTag?: string | null;
  };
  /** The Web Analytics site identifier. */
  siteTag?: string;
  /** The Web Analytics site token. */
  siteToken?: string;
  /** Encoded JavaScript snippet. */
  snippet?: string;
}

export const UpdateSiteInfoResponse = Schema.Struct({
  autoInstall: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  created: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  rules: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  ruleset: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        zoneName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          enabled: "enabled",
          zoneName: "zone_name",
          zoneTag: "zone_tag",
        }),
      ),
      Schema.Null,
    ]),
  ),
  siteTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  siteToken: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  snippet: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    autoInstall: "auto_install",
    created: "created",
    rules: "rules",
    ruleset: "ruleset",
    siteTag: "site_tag",
    siteToken: "site_token",
    snippet: "snippet",
  }),
) as unknown as Schema.Schema<UpdateSiteInfoResponse>;

export type UpdateSiteInfoError = CommonErrors;

export const updateSiteInfo: API.OperationMethod<
  UpdateSiteInfoRequest,
  UpdateSiteInfoResponse,
  UpdateSiteInfoError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSiteInfoRequest,
  output: UpdateSiteInfoResponse,
  errors: [],
}));

export interface DeleteSiteInfoRequest {
  siteId: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteSiteInfoRequest = Schema.Struct({
  siteId: Schema.String.pipe(T.HttpPath("siteId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/rum/site_info/{siteId}",
  }),
) as unknown as Schema.Schema<DeleteSiteInfoRequest>;

export interface DeleteSiteInfoResponse {
  /** The Web Analytics site identifier. */
  siteTag?: string;
}

export const DeleteSiteInfoResponse = Schema.Struct({
  siteTag: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ siteTag: "site_tag" }),
) as unknown as Schema.Schema<DeleteSiteInfoResponse>;

export type DeleteSiteInfoError = CommonErrors;

export const deleteSiteInfo: API.OperationMethod<
  DeleteSiteInfoRequest,
  DeleteSiteInfoResponse,
  DeleteSiteInfoError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSiteInfoRequest,
  output: DeleteSiteInfoResponse,
  errors: [],
}));
