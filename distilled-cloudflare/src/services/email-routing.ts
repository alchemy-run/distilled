/**
 * Cloudflare EMAIL-ROUTING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service email-routing
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
// Address
// =============================================================================

export interface GetAddressRequest {
  destinationAddressIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const GetAddressRequest = Schema.Struct({
  destinationAddressIdentifier: Schema.String.pipe(
    T.HttpPath("destinationAddressIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/email/routing/addresses/{destinationAddressIdentifier}",
  }),
) as unknown as Schema.Schema<GetAddressRequest>;

export interface GetAddressResponse {
  /** Destination address identifier. */
  id?: string;
  /** The date and time the destination address has been created. */
  created?: string;
  /** The contact email address of the user. */
  email?: string;
  /** The date and time the destination address was last modified. */
  modified?: string;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string;
}

export const GetAddressResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  verified: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetAddressResponse>;

export type GetAddressError = CommonErrors;

export const getAddress: API.OperationMethod<
  GetAddressRequest,
  GetAddressResponse,
  GetAddressError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAddressRequest,
  output: GetAddressResponse,
  errors: [],
}));

export interface ListAddressesRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Query param: Sorts results in an ascending or descending order. */
  direction?: "asc" | "desc";
  /** Query param: Filter by verified destination addresses. */
  verified?: true | false;
}

export const ListAddressesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  verified: Schema.optional(Schema.Literals([true, false])).pipe(
    T.HttpQuery("verified"),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/email/routing/addresses",
  }),
) as unknown as Schema.Schema<ListAddressesRequest>;

export type ListAddressesResponse = {
  id?: string;
  created?: string;
  email?: string;
  modified?: string;
  tag?: string;
  verified?: string;
}[];

export const ListAddressesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    email: Schema.optional(Schema.String),
    modified: Schema.optional(Schema.String),
    tag: Schema.optional(Schema.String),
    verified: Schema.optional(Schema.String),
  }),
) as unknown as Schema.Schema<ListAddressesResponse>;

export type ListAddressesError = CommonErrors;

export const listAddresses: API.OperationMethod<
  ListAddressesRequest,
  ListAddressesResponse,
  ListAddressesError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAddressesRequest,
  output: ListAddressesResponse,
  errors: [],
}));

export interface CreateAddressRequest {
  /** Path param: Identifier. */
  accountId: string;
  /** Body param: The contact email address of the user. */
  email: string;
}

export const CreateAddressRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  email: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/accounts/{account_id}/email/routing/addresses",
  }),
) as unknown as Schema.Schema<CreateAddressRequest>;

export interface CreateAddressResponse {
  /** Destination address identifier. */
  id?: string;
  /** The date and time the destination address has been created. */
  created?: string;
  /** The contact email address of the user. */
  email?: string;
  /** The date and time the destination address was last modified. */
  modified?: string;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string;
}

export const CreateAddressResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  verified: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateAddressResponse>;

export type CreateAddressError = CommonErrors;

export const createAddress: API.OperationMethod<
  CreateAddressRequest,
  CreateAddressResponse,
  CreateAddressError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAddressRequest,
  output: CreateAddressResponse,
  errors: [],
}));

export interface DeleteAddressRequest {
  destinationAddressIdentifier: string;
  /** Identifier. */
  accountId: string;
}

export const DeleteAddressRequest = Schema.Struct({
  destinationAddressIdentifier: Schema.String.pipe(
    T.HttpPath("destinationAddressIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/email/routing/addresses/{destinationAddressIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteAddressRequest>;

export interface DeleteAddressResponse {
  /** Destination address identifier. */
  id?: string;
  /** The date and time the destination address has been created. */
  created?: string;
  /** The contact email address of the user. */
  email?: string;
  /** The date and time the destination address was last modified. */
  modified?: string;
  /** @deprecated Destination address tag. (Deprecated, replaced by destination address identifier) */
  tag?: string;
  /** The date and time the destination address has been verified. Null means not verified yet. */
  verified?: string;
}

export const DeleteAddressResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  verified: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteAddressResponse>;

export type DeleteAddressError = CommonErrors;

export const deleteAddress: API.OperationMethod<
  DeleteAddressRequest,
  DeleteAddressResponse,
  DeleteAddressError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAddressRequest,
  output: DeleteAddressResponse,
  errors: [],
}));

// =============================================================================
// Dns
// =============================================================================

export interface GetDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Domain of your zone. */
  subdomain?: string;
}

export const GetDnsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  subdomain: Schema.optional(Schema.String).pipe(T.HttpQuery("subdomain")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<GetDnsRequest>;

export type GetDnsResponse =
  | {
      errors: {
        code: number;
        message: string;
        documentationUrl?: string;
        source?: { pointer?: string };
      }[];
      messages: {
        code: number;
        message: string;
        documentationUrl?: string;
        source?: { pointer?: string };
      }[];
      success: true;
      result?: {
        errors?: { code?: string; missing?: unknown }[];
        record?: unknown[];
      };
      resultInfo?: {
        count?: number;
        page?: number;
        perPage?: number;
        totalCount?: number;
      };
    }
  | {
      errors: {
        code: number;
        message: string;
        documentationUrl?: string;
        source?: { pointer?: string };
      }[];
      messages: {
        code: number;
        message: string;
        documentationUrl?: string;
        source?: { pointer?: string };
      }[];
      success: true;
      result?: unknown[];
      resultInfo?: {
        count?: number;
        page?: number;
        perPage?: number;
        totalCount?: number;
      };
    };

export const GetDnsResponse = Schema.Union([
  Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(Schema.String),
        source: Schema.optional(
          Schema.Struct({
            pointer: Schema.optional(Schema.String),
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(Schema.String),
        source: Schema.optional(
          Schema.Struct({
            pointer: Schema.optional(Schema.String),
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
    result: Schema.optional(
      Schema.Struct({
        errors: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              missing: Schema.optional(Schema.Unknown),
            }),
          ),
        ),
        record: Schema.optional(Schema.Array(Schema.Unknown)),
      }),
    ),
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
      result: "result",
      resultInfo: "result_info",
    }),
  ),
  Schema.Struct({
    errors: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(Schema.String),
        source: Schema.optional(
          Schema.Struct({
            pointer: Schema.optional(Schema.String),
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    messages: Schema.Array(
      Schema.Struct({
        code: Schema.Number,
        message: Schema.String,
        documentationUrl: Schema.optional(Schema.String),
        source: Schema.optional(
          Schema.Struct({
            pointer: Schema.optional(Schema.String),
          }),
        ),
      }).pipe(
        Schema.encodeKeys({
          code: "code",
          message: "message",
          documentationUrl: "documentation_url",
          source: "source",
        }),
      ),
    ),
    success: Schema.Literal(true),
    result: Schema.optional(Schema.Array(Schema.Unknown)),
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
      result: "result",
      resultInfo: "result_info",
    }),
  ),
]) as unknown as Schema.Schema<GetDnsResponse>;

export type GetDnsError = CommonErrors;

export const getDns: API.OperationMethod<
  GetDnsRequest,
  GetDnsResponse,
  GetDnsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDnsRequest,
  output: GetDnsResponse,
  errors: [],
}));

export interface CreateDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Domain of your zone. */
  name?: string;
}

export const CreateDnsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<CreateDnsRequest>;

export type CreateDnsResponse = unknown;

export const CreateDnsResponse =
  Schema.Unknown as unknown as Schema.Schema<CreateDnsResponse>;

export type CreateDnsError = CommonErrors;

export const createDns: API.OperationMethod<
  CreateDnsRequest,
  CreateDnsResponse,
  CreateDnsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDnsRequest,
  output: CreateDnsResponse,
  errors: [],
}));

export interface PatchDnsRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: Domain of your zone. */
  name?: string;
}

export const PatchDnsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "PATCH", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<PatchDnsRequest>;

export type PatchDnsResponse = unknown;

export const PatchDnsResponse =
  Schema.Unknown as unknown as Schema.Schema<PatchDnsResponse>;

export type PatchDnsError = CommonErrors;

export const patchDns: API.OperationMethod<
  PatchDnsRequest,
  PatchDnsResponse,
  PatchDnsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchDnsRequest,
  output: PatchDnsResponse,
  errors: [],
}));

export interface DeleteDnsRequest {
  /** Identifier. */
  zoneId: string;
}

export const DeleteDnsRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing/dns" }),
) as unknown as Schema.Schema<DeleteDnsRequest>;

export type DeleteDnsResponse = {
  content?: string;
  name?: string;
  priority?: number;
  ttl?: number | "1";
  type?:
    | "A"
    | "AAAA"
    | "CNAME"
    | "HTTPS"
    | "TXT"
    | "SRV"
    | "LOC"
    | "MX"
    | "NS"
    | "CERT"
    | "DNSKEY"
    | "DS"
    | "NAPTR"
    | "SMIMEA"
    | "SSHFP"
    | "SVCB"
    | "TLSA"
    | "URI";
}[];

export const DeleteDnsResponse = Schema.Array(
  Schema.Struct({
    content: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    priority: Schema.optional(Schema.Number),
    ttl: Schema.optional(Schema.Union([Schema.Number, Schema.Literal("1")])),
    type: Schema.optional(
      Schema.Literals([
        "A",
        "AAAA",
        "CNAME",
        "HTTPS",
        "TXT",
        "SRV",
        "LOC",
        "MX",
        "NS",
        "CERT",
        "DNSKEY",
        "DS",
        "NAPTR",
        "SMIMEA",
        "SSHFP",
        "SVCB",
        "TLSA",
        "URI",
      ]),
    ),
  }),
) as unknown as Schema.Schema<DeleteDnsResponse>;

export type DeleteDnsError = CommonErrors;

export const deleteDns: API.OperationMethod<
  DeleteDnsRequest,
  DeleteDnsResponse,
  DeleteDnsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteDnsRequest,
  output: DeleteDnsResponse,
  errors: [],
}));

// =============================================================================
// EmailRouting
// =============================================================================

export interface GetEmailRoutingRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetEmailRoutingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing" }),
) as unknown as Schema.Schema<GetEmailRoutingRequest>;

export interface GetEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string;
  /** The date and time the settings have been modified. */
  modified?: string;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked";
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string;
}

export const GetEmailRoutingResponse = Schema.Struct({
  id: Schema.String,
  enabled: Schema.Literals([true, false]),
  name: Schema.String,
  created: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  skipWizard: Schema.optional(Schema.Literals([true, false])),
  status: Schema.optional(
    Schema.Literals([
      "ready",
      "unconfigured",
      "misconfigured",
      "misconfigured/locked",
      "unlocked",
    ]),
  ),
  tag: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    enabled: "enabled",
    name: "name",
    created: "created",
    modified: "modified",
    skipWizard: "skip_wizard",
    status: "status",
    tag: "tag",
  }),
) as unknown as Schema.Schema<GetEmailRoutingResponse>;

export type GetEmailRoutingError = CommonErrors;

export const getEmailRouting: API.OperationMethod<
  GetEmailRoutingRequest,
  GetEmailRoutingResponse,
  GetEmailRoutingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetEmailRoutingRequest,
  output: GetEmailRoutingResponse,
  errors: [],
}));

export interface EnableEmailRoutingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const EnableEmailRoutingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/enable" }),
) as unknown as Schema.Schema<EnableEmailRoutingRequest>;

export interface EnableEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string;
  /** The date and time the settings have been modified. */
  modified?: string;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked";
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string;
}

export const EnableEmailRoutingResponse = Schema.Struct({
  id: Schema.String,
  enabled: Schema.Literals([true, false]),
  name: Schema.String,
  created: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  skipWizard: Schema.optional(Schema.Literals([true, false])),
  status: Schema.optional(
    Schema.Literals([
      "ready",
      "unconfigured",
      "misconfigured",
      "misconfigured/locked",
      "unlocked",
    ]),
  ),
  tag: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    enabled: "enabled",
    name: "name",
    created: "created",
    modified: "modified",
    skipWizard: "skip_wizard",
    status: "status",
    tag: "tag",
  }),
) as unknown as Schema.Schema<EnableEmailRoutingResponse>;

export type EnableEmailRoutingError = CommonErrors;

export const enableEmailRouting: API.OperationMethod<
  EnableEmailRoutingRequest,
  EnableEmailRoutingResponse,
  EnableEmailRoutingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: EnableEmailRoutingRequest,
  output: EnableEmailRoutingResponse,
  errors: [],
}));

export interface DisableEmailRoutingRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: */
  body: unknown;
}

export const DisableEmailRoutingRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/disable" }),
) as unknown as Schema.Schema<DisableEmailRoutingRequest>;

export interface DisableEmailRoutingResponse {
  /** Email Routing settings identifier. */
  id: string;
  /** State of the zone settings for Email Routing. */
  enabled: true | false;
  /** Domain of your zone. */
  name: string;
  /** The date and time the settings have been created. */
  created?: string;
  /** The date and time the settings have been modified. */
  modified?: string;
  /** Flag to check if the user skipped the configuration wizard. */
  skipWizard?: true | false;
  /** Show the state of your account, and the type or configuration error. */
  status?:
    | "ready"
    | "unconfigured"
    | "misconfigured"
    | "misconfigured/locked"
    | "unlocked";
  /** @deprecated Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier) */
  tag?: string;
}

export const DisableEmailRoutingResponse = Schema.Struct({
  id: Schema.String,
  enabled: Schema.Literals([true, false]),
  name: Schema.String,
  created: Schema.optional(Schema.String),
  modified: Schema.optional(Schema.String),
  skipWizard: Schema.optional(Schema.Literals([true, false])),
  status: Schema.optional(
    Schema.Literals([
      "ready",
      "unconfigured",
      "misconfigured",
      "misconfigured/locked",
      "unlocked",
    ]),
  ),
  tag: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    enabled: "enabled",
    name: "name",
    created: "created",
    modified: "modified",
    skipWizard: "skip_wizard",
    status: "status",
    tag: "tag",
  }),
) as unknown as Schema.Schema<DisableEmailRoutingResponse>;

export type DisableEmailRoutingError = CommonErrors;

export const disableEmailRouting: API.OperationMethod<
  DisableEmailRoutingRequest,
  DisableEmailRoutingResponse,
  DisableEmailRoutingError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DisableEmailRoutingRequest,
  output: DisableEmailRoutingResponse,
  errors: [],
}));

// =============================================================================
// Rule
// =============================================================================

export interface GetRuleRequest {
  ruleIdentifier: string;
  /** Identifier. */
  zoneId: string;
}

export const GetRuleRequest = Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<GetRuleRequest>;

export interface GetRuleResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions patterns. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** Matching patterns to forward to your actions. */
  matchers?: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Routing rule name. */
  name?: string;
  /** Priority of the routing rule. */
  priority?: number;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const GetRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["all", "literal"]),
        field: Schema.optional(Schema.Literal("to")),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  tag: Schema.optional(Schema.String),
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
  /** Path param: Identifier. */
  zoneId: string;
  /** Query param: Filter by enabled routing rules. */
  enabled?: true | false;
}

export const ListRulesRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  enabled: Schema.optional(Schema.Literals([true, false])).pipe(
    T.HttpQuery("enabled"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/zones/{zone_id}/email/routing/rules" }),
) as unknown as Schema.Schema<ListRulesRequest>;

export type ListRulesResponse = {
  id?: string;
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  enabled?: true | false;
  matchers?: { type: "all" | "literal"; field?: "to"; value?: string }[];
  name?: string;
  priority?: number;
  tag?: string;
}[];

export const ListRulesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    actions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["drop", "forward", "worker"]),
          value: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
    enabled: Schema.optional(Schema.Literals([true, false])),
    matchers: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals(["all", "literal"]),
          field: Schema.optional(Schema.Literal("to")),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    name: Schema.optional(Schema.String),
    priority: Schema.optional(Schema.Number),
    tag: Schema.optional(Schema.String),
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
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions patterns. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: Matching patterns to forward to your actions. */
  matchers: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
  /** Body param: Priority of the routing rule. */
  priority?: number;
}

export const CreateRuleRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["drop", "forward", "worker"]),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  matchers: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["all", "literal"]),
      field: Schema.optional(Schema.Literal("to")),
      value: Schema.optional(Schema.String),
    }),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "POST", path: "/zones/{zone_id}/email/routing/rules" }),
) as unknown as Schema.Schema<CreateRuleRequest>;

export interface CreateRuleResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions patterns. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** Matching patterns to forward to your actions. */
  matchers?: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Routing rule name. */
  name?: string;
  /** Priority of the routing rule. */
  priority?: number;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const CreateRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["all", "literal"]),
        field: Schema.optional(Schema.Literal("to")),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  tag: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<CreateRuleResponse>;

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
  ruleIdentifier: string;
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions patterns. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: Matching patterns to forward to your actions. */
  matchers: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
  /** Body param: Priority of the routing rule. */
  priority?: number;
}

export const UpdateRuleRequest = Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["drop", "forward", "worker"]),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  matchers: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["all", "literal"]),
      field: Schema.optional(Schema.Literal("to")),
      value: Schema.optional(Schema.String),
    }),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<UpdateRuleRequest>;

export interface UpdateRuleResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions patterns. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** Matching patterns to forward to your actions. */
  matchers?: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Routing rule name. */
  name?: string;
  /** Priority of the routing rule. */
  priority?: number;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const UpdateRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["all", "literal"]),
        field: Schema.optional(Schema.Literal("to")),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  tag: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<UpdateRuleResponse>;

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
  ruleIdentifier: string;
  /** Identifier. */
  zoneId: string;
}

export const DeleteRuleRequest = Schema.Struct({
  ruleIdentifier: Schema.String.pipe(T.HttpPath("ruleIdentifier")),
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/zones/{zone_id}/email/routing/rules/{ruleIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteRuleRequest>;

export interface DeleteRuleResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions patterns. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** Matching patterns to forward to your actions. */
  matchers?: { type: "all" | "literal"; field?: "to"; value?: string }[];
  /** Routing rule name. */
  name?: string;
  /** Priority of the routing rule. */
  priority?: number;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const DeleteRuleResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["all", "literal"]),
        field: Schema.optional(Schema.Literal("to")),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  tag: Schema.optional(Schema.String),
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

// =============================================================================
// RuleCatchAll
// =============================================================================

export interface GetRuleCatchAllRequest {
  /** Identifier. */
  zoneId: string;
}

export const GetRuleCatchAllRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/zones/{zone_id}/email/routing/rules/catch_all",
  }),
) as unknown as Schema.Schema<GetRuleCatchAllRequest>;

export interface GetRuleCatchAllResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions for the catch-all routing rule. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** List of matchers for the catch-all routing rule. */
  matchers?: { type: "all" }[];
  /** Routing rule name. */
  name?: string;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const GetRuleCatchAllResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literal("all"),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<GetRuleCatchAllResponse>;

export type GetRuleCatchAllError = CommonErrors;

export const getRuleCatchAll: API.OperationMethod<
  GetRuleCatchAllRequest,
  GetRuleCatchAllResponse,
  GetRuleCatchAllError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRuleCatchAllRequest,
  output: GetRuleCatchAllResponse,
  errors: [],
}));

export interface PutRuleCatchAllRequest {
  /** Path param: Identifier. */
  zoneId: string;
  /** Body param: List actions for the catch-all routing rule. */
  actions: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Body param: List of matchers for the catch-all routing rule. */
  matchers: { type: "all" }[];
  /** Body param: Routing rule status. */
  enabled?: true | false;
  /** Body param: Routing rule name. */
  name?: string;
}

export const PutRuleCatchAllRequest = Schema.Struct({
  zoneId: Schema.String.pipe(T.HttpPath("zone_id")),
  actions: Schema.Array(
    Schema.Struct({
      type: Schema.Literals(["drop", "forward", "worker"]),
      value: Schema.optional(Schema.Array(Schema.String)),
    }),
  ),
  matchers: Schema.Array(
    Schema.Struct({
      type: Schema.Literal("all"),
    }),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/zones/{zone_id}/email/routing/rules/catch_all",
  }),
) as unknown as Schema.Schema<PutRuleCatchAllRequest>;

export interface PutRuleCatchAllResponse {
  /** Routing rule identifier. */
  id?: string;
  /** List actions for the catch-all routing rule. */
  actions?: { type: "drop" | "forward" | "worker"; value?: string[] }[];
  /** Routing rule status. */
  enabled?: true | false;
  /** List of matchers for the catch-all routing rule. */
  matchers?: { type: "all" }[];
  /** Routing rule name. */
  name?: string;
  /** @deprecated Routing rule tag. (Deprecated, replaced by routing rule identifier) */
  tag?: string;
}

export const PutRuleCatchAllResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  actions: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literals(["drop", "forward", "worker"]),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  enabled: Schema.optional(Schema.Literals([true, false])),
  matchers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.Literal("all"),
      }),
    ),
  ),
  name: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<PutRuleCatchAllResponse>;

export type PutRuleCatchAllError = CommonErrors;

export const putRuleCatchAll: API.OperationMethod<
  PutRuleCatchAllRequest,
  PutRuleCatchAllResponse,
  PutRuleCatchAllError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutRuleCatchAllRequest,
  output: PutRuleCatchAllResponse,
  errors: [],
}));
