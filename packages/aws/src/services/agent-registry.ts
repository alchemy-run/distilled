import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Agent Registry",
  serviceShapeName: "AgentRegistry",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "agent-registry" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p) => {
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
}, '{"url":"https://agent-registry.{R}.api.aws","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type RecordType = "MCP" | "AGENT" | "CUSTOM" | "SKILL" | "GATEWAY" | (string & {});
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
export interface HttpDescriptor {
  source?: DescriptorSource;
}
export interface AgUiDescriptor {
  source?: DescriptorSource;
}
export interface Descriptors {
  mcpServer?: McpServerDescriptor;
  a2aAgentCard?: A2aAgentCardDescriptor;
  agentSkillsDefinition?: AgentSkillsDefinitionDescriptor;
  custom?: CustomDescriptor;
  http?: HttpDescriptor;
  agui?: AgUiDescriptor;
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
export type CustomMetadataDocument = unknown;
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
  customMetadata?: any;
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
export type RegistryRecordFilterName = "recordType" | "descriptorType" | (string & {});
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
export type DescriptorTypeList = string[];
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
  descriptorTypes?: string[];
}
export type DiscoverableRegistryRecordSummaryList = DiscoverableRegistryRecordSummary[];
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
  input: __S(18, __c1, 2) as any as S.Schema<BatchGetDiscoverableRegistryRecordRequest>,
  output: __S(21, __c1, 5) as any as S.Schema<BatchGetDiscoverableRegistryRecordResponse>,
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
}));

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
  input: __S(66, __c4, 2) as any as S.Schema<ListDiscoverableRegistryRecordsRequest>,
  output: __S(69, __c4, 5) as any as S.Schema<ListDiscoverableRegistryRecordsResponse>,
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
  input: __S(80, __c5, 0) as any as S.Schema<SearchDiscoverableRegistryRecordsRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<SearchDiscoverableRegistryRecordsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ registryId: S.String, recordIds: __S(32, __c2, 0) }),
      ).annotate({ identifier: "RegistryRecordsEntry" });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ entries: __S(17, __c1, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/discoverable-records-batch" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetDiscoverableRegistryRecordRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String,
          recordId: S.String,
          errorCode: S.String,
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetDiscoverableRegistryRecordError" });
    case 4:
      return S.Array(__S(19, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ registryRecords: __S(60, __c3, 12), errors: __S(20, __c1, 4) }),
      ).annotate({ identifier: "BatchGetDiscoverableRegistryRecordResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ data: S.optional(SensitiveString), dataSchemaVersion: S.optional(S.String) }),
      ).annotate({ identifier: "McpToolsDescriptor" });
    case 1:
      return S.suspend(() => S.Struct({ tools: S.optional(__S(48, __c3, 0)) })).annotate({
        identifier: "McpServerAdditionalData",
      });
    case 2:
      return S.suspend(() => S.Struct({ url: S.String })).annotate({
        identifier: "DescriptorSourceFromUrl",
      });
    case 3:
      return S.suspend(() => S.Struct({ fromUrl: S.optional(__S(50, __c3, 2)) })).annotate({
        identifier: "DescriptorSource",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(49, __c3, 1)),
          source: S.optional(__S(51, __c3, 3)),
        }),
      ).annotate({ identifier: "McpServerDescriptor" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          source: S.optional(__S(51, __c3, 3)),
        }),
      ).annotate({ identifier: "A2aAgentCardDescriptor" });
    case 6:
      return S.suspend(() => S.Struct({ skillMd: S.optional(__S(53, __c3, 5)) })).annotate({
        identifier: "AgentSkillsAdditionalData",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          data: S.optional(SensitiveString),
          dataSchemaVersion: S.optional(S.String),
          additionalData: S.optional(__S(54, __c3, 6)),
        }),
      ).annotate({ identifier: "AgentSkillsDefinitionDescriptor" });
    case 8:
      return S.suspend(() => S.Struct({ data: S.optional(SensitiveString) })).annotate({
        identifier: "CustomDescriptor",
      });
    case 9:
      return S.suspend(() => S.Struct({ source: S.optional(__S(51, __c3, 3)) })).annotate({
        identifier: "HttpDescriptor",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          mcpServer: S.optional(__S(52, __c3, 4)),
          a2aAgentCard: S.optional(__S(53, __c3, 5)),
          agentSkillsDefinition: S.optional(__S(55, __c3, 7)),
          custom: S.optional(__S(56, __c3, 8)),
          http: S.optional(__S(57, __c3, 9)),
          agui: S.optional(__S(57, __c3, 9)),
        }),
      ).annotate({ identifier: "Descriptors" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          displayName: S.optional(S.String),
          recordType: S.String,
          descriptors: __S(58, __c3, 10),
          recordVersion: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          customMetadata: S.optional(S.Any),
        }),
      ).annotate({ identifier: "RegistryRecordSummary" });
    case 12:
      return S.Array(__S(59, __c3, 11));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(32, __c2, 0) })).annotate({
        identifier: "RegistryRecordFilter",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          registryId: S.String.pipe(T.HttpLabel("registryId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(65, __c4, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/registries/{registryId}/discoverable-records-list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDiscoverableRegistryRecordsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          displayName: S.optional(S.String),
          recordType: S.String,
          recordVersion: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          descriptorTypes: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "DiscoverableRegistryRecordSummary" });
    case 4:
      return S.Array(__S(67, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ registryRecords: __S(68, __c4, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDiscoverableRegistryRecordsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          searchQuery: SensitiveString,
          registryIds: __S(32, __c2, 0),
          maxResults: S.optional(S.Number),
          filters: S.optional(S.Any),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/discoverable-records-search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchDiscoverableRegistryRecordsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ registryRecords: __S(60, __c3, 12) })).annotate({
        identifier: "SearchDiscoverableRegistryRecordsResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
