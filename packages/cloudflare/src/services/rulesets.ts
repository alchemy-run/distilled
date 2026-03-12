/**
 * Cloudflare RULESETS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service rulesets
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";

// =============================================================================
// Pha
// =============================================================================

export interface GetPhasRequest {}

export const GetPhasRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/phases/{rulesetPhase}/entrypoint",
  }),
) as unknown as Schema.Schema<GetPhasRequest>;

export interface GetPhasResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const GetPhasResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<GetPhasResponse>;

export type GetPhasError = DefaultErrors;

export const getPhas: API.OperationMethod<
  GetPhasRequest,
  GetPhasResponse,
  GetPhasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPhasRequest,
  output: GetPhasResponse,
  errors: [],
}));

export interface PutPhasRequest {
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: An informative description of the ruleset. */
  description?: string;
  /** Body param: The human-readable name of the ruleset. */
  name?: string;
  /** Body param: The list of rules in the ruleset. */
  rules?: (
    | unknown
    | {
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
    | {
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
  )[];
}

export const PutPhasRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  rules: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("js_challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
      ]),
    ),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/phases/{rulesetPhase}/entrypoint",
  }),
) as unknown as Schema.Schema<PutPhasRequest>;

export interface PutPhasResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const PutPhasResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(T.ResponsePath("result")) as unknown as Schema.Schema<PutPhasResponse>;

export type PutPhasError = DefaultErrors;

export const putPhas: API.OperationMethod<
  PutPhasRequest,
  PutPhasResponse,
  PutPhasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutPhasRequest,
  output: PutPhasResponse,
  errors: [],
}));

// =============================================================================
// PhasVersion
// =============================================================================

export interface GetPhasVersionRequest {
  rulesetVersion: string;
}

export const GetPhasVersionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetVersion: Schema.String.pipe(T.HttpPath("rulesetVersion")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/phases/{rulesetPhase}/entrypoint/versions/{rulesetVersion}",
  }),
) as unknown as Schema.Schema<GetPhasVersionRequest>;

export interface GetPhasVersionResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const GetPhasVersionResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.String,
    kind: Schema.Literals(["zone", "managed", "custom", "root"]),
    lastUpdated: Schema.String,
    name: Schema.String,
    phase: Schema.Literals([
      "ddos_l4",
      "ddos_l7",
      "http_config_settings",
      "http_custom_errors",
      "http_log_custom_fields",
      "http_ratelimit",
      "http_request_cache_settings",
      "http_request_dynamic_redirect",
      "http_request_firewall_custom",
      "http_request_firewall_managed",
      "http_request_late_transform",
      "http_request_origin",
      "http_request_redirect",
      "http_request_sanitize",
      "http_request_sbfm",
      "http_request_transform",
      "http_response_compression",
      "http_response_firewall_managed",
      "http_response_headers_transform",
      "magic_transit",
      "magic_transit_ids_managed",
      "magic_transit_managed",
      "magic_transit_ratelimit",
    ]),
    rules: Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          lastUpdated: Schema.String,
          version: Schema.String,
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          action: Schema.optional(
            Schema.Union([Schema.Literal("challenge"), Schema.Null]),
          ),
          actionParameters: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          categories: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          exposedCredentialCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                passwordExpression: SensitiveString,
                usernameExpression: Schema.String,
              }).pipe(
                Schema.encodeKeys({
                  passwordExpression: "password_expression",
                  usernameExpression: "username_expression",
                }),
              ),
              Schema.Null,
            ]),
          ),
          expression: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          ratelimit: Schema.optional(
            Schema.Union([
              Schema.Struct({
                characteristics: Schema.Array(Schema.String),
                period: Schema.Number,
                countingExpression: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                mitigationTimeout: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requestsPerPeriod: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requestsToOrigin: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                scorePerPeriod: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                scoreResponseHeaderName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  characteristics: "characteristics",
                  period: "period",
                  countingExpression: "counting_expression",
                  mitigationTimeout: "mitigation_timeout",
                  requestsPerPeriod: "requests_per_period",
                  requestsToOrigin: "requests_to_origin",
                  scorePerPeriod: "score_per_period",
                  scoreResponseHeaderName: "score_response_header_name",
                }),
              ),
              Schema.Null,
            ]),
          ),
          ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            lastUpdated: "last_updated",
            version: "version",
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            categories: "categories",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
        Schema.Struct({
          lastUpdated: Schema.String,
          version: Schema.String,
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          action: Schema.optional(
            Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
          ),
          actionParameters: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          categories: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
          exposedCredentialCheck: Schema.optional(
            Schema.Union([
              Schema.Struct({
                passwordExpression: SensitiveString,
                usernameExpression: Schema.String,
              }).pipe(
                Schema.encodeKeys({
                  passwordExpression: "password_expression",
                  usernameExpression: "username_expression",
                }),
              ),
              Schema.Null,
            ]),
          ),
          expression: Schema.optional(
            Schema.Union([Schema.String, Schema.Null]),
          ),
          logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          ratelimit: Schema.optional(
            Schema.Union([
              Schema.Struct({
                characteristics: Schema.Array(Schema.String),
                period: Schema.Number,
                countingExpression: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
                mitigationTimeout: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requestsPerPeriod: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                requestsToOrigin: Schema.optional(
                  Schema.Union([Schema.Boolean, Schema.Null]),
                ),
                scorePerPeriod: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
                scoreResponseHeaderName: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  characteristics: "characteristics",
                  period: "period",
                  countingExpression: "counting_expression",
                  mitigationTimeout: "mitigation_timeout",
                  requestsPerPeriod: "requests_per_period",
                  requestsToOrigin: "requests_to_origin",
                  scorePerPeriod: "score_per_period",
                  scoreResponseHeaderName: "score_response_header_name",
                }),
              ),
              Schema.Null,
            ]),
          ),
          ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            lastUpdated: "last_updated",
            version: "version",
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            categories: "categories",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
      ]),
    ),
    version: Schema.String,
    description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  },
)
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetPhasVersionResponse>;

export type GetPhasVersionError = DefaultErrors;

export const getPhasVersion: API.OperationMethod<
  GetPhasVersionRequest,
  GetPhasVersionResponse,
  GetPhasVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPhasVersionRequest,
  output: GetPhasVersionResponse,
  errors: [],
}));

export interface ListPhasVersionsRequest {}

export const ListPhasVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/{accountOrZone}/{accountOrZoneId}/rulesets/phases/{rulesetPhase}/entrypoint/versions",
    }),
  ) as unknown as Schema.Schema<ListPhasVersionsRequest>;

export interface ListPhasVersionsResponse {
  result: {
    id: string;
    kind: "zone" | "managed" | "custom" | "root";
    lastUpdated: string;
    name: string;
    phase:
      | "ddos_l4"
      | "ddos_l7"
      | "http_config_settings"
      | "http_custom_errors"
      | "http_log_custom_fields"
      | "http_ratelimit"
      | "http_request_cache_settings"
      | "http_request_dynamic_redirect"
      | "http_request_firewall_custom"
      | "http_request_firewall_managed"
      | "http_request_late_transform"
      | "http_request_origin"
      | "http_request_redirect"
      | "http_request_sanitize"
      | "http_request_sbfm"
      | "http_request_transform"
      | "http_response_compression"
      | "http_response_firewall_managed"
      | "http_response_headers_transform"
      | "magic_transit"
      | "magic_transit_ids_managed"
      | "magic_transit_managed"
      | "magic_transit_ratelimit";
    version: string;
    description?: string | null;
  }[];
}

export const ListPhasVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        kind: Schema.Literals(["zone", "managed", "custom", "root"]),
        lastUpdated: Schema.String,
        name: Schema.String,
        phase: Schema.Literals([
          "ddos_l4",
          "ddos_l7",
          "http_config_settings",
          "http_custom_errors",
          "http_log_custom_fields",
          "http_ratelimit",
          "http_request_cache_settings",
          "http_request_dynamic_redirect",
          "http_request_firewall_custom",
          "http_request_firewall_managed",
          "http_request_late_transform",
          "http_request_origin",
          "http_request_redirect",
          "http_request_sanitize",
          "http_request_sbfm",
          "http_request_transform",
          "http_response_compression",
          "http_response_firewall_managed",
          "http_response_headers_transform",
          "magic_transit",
          "magic_transit_ids_managed",
          "magic_transit_managed",
          "magic_transit_ratelimit",
        ]),
        version: Schema.String,
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          kind: "kind",
          lastUpdated: "last_updated",
          name: "name",
          phase: "phase",
          version: "version",
          description: "description",
        }),
      ),
    ),
  }) as unknown as Schema.Schema<ListPhasVersionsResponse>;

export type ListPhasVersionsError = DefaultErrors;

export const listPhasVersions: API.PaginatedOperationMethod<
  ListPhasVersionsRequest,
  ListPhasVersionsResponse,
  ListPhasVersionsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListPhasVersionsRequest,
  ) => stream.Stream<
    ListPhasVersionsResponse,
    ListPhasVersionsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListPhasVersionsRequest) => stream.Stream<
    {
      id: string;
      kind: "zone" | "managed" | "custom" | "root";
      lastUpdated: string;
      name: string;
      phase:
        | "ddos_l4"
        | "ddos_l7"
        | "http_config_settings"
        | "http_custom_errors"
        | "http_log_custom_fields"
        | "http_ratelimit"
        | "http_request_cache_settings"
        | "http_request_dynamic_redirect"
        | "http_request_firewall_custom"
        | "http_request_firewall_managed"
        | "http_request_late_transform"
        | "http_request_origin"
        | "http_request_redirect"
        | "http_request_sanitize"
        | "http_request_sbfm"
        | "http_request_transform"
        | "http_response_compression"
        | "http_response_firewall_managed"
        | "http_response_headers_transform"
        | "magic_transit"
        | "magic_transit_ids_managed"
        | "magic_transit_managed"
        | "magic_transit_ratelimit";
      version: string;
      description?: string | null;
    },
    ListPhasVersionsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPhasVersionsRequest,
  output: ListPhasVersionsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

// =============================================================================
// Rule
// =============================================================================

export interface CreateRuleRequest {
  rulesetId: string;
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The unique ID of the rule. */
  id?: string;
  /** Body param: The action to perform when the rule matches. */
  action?: "block";
  /** Body param: The parameters configuring the rule's action. */
  actionParameters?: {
    response?: { content: string; contentType: string; statusCode: number };
  };
  /** Body param: An informative description of the rule. */
  description?: string;
  /** Body param: Whether the rule should be executed. */
  enabled?: boolean;
  /** Body param: Configuration for exposed credential checking. */
  exposedCredentialCheck?: {
    passwordExpression: string;
    usernameExpression: string;
  };
  /** Body param: The expression defining which traffic will match the rule. */
  expression?: string;
  /** Body param: An object configuring the rule's logging behavior. */
  logging?: { enabled: boolean };
  /** Body param: An object configuring where the rule will be placed. */
  position?: { before?: string } | { after?: string } | { index?: number };
  /** Body param: An object configuring the rule's rate limit behavior. */
  ratelimit?: {
    characteristics: string[];
    period: number;
    countingExpression?: string;
    mitigationTimeout?: number;
    requestsPerPeriod?: number;
    requestsToOrigin?: boolean;
    scorePerPeriod?: number;
    scoreResponseHeaderName?: string;
  };
  /** Body param: The reference of the rule (the rule's ID by default). */
  ref?: string;
}

export const CreateRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String),
  action: Schema.optional(Schema.Literal("block")),
  actionParameters: Schema.optional(
    Schema.Struct({
      response: Schema.optional(
        Schema.Struct({
          content: Schema.String,
          contentType: Schema.String,
          statusCode: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            content: "content",
            contentType: "content_type",
            statusCode: "status_code",
          }),
        ),
      ),
    }),
  ),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  exposedCredentialCheck: Schema.optional(
    Schema.Struct({
      passwordExpression: SensitiveString,
      usernameExpression: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        passwordExpression: "password_expression",
        usernameExpression: "username_expression",
      }),
    ),
  ),
  expression: Schema.optional(Schema.String),
  logging: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ),
  position: Schema.optional(
    Schema.Union([
      Schema.Struct({
        before: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        after: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        index: Schema.optional(Schema.Number),
      }),
    ]),
  ),
  ratelimit: Schema.optional(
    Schema.Struct({
      characteristics: Schema.Array(Schema.String),
      period: Schema.Number,
      countingExpression: Schema.optional(Schema.String),
      mitigationTimeout: Schema.optional(Schema.Number),
      requestsPerPeriod: Schema.optional(Schema.Number),
      requestsToOrigin: Schema.optional(Schema.Boolean),
      scorePerPeriod: Schema.optional(Schema.Number),
      scoreResponseHeaderName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        characteristics: "characteristics",
        period: "period",
        countingExpression: "counting_expression",
        mitigationTimeout: "mitigation_timeout",
        requestsPerPeriod: "requests_per_period",
        requestsToOrigin: "requests_to_origin",
        scorePerPeriod: "score_per_period",
        scoreResponseHeaderName: "score_response_header_name",
      }),
    ),
  ),
  ref: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    action: "action",
    actionParameters: "action_parameters",
    description: "description",
    enabled: "enabled",
    exposedCredentialCheck: "exposed_credential_check",
    expression: "expression",
    logging: "logging",
    position: "position",
    ratelimit: "ratelimit",
    ref: "ref",
  }),
  T.Http({
    method: "POST",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/rules",
  }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export interface CreateRuleResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "block" | null;
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "compress_response" | null;
        actionParameters?: {
          algorithms: {
            name?:
              | "none"
              | "auto"
              | "default"
              | "gzip"
              | "brotli"
              | "zstd"
              | null;
          }[];
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "ddos_dynamic" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "execute" | null;
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string } | null;
          overrides?: {
            action?: string | null;
            categories?:
              | {
                  category: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            enabled?: boolean | null;
            rules?:
              | {
                  id: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  scoreThreshold?: number | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            sensitivityLevel?: "default" | "medium" | "low" | "eoff" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "force_connection_close" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log_custom_field" | null;
        actionParameters?: {
          cookieFields?: { name: string }[] | null;
          rawResponseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          requestFields?: { name: string }[] | null;
          responseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          transformedRequestFields?: { name: string }[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "managed_challenge" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "redirect" | null;
        actionParameters?: {
          fromList?: { key: string; name: string } | null;
          fromValue?: {
            targetUrl: { expression?: string | null; value?: string | null };
            preserveQueryString?: boolean | null;
            statusCode?: "301" | "302" | "303" | "307" | "308" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "rewrite" | null;
        actionParameters?: {
          headers?: Record<string, unknown> | null;
          uri?:
            | { path: { expression?: string | null; value?: string | null } }
            | { query: { expression?: string | null; value?: string | null } }
            | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "route" | null;
        actionParameters?: {
          hostHeader?: string | null;
          origin?: { host?: string | null; port?: number | null } | null;
          sni?: { value: string } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "score" | null;
        actionParameters?: { increment: number } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "serve_error" | null;
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "set_cache_settings" | null;
        actionParameters?: {
          additionalCacheablePorts?: number[] | null;
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number | null;
          } | null;
          cache?: boolean | null;
          cacheKey?: {
            cacheByDeviceType?: boolean | null;
            cacheDeceptionArmor?: boolean | null;
            customKey?: {
              cookie?: {
                checkPresence?: string[] | null;
                include?: string[] | null;
              } | null;
              header?: {
                checkPresence?: string[] | null;
                contains?: Record<string, unknown> | null;
                excludeOrigin?: boolean | null;
                include?: string[] | null;
              } | null;
              host?: { resolved?: boolean | null } | null;
              queryString?: {
                exclude?: { all?: true | null; list?: string[] | null } | null;
                include?: { all?: true | null; list?: string[] | null } | null;
              } | null;
              user?: {
                deviceType?: boolean | null;
                geo?: boolean | null;
                lang?: boolean | null;
              } | null;
            } | null;
            ignoreQueryStringsOrder?: boolean | null;
          } | null;
          cacheReserve?: {
            eligible: boolean;
            minimumFileSize?: number | null;
          } | null;
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number | null;
            statusCodeTtl?:
              | {
                  value: number;
                  statusCode?: number | null;
                  statusCodeRange?: {
                    from?: number | null;
                    to?: number | null;
                  } | null;
                }[]
              | null;
          } | null;
          originCacheControl?: boolean | null;
          originErrorPagePassthru?: boolean | null;
          readTimeout?: number | null;
          respectStrongEtags?: boolean | null;
          serveStale?: { disableStaleWhileUpdating?: boolean | null } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "set_config" | null;
        actionParameters?: {
          automaticHttpsRewrites?: boolean | null;
          autominify?: {
            css?: boolean | null;
            html?: boolean | null;
            js?: boolean | null;
          } | null;
          bic?: boolean | null;
          disableApps?: true | null;
          disablePayPerCrawl?: true | null;
          disableRum?: true | null;
          disableZaraz?: true | null;
          emailObfuscation?: boolean | null;
          fonts?: boolean | null;
          hotlinkProtection?: boolean | null;
          mirage?: boolean | null;
          opportunisticEncryption?: boolean | null;
          polish?: "off" | "lossless" | "lossy" | "webp" | null;
          requestBodyBuffering?: "none" | "standard" | "full" | null;
          responseBodyBuffering?: "none" | "standard" | null;
          rocketLoader?: boolean | null;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack"
            | null;
          serverSideExcludes?: boolean | null;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull" | null;
          sxg?: boolean | null;
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "skip" | null;
        actionParameters?: {
          phase?: "current" | null;
          phases?:
            | (
                | "ddos_l4"
                | "ddos_l7"
                | "http_config_settings"
                | "http_custom_errors"
                | "http_log_custom_fields"
                | "http_ratelimit"
                | "http_request_cache_settings"
                | "http_request_dynamic_redirect"
                | "http_request_firewall_custom"
                | "http_request_firewall_managed"
                | "http_request_late_transform"
                | "http_request_origin"
                | "http_request_redirect"
                | "http_request_sanitize"
                | "http_request_sbfm"
                | "http_request_transform"
                | "http_response_compression"
                | "http_response_firewall_managed"
                | "http_response_headers_transform"
                | "magic_transit"
                | "magic_transit_ids_managed"
                | "magic_transit_managed"
                | "magic_transit_ratelimit"
              )[]
            | null;
          products?:
            | (
                | "bic"
                | "hot"
                | "rateLimit"
                | "securityLevel"
                | "uaBlock"
                | "waf"
                | "zoneLockdown"
              )[]
            | null;
          rules?: Record<string, unknown> | null;
          ruleset?: "current" | null;
          rulesets?: string[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const CreateRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("block"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              response: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    content: Schema.String,
                    contentType: Schema.String,
                    statusCode: Schema.Number,
                  }).pipe(
                    Schema.encodeKeys({
                      content: "content",
                      contentType: "content_type",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("compress_response"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              algorithms: Schema.Array(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "auto",
                        "default",
                        "gzip",
                        "brotli",
                        "zstd",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
            }),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("ddos_dynamic"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("execute"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              id: Schema.String,
              matchedData: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    publicKey: Schema.String,
                  }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
                  Schema.Null,
                ]),
              ),
              overrides: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    action: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    categories: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            category: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              category: "category",
                              action: "action",
                              enabled: "enabled",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    enabled: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    rules: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            scoreThreshold: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              id: "id",
                              action: "action",
                              enabled: "enabled",
                              scoreThreshold: "score_threshold",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    sensitivityLevel: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["default", "medium", "low", "eoff"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      action: "action",
                      categories: "categories",
                      enabled: "enabled",
                      rules: "rules",
                      sensitivityLevel: "sensitivity_level",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                id: "id",
                matchedData: "matched_data",
                overrides: "overrides",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("force_connection_close"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log_custom_field"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              cookieFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              rawResponseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              requestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              responseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              transformedRequestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                cookieFields: "cookie_fields",
                rawResponseFields: "raw_response_fields",
                requestFields: "request_fields",
                responseFields: "response_fields",
                transformedRequestFields: "transformed_request_fields",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("managed_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("redirect"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              fromList: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    key: Schema.String,
                    name: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
              fromValue: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    targetUrl: Schema.Struct({
                      expression: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      value: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }),
                    preserveQueryString: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    statusCode: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["301", "302", "303", "307", "308"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      targetUrl: "target_url",
                      preserveQueryString: "preserve_query_string",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                fromList: "from_list",
                fromValue: "from_value",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("rewrite"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              headers: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              uri: Schema.optional(
                Schema.Union([
                  Schema.Union([
                    Schema.Struct({
                      path: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                    Schema.Struct({
                      query: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                  ]),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("route"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              hostHeader: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              origin: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    host: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    port: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              sni: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    value: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                hostHeader: "host_header",
                origin: "origin",
                sni: "sni",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("score"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              increment: Schema.Number,
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("serve_error"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                content: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  content: "content",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
              Schema.Struct({
                assetName: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  assetName: "asset_name",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_cache_settings"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              additionalCacheablePorts: Schema.optional(
                Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
              ),
              browserTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                      "bypass",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              cache: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              cacheKey: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    cacheByDeviceType: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    cacheDeceptionArmor: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    customKey: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          cookie: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          header: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                contains: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({}),
                                    Schema.Null,
                                  ]),
                                ),
                                excludeOrigin: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  contains: "contains",
                                  excludeOrigin: "exclude_origin",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          host: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                resolved: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          queryString: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                exclude: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          user: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                deviceType: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                geo: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                lang: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  deviceType: "device_type",
                                  geo: "geo",
                                  lang: "lang",
                                }),
                              ),
                              Schema.Null,
                            ]),
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
                        Schema.Null,
                      ]),
                    ),
                    ignoreQueryStringsOrder: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      cacheByDeviceType: "cache_by_device_type",
                      cacheDeceptionArmor: "cache_deception_armor",
                      customKey: "custom_key",
                      ignoreQueryStringsOrder: "ignore_query_strings_order",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              cacheReserve: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    eligible: Schema.Boolean,
                    minimumFileSize: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      eligible: "eligible",
                      minimumFileSize: "minimum_file_size",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              edgeTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    statusCodeTtl: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            value: Schema.Number,
                            statusCode: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            statusCodeRange: Schema.optional(
                              Schema.Union([
                                Schema.Struct({
                                  from: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                  to: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                }),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              value: "value",
                              statusCode: "status_code",
                              statusCodeRange: "status_code_range",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      mode: "mode",
                      default: "default",
                      statusCodeTtl: "status_code_ttl",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              originCacheControl: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              originErrorPagePassthru: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              readTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              respectStrongEtags: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              serveStale: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    disableStaleWhileUpdating: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      disableStaleWhileUpdating: "disable_stale_while_updating",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                additionalCacheablePorts: "additional_cacheable_ports",
                browserTtl: "browser_ttl",
                cache: "cache",
                cacheKey: "cache_key",
                cacheReserve: "cache_reserve",
                edgeTtl: "edge_ttl",
                originCacheControl: "origin_cache_control",
                originErrorPagePassthru: "origin_error_page_passthru",
                readTimeout: "read_timeout",
                respectStrongEtags: "respect_strong_etags",
                serveStale: "serve_stale",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_config"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              automaticHttpsRewrites: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              autominify: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    css: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    html: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    js: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              bic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
              disableApps: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disablePayPerCrawl: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableRum: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableZaraz: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              emailObfuscation: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              fonts: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              hotlinkProtection: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              mirage: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              opportunisticEncryption: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              polish: Schema.optional(
                Schema.Union([
                  Schema.Literals(["off", "lossless", "lossy", "webp"]),
                  Schema.Null,
                ]),
              ),
              requestBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard", "full"]),
                  Schema.Null,
                ]),
              ),
              responseBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard"]),
                  Schema.Null,
                ]),
              ),
              rocketLoader: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              securityLevel: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "essentially_off",
                    "low",
                    "medium",
                    "high",
                    "under_attack",
                  ]),
                  Schema.Null,
                ]),
              ),
              serverSideExcludes: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              ssl: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "flexible",
                    "full",
                    "strict",
                    "origin_pull",
                  ]),
                  Schema.Null,
                ]),
              ),
              sxg: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
            }).pipe(
              Schema.encodeKeys({
                automaticHttpsRewrites: "automatic_https_rewrites",
                autominify: "autominify",
                bic: "bic",
                disableApps: "disable_apps",
                disablePayPerCrawl: "disable_pay_per_crawl",
                disableRum: "disable_rum",
                disableZaraz: "disable_zaraz",
                emailObfuscation: "email_obfuscation",
                fonts: "fonts",
                hotlinkProtection: "hotlink_protection",
                mirage: "mirage",
                opportunisticEncryption: "opportunistic_encryption",
                polish: "polish",
                requestBodyBuffering: "request_body_buffering",
                responseBodyBuffering: "response_body_buffering",
                rocketLoader: "rocket_loader",
                securityLevel: "security_level",
                serverSideExcludes: "server_side_excludes",
                ssl: "ssl",
                sxg: "sxg",
              }),
            ),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("skip"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              phase: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              phases: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "ddos_l4",
                      "ddos_l7",
                      "http_config_settings",
                      "http_custom_errors",
                      "http_log_custom_fields",
                      "http_ratelimit",
                      "http_request_cache_settings",
                      "http_request_dynamic_redirect",
                      "http_request_firewall_custom",
                      "http_request_firewall_managed",
                      "http_request_late_transform",
                      "http_request_origin",
                      "http_request_redirect",
                      "http_request_sanitize",
                      "http_request_sbfm",
                      "http_request_transform",
                      "http_response_compression",
                      "http_response_firewall_managed",
                      "http_response_headers_transform",
                      "magic_transit",
                      "magic_transit_ids_managed",
                      "magic_transit_managed",
                      "magic_transit_ratelimit",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              products: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "bic",
                      "hot",
                      "rateLimit",
                      "securityLevel",
                      "uaBlock",
                      "waf",
                      "zoneLockdown",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              rules: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              ruleset: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              rulesets: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
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

export interface PatchRuleRequest {
  rulesetId: string;
  ruleId: string;
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The unique ID of the rule. */
  id?: string;
  /** Body param: The action to perform when the rule matches. */
  action?: "block";
  /** Body param: The parameters configuring the rule's action. */
  actionParameters?: {
    response?: { content: string; contentType: string; statusCode: number };
  };
  /** Body param: An informative description of the rule. */
  description?: string;
  /** Body param: Whether the rule should be executed. */
  enabled?: boolean;
  /** Body param: Configuration for exposed credential checking. */
  exposedCredentialCheck?: {
    passwordExpression: string;
    usernameExpression: string;
  };
  /** Body param: The expression defining which traffic will match the rule. */
  expression?: string;
  /** Body param: An object configuring the rule's logging behavior. */
  logging?: { enabled: boolean };
  /** Body param: An object configuring where the rule will be placed. */
  position?: { before?: string } | { after?: string } | { index?: number };
  /** Body param: An object configuring the rule's rate limit behavior. */
  ratelimit?: {
    characteristics: string[];
    period: number;
    countingExpression?: string;
    mitigationTimeout?: number;
    requestsPerPeriod?: number;
    requestsToOrigin?: boolean;
    scorePerPeriod?: number;
    scoreResponseHeaderName?: string;
  };
  /** Body param: The reference of the rule (the rule's ID by default). */
  ref?: string;
}

export const PatchRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  id: Schema.optional(Schema.String),
  action: Schema.optional(Schema.Literal("block")),
  actionParameters: Schema.optional(
    Schema.Struct({
      response: Schema.optional(
        Schema.Struct({
          content: Schema.String,
          contentType: Schema.String,
          statusCode: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            content: "content",
            contentType: "content_type",
            statusCode: "status_code",
          }),
        ),
      ),
    }),
  ),
  description: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  exposedCredentialCheck: Schema.optional(
    Schema.Struct({
      passwordExpression: SensitiveString,
      usernameExpression: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        passwordExpression: "password_expression",
        usernameExpression: "username_expression",
      }),
    ),
  ),
  expression: Schema.optional(Schema.String),
  logging: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
    }),
  ),
  position: Schema.optional(
    Schema.Union([
      Schema.Struct({
        before: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        after: Schema.optional(Schema.String),
      }),
      Schema.Struct({
        index: Schema.optional(Schema.Number),
      }),
    ]),
  ),
  ratelimit: Schema.optional(
    Schema.Struct({
      characteristics: Schema.Array(Schema.String),
      period: Schema.Number,
      countingExpression: Schema.optional(Schema.String),
      mitigationTimeout: Schema.optional(Schema.Number),
      requestsPerPeriod: Schema.optional(Schema.Number),
      requestsToOrigin: Schema.optional(Schema.Boolean),
      scorePerPeriod: Schema.optional(Schema.Number),
      scoreResponseHeaderName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        characteristics: "characteristics",
        period: "period",
        countingExpression: "counting_expression",
        mitigationTimeout: "mitigation_timeout",
        requestsPerPeriod: "requests_per_period",
        requestsToOrigin: "requests_to_origin",
        scorePerPeriod: "score_per_period",
        scoreResponseHeaderName: "score_response_header_name",
      }),
    ),
  ),
  ref: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    action: "action",
    actionParameters: "action_parameters",
    description: "description",
    enabled: "enabled",
    exposedCredentialCheck: "exposed_credential_check",
    expression: "expression",
    logging: "logging",
    position: "position",
    ratelimit: "ratelimit",
    ref: "ref",
  }),
  T.Http({
    method: "PATCH",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<PatchRuleRequest>;

export interface PatchRuleResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "block" | null;
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "compress_response" | null;
        actionParameters?: {
          algorithms: {
            name?:
              | "none"
              | "auto"
              | "default"
              | "gzip"
              | "brotli"
              | "zstd"
              | null;
          }[];
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "ddos_dynamic" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "execute" | null;
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string } | null;
          overrides?: {
            action?: string | null;
            categories?:
              | {
                  category: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            enabled?: boolean | null;
            rules?:
              | {
                  id: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  scoreThreshold?: number | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            sensitivityLevel?: "default" | "medium" | "low" | "eoff" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "force_connection_close" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log_custom_field" | null;
        actionParameters?: {
          cookieFields?: { name: string }[] | null;
          rawResponseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          requestFields?: { name: string }[] | null;
          responseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          transformedRequestFields?: { name: string }[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "managed_challenge" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "redirect" | null;
        actionParameters?: {
          fromList?: { key: string; name: string } | null;
          fromValue?: {
            targetUrl: { expression?: string | null; value?: string | null };
            preserveQueryString?: boolean | null;
            statusCode?: "301" | "302" | "303" | "307" | "308" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "rewrite" | null;
        actionParameters?: {
          headers?: Record<string, unknown> | null;
          uri?:
            | { path: { expression?: string | null; value?: string | null } }
            | { query: { expression?: string | null; value?: string | null } }
            | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "route" | null;
        actionParameters?: {
          hostHeader?: string | null;
          origin?: { host?: string | null; port?: number | null } | null;
          sni?: { value: string } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "score" | null;
        actionParameters?: { increment: number } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "serve_error" | null;
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "set_cache_settings" | null;
        actionParameters?: {
          additionalCacheablePorts?: number[] | null;
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number | null;
          } | null;
          cache?: boolean | null;
          cacheKey?: {
            cacheByDeviceType?: boolean | null;
            cacheDeceptionArmor?: boolean | null;
            customKey?: {
              cookie?: {
                checkPresence?: string[] | null;
                include?: string[] | null;
              } | null;
              header?: {
                checkPresence?: string[] | null;
                contains?: Record<string, unknown> | null;
                excludeOrigin?: boolean | null;
                include?: string[] | null;
              } | null;
              host?: { resolved?: boolean | null } | null;
              queryString?: {
                exclude?: { all?: true | null; list?: string[] | null } | null;
                include?: { all?: true | null; list?: string[] | null } | null;
              } | null;
              user?: {
                deviceType?: boolean | null;
                geo?: boolean | null;
                lang?: boolean | null;
              } | null;
            } | null;
            ignoreQueryStringsOrder?: boolean | null;
          } | null;
          cacheReserve?: {
            eligible: boolean;
            minimumFileSize?: number | null;
          } | null;
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number | null;
            statusCodeTtl?:
              | {
                  value: number;
                  statusCode?: number | null;
                  statusCodeRange?: {
                    from?: number | null;
                    to?: number | null;
                  } | null;
                }[]
              | null;
          } | null;
          originCacheControl?: boolean | null;
          originErrorPagePassthru?: boolean | null;
          readTimeout?: number | null;
          respectStrongEtags?: boolean | null;
          serveStale?: { disableStaleWhileUpdating?: boolean | null } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "set_config" | null;
        actionParameters?: {
          automaticHttpsRewrites?: boolean | null;
          autominify?: {
            css?: boolean | null;
            html?: boolean | null;
            js?: boolean | null;
          } | null;
          bic?: boolean | null;
          disableApps?: true | null;
          disablePayPerCrawl?: true | null;
          disableRum?: true | null;
          disableZaraz?: true | null;
          emailObfuscation?: boolean | null;
          fonts?: boolean | null;
          hotlinkProtection?: boolean | null;
          mirage?: boolean | null;
          opportunisticEncryption?: boolean | null;
          polish?: "off" | "lossless" | "lossy" | "webp" | null;
          requestBodyBuffering?: "none" | "standard" | "full" | null;
          responseBodyBuffering?: "none" | "standard" | null;
          rocketLoader?: boolean | null;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack"
            | null;
          serverSideExcludes?: boolean | null;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull" | null;
          sxg?: boolean | null;
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "skip" | null;
        actionParameters?: {
          phase?: "current" | null;
          phases?:
            | (
                | "ddos_l4"
                | "ddos_l7"
                | "http_config_settings"
                | "http_custom_errors"
                | "http_log_custom_fields"
                | "http_ratelimit"
                | "http_request_cache_settings"
                | "http_request_dynamic_redirect"
                | "http_request_firewall_custom"
                | "http_request_firewall_managed"
                | "http_request_late_transform"
                | "http_request_origin"
                | "http_request_redirect"
                | "http_request_sanitize"
                | "http_request_sbfm"
                | "http_request_transform"
                | "http_response_compression"
                | "http_response_firewall_managed"
                | "http_response_headers_transform"
                | "magic_transit"
                | "magic_transit_ids_managed"
                | "magic_transit_managed"
                | "magic_transit_ratelimit"
              )[]
            | null;
          products?:
            | (
                | "bic"
                | "hot"
                | "rateLimit"
                | "securityLevel"
                | "uaBlock"
                | "waf"
                | "zoneLockdown"
              )[]
            | null;
          rules?: Record<string, unknown> | null;
          ruleset?: "current" | null;
          rulesets?: string[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const PatchRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("block"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              response: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    content: Schema.String,
                    contentType: Schema.String,
                    statusCode: Schema.Number,
                  }).pipe(
                    Schema.encodeKeys({
                      content: "content",
                      contentType: "content_type",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("compress_response"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              algorithms: Schema.Array(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "auto",
                        "default",
                        "gzip",
                        "brotli",
                        "zstd",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
            }),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("ddos_dynamic"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("execute"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              id: Schema.String,
              matchedData: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    publicKey: Schema.String,
                  }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
                  Schema.Null,
                ]),
              ),
              overrides: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    action: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    categories: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            category: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              category: "category",
                              action: "action",
                              enabled: "enabled",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    enabled: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    rules: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            scoreThreshold: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              id: "id",
                              action: "action",
                              enabled: "enabled",
                              scoreThreshold: "score_threshold",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    sensitivityLevel: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["default", "medium", "low", "eoff"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      action: "action",
                      categories: "categories",
                      enabled: "enabled",
                      rules: "rules",
                      sensitivityLevel: "sensitivity_level",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                id: "id",
                matchedData: "matched_data",
                overrides: "overrides",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("force_connection_close"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log_custom_field"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              cookieFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              rawResponseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              requestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              responseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              transformedRequestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                cookieFields: "cookie_fields",
                rawResponseFields: "raw_response_fields",
                requestFields: "request_fields",
                responseFields: "response_fields",
                transformedRequestFields: "transformed_request_fields",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("managed_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("redirect"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              fromList: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    key: Schema.String,
                    name: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
              fromValue: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    targetUrl: Schema.Struct({
                      expression: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      value: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }),
                    preserveQueryString: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    statusCode: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["301", "302", "303", "307", "308"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      targetUrl: "target_url",
                      preserveQueryString: "preserve_query_string",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                fromList: "from_list",
                fromValue: "from_value",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("rewrite"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              headers: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              uri: Schema.optional(
                Schema.Union([
                  Schema.Union([
                    Schema.Struct({
                      path: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                    Schema.Struct({
                      query: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                  ]),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("route"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              hostHeader: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              origin: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    host: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    port: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              sni: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    value: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                hostHeader: "host_header",
                origin: "origin",
                sni: "sni",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("score"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              increment: Schema.Number,
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("serve_error"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                content: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  content: "content",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
              Schema.Struct({
                assetName: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  assetName: "asset_name",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_cache_settings"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              additionalCacheablePorts: Schema.optional(
                Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
              ),
              browserTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                      "bypass",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              cache: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              cacheKey: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    cacheByDeviceType: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    cacheDeceptionArmor: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    customKey: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          cookie: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          header: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                contains: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({}),
                                    Schema.Null,
                                  ]),
                                ),
                                excludeOrigin: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  contains: "contains",
                                  excludeOrigin: "exclude_origin",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          host: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                resolved: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          queryString: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                exclude: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          user: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                deviceType: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                geo: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                lang: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  deviceType: "device_type",
                                  geo: "geo",
                                  lang: "lang",
                                }),
                              ),
                              Schema.Null,
                            ]),
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
                        Schema.Null,
                      ]),
                    ),
                    ignoreQueryStringsOrder: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      cacheByDeviceType: "cache_by_device_type",
                      cacheDeceptionArmor: "cache_deception_armor",
                      customKey: "custom_key",
                      ignoreQueryStringsOrder: "ignore_query_strings_order",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              cacheReserve: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    eligible: Schema.Boolean,
                    minimumFileSize: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      eligible: "eligible",
                      minimumFileSize: "minimum_file_size",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              edgeTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    statusCodeTtl: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            value: Schema.Number,
                            statusCode: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            statusCodeRange: Schema.optional(
                              Schema.Union([
                                Schema.Struct({
                                  from: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                  to: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                }),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              value: "value",
                              statusCode: "status_code",
                              statusCodeRange: "status_code_range",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      mode: "mode",
                      default: "default",
                      statusCodeTtl: "status_code_ttl",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              originCacheControl: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              originErrorPagePassthru: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              readTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              respectStrongEtags: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              serveStale: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    disableStaleWhileUpdating: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      disableStaleWhileUpdating: "disable_stale_while_updating",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                additionalCacheablePorts: "additional_cacheable_ports",
                browserTtl: "browser_ttl",
                cache: "cache",
                cacheKey: "cache_key",
                cacheReserve: "cache_reserve",
                edgeTtl: "edge_ttl",
                originCacheControl: "origin_cache_control",
                originErrorPagePassthru: "origin_error_page_passthru",
                readTimeout: "read_timeout",
                respectStrongEtags: "respect_strong_etags",
                serveStale: "serve_stale",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_config"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              automaticHttpsRewrites: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              autominify: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    css: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    html: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    js: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              bic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
              disableApps: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disablePayPerCrawl: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableRum: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableZaraz: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              emailObfuscation: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              fonts: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              hotlinkProtection: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              mirage: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              opportunisticEncryption: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              polish: Schema.optional(
                Schema.Union([
                  Schema.Literals(["off", "lossless", "lossy", "webp"]),
                  Schema.Null,
                ]),
              ),
              requestBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard", "full"]),
                  Schema.Null,
                ]),
              ),
              responseBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard"]),
                  Schema.Null,
                ]),
              ),
              rocketLoader: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              securityLevel: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "essentially_off",
                    "low",
                    "medium",
                    "high",
                    "under_attack",
                  ]),
                  Schema.Null,
                ]),
              ),
              serverSideExcludes: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              ssl: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "flexible",
                    "full",
                    "strict",
                    "origin_pull",
                  ]),
                  Schema.Null,
                ]),
              ),
              sxg: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
            }).pipe(
              Schema.encodeKeys({
                automaticHttpsRewrites: "automatic_https_rewrites",
                autominify: "autominify",
                bic: "bic",
                disableApps: "disable_apps",
                disablePayPerCrawl: "disable_pay_per_crawl",
                disableRum: "disable_rum",
                disableZaraz: "disable_zaraz",
                emailObfuscation: "email_obfuscation",
                fonts: "fonts",
                hotlinkProtection: "hotlink_protection",
                mirage: "mirage",
                opportunisticEncryption: "opportunistic_encryption",
                polish: "polish",
                requestBodyBuffering: "request_body_buffering",
                responseBodyBuffering: "response_body_buffering",
                rocketLoader: "rocket_loader",
                securityLevel: "security_level",
                serverSideExcludes: "server_side_excludes",
                ssl: "ssl",
                sxg: "sxg",
              }),
            ),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("skip"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              phase: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              phases: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "ddos_l4",
                      "ddos_l7",
                      "http_config_settings",
                      "http_custom_errors",
                      "http_log_custom_fields",
                      "http_ratelimit",
                      "http_request_cache_settings",
                      "http_request_dynamic_redirect",
                      "http_request_firewall_custom",
                      "http_request_firewall_managed",
                      "http_request_late_transform",
                      "http_request_origin",
                      "http_request_redirect",
                      "http_request_sanitize",
                      "http_request_sbfm",
                      "http_request_transform",
                      "http_response_compression",
                      "http_response_firewall_managed",
                      "http_response_headers_transform",
                      "magic_transit",
                      "magic_transit_ids_managed",
                      "magic_transit_managed",
                      "magic_transit_ratelimit",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              products: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "bic",
                      "hot",
                      "rateLimit",
                      "securityLevel",
                      "uaBlock",
                      "waf",
                      "zoneLockdown",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              rules: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              ruleset: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              rulesets: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
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
  rulesetId: string;
  ruleId: string;
}

export const DeleteRuleRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  ruleId: Schema.String.pipe(T.HttpPath("ruleId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/rules/{ruleId}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "block" | null;
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "compress_response" | null;
        actionParameters?: {
          algorithms: {
            name?:
              | "none"
              | "auto"
              | "default"
              | "gzip"
              | "brotli"
              | "zstd"
              | null;
          }[];
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "ddos_dynamic" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "execute" | null;
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string } | null;
          overrides?: {
            action?: string | null;
            categories?:
              | {
                  category: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            enabled?: boolean | null;
            rules?:
              | {
                  id: string;
                  action?: string | null;
                  enabled?: boolean | null;
                  scoreThreshold?: number | null;
                  sensitivityLevel?:
                    | "default"
                    | "medium"
                    | "low"
                    | "eoff"
                    | null;
                }[]
              | null;
            sensitivityLevel?: "default" | "medium" | "low" | "eoff" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "force_connection_close" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "log_custom_field" | null;
        actionParameters?: {
          cookieFields?: { name: string }[] | null;
          rawResponseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          requestFields?: { name: string }[] | null;
          responseFields?:
            | { name: string; preserveDuplicates?: boolean | null }[]
            | null;
          transformedRequestFields?: { name: string }[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "managed_challenge" | null;
        actionParameters?: unknown | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "redirect" | null;
        actionParameters?: {
          fromList?: { key: string; name: string } | null;
          fromValue?: {
            targetUrl: { expression?: string | null; value?: string | null };
            preserveQueryString?: boolean | null;
            statusCode?: "301" | "302" | "303" | "307" | "308" | null;
          } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "rewrite" | null;
        actionParameters?: {
          headers?: Record<string, unknown> | null;
          uri?:
            | { path: { expression?: string | null; value?: string | null } }
            | { query: { expression?: string | null; value?: string | null } }
            | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "route" | null;
        actionParameters?: {
          hostHeader?: string | null;
          origin?: { host?: string | null; port?: number | null } | null;
          sni?: { value: string } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "score" | null;
        actionParameters?: { increment: number } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "serve_error" | null;
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml"
                | null;
              statusCode?: number | null;
            }
          | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "set_cache_settings" | null;
        actionParameters?: {
          additionalCacheablePorts?: number[] | null;
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number | null;
          } | null;
          cache?: boolean | null;
          cacheKey?: {
            cacheByDeviceType?: boolean | null;
            cacheDeceptionArmor?: boolean | null;
            customKey?: {
              cookie?: {
                checkPresence?: string[] | null;
                include?: string[] | null;
              } | null;
              header?: {
                checkPresence?: string[] | null;
                contains?: Record<string, unknown> | null;
                excludeOrigin?: boolean | null;
                include?: string[] | null;
              } | null;
              host?: { resolved?: boolean | null } | null;
              queryString?: {
                exclude?: { all?: true | null; list?: string[] | null } | null;
                include?: { all?: true | null; list?: string[] | null } | null;
              } | null;
              user?: {
                deviceType?: boolean | null;
                geo?: boolean | null;
                lang?: boolean | null;
              } | null;
            } | null;
            ignoreQueryStringsOrder?: boolean | null;
          } | null;
          cacheReserve?: {
            eligible: boolean;
            minimumFileSize?: number | null;
          } | null;
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number | null;
            statusCodeTtl?:
              | {
                  value: number;
                  statusCode?: number | null;
                  statusCodeRange?: {
                    from?: number | null;
                    to?: number | null;
                  } | null;
                }[]
              | null;
          } | null;
          originCacheControl?: boolean | null;
          originErrorPagePassthru?: boolean | null;
          readTimeout?: number | null;
          respectStrongEtags?: boolean | null;
          serveStale?: { disableStaleWhileUpdating?: boolean | null } | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "set_config" | null;
        actionParameters?: {
          automaticHttpsRewrites?: boolean | null;
          autominify?: {
            css?: boolean | null;
            html?: boolean | null;
            js?: boolean | null;
          } | null;
          bic?: boolean | null;
          disableApps?: true | null;
          disablePayPerCrawl?: true | null;
          disableRum?: true | null;
          disableZaraz?: true | null;
          emailObfuscation?: boolean | null;
          fonts?: boolean | null;
          hotlinkProtection?: boolean | null;
          mirage?: boolean | null;
          opportunisticEncryption?: boolean | null;
          polish?: "off" | "lossless" | "lossy" | "webp" | null;
          requestBodyBuffering?: "none" | "standard" | "full" | null;
          responseBodyBuffering?: "none" | "standard" | null;
          rocketLoader?: boolean | null;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack"
            | null;
          serverSideExcludes?: boolean | null;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull" | null;
          sxg?: boolean | null;
        } | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        accountId?: string | null;
        zoneId?: string | null;
        id?: string | null;
        action?: "skip" | null;
        actionParameters?: {
          phase?: "current" | null;
          phases?:
            | (
                | "ddos_l4"
                | "ddos_l7"
                | "http_config_settings"
                | "http_custom_errors"
                | "http_log_custom_fields"
                | "http_ratelimit"
                | "http_request_cache_settings"
                | "http_request_dynamic_redirect"
                | "http_request_firewall_custom"
                | "http_request_firewall_managed"
                | "http_request_late_transform"
                | "http_request_origin"
                | "http_request_redirect"
                | "http_request_sanitize"
                | "http_request_sbfm"
                | "http_request_transform"
                | "http_response_compression"
                | "http_response_firewall_managed"
                | "http_response_headers_transform"
                | "magic_transit"
                | "magic_transit_ids_managed"
                | "magic_transit_managed"
                | "magic_transit_ratelimit"
              )[]
            | null;
          products?:
            | (
                | "bic"
                | "hot"
                | "rateLimit"
                | "securityLevel"
                | "uaBlock"
                | "waf"
                | "zoneLockdown"
              )[]
            | null;
          rules?: Record<string, unknown> | null;
          ruleset?: "current" | null;
          rulesets?: string[] | null;
        } | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: { enabled: boolean } | null;
        position?:
          | { before?: string | null }
          | { after?: string | null }
          | { index?: number | null }
          | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const DeleteRuleResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("block"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              response: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    content: Schema.String,
                    contentType: Schema.String,
                    statusCode: Schema.Number,
                  }).pipe(
                    Schema.encodeKeys({
                      content: "content",
                      contentType: "content_type",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("compress_response"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              algorithms: Schema.Array(
                Schema.Struct({
                  name: Schema.optional(
                    Schema.Union([
                      Schema.Literals([
                        "none",
                        "auto",
                        "default",
                        "gzip",
                        "brotli",
                        "zstd",
                      ]),
                      Schema.Null,
                    ]),
                  ),
                }),
              ),
            }),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("ddos_dynamic"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("execute"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              id: Schema.String,
              matchedData: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    publicKey: Schema.String,
                  }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
                  Schema.Null,
                ]),
              ),
              overrides: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    action: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    categories: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            category: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              category: "category",
                              action: "action",
                              enabled: "enabled",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    enabled: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    rules: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            id: Schema.String,
                            action: Schema.optional(
                              Schema.Union([Schema.String, Schema.Null]),
                            ),
                            enabled: Schema.optional(
                              Schema.Union([Schema.Boolean, Schema.Null]),
                            ),
                            scoreThreshold: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            sensitivityLevel: Schema.optional(
                              Schema.Union([
                                Schema.Literals([
                                  "default",
                                  "medium",
                                  "low",
                                  "eoff",
                                ]),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              id: "id",
                              action: "action",
                              enabled: "enabled",
                              scoreThreshold: "score_threshold",
                              sensitivityLevel: "sensitivity_level",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                    sensitivityLevel: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["default", "medium", "low", "eoff"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      action: "action",
                      categories: "categories",
                      enabled: "enabled",
                      rules: "rules",
                      sensitivityLevel: "sensitivity_level",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                id: "id",
                matchedData: "matched_data",
                overrides: "overrides",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("force_connection_close"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("log_custom_field"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              cookieFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              rawResponseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              requestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              responseFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      preserveDuplicates: Schema.optional(
                        Schema.Union([Schema.Boolean, Schema.Null]),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        name: "name",
                        preserveDuplicates: "preserve_duplicates",
                      }),
                    ),
                  ),
                  Schema.Null,
                ]),
              ),
              transformedRequestFields: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                cookieFields: "cookie_fields",
                rawResponseFields: "raw_response_fields",
                requestFields: "request_fields",
                responseFields: "response_fields",
                transformedRequestFields: "transformed_request_fields",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("managed_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("redirect"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              fromList: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    key: Schema.String,
                    name: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
              fromValue: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    targetUrl: Schema.Struct({
                      expression: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                      value: Schema.optional(
                        Schema.Union([Schema.String, Schema.Null]),
                      ),
                    }),
                    preserveQueryString: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    statusCode: Schema.optional(
                      Schema.Union([
                        Schema.Literals(["301", "302", "303", "307", "308"]),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      targetUrl: "target_url",
                      preserveQueryString: "preserve_query_string",
                      statusCode: "status_code",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                fromList: "from_list",
                fromValue: "from_value",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("rewrite"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              headers: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              uri: Schema.optional(
                Schema.Union([
                  Schema.Union([
                    Schema.Struct({
                      path: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                    Schema.Struct({
                      query: Schema.Struct({
                        expression: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                    }),
                  ]),
                  Schema.Null,
                ]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("route"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              hostHeader: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              origin: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    host: Schema.optional(
                      Schema.Union([Schema.String, Schema.Null]),
                    ),
                    port: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              sni: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    value: Schema.String,
                  }),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                hostHeader: "host_header",
                origin: "origin",
                sni: "sni",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("score"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              increment: Schema.Number,
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("serve_error"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                content: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  content: "content",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
              Schema.Struct({
                assetName: Schema.String,
                contentType: Schema.optional(
                  Schema.Union([
                    Schema.Literals([
                      "application/json",
                      "text/html",
                      "text/plain",
                      "text/xml",
                    ]),
                    Schema.Null,
                  ]),
                ),
                statusCode: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  assetName: "asset_name",
                  contentType: "content_type",
                  statusCode: "status_code",
                }),
              ),
            ]),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_cache_settings"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              additionalCacheablePorts: Schema.optional(
                Schema.Union([Schema.Array(Schema.Number), Schema.Null]),
              ),
              browserTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                      "bypass",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              cache: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              cacheKey: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    cacheByDeviceType: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    cacheDeceptionArmor: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    customKey: Schema.optional(
                      Schema.Union([
                        Schema.Struct({
                          cookie: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          header: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                checkPresence: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                                contains: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({}),
                                    Schema.Null,
                                  ]),
                                ),
                                excludeOrigin: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Array(Schema.String),
                                    Schema.Null,
                                  ]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  checkPresence: "check_presence",
                                  contains: "contains",
                                  excludeOrigin: "exclude_origin",
                                  include: "include",
                                }),
                              ),
                              Schema.Null,
                            ]),
                          ),
                          host: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                resolved: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          queryString: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                exclude: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                                include: Schema.optional(
                                  Schema.Union([
                                    Schema.Struct({
                                      all: Schema.optional(
                                        Schema.Union([
                                          Schema.Literal(true),
                                          Schema.Null,
                                        ]),
                                      ),
                                      list: Schema.optional(
                                        Schema.Union([
                                          Schema.Array(Schema.String),
                                          Schema.Null,
                                        ]),
                                      ),
                                    }),
                                    Schema.Null,
                                  ]),
                                ),
                              }),
                              Schema.Null,
                            ]),
                          ),
                          user: Schema.optional(
                            Schema.Union([
                              Schema.Struct({
                                deviceType: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                geo: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                                lang: Schema.optional(
                                  Schema.Union([Schema.Boolean, Schema.Null]),
                                ),
                              }).pipe(
                                Schema.encodeKeys({
                                  deviceType: "device_type",
                                  geo: "geo",
                                  lang: "lang",
                                }),
                              ),
                              Schema.Null,
                            ]),
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
                        Schema.Null,
                      ]),
                    ),
                    ignoreQueryStringsOrder: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      cacheByDeviceType: "cache_by_device_type",
                      cacheDeceptionArmor: "cache_deception_armor",
                      customKey: "custom_key",
                      ignoreQueryStringsOrder: "ignore_query_strings_order",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              cacheReserve: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    eligible: Schema.Boolean,
                    minimumFileSize: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      eligible: "eligible",
                      minimumFileSize: "minimum_file_size",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              edgeTtl: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    mode: Schema.Literals([
                      "respect_origin",
                      "bypass_by_default",
                      "override_origin",
                    ]),
                    default: Schema.optional(
                      Schema.Union([Schema.Number, Schema.Null]),
                    ),
                    statusCodeTtl: Schema.optional(
                      Schema.Union([
                        Schema.Array(
                          Schema.Struct({
                            value: Schema.Number,
                            statusCode: Schema.optional(
                              Schema.Union([Schema.Number, Schema.Null]),
                            ),
                            statusCodeRange: Schema.optional(
                              Schema.Union([
                                Schema.Struct({
                                  from: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                  to: Schema.optional(
                                    Schema.Union([Schema.Number, Schema.Null]),
                                  ),
                                }),
                                Schema.Null,
                              ]),
                            ),
                          }).pipe(
                            Schema.encodeKeys({
                              value: "value",
                              statusCode: "status_code",
                              statusCodeRange: "status_code_range",
                            }),
                          ),
                        ),
                        Schema.Null,
                      ]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      mode: "mode",
                      default: "default",
                      statusCodeTtl: "status_code_ttl",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
              originCacheControl: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              originErrorPagePassthru: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              readTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              respectStrongEtags: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              serveStale: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    disableStaleWhileUpdating: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }).pipe(
                    Schema.encodeKeys({
                      disableStaleWhileUpdating: "disable_stale_while_updating",
                    }),
                  ),
                  Schema.Null,
                ]),
              ),
            }).pipe(
              Schema.encodeKeys({
                additionalCacheablePorts: "additional_cacheable_ports",
                browserTtl: "browser_ttl",
                cache: "cache",
                cacheKey: "cache_key",
                cacheReserve: "cache_reserve",
                edgeTtl: "edge_ttl",
                originCacheControl: "origin_cache_control",
                originErrorPagePassthru: "origin_error_page_passthru",
                readTimeout: "read_timeout",
                respectStrongEtags: "respect_strong_etags",
                serveStale: "serve_stale",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("set_config"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              automaticHttpsRewrites: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              autominify: Schema.optional(
                Schema.Union([
                  Schema.Struct({
                    css: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    html: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                    js: Schema.optional(
                      Schema.Union([Schema.Boolean, Schema.Null]),
                    ),
                  }),
                  Schema.Null,
                ]),
              ),
              bic: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
              disableApps: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disablePayPerCrawl: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableRum: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              disableZaraz: Schema.optional(
                Schema.Union([Schema.Literal(true), Schema.Null]),
              ),
              emailObfuscation: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              fonts: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              hotlinkProtection: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              mirage: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              opportunisticEncryption: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              polish: Schema.optional(
                Schema.Union([
                  Schema.Literals(["off", "lossless", "lossy", "webp"]),
                  Schema.Null,
                ]),
              ),
              requestBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard", "full"]),
                  Schema.Null,
                ]),
              ),
              responseBodyBuffering: Schema.optional(
                Schema.Union([
                  Schema.Literals(["none", "standard"]),
                  Schema.Null,
                ]),
              ),
              rocketLoader: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              securityLevel: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "essentially_off",
                    "low",
                    "medium",
                    "high",
                    "under_attack",
                  ]),
                  Schema.Null,
                ]),
              ),
              serverSideExcludes: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              ssl: Schema.optional(
                Schema.Union([
                  Schema.Literals([
                    "off",
                    "flexible",
                    "full",
                    "strict",
                    "origin_pull",
                  ]),
                  Schema.Null,
                ]),
              ),
              sxg: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
            }).pipe(
              Schema.encodeKeys({
                automaticHttpsRewrites: "automatic_https_rewrites",
                autominify: "autominify",
                bic: "bic",
                disableApps: "disable_apps",
                disablePayPerCrawl: "disable_pay_per_crawl",
                disableRum: "disable_rum",
                disableZaraz: "disable_zaraz",
                emailObfuscation: "email_obfuscation",
                fonts: "fonts",
                hotlinkProtection: "hotlink_protection",
                mirage: "mirage",
                opportunisticEncryption: "opportunistic_encryption",
                polish: "polish",
                requestBodyBuffering: "request_body_buffering",
                responseBodyBuffering: "response_body_buffering",
                rocketLoader: "rocket_loader",
                securityLevel: "security_level",
                serverSideExcludes: "server_side_excludes",
                ssl: "ssl",
                sxg: "sxg",
              }),
            ),
            Schema.Null,
          ]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        accountId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        zoneId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("skip"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              phase: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              phases: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "ddos_l4",
                      "ddos_l7",
                      "http_config_settings",
                      "http_custom_errors",
                      "http_log_custom_fields",
                      "http_ratelimit",
                      "http_request_cache_settings",
                      "http_request_dynamic_redirect",
                      "http_request_firewall_custom",
                      "http_request_firewall_managed",
                      "http_request_late_transform",
                      "http_request_origin",
                      "http_request_redirect",
                      "http_request_sanitize",
                      "http_request_sbfm",
                      "http_request_transform",
                      "http_response_compression",
                      "http_response_firewall_managed",
                      "http_response_headers_transform",
                      "magic_transit",
                      "magic_transit_ids_managed",
                      "magic_transit_managed",
                      "magic_transit_ratelimit",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              products: Schema.optional(
                Schema.Union([
                  Schema.Array(
                    Schema.Literals([
                      "bic",
                      "hot",
                      "rateLimit",
                      "securityLevel",
                      "uaBlock",
                      "waf",
                      "zoneLockdown",
                    ]),
                  ),
                  Schema.Null,
                ]),
              ),
              rules: Schema.optional(
                Schema.Union([Schema.Struct({}), Schema.Null]),
              ),
              ruleset: Schema.optional(
                Schema.Union([Schema.Literal("current"), Schema.Null]),
              ),
              rulesets: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }),
            Schema.Null,
          ]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(
          Schema.Union([
            Schema.Struct({
              enabled: Schema.Boolean,
            }),
            Schema.Null,
          ]),
        ),
        position: Schema.optional(
          Schema.Union([
            Schema.Union([
              Schema.Struct({
                before: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                after: Schema.optional(
                  Schema.Union([Schema.String, Schema.Null]),
                ),
              }),
              Schema.Struct({
                index: Schema.optional(
                  Schema.Union([Schema.Number, Schema.Null]),
                ),
              }),
            ]),
            Schema.Null,
          ]),
        ),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          accountId: "account_id",
          zoneId: "zone_id",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          position: "position",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<DeleteRuleResponse>;

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

// =============================================================================
// Ruleset
// =============================================================================

export interface GetRulesetRequest {
  rulesetId: string;
}

export const GetRulesetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}",
  }),
) as unknown as Schema.Schema<GetRulesetRequest>;

export interface GetRulesetResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const GetRulesetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetRulesetResponse>;

export type GetRulesetError = DefaultErrors;

export const getRuleset: API.OperationMethod<
  GetRulesetRequest,
  GetRulesetResponse,
  GetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRulesetRequest,
  output: GetRulesetResponse,
  errors: [],
}));

export interface ListRulesetsRequest {}

export const ListRulesetsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets",
  }),
) as unknown as Schema.Schema<ListRulesetsRequest>;

export interface ListRulesetsResponse {
  result: {
    id: string;
    kind: "zone" | "managed" | "custom" | "root";
    lastUpdated: string;
    name: string;
    phase:
      | "ddos_l4"
      | "ddos_l7"
      | "http_config_settings"
      | "http_custom_errors"
      | "http_log_custom_fields"
      | "http_ratelimit"
      | "http_request_cache_settings"
      | "http_request_dynamic_redirect"
      | "http_request_firewall_custom"
      | "http_request_firewall_managed"
      | "http_request_late_transform"
      | "http_request_origin"
      | "http_request_redirect"
      | "http_request_sanitize"
      | "http_request_sbfm"
      | "http_request_transform"
      | "http_response_compression"
      | "http_response_firewall_managed"
      | "http_response_headers_transform"
      | "magic_transit"
      | "magic_transit_ids_managed"
      | "magic_transit_managed"
      | "magic_transit_ratelimit";
    version: string;
    description?: string | null;
  }[];
  resultInfo: {
    count?: number | null;
    cursor?: string | null;
    perPage?: number | null;
  };
}

export const ListRulesetsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      kind: Schema.Literals(["zone", "managed", "custom", "root"]),
      lastUpdated: Schema.String,
      name: Schema.String,
      phase: Schema.Literals([
        "ddos_l4",
        "ddos_l7",
        "http_config_settings",
        "http_custom_errors",
        "http_log_custom_fields",
        "http_ratelimit",
        "http_request_cache_settings",
        "http_request_dynamic_redirect",
        "http_request_firewall_custom",
        "http_request_firewall_managed",
        "http_request_late_transform",
        "http_request_origin",
        "http_request_redirect",
        "http_request_sanitize",
        "http_request_sbfm",
        "http_request_transform",
        "http_response_compression",
        "http_response_firewall_managed",
        "http_response_headers_transform",
        "magic_transit",
        "magic_transit_ids_managed",
        "magic_transit_managed",
        "magic_transit_ratelimit",
      ]),
      version: Schema.String,
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        kind: "kind",
        lastUpdated: "last_updated",
        name: "name",
        phase: "phase",
        version: "version",
        description: "description",
      }),
    ),
  ),
  resultInfo: Schema.Struct({
    count: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
    cursor: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    perPage: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  }).pipe(
    Schema.encodeKeys({
      count: "count",
      cursor: "cursor",
      perPage: "per_page",
    }),
  ),
}).pipe(
  Schema.encodeKeys({ result: "result", resultInfo: "result_info" }),
) as unknown as Schema.Schema<ListRulesetsResponse>;

export type ListRulesetsError = DefaultErrors;

export const listRulesets: API.PaginatedOperationMethod<
  ListRulesetsRequest,
  ListRulesetsResponse,
  ListRulesetsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListRulesetsRequest,
  ) => stream.Stream<
    ListRulesetsResponse,
    ListRulesetsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListRulesetsRequest) => stream.Stream<
    {
      id: string;
      kind: "zone" | "managed" | "custom" | "root";
      lastUpdated: string;
      name: string;
      phase:
        | "ddos_l4"
        | "ddos_l7"
        | "http_config_settings"
        | "http_custom_errors"
        | "http_log_custom_fields"
        | "http_ratelimit"
        | "http_request_cache_settings"
        | "http_request_dynamic_redirect"
        | "http_request_firewall_custom"
        | "http_request_firewall_managed"
        | "http_request_late_transform"
        | "http_request_origin"
        | "http_request_redirect"
        | "http_request_sanitize"
        | "http_request_sbfm"
        | "http_request_transform"
        | "http_response_compression"
        | "http_response_firewall_managed"
        | "http_response_headers_transform"
        | "magic_transit"
        | "magic_transit_ids_managed"
        | "magic_transit_managed"
        | "magic_transit_ratelimit";
      version: string;
      description?: string | null;
    },
    ListRulesetsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRulesetsRequest,
  output: ListRulesetsResponse,
  errors: [],
  pagination: {
    mode: "cursor",
    inputToken: "cursor",
    outputToken: "resultInfo.cursor",
    items: "result",
    pageSize: "perPage",
  } as const,
}));

export interface CreateRulesetRequest {
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** Body param: The human-readable name of the ruleset. */
  name: string;
  /** Body param: The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** Body param: An informative description of the ruleset. */
  description?: string;
  /** Body param: The list of rules in the ruleset. */
  rules?: (
    | unknown
    | {
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
    | {
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
  )[];
}

export const CreateRulesetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  description: Schema.optional(Schema.String),
  rules: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("js_challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
      ]),
    ),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets",
  }),
) as unknown as Schema.Schema<CreateRulesetRequest>;

export interface CreateRulesetResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const CreateRulesetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<CreateRulesetResponse>;

export type CreateRulesetError = DefaultErrors;

export const createRuleset: API.OperationMethod<
  CreateRulesetRequest,
  CreateRulesetResponse,
  CreateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRulesetRequest,
  output: CreateRulesetResponse,
  errors: [],
}));

export interface UpdateRulesetRequest {
  rulesetId: string;
  /** Path param: The Account ID to use for this endpoint. Mutually exclusive with the Zone ID. */
  accountId?: string;
  /** Path param: The Zone ID to use for this endpoint. Mutually exclusive with the Account ID. */
  zoneId?: string;
  /** Body param: An informative description of the ruleset. */
  description?: string;
  /** Body param: The kind of the ruleset. */
  kind?: "zone" | "managed" | "custom" | "root";
  /** Body param: The human-readable name of the ruleset. */
  name?: string;
  /** Body param: The phase of the ruleset. */
  phase?:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** Body param: The list of rules in the ruleset. */
  rules?: (
    | unknown
    | {
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
    | {
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: unknown;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string;
          mitigationTimeout?: number;
          requestsPerPeriod?: number;
          requestsToOrigin?: boolean;
          scorePerPeriod?: number;
          scoreResponseHeaderName?: string;
        };
        ref?: string;
      }
  )[];
}

export const UpdateRulesetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  description: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.Literals(["zone", "managed", "custom", "root"])),
  name: Schema.optional(Schema.String),
  phase: Schema.optional(
    Schema.Literals([
      "ddos_l4",
      "ddos_l7",
      "http_config_settings",
      "http_custom_errors",
      "http_log_custom_fields",
      "http_ratelimit",
      "http_request_cache_settings",
      "http_request_dynamic_redirect",
      "http_request_firewall_custom",
      "http_request_firewall_managed",
      "http_request_late_transform",
      "http_request_origin",
      "http_request_redirect",
      "http_request_sanitize",
      "http_request_sbfm",
      "http_request_transform",
      "http_response_compression",
      "http_response_firewall_managed",
      "http_response_headers_transform",
      "magic_transit",
      "magic_transit_ids_managed",
      "magic_transit_managed",
      "magic_transit_ratelimit",
    ]),
  ),
  rules: Schema.optional(
    Schema.Array(
      Schema.Union([
        Schema.Unknown,
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
        Schema.Struct({
          id: Schema.optional(Schema.String),
          action: Schema.optional(Schema.Literal("js_challenge")),
          actionParameters: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.String),
          enabled: Schema.optional(Schema.Boolean),
          exposedCredentialCheck: Schema.optional(
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
          ),
          expression: Schema.optional(Schema.String),
          logging: Schema.optional(Schema.Unknown),
          ratelimit: Schema.optional(
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(Schema.String),
              mitigationTimeout: Schema.optional(Schema.Number),
              requestsPerPeriod: Schema.optional(Schema.Number),
              requestsToOrigin: Schema.optional(Schema.Boolean),
              scorePerPeriod: Schema.optional(Schema.Number),
              scoreResponseHeaderName: Schema.optional(Schema.String),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
          ),
          ref: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            action: "action",
            actionParameters: "action_parameters",
            description: "description",
            enabled: "enabled",
            exposedCredentialCheck: "exposed_credential_check",
            expression: "expression",
            logging: "logging",
            ratelimit: "ratelimit",
            ref: "ref",
          }),
        ),
      ]),
    ),
  ),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}",
  }),
) as unknown as Schema.Schema<UpdateRulesetRequest>;

export interface UpdateRulesetResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const UpdateRulesetResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<UpdateRulesetResponse>;

export type UpdateRulesetError = DefaultErrors;

export const updateRuleset: API.OperationMethod<
  UpdateRulesetRequest,
  UpdateRulesetResponse,
  UpdateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateRulesetRequest,
  output: UpdateRulesetResponse,
  errors: [],
}));

export interface DeleteRulesetRequest {
  rulesetId: string;
}

export const DeleteRulesetRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}",
  }),
) as unknown as Schema.Schema<DeleteRulesetRequest>;

export type DeleteRulesetResponse = unknown;

export const DeleteRulesetResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteRulesetResponse>;

export type DeleteRulesetError = DefaultErrors;

export const deleteRuleset: API.OperationMethod<
  DeleteRulesetRequest,
  DeleteRulesetResponse,
  DeleteRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRulesetRequest,
  output: DeleteRulesetResponse,
  errors: [],
}));

// =============================================================================
// Version
// =============================================================================

export interface GetVersionRequest {
  rulesetId: string;
  rulesetVersion: string;
}

export const GetVersionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  rulesetVersion: Schema.String.pipe(T.HttpPath("rulesetVersion")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/versions/{rulesetVersion}",
  }),
) as unknown as Schema.Schema<GetVersionRequest>;

export interface GetVersionResponse {
  /** The unique ID of the ruleset. */
  id: string;
  /** The kind of the ruleset. */
  kind: "zone" | "managed" | "custom" | "root";
  /** The timestamp of when the ruleset was last modified. */
  lastUpdated: string;
  /** The human-readable name of the ruleset. */
  name: string;
  /** The phase of the ruleset. */
  phase:
    | "ddos_l4"
    | "ddos_l7"
    | "http_config_settings"
    | "http_custom_errors"
    | "http_log_custom_fields"
    | "http_ratelimit"
    | "http_request_cache_settings"
    | "http_request_dynamic_redirect"
    | "http_request_firewall_custom"
    | "http_request_firewall_managed"
    | "http_request_late_transform"
    | "http_request_origin"
    | "http_request_redirect"
    | "http_request_sanitize"
    | "http_request_sbfm"
    | "http_request_transform"
    | "http_response_compression"
    | "http_response_firewall_managed"
    | "http_response_headers_transform"
    | "magic_transit"
    | "magic_transit_ids_managed"
    | "magic_transit_managed"
    | "magic_transit_ratelimit";
  /** The list of rules in the ruleset. */
  rules: (
    | unknown
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
    | {
        lastUpdated: string;
        version: string;
        id?: string | null;
        action?: "js_challenge" | null;
        actionParameters?: unknown | null;
        categories?: string[] | null;
        description?: string | null;
        enabled?: boolean | null;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        } | null;
        expression?: string | null;
        logging?: unknown | null;
        ratelimit?: {
          characteristics: string[];
          period: number;
          countingExpression?: string | null;
          mitigationTimeout?: number | null;
          requestsPerPeriod?: number | null;
          requestsToOrigin?: boolean | null;
          scorePerPeriod?: number | null;
          scoreResponseHeaderName?: string | null;
        } | null;
        ref?: string | null;
      }
  )[];
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string | null;
}

export const GetVersionResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  kind: Schema.Literals(["zone", "managed", "custom", "root"]),
  lastUpdated: Schema.String,
  name: Schema.String,
  phase: Schema.Literals([
    "ddos_l4",
    "ddos_l7",
    "http_config_settings",
    "http_custom_errors",
    "http_log_custom_fields",
    "http_ratelimit",
    "http_request_cache_settings",
    "http_request_dynamic_redirect",
    "http_request_firewall_custom",
    "http_request_firewall_managed",
    "http_request_late_transform",
    "http_request_origin",
    "http_request_redirect",
    "http_request_sanitize",
    "http_request_sbfm",
    "http_request_transform",
    "http_response_compression",
    "http_response_firewall_managed",
    "http_response_headers_transform",
    "magic_transit",
    "magic_transit_ids_managed",
    "magic_transit_managed",
    "magic_transit_ratelimit",
  ]),
  rules: Schema.Array(
    Schema.Union([
      Schema.Unknown,
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
      Schema.Struct({
        lastUpdated: Schema.String,
        version: Schema.String,
        id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        action: Schema.optional(
          Schema.Union([Schema.Literal("js_challenge"), Schema.Null]),
        ),
        actionParameters: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        categories: Schema.optional(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        description: Schema.optional(
          Schema.Union([Schema.String, Schema.Null]),
        ),
        enabled: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
        exposedCredentialCheck: Schema.optional(
          Schema.Union([
            Schema.Struct({
              passwordExpression: SensitiveString,
              usernameExpression: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                passwordExpression: "password_expression",
                usernameExpression: "username_expression",
              }),
            ),
            Schema.Null,
          ]),
        ),
        expression: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
        logging: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        ratelimit: Schema.optional(
          Schema.Union([
            Schema.Struct({
              characteristics: Schema.Array(Schema.String),
              period: Schema.Number,
              countingExpression: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
              mitigationTimeout: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsPerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              requestsToOrigin: Schema.optional(
                Schema.Union([Schema.Boolean, Schema.Null]),
              ),
              scorePerPeriod: Schema.optional(
                Schema.Union([Schema.Number, Schema.Null]),
              ),
              scoreResponseHeaderName: Schema.optional(
                Schema.Union([Schema.String, Schema.Null]),
              ),
            }).pipe(
              Schema.encodeKeys({
                characteristics: "characteristics",
                period: "period",
                countingExpression: "counting_expression",
                mitigationTimeout: "mitigation_timeout",
                requestsPerPeriod: "requests_per_period",
                requestsToOrigin: "requests_to_origin",
                scorePerPeriod: "score_per_period",
                scoreResponseHeaderName: "score_response_header_name",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ref: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          lastUpdated: "last_updated",
          version: "version",
          id: "id",
          action: "action",
          actionParameters: "action_parameters",
          categories: "categories",
          description: "description",
          enabled: "enabled",
          exposedCredentialCheck: "exposed_credential_check",
          expression: "expression",
          logging: "logging",
          ratelimit: "ratelimit",
          ref: "ref",
        }),
      ),
    ]),
  ),
  version: Schema.String,
  description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
})
  .pipe(
    Schema.encodeKeys({
      id: "id",
      kind: "kind",
      lastUpdated: "last_updated",
      name: "name",
      phase: "phase",
      rules: "rules",
      version: "version",
      description: "description",
    }),
  )
  .pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetVersionResponse>;

export type GetVersionError = DefaultErrors;

export const getVersion: API.OperationMethod<
  GetVersionRequest,
  GetVersionResponse,
  GetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVersionRequest,
  output: GetVersionResponse,
  errors: [],
}));

export interface ListVersionsRequest {
  rulesetId: string;
}

export const ListVersionsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/versions",
  }),
) as unknown as Schema.Schema<ListVersionsRequest>;

export interface ListVersionsResponse {
  result: {
    id: string;
    kind: "zone" | "managed" | "custom" | "root";
    lastUpdated: string;
    name: string;
    phase:
      | "ddos_l4"
      | "ddos_l7"
      | "http_config_settings"
      | "http_custom_errors"
      | "http_log_custom_fields"
      | "http_ratelimit"
      | "http_request_cache_settings"
      | "http_request_dynamic_redirect"
      | "http_request_firewall_custom"
      | "http_request_firewall_managed"
      | "http_request_late_transform"
      | "http_request_origin"
      | "http_request_redirect"
      | "http_request_sanitize"
      | "http_request_sbfm"
      | "http_request_transform"
      | "http_response_compression"
      | "http_response_firewall_managed"
      | "http_response_headers_transform"
      | "magic_transit"
      | "magic_transit_ids_managed"
      | "magic_transit_managed"
      | "magic_transit_ratelimit";
    version: string;
    description?: string | null;
  }[];
}

export const ListVersionsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      kind: Schema.Literals(["zone", "managed", "custom", "root"]),
      lastUpdated: Schema.String,
      name: Schema.String,
      phase: Schema.Literals([
        "ddos_l4",
        "ddos_l7",
        "http_config_settings",
        "http_custom_errors",
        "http_log_custom_fields",
        "http_ratelimit",
        "http_request_cache_settings",
        "http_request_dynamic_redirect",
        "http_request_firewall_custom",
        "http_request_firewall_managed",
        "http_request_late_transform",
        "http_request_origin",
        "http_request_redirect",
        "http_request_sanitize",
        "http_request_sbfm",
        "http_request_transform",
        "http_response_compression",
        "http_response_firewall_managed",
        "http_response_headers_transform",
        "magic_transit",
        "magic_transit_ids_managed",
        "magic_transit_managed",
        "magic_transit_ratelimit",
      ]),
      version: Schema.String,
      description: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(
      Schema.encodeKeys({
        id: "id",
        kind: "kind",
        lastUpdated: "last_updated",
        name: "name",
        phase: "phase",
        version: "version",
        description: "description",
      }),
    ),
  ),
}) as unknown as Schema.Schema<ListVersionsResponse>;

export type ListVersionsError = DefaultErrors;

export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListVersionsRequest,
  ) => stream.Stream<
    ListVersionsResponse,
    ListVersionsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListVersionsRequest) => stream.Stream<
    {
      id: string;
      kind: "zone" | "managed" | "custom" | "root";
      lastUpdated: string;
      name: string;
      phase:
        | "ddos_l4"
        | "ddos_l7"
        | "http_config_settings"
        | "http_custom_errors"
        | "http_log_custom_fields"
        | "http_ratelimit"
        | "http_request_cache_settings"
        | "http_request_dynamic_redirect"
        | "http_request_firewall_custom"
        | "http_request_firewall_managed"
        | "http_request_late_transform"
        | "http_request_origin"
        | "http_request_redirect"
        | "http_request_sanitize"
        | "http_request_sbfm"
        | "http_request_transform"
        | "http_response_compression"
        | "http_response_firewall_managed"
        | "http_response_headers_transform"
        | "magic_transit"
        | "magic_transit_ids_managed"
        | "magic_transit_managed"
        | "magic_transit_ratelimit";
      version: string;
      description?: string | null;
    },
    ListVersionsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
}));

export interface DeleteVersionRequest {
  rulesetId: string;
  rulesetVersion: string;
}

export const DeleteVersionRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
  rulesetVersion: Schema.String.pipe(T.HttpPath("rulesetVersion")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/versions/{rulesetVersion}",
  }),
) as unknown as Schema.Schema<DeleteVersionRequest>;

export type DeleteVersionResponse = unknown;

export const DeleteVersionResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<DeleteVersionResponse>;

export type DeleteVersionError = DefaultErrors;

export const deleteVersion: API.OperationMethod<
  DeleteVersionRequest,
  DeleteVersionResponse,
  DeleteVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVersionRequest,
  output: DeleteVersionResponse,
  errors: [],
}));
