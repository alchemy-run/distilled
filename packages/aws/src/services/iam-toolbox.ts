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
  sdkId: "IAM Toolbox",
  serviceShapeName: "AuthRequestService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iam" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://iam-toolbox.{R}.{D}","properties":{},"headers":{}}');

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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface GetRequestAuthorizationDetailsInput {
  authorizationId: string;
  nextToken?: string;
}
export type AuthorizationContext = { [key: string]: any | undefined };
export type EvaluatedEffect = "ALLOW" | "EXPLICIT_DENY" | "IMPLICIT_DENY" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<GetRequestAuthorizationDetailsInput>,
  output: __S(12, __c0, 12) as any as S.Schema<GetRequestAuthorizationDetailsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestAuthorizationDetails",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "evaluations" } as const,
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizationId: S.String.pipe(T.HttpLabel("authorizationId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/authorization-details/{authorizationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRequestAuthorizationDetailsInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ sid: S.optional(S.String), evaluatedEffect: S.optional(S.String) }),
      ).annotate({ identifier: "MatchedStatement" });
    case 3:
      return S.Array(__S(2, __c0, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ uri: S.String, matchedStatements: S.optional(__S(3, __c0, 3)) }),
      ).annotate({ identifier: "MatchedPolicy" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          resource: S.String,
          context: S.optional(__S(1, __c0, 1)),
          evaluatedEffect: S.optional(S.String),
          matchedPolicies: S.optional(__S(5, __c0, 5)),
        }),
      ).annotate({ identifier: "Evaluation" });
    case 7:
      return S.Array(__S(6, __c0, 6));
    case 8:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "AttachedTo",
      });
    case 9:
      return S.Array(__S(8, __c0, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          inline: S.optional(S.Boolean),
          uri: S.optional(S.String),
          attachedTo: S.optional(__S(9, __c0, 9)),
        }),
      ).annotate({ identifier: "PolicyInfo" });
    case 11:
      return S.Array(__S(10, __c0, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          requestContext: __S(1, __c0, 1),
          evaluations: __S(7, __c0, 7),
          policies: __S(11, __c0, 11),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRequestAuthorizationDetailsOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
