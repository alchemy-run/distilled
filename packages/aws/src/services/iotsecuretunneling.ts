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
  sdkId: "IoTSecureTunneling",
  serviceShapeName: "IoTSecuredTunneling",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "IoTSecuredTunneling" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-10-05");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://api.iot-tunneling-fips.${Region}.api.aws`);
            }
            if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
              return e(`https://api.iot-tunneling-fips.${Region}.api.amazonwebservices.com.cn`);
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://api.iot-tunneling.${Region}.api.aws`);
            }
            if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
              return e(`https://api.iot-tunneling.${Region}.api.amazonwebservices.com.cn`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://api.iot-tunneling.${Region}.api.aws`);
            }
            return e(
              `https://api.tunneling.iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://api.tunneling.iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.tunneling.iot.{R}.{D}","properties":{},"headers":{}}');

export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceededException", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundException", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(0, __c0, 0) as any as S.Schema<CloseTunnelRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<CloseTunnelResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseTunnel",
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<DescribeTunnelRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<DescribeTunnelResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTunnel",
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<ListTunnelsRequest>,
  output: __S(35, __c8, 3) as any as S.Schema<ListTunnelsResponse>,
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
  input: __S(36, __c9, 0) as any as S.Schema<OpenTunnelRequest>,
  output: __S(37, __c9, 1) as any as S.Schema<OpenTunnelResponse>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OpenTunnel",
}));

export type RotateTunnelAccessTokenError = ResourceNotFoundException | CommonErrors;
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
  input: __S(40, __c10, 0) as any as S.Schema<RotateTunnelAccessTokenRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<RotateTunnelAccessTokenResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateTunnelAccessToken",
}));

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
  input: __S(44, __c11, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(48, __c12, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tunnelId: S.String.pipe(T.HttpLabel("tunnelId")),
          delete: S.optional(S.Boolean).pipe(T.HttpQuery("delete")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tunnels/{tunnelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CloseTunnelRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CloseTunnelResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tunnelId: S.String.pipe(T.HttpLabel("tunnelId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tunnels/{tunnelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeTunnelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConnectionState" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          tunnelId: S.optional(S.String),
          tunnelArn: S.optional(S.String),
          status: S.optional(S.String),
          sourceConnectionState: S.optional(__S(9, __c2, 1)),
          destinationConnectionState: S.optional(__S(9, __c2, 1)),
          description: S.optional(S.String),
          destinationConfig: S.optional(__S(20, __c5, 0)),
          timeoutConfig: S.optional(__S(16, __c4, 0)),
          tags: S.optional(__S(13, __c3, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Tunnel" });
    case 3:
      return S.suspend(() => S.Struct({ tunnel: S.optional(__S(10, __c2, 2)) })).annotate({
        identifier: "DescribeTunnelResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(12, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxLifetimeTimeoutMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "TimeoutConfig" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ thingName: S.optional(S.String), services: __S(24, __c6, 0) }),
      ).annotate({ identifier: "DestinationConfig" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(13, __c3, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/tunnels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTunnelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tunnelId: S.optional(S.String),
          tunnelArn: S.optional(S.String),
          status: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TunnelSummary" });
    case 2:
      return S.Array(__S(33, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          tunnelSummaries: S.optional(__S(34, __c8, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTunnelsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          tags: S.optional(__S(13, __c3, 1)),
          destinationConfig: S.optional(__S(20, __c5, 0)),
          timeoutConfig: S.optional(__S(16, __c4, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/tunnels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "OpenTunnelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tunnelId: S.optional(S.String),
          tunnelArn: S.optional(S.String),
          sourceAccessToken: S.optional(SensitiveString),
          destinationAccessToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "OpenTunnelResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tunnelId: S.String.pipe(T.HttpLabel("tunnelId")),
          clientMode: S.String,
          destinationConfig: S.optional(__S(20, __c5, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tunnel/{tunnelId}/rotate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RotateTunnelAccessTokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tunnelArn: S.optional(S.String),
          sourceAccessToken: S.optional(SensitiveString),
          destinationAccessToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RotateTunnelAccessTokenResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(13, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(24, __c6, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untag" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
