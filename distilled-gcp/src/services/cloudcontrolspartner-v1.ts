// ==========================================================================
// Cloud Controls Partner API (cloudcontrolspartner v1)
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
  name: "cloudcontrolspartner",
  version: "v1",
  rootUrl: "https://cloudcontrolspartner.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface WorkloadOnboardingStep {
  /** The onboarding step. */
  step?: "STEP_UNSPECIFIED" | "EKM_PROVISIONED" | "SIGNED_ACCESS_APPROVAL_CONFIGURED" | (string & {});
  /** The starting time of the onboarding step. */
  startTime?: string;
  /** The completion time of the onboarding step. */
  completionTime?: string;
  /** Output only. The completion state of the onboarding step. */
  completionState?: "COMPLETION_STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | "NOT_APPLICABLE" | (string & {});
}

export const WorkloadOnboardingStep: Schema.Schema<WorkloadOnboardingStep> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  completionTime: Schema.optional(Schema.String),
  completionState: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadOnboardingStep" }) as any as Schema.Schema<WorkloadOnboardingStep>;

export interface WorkloadOnboardingState {
  /** List of workload onboarding steps. */
  onboardingSteps?: Array<WorkloadOnboardingStep>;
}

export const WorkloadOnboardingState: Schema.Schema<WorkloadOnboardingState> = Schema.suspend(() => Schema.Struct({
  onboardingSteps: Schema.optional(Schema.Array(WorkloadOnboardingStep)),
})).annotate({ identifier: "WorkloadOnboardingState" }) as any as Schema.Schema<WorkloadOnboardingState>;

export interface Workload {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
  name?: string;
  /** Output only. Folder id this workload is associated with */
  folderId?: string;
  /** Output only. Time the resource was created. */
  createTime?: string;
  /** Output only. The name of container folder of the assured workload */
  folder?: string;
  /** Container for workload onboarding steps. */
  workloadOnboardingState?: WorkloadOnboardingState;
  /** Indicates whether a workload is fully onboarded. */
  isOnboarded?: boolean;
  /** The project id of the key management project for the workload */
  keyManagementProjectId?: string;
  /** The Google Cloud location of the workload */
  location?: string;
  /** Partner associated with this workload. */
  partner?: "PARTNER_UNSPECIFIED" | "PARTNER_LOCAL_CONTROLS_BY_S3NS" | "PARTNER_SOVEREIGN_CONTROLS_BY_T_SYSTEMS" | "PARTNER_SOVEREIGN_CONTROLS_BY_SIA_MINSAIT" | "PARTNER_SOVEREIGN_CONTROLS_BY_PSN" | "PARTNER_SOVEREIGN_CONTROLS_BY_CNTXT" | "PARTNER_SOVEREIGN_CONTROLS_BY_CNTXT_NO_EKM" | "PARTNER_SPAIN_DATA_BOUNDARY_BY_TELEFONICA" | (string & {});
}

export const Workload: Schema.Schema<Workload> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  folderId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  folder: Schema.optional(Schema.String),
  workloadOnboardingState: Schema.optional(WorkloadOnboardingState),
  isOnboarded: Schema.optional(Schema.Boolean),
  keyManagementProjectId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  partner: Schema.optional(Schema.String),
})).annotate({ identifier: "Workload" }) as any as Schema.Schema<Workload>;

export interface ListWorkloadsResponse {
  /** List of customer workloads */
  workloads?: Array<Workload>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListWorkloadsResponse: Schema.Schema<ListWorkloadsResponse> = Schema.suspend(() => Schema.Struct({
  workloads: Schema.optional(Schema.Array(Workload)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkloadsResponse" }) as any as Schema.Schema<ListWorkloadsResponse>;

export interface CustomerOnboardingStep {
  /** The onboarding step */
  step?: "STEP_UNSPECIFIED" | "KAJ_ENROLLMENT" | "CUSTOMER_ENVIRONMENT" | (string & {});
  /** The starting time of the onboarding step */
  startTime?: string;
  /** The completion time of the onboarding step */
  completionTime?: string;
  /** Output only. Current state of the step */
  completionState?: "COMPLETION_STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | "NOT_APPLICABLE" | (string & {});
}

export const CustomerOnboardingStep: Schema.Schema<CustomerOnboardingStep> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  completionTime: Schema.optional(Schema.String),
  completionState: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomerOnboardingStep" }) as any as Schema.Schema<CustomerOnboardingStep>;

export interface CustomerOnboardingState {
  /** List of customer onboarding steps */
  onboardingSteps?: Array<CustomerOnboardingStep>;
}

export const CustomerOnboardingState: Schema.Schema<CustomerOnboardingState> = Schema.suspend(() => Schema.Struct({
  onboardingSteps: Schema.optional(Schema.Array(CustomerOnboardingStep)),
})).annotate({ identifier: "CustomerOnboardingState" }) as any as Schema.Schema<CustomerOnboardingState>;

export interface Customer {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
  name?: string;
  /** Required. Display name for the customer */
  displayName?: string;
  /** Output only. Container for customer onboarding steps */
  customerOnboardingState?: CustomerOnboardingState;
  /** Output only. Indicates whether a customer is fully onboarded */
  isOnboarded?: boolean;
  /** Output only. The customer organization domain, extracted from CRM Organization’s display_name field. e.g. "google.com" */
  organizationDomain?: string;
}

export const Customer: Schema.Schema<Customer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  customerOnboardingState: Schema.optional(CustomerOnboardingState),
  isOnboarded: Schema.optional(Schema.Boolean),
  organizationDomain: Schema.optional(Schema.String),
})).annotate({ identifier: "Customer" }) as any as Schema.Schema<Customer>;

export interface ListCustomersResponse {
  /** List of customers */
  customers?: Array<Customer>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListCustomersResponse: Schema.Schema<ListCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(Customer)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListCustomersResponse" }) as any as Schema.Schema<ListCustomersResponse>;

export interface ConnectionError {
  /** The error domain for the error */
  errorDomain?: string;
  /** The error message for the error */
  errorMessage?: string;
}

export const ConnectionError: Schema.Schema<ConnectionError> = Schema.suspend(() => Schema.Struct({
  errorDomain: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectionError" }) as any as Schema.Schema<ConnectionError>;

export interface EkmConnection {
  /** Resource name of the EKM connection in the format: projects/{project}/locations/{location}/ekmConnections/{ekm_connection} */
  connectionName?: string;
  /** Output only. The connection state */
  connectionState?: "CONNECTION_STATE_UNSPECIFIED" | "AVAILABLE" | "NOT_AVAILABLE" | "ERROR" | "PERMISSION_DENIED" | (string & {});
  /** The connection error that occurred if any */
  connectionError?: ConnectionError;
}

export const EkmConnection: Schema.Schema<EkmConnection> = Schema.suspend(() => Schema.Struct({
  connectionName: Schema.optional(Schema.String),
  connectionState: Schema.optional(Schema.String),
  connectionError: Schema.optional(ConnectionError),
})).annotate({ identifier: "EkmConnection" }) as any as Schema.Schema<EkmConnection>;

export interface EkmConnections {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` */
  name?: string;
  /** The EKM connections associated with the workload */
  ekmConnections?: Array<EkmConnection>;
}

export const EkmConnections: Schema.Schema<EkmConnections> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ekmConnections: Schema.optional(Schema.Array(EkmConnection)),
})).annotate({ identifier: "EkmConnections" }) as any as Schema.Schema<EkmConnections>;

export interface PartnerPermissions {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` */
  name?: string;
  /** The partner permissions granted for the workload */
  partnerPermissions?: Array<"PERMISSION_UNSPECIFIED" | "ACCESS_TRANSPARENCY_AND_EMERGENCY_ACCESS_LOGS" | "ASSURED_WORKLOADS_MONITORING" | "ACCESS_APPROVAL_REQUESTS" | "ASSURED_WORKLOADS_EKM_CONNECTION_STATUS" | "ACCESS_TRANSPARENCY_LOGS_SUPPORT_CASE_VIEWER" | (string & {})>;
}

export const PartnerPermissions: Schema.Schema<PartnerPermissions> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partnerPermissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PartnerPermissions" }) as any as Schema.Schema<PartnerPermissions>;

export interface AccessReason {
  /** Type of access justification. */
  type?: "TYPE_UNSPECIFIED" | "CUSTOMER_INITIATED_SUPPORT" | "GOOGLE_INITIATED_SERVICE" | "GOOGLE_INITIATED_REVIEW" | "THIRD_PARTY_DATA_REQUEST" | "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT" | "CLOUD_INITIATED_ACCESS" | (string & {});
  /** More detail about certain reason types. See comments for each type above. */
  detail?: string;
}

export const AccessReason: Schema.Schema<AccessReason> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessReason" }) as any as Schema.Schema<AccessReason>;

export interface AccessApprovalRequest {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/accessApprovalRequests/{access_approval_request}` */
  name?: string;
  /** The time at which approval was requested. */
  requestTime?: string;
  /** The justification for which approval is being requested. */
  requestedReason?: AccessReason;
  /** The requested expiration for the approval. If the request is approved, access will be granted from the time of approval until the expiration time. */
  requestedExpirationTime?: string;
}

export const AccessApprovalRequest: Schema.Schema<AccessApprovalRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  requestedReason: Schema.optional(AccessReason),
  requestedExpirationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessApprovalRequest" }) as any as Schema.Schema<AccessApprovalRequest>;

export interface ListAccessApprovalRequestsResponse {
  /** List of access approval requests */
  accessApprovalRequests?: Array<AccessApprovalRequest>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListAccessApprovalRequestsResponse: Schema.Schema<ListAccessApprovalRequestsResponse> = Schema.suspend(() => Schema.Struct({
  accessApprovalRequests: Schema.optional(Schema.Array(AccessApprovalRequest)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListAccessApprovalRequestsResponse" }) as any as Schema.Schema<ListAccessApprovalRequestsResponse>;

export interface Sku {
  /** Argentum product SKU, that is associated with the partner offerings to customers used by Syntro for billing purposes. SKUs can represent resold Google products or support services. */
  id?: string;
  /** Display name of the product identified by the SKU. A partner may want to show partner branded names for their offerings such as local sovereign cloud solutions. */
  displayName?: string;
}

export const Sku: Schema.Schema<Sku> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Sku" }) as any as Schema.Schema<Sku>;

export interface EkmMetadata {
  /** The Cloud EKM partner. */
  ekmSolution?: "EKM_SOLUTION_UNSPECIFIED" | "FORTANIX" | "FUTUREX" | "THALES" | "VIRTRU" | (string & {});
  /** Endpoint for sending requests to the EKM for key provisioning during Assured Workload creation. */
  ekmEndpointUri?: string;
}

export const EkmMetadata: Schema.Schema<EkmMetadata> = Schema.suspend(() => Schema.Struct({
  ekmSolution: Schema.optional(Schema.String),
  ekmEndpointUri: Schema.optional(Schema.String),
})).annotate({ identifier: "EkmMetadata" }) as any as Schema.Schema<EkmMetadata>;

export interface Partner {
  /** Identifier. The resource name of the partner. Format: `organizations/{organization}/locations/{location}/partner` Example: "organizations/123456/locations/us-central1/partner" */
  name?: string;
  /** List of SKUs the partner is offering */
  skus?: Array<Sku>;
  /** List of Google Cloud supported EKM partners supported by the partner */
  ekmSolutions?: Array<EkmMetadata>;
  /** List of Google Cloud regions that the partner sells services to customers. Valid Google Cloud regions found here: https://cloud.google.com/compute/docs/regions-zones */
  operatedCloudRegions?: Array<string>;
  /** Google Cloud project ID in the partner's Google Cloud organization for receiving enhanced Logs for Partners. */
  partnerProjectId?: string;
  /** Output only. Time the resource was created */
  createTime?: string;
  /** Output only. The last time the resource was updated */
  updateTime?: string;
}

export const Partner: Schema.Schema<Partner> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  skus: Schema.optional(Schema.Array(Sku)),
  ekmSolutions: Schema.optional(Schema.Array(EkmMetadata)),
  operatedCloudRegions: Schema.optional(Schema.Array(Schema.String)),
  partnerProjectId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Partner" }) as any as Schema.Schema<Partner>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface Gcloud {
  /** Gcloud command to resolve violation */
  gcloudCommands?: Array<string>;
  /** Steps to resolve violation via gcloud cli */
  steps?: Array<string>;
  /** Additional urls for more information about steps */
  additionalLinks?: Array<string>;
}

export const Gcloud: Schema.Schema<Gcloud> = Schema.suspend(() => Schema.Struct({
  gcloudCommands: Schema.optional(Schema.Array(Schema.String)),
  steps: Schema.optional(Schema.Array(Schema.String)),
  additionalLinks: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Gcloud" }) as any as Schema.Schema<Gcloud>;

export interface Console {
  /** Link to console page where violations can be resolved */
  consoleUris?: Array<string>;
  /** Steps to resolve violation via cloud console */
  steps?: Array<string>;
  /** Additional urls for more information about steps */
  additionalLinks?: Array<string>;
}

export const Console: Schema.Schema<Console> = Schema.suspend(() => Schema.Struct({
  consoleUris: Schema.optional(Schema.Array(Schema.String)),
  steps: Schema.optional(Schema.Array(Schema.String)),
  additionalLinks: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Console" }) as any as Schema.Schema<Console>;

export interface Instructions {
  /** Remediation instructions to resolve violation via gcloud cli */
  gcloudInstructions?: Gcloud;
  /** Remediation instructions to resolve violation via cloud console */
  consoleInstructions?: Console;
}

export const Instructions: Schema.Schema<Instructions> = Schema.suspend(() => Schema.Struct({
  gcloudInstructions: Schema.optional(Gcloud),
  consoleInstructions: Schema.optional(Console),
})).annotate({ identifier: "Instructions" }) as any as Schema.Schema<Instructions>;

export interface Remediation {
  /** Required. Remediation instructions to resolve violations */
  instructions?: Instructions;
  /** Values that can resolve the violation For example: for list org policy violations, this will either be the list of allowed or denied values */
  compliantValues?: Array<string>;
  /** Output only. Remediation type based on the type of org policy values violated */
  remediationType?: "REMEDIATION_TYPE_UNSPECIFIED" | "REMEDIATION_BOOLEAN_ORG_POLICY_VIOLATION" | "REMEDIATION_LIST_ALLOWED_VALUES_ORG_POLICY_VIOLATION" | "REMEDIATION_LIST_DENIED_VALUES_ORG_POLICY_VIOLATION" | "REMEDIATION_RESTRICT_CMEK_CRYPTO_KEY_PROJECTS_ORG_POLICY_VIOLATION" | "REMEDIATION_RESOURCE_VIOLATION" | (string & {});
}

export const Remediation: Schema.Schema<Remediation> = Schema.suspend(() => Schema.Struct({
  instructions: Schema.optional(Instructions),
  compliantValues: Schema.optional(Schema.Array(Schema.String)),
  remediationType: Schema.optional(Schema.String),
})).annotate({ identifier: "Remediation" }) as any as Schema.Schema<Remediation>;

export interface Violation {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` */
  name?: string;
  /** Output only. Description for the Violation. e.g. OrgPolicy gcp.resourceLocations has non compliant value. */
  description?: string;
  /** Output only. Time of the event which triggered the Violation. */
  beginTime?: string;
  /** Output only. The last time when the Violation record was updated. */
  updateTime?: string;
  /** Output only. Time of the event which fixed the Violation. If the violation is ACTIVE this will be empty. */
  resolveTime?: string;
  /** Output only. Category under which this violation is mapped. e.g. Location, Service Usage, Access, Encryption, etc. */
  category?: string;
  /** Output only. State of the violation */
  state?: "STATE_UNSPECIFIED" | "RESOLVED" | "UNRESOLVED" | "EXCEPTION" | (string & {});
  /** Output only. Immutable. Name of the OrgPolicy which was modified with non-compliant change and resulted this violation. Format: `projects/{project_number}/policies/{constraint_name}` `folders/{folder_id}/policies/{constraint_name}` `organizations/{organization_id}/policies/{constraint_name}` */
  nonCompliantOrgPolicy?: string;
  /** The folder_id of the violation */
  folderId?: string;
  /** Output only. Compliance violation remediation */
  remediation?: Remediation;
}

export const Violation: Schema.Schema<Violation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  beginTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  resolveTime: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  nonCompliantOrgPolicy: Schema.optional(Schema.String),
  folderId: Schema.optional(Schema.String),
  remediation: Schema.optional(Remediation),
})).annotate({ identifier: "Violation" }) as any as Schema.Schema<Violation>;

export interface ListViolationsResponse {
  /** List of violation */
  violations?: Array<Violation>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Workloads that could not be reached due to permission errors or any other error. Ref: https://google.aip.dev/217 */
  unreachable?: Array<string>;
}

export const ListViolationsResponse: Schema.Schema<ListViolationsResponse> = Schema.suspend(() => Schema.Struct({
  violations: Schema.optional(Schema.Array(Violation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListViolationsResponse" }) as any as Schema.Schema<ListViolationsResponse>;

export interface OperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Get details of a Partner. */
export interface GetPartnerOrganizationsLocationsRequest {
  /** Required. Format: `organizations/{organization}/locations/{location}/partner` */
  name: string;
}

export const GetPartnerOrganizationsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/partner" }),
  svc,
) as unknown as Schema.Schema<GetPartnerOrganizationsLocationsRequest>;

export type GetPartnerOrganizationsLocationsResponse = Partner;
export const GetPartnerOrganizationsLocationsResponse = Partner;

export type GetPartnerOrganizationsLocationsError = CommonErrors;

export const getPartnerOrganizationsLocations: API.OperationMethod<GetPartnerOrganizationsLocationsRequest, GetPartnerOrganizationsLocationsResponse, GetPartnerOrganizationsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnerOrganizationsLocationsRequest,
  output: GetPartnerOrganizationsLocationsResponse,
  errors: [],
}));

/** Gets details of a single customer */
export interface GetOrganizationsLocationsCustomersRequest {
  /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
  name: string;
}

export const GetOrganizationsLocationsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsCustomersRequest>;

export type GetOrganizationsLocationsCustomersResponse = Customer;
export const GetOrganizationsLocationsCustomersResponse = Customer;

export type GetOrganizationsLocationsCustomersError = CommonErrors;

export const getOrganizationsLocationsCustomers: API.OperationMethod<GetOrganizationsLocationsCustomersRequest, GetOrganizationsLocationsCustomersResponse, GetOrganizationsLocationsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsCustomersRequest,
  output: GetOrganizationsLocationsCustomersResponse,
  errors: [],
}));

/** Lists customers of a partner identified by its Google Cloud organization ID */
export interface ListOrganizationsLocationsCustomersRequest {
  /** Required. Parent resource Format: `organizations/{organization}/locations/{location}` */
  parent: string;
  /** The maximum number of Customers to return. The service may return fewer than this value. If unspecified, at most 500 Customers will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListCustomers` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListOrganizationsLocationsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsCustomersRequest>;

export type ListOrganizationsLocationsCustomersResponse = ListCustomersResponse;
export const ListOrganizationsLocationsCustomersResponse = ListCustomersResponse;

export type ListOrganizationsLocationsCustomersError = CommonErrors;

export const listOrganizationsLocationsCustomers = API.makePaginated(() => ({
  input: ListOrganizationsLocationsCustomersRequest,
  output: ListOrganizationsLocationsCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new customer. */
export interface CreateOrganizationsLocationsCustomersRequest {
  /** Required. Parent resource Format: `organizations/{organization}/locations/{location}` */
  parent: string;
  /** Required. The customer id to use for the customer, which will become the final component of the customer's resource name. The specified value must be a valid Google cloud organization id. */
  customerId?: string;
  /** Request body */
  body?: Customer;
}

export const CreateOrganizationsLocationsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsCustomersRequest>;

export type CreateOrganizationsLocationsCustomersResponse = Customer;
export const CreateOrganizationsLocationsCustomersResponse = Customer;

export type CreateOrganizationsLocationsCustomersError = CommonErrors;

export const createOrganizationsLocationsCustomers: API.OperationMethod<CreateOrganizationsLocationsCustomersRequest, CreateOrganizationsLocationsCustomersResponse, CreateOrganizationsLocationsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsCustomersRequest,
  output: CreateOrganizationsLocationsCustomersResponse,
  errors: [],
}));

/** Update details of a single customer */
export interface PatchOrganizationsLocationsCustomersRequest {
  /** Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
  name: string;
  /** Optional. The list of fields to update */
  updateMask?: string;
  /** Request body */
  body?: Customer;
}

export const PatchOrganizationsLocationsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsCustomersRequest>;

export type PatchOrganizationsLocationsCustomersResponse = Customer;
export const PatchOrganizationsLocationsCustomersResponse = Customer;

export type PatchOrganizationsLocationsCustomersError = CommonErrors;

export const patchOrganizationsLocationsCustomers: API.OperationMethod<PatchOrganizationsLocationsCustomersRequest, PatchOrganizationsLocationsCustomersResponse, PatchOrganizationsLocationsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsCustomersRequest,
  output: PatchOrganizationsLocationsCustomersResponse,
  errors: [],
}));

/** Delete details of a single customer */
export interface DeleteOrganizationsLocationsCustomersRequest {
  /** Required. name of the resource to be deleted format: name=organizations/* /locations/* /customers/* */
  name: string;
}

export const DeleteOrganizationsLocationsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsCustomersRequest>;

export type DeleteOrganizationsLocationsCustomersResponse = Empty;
export const DeleteOrganizationsLocationsCustomersResponse = Empty;

export type DeleteOrganizationsLocationsCustomersError = CommonErrors;

export const deleteOrganizationsLocationsCustomers: API.OperationMethod<DeleteOrganizationsLocationsCustomersRequest, DeleteOrganizationsLocationsCustomersResponse, DeleteOrganizationsLocationsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsCustomersRequest,
  output: DeleteOrganizationsLocationsCustomersResponse,
  errors: [],
}));

/** Gets details of a single workload */
export interface GetOrganizationsLocationsCustomersWorkloadsRequest {
  /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
  name: string;
}

export const GetOrganizationsLocationsCustomersWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsCustomersWorkloadsRequest>;

export type GetOrganizationsLocationsCustomersWorkloadsResponse = Workload;
export const GetOrganizationsLocationsCustomersWorkloadsResponse = Workload;

export type GetOrganizationsLocationsCustomersWorkloadsError = CommonErrors;

export const getOrganizationsLocationsCustomersWorkloads: API.OperationMethod<GetOrganizationsLocationsCustomersWorkloadsRequest, GetOrganizationsLocationsCustomersWorkloadsResponse, GetOrganizationsLocationsCustomersWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsCustomersWorkloadsRequest,
  output: GetOrganizationsLocationsCustomersWorkloadsResponse,
  errors: [],
}));

/** Lists customer workloads for a given customer org id */
export interface ListOrganizationsLocationsCustomersWorkloadsRequest {
  /** Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}` */
  parent: string;
  /** The maximum number of workloads to return. The service may return fewer than this value. If unspecified, at most 500 workloads will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListWorkloads` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListOrganizationsLocationsCustomersWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsCustomersWorkloadsRequest>;

export type ListOrganizationsLocationsCustomersWorkloadsResponse = ListWorkloadsResponse;
export const ListOrganizationsLocationsCustomersWorkloadsResponse = ListWorkloadsResponse;

export type ListOrganizationsLocationsCustomersWorkloadsError = CommonErrors;

export const listOrganizationsLocationsCustomersWorkloads = API.makePaginated(() => ({
  input: ListOrganizationsLocationsCustomersWorkloadsRequest,
  output: ListOrganizationsLocationsCustomersWorkloadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the EKM connections associated with a workload */
export interface GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsRequest {
  /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` */
  name: string;
}

export const GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}/ekmConnections" }),
  svc,
) as unknown as Schema.Schema<GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsRequest>;

export type GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsResponse = EkmConnections;
export const GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsResponse = EkmConnections;

export type GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsError = CommonErrors;

export const getEkmConnectionsOrganizationsLocationsCustomersWorkloads: API.OperationMethod<GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsRequest, GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsResponse, GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsRequest,
  output: GetEkmConnectionsOrganizationsLocationsCustomersWorkloadsResponse,
  errors: [],
}));

/** Gets the partner permissions granted for a workload */
export interface GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsRequest {
  /** Required. Name of the resource to get in the format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` */
  name: string;
}

export const GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}/partnerPermissions" }),
  svc,
) as unknown as Schema.Schema<GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsRequest>;

export type GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsResponse = PartnerPermissions;
export const GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsResponse = PartnerPermissions;

export type GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsError = CommonErrors;

export const getPartnerPermissionsOrganizationsLocationsCustomersWorkloads: API.OperationMethod<GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsRequest, GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsResponse, GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsRequest,
  output: GetPartnerPermissionsOrganizationsLocationsCustomersWorkloadsResponse,
  errors: [],
}));

/** Deprecated: Only returns access approval requests directly associated with an assured workload folder. */
export interface ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsRequest {
  /** Required. Parent resource Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
  parent: string;
  /** Optional. The maximum number of access requests to return. The service may return fewer than this value. If unspecified, at most 500 access requests will be returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListAccessApprovalRequests` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}/accessApprovalRequests" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsRequest>;

export type ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsResponse = ListAccessApprovalRequestsResponse;
export const ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsResponse = ListAccessApprovalRequestsResponse;

export type ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsError = CommonErrors;

export const listOrganizationsLocationsCustomersWorkloadsAccessApprovalRequests = API.makePaginated(() => ({
  input: ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsRequest,
  output: ListOrganizationsLocationsCustomersWorkloadsAccessApprovalRequestsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists Violations for a workload Callers may also choose to read across multiple Customers or for a single customer as per [AIP-159](https://google.aip.dev/159) by using '-' (the hyphen or dash character) as a wildcard character instead of {customer} & {workload}. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
export interface ListOrganizationsLocationsCustomersWorkloadsViolationsRequest {
  /** Required. Parent resource Format `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` */
  parent: string;
  /** Optional. The maximum number of customers row to return. The service may return fewer than this value. If unspecified, at most 10 customers will be returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListViolations` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
  /** Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. */
  "interval.startTime"?: string;
  /** Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. */
  "interval.endTime"?: string;
}

export const ListOrganizationsLocationsCustomersWorkloadsViolationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  "interval.startTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.startTime")),
  "interval.endTime": Schema.optional(Schema.String).pipe(T.HttpQuery("interval.endTime")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}/violations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsCustomersWorkloadsViolationsRequest>;

export type ListOrganizationsLocationsCustomersWorkloadsViolationsResponse = ListViolationsResponse;
export const ListOrganizationsLocationsCustomersWorkloadsViolationsResponse = ListViolationsResponse;

export type ListOrganizationsLocationsCustomersWorkloadsViolationsError = CommonErrors;

export const listOrganizationsLocationsCustomersWorkloadsViolations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsCustomersWorkloadsViolationsRequest,
  output: ListOrganizationsLocationsCustomersWorkloadsViolationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets details of a single Violation. */
export interface GetOrganizationsLocationsCustomersWorkloadsViolationsRequest {
  /** Required. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` */
  name: string;
}

export const GetOrganizationsLocationsCustomersWorkloadsViolationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/customers/{customersId}/workloads/{workloadsId}/violations/{violationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsCustomersWorkloadsViolationsRequest>;

export type GetOrganizationsLocationsCustomersWorkloadsViolationsResponse = Violation;
export const GetOrganizationsLocationsCustomersWorkloadsViolationsResponse = Violation;

export type GetOrganizationsLocationsCustomersWorkloadsViolationsError = CommonErrors;

export const getOrganizationsLocationsCustomersWorkloadsViolations: API.OperationMethod<GetOrganizationsLocationsCustomersWorkloadsViolationsRequest, GetOrganizationsLocationsCustomersWorkloadsViolationsResponse, GetOrganizationsLocationsCustomersWorkloadsViolationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsCustomersWorkloadsViolationsRequest,
  output: GetOrganizationsLocationsCustomersWorkloadsViolationsResponse,
  errors: [],
}));

