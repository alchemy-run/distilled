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
  sdkId: "Pca Connector Scep",
  serviceShapeName: "PcaConnectorScep",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "pca-connector-scep" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://pca-connector-scep-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pca-connector-scep-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://pca-connector-scep.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ConnectorArn = string;
export type ClientToken = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateChallengeRequest {
  ConnectorArn: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ChallengeArn = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface Challenge {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Password?: string | redacted.Redacted<string>;
}
export interface CreateChallengeResponse {
  Challenge?: Challenge;
}
export type CertificateAuthorityArn = string;
export type AzureApplicationId = string;
export type AzureDomain = string;
export interface IntuneConfiguration {
  AzureApplicationId: string;
  Domain: string;
}
export type MobileDeviceManagement = { Intune: IntuneConfiguration };
export type VpcEndpointId = string;
export interface CreateConnectorRequest {
  CertificateAuthorityArn: string;
  MobileDeviceManagement?: MobileDeviceManagement;
  VpcEndpointId?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateConnectorResponse {
  ConnectorArn?: string;
}
export interface DeleteChallengeRequest {
  ChallengeArn: string;
}
export interface DeleteChallengeResponse {}
export interface DeleteConnectorRequest {
  ConnectorArn: string;
}
export interface DeleteConnectorResponse {}
export interface GetChallengeMetadataRequest {
  ChallengeArn: string;
}
export interface ChallengeMetadata {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetChallengeMetadataResponse {
  ChallengeMetadata?: ChallengeMetadata;
}
export interface GetChallengePasswordRequest {
  ChallengeArn: string;
}
export interface GetChallengePasswordResponse {
  Password?: string | redacted.Redacted<string>;
}
export interface GetConnectorRequest {
  ConnectorArn: string;
}
export type ConnectorType = "GENERAL_PURPOSE" | "INTUNE" | (string & {});
export interface OpenIdConfiguration {
  Issuer?: string;
  Subject?: string;
  Audience?: string;
}
export type ConnectorStatus = "CREATING" | "ACTIVE" | "DELETING" | "FAILED" | (string & {});
export type ConnectorStatusReason =
  | "INTERNAL_FAILURE"
  | "PRIVATECA_ACCESS_DENIED"
  | "PRIVATECA_INVALID_STATE"
  | "PRIVATECA_RESOURCE_NOT_FOUND"
  | "VPC_ENDPOINT_RESOURCE_NOT_FOUND"
  | "VPC_ENDPOINT_DNS_ENTRIES_NOT_FOUND"
  | (string & {});
export interface Connector {
  Arn?: string;
  CertificateAuthorityArn?: string;
  Type?: ConnectorType;
  MobileDeviceManagement?: MobileDeviceManagement;
  OpenIdConfiguration?: OpenIdConfiguration;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  Endpoint?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetConnectorResponse {
  Connector?: Connector;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListChallengeMetadataRequest {
  MaxResults?: number;
  NextToken?: string;
  ConnectorArn: string;
}
export interface ChallengeMetadataSummary {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ChallengeMetadataList = ChallengeMetadataSummary[];
export interface ListChallengeMetadataResponse {
  Challenges?: ChallengeMetadataSummary[];
  NextToken?: string;
}
export interface ListConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ConnectorSummary {
  Arn?: string;
  CertificateAuthorityArn?: string;
  Type?: ConnectorType;
  MobileDeviceManagement?: MobileDeviceManagement;
  OpenIdConfiguration?: OpenIdConfiguration;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  Endpoint?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ConnectorList = ConnectorSummary[];
export interface ListConnectorsResponse {
  Connectors?: ConnectorSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ValidationExceptionReason =
  | "CA_CERT_VALIDITY_TOO_SHORT"
  | "INVALID_CA_USAGE_MODE"
  | "INVALID_CONNECTOR_TYPE"
  | "INVALID_STATE"
  | "NO_CLIENT_TOKEN"
  | "UNKNOWN_OPERATION"
  | "OTHER"
  | (string & {});
export type CreateChallengeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * For general-purpose connectors. Creates a *challenge password* for the specified connector. The SCEP protocol uses a challenge password to authenticate a request before issuing a certificate from a certificate authority (CA). Your SCEP clients include the challenge password as part of their certificate request to Connector for SCEP. To retrieve the connector Amazon Resource Names (ARNs) for the connectors in your account, call ListConnectors.
 *
 * To create additional challenge passwords for the connector, call `CreateChallenge` again. We recommend frequently rotating your challenge passwords.
 */
export const createChallenge: API.OperationMethod<
  CreateChallengeRequest,
  CreateChallengeResponse,
  CreateChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<CreateChallengeRequest>,
  output: __S(54, __c13, 2) as any as S.Schema<CreateChallengeResponse>,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChallenge",
}));

export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a SCEP connector. A SCEP connector links Amazon Web Services Private Certificate Authority to your SCEP-compatible devices and mobile device management (MDM) systems. Before you create a connector, you must complete a set of prerequisites, including creation of a private certificate authority (CA) to use with this connector. For more information, see Connector for SCEP prerequisites.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<CreateConnectorRequest>,
  output: __S(61, __c15, 1) as any as S.Schema<CreateConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

export type DeleteChallengeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Challenge.
 */
export const deleteChallenge: API.OperationMethod<
  DeleteChallengeRequest,
  DeleteChallengeResponse,
  DeleteChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteChallengeRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteChallengeResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChallenge",
}));

export type DeleteConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Connector. This operation also deletes any challenges associated with the connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteConnectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

export type GetChallengeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for the specified Challenge.
 */
export const getChallengeMetadata: API.OperationMethod<
  GetChallengeMetadataRequest,
  GetChallengeMetadataResponse,
  GetChallengeMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetChallengeMetadataRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<GetChallengeMetadataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChallengeMetadata",
}));

export type GetChallengePasswordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the challenge password for the specified Challenge.
 */
export const getChallengePassword: API.OperationMethod<
  GetChallengePasswordRequest,
  GetChallengePasswordResponse,
  GetChallengePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<GetChallengePasswordRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<GetChallengePasswordResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChallengePassword",
}));

export type GetConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about the specified Connector. Calling this action returns important details about the connector, such as the public SCEP URL where your clients can request certificates.
 */
export const getConnector: API.OperationMethod<
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<GetConnectorRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<GetConnectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
}));

export type ListChallengeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the challenge metadata for the specified ARN.
 */
export const listChallengeMetadata: API.PaginatedOperationMethod<
  ListChallengeMetadataRequest,
  ListChallengeMetadataResponse,
  ListChallengeMetadataError,
  Credentials | HttpClient.HttpClient,
  ChallengeMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<ListChallengeMetadataRequest>,
  output: __S(34, __c8, 2) as any as S.Schema<ListChallengeMetadataResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChallengeMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Challenges",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors belonging to your Amazon Web Services account.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<ListConnectorsRequest>,
  output: __S(38, __c9, 2) as any as S.Schema<ListConnectorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Connectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tags associated with the specified resource. Tags are key-value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to your resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from your resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(49, __c12, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/challenges/{ChallengeArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChallengeRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteChallengeResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/connectors/{ConnectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/challengeMetadata/{ChallengeArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChallengeMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChallengeMetadata: S.optional(__S(16, __c4, 0)) }),
      ).annotate({ identifier: "GetChallengeMetadataResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConnectorArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChallengeMetadata" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/challengePasswords/{ChallengeArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChallengePasswordRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Password: S.optional(SensitiveString) })).annotate({
        identifier: "GetChallengePasswordResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/connectors/{ConnectorArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Connector: S.optional(__S(29, __c7, 1)) })).annotate({
        identifier: "GetConnectorResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Issuer: S.optional(S.String),
          Subject: S.optional(S.String),
          Audience: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpenIdConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CertificateAuthorityArn: S.optional(S.String),
          Type: S.optional(S.String),
          MobileDeviceManagement: S.optional(__S(65, __c16, 1)),
          OpenIdConfiguration: S.optional(__S(28, __c7, 0)),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          Endpoint: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Connector" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          ConnectorArn: S.String.pipe(T.HttpQuery("ConnectorArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/challengeMetadata" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListChallengeMetadataRequest" });
    case 1:
      return S.Array(__S(16, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Challenges: S.optional(__S(33, __c8, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChallengeMetadataResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/connectors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 1:
      return S.Array(__S(29, __c7, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Connectors: S.optional(__S(37, __c9, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c10(j: number): any {
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
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(56, __c14, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(56, __c14, 0),
        }).pipe(
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(48, __c12, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(56, __c14, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/challenges" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateChallengeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ConnectorArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Password: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Challenge" });
    case 2:
      return S.suspend(() => S.Struct({ Challenge: S.optional(__S(53, __c13, 1)) })).annotate({
        identifier: "CreateChallengeResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityArn: S.String,
          MobileDeviceManagement: S.optional(__S(65, __c16, 1)),
          VpcEndpointId: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(56, __c14, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/connectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ConnectorArn: S.optional(S.String) })).annotate({
        identifier: "CreateConnectorResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AzureApplicationId: S.String, Domain: S.String })).annotate(
        { identifier: "IntuneConfiguration" },
      );
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Intune: __S(64, __c16, 0) })]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
