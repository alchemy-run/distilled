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
  sdkId: "IAM Toolbox",
  target: "AuthRequestService",
  version: "2018-05-10",
  sigv4: "iam",
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
                `https://iam-toolbox-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://iam-toolbox-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export interface GetRequestAuthorizationDetailsInput {
  authorizationId: string;
  nextToken?: string;
}
export type AuthorizationContext = { [key: string]: any | undefined };
export type EvaluatedEffect =
  | "ALLOW"
  | "EXPLICIT_DENY"
  | "IMPLICIT_DENY"
  | (string & {});
export type StatementEffect = "ALLOW" | "DENY" | (string & {});
export interface MatchedStatement {
  sid?: string;
  evaluatedEffect?: StatementEffect;
}
export type MatchedStatementList = MatchedStatement[];
export interface MatchedPolicy {
  uri: string;
  matchedStatements?: MatchedStatement[];
}
export type MatchedPolicyList = MatchedPolicy[];
export interface Evaluation {
  action: string;
  resource: string;
  context?: { [key: string]: any | undefined };
  evaluatedEffect?: EvaluatedEffect;
  matchedPolicies?: MatchedPolicy[];
}
export type Evaluations = Evaluation[];
export type PolicyType =
  | "IDENTITY_BASED_POLICY"
  | "RESOURCE_BASED_POLICY"
  | "PERMISSIONS_BOUNDARY"
  | "SESSION_POLICY"
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "VPC_ENDPOINT_POLICY"
  | (string & {});
export interface AttachedTo {
  arn?: string;
}
export type AttachedToList = AttachedTo[];
export interface PolicyInfo {
  type?: PolicyType;
  inline?: boolean;
  uri?: string;
  attachedTo?: AttachedTo[];
}
export type PolicyInfoList = PolicyInfo[];
export interface GetRequestAuthorizationDetailsOutput {
  requestContext: { [key: string]: any | undefined };
  evaluations: Evaluation[];
  policies: PolicyInfo[];
  nextToken?: string;
}
export type GetRequestAuthorizationDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the authorization details for a specific access denied request. The details include the request context, the evaluations performed, and the policies that were evaluated.
 *
 * Use this operation to understand why a request was denied. Supported services include an authorization ID in the access denied error message. Pass that ID to this operation to retrieve the details.
 *
 * Authorization details are available for at least 24 hours after the denial.
 *
 * To use this operation, you must have the `iam:GetRequestAuthorizationDetails` permission.
 */
export const getRequestAuthorizationDetails: API.PaginatedOperationMethod<
  GetRequestAuthorizationDetailsInput,
  GetRequestAuthorizationDetailsOutput,
  GetRequestAuthorizationDetailsError,
  Credentials | HttpClient.HttpClient,
  Evaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /authorization-details/{authorizationId}",
    input: { authorizationId: 0, nextToken: D.m({ query: "nextToken" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestAuthorizationDetails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "evaluations",
  } as const,
})) as any;
