import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "AIOps", serviceShapeName: "AIOps" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aiops" });
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
              `https://aiops-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://aiops-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://aiops.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://aiops.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://aiops.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()("UnauthorizedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type StringWithPatternAndLengthLimits = string;
export type RoleArn = string;
export type EncryptionConfigurationType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export type KmsKeyId = string;
export interface EncryptionConfiguration {
  type?: EncryptionConfigurationType;
  kmsKeyId?: string;
}
export type Retention = number;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type TagKeyBoundaries = string[];
export type SNSTopicArn = string;
export type ChatConfigurationArn = string;
export type ChatConfigurationArns = string[];
export type ChatbotNotificationChannel = { [key: string]: string[] | undefined };
export interface CrossAccountConfiguration {
  sourceRoleArn?: string;
}
export type CrossAccountConfigurations = CrossAccountConfiguration[];
export interface CreateInvestigationGroupInput {
  name: string;
  roleArn: string;
  encryptionConfiguration?: EncryptionConfiguration;
  retentionInDays?: number;
  tags?: { [key: string]: string | undefined };
  tagKeyBoundaries?: string[];
  chatbotNotificationChannel?: { [key: string]: string[] | undefined };
  isCloudTrailEventHistoryEnabled?: boolean;
  crossAccountConfigurations?: CrossAccountConfiguration[];
}
export type InvestigationGroupArn = string;
export interface CreateInvestigationGroupOutput {
  arn?: string;
}
export type InvestigationGroupIdentifier = string;
export interface DeleteInvestigationGroupRequest {
  identifier: string;
}
export interface DeleteInvestigationGroupResponse {}
export interface DeleteInvestigationGroupPolicyRequest {
  identifier: string;
}
export interface DeleteInvestigationGroupPolicyOutput {}
export interface GetInvestigationGroupRequest {
  identifier: string;
}
export type IdentifierStringWithPatternAndLengthLimits = string;
export interface GetInvestigationGroupResponse {
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  name?: string;
  arn?: string;
  roleArn?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  retentionInDays?: number;
  chatbotNotificationChannel?: { [key: string]: string[] | undefined };
  tagKeyBoundaries?: string[];
  isCloudTrailEventHistoryEnabled?: boolean;
  crossAccountConfigurations?: CrossAccountConfiguration[];
}
export interface GetInvestigationGroupPolicyRequest {
  identifier: string;
}
export type InvestigationGroupPolicyDocument = string;
export interface GetInvestigationGroupPolicyResponse {
  investigationGroupArn?: string;
  policy?: string;
}
export type SensitiveStringWithLengthLimits = string | redacted.Redacted<string>;
export interface ListInvestigationGroupsInput {
  nextToken?: string | redacted.Redacted<string>;
  maxResults?: number;
}
export interface ListInvestigationGroupsModel {
  arn?: string;
  name?: string;
}
export type InvestigationGroups = ListInvestigationGroupsModel[];
export interface ListInvestigationGroupsOutput {
  nextToken?: string | redacted.Redacted<string>;
  investigationGroups?: ListInvestigationGroupsModel[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface PutInvestigationGroupPolicyRequest {
  identifier: string;
  policy: string;
}
export interface PutInvestigationGroupPolicyResponse {
  investigationGroupArn?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateInvestigationGroupRequest {
  identifier: string;
  roleArn?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tagKeyBoundaries?: string[];
  chatbotNotificationChannel?: { [key: string]: string[] | undefined };
  isCloudTrailEventHistoryEnabled?: boolean;
  crossAccountConfigurations?: CrossAccountConfiguration[];
}
export interface UpdateInvestigationGroupOutput {}
export type CreateInvestigationGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an *investigation group* in your account. Creating an investigation group is a one-time setup task for each Region in your account. It is a necessary task to be able to perform investigations.
 *
 * Settings in the investigation group help you centrally manage the common properties of your investigations, such as the following:
 *
 * - Who can access the investigations
 *
 * - Whether investigation data is encrypted with a customer managed Key Management Service key.
 *
 * - How long investigations and their data are retained by default.
 *
 * Currently, you can have one investigation group in each Region in your account. Each investigation in a Region is a part of the investigation group in that Region
 *
 * To create an investigation group and set up CloudWatch investigations, you must be signed in to an IAM principal that has either the `AIOpsConsoleAdminPolicy` or the `AdministratorAccess` IAM policy attached, or to an account that has similar permissions.
 *
 * You can configure CloudWatch alarms to start investigations and add events to investigations. If you create your investigation group with `CreateInvestigationGroup` and you want to enable alarms to do this, you must use `PutInvestigationGroupPolicy` to create a resource policy that grants this permission to CloudWatch alarms.
 *
 * For more information about configuring CloudWatch alarms, see Using Amazon CloudWatch alarms
 */
export const createInvestigationGroup: API.OperationMethod<
  CreateInvestigationGroupInput,
  CreateInvestigationGroupOutput,
  CreateInvestigationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<CreateInvestigationGroupInput>,
  output: __S(37, __c9, 1) as any as S.Schema<CreateInvestigationGroupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvestigationGroup",
}));

export type DeleteInvestigationGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified investigation group from your account. You can currently have one investigation group per Region in your account. After you delete an investigation group, you can later create a new investigation group in the same Region.
 */
export const deleteInvestigationGroup: API.OperationMethod<
  DeleteInvestigationGroupRequest,
  DeleteInvestigationGroupResponse,
  DeleteInvestigationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<DeleteInvestigationGroupRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<DeleteInvestigationGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvestigationGroup",
}));

export type DeleteInvestigationGroupPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the IAM resource policy from being associated with the investigation group that you specify.
 */
export const deleteInvestigationGroupPolicy: API.OperationMethod<
  DeleteInvestigationGroupPolicyRequest,
  DeleteInvestigationGroupPolicyOutput,
  DeleteInvestigationGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteInvestigationGroupPolicyRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<DeleteInvestigationGroupPolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvestigationGroupPolicy",
}));

export type GetInvestigationGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the configuration information for the specified investigation group.
 */
export const getInvestigationGroup: API.OperationMethod<
  GetInvestigationGroupRequest,
  GetInvestigationGroupResponse,
  GetInvestigationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<GetInvestigationGroupRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<GetInvestigationGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigationGroup",
}));

export type GetInvestigationGroupPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the JSON of the IAM resource policy associated with the specified investigation group in a string. For example, `{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"aiops.alarms.cloudwatch.amazonaws.com\"},\"Action\":[\"aiops:CreateInvestigation\",\"aiops:CreateInvestigationEvent\"],\"Resource\":\"*\",\"Condition\":{\"StringEquals\":{\"aws:SourceAccount\":\"111122223333\"},\"ArnLike\":{\"aws:SourceArn\":\"arn:aws:cloudwatch:us-east-1:111122223333:alarm:*\"}}}]}`.
 */
export const getInvestigationGroupPolicy: API.OperationMethod<
  GetInvestigationGroupPolicyRequest,
  GetInvestigationGroupPolicyResponse,
  GetInvestigationGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<GetInvestigationGroupPolicyRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<GetInvestigationGroupPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigationGroupPolicy",
}));

export type ListInvestigationGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the ARN and name of each investigation group in the account.
 */
export const listInvestigationGroups: API.PaginatedOperationMethod<
  ListInvestigationGroupsInput,
  ListInvestigationGroupsOutput,
  ListInvestigationGroupsError,
  Credentials | HttpClient.HttpClient,
  ListInvestigationGroupsModel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<ListInvestigationGroupsInput>,
  output: __S(15, __c3, 3) as any as S.Schema<ListInvestigationGroupsOutput>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigationGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "investigationGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch investigations resource. Currently, investigation groups support tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
  operationName: "ListTagsForResource",
}));

export type PutInvestigationGroupPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an IAM resource policy and assigns it to the specified investigation group.
 *
 * If you create your investigation group with `CreateInvestigationGroup` and you want to enable CloudWatch alarms to create investigations and add events to investigations, you must use this operation to create a policy similar to this example.
 *
 * ` { "Version": "2008-10-17", "Statement": [ { "Effect": "Allow", "Principal": { "Service": "aiops.alarms.cloudwatch.amazonaws.com" }, "Action": [ "aiops:CreateInvestigation", "aiops:CreateInvestigationEvent" ], "Resource": "*", "Condition": { "StringEquals": { "aws:SourceAccount": "account-id" }, "ArnLike": { "aws:SourceArn": "arn:aws:cloudwatch:region:account-id:alarm:*" } } } ] } `
 */
export const putInvestigationGroupPolicy: API.OperationMethod<
  PutInvestigationGroupPolicyRequest,
  PutInvestigationGroupPolicyResponse,
  PutInvestigationGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<PutInvestigationGroupPolicyRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<PutInvestigationGroupPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInvestigationGroupPolicy",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can associate as many as 50 tags with a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<TagResourceResponse>,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<UntagResourceResponse>,
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
  operationName: "UntagResource",
}));

export type UpdateInvestigationGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the configuration of the specified investigation group.
 */
export const updateInvestigationGroup: API.OperationMethod<
  UpdateInvestigationGroupRequest,
  UpdateInvestigationGroupOutput,
  UpdateInvestigationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<UpdateInvestigationGroupRequest>,
  output: __S(56, __c14, 0) as any as S.Schema<UpdateInvestigationGroupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInvestigationGroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/investigationGroups/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInvestigationGroupPolicyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/investigationGroups/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvestigationGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          createdBy: S.optional(S.String),
          createdAt: S.optional(S.Number),
          lastModifiedBy: S.optional(S.String),
          lastModifiedAt: S.optional(S.Number),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          roleArn: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(44, __c11, 0)),
          retentionInDays: S.optional(S.Number),
          chatbotNotificationChannel: S.optional(__S(45, __c11, 1)),
          tagKeyBoundaries: S.optional(__S(40, __c10, 0)),
          isCloudTrailEventHistoryEnabled: S.optional(S.Boolean),
          crossAccountConfigurations: S.optional(__S(47, __c11, 3)),
        }),
      ).annotate({ identifier: "GetInvestigationGroupResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/investigationGroups/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInvestigationGroupPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ investigationGroupArn: S.optional(S.String), policy: S.optional(S.String) }),
      ).annotate({ identifier: "GetInvestigationGroupPolicyResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(SensitiveString).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/investigationGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInvestigationGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String), name: S.optional(S.String) }),
      ).annotate({ identifier: "ListInvestigationGroupsModel" });
    case 2:
      return S.Array(__S(13, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(SensitiveString),
          investigationGroups: S.optional(__S(14, __c3, 2)),
        }),
      ).annotate({ identifier: "ListInvestigationGroupsOutput" });
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(48, __c12, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")), policy: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigationGroups/{identifier}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutInvestigationGroupPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ investigationGroupArn: S.optional(S.String) })).annotate({
        identifier: "PutInvestigationGroupPolicyResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(48, __c12, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(40, __c10, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String.pipe(T.HttpLabel("identifier")),
          roleArn: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(44, __c11, 0)),
          tagKeyBoundaries: S.optional(__S(40, __c10, 0)),
          chatbotNotificationChannel: S.optional(__S(45, __c11, 1)),
          isCloudTrailEventHistoryEnabled: S.optional(S.Boolean),
          crossAccountConfigurations: S.optional(__S(47, __c11, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/investigationGroups/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateInvestigationGroupRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          roleArn: S.String,
          encryptionConfiguration: S.optional(__S(44, __c11, 0)),
          retentionInDays: S.optional(S.Number),
          tags: S.optional(__S(48, __c12, 0)),
          tagKeyBoundaries: S.optional(__S(40, __c10, 0)),
          chatbotNotificationChannel: S.optional(__S(45, __c11, 1)),
          isCloudTrailEventHistoryEnabled: S.optional(S.Boolean),
          crossAccountConfigurations: S.optional(__S(47, __c11, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/investigationGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInvestigationGroupInput" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "CreateInvestigationGroupOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), kmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(40, __c10, 0).pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ sourceRoleArn: S.optional(S.String) })).annotate({
        identifier: "CrossAccountConfiguration",
      });
    case 3:
      return S.Array(__S(46, __c11, 2));
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
      return S.suspend(() =>
        S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/investigationGroups/{identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInvestigationGroupRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteInvestigationGroupResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
