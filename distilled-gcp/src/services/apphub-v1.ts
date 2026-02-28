// ==========================================================================
// App Hub API (apphub v1)
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
  name: "apphub",
  version: "v1",
  rootUrl: "https://apphub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ServiceProjectAttachment {
  /** Identifier. The resource name of a ServiceProjectAttachment. Format: `"projects/{host-project-id}/locations/global/serviceProjectAttachments/{service-project-id}."` */
  name?: string;
  /** Required. Immutable. Service project name in the format: `"projects/abc"` or `"projects/123"`. As input, project name with either project id or number are accepted. As output, this field will contain project number. */
  serviceProject?: string;
  /** Output only. Create time. */
  createTime?: string;
  /** Output only. A globally unique identifier (in UUID4 format) for the `ServiceProjectAttachment`. */
  uid?: string;
  /** Output only. ServiceProjectAttachment state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | (string & {});
}

export const ServiceProjectAttachment: Schema.Schema<ServiceProjectAttachment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceProject: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceProjectAttachment" }) as any as Schema.Schema<ServiceProjectAttachment>;

export interface LookupServiceProjectAttachmentResponse {
  /** Service project attachment for a project if exists, empty otherwise. */
  serviceProjectAttachment?: ServiceProjectAttachment;
}

export const LookupServiceProjectAttachmentResponse: Schema.Schema<LookupServiceProjectAttachmentResponse> = Schema.suspend(() => Schema.Struct({
  serviceProjectAttachment: Schema.optional(ServiceProjectAttachment),
})).annotate({ identifier: "LookupServiceProjectAttachmentResponse" }) as any as Schema.Schema<LookupServiceProjectAttachmentResponse>;

export interface ListServiceProjectAttachmentsResponse {
  /** List of service project attachments. */
  serviceProjectAttachments?: Array<ServiceProjectAttachment>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServiceProjectAttachmentsResponse: Schema.Schema<ListServiceProjectAttachmentsResponse> = Schema.suspend(() => Schema.Struct({
  serviceProjectAttachments: Schema.optional(Schema.Array(ServiceProjectAttachment)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServiceProjectAttachmentsResponse" }) as any as Schema.Schema<ListServiceProjectAttachmentsResponse>;

export interface DetachServiceProjectAttachmentRequest {
}

export const DetachServiceProjectAttachmentRequest: Schema.Schema<DetachServiceProjectAttachmentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DetachServiceProjectAttachmentRequest" }) as any as Schema.Schema<DetachServiceProjectAttachmentRequest>;

export interface DetachServiceProjectAttachmentResponse {
}

export const DetachServiceProjectAttachmentResponse: Schema.Schema<DetachServiceProjectAttachmentResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DetachServiceProjectAttachmentResponse" }) as any as Schema.Schema<DetachServiceProjectAttachmentResponse>;

export interface ServiceReference {
  /** Output only. The underlying resource URI. For example, URI of Forwarding Rule, URL Map, and Backend Service. */
  uri?: string;
}

export const ServiceReference: Schema.Schema<ServiceReference> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceReference" }) as any as Schema.Schema<ServiceReference>;

export interface FunctionalType {
  /** Output only. The functional type of a service or workload. */
  type?: "TYPE_UNSPECIFIED" | "AGENT" | "MCP_SERVER" | (string & {});
}

export const FunctionalType: Schema.Schema<FunctionalType> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "FunctionalType" }) as any as Schema.Schema<FunctionalType>;

export interface RegistrationType {
  /** Output only. The registration type of a service. */
  type?: "TYPE_UNSPECIFIED" | "EXCLUSIVE" | "SHARED" | (string & {});
}

export const RegistrationType: Schema.Schema<RegistrationType> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "RegistrationType" }) as any as Schema.Schema<RegistrationType>;

export interface ExtendedMetadata {
  /** Output only. The metadata contents. */
  metadataStruct?: Record<string, unknown>;
}

export const ExtendedMetadata: Schema.Schema<ExtendedMetadata> = Schema.suspend(() => Schema.Struct({
  metadataStruct: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ExtendedMetadata" }) as any as Schema.Schema<ExtendedMetadata>;

export interface Identity {
  /** Output only. The principal of the identity. Supported formats: * `sa://my-sa@PROJECT_ID.iam.gserviceaccount.com` for GCP Service Account * `principal://POOL_ID.global.PROJECT_NUMBER.workload.id.goog/ns/NAMESPACE_ID/sa/MANAGED_IDENTITY_ID` for Managed Workload Identity */
  principal?: string;
}

export const Identity: Schema.Schema<Identity> = Schema.suspend(() => Schema.Struct({
  principal: Schema.optional(Schema.String),
})).annotate({ identifier: "Identity" }) as any as Schema.Schema<Identity>;

export interface ServiceProperties {
  /** Output only. The service project identifier that the underlying cloud resource resides in. */
  gcpProject?: string;
  /** Output only. The location that the underlying resource resides in, for example, us-west1. */
  location?: string;
  /** Output only. The location that the underlying resource resides in if it is zonal, for example, us-west1-a). */
  zone?: string;
  /** Output only. The type of the service. */
  functionalType?: FunctionalType;
  /** Output only. The registration type of the service. */
  registrationType?: RegistrationType;
  /** Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}` */
  extendedMetadata?: Record<string, ExtendedMetadata>;
  /** Output only. The identity associated with the service. */
  identity?: Identity;
}

export const ServiceProperties: Schema.Schema<ServiceProperties> = Schema.suspend(() => Schema.Struct({
  gcpProject: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  functionalType: Schema.optional(FunctionalType),
  registrationType: Schema.optional(RegistrationType),
  extendedMetadata: Schema.optional(Schema.Record(Schema.String, ExtendedMetadata)),
  identity: Schema.optional(Identity),
})).annotate({ identifier: "ServiceProperties" }) as any as Schema.Schema<ServiceProperties>;

export interface DiscoveredService {
  /** Identifier. The resource name of the discovered service. Format: `"projects/{host-project-id}/locations/{location}/discoveredServices/{uuid}"` */
  name?: string;
  /** Output only. Reference to an underlying networking resource that can comprise a Service. These are immutable. */
  serviceReference?: ServiceReference;
  /** Output only. Properties of an underlying compute resource that can comprise a Service. These are immutable. */
  serviceProperties?: ServiceProperties;
}

export const DiscoveredService: Schema.Schema<DiscoveredService> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  serviceReference: Schema.optional(ServiceReference),
  serviceProperties: Schema.optional(ServiceProperties),
})).annotate({ identifier: "DiscoveredService" }) as any as Schema.Schema<DiscoveredService>;

export interface ListDiscoveredServicesResponse {
  /** List of Discovered Services. */
  discoveredServices?: Array<DiscoveredService>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDiscoveredServicesResponse: Schema.Schema<ListDiscoveredServicesResponse> = Schema.suspend(() => Schema.Struct({
  discoveredServices: Schema.optional(Schema.Array(DiscoveredService)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDiscoveredServicesResponse" }) as any as Schema.Schema<ListDiscoveredServicesResponse>;

export interface LookupDiscoveredServiceResponse {
  /** Discovered Service if exists, empty otherwise. */
  discoveredService?: DiscoveredService;
}

export const LookupDiscoveredServiceResponse: Schema.Schema<LookupDiscoveredServiceResponse> = Schema.suspend(() => Schema.Struct({
  discoveredService: Schema.optional(DiscoveredService),
})).annotate({ identifier: "LookupDiscoveredServiceResponse" }) as any as Schema.Schema<LookupDiscoveredServiceResponse>;

export interface Criticality {
  /** Required. Criticality Type. */
  type?: "TYPE_UNSPECIFIED" | "MISSION_CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | (string & {});
}

export const Criticality: Schema.Schema<Criticality> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Criticality" }) as any as Schema.Schema<Criticality>;

export interface Environment {
  /** Required. Environment Type. */
  type?: "TYPE_UNSPECIFIED" | "PRODUCTION" | "STAGING" | "TEST" | "DEVELOPMENT" | (string & {});
}

export const Environment: Schema.Schema<Environment> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Environment" }) as any as Schema.Schema<Environment>;

export interface ContactInfo {
  /** Optional. Contact's name. Can have a maximum length of 63 characters. */
  displayName?: string;
  /** Required. Email address of the contacts. */
  email?: string;
}

export const ContactInfo: Schema.Schema<ContactInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
})).annotate({ identifier: "ContactInfo" }) as any as Schema.Schema<ContactInfo>;

export interface Attributes {
  /** Optional. User-defined criticality information. */
  criticality?: Criticality;
  /** Optional. User-defined environment information. */
  environment?: Environment;
  /** Optional. Developer team that owns development and coding. */
  developerOwners?: Array<ContactInfo>;
  /** Optional. Operator team that ensures runtime and operations. */
  operatorOwners?: Array<ContactInfo>;
  /** Optional. Business team that ensures user needs are met and value is delivered */
  businessOwners?: Array<ContactInfo>;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() => Schema.Struct({
  criticality: Schema.optional(Criticality),
  environment: Schema.optional(Environment),
  developerOwners: Schema.optional(Schema.Array(ContactInfo)),
  operatorOwners: Schema.optional(Schema.Array(ContactInfo)),
  businessOwners: Schema.optional(Schema.Array(ContactInfo)),
})).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface Service {
  /** Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"` */
  name?: string;
  /** Optional. User-defined name for the Service. Can have a maximum length of 63 characters. */
  displayName?: string;
  /** Optional. User-defined description of a Service. Can have a maximum length of 2048 characters. */
  description?: string;
  /** Output only. Reference to an underlying networking resource that can comprise a Service. These are immutable. */
  serviceReference?: ServiceReference;
  /** Output only. Properties of an underlying compute resource that can comprise a Service. These are immutable. */
  serviceProperties?: ServiceProperties;
  /** Optional. Consumer provided attributes. */
  attributes?: Attributes;
  /** Required. Immutable. The resource name of the original discovered service. */
  discoveredService?: string;
  /** Output only. Create time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Output only. A universally unique identifier (UUID) for the `Service` in the UUID4 format. */
  uid?: string;
  /** Output only. Service state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "DETACHED" | (string & {});
}

export const Service: Schema.Schema<Service> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  serviceReference: Schema.optional(ServiceReference),
  serviceProperties: Schema.optional(ServiceProperties),
  attributes: Schema.optional(Attributes),
  discoveredService: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Service" }) as any as Schema.Schema<Service>;

export interface ListServicesResponse {
  /** List of Services. */
  services?: Array<Service>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListServicesResponse: Schema.Schema<ListServicesResponse> = Schema.suspend(() => Schema.Struct({
  services: Schema.optional(Schema.Array(Service)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListServicesResponse" }) as any as Schema.Schema<ListServicesResponse>;

export interface WorkloadReference {
  /** Output only. The underlying compute resource uri. */
  uri?: string;
}

export const WorkloadReference: Schema.Schema<WorkloadReference> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "WorkloadReference" }) as any as Schema.Schema<WorkloadReference>;

export interface WorkloadProperties {
  /** Output only. The service project identifier that the underlying cloud resource resides in. Empty for non-cloud resources. */
  gcpProject?: string;
  /** Output only. The location that the underlying compute resource resides in (for example, us-west1). */
  location?: string;
  /** Output only. The location that the underlying compute resource resides in if it is zonal (for example, us-west1-a). */
  zone?: string;
  /** Output only. The type of the workload. */
  functionalType?: FunctionalType;
  /** Output only. Additional metadata specific to the resource type. The key is a string that identifies the type of metadata and the value is the metadata contents specific to that type. Key format: `apphub.googleapis.com/{metadataType}` */
  extendedMetadata?: Record<string, ExtendedMetadata>;
  /** Output only. The identity associated with the workload. */
  identity?: Identity;
}

export const WorkloadProperties: Schema.Schema<WorkloadProperties> = Schema.suspend(() => Schema.Struct({
  gcpProject: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  zone: Schema.optional(Schema.String),
  functionalType: Schema.optional(FunctionalType),
  extendedMetadata: Schema.optional(Schema.Record(Schema.String, ExtendedMetadata)),
  identity: Schema.optional(Identity),
})).annotate({ identifier: "WorkloadProperties" }) as any as Schema.Schema<WorkloadProperties>;

export interface DiscoveredWorkload {
  /** Identifier. The resource name of the discovered workload. Format: `"projects/{host-project-id}/locations/{location}/discoveredWorkloads/{uuid}"` */
  name?: string;
  /** Output only. Reference of an underlying compute resource represented by the Workload. These are immutable. */
  workloadReference?: WorkloadReference;
  /** Output only. Properties of an underlying compute resource represented by the Workload. These are immutable. */
  workloadProperties?: WorkloadProperties;
}

export const DiscoveredWorkload: Schema.Schema<DiscoveredWorkload> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  workloadReference: Schema.optional(WorkloadReference),
  workloadProperties: Schema.optional(WorkloadProperties),
})).annotate({ identifier: "DiscoveredWorkload" }) as any as Schema.Schema<DiscoveredWorkload>;

export interface ListDiscoveredWorkloadsResponse {
  /** List of Discovered Workloads. */
  discoveredWorkloads?: Array<DiscoveredWorkload>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListDiscoveredWorkloadsResponse: Schema.Schema<ListDiscoveredWorkloadsResponse> = Schema.suspend(() => Schema.Struct({
  discoveredWorkloads: Schema.optional(Schema.Array(DiscoveredWorkload)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListDiscoveredWorkloadsResponse" }) as any as Schema.Schema<ListDiscoveredWorkloadsResponse>;

export interface LookupDiscoveredWorkloadResponse {
  /** Discovered Workload if exists, empty otherwise. */
  discoveredWorkload?: DiscoveredWorkload;
}

export const LookupDiscoveredWorkloadResponse: Schema.Schema<LookupDiscoveredWorkloadResponse> = Schema.suspend(() => Schema.Struct({
  discoveredWorkload: Schema.optional(DiscoveredWorkload),
})).annotate({ identifier: "LookupDiscoveredWorkloadResponse" }) as any as Schema.Schema<LookupDiscoveredWorkloadResponse>;

export interface Workload {
  /** Identifier. The resource name of the Workload. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/workloads/{workload-id}"` */
  name?: string;
  /** Optional. User-defined name for the Workload. Can have a maximum length of 63 characters. */
  displayName?: string;
  /** Optional. User-defined description of a Workload. Can have a maximum length of 2048 characters. */
  description?: string;
  /** Output only. Reference of an underlying compute resource represented by the Workload. These are immutable. */
  workloadReference?: WorkloadReference;
  /** Output only. Properties of an underlying compute resource represented by the Workload. These are immutable. */
  workloadProperties?: WorkloadProperties;
  /** Required. Immutable. The resource name of the original discovered workload. */
  discoveredWorkload?: string;
  /** Optional. Consumer provided attributes. */
  attributes?: Attributes;
  /** Output only. Create time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Output only. A universally unique identifier (UUID) for the `Workload` in the UUID4 format. */
  uid?: string;
  /** Output only. Workload state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "DETACHED" | (string & {});
}

export const Workload: Schema.Schema<Workload> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  workloadReference: Schema.optional(WorkloadReference),
  workloadProperties: Schema.optional(WorkloadProperties),
  discoveredWorkload: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Workload" }) as any as Schema.Schema<Workload>;

export interface ListWorkloadsResponse {
  /** List of Workloads. */
  workloads?: Array<Workload>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListWorkloadsResponse: Schema.Schema<ListWorkloadsResponse> = Schema.suspend(() => Schema.Struct({
  workloads: Schema.optional(Schema.Array(Workload)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListWorkloadsResponse" }) as any as Schema.Schema<ListWorkloadsResponse>;

export interface Scope {
  /** Required. Scope Type. */
  type?: "TYPE_UNSPECIFIED" | "REGIONAL" | "GLOBAL" | (string & {});
}

export const Scope: Schema.Schema<Scope> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Scope" }) as any as Schema.Schema<Scope>;

export interface Application {
  /** Identifier. The resource name of an Application. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}"` */
  name?: string;
  /** Optional. User-defined name for the Application. Can have a maximum length of 63 characters. */
  displayName?: string;
  /** Optional. User-defined description of an Application. Can have a maximum length of 2048 characters. */
  description?: string;
  /** Optional. Consumer provided attributes. */
  attributes?: Attributes;
  /** Output only. Create time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Required. Immutable. Defines what data can be included into this Application. Limits which Services and Workloads can be registered. */
  scope?: Scope;
  /** Output only. A universally unique identifier (in UUID4 format) for the `Application`. */
  uid?: string;
  /** Output only. Application state. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | (string & {});
}

export const Application: Schema.Schema<Application> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  scope: Schema.optional(Scope),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Application" }) as any as Schema.Schema<Application>;

export interface ListApplicationsResponse {
  /** List of Applications. */
  applications?: Array<Application>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const ListApplicationsResponse: Schema.Schema<ListApplicationsResponse> = Schema.suspend(() => Schema.Struct({
  applications: Schema.optional(Schema.Array(Application)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListApplicationsResponse" }) as any as Schema.Schema<ListApplicationsResponse>;

export interface Boundary {
  /** Optional. The resource name of the CRM node being attached to the boundary. Format: `projects/{project-number}` or `projects/{project-id}` */
  crmNode?: string;
  /** Identifier. The resource name of the boundary. Format: "projects/{project}/locations/{location}/boundary" */
  name?: string;
  /** Output only. Create time. */
  createTime?: string;
  /** Output only. Update time. */
  updateTime?: string;
  /** Output only. Boundary type. */
  type?: "TYPE_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | "MANAGED_AUTOMATIC" | (string & {});
}

export const Boundary: Schema.Schema<Boundary> = Schema.suspend(() => Schema.Struct({
  crmNode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Boundary" }) as any as Schema.Schema<Boundary>;

export interface ExtendedMetadataSchema {
  /** Identifier. Resource name of the schema. Format: projects//locations//extendedMetadataSchemas/ */
  name?: string;
  /** Output only. The JSON schema as a string. */
  jsonSchema?: string;
  /** Output only. The version of the schema. New versions are required to be backwards compatible. */
  schemaVersion?: string;
}

export const ExtendedMetadataSchema: Schema.Schema<ExtendedMetadataSchema> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  jsonSchema: Schema.optional(Schema.String),
  schemaVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ExtendedMetadataSchema" }) as any as Schema.Schema<ExtendedMetadataSchema>;

export interface ListExtendedMetadataSchemasResponse {
  /** List of Extended Metadata Schemas. */
  extendedMetadataSchemas?: Array<ExtendedMetadataSchema>;
  /** A token identifying a page of results the server should return. */
  nextPageToken?: string;
}

export const ListExtendedMetadataSchemasResponse: Schema.Schema<ListExtendedMetadataSchemasResponse> = Schema.suspend(() => Schema.Struct({
  extendedMetadataSchemas: Schema.optional(Schema.Array(ExtendedMetadataSchema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListExtendedMetadataSchemasResponse" }) as any as Schema.Schema<ListExtendedMetadataSchemasResponse>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ReconciliationOperationMetadata {
  /** DEPRECATED. Use exclusive_action instead. */
  deleteResource?: boolean;
  /** Excluisive action returned by the CLH. */
  exclusiveAction?: "UNKNOWN_REPAIR_ACTION" | "DELETE" | "RETRY" | (string & {});
}

export const ReconciliationOperationMetadata: Schema.Schema<ReconciliationOperationMetadata> = Schema.suspend(() => Schema.Struct({
  deleteResource: Schema.optional(Schema.Boolean),
  exclusiveAction: Schema.optional(Schema.String),
})).annotate({ identifier: "ReconciliationOperationMetadata" }) as any as Schema.Schema<ReconciliationOperationMetadata>;

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
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
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

/** Lists a service project attachment for a given service project. You can call this API from any project to find if it is attached to a host project. */
export interface LookupServiceProjectAttachmentProjectsLocationsRequest {
  /** Required. Service project ID and location to lookup service project attachment for. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. */
  name: string;
}

export const LookupServiceProjectAttachmentProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:lookupServiceProjectAttachment" }),
  svc,
) as unknown as Schema.Schema<LookupServiceProjectAttachmentProjectsLocationsRequest>;

export type LookupServiceProjectAttachmentProjectsLocationsResponse = LookupServiceProjectAttachmentResponse;
export const LookupServiceProjectAttachmentProjectsLocationsResponse = LookupServiceProjectAttachmentResponse;

export type LookupServiceProjectAttachmentProjectsLocationsError = CommonErrors;

export const lookupServiceProjectAttachmentProjectsLocations: API.OperationMethod<LookupServiceProjectAttachmentProjectsLocationsRequest, LookupServiceProjectAttachmentProjectsLocationsResponse, LookupServiceProjectAttachmentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupServiceProjectAttachmentProjectsLocationsRequest,
  output: LookupServiceProjectAttachmentProjectsLocationsResponse,
  errors: [],
}));

/** Detaches a service project from a host project. You can call this API from any service project without needing access to the host project that it is attached to. */
export interface DetachServiceProjectAttachmentProjectsLocationsRequest {
  /** Required. Service project id and location to detach from a host project. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. */
  name: string;
  /** Request body */
  body?: DetachServiceProjectAttachmentRequest;
}

export const DetachServiceProjectAttachmentProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DetachServiceProjectAttachmentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:detachServiceProjectAttachment", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetachServiceProjectAttachmentProjectsLocationsRequest>;

export type DetachServiceProjectAttachmentProjectsLocationsResponse = DetachServiceProjectAttachmentResponse;
export const DetachServiceProjectAttachmentProjectsLocationsResponse = DetachServiceProjectAttachmentResponse;

export type DetachServiceProjectAttachmentProjectsLocationsError = CommonErrors;

export const detachServiceProjectAttachmentProjectsLocations: API.OperationMethod<DetachServiceProjectAttachmentProjectsLocationsRequest, DetachServiceProjectAttachmentProjectsLocationsResponse, DetachServiceProjectAttachmentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetachServiceProjectAttachmentProjectsLocationsRequest,
  output: DetachServiceProjectAttachmentProjectsLocationsResponse,
  errors: [],
}));

/** Gets a Boundary. */
export interface GetBoundaryProjectsLocationsRequest {
  /** Required. The name of the boundary to retrieve. Format: `projects/{project}/locations/{location}/boundary`. */
  name: string;
}

export const GetBoundaryProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/boundary" }),
  svc,
) as unknown as Schema.Schema<GetBoundaryProjectsLocationsRequest>;

export type GetBoundaryProjectsLocationsResponse = Boundary;
export const GetBoundaryProjectsLocationsResponse = Boundary;

export type GetBoundaryProjectsLocationsError = CommonErrors;

export const getBoundaryProjectsLocations: API.OperationMethod<GetBoundaryProjectsLocationsRequest, GetBoundaryProjectsLocationsResponse, GetBoundaryProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetBoundaryProjectsLocationsRequest,
  output: GetBoundaryProjectsLocationsResponse,
  errors: [],
}));

/** Updates a Boundary. */
export interface UpdateBoundaryProjectsLocationsRequest {
  /** Identifier. The resource name of the boundary. Format: "projects/{project}/locations/{location}/boundary" */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Boundary resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Boundary;
}

export const UpdateBoundaryProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Boundary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/boundary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateBoundaryProjectsLocationsRequest>;

export type UpdateBoundaryProjectsLocationsResponse = Operation;
export const UpdateBoundaryProjectsLocationsResponse = Operation;

export type UpdateBoundaryProjectsLocationsError = CommonErrors;

export const updateBoundaryProjectsLocations: API.OperationMethod<UpdateBoundaryProjectsLocationsRequest, UpdateBoundaryProjectsLocationsResponse, UpdateBoundaryProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateBoundaryProjectsLocationsRequest,
  output: UpdateBoundaryProjectsLocationsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists service projects attached to the host project. */
export interface ListProjectsLocationsServiceProjectAttachmentsRequest {
  /** Required. Host project ID and location to list service project attachments. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsServiceProjectAttachmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceProjectAttachments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsServiceProjectAttachmentsRequest>;

export type ListProjectsLocationsServiceProjectAttachmentsResponse = ListServiceProjectAttachmentsResponse;
export const ListProjectsLocationsServiceProjectAttachmentsResponse = ListServiceProjectAttachmentsResponse;

export type ListProjectsLocationsServiceProjectAttachmentsError = CommonErrors;

export const listProjectsLocationsServiceProjectAttachments = API.makePaginated(() => ({
  input: ListProjectsLocationsServiceProjectAttachmentsRequest,
  output: ListProjectsLocationsServiceProjectAttachmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Attaches a service project to the host project. */
export interface CreateProjectsLocationsServiceProjectAttachmentsRequest {
  /** Required. Host project ID and location to which service project is being attached. Only global location is supported. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. The service project attachment identifier must contain the project id of the service project specified in the service_project_attachment.service_project field. */
  serviceProjectAttachmentId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: ServiceProjectAttachment;
}

export const CreateProjectsLocationsServiceProjectAttachmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceProjectAttachmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceProjectAttachmentId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(ServiceProjectAttachment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceProjectAttachments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsServiceProjectAttachmentsRequest>;

export type CreateProjectsLocationsServiceProjectAttachmentsResponse = Operation;
export const CreateProjectsLocationsServiceProjectAttachmentsResponse = Operation;

export type CreateProjectsLocationsServiceProjectAttachmentsError = CommonErrors;

export const createProjectsLocationsServiceProjectAttachments: API.OperationMethod<CreateProjectsLocationsServiceProjectAttachmentsRequest, CreateProjectsLocationsServiceProjectAttachmentsResponse, CreateProjectsLocationsServiceProjectAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsServiceProjectAttachmentsRequest,
  output: CreateProjectsLocationsServiceProjectAttachmentsResponse,
  errors: [],
}));

/** Gets a service project attachment. */
export interface GetProjectsLocationsServiceProjectAttachmentsRequest {
  /** Required. Fully qualified name of the service project attachment to retrieve. Expected format: `projects/{project}/locations/{location}/serviceProjectAttachments/{serviceProjectAttachment}`. */
  name: string;
}

export const GetProjectsLocationsServiceProjectAttachmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceProjectAttachments/{serviceProjectAttachmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsServiceProjectAttachmentsRequest>;

export type GetProjectsLocationsServiceProjectAttachmentsResponse = ServiceProjectAttachment;
export const GetProjectsLocationsServiceProjectAttachmentsResponse = ServiceProjectAttachment;

export type GetProjectsLocationsServiceProjectAttachmentsError = CommonErrors;

export const getProjectsLocationsServiceProjectAttachments: API.OperationMethod<GetProjectsLocationsServiceProjectAttachmentsRequest, GetProjectsLocationsServiceProjectAttachmentsResponse, GetProjectsLocationsServiceProjectAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsServiceProjectAttachmentsRequest,
  output: GetProjectsLocationsServiceProjectAttachmentsResponse,
  errors: [],
}));

/** Deletes a service project attachment. */
export interface DeleteProjectsLocationsServiceProjectAttachmentsRequest {
  /** Required. Fully qualified name of the service project attachment to delete. Expected format: `projects/{project}/locations/{location}/serviceProjectAttachments/{serviceProjectAttachment}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsServiceProjectAttachmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/serviceProjectAttachments/{serviceProjectAttachmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsServiceProjectAttachmentsRequest>;

export type DeleteProjectsLocationsServiceProjectAttachmentsResponse = Operation;
export const DeleteProjectsLocationsServiceProjectAttachmentsResponse = Operation;

export type DeleteProjectsLocationsServiceProjectAttachmentsError = CommonErrors;

export const deleteProjectsLocationsServiceProjectAttachments: API.OperationMethod<DeleteProjectsLocationsServiceProjectAttachmentsRequest, DeleteProjectsLocationsServiceProjectAttachmentsResponse, DeleteProjectsLocationsServiceProjectAttachmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsServiceProjectAttachmentsRequest,
  output: DeleteProjectsLocationsServiceProjectAttachmentsResponse,
  errors: [],
}));

/** Lists Discovered Services that can be added to an Application in a host project and location. */
export interface ListProjectsLocationsDiscoveredServicesRequest {
  /** Required. Project and location to list Discovered Services on. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsDiscoveredServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredServices" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDiscoveredServicesRequest>;

export type ListProjectsLocationsDiscoveredServicesResponse = ListDiscoveredServicesResponse;
export const ListProjectsLocationsDiscoveredServicesResponse = ListDiscoveredServicesResponse;

export type ListProjectsLocationsDiscoveredServicesError = CommonErrors;

export const listProjectsLocationsDiscoveredServices = API.makePaginated(() => ({
  input: ListProjectsLocationsDiscoveredServicesRequest,
  output: ListProjectsLocationsDiscoveredServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Discovered Service in a host project and location. */
export interface GetProjectsLocationsDiscoveredServicesRequest {
  /** Required. Fully qualified name of the Discovered Service to fetch. Expected format: `projects/{project}/locations/{location}/discoveredServices/{discoveredService}`. */
  name: string;
}

export const GetProjectsLocationsDiscoveredServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredServices/{discoveredServicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveredServicesRequest>;

export type GetProjectsLocationsDiscoveredServicesResponse = DiscoveredService;
export const GetProjectsLocationsDiscoveredServicesResponse = DiscoveredService;

export type GetProjectsLocationsDiscoveredServicesError = CommonErrors;

export const getProjectsLocationsDiscoveredServices: API.OperationMethod<GetProjectsLocationsDiscoveredServicesRequest, GetProjectsLocationsDiscoveredServicesResponse, GetProjectsLocationsDiscoveredServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveredServicesRequest,
  output: GetProjectsLocationsDiscoveredServicesResponse,
  errors: [],
}));

/** Lists a Discovered Service in a host project and location, with a given resource URI. */
export interface LookupProjectsLocationsDiscoveredServicesRequest {
  /** Required. Host project ID and location to lookup Discovered Service in. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. Resource URI to find DiscoveredService for. Accepts both project number and project ID and does translation when needed. */
  uri?: string;
}

export const LookupProjectsLocationsDiscoveredServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uri: Schema.optional(Schema.String).pipe(T.HttpQuery("uri")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredServices:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupProjectsLocationsDiscoveredServicesRequest>;

export type LookupProjectsLocationsDiscoveredServicesResponse = LookupDiscoveredServiceResponse;
export const LookupProjectsLocationsDiscoveredServicesResponse = LookupDiscoveredServiceResponse;

export type LookupProjectsLocationsDiscoveredServicesError = CommonErrors;

export const lookupProjectsLocationsDiscoveredServices: API.OperationMethod<LookupProjectsLocationsDiscoveredServicesRequest, LookupProjectsLocationsDiscoveredServicesResponse, LookupProjectsLocationsDiscoveredServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupProjectsLocationsDiscoveredServicesRequest,
  output: LookupProjectsLocationsDiscoveredServicesResponse,
  errors: [],
}));

/** Lists Discovered Workloads that can be added to an Application in a host project and location. */
export interface ListProjectsLocationsDiscoveredWorkloadsRequest {
  /** Required. Project and location to list Discovered Workloads on. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsDiscoveredWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredWorkloads" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDiscoveredWorkloadsRequest>;

export type ListProjectsLocationsDiscoveredWorkloadsResponse = ListDiscoveredWorkloadsResponse;
export const ListProjectsLocationsDiscoveredWorkloadsResponse = ListDiscoveredWorkloadsResponse;

export type ListProjectsLocationsDiscoveredWorkloadsError = CommonErrors;

export const listProjectsLocationsDiscoveredWorkloads = API.makePaginated(() => ({
  input: ListProjectsLocationsDiscoveredWorkloadsRequest,
  output: ListProjectsLocationsDiscoveredWorkloadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a Discovered Workload in a host project and location. */
export interface GetProjectsLocationsDiscoveredWorkloadsRequest {
  /** Required. Fully qualified name of the Discovered Workload to fetch. Expected format: `projects/{project}/locations/{location}/discoveredWorkloads/{discoveredWorkload}`. */
  name: string;
}

export const GetProjectsLocationsDiscoveredWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredWorkloads/{discoveredWorkloadsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDiscoveredWorkloadsRequest>;

export type GetProjectsLocationsDiscoveredWorkloadsResponse = DiscoveredWorkload;
export const GetProjectsLocationsDiscoveredWorkloadsResponse = DiscoveredWorkload;

export type GetProjectsLocationsDiscoveredWorkloadsError = CommonErrors;

export const getProjectsLocationsDiscoveredWorkloads: API.OperationMethod<GetProjectsLocationsDiscoveredWorkloadsRequest, GetProjectsLocationsDiscoveredWorkloadsResponse, GetProjectsLocationsDiscoveredWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDiscoveredWorkloadsRequest,
  output: GetProjectsLocationsDiscoveredWorkloadsResponse,
  errors: [],
}));

/** Lists a Discovered Workload in a host project and location, with a given resource URI. */
export interface LookupProjectsLocationsDiscoveredWorkloadsRequest {
  /** Required. Host project ID and location to lookup Discovered Workload in. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. Resource URI to find Discovered Workload for. Accepts both project number and project ID and does translation when needed. */
  uri?: string;
}

export const LookupProjectsLocationsDiscoveredWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  uri: Schema.optional(Schema.String).pipe(T.HttpQuery("uri")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/discoveredWorkloads:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupProjectsLocationsDiscoveredWorkloadsRequest>;

export type LookupProjectsLocationsDiscoveredWorkloadsResponse = LookupDiscoveredWorkloadResponse;
export const LookupProjectsLocationsDiscoveredWorkloadsResponse = LookupDiscoveredWorkloadResponse;

export type LookupProjectsLocationsDiscoveredWorkloadsError = CommonErrors;

export const lookupProjectsLocationsDiscoveredWorkloads: API.OperationMethod<LookupProjectsLocationsDiscoveredWorkloadsRequest, LookupProjectsLocationsDiscoveredWorkloadsResponse, LookupProjectsLocationsDiscoveredWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupProjectsLocationsDiscoveredWorkloadsRequest,
  output: LookupProjectsLocationsDiscoveredWorkloadsResponse,
  errors: [],
}));

/** Lists Applications in a host project and location. */
export interface ListProjectsLocationsApplicationsRequest {
  /** Required. Project and location to list Applications on. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsApplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsRequest>;

export type ListProjectsLocationsApplicationsResponse = ListApplicationsResponse;
export const ListProjectsLocationsApplicationsResponse = ListApplicationsResponse;

export type ListProjectsLocationsApplicationsError = CommonErrors;

export const listProjectsLocationsApplications = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsRequest,
  output: ListProjectsLocationsApplicationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an Application in a host project and location. */
export interface CreateProjectsLocationsApplicationsRequest {
  /** Required. Project and location to create Application in. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Required. The Application identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  applicationId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Application;
}

export const CreateProjectsLocationsApplicationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  applicationId: Schema.optional(Schema.String).pipe(T.HttpQuery("applicationId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsRequest>;

export type CreateProjectsLocationsApplicationsResponse = Operation;
export const CreateProjectsLocationsApplicationsResponse = Operation;

export type CreateProjectsLocationsApplicationsError = CommonErrors;

export const createProjectsLocationsApplications: API.OperationMethod<CreateProjectsLocationsApplicationsRequest, CreateProjectsLocationsApplicationsResponse, CreateProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApplicationsRequest,
  output: CreateProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Gets an Application in a host project and location. */
export interface GetProjectsLocationsApplicationsRequest {
  /** Required. Fully qualified name of the Application to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  name: string;
}

export const GetProjectsLocationsApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApplicationsRequest>;

export type GetProjectsLocationsApplicationsResponse = Application;
export const GetProjectsLocationsApplicationsResponse = Application;

export type GetProjectsLocationsApplicationsError = CommonErrors;

export const getProjectsLocationsApplications: API.OperationMethod<GetProjectsLocationsApplicationsRequest, GetProjectsLocationsApplicationsResponse, GetProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApplicationsRequest,
  output: GetProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Updates an Application in a host project and location. */
export interface PatchProjectsLocationsApplicationsRequest {
  /** Identifier. The resource name of an Application. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}"` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Application resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Application;
}

export const PatchProjectsLocationsApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Application).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsRequest>;

export type PatchProjectsLocationsApplicationsResponse = Operation;
export const PatchProjectsLocationsApplicationsResponse = Operation;

export type PatchProjectsLocationsApplicationsError = CommonErrors;

export const patchProjectsLocationsApplications: API.OperationMethod<PatchProjectsLocationsApplicationsRequest, PatchProjectsLocationsApplicationsResponse, PatchProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsRequest,
  output: PatchProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Deletes an Application in a host project and location. */
export interface DeleteProjectsLocationsApplicationsRequest {
  /** Required. Fully qualified name of the Application to delete. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsApplicationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsRequest>;

export type DeleteProjectsLocationsApplicationsResponse = Operation;
export const DeleteProjectsLocationsApplicationsResponse = Operation;

export type DeleteProjectsLocationsApplicationsError = CommonErrors;

export const deleteProjectsLocationsApplications: API.OperationMethod<DeleteProjectsLocationsApplicationsRequest, DeleteProjectsLocationsApplicationsResponse, DeleteProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsRequest,
  output: DeleteProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsApplicationsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsApplicationsRequest>;

export type SetIamPolicyProjectsLocationsApplicationsResponse = Policy;
export const SetIamPolicyProjectsLocationsApplicationsResponse = Policy;

export type SetIamPolicyProjectsLocationsApplicationsError = CommonErrors;

export const setIamPolicyProjectsLocationsApplications: API.OperationMethod<SetIamPolicyProjectsLocationsApplicationsRequest, SetIamPolicyProjectsLocationsApplicationsResponse, SetIamPolicyProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsApplicationsRequest,
  output: SetIamPolicyProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsApplicationsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsApplicationsRequest>;

export type GetIamPolicyProjectsLocationsApplicationsResponse = Policy;
export const GetIamPolicyProjectsLocationsApplicationsResponse = Policy;

export type GetIamPolicyProjectsLocationsApplicationsError = CommonErrors;

export const getIamPolicyProjectsLocationsApplications: API.OperationMethod<GetIamPolicyProjectsLocationsApplicationsRequest, GetIamPolicyProjectsLocationsApplicationsResponse, GetIamPolicyProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsApplicationsRequest,
  output: GetIamPolicyProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsApplicationsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsApplicationsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsApplicationsRequest>;

export type TestIamPermissionsProjectsLocationsApplicationsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsApplicationsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsApplicationsError = CommonErrors;

export const testIamPermissionsProjectsLocationsApplications: API.OperationMethod<TestIamPermissionsProjectsLocationsApplicationsRequest, TestIamPermissionsProjectsLocationsApplicationsResponse, TestIamPermissionsProjectsLocationsApplicationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsApplicationsRequest,
  output: TestIamPermissionsProjectsLocationsApplicationsResponse,
  errors: [],
}));

/** Lists Services in an Application. */
export interface ListProjectsLocationsApplicationsServicesRequest {
  /** Required. Fully qualified name of the parent Application to list Services for. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results */
  filter?: string;
  /** Optional. Hint for how to order the results */
  orderBy?: string;
}

export const ListProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsServicesRequest>;

export type ListProjectsLocationsApplicationsServicesResponse = ListServicesResponse;
export const ListProjectsLocationsApplicationsServicesResponse = ListServicesResponse;

export type ListProjectsLocationsApplicationsServicesError = CommonErrors;

export const listProjectsLocationsApplicationsServices = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsServicesRequest,
  output: ListProjectsLocationsApplicationsServicesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Service in an Application. */
export interface CreateProjectsLocationsApplicationsServicesRequest {
  /** Required. Fully qualified name of the parent Application to create the Service in. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  parent: string;
  /** Required. The Service identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  serviceId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Service;
}

export const CreateProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  serviceId: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsServicesRequest>;

export type CreateProjectsLocationsApplicationsServicesResponse = Operation;
export const CreateProjectsLocationsApplicationsServicesResponse = Operation;

export type CreateProjectsLocationsApplicationsServicesError = CommonErrors;

export const createProjectsLocationsApplicationsServices: API.OperationMethod<CreateProjectsLocationsApplicationsServicesRequest, CreateProjectsLocationsApplicationsServicesResponse, CreateProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApplicationsServicesRequest,
  output: CreateProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Gets a Service in an Application. */
export interface GetProjectsLocationsApplicationsServicesRequest {
  /** Required. Fully qualified name of the Service to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. */
  name: string;
}

export const GetProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApplicationsServicesRequest>;

export type GetProjectsLocationsApplicationsServicesResponse = Service;
export const GetProjectsLocationsApplicationsServicesResponse = Service;

export type GetProjectsLocationsApplicationsServicesError = CommonErrors;

export const getProjectsLocationsApplicationsServices: API.OperationMethod<GetProjectsLocationsApplicationsServicesRequest, GetProjectsLocationsApplicationsServicesResponse, GetProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApplicationsServicesRequest,
  output: GetProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Updates a Service in an Application. */
export interface PatchProjectsLocationsApplicationsServicesRequest {
  /** Identifier. The resource name of a Service. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/services/{service-id}"` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Service resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Service;
}

export const PatchProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Service).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsServicesRequest>;

export type PatchProjectsLocationsApplicationsServicesResponse = Operation;
export const PatchProjectsLocationsApplicationsServicesResponse = Operation;

export type PatchProjectsLocationsApplicationsServicesError = CommonErrors;

export const patchProjectsLocationsApplicationsServices: API.OperationMethod<PatchProjectsLocationsApplicationsServicesRequest, PatchProjectsLocationsApplicationsServicesResponse, PatchProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsServicesRequest,
  output: PatchProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Deletes a Service from an Application. */
export interface DeleteProjectsLocationsApplicationsServicesRequest {
  /** Required. Fully qualified name of the Service to delete from an Application. Expected format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsApplicationsServicesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/services/{servicesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsServicesRequest>;

export type DeleteProjectsLocationsApplicationsServicesResponse = Operation;
export const DeleteProjectsLocationsApplicationsServicesResponse = Operation;

export type DeleteProjectsLocationsApplicationsServicesError = CommonErrors;

export const deleteProjectsLocationsApplicationsServices: API.OperationMethod<DeleteProjectsLocationsApplicationsServicesRequest, DeleteProjectsLocationsApplicationsServicesResponse, DeleteProjectsLocationsApplicationsServicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsServicesRequest,
  output: DeleteProjectsLocationsApplicationsServicesResponse,
  errors: [],
}));

/** Lists Workloads in an Application. */
export interface ListProjectsLocationsApplicationsWorkloadsRequest {
  /** Required. Fully qualified name of the parent Application to list Workloads for. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
  /** Optional. Filtering results. */
  filter?: string;
  /** Optional. Hint for how to order the results. */
  orderBy?: string;
}

export const ListProjectsLocationsApplicationsWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/workloads" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsApplicationsWorkloadsRequest>;

export type ListProjectsLocationsApplicationsWorkloadsResponse = ListWorkloadsResponse;
export const ListProjectsLocationsApplicationsWorkloadsResponse = ListWorkloadsResponse;

export type ListProjectsLocationsApplicationsWorkloadsError = CommonErrors;

export const listProjectsLocationsApplicationsWorkloads = API.makePaginated(() => ({
  input: ListProjectsLocationsApplicationsWorkloadsRequest,
  output: ListProjectsLocationsApplicationsWorkloadsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a Workload in an Application. */
export interface CreateProjectsLocationsApplicationsWorkloadsRequest {
  /** Required. Fully qualified name of the Application to create Workload in. Expected format: `projects/{project}/locations/{location}/applications/{application}`. */
  parent: string;
  /** Required. The Workload identifier. Must contain only lowercase letters, numbers or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. */
  workloadId?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Workload;
}

export const CreateProjectsLocationsApplicationsWorkloadsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  workloadId: Schema.optional(Schema.String).pipe(T.HttpQuery("workloadId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Workload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/workloads", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsApplicationsWorkloadsRequest>;

export type CreateProjectsLocationsApplicationsWorkloadsResponse = Operation;
export const CreateProjectsLocationsApplicationsWorkloadsResponse = Operation;

export type CreateProjectsLocationsApplicationsWorkloadsError = CommonErrors;

export const createProjectsLocationsApplicationsWorkloads: API.OperationMethod<CreateProjectsLocationsApplicationsWorkloadsRequest, CreateProjectsLocationsApplicationsWorkloadsResponse, CreateProjectsLocationsApplicationsWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsApplicationsWorkloadsRequest,
  output: CreateProjectsLocationsApplicationsWorkloadsResponse,
  errors: [],
}));

/** Gets a Workload in an Application. */
export interface GetProjectsLocationsApplicationsWorkloadsRequest {
  /** Required. Fully qualified name of the Workload to fetch. Expected format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. */
  name: string;
}

export const GetProjectsLocationsApplicationsWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/workloads/{workloadsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsApplicationsWorkloadsRequest>;

export type GetProjectsLocationsApplicationsWorkloadsResponse = Workload;
export const GetProjectsLocationsApplicationsWorkloadsResponse = Workload;

export type GetProjectsLocationsApplicationsWorkloadsError = CommonErrors;

export const getProjectsLocationsApplicationsWorkloads: API.OperationMethod<GetProjectsLocationsApplicationsWorkloadsRequest, GetProjectsLocationsApplicationsWorkloadsResponse, GetProjectsLocationsApplicationsWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsApplicationsWorkloadsRequest,
  output: GetProjectsLocationsApplicationsWorkloadsResponse,
  errors: [],
}));

/** Updates a Workload in an Application. */
export interface PatchProjectsLocationsApplicationsWorkloadsRequest {
  /** Identifier. The resource name of the Workload. Format: `"projects/{host-project-id}/locations/{location}/applications/{application-id}/workloads/{workload-id}"` */
  name: string;
  /** Required. Field mask is used to specify the fields to be overwritten in the Workload resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. The API changes the values of the fields as specified in the update_mask. The API ignores the values of all fields not covered by the update_mask. You can also unset a field by not specifying it in the updated message, but adding the field to the mask. This clears whatever value the field previously had. */
  updateMask?: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
  /** Request body */
  body?: Workload;
}

export const PatchProjectsLocationsApplicationsWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
  body: Schema.optional(Workload).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/workloads/{workloadsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsApplicationsWorkloadsRequest>;

export type PatchProjectsLocationsApplicationsWorkloadsResponse = Operation;
export const PatchProjectsLocationsApplicationsWorkloadsResponse = Operation;

export type PatchProjectsLocationsApplicationsWorkloadsError = CommonErrors;

export const patchProjectsLocationsApplicationsWorkloads: API.OperationMethod<PatchProjectsLocationsApplicationsWorkloadsRequest, PatchProjectsLocationsApplicationsWorkloadsResponse, PatchProjectsLocationsApplicationsWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsApplicationsWorkloadsRequest,
  output: PatchProjectsLocationsApplicationsWorkloadsResponse,
  errors: [],
}));

/** Deletes a Workload from an Application. */
export interface DeleteProjectsLocationsApplicationsWorkloadsRequest {
  /** Required. Fully qualified name of the Workload to delete from an Application. Expected format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. */
  name: string;
  /** Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). */
  requestId?: string;
}

export const DeleteProjectsLocationsApplicationsWorkloadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/applications/{applicationsId}/workloads/{workloadsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsApplicationsWorkloadsRequest>;

export type DeleteProjectsLocationsApplicationsWorkloadsResponse = Operation;
export const DeleteProjectsLocationsApplicationsWorkloadsResponse = Operation;

export type DeleteProjectsLocationsApplicationsWorkloadsError = CommonErrors;

export const deleteProjectsLocationsApplicationsWorkloads: API.OperationMethod<DeleteProjectsLocationsApplicationsWorkloadsRequest, DeleteProjectsLocationsApplicationsWorkloadsResponse, DeleteProjectsLocationsApplicationsWorkloadsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsApplicationsWorkloadsRequest,
  output: DeleteProjectsLocationsApplicationsWorkloadsResponse,
  errors: [],
}));

/** Gets an Extended Metadata Schema. */
export interface GetProjectsLocationsExtendedMetadataSchemasRequest {
  /** Required. Schema resource name. Format: `projects/{project}/locations/{location}/extendedMetadataSchemas/{extended_metadata_schema}`. `{extended_metadata_schema}` has the format `"apphub.googleapis.com/{SchemaName}"`. */
  name: string;
}

export const GetProjectsLocationsExtendedMetadataSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/extendedMetadataSchemas/{extendedMetadataSchemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsExtendedMetadataSchemasRequest>;

export type GetProjectsLocationsExtendedMetadataSchemasResponse = ExtendedMetadataSchema;
export const GetProjectsLocationsExtendedMetadataSchemasResponse = ExtendedMetadataSchema;

export type GetProjectsLocationsExtendedMetadataSchemasError = CommonErrors;

export const getProjectsLocationsExtendedMetadataSchemas: API.OperationMethod<GetProjectsLocationsExtendedMetadataSchemasRequest, GetProjectsLocationsExtendedMetadataSchemasResponse, GetProjectsLocationsExtendedMetadataSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsExtendedMetadataSchemasRequest,
  output: GetProjectsLocationsExtendedMetadataSchemasResponse,
  errors: [],
}));

/** Lists Extended Metadata Schemas available in a host project and location. */
export interface ListProjectsLocationsExtendedMetadataSchemasRequest {
  /** Required. Project and location to list Extended Metadata Schemas on. Expected format: `projects/{project}/locations/{location}`. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. A token identifying a page of results the server should return. */
  pageToken?: string;
}

export const ListProjectsLocationsExtendedMetadataSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/extendedMetadataSchemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsExtendedMetadataSchemasRequest>;

export type ListProjectsLocationsExtendedMetadataSchemasResponse = ListExtendedMetadataSchemasResponse;
export const ListProjectsLocationsExtendedMetadataSchemasResponse = ListExtendedMetadataSchemasResponse;

export type ListProjectsLocationsExtendedMetadataSchemasError = CommonErrors;

export const listProjectsLocationsExtendedMetadataSchemas = API.makePaginated(() => ({
  input: ListProjectsLocationsExtendedMetadataSchemasRequest,
  output: ListProjectsLocationsExtendedMetadataSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

