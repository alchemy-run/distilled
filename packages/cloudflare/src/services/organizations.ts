/**
 * Cloudflare ORGANIZATIONS API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service organizations
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// Organization
// =============================================================================

export interface GetOrganizationRequest {
  organizationId: string;
}

export const GetOrganizationRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
  },
).pipe(
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
    } | null;
    managedBy?: string | null;
  };
  name: string;
  parent?: { id: string; name: string } | null;
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  } | null;
}

export const GetOrganizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createTime: Schema.String,
    meta: Schema.Struct({
      flags: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      managedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
    name: Schema.String,
    parent: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
        }),
        Schema.Null,
      ]),
    ),
    profile: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
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

export type GetOrganizationError = DefaultErrors;

export const getOrganization: API.OperationMethod<
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationRequest,
  output: GetOrganizationResponse,
  errors: [],
}));

export interface ListOrganizationsRequest {}

export const ListOrganizationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
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
    } | null;
    managedBy?: string | null;
  };
  name: string;
  parent?: { id: string; name: string } | null;
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  } | null;
}[];

export const ListOrganizationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.String,
      createTime: Schema.String,
      meta: Schema.Struct({
        flags: Schema.optional(
          Schema.Union([
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
            Schema.Null,
          ]),
        ),
        managedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
      }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
      name: Schema.String,
      parent: Schema.optional(
        Schema.Union([
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
          Schema.Null,
        ]),
      ),
      profile: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
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

export type ListOrganizationsError = DefaultErrors;

export const listOrganizations: API.OperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const CreateOrganizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    } | null;
    managedBy?: string | null;
  };
  name: string;
  parent?: { id: string; name: string } | null;
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  } | null;
}

export const CreateOrganizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createTime: Schema.String,
    meta: Schema.Struct({
      flags: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      managedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
    name: Schema.String,
    parent: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
        }),
        Schema.Null,
      ]),
    ),
    profile: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
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

export type CreateOrganizationError = DefaultErrors;

export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const UpdateOrganizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    } | null;
    managedBy?: string | null;
  };
  name: string;
  parent?: { id: string; name: string } | null;
  profile?: {
    businessAddress: string;
    businessEmail: string;
    businessName: string;
    businessPhone: string;
    externalMetadata: string;
  } | null;
}

export const UpdateOrganizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    createTime: Schema.String,
    meta: Schema.Struct({
      flags: Schema.optional(
        Schema.Union([
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
          Schema.Null,
        ]),
      ),
      managedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }).pipe(Schema.encodeKeys({ flags: "flags", managedBy: "managed_by" })),
    name: Schema.String,
    parent: Schema.optional(
      Schema.Union([
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
        }),
        Schema.Null,
      ]),
    ),
    profile: Schema.optional(
      Schema.Union([
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
        Schema.Null,
      ]),
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

export type UpdateOrganizationError = DefaultErrors;

export const updateOrganization: API.OperationMethod<
  UpdateOrganizationRequest,
  UpdateOrganizationResponse,
  UpdateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOrganizationRequest,
  output: UpdateOrganizationResponse,
  errors: [],
}));

export interface DeleteOrganizationRequest {
  organizationId: string;
}

export const DeleteOrganizationRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
  }).pipe(
    T.Http({ method: "DELETE", path: "/organizations/{organizationId}" }),
  ) as unknown as Schema.Schema<DeleteOrganizationRequest>;

export interface DeleteOrganizationResponse {
  id: string;
}

export const DeleteOrganizationResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
  }) as unknown as Schema.Schema<DeleteOrganizationResponse>;

export type DeleteOrganizationError = DefaultErrors;

export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const GetOrganizationProfileRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export const GetOrganizationProfileResponse =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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

export type GetOrganizationProfileError = DefaultErrors;

export const getOrganizationProfile: API.OperationMethod<
  GetOrganizationProfileRequest,
  GetOrganizationProfileResponse,
  GetOrganizationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PutOrganizationProfileRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown as unknown as Schema.Schema<PutOrganizationProfileResponse>;

export type PutOrganizationProfileError = DefaultErrors;

export const putOrganizationProfile: API.OperationMethod<
  PutOrganizationProfileRequest,
  PutOrganizationProfileResponse,
  PutOrganizationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutOrganizationProfileRequest,
  output: PutOrganizationProfileResponse,
  errors: [],
}));
