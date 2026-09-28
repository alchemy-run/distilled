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
  sdkId: "OAM",
  target: "oamservice",
  version: "2022-06-10",
  sigv4: "oam",
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
                `https://oam-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://oam-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://oam.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://oam.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    headers: { amznErrorType: "x-amzn-ErrorType" },
  })<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class InternalServiceFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceFault",
    ["ServerError"],
    { status: 500, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingRequiredParameterException",
    ["BadRequestError"],
    { status: 400, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["ThrottlingError"],
    { status: 429, headers: { amznErrorType: "x-amzn-ErrorType" } },
  )<{ readonly message?: string; readonly amznErrorType?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type LabelTemplate = string;
export type ResourceType =
  | "AWS::CloudWatch::Metric"
  | "AWS::Logs::LogGroup"
  | "AWS::XRay::Trace"
  | "AWS::ApplicationInsights::Application"
  | "AWS::InternetMonitor::Monitor"
  | "AWS::ApplicationSignals::Service"
  | "AWS::ApplicationSignals::ServiceLevelObjective"
  | (string & {});
export type ResourceTypesInput = ResourceType[];
export type ResourceIdentifier = string;
export type TagKey = string;
export type TagValue = string;
export type TagMapInput = { [key: string]: string | undefined };
export type LogsFilter = string;
export interface LogGroupConfiguration {
  Filter: string;
}
export type MetricsFilter = string;
export interface MetricConfiguration {
  Filter: string;
}
export interface LinkConfiguration {
  LogGroupConfiguration?: LogGroupConfiguration;
  MetricConfiguration?: MetricConfiguration;
}
export interface CreateLinkInput {
  LabelTemplate: string;
  ResourceTypes: ResourceType[];
  SinkIdentifier: string;
  Tags?: { [key: string]: string | undefined };
  LinkConfiguration?: LinkConfiguration;
}
export type ResourceTypesOutput = string[];
export type TagMapOutput = { [key: string]: string | undefined };
export interface CreateLinkOutput {
  Arn?: string;
  Id?: string;
  Label?: string;
  LabelTemplate?: string;
  ResourceTypes?: string[];
  SinkArn?: string;
  Tags?: { [key: string]: string | undefined };
  LinkConfiguration?: LinkConfiguration;
}
export type SinkName = string;
export interface CreateSinkInput {
  Name: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateSinkOutput {
  Arn?: string;
  Id?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DeleteLinkInput {
  Identifier: string;
}
export interface DeleteLinkOutput {}
export interface DeleteSinkInput {
  Identifier: string;
}
export interface DeleteSinkOutput {}
export type IncludeTags = boolean;
export interface GetLinkInput {
  Identifier: string;
  IncludeTags?: boolean;
}
export interface GetLinkOutput {
  Arn?: string;
  Id?: string;
  Label?: string;
  LabelTemplate?: string;
  ResourceTypes?: string[];
  SinkArn?: string;
  Tags?: { [key: string]: string | undefined };
  LinkConfiguration?: LinkConfiguration;
}
export interface GetSinkInput {
  Identifier: string;
  IncludeTags?: boolean;
}
export interface GetSinkOutput {
  Arn?: string;
  Id?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetSinkPolicyInput {
  SinkIdentifier: string;
}
export interface GetSinkPolicyOutput {
  SinkArn?: string;
  SinkId?: string;
  Policy?: string;
}
export type ListAttachedLinksMaxResults = number;
export type NextToken = string;
export interface ListAttachedLinksInput {
  MaxResults?: number;
  NextToken?: string;
  SinkIdentifier: string;
}
export interface ListAttachedLinksItem {
  Label?: string;
  LinkArn?: string;
  ResourceTypes?: string[];
}
export type ListAttachedLinksItems = ListAttachedLinksItem[];
export interface ListAttachedLinksOutput {
  Items: ListAttachedLinksItem[];
  NextToken?: string;
}
export type ListLinksMaxResults = number;
export interface ListLinksInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListLinksItem {
  Arn?: string;
  Id?: string;
  Label?: string;
  ResourceTypes?: string[];
  SinkArn?: string;
}
export type ListLinksItems = ListLinksItem[];
export interface ListLinksOutput {
  Items: ListLinksItem[];
  NextToken?: string;
}
export type ListSinksMaxResults = number;
export interface ListSinksInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListSinksItem {
  Arn?: string;
  Id?: string;
  Name?: string;
}
export type ListSinksItems = ListSinksItem[];
export interface ListSinksOutput {
  Items: ListSinksItem[];
  NextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export type SinkPolicy = string;
export interface PutSinkPolicyInput {
  SinkIdentifier: string;
  Policy: string;
}
export interface PutSinkPolicyOutput {
  SinkArn?: string;
  SinkId?: string;
  Policy?: string;
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateLinkInput {
  Identifier: string;
  ResourceTypes: ResourceType[];
  LinkConfiguration?: LinkConfiguration;
  IncludeTags?: boolean;
}
export interface UpdateLinkOutput {
  Arn?: string;
  Id?: string;
  Label?: string;
  LabelTemplate?: string;
  ResourceTypes?: string[];
  SinkArn?: string;
  Tags?: { [key: string]: string | undefined };
  LinkConfiguration?: LinkConfiguration;
}
export type CreateLinkError =
  | ConflictException
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a link between a source account and a sink that you have created in a monitoring account. After the link is created, data is sent from the source account to the monitoring account. When you create a link, you can optionally specify filters that specify which metric namespaces and which log groups are shared from the source account to the monitoring account.
 *
 * Before you create a link, you must create a sink in the monitoring account and create a sink policy in that account. The sink policy must permit the source account to link to it. You can grant permission to source accounts by granting permission to an entire organization or to individual accounts.
 *
 * For more information, see CreateSink and PutSinkPolicy.
 *
 * Each monitoring account can be linked to as many as 100,000 source accounts.
 *
 * Each source account can be linked to as many as five monitoring accounts.
 */
export const createLink: API.OperationMethod<
  CreateLinkInput,
  CreateLinkOutput,
  CreateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLink",
    input: {
      LabelTemplate: 0,
      ResourceTypes: 0,
      SinkIdentifier: 0,
      Tags: 0,
      LinkConfiguration: i_LinkConfiguration,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLink",
})) as any;

export type CreateSinkError =
  | ConflictException
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use this to create a *sink* in the current account, so that it can be used as a monitoring account in CloudWatch cross-account observability. A sink is a resource that represents an attachment point in a monitoring account. Source accounts can link to the sink to send observability data.
 *
 * After you create a sink, you must create a sink policy that allows source accounts to attach to it. For more information, see PutSinkPolicy.
 *
 * Each account can contain one sink per Region. If you delete a sink, you can then create a new one in that Region.
 */
export const createSink: API.OperationMethod<
  CreateSinkInput,
  CreateSinkOutput,
  CreateSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateSink",
    input: { Name: 0, Tags: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSink",
})) as any;

export type DeleteLinkError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a link between a monitoring account sink and a source account. You must run this operation in the source account.
 */
export const deleteLink: API.OperationMethod<
  DeleteLinkInput,
  DeleteLinkOutput,
  DeleteLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLink",
    input: { Identifier: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLink",
})) as any;

export type DeleteSinkError =
  | ConflictException
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a sink. You must delete all links to a sink before you can delete that sink.
 */
export const deleteSink: API.OperationMethod<
  DeleteSinkInput,
  DeleteSinkOutput,
  DeleteSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteSink",
    input: { Identifier: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSink",
})) as any;

export type GetLinkError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns complete information about one link.
 *
 * To use this operation, provide the link ARN. To retrieve a list of link ARNs, use ListLinks.
 */
export const getLink: API.OperationMethod<
  GetLinkInput,
  GetLinkOutput,
  GetLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetLink",
    input: { Identifier: 0, IncludeTags: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLink",
})) as any;

export type GetSinkError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns complete information about one monitoring account sink.
 *
 * To use this operation, provide the sink ARN. To retrieve a list of sink ARNs, use ListSinks.
 */
export const getSink: API.OperationMethod<
  GetSinkInput,
  GetSinkOutput,
  GetSinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetSink",
    input: { Identifier: 0, IncludeTags: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSink",
})) as any;

export type GetSinkPolicyError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current sink policy attached to this sink. The sink policy specifies what accounts can attach to this sink as source accounts, and what types of data they can share.
 */
export const getSinkPolicy: API.OperationMethod<
  GetSinkPolicyInput,
  GetSinkPolicyOutput,
  GetSinkPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetSinkPolicy",
    input: { SinkIdentifier: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSinkPolicy",
})) as any;

export type ListAttachedLinksError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of source account links that are linked to this monitoring account sink.
 *
 * To use this operation, provide the sink ARN. To retrieve a list of sink ARNs, use ListSinks.
 *
 * To find a list of links for one source account, use ListLinks.
 */
export const listAttachedLinks: API.PaginatedOperationMethod<
  ListAttachedLinksInput,
  ListAttachedLinksOutput,
  ListAttachedLinksError,
  Credentials | HttpClient.HttpClient,
  ListAttachedLinksItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListAttachedLinks",
    input: { MaxResults: 0, NextToken: 0, SinkIdentifier: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLinksError =
  | InternalServiceFault
  | InvalidParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use this operation in a source account to return a list of links to monitoring account sinks that this source account has.
 *
 * To find a list of links for one monitoring account sink, use ListAttachedLinks from within the monitoring account.
 */
export const listLinks: API.PaginatedOperationMethod<
  ListLinksInput,
  ListLinksOutput,
  ListLinksError,
  Credentials | HttpClient.HttpClient,
  ListLinksItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLinks",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSinksError =
  | InternalServiceFault
  | InvalidParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use this operation in a monitoring account to return the list of sinks created in that account.
 */
export const listSinks: API.PaginatedOperationMethod<
  ListSinksInput,
  ListSinksOutput,
  ListSinksError,
  Credentials | HttpClient.HttpClient,
  ListSinksItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListSinks",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSinks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the tags associated with a resource. Both sinks and links support tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutSinkPolicyError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates or updates the resource policy that grants permissions to source accounts to link to the monitoring account sink. When you create a sink policy, you can grant permissions to all accounts in an organization or to individual accounts.
 *
 * You can also use a sink policy to limit the types of data that is shared. The six types of services with their respective resource types that you can allow or deny are:
 *
 * - **Metrics** - Specify with `AWS::CloudWatch::Metric`
 *
 * - **Log groups** - Specify with `AWS::Logs::LogGroup`
 *
 * - **Traces** - Specify with `AWS::XRay::Trace`
 *
 * - **Application Insights - Applications** - Specify with `AWS::ApplicationInsights::Application`
 *
 * - **Internet Monitor** - Specify with `AWS::InternetMonitor::Monitor`
 *
 * - **Application Signals** - Specify with `AWS::ApplicationSignals::Service` and `AWS::ApplicationSignals::ServiceLevelObjective`
 *
 * See the examples in this section to see how to specify permitted source accounts and data types.
 */
export const putSinkPolicy: API.OperationMethod<
  PutSinkPolicyInput,
  PutSinkPolicyOutput,
  PutSinkPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutSinkPolicy",
    input: { SinkIdentifier: 0, Policy: 0 },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSinkPolicy",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource. Both sinks and links can be tagged.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with a resource that already has tags. If you specify a new tag key for the alarm, this tag is appended to the list of tags associated with the alarm. If you specify a tag key that is already associated with the alarm, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
 *
 * Unlike tagging permissions in other Amazon Web Services services, to tag or untag links and sinks you must have the `oam:ResourceTag` permission. The `iam:ResourceTag` permission does not allow you to tag and untag links and sinks.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 *
 * Unlike tagging permissions in other Amazon Web Services services, to tag or untag links and sinks you must have the `oam:ResourceTag` permission. The `iam:TagResource` permission does not allow you to tag and untag links and sinks.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateLinkError =
  | InternalServiceFault
  | InvalidParameterException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use this operation to change what types of data are shared from a source account to its linked monitoring account sink. You can't change the sink or change the monitoring account with this operation.
 *
 * When you update a link, you can optionally specify filters that specify which metric namespaces and which log groups are shared from the source account to the monitoring account.
 *
 * To update the list of tags associated with the sink, use TagResource.
 */
export const updateLink: API.OperationMethod<
  UpdateLinkInput,
  UpdateLinkOutput,
  UpdateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLink",
    input: {
      Identifier: 0,
      ResourceTypes: 0,
      LinkConfiguration: i_LinkConfiguration,
      IncludeTags: 0,
    },
    body: true,
  },
  errors: [
    InternalServiceFault,
    InvalidParameterException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLink",
})) as any;

const i_LinkConfiguration: D.LazyStruct = () => ({
  LogGroupConfiguration: { Filter: 0 },
  MetricConfiguration: { Filter: 0 },
});
