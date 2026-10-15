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
  sdkId: "SupportAuthZ",
  serviceShapeName: "SupportAuthZ",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "supportauthz" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-06-30");
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
              `https://supportauthz-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://supportauthz.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://supportauthz.{R}.api.aws","properties":{},"headers":{}}',
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(73, __c9, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type Action = string;
export type Actions = string[];
export type ActionSet =
  | { allActions: Record<string, never>; actions?: never }
  | { allActions?: never; actions: string[] };
export type Resource = string;
export type Resources = string[];
export type ResourceSet =
  | { allResourcesInRegion: Record<string, never>; resources?: never }
  | { allResourcesInRegion?: never; resources: string[] };
export type Condition =
  | { allowAfter: Date; allowBefore?: never }
  | { allowAfter?: never; allowBefore: Date };
export type Conditions = Condition[];
export interface Permit {
  actions: ActionSet;
  resources: ResourceSet;
  conditions?: Condition[];
}
export type Name = string;
export type Description = string;
export type KmsKeyArn = string;
export type SigningKeyInfo = { kmsKey: string };
export type SupportCaseDisplayId = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateSupportPermitInput {
  permit: Permit;
  name: string;
  description?: string;
  signingKeyInfo: SigningKeyInfo;
  supportCaseDisplayId?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type Arn = string;
export type SupportPermitStatus = "ACTIVE" | "INACTIVE" | "DELETING" | (string & {});
export interface CreateSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteSupportPermitInput {
  supportPermitIdentifier: string;
}
export interface DeleteSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
}
export interface GetActionInput {
  action: string;
}
export type Service = string;
export type ActionDescription = string;
export interface GetActionOutput {
  action: string;
  service: string;
  description: string;
}
export type SupportPermitIdentifier = string;
export interface GetSupportPermitInput {
  supportPermitIdentifier: string;
}
export interface GetSupportPermitOutput {
  name: string;
  arn: string;
  description?: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
  tags?: { [key: string]: string | undefined };
}
export type NextToken = string;
export type MaxResults = number;
export interface ListActionsInput {
  nextToken?: string;
  maxResults?: number;
  service: string;
}
export interface ActionSummary {
  action: string;
  service: string;
  description: string;
}
export type ActionSummaries = ActionSummary[];
export interface ListActionsOutput {
  actionSummaries: ActionSummary[];
  nextToken?: string;
}
export interface ListSupportPermitRequestsInput {
  nextToken?: string;
  maxResults?: number;
  supportCaseDisplayId?: string;
}
export type RequestArn = string;
export type SupportPermitRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | (string & {});
export interface SupportPermitRequest {
  requestArn: string;
  permit: Permit;
  supportCaseDisplayId: string;
  status: SupportPermitRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type SupportPermitRequests = SupportPermitRequest[];
export interface ListSupportPermitRequestsOutput {
  supportPermitRequests: SupportPermitRequest[];
  nextToken?: string;
}
export type SupportPermitStatuses = SupportPermitStatus[];
export interface ListSupportPermitsInput {
  nextToken?: string;
  maxResults?: number;
  supportPermitStatuses?: SupportPermitStatus[];
}
export interface SupportPermitSummary {
  name: string;
  arn: string;
  permit: Permit;
  status: SupportPermitStatus;
  signingKeyInfo: SigningKeyInfo;
  createdAt: Date;
  supportCaseDisplayId?: string;
}
export type SupportPermitSummaries = SupportPermitSummary[];
export interface ListSupportPermitsOutput {
  supportPermits: SupportPermitSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface RejectSupportPermitRequestInput {
  requestArn: string;
}
export interface RejectSupportPermitRequestOutput {
  requestArn: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateSupportPermitError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a support permit that authorizes an AWS support operator to perform specified actions on specified resources. The permit is cryptographically signed using a customer-managed AWS KMS key (ECC_NIST_P384, SIGN_VERIFY) to ensure non-repudiation.
 */
export const createSupportPermit: API.OperationMethod<
  CreateSupportPermitInput,
  CreateSupportPermitOutput,
  CreateSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateSupportPermitInput>,
  output: __S(88, __c11, 0) as any as S.Schema<CreateSupportPermitOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSupportPermit",
}));

export type DeleteSupportPermitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a support permit, revoking the authorization previously granted to the AWS support operator.
 */
export const deleteSupportPermit: API.OperationMethod<
  DeleteSupportPermitInput,
  DeleteSupportPermitOutput,
  DeleteSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteSupportPermitInput>,
  output: __S(129, __c16, 1) as any as S.Schema<DeleteSupportPermitOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSupportPermit",
}));

export type GetActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the description of a specific support action.
 */
export const getAction: API.OperationMethod<
  GetActionInput,
  GetActionOutput,
  GetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetActionInput>,
  output: __S(144, __c18, 0) as any as S.Schema<GetActionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAction",
}));

export type GetSupportPermitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a support permit by its ARN or name.
 */
export const getSupportPermit: API.OperationMethod<
  GetSupportPermitInput,
  GetSupportPermitOutput,
  GetSupportPermitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetSupportPermitInput>,
  output: __S(88, __c11, 0) as any as S.Schema<GetSupportPermitOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSupportPermit",
}));

export type ListActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists available support actions for a specified AWS service. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsInput,
  ListActionsOutput,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<ListActionsInput>,
  output: __S(10, __c1, 2) as any as S.Schema<ListActionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSupportPermitRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists permit requests from AWS support operators. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listSupportPermitRequests: API.PaginatedOperationMethod<
  ListSupportPermitRequestsInput,
  ListSupportPermitRequestsOutput,
  ListSupportPermitRequestsError,
  Credentials | HttpClient.HttpClient,
  SupportPermitRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<ListSupportPermitRequestsInput>,
  output: __S(19, __c2, 3) as any as S.Schema<ListSupportPermitRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportPermitRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "supportPermitRequests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSupportPermitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all support permits in the caller's account. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listSupportPermits: API.PaginatedOperationMethod<
  ListSupportPermitsInput,
  ListSupportPermitsOutput,
  ListSupportPermitsError,
  Credentials | HttpClient.HttpClient,
  SupportPermitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(25, __c3, 1) as any as S.Schema<ListSupportPermitsInput>,
  output: __S(28, __c3, 4) as any as S.Schema<ListSupportPermitsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportPermits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "supportPermits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with a support permit resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(33, __c4, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RejectSupportPermitRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a permit request from an AWS support operator. The operator cannot proceed with the requested action.
 */
export const rejectSupportPermitRequest: API.OperationMethod<
  RejectSupportPermitRequestInput,
  RejectSupportPermitRequestOutput,
  RejectSupportPermitRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<RejectSupportPermitRequestInput>,
  output: __S(41, __c5, 1) as any as S.Schema<RejectSupportPermitRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectSupportPermitRequest",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for a support permit resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<TagResourceInput>,
  output: __S(56, __c7, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a support permit resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(56, __c7, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          supportPermitIdentifier: S.String.pipe(T.HttpLabel("supportPermitIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/support-permits/{supportPermitIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSupportPermitInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          service: S.String.pipe(T.HttpQuery("service")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/actions" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListActionsInput" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ actionSummaries: __S(9, __c1, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListActionsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          supportCaseDisplayId: S.optional(S.String).pipe(T.HttpQuery("supportCaseDisplayId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/support-permit-requests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSupportPermitRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestArn: S.String,
          permit: __S(108, __c13, 4),
          supportCaseDisplayId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SupportPermitRequest" });
    case 2:
      return S.Array(__S(17, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ supportPermitRequests: __S(18, __c2, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSupportPermitRequestsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          supportPermitStatuses: S.optional(__S(24, __c3, 0)).pipe(
            T.HttpQuery("supportPermitStatuses"),
          ),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/support-permits" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSupportPermitsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          permit: __S(108, __c13, 4),
          status: S.String,
          signingKeyInfo: __S(120, __c15, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          supportCaseDisplayId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportPermitSummary" });
    case 3:
      return S.Array(__S(26, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ supportPermits: __S(27, __c3, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSupportPermitsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(96, __c12, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ requestArn: S.String.pipe(T.HttpLabel("requestArn")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/support-permit-requests/{requestArn}/reject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectSupportPermitRequestInput" });
    case 1:
      return S.suspend(() => S.Struct({ requestArn: S.String })).annotate({
        identifier: "RejectSupportPermitRequestOutput",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(96, __c12, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(112, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(72, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          permit: __S(108, __c13, 4),
          name: S.String,
          description: S.optional(S.String),
          signingKeyInfo: __S(120, __c15, 0),
          supportCaseDisplayId: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(96, __c12, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/support-permits" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSupportPermitInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          permit: __S(108, __c13, 4),
          status: S.String,
          signingKeyInfo: __S(120, __c15, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          supportCaseDisplayId: S.optional(S.String),
          tags: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "CreateSupportPermitOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ allActions: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ actions: __S(112, __c14, 0) }),
      ]);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ allResourcesInRegion: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ resources: __S(112, __c14, 0) }),
      ]);
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          allowAfter: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
        /*@__PURE__*/ S.Struct({
          allowBefore: /*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")),
        }),
      ]);
    case 3:
      return S.Array(__S(106, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          actions: __S(104, __c13, 0),
          resources: __S(105, __c13, 1),
          conditions: S.optional(__S(107, __c13, 3)),
        }),
      ).annotate({ identifier: "Permit" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ kmsKey: S.String })]);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          supportPermitIdentifier: S.String.pipe(T.HttpLabel("supportPermitIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/support-permits/{supportPermitIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSupportPermitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          description: S.optional(S.String),
          permit: __S(108, __c13, 4),
          status: S.String,
          signingKeyInfo: __S(120, __c15, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          supportCaseDisplayId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSupportPermitOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ action: S.String.pipe(T.HttpLabel("action")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/actions/{action}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetActionInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ action: S.String, service: S.String, description: S.String }),
      ).annotate({ identifier: "GetActionOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
