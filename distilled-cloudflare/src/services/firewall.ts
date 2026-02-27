/**
 * Cloudflare FIREWALL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service firewall
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
// AccessRule
// =============================================================================

export interface GetAccessRuleRequest {
  ruleId: string;
}

export const GetAccessRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/firewall/access_rules/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<GetAccessRuleRequest>;

export interface GetAccessRuleResponse {
  /** The unique identifier of the IP Access rule. */
  id: string;
  /** The available actions that a rule can apply to a matched request. */
  allowedModes: (
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge"
  )[];
  /** The rule configuration. */
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string;
  /** All zones owned by the user will have the rule applied. */
  scope?: { id?: string; email?: string; type?: "user" | "organization" };
}

export const GetAccessRuleResponse = Schema.Struct({
  id: Schema.String,
  allowedModes: Schema.Array(
    Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  configuration: Schema.Union([
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip6")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip_range")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("asn")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("country")),
      value: Schema.optional(Schema.String),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  scope: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["user", "organization"])),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    allowedModes: "allowed_modes",
    configuration: "configuration",
    mode: "mode",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    notes: "notes",
    scope: "scope",
  }),
) as unknown as Schema.Schema<GetAccessRuleResponse>;

export type GetAccessRuleError = CommonErrors;

export const getAccessRule: API.OperationMethod<
  GetAccessRuleRequest,
  GetAccessRuleResponse,
  GetAccessRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccessRuleRequest,
  output: GetAccessRuleResponse,
  errors: [],
}));

export interface ListAccessRulesRequest {}

export const ListAccessRulesRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/firewall/access_rules/rules",
  }),
) as unknown as Schema.Schema<ListAccessRulesRequest>;

export type ListAccessRulesResponse = {
  id: string;
  allowedModes: (
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge"
  )[];
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  createdOn?: string;
  modifiedOn?: string;
  notes?: string;
  scope?: { id?: string; email?: string; type?: "user" | "organization" };
}[];

export const ListAccessRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    allowedModes: Schema.Array(
      Schema.Literals([
        "block",
        "challenge",
        "whitelist",
        "js_challenge",
        "managed_challenge",
      ]),
    ),
    configuration: Schema.Union([
      Schema.Struct({
        target: Schema.optional(Schema.Literal("ip")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        target: Schema.optional(Schema.Literal("ip6")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        target: Schema.optional(Schema.Literal("ip_range")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        target: Schema.optional(Schema.Literal("asn")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        target: Schema.optional(Schema.Literal("country")),
        value: Schema.optional(Schema.String),
      }),
    ]),
    mode: Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
    createdOn: Schema.optional(Schema.String),
    modifiedOn: Schema.optional(Schema.String),
    notes: Schema.optional(Schema.String),
    scope: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        email: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["user", "organization"])),
      }),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      allowedModes: "allowed_modes",
      configuration: "configuration",
      mode: "mode",
      createdOn: "created_on",
      modifiedOn: "modified_on",
      notes: "notes",
      scope: "scope",
    }),
  ),
) as unknown as Schema.Schema<ListAccessRulesResponse>;

export type ListAccessRulesError = CommonErrors;

export const listAccessRules: API.OperationMethod<
  ListAccessRulesRequest,
  ListAccessRulesResponse,
  ListAccessRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccessRulesRequest,
  output: ListAccessRulesResponse,
  errors: [],
}));

export interface CreateAccessRuleRequest {
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The rule configuration. */
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  /** Body param: The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** Body param: An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string;
}

export const CreateAccessRuleRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configuration: Schema.Union([
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip6")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip_range")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("asn")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("country")),
      value: Schema.optional(Schema.String),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  notes: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/{accountOrZone}/{accountOrZoneId}/firewall/access_rules/rules",
  }),
) as unknown as Schema.Schema<CreateAccessRuleRequest>;

export interface CreateAccessRuleResponse {
  /** The unique identifier of the IP Access rule. */
  id: string;
  /** The available actions that a rule can apply to a matched request. */
  allowedModes: (
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge"
  )[];
  /** The rule configuration. */
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string;
  /** All zones owned by the user will have the rule applied. */
  scope?: { id?: string; email?: string; type?: "user" | "organization" };
}

export const CreateAccessRuleResponse = Schema.Struct({
  id: Schema.String,
  allowedModes: Schema.Array(
    Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  configuration: Schema.Union([
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip6")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip_range")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("asn")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("country")),
      value: Schema.optional(Schema.String),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  scope: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["user", "organization"])),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    allowedModes: "allowed_modes",
    configuration: "configuration",
    mode: "mode",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    notes: "notes",
    scope: "scope",
  }),
) as unknown as Schema.Schema<CreateAccessRuleResponse>;

export type CreateAccessRuleError = CommonErrors;

export const createAccessRule: API.OperationMethod<
  CreateAccessRuleRequest,
  CreateAccessRuleResponse,
  CreateAccessRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccessRuleRequest,
  output: CreateAccessRuleResponse,
  errors: [],
}));

export interface PatchAccessRuleRequest {
  ruleId: string;
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The rule configuration. */
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  /** Body param: The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** Body param: An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string;
}

export const PatchAccessRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configuration: Schema.Union([
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip6")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip_range")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("asn")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("country")),
      value: Schema.optional(Schema.String),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  notes: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/{accountOrZone}/{accountOrZoneId}/firewall/access_rules/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<PatchAccessRuleRequest>;

export interface PatchAccessRuleResponse {
  /** The unique identifier of the IP Access rule. */
  id: string;
  /** The available actions that a rule can apply to a matched request. */
  allowedModes: (
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge"
  )[];
  /** The rule configuration. */
  configuration:
    | { target?: "ip"; value?: string }
    | { target?: "ip6"; value?: string }
    | { target?: "ip_range"; value?: string }
    | { target?: "asn"; value?: string }
    | { target?: "country"; value?: string };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string;
  /** All zones owned by the user will have the rule applied. */
  scope?: { id?: string; email?: string; type?: "user" | "organization" };
}

export const PatchAccessRuleResponse = Schema.Struct({
  id: Schema.String,
  allowedModes: Schema.Array(
    Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  configuration: Schema.Union([
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip6")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("ip_range")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("asn")),
      value: Schema.optional(Schema.String),
    }),
    Schema.Struct({
      target: Schema.optional(Schema.Literal("country")),
      value: Schema.optional(Schema.String),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  createdOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  scope: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      type: Schema.optional(Schema.Literals(["user", "organization"])),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    allowedModes: "allowed_modes",
    configuration: "configuration",
    mode: "mode",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    notes: "notes",
    scope: "scope",
  }),
) as unknown as Schema.Schema<PatchAccessRuleResponse>;

export type PatchAccessRuleError = CommonErrors;

export const patchAccessRule: API.OperationMethod<
  PatchAccessRuleRequest,
  PatchAccessRuleResponse,
  PatchAccessRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccessRuleRequest,
  output: PatchAccessRuleResponse,
  errors: [],
}));

export interface DeleteAccessRuleRequest {
  ruleId: string;
}

export const DeleteAccessRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{accountOrZone}/{accountOrZoneId}/firewall/access_rules/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteAccessRuleRequest>;

export interface DeleteAccessRuleResponse {
  /** Defines an identifier. */
  id: string;
}

export const DeleteAccessRuleResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteAccessRuleResponse>;

export type DeleteAccessRuleError = CommonErrors;

export const deleteAccessRule: API.OperationMethod<
  DeleteAccessRuleRequest,
  DeleteAccessRuleResponse,
  DeleteAccessRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccessRuleRequest,
  output: DeleteAccessRuleResponse,
  errors: [],
}));

// =============================================================================
// EditRule
// =============================================================================

export interface BulkEditRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const BulkEditRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkEditRulesRequest>;

export type BulkEditRulesResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const BulkEditRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<BulkEditRulesResponse>;

export type BulkEditRulesError = CommonErrors;

export const bulkEditRules: API.OperationMethod<
  BulkEditRulesRequest,
  BulkEditRulesResponse,
  BulkEditRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkEditRulesRequest,
  output: BulkEditRulesResponse,
  errors: [],
}));

// =============================================================================
// Lockdown
// =============================================================================

export interface GetLockdownRequest {
  lockDownsId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetLockdownRequest = Schema.Struct({
  lockDownsId: Schema.String.pipe(T.HttpPath("lockDownsId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/lockdowns/{lockDownsId}",
  }),
) as unknown as Schema.Schema<GetLockdownRequest>;

export interface GetLockdownResponse {
  /** The unique identifier of the Zone Lockdown rule. */
  id: string;
  /** A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations. */
  configurations: unknown;
  /** The timestamp of when the rule was created. */
  createdOn: string;
  /** An informative summary of the rule. */
  description: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn: string;
  /** When true, indicates that the rule is currently paused. */
  paused: boolean;
  /** The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const GetLockdownResponse = Schema.Struct({
  id: Schema.String,
  configurations: Schema.Unknown,
  createdOn: Schema.String,
  description: Schema.String,
  modifiedOn: Schema.String,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    configurations: "configurations",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    paused: "paused",
    urls: "urls",
  }),
) as unknown as Schema.Schema<GetLockdownResponse>;

export type GetLockdownError = CommonErrors;

export const getLockdown: API.OperationMethod<
  GetLockdownRequest,
  GetLockdownResponse,
  GetLockdownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetLockdownRequest,
  output: GetLockdownResponse,
  errors: [],
}));

export interface ListLockdownsRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: The timestamp of when the rule was created. */
  createdOn?: string;
  /** Query param: A string to search for in the description of existing rules. */
  description?: string;
  /** Query param: A string to search for in the description of existing rules. */
  descriptionSearch?: string;
  /** Query param: A single IP address to search for in existing rules. */
  ip?: string;
  /** Query param: A single IP address range to search for in existing rules. */
  ipRangeSearch?: string;
  /** Query param: A single IP address to search for in existing rules. */
  ipSearch?: string;
  /** Query param: The timestamp of when the rule was last modified. */
  modifiedOn?: string;
  /** Query param: The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules wi */
  priority?: number;
  /** Query param: A single URI to search for in the list of URLs of existing rules. */
  uriSearch?: string;
}

export const ListLockdownsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  createdOn: Schema.optional(Schema.String).pipe(T.HttpQuery("created_on")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  descriptionSearch: Schema.optional(Schema.String).pipe(
    T.HttpQuery("description_search"),
  ),
  ip: Schema.optional(Schema.String).pipe(T.HttpQuery("ip")),
  ipRangeSearch: Schema.optional(Schema.String).pipe(
    T.HttpQuery("ip_range_search"),
  ),
  ipSearch: Schema.optional(Schema.String).pipe(T.HttpQuery("ip_search")),
  modifiedOn: Schema.optional(Schema.String).pipe(T.HttpQuery("modified_on")),
  priority: Schema.optional(Schema.Number).pipe(T.HttpQuery("priority")),
  uriSearch: Schema.optional(Schema.String).pipe(T.HttpQuery("uri_search")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/lockdowns" }),
) as unknown as Schema.Schema<ListLockdownsRequest>;

export type ListLockdownsResponse = {
  id: string;
  configurations: unknown;
  createdOn: string;
  description: string;
  modifiedOn: string;
  paused: boolean;
  urls: string[];
}[];

export const ListLockdownsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    configurations: Schema.Unknown,
    createdOn: Schema.String,
    description: Schema.String,
    modifiedOn: Schema.String,
    paused: Schema.Boolean,
    urls: Schema.Array(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      configurations: "configurations",
      createdOn: "created_on",
      description: "description",
      modifiedOn: "modified_on",
      paused: "paused",
      urls: "urls",
    }),
  ),
) as unknown as Schema.Schema<ListLockdownsResponse>;

export type ListLockdownsError = CommonErrors;

export const listLockdowns: API.OperationMethod<
  ListLockdownsRequest,
  ListLockdownsResponse,
  ListLockdownsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLockdownsRequest,
  output: ListLockdownsResponse,
  errors: [],
}));

export interface CreateLockdownRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations. */
  configurations: unknown;
  /** Body param: The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
  /** Body param: An informative summary of the rule. This value is sanitized and any tags will be removed. */
  description?: string;
  /** Body param: When true, indicates that the rule is currently paused. */
  paused?: boolean;
  /** Body param: The priority of the rule to control the processing order. A lower number indicates higher priority. If not provided, any rules with a configured priority will be processed before rules wit */
  priority?: number;
}

export const CreateLockdownRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configurations: Schema.Unknown,
  urls: Schema.Array(Schema.String),
  description: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/lockdowns" }),
) as unknown as Schema.Schema<CreateLockdownRequest>;

export interface CreateLockdownResponse {
  /** The unique identifier of the Zone Lockdown rule. */
  id: string;
  /** A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations. */
  configurations: unknown;
  /** The timestamp of when the rule was created. */
  createdOn: string;
  /** An informative summary of the rule. */
  description: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn: string;
  /** When true, indicates that the rule is currently paused. */
  paused: boolean;
  /** The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const CreateLockdownResponse = Schema.Struct({
  id: Schema.String,
  configurations: Schema.Unknown,
  createdOn: Schema.String,
  description: Schema.String,
  modifiedOn: Schema.String,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    configurations: "configurations",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    paused: "paused",
    urls: "urls",
  }),
) as unknown as Schema.Schema<CreateLockdownResponse>;

export type CreateLockdownError = CommonErrors;

export const createLockdown: API.OperationMethod<
  CreateLockdownRequest,
  CreateLockdownResponse,
  CreateLockdownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateLockdownRequest,
  output: CreateLockdownResponse,
  errors: [],
}));

export interface UpdateLockdownRequest {
  lockDownsId: string;
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations. */
  configurations: unknown;
  /** Body param: The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const UpdateLockdownRequest = Schema.Struct({
  lockDownsId: Schema.String.pipe(T.HttpPath("lockDownsId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configurations: Schema.Unknown,
  urls: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/firewall/lockdowns/{lockDownsId}",
  }),
) as unknown as Schema.Schema<UpdateLockdownRequest>;

export interface UpdateLockdownResponse {
  /** The unique identifier of the Zone Lockdown rule. */
  id: string;
  /** A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of `ip` or `ip_range` configurations. */
  configurations: unknown;
  /** The timestamp of when the rule was created. */
  createdOn: string;
  /** An informative summary of the rule. */
  description: string;
  /** The timestamp of when the rule was last modified. */
  modifiedOn: string;
  /** When true, indicates that the rule is currently paused. */
  paused: boolean;
  /** The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const UpdateLockdownResponse = Schema.Struct({
  id: Schema.String,
  configurations: Schema.Unknown,
  createdOn: Schema.String,
  description: Schema.String,
  modifiedOn: Schema.String,
  paused: Schema.Boolean,
  urls: Schema.Array(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    configurations: "configurations",
    createdOn: "created_on",
    description: "description",
    modifiedOn: "modified_on",
    paused: "paused",
    urls: "urls",
  }),
) as unknown as Schema.Schema<UpdateLockdownResponse>;

export type UpdateLockdownError = CommonErrors;

export const updateLockdown: API.OperationMethod<
  UpdateLockdownRequest,
  UpdateLockdownResponse,
  UpdateLockdownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateLockdownRequest,
  output: UpdateLockdownResponse,
  errors: [],
}));

export interface DeleteLockdownRequest {
  lockDownsId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteLockdownRequest = Schema.Struct({
  lockDownsId: Schema.String.pipe(T.HttpPath("lockDownsId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/firewall/lockdowns/{lockDownsId}",
  }),
) as unknown as Schema.Schema<DeleteLockdownRequest>;

export interface DeleteLockdownResponse {
  /** The unique identifier of the Zone Lockdown rule. */
  id?: string;
}

export const DeleteLockdownResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteLockdownResponse>;

export type DeleteLockdownError = CommonErrors;

export const deleteLockdown: API.OperationMethod<
  DeleteLockdownRequest,
  DeleteLockdownResponse,
  DeleteLockdownError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteLockdownRequest,
  output: DeleteLockdownResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface GetRuleRequest {
  ruleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules/{ruleId}" }),
) as unknown as Schema.Schema<GetRuleRequest>;

export interface GetRuleResponse {
  /** The unique identifier of the firewall rule. */
  id?: string;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  /** An informative summary of the firewall rule. */
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string;
}

export const GetRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  action: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
      "allow",
      "log",
      "bypass",
    ]),
  ),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.String,
        deleted: Schema.Boolean,
      }),
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  products: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "zoneLockdown",
        "uaBlock",
        "bic",
        "hot",
        "securityLevel",
        "rateLimit",
        "waf",
      ]),
    ),
  ),
  ref: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetRuleResponse>;

export type GetRuleError = CommonErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [],
}));

export interface ListRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: The unique identifier of the firewall rule. */
  id?: string;
  /** Query param: The action to search for. Must be an exact match. */
  action?: string;
  /** Query param: A case-insensitive string to find in the description. */
  description?: string;
  /** Query param: When true, indicates that the firewall rule is currently paused. */
  paused?: boolean;
}

export const ListRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const ListRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListRulesResponse>;

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
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The action to perform when the threshold of matched traffic within the configured period is exceeded. */
  action: {
    mode?:
      | "simulate"
      | "ban"
      | "challenge"
      | "js_challenge"
      | "managed_challenge";
    response?: { body?: string; contentType?: string };
    timeout?: number;
  };
  /** Body param: */
  filter: unknown;
}

export const CreateRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Struct({
    mode: Schema.optional(
      Schema.Literals([
        "simulate",
        "ban",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
    ),
    response: Schema.optional(
      Schema.Struct({
        body: Schema.optional(Schema.String),
        contentType: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ body: "body", contentType: "content_type" })),
    ),
    timeout: Schema.optional(Schema.Number),
  }),
  filter: Schema.Unknown,
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export type CreateRuleResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const CreateRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
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

export interface PutRuleRequest {
  ruleId: string;
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The action to perform when the threshold of matched traffic within the configured period is exceeded. */
  action: {
    mode?:
      | "simulate"
      | "ban"
      | "challenge"
      | "js_challenge"
      | "managed_challenge";
    response?: { body?: string; contentType?: string };
    timeout?: number;
  };
  /** Body param: */
  filter: unknown;
}

export const PutRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  action: Schema.Struct({
    mode: Schema.optional(
      Schema.Literals([
        "simulate",
        "ban",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
    ),
    response: Schema.optional(
      Schema.Struct({
        body: Schema.optional(Schema.String),
        contentType: Schema.optional(Schema.String),
      }).pipe(Schema.encodeKeys({ body: "body", contentType: "content_type" })),
    ),
    timeout: Schema.optional(Schema.Number),
  }),
  filter: Schema.Unknown,
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/rules/{ruleId}" }),
) as unknown as Schema.Schema<PutRuleRequest>;

export interface PutRuleResponse {
  /** The unique identifier of the firewall rule. */
  id?: string;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  /** An informative summary of the firewall rule. */
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string;
}

export const PutRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  action: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
      "allow",
      "log",
      "bypass",
    ]),
  ),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.String,
        deleted: Schema.Boolean,
      }),
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  products: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "zoneLockdown",
        "uaBlock",
        "bic",
        "hot",
        "securityLevel",
        "rateLimit",
        "waf",
      ]),
    ),
  ),
  ref: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<PutRuleResponse>;

export type PutRuleError = CommonErrors;

export const putRule: API.OperationMethod<
  PutRuleRequest,
  PutRuleResponse,
  PutRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutRuleRequest,
  output: PutRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  ruleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/firewall/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  /** The unique identifier of the firewall rule. */
  id?: string;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  /** An informative summary of the firewall rule. */
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string;
}

export const DeleteRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  action: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
      "allow",
      "log",
      "bypass",
    ]),
  ),
  description: Schema.optional(Schema.String),
  filter: Schema.optional(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.String,
        deleted: Schema.Boolean,
      }),
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  products: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "zoneLockdown",
        "uaBlock",
        "bic",
        "hot",
        "securityLevel",
        "rateLimit",
        "waf",
      ]),
    ),
  ),
  ref: Schema.optional(Schema.String),
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

export interface BulkUpdateRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const BulkUpdateRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkUpdateRulesRequest>;

export type BulkUpdateRulesResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const BulkUpdateRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<BulkUpdateRulesResponse>;

export type BulkUpdateRulesError = CommonErrors;

export const bulkUpdateRules: API.OperationMethod<
  BulkUpdateRulesRequest,
  BulkUpdateRulesResponse,
  BulkUpdateRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkUpdateRulesRequest,
  output: BulkUpdateRulesResponse,
  errors: [],
}));

export interface BulkDeleteRulesRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const BulkDeleteRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkDeleteRulesRequest>;

export type BulkDeleteRulesResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const BulkDeleteRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<BulkDeleteRulesResponse>;

export type BulkDeleteRulesError = CommonErrors;

export const bulkDeleteRules: API.OperationMethod<
  BulkDeleteRulesRequest,
  BulkDeleteRulesResponse,
  BulkDeleteRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: BulkDeleteRulesRequest,
  output: BulkDeleteRulesResponse,
  errors: [],
}));

export interface EditRuleRequest {
  ruleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const EditRuleRequest = Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules/{ruleId}" }),
) as unknown as Schema.Schema<EditRuleRequest>;

export type EditRuleResponse = {
  id?: string;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass";
  description?: string;
  filter?: unknown | { id: string; deleted: boolean };
  paused?: boolean;
  priority?: number;
  products?: (
    | "zoneLockdown"
    | "uaBlock"
    | "bic"
    | "hot"
    | "securityLevel"
    | "rateLimit"
    | "waf"
  )[];
  ref?: string;
}[];

export const EditRuleResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    action: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
    ),
    description: Schema.optional(Schema.String),
    filter: Schema.optional(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    products: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "zoneLockdown",
          "uaBlock",
          "bic",
          "hot",
          "securityLevel",
          "rateLimit",
          "waf",
        ]),
      ),
    ),
    ref: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<EditRuleResponse>;

export type EditRuleError = CommonErrors;

export const editRule: API.OperationMethod<
  EditRuleRequest,
  EditRuleResponse,
  EditRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EditRuleRequest,
  output: EditRuleResponse,
  errors: [],
}));

// =============================================================================
// UaRule
// =============================================================================

export interface GetUaRuleRequest {
  uaRuleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetUaRuleRequest = Schema.Struct({
  uaRuleId: Schema.String.pipe(T.HttpPath("uaRuleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/ua_rules/{uaRuleId}",
  }),
) as unknown as Schema.Schema<GetUaRuleRequest>;

export interface GetUaRuleResponse {
  /** The unique identifier of the User Agent Blocking rule. */
  id?: string;
  /** The configuration object for the current rule. */
  configuration?: { target?: string; value?: string };
  /** An informative summary of the rule. */
  description?: string;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge";
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const GetUaRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  configuration: Schema.optional(
    Schema.Struct({
      target: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<GetUaRuleResponse>;

export type GetUaRuleError = CommonErrors;

export const getUaRule: API.OperationMethod<
  GetUaRuleRequest,
  GetUaRuleResponse,
  GetUaRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUaRuleRequest,
  output: GetUaRuleResponse,
  errors: [],
}));

export interface ListUaRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: A string to search for in the description of existing rules. */
  description?: string;
  /** Query param: When true, indicates that the rule is currently paused. */
  paused?: boolean;
  /** Query param: A string to search for in the user agent values of existing rules. */
  userAgent?: string;
}

export const ListUaRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused")),
  userAgent: Schema.optional(Schema.String).pipe(T.HttpQuery("user_agent")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/ua_rules" }),
) as unknown as Schema.Schema<ListUaRulesRequest>;

export type ListUaRulesResponse = {
  id?: string;
  configuration?: { target?: string; value?: string };
  description?: string;
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge";
  paused?: boolean;
}[];

export const ListUaRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    configuration: Schema.optional(
      Schema.Struct({
        target: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
    description: Schema.optional(Schema.String),
    mode: Schema.optional(
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
    ),
    paused: Schema.optional(Schema.Boolean),
  }),
) as unknown as Schema.Schema<ListUaRulesResponse>;

export type ListUaRulesError = CommonErrors;

export const listUaRules: API.OperationMethod<
  ListUaRulesRequest,
  ListUaRulesResponse,
  ListUaRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListUaRulesRequest,
  output: ListUaRulesResponse,
  errors: [],
}));

export interface CreateUaRuleRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  configuration: { target?: "ua"; value?: string };
  /** Body param: The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** Body param: An informative summary of the rule. This value is sanitized and any tags will be removed. */
  description?: string;
  /** Body param: When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const CreateUaRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configuration: Schema.Struct({
    target: Schema.optional(Schema.Literal("ua")),
    value: Schema.optional(Schema.String),
  }),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  description: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/ua_rules" }),
) as unknown as Schema.Schema<CreateUaRuleRequest>;

export interface CreateUaRuleResponse {
  /** The unique identifier of the User Agent Blocking rule. */
  id?: string;
  /** The configuration object for the current rule. */
  configuration?: { target?: string; value?: string };
  /** An informative summary of the rule. */
  description?: string;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge";
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const CreateUaRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  configuration: Schema.optional(
    Schema.Struct({
      target: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<CreateUaRuleResponse>;

export type CreateUaRuleError = CommonErrors;

export const createUaRule: API.OperationMethod<
  CreateUaRuleRequest,
  CreateUaRuleResponse,
  CreateUaRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateUaRuleRequest,
  output: CreateUaRuleResponse,
  errors: [],
}));

export interface UpdateUaRuleRequest {
  uaRuleId: string;
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The rule configuration. */
  configuration: unknown;
  /** Body param: The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** Body param: An informative summary of the rule. This value is sanitized and any tags will be removed. */
  description?: string;
  /** Body param: When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const UpdateUaRuleRequest = Schema.Struct({
  uaRuleId: Schema.String.pipe(T.HttpPath("uaRuleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  configuration: Schema.Unknown,
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  description: Schema.optional(Schema.String),
  paused: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/firewall/ua_rules/{uaRuleId}",
  }),
) as unknown as Schema.Schema<UpdateUaRuleRequest>;

export interface UpdateUaRuleResponse {
  /** The unique identifier of the User Agent Blocking rule. */
  id?: string;
  /** The configuration object for the current rule. */
  configuration?: { target?: string; value?: string };
  /** An informative summary of the rule. */
  description?: string;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge";
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const UpdateUaRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  configuration: Schema.optional(
    Schema.Struct({
      target: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<UpdateUaRuleResponse>;

export type UpdateUaRuleError = CommonErrors;

export const updateUaRule: API.OperationMethod<
  UpdateUaRuleRequest,
  UpdateUaRuleResponse,
  UpdateUaRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateUaRuleRequest,
  output: UpdateUaRuleResponse,
  errors: [],
}));

export interface DeleteUaRuleRequest {
  uaRuleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteUaRuleRequest = Schema.Struct({
  uaRuleId: Schema.String.pipe(T.HttpPath("uaRuleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/firewall/ua_rules/{uaRuleId}",
  }),
) as unknown as Schema.Schema<DeleteUaRuleRequest>;

export interface DeleteUaRuleResponse {
  /** The unique identifier of the User Agent Blocking rule. */
  id?: string;
  /** The configuration object for the current rule. */
  configuration?: { target?: string; value?: string };
  /** An informative summary of the rule. */
  description?: string;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge";
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
}

export const DeleteUaRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  configuration: Schema.optional(
    Schema.Struct({
      target: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(
    Schema.Literals([
      "block",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]),
  ),
  paused: Schema.optional(Schema.Boolean),
}) as unknown as Schema.Schema<DeleteUaRuleResponse>;

export type DeleteUaRuleError = CommonErrors;

export const deleteUaRule: API.OperationMethod<
  DeleteUaRuleRequest,
  DeleteUaRuleResponse,
  DeleteUaRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteUaRuleRequest,
  output: DeleteUaRuleResponse,
  errors: [],
}));

// =============================================================================
// WafOverride
// =============================================================================

export interface GetWafOverrideRequest {
  overridesId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetWafOverrideRequest = Schema.Struct({
  overridesId: Schema.String.pipe(T.HttpPath("overridesId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/overrides/{overridesId}",
  }),
) as unknown as Schema.Schema<GetWafOverrideRequest>;

export interface GetWafOverrideResponse {
  /** The unique identifier of the WAF override. */
  id?: string;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown>;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default";
    challenge?: "challenge" | "block" | "simulate" | "disable" | "default";
    default?: "challenge" | "block" | "simulate" | "disable" | "default";
    disable?: "challenge" | "block" | "simulate" | "disable" | "default";
    simulate?: "challenge" | "block" | "simulate" | "disable" | "default";
  };
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[];
}

export const GetWafOverrideResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  groups: Schema.optional(Schema.Struct({})),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewriteAction: Schema.optional(
    Schema.Struct({
      block: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      challenge: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      default: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      disable: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      simulate: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
    }),
  ),
  rules: Schema.optional(Schema.Unknown),
  urls: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    groups: "groups",
    paused: "paused",
    priority: "priority",
    rewriteAction: "rewrite_action",
    rules: "rules",
    urls: "urls",
  }),
) as unknown as Schema.Schema<GetWafOverrideResponse>;

export type GetWafOverrideError = CommonErrors;

export const getWafOverride: API.OperationMethod<
  GetWafOverrideRequest,
  GetWafOverrideResponse,
  GetWafOverrideError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWafOverrideRequest,
  output: GetWafOverrideResponse,
  errors: [],
}));

export interface ListWafOverridesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
}

export const ListWafOverridesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/overrides" }),
) as unknown as Schema.Schema<ListWafOverridesRequest>;

export type ListWafOverridesResponse = {
  id?: string;
  description?: string | null;
  groups?: Record<string, unknown>;
  paused?: boolean;
  priority?: number;
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default";
    challenge?: "challenge" | "block" | "simulate" | "disable" | "default";
    default?: "challenge" | "block" | "simulate" | "disable" | "default";
    disable?: "challenge" | "block" | "simulate" | "disable" | "default";
    simulate?: "challenge" | "block" | "simulate" | "disable" | "default";
  };
  rules?: unknown;
  urls?: string[];
}[];

export const ListWafOverridesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    groups: Schema.optional(Schema.Struct({})),
    paused: Schema.optional(Schema.Boolean),
    priority: Schema.optional(Schema.Number),
    rewriteAction: Schema.optional(
      Schema.Struct({
        block: Schema.optional(
          Schema.Literals([
            "challenge",
            "block",
            "simulate",
            "disable",
            "default",
          ]),
        ),
        challenge: Schema.optional(
          Schema.Literals([
            "challenge",
            "block",
            "simulate",
            "disable",
            "default",
          ]),
        ),
        default: Schema.optional(
          Schema.Literals([
            "challenge",
            "block",
            "simulate",
            "disable",
            "default",
          ]),
        ),
        disable: Schema.optional(
          Schema.Literals([
            "challenge",
            "block",
            "simulate",
            "disable",
            "default",
          ]),
        ),
        simulate: Schema.optional(
          Schema.Literals([
            "challenge",
            "block",
            "simulate",
            "disable",
            "default",
          ]),
        ),
      }),
    ),
    rules: Schema.optional(Schema.Unknown),
    urls: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      groups: "groups",
      paused: "paused",
      priority: "priority",
      rewriteAction: "rewrite_action",
      rules: "rules",
      urls: "urls",
    }),
  ),
) as unknown as Schema.Schema<ListWafOverridesResponse>;

export type ListWafOverridesError = CommonErrors;

export const listWafOverrides: API.OperationMethod<
  ListWafOverridesRequest,
  ListWafOverridesResponse,
  ListWafOverridesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafOverridesRequest,
  output: ListWafOverridesResponse,
  errors: [],
}));

export interface CreateWafOverrideRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const CreateWafOverrideRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  urls: Schema.Array(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/waf/overrides" }),
) as unknown as Schema.Schema<CreateWafOverrideRequest>;

export interface CreateWafOverrideResponse {
  /** The unique identifier of the WAF override. */
  id?: string;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown>;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default";
    challenge?: "challenge" | "block" | "simulate" | "disable" | "default";
    default?: "challenge" | "block" | "simulate" | "disable" | "default";
    disable?: "challenge" | "block" | "simulate" | "disable" | "default";
    simulate?: "challenge" | "block" | "simulate" | "disable" | "default";
  };
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[];
}

export const CreateWafOverrideResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  groups: Schema.optional(Schema.Struct({})),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewriteAction: Schema.optional(
    Schema.Struct({
      block: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      challenge: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      default: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      disable: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      simulate: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
    }),
  ),
  rules: Schema.optional(Schema.Unknown),
  urls: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    groups: "groups",
    paused: "paused",
    priority: "priority",
    rewriteAction: "rewrite_action",
    rules: "rules",
    urls: "urls",
  }),
) as unknown as Schema.Schema<CreateWafOverrideResponse>;

export type CreateWafOverrideError = CommonErrors;

export const createWafOverride: API.OperationMethod<
  CreateWafOverrideRequest,
  CreateWafOverrideResponse,
  CreateWafOverrideError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateWafOverrideRequest,
  output: CreateWafOverrideResponse,
  errors: [],
}));

export interface UpdateWafOverrideRequest {
  overridesId: string;
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: Defines an identifier. */
  id: string;
  /** Body param: Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default";
    challenge?: "challenge" | "block" | "simulate" | "disable" | "default";
    default?: "challenge" | "block" | "simulate" | "disable" | "default";
    disable?: "challenge" | "block" | "simulate" | "disable" | "default";
    simulate?: "challenge" | "block" | "simulate" | "disable" | "default";
  };
  /** Body param: An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disa */
  rules: unknown;
  /** Body param: The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls: string[];
}

export const UpdateWafOverrideRequest = Schema.Struct({
  overridesId: Schema.String.pipe(T.HttpPath("overridesId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.String,
  rewriteAction: Schema.Struct({
    block: Schema.optional(
      Schema.Literals(["challenge", "block", "simulate", "disable", "default"]),
    ),
    challenge: Schema.optional(
      Schema.Literals(["challenge", "block", "simulate", "disable", "default"]),
    ),
    default: Schema.optional(
      Schema.Literals(["challenge", "block", "simulate", "disable", "default"]),
    ),
    disable: Schema.optional(
      Schema.Literals(["challenge", "block", "simulate", "disable", "default"]),
    ),
    simulate: Schema.optional(
      Schema.Literals(["challenge", "block", "simulate", "disable", "default"]),
    ),
  }),
  rules: Schema.Unknown,
  urls: Schema.Array(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    rewriteAction: "rewrite_action",
    rules: "rules",
    urls: "urls",
  }),
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/firewall/waf/overrides/{overridesId}",
  }),
) as unknown as Schema.Schema<UpdateWafOverrideRequest>;

export interface UpdateWafOverrideResponse {
  /** The unique identifier of the WAF override. */
  id?: string;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown>;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default";
    challenge?: "challenge" | "block" | "simulate" | "disable" | "default";
    default?: "challenge" | "block" | "simulate" | "disable" | "default";
    disable?: "challenge" | "block" | "simulate" | "disable" | "default";
    simulate?: "challenge" | "block" | "simulate" | "disable" | "default";
  };
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[];
}

export const UpdateWafOverrideResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  groups: Schema.optional(Schema.Struct({})),
  paused: Schema.optional(Schema.Boolean),
  priority: Schema.optional(Schema.Number),
  rewriteAction: Schema.optional(
    Schema.Struct({
      block: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      challenge: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      default: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      disable: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
      simulate: Schema.optional(
        Schema.Literals([
          "challenge",
          "block",
          "simulate",
          "disable",
          "default",
        ]),
      ),
    }),
  ),
  rules: Schema.optional(Schema.Unknown),
  urls: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    groups: "groups",
    paused: "paused",
    priority: "priority",
    rewriteAction: "rewrite_action",
    rules: "rules",
    urls: "urls",
  }),
) as unknown as Schema.Schema<UpdateWafOverrideResponse>;

export type UpdateWafOverrideError = CommonErrors;

export const updateWafOverride: API.OperationMethod<
  UpdateWafOverrideRequest,
  UpdateWafOverrideResponse,
  UpdateWafOverrideError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateWafOverrideRequest,
  output: UpdateWafOverrideResponse,
  errors: [],
}));

export interface DeleteWafOverrideRequest {
  overridesId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteWafOverrideRequest = Schema.Struct({
  overridesId: Schema.String.pipe(T.HttpPath("overridesId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/firewall/waf/overrides/{overridesId}",
  }),
) as unknown as Schema.Schema<DeleteWafOverrideRequest>;

export interface DeleteWafOverrideResponse {
  /** The unique identifier of the WAF override. */
  id?: string;
}

export const DeleteWafOverrideResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteWafOverrideResponse>;

export type DeleteWafOverrideError = CommonErrors;

export const deleteWafOverride: API.OperationMethod<
  DeleteWafOverrideRequest,
  DeleteWafOverrideResponse,
  DeleteWafOverrideError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteWafOverrideRequest,
  output: DeleteWafOverrideResponse,
  errors: [],
}));

// =============================================================================
// WafPackage
// =============================================================================

export interface GetWafPackageRequest {
  packageId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const GetWafPackageRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}",
  }),
) as unknown as Schema.Schema<GetWafPackageRequest>;

export type GetWafPackageResponse =
  | {
      errors: unknown[];
      messages: unknown[];
      result: string | null;
      success: true;
    }
  | { result?: unknown };

export const GetWafPackageResponse = Schema.Union([
  Schema.Struct({
    errors: Schema.Array(Schema.Unknown),
    messages: Schema.Array(Schema.Unknown),
    result: Schema.Union([Schema.String, Schema.Null]),
    success: Schema.Literal(true),
  }),
  Schema.Struct({
    result: Schema.optional(Schema.Unknown),
  }),
]) as unknown as Schema.Schema<GetWafPackageResponse>;

export type GetWafPackageError = CommonErrors;

export const getWafPackage: API.OperationMethod<
  GetWafPackageRequest,
  GetWafPackageResponse,
  GetWafPackageError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWafPackageRequest,
  output: GetWafPackageResponse,
  errors: [],
}));

export interface ListWafPackagesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Query param: The direction used to sort returned packages. */
  direction?: "asc" | "desc";
  /** Query param: When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. */
  match?: "any" | "all";
  /** Query param: The name of the WAF package. */
  name?: string;
  /** Query param: The field used to sort returned packages. */
  order?: "name";
}

export const ListWafPackagesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
    T.HttpQuery("match"),
  ),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  order: Schema.optional(Schema.Literal("name")).pipe(T.HttpQuery("order")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages" }),
) as unknown as Schema.Schema<ListWafPackagesRequest>;

export type ListWafPackagesResponse = unknown[];

export const ListWafPackagesResponse = Schema.Array(
  Schema.Unknown,
) as unknown as Schema.Schema<ListWafPackagesResponse>;

export type ListWafPackagesError = CommonErrors;

export const listWafPackages: API.OperationMethod<
  ListWafPackagesRequest,
  ListWafPackagesResponse,
  ListWafPackagesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafPackagesRequest,
  output: ListWafPackagesResponse,
  errors: [],
}));

// =============================================================================
// WafPackageGroup
// =============================================================================

export interface GetWafPackageGroupRequest {
  packageId: string;
  groupId: string;
  /** Defines an identifier of a schema. */
  zoneId: string;
}

export const GetWafPackageGroupRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  groupId: Schema.String.pipe(T.HttpPath("groupId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/groups/{groupId}",
  }),
) as unknown as Schema.Schema<GetWafPackageGroupRequest>;

export type GetWafPackageGroupResponse = string | null;

export const GetWafPackageGroupResponse = Schema.Union([
  Schema.String,
  Schema.Null,
]) as unknown as Schema.Schema<GetWafPackageGroupResponse>;

export type GetWafPackageGroupError = CommonErrors;

export const getWafPackageGroup: API.OperationMethod<
  GetWafPackageGroupRequest,
  GetWafPackageGroupResponse,
  GetWafPackageGroupError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWafPackageGroupRequest,
  output: GetWafPackageGroupResponse,
  errors: [],
}));

export interface ListWafPackageGroupsRequest {
  packageId: string;
  /** Path param: Defines an identifier of a schema. */
  zoneId: string;
  /** Query param: Defines the direction used to sort returned rule groups. */
  direction?: "asc" | "desc";
  /** Query param: Defines the condition for search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. */
  match?: "any" | "all";
  /** Query param: Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable. */
  mode?: "on" | "off";
  /** Query param: Defines the name of the rule group. */
  name?: string;
  /** Query param: Defines the field used to sort returned rule groups. */
  order?: "mode" | "rules_count";
  /** Query param: Defines the number of rules in the current rule group. */
  rulesCount?: number;
}

export const ListWafPackageGroupsRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
    T.HttpQuery("match"),
  ),
  mode: Schema.optional(Schema.Literals(["on", "off"])).pipe(
    T.HttpQuery("mode"),
  ),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  order: Schema.optional(Schema.Literals(["mode", "rules_count"])).pipe(
    T.HttpQuery("order"),
  ),
  rulesCount: Schema.optional(Schema.Number).pipe(T.HttpQuery("rules_count")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/groups",
  }),
) as unknown as Schema.Schema<ListWafPackageGroupsRequest>;

export type ListWafPackageGroupsResponse = {
  id: string;
  description: string | null;
  mode: "on" | "off";
  name: string;
  rulesCount: number;
  allowedModes?: ("on" | "off")[];
  modifiedRulesCount?: number;
  packageId?: string;
}[];

export const ListWafPackageGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    mode: Schema.Literals(["on", "off"]),
    name: Schema.String,
    rulesCount: Schema.Number,
    allowedModes: Schema.optional(Schema.Array(Schema.Literals(["on", "off"]))),
    modifiedRulesCount: Schema.optional(Schema.Number),
    packageId: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      mode: "mode",
      name: "name",
      rulesCount: "rules_count",
      allowedModes: "allowed_modes",
      modifiedRulesCount: "modified_rules_count",
      packageId: "package_id",
    }),
  ),
) as unknown as Schema.Schema<ListWafPackageGroupsResponse>;

export type ListWafPackageGroupsError = CommonErrors;

export const listWafPackageGroups: API.OperationMethod<
  ListWafPackageGroupsRequest,
  ListWafPackageGroupsResponse,
  ListWafPackageGroupsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafPackageGroupsRequest,
  output: ListWafPackageGroupsResponse,
  errors: [],
}));

export interface PatchWafPackageGroupRequest {
  packageId: string;
  groupId: string;
  /** Path param: Defines an identifier of a schema. */
  zoneId: string;
  /** Body param: Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable. */
  mode?: "on" | "off";
}

export const PatchWafPackageGroupRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  groupId: Schema.String.pipe(T.HttpPath("groupId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  mode: Schema.optional(Schema.Literals(["on", "off"])),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/groups/{groupId}",
  }),
) as unknown as Schema.Schema<PatchWafPackageGroupRequest>;

export type PatchWafPackageGroupResponse = string | null;

export const PatchWafPackageGroupResponse = Schema.Union([
  Schema.String,
  Schema.Null,
]) as unknown as Schema.Schema<PatchWafPackageGroupResponse>;

export type PatchWafPackageGroupError = CommonErrors;

export const patchWafPackageGroup: API.OperationMethod<
  PatchWafPackageGroupRequest,
  PatchWafPackageGroupResponse,
  PatchWafPackageGroupError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchWafPackageGroupRequest,
  output: PatchWafPackageGroupResponse,
  errors: [],
}));

// =============================================================================
// WafPackageRule
// =============================================================================

export interface GetWafPackageRuleRequest {
  packageId: string;
  ruleId: string;
  /** Defines an identifier of a schema. */
  zoneId: string;
}

export const GetWafPackageRuleRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<GetWafPackageRuleRequest>;

export type GetWafPackageRuleResponse = string | null;

export const GetWafPackageRuleResponse = Schema.Union([
  Schema.String,
  Schema.Null,
]) as unknown as Schema.Schema<GetWafPackageRuleResponse>;

export type GetWafPackageRuleError = CommonErrors;

export const getWafPackageRule: API.OperationMethod<
  GetWafPackageRuleRequest,
  GetWafPackageRuleResponse,
  GetWafPackageRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetWafPackageRuleRequest,
  output: GetWafPackageRuleResponse,
  errors: [],
}));

export interface ListWafPackageRulesRequest {
  packageId: string;
  /** Path param: Defines an identifier of a schema. */
  zoneId: string;
  /** Query param: Defines the public description of the WAF rule. */
  description?: string;
  /** Query param: Defines the direction used to sort returned rules. */
  direction?: "asc" | "desc";
  /** Query param: Defines the unique identifier of the rule group. */
  groupId?: string;
  /** Query param: Defines the search requirements. When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. */
  match?: "any" | "all";
  /** Query param: Defines the action/mode a rule has been overridden to perform. */
  mode?: "DIS" | "CHL" | "BLK" | "SIM";
  /** Query param: Defines the field used to sort returned rules. */
  order?: "priority" | "group_id" | "description";
  /** Query param: Defines the order in which the individual WAF rule is executed within its rule group. */
  priority?: string;
}

export const ListWafPackageRulesRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("group_id")),
  match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
    T.HttpQuery("match"),
  ),
  mode: Schema.optional(Schema.Literals(["DIS", "CHL", "BLK", "SIM"])).pipe(
    T.HttpQuery("mode"),
  ),
  order: Schema.optional(
    Schema.Literals(["priority", "group_id", "description"]),
  ).pipe(T.HttpQuery("order")),
  priority: Schema.optional(Schema.String).pipe(T.HttpQuery("priority")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/rules",
  }),
) as unknown as Schema.Schema<ListWafPackageRulesRequest>;

export type ListWafPackageRulesResponse = (
  | {
      id: string;
      allowedModes: ("on" | "off")[];
      description: string;
      group: unknown;
      mode: "on" | "off";
      packageId: string;
      priority: string;
    }
  | {
      id: string;
      allowedModes: (
        | "default"
        | "disable"
        | "simulate"
        | "block"
        | "challenge"
      )[];
      defaultMode: "disable" | "simulate" | "block" | "challenge";
      description: string;
      group: unknown;
      mode: "default" | "disable" | "simulate" | "block" | "challenge";
      packageId: string;
      priority: string;
    }
)[];

export const ListWafPackageRulesResponse = Schema.Array(
  Schema.Union([
    Schema.Struct({
      id: Schema.String,
      allowedModes: Schema.Array(Schema.Literals(["on", "off"])),
      description: Schema.String,
      group: Schema.Unknown,
      mode: Schema.Literals(["on", "off"]),
      packageId: Schema.String,
      priority: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        allowedModes: "allowed_modes",
        description: "description",
        group: "group",
        mode: "mode",
        packageId: "package_id",
        priority: "priority",
      }),
    ),
    Schema.Struct({
      id: Schema.String,
      allowedModes: Schema.Array(
        Schema.Literals([
          "default",
          "disable",
          "simulate",
          "block",
          "challenge",
        ]),
      ),
      defaultMode: Schema.Literals([
        "disable",
        "simulate",
        "block",
        "challenge",
      ]),
      description: Schema.String,
      group: Schema.Unknown,
      mode: Schema.Literals([
        "default",
        "disable",
        "simulate",
        "block",
        "challenge",
      ]),
      packageId: Schema.String,
      priority: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        allowedModes: "allowed_modes",
        defaultMode: "default_mode",
        description: "description",
        group: "group",
        mode: "mode",
        packageId: "package_id",
        priority: "priority",
      }),
    ),
  ]),
) as unknown as Schema.Schema<ListWafPackageRulesResponse>;

export type ListWafPackageRulesError = CommonErrors;

export const listWafPackageRules: API.OperationMethod<
  ListWafPackageRulesRequest,
  ListWafPackageRulesResponse,
  ListWafPackageRulesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListWafPackageRulesRequest,
  output: ListWafPackageRulesResponse,
  errors: [],
}));

export interface PatchWafPackageRuleRequest {
  packageId: string;
  ruleId: string;
  /** Path param: Defines an identifier of a schema. */
  zoneId: string;
  /** Body param: Defines the mode/action of the rule when triggered. You must use a value from the `allowed_modes` array of the current rule. */
  mode?:
    | "default"
    | "disable"
    | "simulate"
    | "block"
    | "challenge"
    | "on"
    | "off";
}

export const PatchWafPackageRuleRequest = Schema.Struct({
  packageId: Schema.String.pipe(T.HttpPath("packageId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  mode: Schema.optional(
    Schema.Literals([
      "default",
      "disable",
      "simulate",
      "block",
      "challenge",
      "on",
      "off",
    ]),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/zones/{zone_id}/firewall/waf/packages/{packageId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<PatchWafPackageRuleRequest>;

export type PatchWafPackageRuleResponse =
  | {
      id: string;
      allowedModes: ("on" | "off")[];
      description: string;
      group: unknown;
      mode: "on" | "off";
      packageId: string;
      priority: string;
    }
  | {
      id: string;
      allowedModes: (
        | "default"
        | "disable"
        | "simulate"
        | "block"
        | "challenge"
      )[];
      defaultMode: "disable" | "simulate" | "block" | "challenge";
      description: string;
      group: unknown;
      mode: "default" | "disable" | "simulate" | "block" | "challenge";
      packageId: string;
      priority: string;
    };

export const PatchWafPackageRuleResponse = Schema.Union([
  Schema.Struct({
    id: Schema.String,
    allowedModes: Schema.Array(Schema.Literals(["on", "off"])),
    description: Schema.String,
    group: Schema.Unknown,
    mode: Schema.Literals(["on", "off"]),
    packageId: Schema.String,
    priority: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      allowedModes: "allowed_modes",
      description: "description",
      group: "group",
      mode: "mode",
      packageId: "package_id",
      priority: "priority",
    }),
  ),
  Schema.Struct({
    id: Schema.String,
    allowedModes: Schema.Array(
      Schema.Literals(["default", "disable", "simulate", "block", "challenge"]),
    ),
    defaultMode: Schema.Literals(["disable", "simulate", "block", "challenge"]),
    description: Schema.String,
    group: Schema.Unknown,
    mode: Schema.Literals([
      "default",
      "disable",
      "simulate",
      "block",
      "challenge",
    ]),
    packageId: Schema.String,
    priority: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      allowedModes: "allowed_modes",
      defaultMode: "default_mode",
      description: "description",
      group: "group",
      mode: "mode",
      packageId: "package_id",
      priority: "priority",
    }),
  ),
]) as unknown as Schema.Schema<PatchWafPackageRuleResponse>;

export type PatchWafPackageRuleError = CommonErrors;

export const patchWafPackageRule: API.OperationMethod<
  PatchWafPackageRuleRequest,
  PatchWafPackageRuleResponse,
  PatchWafPackageRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchWafPackageRuleRequest,
  output: PatchWafPackageRuleResponse,
  errors: [],
}));
