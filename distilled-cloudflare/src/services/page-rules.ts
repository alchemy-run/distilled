/**
 * Cloudflare PAGE-RULES API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service page-rules
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
// PageRule
// =============================================================================

export interface GetPageRuleRequest {
  pageruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const GetPageRuleRequest = Schema.Struct({
  pageruleId: Schema.String.pipe(T.HttpPath("pageruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/pagerules/{pageruleId}" }),
) as unknown as Schema.Schema<GetPageRuleRequest>;

export interface GetPageRuleResponse {
  /** Identifier. */
  id: string;
  /** The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** The timestamp of when the Page Rule was created. */
  createdOn: string;
  /** The timestamp of when the Page Rule was last modified. */
  modifiedOn: string;
  /** The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/images/ `) bu */
  priority: number;
  /** The status of the Page Rule. */
  status: "active" | "disabled";
  /** The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}

export const GetPageRuleResponse = Schema.Struct({
  id: Schema.String,
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  priority: Schema.Number,
  status: Schema.Literals(["active", "disabled"]),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    actions: "actions",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    priority: "priority",
    status: "status",
    targets: "targets",
  }),
) as unknown as Schema.Schema<GetPageRuleResponse>;

export const getPageRule: API.OperationMethod<
  GetPageRuleRequest,
  GetPageRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPageRuleRequest,
  output: GetPageRuleResponse,
  errors: [],
}));

export interface ListPageRulesRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: The direction used to sort returned Page Rules. */
  direction?: "asc" | "desc";
  /** Query param: When set to `all`, all the search requirements must match. When set to `any`, only one of the search requirements has to match. */
  match?: "any" | "all";
  /** Query param: The field used to sort returned Page Rules. */
  order?: "status" | "priority";
  /** Query param: The status of the Page Rule. */
  status?: "active" | "disabled";
}

export const ListPageRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  match: Schema.optional(Schema.Literals(["any", "all"])).pipe(
    T.HttpQuery("match"),
  ),
  order: Schema.optional(Schema.Literals(["status", "priority"])).pipe(
    T.HttpQuery("order"),
  ),
  status: Schema.optional(Schema.Literals(["active", "disabled"])).pipe(
    T.HttpQuery("status"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/pagerules" }),
) as unknown as Schema.Schema<ListPageRulesRequest>;

export type ListPageRulesResponse = {
  id: string;
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  createdOn: string;
  modifiedOn: string;
  priority: number;
  status: "active" | "disabled";
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}[];

export const ListPageRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    actions: Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_by_device_type")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_deception_armor")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_key_fields")),
          value: Schema.optional(
            Schema.Struct({
              cookie: Schema.optional(
                Schema.Struct({
                  checkPresence: Schema.optional(Schema.Array(Schema.String)),
                  include: Schema.optional(Schema.Array(Schema.String)),
                }).pipe(
                  Schema.encodeKeys({
                    checkPresence: "check_presence",
                    include: "include",
                  }),
                ),
              ),
              header: Schema.optional(
                Schema.Struct({
                  checkPresence: Schema.optional(Schema.Array(Schema.String)),
                  exclude: Schema.optional(Schema.Array(Schema.String)),
                  include: Schema.optional(Schema.Array(Schema.String)),
                }).pipe(
                  Schema.encodeKeys({
                    checkPresence: "check_presence",
                    exclude: "exclude",
                    include: "include",
                  }),
                ),
              ),
              host: Schema.optional(
                Schema.Struct({
                  resolved: Schema.optional(Schema.Boolean),
                }),
              ),
              queryString: Schema.optional(
                Schema.Struct({
                  exclude: Schema.optional(
                    Schema.Union([
                      Schema.Literal("*"),
                      Schema.Array(Schema.String),
                    ]),
                  ),
                  include: Schema.optional(
                    Schema.Union([
                      Schema.Literal("*"),
                      Schema.Array(Schema.String),
                    ]),
                  ),
                }),
              ),
              user: Schema.optional(
                Schema.Struct({
                  deviceType: Schema.optional(Schema.Boolean),
                  geo: Schema.optional(Schema.Boolean),
                  lang: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    deviceType: "device_type",
                    geo: "geo",
                    lang: "lang",
                  }),
                ),
              ),
            }).pipe(
              Schema.encodeKeys({
                cookie: "cookie",
                header: "header",
                host: "host",
                queryString: "query_string",
                user: "user",
              }),
            ),
          ),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_on_cookie")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
          value: Schema.optional(Schema.Struct({})),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_apps")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_performance")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_security")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_zaraz")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("edge_cache_ttl")),
          value: Schema.optional(Schema.Number),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("explicit_cache_control")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("forwarding_url")),
          value: Schema.optional(
            Schema.Struct({
              statusCode: Schema.optional(Schema.Literals(["301", "302"])),
              url: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({ statusCode: "status_code", url: "url" }),
            ),
          ),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("host_header_override")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("resolve_override")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("respect_strong_etag")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
      ]),
    ),
    createdOn: Schema.String,
    modifiedOn: Schema.String,
    priority: Schema.Number,
    status: Schema.Literals(["active", "disabled"]),
    targets: Schema.Array(
      Schema.Struct({
        constraint: Schema.optional(
          Schema.Struct({
            operator: Schema.Literals([
              "matches",
              "contains",
              "equals",
              "not_equal",
              "not_contain",
            ]),
            value: Schema.String,
          }),
        ),
        target: Schema.optional(Schema.Literal("url")),
      }),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      actions: "actions",
      createdOn: "created_on",
      modifiedOn: "modified_on",
      priority: "priority",
      status: "status",
      targets: "targets",
    }),
  ),
) as unknown as Schema.Schema<ListPageRulesResponse>;

export const listPageRules: API.OperationMethod<
  ListPageRulesRequest,
  ListPageRulesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPageRulesRequest,
  output: ListPageRulesResponse,
  errors: [],
}));

export interface CreatePageRuleRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** Body param: The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
  /** Body param: The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/i */
  priority?: number;
  /** Body param: The status of the Page Rule. */
  status?: "active" | "disabled";
}

export const CreatePageRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
  priority: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Literals(["active", "disabled"])),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/pagerules" }),
) as unknown as Schema.Schema<CreatePageRuleRequest>;

export interface CreatePageRuleResponse {
  /** Identifier. */
  id: string;
  /** The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** The timestamp of when the Page Rule was created. */
  createdOn: string;
  /** The timestamp of when the Page Rule was last modified. */
  modifiedOn: string;
  /** The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/images/ `) bu */
  priority: number;
  /** The status of the Page Rule. */
  status: "active" | "disabled";
  /** The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}

export const CreatePageRuleResponse = Schema.Struct({
  id: Schema.String,
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  priority: Schema.Number,
  status: Schema.Literals(["active", "disabled"]),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    actions: "actions",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    priority: "priority",
    status: "status",
    targets: "targets",
  }),
) as unknown as Schema.Schema<CreatePageRuleResponse>;

export const createPageRule: API.OperationMethod<
  CreatePageRuleRequest,
  CreatePageRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePageRuleRequest,
  output: CreatePageRuleResponse,
  errors: [],
}));

export interface UpdatePageRuleRequest {
  pageruleId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** Body param: The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
  /** Body param: The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/i */
  priority?: number;
  /** Body param: The status of the Page Rule. */
  status?: "active" | "disabled";
}

export const UpdatePageRuleRequest = Schema.Struct({
  pageruleId: Schema.String.pipe(T.HttpPath("pageruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
  priority: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Literals(["active", "disabled"])),
}).pipe(
  T.Http({ method: "PUT", path: "/zones/{zone_id}/pagerules/{pageruleId}" }),
) as unknown as Schema.Schema<UpdatePageRuleRequest>;

export interface UpdatePageRuleResponse {
  /** Identifier. */
  id: string;
  /** The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** The timestamp of when the Page Rule was created. */
  createdOn: string;
  /** The timestamp of when the Page Rule was last modified. */
  modifiedOn: string;
  /** The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/images/ `) bu */
  priority: number;
  /** The status of the Page Rule. */
  status: "active" | "disabled";
  /** The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}

export const UpdatePageRuleResponse = Schema.Struct({
  id: Schema.String,
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  priority: Schema.Number,
  status: Schema.Literals(["active", "disabled"]),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    actions: "actions",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    priority: "priority",
    status: "status",
    targets: "targets",
  }),
) as unknown as Schema.Schema<UpdatePageRuleResponse>;

export const updatePageRule: API.OperationMethod<
  UpdatePageRuleRequest,
  UpdatePageRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdatePageRuleRequest,
  output: UpdatePageRuleResponse,
  errors: [],
}));

export interface PatchPageRuleRequest {
  pageruleId: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions?: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** Body param: The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/i */
  priority?: number;
  /** Body param: The status of the Page Rule. */
  status?: "active" | "disabled";
  /** Body param: The rule targets to evaluate on each request. */
  targets?: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}

export const PatchPageRuleRequest = Schema.Struct({
  pageruleId: Schema.String.pipe(T.HttpPath("pageruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_by_device_type")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_deception_armor")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_key_fields")),
          value: Schema.optional(
            Schema.Struct({
              cookie: Schema.optional(
                Schema.Struct({
                  checkPresence: Schema.optional(Schema.Array(Schema.String)),
                  include: Schema.optional(Schema.Array(Schema.String)),
                }).pipe(
                  Schema.encodeKeys({
                    checkPresence: "check_presence",
                    include: "include",
                  }),
                ),
              ),
              header: Schema.optional(
                Schema.Struct({
                  checkPresence: Schema.optional(Schema.Array(Schema.String)),
                  exclude: Schema.optional(Schema.Array(Schema.String)),
                  include: Schema.optional(Schema.Array(Schema.String)),
                }).pipe(
                  Schema.encodeKeys({
                    checkPresence: "check_presence",
                    exclude: "exclude",
                    include: "include",
                  }),
                ),
              ),
              host: Schema.optional(
                Schema.Struct({
                  resolved: Schema.optional(Schema.Boolean),
                }),
              ),
              queryString: Schema.optional(
                Schema.Struct({
                  exclude: Schema.optional(
                    Schema.Union([
                      Schema.Literal("*"),
                      Schema.Array(Schema.String),
                    ]),
                  ),
                  include: Schema.optional(
                    Schema.Union([
                      Schema.Literal("*"),
                      Schema.Array(Schema.String),
                    ]),
                  ),
                }),
              ),
              user: Schema.optional(
                Schema.Struct({
                  deviceType: Schema.optional(Schema.Boolean),
                  geo: Schema.optional(Schema.Boolean),
                  lang: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    deviceType: "device_type",
                    geo: "geo",
                    lang: "lang",
                  }),
                ),
              ),
            }).pipe(
              Schema.encodeKeys({
                cookie: "cookie",
                header: "header",
                host: "host",
                queryString: "query_string",
                user: "user",
              }),
            ),
          ),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_on_cookie")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
          value: Schema.optional(Schema.Struct({})),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_apps")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_performance")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_security")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("disable_zaraz")),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("edge_cache_ttl")),
          value: Schema.optional(Schema.Number),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("explicit_cache_control")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("forwarding_url")),
          value: Schema.optional(
            Schema.Struct({
              statusCode: Schema.optional(Schema.Literals(["301", "302"])),
              url: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({ statusCode: "status_code", url: "url" }),
            ),
          ),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("host_header_override")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("resolve_override")),
          value: Schema.optional(Schema.String),
        }),
        Schema.Struct({
          id: Schema.optional(Schema.Literal("respect_strong_etag")),
          value: Schema.optional(Schema.Literals(["on", "off"])),
        }),
      ]),
    ),
  ),
  priority: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.Literals(["active", "disabled"])),
  targets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        constraint: Schema.optional(
          Schema.Struct({
            operator: Schema.Literals([
              "matches",
              "contains",
              "equals",
              "not_equal",
              "not_contain",
            ]),
            value: Schema.String,
          }),
        ),
        target: Schema.optional(Schema.Literal("url")),
      }),
    ),
  ),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/pagerules/{pageruleId}" }),
) as unknown as Schema.Schema<PatchPageRuleRequest>;

export interface PatchPageRuleResponse {
  /** Identifier. */
  id: string;
  /** The set of actions to perform if the targets of this rule match the request. Actions can redirect to another URL or override settings, but not both. */
  actions: (
    | unknown
    | { id?: "bypass_cache_on_cookie"; value?: string }
    | { id?: "cache_by_device_type"; value?: "on" | "off" }
    | { id?: "cache_deception_armor"; value?: "on" | "off" }
    | {
        id?: "cache_key_fields";
        value?: {
          cookie?: { checkPresence?: string[]; include?: string[] };
          header?: {
            checkPresence?: string[];
            exclude?: string[];
            include?: string[];
          };
          host?: { resolved?: boolean };
          queryString?: { exclude?: "*" | string[]; include?: "*" | string[] };
          user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
        };
      }
    | { id?: "cache_on_cookie"; value?: string }
    | { id?: "cache_ttl_by_status"; value?: Record<string, unknown> }
    | { id?: "disable_apps" }
    | { id?: "disable_performance" }
    | { id?: "disable_security" }
    | { id?: "disable_zaraz" }
    | { id?: "edge_cache_ttl"; value?: number }
    | { id?: "explicit_cache_control"; value?: "on" | "off" }
    | {
        id?: "forwarding_url";
        value?: { statusCode?: "301" | "302"; url?: string };
      }
    | { id?: "host_header_override"; value?: string }
    | { id?: "resolve_override"; value?: string }
    | { id?: "respect_strong_etag"; value?: "on" | "off" }
  )[];
  /** The timestamp of when the Page Rule was created. */
  createdOn: string;
  /** The timestamp of when the Page Rule was last modified. */
  modifiedOn: string;
  /** The priority of the rule, used to define which Page Rule is processed over another. A higher number indicates a higher priority. For example, if you have a catch-all Page Rule (rule A: `/images/ `) bu */
  priority: number;
  /** The status of the Page Rule. */
  status: "active" | "disabled";
  /** The rule targets to evaluate on each request. */
  targets: {
    constraint?: {
      operator: "matches" | "contains" | "equals" | "not_equal" | "not_contain";
      value: string;
    };
    target?: "url";
  }[];
}

export const PatchPageRuleResponse = Schema.Struct({
  id: Schema.String,
  actions: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        id: Schema.optional(Schema.Literal("bypass_cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_by_device_type")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_deception_armor")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_key_fields")),
        value: Schema.optional(
          Schema.Struct({
            cookie: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  include: "include",
                }),
              ),
            ),
            header: Schema.optional(
              Schema.Struct({
                checkPresence: Schema.optional(Schema.Array(Schema.String)),
                exclude: Schema.optional(Schema.Array(Schema.String)),
                include: Schema.optional(Schema.Array(Schema.String)),
              }).pipe(
                Schema.encodeKeys({
                  checkPresence: "check_presence",
                  exclude: "exclude",
                  include: "include",
                }),
              ),
            ),
            host: Schema.optional(
              Schema.Struct({
                resolved: Schema.optional(Schema.Boolean),
              }),
            ),
            queryString: Schema.optional(
              Schema.Struct({
                exclude: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
                include: Schema.optional(
                  Schema.Union([
                    Schema.Literal("*"),
                    Schema.Array(Schema.String),
                  ]),
                ),
              }),
            ),
            user: Schema.optional(
              Schema.Struct({
                deviceType: Schema.optional(Schema.Boolean),
                geo: Schema.optional(Schema.Boolean),
                lang: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  deviceType: "device_type",
                  geo: "geo",
                  lang: "lang",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              cookie: "cookie",
              header: "header",
              host: "host",
              queryString: "query_string",
              user: "user",
            }),
          ),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_on_cookie")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("cache_ttl_by_status")),
        value: Schema.optional(Schema.Struct({})),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_apps")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_performance")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_security")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("disable_zaraz")),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("edge_cache_ttl")),
        value: Schema.optional(Schema.Number),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("explicit_cache_control")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("forwarding_url")),
        value: Schema.optional(
          Schema.Struct({
            statusCode: Schema.optional(Schema.Literals(["301", "302"])),
            url: Schema.optional(Schema.String),
          }).pipe(Schema.encodeKeys({ statusCode: "status_code", url: "url" })),
        ),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("host_header_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("resolve_override")),
        value: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        id: Schema.optional(Schema.Literal("respect_strong_etag")),
        value: Schema.optional(Schema.Literals(["on", "off"])),
      }),
    ]),
  ),
  createdOn: Schema.String,
  modifiedOn: Schema.String,
  priority: Schema.Number,
  status: Schema.Literals(["active", "disabled"]),
  targets: Schema.Array(
    Schema.Struct({
      constraint: Schema.optional(
        Schema.Struct({
          operator: Schema.Literals([
            "matches",
            "contains",
            "equals",
            "not_equal",
            "not_contain",
          ]),
          value: Schema.String,
        }),
      ),
      target: Schema.optional(Schema.Literal("url")),
    }),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    actions: "actions",
    createdOn: "created_on",
    modifiedOn: "modified_on",
    priority: "priority",
    status: "status",
    targets: "targets",
  }),
) as unknown as Schema.Schema<PatchPageRuleResponse>;

export const patchPageRule: API.OperationMethod<
  PatchPageRuleRequest,
  PatchPageRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchPageRuleRequest,
  output: PatchPageRuleResponse,
  errors: [],
}));

export interface DeletePageRuleRequest {
  pageruleId: string;
  /** Identifier. */
  zoneId: string;
}

export const DeletePageRuleRequest = Schema.Struct({
  pageruleId: Schema.String.pipe(T.HttpPath("pageruleId")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/zones/{zone_id}/pagerules/{pageruleId}" }),
) as unknown as Schema.Schema<DeletePageRuleRequest>;

export interface DeletePageRuleResponse {
  /** Identifier. */
  id: string;
}

export const DeletePageRuleResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeletePageRuleResponse>;

export const deletePageRule: API.OperationMethod<
  DeletePageRuleRequest,
  DeletePageRuleResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePageRuleRequest,
  output: DeletePageRuleResponse,
  errors: [],
}));
