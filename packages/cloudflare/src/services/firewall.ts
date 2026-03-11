/**
 * Cloudflare FIREWALL API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service firewall
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// AccessRule
// =============================================================================

export interface GetAccessRuleRequest {
  ruleId: string;
}

export const GetAccessRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    | { target?: "ip" | null; value?: string | null }
    | { target?: "ip6" | null; value?: string | null }
    | { target?: "ip_range" | null; value?: string | null }
    | { target?: "asn" | null; value?: string | null }
    | { target?: "country" | null; value?: string | null };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string | null;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string | null;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string | null;
  /** All zones owned by the user will have the rule applied. */
  scope?: {
    id?: string | null;
    email?: string | null;
    type?: "user" | "organization" | null;
  } | null;
}

export const GetAccessRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      target: Schema.optional(
        Schema.Union([Schema.Literal("ip"), Schema.Null]),
      ),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    Schema.Struct({
      target: Schema.optional(
        Schema.Union([Schema.Literal("ip6"), Schema.Null]),
      ),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    Schema.Struct({
      target: Schema.optional(
        Schema.Union([Schema.Literal("ip_range"), Schema.Null]),
      ),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    Schema.Struct({
      target: Schema.optional(
        Schema.Union([Schema.Literal("asn"), Schema.Null]),
      ),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
    Schema.Struct({
      target: Schema.optional(
        Schema.Union([Schema.Literal("country"), Schema.Null]),
      ),
      value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  ]),
  mode: Schema.Literals([
    "block",
    "challenge",
    "whitelist",
    "js_challenge",
    "managed_challenge",
  ]),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  notes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  scope: Schema.optional(
    Schema.Union([
      Schema.Struct({
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.optional(
          Schema.Union([
            Schema.Literals(["user", "organization"]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
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

export type GetAccessRuleError = DefaultErrors;

export const getAccessRule: API.OperationMethod<
  GetAccessRuleRequest,
  GetAccessRuleResponse,
  GetAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccessRuleRequest,
  output: GetAccessRuleResponse,
  errors: [],
}));

export interface ListAccessRulesRequest {}

export const ListAccessRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
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
    | { target?: "ip" | null; value?: string | null }
    | { target?: "ip6" | null; value?: string | null }
    | { target?: "ip_range" | null; value?: string | null }
    | { target?: "asn" | null; value?: string | null }
    | { target?: "country" | null; value?: string | null };
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  createdOn?: string | null;
  modifiedOn?: string | null;
  notes?: string | null;
  scope?: {
    id?: string | null;
    email?: string | null;
    type?: "user" | "organization" | null;
  } | null;
}[];

export const ListAccessRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip6"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip_range"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("asn"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("country"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ]),
    mode: Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    notes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scope: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          type: Schema.optional(
            Schema.Union([
              Schema.Literals(["user", "organization"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
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

export type ListAccessRulesError = DefaultErrors;

export const listAccessRules: API.OperationMethod<
  ListAccessRulesRequest,
  ListAccessRulesResponse,
  ListAccessRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateAccessRuleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    | { target?: "ip" | null; value?: string | null }
    | { target?: "ip6" | null; value?: string | null }
    | { target?: "ip_range" | null; value?: string | null }
    | { target?: "asn" | null; value?: string | null }
    | { target?: "country" | null; value?: string | null };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string | null;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string | null;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string | null;
  /** All zones owned by the user will have the rule applied. */
  scope?: {
    id?: string | null;
    email?: string | null;
    type?: "user" | "organization" | null;
  } | null;
}

export const CreateAccessRuleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip6"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip_range"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("asn"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("country"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ]),
    mode: Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    notes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scope: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          type: Schema.optional(
            Schema.Union([
              Schema.Literals(["user", "organization"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
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

export type CreateAccessRuleError = DefaultErrors;

export const createAccessRule: API.OperationMethod<
  CreateAccessRuleRequest,
  CreateAccessRuleResponse,
  CreateAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchAccessRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
).pipe(
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
    | { target?: "ip" | null; value?: string | null }
    | { target?: "ip6" | null; value?: string | null }
    | { target?: "ip_range" | null; value?: string | null }
    | { target?: "asn" | null; value?: string | null }
    | { target?: "country" | null; value?: string | null };
  /** The action to apply to a matched request. */
  mode:
    | "block"
    | "challenge"
    | "whitelist"
    | "js_challenge"
    | "managed_challenge";
  /** The timestamp of when the rule was created. */
  createdOn?: string | null;
  /** The timestamp of when the rule was last modified. */
  modifiedOn?: string | null;
  /** An informative summary of the rule, typically used as a reminder or explanation. */
  notes?: string | null;
  /** All zones owned by the user will have the rule applied. */
  scope?: {
    id?: string | null;
    email?: string | null;
    type?: "user" | "organization" | null;
  } | null;
}

export const PatchAccessRuleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip6"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("ip_range"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("asn"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Struct({
        target: Schema.optional(
          Schema.Union([Schema.Literal("country"), Schema.Null]),
        ),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
    ]),
    mode: Schema.Literals([
      "block",
      "challenge",
      "whitelist",
      "js_challenge",
      "managed_challenge",
    ]),
    createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    notes: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scope: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          type: Schema.optional(
            Schema.Union([
              Schema.Literals(["user", "organization"]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
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

export type PatchAccessRuleError = DefaultErrors;

export const patchAccessRule: API.OperationMethod<
  PatchAccessRuleRequest,
  PatchAccessRuleResponse,
  PatchAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccessRuleRequest,
  output: PatchAccessRuleResponse,
  errors: [],
}));

export interface DeleteAccessRuleRequest {
  ruleId: string;
}

export const DeleteAccessRuleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const DeleteAccessRuleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
  }) as unknown as Schema.Schema<DeleteAccessRuleResponse>;

export type DeleteAccessRuleError = DefaultErrors;

export const deleteAccessRule: API.OperationMethod<
  DeleteAccessRuleRequest,
  DeleteAccessRuleResponse,
  DeleteAccessRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccessRuleRequest,
  output: DeleteAccessRuleResponse,
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

export const GetLockdownRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetLockdownResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export type GetLockdownError = DefaultErrors;

export const getLockdown: API.OperationMethod<
  GetLockdownRequest,
  GetLockdownResponse,
  GetLockdownError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListLockdownsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const ListLockdownsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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

export type ListLockdownsError = DefaultErrors;

export const listLockdowns: API.OperationMethod<
  ListLockdownsRequest,
  ListLockdownsResponse,
  ListLockdownsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateLockdownRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const CreateLockdownResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    configurations: Schema.Unknown,
    createdOn: Schema.String,
    description: Schema.String,
    modifiedOn: Schema.String,
    paused: Schema.Boolean,
    urls: Schema.Array(Schema.String),
  },
).pipe(
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

export type CreateLockdownError = DefaultErrors;

export const createLockdown: API.OperationMethod<
  CreateLockdownRequest,
  CreateLockdownResponse,
  CreateLockdownError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateLockdownRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const UpdateLockdownResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    configurations: Schema.Unknown,
    createdOn: Schema.String,
    description: Schema.String,
    modifiedOn: Schema.String,
    paused: Schema.Boolean,
    urls: Schema.Array(Schema.String),
  },
).pipe(
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

export type UpdateLockdownError = DefaultErrors;

export const updateLockdown: API.OperationMethod<
  UpdateLockdownRequest,
  UpdateLockdownResponse,
  UpdateLockdownError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLockdownRequest,
  output: UpdateLockdownResponse,
  errors: [],
}));

export interface DeleteLockdownRequest {
  lockDownsId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteLockdownRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const DeleteLockdownResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
) as unknown as Schema.Schema<DeleteLockdownResponse>;

export type DeleteLockdownError = DefaultErrors;

export const deleteLockdown: API.OperationMethod<
  DeleteLockdownRequest,
  DeleteLockdownResponse,
  DeleteLockdownError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLockdownRequest,
  output: DeleteLockdownResponse,
  errors: [],
}));

// =============================================================================
// PutRule
// =============================================================================

export interface BulkPutRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const BulkPutRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkPutRulesRequest>;

export type BulkPutRulesResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const BulkPutRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<BulkPutRulesResponse>;

export type BulkPutRulesError = DefaultErrors;

export const bulkPutRules: API.OperationMethod<
  BulkPutRulesRequest,
  BulkPutRulesResponse,
  BulkPutRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPutRulesRequest,
  output: BulkPutRulesResponse,
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

export const GetRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules/{ruleId}" }),
) as unknown as Schema.Schema<GetRuleRequest>;

export interface GetRuleResponse {
  /** The unique identifier of the firewall rule. */
  id?: string | null;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  /** An informative summary of the firewall rule. */
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean | null;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string | null;
}

export const GetRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  action: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filter: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  products: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<GetRuleResponse>;

export type GetRuleError = DefaultErrors;

export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String).pipe(T.HttpQuery("id")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const ListRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListRulesResponse>;

export type ListRulesError = DefaultErrors;

export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export type CreateRuleResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const CreateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<CreateRuleResponse>;

export type CreateRuleError = DefaultErrors;

export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [],
}));

export interface UpdateRuleRequest {
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

export const UpdateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
) as unknown as Schema.Schema<UpdateRuleRequest>;

export interface UpdateRuleResponse {
  /** The unique identifier of the firewall rule. */
  id?: string | null;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  /** An informative summary of the firewall rule. */
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean | null;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string | null;
}

export const UpdateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  action: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filter: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  products: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<UpdateRuleResponse>;

export type UpdateRuleError = DefaultErrors;

export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [],
}));

export interface PatchRuleRequest {
  ruleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const PatchRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/rules/{ruleId}" }),
) as unknown as Schema.Schema<PatchRuleRequest>;

export type PatchRuleResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const PatchRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<PatchRuleResponse>;

export type PatchRuleError = DefaultErrors;

export const patchRule: API.OperationMethod<
  PatchRuleRequest,
  PatchRuleResponse,
  PatchRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchRuleRequest,
  output: PatchRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  ruleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The action to apply to a matched request. The `log` action is only available on an Enterprise plan. */
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  /** An informative summary of the firewall rule. */
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  /** When true, indicates that the firewall rule is currently paused. */
  paused?: boolean | null;
  /** The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules  */
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  /** A short reference tag. Allows you to select related firewall rules. */
  ref?: string | null;
}

export const DeleteRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  action: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
        "allow",
        "log",
        "bypass",
      ]),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  filter: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.String,
          deleted: Schema.Boolean,
        }),
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  products: Schema.optional(
    Schema.Union([
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
      Schema.Null,
    ]),
  ),
  ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<DeleteRuleResponse>;

export type DeleteRuleError = DefaultErrors;

export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [],
}));

export interface BulkPatchRulesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const BulkPatchRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkPatchRulesRequest>;

export type BulkPatchRulesResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const BulkPatchRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<BulkPatchRulesResponse>;

export type BulkPatchRulesError = DefaultErrors;

export const bulkPatchRules: API.OperationMethod<
  BulkPatchRulesRequest,
  BulkPatchRulesResponse,
  BulkPatchRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkPatchRulesRequest,
  output: BulkPatchRulesResponse,
  errors: [],
}));

export interface BulkDeleteRulesRequest {
  /** Defines an identifier. */
  zoneId: string;
}

export const BulkDeleteRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  },
).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/firewall/rules" }),
) as unknown as Schema.Schema<BulkDeleteRulesRequest>;

export type BulkDeleteRulesResponse = {
  id?: string | null;
  action?:
    | "block"
    | "challenge"
    | "js_challenge"
    | "managed_challenge"
    | "allow"
    | "log"
    | "bypass"
    | null;
  description?: string | null;
  filter?: unknown | { id: string; deleted: boolean } | null;
  paused?: boolean | null;
  priority?: number | null;
  products?:
    | (
        | "zoneLockdown"
        | "uaBlock"
        | "bic"
        | "hot"
        | "securityLevel"
        | "rateLimit"
        | "waf"
      )[]
    | null;
  ref?: string | null;
}[];

export const BulkDeleteRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    action: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
          "allow",
          "log",
          "bypass",
        ]),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    filter: Schema.optional(
      Schema.Union([
        Schema.Union([
          Schema.Unknown,
          Schema.Struct({
            id: Schema.String,
            deleted: Schema.Boolean,
          }),
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    products: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
    ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }),
) as unknown as Schema.Schema<BulkDeleteRulesResponse>;

export type BulkDeleteRulesError = DefaultErrors;

export const bulkDeleteRules: API.OperationMethod<
  BulkDeleteRulesRequest,
  BulkDeleteRulesResponse,
  BulkDeleteRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BulkDeleteRulesRequest,
  output: BulkDeleteRulesResponse,
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

export const GetUaRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The configuration object for the current rule. */
  configuration?: { target?: string | null; value?: string | null } | null;
  /** An informative summary of the rule. */
  description?: string | null;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge" | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
}

export const GetUaRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  configuration: Schema.optional(
    Schema.Union([
      Schema.Struct({
        target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  mode: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<GetUaRuleResponse>;

export type GetUaRuleError = DefaultErrors;

export const getUaRule: API.OperationMethod<
  GetUaRuleRequest,
  GetUaRuleResponse,
  GetUaRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListUaRulesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String).pipe(T.HttpQuery("description")),
  paused: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("paused")),
  userAgent: Schema.optional(Schema.String).pipe(T.HttpQuery("user_agent")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/ua_rules" }),
) as unknown as Schema.Schema<ListUaRulesRequest>;

export type ListUaRulesResponse = {
  id?: string | null;
  configuration?: { target?: string | null; value?: string | null } | null;
  description?: string | null;
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge" | null;
  paused?: boolean | null;
}[];

export const ListUaRulesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    configuration: Schema.optional(
      Schema.Union([
        Schema.Struct({
          target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    mode: Schema.optional(
      Schema.Union([
        Schema.Literals([
          "block",
          "challenge",
          "js_challenge",
          "managed_challenge",
        ]),
        Schema.Null,
      ]),
    ),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  }),
) as unknown as Schema.Schema<ListUaRulesResponse>;

export type ListUaRulesError = DefaultErrors;

export const listUaRules: API.OperationMethod<
  ListUaRulesRequest,
  ListUaRulesResponse,
  ListUaRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateUaRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The configuration object for the current rule. */
  configuration?: { target?: string | null; value?: string | null } | null;
  /** An informative summary of the rule. */
  description?: string | null;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge" | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
}

export const CreateUaRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  configuration: Schema.optional(
    Schema.Union([
      Schema.Struct({
        target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  mode: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<CreateUaRuleResponse>;

export type CreateUaRuleError = DefaultErrors;

export const createUaRule: API.OperationMethod<
  CreateUaRuleRequest,
  CreateUaRuleResponse,
  CreateUaRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateUaRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The configuration object for the current rule. */
  configuration?: { target?: string | null; value?: string | null } | null;
  /** An informative summary of the rule. */
  description?: string | null;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge" | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
}

export const UpdateUaRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  configuration: Schema.optional(
    Schema.Union([
      Schema.Struct({
        target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  mode: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<UpdateUaRuleResponse>;

export type UpdateUaRuleError = DefaultErrors;

export const updateUaRule: API.OperationMethod<
  UpdateUaRuleRequest,
  UpdateUaRuleResponse,
  UpdateUaRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUaRuleRequest,
  output: UpdateUaRuleResponse,
  errors: [],
}));

export interface DeleteUaRuleRequest {
  uaRuleId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteUaRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** The configuration object for the current rule. */
  configuration?: { target?: string | null; value?: string | null } | null;
  /** An informative summary of the rule. */
  description?: string | null;
  /** The action to apply to a matched request. */
  mode?: "block" | "challenge" | "js_challenge" | "managed_challenge" | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
}

export const DeleteUaRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  configuration: Schema.optional(
    Schema.Union([
      Schema.Struct({
        target: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  mode: Schema.optional(
    Schema.Union([
      Schema.Literals([
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge",
      ]),
      Schema.Null,
    ]),
  ),
  paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
}) as unknown as Schema.Schema<DeleteUaRuleResponse>;

export type DeleteUaRuleError = DefaultErrors;

export const deleteUaRule: API.OperationMethod<
  DeleteUaRuleRequest,
  DeleteUaRuleResponse,
  DeleteUaRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetWafOverrideRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown> | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number | null;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    challenge?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
    default?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    disable?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    simulate?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
  } | null;
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown | null;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[] | null;
}

export const GetWafOverrideResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    groups: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    rewriteAction: Schema.optional(
      Schema.Union([
        Schema.Struct({
          block: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          challenge: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          default: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          disable: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          simulate: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    rules: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    urls: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
  },
).pipe(
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

export type GetWafOverrideError = DefaultErrors;

export const getWafOverride: API.OperationMethod<
  GetWafOverrideRequest,
  GetWafOverrideResponse,
  GetWafOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWafOverrideRequest,
  output: GetWafOverrideResponse,
  errors: [],
}));

export interface ListWafOverridesRequest {
  /** Path param: Defines an identifier. */
  zoneId: string;
}

export const ListWafOverridesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  }).pipe(
    T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/overrides" }),
  ) as unknown as Schema.Schema<ListWafOverridesRequest>;

export type ListWafOverridesResponse = {
  id?: string | null;
  description?: string | null;
  groups?: Record<string, unknown> | null;
  paused?: boolean | null;
  priority?: number | null;
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    challenge?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
    default?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    disable?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    simulate?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
  } | null;
  rules?: unknown | null;
  urls?: string[] | null;
}[];

export const ListWafOverridesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      groups: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
      paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
      rewriteAction: Schema.optional(
        Schema.Union([
          Schema.Struct({
            block: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "challenge",
                  "block",
                  "simulate",
                  "disable",
                  "default",
                ]),
                Schema.Null,
              ]),
            ),
            challenge: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "challenge",
                  "block",
                  "simulate",
                  "disable",
                  "default",
                ]),
                Schema.Null,
              ]),
            ),
            default: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "challenge",
                  "block",
                  "simulate",
                  "disable",
                  "default",
                ]),
                Schema.Null,
              ]),
            ),
            disable: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "challenge",
                  "block",
                  "simulate",
                  "disable",
                  "default",
                ]),
                Schema.Null,
              ]),
            ),
            simulate: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "challenge",
                  "block",
                  "simulate",
                  "disable",
                  "default",
                ]),
                Schema.Null,
              ]),
            ),
          }),
          Schema.Null,
        ]),
      ),
      rules: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
      urls: Schema.optional(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
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

export type ListWafOverridesError = DefaultErrors;

export const listWafOverrides: API.OperationMethod<
  ListWafOverridesRequest,
  ListWafOverridesResponse,
  ListWafOverridesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateWafOverrideRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    urls: Schema.Array(Schema.String),
  }).pipe(
    T.Http({ method: "POST", path: "/zones/{zone_id}/firewall/waf/overrides" }),
  ) as unknown as Schema.Schema<CreateWafOverrideRequest>;

export interface CreateWafOverrideResponse {
  /** The unique identifier of the WAF override. */
  id?: string | null;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown> | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number | null;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    challenge?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
    default?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    disable?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    simulate?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
  } | null;
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown | null;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[] | null;
}

export const CreateWafOverrideResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    groups: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    rewriteAction: Schema.optional(
      Schema.Union([
        Schema.Struct({
          block: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          challenge: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          default: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          disable: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          simulate: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    rules: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    urls: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
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

export type CreateWafOverrideError = DefaultErrors;

export const createWafOverride: API.OperationMethod<
  CreateWafOverrideRequest,
  CreateWafOverrideResponse,
  CreateWafOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateWafOverrideRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    overridesId: Schema.String.pipe(T.HttpPath("overridesId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    id: Schema.String,
    rewriteAction: Schema.Struct({
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
  id?: string | null;
  /** An informative summary of the current URI-based WAF override. */
  description?: string | null;
  /** An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usua */
  groups?: Record<string, unknown> | null;
  /** When true, indicates that the rule is currently paused. */
  paused?: boolean | null;
  /** The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by  */
  priority?: number | null;
  /** Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object. */
  rewriteAction?: {
    block?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    challenge?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
    default?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    disable?: "challenge" | "block" | "simulate" | "disable" | "default" | null;
    simulate?:
      | "challenge"
      | "block"
      | "simulate"
      | "disable"
      | "default"
      | null;
  } | null;
  /** An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule */
  rules?: unknown | null;
  /** The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns. */
  urls?: string[] | null;
}

export const UpdateWafOverrideResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    groups: Schema.optional(Schema.Union([Schema.Struct({}), Schema.Null])),
    paused: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
    priority: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    rewriteAction: Schema.optional(
      Schema.Union([
        Schema.Struct({
          block: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          challenge: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          default: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          disable: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
          simulate: Schema.optional(
            Schema.Union([
              Schema.Literals([
                "challenge",
                "block",
                "simulate",
                "disable",
                "default",
              ]),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
    rules: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    urls: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
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

export type UpdateWafOverrideError = DefaultErrors;

export const updateWafOverride: API.OperationMethod<
  UpdateWafOverrideRequest,
  UpdateWafOverrideResponse,
  UpdateWafOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWafOverrideRequest,
  output: UpdateWafOverrideResponse,
  errors: [],
}));

export interface DeleteWafOverrideRequest {
  overridesId: string;
  /** Defines an identifier. */
  zoneId: string;
}

export const DeleteWafOverrideRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  id?: string | null;
}

export const DeleteWafOverrideResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<DeleteWafOverrideResponse>;

export type DeleteWafOverrideError = DefaultErrors;

export const deleteWafOverride: API.OperationMethod<
  DeleteWafOverrideRequest,
  DeleteWafOverrideResponse,
  DeleteWafOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetWafPackageRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  | { result?: unknown | null };

export const GetWafPackageResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
  Schema.Struct({
    errors: Schema.Array(Schema.Unknown),
    messages: Schema.Array(Schema.Unknown),
    result: Schema.Union([Schema.String, Schema.Null]),
    success: Schema.Literal(true),
  }),
  Schema.Struct({
    result: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  }),
]) as unknown as Schema.Schema<GetWafPackageResponse>;

export type GetWafPackageError = DefaultErrors;

export const getWafPackage: API.OperationMethod<
  GetWafPackageRequest,
  GetWafPackageResponse,
  GetWafPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListWafPackagesRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
      T.HttpQuery("direction"),
    ),
    match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
      T.HttpQuery("match"),
    ),
    name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
    order: Schema.optional(Schema.Literal("name")).pipe(T.HttpQuery("order")),
  },
).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/firewall/waf/packages" }),
) as unknown as Schema.Schema<ListWafPackagesRequest>;

export type ListWafPackagesResponse = unknown[];

export const ListWafPackagesResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Unknown,
) as unknown as Schema.Schema<ListWafPackagesResponse>;

export type ListWafPackagesError = DefaultErrors;

export const listWafPackages: API.OperationMethod<
  ListWafPackagesRequest,
  ListWafPackagesResponse,
  ListWafPackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetWafPackageGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetWafPackageGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
    Schema.String,
    Schema.Null,
  ]) as unknown as Schema.Schema<GetWafPackageGroupResponse>;

export type GetWafPackageGroupError = DefaultErrors;

export const getWafPackageGroup: API.OperationMethod<
  GetWafPackageGroupRequest,
  GetWafPackageGroupResponse,
  GetWafPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListWafPackageGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  allowedModes?: ("on" | "off")[] | null;
  modifiedRulesCount?: number | null;
  packageId?: string | null;
}[];

export const ListWafPackageGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.String,
      description: Schema.Union([Schema.String, Schema.Null]),
      mode: Schema.Literals(["on", "off"]),
      name: Schema.String,
      rulesCount: Schema.Number,
      allowedModes: Schema.optional(
        Schema.Union([
          Schema.Array(Schema.Literals(["on", "off"])),
          Schema.Null,
        ]),
      ),
      modifiedRulesCount: Schema.optional(
        Schema.Union([Schema.Number, Schema.Null]),
      ),
      packageId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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

export type ListWafPackageGroupsError = DefaultErrors;

export const listWafPackageGroups: API.OperationMethod<
  ListWafPackageGroupsRequest,
  ListWafPackageGroupsResponse,
  ListWafPackageGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchWafPackageGroupRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PatchWafPackageGroupResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
    Schema.String,
    Schema.Null,
  ]) as unknown as Schema.Schema<PatchWafPackageGroupResponse>;

export type PatchWafPackageGroupError = DefaultErrors;

export const patchWafPackageGroup: API.OperationMethod<
  PatchWafPackageGroupRequest,
  PatchWafPackageGroupResponse,
  PatchWafPackageGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetWafPackageRuleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetWafPackageRuleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
    Schema.String,
    Schema.Null,
  ]) as unknown as Schema.Schema<GetWafPackageRuleResponse>;

export type GetWafPackageRuleError = DefaultErrors;

export const getWafPackageRule: API.OperationMethod<
  GetWafPackageRuleRequest,
  GetWafPackageRuleResponse,
  GetWafPackageRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListWafPackageRulesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    packageId: Schema.String.pipe(T.HttpPath("packageId")),
    zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
    description: Schema.optional(Schema.String).pipe(
      T.HttpQuery("description"),
    ),
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

export const ListWafPackageRulesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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

export type ListWafPackageRulesError = DefaultErrors;

export const listWafPackageRules: API.OperationMethod<
  ListWafPackageRulesRequest,
  ListWafPackageRulesResponse,
  ListWafPackageRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchWafPackageRuleRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const PatchWafPackageRuleResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Union([
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
  ]) as unknown as Schema.Schema<PatchWafPackageRuleResponse>;

export type PatchWafPackageRuleError = DefaultErrors;

export const patchWafPackageRule: API.OperationMethod<
  PatchWafPackageRuleRequest,
  PatchWafPackageRuleResponse,
  PatchWafPackageRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchWafPackageRuleRequest,
  output: PatchWafPackageRuleResponse,
  errors: [],
}));
