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
  sdkId: "AppConfigData",
  target: "AppConfigData",
  version: "2021-11-11",
  sigv4: "appconfig",
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
                `https://appconfigdata-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://appconfigdata.${Region}.amazonaws.com`);
              }
              return e(
                `https://appconfigdata-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appconfigdata.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://appconfigdata.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{
    readonly message?: string;
    readonly Reason?: string;
    readonly Details?: BadRequestDetails;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceType?: string;
    readonly ReferencedBy?: { [key: string]: string | undefined };
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export type Token = string;
export interface GetLatestConfigurationRequest {
  ConfigurationToken: string;
}
export interface GetLatestConfigurationResponse {
  NextPollConfigurationToken?: string;
  NextPollIntervalInSeconds?: number;
  ContentType?: string;
  Configuration?: T.StreamingOutputBody;
  VersionLabel?: string;
}
export type Identifier = string;
export type OptionalPollSeconds = number;
export interface StartConfigurationSessionRequest {
  ApplicationIdentifier: string;
  EnvironmentIdentifier: string;
  ConfigurationProfileIdentifier: string;
  RequiredMinimumPollIntervalInSeconds?: number;
}
export interface StartConfigurationSessionResponse {
  InitialConfigurationToken?: string;
}
export type BadRequestReason = string;
export type InvalidParameterProblem = string;
export interface InvalidParameterDetail {
  Problem?: string;
}
export type InvalidParameterMap = {
  [key: string]: InvalidParameterDetail | undefined;
};
export type BadRequestDetails = {
  InvalidParameters: { [key: string]: InvalidParameterDetail | undefined };
};
export type ResourceType = string;
export type StringMap = { [key: string]: string | undefined };
export type GetLatestConfigurationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the latest deployed configuration. This API may return empty configuration
 * data if the client already has the latest version. For more information about this API
 * action and to view example CLI commands that show how to use it with the StartConfigurationSession API action, see Retrieving the
 * configuration in the *AppConfig User Guide*.
 *
 * Note the following important information.
 *
 * - Each configuration token is only valid for one call to
 * `GetLatestConfiguration`. The `GetLatestConfiguration`
 * response includes a `NextPollConfigurationToken` that should always
 * replace the token used for the just-completed call in preparation for the next
 * one.
 *
 * - `GetLatestConfiguration` is a priced call. For more information, see
 * Pricing.
 */
export const getLatestConfiguration: API.OperationMethod<
  GetLatestConfigurationRequest,
  GetLatestConfigurationResponse,
  GetLatestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuration",
    input: { ConfigurationToken: D.m({ query: "configuration_token" }) },
    output: {
      NextPollConfigurationToken: D.m({
        header: "Next-Poll-Configuration-Token",
      }),
      NextPollIntervalInSeconds: D.m({
        header: "Next-Poll-Interval-In-Seconds",
        shape: D.num,
      }),
      ContentType: D.m({ header: "Content-Type" }),
      Configuration: D.m({ payload: true, shape: D.stream }),
      VersionLabel: D.m({ header: "Version-Label" }),
    },
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLatestConfiguration",
})) as any;

export type StartConfigurationSessionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a configuration session used to retrieve a deployed configuration. For more
 * information about this API action and to view example CLI commands that show how to use
 * it with the GetLatestConfiguration API action, see Retrieving the
 * configuration in the *AppConfig User Guide*.
 */
export const startConfigurationSession: API.OperationMethod<
  StartConfigurationSessionRequest,
  StartConfigurationSessionResponse,
  StartConfigurationSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configurationsessions",
    input: {
      ApplicationIdentifier: 0,
      EnvironmentIdentifier: 0,
      ConfigurationProfileIdentifier: 0,
      RequiredMinimumPollIntervalInSeconds: 0,
    },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationSession",
})) as any;
