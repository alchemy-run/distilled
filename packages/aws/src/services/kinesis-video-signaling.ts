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
  sdkId: "Kinesis Video Signaling",
  target: "AWSAcuitySignalingService",
  version: "2019-12-04",
  sigv4: "kinesisvideo",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ClientLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClientLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidClientException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 401 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class SessionExpiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "SessionExpiredException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    http: "POST /v1/get-ice-server-config",
    input: { ChannelARN: 0, ClientId: 0, Service: 0, Username: 0 },
    output: { IceServerList: D.list({ Password: D.secret }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/send-alexa-offer-to-master",
    input: { ChannelARN: 0, SenderClientId: 0, MessagePayload: 0 },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAlexaOfferToMaster",
})) as any;
