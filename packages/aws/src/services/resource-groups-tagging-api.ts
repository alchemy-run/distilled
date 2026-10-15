import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Resource Groups Tagging API",
  serviceShapeName: "ResourceGroupsTaggingAPI_20170126",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "tagging" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-01-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://tagging-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://tagging-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://tagging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://tagging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://tagging.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<ConstraintViolationException>()(
    "ConstraintViolationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()("InternalServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PaginationTokenExpiredException
  extends /*@__PURE__*/ S.TaggedError<PaginationTokenExpiredException>()(
    "PaginationTokenExpiredException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()("ThrottledException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export interface DescribeReportCreationInput {}
export type Status = string;
export type S3Location = string;
export type StartDate = string;
export type ErrorMessage = string;
export interface DescribeReportCreationOutput {
  Status?: string;
  S3Location?: string;
  StartDate?: string;
  ErrorMessage?: string;
}
export type TargetId = string;
export type TargetIdFilterList = string[];
export type Region = string;
export type RegionFilterList = string[];
export type AmazonResourceType = string;
export type ResourceTypeFilterList = string[];
export type TagKey = string;
export type TagKeyFilterList = string[];
export type GroupByAttribute = "TARGET_ID" | "REGION" | "RESOURCE_TYPE" | (string & {});
export type GroupBy = GroupByAttribute[];
export type MaxResultsGetComplianceSummary = number;
export type PaginationToken = string;
export interface GetComplianceSummaryInput {
  TargetIdFilters?: string[];
  RegionFilters?: string[];
  ResourceTypeFilters?: string[];
  TagKeyFilters?: string[];
  GroupBy?: GroupByAttribute[];
  MaxResults?: number;
  PaginationToken?: string;
}
export type LastUpdated = string;
export type TargetIdType = "ACCOUNT" | "OU" | "ROOT" | (string & {});
export type NonCompliantResources = number;
export interface Summary {
  LastUpdated?: string;
  TargetId?: string;
  TargetIdType?: TargetIdType;
  Region?: string;
  ResourceType?: string;
  NonCompliantResources?: number;
}
export type SummaryList = Summary[];
export interface GetComplianceSummaryOutput {
  SummaryList?: Summary[];
  PaginationToken?: string;
}
export type TagValue = string;
export type TagValueList = string[];
export interface TagFilter {
  Key?: string;
  Values?: string[];
}
export type TagFilterList = TagFilter[];
export type ResourcesPerPage = number;
export type TagsPerPage = number;
export type IncludeComplianceDetails = boolean;
export type ExcludeCompliantResources = boolean;
export type ResourceARN = string;
export type ResourceARNListForGet = string[];
export interface GetResourcesInput {
  PaginationToken?: string;
  TagFilters?: TagFilter[];
  ResourcesPerPage?: number;
  TagsPerPage?: number;
  ResourceTypeFilters?: string[];
  IncludeComplianceDetails?: boolean;
  ExcludeCompliantResources?: boolean;
  ResourceARNList?: string[];
}
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type TagKeyList = string[];
export type ComplianceStatus = boolean;
export interface ComplianceDetails {
  NoncompliantKeys?: string[];
  KeysWithNoncompliantValues?: string[];
  MissingTagKeys?: string[];
  ComplianceStatus?: boolean;
}
export interface ResourceTagMapping {
  ResourceARN?: string;
  Tags?: Tag[];
  ComplianceDetails?: ComplianceDetails;
}
export type ResourceTagMappingList = ResourceTagMapping[];
export interface GetResourcesOutput {
  PaginationToken?: string;
  ResourceTagMappingList?: ResourceTagMapping[];
}
export interface GetTagKeysInput {
  PaginationToken?: string;
}
export interface GetTagKeysOutput {
  PaginationToken?: string;
  TagKeys?: string[];
}
export interface GetTagValuesInput {
  PaginationToken?: string;
  Key: string;
}
export type TagValuesOutputList = string[];
export interface GetTagValuesOutput {
  PaginationToken?: string;
  TagValues?: string[];
}
export type MaxResultsForListRequiredTags = number;
export interface ListRequiredTagsInput {
  NextToken?: string;
  MaxResults?: number;
}
export type ResourceType = string;
export type CloudFormationResourceType = string;
export type CloudFormationResourceTypes = string[];
export type ReportingTagKeys = string[];
export interface RequiredTag {
  ResourceType?: string;
  CloudFormationResourceTypes?: string[];
  ReportingTagKeys?: string[];
}
export type RequiredTagsForListRequiredTags = RequiredTag[];
export interface ListRequiredTagsOutput {
  RequiredTags?: RequiredTag[];
  NextToken?: string;
}
export type S3Bucket = string;
export interface StartReportCreationInput {
  S3Bucket: string;
}
export interface StartReportCreationOutput {}
export type ResourceARNListForTagUntag = string[];
export type TagMap = { [key: string]: string | undefined };
export interface TagResourcesInput {
  ResourceARNList: string[];
  Tags: { [key: string]: string | undefined };
}
export type StatusCode = number;
export type ErrorCode = "InternalServiceException" | "InvalidParameterException" | (string & {});
export interface FailureInfo {
  StatusCode?: number;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export type FailedResourcesMap = { [key: string]: FailureInfo | undefined };
export interface TagResourcesOutput {
  FailedResourcesMap?: { [key: string]: FailureInfo | undefined };
}
export type TagKeyListForUntag = string[];
export interface UntagResourcesInput {
  ResourceARNList: string[];
  TagKeys: string[];
}
export interface UntagResourcesOutput {
  FailedResourcesMap?: { [key: string]: FailureInfo | undefined };
}
export type ExceptionMessage = string;
export type DescribeReportCreationError =
  | ConstraintViolationException
  | InternalServiceException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Describes the status of the `StartReportCreation` operation.
 *
 * You can call this operation only from the organization's
 * management account and from the us-east-1 Region.
 */
export const describeReportCreation: API.OperationMethod<
  DescribeReportCreationInput,
  DescribeReportCreationOutput,
  DescribeReportCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DescribeReportCreationInput>,
  output: __S(97, __c6, 1) as any as S.Schema<DescribeReportCreationOutput>,
  errors: [
    ConstraintViolationException,
    InternalServiceException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReportCreation",
}));

export type GetComplianceSummaryError =
  | ConstraintViolationException
  | InternalServiceException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Returns a table that shows counts of resources that are noncompliant with their tag
 * policies.
 *
 * For more information on tag policies, see Tag Policies in
 * the *Organizations User Guide.*
 *
 * You can call this operation only from the organization's
 * management account and from the us-east-1 Region.
 *
 * This operation supports pagination, where the response can be sent in
 * multiple pages. You should check the `PaginationToken` response parameter to determine
 * if there are additional results available to return. Repeat the query, passing the
 * `PaginationToken` response parameter value as an input to the next request until you
 * recieve a `null` value. A null value for `PaginationToken` indicates that
 * there are no more results waiting to be returned.
 */
export const getComplianceSummary: API.PaginatedOperationMethod<
  GetComplianceSummaryInput,
  GetComplianceSummaryOutput,
  GetComplianceSummaryError,
  Credentials | HttpClient.HttpClient,
  Summary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(113, __c7, 1) as any as S.Schema<GetComplianceSummaryInput>,
  output: __S(116, __c7, 4) as any as S.Schema<GetComplianceSummaryOutput>,
  errors: [
    ConstraintViolationException,
    InternalServiceException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceSummary",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "SummaryList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcesError =
  | InternalServiceException
  | InvalidParameterException
  | PaginationTokenExpiredException
  | ThrottledException
  | CommonErrors;
/**
 * Returns all the tagged or previously tagged resources that are located in the
 * specified Amazon Web Services Region for the account.
 *
 * Depending on what information you want returned, you can also specify the
 * following:
 *
 * - *Filters* that specify what tags and resource types you
 * want returned. The response includes all tags that are associated with the
 * requested resources.
 *
 * - Information about compliance with the account's effective tag policy. For more
 * information on tag policies, see Tag
 * Policies in the *Organizations User Guide.*
 *
 * This operation supports pagination, where the response can be sent in
 * multiple pages. You should check the `PaginationToken` response parameter to determine
 * if there are additional results available to return. Repeat the query, passing the
 * `PaginationToken` response parameter value as an input to the next request until you
 * recieve a `null` value. A null value for `PaginationToken` indicates that
 * there are no more results waiting to be returned.
 *
 * `GetResources` does not return untagged resources.
 *
 * To find untagged resources in your account, use Amazon Web Services Resource Explorer with a
 * query that uses `tag:none`. For more information, see Search query syntax reference for Resource Explorer.
 */
export const getResources: API.PaginatedOperationMethod<
  GetResourcesInput,
  GetResourcesOutput,
  GetResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceTagMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(146, __c9, 2) as any as S.Schema<GetResourcesInput>,
  output: __S(152, __c9, 8) as any as S.Schema<GetResourcesOutput>,
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PaginationTokenExpiredException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResources",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "ResourceTagMappingList",
    pageSize: "ResourcesPerPage",
  } as const,
})) as any;

export type GetTagKeysError =
  | InternalServiceException
  | InvalidParameterException
  | PaginationTokenExpiredException
  | ThrottledException
  | CommonErrors;
/**
 * Returns all tag keys currently in use in the specified Amazon Web Services Region for the calling
 * account.
 *
 * This operation supports pagination, where the response can be sent in
 * multiple pages. You should check the `PaginationToken` response parameter to determine
 * if there are additional results available to return. Repeat the query, passing the
 * `PaginationToken` response parameter value as an input to the next request until you
 * recieve a `null` value. A null value for `PaginationToken` indicates that
 * there are no more results waiting to be returned.
 */
export const getTagKeys: API.PaginatedOperationMethod<
  GetTagKeysInput,
  GetTagKeysOutput,
  GetTagKeysError,
  Credentials | HttpClient.HttpClient,
  TagKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetTagKeysInput>,
  output: __S(161, __c10, 1) as any as S.Schema<GetTagKeysOutput>,
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PaginationTokenExpiredException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTagKeys",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "TagKeys",
  } as const,
})) as any;

export type GetTagValuesError =
  | InternalServiceException
  | InvalidParameterException
  | PaginationTokenExpiredException
  | ThrottledException
  | CommonErrors;
/**
 * Returns all tag values for the specified key that are used in the specified Amazon Web Services
 * Region for the calling account.
 *
 * This operation supports pagination, where the response can be sent in
 * multiple pages. You should check the `PaginationToken` response parameter to determine
 * if there are additional results available to return. Repeat the query, passing the
 * `PaginationToken` response parameter value as an input to the next request until you
 * recieve a `null` value. A null value for `PaginationToken` indicates that
 * there are no more results waiting to be returned.
 */
export const getTagValues: API.PaginatedOperationMethod<
  GetTagValuesInput,
  GetTagValuesOutput,
  GetTagValuesError,
  Credentials | HttpClient.HttpClient,
  TagValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetTagValuesInput>,
  output: __S(1, __c0, 1) as any as S.Schema<GetTagValuesOutput>,
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PaginationTokenExpiredException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTagValues",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "TagValues",
  } as const,
})) as any;

export type ListRequiredTagsError =
  | InternalServiceException
  | InvalidParameterException
  | PaginationTokenExpiredException
  | ThrottledException
  | CommonErrors;
/**
 * Lists the required tags for supported resource types in an Amazon Web Services account.
 */
export const listRequiredTags: API.PaginatedOperationMethod<
  ListRequiredTagsInput,
  ListRequiredTagsOutput,
  ListRequiredTagsError,
  Credentials | HttpClient.HttpClient,
  RequiredTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<ListRequiredTagsInput>,
  output: __S(19, __c1, 3) as any as S.Schema<ListRequiredTagsOutput>,
  errors: [
    InternalServiceException,
    InvalidParameterException,
    PaginationTokenExpiredException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequiredTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RequiredTags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartReportCreationError =
  | ConcurrentModificationException
  | ConstraintViolationException
  | InternalServiceException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Generates a report that lists all tagged resources in the accounts across your
 * organization and tells whether each resource is compliant with the effective tag policy.
 * Compliance data is refreshed daily. The report is generated asynchronously.
 *
 * The generated report is saved to the following location:
 *
 * `s3://amzn-s3-demo-bucket/AwsTagPolicies/o-exampleorgid/YYYY-MM-ddTHH:mm:ssZ/report.csv`
 *
 * For more information about evaluating resource compliance with tag policies, including
 * the required permissions, review Permissions for evaluating organization-wide compliance in the
 * *Tagging Amazon Web Services Resources and Tag Editor* user guide.
 *
 * You can call this operation only from the organization's
 * management account and from the us-east-1 Region.
 *
 * If the account associated with the identity used to call
 * `StartReportCreation` is different from the account that owns the Amazon S3
 * bucket, there must be a bucket policy attached to the bucket to provide access. For more
 * information, review Amazon S3 bucket
 * policy for report storage in the Tagging Amazon Web Services Resources and Tag
 * Editor user guide.
 */
export const startReportCreation: API.OperationMethod<
  StartReportCreationInput,
  StartReportCreationOutput,
  StartReportCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<StartReportCreationInput>,
  output: __S(33, __c2, 1) as any as S.Schema<StartReportCreationOutput>,
  errors: [
    ConcurrentModificationException,
    ConstraintViolationException,
    InternalServiceException,
    InvalidParameterException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReportCreation",
}));

export type TagResourcesError =
  | InternalServiceException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Applies one or more tags to the specified resources. Note the following:
 *
 * - Not all resources can have tags. For a list of services with resources that
 * support tagging using this operation, see Services that support the
 * Resource Groups Tagging API. If the resource doesn't yet support
 * this operation, the resource's service might support tagging using its own API
 * operations. For more information, refer to the documentation for that
 * service.
 *
 * - Each resource can have up to 50 tags. For other limits, see Tag Naming and Usage Conventions in the Amazon Web Services General
 * Reference.
 *
 * - You can only tag resources that are located in the specified Amazon Web Services Region for
 * the Amazon Web Services account.
 *
 * - To add tags to a resource, you need the necessary permissions for the service
 * that the resource belongs to as well as permissions for adding tags. For more
 * information, see the documentation for each service.
 *
 * - When you use the Amazon Web Services Resource
 * Groups Tagging API to update tags for Amazon Web Services CloudFormation stack
 * sets, Amazon Web Services calls the Amazon Web Services
 * CloudFormation `UpdateStack`
 * operation. This operation
 * may initiate additional resource property updates in addition to the desired tag
 * updates. To avoid unexpected resource updates, Amazon Web Services recommends that you only
 * apply or update tags to your CloudFormation stack sets using Amazon Web Services
 * CloudFormation.
 *
 * Do not store personally identifiable information (PII) or other confidential or
 * sensitive information in tags. We use tags to provide you with billing and
 * administration services. Tags are not intended to be used for private or sensitive
 * data.
 *
 * **Minimum permissions**
 *
 * In addition to the `tag:TagResources` permission required by this
 * operation, you must also have the tagging permission defined by the service that created
 * the resource. For example, to tag an Amazon EC2 instance using the `TagResources`
 * operation, you must have both of the following permissions:
 *
 * - `tag:TagResources`
 *
 * - `ec2:CreateTags`
 *
 * In addition, some services might have specific requirements for tagging some types
 * of resources. For example, to tag an Amazon S3 bucket, you must also have the
 * `s3:GetBucketTagging` permission. If the expected minimum permissions
 * don't work, check the documentation for that service's tagging APIs for more
 * information.
 */
export const tagResources: API.OperationMethod<
  TagResourcesInput,
  TagResourcesOutput,
  TagResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(49, __c3, 1) as any as S.Schema<TagResourcesInput>,
  output: __S(66, __c4, 2) as any as S.Schema<TagResourcesOutput>,
  errors: [InternalServiceException, InvalidParameterException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResources",
}));

export type UntagResourcesError =
  | InternalServiceException
  | InvalidParameterException
  | ThrottledException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resources. When you specify a tag key,
 * the action removes both that key and its associated value. The operation succeeds even
 * if you attempt to remove tags from a resource that were already removed. Note the
 * following:
 *
 * - To remove tags from a resource, you need the necessary permissions for the
 * service that the resource belongs to as well as permissions for removing tags.
 * For more information, see the documentation for the service whose resource you
 * want to untag.
 *
 * - You can only tag resources that are located in the specified Amazon Web Services Region for
 * the calling Amazon Web Services account.
 *
 * **Minimum permissions**
 *
 * In addition to the `tag:UntagResources` permission required by this
 * operation, you must also have the remove tags permission defined by the service that
 * created the resource. For example, to remove the tags from an Amazon EC2 instance using the
 * `UntagResources` operation, you must have both of the following
 * permissions:
 *
 * - `tag:UntagResources`
 *
 * - `ec2:DeleteTags`
 *
 * In addition, some services might have specific requirements for untagging some
 * types of resources. For example, to untag Amazon Web Services Glue Connection, you must also have the
 * `glue:GetConnection` permission. If the expected minimum permissions
 * don't work, check the documentation for that service's tagging APIs for more
 * information.
 */
export const untagResources: API.OperationMethod<
  UntagResourcesInput,
  UntagResourcesOutput,
  UntagResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<UntagResourcesInput>,
  output: __S(66, __c4, 2) as any as S.Schema<UntagResourcesOutput>,
  errors: [InternalServiceException, InvalidParameterException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResources",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PaginationToken: S.optional(S.String), Key: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetTagValues" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTagValuesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PaginationToken: S.optional(S.String),
          TagValues: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "GetTagValuesOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListRequiredTags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRequiredTagsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          CloudFormationResourceTypes: S.optional(__S(128, __c8, 0)),
          ReportingTagKeys: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "RequiredTag" });
    case 2:
      return S.Array(__S(17, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ RequiredTags: S.optional(__S(18, __c1, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRequiredTagsOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartReportCreation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartReportCreationInput" });
    case 1:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "StartReportCreationOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceARNList: __S(128, __c8, 0), Tags: __S(48, __c3, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourcesInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StatusCode: S.optional(S.Number),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailureInfo" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(64, __c4, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({ FailedResourcesMap: S.optional(__S(65, __c4, 1)) }),
      ).annotate({ identifier: "TagResourcesOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARNList: __S(128, __c8, 0), TagKeys: __S(128, __c8, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourcesInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribeReportCreation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReportCreationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          S3Location: S.optional(S.String),
          StartDate: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeReportCreationOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetIdFilters: S.optional(__S(128, __c8, 0)),
          RegionFilters: S.optional(__S(128, __c8, 0)),
          ResourceTypeFilters: S.optional(__S(128, __c8, 0)),
          TagKeyFilters: S.optional(__S(128, __c8, 0)),
          GroupBy: S.optional(__S(112, __c7, 0)),
          MaxResults: S.optional(S.Number),
          PaginationToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetComplianceSummary" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetComplianceSummaryInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LastUpdated: S.optional(S.String),
          TargetId: S.optional(S.String),
          TargetIdType: S.optional(S.String),
          Region: S.optional(S.String),
          ResourceType: S.optional(S.String),
          NonCompliantResources: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Summary" });
    case 3:
      return S.Array(__S(114, __c7, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          SummaryList: S.optional(__S(115, __c7, 3)),
          PaginationToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetComplianceSummaryOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Values: S.optional(__S(128, __c8, 0)) }),
      ).annotate({ identifier: "TagFilter" });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PaginationToken: S.optional(S.String),
          TagFilters: S.optional(__S(145, __c9, 1)),
          ResourcesPerPage: S.optional(S.Number),
          TagsPerPage: S.optional(S.Number),
          ResourceTypeFilters: S.optional(__S(128, __c8, 0)),
          IncludeComplianceDetails: S.optional(S.Boolean),
          ExcludeCompliantResources: S.optional(S.Boolean),
          ResourceARNList: S.optional(__S(128, __c8, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetResources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcesInput" });
    case 3:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 4:
      return S.Array(__S(147, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NoncompliantKeys: S.optional(__S(128, __c8, 0)),
          KeysWithNoncompliantValues: S.optional(__S(128, __c8, 0)),
          MissingTagKeys: S.optional(__S(128, __c8, 0)),
          ComplianceStatus: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ComplianceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(148, __c9, 4)),
          ComplianceDetails: S.optional(__S(149, __c9, 5)),
        }),
      ).annotate({ identifier: "ResourceTagMapping" });
    case 7:
      return S.Array(__S(150, __c9, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          PaginationToken: S.optional(S.String),
          ResourceTagMappingList: S.optional(__S(151, __c9, 7)),
        }),
      ).annotate({ identifier: "GetResourcesOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PaginationToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetTagKeys" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTagKeysInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PaginationToken: S.optional(S.String), TagKeys: S.optional(__S(128, __c8, 0)) }),
      ).annotate({ identifier: "GetTagKeysOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
