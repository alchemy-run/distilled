// ==========================================================================
// Google Play Custom App Publishing API (playcustomapp v1)
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
  name: "playcustomapp",
  version: "v1",
  rootUrl: "https://playcustomapp.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Organization {
  /** Required. ID of the organization. */
  organizationId?: string;
  /** Optional. A human-readable name of the organization, to help recognize the organization. */
  organizationName?: string;
}

export const Organization: Schema.Schema<Organization> = Schema.suspend(() => Schema.Struct({
  organizationId: Schema.optional(Schema.String),
  organizationName: Schema.optional(Schema.String),
})).annotate({ identifier: "Organization" }) as any as Schema.Schema<Organization>;

export interface CustomApp {
  /** Title for the Android app. */
  title?: string;
  /** Default listing language in BCP 47 format. */
  languageCode?: string;
  /** Output only. Package name of the created Android app. Only present in the API response. */
  packageName?: string;
  /** Organizations to which the custom app should be made available. If the request contains any organizations, then the app will be restricted to only these organizations. To support the organization linked to the developer account, the organization ID should be provided explicitly together with other organizations. If no organizations are provided, then the app is only available to the organization linked to the developer account. */
  organizations?: Array<Organization>;
}

export const CustomApp: Schema.Schema<CustomApp> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  packageName: Schema.optional(Schema.String),
  organizations: Schema.optional(Schema.Array(Organization)),
})).annotate({ identifier: "CustomApp" }) as any as Schema.Schema<CustomApp>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates a new custom app. */
export interface CreateAccountsCustomAppsRequest {
  /** Developer account ID. */
  account: string;
  /** Request body */
  body?: CustomApp;
}

export const CreateAccountsCustomAppsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(CustomApp).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "playcustomapp/v1/accounts/{account}/customApps", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCustomAppsRequest>;

export type CreateAccountsCustomAppsResponse = CustomApp;
export const CreateAccountsCustomAppsResponse = CustomApp;

export type CreateAccountsCustomAppsError = CommonErrors;

export const createAccountsCustomApps: API.OperationMethod<CreateAccountsCustomAppsRequest, CreateAccountsCustomAppsResponse, CreateAccountsCustomAppsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCustomAppsRequest,
  output: CreateAccountsCustomAppsResponse,
  errors: [],
}));

