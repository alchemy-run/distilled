import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "schemas",
  target: "schemas",
  version: "2019-12-02",
  sigv4: "schemas",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
              return e(
                `https://schemas-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://schemas.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://schemas.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly Code?: string; readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly Code?: string; readonly message?: string }> {}
export class GoneException
  extends /*@__PURE__*/ TE.TaggedError("GoneException", ["BadRequestError"], {
    status: 410,
  })<{ readonly Code?: string; readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly Code?: string; readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly Code?: string; readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly Code?: string; readonly message?: string }> {}
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
export interface SearchSchemaSummary {
  RegistryName?: string;
  SchemaArn?: string;
  SchemaName?: string;
  SchemaVersions?: SearchSchemaVersionSummary[];
}
export type __listOfSearchSchemaSummary = SearchSchemaSummary[];
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
  descriptor: {
    service: svc,
    http: "POST /v1/discoverers",
    input: {
      Description: 0,
      SourceArn: 0,
      CrossAccount: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/registries/name/{RegistryName}",
    input: { Description: 0, RegistryName: 0, Tags: D.m({ wire: "tags" }) },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
    input: {
      Content: 0,
      Description: 0,
      RegistryName: 0,
      SchemaName: 0,
      Tags: D.m({ wire: "tags" }),
      Type: 0,
    },
    output: {
      LastModified: D.ts,
      Tags: D.m({ wire: "tags" }),
      VersionCreatedDate: D.ts,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/discoverers/id/{DiscovererId}",
    input: { DiscovererId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/registries/name/{RegistryName}",
    input: { RegistryName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/policy",
    input: { RegistryName: D.m({ query: "registryName" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
    input: { RegistryName: 0, SchemaName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/version/{SchemaVersion}",
    input: { RegistryName: 0, SchemaName: 0, SchemaVersion: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}",
    input: {
      Language: 0,
      RegistryName: 0,
      SchemaName: 0,
      SchemaVersion: D.m({ query: "schemaVersion" }),
    },
    output: { CreationDate: D.ts, LastModified: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/discoverers/id/{DiscovererId}",
    input: { DiscovererId: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}",
    input: { RegistryName: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
    input: {
      RegistryName: 0,
      SchemaName: 0,
      SchemaVersion: D.m({ query: "schemaVersion" }),
    },
    output: {
      LastModified: D.ts,
      Tags: D.m({ wire: "tags" }),
      VersionCreatedDate: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/export",
    input: {
      RegistryName: 0,
      SchemaName: 0,
      SchemaVersion: D.m({ query: "schemaVersion" }),
      Type: D.m({ query: "type" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}/source",
    input: {
      Language: 0,
      RegistryName: 0,
      SchemaName: 0,
      SchemaVersion: D.m({ query: "schemaVersion" }),
    },
    output: { Body: D.m({ payload: true, shape: D.stream }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/discover",
    input: { Events: 0, Type: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/policy",
    input: { RegistryName: D.m({ query: "registryName" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/discoverers",
    input: {
      DiscovererIdPrefix: D.m({ query: "discovererIdPrefix" }),
      Limit: D.m({ query: "limit" }),
      NextToken: D.m({ query: "nextToken" }),
      SourceArnPrefix: D.m({ query: "sourceArnPrefix" }),
    },
    output: { Discoverers: D.list({ Tags: D.m({ wire: "tags" }) }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/registries",
    input: {
      Limit: D.m({ query: "limit" }),
      NextToken: D.m({ query: "nextToken" }),
      RegistryNamePrefix: D.m({ query: "registryNamePrefix" }),
      Scope: D.m({ query: "scope" }),
    },
    output: { Registries: D.list({ Tags: D.m({ wire: "tags" }) }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas",
    input: {
      Limit: D.m({ query: "limit" }),
      NextToken: D.m({ query: "nextToken" }),
      RegistryName: 0,
      SchemaNamePrefix: D.m({ query: "schemaNamePrefix" }),
    },
    output: {
      Schemas: D.list({ LastModified: D.ts, Tags: D.m({ wire: "tags" }) }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/versions",
    input: {
      Limit: D.m({ query: "limit" }),
      NextToken: D.m({ query: "nextToken" }),
      RegistryName: 0,
      SchemaName: 0,
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}/language/{Language}",
    input: {
      Language: 0,
      RegistryName: 0,
      SchemaName: 0,
      SchemaVersion: D.m({ query: "schemaVersion" }),
    },
    output: { CreationDate: D.ts, LastModified: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/policy",
    input: {
      Policy: 0,
      RegistryName: D.m({ query: "registryName" }),
      RevisionId: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/registries/name/{RegistryName}/schemas/search",
    input: {
      Keywords: D.m({ query: "keywords" }),
      Limit: D.m({ query: "limit" }),
      NextToken: D.m({ query: "nextToken" }),
      RegistryName: 0,
    },
    output: {
      Schemas: D.list({ SchemaVersions: D.list({ CreatedDate: D.ts }) }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/discoverers/id/{DiscovererId}/start",
    input: { DiscovererId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/discoverers/id/{DiscovererId}/stop",
    input: { DiscovererId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/discoverers/id/{DiscovererId}",
    input: { Description: 0, DiscovererId: 0, CrossAccount: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/registries/name/{RegistryName}",
    input: { Description: 0, RegistryName: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v1/registries/name/{RegistryName}/schemas/name/{SchemaName}",
    input: {
      ClientTokenId: D.m({ idempotency: true }),
      Content: 0,
      Description: 0,
      RegistryName: 0,
      SchemaName: 0,
      Type: 0,
    },
    output: {
      LastModified: D.ts,
      Tags: D.m({ wire: "tags" }),
      VersionCreatedDate: D.ts,
    },
    body: true,
  },
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
})) as any;
