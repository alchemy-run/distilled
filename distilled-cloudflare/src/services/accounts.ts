/**
 * Cloudflare ACCOUNTS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service accounts
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
// Errors
// =============================================================================

export class AccountCreationForbidden extends Schema.TaggedErrorClass<AccountCreationForbidden>()(
  "AccountCreationForbidden",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AccountCreationForbidden, [{ code: 1002 }]);

export class AccountNameTooLong extends Schema.TaggedErrorClass<AccountNameTooLong>()(
  "AccountNameTooLong",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(AccountNameTooLong, [
  { code: 1001, message: { includes: "too long" } },
]);

export class BadRequest extends Schema.TaggedErrorClass<BadRequest>()(
  "BadRequest",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(BadRequest, [{ code: 400 }]);

export class EndpointNotFound extends Schema.TaggedErrorClass<EndpointNotFound>()(
  "EndpointNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(EndpointNotFound, [{ code: 1199 }]);

export class InvalidAccountName extends Schema.TaggedErrorClass<InvalidAccountName>()(
  "InvalidAccountName",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidAccountName, [
  { code: 1001, message: { includes: "invalid character" } },
]);

export class InvalidRoute extends Schema.TaggedErrorClass<InvalidRoute>()(
  "InvalidRoute",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidRoute, [{ code: 7003 }]);

export class InvalidTokenName extends Schema.TaggedErrorClass<InvalidTokenName>()(
  "InvalidTokenName",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(InvalidTokenName, [
  { code: 400, message: { includes: "name must have a length" } },
]);

export class JsonDecodeFailure extends Schema.TaggedErrorClass<JsonDecodeFailure>()(
  "JsonDecodeFailure",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(JsonDecodeFailure, [{ code: 1198 }]);

export class MemberNotFound extends Schema.TaggedErrorClass<MemberNotFound>()(
  "MemberNotFound",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MemberNotFound, [{ code: 1003 }]);

export class MethodNotAllowed extends Schema.TaggedErrorClass<MethodNotAllowed>()(
  "MethodNotAllowed",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MethodNotAllowed, [{ code: 7001 }, { code: 10000 }]);

export class MissingAuthenticationToken extends Schema.TaggedErrorClass<MissingAuthenticationToken>()(
  "MissingAuthenticationToken",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MissingAuthenticationToken, [{ code: 1001 }]);

export class MissingName extends Schema.TaggedErrorClass<MissingName>()(
  "MissingName",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(MissingName, [{ code: 1001 }]);

export class UpdateAccountTypeNotSupported extends Schema.TaggedErrorClass<UpdateAccountTypeNotSupported>()(
  "UpdateAccountTypeNotSupported",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(UpdateAccountTypeNotSupported, [
  { code: 1001, message: { includes: "account type is not supported" } },
]);

export class ValidationError extends Schema.TaggedErrorClass<ValidationError>()(
  "ValidationError",
  { code: Schema.Number, message: Schema.String },
) {}
T.applyErrorMatchers(ValidationError, [{ code: 1001 }]);

// =============================================================================
// Account
// =============================================================================

export interface GetAccountRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const GetAccountRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}" }),
) as unknown as Schema.Schema<GetAccountRequest>;

export interface GetAccountResponse {
  /** Identifier */
  id: string;
  /** Account name */
  name: string;
  type: "standard" | "enterprise";
  /** Timestamp for the creation of the account */
  createdOn?: string;
  /** Parent container details */
  managedBy?: { parentOrgId?: string; parentOrgName?: string };
  /** Account settings */
  settings?: {
    abuseContactEmail?: string | null;
    enforceTwofactor?: boolean | null;
  };
}

export const GetAccountResponse = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["standard", "enterprise"]),
  createdOn: Schema.optional(Schema.String),
  managedBy: Schema.optional(
    Schema.Struct({
      parentOrgId: Schema.optional(Schema.String),
      parentOrgName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        parentOrgId: "parent_org_id",
        parentOrgName: "parent_org_name",
      }),
    ),
  ),
  settings: Schema.optional(
    Schema.Struct({
      abuseContactEmail: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      enforceTwofactor: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        abuseContactEmail: "abuse_contact_email",
        enforceTwofactor: "enforce_twofactor",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    name: "name",
    type: "type",
    createdOn: "created_on",
    managedBy: "managed_by",
    settings: "settings",
  }),
) as unknown as Schema.Schema<GetAccountResponse>;

export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountRequest,
  output: GetAccountResponse,
  errors: [InvalidRoute],
}));

export interface ListAccountsRequest {}

export const ListAccountsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/accounts" }),
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse = {
  id: string;
  name: string;
  type: "standard" | "enterprise";
  createdOn?: string;
  managedBy?: { parentOrgId?: string; parentOrgName?: string };
  settings?: { abuseContactEmail?: string; enforceTwofactor?: boolean };
}[];

export const ListAccountsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    type: Schema.Literals(["standard", "enterprise"]),
    createdOn: Schema.optional(Schema.String),
    managedBy: Schema.optional(
      Schema.Struct({
        parentOrgId: Schema.optional(Schema.String),
        parentOrgName: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          parentOrgId: "parent_org_id",
          parentOrgName: "parent_org_name",
        }),
      ),
    ),
    settings: Schema.optional(
      Schema.Struct({
        abuseContactEmail: Schema.optional(Schema.String),
        enforceTwofactor: Schema.optional(Schema.Boolean),
      }).pipe(
        Schema.encodeKeys({
          abuseContactEmail: "abuse_contact_email",
          enforceTwofactor: "enforce_twofactor",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      name: "name",
      type: "type",
      createdOn: "created_on",
      managedBy: "managed_by",
      settings: "settings",
    }),
  ),
) as unknown as Schema.Schema<ListAccountsResponse>;

export const listAccounts: API.OperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [],
}));

export interface CreateAccountRequest {
  /** Account name */
  name: string;
  type?: "standard" | "enterprise";
  /** information related to the tenant unit, and optionally, an id of the unit to create the account on. see https://developers.cloudflare.com/tenant/how-to/manage-accounts/ */
  unit?: { id?: string };
}

export const CreateAccountRequest = Schema.Struct({
  name: Schema.String,
  type: Schema.optional(Schema.Literals(["standard", "enterprise"])),
  unit: Schema.optional(
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/accounts" }),
) as unknown as Schema.Schema<CreateAccountRequest>;

export interface CreateAccountResponse {
  /** Identifier */
  id: string;
  /** Account name */
  name: string;
  type: "standard" | "enterprise";
  /** Timestamp for the creation of the account */
  createdOn?: string;
  /** Parent container details */
  managedBy?: { parentOrgId?: string; parentOrgName?: string };
  /** Account settings */
  settings?: { abuseContactEmail?: string; enforceTwofactor?: boolean };
}

export const CreateAccountResponse = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["standard", "enterprise"]),
  createdOn: Schema.optional(Schema.String),
  managedBy: Schema.optional(
    Schema.Struct({
      parentOrgId: Schema.optional(Schema.String),
      parentOrgName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        parentOrgId: "parent_org_id",
        parentOrgName: "parent_org_name",
      }),
    ),
  ),
  settings: Schema.optional(
    Schema.Struct({
      abuseContactEmail: Schema.optional(Schema.String),
      enforceTwofactor: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        abuseContactEmail: "abuse_contact_email",
        enforceTwofactor: "enforce_twofactor",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    name: "name",
    type: "type",
    createdOn: "created_on",
    managedBy: "managed_by",
    settings: "settings",
  }),
) as unknown as Schema.Schema<CreateAccountResponse>;

export const createAccount: API.OperationMethod<
  CreateAccountRequest,
  CreateAccountResponse,
  CommonErrors | AccountCreationForbidden | MissingName,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountRequest,
  output: CreateAccountResponse,
  errors: [AccountCreationForbidden, MissingName],
}));

export interface UpdateAccountRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Identifier */
  id: string;
  /** Body param: Account name */
  name: string;
  /** Body param: */
  type?: "standard" | "enterprise";
  /** Body param: Parent container details */
  managedBy?: unknown;
  /** Body param: Account settings */
  settings?: { abuseContactEmail?: string; enforceTwofactor?: boolean };
}

export const UpdateAccountRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  id: Schema.String,
  name: Schema.String,
  type: Schema.optional(Schema.Literals(["standard", "enterprise"])),
  managedBy: Schema.optional(Schema.Unknown),
  settings: Schema.optional(
    Schema.Struct({
      abuseContactEmail: Schema.optional(Schema.String),
      enforceTwofactor: Schema.optional(Schema.Boolean),
    }).pipe(
      Schema.encodeKeys({
        abuseContactEmail: "abuse_contact_email",
        enforceTwofactor: "enforce_twofactor",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    name: "name",
    type: "type",
    managedBy: "managed_by",
    settings: "settings",
  }),
  T.Http({ method: "PUT", path: "/accounts/{account_id}" }),
) as unknown as Schema.Schema<UpdateAccountRequest>;

export interface UpdateAccountResponse {
  /** Identifier */
  id: string;
  /** Account name */
  name: string;
  type: "standard" | "enterprise";
  /** Timestamp for the creation of the account */
  createdOn?: string;
  /** Parent container details */
  managedBy?: { parentOrgId?: string; parentOrgName?: string };
  /** Account settings */
  settings?: {
    abuseContactEmail?: string | null;
    enforceTwofactor?: boolean | null;
  };
}

export const UpdateAccountResponse = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  type: Schema.Literals(["standard", "enterprise"]),
  createdOn: Schema.optional(Schema.String),
  managedBy: Schema.optional(
    Schema.Struct({
      parentOrgId: Schema.optional(Schema.String),
      parentOrgName: Schema.optional(Schema.String),
    }).pipe(
      Schema.encodeKeys({
        parentOrgId: "parent_org_id",
        parentOrgName: "parent_org_name",
      }),
    ),
  ),
  settings: Schema.optional(
    Schema.Struct({
      abuseContactEmail: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      enforceTwofactor: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
    }).pipe(
      Schema.encodeKeys({
        abuseContactEmail: "abuse_contact_email",
        enforceTwofactor: "enforce_twofactor",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    name: "name",
    type: "type",
    createdOn: "created_on",
    managedBy: "managed_by",
    settings: "settings",
  }),
) as unknown as Schema.Schema<UpdateAccountResponse>;

export const updateAccount: API.OperationMethod<
  UpdateAccountRequest,
  UpdateAccountResponse,
  | CommonErrors
  | InvalidAccountName
  | AccountNameTooLong
  | UpdateAccountTypeNotSupported
  | InvalidRoute
  | MethodNotAllowed,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateAccountRequest,
  output: UpdateAccountResponse,
  errors: [
    InvalidAccountName,
    AccountNameTooLong,
    UpdateAccountTypeNotSupported,
    InvalidRoute,
    MethodNotAllowed,
  ],
}));

export interface DeleteAccountRequest {
  /** The account ID of the account to be deleted */
  accountId: string;
}

export const DeleteAccountRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}" }),
) as unknown as Schema.Schema<DeleteAccountRequest>;

export interface DeleteAccountResponse {
  /** Identifier */
  id: string;
}

export const DeleteAccountResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteAccountResponse>;

export const deleteAccount: API.OperationMethod<
  DeleteAccountRequest,
  DeleteAccountResponse,
  CommonErrors | InvalidRoute | MethodNotAllowed,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountRequest,
  output: DeleteAccountResponse,
  errors: [InvalidRoute, MethodNotAllowed],
}));

// =============================================================================
// LogAudit
// =============================================================================

export interface ListLogAuditsRequest {
  /** Path param: The unique id that identifies the account. */
  accountId: string;
  /** Query param: Limits the returned results to logs older than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339. */
  before: string;
  /** Query param: Limits the returned results to logs newer than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339. */
  since: string;
  /** Query param: */
  id?: { not?: string[] };
  /** Query param: */
  accountName?: { not?: string[] };
  /** Query param: */
  actionResult?: { not?: ("success" | "failure")[] };
  /** Query param: */
  actionType?: { not?: ("create" | "delete" | "view" | "update")[] };
  /** Query param: */
  actorContext?: {
    not?: ("api_key" | "api_token" | "dash" | "oauth" | "origin_ca_key")[];
  };
  /** Query param: */
  actorEmail?: { not?: string[] };
  /** Query param: */
  actorId?: { not?: string[] };
  /** Query param: */
  actorIpAddress?: { not?: string[] };
  /** Query param: */
  actorTokenId?: { not?: string[] };
  /** Query param: */
  actorTokenName?: { not?: string[] };
  /** Query param: */
  actorType?: { not?: ("account" | "cloudflare_admin" | "system" | "user")[] };
  /** Query param: */
  auditLogId?: { not?: string[] };
  /** Query param: Sets sorting order. */
  direction?: "desc" | "asc";
  /** Query param: The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit. */
  limit?: number;
  /** Query param: */
  rawCfRayId?: { not?: string[] };
  /** Query param: */
  rawMethod?: { not?: string[] };
  /** Query param: */
  rawStatusCode?: { not?: number[] };
  /** Query param: */
  rawUri?: { not?: string[] };
  /** Query param: */
  resourceId?: { not?: string[] };
  /** Query param: */
  resourceProduct?: { not?: string[] };
  /** Query param: */
  resourceScope?: { not?: ("accounts" | "user" | "zones")[] };
  /** Query param: */
  resourceType?: { not?: string[] };
  /** Query param: */
  zoneId?: { not?: string[] };
  /** Query param: */
  zoneName?: { not?: string[] };
}

export const ListLogAuditsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  before: Schema.String.pipe(T.HttpQuery("before")),
  since: Schema.String.pipe(T.HttpQuery("since")),
  id: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("id")),
  accountName: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("account_name")),
  actionResult: Schema.optional(
    Schema.Struct({
      not: Schema.optional(
        Schema.Array(Schema.Literals(["success", "failure"])),
      ),
    }),
  ).pipe(T.HttpQuery("action_result")),
  actionType: Schema.optional(
    Schema.Struct({
      not: Schema.optional(
        Schema.Array(Schema.Literals(["create", "delete", "view", "update"])),
      ),
    }),
  ).pipe(T.HttpQuery("action_type")),
  actorContext: Schema.optional(
    Schema.Struct({
      not: Schema.optional(
        Schema.Array(
          Schema.Literals([
            "api_key",
            "api_token",
            "dash",
            "oauth",
            "origin_ca_key",
          ]),
        ),
      ),
    }),
  ).pipe(T.HttpQuery("actor_context")),
  actorEmail: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("actor_email")),
  actorId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("actor_id")),
  actorIpAddress: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("actor_ip_address")),
  actorTokenId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("actor_token_id")),
  actorTokenName: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("actor_token_name")),
  actorType: Schema.optional(
    Schema.Struct({
      not: Schema.optional(
        Schema.Array(
          Schema.Literals(["account", "cloudflare_admin", "system", "user"]),
        ),
      ),
    }),
  ).pipe(T.HttpQuery("actor_type")),
  auditLogId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("audit_log_id")),
  direction: Schema.optional(Schema.Literals(["desc", "asc"])).pipe(
    T.HttpQuery("direction"),
  ),
  limit: Schema.optional(Schema.Number).pipe(T.HttpQuery("limit")),
  rawCfRayId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("raw_cf_ray_id")),
  rawMethod: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("raw_method")),
  rawStatusCode: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).pipe(T.HttpQuery("raw_status_code")),
  rawUri: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("raw_uri")),
  resourceId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("resource_id")),
  resourceProduct: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("resource_product")),
  resourceScope: Schema.optional(
    Schema.Struct({
      not: Schema.optional(
        Schema.Array(Schema.Literals(["accounts", "user", "zones"])),
      ),
    }),
  ).pipe(T.HttpQuery("resource_scope")),
  resourceType: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("resource_type")),
  zoneId: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("zone_id")),
  zoneName: Schema.optional(
    Schema.Struct({
      not: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).pipe(T.HttpQuery("zone_name")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/logs/audit" }),
) as unknown as Schema.Schema<ListLogAuditsRequest>;

export type ListLogAuditsResponse = {
  id?: string;
  account?: { id?: string; name?: string };
  action?: {
    description?: string;
    result?: string;
    time?: string;
    type?: string;
  };
  actor?: {
    id?: string;
    context?: "api_key" | "api_token" | "dash" | "oauth" | "origin_ca_key";
    email?: string;
    ipAddress?: string;
    tokenId?: string;
    tokenName?: string;
    type?: "account" | "cloudflare_admin" | "system" | "user";
  };
  raw?: {
    cfRayId?: string;
    method?: string;
    statusCode?: number;
    uri?: string;
    userAgent?: string;
  };
  resource?: {
    id?: string;
    product?: string;
    request?: unknown;
    response?: unknown;
    scope?: unknown;
    type?: string;
  };
  zone?: { id?: string; name?: string };
}[];

export const ListLogAuditsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    account: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }),
    ),
    action: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        result: Schema.optional(Schema.String),
        time: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    actor: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        context: Schema.optional(
          Schema.Literals([
            "api_key",
            "api_token",
            "dash",
            "oauth",
            "origin_ca_key",
          ]),
        ),
        email: Schema.optional(Schema.String),
        ipAddress: Schema.optional(Schema.String),
        tokenId: Schema.optional(Schema.String),
        tokenName: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals(["account", "cloudflare_admin", "system", "user"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          id: "id",
          context: "context",
          email: "email",
          ipAddress: "ip_address",
          tokenId: "token_id",
          tokenName: "token_name",
          type: "type",
        }),
      ),
    ),
    raw: Schema.optional(
      Schema.Struct({
        cfRayId: Schema.optional(Schema.String),
        method: Schema.optional(Schema.String),
        statusCode: Schema.optional(Schema.Number),
        uri: Schema.optional(Schema.String),
        userAgent: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          cfRayId: "cf_ray_id",
          method: "method",
          statusCode: "status_code",
          uri: "uri",
          userAgent: "user_agent",
        }),
      ),
    ),
    resource: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        product: Schema.optional(Schema.String),
        request: Schema.optional(Schema.Unknown),
        response: Schema.optional(Schema.Unknown),
        scope: Schema.optional(Schema.Unknown),
        type: Schema.optional(Schema.String),
      }),
    ),
    zone: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }),
    ),
  }),
) as unknown as Schema.Schema<ListLogAuditsResponse>;

export const listLogAudits: API.OperationMethod<
  ListLogAuditsRequest,
  ListLogAuditsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListLogAuditsRequest,
  output: ListLogAuditsResponse,
  errors: [],
}));

// =============================================================================
// Member
// =============================================================================

export interface GetMemberRequest {
  memberId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetMemberRequest = Schema.Struct({
  memberId: Schema.String.pipe(T.HttpPath("memberId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/members/{memberId}" }),
) as unknown as Schema.Schema<GetMemberRequest>;

export type GetMemberResponse = unknown;

export const GetMemberResponse =
  Schema.Unknown as unknown as Schema.Schema<GetMemberResponse>;

export const getMember: API.OperationMethod<
  GetMemberRequest,
  GetMemberResponse,
  CommonErrors | MemberNotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetMemberRequest,
  output: GetMemberResponse,
  errors: [MemberNotFound, InvalidRoute],
}));

export interface ListMembersRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Direction to order results. */
  direction?: "asc" | "desc";
  /** Query param: Field to order results by. */
  order?: "user.first_name" | "user.last_name" | "user.email" | "status";
  /** Query param: A member's status in the account. */
  status?: "accepted" | "pending" | "rejected";
}

export const ListMembersRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
  order: Schema.optional(
    Schema.Literals([
      "user.first_name",
      "user.last_name",
      "user.email",
      "status",
    ]),
  ).pipe(T.HttpQuery("order")),
  status: Schema.optional(
    Schema.Literals(["accepted", "pending", "rejected"]),
  ).pipe(T.HttpQuery("status")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/members" }),
) as unknown as Schema.Schema<ListMembersRequest>;

export type ListMembersResponse = unknown;

export const ListMembersResponse =
  Schema.Unknown as unknown as Schema.Schema<ListMembersResponse>;

export const listMembers: API.OperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [],
}));

export interface CreateMemberRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: The contact email address of the user. */
  email: string;
  /** Body param: Array of roles associated with this member. */
  roles: string[];
  /** Body param: */
  status?: "accepted" | "pending";
}

export const CreateMemberRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  email: Schema.String,
  roles: Schema.Array(Schema.String),
  status: Schema.optional(Schema.Literals(["accepted", "pending"])),
}).pipe(
  T.Http({ method: "POST", path: "/accounts/{account_id}/members" }),
) as unknown as Schema.Schema<CreateMemberRequest>;

export type CreateMemberResponse = unknown;

export const CreateMemberResponse =
  Schema.Unknown as unknown as Schema.Schema<CreateMemberResponse>;

export const createMember: API.OperationMethod<
  CreateMemberRequest,
  CreateMemberResponse,
  CommonErrors | InvalidRoute | ValidationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateMemberRequest,
  output: CreateMemberResponse,
  errors: [InvalidRoute, ValidationError],
}));

export interface UpdateMemberRequest {
  memberId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Roles assigned to this member. */
  roles?: unknown[];
}

export const UpdateMemberRequest = Schema.Struct({
  memberId: Schema.String.pipe(T.HttpPath("memberId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  roles: Schema.optional(Schema.Array(Schema.Unknown)),
}).pipe(
  T.Http({ method: "PUT", path: "/accounts/{account_id}/members/{memberId}" }),
) as unknown as Schema.Schema<UpdateMemberRequest>;

export type UpdateMemberResponse = unknown;

export const UpdateMemberResponse =
  Schema.Unknown as unknown as Schema.Schema<UpdateMemberResponse>;

export const updateMember: API.OperationMethod<
  UpdateMemberRequest,
  UpdateMemberResponse,
  CommonErrors | MemberNotFound | InvalidRoute | BadRequest | MethodNotAllowed,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateMemberRequest,
  output: UpdateMemberResponse,
  errors: [MemberNotFound, InvalidRoute, BadRequest, MethodNotAllowed],
}));

export interface DeleteMemberRequest {
  memberId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteMemberRequest = Schema.Struct({
  memberId: Schema.String.pipe(T.HttpPath("memberId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/members/{memberId}",
  }),
) as unknown as Schema.Schema<DeleteMemberRequest>;

export interface DeleteMemberResponse {
  /** Identifier */
  id: string;
}

export const DeleteMemberResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteMemberResponse>;

export const deleteMember: API.OperationMethod<
  DeleteMemberRequest,
  DeleteMemberResponse,
  CommonErrors | MemberNotFound | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteMemberRequest,
  output: DeleteMemberResponse,
  errors: [MemberNotFound, InvalidRoute],
}));

// =============================================================================
// Role
// =============================================================================

export interface GetRoleRequest {
  roleId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetRoleRequest = Schema.Struct({
  roleId: Schema.String.pipe(T.HttpPath("roleId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/roles/{roleId}" }),
) as unknown as Schema.Schema<GetRoleRequest>;

export type GetRoleResponse = unknown;

export const GetRoleResponse =
  Schema.Unknown as unknown as Schema.Schema<GetRoleResponse>;

export const getRole: API.OperationMethod<
  GetRoleRequest,
  GetRoleResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetRoleRequest,
  output: GetRoleResponse,
  errors: [InvalidRoute],
}));

export interface ListRolesRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
}

export const ListRolesRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/roles" }),
) as unknown as Schema.Schema<ListRolesRequest>;

export type ListRolesResponse = unknown;

export const ListRolesResponse =
  Schema.Unknown as unknown as Schema.Schema<ListRolesResponse>;

export const listRoles: API.OperationMethod<
  ListRolesRequest,
  ListRolesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListRolesRequest,
  output: ListRolesResponse,
  errors: [],
}));

// =============================================================================
// Subscription
// =============================================================================

export interface GetSubscriptionRequest {
  /** Identifier */
  accountId: string;
}

export const GetSubscriptionRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/subscriptions" }),
) as unknown as Schema.Schema<GetSubscriptionRequest>;

export type GetSubscriptionResponse = unknown;

export const GetSubscriptionResponse =
  Schema.Unknown as unknown as Schema.Schema<GetSubscriptionResponse>;

export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [],
}));

export interface CreateSubscriptionRequest {
  /** Path param: Identifier */
  accountId: string;
  /** Body param: How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** Body param: The rate plan applied to the subscription. */
  ratePlan?: unknown;
}

export const CreateSubscriptionRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  ratePlan: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ frequency: "frequency", ratePlan: "rate_plan" }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/subscriptions" }),
) as unknown as Schema.Schema<CreateSubscriptionRequest>;

export type CreateSubscriptionResponse = unknown;

export const CreateSubscriptionResponse =
  Schema.Unknown as unknown as Schema.Schema<CreateSubscriptionResponse>;

export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CommonErrors | JsonDecodeFailure | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateSubscriptionRequest,
  output: CreateSubscriptionResponse,
  errors: [JsonDecodeFailure, InvalidRoute],
}));

export interface UpdateSubscriptionRequest {
  subscriptionIdentifier: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** Body param: The rate plan applied to the subscription. */
  ratePlan?: unknown;
}

export const UpdateSubscriptionRequest = Schema.Struct({
  subscriptionIdentifier: Schema.String.pipe(
    T.HttpPath("subscriptionIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  ratePlan: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ frequency: "frequency", ratePlan: "rate_plan" }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/subscriptions/{subscriptionIdentifier}",
  }),
) as unknown as Schema.Schema<UpdateSubscriptionRequest>;

export type UpdateSubscriptionResponse = unknown;

export const UpdateSubscriptionResponse =
  Schema.Unknown as unknown as Schema.Schema<UpdateSubscriptionResponse>;

export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionRequest,
  UpdateSubscriptionResponse,
  CommonErrors | JsonDecodeFailure | InvalidRoute | EndpointNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSubscriptionRequest,
  output: UpdateSubscriptionResponse,
  errors: [JsonDecodeFailure, InvalidRoute, EndpointNotFound],
}));

export interface DeleteSubscriptionRequest {
  subscriptionIdentifier: string;
  /** Identifier */
  accountId: string;
}

export const DeleteSubscriptionRequest = Schema.Struct({
  subscriptionIdentifier: Schema.String.pipe(
    T.HttpPath("subscriptionIdentifier"),
  ),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/accounts/{account_id}/subscriptions/{subscriptionIdentifier}",
  }),
) as unknown as Schema.Schema<DeleteSubscriptionRequest>;

export interface DeleteSubscriptionResponse {
  /** Subscription identifier tag. */
  subscriptionId?: string;
}

export const DeleteSubscriptionResponse = Schema.Struct({
  subscriptionId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ subscriptionId: "subscription_id" }),
) as unknown as Schema.Schema<DeleteSubscriptionResponse>;

export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  CommonErrors | InvalidRoute | EndpointNotFound,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSubscriptionRequest,
  output: DeleteSubscriptionResponse,
  errors: [InvalidRoute, EndpointNotFound],
}));

// =============================================================================
// Token
// =============================================================================

export interface GetTokenRequest {
  tokenId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const GetTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/tokens/{tokenId}" }),
) as unknown as Schema.Schema<GetTokenRequest>;

export type GetTokenResponse = unknown;

export const GetTokenResponse =
  Schema.Unknown as unknown as Schema.Schema<GetTokenResponse>;

export const getToken: API.OperationMethod<
  GetTokenRequest,
  GetTokenResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTokenRequest,
  output: GetTokenResponse,
  errors: [InvalidRoute],
}));

export interface ListTokensRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Direction to order results. */
  direction?: "asc" | "desc";
}

export const ListTokensRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  direction: Schema.optional(Schema.Literals(["asc", "desc"])).pipe(
    T.HttpQuery("direction"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/tokens" }),
) as unknown as Schema.Schema<ListTokensRequest>;

export type ListTokensResponse = unknown;

export const ListTokensResponse =
  Schema.Unknown as unknown as Schema.Schema<ListTokensResponse>;

export const listTokens: API.OperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [],
}));

export interface CreateTokenRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Token name. */
  name: string;
  /** Body param: List of access policies assigned to the token. */
  policies: unknown[];
  /** Body param: */
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** Body param: The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** Body param: The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
}

export const CreateTokenRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  policies: Schema.Array(Schema.Unknown),
  condition: Schema.optional(
    Schema.Struct({
      requestIp: Schema.optional(
        Schema.Struct({
          in: Schema.optional(Schema.Array(Schema.String)),
          notIn: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
      ),
    }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
  ),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    policies: "policies",
    condition: "condition",
    expiresOn: "expires_on",
    notBefore: "not_before",
  }),
  T.Http({ method: "POST", path: "/accounts/{account_id}/tokens" }),
) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  /** Token identifier tag. */
  id?: string;
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string | null;
  /** The time on which the token was created. */
  issuedOn?: string;
  /** Last time the token was used. */
  lastUsedOn?: string | null;
  /** Last time the token was modified. */
  modifiedOn?: string;
  /** Token name. */
  name?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string | null;
  /** List of access policies assigned to the token. */
  policies?: unknown[];
  /** Status of the token. */
  status?: "active" | "disabled" | "expired";
  /** The token value. */
  value?: string;
}

export const CreateTokenResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  condition: Schema.optional(
    Schema.Struct({
      requestIp: Schema.optional(
        Schema.Struct({
          in: Schema.optional(Schema.Array(Schema.String)),
          notIn: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
      ),
    }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
  ),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuedOn: Schema.optional(Schema.String),
  lastUsedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  policies: Schema.optional(Schema.Array(Schema.Unknown)),
  status: Schema.optional(Schema.Literals(["active", "disabled", "expired"])),
  value: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    condition: "condition",
    expiresOn: "expires_on",
    issuedOn: "issued_on",
    lastUsedOn: "last_used_on",
    modifiedOn: "modified_on",
    name: "name",
    notBefore: "not_before",
    policies: "policies",
    status: "status",
    value: "value",
  }),
) as unknown as Schema.Schema<CreateTokenResponse>;

export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CommonErrors | InvalidRoute | InvalidTokenName,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [InvalidRoute, InvalidTokenName],
}));

export interface UpdateTokenRequest {
  tokenId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: Token name. */
  name: string;
  /** Body param: List of access policies assigned to the token. */
  policies: unknown[];
  /** Body param: */
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** Body param: The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** Body param: The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
  /** Body param: Status of the token. */
  status?: "active" | "disabled" | "expired";
}

export const UpdateTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.String,
  policies: Schema.Array(Schema.Unknown),
  condition: Schema.optional(
    Schema.Struct({
      requestIp: Schema.optional(
        Schema.Struct({
          in: Schema.optional(Schema.Array(Schema.String)),
          notIn: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
      ),
    }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
  ),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literals(["active", "disabled", "expired"])),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    policies: "policies",
    condition: "condition",
    expiresOn: "expires_on",
    notBefore: "not_before",
    status: "status",
  }),
  T.Http({ method: "PUT", path: "/accounts/{account_id}/tokens/{tokenId}" }),
) as unknown as Schema.Schema<UpdateTokenRequest>;

export type UpdateTokenResponse = unknown;

export const UpdateTokenResponse =
  Schema.Unknown as unknown as Schema.Schema<UpdateTokenResponse>;

export const updateToken: API.OperationMethod<
  UpdateTokenRequest,
  UpdateTokenResponse,
  CommonErrors | InvalidRoute | MethodNotAllowed,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTokenRequest,
  output: UpdateTokenResponse,
  errors: [InvalidRoute, MethodNotAllowed],
}));

export interface DeleteTokenRequest {
  tokenId: string;
  /** Account identifier tag. */
  accountId: string;
}

export const DeleteTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "DELETE", path: "/accounts/{account_id}/tokens/{tokenId}" }),
) as unknown as Schema.Schema<DeleteTokenRequest>;

export interface DeleteTokenResponse {
  /** Identifier */
  id: string;
}

export const DeleteTokenResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteTokenResponse>;

export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  CommonErrors | InvalidRoute | MethodNotAllowed,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [InvalidRoute, MethodNotAllowed],
}));

export interface VerifyTokenRequest {
  /** Account identifier tag. */
  accountId: string;
}

export const VerifyTokenRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/tokens/verify" }),
) as unknown as Schema.Schema<VerifyTokenRequest>;

export interface VerifyTokenResponse {
  /** Token identifier tag. */
  id: string;
  /** Status of the token. */
  status: "active" | "disabled" | "expired";
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
}

export const VerifyTokenResponse = Schema.Struct({
  id: Schema.String,
  status: Schema.Literals(["active", "disabled", "expired"]),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    status: "status",
    expiresOn: "expires_on",
    notBefore: "not_before",
  }),
) as unknown as Schema.Schema<VerifyTokenResponse>;

export const verifyToken: API.OperationMethod<
  VerifyTokenRequest,
  VerifyTokenResponse,
  CommonErrors | MissingAuthenticationToken | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: VerifyTokenRequest,
  output: VerifyTokenResponse,
  errors: [MissingAuthenticationToken, InvalidRoute],
}));

// =============================================================================
// TokenPermissionGroup
// =============================================================================

export interface GetTokenPermissionGroupRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Filter by the name of the permission group. The value must be URL-encoded. */
  name?: string;
  /** Query param: Filter by the scope of the permission group. The value must be URL-encoded. */
  scope?: string;
}

export const GetTokenPermissionGroupRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/tokens/permission_groups",
  }),
) as unknown as Schema.Schema<GetTokenPermissionGroupRequest>;

export type GetTokenPermissionGroupResponse = {
  id?: string;
  name?: string;
  scopes?: (
    | "com.cloudflare.api.account"
    | "com.cloudflare.api.account.zone"
    | "com.cloudflare.api.user"
    | "com.cloudflare.edge.r2.bucket"
  )[];
}[];

export const GetTokenPermissionGroupResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    scopes: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "com.cloudflare.api.account",
          "com.cloudflare.api.account.zone",
          "com.cloudflare.api.user",
          "com.cloudflare.edge.r2.bucket",
        ]),
      ),
    ),
  }),
) as unknown as Schema.Schema<GetTokenPermissionGroupResponse>;

export const getTokenPermissionGroup: API.OperationMethod<
  GetTokenPermissionGroupRequest,
  GetTokenPermissionGroupResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTokenPermissionGroupRequest,
  output: GetTokenPermissionGroupResponse,
  errors: [InvalidRoute],
}));

export interface ListTokenPermissionGroupsRequest {
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Query param: Filter by the name of the permission group. The value must be URL-encoded. */
  name?: string;
  /** Query param: Filter by the scope of the permission group. The value must be URL-encoded. */
  scope?: string;
}

export const ListTokenPermissionGroupsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/tokens/permission_groups",
  }),
) as unknown as Schema.Schema<ListTokenPermissionGroupsRequest>;

export type ListTokenPermissionGroupsResponse = {
  id?: string;
  name?: string;
  scopes?: (
    | "com.cloudflare.api.account"
    | "com.cloudflare.api.account.zone"
    | "com.cloudflare.api.user"
    | "com.cloudflare.edge.r2.bucket"
  )[];
}[];

export const ListTokenPermissionGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    scopes: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "com.cloudflare.api.account",
          "com.cloudflare.api.account.zone",
          "com.cloudflare.api.user",
          "com.cloudflare.edge.r2.bucket",
        ]),
      ),
    ),
  }),
) as unknown as Schema.Schema<ListTokenPermissionGroupsResponse>;

export const listTokenPermissionGroups: API.OperationMethod<
  ListTokenPermissionGroupsRequest,
  ListTokenPermissionGroupsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokenPermissionGroupsRequest,
  output: ListTokenPermissionGroupsResponse,
  errors: [],
}));

// =============================================================================
// TokenValue
// =============================================================================

export interface PutTokenValueRequest {
  tokenId: string;
  /** Path param: Account identifier tag. */
  accountId: string;
  /** Body param: */
  body: unknown;
}

export const PutTokenValueRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  body: Schema.Unknown.pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/tokens/{tokenId}/value",
  }),
) as unknown as Schema.Schema<PutTokenValueRequest>;

export type PutTokenValueResponse = unknown;

export const PutTokenValueResponse =
  Schema.Unknown as unknown as Schema.Schema<PutTokenValueResponse>;

export const putTokenValue: API.OperationMethod<
  PutTokenValueRequest,
  PutTokenValueResponse,
  CommonErrors | InvalidRoute,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutTokenValueRequest,
  output: PutTokenValueResponse,
  errors: [InvalidRoute],
}));
