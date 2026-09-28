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
  sdkId: "Pca Connector Scep",
  target: "PcaConnectorScep",
  version: "2018-05-10",
  sigv4: "pca-connector-scep",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceType: string;
    readonly ServiceCode: string;
    readonly QuotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
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
export type ConnectorStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /challenges",
    input: {
      ConnectorArn: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    output: {
      Challenge: { CreatedAt: D.ts, UpdatedAt: D.ts, Password: D.secret },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /connectors",
    input: {
      CertificateAuthorityArn: 0,
      MobileDeviceManagement: { Intune: { AzureApplicationId: 0, Domain: 0 } },
      VpcEndpointId: 0,
      ClientToken: D.m({ idempotency: true }),
      Tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /challenges/{ChallengeArn}",
    input: { ChallengeArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /connectors/{ConnectorArn}",
    input: { ConnectorArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /challengeMetadata/{ChallengeArn}",
    input: { ChallengeArn: 0 },
    output: { ChallengeMetadata: { CreatedAt: D.ts, UpdatedAt: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /challengePasswords/{ChallengeArn}",
    input: { ChallengeArn: 0 },
    output: { Password: D.secret },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /connectors/{ConnectorArn}",
    input: { ConnectorArn: 0 },
    output: { Connector: { CreatedAt: D.ts, UpdatedAt: D.ts } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /challengeMetadata",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      ConnectorArn: D.m({ query: "ConnectorArn" }),
    },
    output: { Challenges: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /connectors",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Connectors: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;
