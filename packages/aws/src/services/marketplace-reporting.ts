import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Marketplace Reporting",
  target: "AWSMarketplaceReporting",
  version: "2018-05-10",
  sigv4: "aws-marketplace",
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
                `https://reporting-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://reporting-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://reporting-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://reporting-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export type DashboardIdentifier = string;
export type EmbeddingDomain = string;
export type EmbeddingDomains = string[];
export interface GetBuyerDashboardInput {
  dashboardIdentifier: string;
  embeddingDomains: string[];
}
export interface GetBuyerDashboardOutput {
  embedUrl: string;
  dashboardIdentifier: string;
  embeddingDomains: string[];
}
export type GetBuyerDashboardError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates an embedding URL for an Amazon QuickSight dashboard for an anonymous user.
 *
 * This API is available only to Amazon Web Services Organization management accounts or
 * delegated administrators registered for the procurement insights
 * (`procurement-insights.marketplace.amazonaws.com`) feature.
 *
 * The following rules apply to a generated URL:
 *
 * - It contains a temporary bearer token, valid for 5 minutes after it is generated. Once redeemed within that period, it cannot be re-used again.
 *
 * - It has a session lifetime of one hour. The 5-minute validity period runs separately from the session lifetime.
 */
export const getBuyerDashboard: API.OperationMethod<
  GetBuyerDashboardInput,
  GetBuyerDashboardOutput,
  GetBuyerDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /getBuyerDashboard",
    input: { dashboardIdentifier: 0, embeddingDomains: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuyerDashboard",
})) as any;
