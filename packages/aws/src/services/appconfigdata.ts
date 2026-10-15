import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "AppConfigData",
  serviceShapeName: "AppConfigData",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "appconfig" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-11-11");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appconfigdata.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://appconfigdata.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://appconfigdata.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(S.String),
      Details: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2, __c0, 2)).annotate({
          identifier: "BadRequestDetails",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      ReferencedBy: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(4, __c1, 0)).annotate({ identifier: "StringMap" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
export type InvalidParameterMap = { [key: string]: InvalidParameterDetail | undefined };
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
  input: __S(8, __c2, 0) as any as S.Schema<GetLatestConfigurationRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<GetLatestConfigurationResponse>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLatestConfiguration",
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<StartConfigurationSessionRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<StartConfigurationSessionResponse>,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConfigurationSession",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Problem: S.optional(S.String) })).annotate({
        identifier: "InvalidParameterDetail",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(0, __c0, 0).pipe(S.optional));
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ InvalidParameters: __S(1, __c0, 1) })]);
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ConfigurationToken: S.String.pipe(T.HttpQuery("configuration_token")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/configuration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetLatestConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextPollConfigurationToken: S.optional(S.String).pipe(
            T.HttpHeader("Next-Poll-Configuration-Token"),
          ),
          NextPollIntervalInSeconds: S.optional(S.Number).pipe(
            T.HttpHeader("Next-Poll-Interval-In-Seconds"),
          ),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          Configuration: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          VersionLabel: S.optional(S.String).pipe(T.HttpHeader("Version-Label")),
        }),
      ).annotate({ identifier: "GetLatestConfigurationResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApplicationIdentifier: S.String,
          EnvironmentIdentifier: S.String,
          ConfigurationProfileIdentifier: S.String,
          RequiredMinimumPollIntervalInSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/configurationsessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartConfigurationSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InitialConfigurationToken: S.optional(S.String) }),
      ).annotate({ identifier: "StartConfigurationSessionResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
