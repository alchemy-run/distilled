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
  sdkId: "uxc",
  serviceShapeName: "AWSAccountUXSetting",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "uxc" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-07-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://uxc-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(`https://uxc.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://uxc.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export interface GetAccountCustomizationsInput {}
export type AccountColor =
  | "none"
  | "pink"
  | "purple"
  | "darkBlue"
  | "lightBlue"
  | "teal"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | (string & {});
export type Service = string;
export type ServiceList = string[];
export type Region = string;
export type RegionsList = string[];
export interface GetAccountCustomizationsOutput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export type NextToken = string;
export type MaxResults = number;
export interface ListServicesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ListServicesOutput {
  nextToken?: string;
  services?: string[];
}
export interface UpdateAccountCustomizationsInput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export interface UpdateAccountCustomizationsOutput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type GetAccountCustomizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current account customization settings, including account color, visible services, and visible Regions. Settings that you have not configured return their default values: visible Regions and visible services return `null`, and account color returns `none`.
 *
 * The `visibleServices` and `visibleRegions` settings control only the appearance of services and Regions in the Amazon Web Services Management Console. They do not restrict access through the CLI, SDKs, or other APIs.
 */
export const getAccountCustomizations: API.OperationMethod<
  GetAccountCustomizationsInput,
  GetAccountCustomizationsOutput,
  GetAccountCustomizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c1, 0) as any as S.Schema<GetAccountCustomizationsInput>,
  output: __S(6, __c3, 0) as any as S.Schema<GetAccountCustomizationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountCustomizations",
}));

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of Amazon Web Services service identifiers that you can use as values for the `visibleServices` setting in UpdateAccountCustomizations. The available services vary by Amazon Web Services partition. Use pagination to retrieve all results.
 *
 * The `visibleServices` setting controls only the appearance of services in the Amazon Web Services Management Console. It does not restrict access through the CLI, SDKs, or other APIs.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c4, 0) as any as S.Schema<ListServicesInput>,
  output: __S(9, __c4, 1) as any as S.Schema<ListServicesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "services" } as const,
})) as any;

export type UpdateAccountCustomizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates one or more account customization settings. You can update account color, visible services, and visible Regions in a single request. Only the settings that you include in the request body are modified. Omitted settings remain unchanged. To reset a setting to its default behavior, set the value to `null` for visible Regions and visible services, or `none` for account color. This operation is idempotent.
 *
 * The `visibleServices` and `visibleRegions` settings control only the appearance of services and Regions in the Amazon Web Services Management Console. They do not restrict access through the CLI, SDKs, or other APIs.
 */
export const updateAccountCustomizations: API.OperationMethod<
  UpdateAccountCustomizationsInput,
  UpdateAccountCustomizationsOutput,
  UpdateAccountCustomizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(10, __c5, 0) as any as S.Schema<UpdateAccountCustomizationsInput>,
  output: __S(6, __c3, 0) as any as S.Schema<UpdateAccountCustomizationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountCustomizations",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/account-customizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountCustomizationsInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountColor: S.optional(S.String),
          visibleServices: S.optional(__S(4, __c2, 0)),
          visibleRegions: S.optional(__S(4, __c2, 0)),
        }),
      ).annotate({ identifier: "GetAccountCustomizationsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/services" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), services: S.optional(__S(4, __c2, 0)) }),
      ).annotate({ identifier: "ListServicesOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountColor: S.optional(S.String),
          visibleServices: S.optional(__S(4, __c2, 0)),
          visibleRegions: S.optional(__S(4, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/account-customizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountCustomizationsInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
