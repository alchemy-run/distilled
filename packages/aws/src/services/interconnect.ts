import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Interconnect",
  target: "Interconnect",
  version: "2022-07-26",
  sigv4: "interconnect",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://interconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://interconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export type DirectConnectGatewayAttachPoint = string;
export type AmazonResourceName = string;
export type AttachPoint =
  | { directConnectGateway: string; arn?: never }
  | { directConnectGateway?: never; arn: string };
export type ActivationKey = string | redacted.Redacted<string>;
export type ConnectionDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface AcceptConnectionProposalRequest {
  attachPoint: AttachPoint;
  activationKey: string | redacted.Redacted<string>;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type ConnectionId = string;
export type ConnectionBandwidth = string;
export type EnvironmentId = string;
export type CloudServiceProvider = string;
export type LastMileProvider = string;
export type Provider =
  | { cloudServiceProvider: string; lastMileProvider?: never }
  | { cloudServiceProvider?: never; lastMileProvider: string };
export type Location = string;
export type ProductType = string;
export type ConnectionState =
  | "available"
  | "requested"
  | "pending"
  | "down"
  | "deleting"
  | "deleted"
  | "failed"
  | "updating"
  | (string & {});
export type ConnectionSharedId = string;
export type BillingTier = number;
export type OwnerAccountId = string;
export interface Connection {
  id: string;
  arn: string;
  description: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  provider: Provider;
  location: string;
  type: string;
  state: ConnectionState;
  sharedId: string;
  billingTier?: number;
  ownerAccount: string;
  activationKey: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
}
export interface AcceptConnectionProposalResponse {
  connection?: Connection;
}
export type RemoteOwnerAccount = string;
export type RemoteAccountIdentifier = { identifier: string };
export interface CreateConnectionRequest {
  description?: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  remoteAccount?: RemoteAccountIdentifier;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface CreateConnectionResponse {
  connection?: Connection;
}
export interface DeleteConnectionRequest {
  identifier: string;
  clientToken?: string;
}
export interface DeleteConnectionResponse {
  connection: Connection;
}
export interface DescribeConnectionProposalRequest {
  activationKey: string | redacted.Redacted<string>;
}
export interface DescribeConnectionProposalResponse {
  bandwidth: string;
  environmentId: string;
  provider: Provider;
  location: string;
}
export interface GetConnectionRequest {
  identifier: string;
}
export interface GetConnectionResponse {
  connection?: Connection;
}
export interface GetEnvironmentRequest {
  id: string;
}
export type EnvironmentState =
  | "available"
  | "limited"
  | "unavailable"
  | (string & {});
export type BandwidthList = string[];
export interface Bandwidths {
  available?: string[];
  supported?: string[];
}
export type RemoteAccountIdentifierType = "account" | "email" | (string & {});
export interface Environment {
  provider: Provider;
  location: string;
  environmentId: string;
  state: EnvironmentState;
  bandwidths: Bandwidths;
  type: string;
  activationPageUrl?: string;
  remoteIdentifierType?: RemoteAccountIdentifierType;
}
export interface GetEnvironmentResponse {
  environment: Environment;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAttachPointsRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
}
export type AttachPointType = "DirectConnectGateway" | (string & {});
export interface AttachPointDescriptor {
  type: AttachPointType;
  identifier: string;
  name: string;
}
export type AttachPointDescriptorList = AttachPointDescriptor[];
export interface ListAttachPointsResponse {
  attachPoints: AttachPointDescriptor[];
  nextToken?: string;
}
export interface ListConnectionsRequest {
  maxResults?: number;
  nextToken?: string;
  state?: ConnectionState;
  environmentId?: string;
  provider?: Provider;
  attachPoint?: AttachPoint;
}
export interface ConnectionSummary {
  id: string;
  arn: string;
  description: string;
  bandwidth: string;
  attachPoint: AttachPoint;
  environmentId: string;
  provider: Provider;
  location: string;
  type: string;
  state: ConnectionState;
  sharedId: string;
  billingTier?: number;
}
export type ConnectionSummariesList = ConnectionSummary[];
export interface ListConnectionsResponse {
  connections?: ConnectionSummary[];
  nextToken?: string;
}
export interface ListEnvironmentsRequest {
  maxResults?: number;
  nextToken?: string;
  provider?: Provider;
  location?: string;
}
export type EnvironmentList = Environment[];
export interface ListEnvironmentsResponse {
  environments: Environment[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectionRequest {
  identifier: string;
  description?: string;
  bandwidth?: string;
  clientToken?: string;
}
export interface UpdateConnectionResponse {
  connection?: Connection;
}
export type AcceptConnectionProposalError = CommonErrors;
/**
 * Accepts a connection proposal which was generated at a supported partner's portal.
 *
 * The proposal contains the Environment and bandwidth that were chosen on the partner's portal and cannot be modified.
 *
 * Upon accepting the proposal a connection will be made between the AWS network as accessed via the selected Attach Point and the network previously selected network on the partner's portal.
 */
export const acceptConnectionProposal: API.OperationMethod<
  AcceptConnectionProposalRequest,
  AcceptConnectionProposalResponse,
  AcceptConnectionProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      attachPoint: i_AttachPoint,
      activationKey: 0,
      description: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { connection: o_Connection },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptConnectionProposal",
})) as any;

export type CreateConnectionError = CommonErrors;
/**
 * Initiates the process to create a Connection across the specified Environment.
 *
 * The Environment dictates the specified partner and location to which the other end of the connection should attach. You can see a list of the available Environments by calling ListEnvironments
 *
 * The Attach Point specifies where within the AWS Network your connection will logically connect.
 *
 * After a successful call to this method, the resulting Connection will return an Activation Key which will need to be brought to the specific partner's portal to confirm the Connection on both sides. (See Environment$activationPageUrl for a direct link to the partner portal).
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      description: 0,
      bandwidth: 0,
      attachPoint: i_AttachPoint,
      environmentId: 0,
      remoteAccount: { identifier: 0 },
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { connection: o_Connection },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
})) as any;

export type DeleteConnectionError = CommonErrors;
/**
 * Deletes an existing Connection with the supplied identifier.
 *
 * This operation will also inform the remote partner of your intention to delete your connection. Note, the partner may still require you to delete to fully clean up resources, but the network connectivity provided by the Connection will cease to exist.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0, clientToken: D.m({ idempotency: true }) },
    output: { connection: o_Connection },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
})) as any;

export type DescribeConnectionProposalError = CommonErrors;
/**
 * Describes the details of a connection proposal generated at a partner's portal.
 */
export const describeConnectionProposal: API.OperationMethod<
  DescribeConnectionProposalRequest,
  DescribeConnectionProposalResponse,
  DescribeConnectionProposalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { activationKey: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionProposal",
})) as any;

export type GetConnectionError = CommonErrors;
/**
 * Describes the current state of a Connection resource as specified by the identifier.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { connection: o_Connection },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

export type GetEnvironmentError = CommonErrors;
/**
 * Describes a specific Environment
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type ListAttachPointsError = CommonErrors;
/**
 * Lists all Attach Points the caller has access to that are valid for the specified Environment.
 */
export const listAttachPoints: API.PaginatedOperationMethod<
  ListAttachPointsRequest,
  ListAttachPointsResponse,
  ListAttachPointsError,
  Credentials | HttpClient.HttpClient,
  AttachPointDescriptor
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { environmentId: 0, maxResults: 0, nextToken: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachPoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attachPoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectionsError = CommonErrors;
/**
 * Lists all connection objects to which the caller has access.
 *
 * Allows for optional filtering by the following properties:
 *
 * - `state`
 *
 * - `environmentId`
 *
 * - `provider`
 *
 * - `attach point`
 *
 * Only Connection objects matching all filters will be returned.
 */
export const listConnections: API.PaginatedOperationMethod<
  ListConnectionsRequest,
  ListConnectionsResponse,
  ListConnectionsError,
  Credentials | HttpClient.HttpClient,
  ConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      maxResults: 0,
      nextToken: 0,
      state: 0,
      environmentId: 0,
      provider: i_Provider,
      attachPoint: i_AttachPoint,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "connections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnvironmentsError = CommonErrors;
/**
 * Lists all of the environments that can produce connections that will land in the called AWS region.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  Environment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, nextToken: 0, provider: i_Provider, location: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * List all current tags on the specified resource. Currently this supports Connection resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError = CommonErrors;
/**
 * Add new tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, tags: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, tagKeys: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateConnectionError = CommonErrors;
/**
 * Modifies an existing connection. Currently we support modifications to the connection's description and/or bandwidth.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      description: 0,
      bandwidth: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { connection: o_Connection },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
})) as any;

const i_AttachPoint: D.LazyStruct = () => ({ directConnectGateway: 0, arn: 0 });
const i_Provider: D.LazyStruct = () => ({
  cloudServiceProvider: 0,
  lastMileProvider: 0,
});
const o_Connection: D.LazyStruct = () => ({ activationKey: D.secret });
