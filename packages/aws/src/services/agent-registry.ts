import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Agent Registry",
  target: "AgentRegistry",
  version: "2025-12-01",
  sigv4: "agent-registry",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { Region, Endpoint } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      return e(Endpoint);
    }
    if (Region != null) {
      return e(`https://agent-registry.${Region}.api.aws`);
    }
    return err(
      "Unable to resolve an Agent Registry endpoint: Region was not set and no explicit Endpoint override was provided.",
    );
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type RegistryIdentifier = string;
export type RecordIdentifier = string;
export type RegistryRecordIdList = string[];
export interface RegistryRecordsEntry {
  registryId: string;
  recordIds: string[];
}
export type RegistryRecordsEntryList = RegistryRecordsEntry[];
export interface BatchGetDiscoverableRegistryRecordRequest {
  entries: RegistryRecordsEntry[];
}
export type RegistryArn = string;
export type RegistryRecordArn = string;
export type RegistryRecordId = string;
export type RegistryRecordName = string;
export type Description = string | redacted.Redacted<string>;
export type RegistryRecordDisplayName = string;
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | (string & {});
export type DescriptorData = string | redacted.Redacted<string>;
export type DataSchemaVersion = string;
export interface McpToolsDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
}
export interface McpServerAdditionalData {
  tools?: McpToolsDescriptor;
}
export type DescriptorSourceUrl = string;
export interface DescriptorSourceFromUrl {
  url: string;
}
export interface DescriptorSource {
  fromUrl?: DescriptorSourceFromUrl;
}
export interface McpServerDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: McpServerAdditionalData;
  source?: DescriptorSource;
}
export interface A2aAgentCardDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export interface AgentSkillsMdDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  source?: DescriptorSource;
}
export interface AgentSkillsAdditionalData {
  skillMd?: AgentSkillsMdDescriptor;
}
export interface AgentSkillsDefinitionDescriptor {
  data?: string | redacted.Redacted<string>;
  dataSchemaVersion?: string;
  additionalData?: AgentSkillsAdditionalData;
}
export interface CustomDescriptor {
  data?: string | redacted.Redacted<string>;
}
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
}
export type RegistryRecordVersion = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | "CREATING"
  | "UPDATING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | (string & {});
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  displayName?: string;
  recordType: RecordType;
  descriptors: Descriptors;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export type BatchGetDiscoverableRegistryRecordErrorCode =
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | (string & {});
export interface BatchGetDiscoverableRegistryRecordError_ {
  registryId: string;
  recordId: string;
  errorCode: BatchGetDiscoverableRegistryRecordErrorCode;
  message?: string;
}
export type BatchGetDiscoverableRegistryRecordErrorList =
  BatchGetDiscoverableRegistryRecordError_[];
export interface BatchGetDiscoverableRegistryRecordResponse {
  registryRecords: RegistryRecordSummary[];
  errors: BatchGetDiscoverableRegistryRecordError_[];
}
export type RegistryRecordFilterName =
  | "recordType"
  | "descriptorType"
  | (string & {});
export type FilterValue = string;
export type DiscoverableFilterValues = string[];
export interface RegistryRecordFilter {
  name: RegistryRecordFilterName;
  values: string[];
}
export type RegistryRecordFilterList = RegistryRecordFilter[];
export interface ListDiscoverableRegistryRecordsRequest {
  registryId: string;
  maxResults?: number;
  nextToken?: string;
  filters?: RegistryRecordFilter[];
}
export interface DiscoverableRegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  displayName?: string;
  recordType: RecordType;
  recordVersion: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type DiscoverableRegistryRecordSummaryList =
  DiscoverableRegistryRecordSummary[];
export interface ListDiscoverableRegistryRecordsResponse {
  registryRecords: DiscoverableRegistryRecordSummary[];
  nextToken?: string;
}
export type SearchQuery = string | redacted.Redacted<string>;
export type RegistryIdList = string[];
export type MetadataFilterExpression = unknown;
export interface SearchDiscoverableRegistryRecordsRequest {
  searchQuery: string | redacted.Redacted<string>;
  registryIds: string[];
  maxResults?: number;
  filters?: any;
}
export interface SearchDiscoverableRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
}
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetDiscoverableRegistryRecordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple discoverable registry records by ID from a single registry. Records that cannot be retrieved are reported individually in the `errors` list rather than failing the entire request.
 */
export const batchGetDiscoverableRegistryRecord: API.OperationMethod<
  BatchGetDiscoverableRegistryRecordRequest,
  BatchGetDiscoverableRegistryRecordResponse,
  BatchGetDiscoverableRegistryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /discoverable-records-batch",
    input: { entries: D.list({ registryId: 0, recordIds: 0 }) },
    output: { registryRecords: D.list(o_RegistryRecordSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDiscoverableRegistryRecord",
})) as any;

export type ListDiscoverableRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the discoverable registry records in a registry. You can optionally filter and paginate the results.
 */
export const listDiscoverableRegistryRecords: API.PaginatedOperationMethod<
  ListDiscoverableRegistryRecordsRequest,
  ListDiscoverableRegistryRecordsResponse,
  ListDiscoverableRegistryRecordsError,
  Credentials | HttpClient.HttpClient,
  DiscoverableRegistryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /registries/{registryId}/discoverable-records-list",
    input: {
      registryId: 0,
      maxResults: 0,
      nextToken: 0,
      filters: D.list({ name: 0, values: 0 }),
    },
    output: {
      registryRecords: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoverableRegistryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registryRecords",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchDiscoverableRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches the discoverable registry records in a registry using a natural language query. Returns metadata for the matching records ordered by relevance.
 */
export const searchDiscoverableRegistryRecords: API.OperationMethod<
  SearchDiscoverableRegistryRecordsRequest,
  SearchDiscoverableRegistryRecordsResponse,
  SearchDiscoverableRegistryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /discoverable-records-search",
    input: { searchQuery: 0, registryIds: 0, maxResults: 0, filters: 0 },
    output: { registryRecords: D.list(o_RegistryRecordSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDiscoverableRegistryRecords",
})) as any;

const o_RegistryRecordSummary: D.LazyStruct = () => ({
  description: D.secret,
  descriptors: {
    mcpServer: {
      data: D.secret,
      additionalData: { tools: { data: D.secret } },
    },
    a2aAgentCard: { data: D.secret },
    agentSkillsDefinition: {
      data: D.secret,
      additionalData: { skillMd: { data: D.secret } },
    },
    custom: { data: D.secret },
  },
  createdAt: D.ts,
  updatedAt: D.ts,
});
