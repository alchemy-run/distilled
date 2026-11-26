import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "IAMToolbox",
  service: "IAMToolbox",
  propagate: TxXray.propagate,
} as const;

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
  ).pipe(C.withServerError, C.withRetryableError) {}
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
export type AuthorizationId = string;
export interface GetRequestAuthorizationDetailsInput {
  authorizationId: string;
  nextToken?: string | undefined;
}
export type AuthorizationContext = { [key: string]: any | undefined };
export type EvaluatedEffect = "ALLOW" | "EXPLICIT_DENY" | "IMPLICIT_DENY" | (string & {});
export type StatementEffect = "ALLOW" | "DENY" | (string & {});
export interface MatchedStatement {
  sid?: string | undefined;
  evaluatedEffect?: StatementEffect | undefined;
}
export type MatchedStatementList = MatchedStatement[];
export interface MatchedPolicy {
  uri: string;
  matchedStatements?: MatchedStatement[] | undefined;
}
export type MatchedPolicyList = MatchedPolicy[];
export type CheckType =
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "VPC_ENDPOINT"
  | "RESOURCE"
  | "PRINCIPAL"
  | "PERMISSIONS_BOUNDARY"
  | "SESSION"
  | (string & {});
export type CheckEffect = "ALLOW" | "NO_IMPACT" | "IMPLICIT_DENY" | "EXPLICIT_DENY" | (string & {});
export type PolicyType =
  | "IDENTITY_BASED_POLICY"
  | "RESOURCE_BASED_POLICY"
  | "PERMISSIONS_BOUNDARY"
  | "SESSION_POLICY"
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "VPC_ENDPOINT_POLICY"
  | (string & {});
export type PolicyTypeList = PolicyType[];
export interface Check {
  checkType: CheckType;
  evaluatedEffect: CheckEffect;
  targetArn?: string | undefined;
  relevantPolicyTypes?: PolicyType[] | undefined;
  matchedPolicies?: MatchedPolicy[] | undefined;
}
export type CheckList = Check[];
export interface Evaluation {
  action: string;
  resource: string;
  context?: { [key: string]: any | undefined } | undefined;
  evaluatedEffect?: EvaluatedEffect | undefined;
  matchedPolicies?: MatchedPolicy[] | undefined;
  checks?: Check[] | undefined;
}
export type Evaluations = Evaluation[];
export interface AttachedTo {
  arn?: string | undefined;
}
export type AttachedToList = AttachedTo[];
export type PolicySource = { [key: string]: string | undefined };
export interface PolicyInfo {
  type?: PolicyType | undefined;
  inline?: boolean | undefined;
  uri?: string | undefined;
  attachedTo?: AttachedTo[] | undefined;
  policySource?: { [key: string]: string | undefined } | undefined;
}
export type PolicyInfoList = PolicyInfo[];
export interface GetRequestAuthorizationDetailsOutput {
  requestContext: { [key: string]: any | undefined };
  evaluations: Evaluation[];
  policies: PolicyInfo[];
  nextToken?: string | undefined;
}
export type PolicyUri = string;
export interface GetRequestAuthorizationPolicyInput {
  authorizationId: string;
  policyUri: string;
}
export interface GetRequestAuthorizationPolicyOutput {
  policyDocument: any;
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
 * To retrieve the content for a policy in the `policies` list, call `GetRequestAuthorizationPolicy`.
 *
 * Authorization details are available for at least 24 hours after the denial.
 *
 * To use this operation, you must have the `iam:GetRequestAuthorizationDetails` permission.
 */
export const getRequestAuthorizationDetails: API.PaginatedOperationMethod<
  GetRequestAuthorizationDetailsInput & RegionInput,
  GetRequestAuthorizationDetailsOutput,
  GetRequestAuthorizationDetailsError,
  Credentials | HttpClient.HttpClient,
  Evaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetRequestAuthorizationDetailsInput>,
  output: __S(16, __c0, 16) as any as S.Schema<GetRequestAuthorizationDetailsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestAuthorizationDetails",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "evaluations" } as const,
  telemetry: TELEMETRY,
  span: "GetRequestAuthorizationDetails",
})) as any;

export type GetRequestAuthorizationPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a policy that was evaluated for a specific access denied request. The operation returns the structured JSON document of the policy that was captured with the original authorization request. It doesn't retrieve the current version of the policy.
 *
 * For some AWS services and policy types, the returned policy document includes all actions relevant to the service that processed the denied request, but might omit actions for other services.
 *
 * Specify the authorization ID from the access denied error message and the policy URI returned by `GetRequestAuthorizationDetails` for the same authorization ID.
 *
 * Access depends on the account and organization recorded for the principal that made the denied request. If an organization was recorded, the calling principal must belong to that organization. Otherwise, the calling principal must belong to the recorded account.
 *
 * To use this operation, you must have the `iam:GetRequestAuthorizationPolicy` permission.
 */
export const getRequestAuthorizationPolicy: API.OperationMethod<
  GetRequestAuthorizationPolicyInput & RegionInput,
  GetRequestAuthorizationPolicyOutput,
  GetRequestAuthorizationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<GetRequestAuthorizationPolicyInput>,
  output: __S(33, __c1, 1) as any as S.Schema<GetRequestAuthorizationPolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestAuthorizationPolicy",
  telemetry: TELEMETRY,
  span: "GetRequestAuthorizationPolicy",
}));

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
      return S.Array(S.String);
    case 7:
      return S.suspend(() =>
        S.Struct({
          checkType: S.String,
          evaluatedEffect: S.String,
          targetArn: S.optional(S.String),
          relevantPolicyTypes: S.optional(__S(6, __c0, 6)),
          matchedPolicies: S.optional(__S(5, __c0, 5)),
        }),
      ).annotate({ identifier: "Check" });
    case 8:
      return S.Array(__S(7, __c0, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          resource: S.String,
          context: S.optional(__S(1, __c0, 1)),
          evaluatedEffect: S.optional(S.String),
          matchedPolicies: S.optional(__S(5, __c0, 5)),
          checks: S.optional(__S(8, __c0, 8)),
        }),
      ).annotate({ identifier: "Evaluation" });
    case 10:
      return S.Array(__S(9, __c0, 9));
    case 11:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "AttachedTo",
      });
    case 12:
      return S.Array(__S(11, __c0, 11));
    case 13:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 14:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          inline: S.optional(S.Boolean),
          uri: S.optional(S.String),
          attachedTo: S.optional(__S(12, __c0, 12)),
          policySource: S.optional(__S(13, __c0, 13)),
        }),
      ).annotate({ identifier: "PolicyInfo" });
    case 15:
      return S.Array(__S(14, __c0, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          requestContext: __S(1, __c0, 1),
          evaluations: __S(10, __c0, 10),
          policies: __S(15, __c0, 15),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRequestAuthorizationDetailsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizationId: S.String.pipe(T.HttpLabel("authorizationId")),
          policyUri: S.String.pipe(T.HttpQuery("policyUri")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/authorization-details/{authorizationId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRequestAuthorizationPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ policyDocument: S.Any })).annotate({
        identifier: "GetRequestAuthorizationPolicyOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
