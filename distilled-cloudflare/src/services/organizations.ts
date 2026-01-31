/**
 * Cloudflare ORGANIZATIONS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service organizations
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type { HttpClient } from "@effect/platform";
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
// Organization
// =============================================================================

export interface GetOrganizationRequest {
  organizationId: string;
}

export const GetOrganizationRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organizationId}" }),
) as unknown as Schema.Schema<GetOrganizationRequest>;

export interface GetOrganizationResponse {
  id: string;
  createTime: string;
  meta: {
    flags?: {
      accountCreation: string;
      accountDeletion: string;
      accountMigration: string;
      accountMobility: string;
      subOrgCreation: string;
    };
    managedBy?: string;
  };
  name: string;
  parent?: { id: string; name: string };
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  };
}

export const GetOrganizationResponse = Schema.Struct({
  id: Schema.String,
  createTime: Schema.String.pipe(T.JsonName("create_time")),
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String.pipe(T.JsonName("account_creation")),
        accountDeletion: Schema.String.pipe(T.JsonName("account_deletion")),
        accountMigration: Schema.String.pipe(T.JsonName("account_migration")),
        accountMobility: Schema.String.pipe(T.JsonName("account_mobility")),
        subOrgCreation: Schema.String.pipe(T.JsonName("sub_org_creation")),
      }),
    ),
    managedBy: Schema.optional(Schema.String).pipe(T.JsonName("managed_by")),
  }),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String.pipe(T.JsonName("business_address")),
      businessEmail: Schema.String.pipe(T.JsonName("business_email")),
      businessName: Schema.String.pipe(T.JsonName("business_name")),
      businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
      externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
    }),
  ),
}) as unknown as Schema.Schema<GetOrganizationResponse>;

export const getOrganization: (
  input: GetOrganizationRequest,
) => Effect.Effect<
  GetOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationRequest,
  output: GetOrganizationResponse,
  errors: [],
}));

export interface CreateOrganizationRequest {
  name: string;
  parent?: { id: string };
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  };
}

export const CreateOrganizationRequest = Schema.Struct({
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String.pipe(T.JsonName("business_address")),
      businessEmail: Schema.String.pipe(T.JsonName("business_email")),
      businessName: Schema.String.pipe(T.JsonName("business_name")),
      businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
      externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
    }),
  ),
}).pipe(
  T.Http({ method: "POST", path: "/organizations" }),
) as unknown as Schema.Schema<CreateOrganizationRequest>;

export interface CreateOrganizationResponse {
  id: string;
  createTime: string;
  meta: {
    flags?: {
      accountCreation: string;
      accountDeletion: string;
      accountMigration: string;
      accountMobility: string;
      subOrgCreation: string;
    };
    managedBy?: string;
  };
  name: string;
  parent?: { id: string; name: string };
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  };
}

export const CreateOrganizationResponse = Schema.Struct({
  id: Schema.String,
  createTime: Schema.String.pipe(T.JsonName("create_time")),
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String.pipe(T.JsonName("account_creation")),
        accountDeletion: Schema.String.pipe(T.JsonName("account_deletion")),
        accountMigration: Schema.String.pipe(T.JsonName("account_migration")),
        accountMobility: Schema.String.pipe(T.JsonName("account_mobility")),
        subOrgCreation: Schema.String.pipe(T.JsonName("sub_org_creation")),
      }),
    ),
    managedBy: Schema.optional(Schema.String).pipe(T.JsonName("managed_by")),
  }),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String.pipe(T.JsonName("business_address")),
      businessEmail: Schema.String.pipe(T.JsonName("business_email")),
      businessName: Schema.String.pipe(T.JsonName("business_name")),
      businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
      externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
    }),
  ),
}) as unknown as Schema.Schema<CreateOrganizationResponse>;

export const createOrganization: (
  input: CreateOrganizationRequest,
) => Effect.Effect<
  CreateOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateOrganizationRequest,
  output: CreateOrganizationResponse,
  errors: [],
}));

export interface UpdateOrganizationRequest {
  organizationId: string;
  name: string;
  parent?: { id: string };
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  };
}

export const UpdateOrganizationRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String.pipe(T.JsonName("business_address")),
      businessEmail: Schema.String.pipe(T.JsonName("business_email")),
      businessName: Schema.String.pipe(T.JsonName("business_name")),
      businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
      externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
    }),
  ),
}).pipe(
  T.Http({ method: "PUT", path: "/organizations/{organizationId}" }),
) as unknown as Schema.Schema<UpdateOrganizationRequest>;

export interface UpdateOrganizationResponse {
  id: string;
  createTime: string;
  meta: {
    flags?: {
      accountCreation: string;
      accountDeletion: string;
      accountMigration: string;
      accountMobility: string;
      subOrgCreation: string;
    };
    managedBy?: string;
  };
  name: string;
  parent?: { id: string; name: string };
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  };
}

export const UpdateOrganizationResponse = Schema.Struct({
  id: Schema.String,
  createTime: Schema.String.pipe(T.JsonName("create_time")),
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String.pipe(T.JsonName("account_creation")),
        accountDeletion: Schema.String.pipe(T.JsonName("account_deletion")),
        accountMigration: Schema.String.pipe(T.JsonName("account_migration")),
        accountMobility: Schema.String.pipe(T.JsonName("account_mobility")),
        subOrgCreation: Schema.String.pipe(T.JsonName("sub_org_creation")),
      }),
    ),
    managedBy: Schema.optional(Schema.String).pipe(T.JsonName("managed_by")),
  }),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String.pipe(T.JsonName("business_address")),
      businessEmail: Schema.String.pipe(T.JsonName("business_email")),
      businessName: Schema.String.pipe(T.JsonName("business_name")),
      businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
      externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
    }),
  ),
}) as unknown as Schema.Schema<UpdateOrganizationResponse>;

export const updateOrganization: (
  input: UpdateOrganizationRequest,
) => Effect.Effect<
  UpdateOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateOrganizationRequest,
  output: UpdateOrganizationResponse,
  errors: [],
}));

export interface DeleteOrganizationRequest {
  organizationId: string;
}

export const DeleteOrganizationRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "/organizations/{organizationId}" }),
) as unknown as Schema.Schema<DeleteOrganizationRequest>;

export interface DeleteOrganizationResponse {
  id: string;
}

export const DeleteOrganizationResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteOrganizationResponse>;

export const deleteOrganization: (
  input: DeleteOrganizationRequest,
) => Effect.Effect<
  DeleteOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOrganizationRequest,
  output: DeleteOrganizationResponse,
  errors: [],
}));

// =============================================================================
// OrganizationProfile
// =============================================================================

export interface GetOrganizationProfileRequest {
  organizationId: string;
}

export const GetOrganizationProfileRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organizationId}/profile" }),
) as unknown as Schema.Schema<GetOrganizationProfileRequest>;

export interface GetOrganizationProfileResponse {
  businessAddress: string;
  businessEmail: string;
  businessName: string;
  businessPhone: string;
  externalMetadata: string;
}

export const GetOrganizationProfileResponse = Schema.Struct({
  businessAddress: Schema.String.pipe(T.JsonName("business_address")),
  businessEmail: Schema.String.pipe(T.JsonName("business_email")),
  businessName: Schema.String.pipe(T.JsonName("business_name")),
  businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
  externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
}) as unknown as Schema.Schema<GetOrganizationProfileResponse>;

export const getOrganizationProfile: (
  input: GetOrganizationProfileRequest,
) => Effect.Effect<
  GetOrganizationProfileResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationProfileRequest,
  output: GetOrganizationProfileResponse,
  errors: [],
}));

export interface PutOrganizationProfileRequest {
  organizationId: string;
  businessAddress: string;
  businessEmail: string;
  businessName: string;
  businessPhone: string;
  externalMetadata: string;
}

export const PutOrganizationProfileRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
  businessAddress: Schema.String.pipe(T.JsonName("business_address")),
  businessEmail: Schema.String.pipe(T.JsonName("business_email")),
  businessName: Schema.String.pipe(T.JsonName("business_name")),
  businessPhone: Schema.String.pipe(T.JsonName("business_phone")),
  externalMetadata: Schema.String.pipe(T.JsonName("external_metadata")),
}).pipe(
  T.Http({ method: "PUT", path: "/organizations/{organizationId}/profile" }),
) as unknown as Schema.Schema<PutOrganizationProfileRequest>;

export type PutOrganizationProfileResponse = unknown;

export const PutOrganizationProfileResponse =
  Schema.Unknown as unknown as Schema.Schema<PutOrganizationProfileResponse>;

export const putOrganizationProfile: (
  input: PutOrganizationProfileRequest,
) => Effect.Effect<
  PutOrganizationProfileResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutOrganizationProfileRequest,
  output: PutOrganizationProfileResponse,
  errors: [],
}));
