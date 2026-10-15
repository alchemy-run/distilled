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
  sdkId: "Kinesis Video Signaling",
  serviceShapeName: "AWSAcuitySignalingService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kinesisvideo" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-04");
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
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kinesisvideo.{R}.{D}","properties":{},"headers":{}}');

export class ClientLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClientLimitExceededException>()(
    "ClientLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidClientException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientException>()(
    "InvalidClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SessionExpiredException
  extends /*@__PURE__*/ S.TaggedError<SessionExpiredException>()(
    "SessionExpiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceARN = string;
export type ClientId = string;
export type Service = "TURN" | (string & {});
export type Username = string;
export interface GetIceServerConfigRequest {
  ChannelARN?: string;
  ClientId?: string;
  Service?: Service;
  Username?: string;
}
export type Uri = string;
export type Uris = string[];
export type Password = string;
export type Ttl = number;
export interface IceServer {
  Uris?: string[];
  Username?: string;
  Password?: string | redacted.Redacted<string>;
  Ttl?: number;
}
export type IceServerList = IceServer[];
export interface GetIceServerConfigResponse {
  IceServerList?: IceServer[];
}
export type MessagePayload = string;
export interface SendAlexaOfferToMasterRequest {
  ChannelARN?: string;
  SenderClientId?: string;
  MessagePayload?: string;
}
export type Answer = string;
export interface SendAlexaOfferToMasterResponse {
  Answer?: string;
}
export type ErrorMessage = string;
export type GetIceServerConfigError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidClientException
  | NotAuthorizedException
  | ResourceNotFoundException
  | SessionExpiredException
  | CommonErrors;
/**
 * Gets the Interactive Connectivity Establishment (ICE) server configuration
 * information, including URIs, username, and password which can be used to configure the
 * WebRTC connection. The ICE component uses this configuration information to setup the
 * WebRTC connection, including authenticating with the Traversal Using Relays around NAT
 * (TURN) relay server.
 *
 * TURN is a protocol that is used to improve the connectivity of peer-to-peer
 * applications. By providing a cloud-based relay service, TURN ensures that a connection
 * can be established even when one or more peers are incapable of a direct peer-to-peer
 * connection. For more information, see A REST API For
 * Access To TURN Services.
 *
 * You can invoke this API to establish a fallback mechanism in case either of the peers
 * is unable to establish a direct peer-to-peer connection over a signaling channel. You
 * must specify either a signaling channel ARN or the client ID in order to invoke this
 * API.
 */
export const getIceServerConfig: API.OperationMethod<
  GetIceServerConfigRequest,
  GetIceServerConfigResponse,
  GetIceServerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetIceServerConfigRequest>,
  output: __S(4, __c0, 4) as any as S.Schema<GetIceServerConfigResponse>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidClientException,
    NotAuthorizedException,
    ResourceNotFoundException,
    SessionExpiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIceServerConfig",
}));

export type SendAlexaOfferToMasterError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API allows you to connect WebRTC-enabled devices with Alexa display devices. When
 * invoked, it sends the Alexa Session Description Protocol (SDP) offer to the master peer.
 * The offer is delivered as soon as the master is connected to the specified signaling
 * channel. This API returns the SDP answer from the connected master. If the master is not
 * connected to the signaling channel, redelivery requests are made until the message
 * expires.
 */
export const sendAlexaOfferToMaster: API.OperationMethod<
  SendAlexaOfferToMasterRequest,
  SendAlexaOfferToMasterResponse,
  SendAlexaOfferToMasterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<SendAlexaOfferToMasterRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<SendAlexaOfferToMasterResponse>,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAlexaOfferToMaster",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelARN: S.optional(S.String),
          ClientId: S.optional(S.String),
          Service: S.optional(S.String),
          Username: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/get-ice-server-config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIceServerConfigRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Uris: S.optional(__S(1, __c0, 1)),
          Username: S.optional(S.String),
          Password: S.optional(SensitiveString),
          Ttl: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IceServer" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() => S.Struct({ IceServerList: S.optional(__S(3, __c0, 3)) })).annotate({
        identifier: "GetIceServerConfigResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelARN: S.optional(S.String),
          SenderClientId: S.optional(S.String),
          MessagePayload: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/send-alexa-offer-to-master" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendAlexaOfferToMasterRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Answer: S.optional(S.String) })).annotate({
        identifier: "SendAlexaOfferToMasterResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
