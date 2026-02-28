// ==========================================================================
// Google Workspace Marketplace API (appsmarket v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "appsmarket",
  version: "v2",
  rootUrl: "https://appsmarket.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Editions {
  /** (Deprecated) */
  editionId?: string;
  /** (Deprecated) */
  seatCount?: number;
  /** (Deprecated) */
  assignedSeats?: number;
}

export const Editions: Schema.Schema<Editions> = Schema.suspend(() => Schema.Struct({
  editionId: Schema.optional(Schema.String),
  seatCount: Schema.optional(Schema.Number),
  assignedSeats: Schema.optional(Schema.Number),
})).annotate({ identifier: "Editions" }) as any as Schema.Schema<Editions>;

export interface CustomerLicense {
  /** The type of API resource. This is always `appsmarket#customerLicense`. */
  kind?: string;
  /** The customer's license status. One of: - `ACTIVE`: The customer has a valid license. - `UNLICENSED`: There is no license. Either this customer has never installed your application or has deleted it. */
  state?: string;
  /** The ID of the application corresponding to this license query. */
  applicationId?: string;
  /** (Deprecated) */
  editions?: Array<Editions>;
  /** The ID of the customer license. */
  id?: string;
  /** The domain name of the customer. */
  customerId?: string;
}

export const CustomerLicense: Schema.Schema<CustomerLicense> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  applicationId: Schema.optional(Schema.String),
  editions: Schema.optional(Schema.Array(Editions)),
  id: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerLicense" }) as any as Schema.Schema<CustomerLicense>;

export interface UserLicense {
  /** The type of API resource. This is always `appsmarket#userLicense`. */
  kind?: string;
  /** The domain administrator has activated the application for this domain. */
  enabled?: boolean;
  /** The user's licensing status. One of: - `ACTIVE`: The user has a valid license and should be permitted to use the application. - `UNLICENSED`: The administrator of this user's domain never assigned a seat for the application to this user. - `EXPIRED`: The administrator assigned a seat to this user, but the license is expired. */
  state?: string;
  /** (Deprecated) */
  editionId?: string;
  /** The domain name of the user. */
  customerId?: string;
  /** The ID of the application corresponding to the license query. */
  applicationId?: string;
  /** The ID of the user license. */
  id?: string;
  /** The email address of the user. */
  userId?: string;
}

export const UserLicense: Schema.Schema<UserLicense> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  editionId: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  applicationId: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
})).annotate({ identifier: "UserLicense" }) as any as Schema.Schema<UserLicense>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the customer's licensing status to determine if they have access to a given app. For more information, see [Getting app installation and licensing details](https://developers.google.com/workspace/marketplace/example-calls-marketplace-api). */
export interface GetCustomerLicenseRequest {
  /** The ID of the application. */
  applicationId: string;
  /** The ID of the customer. */
  customerId: string;
}

export const GetCustomerLicenseRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "appsmarket/v2/customerLicense/{applicationId}/{customerId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomerLicenseRequest>;

export type GetCustomerLicenseResponse = CustomerLicense;
export const GetCustomerLicenseResponse = CustomerLicense;

export type GetCustomerLicenseError = CommonErrors;

export const getCustomerLicense: API.OperationMethod<GetCustomerLicenseRequest, GetCustomerLicenseResponse, GetCustomerLicenseError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomerLicenseRequest,
  output: GetCustomerLicenseResponse,
  errors: [],
}));

/** Gets the user's licensing status to determine if they have permission to use a given app. For more information, see [Getting app installation and licensing details](https://developers.google.com/workspace/marketplace/example-calls-marketplace-api). */
export interface GetUserLicenseRequest {
  /** The ID of the application. */
  applicationId: string;
  /** The ID of the user. */
  userId: string;
}

export const GetUserLicenseRequest = Schema.Struct({
  applicationId: Schema.String.pipe(T.HttpPath("applicationId")),
  userId: Schema.String.pipe(T.HttpPath("userId")),
}).pipe(
  T.Http({ method: "GET", path: "appsmarket/v2/userLicense/{applicationId}/{userId}" }),
  svc,
) as unknown as Schema.Schema<GetUserLicenseRequest>;

export type GetUserLicenseResponse = UserLicense;
export const GetUserLicenseResponse = UserLicense;

export type GetUserLicenseError = CommonErrors;

export const getUserLicense: API.OperationMethod<GetUserLicenseRequest, GetUserLicenseResponse, GetUserLicenseError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetUserLicenseRequest,
  output: GetUserLicenseResponse,
  errors: [],
}));

