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
  sdkId: "SupportAuthZ",
  target: "SupportAuthZ",
  version: "2026-06-30",
  sigv4: "supportauthz",
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type SupportPermitStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /support-permits",
    input: {
      permit: {
        actions: { allActions: i_Unit, actions: 0 },
        resources: { allResourcesInRegion: i_Unit, resources: 0 },
        conditions: D.list({ allowAfter: 0, allowBefore: 0 }),
      },
      name: 0,
      description: 0,
      signingKeyInfo: { kmsKey: 0 },
      supportCaseDisplayId: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { permit: o_Permit, createdAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /support-permits/{supportPermitIdentifier}",
    input: { supportPermitIdentifier: 0 },
    output: { permit: o_Permit, createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /actions/{action}",
    input: { action: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /support-permits/{supportPermitIdentifier}",
    input: { supportPermitIdentifier: 0 },
    output: { permit: o_Permit, createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /actions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      service: D.m({ query: "service" }),
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
  descriptor: {
    service: svc,
    http: "GET /support-permit-requests",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      supportCaseDisplayId: D.m({ query: "supportCaseDisplayId" }),
    },
    output: {
      supportPermitRequests: D.list({
        permit: o_Permit,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "GET /support-permits",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      supportPermitStatuses: D.m({ query: "supportPermitStatuses" }),
    },
    output: { supportPermits: D.list({ permit: o_Permit, createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /support-permit-requests/{requestArn}/reject",
    input: { requestArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
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
})) as any;

const i_Unit: D.LazyStruct = () => ({});
const o_Permit: D.LazyStruct = () => ({
  conditions: D.list({ allowAfter: D.ts, allowBefore: D.ts }),
});
