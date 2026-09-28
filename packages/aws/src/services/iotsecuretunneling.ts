import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "IoTSecureTunneling",
  target: "IoTSecuredTunneling",
  version: "2018-10-05",
  sigv4: "IoTSecuredTunneling",
  protocol: awsJson1_1Protocol,
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
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://api.iot-tunneling-fips.${Region}.api.aws`);
              }
              if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
                return e(
                  `https://api.iot-tunneling-fips.${Region}.api.amazonwebservices.com.cn`,
                );
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://api.iot-tunneling-fips.${Region}.api.aws`);
              }
              return e(
                `https://api.tunneling.iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://api.tunneling.iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://api.iot-tunneling.${Region}.api.aws`);
              }
              if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
                return e(
                  `https://api.iot-tunneling.${Region}.api.amazonwebservices.com.cn`,
                );
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://api.iot-tunneling.${Region}.api.aws`);
              }
              return e(
                `https://api.tunneling.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.tunneling.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type TunnelId = string;
export type DeleteFlag = boolean;
export interface CloseTunnelRequest {
  tunnelId: string;
  delete?: boolean;
}
export interface CloseTunnelResponse {}
export interface DescribeTunnelRequest {
  tunnelId: string;
}
export type TunnelArn = string;
export type TunnelStatus = "OPEN" | "CLOSED" | (string & {});
export type ConnectionStatus = "CONNECTED" | "DISCONNECTED" | (string & {});
export interface ConnectionState {
  status?: ConnectionStatus;
  lastUpdatedAt?: Date;
}
export type Description = string;
export type ThingName = string;
export type Service = string;
export type ServiceList = string[];
export interface DestinationConfig {
  thingName?: string;
  services: string[];
}
export type TimeoutInMin = number;
export interface TimeoutConfig {
  maxLifetimeTimeoutMinutes?: number;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface Tunnel {
  tunnelId?: string;
  tunnelArn?: string;
  status?: TunnelStatus;
  sourceConnectionState?: ConnectionState;
  destinationConnectionState?: ConnectionState;
  description?: string;
  destinationConfig?: DestinationConfig;
  timeoutConfig?: TimeoutConfig;
  tags?: Tag[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export interface DescribeTunnelResponse {
  tunnel?: Tunnel;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListTunnelsRequest {
  thingName?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface TunnelSummary {
  tunnelId?: string;
  tunnelArn?: string;
  status?: TunnelStatus;
  description?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type TunnelSummaryList = TunnelSummary[];
export interface ListTunnelsResponse {
  tunnelSummaries?: TunnelSummary[];
  nextToken?: string;
}
export interface OpenTunnelRequest {
  description?: string;
  tags?: Tag[];
  destinationConfig?: DestinationConfig;
  timeoutConfig?: TimeoutConfig;
}
export type ClientAccessToken = string | redacted.Redacted<string>;
export interface OpenTunnelResponse {
  tunnelId?: string;
  tunnelArn?: string;
  sourceAccessToken?: string | redacted.Redacted<string>;
  destinationAccessToken?: string | redacted.Redacted<string>;
}
export type ClientMode = "SOURCE" | "DESTINATION" | "ALL" | (string & {});
export interface RotateTunnelAccessTokenRequest {
  tunnelId: string;
  clientMode: ClientMode;
  destinationConfig?: DestinationConfig;
}
export interface RotateTunnelAccessTokenResponse {
  tunnelArn?: string;
  sourceAccessToken?: string | redacted.Redacted<string>;
  destinationAccessToken?: string | redacted.Redacted<string>;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type CloseTunnelError = ResourceNotFoundException | CommonErrors;
/**
 * Closes a tunnel identified by the unique tunnel id. When a `CloseTunnel`
 * request is received, we close the WebSocket connections between the client and proxy
 * server so no data can be transmitted.
 *
 * Requires permission to access the CloseTunnel action.
 */
export const closeTunnel: API.OperationMethod<
  CloseTunnelRequest,
  CloseTunnelResponse,
  CloseTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { tunnelId: 0, delete: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseTunnel",
})) as any;

export type DescribeTunnelError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about a tunnel identified by the unique tunnel id.
 *
 * Requires permission to access the DescribeTunnel action.
 */
export const describeTunnel: API.OperationMethod<
  DescribeTunnelRequest,
  DescribeTunnelResponse,
  DescribeTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { tunnelId: 0 },
    output: {
      tunnel: {
        sourceConnectionState: o_ConnectionState,
        destinationConnectionState: o_ConnectionState,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
      },
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTunnel",
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTunnelsError = CommonErrors;
/**
 * List all tunnels for an Amazon Web Services account. Tunnels are listed by creation time in
 * descending order, newer tunnels will be listed before older tunnels.
 *
 * Requires permission to access the ListTunnels action.
 */
export const listTunnels: API.PaginatedOperationMethod<
  ListTunnelsRequest,
  ListTunnelsResponse,
  ListTunnelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { thingName: 0, maxResults: 0, nextToken: 0 },
    output: {
      tunnelSummaries: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTunnels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type OpenTunnelError = LimitExceededException | CommonErrors;
/**
 * Creates a new tunnel, and returns two client access tokens for clients to use to
 * connect to the IoT Secure Tunneling proxy server.
 *
 * Requires permission to access the OpenTunnel action.
 */
export const openTunnel: API.OperationMethod<
  OpenTunnelRequest,
  OpenTunnelResponse,
  OpenTunnelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      description: 0,
      tags: D.list(i_Tag),
      destinationConfig: i_DestinationConfig,
      timeoutConfig: { maxLifetimeTimeoutMinutes: 0 },
    },
    output: { sourceAccessToken: D.secret, destinationAccessToken: D.secret },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OpenTunnel",
})) as any;

export type RotateTunnelAccessTokenError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Revokes the current client access token (CAT) and returns new CAT for clients to
 * use when reconnecting to secure tunneling to access the same tunnel.
 *
 * Requires permission to access the RotateTunnelAccessToken action.
 *
 * Rotating the CAT doesn't extend the tunnel duration. For example, say the tunnel
 * duration is 12 hours and the tunnel has already been open for 4 hours. When you
 * rotate the access tokens, the new tokens that are generated can only be used for the
 * remaining 8 hours.
 */
export const rotateTunnelAccessToken: API.OperationMethod<
  RotateTunnelAccessTokenRequest,
  RotateTunnelAccessTokenResponse,
  RotateTunnelAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      tunnelId: 0,
      clientMode: 0,
      destinationConfig: i_DestinationConfig,
    },
    output: { sourceAccessToken: D.secret, destinationAccessToken: D.secret },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateTunnelAccessToken",
})) as any;

export type TagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * A resource tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_DestinationConfig: D.LazyStruct = () => ({ thingName: 0, services: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_ConnectionState: D.LazyStruct = () => ({ lastUpdatedAt: D.ts });
