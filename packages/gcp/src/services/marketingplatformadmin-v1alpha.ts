// ==========================================================================
// Google Marketing Platform Admin API (marketingplatformadmin v1alpha)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "marketingplatformadmin",
  version: "v1alpha",
  rootUrl: "https://marketingplatformadmin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface SetPropertyServiceLevelResponse {}

export const SetPropertyServiceLevelResponse: Schema.Schema<SetPropertyServiceLevelResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "SetPropertyServiceLevelResponse",
  }) as any as Schema.Schema<SetPropertyServiceLevelResponse>;

export interface Organization {
  /** Identifier. The resource name of the GMP organization. Format: organizations/{org_id} */
  name?: string;
  /** The human-readable name for the organization. */
  displayName?: string;
}

export const Organization: Schema.Schema<Organization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "Organization",
  }) as any as Schema.Schema<Organization>;

export interface Marketingplatformadmin_Date {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const Marketingplatformadmin_Date: Schema.Schema<Marketingplatformadmin_Date> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      year: Schema.optional(Schema.Number),
      month: Schema.optional(Schema.Number),
      day: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Marketingplatformadmin_Date",
  }) as any as Schema.Schema<Marketingplatformadmin_Date>;

export interface ClientData {
  /** The end client that has/had contract with the requested sales org. */
  organization?: Organization;
  /** The start date of the contract between the sales org and the end client. */
  startDate?: Marketingplatformadmin_Date;
  /** The end date of the contract between the sales org and the end client. */
  endDate?: Marketingplatformadmin_Date;
}

export const ClientData: Schema.Schema<ClientData> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      organization: Schema.optional(Organization),
      startDate: Schema.optional(Marketingplatformadmin_Date),
      endDate: Schema.optional(Marketingplatformadmin_Date),
    }),
  ).annotate({ identifier: "ClientData" }) as any as Schema.Schema<ClientData>;

export interface PropertyUsage {
  /** The number of events for which the property is billed in the requested month. */
  billableEventCount?: string;
  /** The name of the Google Analytics Admin API property resource. Format: analyticsadmin.googleapis.com/properties/{property_id} */
  property?: string;
  /** The ID of the property's parent account. */
  accountId?: string;
  /** The subtype of the analytics property. This affects the billable event count. */
  propertyType?:
    | "ANALYTICS_PROPERTY_TYPE_UNSPECIFIED"
    | "ANALYTICS_PROPERTY_TYPE_ORDINARY"
    | "ANALYTICS_PROPERTY_TYPE_SUBPROPERTY"
    | "ANALYTICS_PROPERTY_TYPE_ROLLUP"
    | (string & {});
  /** Total event count that the property received during the requested month. */
  totalEventCount?: string;
  /** The display name of the property. */
  displayName?: string;
  /** The service level of the property. */
  serviceLevel?:
    | "ANALYTICS_SERVICE_LEVEL_UNSPECIFIED"
    | "ANALYTICS_SERVICE_LEVEL_STANDARD"
    | "ANALYTICS_SERVICE_LEVEL_360"
    | (string & {});
}

export const PropertyUsage: Schema.Schema<PropertyUsage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      billableEventCount: Schema.optional(Schema.String),
      property: Schema.optional(Schema.String),
      accountId: Schema.optional(Schema.String),
      propertyType: Schema.optional(Schema.String),
      totalEventCount: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      serviceLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PropertyUsage",
  }) as any as Schema.Schema<PropertyUsage>;

export interface SetPropertyServiceLevelRequest {
  /** Required. The Analytics property to change the ServiceLevel setting. This field is the name of the Google Analytics Admin API property resource. Format: analyticsadmin.googleapis.com/properties/{property_id} */
  analyticsProperty?: string;
  /** Required. The service level to set for this property. */
  serviceLevel?:
    | "ANALYTICS_SERVICE_LEVEL_UNSPECIFIED"
    | "ANALYTICS_SERVICE_LEVEL_STANDARD"
    | "ANALYTICS_SERVICE_LEVEL_360"
    | (string & {});
}

export const SetPropertyServiceLevelRequest: Schema.Schema<SetPropertyServiceLevelRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      analyticsProperty: Schema.optional(Schema.String),
      serviceLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SetPropertyServiceLevelRequest",
  }) as any as Schema.Schema<SetPropertyServiceLevelRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface AnalyticsAccountLink {
  /** Identifier. Resource name of this AnalyticsAccountLink. Note the resource ID is the same as the ID of the Analtyics account. Format: organizations/{org_id}/analyticsAccountLinks/{analytics_account_link_id} Example: "organizations/xyz/analyticsAccountLinks/1234" */
  name?: string;
  /** Output only. The human-readable name for the Analytics account. */
  displayName?: string;
  /** Output only. The verification state of the link between the Analytics account and the parent organization. */
  linkVerificationState?:
    | "LINK_VERIFICATION_STATE_UNSPECIFIED"
    | "LINK_VERIFICATION_STATE_VERIFIED"
    | "LINK_VERIFICATION_STATE_NOT_VERIFIED"
    | (string & {});
  /** Required. Immutable. The resource name of the AnalyticsAdmin API account. The account ID will be used as the ID of this AnalyticsAccountLink resource, which will become the final component of the resource name. Format: analyticsadmin.googleapis.com/accounts/{account_id} */
  analyticsAccount?: string;
}

export const AnalyticsAccountLink: Schema.Schema<AnalyticsAccountLink> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      linkVerificationState: Schema.optional(Schema.String),
      analyticsAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AnalyticsAccountLink",
  }) as any as Schema.Schema<AnalyticsAccountLink>;

export interface ListAnalyticsAccountLinksResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Analytics account links in this organization. */
  analyticsAccountLinks?: Array<AnalyticsAccountLink>;
}

export const ListAnalyticsAccountLinksResponse: Schema.Schema<ListAnalyticsAccountLinksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      analyticsAccountLinks: Schema.optional(
        Schema.Array(AnalyticsAccountLink),
      ),
    }),
  ).annotate({
    identifier: "ListAnalyticsAccountLinksResponse",
  }) as any as Schema.Schema<ListAnalyticsAccountLinksResponse>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currencyCode: Schema.optional(Schema.String),
      units: Schema.optional(Schema.String),
      nanos: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface BillInfo {
  /** The amount of the monthly base fee. */
  baseFee?: Money;
  /** The amount of the event fee. */
  eventFee?: Money;
  /** The total amount of the bill. */
  total?: Money;
  /** The amount of the price protection credit, this is only available for eligible customers. */
  priceProtectionCredit?: Money;
}

export const BillInfo: Schema.Schema<BillInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      baseFee: Schema.optional(Money),
      eventFee: Schema.optional(Money),
      total: Schema.optional(Money),
      priceProtectionCredit: Schema.optional(Money),
    }),
  ).annotate({ identifier: "BillInfo" }) as any as Schema.Schema<BillInfo>;

export interface ReportPropertyUsageResponse {
  /** Usage data for all properties in the specified organization and month. */
  propertyUsages?: Array<PropertyUsage>;
  /** Bill amount in the specified organization and month. Will be empty if user only has access to usage data. */
  billInfo?: BillInfo;
}

export const ReportPropertyUsageResponse: Schema.Schema<ReportPropertyUsageResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      propertyUsages: Schema.optional(Schema.Array(PropertyUsage)),
      billInfo: Schema.optional(BillInfo),
    }),
  ).annotate({
    identifier: "ReportPropertyUsageResponse",
  }) as any as Schema.Schema<ReportPropertyUsageResponse>;

export interface FindSalesPartnerManagedClientsRequest {
  /** Optional. If set, only active and just ended clients will be returned. */
  isActive?: boolean;
}

export const FindSalesPartnerManagedClientsRequest: Schema.Schema<FindSalesPartnerManagedClientsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      isActive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "FindSalesPartnerManagedClientsRequest",
  }) as any as Schema.Schema<FindSalesPartnerManagedClientsRequest>;

export interface ListOrganizationsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The Organization resource that the user has access to, which includes the org id and display name. */
  organizations?: Array<Organization>;
}

export const ListOrganizationsResponse: Schema.Schema<ListOrganizationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      organizations: Schema.optional(Schema.Array(Organization)),
    }),
  ).annotate({
    identifier: "ListOrganizationsResponse",
  }) as any as Schema.Schema<ListOrganizationsResponse>;

export interface FindSalesPartnerManagedClientsResponse {
  /** The clients managed by the sales org. */
  clientData?: Array<ClientData>;
}

export const FindSalesPartnerManagedClientsResponse: Schema.Schema<FindSalesPartnerManagedClientsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientData: Schema.optional(Schema.Array(ClientData)),
    }),
  ).annotate({
    identifier: "FindSalesPartnerManagedClientsResponse",
  }) as any as Schema.Schema<FindSalesPartnerManagedClientsResponse>;

export interface ReportPropertyUsageRequest {
  /** Required. The target month to list property usages. Format: YYYY-MM. For example, "2025-05" */
  month?: string;
}

export const ReportPropertyUsageRequest: Schema.Schema<ReportPropertyUsageRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      month: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ReportPropertyUsageRequest",
  }) as any as Schema.Schema<ReportPropertyUsageRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetOrganizationsRequest {
  /** Required. The name of the Organization to retrieve. Format: organizations/{org_id} */
  name: string;
}

export const GetOrganizationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/organizations/{organizationsId}" }),
    svc,
  ) as unknown as Schema.Schema<GetOrganizationsRequest>;

export type GetOrganizationsResponse = Organization;
export const GetOrganizationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Organization;

export type GetOrganizationsError = DefaultErrors;

/** Looks up a single organization. */
export const getOrganizations: API.OperationMethod<
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetOrganizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrganizationsRequest,
  output: GetOrganizationsResponse,
  errors: [],
}));

export interface FindSalesPartnerManagedClientsOrganizationsRequest {
  /** Required. The name of the sales partner organization. Format: organizations/{org_id} */
  organization: string;
  /** Request body */
  body?: FindSalesPartnerManagedClientsRequest;
}

export const FindSalesPartnerManagedClientsOrganizationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.HttpPath("organization")),
    body: Schema.optional(FindSalesPartnerManagedClientsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/organizations/{organizationsId}:findSalesPartnerManagedClients",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<FindSalesPartnerManagedClientsOrganizationsRequest>;

export type FindSalesPartnerManagedClientsOrganizationsResponse =
  FindSalesPartnerManagedClientsResponse;
export const FindSalesPartnerManagedClientsOrganizationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ FindSalesPartnerManagedClientsResponse;

export type FindSalesPartnerManagedClientsOrganizationsError = DefaultErrors;

/** Returns a list of clients managed by the sales partner organization. User needs to be an OrgAdmin/BillingAdmin on the sales partner organization in order to view the end clients. */
export const findSalesPartnerManagedClientsOrganizations: API.OperationMethod<
  FindSalesPartnerManagedClientsOrganizationsRequest,
  FindSalesPartnerManagedClientsOrganizationsResponse,
  FindSalesPartnerManagedClientsOrganizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FindSalesPartnerManagedClientsOrganizationsRequest,
  output: FindSalesPartnerManagedClientsOrganizationsResponse,
  errors: [],
}));

export interface ReportPropertyUsageOrganizationsRequest {
  /** Required. Specifies the organization whose property usage will be listed. Format: organizations/{org_id} */
  organization: string;
  /** Request body */
  body?: ReportPropertyUsageRequest;
}

export const ReportPropertyUsageOrganizationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.HttpPath("organization")),
    body: Schema.optional(ReportPropertyUsageRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/organizations/{organizationsId}:reportPropertyUsage",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ReportPropertyUsageOrganizationsRequest>;

export type ReportPropertyUsageOrganizationsResponse =
  ReportPropertyUsageResponse;
export const ReportPropertyUsageOrganizationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ReportPropertyUsageResponse;

export type ReportPropertyUsageOrganizationsError = DefaultErrors;

/** Gets the usage and billing data for properties within the organization for the specified month. Per direct client org, user needs to be OrgAdmin/BillingAdmin on the organization in order to view the billing and usage data. Per sales partner client org, user needs to be OrgAdmin/BillingAdmin on the sales partner org in order to view the billing and usage data, or OrgAdmin/BillingAdmin on the sales partner client org in order to view the usage data only. */
export const reportPropertyUsageOrganizations: API.OperationMethod<
  ReportPropertyUsageOrganizationsRequest,
  ReportPropertyUsageOrganizationsResponse,
  ReportPropertyUsageOrganizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ReportPropertyUsageOrganizationsRequest,
  output: ReportPropertyUsageOrganizationsResponse,
  errors: [],
}));

export interface ListOrganizationsRequest {
  /** Optional. The maximum number of organizations to return in one call. The service may return fewer than this value. If unspecified, at most 50 organizations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous ListOrganizations call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListOrganizations` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/organizations" }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsRequest>;

export type ListOrganizationsResponse_Op = ListOrganizationsResponse;
export const ListOrganizationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListOrganizationsResponse;

export type ListOrganizationsError = DefaultErrors;

/** Returns a list of organizations that the user has access to. */
export const listOrganizations: API.PaginatedOperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse_Op,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteOrganizationsAnalyticsAccountLinksRequest {
  /** Required. The name of the Analytics account link to delete. Format: organizations/{org_id}/analyticsAccountLinks/{analytics_account_link_id} */
  name: string;
}

export const DeleteOrganizationsAnalyticsAccountLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/organizations/{organizationsId}/analyticsAccountLinks/{analyticsAccountLinksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteOrganizationsAnalyticsAccountLinksRequest>;

export type DeleteOrganizationsAnalyticsAccountLinksResponse = Empty;
export const DeleteOrganizationsAnalyticsAccountLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteOrganizationsAnalyticsAccountLinksError = DefaultErrors;

/** Deletes the AnalyticsAccountLink, which detaches the Analytics account from the Google Marketing Platform organization. User needs to be an org user, and admin on the Analytics account in order to delete the link. */
export const deleteOrganizationsAnalyticsAccountLinks: API.OperationMethod<
  DeleteOrganizationsAnalyticsAccountLinksRequest,
  DeleteOrganizationsAnalyticsAccountLinksResponse,
  DeleteOrganizationsAnalyticsAccountLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOrganizationsAnalyticsAccountLinksRequest,
  output: DeleteOrganizationsAnalyticsAccountLinksResponse,
  errors: [],
}));

export interface ListOrganizationsAnalyticsAccountLinksRequest {
  /** Required. The parent organization, which owns this collection of Analytics account links. Format: organizations/{org_id} */
  parent: string;
  /** Optional. The maximum number of Analytics account links to return in one call. The service may return fewer than this value. If unspecified, at most 50 Analytics account links will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous ListAnalyticsAccountLinks call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAnalyticsAccountLinks` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListOrganizationsAnalyticsAccountLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/organizations/{organizationsId}/analyticsAccountLinks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListOrganizationsAnalyticsAccountLinksRequest>;

export type ListOrganizationsAnalyticsAccountLinksResponse =
  ListAnalyticsAccountLinksResponse;
export const ListOrganizationsAnalyticsAccountLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAnalyticsAccountLinksResponse;

export type ListOrganizationsAnalyticsAccountLinksError = DefaultErrors;

/** Lists the Google Analytics accounts link to the specified Google Marketing Platform organization. */
export const listOrganizationsAnalyticsAccountLinks: API.PaginatedOperationMethod<
  ListOrganizationsAnalyticsAccountLinksRequest,
  ListOrganizationsAnalyticsAccountLinksResponse,
  ListOrganizationsAnalyticsAccountLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationsAnalyticsAccountLinksRequest,
  output: ListOrganizationsAnalyticsAccountLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateOrganizationsAnalyticsAccountLinksRequest {
  /** Required. The parent resource where this Analytics account link will be created. Format: organizations/{org_id} */
  parent: string;
  /** Request body */
  body?: AnalyticsAccountLink;
}

export const CreateOrganizationsAnalyticsAccountLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(AnalyticsAccountLink).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/organizations/{organizationsId}/analyticsAccountLinks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateOrganizationsAnalyticsAccountLinksRequest>;

export type CreateOrganizationsAnalyticsAccountLinksResponse =
  AnalyticsAccountLink;
export const CreateOrganizationsAnalyticsAccountLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ AnalyticsAccountLink;

export type CreateOrganizationsAnalyticsAccountLinksError = DefaultErrors;

/** Creates the link between the Analytics account and the Google Marketing Platform organization. User needs to be an org user, and admin on the Analytics account to create the link. If the account is already linked to an organization, user needs to unlink the account from the current organization, then try link again. */
export const createOrganizationsAnalyticsAccountLinks: API.OperationMethod<
  CreateOrganizationsAnalyticsAccountLinksRequest,
  CreateOrganizationsAnalyticsAccountLinksResponse,
  CreateOrganizationsAnalyticsAccountLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOrganizationsAnalyticsAccountLinksRequest,
  output: CreateOrganizationsAnalyticsAccountLinksResponse,
  errors: [],
}));

export interface SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksRequest {
  /** Required. The parent AnalyticsAccountLink scope where this property is in. Format: organizations/{org_id}/analyticsAccountLinks/{analytics_account_link_id} */
  analyticsAccountLink: string;
  /** Request body */
  body?: SetPropertyServiceLevelRequest;
}

export const SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    analyticsAccountLink: Schema.String.pipe(
      T.HttpPath("analyticsAccountLink"),
    ),
    body: Schema.optional(SetPropertyServiceLevelRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/organizations/{organizationsId}/analyticsAccountLinks/{analyticsAccountLinksId}:setPropertyServiceLevel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksRequest>;

export type SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksResponse =
  SetPropertyServiceLevelResponse;
export const SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksResponse =
  /*@__PURE__*/ /*#__PURE__*/ SetPropertyServiceLevelResponse;

export type SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksError =
  DefaultErrors;

/** Updates the service level for an Analytics property. */
export const setPropertyServiceLevelOrganizationsAnalyticsAccountLinks: API.OperationMethod<
  SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksRequest,
  SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksResponse,
  SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksRequest,
  output: SetPropertyServiceLevelOrganizationsAnalyticsAccountLinksResponse,
  errors: [],
}));
