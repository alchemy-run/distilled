import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "PartnerCentral Revenue Measurement",
  serviceShapeName: "PartnerCentralRevenueMeasurement",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.SmithyProtocolsRpcv2Cbor();
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
    const _p0 = () => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: "us-gov-west-1" },
      ],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        { name: "sigv4a", signingRegionSet: ["*"] },
        { name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` },
      ],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(
        Endpoint,
        { authSchemes: [{ name: "sigv4a", signingRegionSet: ["*"] }, { name: "sigv4" }] },
        {},
      );
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === false) {
            return e(
              `https://partnercentral-prm.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov" && UseFIPS === true) {
            return e(
              `https://partnercentral-prm-fips.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (UseFIPS === true) {
            return e(
              `https://partnercentral-prm-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return e(
            `https://partnercentral-prm.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://partnercentral-prm.global.api.aws","properties":{"authSchemes":[{"name":"sigv4a","signingRegionSet":["*"]},{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
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
  prefix: "PartnerCentralRevenueMeasurement",
  service: "PartnerCentralRevenueMeasurement",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "AccessDeniedExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ConflictExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ResourceNotFoundExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ServiceQuotaExceededExceptionReason",
      }),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(145, __c18, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CatalogName = "AWS" | "Sandbox" | (string & {});
export type ClientToken = string;
export type MarketplaceProductIdentifier = string;
export type RevenueShareProductAccountType = "DEPLOYMENT" | "ORGANIZATION" | (string & {});
export type RevenueShareProductAccountId = string | redacted.Redacted<string>;
export type RevenueShareProductAccountIdList = (string | redacted.Redacted<string>)[];
export interface RevenueShareProductAccountEntry {
  AccountType: RevenueShareProductAccountType;
  AccountIds: (string | redacted.Redacted<string>)[];
}
export type RevenueShareProductAccountEntryList = RevenueShareProductAccountEntry[];
export interface MarketplaceRevenueShareProductEntry {
  ProductId: string;
  Accounts?: RevenueShareProductAccountEntry[] | undefined;
}
export type MarketplaceRevenueShareProductEntryList = MarketplaceRevenueShareProductEntry[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateMarketplaceRevenueShareInput {
  Catalog: CatalogName;
  ClientToken?: string | undefined;
  Products?: MarketplaceRevenueShareProductEntry[] | undefined;
  Tags?: Tag[] | undefined;
}
export type MarketplaceRevenueShareId = string;
export type MarketplaceRevenueShareArn = string;
export type MarketplaceProductId = string;
export type ProductCode = string;
export type RevenueShareProductAccountCount = number;
export interface RevenueShareProductAccountSummary {
  AccountType: RevenueShareProductAccountType;
  Count: number;
}
export type RevenueShareProductAccountSummaryList = RevenueShareProductAccountSummary[];
export interface MarketplaceRevenueShareProductSummary {
  ProductId: string;
  ProductCode?: string | undefined;
  ProductName?: string | undefined;
  Accounts?: RevenueShareProductAccountSummary[] | undefined;
}
export type MarketplaceRevenueShareProductSummaryList = MarketplaceRevenueShareProductSummary[];
export type RevisionToken = string;
export interface CreateMarketplaceRevenueShareOutput {
  Id: string;
  Arn: string;
  Catalog: CatalogName;
  Products: MarketplaceRevenueShareProductSummary[];
  CreatedDate: Date;
  LastModifiedDate: Date;
  Revision: string;
}
export type MarketplaceRevenueShareIdentifier = string;
export type AllocationEffectiveDateString = string;
export type RevenueSharePercent = string;
export interface CreateMarketplaceRevenueShareAllocationInput {
  Catalog: CatalogName;
  MarketplaceRevenueShareIdentifier?: string | undefined;
  ClientToken?: string | undefined;
  MarketplaceRevenueShareRevision?: string | undefined;
  EffectiveFrom: string;
  EffectiveUntil: string;
  RevenueSharePercent: string;
}
export type MarketplaceRevenueShareAllocationId = string;
export type AllocationStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface CreateMarketplaceRevenueShareAllocationOutput {
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareIdentifier: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  RevenueSharePercent: string;
  Status: AllocationStatus;
  CreatedDate: Date;
  LastModifiedDate: Date;
  MarketplaceRevenueShareRevision: string;
  MarketplaceRevenueShareLatestRevision: string;
}
export type TenancyModel = "MULTI_TENANT" | "SINGLE_TENANT" | (string & {});
export type ContextKey = string;
export type ContextValue = string;
export type RevenueAttributionContext = { [key: string]: string | undefined };
export interface CreateRevenueAttributionInput {
  Catalog: CatalogName;
  ClientToken?: string | undefined;
  Name: string;
  Description?: string | undefined;
  TenancyModel: TenancyModel;
  ProductIdentifier?: string | undefined;
  Tags?: Tag[] | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export type RevenueAttributionId = string;
export interface MarketplaceProductSummary {
  ProductId?: string | undefined;
  ProductCode?: string | undefined;
  ProductName?: string | undefined;
}
export interface CreateRevenueAttributionOutput {
  Id: string;
  Arn: string;
  Name?: string | undefined;
  Description?: string | undefined;
  TenancyModel: TenancyModel;
  MarketplaceProduct?: MarketplaceProductSummary | undefined;
  Revision?: string | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export interface GetMarketplaceRevenueShareInput {
  Catalog: CatalogName;
  Identifier?: string | undefined;
  Revision?: string | undefined;
}
export interface RevenueShareProductAccountDetail {
  AccountType: RevenueShareProductAccountType;
  Count: number;
  AccountIds: (string | redacted.Redacted<string>)[];
}
export type RevenueShareProductAccountDetailList = RevenueShareProductAccountDetail[];
export interface MarketplaceRevenueShareProductDetail {
  ProductId: string;
  ProductCode?: string | undefined;
  ProductName?: string | undefined;
  Accounts?: RevenueShareProductAccountDetail[] | undefined;
}
export type MarketplaceRevenueShareProductDetailList = MarketplaceRevenueShareProductDetail[];
export type AllocationCount = number;
export interface GetMarketplaceRevenueShareOutput {
  Id: string;
  Arn: string;
  Catalog: CatalogName;
  Products: MarketplaceRevenueShareProductDetail[];
  CreatedDate: Date;
  LastModifiedDate: Date;
  Revision: string;
  LatestRevision: string;
  EffectiveFrom?: string | undefined;
  EffectiveUntil?: string | undefined;
  TotalActiveMarketplaceRevenueShareAllocationCount: number;
  TotalMarketplaceRevenueShareAllocationCount: number;
}
export interface GetMarketplaceRevenueShareAllocationInput {
  Catalog: CatalogName;
  MarketplaceRevenueShareIdentifier?: string | undefined;
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareRevision?: string | undefined;
}
export interface GetMarketplaceRevenueShareAllocationOutput {
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareIdentifier: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  RevenueSharePercent: string;
  Status: AllocationStatus;
  CreatedDate: Date;
  LastModifiedDate: Date;
  MarketplaceRevenueShareRevision: string;
  MarketplaceRevenueShareLatestRevision: string;
}
export type RevenueAttributionIdentifier = string;
export interface GetRevenueAttributionInput {
  Catalog: CatalogName;
  Identifier: string;
  Revision?: string | undefined;
}
export interface GetRevenueAttributionOutput {
  Arn: string;
  Id: string;
  Catalog: CatalogName;
  Name?: string | undefined;
  Description?: string | undefined;
  TenancyModel: TenancyModel;
  MarketplaceProduct?: MarketplaceProductSummary | undefined;
  CreatedDate?: Date | undefined;
  LastModifiedDate?: Date | undefined;
  Revision?: string | undefined;
  LatestRevision?: string | undefined;
  EffectiveFrom?: string | undefined;
  EffectiveUntil?: string | undefined;
  TotalActiveRevenueAttributionAllocationCount?: number | undefined;
  TotalRevenueAttributionAllocationCount?: number | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export type RevenueAttributionAllocationId = string;
export interface GetRevenueAttributionAllocationInput {
  Catalog: CatalogName;
  RevenueAttributionIdentifier: string;
  RevenueAttributionAllocationId: string;
  RevenueAttributionRevision?: string | undefined;
}
export type EntityType = "OFFER" | "OPPORTUNITY" | (string & {});
export type EntityIdentifier = string;
export type CustomerAwsAccountId = string | redacted.Redacted<string>;
export interface GetRevenueAttributionAllocationOutput {
  RevenueAttributionAllocationId: string;
  RevenueAttributionIdentifier: string;
  EntityType: EntityType;
  EntityIdentifier: string;
  EntityName?: string | undefined;
  CustomerAwsAccountId: string | redacted.Redacted<string>;
  RevenueSharePercent: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  Status: AllocationStatus;
  CreatedDate: Date;
  LastModifiedDate: Date;
  RevenueAttributionRevision: string;
  RevenueAttributionLatestRevision: string;
}
export interface GetRevenueAttributionAllocationsTaskInput {
  Catalog: CatalogName;
  RevenueAttributionIdentifier: string;
}
export type RevenueAttributionAllocationTaskId = string;
export type RevenueAttributionAllocationTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export type RevenueAttributionAllocationAction = "CREATE" | "UPDATE" | (string & {});
export type RevenueAttributionAllocationErrorCode =
  | "ALLOCATION_CAP_EXCEEDED"
  | "RESOURCE_NOT_FOUND"
  | "IMMUTABLE_ALLOCATION"
  | "ACCESS_DENIED"
  | "INVALID_VALUE"
  | "CONCURRENT_MODIFICATION"
  | "INTERNAL_ERROR"
  | (string & {});
export interface RevenueAttributionAllocationErrorDetail {
  RevenueAttributionAllocationId?: string | undefined;
  EntityType: EntityType;
  EntityId: string;
  CustomerAwsAccountId: string | redacted.Redacted<string>;
  EffectiveFrom: string;
  EffectiveUntil: string;
  Action: RevenueAttributionAllocationAction;
  ErrorCode: RevenueAttributionAllocationErrorCode;
  ErrorMessage: string;
}
export type RevenueAttributionAllocationErrorDetailList = RevenueAttributionAllocationErrorDetail[];
export interface GetRevenueAttributionAllocationsTaskOutput {
  TaskId: string;
  Status: RevenueAttributionAllocationTaskStatus;
  Catalog: CatalogName;
  RevenueAttributionArn: string;
  StartedAt: Date;
  EndedAt?: Date | undefined;
  TotalRevenueAttributionAllocationRecords: number;
  Description?: string | undefined;
  RevenueAttributionLatestRevision?: string | undefined;
  ErrorDetailList?: RevenueAttributionAllocationErrorDetail[] | undefined;
}
export type MarketplaceRevenueShareAllocationSortField = "EffectiveFrom" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export type NextToken = string;
export interface ListMarketplaceRevenueShareAllocationsInput {
  Catalog: CatalogName;
  MarketplaceRevenueShareIdentifier?: string | undefined;
  StatusFilter?: AllocationStatus | undefined;
  AfterEffectiveFrom?: string | undefined;
  BeforeEffectiveFrom?: string | undefined;
  AfterEffectiveUntil?: string | undefined;
  BeforeEffectiveUntil?: string | undefined;
  SortBy?: MarketplaceRevenueShareAllocationSortField | undefined;
  SortOrder?: SortOrder | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  MarketplaceRevenueShareRevision?: string | undefined;
}
export interface MarketplaceRevenueShareAllocationSummary {
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareIdentifier?: string | undefined;
  EffectiveFrom: string;
  EffectiveUntil?: string | undefined;
  RevenueSharePercent: string;
  Status: AllocationStatus;
  CreatedDate?: Date | undefined;
  LastModifiedDate?: Date | undefined;
}
export type MarketplaceRevenueShareAllocationSummaryList =
  MarketplaceRevenueShareAllocationSummary[];
export interface ListMarketplaceRevenueShareAllocationsOutput {
  MarketplaceRevenueShareAllocationSummaries: (MarketplaceRevenueShareAllocationSummary & {
    MarketplaceRevenueShareIdentifier: MarketplaceRevenueShareId;
    EffectiveUntil: AllocationEffectiveDateString;
    CreatedDate: Date;
    LastModifiedDate: Date;
  })[];
  NextToken?: string | undefined;
}
export type MarketplaceRevenueShareIdentifierList = string[];
export type MarketplaceProductIdList = string[];
export type ProductCodeList = string[];
export type MarketplaceRevenueShareSortBy = "LastModifiedDate" | (string & {});
export interface ListMarketplaceRevenueSharesInput {
  Catalog: CatalogName;
  Identifiers?: string[] | undefined;
  ProductIds?: string[] | undefined;
  ProductCodes?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  SortBy?: MarketplaceRevenueShareSortBy | undefined;
  SortOrder?: SortOrder | undefined;
  CreatedAfter?: Date | undefined;
  CreatedBefore?: Date | undefined;
}
export interface MarketplaceRevenueShareSummary {
  Id?: string | undefined;
  Arn: string;
  Catalog?: CatalogName | undefined;
  Products?: MarketplaceRevenueShareProductSummary[] | undefined;
  CreatedDate?: Date | undefined;
  LastModifiedDate?: Date | undefined;
  LatestRevision?: string | undefined;
  EffectiveFrom?: string | undefined;
  EffectiveUntil?: string | undefined;
  TotalActiveMarketplaceRevenueShareAllocationCount?: number | undefined;
  TotalMarketplaceRevenueShareAllocationCount?: number | undefined;
}
export type MarketplaceRevenueShareSummaryList = MarketplaceRevenueShareSummary[];
export interface ListMarketplaceRevenueSharesOutput {
  MarketplaceRevenueShareSummaries: (MarketplaceRevenueShareSummary & {
    Id: MarketplaceRevenueShareId;
    Catalog: CatalogName;
    Products: MarketplaceRevenueShareProductSummaryList;
    CreatedDate: Date;
    LastModifiedDate: Date;
    LatestRevision: RevisionToken;
    TotalActiveMarketplaceRevenueShareAllocationCount: AllocationCount;
    TotalMarketplaceRevenueShareAllocationCount: AllocationCount;
  })[];
  NextToken?: string | undefined;
}
export type EntityTypeFilterList = EntityType[];
export type EntityIdentifierFilterList = string[];
export type CustomerAwsAccountIdFilterList = (string | redacted.Redacted<string>)[];
export type RevenueAttributionAllocationSortField = "EffectiveFrom" | (string & {});
export interface ListRevenueAttributionAllocationsInput {
  Catalog: CatalogName;
  RevenueAttributionIdentifier: string;
  EntityTypeFilters?: EntityType[] | undefined;
  EntityIdentifierFilters?: string[] | undefined;
  CustomerAwsAccountIdFilters?: (string | redacted.Redacted<string>)[] | undefined;
  StatusFilter?: AllocationStatus | undefined;
  AfterEffectiveFrom?: string | undefined;
  BeforeEffectiveFrom?: string | undefined;
  AfterEffectiveUntil?: string | undefined;
  BeforeEffectiveUntil?: string | undefined;
  SortBy?: RevenueAttributionAllocationSortField | undefined;
  SortOrder?: SortOrder | undefined;
  RevenueAttributionRevision?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface RevenueAttributionAllocationSummary {
  RevenueAttributionAllocationId: string;
  RevenueAttributionIdentifier: string;
  EntityType: EntityType;
  EntityIdentifier: string;
  EntityName?: string | undefined;
  CustomerAwsAccountId: string | redacted.Redacted<string>;
  RevenueSharePercent: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  Status: AllocationStatus;
}
export type RevenueAttributionAllocationSummaryList = RevenueAttributionAllocationSummary[];
export interface ListRevenueAttributionAllocationsOutput {
  RevenueAttributionAllocationSummaries: RevenueAttributionAllocationSummary[];
  NextToken?: string | undefined;
}
export type RevenueAttributionIdentifierList = string[];
export type AttributionSortBy = "LastModifiedDate" | (string & {});
export type ContextFilterValueList = string[];
export interface ContextFilter {
  Key: string;
  Values?: string[] | undefined;
}
export type ContextFilterList = ContextFilter[];
export interface ListRevenueAttributionsInput {
  Catalog: CatalogName;
  Identifiers?: string[] | undefined;
  CreatedAfter?: Date | undefined;
  CreatedBefore?: Date | undefined;
  SortBy?: AttributionSortBy | undefined;
  SortOrder?: SortOrder | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  ContextFilters?: ContextFilter[] | undefined;
}
export interface AttributionSummary {
  Arn?: string | undefined;
  Id?: string | undefined;
  Catalog?: CatalogName | undefined;
  Name?: string | undefined;
  TenancyModel: TenancyModel;
  MarketplaceProduct?: MarketplaceProductSummary | undefined;
  CreatedDate?: Date | undefined;
  LastModifiedDate?: Date | undefined;
  LatestRevision?: string | undefined;
  EffectiveFrom?: string | undefined;
  EffectiveUntil?: string | undefined;
  TotalActiveRevenueAttributionAllocationCount?: number | undefined;
  TotalRevenueAttributionAllocationCount?: number | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export type RevenueAttributionSummaries = AttributionSummary[];
export interface ListRevenueAttributionsOutput {
  RevenueAttributionSummaries?: AttributionSummary[] | undefined;
  NextToken?: string | undefined;
}
export type ResourceARN = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: Tag[] | undefined;
}
export interface RevenueShareAllocation {
  Action: RevenueAttributionAllocationAction;
  RevenueAttributionAllocationId?: string | undefined;
  EntityType: EntityType;
  EntityIdentifier: string;
  CustomerAwsAccountId: string | redacted.Redacted<string>;
  RevenueSharePercent: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  Status?: AllocationStatus | undefined;
}
export type RevenueShareAllocationChangeList = RevenueShareAllocation[];
export interface StartRevenueAttributionAllocationsTaskInput {
  Catalog: CatalogName;
  RevenueAttributionIdentifier: string;
  RevenueAttributionRevision: string;
  RevenueShareAllocations: RevenueShareAllocation[];
  ClientToken?: string | undefined;
  Description?: string | undefined;
}
export interface StartRevenueAttributionAllocationsTaskOutput {
  TaskId: string;
  Status: RevenueAttributionAllocationTaskStatus;
  Catalog: CatalogName;
  RevenueAttributionArn: string;
  StartedAt: Date;
  TotalRevenueAttributionAllocationRecords: number;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateMarketplaceRevenueShareInput {
  Catalog: CatalogName;
  Identifier: string;
  ClientToken?: string | undefined;
  Revision: string;
  Products: MarketplaceRevenueShareProductEntry[];
}
export interface UpdateMarketplaceRevenueShareOutput {
  Id: string;
  Arn: string;
  Products: MarketplaceRevenueShareProductSummary[];
  LastModifiedDate: Date;
  LatestRevision: string;
}
export interface UpdateMarketplaceRevenueShareAllocationInput {
  Catalog: CatalogName;
  MarketplaceRevenueShareIdentifier?: string | undefined;
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareRevision: string;
  ClientToken?: string | undefined;
  RevenueSharePercent?: string | undefined;
  Status?: AllocationStatus | undefined;
}
export interface UpdateMarketplaceRevenueShareAllocationOutput {
  MarketplaceRevenueShareAllocationId: string;
  MarketplaceRevenueShareIdentifier: string;
  EffectiveFrom: string;
  EffectiveUntil: string;
  RevenueSharePercent: string;
  Status: AllocationStatus;
  CreatedDate: Date;
  LastModifiedDate: Date;
  MarketplaceRevenueShareRevision: string;
  MarketplaceRevenueShareLatestRevision: string;
}
export interface UpdateRevenueAttributionInput {
  Catalog: CatalogName;
  Identifier: string;
  ClientToken?: string | undefined;
  Description?: string | undefined;
  Revision: string;
  Context?: { [key: string]: string | undefined } | undefined;
}
export interface UpdateRevenueAttributionOutput {
  Id: string;
  Arn: string;
  Description?: string | undefined;
  LastModifiedDate: Date;
  LatestRevision?: string | undefined;
  Context?: { [key: string]: string | undefined } | undefined;
}
export type AccessDeniedExceptionReason = "ACCESS_DENIED" | (string & {});
export type ConflictExceptionReason =
  | "CONFLICT_CLIENT_TOKEN"
  | "CONCURRENT_MODIFICATION"
  | "RESOURCE_ALREADY_EXISTS"
  | "REVISION_MISMATCH"
  | (string & {});
export type ResourceNotFoundExceptionReason = "RESOURCE_NOT_FOUND" | (string & {});
export type ServiceQuotaExceededExceptionReason =
  | "ATTRIBUTION_LIMIT_EXCEEDED"
  | "TAG_LIMIT_EXCEEDED"
  | (string & {});
export type ValidationExceptionReason =
  | "REQUEST_VALIDATION_FAILED"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export type FieldValidationCode =
  | "REQUIRED_FIELD_MISSING"
  | "DUPLICATE_VALUE"
  | "INVALID_VALUE"
  | "INVALID_STRING_FORMAT"
  | "TOO_MANY_VALUES"
  | "ACTION_NOT_PERMITTED"
  | "INVALID_ENUM_VALUE"
  | "INVALID_NUMBER_FORMAT"
  | "INVALID_STRING_LENGTH"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
  Code: FieldValidationCode;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateMarketplaceRevenueShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new marketplace revenue share resource in the specified catalog.
 */
export const createMarketplaceRevenueShare: API.OperationMethod<
  CreateMarketplaceRevenueShareInput & RegionInput,
  CreateMarketplaceRevenueShareOutput,
  CreateMarketplaceRevenueShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<CreateMarketplaceRevenueShareInput>,
  output: __S(153, __c19, 1) as any as S.Schema<CreateMarketplaceRevenueShareOutput>,
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
  operationName: "CreateMarketplaceRevenueShare",
  telemetry: TELEMETRY,
  span: "CreateMarketplaceRevenueShare",
}));

export type CreateMarketplaceRevenueShareAllocationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new allocation under the specified marketplace revenue share.
 */
export const createMarketplaceRevenueShareAllocation: API.OperationMethod<
  CreateMarketplaceRevenueShareAllocationInput & RegionInput,
  CreateMarketplaceRevenueShareAllocationOutput,
  CreateMarketplaceRevenueShareAllocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<CreateMarketplaceRevenueShareAllocationInput>,
  output: __S(200, __c25, 0) as any as S.Schema<CreateMarketplaceRevenueShareAllocationOutput>,
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
  operationName: "CreateMarketplaceRevenueShareAllocation",
  telemetry: TELEMETRY,
  span: "CreateMarketplaceRevenueShareAllocation",
}));

export type CreateRevenueAttributionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new revenue attribution record in the specified catalog.
 */
export const createRevenueAttribution: API.OperationMethod<
  CreateRevenueAttributionInput & RegionInput,
  CreateRevenueAttributionOutput,
  CreateRevenueAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<CreateRevenueAttributionInput>,
  output: __S(209, __c26, 1) as any as S.Schema<CreateRevenueAttributionOutput>,
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
  operationName: "CreateRevenueAttribution",
  telemetry: TELEMETRY,
  span: "CreateRevenueAttribution",
}));

export type GetMarketplaceRevenueShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific marketplace revenue share.
 */
export const getMarketplaceRevenueShare: API.OperationMethod<
  GetMarketplaceRevenueShareInput & RegionInput,
  GetMarketplaceRevenueShareOutput,
  GetMarketplaceRevenueShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetMarketplaceRevenueShareInput>,
  output: __S(5, __c0, 5) as any as S.Schema<GetMarketplaceRevenueShareOutput>,
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
  operationName: "GetMarketplaceRevenueShare",
  telemetry: TELEMETRY,
  span: "GetMarketplaceRevenueShare",
}));

export type GetMarketplaceRevenueShareAllocationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific marketplace revenue share allocation.
 */
export const getMarketplaceRevenueShareAllocation: API.OperationMethod<
  GetMarketplaceRevenueShareAllocationInput & RegionInput,
  GetMarketplaceRevenueShareAllocationOutput,
  GetMarketplaceRevenueShareAllocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<GetMarketplaceRevenueShareAllocationInput>,
  output: __S(200, __c25, 0) as any as S.Schema<GetMarketplaceRevenueShareAllocationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMarketplaceRevenueShareAllocation",
  telemetry: TELEMETRY,
  span: "GetMarketplaceRevenueShareAllocation",
}));

export type GetRevenueAttributionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific revenue attribution.
 */
export const getRevenueAttribution: API.OperationMethod<
  GetRevenueAttributionInput & RegionInput,
  GetRevenueAttributionOutput,
  GetRevenueAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<GetRevenueAttributionInput>,
  output: __S(17, __c2, 1) as any as S.Schema<GetRevenueAttributionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueAttribution",
  telemetry: TELEMETRY,
  span: "GetRevenueAttribution",
}));

export type GetRevenueAttributionAllocationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a single allocation by its RevenueAttributionAllocationId. Supports optional point-in-time version queries.
 */
export const getRevenueAttributionAllocation: API.OperationMethod<
  GetRevenueAttributionAllocationInput & RegionInput,
  GetRevenueAttributionAllocationOutput,
  GetRevenueAttributionAllocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<GetRevenueAttributionAllocationInput>,
  output: __S(25, __c3, 1) as any as S.Schema<GetRevenueAttributionAllocationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueAttributionAllocation",
  telemetry: TELEMETRY,
  span: "GetRevenueAttributionAllocation",
}));

export type GetRevenueAttributionAllocationsTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status of a previously submitted allocations task. When COMPLETE, includes the latest revision. When FAILED, includes error details.
 */
export const getRevenueAttributionAllocationsTask: API.OperationMethod<
  GetRevenueAttributionAllocationsTaskInput & RegionInput,
  GetRevenueAttributionAllocationsTaskOutput,
  GetRevenueAttributionAllocationsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetRevenueAttributionAllocationsTaskInput>,
  output: __S(35, __c4, 3) as any as S.Schema<GetRevenueAttributionAllocationsTaskOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevenueAttributionAllocationsTask",
  telemetry: TELEMETRY,
  span: "GetRevenueAttributionAllocationsTask",
}));

export type ListMarketplaceRevenueShareAllocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of allocations under a marketplace revenue share, with optional filtering by status and effective date range. Supports historical reads at a specific share revision.
 */
export const listMarketplaceRevenueShareAllocations: API.PaginatedOperationMethod<
  ListMarketplaceRevenueShareAllocationsInput & RegionInput,
  ListMarketplaceRevenueShareAllocationsOutput,
  ListMarketplaceRevenueShareAllocationsError,
  Credentials | HttpClient.HttpClient,
  MarketplaceRevenueShareAllocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<ListMarketplaceRevenueShareAllocationsInput>,
  output: __S(43, __c5, 3) as any as S.Schema<ListMarketplaceRevenueShareAllocationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMarketplaceRevenueShareAllocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MarketplaceRevenueShareAllocationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMarketplaceRevenueShareAllocations",
})) as any;

export type ListMarketplaceRevenueSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of marketplace revenue shares with optional filters.
 */
export const listMarketplaceRevenueShares: API.PaginatedOperationMethod<
  ListMarketplaceRevenueSharesInput & RegionInput,
  ListMarketplaceRevenueSharesOutput,
  ListMarketplaceRevenueSharesError,
  Credentials | HttpClient.HttpClient,
  MarketplaceRevenueShareSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<ListMarketplaceRevenueSharesInput>,
  output: __S(51, __c6, 3) as any as S.Schema<ListMarketplaceRevenueSharesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMarketplaceRevenueShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MarketplaceRevenueShareSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMarketplaceRevenueShares",
})) as any;

export type ListRevenueAttributionAllocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of committed allocations with support for filtering by entity, customer, status, or date range.
 */
export const listRevenueAttributionAllocations: API.PaginatedOperationMethod<
  ListRevenueAttributionAllocationsInput & RegionInput,
  ListRevenueAttributionAllocationsOutput,
  ListRevenueAttributionAllocationsError,
  Credentials | HttpClient.HttpClient,
  RevenueAttributionAllocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(65, __c8, 1) as any as S.Schema<ListRevenueAttributionAllocationsInput>,
  output: __S(68, __c8, 4) as any as S.Schema<ListRevenueAttributionAllocationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRevenueAttributionAllocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RevenueAttributionAllocationSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRevenueAttributionAllocations",
})) as any;

export type ListRevenueAttributionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of revenue attributions with optional filters.
 */
export const listRevenueAttributions: API.PaginatedOperationMethod<
  ListRevenueAttributionsInput & RegionInput,
  ListRevenueAttributionsOutput,
  ListRevenueAttributionsError,
  Credentials | HttpClient.HttpClient,
  AttributionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(74, __c9, 2) as any as S.Schema<ListRevenueAttributionsInput>,
  output: __S(77, __c9, 5) as any as S.Schema<ListRevenueAttributionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRevenueAttributions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RevenueAttributionSummaries",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRevenueAttributions",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the tags associated with the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(81, __c10, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type StartRevenueAttributionAllocationsTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a batch of up to 250 allocation changes (CREATE and/or UPDATE) for asynchronous processing. Returns a TaskId for tracking.
 */
export const startRevenueAttributionAllocationsTask: API.OperationMethod<
  StartRevenueAttributionAllocationsTaskInput & RegionInput,
  StartRevenueAttributionAllocationsTaskOutput,
  StartRevenueAttributionAllocationsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(90, __c11, 2) as any as S.Schema<StartRevenueAttributionAllocationsTaskInput>,
  output: __S(91, __c11, 3) as any as S.Schema<StartRevenueAttributionAllocationsTaskOutput>,
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
  operationName: "StartRevenueAttributionAllocationsTask",
  telemetry: TELEMETRY,
  span: "StartRevenueAttributionAllocationsTask",
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
 * Adds or overwrites one or more tags for the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<TagResourceInput>,
  output: __S(104, __c13, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceInput & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(104, __c13, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateMarketplaceRevenueShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Replaces the products of a marketplace revenue share. The request carries the complete desired set of products and their typed account lists; a product not listed is removed and its account lists cleared, and an empty Products list closes the marketplace revenue share. Closing is one-way.
 */
export const updateMarketplaceRevenueShare: API.OperationMethod<
  UpdateMarketplaceRevenueShareInput & RegionInput,
  UpdateMarketplaceRevenueShareOutput,
  UpdateMarketplaceRevenueShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<UpdateMarketplaceRevenueShareInput>,
  output: __S(121, __c15, 1) as any as S.Schema<UpdateMarketplaceRevenueShareOutput>,
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
  operationName: "UpdateMarketplaceRevenueShare",
  telemetry: TELEMETRY,
  span: "UpdateMarketplaceRevenueShare",
}));

export type UpdateMarketplaceRevenueShareAllocationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing marketplace revenue share allocation. Supports modifying the revenue share percentage and status only, with time-based mutability rules.
 */
export const updateMarketplaceRevenueShareAllocation: API.OperationMethod<
  UpdateMarketplaceRevenueShareAllocationInput & RegionInput,
  UpdateMarketplaceRevenueShareAllocationOutput,
  UpdateMarketplaceRevenueShareAllocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<UpdateMarketplaceRevenueShareAllocationInput>,
  output: __S(200, __c25, 0) as any as S.Schema<UpdateMarketplaceRevenueShareAllocationOutput>,
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
  operationName: "UpdateMarketplaceRevenueShareAllocation",
  telemetry: TELEMETRY,
  span: "UpdateMarketplaceRevenueShareAllocation",
}));

export type UpdateRevenueAttributionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing revenue attribution record.
 */
export const updateRevenueAttribution: API.OperationMethod<
  UpdateRevenueAttributionInput & RegionInput,
  UpdateRevenueAttributionOutput,
  UpdateRevenueAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<UpdateRevenueAttributionInput>,
  output: __S(137, __c17, 1) as any as S.Schema<UpdateRevenueAttributionOutput>,
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
  operationName: "UpdateRevenueAttribution",
  telemetry: TELEMETRY,
  span: "UpdateRevenueAttribution",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.optional(S.String),
          Revision: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetMarketplaceRevenueShare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMarketplaceRevenueShareInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountType: S.String, Count: S.Number, AccountIds: __S(160, __c20, 0) }),
      ).annotate({ identifier: "RevenueShareProductAccountDetail" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.String,
          ProductCode: S.optional(S.String),
          ProductName: S.optional(S.String),
          Accounts: S.optional(__S(2, __c0, 2)),
        }),
      ).annotate({ identifier: "MarketplaceRevenueShareProductDetail" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.String,
          Catalog: S.String,
          Products: S.optional(__S(4, __c0, 4)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Revision: S.optional(S.String),
          LatestRevision: S.optional(S.String),
          EffectiveFrom: S.optional(S.String),
          EffectiveUntil: S.optional(S.String),
          TotalActiveMarketplaceRevenueShareAllocationCount: S.optional(S.Number),
          TotalMarketplaceRevenueShareAllocationCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetMarketplaceRevenueShareOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          MarketplaceRevenueShareAllocationId: S.String,
          MarketplaceRevenueShareRevision: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetMarketplaceRevenueShareAllocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMarketplaceRevenueShareAllocationInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String, Revision: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetRevenueAttribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRevenueAttributionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Id: S.String,
          Catalog: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          TenancyModel: S.String,
          MarketplaceProduct: S.optional(__S(216, __c27, 0)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Revision: S.optional(S.String),
          LatestRevision: S.optional(S.String),
          EffectiveFrom: S.optional(S.String),
          EffectiveUntil: S.optional(S.String),
          TotalActiveRevenueAttributionAllocationCount: S.optional(S.Number),
          TotalRevenueAttributionAllocationCount: S.optional(S.Number),
          Context: S.optional(__S(224, __c28, 0)),
        }),
      ).annotate({ identifier: "GetRevenueAttributionOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          RevenueAttributionIdentifier: S.String,
          RevenueAttributionAllocationId: S.String,
          RevenueAttributionRevision: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetRevenueAttributionAllocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRevenueAttributionAllocationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RevenueAttributionAllocationId: S.String,
          RevenueAttributionIdentifier: S.String,
          EntityType: S.String,
          EntityIdentifier: S.String,
          EntityName: S.optional(S.String),
          CustomerAwsAccountId: SensitiveString,
          RevenueSharePercent: S.String,
          EffectiveFrom: S.String,
          EffectiveUntil: S.String,
          Status: S.String,
          CreatedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RevenueAttributionRevision: S.String,
          RevenueAttributionLatestRevision: S.String,
        }),
      ).annotate({ identifier: "GetRevenueAttributionAllocationOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, RevenueAttributionIdentifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetRevenueAttributionAllocationsTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRevenueAttributionAllocationsTaskInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RevenueAttributionAllocationId: S.optional(S.String),
          EntityType: S.String,
          EntityId: S.String,
          CustomerAwsAccountId: SensitiveString,
          EffectiveFrom: S.String,
          EffectiveUntil: S.String,
          Action: S.String,
          ErrorCode: S.String,
          ErrorMessage: S.String,
        }),
      ).annotate({ identifier: "RevenueAttributionAllocationErrorDetail" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.String,
          Status: S.String,
          Catalog: S.String,
          RevenueAttributionArn: S.String,
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalRevenueAttributionAllocationRecords: S.Number,
          Description: S.optional(S.String),
          RevenueAttributionLatestRevision: S.optional(S.String),
          ErrorDetailList: S.optional(__S(34, __c4, 2)),
        }),
      ).annotate({ identifier: "GetRevenueAttributionAllocationsTaskOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          StatusFilter: S.optional(S.String),
          AfterEffectiveFrom: S.optional(S.String),
          BeforeEffectiveFrom: S.optional(S.String),
          AfterEffectiveUntil: S.optional(S.String),
          BeforeEffectiveUntil: S.optional(S.String),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          MarketplaceRevenueShareRevision: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListMarketplaceRevenueShareAllocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMarketplaceRevenueShareAllocationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MarketplaceRevenueShareAllocationId: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          EffectiveFrom: S.String,
          EffectiveUntil: S.optional(S.String),
          RevenueSharePercent: S.String,
          Status: S.String,
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MarketplaceRevenueShareAllocationSummary" });
    case 2:
      return S.Array(__S(41, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MarketplaceRevenueShareAllocationSummaries: __S(42, __c5, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMarketplaceRevenueShareAllocationsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifiers: S.optional(__S(56, __c7, 0)),
          ProductIds: S.optional(__S(56, __c7, 0)),
          ProductCodes: S.optional(__S(56, __c7, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListMarketplaceRevenueShares" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMarketplaceRevenueSharesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.String,
          Catalog: S.optional(S.String),
          Products: S.optional(__S(171, __c21, 3)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestRevision: S.optional(S.String),
          EffectiveFrom: S.optional(S.String),
          EffectiveUntil: S.optional(S.String),
          TotalActiveMarketplaceRevenueShareAllocationCount: S.optional(S.Number),
          TotalMarketplaceRevenueShareAllocationCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MarketplaceRevenueShareSummary" });
    case 2:
      return S.Array(__S(49, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MarketplaceRevenueShareSummaries: __S(50, __c6, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMarketplaceRevenueSharesOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          RevenueAttributionIdentifier: S.String,
          EntityTypeFilters: S.optional(__S(64, __c8, 0)),
          EntityIdentifierFilters: S.optional(__S(56, __c7, 0)),
          CustomerAwsAccountIdFilters: S.optional(__S(160, __c20, 0)),
          StatusFilter: S.optional(S.String),
          AfterEffectiveFrom: S.optional(S.String),
          BeforeEffectiveFrom: S.optional(S.String),
          AfterEffectiveUntil: S.optional(S.String),
          BeforeEffectiveUntil: S.optional(S.String),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          RevenueAttributionRevision: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListRevenueAttributionAllocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRevenueAttributionAllocationsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RevenueAttributionAllocationId: S.String,
          RevenueAttributionIdentifier: S.String,
          EntityType: S.String,
          EntityIdentifier: S.String,
          EntityName: S.optional(S.String),
          CustomerAwsAccountId: SensitiveString,
          RevenueSharePercent: S.String,
          EffectiveFrom: S.String,
          EffectiveUntil: S.String,
          Status: S.String,
        }),
      ).annotate({ identifier: "RevenueAttributionAllocationSummary" });
    case 3:
      return S.Array(__S(66, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RevenueAttributionAllocationSummaries: __S(67, __c8, 3),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRevenueAttributionAllocationsOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.String, Values: S.optional(__S(56, __c7, 0)) }),
      ).annotate({ identifier: "ContextFilter" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifiers: S.optional(__S(56, __c7, 0)),
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ContextFilters: S.optional(__S(73, __c9, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListRevenueAttributions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRevenueAttributionsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Id: S.optional(S.String),
          Catalog: S.optional(S.String),
          Name: S.optional(S.String),
          TenancyModel: S.String,
          MarketplaceProduct: S.optional(__S(216, __c27, 0)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LatestRevision: S.optional(S.String),
          EffectiveFrom: S.optional(S.String),
          EffectiveUntil: S.optional(S.String),
          TotalActiveRevenueAttributionAllocationCount: S.optional(S.Number),
          TotalRevenueAttributionAllocationCount: S.optional(S.Number),
          Context: S.optional(__S(224, __c28, 0)),
        }),
      ).annotate({ identifier: "AttributionSummary" });
    case 4:
      return S.Array(__S(75, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RevenueAttributionSummaries: S.optional(__S(76, __c9, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRevenueAttributionsOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(185, __c23, 1)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          RevenueAttributionAllocationId: S.optional(S.String),
          EntityType: S.String,
          EntityIdentifier: S.String,
          CustomerAwsAccountId: SensitiveString,
          RevenueSharePercent: S.String,
          EffectiveFrom: S.String,
          EffectiveUntil: S.String,
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "RevenueShareAllocation" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          RevenueAttributionIdentifier: S.String,
          RevenueAttributionRevision: S.String,
          RevenueShareAllocations: __S(89, __c11, 1),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartRevenueAttributionAllocationsTask" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartRevenueAttributionAllocationsTaskInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.String,
          Status: S.String,
          Catalog: S.String,
          RevenueAttributionArn: S.String,
          StartedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          TotalRevenueAttributionAllocationRecords: S.Number,
        }),
      ).annotate({ identifier: "StartRevenueAttributionAllocationsTaskOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(185, __c23, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(56, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Revision: S.String,
          Products: __S(179, __c22, 3),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateMarketplaceRevenueShare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMarketplaceRevenueShareInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          Products: __S(171, __c21, 3),
          LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LatestRevision: S.String,
        }),
      ).annotate({ identifier: "UpdateMarketplaceRevenueShareOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          MarketplaceRevenueShareAllocationId: S.String,
          MarketplaceRevenueShareRevision: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          RevenueSharePercent: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateMarketplaceRevenueShareAllocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMarketplaceRevenueShareAllocationInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Identifier: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Description: S.optional(S.String),
          Revision: S.String,
          Context: S.optional(__S(224, __c28, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateRevenueAttribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRevenueAttributionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          Description: S.optional(S.String),
          LastModifiedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LatestRevision: S.optional(S.String),
          Context: S.optional(__S(224, __c28, 0)),
        }),
      ).annotate({ identifier: "UpdateRevenueAttributionOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String, Code: S.String }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(144, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Products: S.optional(__S(179, __c22, 3)),
          Tags: S.optional(__S(185, __c23, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateMarketplaceRevenueShare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMarketplaceRevenueShareInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.String,
          Catalog: S.optional(S.String),
          Products: S.optional(__S(171, __c21, 3)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Revision: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateMarketplaceRevenueShareOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AccountType: S.String, Count: S.Number })).annotate({
        identifier: "RevenueShareProductAccountSummary",
      });
    case 1:
      return S.Array(__S(168, __c21, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.String,
          ProductCode: S.optional(S.String),
          ProductName: S.optional(S.String),
          Accounts: S.optional(__S(169, __c21, 1)),
        }),
      ).annotate({ identifier: "MarketplaceRevenueShareProductSummary" });
    case 3:
      return S.Array(__S(170, __c21, 2));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountType: S.String, AccountIds: __S(160, __c20, 0) }),
      ).annotate({ identifier: "RevenueShareProductAccountEntry" });
    case 1:
      return S.Array(__S(176, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ProductId: S.String, Accounts: S.optional(__S(177, __c22, 1)) }),
      ).annotate({ identifier: "MarketplaceRevenueShareProductEntry" });
    case 3:
      return S.Array(__S(178, __c22, 2));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(184, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          MarketplaceRevenueShareRevision: S.optional(S.String),
          EffectiveFrom: S.String,
          EffectiveUntil: S.String,
          RevenueSharePercent: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateMarketplaceRevenueShareAllocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMarketplaceRevenueShareAllocationInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MarketplaceRevenueShareAllocationId: S.String,
          MarketplaceRevenueShareIdentifier: S.optional(S.String),
          EffectiveFrom: S.String,
          EffectiveUntil: S.optional(S.String),
          RevenueSharePercent: S.String,
          Status: S.String,
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MarketplaceRevenueShareRevision: S.optional(S.String),
          MarketplaceRevenueShareLatestRevision: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateMarketplaceRevenueShareAllocationOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.String,
          Description: S.optional(S.String),
          TenancyModel: S.String,
          ProductIdentifier: S.optional(S.String),
          Tags: S.optional(__S(185, __c23, 1)),
          Context: S.optional(__S(224, __c28, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateRevenueAttribution" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRevenueAttributionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Arn: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          TenancyModel: S.String,
          MarketplaceProduct: S.optional(__S(216, __c27, 0)),
          Revision: S.optional(S.String),
          Context: S.optional(__S(224, __c28, 0)),
        }),
      ).annotate({ identifier: "CreateRevenueAttributionOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProductId: S.optional(S.String),
          ProductCode: S.optional(S.String),
          ProductName: S.optional(S.String),
        }),
      ).annotate({ identifier: "MarketplaceProductSummary" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
