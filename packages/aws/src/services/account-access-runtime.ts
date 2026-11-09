import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Account Access Runtime",
  serviceShapeName: "AWSAccountAccessRuntime",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "AWSAccountAccessRuntime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://account-access-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://account-access-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://account-access-runtime.{R}.api.aws","properties":{},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "AccountAccessRuntime",
  service: "AccountAccessRuntime",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TenantId = string;
export type AccessType = "PROGRAMMATIC_ACCESS" | (string & {});
export type SessionName = string;
export interface GetRoleCredentialsRequest {
  tenantId: string;
  roleArn: string;
  accessType: AccessType;
  sessionName?: string;
  sessionDuration?: number;
}
export interface ProgrammaticAccessDetails {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiresAt?: Date;
}
export type CredentialsDetails = { programmaticAccess: ProgrammaticAccessDetails };
export interface GetRoleCredentialsResponse {
  credentialsDetails?: CredentialsDetails;
}
export type Token = string;
export interface ListRolesRequest {
  tenantId: string;
  maxResults?: number;
  nextToken?: string;
}
export type Account = string;
export interface AccessDetails {
  accountId: string;
  accountName?: string;
  roleArn: string;
}
export type AccessDetailsList = AccessDetails[];
export interface ListRolesResponse {
  roles: AccessDetails[];
  nextToken?: string;
}
export type GetRoleCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns temporary Amazon Web Services credentials for a role that you are entitled to assume within a tenant. You can use these credentials for programmatic access with the CLI or an Amazon Web Services SDK. If you aren't entitled to the role, the request fails with an `AccessDeniedException` error.
 */
export const getRoleCredentials: API.OperationMethod<
  GetRoleCredentialsRequest & RegionInput,
  GetRoleCredentialsResponse,
  GetRoleCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetRoleCredentialsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetRoleCredentialsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoleCredentials",
  telemetry: TELEMETRY,
  span: "GetRoleCredentials",
}));

export type ListRolesError =
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the roles that you are entitled to access within a tenant. The results are paginated. Use a returned role with `GetRoleCredentials` to obtain temporary credentials.
 */
export const listRoles: API.PaginatedOperationMethod<
  ListRolesRequest & RegionInput,
  ListRolesResponse,
  ListRolesError,
  Credentials | HttpClient.HttpClient,
  AccessDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<ListRolesRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<ListRolesResponse>,
  errors: [
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "roles",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRoles",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tenantId: S.String.pipe(T.HttpQuery("tenantId")),
          roleArn: S.String.pipe(T.HttpQuery("roleArn")),
          accessType: S.String.pipe(T.HttpQuery("accessType")),
          sessionName: S.optional(S.String).pipe(T.HttpQuery("sessionName")),
          sessionDuration: S.optional(S.Number).pipe(T.HttpQuery("sessionDuration")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/access/credentials" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRoleCredentialsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: S.String,
          secretAccessKey: S.String,
          sessionToken: S.String,
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProgrammaticAccessDetails" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ programmaticAccess: __S(1, __c0, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({ credentialsDetails: S.optional(__S(2, __c0, 2)) }),
      ).annotate({ identifier: "GetRoleCredentialsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tenantId: S.String.pipe(T.HttpQuery("tenantId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/access" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRolesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, accountName: S.optional(S.String), roleArn: S.String }),
      ).annotate({ identifier: "AccessDetails" });
    case 2:
      return S.Array(__S(5, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ roles: __S(6, __c1, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRolesResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
