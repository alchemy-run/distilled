/**
 * Cloudflare ORGANIZATIONS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service organizations
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
  createTime: Schema.String,
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String,
        accountDeletion: Schema.String,
        accountMigration: Schema.String,
        accountMobility: Schema.String,
        subOrgCreation: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          accountCreation: "account_creation",
          accountDeletion: "account_deletion",
          accountMigration: "account_migration",
          accountMobility: "account_mobility",
          subOrgCreation: "sub_org_creation",
        }),
      ),
    ),
    managedBy: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String,
      businessEmail: Schema.String,
      businessName: Schema.String,
      businessPhone: Schema.String,
      externalMetadata: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        businessAddress: "business_address",
        businessEmail: "business_email",
        businessName: "business_name",
        businessPhone: "business_phone",
        externalMetadata: "external_metadata",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createTime: "create_time",
    meta: "meta",
    name: "name",
    parent: "parent",
    profile: "profile",
  }),
) as unknown as Schema.Schema<GetOrganizationResponse>;

export type GetOrganizationError = CommonErrors;

export const getOrganization: API.OperationMethod<
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetOrganizationError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationRequest,
  output: GetOrganizationResponse,
  errors: [],
}));

export interface ListOrganizationsRequest {}

export const ListOrganizationsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/organizations" }),
) as unknown as Schema.Schema<ListOrganizationsRequest>;

export type ListOrganizationsResponse = {
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
}[];

export const ListOrganizationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    createTime: Schema.String,
    meta: Schema.Struct({
      flags: Schema.optional(
        Schema.Struct({
          accountCreation: Schema.String,
          accountDeletion: Schema.String,
          accountMigration: Schema.String,
          accountMobility: Schema.String,
          subOrgCreation: Schema.String,
        }).pipe(
          Schema.encodeKeys({
            accountCreation: "account_creation",
            accountDeletion: "account_deletion",
            accountMigration: "account_migration",
            accountMobility: "account_mobility",
            subOrgCreation: "sub_org_creation",
          }),
        ),
      ),
      managedBy: Schema.optional(Schema.String),
    }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
    name: Schema.String,
    parent: Schema.optional(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
      }),
    ),
    profile: Schema.optional(
      Schema.Struct({
        businessAddress: Schema.String,
        businessEmail: Schema.String,
        businessName: Schema.String,
        businessPhone: Schema.String,
        externalMetadata: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          businessAddress: "business_address",
          businessEmail: "business_email",
          businessName: "business_name",
          businessPhone: "business_phone",
          externalMetadata: "external_metadata",
        }),
      ),
    ),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      createTime: "create_time",
      meta: "meta",
      name: "name",
      parent: "parent",
      profile: "profile",
    }),
  ),
) as unknown as Schema.Schema<ListOrganizationsResponse>;

export type ListOrganizationsError = CommonErrors;

export const listOrganizations: API.OperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  ListOrganizationsError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse,
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
      businessAddress: Schema.String,
      businessEmail: Schema.String,
      businessName: Schema.String,
      businessPhone: Schema.String,
      externalMetadata: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        businessAddress: "business_address",
        businessEmail: "business_email",
        businessName: "business_name",
        businessPhone: "business_phone",
        externalMetadata: "external_metadata",
      }),
    ),
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
  createTime: Schema.String,
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String,
        accountDeletion: Schema.String,
        accountMigration: Schema.String,
        accountMobility: Schema.String,
        subOrgCreation: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          accountCreation: "account_creation",
          accountDeletion: "account_deletion",
          accountMigration: "account_migration",
          accountMobility: "account_mobility",
          subOrgCreation: "sub_org_creation",
        }),
      ),
    ),
    managedBy: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String,
      businessEmail: Schema.String,
      businessName: Schema.String,
      businessPhone: Schema.String,
      externalMetadata: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        businessAddress: "business_address",
        businessEmail: "business_email",
        businessName: "business_name",
        businessPhone: "business_phone",
        externalMetadata: "external_metadata",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createTime: "create_time",
    meta: "meta",
    name: "name",
    parent: "parent",
    profile: "profile",
  }),
) as unknown as Schema.Schema<CreateOrganizationResponse>;

export type CreateOrganizationError = CommonErrors;

export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
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
      businessAddress: Schema.String,
      businessEmail: Schema.String,
      businessName: Schema.String,
      businessPhone: Schema.String,
      externalMetadata: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        businessAddress: "business_address",
        businessEmail: "business_email",
        businessName: "business_name",
        businessPhone: "business_phone",
        externalMetadata: "external_metadata",
      }),
    ),
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
  createTime: Schema.String,
  meta: Schema.Struct({
    flags: Schema.optional(
      Schema.Struct({
        accountCreation: Schema.String,
        accountDeletion: Schema.String,
        accountMigration: Schema.String,
        accountMobility: Schema.String,
        subOrgCreation: Schema.String,
      }).pipe(
        Schema.encodeKeys({
          accountCreation: "account_creation",
          accountDeletion: "account_deletion",
          accountMigration: "account_migration",
          accountMobility: "account_mobility",
          subOrgCreation: "sub_org_creation",
        }),
      ),
    ),
    managedBy: Schema.optional(Schema.String),
  }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
  name: Schema.String,
  parent: Schema.optional(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
    }),
  ),
  profile: Schema.optional(
    Schema.Struct({
      businessAddress: Schema.String,
      businessEmail: Schema.String,
      businessName: Schema.String,
      businessPhone: Schema.String,
      externalMetadata: Schema.String,
    }).pipe(
      Schema.encodeKeys({
        businessAddress: "business_address",
        businessEmail: "business_email",
        businessName: "business_name",
        businessPhone: "business_phone",
        externalMetadata: "external_metadata",
      }),
    ),
  ),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    createTime: "create_time",
    meta: "meta",
    name: "name",
    parent: "parent",
    profile: "profile",
  }),
) as unknown as Schema.Schema<UpdateOrganizationResponse>;

export type UpdateOrganizationError = CommonErrors;

export const updateOrganization: API.OperationMethod<
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
  UpdateOrganizationError,
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

export type DeleteOrganizationError = CommonErrors;

export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
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
  businessAddress: Schema.String,
  businessEmail: Schema.String,
  businessName: Schema.String,
  businessPhone: Schema.String,
  externalMetadata: Schema.String,
}).pipe(
  Schema.encodeKeys({
    businessAddress: "business_address",
    businessEmail: "business_email",
    businessName: "business_name",
    businessPhone: "business_phone",
    externalMetadata: "external_metadata",
  }),
) as unknown as Schema.Schema<GetOrganizationProfileResponse>;

export type GetOrganizationProfileError = CommonErrors;

export const getOrganizationProfile: API.OperationMethod<
  GetOrganizationProfileRequest,
  GetOrganizationProfileResponse,
  GetOrganizationProfileError,
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
  businessAddress: Schema.String,
  businessEmail: Schema.String,
  businessName: Schema.String,
  businessPhone: Schema.String,
  externalMetadata: Schema.String,
}).pipe(
  Schema.encodeKeys({
    businessAddress: "business_address",
    businessEmail: "business_email",
    businessName: "business_name",
    businessPhone: "business_phone",
    externalMetadata: "external_metadata",
  }),
  T.Http({ method: "PUT", path: "/organizations/{organizationId}/profile" }),
) as unknown as Schema.Schema<PutOrganizationProfileRequest>;

export type PutOrganizationProfileResponse = unknown;

export const PutOrganizationProfileResponse =
  Schema.Unknown as unknown as Schema.Schema<PutOrganizationProfileResponse>;

export type PutOrganizationProfileError = CommonErrors;

export const putOrganizationProfile: API.OperationMethod<
  PutOrganizationProfileRequest,
  PutOrganizationProfileResponse,
  PutOrganizationProfileError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PutOrganizationProfileRequest,
  output: PutOrganizationProfileResponse,
  errors: [],
}));
