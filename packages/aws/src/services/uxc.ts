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
  sdkId: "uxc",
  target: "AWSAccountUXSetting",
  version: "2024-07-01",
  sigv4: "uxc",
  protocol: restJson1Protocol,
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
              `https://uxc-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://uxc.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
  descriptor: {
    service: svc,
    http: "GET /v1/account-customizations",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountCustomizations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v1/services",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "services",
  } as const,
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
  descriptor: {
    service: svc,
    http: "PATCH /v1/account-customizations",
    input: { accountColor: 0, visibleServices: 0, visibleRegions: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountCustomizations",
})) as any;
