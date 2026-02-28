/**
 * Cloudflare RULESETS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service rulesets
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
// Pha
// =============================================================================

export interface GetPhasRequest {}

export const GetPhasRequest = Schema.Struct({}).pipe(
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const GetPhasResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetPhasResponse>;

export type GetPhasError = CommonErrors;

export const getPhas: API.OperationMethod<
  GetPhasRequest,
  GetPhasResponse,
  GetPhasError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const PutPhasRequest = Schema.Struct({
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
              passwordExpression: Schema.String,
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
              passwordExpression: Schema.String,
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const PutPhasResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<PutPhasResponse>;

export type PutPhasError = CommonErrors;

export const putPhas: API.OperationMethod<
  PutPhasRequest,
  PutPhasResponse,
  PutPhasError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetPhasVersionRequest = Schema.Struct({
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const GetPhasVersionResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetPhasVersionResponse>;

export type GetPhasVersionError = CommonErrors;

export const getPhasVersion: API.OperationMethod<
  GetPhasVersionRequest,
  GetPhasVersionResponse,
  GetPhasVersionError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPhasVersionRequest,
  output: GetPhasVersionResponse,
  errors: [],
}));

export interface ListPhasVersionsRequest {}

export const ListPhasVersionsRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/phases/{rulesetPhase}/entrypoint/versions",
  }),
) as unknown as Schema.Schema<ListPhasVersionsRequest>;

export type ListPhasVersionsResponse = {
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
  description?: string;
}[];

export const ListPhasVersionsResponse = Schema.Array(
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
    description: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListPhasVersionsResponse>;

export type ListPhasVersionsError = CommonErrors;

export const listPhasVersions: API.OperationMethod<
  ListPhasVersionsRequest,
  ListPhasVersionsResponse,
  ListPhasVersionsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListPhasVersionsRequest,
  output: ListPhasVersionsResponse,
  errors: [],
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

export const CreateRuleRequest = Schema.Struct({
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
      passwordExpression: Schema.String,
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "block";
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "compress_response";
        actionParameters?: {
          algorithms: {
            name?: "none" | "auto" | "default" | "gzip" | "brotli" | "zstd";
          }[];
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "ddos_dynamic";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "execute";
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string };
          overrides?: {
            action?: string;
            categories?: {
              category: string;
              action?: string;
              enabled?: boolean;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            enabled?: boolean;
            rules?: {
              id: string;
              action?: string;
              enabled?: boolean;
              scoreThreshold?: number;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            sensitivityLevel?: "default" | "medium" | "low" | "eoff";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "force_connection_close";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log_custom_field";
        actionParameters?: {
          cookieFields?: { name: string }[];
          rawResponseFields?: { name: string; preserveDuplicates?: boolean }[];
          requestFields?: { name: string }[];
          responseFields?: { name: string; preserveDuplicates?: boolean }[];
          transformedRequestFields?: { name: string }[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "managed_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "redirect";
        actionParameters?: {
          fromList?: { key: string; name: string };
          fromValue?: {
            targetUrl: { expression?: string; value?: string };
            preserveQueryString?: boolean;
            statusCode?: "301" | "302" | "303" | "307" | "308";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "rewrite";
        actionParameters?: {
          headers?: Record<string, unknown>;
          uri?:
            | { path: { expression?: string; value?: string } }
            | { query: { expression?: string; value?: string } };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "route";
        actionParameters?: {
          hostHeader?: string;
          origin?: { host?: string; port?: number };
          sni?: { value: string };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "score";
        actionParameters?: { increment: number };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "serve_error";
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "set_cache_settings";
        actionParameters?: {
          additionalCacheablePorts?: number[];
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number;
          };
          cache?: boolean;
          cacheKey?: {
            cacheByDeviceType?: boolean;
            cacheDeceptionArmor?: boolean;
            customKey?: {
              cookie?: { checkPresence?: string[]; include?: string[] };
              header?: {
                checkPresence?: string[];
                contains?: Record<string, unknown>;
                excludeOrigin?: boolean;
                include?: string[];
              };
              host?: { resolved?: boolean };
              queryString?: {
                exclude?: { all?: true; list?: string[] };
                include?: { all?: true; list?: string[] };
              };
              user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
            };
            ignoreQueryStringsOrder?: boolean;
          };
          cacheReserve?: { eligible: boolean; minimumFileSize?: number };
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number;
            statusCodeTtl?: {
              value: number;
              statusCode?: number;
              statusCodeRange?: { from?: number; to?: number };
            }[];
          };
          originCacheControl?: boolean;
          originErrorPagePassthru?: boolean;
          readTimeout?: number;
          respectStrongEtags?: boolean;
          serveStale?: { disableStaleWhileUpdating?: boolean };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "set_config";
        actionParameters?: {
          automaticHttpsRewrites?: boolean;
          autominify?: { css?: boolean; html?: boolean; js?: boolean };
          bic?: boolean;
          disableApps?: true;
          disablePayPerCrawl?: true;
          disableRum?: true;
          disableZaraz?: true;
          emailObfuscation?: boolean;
          fonts?: boolean;
          hotlinkProtection?: boolean;
          mirage?: boolean;
          opportunisticEncryption?: boolean;
          polish?: "off" | "lossless" | "lossy" | "webp";
          requestBodyBuffering?: "none" | "standard" | "full";
          responseBodyBuffering?: "none" | "standard";
          rocketLoader?: boolean;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack";
          serverSideExcludes?: boolean;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull";
          sxg?: boolean;
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "skip";
        actionParameters?: {
          phase?: "current";
          phases?: (
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
          )[];
          products?: (
            | "bic"
            | "hot"
            | "rateLimit"
            | "securityLevel"
            | "uaBlock"
            | "waf"
            | "zoneLockdown"
          )[];
          rules?: Record<string, unknown>;
          ruleset?: "current";
          rulesets?: string[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const CreateRuleResponse = Schema.Struct({
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
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
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("compress_response")),
        actionParameters: Schema.optional(
          Schema.Struct({
            algorithms: Schema.Array(
              Schema.Struct({
                name: Schema.optional(
                  Schema.Literals([
                    "none",
                    "auto",
                    "default",
                    "gzip",
                    "brotli",
                    "zstd",
                  ]),
                ),
              }),
            ),
          }),
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("ddos_dynamic")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("execute")),
        actionParameters: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            matchedData: Schema.optional(
              Schema.Struct({
                publicKey: Schema.String,
              }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
            ),
            overrides: Schema.optional(
              Schema.Struct({
                action: Schema.optional(Schema.String),
                categories: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      category: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                enabled: Schema.optional(Schema.Boolean),
                rules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      scoreThreshold: Schema.optional(Schema.Number),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                sensitivityLevel: Schema.optional(
                  Schema.Literals(["default", "medium", "low", "eoff"]),
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
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              matchedData: "matched_data",
              overrides: "overrides",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("force_connection_close")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log_custom_field")),
        actionParameters: Schema.optional(
          Schema.Struct({
            cookieFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            rawResponseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            requestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            responseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            transformedRequestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("managed_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("redirect")),
        actionParameters: Schema.optional(
          Schema.Struct({
            fromList: Schema.optional(
              Schema.Struct({
                key: Schema.String,
                name: Schema.String,
              }),
            ),
            fromValue: Schema.optional(
              Schema.Struct({
                targetUrl: Schema.Struct({
                  expression: Schema.optional(Schema.String),
                  value: Schema.optional(Schema.String),
                }),
                preserveQueryString: Schema.optional(Schema.Boolean),
                statusCode: Schema.optional(
                  Schema.Literals(["301", "302", "303", "307", "308"]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  targetUrl: "target_url",
                  preserveQueryString: "preserve_query_string",
                  statusCode: "status_code",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              fromList: "from_list",
              fromValue: "from_value",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("rewrite")),
        actionParameters: Schema.optional(
          Schema.Struct({
            headers: Schema.optional(Schema.Struct({})),
            uri: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  path: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
                Schema.Struct({
                  query: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
              ]),
            ),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("route")),
        actionParameters: Schema.optional(
          Schema.Struct({
            hostHeader: Schema.optional(Schema.String),
            origin: Schema.optional(
              Schema.Struct({
                host: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
              }),
            ),
            sni: Schema.optional(
              Schema.Struct({
                value: Schema.String,
              }),
            ),
          }).pipe(
            Schema.encodeKeys({
              hostHeader: "host_header",
              origin: "origin",
              sni: "sni",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("score")),
        actionParameters: Schema.optional(
          Schema.Struct({
            increment: Schema.Number,
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("serve_error")),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              content: Schema.String,
              contentType: Schema.optional(
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
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
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                assetName: "asset_name",
                contentType: "content_type",
                statusCode: "status_code",
              }),
            ),
          ]),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_cache_settings")),
        actionParameters: Schema.optional(
          Schema.Struct({
            additionalCacheablePorts: Schema.optional(
              Schema.Array(Schema.Number),
            ),
            browserTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                  "bypass",
                ]),
                default: Schema.optional(Schema.Number),
              }),
            ),
            cache: Schema.optional(Schema.Boolean),
            cacheKey: Schema.optional(
              Schema.Struct({
                cacheByDeviceType: Schema.optional(Schema.Boolean),
                cacheDeceptionArmor: Schema.optional(Schema.Boolean),
                customKey: Schema.optional(
                  Schema.Struct({
                    cookie: Schema.optional(
                      Schema.Struct({
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
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
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        contains: Schema.optional(Schema.Struct({})),
                        excludeOrigin: Schema.optional(Schema.Boolean),
                        include: Schema.optional(Schema.Array(Schema.String)),
                      }).pipe(
                        Schema.encodeKeys({
                          checkPresence: "check_presence",
                          contains: "contains",
                          excludeOrigin: "exclude_origin",
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
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
                        ),
                        include: Schema.optional(
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
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
                ignoreQueryStringsOrder: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  cacheByDeviceType: "cache_by_device_type",
                  cacheDeceptionArmor: "cache_deception_armor",
                  customKey: "custom_key",
                  ignoreQueryStringsOrder: "ignore_query_strings_order",
                }),
              ),
            ),
            cacheReserve: Schema.optional(
              Schema.Struct({
                eligible: Schema.Boolean,
                minimumFileSize: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  eligible: "eligible",
                  minimumFileSize: "minimum_file_size",
                }),
              ),
            ),
            edgeTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                ]),
                default: Schema.optional(Schema.Number),
                statusCodeTtl: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      value: Schema.Number,
                      statusCode: Schema.optional(Schema.Number),
                      statusCodeRange: Schema.optional(
                        Schema.Struct({
                          from: Schema.optional(Schema.Number),
                          to: Schema.optional(Schema.Number),
                        }),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        value: "value",
                        statusCode: "status_code",
                        statusCodeRange: "status_code_range",
                      }),
                    ),
                  ),
                ),
              }).pipe(
                Schema.encodeKeys({
                  mode: "mode",
                  default: "default",
                  statusCodeTtl: "status_code_ttl",
                }),
              ),
            ),
            originCacheControl: Schema.optional(Schema.Boolean),
            originErrorPagePassthru: Schema.optional(Schema.Boolean),
            readTimeout: Schema.optional(Schema.Number),
            respectStrongEtags: Schema.optional(Schema.Boolean),
            serveStale: Schema.optional(
              Schema.Struct({
                disableStaleWhileUpdating: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  disableStaleWhileUpdating: "disable_stale_while_updating",
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_config")),
        actionParameters: Schema.optional(
          Schema.Struct({
            automaticHttpsRewrites: Schema.optional(Schema.Boolean),
            autominify: Schema.optional(
              Schema.Struct({
                css: Schema.optional(Schema.Boolean),
                html: Schema.optional(Schema.Boolean),
                js: Schema.optional(Schema.Boolean),
              }),
            ),
            bic: Schema.optional(Schema.Boolean),
            disableApps: Schema.optional(Schema.Literal(true)),
            disablePayPerCrawl: Schema.optional(Schema.Literal(true)),
            disableRum: Schema.optional(Schema.Literal(true)),
            disableZaraz: Schema.optional(Schema.Literal(true)),
            emailObfuscation: Schema.optional(Schema.Boolean),
            fonts: Schema.optional(Schema.Boolean),
            hotlinkProtection: Schema.optional(Schema.Boolean),
            mirage: Schema.optional(Schema.Boolean),
            opportunisticEncryption: Schema.optional(Schema.Boolean),
            polish: Schema.optional(
              Schema.Literals(["off", "lossless", "lossy", "webp"]),
            ),
            requestBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard", "full"]),
            ),
            responseBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard"]),
            ),
            rocketLoader: Schema.optional(Schema.Boolean),
            securityLevel: Schema.optional(
              Schema.Literals([
                "off",
                "essentially_off",
                "low",
                "medium",
                "high",
                "under_attack",
              ]),
            ),
            serverSideExcludes: Schema.optional(Schema.Boolean),
            ssl: Schema.optional(
              Schema.Literals([
                "off",
                "flexible",
                "full",
                "strict",
                "origin_pull",
              ]),
            ),
            sxg: Schema.optional(Schema.Boolean),
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
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("skip")),
        actionParameters: Schema.optional(
          Schema.Struct({
            phase: Schema.optional(Schema.Literal("current")),
            phases: Schema.optional(
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
            ),
            products: Schema.optional(
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
            ),
            rules: Schema.optional(Schema.Struct({})),
            ruleset: Schema.optional(Schema.Literal("current")),
            rulesets: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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

export const PatchRuleRequest = Schema.Struct({
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
      passwordExpression: Schema.String,
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "block";
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "compress_response";
        actionParameters?: {
          algorithms: {
            name?: "none" | "auto" | "default" | "gzip" | "brotli" | "zstd";
          }[];
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "ddos_dynamic";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "execute";
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string };
          overrides?: {
            action?: string;
            categories?: {
              category: string;
              action?: string;
              enabled?: boolean;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            enabled?: boolean;
            rules?: {
              id: string;
              action?: string;
              enabled?: boolean;
              scoreThreshold?: number;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            sensitivityLevel?: "default" | "medium" | "low" | "eoff";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "force_connection_close";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log_custom_field";
        actionParameters?: {
          cookieFields?: { name: string }[];
          rawResponseFields?: { name: string; preserveDuplicates?: boolean }[];
          requestFields?: { name: string }[];
          responseFields?: { name: string; preserveDuplicates?: boolean }[];
          transformedRequestFields?: { name: string }[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "managed_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "redirect";
        actionParameters?: {
          fromList?: { key: string; name: string };
          fromValue?: {
            targetUrl: { expression?: string; value?: string };
            preserveQueryString?: boolean;
            statusCode?: "301" | "302" | "303" | "307" | "308";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "rewrite";
        actionParameters?: {
          headers?: Record<string, unknown>;
          uri?:
            | { path: { expression?: string; value?: string } }
            | { query: { expression?: string; value?: string } };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "route";
        actionParameters?: {
          hostHeader?: string;
          origin?: { host?: string; port?: number };
          sni?: { value: string };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "score";
        actionParameters?: { increment: number };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "serve_error";
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "set_cache_settings";
        actionParameters?: {
          additionalCacheablePorts?: number[];
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number;
          };
          cache?: boolean;
          cacheKey?: {
            cacheByDeviceType?: boolean;
            cacheDeceptionArmor?: boolean;
            customKey?: {
              cookie?: { checkPresence?: string[]; include?: string[] };
              header?: {
                checkPresence?: string[];
                contains?: Record<string, unknown>;
                excludeOrigin?: boolean;
                include?: string[];
              };
              host?: { resolved?: boolean };
              queryString?: {
                exclude?: { all?: true; list?: string[] };
                include?: { all?: true; list?: string[] };
              };
              user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
            };
            ignoreQueryStringsOrder?: boolean;
          };
          cacheReserve?: { eligible: boolean; minimumFileSize?: number };
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number;
            statusCodeTtl?: {
              value: number;
              statusCode?: number;
              statusCodeRange?: { from?: number; to?: number };
            }[];
          };
          originCacheControl?: boolean;
          originErrorPagePassthru?: boolean;
          readTimeout?: number;
          respectStrongEtags?: boolean;
          serveStale?: { disableStaleWhileUpdating?: boolean };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "set_config";
        actionParameters?: {
          automaticHttpsRewrites?: boolean;
          autominify?: { css?: boolean; html?: boolean; js?: boolean };
          bic?: boolean;
          disableApps?: true;
          disablePayPerCrawl?: true;
          disableRum?: true;
          disableZaraz?: true;
          emailObfuscation?: boolean;
          fonts?: boolean;
          hotlinkProtection?: boolean;
          mirage?: boolean;
          opportunisticEncryption?: boolean;
          polish?: "off" | "lossless" | "lossy" | "webp";
          requestBodyBuffering?: "none" | "standard" | "full";
          responseBodyBuffering?: "none" | "standard";
          rocketLoader?: boolean;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack";
          serverSideExcludes?: boolean;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull";
          sxg?: boolean;
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "skip";
        actionParameters?: {
          phase?: "current";
          phases?: (
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
          )[];
          products?: (
            | "bic"
            | "hot"
            | "rateLimit"
            | "securityLevel"
            | "uaBlock"
            | "waf"
            | "zoneLockdown"
          )[];
          rules?: Record<string, unknown>;
          ruleset?: "current";
          rulesets?: string[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const PatchRuleResponse = Schema.Struct({
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
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
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("compress_response")),
        actionParameters: Schema.optional(
          Schema.Struct({
            algorithms: Schema.Array(
              Schema.Struct({
                name: Schema.optional(
                  Schema.Literals([
                    "none",
                    "auto",
                    "default",
                    "gzip",
                    "brotli",
                    "zstd",
                  ]),
                ),
              }),
            ),
          }),
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("ddos_dynamic")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("execute")),
        actionParameters: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            matchedData: Schema.optional(
              Schema.Struct({
                publicKey: Schema.String,
              }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
            ),
            overrides: Schema.optional(
              Schema.Struct({
                action: Schema.optional(Schema.String),
                categories: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      category: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                enabled: Schema.optional(Schema.Boolean),
                rules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      scoreThreshold: Schema.optional(Schema.Number),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                sensitivityLevel: Schema.optional(
                  Schema.Literals(["default", "medium", "low", "eoff"]),
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
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              matchedData: "matched_data",
              overrides: "overrides",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("force_connection_close")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log_custom_field")),
        actionParameters: Schema.optional(
          Schema.Struct({
            cookieFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            rawResponseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            requestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            responseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            transformedRequestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("managed_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("redirect")),
        actionParameters: Schema.optional(
          Schema.Struct({
            fromList: Schema.optional(
              Schema.Struct({
                key: Schema.String,
                name: Schema.String,
              }),
            ),
            fromValue: Schema.optional(
              Schema.Struct({
                targetUrl: Schema.Struct({
                  expression: Schema.optional(Schema.String),
                  value: Schema.optional(Schema.String),
                }),
                preserveQueryString: Schema.optional(Schema.Boolean),
                statusCode: Schema.optional(
                  Schema.Literals(["301", "302", "303", "307", "308"]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  targetUrl: "target_url",
                  preserveQueryString: "preserve_query_string",
                  statusCode: "status_code",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              fromList: "from_list",
              fromValue: "from_value",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("rewrite")),
        actionParameters: Schema.optional(
          Schema.Struct({
            headers: Schema.optional(Schema.Struct({})),
            uri: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  path: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
                Schema.Struct({
                  query: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
              ]),
            ),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("route")),
        actionParameters: Schema.optional(
          Schema.Struct({
            hostHeader: Schema.optional(Schema.String),
            origin: Schema.optional(
              Schema.Struct({
                host: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
              }),
            ),
            sni: Schema.optional(
              Schema.Struct({
                value: Schema.String,
              }),
            ),
          }).pipe(
            Schema.encodeKeys({
              hostHeader: "host_header",
              origin: "origin",
              sni: "sni",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("score")),
        actionParameters: Schema.optional(
          Schema.Struct({
            increment: Schema.Number,
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("serve_error")),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              content: Schema.String,
              contentType: Schema.optional(
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
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
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                assetName: "asset_name",
                contentType: "content_type",
                statusCode: "status_code",
              }),
            ),
          ]),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_cache_settings")),
        actionParameters: Schema.optional(
          Schema.Struct({
            additionalCacheablePorts: Schema.optional(
              Schema.Array(Schema.Number),
            ),
            browserTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                  "bypass",
                ]),
                default: Schema.optional(Schema.Number),
              }),
            ),
            cache: Schema.optional(Schema.Boolean),
            cacheKey: Schema.optional(
              Schema.Struct({
                cacheByDeviceType: Schema.optional(Schema.Boolean),
                cacheDeceptionArmor: Schema.optional(Schema.Boolean),
                customKey: Schema.optional(
                  Schema.Struct({
                    cookie: Schema.optional(
                      Schema.Struct({
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
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
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        contains: Schema.optional(Schema.Struct({})),
                        excludeOrigin: Schema.optional(Schema.Boolean),
                        include: Schema.optional(Schema.Array(Schema.String)),
                      }).pipe(
                        Schema.encodeKeys({
                          checkPresence: "check_presence",
                          contains: "contains",
                          excludeOrigin: "exclude_origin",
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
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
                        ),
                        include: Schema.optional(
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
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
                ignoreQueryStringsOrder: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  cacheByDeviceType: "cache_by_device_type",
                  cacheDeceptionArmor: "cache_deception_armor",
                  customKey: "custom_key",
                  ignoreQueryStringsOrder: "ignore_query_strings_order",
                }),
              ),
            ),
            cacheReserve: Schema.optional(
              Schema.Struct({
                eligible: Schema.Boolean,
                minimumFileSize: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  eligible: "eligible",
                  minimumFileSize: "minimum_file_size",
                }),
              ),
            ),
            edgeTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                ]),
                default: Schema.optional(Schema.Number),
                statusCodeTtl: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      value: Schema.Number,
                      statusCode: Schema.optional(Schema.Number),
                      statusCodeRange: Schema.optional(
                        Schema.Struct({
                          from: Schema.optional(Schema.Number),
                          to: Schema.optional(Schema.Number),
                        }),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        value: "value",
                        statusCode: "status_code",
                        statusCodeRange: "status_code_range",
                      }),
                    ),
                  ),
                ),
              }).pipe(
                Schema.encodeKeys({
                  mode: "mode",
                  default: "default",
                  statusCodeTtl: "status_code_ttl",
                }),
              ),
            ),
            originCacheControl: Schema.optional(Schema.Boolean),
            originErrorPagePassthru: Schema.optional(Schema.Boolean),
            readTimeout: Schema.optional(Schema.Number),
            respectStrongEtags: Schema.optional(Schema.Boolean),
            serveStale: Schema.optional(
              Schema.Struct({
                disableStaleWhileUpdating: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  disableStaleWhileUpdating: "disable_stale_while_updating",
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_config")),
        actionParameters: Schema.optional(
          Schema.Struct({
            automaticHttpsRewrites: Schema.optional(Schema.Boolean),
            autominify: Schema.optional(
              Schema.Struct({
                css: Schema.optional(Schema.Boolean),
                html: Schema.optional(Schema.Boolean),
                js: Schema.optional(Schema.Boolean),
              }),
            ),
            bic: Schema.optional(Schema.Boolean),
            disableApps: Schema.optional(Schema.Literal(true)),
            disablePayPerCrawl: Schema.optional(Schema.Literal(true)),
            disableRum: Schema.optional(Schema.Literal(true)),
            disableZaraz: Schema.optional(Schema.Literal(true)),
            emailObfuscation: Schema.optional(Schema.Boolean),
            fonts: Schema.optional(Schema.Boolean),
            hotlinkProtection: Schema.optional(Schema.Boolean),
            mirage: Schema.optional(Schema.Boolean),
            opportunisticEncryption: Schema.optional(Schema.Boolean),
            polish: Schema.optional(
              Schema.Literals(["off", "lossless", "lossy", "webp"]),
            ),
            requestBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard", "full"]),
            ),
            responseBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard"]),
            ),
            rocketLoader: Schema.optional(Schema.Boolean),
            securityLevel: Schema.optional(
              Schema.Literals([
                "off",
                "essentially_off",
                "low",
                "medium",
                "high",
                "under_attack",
              ]),
            ),
            serverSideExcludes: Schema.optional(Schema.Boolean),
            ssl: Schema.optional(
              Schema.Literals([
                "off",
                "flexible",
                "full",
                "strict",
                "origin_pull",
              ]),
            ),
            sxg: Schema.optional(Schema.Boolean),
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
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("skip")),
        actionParameters: Schema.optional(
          Schema.Struct({
            phase: Schema.optional(Schema.Literal("current")),
            phases: Schema.optional(
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
            ),
            products: Schema.optional(
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
            ),
            rules: Schema.optional(Schema.Struct({})),
            ruleset: Schema.optional(Schema.Literal("current")),
            rulesets: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<PatchRuleResponse>;

export type PatchRuleError = CommonErrors;

export const patchRule: API.OperationMethod<
  PatchRuleRequest,
  PatchRuleResponse,
  PatchRuleError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchRuleRequest,
  output: PatchRuleResponse,
  errors: [],
}));

export interface DeleteRuleRequest {
  rulesetId: string;
  ruleId: string;
}

export const DeleteRuleRequest = Schema.Struct({
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "block";
        actionParameters?: {
          response?: {
            content: string;
            contentType: string;
            statusCode: number;
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "compress_response";
        actionParameters?: {
          algorithms: {
            name?: "none" | "auto" | "default" | "gzip" | "brotli" | "zstd";
          }[];
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "ddos_dynamic";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "execute";
        actionParameters?: {
          id: string;
          matchedData?: { publicKey: string };
          overrides?: {
            action?: string;
            categories?: {
              category: string;
              action?: string;
              enabled?: boolean;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            enabled?: boolean;
            rules?: {
              id: string;
              action?: string;
              enabled?: boolean;
              scoreThreshold?: number;
              sensitivityLevel?: "default" | "medium" | "low" | "eoff";
            }[];
            sensitivityLevel?: "default" | "medium" | "low" | "eoff";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "force_connection_close";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "log_custom_field";
        actionParameters?: {
          cookieFields?: { name: string }[];
          rawResponseFields?: { name: string; preserveDuplicates?: boolean }[];
          requestFields?: { name: string }[];
          responseFields?: { name: string; preserveDuplicates?: boolean }[];
          transformedRequestFields?: { name: string }[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "managed_challenge";
        actionParameters?: unknown;
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "redirect";
        actionParameters?: {
          fromList?: { key: string; name: string };
          fromValue?: {
            targetUrl: { expression?: string; value?: string };
            preserveQueryString?: boolean;
            statusCode?: "301" | "302" | "303" | "307" | "308";
          };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "rewrite";
        actionParameters?: {
          headers?: Record<string, unknown>;
          uri?:
            | { path: { expression?: string; value?: string } }
            | { query: { expression?: string; value?: string } };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "route";
        actionParameters?: {
          hostHeader?: string;
          origin?: { host?: string; port?: number };
          sni?: { value: string };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "score";
        actionParameters?: { increment: number };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "serve_error";
        actionParameters?:
          | {
              content: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            }
          | {
              assetName: string;
              contentType?:
                | "application/json"
                | "text/html"
                | "text/plain"
                | "text/xml";
              statusCode?: number;
            };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "set_cache_settings";
        actionParameters?: {
          additionalCacheablePorts?: number[];
          browserTtl?: {
            mode:
              | "respect_origin"
              | "bypass_by_default"
              | "override_origin"
              | "bypass";
            default?: number;
          };
          cache?: boolean;
          cacheKey?: {
            cacheByDeviceType?: boolean;
            cacheDeceptionArmor?: boolean;
            customKey?: {
              cookie?: { checkPresence?: string[]; include?: string[] };
              header?: {
                checkPresence?: string[];
                contains?: Record<string, unknown>;
                excludeOrigin?: boolean;
                include?: string[];
              };
              host?: { resolved?: boolean };
              queryString?: {
                exclude?: { all?: true; list?: string[] };
                include?: { all?: true; list?: string[] };
              };
              user?: { deviceType?: boolean; geo?: boolean; lang?: boolean };
            };
            ignoreQueryStringsOrder?: boolean;
          };
          cacheReserve?: { eligible: boolean; minimumFileSize?: number };
          edgeTtl?: {
            mode: "respect_origin" | "bypass_by_default" | "override_origin";
            default?: number;
            statusCodeTtl?: {
              value: number;
              statusCode?: number;
              statusCodeRange?: { from?: number; to?: number };
            }[];
          };
          originCacheControl?: boolean;
          originErrorPagePassthru?: boolean;
          readTimeout?: number;
          respectStrongEtags?: boolean;
          serveStale?: { disableStaleWhileUpdating?: boolean };
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "set_config";
        actionParameters?: {
          automaticHttpsRewrites?: boolean;
          autominify?: { css?: boolean; html?: boolean; js?: boolean };
          bic?: boolean;
          disableApps?: true;
          disablePayPerCrawl?: true;
          disableRum?: true;
          disableZaraz?: true;
          emailObfuscation?: boolean;
          fonts?: boolean;
          hotlinkProtection?: boolean;
          mirage?: boolean;
          opportunisticEncryption?: boolean;
          polish?: "off" | "lossless" | "lossy" | "webp";
          requestBodyBuffering?: "none" | "standard" | "full";
          responseBodyBuffering?: "none" | "standard";
          rocketLoader?: boolean;
          securityLevel?:
            | "off"
            | "essentially_off"
            | "low"
            | "medium"
            | "high"
            | "under_attack";
          serverSideExcludes?: boolean;
          ssl?: "off" | "flexible" | "full" | "strict" | "origin_pull";
          sxg?: boolean;
        };
        categories?: string[];
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
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
        accountId?: string;
        zoneId?: string;
        id?: string;
        action?: "skip";
        actionParameters?: {
          phase?: "current";
          phases?: (
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
          )[];
          products?: (
            | "bic"
            | "hot"
            | "rateLimit"
            | "securityLevel"
            | "uaBlock"
            | "waf"
            | "zoneLockdown"
          )[];
          rules?: Record<string, unknown>;
          ruleset?: "current";
          rulesets?: string[];
        };
        description?: string;
        enabled?: boolean;
        exposedCredentialCheck?: {
          passwordExpression: string;
          usernameExpression: string;
        };
        expression?: string;
        logging?: { enabled: boolean };
        position?:
          | { before?: string }
          | { after?: string }
          | { index?: number };
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const DeleteRuleResponse = Schema.Struct({
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
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
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("compress_response")),
        actionParameters: Schema.optional(
          Schema.Struct({
            algorithms: Schema.Array(
              Schema.Struct({
                name: Schema.optional(
                  Schema.Literals([
                    "none",
                    "auto",
                    "default",
                    "gzip",
                    "brotli",
                    "zstd",
                  ]),
                ),
              }),
            ),
          }),
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("ddos_dynamic")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("execute")),
        actionParameters: Schema.optional(
          Schema.Struct({
            id: Schema.String,
            matchedData: Schema.optional(
              Schema.Struct({
                publicKey: Schema.String,
              }).pipe(Schema.encodeKeys({ publicKey: "public_key" })),
            ),
            overrides: Schema.optional(
              Schema.Struct({
                action: Schema.optional(Schema.String),
                categories: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      category: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                enabled: Schema.optional(Schema.Boolean),
                rules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.String,
                      action: Schema.optional(Schema.String),
                      enabled: Schema.optional(Schema.Boolean),
                      scoreThreshold: Schema.optional(Schema.Number),
                      sensitivityLevel: Schema.optional(
                        Schema.Literals(["default", "medium", "low", "eoff"]),
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
                ),
                sensitivityLevel: Schema.optional(
                  Schema.Literals(["default", "medium", "low", "eoff"]),
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
            ),
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              matchedData: "matched_data",
              overrides: "overrides",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("force_connection_close")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("log_custom_field")),
        actionParameters: Schema.optional(
          Schema.Struct({
            cookieFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            rawResponseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            requestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
            ),
            responseFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                  preserveDuplicates: Schema.optional(Schema.Boolean),
                }).pipe(
                  Schema.encodeKeys({
                    name: "name",
                    preserveDuplicates: "preserve_duplicates",
                  }),
                ),
              ),
            ),
            transformedRequestFields: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  name: Schema.String,
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("managed_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("redirect")),
        actionParameters: Schema.optional(
          Schema.Struct({
            fromList: Schema.optional(
              Schema.Struct({
                key: Schema.String,
                name: Schema.String,
              }),
            ),
            fromValue: Schema.optional(
              Schema.Struct({
                targetUrl: Schema.Struct({
                  expression: Schema.optional(Schema.String),
                  value: Schema.optional(Schema.String),
                }),
                preserveQueryString: Schema.optional(Schema.Boolean),
                statusCode: Schema.optional(
                  Schema.Literals(["301", "302", "303", "307", "308"]),
                ),
              }).pipe(
                Schema.encodeKeys({
                  targetUrl: "target_url",
                  preserveQueryString: "preserve_query_string",
                  statusCode: "status_code",
                }),
              ),
            ),
          }).pipe(
            Schema.encodeKeys({
              fromList: "from_list",
              fromValue: "from_value",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("rewrite")),
        actionParameters: Schema.optional(
          Schema.Struct({
            headers: Schema.optional(Schema.Struct({})),
            uri: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  path: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
                Schema.Struct({
                  query: Schema.Struct({
                    expression: Schema.optional(Schema.String),
                    value: Schema.optional(Schema.String),
                  }),
                }),
              ]),
            ),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("route")),
        actionParameters: Schema.optional(
          Schema.Struct({
            hostHeader: Schema.optional(Schema.String),
            origin: Schema.optional(
              Schema.Struct({
                host: Schema.optional(Schema.String),
                port: Schema.optional(Schema.Number),
              }),
            ),
            sni: Schema.optional(
              Schema.Struct({
                value: Schema.String,
              }),
            ),
          }).pipe(
            Schema.encodeKeys({
              hostHeader: "host_header",
              origin: "origin",
              sni: "sni",
            }),
          ),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("score")),
        actionParameters: Schema.optional(
          Schema.Struct({
            increment: Schema.Number,
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("serve_error")),
        actionParameters: Schema.optional(
          Schema.Union([
            Schema.Struct({
              content: Schema.String,
              contentType: Schema.optional(
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
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
                Schema.Literals([
                  "application/json",
                  "text/html",
                  "text/plain",
                  "text/xml",
                ]),
              ),
              statusCode: Schema.optional(Schema.Number),
            }).pipe(
              Schema.encodeKeys({
                assetName: "asset_name",
                contentType: "content_type",
                statusCode: "status_code",
              }),
            ),
          ]),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_cache_settings")),
        actionParameters: Schema.optional(
          Schema.Struct({
            additionalCacheablePorts: Schema.optional(
              Schema.Array(Schema.Number),
            ),
            browserTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                  "bypass",
                ]),
                default: Schema.optional(Schema.Number),
              }),
            ),
            cache: Schema.optional(Schema.Boolean),
            cacheKey: Schema.optional(
              Schema.Struct({
                cacheByDeviceType: Schema.optional(Schema.Boolean),
                cacheDeceptionArmor: Schema.optional(Schema.Boolean),
                customKey: Schema.optional(
                  Schema.Struct({
                    cookie: Schema.optional(
                      Schema.Struct({
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
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
                        checkPresence: Schema.optional(
                          Schema.Array(Schema.String),
                        ),
                        contains: Schema.optional(Schema.Struct({})),
                        excludeOrigin: Schema.optional(Schema.Boolean),
                        include: Schema.optional(Schema.Array(Schema.String)),
                      }).pipe(
                        Schema.encodeKeys({
                          checkPresence: "check_presence",
                          contains: "contains",
                          excludeOrigin: "exclude_origin",
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
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
                        ),
                        include: Schema.optional(
                          Schema.Struct({
                            all: Schema.optional(Schema.Literal(true)),
                            list: Schema.optional(Schema.Array(Schema.String)),
                          }),
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
                ignoreQueryStringsOrder: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  cacheByDeviceType: "cache_by_device_type",
                  cacheDeceptionArmor: "cache_deception_armor",
                  customKey: "custom_key",
                  ignoreQueryStringsOrder: "ignore_query_strings_order",
                }),
              ),
            ),
            cacheReserve: Schema.optional(
              Schema.Struct({
                eligible: Schema.Boolean,
                minimumFileSize: Schema.optional(Schema.Number),
              }).pipe(
                Schema.encodeKeys({
                  eligible: "eligible",
                  minimumFileSize: "minimum_file_size",
                }),
              ),
            ),
            edgeTtl: Schema.optional(
              Schema.Struct({
                mode: Schema.Literals([
                  "respect_origin",
                  "bypass_by_default",
                  "override_origin",
                ]),
                default: Schema.optional(Schema.Number),
                statusCodeTtl: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      value: Schema.Number,
                      statusCode: Schema.optional(Schema.Number),
                      statusCodeRange: Schema.optional(
                        Schema.Struct({
                          from: Schema.optional(Schema.Number),
                          to: Schema.optional(Schema.Number),
                        }),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        value: "value",
                        statusCode: "status_code",
                        statusCodeRange: "status_code_range",
                      }),
                    ),
                  ),
                ),
              }).pipe(
                Schema.encodeKeys({
                  mode: "mode",
                  default: "default",
                  statusCodeTtl: "status_code_ttl",
                }),
              ),
            ),
            originCacheControl: Schema.optional(Schema.Boolean),
            originErrorPagePassthru: Schema.optional(Schema.Boolean),
            readTimeout: Schema.optional(Schema.Number),
            respectStrongEtags: Schema.optional(Schema.Boolean),
            serveStale: Schema.optional(
              Schema.Struct({
                disableStaleWhileUpdating: Schema.optional(Schema.Boolean),
              }).pipe(
                Schema.encodeKeys({
                  disableStaleWhileUpdating: "disable_stale_while_updating",
                }),
              ),
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
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("set_config")),
        actionParameters: Schema.optional(
          Schema.Struct({
            automaticHttpsRewrites: Schema.optional(Schema.Boolean),
            autominify: Schema.optional(
              Schema.Struct({
                css: Schema.optional(Schema.Boolean),
                html: Schema.optional(Schema.Boolean),
                js: Schema.optional(Schema.Boolean),
              }),
            ),
            bic: Schema.optional(Schema.Boolean),
            disableApps: Schema.optional(Schema.Literal(true)),
            disablePayPerCrawl: Schema.optional(Schema.Literal(true)),
            disableRum: Schema.optional(Schema.Literal(true)),
            disableZaraz: Schema.optional(Schema.Literal(true)),
            emailObfuscation: Schema.optional(Schema.Boolean),
            fonts: Schema.optional(Schema.Boolean),
            hotlinkProtection: Schema.optional(Schema.Boolean),
            mirage: Schema.optional(Schema.Boolean),
            opportunisticEncryption: Schema.optional(Schema.Boolean),
            polish: Schema.optional(
              Schema.Literals(["off", "lossless", "lossy", "webp"]),
            ),
            requestBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard", "full"]),
            ),
            responseBodyBuffering: Schema.optional(
              Schema.Literals(["none", "standard"]),
            ),
            rocketLoader: Schema.optional(Schema.Boolean),
            securityLevel: Schema.optional(
              Schema.Literals([
                "off",
                "essentially_off",
                "low",
                "medium",
                "high",
                "under_attack",
              ]),
            ),
            serverSideExcludes: Schema.optional(Schema.Boolean),
            ssl: Schema.optional(
              Schema.Literals([
                "off",
                "flexible",
                "full",
                "strict",
                "origin_pull",
              ]),
            ),
            sxg: Schema.optional(Schema.Boolean),
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
        ),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        accountId: Schema.optional(Schema.String),
        zoneId: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("skip")),
        actionParameters: Schema.optional(
          Schema.Struct({
            phase: Schema.optional(Schema.Literal("current")),
            phases: Schema.optional(
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
            ),
            products: Schema.optional(
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
            ),
            rules: Schema.optional(Schema.Struct({})),
            ruleset: Schema.optional(Schema.Literal("current")),
            rulesets: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<DeleteRuleResponse>;

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

// =============================================================================
// Ruleset
// =============================================================================

export interface GetRulesetRequest {
  rulesetId: string;
}

export const GetRulesetRequest = Schema.Struct({
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const GetRulesetResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetRulesetResponse>;

export type GetRulesetError = CommonErrors;

export const getRuleset: API.OperationMethod<
  GetRulesetRequest,
  GetRulesetResponse,
  GetRulesetError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRulesetRequest,
  output: GetRulesetResponse,
  errors: [],
}));

export interface ListRulesetsRequest {}

export const ListRulesetsRequest = Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets",
  }),
) as unknown as Schema.Schema<ListRulesetsRequest>;

export type ListRulesetsResponse = {
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
  description?: string;
}[];

export const ListRulesetsResponse = Schema.Array(
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
    description: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListRulesetsResponse>;

export type ListRulesetsError = CommonErrors;

export const listRulesets: API.OperationMethod<
  ListRulesetsRequest,
  ListRulesetsResponse,
  ListRulesetsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRulesetsRequest,
  output: ListRulesetsResponse,
  errors: [],
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

export const CreateRulesetRequest = Schema.Struct({
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
              passwordExpression: Schema.String,
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
              passwordExpression: Schema.String,
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const CreateRulesetResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<CreateRulesetResponse>;

export type CreateRulesetError = CommonErrors;

export const createRuleset: API.OperationMethod<
  CreateRulesetRequest,
  CreateRulesetResponse,
  CreateRulesetError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const UpdateRulesetRequest = Schema.Struct({
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
              passwordExpression: Schema.String,
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
              passwordExpression: Schema.String,
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const UpdateRulesetResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<UpdateRulesetResponse>;

export type UpdateRulesetError = CommonErrors;

export const updateRuleset: API.OperationMethod<
  UpdateRulesetRequest,
  UpdateRulesetResponse,
  UpdateRulesetError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateRulesetRequest,
  output: UpdateRulesetResponse,
  errors: [],
}));

export interface DeleteRulesetRequest {
  rulesetId: string;
}

export const DeleteRulesetRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}",
  }),
) as unknown as Schema.Schema<DeleteRulesetRequest>;

export type DeleteRulesetResponse = unknown;

export const DeleteRulesetResponse =
  Schema.Unknown as unknown as Schema.Schema<DeleteRulesetResponse>;

export type DeleteRulesetError = CommonErrors;

export const deleteRuleset: API.OperationMethod<
  DeleteRulesetRequest,
  DeleteRulesetResponse,
  DeleteRulesetError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
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

export const GetVersionRequest = Schema.Struct({
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
        id?: string;
        action?: "challenge";
        actionParameters?: unknown;
        categories?: string[];
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
        lastUpdated: string;
        version: string;
        id?: string;
        action?: "js_challenge";
        actionParameters?: unknown;
        categories?: string[];
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
  /** The version of the ruleset. */
  version: string;
  /** An informative description of the ruleset. */
  description?: string;
}

export const GetVersionResponse = Schema.Struct({
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
        id: Schema.optional(Schema.String),
        action: Schema.optional(Schema.Literal("js_challenge")),
        actionParameters: Schema.optional(Schema.Unknown),
        categories: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        enabled: Schema.optional(Schema.Boolean),
        exposedCredentialCheck: Schema.optional(
          Schema.Struct({
            passwordExpression: Schema.String,
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
  description: Schema.optional(Schema.String),
}).pipe(
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
) as unknown as Schema.Schema<GetVersionResponse>;

export type GetVersionError = CommonErrors;

export const getVersion: API.OperationMethod<
  GetVersionRequest,
  GetVersionResponse,
  GetVersionError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVersionRequest,
  output: GetVersionResponse,
  errors: [],
}));

export interface ListVersionsRequest {
  rulesetId: string;
}

export const ListVersionsRequest = Schema.Struct({
  rulesetId: Schema.String.pipe(T.HttpPath("rulesetId")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{accountOrZone}/{accountOrZoneId}/rulesets/{rulesetId}/versions",
  }),
) as unknown as Schema.Schema<ListVersionsRequest>;

export type ListVersionsResponse = {
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
  description?: string;
}[];

export const ListVersionsResponse = Schema.Array(
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
    description: Schema.optional(Schema.String),
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
) as unknown as Schema.Schema<ListVersionsResponse>;

export type ListVersionsError = CommonErrors;

export const listVersions: API.OperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [],
}));

export interface DeleteVersionRequest {
  rulesetId: string;
  rulesetVersion: string;
}

export const DeleteVersionRequest = Schema.Struct({
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
  Schema.Unknown as unknown as Schema.Schema<DeleteVersionResponse>;

export type DeleteVersionError = CommonErrors;

export const deleteVersion: API.OperationMethod<
  DeleteVersionRequest,
  DeleteVersionResponse,
  DeleteVersionError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteVersionRequest,
  output: DeleteVersionResponse,
  errors: [],
}));
