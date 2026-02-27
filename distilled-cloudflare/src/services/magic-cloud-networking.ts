/**
 * Cloudflare MAGIC-CLOUD-NETWORKING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service magic-cloud-networking
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
// AllCloudIntegration
// =============================================================================

export interface DiscoverAllCloudIntegrationRequest {
  accountId: string;
}

export const DiscoverAllCloudIntegrationRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/providers/discover",
  }),
) as unknown as Schema.Schema<DiscoverAllCloudIntegrationRequest>;

export interface DiscoverAllCloudIntegrationResponse {
  errors: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  messages: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  success: boolean;
}

export const DiscoverAllCloudIntegrationResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DiscoverAllCloudIntegrationResponse>;

export type DiscoverAllCloudIntegrationError = CommonErrors;

export const discoverAllCloudIntegration: API.OperationMethod<
  DiscoverAllCloudIntegrationRequest,
  DiscoverAllCloudIntegrationResponse,
  DiscoverAllCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DiscoverAllCloudIntegrationRequest,
  output: DiscoverAllCloudIntegrationResponse,
  errors: [],
}));

// =============================================================================
// CatalogSync
// =============================================================================

export interface GetCatalogSyncRequest {
  syncId: string;
  accountId: string;
}

export const GetCatalogSyncRequest = Schema.Struct({
  syncId: Schema.String.pipe(T.HttpPath("syncId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/{syncId}",
  }),
) as unknown as Schema.Schema<GetCatalogSyncRequest>;

export interface GetCatalogSyncResponse {
  id: string;
  description: string;
  destinationId: string;
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  lastUserUpdateAt: string;
  name: string;
  policy: string;
  updateMode: "AUTO" | "MANUAL";
  errors?: Record<string, unknown>;
  includesDiscoveriesUntil?: string;
  lastAttemptedUpdateAt?: string;
  lastSuccessfulUpdateAt?: string;
}

export const GetCatalogSyncResponse = Schema.Struct({
  id: Schema.String,
  description: Schema.String,
  destinationId: Schema.String,
  destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  lastUserUpdateAt: Schema.String,
  name: Schema.String,
  policy: Schema.String,
  updateMode: Schema.Literals(["AUTO", "MANUAL"]),
  errors: Schema.optional(Schema.Struct({})),
  includesDiscoveriesUntil: Schema.optional(Schema.String),
  lastAttemptedUpdateAt: Schema.optional(Schema.String),
  lastSuccessfulUpdateAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    destinationId: "destination_id",
    destinationType: "destination_type",
    lastUserUpdateAt: "last_user_update_at",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
    errors: "errors",
    includesDiscoveriesUntil: "includes_discoveries_until",
    lastAttemptedUpdateAt: "last_attempted_update_at",
    lastSuccessfulUpdateAt: "last_successful_update_at",
  }),
) as unknown as Schema.Schema<GetCatalogSyncResponse>;

export type GetCatalogSyncError = CommonErrors;

export const getCatalogSync: API.OperationMethod<
  GetCatalogSyncRequest,
  GetCatalogSyncResponse,
  GetCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCatalogSyncRequest,
  output: GetCatalogSyncResponse,
  errors: [],
}));

export interface ListCatalogSyncsRequest {
  accountId: string;
}

export const ListCatalogSyncsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs",
  }),
) as unknown as Schema.Schema<ListCatalogSyncsRequest>;

export type ListCatalogSyncsResponse = {
  id: string;
  description: string;
  destinationId: string;
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  lastUserUpdateAt: string;
  name: string;
  policy: string;
  updateMode: "AUTO" | "MANUAL";
  errors?: Record<string, unknown>;
  includesDiscoveriesUntil?: string;
  lastAttemptedUpdateAt?: string;
  lastSuccessfulUpdateAt?: string;
}[];

export const ListCatalogSyncsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    description: Schema.String,
    destinationId: Schema.String,
    destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
    lastUserUpdateAt: Schema.String,
    name: Schema.String,
    policy: Schema.String,
    updateMode: Schema.Literals(["AUTO", "MANUAL"]),
    errors: Schema.optional(Schema.Struct({})),
    includesDiscoveriesUntil: Schema.optional(Schema.String),
    lastAttemptedUpdateAt: Schema.optional(Schema.String),
    lastSuccessfulUpdateAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      description: "description",
      destinationId: "destination_id",
      destinationType: "destination_type",
      lastUserUpdateAt: "last_user_update_at",
      name: "name",
      policy: "policy",
      updateMode: "update_mode",
      errors: "errors",
      includesDiscoveriesUntil: "includes_discoveries_until",
      lastAttemptedUpdateAt: "last_attempted_update_at",
      lastSuccessfulUpdateAt: "last_successful_update_at",
    }),
  ),
) as unknown as Schema.Schema<ListCatalogSyncsResponse>;

export type ListCatalogSyncsError = CommonErrors;

export const listCatalogSyncs: API.OperationMethod<
  ListCatalogSyncsRequest,
  ListCatalogSyncsResponse,
  ListCatalogSyncsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCatalogSyncsRequest,
  output: ListCatalogSyncsResponse,
  errors: [],
}));

export interface CreateCatalogSyncRequest {
  /** Path param: */
  accountId: string;
  /** Header param: */
  forwarded?: string;
  /** Body param: */
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  /** Body param: */
  name: string;
  /** Body param: */
  updateMode: "AUTO" | "MANUAL";
  /** Body param: */
  description?: string;
  /** Body param: */
  policy?: string;
}

export const CreateCatalogSyncRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  forwarded: Schema.optional(Schema.String).pipe(T.HttpHeader("forwarded")),
  destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  name: Schema.String,
  updateMode: Schema.Literals(["AUTO", "MANUAL"]),
  description: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    destinationType: "destination_type",
    name: "name",
    updateMode: "update_mode",
    description: "description",
    policy: "policy",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs",
  }),
) as unknown as Schema.Schema<CreateCatalogSyncRequest>;

export interface CreateCatalogSyncResponse {
  id: string;
  description: string;
  destinationId: string;
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  lastUserUpdateAt: string;
  name: string;
  policy: string;
  updateMode: "AUTO" | "MANUAL";
  errors?: Record<string, unknown>;
  includesDiscoveriesUntil?: string;
  lastAttemptedUpdateAt?: string;
  lastSuccessfulUpdateAt?: string;
}

export const CreateCatalogSyncResponse = Schema.Struct({
  id: Schema.String,
  description: Schema.String,
  destinationId: Schema.String,
  destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  lastUserUpdateAt: Schema.String,
  name: Schema.String,
  policy: Schema.String,
  updateMode: Schema.Literals(["AUTO", "MANUAL"]),
  errors: Schema.optional(Schema.Struct({})),
  includesDiscoveriesUntil: Schema.optional(Schema.String),
  lastAttemptedUpdateAt: Schema.optional(Schema.String),
  lastSuccessfulUpdateAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    destinationId: "destination_id",
    destinationType: "destination_type",
    lastUserUpdateAt: "last_user_update_at",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
    errors: "errors",
    includesDiscoveriesUntil: "includes_discoveries_until",
    lastAttemptedUpdateAt: "last_attempted_update_at",
    lastSuccessfulUpdateAt: "last_successful_update_at",
  }),
) as unknown as Schema.Schema<CreateCatalogSyncResponse>;

export type CreateCatalogSyncError = CommonErrors;

export const createCatalogSync: API.OperationMethod<
  CreateCatalogSyncRequest,
  CreateCatalogSyncResponse,
  CreateCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCatalogSyncRequest,
  output: CreateCatalogSyncResponse,
  errors: [],
}));

export interface UpdateCatalogSyncRequest {
  syncId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  policy?: string;
  /** Body param: */
  updateMode?: "AUTO" | "MANUAL";
}

export const UpdateCatalogSyncRequest = Schema.Struct({
  syncId: Schema.String.pipe(T.HttpPath("syncId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  updateMode: Schema.optional(Schema.Literals(["AUTO", "MANUAL"])),
}).pipe(
  Schema.encodeKeys({
    description: "description",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/{syncId}",
  }),
) as unknown as Schema.Schema<UpdateCatalogSyncRequest>;

export interface UpdateCatalogSyncResponse {
  id: string;
  description: string;
  destinationId: string;
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  lastUserUpdateAt: string;
  name: string;
  policy: string;
  updateMode: "AUTO" | "MANUAL";
  errors?: Record<string, unknown>;
  includesDiscoveriesUntil?: string;
  lastAttemptedUpdateAt?: string;
  lastSuccessfulUpdateAt?: string;
}

export const UpdateCatalogSyncResponse = Schema.Struct({
  id: Schema.String,
  description: Schema.String,
  destinationId: Schema.String,
  destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  lastUserUpdateAt: Schema.String,
  name: Schema.String,
  policy: Schema.String,
  updateMode: Schema.Literals(["AUTO", "MANUAL"]),
  errors: Schema.optional(Schema.Struct({})),
  includesDiscoveriesUntil: Schema.optional(Schema.String),
  lastAttemptedUpdateAt: Schema.optional(Schema.String),
  lastSuccessfulUpdateAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    destinationId: "destination_id",
    destinationType: "destination_type",
    lastUserUpdateAt: "last_user_update_at",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
    errors: "errors",
    includesDiscoveriesUntil: "includes_discoveries_until",
    lastAttemptedUpdateAt: "last_attempted_update_at",
    lastSuccessfulUpdateAt: "last_successful_update_at",
  }),
) as unknown as Schema.Schema<UpdateCatalogSyncResponse>;

export type UpdateCatalogSyncError = CommonErrors;

export const updateCatalogSync: API.OperationMethod<
  UpdateCatalogSyncRequest,
  UpdateCatalogSyncResponse,
  UpdateCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCatalogSyncRequest,
  output: UpdateCatalogSyncResponse,
  errors: [],
}));

export interface PatchCatalogSyncRequest {
  syncId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  name?: string;
  /** Body param: */
  policy?: string;
  /** Body param: */
  updateMode?: "AUTO" | "MANUAL";
}

export const PatchCatalogSyncRequest = Schema.Struct({
  syncId: Schema.String.pipe(T.HttpPath("syncId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  policy: Schema.optional(Schema.String),
  updateMode: Schema.optional(Schema.Literals(["AUTO", "MANUAL"])),
}).pipe(
  Schema.encodeKeys({
    description: "description",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/{syncId}",
  }),
) as unknown as Schema.Schema<PatchCatalogSyncRequest>;

export interface PatchCatalogSyncResponse {
  id: string;
  description: string;
  destinationId: string;
  destinationType: "NONE" | "ZERO_TRUST_LIST";
  lastUserUpdateAt: string;
  name: string;
  policy: string;
  updateMode: "AUTO" | "MANUAL";
  errors?: Record<string, unknown>;
  includesDiscoveriesUntil?: string;
  lastAttemptedUpdateAt?: string;
  lastSuccessfulUpdateAt?: string;
}

export const PatchCatalogSyncResponse = Schema.Struct({
  id: Schema.String,
  description: Schema.String,
  destinationId: Schema.String,
  destinationType: Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  lastUserUpdateAt: Schema.String,
  name: Schema.String,
  policy: Schema.String,
  updateMode: Schema.Literals(["AUTO", "MANUAL"]),
  errors: Schema.optional(Schema.Struct({})),
  includesDiscoveriesUntil: Schema.optional(Schema.String),
  lastAttemptedUpdateAt: Schema.optional(Schema.String),
  lastSuccessfulUpdateAt: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    description: "description",
    destinationId: "destination_id",
    destinationType: "destination_type",
    lastUserUpdateAt: "last_user_update_at",
    name: "name",
    policy: "policy",
    updateMode: "update_mode",
    errors: "errors",
    includesDiscoveriesUntil: "includes_discoveries_until",
    lastAttemptedUpdateAt: "last_attempted_update_at",
    lastSuccessfulUpdateAt: "last_successful_update_at",
  }),
) as unknown as Schema.Schema<PatchCatalogSyncResponse>;

export type PatchCatalogSyncError = CommonErrors;

export const patchCatalogSync: API.OperationMethod<
  PatchCatalogSyncRequest,
  PatchCatalogSyncResponse,
  PatchCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCatalogSyncRequest,
  output: PatchCatalogSyncResponse,
  errors: [],
}));

export interface DeleteCatalogSyncRequest {
  syncId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  deleteDestination?: boolean;
}

export const DeleteCatalogSyncRequest = Schema.Struct({
  syncId: Schema.String.pipe(T.HttpPath("syncId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  deleteDestination: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("delete_destination"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/{syncId}",
  }),
) as unknown as Schema.Schema<DeleteCatalogSyncRequest>;

export interface DeleteCatalogSyncResponse {
  id: string;
}

export const DeleteCatalogSyncResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteCatalogSyncResponse>;

export type DeleteCatalogSyncError = CommonErrors;

export const deleteCatalogSync: API.OperationMethod<
  DeleteCatalogSyncRequest,
  DeleteCatalogSyncResponse,
  DeleteCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCatalogSyncRequest,
  output: DeleteCatalogSyncResponse,
  errors: [],
}));

export interface RefreshCatalogSyncRequest {
  syncId: string;
  accountId: string;
}

export const RefreshCatalogSyncRequest = Schema.Struct({
  syncId: Schema.String.pipe(T.HttpPath("syncId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/{syncId}/refresh",
  }),
) as unknown as Schema.Schema<RefreshCatalogSyncRequest>;

export type RefreshCatalogSyncResponse = string;

export const RefreshCatalogSyncResponse =
  Schema.String as unknown as Schema.Schema<RefreshCatalogSyncResponse>;

export type RefreshCatalogSyncError = CommonErrors;

export const refreshCatalogSync: API.OperationMethod<
  RefreshCatalogSyncRequest,
  RefreshCatalogSyncResponse,
  RefreshCatalogSyncError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: RefreshCatalogSyncRequest,
  output: RefreshCatalogSyncResponse,
  errors: [],
}));

// =============================================================================
// CatalogSyncPrebuiltPolicy
// =============================================================================

export interface ListCatalogSyncPrebuiltPoliciesRequest {
  /** Path param: */
  accountId: string;
  /** Query param: Specify type of destination, omit to return all. */
  destinationType?: "NONE" | "ZERO_TRUST_LIST";
}

export const ListCatalogSyncPrebuiltPoliciesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  destinationType: Schema.optional(
    Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
  ).pipe(T.HttpQuery("destination_type")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/catalog-syncs/prebuilt-policies",
  }),
) as unknown as Schema.Schema<ListCatalogSyncPrebuiltPoliciesRequest>;

export type ListCatalogSyncPrebuiltPoliciesResponse = {
  applicableDestinations: ("NONE" | "ZERO_TRUST_LIST")[];
  policyDescription: string;
  policyName: string;
  policyString: string;
}[];

export const ListCatalogSyncPrebuiltPoliciesResponse = Schema.Array(
  Schema.Struct({
    applicableDestinations: Schema.Array(
      Schema.Literals(["NONE", "ZERO_TRUST_LIST"]),
    ),
    policyDescription: Schema.String,
    policyName: Schema.String,
    policyString: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      applicableDestinations: "applicable_destinations",
      policyDescription: "policy_description",
      policyName: "policy_name",
      policyString: "policy_string",
    }),
  ),
) as unknown as Schema.Schema<ListCatalogSyncPrebuiltPoliciesResponse>;

export type ListCatalogSyncPrebuiltPoliciesError = CommonErrors;

export const listCatalogSyncPrebuiltPolicies: API.OperationMethod<
  ListCatalogSyncPrebuiltPoliciesRequest,
  ListCatalogSyncPrebuiltPoliciesResponse,
  ListCatalogSyncPrebuiltPoliciesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCatalogSyncPrebuiltPoliciesRequest,
  output: ListCatalogSyncPrebuiltPoliciesResponse,
  errors: [],
}));

// =============================================================================
// CloudIntegration
// =============================================================================

export interface GetCloudIntegrationRequest {
  providerId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  status?: boolean;
}

export const GetCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  status: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}",
  }),
) as unknown as Schema.Schema<GetCloudIntegrationRequest>;

export interface GetCloudIntegrationResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  friendlyName: string;
  lastUpdated: string;
  lifecycleState: "ACTIVE" | "PENDING_SETUP" | "RETIRED";
  state: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  stateV2: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  awsArn?: string;
  azureSubscriptionId?: string;
  azureTenantId?: string;
  description?: string;
  gcpProjectId?: string;
  gcpServiceAccountEmail?: string;
  status?: {
    discoveryProgress: { done: number; total: number; unit: string };
    discoveryProgressV2: { done: number; total: number; unit: string };
    lastDiscoveryStatus:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    lastDiscoveryStatusV2:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    regions: string[];
    credentialsGoodSince?: string;
    credentialsMissingSince?: string;
    credentialsRejectedSince?: string;
    discoveryMessage?: string;
    discoveryMessageV2?: string;
    inUseBy?: {
      id: string;
      clientType: "MAGIC_WAN_CLOUD_ONRAMP";
      name: string;
    }[];
    lastDiscoveryCompletedAt?: string;
    lastDiscoveryCompletedAtV2?: string;
    lastDiscoveryStartedAt?: string;
    lastDiscoveryStartedAtV2?: string;
    lastUpdated?: string;
  };
}

export const GetCloudIntegrationResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  friendlyName: Schema.String,
  lastUpdated: Schema.String,
  lifecycleState: Schema.Literals(["ACTIVE", "PENDING_SETUP", "RETIRED"]),
  state: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  stateV2: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      discoveryProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      discoveryProgressV2: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      lastDiscoveryStatus: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      lastDiscoveryStatusV2: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      regions: Schema.Array(Schema.String),
      credentialsGoodSince: Schema.optional(Schema.String),
      credentialsMissingSince: Schema.optional(Schema.String),
      credentialsRejectedSince: Schema.optional(Schema.String),
      discoveryMessage: Schema.optional(Schema.String),
      discoveryMessageV2: Schema.optional(Schema.String),
      inUseBy: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              clientType: "client_type",
              name: "name",
            }),
          ),
        ),
      ),
      lastDiscoveryCompletedAt: Schema.optional(Schema.String),
      lastDiscoveryCompletedAtV2: Schema.optional(Schema.String),
      lastDiscoveryStartedAt: Schema.optional(Schema.String),
      lastDiscoveryStartedAtV2: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        discoveryProgress: "discovery_progress",
        discoveryProgressV2: "discovery_progress_v2",
        lastDiscoveryStatus: "last_discovery_status",
        lastDiscoveryStatusV2: "last_discovery_status_v2",
        regions: "regions",
        credentialsGoodSince: "credentials_good_since",
        credentialsMissingSince: "credentials_missing_since",
        credentialsRejectedSince: "credentials_rejected_since",
        discoveryMessage: "discovery_message",
        discoveryMessageV2: "discovery_message_v2",
        inUseBy: "in_use_by",
        lastDiscoveryCompletedAt: "last_discovery_completed_at",
        lastDiscoveryCompletedAtV2: "last_discovery_completed_at_v2",
        lastDiscoveryStartedAt: "last_discovery_started_at",
        lastDiscoveryStartedAtV2: "last_discovery_started_at_v2",
        lastUpdated: "last_updated",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    friendlyName: "friendly_name",
    lastUpdated: "last_updated",
    lifecycleState: "lifecycle_state",
    state: "state",
    stateV2: "state_v2",
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
    status: "status",
  }),
) as unknown as Schema.Schema<GetCloudIntegrationResponse>;

export type GetCloudIntegrationError = CommonErrors;

export const getCloudIntegration: API.OperationMethod<
  GetCloudIntegrationRequest,
  GetCloudIntegrationResponse,
  GetCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetCloudIntegrationRequest,
  output: GetCloudIntegrationResponse,
  errors: [],
}));

export interface ListCloudIntegrationsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: */
  cloudflare?: boolean;
  /** Query param: */
  desc?: boolean;
  /** Query param: One of ["updated_at", "id", "cloud_type", "name"]. */
  orderBy?: string;
  /** Query param: */
  status?: boolean;
}

export const ListCloudIntegrationsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cloudflare: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("cloudflare")),
  desc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("desc")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("order_by")),
  status: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/providers",
  }),
) as unknown as Schema.Schema<ListCloudIntegrationsRequest>;

export type ListCloudIntegrationsResponse = {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  friendlyName: string;
  lastUpdated: string;
  lifecycleState: "ACTIVE" | "PENDING_SETUP" | "RETIRED";
  state: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  stateV2: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  awsArn?: string;
  azureSubscriptionId?: string;
  azureTenantId?: string;
  description?: string;
  gcpProjectId?: string;
  gcpServiceAccountEmail?: string;
  status?: {
    discoveryProgress: { done: number; total: number; unit: string };
    discoveryProgressV2: { done: number; total: number; unit: string };
    lastDiscoveryStatus:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    lastDiscoveryStatusV2:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    regions: string[];
    credentialsGoodSince?: string;
    credentialsMissingSince?: string;
    credentialsRejectedSince?: string;
    discoveryMessage?: string;
    discoveryMessageV2?: string;
    inUseBy?: {
      id: string;
      clientType: "MAGIC_WAN_CLOUD_ONRAMP";
      name: string;
    }[];
    lastDiscoveryCompletedAt?: string;
    lastDiscoveryCompletedAtV2?: string;
    lastDiscoveryStartedAt?: string;
    lastDiscoveryStartedAtV2?: string;
    lastUpdated?: string;
  };
}[];

export const ListCloudIntegrationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
    friendlyName: Schema.String,
    lastUpdated: Schema.String,
    lifecycleState: Schema.Literals(["ACTIVE", "PENDING_SETUP", "RETIRED"]),
    state: Schema.Literals([
      "UNSPECIFIED",
      "PENDING",
      "DISCOVERING",
      "FAILED",
      "SUCCEEDED",
    ]),
    stateV2: Schema.Literals([
      "UNSPECIFIED",
      "PENDING",
      "DISCOVERING",
      "FAILED",
      "SUCCEEDED",
    ]),
    awsArn: Schema.optional(Schema.String),
    azureSubscriptionId: Schema.optional(Schema.String),
    azureTenantId: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    gcpProjectId: Schema.optional(Schema.String),
    gcpServiceAccountEmail: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Struct({
        discoveryProgress: Schema.Struct({
          done: Schema.Number,
          total: Schema.Number,
          unit: Schema.String,
        }),
        discoveryProgressV2: Schema.Struct({
          done: Schema.Number,
          total: Schema.Number,
          unit: Schema.String,
        }),
        lastDiscoveryStatus: Schema.Literals([
          "UNSPECIFIED",
          "PENDING",
          "DISCOVERING",
          "FAILED",
          "SUCCEEDED",
        ]),
        lastDiscoveryStatusV2: Schema.Literals([
          "UNSPECIFIED",
          "PENDING",
          "DISCOVERING",
          "FAILED",
          "SUCCEEDED",
        ]),
        regions: Schema.Array(Schema.String),
        credentialsGoodSince: Schema.optional(Schema.String),
        credentialsMissingSince: Schema.optional(Schema.String),
        credentialsRejectedSince: Schema.optional(Schema.String),
        discoveryMessage: Schema.optional(Schema.String),
        discoveryMessageV2: Schema.optional(Schema.String),
        inUseBy: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.String,
              clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
              name: Schema.String,
            }).pipe(
              Schema.encodeKeys({
                id: "id",
                clientType: "client_type",
                name: "name",
              }),
            ),
          ),
        ),
        lastDiscoveryCompletedAt: Schema.optional(Schema.String),
        lastDiscoveryCompletedAtV2: Schema.optional(Schema.String),
        lastDiscoveryStartedAt: Schema.optional(Schema.String),
        lastDiscoveryStartedAtV2: Schema.optional(Schema.String),
        lastUpdated: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          discoveryProgress: "discovery_progress",
          discoveryProgressV2: "discovery_progress_v2",
          lastDiscoveryStatus: "last_discovery_status",
          lastDiscoveryStatusV2: "last_discovery_status_v2",
          regions: "regions",
          credentialsGoodSince: "credentials_good_since",
          credentialsMissingSince: "credentials_missing_since",
          credentialsRejectedSince: "credentials_rejected_since",
          discoveryMessage: "discovery_message",
          discoveryMessageV2: "discovery_message_v2",
          inUseBy: "in_use_by",
          lastDiscoveryCompletedAt: "last_discovery_completed_at",
          lastDiscoveryCompletedAtV2: "last_discovery_completed_at_v2",
          lastDiscoveryStartedAt: "last_discovery_started_at",
          lastDiscoveryStartedAtV2: "last_discovery_started_at_v2",
          lastUpdated: "last_updated",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      cloudType: "cloud_type",
      friendlyName: "friendly_name",
      lastUpdated: "last_updated",
      lifecycleState: "lifecycle_state",
      state: "state",
      stateV2: "state_v2",
      awsArn: "aws_arn",
      azureSubscriptionId: "azure_subscription_id",
      azureTenantId: "azure_tenant_id",
      description: "description",
      gcpProjectId: "gcp_project_id",
      gcpServiceAccountEmail: "gcp_service_account_email",
      status: "status",
    }),
  ),
) as unknown as Schema.Schema<ListCloudIntegrationsResponse>;

export type ListCloudIntegrationsError = CommonErrors;

export const listCloudIntegrations: API.OperationMethod<
  ListCloudIntegrationsRequest,
  ListCloudIntegrationsResponse,
  ListCloudIntegrationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCloudIntegrationsRequest,
  output: ListCloudIntegrationsResponse,
  errors: [],
}));

export interface CreateCloudIntegrationRequest {
  /** Path param: */
  accountId: string;
  /** Header param: */
  forwarded?: string;
  /** Body param: */
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  /** Body param: */
  friendlyName: string;
  /** Body param: */
  description?: string;
}

export const CreateCloudIntegrationRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  forwarded: Schema.optional(Schema.String).pipe(T.HttpHeader("forwarded")),
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  friendlyName: Schema.String,
  description: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    cloudType: "cloud_type",
    friendlyName: "friendly_name",
    description: "description",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/providers",
  }),
) as unknown as Schema.Schema<CreateCloudIntegrationRequest>;

export interface CreateCloudIntegrationResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  friendlyName: string;
  lastUpdated: string;
  lifecycleState: "ACTIVE" | "PENDING_SETUP" | "RETIRED";
  state: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  stateV2: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  awsArn?: string;
  azureSubscriptionId?: string;
  azureTenantId?: string;
  description?: string;
  gcpProjectId?: string;
  gcpServiceAccountEmail?: string;
  status?: {
    discoveryProgress: { done: number; total: number; unit: string };
    discoveryProgressV2: { done: number; total: number; unit: string };
    lastDiscoveryStatus:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    lastDiscoveryStatusV2:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    regions: string[];
    credentialsGoodSince?: string;
    credentialsMissingSince?: string;
    credentialsRejectedSince?: string;
    discoveryMessage?: string;
    discoveryMessageV2?: string;
    inUseBy?: {
      id: string;
      clientType: "MAGIC_WAN_CLOUD_ONRAMP";
      name: string;
    }[];
    lastDiscoveryCompletedAt?: string;
    lastDiscoveryCompletedAtV2?: string;
    lastDiscoveryStartedAt?: string;
    lastDiscoveryStartedAtV2?: string;
    lastUpdated?: string;
  };
}

export const CreateCloudIntegrationResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  friendlyName: Schema.String,
  lastUpdated: Schema.String,
  lifecycleState: Schema.Literals(["ACTIVE", "PENDING_SETUP", "RETIRED"]),
  state: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  stateV2: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      discoveryProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      discoveryProgressV2: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      lastDiscoveryStatus: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      lastDiscoveryStatusV2: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      regions: Schema.Array(Schema.String),
      credentialsGoodSince: Schema.optional(Schema.String),
      credentialsMissingSince: Schema.optional(Schema.String),
      credentialsRejectedSince: Schema.optional(Schema.String),
      discoveryMessage: Schema.optional(Schema.String),
      discoveryMessageV2: Schema.optional(Schema.String),
      inUseBy: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              clientType: "client_type",
              name: "name",
            }),
          ),
        ),
      ),
      lastDiscoveryCompletedAt: Schema.optional(Schema.String),
      lastDiscoveryCompletedAtV2: Schema.optional(Schema.String),
      lastDiscoveryStartedAt: Schema.optional(Schema.String),
      lastDiscoveryStartedAtV2: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        discoveryProgress: "discovery_progress",
        discoveryProgressV2: "discovery_progress_v2",
        lastDiscoveryStatus: "last_discovery_status",
        lastDiscoveryStatusV2: "last_discovery_status_v2",
        regions: "regions",
        credentialsGoodSince: "credentials_good_since",
        credentialsMissingSince: "credentials_missing_since",
        credentialsRejectedSince: "credentials_rejected_since",
        discoveryMessage: "discovery_message",
        discoveryMessageV2: "discovery_message_v2",
        inUseBy: "in_use_by",
        lastDiscoveryCompletedAt: "last_discovery_completed_at",
        lastDiscoveryCompletedAtV2: "last_discovery_completed_at_v2",
        lastDiscoveryStartedAt: "last_discovery_started_at",
        lastDiscoveryStartedAtV2: "last_discovery_started_at_v2",
        lastUpdated: "last_updated",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    friendlyName: "friendly_name",
    lastUpdated: "last_updated",
    lifecycleState: "lifecycle_state",
    state: "state",
    stateV2: "state_v2",
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
    status: "status",
  }),
) as unknown as Schema.Schema<CreateCloudIntegrationResponse>;

export type CreateCloudIntegrationError = CommonErrors;

export const createCloudIntegration: API.OperationMethod<
  CreateCloudIntegrationRequest,
  CreateCloudIntegrationResponse,
  CreateCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateCloudIntegrationRequest,
  output: CreateCloudIntegrationResponse,
  errors: [],
}));

export interface UpdateCloudIntegrationRequest {
  providerId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  awsArn?: string;
  /** Body param: */
  azureSubscriptionId?: string;
  /** Body param: */
  azureTenantId?: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  friendlyName?: string;
  /** Body param: */
  gcpProjectId?: string;
  /** Body param: */
  gcpServiceAccountEmail?: string;
}

export const UpdateCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  friendlyName: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    friendlyName: "friendly_name",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}",
  }),
) as unknown as Schema.Schema<UpdateCloudIntegrationRequest>;

export interface UpdateCloudIntegrationResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  friendlyName: string;
  lastUpdated: string;
  lifecycleState: "ACTIVE" | "PENDING_SETUP" | "RETIRED";
  state: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  stateV2: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  awsArn?: string;
  azureSubscriptionId?: string;
  azureTenantId?: string;
  description?: string;
  gcpProjectId?: string;
  gcpServiceAccountEmail?: string;
  status?: {
    discoveryProgress: { done: number; total: number; unit: string };
    discoveryProgressV2: { done: number; total: number; unit: string };
    lastDiscoveryStatus:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    lastDiscoveryStatusV2:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    regions: string[];
    credentialsGoodSince?: string;
    credentialsMissingSince?: string;
    credentialsRejectedSince?: string;
    discoveryMessage?: string;
    discoveryMessageV2?: string;
    inUseBy?: {
      id: string;
      clientType: "MAGIC_WAN_CLOUD_ONRAMP";
      name: string;
    }[];
    lastDiscoveryCompletedAt?: string;
    lastDiscoveryCompletedAtV2?: string;
    lastDiscoveryStartedAt?: string;
    lastDiscoveryStartedAtV2?: string;
    lastUpdated?: string;
  };
}

export const UpdateCloudIntegrationResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  friendlyName: Schema.String,
  lastUpdated: Schema.String,
  lifecycleState: Schema.Literals(["ACTIVE", "PENDING_SETUP", "RETIRED"]),
  state: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  stateV2: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      discoveryProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      discoveryProgressV2: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      lastDiscoveryStatus: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      lastDiscoveryStatusV2: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      regions: Schema.Array(Schema.String),
      credentialsGoodSince: Schema.optional(Schema.String),
      credentialsMissingSince: Schema.optional(Schema.String),
      credentialsRejectedSince: Schema.optional(Schema.String),
      discoveryMessage: Schema.optional(Schema.String),
      discoveryMessageV2: Schema.optional(Schema.String),
      inUseBy: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              clientType: "client_type",
              name: "name",
            }),
          ),
        ),
      ),
      lastDiscoveryCompletedAt: Schema.optional(Schema.String),
      lastDiscoveryCompletedAtV2: Schema.optional(Schema.String),
      lastDiscoveryStartedAt: Schema.optional(Schema.String),
      lastDiscoveryStartedAtV2: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        discoveryProgress: "discovery_progress",
        discoveryProgressV2: "discovery_progress_v2",
        lastDiscoveryStatus: "last_discovery_status",
        lastDiscoveryStatusV2: "last_discovery_status_v2",
        regions: "regions",
        credentialsGoodSince: "credentials_good_since",
        credentialsMissingSince: "credentials_missing_since",
        credentialsRejectedSince: "credentials_rejected_since",
        discoveryMessage: "discovery_message",
        discoveryMessageV2: "discovery_message_v2",
        inUseBy: "in_use_by",
        lastDiscoveryCompletedAt: "last_discovery_completed_at",
        lastDiscoveryCompletedAtV2: "last_discovery_completed_at_v2",
        lastDiscoveryStartedAt: "last_discovery_started_at",
        lastDiscoveryStartedAtV2: "last_discovery_started_at_v2",
        lastUpdated: "last_updated",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    friendlyName: "friendly_name",
    lastUpdated: "last_updated",
    lifecycleState: "lifecycle_state",
    state: "state",
    stateV2: "state_v2",
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
    status: "status",
  }),
) as unknown as Schema.Schema<UpdateCloudIntegrationResponse>;

export type UpdateCloudIntegrationError = CommonErrors;

export const updateCloudIntegration: API.OperationMethod<
  UpdateCloudIntegrationRequest,
  UpdateCloudIntegrationResponse,
  UpdateCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateCloudIntegrationRequest,
  output: UpdateCloudIntegrationResponse,
  errors: [],
}));

export interface PatchCloudIntegrationRequest {
  providerId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  awsArn?: string;
  /** Body param: */
  azureSubscriptionId?: string;
  /** Body param: */
  azureTenantId?: string;
  /** Body param: */
  description?: string;
  /** Body param: */
  friendlyName?: string;
  /** Body param: */
  gcpProjectId?: string;
  /** Body param: */
  gcpServiceAccountEmail?: string;
}

export const PatchCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  friendlyName: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    friendlyName: "friendly_name",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}",
  }),
) as unknown as Schema.Schema<PatchCloudIntegrationRequest>;

export interface PatchCloudIntegrationResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  friendlyName: string;
  lastUpdated: string;
  lifecycleState: "ACTIVE" | "PENDING_SETUP" | "RETIRED";
  state: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  stateV2: "UNSPECIFIED" | "PENDING" | "DISCOVERING" | "FAILED" | "SUCCEEDED";
  awsArn?: string;
  azureSubscriptionId?: string;
  azureTenantId?: string;
  description?: string;
  gcpProjectId?: string;
  gcpServiceAccountEmail?: string;
  status?: {
    discoveryProgress: { done: number; total: number; unit: string };
    discoveryProgressV2: { done: number; total: number; unit: string };
    lastDiscoveryStatus:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    lastDiscoveryStatusV2:
      | "UNSPECIFIED"
      | "PENDING"
      | "DISCOVERING"
      | "FAILED"
      | "SUCCEEDED";
    regions: string[];
    credentialsGoodSince?: string;
    credentialsMissingSince?: string;
    credentialsRejectedSince?: string;
    discoveryMessage?: string;
    discoveryMessageV2?: string;
    inUseBy?: {
      id: string;
      clientType: "MAGIC_WAN_CLOUD_ONRAMP";
      name: string;
    }[];
    lastDiscoveryCompletedAt?: string;
    lastDiscoveryCompletedAtV2?: string;
    lastDiscoveryStartedAt?: string;
    lastDiscoveryStartedAtV2?: string;
    lastUpdated?: string;
  };
}

export const PatchCloudIntegrationResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  friendlyName: Schema.String,
  lastUpdated: Schema.String,
  lifecycleState: Schema.Literals(["ACTIVE", "PENDING_SETUP", "RETIRED"]),
  state: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  stateV2: Schema.Literals([
    "UNSPECIFIED",
    "PENDING",
    "DISCOVERING",
    "FAILED",
    "SUCCEEDED",
  ]),
  awsArn: Schema.optional(Schema.String),
  azureSubscriptionId: Schema.optional(Schema.String),
  azureTenantId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  gcpProjectId: Schema.optional(Schema.String),
  gcpServiceAccountEmail: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      discoveryProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      discoveryProgressV2: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
        unit: Schema.String,
      }),
      lastDiscoveryStatus: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      lastDiscoveryStatusV2: Schema.Literals([
        "UNSPECIFIED",
        "PENDING",
        "DISCOVERING",
        "FAILED",
        "SUCCEEDED",
      ]),
      regions: Schema.Array(Schema.String),
      credentialsGoodSince: Schema.optional(Schema.String),
      credentialsMissingSince: Schema.optional(Schema.String),
      credentialsRejectedSince: Schema.optional(Schema.String),
      discoveryMessage: Schema.optional(Schema.String),
      discoveryMessageV2: Schema.optional(Schema.String),
      inUseBy: Schema.optional(
        Schema.Array(
          Schema.Struct({
            id: Schema.String,
            clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
            name: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              clientType: "client_type",
              name: "name",
            }),
          ),
        ),
      ),
      lastDiscoveryCompletedAt: Schema.optional(Schema.String),
      lastDiscoveryCompletedAtV2: Schema.optional(Schema.String),
      lastDiscoveryStartedAt: Schema.optional(Schema.String),
      lastDiscoveryStartedAtV2: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        discoveryProgress: "discovery_progress",
        discoveryProgressV2: "discovery_progress_v2",
        lastDiscoveryStatus: "last_discovery_status",
        lastDiscoveryStatusV2: "last_discovery_status_v2",
        regions: "regions",
        credentialsGoodSince: "credentials_good_since",
        credentialsMissingSince: "credentials_missing_since",
        credentialsRejectedSince: "credentials_rejected_since",
        discoveryMessage: "discovery_message",
        discoveryMessageV2: "discovery_message_v2",
        inUseBy: "in_use_by",
        lastDiscoveryCompletedAt: "last_discovery_completed_at",
        lastDiscoveryCompletedAtV2: "last_discovery_completed_at_v2",
        lastDiscoveryStartedAt: "last_discovery_started_at",
        lastDiscoveryStartedAtV2: "last_discovery_started_at_v2",
        lastUpdated: "last_updated",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    friendlyName: "friendly_name",
    lastUpdated: "last_updated",
    lifecycleState: "lifecycle_state",
    state: "state",
    stateV2: "state_v2",
    awsArn: "aws_arn",
    azureSubscriptionId: "azure_subscription_id",
    azureTenantId: "azure_tenant_id",
    description: "description",
    gcpProjectId: "gcp_project_id",
    gcpServiceAccountEmail: "gcp_service_account_email",
    status: "status",
  }),
) as unknown as Schema.Schema<PatchCloudIntegrationResponse>;

export type PatchCloudIntegrationError = CommonErrors;

export const patchCloudIntegration: API.OperationMethod<
  PatchCloudIntegrationRequest,
  PatchCloudIntegrationResponse,
  PatchCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchCloudIntegrationRequest,
  output: PatchCloudIntegrationResponse,
  errors: [],
}));

export interface DeleteCloudIntegrationRequest {
  providerId: string;
  accountId: string;
}

export const DeleteCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}",
  }),
) as unknown as Schema.Schema<DeleteCloudIntegrationRequest>;

export interface DeleteCloudIntegrationResponse {
  id: string;
}

export const DeleteCloudIntegrationResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteCloudIntegrationResponse>;

export type DeleteCloudIntegrationError = CommonErrors;

export const deleteCloudIntegration: API.OperationMethod<
  DeleteCloudIntegrationRequest,
  DeleteCloudIntegrationResponse,
  DeleteCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteCloudIntegrationRequest,
  output: DeleteCloudIntegrationResponse,
  errors: [],
}));

export interface DiscoverCloudIntegrationRequest {
  providerId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  v2?: boolean;
}

export const DiscoverCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  v2: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("v2")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}/discover",
  }),
) as unknown as Schema.Schema<DiscoverCloudIntegrationRequest>;

export interface DiscoverCloudIntegrationResponse {
  errors: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  messages: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  success: boolean;
}

export const DiscoverCloudIntegrationResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<DiscoverCloudIntegrationResponse>;

export type DiscoverCloudIntegrationError = CommonErrors;

export const discoverCloudIntegration: API.OperationMethod<
  DiscoverCloudIntegrationRequest,
  DiscoverCloudIntegrationResponse,
  DiscoverCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DiscoverCloudIntegrationRequest,
  output: DiscoverCloudIntegrationResponse,
  errors: [],
}));

// =============================================================================
// OnRamp
// =============================================================================

export interface GetOnRampRequest {
  onrampId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  plannedResources?: boolean;
  /** Query param: */
  postApplyResources?: boolean;
  /** Query param: */
  status?: boolean;
  /** Query param: */
  vpcs?: boolean;
}

export const GetOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  plannedResources: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("planned_resources"),
  ),
  postApplyResources: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("post_apply_resources"),
  ),
  status: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("status")),
  vpcs: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("vpcs")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}",
  }),
) as unknown as Schema.Schema<GetOnRampRequest>;

export interface GetOnRampResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  dynamicRouting: boolean;
  installRoutesInCloud: boolean;
  installRoutesInMagicWan: boolean;
  name: string;
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  updatedAt: string;
  attachedHubs?: string[];
  attachedVpcs?: string[];
  cloudAsn?: number;
  description?: string;
  hub?: string;
  lastAppliedAt?: string;
  lastExportedAt?: string;
  lastPlannedAt?: string;
  manageHubToHubAttachments?: boolean;
  manageVpcToHubAttachments?: boolean;
  plannedMonthlyCostEstimate?: {
    currency: string;
    currentMonthlyCost: number;
    diff: number;
    proposedMonthlyCost: number;
  };
  plannedResources?: {
    diff: {
      diff: string;
      leftDescription: string;
      leftYaml: string;
      rightDescription: string;
      rightYaml: string;
    };
    keysRequireReplace: string[];
    monthlyCostEstimateDiff: {
      currency: string;
      currentMonthlyCost: number;
      diff: number;
      proposedMonthlyCost: number;
    };
    plannedAction: "no_op" | "create" | "update" | "replace" | "destroy";
    resource: {
      id: string;
      cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
      detail: string;
      name: string;
      resourceType:
        | "aws_customer_gateway"
        | "aws_egress_only_internet_gateway"
        | "aws_internet_gateway"
        | "aws_instance"
        | "aws_network_interface"
        | "aws_route"
        | "aws_route_table"
        | "aws_route_table_association"
        | "aws_subnet"
        | "aws_vpc"
        | "aws_vpc_ipv4_cidr_block_association"
        | "aws_vpn_connection"
        | "aws_vpn_connection_route"
        | "aws_vpn_gateway"
        | "aws_security_group"
        | "aws_vpc_security_group_ingress_rule"
        | "aws_vpc_security_group_egress_rule"
        | "aws_ec2_managed_prefix_list"
        | "aws_ec2_transit_gateway"
        | "aws_ec2_transit_gateway_prefix_list_reference"
        | "aws_ec2_transit_gateway_vpc_attachment"
        | "azurerm_application_security_group"
        | "azurerm_lb"
        | "azurerm_lb_backend_address_pool"
        | "azurerm_lb_nat_pool"
        | "azurerm_lb_nat_rule"
        | "azurerm_lb_rule"
        | "azurerm_local_network_gateway"
        | "azurerm_network_interface"
        | "azurerm_network_interface_application_security_group_association"
        | "azurerm_network_interface_backend_address_pool_association"
        | "azurerm_network_interface_security_group_association"
        | "azurerm_network_security_group"
        | "azurerm_public_ip"
        | "azurerm_route"
        | "azurerm_route_table"
        | "azurerm_subnet"
        | "azurerm_subnet_route_table_association"
        | "azurerm_virtual_machine"
        | "azurerm_virtual_network_gateway_connection"
        | "azurerm_virtual_network"
        | "azurerm_virtual_network_gateway"
        | "google_compute_network"
        | "google_compute_subnetwork"
        | "google_compute_vpn_gateway"
        | "google_compute_vpn_tunnel"
        | "google_compute_route"
        | "google_compute_address"
        | "google_compute_global_address"
        | "google_compute_router"
        | "google_compute_interconnect_attachment"
        | "google_compute_ha_vpn_gateway"
        | "google_compute_forwarding_rule"
        | "google_compute_network_firewall_policy"
        | "google_compute_network_firewall_policy_rule"
        | "cloudflare_static_route"
        | "cloudflare_ipsec_tunnel";
      title: string;
    };
  }[];
  plannedResourcesUnavailable?: boolean;
  postApplyMonthlyCostEstimate?: { currency: string; monthlyCost: number };
  postApplyResources?: Record<string, unknown>;
  postApplyResourcesUnavailable?: boolean;
  region?: string;
  status?: {
    applyProgress: { done: number; total: number };
    lifecycleState:
      | "OnrampNeedsApply"
      | "OnrampPendingPlan"
      | "OnrampPlanning"
      | "OnrampPlanFailed"
      | "OnrampPendingApproval"
      | "OnrampPendingApply"
      | "OnrampApplying"
      | "OnrampApplyFailed"
      | "OnrampActive"
      | "OnrampPendingDestroy"
      | "OnrampDestroying"
      | "OnrampDestroyFailed";
    planProgress: { done: number; total: number };
    routes: string[];
    tunnels: string[];
    lifecycleErrors?: Record<string, unknown>;
  };
  vpc?: string;
  vpcsById?: Record<string, unknown>;
  /** The list of vpc IDs for which resource details failed to generate. */
  vpcsByIdUnavailable?: string[];
}

export const GetOnRampResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
  dynamicRouting: Schema.Boolean,
  installRoutesInCloud: Schema.Boolean,
  installRoutesInMagicWan: Schema.Boolean,
  name: Schema.String,
  type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
  updatedAt: Schema.String,
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  cloudAsn: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  lastAppliedAt: Schema.optional(Schema.String),
  lastExportedAt: Schema.optional(Schema.String),
  lastPlannedAt: Schema.optional(Schema.String),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  plannedMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      currentMonthlyCost: Schema.Number,
      diff: Schema.Number,
      proposedMonthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        currency: "currency",
        currentMonthlyCost: "current_monthly_cost",
        diff: "diff",
        proposedMonthlyCost: "proposed_monthly_cost",
      }),
    ),
  ),
  plannedResources: Schema.optional(
    Schema.Array(
      Schema.Struct({
        diff: Schema.Struct({
          diff: Schema.String,
          leftDescription: Schema.String,
          leftYaml: Schema.String,
          rightDescription: Schema.String,
          rightYaml: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            diff: "diff",
            leftDescription: "left_description",
            leftYaml: "left_yaml",
            rightDescription: "right_description",
            rightYaml: "right_yaml",
          }),
        ),
        keysRequireReplace: Schema.Array(Schema.String),
        monthlyCostEstimateDiff: Schema.Struct({
          currency: Schema.String,
          currentMonthlyCost: Schema.Number,
          diff: Schema.Number,
          proposedMonthlyCost: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            currency: "currency",
            currentMonthlyCost: "current_monthly_cost",
            diff: "diff",
            proposedMonthlyCost: "proposed_monthly_cost",
          }),
        ),
        plannedAction: Schema.Literals([
          "no_op",
          "create",
          "update",
          "replace",
          "destroy",
        ]),
        resource: Schema.Struct({
          id: Schema.String,
          cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
          detail: Schema.String,
          name: Schema.String,
          resourceType: Schema.Literals([
            "aws_customer_gateway",
            "aws_egress_only_internet_gateway",
            "aws_internet_gateway",
            "aws_instance",
            "aws_network_interface",
            "aws_route",
            "aws_route_table",
            "aws_route_table_association",
            "aws_subnet",
            "aws_vpc",
            "aws_vpc_ipv4_cidr_block_association",
            "aws_vpn_connection",
            "aws_vpn_connection_route",
            "aws_vpn_gateway",
            "aws_security_group",
            "aws_vpc_security_group_ingress_rule",
            "aws_vpc_security_group_egress_rule",
            "aws_ec2_managed_prefix_list",
            "aws_ec2_transit_gateway",
            "aws_ec2_transit_gateway_prefix_list_reference",
            "aws_ec2_transit_gateway_vpc_attachment",
            "azurerm_application_security_group",
            "azurerm_lb",
            "azurerm_lb_backend_address_pool",
            "azurerm_lb_nat_pool",
            "azurerm_lb_nat_rule",
            "azurerm_lb_rule",
            "azurerm_local_network_gateway",
            "azurerm_network_interface",
            "azurerm_network_interface_application_security_group_association",
            "azurerm_network_interface_backend_address_pool_association",
            "azurerm_network_interface_security_group_association",
            "azurerm_network_security_group",
            "azurerm_public_ip",
            "azurerm_route",
            "azurerm_route_table",
            "azurerm_subnet",
            "azurerm_subnet_route_table_association",
            "azurerm_virtual_machine",
            "azurerm_virtual_network_gateway_connection",
            "azurerm_virtual_network",
            "azurerm_virtual_network_gateway",
            "google_compute_network",
            "google_compute_subnetwork",
            "google_compute_vpn_gateway",
            "google_compute_vpn_tunnel",
            "google_compute_route",
            "google_compute_address",
            "google_compute_global_address",
            "google_compute_router",
            "google_compute_interconnect_attachment",
            "google_compute_ha_vpn_gateway",
            "google_compute_forwarding_rule",
            "google_compute_network_firewall_policy",
            "google_compute_network_firewall_policy_rule",
            "cloudflare_static_route",
            "cloudflare_ipsec_tunnel",
          ]),
          title: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudType: "cloud_type",
            detail: "detail",
            name: "name",
            resourceType: "resource_type",
            title: "title",
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          diff: "diff",
          keysRequireReplace: "keys_require_replace",
          monthlyCostEstimateDiff: "monthly_cost_estimate_diff",
          plannedAction: "planned_action",
          resource: "resource",
        }),
      ),
    ),
  ),
  plannedResourcesUnavailable: Schema.optional(Schema.Boolean),
  postApplyMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      monthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
    ),
  ),
  postApplyResources: Schema.optional(Schema.Struct({})),
  postApplyResourcesUnavailable: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      applyProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      lifecycleState: Schema.Literals([
        "OnrampNeedsApply",
        "OnrampPendingPlan",
        "OnrampPlanning",
        "OnrampPlanFailed",
        "OnrampPendingApproval",
        "OnrampPendingApply",
        "OnrampApplying",
        "OnrampApplyFailed",
        "OnrampActive",
        "OnrampPendingDestroy",
        "OnrampDestroying",
        "OnrampDestroyFailed",
      ]),
      planProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      routes: Schema.Array(Schema.String),
      tunnels: Schema.Array(Schema.String),
      lifecycleErrors: Schema.optional(Schema.Struct({})),
    }).pipe(
      Schema.encodeKeys({
        applyProgress: "apply_progress",
        lifecycleState: "lifecycle_state",
        planProgress: "plan_progress",
        routes: "routes",
        tunnels: "tunnels",
        lifecycleErrors: "lifecycle_errors",
      }),
    ),
  ),
  vpc: Schema.optional(Schema.String),
  vpcsById: Schema.optional(Schema.Struct({})),
  vpcsByIdUnavailable: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    dynamicRouting: "dynamic_routing",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    name: "name",
    type: "type",
    updatedAt: "updated_at",
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    cloudAsn: "cloud_asn",
    description: "description",
    hub: "hub",
    lastAppliedAt: "last_applied_at",
    lastExportedAt: "last_exported_at",
    lastPlannedAt: "last_planned_at",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    plannedMonthlyCostEstimate: "planned_monthly_cost_estimate",
    plannedResources: "planned_resources",
    plannedResourcesUnavailable: "planned_resources_unavailable",
    postApplyMonthlyCostEstimate: "post_apply_monthly_cost_estimate",
    postApplyResources: "post_apply_resources",
    postApplyResourcesUnavailable: "post_apply_resources_unavailable",
    region: "region",
    status: "status",
    vpc: "vpc",
    vpcsById: "vpcs_by_id",
    vpcsByIdUnavailable: "vpcs_by_id_unavailable",
  }),
) as unknown as Schema.Schema<GetOnRampResponse>;

export type GetOnRampError = CommonErrors;

export const getOnRamp: API.OperationMethod<
  GetOnRampRequest,
  GetOnRampResponse,
  GetOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOnRampRequest,
  output: GetOnRampResponse,
  errors: [],
}));

export interface ListOnRampsRequest {
  /** Path param: */
  accountId: string;
  /** Query param: */
  desc?: boolean;
  /** Query param: One of ["updated_at", "id", "cloud_type", "name"]. */
  orderBy?: string;
  /** Query param: */
  status?: boolean;
  /** Query param: */
  vpcs?: boolean;
}

export const ListOnRampsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  desc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("desc")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("order_by")),
  status: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("status")),
  vpcs: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("vpcs")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/magic/cloud/onramps" }),
) as unknown as Schema.Schema<ListOnRampsRequest>;

export type ListOnRampsResponse = {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  dynamicRouting: boolean;
  installRoutesInCloud: boolean;
  installRoutesInMagicWan: boolean;
  name: string;
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  updatedAt: string;
  attachedHubs?: string[];
  attachedVpcs?: string[];
  cloudAsn?: number;
  description?: string;
  hub?: string;
  lastAppliedAt?: string;
  lastExportedAt?: string;
  lastPlannedAt?: string;
  manageHubToHubAttachments?: boolean;
  manageVpcToHubAttachments?: boolean;
  plannedMonthlyCostEstimate?: {
    currency: string;
    currentMonthlyCost: number;
    diff: number;
    proposedMonthlyCost: number;
  };
  plannedResources?: {
    diff: {
      diff: string;
      leftDescription: string;
      leftYaml: string;
      rightDescription: string;
      rightYaml: string;
    };
    keysRequireReplace: string[];
    monthlyCostEstimateDiff: {
      currency: string;
      currentMonthlyCost: number;
      diff: number;
      proposedMonthlyCost: number;
    };
    plannedAction: "no_op" | "create" | "update" | "replace" | "destroy";
    resource: {
      id: string;
      cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
      detail: string;
      name: string;
      resourceType:
        | "aws_customer_gateway"
        | "aws_egress_only_internet_gateway"
        | "aws_internet_gateway"
        | "aws_instance"
        | "aws_network_interface"
        | "aws_route"
        | "aws_route_table"
        | "aws_route_table_association"
        | "aws_subnet"
        | "aws_vpc"
        | "aws_vpc_ipv4_cidr_block_association"
        | "aws_vpn_connection"
        | "aws_vpn_connection_route"
        | "aws_vpn_gateway"
        | "aws_security_group"
        | "aws_vpc_security_group_ingress_rule"
        | "aws_vpc_security_group_egress_rule"
        | "aws_ec2_managed_prefix_list"
        | "aws_ec2_transit_gateway"
        | "aws_ec2_transit_gateway_prefix_list_reference"
        | "aws_ec2_transit_gateway_vpc_attachment"
        | "azurerm_application_security_group"
        | "azurerm_lb"
        | "azurerm_lb_backend_address_pool"
        | "azurerm_lb_nat_pool"
        | "azurerm_lb_nat_rule"
        | "azurerm_lb_rule"
        | "azurerm_local_network_gateway"
        | "azurerm_network_interface"
        | "azurerm_network_interface_application_security_group_association"
        | "azurerm_network_interface_backend_address_pool_association"
        | "azurerm_network_interface_security_group_association"
        | "azurerm_network_security_group"
        | "azurerm_public_ip"
        | "azurerm_route"
        | "azurerm_route_table"
        | "azurerm_subnet"
        | "azurerm_subnet_route_table_association"
        | "azurerm_virtual_machine"
        | "azurerm_virtual_network_gateway_connection"
        | "azurerm_virtual_network"
        | "azurerm_virtual_network_gateway"
        | "google_compute_network"
        | "google_compute_subnetwork"
        | "google_compute_vpn_gateway"
        | "google_compute_vpn_tunnel"
        | "google_compute_route"
        | "google_compute_address"
        | "google_compute_global_address"
        | "google_compute_router"
        | "google_compute_interconnect_attachment"
        | "google_compute_ha_vpn_gateway"
        | "google_compute_forwarding_rule"
        | "google_compute_network_firewall_policy"
        | "google_compute_network_firewall_policy_rule"
        | "cloudflare_static_route"
        | "cloudflare_ipsec_tunnel";
      title: string;
    };
  }[];
  plannedResourcesUnavailable?: boolean;
  postApplyMonthlyCostEstimate?: { currency: string; monthlyCost: number };
  postApplyResources?: Record<string, unknown>;
  postApplyResourcesUnavailable?: boolean;
  region?: string;
  status?: {
    applyProgress: { done: number; total: number };
    lifecycleState:
      | "OnrampNeedsApply"
      | "OnrampPendingPlan"
      | "OnrampPlanning"
      | "OnrampPlanFailed"
      | "OnrampPendingApproval"
      | "OnrampPendingApply"
      | "OnrampApplying"
      | "OnrampApplyFailed"
      | "OnrampActive"
      | "OnrampPendingDestroy"
      | "OnrampDestroying"
      | "OnrampDestroyFailed";
    planProgress: { done: number; total: number };
    routes: string[];
    tunnels: string[];
    lifecycleErrors?: Record<string, unknown>;
  };
  vpc?: string;
  vpcsById?: Record<string, unknown>;
  vpcsByIdUnavailable?: string[];
}[];

export const ListOnRampsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
    dynamicRouting: Schema.Boolean,
    installRoutesInCloud: Schema.Boolean,
    installRoutesInMagicWan: Schema.Boolean,
    name: Schema.String,
    type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
    updatedAt: Schema.String,
    attachedHubs: Schema.optional(Schema.Array(Schema.String)),
    attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
    cloudAsn: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    hub: Schema.optional(Schema.String),
    lastAppliedAt: Schema.optional(Schema.String),
    lastExportedAt: Schema.optional(Schema.String),
    lastPlannedAt: Schema.optional(Schema.String),
    manageHubToHubAttachments: Schema.optional(Schema.Boolean),
    manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
    plannedMonthlyCostEstimate: Schema.optional(
      Schema.Struct({
        currency: Schema.String,
        currentMonthlyCost: Schema.Number,
        diff: Schema.Number,
        proposedMonthlyCost: Schema.Number,
      }).pipe(
        Schema.encodeKeys({
          currency: "currency",
          currentMonthlyCost: "current_monthly_cost",
          diff: "diff",
          proposedMonthlyCost: "proposed_monthly_cost",
        }),
      ),
    ),
    plannedResources: Schema.optional(
      Schema.Array(
        Schema.Struct({
          diff: Schema.Struct({
            diff: Schema.String,
            leftDescription: Schema.String,
            leftYaml: Schema.String,
            rightDescription: Schema.String,
            rightYaml: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              diff: "diff",
              leftDescription: "left_description",
              leftYaml: "left_yaml",
              rightDescription: "right_description",
              rightYaml: "right_yaml",
            }),
          ),
          keysRequireReplace: Schema.Array(Schema.String),
          monthlyCostEstimateDiff: Schema.Struct({
            currency: Schema.String,
            currentMonthlyCost: Schema.Number,
            diff: Schema.Number,
            proposedMonthlyCost: Schema.Number,
          }).pipe(
            Schema.encodeKeys({
              currency: "currency",
              currentMonthlyCost: "current_monthly_cost",
              diff: "diff",
              proposedMonthlyCost: "proposed_monthly_cost",
            }),
          ),
          plannedAction: Schema.Literals([
            "no_op",
            "create",
            "update",
            "replace",
            "destroy",
          ]),
          resource: Schema.Struct({
            id: Schema.String,
            cloudType: Schema.Literals([
              "AWS",
              "AZURE",
              "GOOGLE",
              "CLOUDFLARE",
            ]),
            detail: Schema.String,
            name: Schema.String,
            resourceType: Schema.Literals([
              "aws_customer_gateway",
              "aws_egress_only_internet_gateway",
              "aws_internet_gateway",
              "aws_instance",
              "aws_network_interface",
              "aws_route",
              "aws_route_table",
              "aws_route_table_association",
              "aws_subnet",
              "aws_vpc",
              "aws_vpc_ipv4_cidr_block_association",
              "aws_vpn_connection",
              "aws_vpn_connection_route",
              "aws_vpn_gateway",
              "aws_security_group",
              "aws_vpc_security_group_ingress_rule",
              "aws_vpc_security_group_egress_rule",
              "aws_ec2_managed_prefix_list",
              "aws_ec2_transit_gateway",
              "aws_ec2_transit_gateway_prefix_list_reference",
              "aws_ec2_transit_gateway_vpc_attachment",
              "azurerm_application_security_group",
              "azurerm_lb",
              "azurerm_lb_backend_address_pool",
              "azurerm_lb_nat_pool",
              "azurerm_lb_nat_rule",
              "azurerm_lb_rule",
              "azurerm_local_network_gateway",
              "azurerm_network_interface",
              "azurerm_network_interface_application_security_group_association",
              "azurerm_network_interface_backend_address_pool_association",
              "azurerm_network_interface_security_group_association",
              "azurerm_network_security_group",
              "azurerm_public_ip",
              "azurerm_route",
              "azurerm_route_table",
              "azurerm_subnet",
              "azurerm_subnet_route_table_association",
              "azurerm_virtual_machine",
              "azurerm_virtual_network_gateway_connection",
              "azurerm_virtual_network",
              "azurerm_virtual_network_gateway",
              "google_compute_network",
              "google_compute_subnetwork",
              "google_compute_vpn_gateway",
              "google_compute_vpn_tunnel",
              "google_compute_route",
              "google_compute_address",
              "google_compute_global_address",
              "google_compute_router",
              "google_compute_interconnect_attachment",
              "google_compute_ha_vpn_gateway",
              "google_compute_forwarding_rule",
              "google_compute_network_firewall_policy",
              "google_compute_network_firewall_policy_rule",
              "cloudflare_static_route",
              "cloudflare_ipsec_tunnel",
            ]),
            title: Schema.String,
          }).pipe(
            Schema.encodeKeys({
              id: "id",
              cloudType: "cloud_type",
              detail: "detail",
              name: "name",
              resourceType: "resource_type",
              title: "title",
            }),
          ),
        }).pipe(
          Schema.encodeKeys({
            diff: "diff",
            keysRequireReplace: "keys_require_replace",
            monthlyCostEstimateDiff: "monthly_cost_estimate_diff",
            plannedAction: "planned_action",
            resource: "resource",
          }),
        ),
      ),
    ),
    plannedResourcesUnavailable: Schema.optional(Schema.Boolean),
    postApplyMonthlyCostEstimate: Schema.optional(
      Schema.Struct({
        currency: Schema.String,
        monthlyCost: Schema.Number,
      }).pipe(
        Schema.encodeKeys({
          currency: "currency",
          monthlyCost: "monthly_cost",
        }),
      ),
    ),
    postApplyResources: Schema.optional(Schema.Struct({})),
    postApplyResourcesUnavailable: Schema.optional(Schema.Boolean),
    region: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Struct({
        applyProgress: Schema.Struct({
          done: Schema.Number,
          total: Schema.Number,
        }),
        lifecycleState: Schema.Literals([
          "OnrampNeedsApply",
          "OnrampPendingPlan",
          "OnrampPlanning",
          "OnrampPlanFailed",
          "OnrampPendingApproval",
          "OnrampPendingApply",
          "OnrampApplying",
          "OnrampApplyFailed",
          "OnrampActive",
          "OnrampPendingDestroy",
          "OnrampDestroying",
          "OnrampDestroyFailed",
        ]),
        planProgress: Schema.Struct({
          done: Schema.Number,
          total: Schema.Number,
        }),
        routes: Schema.Array(Schema.String),
        tunnels: Schema.Array(Schema.String),
        lifecycleErrors: Schema.optional(Schema.Struct({})),
      }).pipe(
        Schema.encodeKeys({
          applyProgress: "apply_progress",
          lifecycleState: "lifecycle_state",
          planProgress: "plan_progress",
          routes: "routes",
          tunnels: "tunnels",
          lifecycleErrors: "lifecycle_errors",
        }),
      ),
    ),
    vpc: Schema.optional(Schema.String),
    vpcsById: Schema.optional(Schema.Struct({})),
    vpcsByIdUnavailable: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      cloudType: "cloud_type",
      dynamicRouting: "dynamic_routing",
      installRoutesInCloud: "install_routes_in_cloud",
      installRoutesInMagicWan: "install_routes_in_magic_wan",
      name: "name",
      type: "type",
      updatedAt: "updated_at",
      attachedHubs: "attached_hubs",
      attachedVpcs: "attached_vpcs",
      cloudAsn: "cloud_asn",
      description: "description",
      hub: "hub",
      lastAppliedAt: "last_applied_at",
      lastExportedAt: "last_exported_at",
      lastPlannedAt: "last_planned_at",
      manageHubToHubAttachments: "manage_hub_to_hub_attachments",
      manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
      plannedMonthlyCostEstimate: "planned_monthly_cost_estimate",
      plannedResources: "planned_resources",
      plannedResourcesUnavailable: "planned_resources_unavailable",
      postApplyMonthlyCostEstimate: "post_apply_monthly_cost_estimate",
      postApplyResources: "post_apply_resources",
      postApplyResourcesUnavailable: "post_apply_resources_unavailable",
      region: "region",
      status: "status",
      vpc: "vpc",
      vpcsById: "vpcs_by_id",
      vpcsByIdUnavailable: "vpcs_by_id_unavailable",
    }),
  ),
) as unknown as Schema.Schema<ListOnRampsResponse>;

export type ListOnRampsError = CommonErrors;

export const listOnRamps: API.OperationMethod<
  ListOnRampsRequest,
  ListOnRampsResponse,
  ListOnRampsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOnRampsRequest,
  output: ListOnRampsResponse,
  errors: [],
}));

export interface CreateOnRampRequest {
  /** Path param: */
  accountId: string;
  /** Header param: */
  forwarded?: string;
  /** Body param: */
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  /** Body param: if set to true, install_routes_in_cloud and install_routes_in_magic_wan should be set to false */
  dynamicRouting: boolean;
  /** Body param: */
  installRoutesInCloud: boolean;
  /** Body param: */
  installRoutesInMagicWan: boolean;
  /** Body param: */
  name: string;
  /** Body param: */
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  /** Body param: */
  adoptedHubId?: string;
  /** Body param: */
  attachedHubs?: string[];
  /** Body param: */
  attachedVpcs?: string[];
  /** Body param: the ASN to use on the cloud side. If unset or zero, the cloud's default will be used. */
  cloudAsn?: number;
  /** Body param: */
  description?: string;
  /** Body param: */
  hubProviderId?: string;
  /** Body param: */
  manageHubToHubAttachments?: boolean;
  /** Body param: */
  manageVpcToHubAttachments?: boolean;
  /** Body param: */
  region?: string;
  /** Body param: */
  vpc?: string;
}

export const CreateOnRampRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  forwarded: Schema.optional(Schema.String).pipe(T.HttpHeader("forwarded")),
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
  dynamicRouting: Schema.Boolean,
  installRoutesInCloud: Schema.Boolean,
  installRoutesInMagicWan: Schema.Boolean,
  name: Schema.String,
  type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
  adoptedHubId: Schema.optional(Schema.String),
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  cloudAsn: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  hubProviderId: Schema.optional(Schema.String),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  vpc: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    cloudType: "cloud_type",
    dynamicRouting: "dynamic_routing",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    name: "name",
    type: "type",
    adoptedHubId: "adopted_hub_id",
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    cloudAsn: "cloud_asn",
    description: "description",
    hubProviderId: "hub_provider_id",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    region: "region",
    vpc: "vpc",
  }),
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/onramps",
  }),
) as unknown as Schema.Schema<CreateOnRampRequest>;

export interface CreateOnRampResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  dynamicRouting: boolean;
  installRoutesInCloud: boolean;
  installRoutesInMagicWan: boolean;
  name: string;
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  updatedAt: string;
  attachedHubs?: string[];
  attachedVpcs?: string[];
  cloudAsn?: number;
  description?: string;
  hub?: string;
  lastAppliedAt?: string;
  lastExportedAt?: string;
  lastPlannedAt?: string;
  manageHubToHubAttachments?: boolean;
  manageVpcToHubAttachments?: boolean;
  plannedMonthlyCostEstimate?: {
    currency: string;
    currentMonthlyCost: number;
    diff: number;
    proposedMonthlyCost: number;
  };
  plannedResources?: {
    diff: {
      diff: string;
      leftDescription: string;
      leftYaml: string;
      rightDescription: string;
      rightYaml: string;
    };
    keysRequireReplace: string[];
    monthlyCostEstimateDiff: {
      currency: string;
      currentMonthlyCost: number;
      diff: number;
      proposedMonthlyCost: number;
    };
    plannedAction: "no_op" | "create" | "update" | "replace" | "destroy";
    resource: {
      id: string;
      cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
      detail: string;
      name: string;
      resourceType:
        | "aws_customer_gateway"
        | "aws_egress_only_internet_gateway"
        | "aws_internet_gateway"
        | "aws_instance"
        | "aws_network_interface"
        | "aws_route"
        | "aws_route_table"
        | "aws_route_table_association"
        | "aws_subnet"
        | "aws_vpc"
        | "aws_vpc_ipv4_cidr_block_association"
        | "aws_vpn_connection"
        | "aws_vpn_connection_route"
        | "aws_vpn_gateway"
        | "aws_security_group"
        | "aws_vpc_security_group_ingress_rule"
        | "aws_vpc_security_group_egress_rule"
        | "aws_ec2_managed_prefix_list"
        | "aws_ec2_transit_gateway"
        | "aws_ec2_transit_gateway_prefix_list_reference"
        | "aws_ec2_transit_gateway_vpc_attachment"
        | "azurerm_application_security_group"
        | "azurerm_lb"
        | "azurerm_lb_backend_address_pool"
        | "azurerm_lb_nat_pool"
        | "azurerm_lb_nat_rule"
        | "azurerm_lb_rule"
        | "azurerm_local_network_gateway"
        | "azurerm_network_interface"
        | "azurerm_network_interface_application_security_group_association"
        | "azurerm_network_interface_backend_address_pool_association"
        | "azurerm_network_interface_security_group_association"
        | "azurerm_network_security_group"
        | "azurerm_public_ip"
        | "azurerm_route"
        | "azurerm_route_table"
        | "azurerm_subnet"
        | "azurerm_subnet_route_table_association"
        | "azurerm_virtual_machine"
        | "azurerm_virtual_network_gateway_connection"
        | "azurerm_virtual_network"
        | "azurerm_virtual_network_gateway"
        | "google_compute_network"
        | "google_compute_subnetwork"
        | "google_compute_vpn_gateway"
        | "google_compute_vpn_tunnel"
        | "google_compute_route"
        | "google_compute_address"
        | "google_compute_global_address"
        | "google_compute_router"
        | "google_compute_interconnect_attachment"
        | "google_compute_ha_vpn_gateway"
        | "google_compute_forwarding_rule"
        | "google_compute_network_firewall_policy"
        | "google_compute_network_firewall_policy_rule"
        | "cloudflare_static_route"
        | "cloudflare_ipsec_tunnel";
      title: string;
    };
  }[];
  plannedResourcesUnavailable?: boolean;
  postApplyMonthlyCostEstimate?: { currency: string; monthlyCost: number };
  postApplyResources?: Record<string, unknown>;
  postApplyResourcesUnavailable?: boolean;
  region?: string;
  status?: {
    applyProgress: { done: number; total: number };
    lifecycleState:
      | "OnrampNeedsApply"
      | "OnrampPendingPlan"
      | "OnrampPlanning"
      | "OnrampPlanFailed"
      | "OnrampPendingApproval"
      | "OnrampPendingApply"
      | "OnrampApplying"
      | "OnrampApplyFailed"
      | "OnrampActive"
      | "OnrampPendingDestroy"
      | "OnrampDestroying"
      | "OnrampDestroyFailed";
    planProgress: { done: number; total: number };
    routes: string[];
    tunnels: string[];
    lifecycleErrors?: Record<string, unknown>;
  };
  vpc?: string;
  vpcsById?: Record<string, unknown>;
  /** The list of vpc IDs for which resource details failed to generate. */
  vpcsByIdUnavailable?: string[];
}

export const CreateOnRampResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
  dynamicRouting: Schema.Boolean,
  installRoutesInCloud: Schema.Boolean,
  installRoutesInMagicWan: Schema.Boolean,
  name: Schema.String,
  type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
  updatedAt: Schema.String,
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  cloudAsn: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  lastAppliedAt: Schema.optional(Schema.String),
  lastExportedAt: Schema.optional(Schema.String),
  lastPlannedAt: Schema.optional(Schema.String),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  plannedMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      currentMonthlyCost: Schema.Number,
      diff: Schema.Number,
      proposedMonthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        currency: "currency",
        currentMonthlyCost: "current_monthly_cost",
        diff: "diff",
        proposedMonthlyCost: "proposed_monthly_cost",
      }),
    ),
  ),
  plannedResources: Schema.optional(
    Schema.Array(
      Schema.Struct({
        diff: Schema.Struct({
          diff: Schema.String,
          leftDescription: Schema.String,
          leftYaml: Schema.String,
          rightDescription: Schema.String,
          rightYaml: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            diff: "diff",
            leftDescription: "left_description",
            leftYaml: "left_yaml",
            rightDescription: "right_description",
            rightYaml: "right_yaml",
          }),
        ),
        keysRequireReplace: Schema.Array(Schema.String),
        monthlyCostEstimateDiff: Schema.Struct({
          currency: Schema.String,
          currentMonthlyCost: Schema.Number,
          diff: Schema.Number,
          proposedMonthlyCost: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            currency: "currency",
            currentMonthlyCost: "current_monthly_cost",
            diff: "diff",
            proposedMonthlyCost: "proposed_monthly_cost",
          }),
        ),
        plannedAction: Schema.Literals([
          "no_op",
          "create",
          "update",
          "replace",
          "destroy",
        ]),
        resource: Schema.Struct({
          id: Schema.String,
          cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
          detail: Schema.String,
          name: Schema.String,
          resourceType: Schema.Literals([
            "aws_customer_gateway",
            "aws_egress_only_internet_gateway",
            "aws_internet_gateway",
            "aws_instance",
            "aws_network_interface",
            "aws_route",
            "aws_route_table",
            "aws_route_table_association",
            "aws_subnet",
            "aws_vpc",
            "aws_vpc_ipv4_cidr_block_association",
            "aws_vpn_connection",
            "aws_vpn_connection_route",
            "aws_vpn_gateway",
            "aws_security_group",
            "aws_vpc_security_group_ingress_rule",
            "aws_vpc_security_group_egress_rule",
            "aws_ec2_managed_prefix_list",
            "aws_ec2_transit_gateway",
            "aws_ec2_transit_gateway_prefix_list_reference",
            "aws_ec2_transit_gateway_vpc_attachment",
            "azurerm_application_security_group",
            "azurerm_lb",
            "azurerm_lb_backend_address_pool",
            "azurerm_lb_nat_pool",
            "azurerm_lb_nat_rule",
            "azurerm_lb_rule",
            "azurerm_local_network_gateway",
            "azurerm_network_interface",
            "azurerm_network_interface_application_security_group_association",
            "azurerm_network_interface_backend_address_pool_association",
            "azurerm_network_interface_security_group_association",
            "azurerm_network_security_group",
            "azurerm_public_ip",
            "azurerm_route",
            "azurerm_route_table",
            "azurerm_subnet",
            "azurerm_subnet_route_table_association",
            "azurerm_virtual_machine",
            "azurerm_virtual_network_gateway_connection",
            "azurerm_virtual_network",
            "azurerm_virtual_network_gateway",
            "google_compute_network",
            "google_compute_subnetwork",
            "google_compute_vpn_gateway",
            "google_compute_vpn_tunnel",
            "google_compute_route",
            "google_compute_address",
            "google_compute_global_address",
            "google_compute_router",
            "google_compute_interconnect_attachment",
            "google_compute_ha_vpn_gateway",
            "google_compute_forwarding_rule",
            "google_compute_network_firewall_policy",
            "google_compute_network_firewall_policy_rule",
            "cloudflare_static_route",
            "cloudflare_ipsec_tunnel",
          ]),
          title: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudType: "cloud_type",
            detail: "detail",
            name: "name",
            resourceType: "resource_type",
            title: "title",
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          diff: "diff",
          keysRequireReplace: "keys_require_replace",
          monthlyCostEstimateDiff: "monthly_cost_estimate_diff",
          plannedAction: "planned_action",
          resource: "resource",
        }),
      ),
    ),
  ),
  plannedResourcesUnavailable: Schema.optional(Schema.Boolean),
  postApplyMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      monthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
    ),
  ),
  postApplyResources: Schema.optional(Schema.Struct({})),
  postApplyResourcesUnavailable: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      applyProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      lifecycleState: Schema.Literals([
        "OnrampNeedsApply",
        "OnrampPendingPlan",
        "OnrampPlanning",
        "OnrampPlanFailed",
        "OnrampPendingApproval",
        "OnrampPendingApply",
        "OnrampApplying",
        "OnrampApplyFailed",
        "OnrampActive",
        "OnrampPendingDestroy",
        "OnrampDestroying",
        "OnrampDestroyFailed",
      ]),
      planProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      routes: Schema.Array(Schema.String),
      tunnels: Schema.Array(Schema.String),
      lifecycleErrors: Schema.optional(Schema.Struct({})),
    }).pipe(
      Schema.encodeKeys({
        applyProgress: "apply_progress",
        lifecycleState: "lifecycle_state",
        planProgress: "plan_progress",
        routes: "routes",
        tunnels: "tunnels",
        lifecycleErrors: "lifecycle_errors",
      }),
    ),
  ),
  vpc: Schema.optional(Schema.String),
  vpcsById: Schema.optional(Schema.Struct({})),
  vpcsByIdUnavailable: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    dynamicRouting: "dynamic_routing",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    name: "name",
    type: "type",
    updatedAt: "updated_at",
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    cloudAsn: "cloud_asn",
    description: "description",
    hub: "hub",
    lastAppliedAt: "last_applied_at",
    lastExportedAt: "last_exported_at",
    lastPlannedAt: "last_planned_at",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    plannedMonthlyCostEstimate: "planned_monthly_cost_estimate",
    plannedResources: "planned_resources",
    plannedResourcesUnavailable: "planned_resources_unavailable",
    postApplyMonthlyCostEstimate: "post_apply_monthly_cost_estimate",
    postApplyResources: "post_apply_resources",
    postApplyResourcesUnavailable: "post_apply_resources_unavailable",
    region: "region",
    status: "status",
    vpc: "vpc",
    vpcsById: "vpcs_by_id",
    vpcsByIdUnavailable: "vpcs_by_id_unavailable",
  }),
) as unknown as Schema.Schema<CreateOnRampResponse>;

export type CreateOnRampError = CommonErrors;

export const createOnRamp: API.OperationMethod<
  CreateOnRampRequest,
  CreateOnRampResponse,
  CreateOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOnRampRequest,
  output: CreateOnRampResponse,
  errors: [],
}));

export interface UpdateOnRampRequest {
  onrampId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  attachedHubs?: string[];
  /** Body param: */
  attachedVpcs?: string[];
  /** Body param: */
  description?: string;
  /** Body param: */
  installRoutesInCloud?: boolean;
  /** Body param: */
  installRoutesInMagicWan?: boolean;
  /** Body param: */
  manageHubToHubAttachments?: boolean;
  /** Body param: */
  manageVpcToHubAttachments?: boolean;
  /** Body param: */
  name?: string;
  /** Body param: */
  vpc?: string;
}

export const UpdateOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  installRoutesInCloud: Schema.optional(Schema.Boolean),
  installRoutesInMagicWan: Schema.optional(Schema.Boolean),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  vpc: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    description: "description",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    name: "name",
    vpc: "vpc",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}",
  }),
) as unknown as Schema.Schema<UpdateOnRampRequest>;

export interface UpdateOnRampResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  dynamicRouting: boolean;
  installRoutesInCloud: boolean;
  installRoutesInMagicWan: boolean;
  name: string;
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  updatedAt: string;
  attachedHubs?: string[];
  attachedVpcs?: string[];
  cloudAsn?: number;
  description?: string;
  hub?: string;
  lastAppliedAt?: string;
  lastExportedAt?: string;
  lastPlannedAt?: string;
  manageHubToHubAttachments?: boolean;
  manageVpcToHubAttachments?: boolean;
  plannedMonthlyCostEstimate?: {
    currency: string;
    currentMonthlyCost: number;
    diff: number;
    proposedMonthlyCost: number;
  };
  plannedResources?: {
    diff: {
      diff: string;
      leftDescription: string;
      leftYaml: string;
      rightDescription: string;
      rightYaml: string;
    };
    keysRequireReplace: string[];
    monthlyCostEstimateDiff: {
      currency: string;
      currentMonthlyCost: number;
      diff: number;
      proposedMonthlyCost: number;
    };
    plannedAction: "no_op" | "create" | "update" | "replace" | "destroy";
    resource: {
      id: string;
      cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
      detail: string;
      name: string;
      resourceType:
        | "aws_customer_gateway"
        | "aws_egress_only_internet_gateway"
        | "aws_internet_gateway"
        | "aws_instance"
        | "aws_network_interface"
        | "aws_route"
        | "aws_route_table"
        | "aws_route_table_association"
        | "aws_subnet"
        | "aws_vpc"
        | "aws_vpc_ipv4_cidr_block_association"
        | "aws_vpn_connection"
        | "aws_vpn_connection_route"
        | "aws_vpn_gateway"
        | "aws_security_group"
        | "aws_vpc_security_group_ingress_rule"
        | "aws_vpc_security_group_egress_rule"
        | "aws_ec2_managed_prefix_list"
        | "aws_ec2_transit_gateway"
        | "aws_ec2_transit_gateway_prefix_list_reference"
        | "aws_ec2_transit_gateway_vpc_attachment"
        | "azurerm_application_security_group"
        | "azurerm_lb"
        | "azurerm_lb_backend_address_pool"
        | "azurerm_lb_nat_pool"
        | "azurerm_lb_nat_rule"
        | "azurerm_lb_rule"
        | "azurerm_local_network_gateway"
        | "azurerm_network_interface"
        | "azurerm_network_interface_application_security_group_association"
        | "azurerm_network_interface_backend_address_pool_association"
        | "azurerm_network_interface_security_group_association"
        | "azurerm_network_security_group"
        | "azurerm_public_ip"
        | "azurerm_route"
        | "azurerm_route_table"
        | "azurerm_subnet"
        | "azurerm_subnet_route_table_association"
        | "azurerm_virtual_machine"
        | "azurerm_virtual_network_gateway_connection"
        | "azurerm_virtual_network"
        | "azurerm_virtual_network_gateway"
        | "google_compute_network"
        | "google_compute_subnetwork"
        | "google_compute_vpn_gateway"
        | "google_compute_vpn_tunnel"
        | "google_compute_route"
        | "google_compute_address"
        | "google_compute_global_address"
        | "google_compute_router"
        | "google_compute_interconnect_attachment"
        | "google_compute_ha_vpn_gateway"
        | "google_compute_forwarding_rule"
        | "google_compute_network_firewall_policy"
        | "google_compute_network_firewall_policy_rule"
        | "cloudflare_static_route"
        | "cloudflare_ipsec_tunnel";
      title: string;
    };
  }[];
  plannedResourcesUnavailable?: boolean;
  postApplyMonthlyCostEstimate?: { currency: string; monthlyCost: number };
  postApplyResources?: Record<string, unknown>;
  postApplyResourcesUnavailable?: boolean;
  region?: string;
  status?: {
    applyProgress: { done: number; total: number };
    lifecycleState:
      | "OnrampNeedsApply"
      | "OnrampPendingPlan"
      | "OnrampPlanning"
      | "OnrampPlanFailed"
      | "OnrampPendingApproval"
      | "OnrampPendingApply"
      | "OnrampApplying"
      | "OnrampApplyFailed"
      | "OnrampActive"
      | "OnrampPendingDestroy"
      | "OnrampDestroying"
      | "OnrampDestroyFailed";
    planProgress: { done: number; total: number };
    routes: string[];
    tunnels: string[];
    lifecycleErrors?: Record<string, unknown>;
  };
  vpc?: string;
  vpcsById?: Record<string, unknown>;
  /** The list of vpc IDs for which resource details failed to generate. */
  vpcsByIdUnavailable?: string[];
}

export const UpdateOnRampResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
  dynamicRouting: Schema.Boolean,
  installRoutesInCloud: Schema.Boolean,
  installRoutesInMagicWan: Schema.Boolean,
  name: Schema.String,
  type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
  updatedAt: Schema.String,
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  cloudAsn: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  lastAppliedAt: Schema.optional(Schema.String),
  lastExportedAt: Schema.optional(Schema.String),
  lastPlannedAt: Schema.optional(Schema.String),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  plannedMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      currentMonthlyCost: Schema.Number,
      diff: Schema.Number,
      proposedMonthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        currency: "currency",
        currentMonthlyCost: "current_monthly_cost",
        diff: "diff",
        proposedMonthlyCost: "proposed_monthly_cost",
      }),
    ),
  ),
  plannedResources: Schema.optional(
    Schema.Array(
      Schema.Struct({
        diff: Schema.Struct({
          diff: Schema.String,
          leftDescription: Schema.String,
          leftYaml: Schema.String,
          rightDescription: Schema.String,
          rightYaml: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            diff: "diff",
            leftDescription: "left_description",
            leftYaml: "left_yaml",
            rightDescription: "right_description",
            rightYaml: "right_yaml",
          }),
        ),
        keysRequireReplace: Schema.Array(Schema.String),
        monthlyCostEstimateDiff: Schema.Struct({
          currency: Schema.String,
          currentMonthlyCost: Schema.Number,
          diff: Schema.Number,
          proposedMonthlyCost: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            currency: "currency",
            currentMonthlyCost: "current_monthly_cost",
            diff: "diff",
            proposedMonthlyCost: "proposed_monthly_cost",
          }),
        ),
        plannedAction: Schema.Literals([
          "no_op",
          "create",
          "update",
          "replace",
          "destroy",
        ]),
        resource: Schema.Struct({
          id: Schema.String,
          cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
          detail: Schema.String,
          name: Schema.String,
          resourceType: Schema.Literals([
            "aws_customer_gateway",
            "aws_egress_only_internet_gateway",
            "aws_internet_gateway",
            "aws_instance",
            "aws_network_interface",
            "aws_route",
            "aws_route_table",
            "aws_route_table_association",
            "aws_subnet",
            "aws_vpc",
            "aws_vpc_ipv4_cidr_block_association",
            "aws_vpn_connection",
            "aws_vpn_connection_route",
            "aws_vpn_gateway",
            "aws_security_group",
            "aws_vpc_security_group_ingress_rule",
            "aws_vpc_security_group_egress_rule",
            "aws_ec2_managed_prefix_list",
            "aws_ec2_transit_gateway",
            "aws_ec2_transit_gateway_prefix_list_reference",
            "aws_ec2_transit_gateway_vpc_attachment",
            "azurerm_application_security_group",
            "azurerm_lb",
            "azurerm_lb_backend_address_pool",
            "azurerm_lb_nat_pool",
            "azurerm_lb_nat_rule",
            "azurerm_lb_rule",
            "azurerm_local_network_gateway",
            "azurerm_network_interface",
            "azurerm_network_interface_application_security_group_association",
            "azurerm_network_interface_backend_address_pool_association",
            "azurerm_network_interface_security_group_association",
            "azurerm_network_security_group",
            "azurerm_public_ip",
            "azurerm_route",
            "azurerm_route_table",
            "azurerm_subnet",
            "azurerm_subnet_route_table_association",
            "azurerm_virtual_machine",
            "azurerm_virtual_network_gateway_connection",
            "azurerm_virtual_network",
            "azurerm_virtual_network_gateway",
            "google_compute_network",
            "google_compute_subnetwork",
            "google_compute_vpn_gateway",
            "google_compute_vpn_tunnel",
            "google_compute_route",
            "google_compute_address",
            "google_compute_global_address",
            "google_compute_router",
            "google_compute_interconnect_attachment",
            "google_compute_ha_vpn_gateway",
            "google_compute_forwarding_rule",
            "google_compute_network_firewall_policy",
            "google_compute_network_firewall_policy_rule",
            "cloudflare_static_route",
            "cloudflare_ipsec_tunnel",
          ]),
          title: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudType: "cloud_type",
            detail: "detail",
            name: "name",
            resourceType: "resource_type",
            title: "title",
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          diff: "diff",
          keysRequireReplace: "keys_require_replace",
          monthlyCostEstimateDiff: "monthly_cost_estimate_diff",
          plannedAction: "planned_action",
          resource: "resource",
        }),
      ),
    ),
  ),
  plannedResourcesUnavailable: Schema.optional(Schema.Boolean),
  postApplyMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      monthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
    ),
  ),
  postApplyResources: Schema.optional(Schema.Struct({})),
  postApplyResourcesUnavailable: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      applyProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      lifecycleState: Schema.Literals([
        "OnrampNeedsApply",
        "OnrampPendingPlan",
        "OnrampPlanning",
        "OnrampPlanFailed",
        "OnrampPendingApproval",
        "OnrampPendingApply",
        "OnrampApplying",
        "OnrampApplyFailed",
        "OnrampActive",
        "OnrampPendingDestroy",
        "OnrampDestroying",
        "OnrampDestroyFailed",
      ]),
      planProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      routes: Schema.Array(Schema.String),
      tunnels: Schema.Array(Schema.String),
      lifecycleErrors: Schema.optional(Schema.Struct({})),
    }).pipe(
      Schema.encodeKeys({
        applyProgress: "apply_progress",
        lifecycleState: "lifecycle_state",
        planProgress: "plan_progress",
        routes: "routes",
        tunnels: "tunnels",
        lifecycleErrors: "lifecycle_errors",
      }),
    ),
  ),
  vpc: Schema.optional(Schema.String),
  vpcsById: Schema.optional(Schema.Struct({})),
  vpcsByIdUnavailable: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    dynamicRouting: "dynamic_routing",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    name: "name",
    type: "type",
    updatedAt: "updated_at",
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    cloudAsn: "cloud_asn",
    description: "description",
    hub: "hub",
    lastAppliedAt: "last_applied_at",
    lastExportedAt: "last_exported_at",
    lastPlannedAt: "last_planned_at",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    plannedMonthlyCostEstimate: "planned_monthly_cost_estimate",
    plannedResources: "planned_resources",
    plannedResourcesUnavailable: "planned_resources_unavailable",
    postApplyMonthlyCostEstimate: "post_apply_monthly_cost_estimate",
    postApplyResources: "post_apply_resources",
    postApplyResourcesUnavailable: "post_apply_resources_unavailable",
    region: "region",
    status: "status",
    vpc: "vpc",
    vpcsById: "vpcs_by_id",
    vpcsByIdUnavailable: "vpcs_by_id_unavailable",
  }),
) as unknown as Schema.Schema<UpdateOnRampResponse>;

export type UpdateOnRampError = CommonErrors;

export const updateOnRamp: API.OperationMethod<
  UpdateOnRampRequest,
  UpdateOnRampResponse,
  UpdateOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateOnRampRequest,
  output: UpdateOnRampResponse,
  errors: [],
}));

export interface PatchOnRampRequest {
  onrampId: string;
  /** Path param: */
  accountId: string;
  /** Body param: */
  attachedHubs?: string[];
  /** Body param: */
  attachedVpcs?: string[];
  /** Body param: */
  description?: string;
  /** Body param: */
  installRoutesInCloud?: boolean;
  /** Body param: */
  installRoutesInMagicWan?: boolean;
  /** Body param: */
  manageHubToHubAttachments?: boolean;
  /** Body param: */
  manageVpcToHubAttachments?: boolean;
  /** Body param: */
  name?: string;
  /** Body param: */
  vpc?: string;
}

export const PatchOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  installRoutesInCloud: Schema.optional(Schema.Boolean),
  installRoutesInMagicWan: Schema.optional(Schema.Boolean),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  vpc: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    description: "description",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    name: "name",
    vpc: "vpc",
  }),
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}",
  }),
) as unknown as Schema.Schema<PatchOnRampRequest>;

export interface PatchOnRampResponse {
  id: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE";
  dynamicRouting: boolean;
  installRoutesInCloud: boolean;
  installRoutesInMagicWan: boolean;
  name: string;
  type: "OnrampTypeSingle" | "OnrampTypeHub";
  updatedAt: string;
  attachedHubs?: string[];
  attachedVpcs?: string[];
  cloudAsn?: number;
  description?: string;
  hub?: string;
  lastAppliedAt?: string;
  lastExportedAt?: string;
  lastPlannedAt?: string;
  manageHubToHubAttachments?: boolean;
  manageVpcToHubAttachments?: boolean;
  plannedMonthlyCostEstimate?: {
    currency: string;
    currentMonthlyCost: number;
    diff: number;
    proposedMonthlyCost: number;
  };
  plannedResources?: {
    diff: {
      diff: string;
      leftDescription: string;
      leftYaml: string;
      rightDescription: string;
      rightYaml: string;
    };
    keysRequireReplace: string[];
    monthlyCostEstimateDiff: {
      currency: string;
      currentMonthlyCost: number;
      diff: number;
      proposedMonthlyCost: number;
    };
    plannedAction: "no_op" | "create" | "update" | "replace" | "destroy";
    resource: {
      id: string;
      cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
      detail: string;
      name: string;
      resourceType:
        | "aws_customer_gateway"
        | "aws_egress_only_internet_gateway"
        | "aws_internet_gateway"
        | "aws_instance"
        | "aws_network_interface"
        | "aws_route"
        | "aws_route_table"
        | "aws_route_table_association"
        | "aws_subnet"
        | "aws_vpc"
        | "aws_vpc_ipv4_cidr_block_association"
        | "aws_vpn_connection"
        | "aws_vpn_connection_route"
        | "aws_vpn_gateway"
        | "aws_security_group"
        | "aws_vpc_security_group_ingress_rule"
        | "aws_vpc_security_group_egress_rule"
        | "aws_ec2_managed_prefix_list"
        | "aws_ec2_transit_gateway"
        | "aws_ec2_transit_gateway_prefix_list_reference"
        | "aws_ec2_transit_gateway_vpc_attachment"
        | "azurerm_application_security_group"
        | "azurerm_lb"
        | "azurerm_lb_backend_address_pool"
        | "azurerm_lb_nat_pool"
        | "azurerm_lb_nat_rule"
        | "azurerm_lb_rule"
        | "azurerm_local_network_gateway"
        | "azurerm_network_interface"
        | "azurerm_network_interface_application_security_group_association"
        | "azurerm_network_interface_backend_address_pool_association"
        | "azurerm_network_interface_security_group_association"
        | "azurerm_network_security_group"
        | "azurerm_public_ip"
        | "azurerm_route"
        | "azurerm_route_table"
        | "azurerm_subnet"
        | "azurerm_subnet_route_table_association"
        | "azurerm_virtual_machine"
        | "azurerm_virtual_network_gateway_connection"
        | "azurerm_virtual_network"
        | "azurerm_virtual_network_gateway"
        | "google_compute_network"
        | "google_compute_subnetwork"
        | "google_compute_vpn_gateway"
        | "google_compute_vpn_tunnel"
        | "google_compute_route"
        | "google_compute_address"
        | "google_compute_global_address"
        | "google_compute_router"
        | "google_compute_interconnect_attachment"
        | "google_compute_ha_vpn_gateway"
        | "google_compute_forwarding_rule"
        | "google_compute_network_firewall_policy"
        | "google_compute_network_firewall_policy_rule"
        | "cloudflare_static_route"
        | "cloudflare_ipsec_tunnel";
      title: string;
    };
  }[];
  plannedResourcesUnavailable?: boolean;
  postApplyMonthlyCostEstimate?: { currency: string; monthlyCost: number };
  postApplyResources?: Record<string, unknown>;
  postApplyResourcesUnavailable?: boolean;
  region?: string;
  status?: {
    applyProgress: { done: number; total: number };
    lifecycleState:
      | "OnrampNeedsApply"
      | "OnrampPendingPlan"
      | "OnrampPlanning"
      | "OnrampPlanFailed"
      | "OnrampPendingApproval"
      | "OnrampPendingApply"
      | "OnrampApplying"
      | "OnrampApplyFailed"
      | "OnrampActive"
      | "OnrampPendingDestroy"
      | "OnrampDestroying"
      | "OnrampDestroyFailed";
    planProgress: { done: number; total: number };
    routes: string[];
    tunnels: string[];
    lifecycleErrors?: Record<string, unknown>;
  };
  vpc?: string;
  vpcsById?: Record<string, unknown>;
  /** The list of vpc IDs for which resource details failed to generate. */
  vpcsByIdUnavailable?: string[];
}

export const PatchOnRampResponse = Schema.Struct({
  id: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE"]),
  dynamicRouting: Schema.Boolean,
  installRoutesInCloud: Schema.Boolean,
  installRoutesInMagicWan: Schema.Boolean,
  name: Schema.String,
  type: Schema.Literals(["OnrampTypeSingle", "OnrampTypeHub"]),
  updatedAt: Schema.String,
  attachedHubs: Schema.optional(Schema.Array(Schema.String)),
  attachedVpcs: Schema.optional(Schema.Array(Schema.String)),
  cloudAsn: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  hub: Schema.optional(Schema.String),
  lastAppliedAt: Schema.optional(Schema.String),
  lastExportedAt: Schema.optional(Schema.String),
  lastPlannedAt: Schema.optional(Schema.String),
  manageHubToHubAttachments: Schema.optional(Schema.Boolean),
  manageVpcToHubAttachments: Schema.optional(Schema.Boolean),
  plannedMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      currentMonthlyCost: Schema.Number,
      diff: Schema.Number,
      proposedMonthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({
        currency: "currency",
        currentMonthlyCost: "current_monthly_cost",
        diff: "diff",
        proposedMonthlyCost: "proposed_monthly_cost",
      }),
    ),
  ),
  plannedResources: Schema.optional(
    Schema.Array(
      Schema.Struct({
        diff: Schema.Struct({
          diff: Schema.String,
          leftDescription: Schema.String,
          leftYaml: Schema.String,
          rightDescription: Schema.String,
          rightYaml: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            diff: "diff",
            leftDescription: "left_description",
            leftYaml: "left_yaml",
            rightDescription: "right_description",
            rightYaml: "right_yaml",
          }),
        ),
        keysRequireReplace: Schema.Array(Schema.String),
        monthlyCostEstimateDiff: Schema.Struct({
          currency: Schema.String,
          currentMonthlyCost: Schema.Number,
          diff: Schema.Number,
          proposedMonthlyCost: Schema.Number,
        }).pipe(
          Schema.encodeKeys({
            currency: "currency",
            currentMonthlyCost: "current_monthly_cost",
            diff: "diff",
            proposedMonthlyCost: "proposed_monthly_cost",
          }),
        ),
        plannedAction: Schema.Literals([
          "no_op",
          "create",
          "update",
          "replace",
          "destroy",
        ]),
        resource: Schema.Struct({
          id: Schema.String,
          cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
          detail: Schema.String,
          name: Schema.String,
          resourceType: Schema.Literals([
            "aws_customer_gateway",
            "aws_egress_only_internet_gateway",
            "aws_internet_gateway",
            "aws_instance",
            "aws_network_interface",
            "aws_route",
            "aws_route_table",
            "aws_route_table_association",
            "aws_subnet",
            "aws_vpc",
            "aws_vpc_ipv4_cidr_block_association",
            "aws_vpn_connection",
            "aws_vpn_connection_route",
            "aws_vpn_gateway",
            "aws_security_group",
            "aws_vpc_security_group_ingress_rule",
            "aws_vpc_security_group_egress_rule",
            "aws_ec2_managed_prefix_list",
            "aws_ec2_transit_gateway",
            "aws_ec2_transit_gateway_prefix_list_reference",
            "aws_ec2_transit_gateway_vpc_attachment",
            "azurerm_application_security_group",
            "azurerm_lb",
            "azurerm_lb_backend_address_pool",
            "azurerm_lb_nat_pool",
            "azurerm_lb_nat_rule",
            "azurerm_lb_rule",
            "azurerm_local_network_gateway",
            "azurerm_network_interface",
            "azurerm_network_interface_application_security_group_association",
            "azurerm_network_interface_backend_address_pool_association",
            "azurerm_network_interface_security_group_association",
            "azurerm_network_security_group",
            "azurerm_public_ip",
            "azurerm_route",
            "azurerm_route_table",
            "azurerm_subnet",
            "azurerm_subnet_route_table_association",
            "azurerm_virtual_machine",
            "azurerm_virtual_network_gateway_connection",
            "azurerm_virtual_network",
            "azurerm_virtual_network_gateway",
            "google_compute_network",
            "google_compute_subnetwork",
            "google_compute_vpn_gateway",
            "google_compute_vpn_tunnel",
            "google_compute_route",
            "google_compute_address",
            "google_compute_global_address",
            "google_compute_router",
            "google_compute_interconnect_attachment",
            "google_compute_ha_vpn_gateway",
            "google_compute_forwarding_rule",
            "google_compute_network_firewall_policy",
            "google_compute_network_firewall_policy_rule",
            "cloudflare_static_route",
            "cloudflare_ipsec_tunnel",
          ]),
          title: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            cloudType: "cloud_type",
            detail: "detail",
            name: "name",
            resourceType: "resource_type",
            title: "title",
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          diff: "diff",
          keysRequireReplace: "keys_require_replace",
          monthlyCostEstimateDiff: "monthly_cost_estimate_diff",
          plannedAction: "planned_action",
          resource: "resource",
        }),
      ),
    ),
  ),
  plannedResourcesUnavailable: Schema.optional(Schema.Boolean),
  postApplyMonthlyCostEstimate: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      monthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
    ),
  ),
  postApplyResources: Schema.optional(Schema.Struct({})),
  postApplyResourcesUnavailable: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Struct({
      applyProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      lifecycleState: Schema.Literals([
        "OnrampNeedsApply",
        "OnrampPendingPlan",
        "OnrampPlanning",
        "OnrampPlanFailed",
        "OnrampPendingApproval",
        "OnrampPendingApply",
        "OnrampApplying",
        "OnrampApplyFailed",
        "OnrampActive",
        "OnrampPendingDestroy",
        "OnrampDestroying",
        "OnrampDestroyFailed",
      ]),
      planProgress: Schema.Struct({
        done: Schema.Number,
        total: Schema.Number,
      }),
      routes: Schema.Array(Schema.String),
      tunnels: Schema.Array(Schema.String),
      lifecycleErrors: Schema.optional(Schema.Struct({})),
    }).pipe(
      Schema.encodeKeys({
        applyProgress: "apply_progress",
        lifecycleState: "lifecycle_state",
        planProgress: "plan_progress",
        routes: "routes",
        tunnels: "tunnels",
        lifecycleErrors: "lifecycle_errors",
      }),
    ),
  ),
  vpc: Schema.optional(Schema.String),
  vpcsById: Schema.optional(Schema.Struct({})),
  vpcsByIdUnavailable: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    cloudType: "cloud_type",
    dynamicRouting: "dynamic_routing",
    installRoutesInCloud: "install_routes_in_cloud",
    installRoutesInMagicWan: "install_routes_in_magic_wan",
    name: "name",
    type: "type",
    updatedAt: "updated_at",
    attachedHubs: "attached_hubs",
    attachedVpcs: "attached_vpcs",
    cloudAsn: "cloud_asn",
    description: "description",
    hub: "hub",
    lastAppliedAt: "last_applied_at",
    lastExportedAt: "last_exported_at",
    lastPlannedAt: "last_planned_at",
    manageHubToHubAttachments: "manage_hub_to_hub_attachments",
    manageVpcToHubAttachments: "manage_vpc_to_hub_attachments",
    plannedMonthlyCostEstimate: "planned_monthly_cost_estimate",
    plannedResources: "planned_resources",
    plannedResourcesUnavailable: "planned_resources_unavailable",
    postApplyMonthlyCostEstimate: "post_apply_monthly_cost_estimate",
    postApplyResources: "post_apply_resources",
    postApplyResourcesUnavailable: "post_apply_resources_unavailable",
    region: "region",
    status: "status",
    vpc: "vpc",
    vpcsById: "vpcs_by_id",
    vpcsByIdUnavailable: "vpcs_by_id_unavailable",
  }),
) as unknown as Schema.Schema<PatchOnRampResponse>;

export type PatchOnRampError = CommonErrors;

export const patchOnRamp: API.OperationMethod<
  PatchOnRampRequest,
  PatchOnRampResponse,
  PatchOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOnRampRequest,
  output: PatchOnRampResponse,
  errors: [],
}));

export interface DeleteOnRampRequest {
  onrampId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  destroy?: boolean;
  /** Query param: */
  force?: boolean;
}

export const DeleteOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  destroy: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("destroy")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}",
  }),
) as unknown as Schema.Schema<DeleteOnRampRequest>;

export interface DeleteOnRampResponse {
  id: string;
}

export const DeleteOnRampResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteOnRampResponse>;

export type DeleteOnRampError = CommonErrors;

export const deleteOnRamp: API.OperationMethod<
  DeleteOnRampRequest,
  DeleteOnRampResponse,
  DeleteOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOnRampRequest,
  output: DeleteOnRampResponse,
  errors: [],
}));

export interface ApplyOnRampRequest {
  onrampId: string;
  accountId: string;
}

export const ApplyOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}/apply",
  }),
) as unknown as Schema.Schema<ApplyOnRampRequest>;

export interface ApplyOnRampResponse {
  errors: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  messages: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  success: boolean;
}

export const ApplyOnRampResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<ApplyOnRampResponse>;

export type ApplyOnRampError = CommonErrors;

export const applyOnRamp: API.OperationMethod<
  ApplyOnRampRequest,
  ApplyOnRampResponse,
  ApplyOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ApplyOnRampRequest,
  output: ApplyOnRampResponse,
  errors: [],
}));

export interface ExportOnRampRequest {
  onrampId: string;
  accountId: string;
}

export const ExportOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}/export",
  }),
) as unknown as Schema.Schema<ExportOnRampRequest>;

export type ExportOnRampResponse = unknown;

export const ExportOnRampResponse =
  Schema.Unknown as unknown as Schema.Schema<ExportOnRampResponse>;

export type ExportOnRampError = CommonErrors;

export const exportOnRamp: API.OperationMethod<
  ExportOnRampRequest,
  ExportOnRampResponse,
  ExportOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportOnRampRequest,
  output: ExportOnRampResponse,
  errors: [],
}));

export interface PlanOnRampRequest {
  onrampId: string;
  accountId: string;
}

export const PlanOnRampRequest = Schema.Struct({
  onrampId: Schema.String.pipe(T.HttpPath("onrampId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/onramps/{onrampId}/plan",
  }),
) as unknown as Schema.Schema<PlanOnRampRequest>;

export interface PlanOnRampResponse {
  errors: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  messages: {
    code:
      | "1001"
      | "1002"
      | "1003"
      | "1004"
      | "1005"
      | "1006"
      | "1007"
      | "1008"
      | "1009"
      | "1010"
      | "1011"
      | "1012"
      | "1013"
      | "1014"
      | "1015"
      | "1016"
      | "1017"
      | "1018"
      | "2001"
      | "2002"
      | "2003"
      | "2004"
      | "2005"
      | "2006"
      | "2007"
      | "2008"
      | "2009"
      | "2010"
      | "2011"
      | "2012"
      | "2013"
      | "2014"
      | "2015"
      | "2016"
      | "2017"
      | "2018"
      | "2019"
      | "2020"
      | "2021"
      | "2022"
      | "3001"
      | "3002"
      | "3003"
      | "3004"
      | "3005"
      | "3006"
      | "3007"
      | "4001"
      | "4002"
      | "4003"
      | "4004"
      | "4005"
      | "4006"
      | "4007"
      | "4008"
      | "4009"
      | "4010"
      | "4011"
      | "4012"
      | "4013"
      | "4014"
      | "4015"
      | "4016"
      | "4017"
      | "4018"
      | "4019"
      | "4020"
      | "4021"
      | "4022"
      | "4023"
      | "5001"
      | "5002"
      | "5003"
      | "5004"
      | "102000"
      | "102001"
      | "102002"
      | "102003"
      | "102004"
      | "102005"
      | "102006"
      | "102007"
      | "102008"
      | "102009"
      | "102010"
      | "102011"
      | "102012"
      | "102013"
      | "102014"
      | "102015"
      | "102016"
      | "102017"
      | "102018"
      | "102019"
      | "102020"
      | "102021"
      | "102022"
      | "102023"
      | "102024"
      | "102025"
      | "102026"
      | "102027"
      | "102028"
      | "102029"
      | "102030"
      | "102031"
      | "102032"
      | "102033"
      | "102034"
      | "102035"
      | "102036"
      | "102037"
      | "102038"
      | "102039"
      | "102040"
      | "102041"
      | "102042"
      | "102043"
      | "102044"
      | "102045"
      | "102046"
      | "102047"
      | "102048"
      | "102049"
      | "102050"
      | "102051"
      | "102052"
      | "102053"
      | "102054"
      | "102055"
      | "102056"
      | "102057"
      | "102058"
      | "102059"
      | "102060"
      | "102061"
      | "102062"
      | "102063"
      | "102064"
      | "102065"
      | "102066"
      | "102067"
      | "102068"
      | "102069"
      | "102070"
      | "102071"
      | "102072"
      | "103001"
      | "103002"
      | "103003"
      | "103004"
      | "103005"
      | "103006"
      | "103007"
      | "103008";
    message: string;
    documentationUrl?: string;
    meta?: {
      l10nKey?: string;
      loggableError?: string;
      templateData?: unknown;
      traceId?: string;
    };
    source?: {
      parameter?: string;
      parameterValueIndex?: number;
      pointer?: string;
    };
  }[];
  success: boolean;
}

export const PlanOnRampResponse = Schema.Struct({
  errors: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  messages: Schema.Array(
    Schema.Struct({
      code: Schema.Literals([
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013",
        "1014",
        "1015",
        "1016",
        "1017",
        "1018",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "3001",
        "3002",
        "3003",
        "3004",
        "3005",
        "3006",
        "3007",
        "4001",
        "4002",
        "4003",
        "4004",
        "4005",
        "4006",
        "4007",
        "4008",
        "4009",
        "4010",
        "4011",
        "4012",
        "4013",
        "4014",
        "4015",
        "4016",
        "4017",
        "4018",
        "4019",
        "4020",
        "4021",
        "4022",
        "4023",
        "5001",
        "5002",
        "5003",
        "5004",
        "102000",
        "102001",
        "102002",
        "102003",
        "102004",
        "102005",
        "102006",
        "102007",
        "102008",
        "102009",
        "102010",
        "102011",
        "102012",
        "102013",
        "102014",
        "102015",
        "102016",
        "102017",
        "102018",
        "102019",
        "102020",
        "102021",
        "102022",
        "102023",
        "102024",
        "102025",
        "102026",
        "102027",
        "102028",
        "102029",
        "102030",
        "102031",
        "102032",
        "102033",
        "102034",
        "102035",
        "102036",
        "102037",
        "102038",
        "102039",
        "102040",
        "102041",
        "102042",
        "102043",
        "102044",
        "102045",
        "102046",
        "102047",
        "102048",
        "102049",
        "102050",
        "102051",
        "102052",
        "102053",
        "102054",
        "102055",
        "102056",
        "102057",
        "102058",
        "102059",
        "102060",
        "102061",
        "102062",
        "102063",
        "102064",
        "102065",
        "102066",
        "102067",
        "102068",
        "102069",
        "102070",
        "102071",
        "102072",
        "103001",
        "103002",
        "103003",
        "103004",
        "103005",
        "103006",
        "103007",
        "103008",
      ]),
      message: Schema.String,
      documentationUrl: Schema.optional(Schema.String),
      meta: Schema.optional(
        Schema.Struct({
          l10nKey: Schema.optional(Schema.String),
          loggableError: Schema.optional(Schema.String),
          templateData: Schema.optional(Schema.Unknown),
          traceId: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            l10nKey: "l10n_key",
            loggableError: "loggable_error",
            templateData: "template_data",
            traceId: "trace_id",
          }),
        ),
      ),
      source: Schema.optional(
        Schema.Struct({
          parameter: Schema.optional(Schema.String),
          parameterValueIndex: Schema.optional(Schema.Number),
          pointer: Schema.optional(Schema.String),
        }).pipe(
          Schema.encodeKeys({
            parameter: "parameter",
            parameterValueIndex: "parameter_value_index",
            pointer: "pointer",
          }),
        ),
      ),
    }).pipe(
      Schema.encodeKeys({
        code: "code",
        message: "message",
        documentationUrl: "documentation_url",
        meta: "meta",
        source: "source",
      }),
    ),
  ),
  success: Schema.Boolean,
}) as unknown as Schema.Schema<PlanOnRampResponse>;

export type PlanOnRampError = CommonErrors;

export const planOnRamp: API.OperationMethod<
  PlanOnRampRequest,
  PlanOnRampResponse,
  PlanOnRampError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PlanOnRampRequest,
  output: PlanOnRampResponse,
  errors: [],
}));

// =============================================================================
// OnRampAddressSpace
// =============================================================================

export interface ListOnRampAddressSpacesRequest {
  accountId: string;
}

export const ListOnRampAddressSpacesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space",
  }),
) as unknown as Schema.Schema<ListOnRampAddressSpacesRequest>;

export interface ListOnRampAddressSpacesResponse {
  prefixes: string[];
}

export const ListOnRampAddressSpacesResponse = Schema.Struct({
  prefixes: Schema.Array(Schema.String),
}) as unknown as Schema.Schema<ListOnRampAddressSpacesResponse>;

export type ListOnRampAddressSpacesError = CommonErrors;

export const listOnRampAddressSpaces: API.OperationMethod<
  ListOnRampAddressSpacesRequest,
  ListOnRampAddressSpacesResponse,
  ListOnRampAddressSpacesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOnRampAddressSpacesRequest,
  output: ListOnRampAddressSpacesResponse,
  errors: [],
}));

export interface PutOnRampAddressSpaceRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  prefixes: string[];
}

export const PutOnRampAddressSpaceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  prefixes: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space",
  }),
) as unknown as Schema.Schema<PutOnRampAddressSpaceRequest>;

export interface PutOnRampAddressSpaceResponse {
  prefixes: string[];
}

export const PutOnRampAddressSpaceResponse = Schema.Struct({
  prefixes: Schema.Array(Schema.String),
}) as unknown as Schema.Schema<PutOnRampAddressSpaceResponse>;

export type PutOnRampAddressSpaceError = CommonErrors;

export const putOnRampAddressSpace: API.OperationMethod<
  PutOnRampAddressSpaceRequest,
  PutOnRampAddressSpaceResponse,
  PutOnRampAddressSpaceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutOnRampAddressSpaceRequest,
  output: PutOnRampAddressSpaceResponse,
  errors: [],
}));

export interface PatchOnRampAddressSpaceRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  prefixes: string[];
}

export const PatchOnRampAddressSpaceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  prefixes: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space",
  }),
) as unknown as Schema.Schema<PatchOnRampAddressSpaceRequest>;

export interface PatchOnRampAddressSpaceResponse {
  prefixes: string[];
}

export const PatchOnRampAddressSpaceResponse = Schema.Struct({
  prefixes: Schema.Array(Schema.String),
}) as unknown as Schema.Schema<PatchOnRampAddressSpaceResponse>;

export type PatchOnRampAddressSpaceError = CommonErrors;

export const patchOnRampAddressSpace: API.OperationMethod<
  PatchOnRampAddressSpaceRequest,
  PatchOnRampAddressSpaceResponse,
  PatchOnRampAddressSpaceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchOnRampAddressSpaceRequest,
  output: PatchOnRampAddressSpaceResponse,
  errors: [],
}));

// =============================================================================
// PreviewResource
// =============================================================================

export interface PolicyPreviewResourceRequest {
  /** Path param: */
  accountId: string;
  /** Body param: */
  policy: string;
}

export const PolicyPreviewResourceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  policy: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/magic/cloud/resources/policy-preview",
  }),
) as unknown as Schema.Schema<PolicyPreviewResourceRequest>;

export type PolicyPreviewResourceResponse = string;

export const PolicyPreviewResourceResponse =
  Schema.String as unknown as Schema.Schema<PolicyPreviewResourceResponse>;

export type PolicyPreviewResourceError = CommonErrors;

export const policyPreviewResource: API.OperationMethod<
  PolicyPreviewResourceRequest,
  PolicyPreviewResourceResponse,
  PolicyPreviewResourceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PolicyPreviewResourceRequest,
  output: PolicyPreviewResourceResponse,
  errors: [],
}));

// =============================================================================
// Resource
// =============================================================================

export interface GetResourceRequest {
  resourceId: string;
  /** Path param: */
  accountId: string;
  /** Query param: */
  v2?: boolean;
}

export const GetResourceRequest = Schema.Struct({
  resourceId: Schema.String.pipe(T.HttpPath("resourceId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  v2: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("v2")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/resources/{resourceId}",
  }),
) as unknown as Schema.Schema<GetResourceRequest>;

export interface GetResourceResponse {
  id: string;
  accountId: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  config: Record<string, unknown>;
  deploymentProvider: string;
  managed: boolean;
  monthlyCostEstimate: { currency: string; monthlyCost: number };
  name: string;
  nativeId: string;
  observations: Record<string, unknown>;
  providerIds: string[];
  providerNamesById: Record<string, unknown>;
  region: string;
  resourceGroup: string;
  resourceType:
    | "aws_customer_gateway"
    | "aws_egress_only_internet_gateway"
    | "aws_internet_gateway"
    | "aws_instance"
    | "aws_network_interface"
    | "aws_route"
    | "aws_route_table"
    | "aws_route_table_association"
    | "aws_subnet"
    | "aws_vpc"
    | "aws_vpc_ipv4_cidr_block_association"
    | "aws_vpn_connection"
    | "aws_vpn_connection_route"
    | "aws_vpn_gateway"
    | "aws_security_group"
    | "aws_vpc_security_group_ingress_rule"
    | "aws_vpc_security_group_egress_rule"
    | "aws_ec2_managed_prefix_list"
    | "aws_ec2_transit_gateway"
    | "aws_ec2_transit_gateway_prefix_list_reference"
    | "aws_ec2_transit_gateway_vpc_attachment"
    | "azurerm_application_security_group"
    | "azurerm_lb"
    | "azurerm_lb_backend_address_pool"
    | "azurerm_lb_nat_pool"
    | "azurerm_lb_nat_rule"
    | "azurerm_lb_rule"
    | "azurerm_local_network_gateway"
    | "azurerm_network_interface"
    | "azurerm_network_interface_application_security_group_association"
    | "azurerm_network_interface_backend_address_pool_association"
    | "azurerm_network_interface_security_group_association"
    | "azurerm_network_security_group"
    | "azurerm_public_ip"
    | "azurerm_route"
    | "azurerm_route_table"
    | "azurerm_subnet"
    | "azurerm_subnet_route_table_association"
    | "azurerm_virtual_machine"
    | "azurerm_virtual_network_gateway_connection"
    | "azurerm_virtual_network"
    | "azurerm_virtual_network_gateway"
    | "google_compute_network"
    | "google_compute_subnetwork"
    | "google_compute_vpn_gateway"
    | "google_compute_vpn_tunnel"
    | "google_compute_route"
    | "google_compute_address"
    | "google_compute_global_address"
    | "google_compute_router"
    | "google_compute_interconnect_attachment"
    | "google_compute_ha_vpn_gateway"
    | "google_compute_forwarding_rule"
    | "google_compute_network_firewall_policy"
    | "google_compute_network_firewall_policy_rule"
    | "cloudflare_static_route"
    | "cloudflare_ipsec_tunnel";
  sections: {
    hiddenItems: {
      helpText?: string;
      name?: string;
      value?:
        | { itemType: string; string: string }
        | { itemType: string; yaml: string }
        | {
            itemType: string;
            yamlDiff: {
              diff: string;
              leftDescription: string;
              leftYaml: string;
              rightDescription: string;
              rightYaml: string;
            };
          }
        | {
            itemType: string;
            resourcePreview: {
              id: string;
              cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
              detail: string;
              name: string;
              resourceType:
                | "aws_customer_gateway"
                | "aws_egress_only_internet_gateway"
                | "aws_internet_gateway"
                | "aws_instance"
                | "aws_network_interface"
                | "aws_route"
                | "aws_route_table"
                | "aws_route_table_association"
                | "aws_subnet"
                | "aws_vpc"
                | "aws_vpc_ipv4_cidr_block_association"
                | "aws_vpn_connection"
                | "aws_vpn_connection_route"
                | "aws_vpn_gateway"
                | "aws_security_group"
                | "aws_vpc_security_group_ingress_rule"
                | "aws_vpc_security_group_egress_rule"
                | "aws_ec2_managed_prefix_list"
                | "aws_ec2_transit_gateway"
                | "aws_ec2_transit_gateway_prefix_list_reference"
                | "aws_ec2_transit_gateway_vpc_attachment"
                | "azurerm_application_security_group"
                | "azurerm_lb"
                | "azurerm_lb_backend_address_pool"
                | "azurerm_lb_nat_pool"
                | "azurerm_lb_nat_rule"
                | "azurerm_lb_rule"
                | "azurerm_local_network_gateway"
                | "azurerm_network_interface"
                | "azurerm_network_interface_application_security_group_association"
                | "azurerm_network_interface_backend_address_pool_association"
                | "azurerm_network_interface_security_group_association"
                | "azurerm_network_security_group"
                | "azurerm_public_ip"
                | "azurerm_route"
                | "azurerm_route_table"
                | "azurerm_subnet"
                | "azurerm_subnet_route_table_association"
                | "azurerm_virtual_machine"
                | "azurerm_virtual_network_gateway_connection"
                | "azurerm_virtual_network"
                | "azurerm_virtual_network_gateway"
                | "google_compute_network"
                | "google_compute_subnetwork"
                | "google_compute_vpn_gateway"
                | "google_compute_vpn_tunnel"
                | "google_compute_route"
                | "google_compute_address"
                | "google_compute_global_address"
                | "google_compute_router"
                | "google_compute_interconnect_attachment"
                | "google_compute_ha_vpn_gateway"
                | "google_compute_forwarding_rule"
                | "google_compute_network_firewall_policy"
                | "google_compute_network_firewall_policy_rule"
                | "cloudflare_static_route"
                | "cloudflare_ipsec_tunnel";
              title: string;
            };
          }
        | {
            itemType: string;
            list: (
              | { itemType: string; string: string }
              | {
                  itemType: string;
                  resourcePreview: {
                    id: string;
                    cloudType: unknown;
                    detail: string;
                    name: string;
                    resourceType: unknown;
                    title: string;
                  };
                }
            )[];
          };
    }[];
    name: string;
    visibleItems: {
      helpText?: string;
      name?: string;
      value?:
        | { itemType: string; string: string }
        | { itemType: string; yaml: string }
        | {
            itemType: string;
            yamlDiff: {
              diff: string;
              leftDescription: string;
              leftYaml: string;
              rightDescription: string;
              rightYaml: string;
            };
          }
        | {
            itemType: string;
            resourcePreview: {
              id: string;
              cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
              detail: string;
              name: string;
              resourceType:
                | "aws_customer_gateway"
                | "aws_egress_only_internet_gateway"
                | "aws_internet_gateway"
                | "aws_instance"
                | "aws_network_interface"
                | "aws_route"
                | "aws_route_table"
                | "aws_route_table_association"
                | "aws_subnet"
                | "aws_vpc"
                | "aws_vpc_ipv4_cidr_block_association"
                | "aws_vpn_connection"
                | "aws_vpn_connection_route"
                | "aws_vpn_gateway"
                | "aws_security_group"
                | "aws_vpc_security_group_ingress_rule"
                | "aws_vpc_security_group_egress_rule"
                | "aws_ec2_managed_prefix_list"
                | "aws_ec2_transit_gateway"
                | "aws_ec2_transit_gateway_prefix_list_reference"
                | "aws_ec2_transit_gateway_vpc_attachment"
                | "azurerm_application_security_group"
                | "azurerm_lb"
                | "azurerm_lb_backend_address_pool"
                | "azurerm_lb_nat_pool"
                | "azurerm_lb_nat_rule"
                | "azurerm_lb_rule"
                | "azurerm_local_network_gateway"
                | "azurerm_network_interface"
                | "azurerm_network_interface_application_security_group_association"
                | "azurerm_network_interface_backend_address_pool_association"
                | "azurerm_network_interface_security_group_association"
                | "azurerm_network_security_group"
                | "azurerm_public_ip"
                | "azurerm_route"
                | "azurerm_route_table"
                | "azurerm_subnet"
                | "azurerm_subnet_route_table_association"
                | "azurerm_virtual_machine"
                | "azurerm_virtual_network_gateway_connection"
                | "azurerm_virtual_network"
                | "azurerm_virtual_network_gateway"
                | "google_compute_network"
                | "google_compute_subnetwork"
                | "google_compute_vpn_gateway"
                | "google_compute_vpn_tunnel"
                | "google_compute_route"
                | "google_compute_address"
                | "google_compute_global_address"
                | "google_compute_router"
                | "google_compute_interconnect_attachment"
                | "google_compute_ha_vpn_gateway"
                | "google_compute_forwarding_rule"
                | "google_compute_network_firewall_policy"
                | "google_compute_network_firewall_policy_rule"
                | "cloudflare_static_route"
                | "cloudflare_ipsec_tunnel";
              title: string;
            };
          }
        | {
            itemType: string;
            list: (
              | { itemType: string; string: string }
              | {
                  itemType: string;
                  resourcePreview: {
                    id: string;
                    cloudType: unknown;
                    detail: string;
                    name: string;
                    resourceType: unknown;
                    title: string;
                  };
                }
            )[];
          };
    }[];
    helpText?: string;
  }[];
  state: Record<string, unknown>;
  tags: Record<string, unknown>;
  updatedAt: string;
  url: string;
  managedBy?: {
    id: string;
    clientType: "MAGIC_WAN_CLOUD_ONRAMP";
    name: string;
  }[];
}

export const GetResourceResponse = Schema.Struct({
  id: Schema.String,
  accountId: Schema.String,
  cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  config: Schema.Struct({}),
  deploymentProvider: Schema.String,
  managed: Schema.Boolean,
  monthlyCostEstimate: Schema.Struct({
    currency: Schema.String,
    monthlyCost: Schema.Number,
  }).pipe(
    Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
  ),
  name: Schema.String,
  nativeId: Schema.String,
  observations: Schema.Struct({}),
  providerIds: Schema.Array(Schema.String),
  providerNamesById: Schema.Struct({}),
  region: Schema.String,
  resourceGroup: Schema.String,
  resourceType: Schema.Literals([
    "aws_customer_gateway",
    "aws_egress_only_internet_gateway",
    "aws_internet_gateway",
    "aws_instance",
    "aws_network_interface",
    "aws_route",
    "aws_route_table",
    "aws_route_table_association",
    "aws_subnet",
    "aws_vpc",
    "aws_vpc_ipv4_cidr_block_association",
    "aws_vpn_connection",
    "aws_vpn_connection_route",
    "aws_vpn_gateway",
    "aws_security_group",
    "aws_vpc_security_group_ingress_rule",
    "aws_vpc_security_group_egress_rule",
    "aws_ec2_managed_prefix_list",
    "aws_ec2_transit_gateway",
    "aws_ec2_transit_gateway_prefix_list_reference",
    "aws_ec2_transit_gateway_vpc_attachment",
    "azurerm_application_security_group",
    "azurerm_lb",
    "azurerm_lb_backend_address_pool",
    "azurerm_lb_nat_pool",
    "azurerm_lb_nat_rule",
    "azurerm_lb_rule",
    "azurerm_local_network_gateway",
    "azurerm_network_interface",
    "azurerm_network_interface_application_security_group_association",
    "azurerm_network_interface_backend_address_pool_association",
    "azurerm_network_interface_security_group_association",
    "azurerm_network_security_group",
    "azurerm_public_ip",
    "azurerm_route",
    "azurerm_route_table",
    "azurerm_subnet",
    "azurerm_subnet_route_table_association",
    "azurerm_virtual_machine",
    "azurerm_virtual_network_gateway_connection",
    "azurerm_virtual_network",
    "azurerm_virtual_network_gateway",
    "google_compute_network",
    "google_compute_subnetwork",
    "google_compute_vpn_gateway",
    "google_compute_vpn_tunnel",
    "google_compute_route",
    "google_compute_address",
    "google_compute_global_address",
    "google_compute_router",
    "google_compute_interconnect_attachment",
    "google_compute_ha_vpn_gateway",
    "google_compute_forwarding_rule",
    "google_compute_network_firewall_policy",
    "google_compute_network_firewall_policy_rule",
    "cloudflare_static_route",
    "cloudflare_ipsec_tunnel",
  ]),
  sections: Schema.Array(
    Schema.Struct({
      hiddenItems: Schema.Array(
        Schema.Struct({
          helpText: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          value: Schema.optional(
            Schema.Union([
              Schema.Struct({
                itemType: Schema.String,
                string: Schema.String,
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", string: "string" }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                yaml: Schema.String,
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", yaml: "yaml" }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                yamlDiff: Schema.Struct({
                  diff: Schema.String,
                  leftDescription: Schema.String,
                  leftYaml: Schema.String,
                  rightDescription: Schema.String,
                  rightYaml: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    diff: "diff",
                    leftDescription: "left_description",
                    leftYaml: "left_yaml",
                    rightDescription: "right_description",
                    rightYaml: "right_yaml",
                  }),
                ),
              }).pipe(
                Schema.encodeKeys({
                  itemType: "item_type",
                  yamlDiff: "yaml_diff",
                }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                resourcePreview: Schema.Struct({
                  id: Schema.String,
                  cloudType: Schema.Literals([
                    "AWS",
                    "AZURE",
                    "GOOGLE",
                    "CLOUDFLARE",
                  ]),
                  detail: Schema.String,
                  name: Schema.String,
                  resourceType: Schema.Literals([
                    "aws_customer_gateway",
                    "aws_egress_only_internet_gateway",
                    "aws_internet_gateway",
                    "aws_instance",
                    "aws_network_interface",
                    "aws_route",
                    "aws_route_table",
                    "aws_route_table_association",
                    "aws_subnet",
                    "aws_vpc",
                    "aws_vpc_ipv4_cidr_block_association",
                    "aws_vpn_connection",
                    "aws_vpn_connection_route",
                    "aws_vpn_gateway",
                    "aws_security_group",
                    "aws_vpc_security_group_ingress_rule",
                    "aws_vpc_security_group_egress_rule",
                    "aws_ec2_managed_prefix_list",
                    "aws_ec2_transit_gateway",
                    "aws_ec2_transit_gateway_prefix_list_reference",
                    "aws_ec2_transit_gateway_vpc_attachment",
                    "azurerm_application_security_group",
                    "azurerm_lb",
                    "azurerm_lb_backend_address_pool",
                    "azurerm_lb_nat_pool",
                    "azurerm_lb_nat_rule",
                    "azurerm_lb_rule",
                    "azurerm_local_network_gateway",
                    "azurerm_network_interface",
                    "azurerm_network_interface_application_security_group_association",
                    "azurerm_network_interface_backend_address_pool_association",
                    "azurerm_network_interface_security_group_association",
                    "azurerm_network_security_group",
                    "azurerm_public_ip",
                    "azurerm_route",
                    "azurerm_route_table",
                    "azurerm_subnet",
                    "azurerm_subnet_route_table_association",
                    "azurerm_virtual_machine",
                    "azurerm_virtual_network_gateway_connection",
                    "azurerm_virtual_network",
                    "azurerm_virtual_network_gateway",
                    "google_compute_network",
                    "google_compute_subnetwork",
                    "google_compute_vpn_gateway",
                    "google_compute_vpn_tunnel",
                    "google_compute_route",
                    "google_compute_address",
                    "google_compute_global_address",
                    "google_compute_router",
                    "google_compute_interconnect_attachment",
                    "google_compute_ha_vpn_gateway",
                    "google_compute_forwarding_rule",
                    "google_compute_network_firewall_policy",
                    "google_compute_network_firewall_policy_rule",
                    "cloudflare_static_route",
                    "cloudflare_ipsec_tunnel",
                  ]),
                  title: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    id: "id",
                    cloudType: "cloud_type",
                    detail: "detail",
                    name: "name",
                    resourceType: "resource_type",
                    title: "title",
                  }),
                ),
              }).pipe(
                Schema.encodeKeys({
                  itemType: "item_type",
                  resourcePreview: "resource_preview",
                }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                list: Schema.Array(
                  Schema.Union([
                    Schema.Struct({
                      itemType: Schema.String,
                      string: Schema.String,
                    }).pipe(
                      Schema.encodeKeys({
                        itemType: "item_type",
                        string: "string",
                      }),
                    ),
                    Schema.Struct({
                      itemType: Schema.String,
                      resourcePreview: Schema.Struct({
                        id: Schema.String,
                        cloudType: Schema.Literals([
                          "AWS",
                          "AZURE",
                          "GOOGLE",
                          "CLOUDFLARE",
                        ]),
                        detail: Schema.String,
                        name: Schema.String,
                        resourceType: Schema.Literals([
                          "aws_customer_gateway",
                          "aws_egress_only_internet_gateway",
                          "aws_internet_gateway",
                          "aws_instance",
                          "aws_network_interface",
                          "aws_route",
                          "aws_route_table",
                          "aws_route_table_association",
                          "aws_subnet",
                          "aws_vpc",
                          "aws_vpc_ipv4_cidr_block_association",
                          "aws_vpn_connection",
                          "aws_vpn_connection_route",
                          "aws_vpn_gateway",
                          "aws_security_group",
                          "aws_vpc_security_group_ingress_rule",
                          "aws_vpc_security_group_egress_rule",
                          "aws_ec2_managed_prefix_list",
                          "aws_ec2_transit_gateway",
                          "aws_ec2_transit_gateway_prefix_list_reference",
                          "aws_ec2_transit_gateway_vpc_attachment",
                          "azurerm_application_security_group",
                          "azurerm_lb",
                          "azurerm_lb_backend_address_pool",
                          "azurerm_lb_nat_pool",
                          "azurerm_lb_nat_rule",
                          "azurerm_lb_rule",
                          "azurerm_local_network_gateway",
                          "azurerm_network_interface",
                          "azurerm_network_interface_application_security_group_association",
                          "azurerm_network_interface_backend_address_pool_association",
                          "azurerm_network_interface_security_group_association",
                          "azurerm_network_security_group",
                          "azurerm_public_ip",
                          "azurerm_route",
                          "azurerm_route_table",
                          "azurerm_subnet",
                          "azurerm_subnet_route_table_association",
                          "azurerm_virtual_machine",
                          "azurerm_virtual_network_gateway_connection",
                          "azurerm_virtual_network",
                          "azurerm_virtual_network_gateway",
                          "google_compute_network",
                          "google_compute_subnetwork",
                          "google_compute_vpn_gateway",
                          "google_compute_vpn_tunnel",
                          "google_compute_route",
                          "google_compute_address",
                          "google_compute_global_address",
                          "google_compute_router",
                          "google_compute_interconnect_attachment",
                          "google_compute_ha_vpn_gateway",
                          "google_compute_forwarding_rule",
                          "google_compute_network_firewall_policy",
                          "google_compute_network_firewall_policy_rule",
                          "cloudflare_static_route",
                          "cloudflare_ipsec_tunnel",
                        ]),
                        title: Schema.String,
                      }).pipe(
                        Schema.encodeKeys({
                          id: "id",
                          cloudType: "cloud_type",
                          detail: "detail",
                          name: "name",
                          resourceType: "resource_type",
                          title: "title",
                        }),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        itemType: "item_type",
                        resourcePreview: "resource_preview",
                      }),
                    ),
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", list: "list" }),
              ),
            ]),
          ),
        }),
      ),
      name: Schema.String,
      visibleItems: Schema.Array(
        Schema.Struct({
          helpText: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          value: Schema.optional(
            Schema.Union([
              Schema.Struct({
                itemType: Schema.String,
                string: Schema.String,
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", string: "string" }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                yaml: Schema.String,
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", yaml: "yaml" }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                yamlDiff: Schema.Struct({
                  diff: Schema.String,
                  leftDescription: Schema.String,
                  leftYaml: Schema.String,
                  rightDescription: Schema.String,
                  rightYaml: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    diff: "diff",
                    leftDescription: "left_description",
                    leftYaml: "left_yaml",
                    rightDescription: "right_description",
                    rightYaml: "right_yaml",
                  }),
                ),
              }).pipe(
                Schema.encodeKeys({
                  itemType: "item_type",
                  yamlDiff: "yaml_diff",
                }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                resourcePreview: Schema.Struct({
                  id: Schema.String,
                  cloudType: Schema.Literals([
                    "AWS",
                    "AZURE",
                    "GOOGLE",
                    "CLOUDFLARE",
                  ]),
                  detail: Schema.String,
                  name: Schema.String,
                  resourceType: Schema.Literals([
                    "aws_customer_gateway",
                    "aws_egress_only_internet_gateway",
                    "aws_internet_gateway",
                    "aws_instance",
                    "aws_network_interface",
                    "aws_route",
                    "aws_route_table",
                    "aws_route_table_association",
                    "aws_subnet",
                    "aws_vpc",
                    "aws_vpc_ipv4_cidr_block_association",
                    "aws_vpn_connection",
                    "aws_vpn_connection_route",
                    "aws_vpn_gateway",
                    "aws_security_group",
                    "aws_vpc_security_group_ingress_rule",
                    "aws_vpc_security_group_egress_rule",
                    "aws_ec2_managed_prefix_list",
                    "aws_ec2_transit_gateway",
                    "aws_ec2_transit_gateway_prefix_list_reference",
                    "aws_ec2_transit_gateway_vpc_attachment",
                    "azurerm_application_security_group",
                    "azurerm_lb",
                    "azurerm_lb_backend_address_pool",
                    "azurerm_lb_nat_pool",
                    "azurerm_lb_nat_rule",
                    "azurerm_lb_rule",
                    "azurerm_local_network_gateway",
                    "azurerm_network_interface",
                    "azurerm_network_interface_application_security_group_association",
                    "azurerm_network_interface_backend_address_pool_association",
                    "azurerm_network_interface_security_group_association",
                    "azurerm_network_security_group",
                    "azurerm_public_ip",
                    "azurerm_route",
                    "azurerm_route_table",
                    "azurerm_subnet",
                    "azurerm_subnet_route_table_association",
                    "azurerm_virtual_machine",
                    "azurerm_virtual_network_gateway_connection",
                    "azurerm_virtual_network",
                    "azurerm_virtual_network_gateway",
                    "google_compute_network",
                    "google_compute_subnetwork",
                    "google_compute_vpn_gateway",
                    "google_compute_vpn_tunnel",
                    "google_compute_route",
                    "google_compute_address",
                    "google_compute_global_address",
                    "google_compute_router",
                    "google_compute_interconnect_attachment",
                    "google_compute_ha_vpn_gateway",
                    "google_compute_forwarding_rule",
                    "google_compute_network_firewall_policy",
                    "google_compute_network_firewall_policy_rule",
                    "cloudflare_static_route",
                    "cloudflare_ipsec_tunnel",
                  ]),
                  title: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    id: "id",
                    cloudType: "cloud_type",
                    detail: "detail",
                    name: "name",
                    resourceType: "resource_type",
                    title: "title",
                  }),
                ),
              }).pipe(
                Schema.encodeKeys({
                  itemType: "item_type",
                  resourcePreview: "resource_preview",
                }),
              ),
              Schema.Struct({
                itemType: Schema.String,
                list: Schema.Array(
                  Schema.Union([
                    Schema.Struct({
                      itemType: Schema.String,
                      string: Schema.String,
                    }).pipe(
                      Schema.encodeKeys({
                        itemType: "item_type",
                        string: "string",
                      }),
                    ),
                    Schema.Struct({
                      itemType: Schema.String,
                      resourcePreview: Schema.Struct({
                        id: Schema.String,
                        cloudType: Schema.Literals([
                          "AWS",
                          "AZURE",
                          "GOOGLE",
                          "CLOUDFLARE",
                        ]),
                        detail: Schema.String,
                        name: Schema.String,
                        resourceType: Schema.Literals([
                          "aws_customer_gateway",
                          "aws_egress_only_internet_gateway",
                          "aws_internet_gateway",
                          "aws_instance",
                          "aws_network_interface",
                          "aws_route",
                          "aws_route_table",
                          "aws_route_table_association",
                          "aws_subnet",
                          "aws_vpc",
                          "aws_vpc_ipv4_cidr_block_association",
                          "aws_vpn_connection",
                          "aws_vpn_connection_route",
                          "aws_vpn_gateway",
                          "aws_security_group",
                          "aws_vpc_security_group_ingress_rule",
                          "aws_vpc_security_group_egress_rule",
                          "aws_ec2_managed_prefix_list",
                          "aws_ec2_transit_gateway",
                          "aws_ec2_transit_gateway_prefix_list_reference",
                          "aws_ec2_transit_gateway_vpc_attachment",
                          "azurerm_application_security_group",
                          "azurerm_lb",
                          "azurerm_lb_backend_address_pool",
                          "azurerm_lb_nat_pool",
                          "azurerm_lb_nat_rule",
                          "azurerm_lb_rule",
                          "azurerm_local_network_gateway",
                          "azurerm_network_interface",
                          "azurerm_network_interface_application_security_group_association",
                          "azurerm_network_interface_backend_address_pool_association",
                          "azurerm_network_interface_security_group_association",
                          "azurerm_network_security_group",
                          "azurerm_public_ip",
                          "azurerm_route",
                          "azurerm_route_table",
                          "azurerm_subnet",
                          "azurerm_subnet_route_table_association",
                          "azurerm_virtual_machine",
                          "azurerm_virtual_network_gateway_connection",
                          "azurerm_virtual_network",
                          "azurerm_virtual_network_gateway",
                          "google_compute_network",
                          "google_compute_subnetwork",
                          "google_compute_vpn_gateway",
                          "google_compute_vpn_tunnel",
                          "google_compute_route",
                          "google_compute_address",
                          "google_compute_global_address",
                          "google_compute_router",
                          "google_compute_interconnect_attachment",
                          "google_compute_ha_vpn_gateway",
                          "google_compute_forwarding_rule",
                          "google_compute_network_firewall_policy",
                          "google_compute_network_firewall_policy_rule",
                          "cloudflare_static_route",
                          "cloudflare_ipsec_tunnel",
                        ]),
                        title: Schema.String,
                      }).pipe(
                        Schema.encodeKeys({
                          id: "id",
                          cloudType: "cloud_type",
                          detail: "detail",
                          name: "name",
                          resourceType: "resource_type",
                          title: "title",
                        }),
                      ),
                    }).pipe(
                      Schema.encodeKeys({
                        itemType: "item_type",
                        resourcePreview: "resource_preview",
                      }),
                    ),
                  ]),
                ),
              }).pipe(
                Schema.encodeKeys({ itemType: "item_type", list: "list" }),
              ),
            ]),
          ),
        }),
      ),
      helpText: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        hiddenItems: "hidden_items",
        name: "name",
        visibleItems: "visible_items",
        helpText: "help_text",
      }),
    ),
  ),
  state: Schema.Struct({}),
  tags: Schema.Struct({}),
  updatedAt: Schema.String,
  url: Schema.String,
  managedBy: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
        name: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          clientType: "client_type",
          name: "name",
        }),
      ),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    accountId: "account_id",
    cloudType: "cloud_type",
    config: "config",
    deploymentProvider: "deployment_provider",
    managed: "managed",
    monthlyCostEstimate: "monthly_cost_estimate",
    name: "name",
    nativeId: "native_id",
    observations: "observations",
    providerIds: "provider_ids",
    providerNamesById: "provider_names_by_id",
    region: "region",
    resourceGroup: "resource_group",
    resourceType: "resource_type",
    sections: "sections",
    state: "state",
    tags: "tags",
    updatedAt: "updated_at",
    url: "url",
    managedBy: "managed_by",
  }),
) as unknown as Schema.Schema<GetResourceResponse>;

export type GetResourceError = CommonErrors;

export const getResource: API.OperationMethod<
  GetResourceRequest,
  GetResourceResponse,
  GetResourceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetResourceRequest,
  output: GetResourceResponse,
  errors: [],
}));

export interface ListResourcesRequest {
  /** Path param: */
  accountId: string;
  /** Query param: */
  cloudflare?: boolean;
  /** Query param: */
  desc?: boolean;
  /** Query param: */
  managed?: boolean;
  /** Query param: One of ["id", "resource_type", "region"]. */
  orderBy?: string;
  /** Query param: */
  providerId?: string;
  /** Query param: */
  region?: string;
  /** Query param: */
  resourceGroup?: string;
  /** Query param: */
  resourceId?: string[];
  /** Query param: */
  resourceType?: (
    | "aws_customer_gateway"
    | "aws_egress_only_internet_gateway"
    | "aws_internet_gateway"
    | "aws_instance"
    | "aws_network_interface"
    | "aws_route"
    | "aws_route_table"
    | "aws_route_table_association"
    | "aws_subnet"
    | "aws_vpc"
    | "aws_vpc_ipv4_cidr_block_association"
    | "aws_vpn_connection"
    | "aws_vpn_connection_route"
    | "aws_vpn_gateway"
    | "aws_security_group"
    | "aws_vpc_security_group_ingress_rule"
    | "aws_vpc_security_group_egress_rule"
    | "aws_ec2_managed_prefix_list"
    | "aws_ec2_transit_gateway"
    | "aws_ec2_transit_gateway_prefix_list_reference"
    | "aws_ec2_transit_gateway_vpc_attachment"
    | "azurerm_application_security_group"
    | "azurerm_lb"
    | "azurerm_lb_backend_address_pool"
    | "azurerm_lb_nat_pool"
    | "azurerm_lb_nat_rule"
    | "azurerm_lb_rule"
    | "azurerm_local_network_gateway"
    | "azurerm_network_interface"
    | "azurerm_network_interface_application_security_group_association"
    | "azurerm_network_interface_backend_address_pool_association"
    | "azurerm_network_interface_security_group_association"
    | "azurerm_network_security_group"
    | "azurerm_public_ip"
    | "azurerm_route"
    | "azurerm_route_table"
    | "azurerm_subnet"
    | "azurerm_subnet_route_table_association"
    | "azurerm_virtual_machine"
    | "azurerm_virtual_network_gateway_connection"
    | "azurerm_virtual_network"
    | "azurerm_virtual_network_gateway"
    | "google_compute_network"
    | "google_compute_subnetwork"
    | "google_compute_vpn_gateway"
    | "google_compute_vpn_tunnel"
    | "google_compute_route"
    | "google_compute_address"
    | "google_compute_global_address"
    | "google_compute_router"
    | "google_compute_interconnect_attachment"
    | "google_compute_ha_vpn_gateway"
    | "google_compute_forwarding_rule"
    | "google_compute_network_firewall_policy"
    | "google_compute_network_firewall_policy_rule"
    | "cloudflare_static_route"
    | "cloudflare_ipsec_tunnel"
  )[];
  /** Query param: */
  search?: string[];
  /** Query param: */
  v2?: boolean;
}

export const ListResourcesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  cloudflare: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("cloudflare")),
  desc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("desc")),
  managed: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("managed")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("order_by")),
  providerId: Schema.optional(Schema.String).pipe(T.HttpQuery("provider_id")),
  region: Schema.optional(Schema.String).pipe(T.HttpQuery("region")),
  resourceGroup: Schema.optional(Schema.String).pipe(
    T.HttpQuery("resource_group"),
  ),
  resourceId: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("resource_id"),
  ),
  resourceType: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "aws_customer_gateway",
        "aws_egress_only_internet_gateway",
        "aws_internet_gateway",
        "aws_instance",
        "aws_network_interface",
        "aws_route",
        "aws_route_table",
        "aws_route_table_association",
        "aws_subnet",
        "aws_vpc",
        "aws_vpc_ipv4_cidr_block_association",
        "aws_vpn_connection",
        "aws_vpn_connection_route",
        "aws_vpn_gateway",
        "aws_security_group",
        "aws_vpc_security_group_ingress_rule",
        "aws_vpc_security_group_egress_rule",
        "aws_ec2_managed_prefix_list",
        "aws_ec2_transit_gateway",
        "aws_ec2_transit_gateway_prefix_list_reference",
        "aws_ec2_transit_gateway_vpc_attachment",
        "azurerm_application_security_group",
        "azurerm_lb",
        "azurerm_lb_backend_address_pool",
        "azurerm_lb_nat_pool",
        "azurerm_lb_nat_rule",
        "azurerm_lb_rule",
        "azurerm_local_network_gateway",
        "azurerm_network_interface",
        "azurerm_network_interface_application_security_group_association",
        "azurerm_network_interface_backend_address_pool_association",
        "azurerm_network_interface_security_group_association",
        "azurerm_network_security_group",
        "azurerm_public_ip",
        "azurerm_route",
        "azurerm_route_table",
        "azurerm_subnet",
        "azurerm_subnet_route_table_association",
        "azurerm_virtual_machine",
        "azurerm_virtual_network_gateway_connection",
        "azurerm_virtual_network",
        "azurerm_virtual_network_gateway",
        "google_compute_network",
        "google_compute_subnetwork",
        "google_compute_vpn_gateway",
        "google_compute_vpn_tunnel",
        "google_compute_route",
        "google_compute_address",
        "google_compute_global_address",
        "google_compute_router",
        "google_compute_interconnect_attachment",
        "google_compute_ha_vpn_gateway",
        "google_compute_forwarding_rule",
        "google_compute_network_firewall_policy",
        "google_compute_network_firewall_policy_rule",
        "cloudflare_static_route",
        "cloudflare_ipsec_tunnel",
      ]),
    ),
  ).pipe(T.HttpQuery("resource_type")),
  search: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("search"),
  ),
  v2: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("v2")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/resources",
  }),
) as unknown as Schema.Schema<ListResourcesRequest>;

export type ListResourcesResponse = {
  id: string;
  accountId: string;
  cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
  config: Record<string, unknown>;
  deploymentProvider: string;
  managed: boolean;
  monthlyCostEstimate: { currency: string; monthlyCost: number };
  name: string;
  nativeId: string;
  observations: Record<string, unknown>;
  providerIds: string[];
  providerNamesById: Record<string, unknown>;
  region: string;
  resourceGroup: string;
  resourceType:
    | "aws_customer_gateway"
    | "aws_egress_only_internet_gateway"
    | "aws_internet_gateway"
    | "aws_instance"
    | "aws_network_interface"
    | "aws_route"
    | "aws_route_table"
    | "aws_route_table_association"
    | "aws_subnet"
    | "aws_vpc"
    | "aws_vpc_ipv4_cidr_block_association"
    | "aws_vpn_connection"
    | "aws_vpn_connection_route"
    | "aws_vpn_gateway"
    | "aws_security_group"
    | "aws_vpc_security_group_ingress_rule"
    | "aws_vpc_security_group_egress_rule"
    | "aws_ec2_managed_prefix_list"
    | "aws_ec2_transit_gateway"
    | "aws_ec2_transit_gateway_prefix_list_reference"
    | "aws_ec2_transit_gateway_vpc_attachment"
    | "azurerm_application_security_group"
    | "azurerm_lb"
    | "azurerm_lb_backend_address_pool"
    | "azurerm_lb_nat_pool"
    | "azurerm_lb_nat_rule"
    | "azurerm_lb_rule"
    | "azurerm_local_network_gateway"
    | "azurerm_network_interface"
    | "azurerm_network_interface_application_security_group_association"
    | "azurerm_network_interface_backend_address_pool_association"
    | "azurerm_network_interface_security_group_association"
    | "azurerm_network_security_group"
    | "azurerm_public_ip"
    | "azurerm_route"
    | "azurerm_route_table"
    | "azurerm_subnet"
    | "azurerm_subnet_route_table_association"
    | "azurerm_virtual_machine"
    | "azurerm_virtual_network_gateway_connection"
    | "azurerm_virtual_network"
    | "azurerm_virtual_network_gateway"
    | "google_compute_network"
    | "google_compute_subnetwork"
    | "google_compute_vpn_gateway"
    | "google_compute_vpn_tunnel"
    | "google_compute_route"
    | "google_compute_address"
    | "google_compute_global_address"
    | "google_compute_router"
    | "google_compute_interconnect_attachment"
    | "google_compute_ha_vpn_gateway"
    | "google_compute_forwarding_rule"
    | "google_compute_network_firewall_policy"
    | "google_compute_network_firewall_policy_rule"
    | "cloudflare_static_route"
    | "cloudflare_ipsec_tunnel";
  sections: {
    hiddenItems: {
      helpText?: string;
      name?: string;
      value?:
        | { itemType: string; string: string }
        | { itemType: string; yaml: string }
        | {
            itemType: string;
            yamlDiff: {
              diff: string;
              leftDescription: string;
              leftYaml: string;
              rightDescription: string;
              rightYaml: string;
            };
          }
        | {
            itemType: string;
            resourcePreview: {
              id: string;
              cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
              detail: string;
              name: string;
              resourceType:
                | "aws_customer_gateway"
                | "aws_egress_only_internet_gateway"
                | "aws_internet_gateway"
                | "aws_instance"
                | "aws_network_interface"
                | "aws_route"
                | "aws_route_table"
                | "aws_route_table_association"
                | "aws_subnet"
                | "aws_vpc"
                | "aws_vpc_ipv4_cidr_block_association"
                | "aws_vpn_connection"
                | "aws_vpn_connection_route"
                | "aws_vpn_gateway"
                | "aws_security_group"
                | "aws_vpc_security_group_ingress_rule"
                | "aws_vpc_security_group_egress_rule"
                | "aws_ec2_managed_prefix_list"
                | "aws_ec2_transit_gateway"
                | "aws_ec2_transit_gateway_prefix_list_reference"
                | "aws_ec2_transit_gateway_vpc_attachment"
                | "azurerm_application_security_group"
                | "azurerm_lb"
                | "azurerm_lb_backend_address_pool"
                | "azurerm_lb_nat_pool"
                | "azurerm_lb_nat_rule"
                | "azurerm_lb_rule"
                | "azurerm_local_network_gateway"
                | "azurerm_network_interface"
                | "azurerm_network_interface_application_security_group_association"
                | "azurerm_network_interface_backend_address_pool_association"
                | "azurerm_network_interface_security_group_association"
                | "azurerm_network_security_group"
                | "azurerm_public_ip"
                | "azurerm_route"
                | "azurerm_route_table"
                | "azurerm_subnet"
                | "azurerm_subnet_route_table_association"
                | "azurerm_virtual_machine"
                | "azurerm_virtual_network_gateway_connection"
                | "azurerm_virtual_network"
                | "azurerm_virtual_network_gateway"
                | "google_compute_network"
                | "google_compute_subnetwork"
                | "google_compute_vpn_gateway"
                | "google_compute_vpn_tunnel"
                | "google_compute_route"
                | "google_compute_address"
                | "google_compute_global_address"
                | "google_compute_router"
                | "google_compute_interconnect_attachment"
                | "google_compute_ha_vpn_gateway"
                | "google_compute_forwarding_rule"
                | "google_compute_network_firewall_policy"
                | "google_compute_network_firewall_policy_rule"
                | "cloudflare_static_route"
                | "cloudflare_ipsec_tunnel";
              title: string;
            };
          }
        | {
            itemType: string;
            list: (
              | { itemType: unknown; string: unknown }
              | { itemType: unknown; resourcePreview: unknown }
            )[];
          };
    }[];
    name: string;
    visibleItems: {
      helpText?: string;
      name?: string;
      value?:
        | { itemType: string; string: string }
        | { itemType: string; yaml: string }
        | {
            itemType: string;
            yamlDiff: {
              diff: string;
              leftDescription: string;
              leftYaml: string;
              rightDescription: string;
              rightYaml: string;
            };
          }
        | {
            itemType: string;
            resourcePreview: {
              id: string;
              cloudType: "AWS" | "AZURE" | "GOOGLE" | "CLOUDFLARE";
              detail: string;
              name: string;
              resourceType:
                | "aws_customer_gateway"
                | "aws_egress_only_internet_gateway"
                | "aws_internet_gateway"
                | "aws_instance"
                | "aws_network_interface"
                | "aws_route"
                | "aws_route_table"
                | "aws_route_table_association"
                | "aws_subnet"
                | "aws_vpc"
                | "aws_vpc_ipv4_cidr_block_association"
                | "aws_vpn_connection"
                | "aws_vpn_connection_route"
                | "aws_vpn_gateway"
                | "aws_security_group"
                | "aws_vpc_security_group_ingress_rule"
                | "aws_vpc_security_group_egress_rule"
                | "aws_ec2_managed_prefix_list"
                | "aws_ec2_transit_gateway"
                | "aws_ec2_transit_gateway_prefix_list_reference"
                | "aws_ec2_transit_gateway_vpc_attachment"
                | "azurerm_application_security_group"
                | "azurerm_lb"
                | "azurerm_lb_backend_address_pool"
                | "azurerm_lb_nat_pool"
                | "azurerm_lb_nat_rule"
                | "azurerm_lb_rule"
                | "azurerm_local_network_gateway"
                | "azurerm_network_interface"
                | "azurerm_network_interface_application_security_group_association"
                | "azurerm_network_interface_backend_address_pool_association"
                | "azurerm_network_interface_security_group_association"
                | "azurerm_network_security_group"
                | "azurerm_public_ip"
                | "azurerm_route"
                | "azurerm_route_table"
                | "azurerm_subnet"
                | "azurerm_subnet_route_table_association"
                | "azurerm_virtual_machine"
                | "azurerm_virtual_network_gateway_connection"
                | "azurerm_virtual_network"
                | "azurerm_virtual_network_gateway"
                | "google_compute_network"
                | "google_compute_subnetwork"
                | "google_compute_vpn_gateway"
                | "google_compute_vpn_tunnel"
                | "google_compute_route"
                | "google_compute_address"
                | "google_compute_global_address"
                | "google_compute_router"
                | "google_compute_interconnect_attachment"
                | "google_compute_ha_vpn_gateway"
                | "google_compute_forwarding_rule"
                | "google_compute_network_firewall_policy"
                | "google_compute_network_firewall_policy_rule"
                | "cloudflare_static_route"
                | "cloudflare_ipsec_tunnel";
              title: string;
            };
          }
        | {
            itemType: string;
            list: (
              | { itemType: unknown; string: unknown }
              | { itemType: unknown; resourcePreview: unknown }
            )[];
          };
    }[];
    helpText?: string;
  }[];
  state: Record<string, unknown>;
  tags: Record<string, unknown>;
  updatedAt: string;
  url: string;
  managedBy?: {
    id: string;
    clientType: "MAGIC_WAN_CLOUD_ONRAMP";
    name: string;
  }[];
}[];

export const ListResourcesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    accountId: Schema.String,
    cloudType: Schema.Literals(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
    config: Schema.Struct({}),
    deploymentProvider: Schema.String,
    managed: Schema.Boolean,
    monthlyCostEstimate: Schema.Struct({
      currency: Schema.String,
      monthlyCost: Schema.Number,
    }).pipe(
      Schema.encodeKeys({ currency: "currency", monthlyCost: "monthly_cost" }),
    ),
    name: Schema.String,
    nativeId: Schema.String,
    observations: Schema.Struct({}),
    providerIds: Schema.Array(Schema.String),
    providerNamesById: Schema.Struct({}),
    region: Schema.String,
    resourceGroup: Schema.String,
    resourceType: Schema.Literals([
      "aws_customer_gateway",
      "aws_egress_only_internet_gateway",
      "aws_internet_gateway",
      "aws_instance",
      "aws_network_interface",
      "aws_route",
      "aws_route_table",
      "aws_route_table_association",
      "aws_subnet",
      "aws_vpc",
      "aws_vpc_ipv4_cidr_block_association",
      "aws_vpn_connection",
      "aws_vpn_connection_route",
      "aws_vpn_gateway",
      "aws_security_group",
      "aws_vpc_security_group_ingress_rule",
      "aws_vpc_security_group_egress_rule",
      "aws_ec2_managed_prefix_list",
      "aws_ec2_transit_gateway",
      "aws_ec2_transit_gateway_prefix_list_reference",
      "aws_ec2_transit_gateway_vpc_attachment",
      "azurerm_application_security_group",
      "azurerm_lb",
      "azurerm_lb_backend_address_pool",
      "azurerm_lb_nat_pool",
      "azurerm_lb_nat_rule",
      "azurerm_lb_rule",
      "azurerm_local_network_gateway",
      "azurerm_network_interface",
      "azurerm_network_interface_application_security_group_association",
      "azurerm_network_interface_backend_address_pool_association",
      "azurerm_network_interface_security_group_association",
      "azurerm_network_security_group",
      "azurerm_public_ip",
      "azurerm_route",
      "azurerm_route_table",
      "azurerm_subnet",
      "azurerm_subnet_route_table_association",
      "azurerm_virtual_machine",
      "azurerm_virtual_network_gateway_connection",
      "azurerm_virtual_network",
      "azurerm_virtual_network_gateway",
      "google_compute_network",
      "google_compute_subnetwork",
      "google_compute_vpn_gateway",
      "google_compute_vpn_tunnel",
      "google_compute_route",
      "google_compute_address",
      "google_compute_global_address",
      "google_compute_router",
      "google_compute_interconnect_attachment",
      "google_compute_ha_vpn_gateway",
      "google_compute_forwarding_rule",
      "google_compute_network_firewall_policy",
      "google_compute_network_firewall_policy_rule",
      "cloudflare_static_route",
      "cloudflare_ipsec_tunnel",
    ]),
    sections: Schema.Array(
      Schema.Struct({
        hiddenItems: Schema.Array(
          Schema.Struct({
            helpText: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            value: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  itemType: Schema.String,
                  string: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    string: "string",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  yaml: Schema.String,
                }).pipe(
                  Schema.encodeKeys({ itemType: "item_type", yaml: "yaml" }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  yamlDiff: Schema.Struct({
                    diff: Schema.String,
                    leftDescription: Schema.String,
                    leftYaml: Schema.String,
                    rightDescription: Schema.String,
                    rightYaml: Schema.String,
                  }).pipe(
                    Schema.encodeKeys({
                      diff: "diff",
                      leftDescription: "left_description",
                      leftYaml: "left_yaml",
                      rightDescription: "right_description",
                      rightYaml: "right_yaml",
                    }),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    yamlDiff: "yaml_diff",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  resourcePreview: Schema.Struct({
                    id: Schema.String,
                    cloudType: Schema.Literals([
                      "AWS",
                      "AZURE",
                      "GOOGLE",
                      "CLOUDFLARE",
                    ]),
                    detail: Schema.String,
                    name: Schema.String,
                    resourceType: Schema.Literals([
                      "aws_customer_gateway",
                      "aws_egress_only_internet_gateway",
                      "aws_internet_gateway",
                      "aws_instance",
                      "aws_network_interface",
                      "aws_route",
                      "aws_route_table",
                      "aws_route_table_association",
                      "aws_subnet",
                      "aws_vpc",
                      "aws_vpc_ipv4_cidr_block_association",
                      "aws_vpn_connection",
                      "aws_vpn_connection_route",
                      "aws_vpn_gateway",
                      "aws_security_group",
                      "aws_vpc_security_group_ingress_rule",
                      "aws_vpc_security_group_egress_rule",
                      "aws_ec2_managed_prefix_list",
                      "aws_ec2_transit_gateway",
                      "aws_ec2_transit_gateway_prefix_list_reference",
                      "aws_ec2_transit_gateway_vpc_attachment",
                      "azurerm_application_security_group",
                      "azurerm_lb",
                      "azurerm_lb_backend_address_pool",
                      "azurerm_lb_nat_pool",
                      "azurerm_lb_nat_rule",
                      "azurerm_lb_rule",
                      "azurerm_local_network_gateway",
                      "azurerm_network_interface",
                      "azurerm_network_interface_application_security_group_association",
                      "azurerm_network_interface_backend_address_pool_association",
                      "azurerm_network_interface_security_group_association",
                      "azurerm_network_security_group",
                      "azurerm_public_ip",
                      "azurerm_route",
                      "azurerm_route_table",
                      "azurerm_subnet",
                      "azurerm_subnet_route_table_association",
                      "azurerm_virtual_machine",
                      "azurerm_virtual_network_gateway_connection",
                      "azurerm_virtual_network",
                      "azurerm_virtual_network_gateway",
                      "google_compute_network",
                      "google_compute_subnetwork",
                      "google_compute_vpn_gateway",
                      "google_compute_vpn_tunnel",
                      "google_compute_route",
                      "google_compute_address",
                      "google_compute_global_address",
                      "google_compute_router",
                      "google_compute_interconnect_attachment",
                      "google_compute_ha_vpn_gateway",
                      "google_compute_forwarding_rule",
                      "google_compute_network_firewall_policy",
                      "google_compute_network_firewall_policy_rule",
                      "cloudflare_static_route",
                      "cloudflare_ipsec_tunnel",
                    ]),
                    title: Schema.String,
                  }).pipe(
                    Schema.encodeKeys({
                      id: "id",
                      cloudType: "cloud_type",
                      detail: "detail",
                      name: "name",
                      resourceType: "resource_type",
                      title: "title",
                    }),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    resourcePreview: "resource_preview",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  list: Schema.Array(
                    Schema.Union([
                      Schema.Struct({
                        itemType: Schema.Unknown,
                        string: Schema.Unknown,
                      }).pipe(
                        Schema.encodeKeys({
                          itemType: "item_type",
                          string: "string",
                        }),
                      ),
                      Schema.Struct({
                        itemType: Schema.Unknown,
                        resourcePreview: Schema.Unknown,
                      }).pipe(
                        Schema.encodeKeys({
                          itemType: "item_type",
                          resourcePreview: "resource_preview",
                        }),
                      ),
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ itemType: "item_type", list: "list" }),
                ),
              ]),
            ),
          }),
        ),
        name: Schema.String,
        visibleItems: Schema.Array(
          Schema.Struct({
            helpText: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            value: Schema.optional(
              Schema.Union([
                Schema.Struct({
                  itemType: Schema.String,
                  string: Schema.String,
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    string: "string",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  yaml: Schema.String,
                }).pipe(
                  Schema.encodeKeys({ itemType: "item_type", yaml: "yaml" }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  yamlDiff: Schema.Struct({
                    diff: Schema.String,
                    leftDescription: Schema.String,
                    leftYaml: Schema.String,
                    rightDescription: Schema.String,
                    rightYaml: Schema.String,
                  }).pipe(
                    Schema.encodeKeys({
                      diff: "diff",
                      leftDescription: "left_description",
                      leftYaml: "left_yaml",
                      rightDescription: "right_description",
                      rightYaml: "right_yaml",
                    }),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    yamlDiff: "yaml_diff",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  resourcePreview: Schema.Struct({
                    id: Schema.String,
                    cloudType: Schema.Literals([
                      "AWS",
                      "AZURE",
                      "GOOGLE",
                      "CLOUDFLARE",
                    ]),
                    detail: Schema.String,
                    name: Schema.String,
                    resourceType: Schema.Literals([
                      "aws_customer_gateway",
                      "aws_egress_only_internet_gateway",
                      "aws_internet_gateway",
                      "aws_instance",
                      "aws_network_interface",
                      "aws_route",
                      "aws_route_table",
                      "aws_route_table_association",
                      "aws_subnet",
                      "aws_vpc",
                      "aws_vpc_ipv4_cidr_block_association",
                      "aws_vpn_connection",
                      "aws_vpn_connection_route",
                      "aws_vpn_gateway",
                      "aws_security_group",
                      "aws_vpc_security_group_ingress_rule",
                      "aws_vpc_security_group_egress_rule",
                      "aws_ec2_managed_prefix_list",
                      "aws_ec2_transit_gateway",
                      "aws_ec2_transit_gateway_prefix_list_reference",
                      "aws_ec2_transit_gateway_vpc_attachment",
                      "azurerm_application_security_group",
                      "azurerm_lb",
                      "azurerm_lb_backend_address_pool",
                      "azurerm_lb_nat_pool",
                      "azurerm_lb_nat_rule",
                      "azurerm_lb_rule",
                      "azurerm_local_network_gateway",
                      "azurerm_network_interface",
                      "azurerm_network_interface_application_security_group_association",
                      "azurerm_network_interface_backend_address_pool_association",
                      "azurerm_network_interface_security_group_association",
                      "azurerm_network_security_group",
                      "azurerm_public_ip",
                      "azurerm_route",
                      "azurerm_route_table",
                      "azurerm_subnet",
                      "azurerm_subnet_route_table_association",
                      "azurerm_virtual_machine",
                      "azurerm_virtual_network_gateway_connection",
                      "azurerm_virtual_network",
                      "azurerm_virtual_network_gateway",
                      "google_compute_network",
                      "google_compute_subnetwork",
                      "google_compute_vpn_gateway",
                      "google_compute_vpn_tunnel",
                      "google_compute_route",
                      "google_compute_address",
                      "google_compute_global_address",
                      "google_compute_router",
                      "google_compute_interconnect_attachment",
                      "google_compute_ha_vpn_gateway",
                      "google_compute_forwarding_rule",
                      "google_compute_network_firewall_policy",
                      "google_compute_network_firewall_policy_rule",
                      "cloudflare_static_route",
                      "cloudflare_ipsec_tunnel",
                    ]),
                    title: Schema.String,
                  }).pipe(
                    Schema.encodeKeys({
                      id: "id",
                      cloudType: "cloud_type",
                      detail: "detail",
                      name: "name",
                      resourceType: "resource_type",
                      title: "title",
                    }),
                  ),
                }).pipe(
                  Schema.encodeKeys({
                    itemType: "item_type",
                    resourcePreview: "resource_preview",
                  }),
                ),
                Schema.Struct({
                  itemType: Schema.String,
                  list: Schema.Array(
                    Schema.Union([
                      Schema.Struct({
                        itemType: Schema.Unknown,
                        string: Schema.Unknown,
                      }).pipe(
                        Schema.encodeKeys({
                          itemType: "item_type",
                          string: "string",
                        }),
                      ),
                      Schema.Struct({
                        itemType: Schema.Unknown,
                        resourcePreview: Schema.Unknown,
                      }).pipe(
                        Schema.encodeKeys({
                          itemType: "item_type",
                          resourcePreview: "resource_preview",
                        }),
                      ),
                    ]),
                  ),
                }).pipe(
                  Schema.encodeKeys({ itemType: "item_type", list: "list" }),
                ),
              ]),
            ),
          }),
        ),
        helpText: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          hiddenItems: "hidden_items",
          name: "name",
          visibleItems: "visible_items",
          helpText: "help_text",
        }),
      ),
    ),
    state: Schema.Struct({}),
    tags: Schema.Struct({}),
    updatedAt: Schema.String,
    url: Schema.String,
    managedBy: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.String,
          clientType: Schema.Literal("MAGIC_WAN_CLOUD_ONRAMP"),
          name: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            clientType: "client_type",
            name: "name",
          }),
        ),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      accountId: "account_id",
      cloudType: "cloud_type",
      config: "config",
      deploymentProvider: "deployment_provider",
      managed: "managed",
      monthlyCostEstimate: "monthly_cost_estimate",
      name: "name",
      nativeId: "native_id",
      observations: "observations",
      providerIds: "provider_ids",
      providerNamesById: "provider_names_by_id",
      region: "region",
      resourceGroup: "resource_group",
      resourceType: "resource_type",
      sections: "sections",
      state: "state",
      tags: "tags",
      updatedAt: "updated_at",
      url: "url",
      managedBy: "managed_by",
    }),
  ),
) as unknown as Schema.Schema<ListResourcesResponse>;

export type ListResourcesError = CommonErrors;

export const listResources: API.OperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [],
}));

export interface ExportResourceRequest {
  /** Path param: */
  accountId: string;
  /** Query param: */
  desc?: boolean;
  /** Query param: One of ["id", "resource_type", "region"]. */
  orderBy?: string;
  /** Query param: */
  providerId?: string;
  /** Query param: */
  region?: string;
  /** Query param: */
  resourceGroup?: string;
  /** Query param: */
  resourceId?: string[];
  /** Query param: */
  resourceType?: (
    | "aws_customer_gateway"
    | "aws_egress_only_internet_gateway"
    | "aws_internet_gateway"
    | "aws_instance"
    | "aws_network_interface"
    | "aws_route"
    | "aws_route_table"
    | "aws_route_table_association"
    | "aws_subnet"
    | "aws_vpc"
    | "aws_vpc_ipv4_cidr_block_association"
    | "aws_vpn_connection"
    | "aws_vpn_connection_route"
    | "aws_vpn_gateway"
    | "aws_security_group"
    | "aws_vpc_security_group_ingress_rule"
    | "aws_vpc_security_group_egress_rule"
    | "aws_ec2_managed_prefix_list"
    | "aws_ec2_transit_gateway"
    | "aws_ec2_transit_gateway_prefix_list_reference"
    | "aws_ec2_transit_gateway_vpc_attachment"
    | "azurerm_application_security_group"
    | "azurerm_lb"
    | "azurerm_lb_backend_address_pool"
    | "azurerm_lb_nat_pool"
    | "azurerm_lb_nat_rule"
    | "azurerm_lb_rule"
    | "azurerm_local_network_gateway"
    | "azurerm_network_interface"
    | "azurerm_network_interface_application_security_group_association"
    | "azurerm_network_interface_backend_address_pool_association"
    | "azurerm_network_interface_security_group_association"
    | "azurerm_network_security_group"
    | "azurerm_public_ip"
    | "azurerm_route"
    | "azurerm_route_table"
    | "azurerm_subnet"
    | "azurerm_subnet_route_table_association"
    | "azurerm_virtual_machine"
    | "azurerm_virtual_network_gateway_connection"
    | "azurerm_virtual_network"
    | "azurerm_virtual_network_gateway"
    | "google_compute_network"
    | "google_compute_subnetwork"
    | "google_compute_vpn_gateway"
    | "google_compute_vpn_tunnel"
    | "google_compute_route"
    | "google_compute_address"
    | "google_compute_global_address"
    | "google_compute_router"
    | "google_compute_interconnect_attachment"
    | "google_compute_ha_vpn_gateway"
    | "google_compute_forwarding_rule"
    | "google_compute_network_firewall_policy"
    | "google_compute_network_firewall_policy_rule"
    | "cloudflare_static_route"
    | "cloudflare_ipsec_tunnel"
  )[];
  /** Query param: */
  search?: string[];
  /** Query param: */
  v2?: boolean;
}

export const ExportResourceRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  desc: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("desc")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("order_by")),
  providerId: Schema.optional(Schema.String).pipe(T.HttpQuery("provider_id")),
  region: Schema.optional(Schema.String).pipe(T.HttpQuery("region")),
  resourceGroup: Schema.optional(Schema.String).pipe(
    T.HttpQuery("resource_group"),
  ),
  resourceId: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("resource_id"),
  ),
  resourceType: Schema.optional(
    Schema.Array(
      Schema.Literals([
        "aws_customer_gateway",
        "aws_egress_only_internet_gateway",
        "aws_internet_gateway",
        "aws_instance",
        "aws_network_interface",
        "aws_route",
        "aws_route_table",
        "aws_route_table_association",
        "aws_subnet",
        "aws_vpc",
        "aws_vpc_ipv4_cidr_block_association",
        "aws_vpn_connection",
        "aws_vpn_connection_route",
        "aws_vpn_gateway",
        "aws_security_group",
        "aws_vpc_security_group_ingress_rule",
        "aws_vpc_security_group_egress_rule",
        "aws_ec2_managed_prefix_list",
        "aws_ec2_transit_gateway",
        "aws_ec2_transit_gateway_prefix_list_reference",
        "aws_ec2_transit_gateway_vpc_attachment",
        "azurerm_application_security_group",
        "azurerm_lb",
        "azurerm_lb_backend_address_pool",
        "azurerm_lb_nat_pool",
        "azurerm_lb_nat_rule",
        "azurerm_lb_rule",
        "azurerm_local_network_gateway",
        "azurerm_network_interface",
        "azurerm_network_interface_application_security_group_association",
        "azurerm_network_interface_backend_address_pool_association",
        "azurerm_network_interface_security_group_association",
        "azurerm_network_security_group",
        "azurerm_public_ip",
        "azurerm_route",
        "azurerm_route_table",
        "azurerm_subnet",
        "azurerm_subnet_route_table_association",
        "azurerm_virtual_machine",
        "azurerm_virtual_network_gateway_connection",
        "azurerm_virtual_network",
        "azurerm_virtual_network_gateway",
        "google_compute_network",
        "google_compute_subnetwork",
        "google_compute_vpn_gateway",
        "google_compute_vpn_tunnel",
        "google_compute_route",
        "google_compute_address",
        "google_compute_global_address",
        "google_compute_router",
        "google_compute_interconnect_attachment",
        "google_compute_ha_vpn_gateway",
        "google_compute_forwarding_rule",
        "google_compute_network_firewall_policy",
        "google_compute_network_firewall_policy_rule",
        "cloudflare_static_route",
        "cloudflare_ipsec_tunnel",
      ]),
    ),
  ).pipe(T.HttpQuery("resource_type")),
  search: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("search"),
  ),
  v2: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("v2")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/resources/export",
  }),
) as unknown as Schema.Schema<ExportResourceRequest>;

export type ExportResourceResponse = unknown;

export const ExportResourceResponse =
  Schema.Unknown as unknown as Schema.Schema<ExportResourceResponse>;

export type ExportResourceError = CommonErrors;

export const exportResource: API.OperationMethod<
  ExportResourceRequest,
  ExportResourceResponse,
  ExportResourceError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportResourceRequest,
  output: ExportResourceResponse,
  errors: [],
}));

// =============================================================================
// SetupCloudIntegration
// =============================================================================

export interface InitialSetupCloudIntegrationRequest {
  providerId: string;
  accountId: string;
}

export const InitialSetupCloudIntegrationRequest = Schema.Struct({
  providerId: Schema.String.pipe(T.HttpPath("providerId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/magic/cloud/providers/{providerId}/initial_setup",
  }),
) as unknown as Schema.Schema<InitialSetupCloudIntegrationRequest>;

export type InitialSetupCloudIntegrationResponse =
  | { awsTrustPolicy: string; itemType: string }
  | {
      azureConsentUrl: string;
      integrationIdentityTag: string;
      itemType: string;
      tagCliCommand: string;
    }
  | { integrationIdentityTag: string; itemType: string; tagCliCommand: string };

export const InitialSetupCloudIntegrationResponse = Schema.Union([
  Schema.Struct({
    awsTrustPolicy: Schema.String,
    itemType: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      awsTrustPolicy: "aws_trust_policy",
      itemType: "item_type",
    }),
  ),
  Schema.Struct({
    azureConsentUrl: Schema.String,
    integrationIdentityTag: Schema.String,
    itemType: Schema.String,
    tagCliCommand: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      azureConsentUrl: "azure_consent_url",
      integrationIdentityTag: "integration_identity_tag",
      itemType: "item_type",
      tagCliCommand: "tag_cli_command",
    }),
  ),
  Schema.Struct({
    integrationIdentityTag: Schema.String,
    itemType: Schema.String,
    tagCliCommand: Schema.String,
  }).pipe(
    Schema.encodeKeys({
      integrationIdentityTag: "integration_identity_tag",
      itemType: "item_type",
      tagCliCommand: "tag_cli_command",
    }),
  ),
]) as unknown as Schema.Schema<InitialSetupCloudIntegrationResponse>;

export type InitialSetupCloudIntegrationError = CommonErrors;

export const initialSetupCloudIntegration: API.OperationMethod<
  InitialSetupCloudIntegrationRequest,
  InitialSetupCloudIntegrationResponse,
  InitialSetupCloudIntegrationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: InitialSetupCloudIntegrationRequest,
  output: InitialSetupCloudIntegrationResponse,
  errors: [],
}));
