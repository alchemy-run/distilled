/**
 * Cloudflare MEMBERSHIPS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service memberships
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Membership
// =============================================================================

export interface GetMembershipRequest {
  membershipId: string;
}

export const GetMembershipRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  membershipId: Schema.String.pipe(T.HttpPath("membershipId")),
}).pipe(
  T.Http({ method: "GET", path: "/memberships/{membershipId}" }),
) as unknown as Schema.Schema<GetMembershipRequest>;

export interface GetMembershipResponse {
  /** Membership identifier tag. */
  id?: string | null;
  account?: unknown | null;
  /** Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account. */
  apiAccessEnabled?: boolean | null;
  /** All access permissions for the user at the account. */
  permissions?: {
    analytics?: unknown | null;
    billing?: unknown | null;
    cachePurge?: unknown | null;
    dns?: unknown | null;
    dnsRecords?: unknown | null;
    lb?: unknown | null;
    logs?: unknown | null;
    organization?: unknown | null;
    ssl?: unknown | null;
    waf?: unknown | null;
    zoneSettings?: unknown | null;
    zones?: unknown | null;
  } | null;
  /** Access policy for the membership */
  policies?:
    | {
        id?: string | null;
        access?: "allow" | "deny" | null;
        permissionGroups?:
          | {
              id: string;
              meta?: { key?: string | null; value?: string | null } | null;
              name?: string | null;
            }[]
          | null;
        resourceGroups?:
          | {
              id: string;
              scope: { key: string; objects: { key: string }[] }[];
              meta?: { key?: string | null; value?: string | null } | null;
              name?: string | null;
            }[]
          | null;
      }[]
    | null;
  /** List of role names the membership has for this account. */
  roles?: string[] | null;
  /** Status of this membership. */
  status?: "accepted" | "pending" | "rejected" | null;
}

export const GetMembershipResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  account: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  apiAccessEnabled: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  permissions: Schema.optional(
    Schema.Union([
      Schema.Struct({
        analytics: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        billing: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        cachePurge: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        dns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        dnsRecords: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        lb: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        logs: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        organization: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        ssl: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        waf: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        zoneSettings: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        zones: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          analytics: "analytics",
          billing: "billing",
          cachePurge: "cache_purge",
          dns: "dns",
          dnsRecords: "dns_records",
          lb: "lb",
          logs: "logs",
          organization: "organization",
          ssl: "ssl",
          waf: "waf",
          zoneSettings: "zone_settings",
          zones: "zones",
        }),
      ),
      Schema.Null,
    ]),
  ),
  policies: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          access: Schema.optional(
            Schema.Union([Schema.Literals(["allow", "deny"]), Schema.Null]),
          ),
          permissionGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  meta: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        key: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.Null,
                    ]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          resourceGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  scope: Schema.Array(
                    Schema.Struct({
                      key: Schema.String,
                      objects: Schema.Array(
                        Schema.Struct({
                          key: Schema.String,
                        }),
                      ),
                    }),
                  ),
                  meta: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        key: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.Null,
                    ]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            access: "access",
            permissionGroups: "permission_groups",
            resourceGroups: "resource_groups",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  roles: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals(["accepted", "pending", "rejected"]),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    account: "account",
    apiAccessEnabled: "api_access_enabled",
    permissions: "permissions",
    policies: "policies",
    roles: "roles",
    status: "status",
  }),
) as unknown as Schema.Schema<GetMembershipResponse>;

export type GetMembershipError = DefaultErrors;

export const getMembership: API.OperationMethod<
  GetMembershipRequest,
  GetMembershipResponse,
  GetMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMembershipRequest,
  output: GetMembershipResponse,
  errors: [],
}));

export interface ListMembershipsRequest {}

export const ListMembershipsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/memberships" }),
) as unknown as Schema.Schema<ListMembershipsRequest>;

export type ListMembershipsResponse = {
  id?: string | null;
  account?: unknown | null;
  apiAccessEnabled?: boolean | null;
  permissions?: {
    analytics?: unknown | null;
    billing?: unknown | null;
    cachePurge?: unknown | null;
    dns?: unknown | null;
    dnsRecords?: unknown | null;
    lb?: unknown | null;
    logs?: unknown | null;
    organization?: unknown | null;
    ssl?: unknown | null;
    waf?: unknown | null;
    zoneSettings?: unknown | null;
    zones?: unknown | null;
  } | null;
  roles?: string[] | null;
  status?: "accepted" | "pending" | "rejected" | null;
}[];

export const ListMembershipsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    account: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
    apiAccessEnabled: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    permissions: Schema.optional(
      Schema.Union([
        Schema.Struct({
          analytics: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          billing: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          cachePurge: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          dns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          dnsRecords: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          lb: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          logs: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          organization: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          ssl: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          waf: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
          zoneSettings: Schema.optional(
            Schema.Union([Schema.Unknown, Schema.Null]),
          ),
          zones: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        }).pipe(
          Schema.encodeKeys({
            analytics: "analytics",
            billing: "billing",
            cachePurge: "cache_purge",
            dns: "dns",
            dnsRecords: "dns_records",
            lb: "lb",
            logs: "logs",
            organization: "organization",
            ssl: "ssl",
            waf: "waf",
            zoneSettings: "zone_settings",
            zones: "zones",
          }),
        ),
        Schema.Null,
      ]),
    ),
    roles: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["accepted", "pending", "rejected"]),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      account: "account",
      apiAccessEnabled: "api_access_enabled",
      permissions: "permissions",
      roles: "roles",
      status: "status",
    }),
  ),
) as unknown as Schema.Schema<ListMembershipsResponse>;

export type ListMembershipsError = DefaultErrors;

export const listMemberships: API.OperationMethod<
  ListMembershipsRequest,
  ListMembershipsResponse,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListMembershipsRequest,
  output: ListMembershipsResponse,
  errors: [],
}));

export interface PutMembershipRequest {
  membershipId: string;
  /** Whether to accept or reject this account invitation. */
  status: "accepted" | "rejected";
}

export const PutMembershipRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  membershipId: Schema.String.pipe(T.HttpPath("membershipId")),
  status: Schema.Literals(["accepted", "rejected"]),
}).pipe(
  T.Http({ method: "PUT", path: "/memberships/{membershipId}" }),
) as unknown as Schema.Schema<PutMembershipRequest>;

export interface PutMembershipResponse {
  /** Membership identifier tag. */
  id?: string | null;
  account?: unknown | null;
  /** Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account. */
  apiAccessEnabled?: boolean | null;
  /** All access permissions for the user at the account. */
  permissions?: {
    analytics?: unknown | null;
    billing?: unknown | null;
    cachePurge?: unknown | null;
    dns?: unknown | null;
    dnsRecords?: unknown | null;
    lb?: unknown | null;
    logs?: unknown | null;
    organization?: unknown | null;
    ssl?: unknown | null;
    waf?: unknown | null;
    zoneSettings?: unknown | null;
    zones?: unknown | null;
  } | null;
  /** Access policy for the membership */
  policies?:
    | {
        id?: string | null;
        access?: "allow" | "deny" | null;
        permissionGroups?:
          | {
              id: string;
              meta?: { key?: string | null; value?: string | null } | null;
              name?: string | null;
            }[]
          | null;
        resourceGroups?:
          | {
              id: string;
              scope: { key: string; objects: { key: string }[] }[];
              meta?: { key?: string | null; value?: string | null } | null;
              name?: string | null;
            }[]
          | null;
      }[]
    | null;
  /** List of role names the membership has for this account. */
  roles?: string[] | null;
  /** Status of this membership. */
  status?: "accepted" | "pending" | "rejected" | null;
}

export const PutMembershipResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  account: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
  apiAccessEnabled: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  permissions: Schema.optional(
    Schema.Union([
      Schema.Struct({
        analytics: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        billing: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        cachePurge: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        dns: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        dnsRecords: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        lb: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        logs: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        organization: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        ssl: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        waf: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
        zoneSettings: Schema.optional(
          Schema.Union([Schema.Unknown, Schema.Null]),
        ),
        zones: Schema.optional(Schema.Union([Schema.Unknown, Schema.Null])),
      }).pipe(
        Schema.encodeKeys({
          analytics: "analytics",
          billing: "billing",
          cachePurge: "cache_purge",
          dns: "dns",
          dnsRecords: "dns_records",
          lb: "lb",
          logs: "logs",
          organization: "organization",
          ssl: "ssl",
          waf: "waf",
          zoneSettings: "zone_settings",
          zones: "zones",
        }),
      ),
      Schema.Null,
    ]),
  ),
  policies: Schema.optional(
    Schema.Union([
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
          access: Schema.optional(
            Schema.Union([Schema.Literals(["allow", "deny"]), Schema.Null]),
          ),
          permissionGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  meta: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        key: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.Null,
                    ]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
          resourceGroups: Schema.optional(
            Schema.Union([
              Schema.Array(
                Schema.Struct({
                  id: Schema.String,
                  scope: Schema.Array(
                    Schema.Struct({
                      key: Schema.String,
                      objects: Schema.Array(
                        Schema.Struct({
                          key: Schema.String,
                        }),
                      ),
                    }),
                  ),
                  meta: Schema.optional(
                    Schema.Union([
                      Schema.Struct({
                        key: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                        value: Schema.optional(
                          Schema.Union([Schema.String, Schema.Null]),
                        ),
                      }),
                      Schema.Null,
                    ]),
                  ),
                  name: Schema.optional(
                    Schema.Union([Schema.String, Schema.Null]),
                  ),
                }),
              ),
              Schema.Null,
            ]),
          ),
        }).pipe(
          Schema.encodeKeys({
            id: "id",
            access: "access",
            permissionGroups: "permission_groups",
            resourceGroups: "resource_groups",
          }),
        ),
      ),
      Schema.Null,
    ]),
  ),
  roles: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals(["accepted", "pending", "rejected"]),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    account: "account",
    apiAccessEnabled: "api_access_enabled",
    permissions: "permissions",
    policies: "policies",
    roles: "roles",
    status: "status",
  }),
) as unknown as Schema.Schema<PutMembershipResponse>;

export type PutMembershipError = DefaultErrors;

export const putMembership: API.OperationMethod<
  PutMembershipRequest,
  PutMembershipResponse,
  PutMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutMembershipRequest,
  output: PutMembershipResponse,
  errors: [],
}));

export interface DeleteMembershipRequest {
  membershipId: string;
}

export const DeleteMembershipRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    membershipId: Schema.String.pipe(T.HttpPath("membershipId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "/memberships/{membershipId}" }),
  ) as unknown as Schema.Schema<DeleteMembershipRequest>;

export interface DeleteMembershipResponse {
  /** Membership identifier tag. */
  id?: string | null;
}

export const DeleteMembershipResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  }) as unknown as Schema.Schema<DeleteMembershipResponse>;

export type DeleteMembershipError = DefaultErrors;

export const deleteMembership: API.OperationMethod<
  DeleteMembershipRequest,
  DeleteMembershipResponse,
  DeleteMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMembershipRequest,
  output: DeleteMembershipResponse,
  errors: [],
}));
