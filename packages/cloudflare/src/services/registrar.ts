/**
 * Cloudflare REGISTRAR API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service registrar
 */

import * as stream from "effect/Stream";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import { type DefaultErrors } from "../errors.ts";

// =============================================================================
// Domain
// =============================================================================

export interface GetDomainRequest {
  domainName: string;
  /** Identifier */
  accountId: string;
}

export const GetDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<GetDomainResponse>;

export type GetDomainError = DefaultErrors;

export const getDomain: API.OperationMethod<
  GetDomainRequest,
  GetDomainResponse,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDomainRequest,
  output: GetDomainResponse,
  errors: [],
}));

export interface ListDomainsRequest {
  /** Identifier */
  accountId: string;
}

export const ListDomainsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/registrar/domains" }),
) as unknown as Schema.Schema<ListDomainsRequest>;

export interface ListDomainsResponse {
  result: {
    id?: string | null;
    available?: boolean | null;
    canRegister?: boolean | null;
    createdAt?: string | null;
    currentRegistrar?: string | null;
    expiresAt?: string | null;
    locked?: boolean | null;
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
      id?: string | null;
      address2?: string | null;
      email?: string | null;
      fax?: string | null;
    } | null;
    registryStatuses?: string | null;
    supportedTld?: boolean | null;
    transferIn?: {
      acceptFoa?: "needed" | "ok" | null;
      approveTransfer?:
        | "needed"
        | "ok"
        | "pending"
        | "trying"
        | "rejected"
        | "unknown"
        | null;
      canCancelTransfer?: boolean | null;
      disablePrivacy?: "needed" | "ok" | "unknown" | null;
      enterAuthCode?:
        | "needed"
        | "ok"
        | "pending"
        | "trying"
        | "rejected"
        | null;
      unlockDomain?: "needed" | "ok" | "pending" | "trying" | "unknown" | null;
    } | null;
    updatedAt?: string | null;
  }[];
}

export const ListDomainsResponse = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  result: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      available: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      canRegister: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      createdAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      currentRegistrar: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      expiresAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      locked: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
      registrantContact: Schema.optional(
        Schema.Union([
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
            id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            address2: Schema.optional(
              Schema.Union([Schema.String, Schema.Null]),
            ),
            email: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
            fax: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
          Schema.Null,
        ]),
      ),
      registryStatuses: Schema.optional(
        Schema.Union([Schema.String, Schema.Null]),
      ),
      supportedTld: Schema.optional(
        Schema.Union([Schema.Boolean, Schema.Null]),
      ),
      transferIn: Schema.optional(
        Schema.Union([
          Schema.Struct({
            acceptFoa: Schema.optional(
              Schema.Union([Schema.Literals(["needed", "ok"]), Schema.Null]),
            ),
            approveTransfer: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "needed",
                  "ok",
                  "pending",
                  "trying",
                  "rejected",
                  "unknown",
                ]),
                Schema.Null,
              ]),
            ),
            canCancelTransfer: Schema.optional(
              Schema.Union([Schema.Boolean, Schema.Null]),
            ),
            disablePrivacy: Schema.optional(
              Schema.Union([
                Schema.Literals(["needed", "ok", "unknown"]),
                Schema.Null,
              ]),
            ),
            enterAuthCode: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "needed",
                  "ok",
                  "pending",
                  "trying",
                  "rejected",
                ]),
                Schema.Null,
              ]),
            ),
            unlockDomain: Schema.optional(
              Schema.Union([
                Schema.Literals([
                  "needed",
                  "ok",
                  "pending",
                  "trying",
                  "unknown",
                ]),
                Schema.Null,
              ]),
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
          Schema.Null,
        ]),
      ),
      updatedAt: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
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
  ),
}) as unknown as Schema.Schema<ListDomainsResponse>;

export type ListDomainsError = DefaultErrors;

export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient
> & {
  pages: (
    input: ListDomainsRequest,
  ) => stream.Stream<
    ListDomainsResponse,
    ListDomainsError,
    Credentials | HttpClient.HttpClient
  >;
  items: (input: ListDomainsRequest) => stream.Stream<
    {
      id?: string | null;
      available?: boolean | null;
      canRegister?: boolean | null;
      createdAt?: string | null;
      currentRegistrar?: string | null;
      expiresAt?: string | null;
      locked?: boolean | null;
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
        id?: string | null;
        address2?: string | null;
        email?: string | null;
        fax?: string | null;
      } | null;
      registryStatuses?: string | null;
      supportedTld?: boolean | null;
      transferIn?: {
        acceptFoa?: "needed" | "ok" | null;
        approveTransfer?:
          | "needed"
          | "ok"
          | "pending"
          | "trying"
          | "rejected"
          | "unknown"
          | null;
        canCancelTransfer?: boolean | null;
        disablePrivacy?: "needed" | "ok" | "unknown" | null;
        enterAuthCode?:
          | "needed"
          | "ok"
          | "pending"
          | "trying"
          | "rejected"
          | null;
        unlockDomain?:
          | "needed"
          | "ok"
          | "pending"
          | "trying"
          | "unknown"
          | null;
      } | null;
      updatedAt?: string | null;
    },
    ListDomainsError,
    Credentials | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [],
  pagination: {
    mode: "single",
    items: "result",
  } as const,
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

export const PutDomainRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown.pipe(
    T.ResponsePath("result"),
  ) as unknown as Schema.Schema<PutDomainResponse>;

export type PutDomainError = DefaultErrors;

export const putDomain: API.OperationMethod<
  PutDomainRequest,
  PutDomainResponse,
  PutDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutDomainRequest,
  output: PutDomainResponse,
  errors: [],
}));
