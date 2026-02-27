/**
 * Cloudflare REGISTRAR API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service registrar
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
// Domain
// =============================================================================

export interface GetDomainRequest {
  domainName: string;
  /** Identifier */
  accountId: string;
}

export const GetDomainRequest = Schema.Struct({
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({
    method: "GET",
    path: "/accounts/{account_id}/registrar/domains/{domainName}",
  }),
) as unknown as Schema.Schema<GetDomainRequest>;

export type GetDomainResponse = unknown;

export const GetDomainResponse =
  Schema.Unknown as unknown as Schema.Schema<GetDomainResponse>;

export type GetDomainError = CommonErrors;

export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  GetDomainError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResponse,
  errors: [],
}));

export interface ListDomainsRequest {
  /** Identifier */
  accountId: string;
}

export const ListDomainsRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/registrar/domains" }),
) as unknown as Schema.Schema<ListDomainsRequest>;

export type ListDomainsResponse = {
  id?: string;
  available?: boolean;
  canRegister?: boolean;
  createdAt?: string;
  currentRegistrar?: string;
  expiresAt?: string;
  locked?: boolean;
  registrantContact?: {
    address: string;
    city: string;
    country: string | null;
    firstName: string | null;
    lastName: string | null;
    organization: string;
    phone: string | null;
    state: string;
    zip: string | null;
    id?: string;
    address2?: string;
    email?: string;
    fax?: string;
  };
  registryStatuses?: string;
  supportedTld?: boolean;
  transferIn?: {
    acceptFoa?: "needed" | "ok";
    approveTransfer?:
      | "needed"
      | "ok"
      | "pending"
      | "trying"
      | "rejected"
      | "unknown";
    canCancelTransfer?: boolean;
    disablePrivacy?: "needed" | "ok" | "unknown";
    enterAuthCode?: "needed" | "ok" | "pending" | "trying" | "rejected";
    unlockDomain?: "needed" | "ok" | "pending" | "trying" | "unknown";
  };
  updatedAt?: string;
}[];

export const ListDomainsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    available: Schema.optional(Schema.Boolean),
    canRegister: Schema.optional(Schema.Boolean),
    createdAt: Schema.optional(Schema.String),
    currentRegistrar: Schema.optional(Schema.String),
    expiresAt: Schema.optional(Schema.String),
    locked: Schema.optional(Schema.Boolean),
    registrantContact: Schema.optional(
      Schema.Struct({
        address: Schema.String,
        city: Schema.String,
        country: Schema.Union([Schema.String, Schema.Null]),
        firstName: Schema.Union([Schema.String, Schema.Null]),
        lastName: Schema.Union([Schema.String, Schema.Null]),
        organization: Schema.String,
        phone: Schema.Union([Schema.String, Schema.Null]),
        state: Schema.String,
        zip: Schema.Union([Schema.String, Schema.Null]),
        id: Schema.optional(Schema.String),
        address2: Schema.optional(Schema.String),
        email: Schema.optional(Schema.String),
        fax: Schema.optional(Schema.String),
      }).pipe(
        Schema.encodeKeys({
          address: "address",
          city: "city",
          country: "country",
          firstName: "first_name",
          lastName: "last_name",
          organization: "organization",
          phone: "phone",
          state: "state",
          zip: "zip",
          id: "id",
          address2: "address2",
          email: "email",
          fax: "fax",
        }),
      ),
    ),
    registryStatuses: Schema.optional(Schema.String),
    supportedTld: Schema.optional(Schema.Boolean),
    transferIn: Schema.optional(
      Schema.Struct({
        acceptFoa: Schema.optional(Schema.Literals(["needed", "ok"])),
        approveTransfer: Schema.optional(
          Schema.Literals([
            "needed",
            "ok",
            "pending",
            "trying",
            "rejected",
            "unknown",
          ]),
        ),
        canCancelTransfer: Schema.optional(Schema.Boolean),
        disablePrivacy: Schema.optional(
          Schema.Literals(["needed", "ok", "unknown"]),
        ),
        enterAuthCode: Schema.optional(
          Schema.Literals(["needed", "ok", "pending", "trying", "rejected"]),
        ),
        unlockDomain: Schema.optional(
          Schema.Literals(["needed", "ok", "pending", "trying", "unknown"]),
        ),
      }).pipe(
        Schema.encodeKeys({
          acceptFoa: "accept_foa",
          approveTransfer: "approve_transfer",
          canCancelTransfer: "can_cancel_transfer",
          disablePrivacy: "disable_privacy",
          enterAuthCode: "enter_auth_code",
          unlockDomain: "unlock_domain",
        }),
      ),
    ),
    updatedAt: Schema.optional(Schema.String),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      available: "available",
      canRegister: "can_register",
      createdAt: "created_at",
      currentRegistrar: "current_registrar",
      expiresAt: "expires_at",
      locked: "locked",
      registrantContact: "registrant_contact",
      registryStatuses: "registry_statuses",
      supportedTld: "supported_tld",
      transferIn: "transfer_in",
      updatedAt: "updated_at",
    }),
  ),
) as unknown as Schema.Schema<ListDomainsResponse>;

export type ListDomainsError = CommonErrors;

export const listDomains: API.OperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [],
}));

export interface PutDomainRequest {
  domainName: string;
  /** Path param: Identifier */
  accountId: string;
  /** Body param: Auto-renew controls whether subscription is automatically renewed upon domain expiration. */
  autoRenew?: boolean;
  /** Body param: Shows whether a registrar lock is in place for a domain. */
  locked?: boolean;
  /** Body param: Privacy option controls redacting WHOIS information. */
  privacy?: boolean;
}

export const PutDomainRequest = Schema.Struct({
  domainName: Schema.String.pipe(T.HttpPath("domainName")),
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
  autoRenew: Schema.optional(Schema.Boolean),
  locked: Schema.optional(Schema.Boolean),
  privacy: Schema.optional(Schema.Boolean),
}).pipe(
  Schema.encodeKeys({
    autoRenew: "auto_renew",
    locked: "locked",
    privacy: "privacy",
  }),
  T.Http({
    method: "PUT",
    path: "/accounts/{account_id}/registrar/domains/{domainName}",
  }),
) as unknown as Schema.Schema<PutDomainRequest>;

export type PutDomainResponse = unknown;

export const PutDomainResponse =
  Schema.Unknown as unknown as Schema.Schema<PutDomainResponse>;

export type PutDomainError = CommonErrors;

export const putDomain: API.OperationMethod<
  PutDomainRequest,
  PutDomainResponse,
  PutDomainError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutDomainRequest,
  output: PutDomainResponse,
  errors: [],
}));
