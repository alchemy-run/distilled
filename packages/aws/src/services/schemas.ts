import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "schemas", serviceShapeName: "schemas" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "schemas" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-02");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://schemas-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://schemas-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://schemas.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://schemas.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://schemas.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GoneException
  extends /*@__PURE__*/ S.TaggedError<GoneException>()(
    "GoneException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    {
      Code: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type __stringMin0Max256 = string;
export type __stringMin20Max1600 = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateDiscovererRequest {
  Description?: string;
  SourceArn?: string;
  CrossAccount?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export type DiscovererState = "STARTED" | "STOPPED" | (string & {});
export interface CreateDiscovererResponse {
  Description?: string;
  DiscovererArn?: string;
  DiscovererId?: string;
  SourceArn?: string;
  State?: DiscovererState;
  CrossAccount?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRegistryRequest {
  Description?: string;
  RegistryName: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRegistryResponse {
  Description?: string;
  RegistryArn?: string;
  RegistryName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin1Max100000 = string;
export type Type = "OpenApi3" | "JSONSchemaDraft4" | (string & {});
export interface CreateSchemaRequest {
  Content?: string;
  Description?: string;
  RegistryName: string;
  SchemaName: string;
  Tags?: { [key: string]: string | undefined };
  Type?: Type;
}
export type __timestampIso8601 = Date;
export interface CreateSchemaResponse {
  Description?: string;
  LastModified?: Date;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersion?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  VersionCreatedDate?: Date;
}
export interface DeleteDiscovererRequest {
  DiscovererId: string;
}
export interface DeleteDiscovererResponse {}
export interface DeleteRegistryRequest {
  RegistryName: string;
}
export interface DeleteRegistryResponse {}
export interface DeleteResourcePolicyRequest {
  RegistryName?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteSchemaRequest {
  RegistryName: string;
  SchemaName: string;
}
export interface DeleteSchemaResponse {}
export interface DeleteSchemaVersionRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion: string;
}
export interface DeleteSchemaVersionResponse {}
export interface DescribeCodeBindingRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string;
}
export type CodeGenerationStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | (string & {});
export interface DescribeCodeBindingResponse {
  CreationDate?: Date;
  LastModified?: Date;
  SchemaVersion?: string;
  Status?: CodeGenerationStatus;
}
export interface DescribeDiscovererRequest {
  DiscovererId: string;
}
export interface DescribeDiscovererResponse {
  Description?: string;
  DiscovererArn?: string;
  DiscovererId?: string;
  SourceArn?: string;
  State?: DiscovererState;
  CrossAccount?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeRegistryRequest {
  RegistryName: string;
}
export interface DescribeRegistryResponse {
  Description?: string;
  RegistryArn?: string;
  RegistryName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeSchemaRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string;
}
export interface DescribeSchemaResponse {
  Content?: string;
  Description?: string;
  LastModified?: Date;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersion?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  VersionCreatedDate?: Date;
}
export interface ExportSchemaRequest {
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string;
  Type?: string;
}
export interface ExportSchemaResponse {
  Content?: string;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersion?: string;
  Type?: string;
}
export interface GetCodeBindingSourceRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string;
}
export interface GetCodeBindingSourceResponse {
  Body?: T.StreamingOutputBody;
}
export type GetDiscoveredSchemaVersionItemInput = string;
export type __listOfGetDiscoveredSchemaVersionItemInput = string[];
const __listOfGetDiscoveredSchemaVersionItemInput = /*@__PURE__*/ __L.at(__c21, 0);
export interface GetDiscoveredSchemaRequest {
  Events?: string[];
  Type?: Type;
}
export interface GetDiscoveredSchemaResponse {
  Content?: string;
}
export interface GetResourcePolicyRequest {
  RegistryName?: string;
}
export type SynthesizedJson__string = string;
export interface GetResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface ListDiscoverersRequest {
  DiscovererIdPrefix?: string;
  Limit?: number;
  NextToken?: string;
  SourceArnPrefix?: string;
}
export interface DiscovererSummary {
  DiscovererArn?: string;
  DiscovererId?: string;
  SourceArn?: string;
  State?: DiscovererState;
  CrossAccount?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfDiscovererSummary = DiscovererSummary[];
const __listOfDiscovererSummary = /*@__PURE__*/ __L.at(__c24, 2);
export interface ListDiscoverersResponse {
  Discoverers?: DiscovererSummary[];
  NextToken?: string;
}
export interface ListRegistriesRequest {
  Limit?: number;
  NextToken?: string;
  RegistryNamePrefix?: string;
  Scope?: string;
}
export interface RegistrySummary {
  RegistryArn?: string;
  RegistryName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfRegistrySummary = RegistrySummary[];
const __listOfRegistrySummary = /*@__PURE__*/ __L.at(__c25, 2);
export interface ListRegistriesResponse {
  NextToken?: string;
  Registries?: RegistrySummary[];
}
export interface ListSchemasRequest {
  Limit?: number;
  NextToken?: string;
  RegistryName: string;
  SchemaNamePrefix?: string;
}
export interface SchemaSummary {
  LastModified?: Date;
  SchemaArn?: string;
  SchemaName?: string;
  Tags?: { [key: string]: string | undefined };
  VersionCount?: number;
}
export type __listOfSchemaSummary = SchemaSummary[];
const __listOfSchemaSummary = /*@__PURE__*/ __L.at(__c26, 2);
export interface ListSchemasResponse {
  NextToken?: string;
  Schemas?: SchemaSummary[];
}
export interface ListSchemaVersionsRequest {
  Limit?: number;
  NextToken?: string;
  RegistryName: string;
  SchemaName: string;
}
export interface SchemaVersionSummary {
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersion?: string;
  Type?: Type;
}
export type __listOfSchemaVersionSummary = SchemaVersionSummary[];
const __listOfSchemaVersionSummary = /*@__PURE__*/ __L.at(__c27, 2);
export interface ListSchemaVersionsResponse {
  NextToken?: string;
  SchemaVersions?: SchemaVersionSummary[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PutCodeBindingRequest {
  Language: string;
  RegistryName: string;
  SchemaName: string;
  SchemaVersion?: string;
}
export interface PutCodeBindingResponse {
  CreationDate?: Date;
  LastModified?: Date;
  SchemaVersion?: string;
  Status?: CodeGenerationStatus;
}
export interface PutResourcePolicyRequest {
  Policy?: string;
  RegistryName?: string;
  RevisionId?: string;
}
export interface PutResourcePolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export interface SearchSchemasRequest {
  Keywords?: string;
  Limit?: number;
  NextToken?: string;
  RegistryName: string;
}
export interface SearchSchemaVersionSummary {
  CreatedDate?: Date;
  SchemaVersion?: string;
  Type?: Type;
}
export type __listOfSearchSchemaVersionSummary = SearchSchemaVersionSummary[];
const __listOfSearchSchemaVersionSummary = /*@__PURE__*/ __L.at(__c31, 2);
export interface SearchSchemaSummary {
  RegistryName?: string;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersions?: SearchSchemaVersionSummary[];
}
export type __listOfSearchSchemaSummary = SearchSchemaSummary[];
const __listOfSearchSchemaSummary = /*@__PURE__*/ __L.at(__c31, 4);
export interface SearchSchemasResponse {
  NextToken?: string;
  Schemas?: SearchSchemaSummary[];
}
export interface StartDiscovererRequest {
  DiscovererId: string;
}
export interface StartDiscovererResponse {
  DiscovererId?: string;
  State?: DiscovererState;
}
export interface StopDiscovererRequest {
  DiscovererId: string;
}
export interface StopDiscovererResponse {
  DiscovererId?: string;
  State?: DiscovererState;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type __listOf__string = string[];
const __listOf__string =
  __listOfGetDiscoveredSchemaVersionItemInput as any as S.Schema<__listOf__string>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDiscovererRequest {
  Description?: string;
  DiscovererId: string;
  CrossAccount?: boolean;
}
export interface UpdateDiscovererResponse {
  Description?: string;
  DiscovererArn?: string;
  DiscovererId?: string;
  SourceArn?: string;
  State?: DiscovererState;
  CrossAccount?: boolean;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateRegistryRequest {
  Description?: string;
  RegistryName: string;
}
export interface UpdateRegistryResponse {
  Description?: string;
  RegistryArn?: string;
  RegistryName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringMin0Max36 = string;
export interface UpdateSchemaRequest {
  ClientTokenId?: string;
  Content?: string;
  Description?: string;
  RegistryName: string;
  SchemaName: string;
  Type?: Type;
}
export interface UpdateSchemaResponse {
  Description?: string;
  LastModified?: Date;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersion?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  VersionCreatedDate?: Date;
}
export type CreateDiscovererError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a discoverer.
 */
export const createDiscoverer: API.OperationMethod<
  CreateDiscovererRequest,
  CreateDiscovererResponse,
  CreateDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDiscovererRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateDiscovererResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDiscoverer",
}));

export type CreateRegistryError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a registry.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryRequest,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateRegistryRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<CreateRegistryResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistry",
}));

export type CreateSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a schema definition.
 *
 * Inactive schemas will be deleted after two years.
 */
export const createSchema: API.OperationMethod<
  CreateSchemaRequest,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<CreateSchemaRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<CreateSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
}));

export type DeleteDiscovererError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a discoverer.
 */
export const deleteDiscoverer: API.OperationMethod<
  DeleteDiscovererRequest,
  DeleteDiscovererResponse,
  DeleteDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteDiscovererRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteDiscovererResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDiscoverer",
}));

export type DeleteRegistryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a Registry.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryRequest,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<DeleteRegistryRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteRegistryResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistry",
}));

export type DeleteResourcePolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Delete the resource-based policy attached to the specified registry.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Delete a schema definition.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaRequest,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteSchemaRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
}));

export type DeleteSchemaVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Delete the schema version definition
 */
export const deleteSchemaVersion: API.OperationMethod<
  DeleteSchemaVersionRequest,
  DeleteSchemaVersionResponse,
  DeleteSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteSchemaVersionRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<DeleteSchemaVersionResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchemaVersion",
}));

export type DescribeCodeBindingError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describe the code binding URI.
 */
export const describeCodeBinding: API.OperationMethod<
  DescribeCodeBindingRequest,
  DescribeCodeBindingResponse,
  DescribeCodeBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DescribeCodeBindingRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DescribeCodeBindingResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCodeBinding",
}));

export type DescribeDiscovererError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes the discoverer.
 */
export const describeDiscoverer: API.OperationMethod<
  DescribeDiscovererRequest,
  DescribeDiscovererResponse,
  DescribeDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DescribeDiscovererRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<DescribeDiscovererResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDiscoverer",
}));

export type DescribeRegistryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes the registry.
 */
export const describeRegistry: API.OperationMethod<
  DescribeRegistryRequest,
  DescribeRegistryResponse,
  DescribeRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DescribeRegistryRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<DescribeRegistryResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistry",
}));

export type DescribeSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieve the schema definition.
 */
export const describeSchema: API.OperationMethod<
  DescribeSchemaRequest,
  DescribeSchemaResponse,
  DescribeSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DescribeSchemaRequest>,
  output: __S(137, __c17, 1) as any as S.Schema<DescribeSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchema",
}));

export type ExportSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 *
 */
export const exportSchema: API.OperationMethod<
  ExportSchemaRequest,
  ExportSchemaResponse,
  ExportSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ExportSchemaRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<ExportSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSchema",
}));

export type GetCodeBindingSourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get the code binding source URI.
 */
export const getCodeBindingSource: API.OperationMethod<
  GetCodeBindingSourceRequest,
  GetCodeBindingSourceResponse,
  GetCodeBindingSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<GetCodeBindingSourceRequest>,
  output: __S(153, __c19, 1) as any as S.Schema<GetCodeBindingSourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeBindingSource",
}));

export type GetDiscoveredSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Get the discovered schema that was generated based on sampled events.
 */
export const getDiscoveredSchema: API.OperationMethod<
  GetDiscoveredSchemaRequest,
  GetDiscoveredSchemaResponse,
  GetDiscoveredSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<GetDiscoveredSchemaRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<GetDiscoveredSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDiscoveredSchema",
}));

export type GetResourcePolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a given registry.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListDiscoverersError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the discoverers.
 */
export const listDiscoverers: API.PaginatedOperationMethod<
  ListDiscoverersRequest,
  ListDiscoverersResponse,
  ListDiscoverersError,
  Credentials | HttpClient.HttpClient,
  DiscovererSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListDiscoverersRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListDiscoverersResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoverers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Discoverers",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListRegistriesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the registries.
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesRequest,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistrySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListRegistriesRequest>,
  output: __S(203, __c25, 3) as any as S.Schema<ListRegistriesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Registries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListSchemasError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the schemas.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  SchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<ListSchemasRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<ListSchemasResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListSchemaVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Provides a list of the schema versions and related information.
 */
export const listSchemaVersions: API.PaginatedOperationMethod<
  ListSchemaVersionsRequest,
  ListSchemaVersionsResponse,
  ListSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  SchemaVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListSchemaVersionsRequest>,
  output: __S(219, __c27, 3) as any as S.Schema<ListSchemaVersionsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SchemaVersions",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Get tags for resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(225, __c28, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutCodeBindingError =
  | BadRequestException
  | ForbiddenException
  | GoneException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | ConflictException
  | CommonErrors;
/**
 * Put code binding URI
 */
export const putCodeBinding: API.OperationMethod<
  PutCodeBindingRequest,
  PutCodeBindingResponse,
  PutCodeBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<PutCodeBindingRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<PutCodeBindingResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    GoneException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCodeBinding",
}));

export type PutResourcePolicyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | PreconditionFailedException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * The name of the policy.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    PreconditionFailedException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type SearchSchemasError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Search the schemas
 */
export const searchSchemas: API.PaginatedOperationMethod<
  SearchSchemasRequest,
  SearchSchemasResponse,
  SearchSchemasError,
  Credentials | HttpClient.HttpClient,
  SearchSchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<SearchSchemasRequest>,
  output: __S(253, __c31, 5) as any as S.Schema<SearchSchemasResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "Limit",
  } as const,
})) as any;

export type StartDiscovererError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Starts the discoverer
 */
export const startDiscoverer: API.OperationMethod<
  StartDiscovererRequest,
  StartDiscovererResponse,
  StartDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<StartDiscovererRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<StartDiscovererResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDiscoverer",
}));

export type StopDiscovererError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Stops the discoverer
 */
export const stopDiscoverer: API.OperationMethod<
  StopDiscovererRequest,
  StopDiscovererResponse,
  StopDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<StopDiscovererRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<StopDiscovererResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDiscoverer",
}));

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Add tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(64, __c8, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDiscovererError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the discoverer
 */
export const updateDiscoverer: API.OperationMethod<
  UpdateDiscovererRequest,
  UpdateDiscovererResponse,
  UpdateDiscovererError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateDiscovererRequest>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateDiscovererResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDiscoverer",
}));

export type UpdateRegistryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a registry.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryRequest,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateRegistryRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<UpdateRegistryResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistry",
}));

export type UpdateSchemaError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Updates the schema definition
 *
 * Inactive schemas will be deleted after two years.
 */
export const updateSchema: API.OperationMethod<
  UpdateSchemaRequest,
  UpdateSchemaResponse,
  UpdateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<UpdateSchemaRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateSchemaResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchema",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          SourceArn: S.optional(S.String),
          CrossAccount: S.optional(S.Boolean),
          Tags: S.optional(__S(8, __c1, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/v1/discoverers" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateDiscovererRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DiscovererArn: S.optional(S.String),
          DiscovererId: S.optional(S.String),
          SourceArn: S.optional(S.String),
          State: S.optional(S.String),
          CrossAccount: S.optional(S.Boolean),
          Tags: S.optional(__S(8, __c1, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateDiscovererResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          Tags: S.optional(__S(8, __c1, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/v1/registries/name/{RegistryName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateRegistryRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          RegistryArn: S.optional(S.String),
          RegistryName: S.optional(S.String),
          Tags: S.optional(__S(8, __c1, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateRegistryResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(S.String),
          Description: S.optional(S.String),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          Tags: S.optional(__S(8, __c1, 0)),
          Type: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({
                method: "POST",
                uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
              }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateSchemaRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          Tags: S.optional(__S(8, __c1, 0)),
          Type: S.optional(S.String),
          VersionCreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "CreateSchemaResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DiscovererId: S.String.pipe(T.HttpLabel("DiscovererId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/discoverers/id/{DiscovererId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDiscovererRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteDiscovererResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryName: S.String.pipe(T.HttpLabel("RegistryName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/registries/name/{RegistryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRegistryRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryName: S.optional(S.String).pipe(T.HttpQuery("registryName")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSchemaRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.String.pipe(T.HttpLabel("SchemaVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/version/{SchemaVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSchemaVersionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Language: S.String.pipe(T.HttpLabel("Language")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.optional(S.String).pipe(T.HttpQuery("schemaVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeCodeBindingRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreationDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SchemaVersion: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeCodeBindingResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DiscovererId: S.String.pipe(T.HttpLabel("DiscovererId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/discoverers/id/{DiscovererId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDiscovererRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryName: S.String.pipe(T.HttpLabel("RegistryName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/registries/name/{RegistryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRegistryRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.optional(S.String).pipe(T.HttpQuery("schemaVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSchemaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(S.String),
          Description: S.optional(S.String),
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          Tags: S.optional(__S(8, __c1, 0)),
          Type: S.optional(S.String),
          VersionCreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "DescribeSchemaResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.optional(S.String).pipe(T.HttpQuery("schemaVersion")),
          Type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/export",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportSchemaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Content: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExportSchemaResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Language: S.String.pipe(T.HttpLabel("Language")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.optional(S.String).pipe(T.HttpQuery("schemaVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}/source",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeBindingSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "GetCodeBindingSourceResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Events: S.optional(__listOfGetDiscoveredSchemaVersionItemInput),
          Type: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/discover" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDiscoveredSchemaRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Content: S.optional(S.String) })).annotate({
        identifier: "GetDiscoveredSchemaResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegistryName: S.optional(S.String).pipe(T.HttpQuery("registryName")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DiscovererIdPrefix: S.optional(S.String).pipe(T.HttpQuery("discovererIdPrefix")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          SourceArnPrefix: S.optional(S.String).pipe(T.HttpQuery("sourceArnPrefix")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/discoverers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDiscoverersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DiscovererArn: S.optional(S.String),
          DiscovererId: S.optional(S.String),
          SourceArn: S.optional(S.String),
          State: S.optional(S.String),
          CrossAccount: S.optional(S.Boolean),
          Tags: S.optional(__S(8, __c1, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "DiscovererSummary" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Discoverers: S.optional(__listOfDiscovererSummary),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDiscoverersResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RegistryNamePrefix: S.optional(S.String).pipe(T.HttpQuery("registryNamePrefix")),
          Scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/registries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegistriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RegistryArn: S.optional(S.String),
          RegistryName: S.optional(S.String),
          Tags: S.optional(__S(8, __c1, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "RegistrySummary" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Registries: S.optional(__listOfRegistrySummary),
        }),
      ).annotate({ identifier: "ListRegistriesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaNamePrefix: S.optional(S.String).pipe(T.HttpQuery("schemaNamePrefix")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/registries/name/{RegistryName}/schemas" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSchemasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LastModified: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          Tags: S.optional(__S(8, __c1, 0)),
          VersionCount: S.optional(S.Number),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "SchemaSummary" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Schemas: S.optional(__listOfSchemaSummary) }),
      ).annotate({ identifier: "ListSchemasResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSchemaVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaVersion: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "SchemaVersionSummary" });
    case 2:
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SchemaVersions: S.optional(__listOfSchemaVersionSummary),
        }),
      ).annotate({ identifier: "ListSchemaVersionsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(8, __c1, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Language: S.String.pipe(T.HttpLabel("Language")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          SchemaVersion: S.optional(S.String).pipe(T.HttpQuery("schemaVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutCodeBindingRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Policy: S.optional(S.String),
          RegistryName: S.optional(S.String).pipe(T.HttpQuery("registryName")),
          RevisionId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/v1/policy" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Keywords: S.optional(S.String).pipe(T.HttpQuery("keywords")),
          Limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/registries/name/{RegistryName}/schemas/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchSchemasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SchemaVersion: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchSchemaVersionSummary" });
    case 2:
      return S.Array(__S(249, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RegistryName: S.optional(S.String),
          SchemaArn: S.optional(S.String),
          SchemaName: S.optional(S.String),
          SchemaVersions: S.optional(__listOfSearchSchemaVersionSummary),
        }),
      ).annotate({ identifier: "SearchSchemaSummary" });
    case 4:
      return S.Array(__S(251, __c31, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Schemas: S.optional(__listOfSearchSchemaSummary),
        }),
      ).annotate({ identifier: "SearchSchemasResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DiscovererId: S.String.pipe(T.HttpLabel("DiscovererId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/discoverers/id/{DiscovererId}/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDiscovererRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DiscovererId: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "StartDiscovererResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DiscovererId: S.String.pipe(T.HttpLabel("DiscovererId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/discoverers/id/{DiscovererId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopDiscovererRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(8, __c1, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          DiscovererId: S.String.pipe(T.HttpLabel("DiscovererId")),
          CrossAccount: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/discoverers/id/{DiscovererId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDiscovererRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/registries/name/{RegistryName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRegistryRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientTokenId: S.optional(S.String).pipe(T.IdempotencyToken()),
          Content: S.optional(S.String),
          Description: S.optional(S.String),
          RegistryName: S.String.pipe(T.HttpLabel("RegistryName")),
          SchemaName: S.String.pipe(T.HttpLabel("SchemaName")),
          Type: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSchemaRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
