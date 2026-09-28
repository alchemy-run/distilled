import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "AIOps",
  target: "AIOps",
  version: "2018-05-10",
  sigv4: "aiops",
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
                `https://aiops-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://aiops-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://aiops.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://aiops.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ChatbotNotificationChannel = {
  [key: string]: string[] | undefined;
};
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
export type SensitiveStringWithLengthLimits =
  | string
  | redacted.Redacted<string>;
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
  descriptor: {
    service: svc,
    http: "POST /investigationGroups",
    input: {
      name: 0,
      roleArn: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      retentionInDays: 0,
      tags: 0,
      tagKeyBoundaries: 0,
      chatbotNotificationChannel: 0,
      isCloudTrailEventHistoryEnabled: 0,
      crossAccountConfigurations: D.list(i_CrossAccountConfiguration),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /investigationGroups/{identifier}",
    input: { identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /investigationGroups/{identifier}/policy",
    input: { identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /investigationGroups/{identifier}",
    input: { identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /investigationGroups/{identifier}/policy",
    input: { identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /investigationGroups",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { nextToken: D.secret },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /investigationGroups/{identifier}/policy",
    input: { identifier: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /investigationGroups/{identifier}",
    input: {
      identifier: 0,
      roleArn: 0,
      encryptionConfiguration: i_EncryptionConfiguration,
      tagKeyBoundaries: 0,
      chatbotNotificationChannel: 0,
      isCloudTrailEventHistoryEnabled: 0,
      crossAccountConfigurations: D.list(i_CrossAccountConfiguration),
    },
    body: true,
  },
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
})) as any;

const i_CrossAccountConfiguration: D.LazyStruct = () => ({ sourceRoleArn: 0 });
const i_EncryptionConfiguration: D.LazyStruct = () => ({
  type: 0,
  kmsKeyId: 0,
});
