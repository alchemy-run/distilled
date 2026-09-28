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
  sdkId: "Kinesis Video Media",
  target: "AWSAcuityInletService",
  version: "2017-09-30",
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
export class ConnectionLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConnectionLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidArgumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidEndpointException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEndpointException",
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
export type StreamName = string;
export type ResourceARN = string;
export type StartSelectorType =
  | "FRAGMENT_NUMBER"
  | "SERVER_TIMESTAMP"
  | "PRODUCER_TIMESTAMP"
  | "NOW"
  | "EARLIEST"
  | "CONTINUATION_TOKEN"
  | (string & {});
export type FragmentNumberString = string;
export type ContinuationToken = string;
export interface StartSelector {
  StartSelectorType: StartSelectorType;
  AfterFragmentNumber?: string;
  StartTimestamp?: Date;
  ContinuationToken?: string;
}
export interface GetMediaInput {
  StreamName?: string;
  StreamARN?: string;
  StartSelector: StartSelector;
}
export type ContentType = string;
export interface GetMediaOutput {
  ContentType?: string;
  Payload?: T.StreamingOutputBody;
}
export type ErrorMessage = string;
export type GetMediaError =
  | ClientLimitExceededException
  | ConnectionLimitExceededException
  | InvalidArgumentException
  | InvalidEndpointException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Use this API to retrieve media content from a Kinesis video stream. In the request,
 * you identify the stream name or stream Amazon Resource Name (ARN), and the starting chunk.
 * Kinesis Video Streams then returns a stream of chunks in order by fragment number.
 *
 * You must first call the `GetDataEndpoint` API to get an endpoint. Then
 * send the `GetMedia` requests to this endpoint using the --endpoint-url parameter.
 *
 * When you put media data (fragments) on a stream, Kinesis Video Streams stores each
 * incoming fragment and related metadata in what is called a "chunk." For more information, see
 * PutMedia. The `GetMedia` API returns a stream of these chunks starting
 * from the chunk that you specify in the request.
 *
 * The following limits apply when using the `GetMedia` API:
 *
 * - A client can call `GetMedia` up to five times per second per stream.
 *
 * - Kinesis Video Streams sends media data at a rate of up to 25 megabytes per second
 * (or 200 megabits per second) during a `GetMedia` session.
 *
 * If an error is thrown after invoking a Kinesis Video Streams media API, in addition to
 * the HTTP status code and the response body, it includes the following pieces of information:
 *
 * - `x-amz-ErrorType` HTTP header – contains a more specific error type in
 * addition to what the HTTP status code provides.
 *
 * - `x-amz-RequestId` HTTP header – if you want to report an issue to AWS,
 * the support team can better diagnose the problem if given the Request Id.
 *
 * Both the HTTP status code and the ErrorType header can be utilized to make programmatic
 * decisions about whether errors are retry-able and under what conditions, as well as provide
 * information on what actions the client programmer might need to take in order to
 * successfully try again.
 *
 * For more information, see the **Errors** section at the
 * bottom of this topic, as well as Common Errors.
 */
export const getMedia: API.OperationMethod<
  GetMediaInput,
  GetMediaOutput,
  GetMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getMedia",
    input: {
      StreamName: 0,
      StreamARN: 0,
      StartSelector: {
        StartSelectorType: 0,
        AfterFragmentNumber: 0,
        StartTimestamp: 0,
        ContinuationToken: 0,
      },
    },
    output: {
      ContentType: D.m({ header: "Content-Type" }),
      Payload: D.m({ payload: true, shape: D.stream }),
    },
    body: true,
  },
  errors: [
    ClientLimitExceededException,
    ConnectionLimitExceededException,
    InvalidArgumentException,
    InvalidEndpointException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedia",
})) as any;
