import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "BCM Pricing Calculator",
  target: "AWSBCMPricingCalculator",
  version: "2024-06-19",
  sigv4: "bcm-pricing-calculator",
  protocol: awsJson1_0Protocol,
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
    const _p0 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
              `https://bcm-pricing-calculator-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://bcm-pricing-calculator.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    code: "ConflictCode",
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class DataUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "DataUnavailableException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotFoundCode", status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { code: "ServiceQuotaCode", status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export type ResourceId = string;
export type Key = string;
export type UsageGroup = string;
export type AccountId = string;
export type Uuid = string;
export type ReservedInstanceInstanceCount = number;
export interface AddReservedInstanceAction {
  reservedInstancesOfferingId?: string;
  instanceCount?: number;
}
export type SavingsPlanCommitment = number;
export interface AddSavingsPlanAction {
  savingsPlanOfferingId?: string;
  commitment?: number;
}
export interface NegateReservedInstanceAction {
  reservedInstancesId?: string;
}
export interface NegateSavingsPlanAction {
  savingsPlanId?: string;
}
export type BillScenarioCommitmentModificationAction =
  | {
      addReservedInstanceAction: AddReservedInstanceAction;
      addSavingsPlanAction?: never;
      negateReservedInstanceAction?: never;
      negateSavingsPlanAction?: never;
    }
  | {
      addReservedInstanceAction?: never;
      addSavingsPlanAction: AddSavingsPlanAction;
      negateReservedInstanceAction?: never;
      negateSavingsPlanAction?: never;
    }
  | {
      addReservedInstanceAction?: never;
      addSavingsPlanAction?: never;
      negateReservedInstanceAction: NegateReservedInstanceAction;
      negateSavingsPlanAction?: never;
    }
  | {
      addReservedInstanceAction?: never;
      addSavingsPlanAction?: never;
      negateReservedInstanceAction?: never;
      negateSavingsPlanAction: NegateSavingsPlanAction;
    };
export interface BatchCreateBillScenarioCommitmentModificationEntry {
  key: string;
  group?: string;
  usageAccountId: string;
  commitmentAction: BillScenarioCommitmentModificationAction;
}
export type BatchCreateBillScenarioCommitmentModificationEntries =
  BatchCreateBillScenarioCommitmentModificationEntry[];
export type ClientToken = string;
export interface BatchCreateBillScenarioCommitmentModificationRequest {
  billScenarioId: string;
  commitmentModifications: BatchCreateBillScenarioCommitmentModificationEntry[];
  clientToken?: string;
}
export interface BatchCreateBillScenarioCommitmentModificationItem {
  key?: string;
  id?: string;
  group?: string;
  usageAccountId?: string;
  commitmentAction?: BillScenarioCommitmentModificationAction;
}
export type BatchCreateBillScenarioCommitmentModificationItems =
  BatchCreateBillScenarioCommitmentModificationItem[];
export type BatchCreateBillScenarioCommitmentModificationErrorCode =
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | "INVALID_ACCOUNT"
  | (string & {});
export interface BatchCreateBillScenarioCommitmentModificationError_ {
  key?: string;
  errorMessage?: string;
  errorCode?: BatchCreateBillScenarioCommitmentModificationErrorCode;
}
export type BatchCreateBillScenarioCommitmentModificationErrors =
  BatchCreateBillScenarioCommitmentModificationError_[];
export interface BatchCreateBillScenarioCommitmentModificationResponse {
  items?: BatchCreateBillScenarioCommitmentModificationItem[];
  errors?: BatchCreateBillScenarioCommitmentModificationError_[];
}
export type ServiceCode = string;
export type UsageType = string;
export type Operation = string;
export type AvailabilityZone = string;
export interface UsageAmount {
  startHour: Date;
  amount: number;
}
export type UsageAmounts = UsageAmount[];
export interface BillInterval {
  start?: Date;
  end?: Date;
}
export type ExpressionList = Expression[];
export type StringList = string[];
export interface ExpressionFilter {
  key?: string;
  matchOptions?: string[];
  values?: string[];
}
export interface Expression {
  and?: Expression[];
  or?: Expression[];
  not?: Expression;
  costCategories?: ExpressionFilter;
  dimensions?: ExpressionFilter;
  tags?: ExpressionFilter;
}
export interface HistoricalUsageEntity {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  usageAccountId: string;
  billInterval: BillInterval;
  filterExpression: Expression;
}
export interface BatchCreateBillScenarioUsageModificationEntry {
  serviceCode: string;
  usageType: string;
  operation: string;
  availabilityZone?: string;
  key: string;
  group?: string;
  usageAccountId: string;
  amounts?: UsageAmount[];
  historicalUsage?: HistoricalUsageEntity;
}
export type BatchCreateBillScenarioUsageModificationEntries =
  BatchCreateBillScenarioUsageModificationEntry[];
export interface BatchCreateBillScenarioUsageModificationRequest {
  billScenarioId: string;
  usageModifications: BatchCreateBillScenarioUsageModificationEntry[];
  clientToken?: string;
}
export interface UsageQuantity {
  startHour?: Date;
  unit?: string;
  amount?: number;
}
export type UsageQuantities = UsageQuantity[];
export interface BatchCreateBillScenarioUsageModificationItem {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  availabilityZone?: string;
  id?: string;
  group?: string;
  usageAccountId?: string;
  quantities?: UsageQuantity[];
  historicalUsage?: HistoricalUsageEntity;
  key?: string;
}
export type BatchCreateBillScenarioUsageModificationItems =
  BatchCreateBillScenarioUsageModificationItem[];
export type BatchCreateBillScenarioUsageModificationErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchCreateBillScenarioUsageModificationError_ {
  key?: string;
  errorMessage?: string;
  errorCode?: BatchCreateBillScenarioUsageModificationErrorCode;
}
export type BatchCreateBillScenarioUsageModificationErrors =
  BatchCreateBillScenarioUsageModificationError_[];
export interface BatchCreateBillScenarioUsageModificationResponse {
  items?: BatchCreateBillScenarioUsageModificationItem[];
  errors?: BatchCreateBillScenarioUsageModificationError_[];
}
export interface BatchCreateWorkloadEstimateUsageEntry {
  serviceCode: string;
  usageType: string;
  operation: string;
  key: string;
  group?: string;
  usageAccountId: string;
  amount: number;
  historicalUsage?: HistoricalUsageEntity;
}
export type BatchCreateWorkloadEstimateUsageEntries =
  BatchCreateWorkloadEstimateUsageEntry[];
export interface BatchCreateWorkloadEstimateUsageRequest {
  workloadEstimateId: string;
  usage: BatchCreateWorkloadEstimateUsageEntry[];
  clientToken?: string;
}
export interface WorkloadEstimateUsageQuantity {
  unit?: string;
  amount?: number;
}
export type CurrencyCode = "USD" | (string & {});
export type WorkloadEstimateCostStatus =
  | "VALID"
  | "INVALID"
  | "STALE"
  | (string & {});
export interface BatchCreateWorkloadEstimateUsageItem {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  id?: string;
  usageAccountId?: string;
  group?: string;
  quantity?: WorkloadEstimateUsageQuantity;
  cost?: number;
  currency?: CurrencyCode;
  status?: WorkloadEstimateCostStatus;
  historicalUsage?: HistoricalUsageEntity;
  key?: string;
}
export type BatchCreateWorkloadEstimateUsageItems =
  BatchCreateWorkloadEstimateUsageItem[];
export type BatchCreateWorkloadEstimateUsageCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchCreateWorkloadEstimateUsageError_ {
  key?: string;
  errorCode?: BatchCreateWorkloadEstimateUsageCode;
  errorMessage?: string;
}
export type BatchCreateWorkloadEstimateUsageErrors =
  BatchCreateWorkloadEstimateUsageError_[];
export interface BatchCreateWorkloadEstimateUsageResponse {
  items?: BatchCreateWorkloadEstimateUsageItem[];
  errors?: BatchCreateWorkloadEstimateUsageError_[];
}
export type BatchDeleteBillScenarioCommitmentModificationEntries = string[];
export interface BatchDeleteBillScenarioCommitmentModificationRequest {
  billScenarioId: string;
  ids: string[];
}
export type BatchDeleteBillScenarioCommitmentModificationErrorCode =
  | "BAD_REQUEST"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchDeleteBillScenarioCommitmentModificationError_ {
  id?: string;
  errorCode?: BatchDeleteBillScenarioCommitmentModificationErrorCode;
  errorMessage?: string;
}
export type BatchDeleteBillScenarioCommitmentModificationErrors =
  BatchDeleteBillScenarioCommitmentModificationError_[];
export interface BatchDeleteBillScenarioCommitmentModificationResponse {
  errors?: BatchDeleteBillScenarioCommitmentModificationError_[];
}
export type BatchDeleteBillScenarioUsageModificationEntries = string[];
export interface BatchDeleteBillScenarioUsageModificationRequest {
  billScenarioId: string;
  ids: string[];
}
export type BatchDeleteBillScenarioUsageModificationErrorCode =
  | "BAD_REQUEST"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchDeleteBillScenarioUsageModificationError_ {
  id?: string;
  errorMessage?: string;
  errorCode?: BatchDeleteBillScenarioUsageModificationErrorCode;
}
export type BatchDeleteBillScenarioUsageModificationErrors =
  BatchDeleteBillScenarioUsageModificationError_[];
export interface BatchDeleteBillScenarioUsageModificationResponse {
  errors?: BatchDeleteBillScenarioUsageModificationError_[];
}
export type BatchDeleteWorkloadEstimateUsageEntries = string[];
export interface BatchDeleteWorkloadEstimateUsageRequest {
  workloadEstimateId: string;
  ids: string[];
}
export type WorkloadEstimateUpdateUsageErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchDeleteWorkloadEstimateUsageError_ {
  id?: string;
  errorMessage?: string;
  errorCode?: WorkloadEstimateUpdateUsageErrorCode;
}
export type BatchDeleteWorkloadEstimateUsageErrors =
  BatchDeleteWorkloadEstimateUsageError_[];
export interface BatchDeleteWorkloadEstimateUsageResponse {
  errors?: BatchDeleteWorkloadEstimateUsageError_[];
}
export interface BatchUpdateBillScenarioCommitmentModificationEntry {
  id: string;
  group?: string;
}
export type BatchUpdateBillScenarioCommitmentModificationEntries =
  BatchUpdateBillScenarioCommitmentModificationEntry[];
export interface BatchUpdateBillScenarioCommitmentModificationRequest {
  billScenarioId: string;
  commitmentModifications: BatchUpdateBillScenarioCommitmentModificationEntry[];
}
export interface BillScenarioCommitmentModificationItem {
  id?: string;
  usageAccountId?: string;
  group?: string;
  commitmentAction?: BillScenarioCommitmentModificationAction;
}
export type BillScenarioCommitmentModificationItems =
  BillScenarioCommitmentModificationItem[];
export type BatchUpdateBillScenarioCommitmentModificationErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchUpdateBillScenarioCommitmentModificationError_ {
  id?: string;
  errorCode?: BatchUpdateBillScenarioCommitmentModificationErrorCode;
  errorMessage?: string;
}
export type BatchUpdateBillScenarioCommitmentModificationErrors =
  BatchUpdateBillScenarioCommitmentModificationError_[];
export interface BatchUpdateBillScenarioCommitmentModificationResponse {
  items?: BillScenarioCommitmentModificationItem[];
  errors?: BatchUpdateBillScenarioCommitmentModificationError_[];
}
export interface BatchUpdateBillScenarioUsageModificationEntry {
  id: string;
  group?: string;
  amounts?: UsageAmount[];
}
export type BatchUpdateBillScenarioUsageModificationEntries =
  BatchUpdateBillScenarioUsageModificationEntry[];
export interface BatchUpdateBillScenarioUsageModificationRequest {
  billScenarioId: string;
  usageModifications: BatchUpdateBillScenarioUsageModificationEntry[];
}
export interface BillScenarioUsageModificationItem {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  availabilityZone?: string;
  id?: string;
  group?: string;
  usageAccountId?: string;
  quantities?: UsageQuantity[];
  historicalUsage?: HistoricalUsageEntity;
}
export type BillScenarioUsageModificationItems =
  BillScenarioUsageModificationItem[];
export type BatchUpdateBillScenarioUsageModificationErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR"
  | (string & {});
export interface BatchUpdateBillScenarioUsageModificationError_ {
  id?: string;
  errorMessage?: string;
  errorCode?: BatchUpdateBillScenarioUsageModificationErrorCode;
}
export type BatchUpdateBillScenarioUsageModificationErrors =
  BatchUpdateBillScenarioUsageModificationError_[];
export interface BatchUpdateBillScenarioUsageModificationResponse {
  items?: BillScenarioUsageModificationItem[];
  errors?: BatchUpdateBillScenarioUsageModificationError_[];
}
export interface BatchUpdateWorkloadEstimateUsageEntry {
  id: string;
  group?: string;
  amount?: number;
}
export type BatchUpdateWorkloadEstimateUsageEntries =
  BatchUpdateWorkloadEstimateUsageEntry[];
export interface BatchUpdateWorkloadEstimateUsageRequest {
  workloadEstimateId: string;
  usage: BatchUpdateWorkloadEstimateUsageEntry[];
}
export interface WorkloadEstimateUsageItem {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  id?: string;
  usageAccountId?: string;
  group?: string;
  quantity?: WorkloadEstimateUsageQuantity;
  cost?: number;
  currency?: CurrencyCode;
  status?: WorkloadEstimateCostStatus;
  historicalUsage?: HistoricalUsageEntity;
}
export type WorkloadEstimateUsageItems = WorkloadEstimateUsageItem[];
export interface BatchUpdateWorkloadEstimateUsageError_ {
  id?: string;
  errorMessage?: string;
  errorCode?: WorkloadEstimateUpdateUsageErrorCode;
}
export type BatchUpdateWorkloadEstimateUsageErrors =
  BatchUpdateWorkloadEstimateUsageError_[];
export interface BatchUpdateWorkloadEstimateUsageResponse {
  items?: WorkloadEstimateUsageItem[];
  errors?: BatchUpdateWorkloadEstimateUsageError_[];
}
export type BillEstimateName = string;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateBillEstimateRequest {
  billScenarioId: string;
  name: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type BillEstimateStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export interface CostAmount {
  amount?: number;
  currency?: CurrencyCode;
}
export interface CostDifference {
  historicalCost?: CostAmount;
  estimatedCost?: CostAmount;
}
export type ServiceCostDifferenceMap = {
  [key: string]: CostDifference | undefined;
};
export interface BillEstimateCostSummary {
  totalCostDifference?: CostDifference;
  serviceCostDifferences?: { [key: string]: CostDifference | undefined };
}
export type GroupSharingPreferenceEnum =
  | "OPEN"
  | "PRIORITIZED"
  | "RESTRICTED"
  | (string & {});
export type CostCategoryArn = string;
export interface CreateBillEstimateResponse {
  id: string;
  name?: string;
  status?: BillEstimateStatus;
  failureMessage?: string;
  billInterval?: BillInterval;
  costSummary?: BillEstimateCostSummary;
  createdAt?: Date;
  expiresAt?: Date;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
  costCategoryGroupSharingPreferenceEffectiveDate?: Date;
}
export type BillScenarioName = string;
export interface CreateBillScenarioRequest {
  name: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export type BillScenarioStatus =
  | "READY"
  | "LOCKED"
  | "FAILED"
  | "STALE"
  | (string & {});
export interface CreateBillScenarioResponse {
  id: string;
  name?: string;
  billInterval?: BillInterval;
  status?: BillScenarioStatus;
  createdAt?: Date;
  expiresAt?: Date;
  failureMessage?: string;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export type WorkloadEstimateName = string;
export type WorkloadEstimateRateType =
  | "BEFORE_DISCOUNTS"
  | "AFTER_DISCOUNTS"
  | "AFTER_DISCOUNTS_AND_COMMITMENTS"
  | (string & {});
export interface CreateWorkloadEstimateRequest {
  name: string;
  clientToken?: string;
  rateType?: WorkloadEstimateRateType;
  tags?: { [key: string]: string | undefined };
}
export type WorkloadEstimateStatus =
  | "UPDATING"
  | "VALID"
  | "INVALID"
  | "ACTION_NEEDED"
  | (string & {});
export interface CreateWorkloadEstimateResponse {
  id: string;
  name?: string;
  createdAt?: Date;
  expiresAt?: Date;
  rateType?: WorkloadEstimateRateType;
  rateTimestamp?: Date;
  status?: WorkloadEstimateStatus;
  totalCost?: number;
  costCurrency?: CurrencyCode;
  failureMessage?: string;
}
export interface DeleteBillEstimateRequest {
  identifier: string;
}
export interface DeleteBillEstimateResponse {}
export interface DeleteBillScenarioRequest {
  identifier: string;
}
export interface DeleteBillScenarioResponse {}
export interface DeleteWorkloadEstimateRequest {
  identifier: string;
}
export interface DeleteWorkloadEstimateResponse {}
export interface GetBillEstimateRequest {
  identifier: string;
}
export interface GetBillEstimateResponse {
  id: string;
  name?: string;
  status?: BillEstimateStatus;
  failureMessage?: string;
  billInterval?: BillInterval;
  costSummary?: BillEstimateCostSummary;
  createdAt?: Date;
  expiresAt?: Date;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
  costCategoryGroupSharingPreferenceEffectiveDate?: Date;
}
export interface GetBillScenarioRequest {
  identifier: string;
}
export interface GetBillScenarioResponse {
  id: string;
  name?: string;
  billInterval?: BillInterval;
  status?: BillScenarioStatus;
  createdAt?: Date;
  expiresAt?: Date;
  failureMessage?: string;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export interface GetPreferencesRequest {}
export type RateType =
  | "BEFORE_DISCOUNTS"
  | "AFTER_DISCOUNTS"
  | "AFTER_DISCOUNTS_AND_COMMITMENTS"
  | (string & {});
export type RateTypes = RateType[];
export interface GetPreferencesResponse {
  managementAccountRateTypeSelections?: RateType[];
  memberAccountRateTypeSelections?: RateType[];
  standaloneAccountRateTypeSelections?: RateType[];
}
export interface GetWorkloadEstimateRequest {
  identifier: string;
}
export interface GetWorkloadEstimateResponse {
  id: string;
  name?: string;
  createdAt?: Date;
  expiresAt?: Date;
  rateType?: WorkloadEstimateRateType;
  rateTimestamp?: Date;
  status?: WorkloadEstimateStatus;
  totalCost?: number;
  costCurrency?: CurrencyCode;
  failureMessage?: string;
}
export type NextPageToken = string;
export type MaxResults = number;
export interface ListBillEstimateCommitmentsRequest {
  billEstimateId: string;
  nextToken?: string;
  maxResults?: number;
}
export type PurchaseAgreementType =
  | "SAVINGS_PLANS"
  | "RESERVED_INSTANCE"
  | (string & {});
export interface BillEstimateCommitmentSummary {
  id?: string;
  purchaseAgreementType?: PurchaseAgreementType;
  offeringId?: string;
  usageAccountId?: string;
  region?: string;
  termLength?: string;
  paymentOption?: string;
  upfrontPayment?: CostAmount;
  monthlyPayment?: CostAmount;
}
export type BillEstimateCommitmentSummaries = BillEstimateCommitmentSummary[];
export interface ListBillEstimateCommitmentsResponse {
  items?: BillEstimateCommitmentSummary[];
  nextToken?: string;
}
export interface ListBillEstimateInputCommitmentModificationsRequest {
  billEstimateId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BillEstimateInputCommitmentModificationSummary {
  id?: string;
  group?: string;
  usageAccountId?: string;
  commitmentAction?: BillScenarioCommitmentModificationAction;
}
export type BillEstimateInputCommitmentModificationSummaries =
  BillEstimateInputCommitmentModificationSummary[];
export interface ListBillEstimateInputCommitmentModificationsResponse {
  items?: BillEstimateInputCommitmentModificationSummary[];
  nextToken?: string;
}
export type ListUsageFilterName =
  | "USAGE_ACCOUNT_ID"
  | "SERVICE_CODE"
  | "USAGE_TYPE"
  | "OPERATION"
  | "LOCATION"
  | "USAGE_GROUP"
  | "HISTORICAL_USAGE_ACCOUNT_ID"
  | "HISTORICAL_SERVICE_CODE"
  | "HISTORICAL_USAGE_TYPE"
  | "HISTORICAL_OPERATION"
  | "HISTORICAL_LOCATION"
  | (string & {});
export type ListUsageFilterValues = string[];
export type MatchOption = "EQUALS" | "STARTS_WITH" | "CONTAINS" | (string & {});
export interface ListUsageFilter {
  name: ListUsageFilterName;
  values: string[];
  matchOption?: MatchOption;
}
export type ListUsageFilters = ListUsageFilter[];
export interface ListBillEstimateInputUsageModificationsRequest {
  billEstimateId: string;
  filters?: ListUsageFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface BillEstimateInputUsageModificationSummary {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  availabilityZone?: string;
  id?: string;
  group?: string;
  usageAccountId?: string;
  quantities?: UsageQuantity[];
  historicalUsage?: HistoricalUsageEntity;
}
export type BillEstimateInputUsageModificationSummaries =
  BillEstimateInputUsageModificationSummary[];
export interface ListBillEstimateInputUsageModificationsResponse {
  items?: BillEstimateInputUsageModificationSummary[];
  nextToken?: string;
}
export type ListBillEstimateLineItemsFilterName =
  | "USAGE_ACCOUNT_ID"
  | "SERVICE_CODE"
  | "USAGE_TYPE"
  | "OPERATION"
  | "LOCATION"
  | "LINE_ITEM_TYPE"
  | (string & {});
export type ListBillEstimateLineItemsFilterValues = string[];
export interface ListBillEstimateLineItemsFilter {
  name: ListBillEstimateLineItemsFilterName;
  values: string[];
  matchOption?: MatchOption;
}
export type ListBillEstimateLineItemsFilters =
  ListBillEstimateLineItemsFilter[];
export interface ListBillEstimateLineItemsRequest {
  billEstimateId: string;
  filters?: ListBillEstimateLineItemsFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface UsageQuantityResult {
  amount?: number;
  unit?: string;
}
export type SavingsPlanArns = string[];
export interface BillEstimateLineItemSummary {
  serviceCode: string;
  usageType: string;
  operation: string;
  location?: string;
  availabilityZone?: string;
  id?: string;
  lineItemId?: string;
  lineItemType?: string;
  payerAccountId?: string;
  usageAccountId?: string;
  estimatedUsageQuantity?: UsageQuantityResult;
  estimatedCost?: CostAmount;
  historicalUsageQuantity?: UsageQuantityResult;
  historicalCost?: CostAmount;
  savingsPlanArns?: string[];
}
export type BillEstimateLineItemSummaries = BillEstimateLineItemSummary[];
export interface ListBillEstimateLineItemsResponse {
  items?: BillEstimateLineItemSummary[];
  nextToken?: string;
}
export type ListBillEstimatesFilterName = "STATUS" | "NAME" | (string & {});
export type ListBillEstimatesFilterValues = string[];
export interface ListBillEstimatesFilter {
  name: ListBillEstimatesFilterName;
  values: string[];
  matchOption?: MatchOption;
}
export type ListBillEstimatesFilters = ListBillEstimatesFilter[];
export interface FilterTimestamp {
  afterTimestamp?: Date;
  beforeTimestamp?: Date;
}
export interface ListBillEstimatesRequest {
  filters?: ListBillEstimatesFilter[];
  createdAtFilter?: FilterTimestamp;
  expiresAtFilter?: FilterTimestamp;
  nextToken?: string;
  maxResults?: number;
}
export interface BillEstimateSummary {
  id: string;
  name?: string;
  status?: BillEstimateStatus;
  billInterval?: BillInterval;
  createdAt?: Date;
  expiresAt?: Date;
}
export type BillEstimateSummaries = BillEstimateSummary[];
export interface ListBillEstimatesResponse {
  items?: BillEstimateSummary[];
  nextToken?: string;
}
export interface ListBillScenarioCommitmentModificationsRequest {
  billScenarioId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListBillScenarioCommitmentModificationsResponse {
  items?: BillScenarioCommitmentModificationItem[];
  nextToken?: string;
}
export type ListBillScenariosFilterName =
  | "STATUS"
  | "NAME"
  | "GROUP_SHARING_PREFERENCE"
  | "COST_CATEGORY_ARN"
  | (string & {});
export type ListBillScenariosFilterValues = string[];
export interface ListBillScenariosFilter {
  name: ListBillScenariosFilterName;
  values: string[];
  matchOption?: MatchOption;
}
export type ListBillScenariosFilters = ListBillScenariosFilter[];
export interface ListBillScenariosRequest {
  filters?: ListBillScenariosFilter[];
  createdAtFilter?: FilterTimestamp;
  expiresAtFilter?: FilterTimestamp;
  nextToken?: string;
  maxResults?: number;
}
export interface BillScenarioSummary {
  id: string;
  name?: string;
  billInterval?: BillInterval;
  status?: BillScenarioStatus;
  createdAt?: Date;
  expiresAt?: Date;
  failureMessage?: string;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export type BillScenarioSummaries = BillScenarioSummary[];
export interface ListBillScenariosResponse {
  items?: BillScenarioSummary[];
  nextToken?: string;
}
export interface ListBillScenarioUsageModificationsRequest {
  billScenarioId: string;
  filters?: ListUsageFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface ListBillScenarioUsageModificationsResponse {
  items?: BillScenarioUsageModificationItem[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  arn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ListWorkloadEstimatesFilterName = "STATUS" | "NAME" | (string & {});
export type ListWorkloadEstimatesFilterValues = string[];
export interface ListWorkloadEstimatesFilter {
  name: ListWorkloadEstimatesFilterName;
  values: string[];
  matchOption?: MatchOption;
}
export type ListWorkloadEstimatesFilters = ListWorkloadEstimatesFilter[];
export interface ListWorkloadEstimatesRequest {
  createdAtFilter?: FilterTimestamp;
  expiresAtFilter?: FilterTimestamp;
  filters?: ListWorkloadEstimatesFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface WorkloadEstimateSummary {
  id: string;
  name?: string;
  createdAt?: Date;
  expiresAt?: Date;
  rateType?: WorkloadEstimateRateType;
  rateTimestamp?: Date;
  status?: WorkloadEstimateStatus;
  totalCost?: number;
  costCurrency?: CurrencyCode;
  failureMessage?: string;
}
export type WorkloadEstimateSummaries = WorkloadEstimateSummary[];
export interface ListWorkloadEstimatesResponse {
  items?: WorkloadEstimateSummary[];
  nextToken?: string;
}
export type WorkloadEstimateUsageMaxResults = number;
export interface ListWorkloadEstimateUsageRequest {
  workloadEstimateId: string;
  filters?: ListUsageFilter[];
  nextToken?: string;
  maxResults?: number;
}
export interface ListWorkloadEstimateUsageResponse {
  items?: WorkloadEstimateUsageItem[];
  nextToken?: string;
}
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type ResourceTagKeys = string[];
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBillEstimateRequest {
  identifier: string;
  name?: string;
  expiresAt?: Date;
}
export interface UpdateBillEstimateResponse {
  id: string;
  name?: string;
  status?: BillEstimateStatus;
  failureMessage?: string;
  billInterval?: BillInterval;
  costSummary?: BillEstimateCostSummary;
  createdAt?: Date;
  expiresAt?: Date;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
  costCategoryGroupSharingPreferenceEffectiveDate?: Date;
}
export interface UpdateBillScenarioRequest {
  identifier: string;
  name?: string;
  expiresAt?: Date;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export interface UpdateBillScenarioResponse {
  id: string;
  name?: string;
  billInterval?: BillInterval;
  status?: BillScenarioStatus;
  createdAt?: Date;
  expiresAt?: Date;
  failureMessage?: string;
  groupSharingPreference?: GroupSharingPreferenceEnum;
  costCategoryGroupSharingPreferenceArn?: string;
}
export interface UpdatePreferencesRequest {
  managementAccountRateTypeSelections?: RateType[];
  memberAccountRateTypeSelections?: RateType[];
  standaloneAccountRateTypeSelections?: RateType[];
}
export interface UpdatePreferencesResponse {
  managementAccountRateTypeSelections?: RateType[];
  memberAccountRateTypeSelections?: RateType[];
  standaloneAccountRateTypeSelections?: RateType[];
}
export interface UpdateWorkloadEstimateRequest {
  identifier: string;
  name?: string;
  expiresAt?: Date;
}
export interface UpdateWorkloadEstimateResponse {
  id: string;
  name?: string;
  createdAt?: Date;
  expiresAt?: Date;
  rateType?: WorkloadEstimateRateType;
  rateTimestamp?: Date;
  status?: WorkloadEstimateStatus;
  totalCost?: number;
  costCurrency?: CurrencyCode;
  failureMessage?: string;
}
export type BatchCreateBillScenarioCommitmentModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Create Compute Savings Plans, EC2 Instance Savings Plans, or EC2 Reserved Instances commitments that you want to model in a Bill Scenario.
 *
 * The `BatchCreateBillScenarioCommitmentModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:CreateBillScenarioCommitmentModification` in your policies.
 */
export const batchCreateBillScenarioCommitmentModification: API.OperationMethod<
  BatchCreateBillScenarioCommitmentModificationRequest,
  BatchCreateBillScenarioCommitmentModificationResponse,
  BatchCreateBillScenarioCommitmentModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      commitmentModifications: D.list({
        key: 0,
        group: 0,
        usageAccountId: 0,
        commitmentAction: {
          addReservedInstanceAction: {
            reservedInstancesOfferingId: 0,
            instanceCount: 0,
          },
          addSavingsPlanAction: { savingsPlanOfferingId: 0, commitment: 0 },
          negateReservedInstanceAction: { reservedInstancesId: 0 },
          negateSavingsPlanAction: { savingsPlanId: 0 },
        },
      }),
      clientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateBillScenarioCommitmentModification",
})) as any;

export type BatchCreateBillScenarioUsageModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create Amazon Web Services service usage that you want to model in a Bill Scenario.
 *
 * The `BatchCreateBillScenarioUsageModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:CreateBillScenarioUsageModification` in your policies.
 */
export const batchCreateBillScenarioUsageModification: API.OperationMethod<
  BatchCreateBillScenarioUsageModificationRequest,
  BatchCreateBillScenarioUsageModificationResponse,
  BatchCreateBillScenarioUsageModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      usageModifications: D.list({
        serviceCode: 0,
        usageType: 0,
        operation: 0,
        availabilityZone: 0,
        key: 0,
        group: 0,
        usageAccountId: 0,
        amounts: D.list(i_UsageAmount),
        historicalUsage: i_HistoricalUsageEntity,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      items: D.list({
        quantities: D.list(o_UsageQuantity),
        historicalUsage: o_HistoricalUsageEntity,
      }),
    },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateBillScenarioUsageModification",
})) as any;

export type BatchCreateWorkloadEstimateUsageError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Create Amazon Web Services service usage that you want to model in a Workload Estimate.
 *
 * The `BatchCreateWorkloadEstimateUsage` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:CreateWorkloadEstimateUsage` in your policies.
 */
export const batchCreateWorkloadEstimateUsage: API.OperationMethod<
  BatchCreateWorkloadEstimateUsageRequest,
  BatchCreateWorkloadEstimateUsageResponse,
  BatchCreateWorkloadEstimateUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      workloadEstimateId: 0,
      usage: D.list({
        serviceCode: 0,
        usageType: 0,
        operation: 0,
        key: 0,
        group: 0,
        usageAccountId: 0,
        amount: 0,
        historicalUsage: i_HistoricalUsageEntity,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { items: D.list({ historicalUsage: o_HistoricalUsageEntity }) },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateWorkloadEstimateUsage",
})) as any;

export type BatchDeleteBillScenarioCommitmentModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete commitment that you have created in a Bill Scenario. You can only delete a commitment that you had added and cannot model deletion (or removal) of a existing commitment. If you want model deletion of an existing commitment, see the negate BillScenarioCommitmentModificationAction of BatchCreateBillScenarioCommitmentModification operation.
 *
 * The `BatchDeleteBillScenarioCommitmentModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:DeleteBillScenarioCommitmentModification` in your policies.
 */
export const batchDeleteBillScenarioCommitmentModification: API.OperationMethod<
  BatchDeleteBillScenarioCommitmentModificationRequest,
  BatchDeleteBillScenarioCommitmentModificationResponse,
  BatchDeleteBillScenarioCommitmentModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { billScenarioId: 0, ids: 0 } },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteBillScenarioCommitmentModification",
})) as any;

export type BatchDeleteBillScenarioUsageModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Delete usage that you have created in a Bill Scenario. You can only delete usage that you had added and cannot model deletion (or removal) of a existing usage. If you want model removal of an existing usage, see BatchUpdateBillScenarioUsageModification.
 *
 * The `BatchDeleteBillScenarioUsageModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:DeleteBillScenarioUsageModification` in your policies.
 */
export const batchDeleteBillScenarioUsageModification: API.OperationMethod<
  BatchDeleteBillScenarioUsageModificationRequest,
  BatchDeleteBillScenarioUsageModificationResponse,
  BatchDeleteBillScenarioUsageModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { billScenarioId: 0, ids: 0 } },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteBillScenarioUsageModification",
})) as any;

export type BatchDeleteWorkloadEstimateUsageError =
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Delete usage that you have created in a Workload estimate. You can only delete usage that you had added and cannot model deletion (or removal) of a existing usage. If you want model removal of an existing usage, see BatchUpdateWorkloadEstimateUsage.
 *
 * The `BatchDeleteWorkloadEstimateUsage` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:DeleteWorkloadEstimateUsage` in your policies.
 */
export const batchDeleteWorkloadEstimateUsage: API.OperationMethod<
  BatchDeleteWorkloadEstimateUsageRequest,
  BatchDeleteWorkloadEstimateUsageResponse,
  BatchDeleteWorkloadEstimateUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { workloadEstimateId: 0, ids: 0 } },
  errors: [
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteWorkloadEstimateUsage",
})) as any;

export type BatchUpdateBillScenarioCommitmentModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update a newly added or existing commitment. You can update the commitment group based on a commitment ID and a Bill scenario ID.
 *
 * The `BatchUpdateBillScenarioCommitmentModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:UpdateBillScenarioCommitmentModification` in your policies.
 */
export const batchUpdateBillScenarioCommitmentModification: API.OperationMethod<
  BatchUpdateBillScenarioCommitmentModificationRequest,
  BatchUpdateBillScenarioCommitmentModificationResponse,
  BatchUpdateBillScenarioCommitmentModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      commitmentModifications: D.list({ id: 0, group: 0 }),
    },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateBillScenarioCommitmentModification",
})) as any;

export type BatchUpdateBillScenarioUsageModificationError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Update a newly added or existing usage lines. You can update the usage amounts, usage hour, and usage group based on a usage ID and a Bill scenario ID.
 *
 * The `BatchUpdateBillScenarioUsageModification` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:UpdateBillScenarioUsageModification` in your policies.
 */
export const batchUpdateBillScenarioUsageModification: API.OperationMethod<
  BatchUpdateBillScenarioUsageModificationRequest,
  BatchUpdateBillScenarioUsageModificationResponse,
  BatchUpdateBillScenarioUsageModificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      usageModifications: D.list({
        id: 0,
        group: 0,
        amounts: D.list(i_UsageAmount),
      }),
    },
    output: { items: D.list(o_BillScenarioUsageModificationItem) },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateBillScenarioUsageModification",
})) as any;

export type BatchUpdateWorkloadEstimateUsageError =
  | DataUnavailableException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Update a newly added or existing usage lines. You can update the usage amounts and usage group based on a usage ID and a Workload estimate ID.
 *
 * The `BatchUpdateWorkloadEstimateUsage` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `bcm-pricing-calculator:UpdateWorkloadEstimateUsage` in your policies.
 */
export const batchUpdateWorkloadEstimateUsage: API.OperationMethod<
  BatchUpdateWorkloadEstimateUsageRequest,
  BatchUpdateWorkloadEstimateUsageResponse,
  BatchUpdateWorkloadEstimateUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      workloadEstimateId: 0,
      usage: D.list({ id: 0, group: 0, amount: 0 }),
    },
    output: { items: D.list(o_WorkloadEstimateUsageItem) },
  },
  errors: [
    DataUnavailableException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateWorkloadEstimateUsage",
})) as any;

export type CreateBillEstimateError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Create a Bill estimate from a Bill scenario. In the Bill scenario you can model usage addition, usage changes, and usage removal. You can also model commitment addition and commitment removal. After all changes in a Bill scenario is made satisfactorily, you can call this API with a Bill scenario ID to generate the Bill estimate. Bill estimate calculates the pre-tax cost for your consolidated billing family, incorporating all modeled usage and commitments alongside existing usage and commitments from your most recent completed anniversary bill, with any applicable discounts applied.
 */
export const createBillEstimate: API.OperationMethod<
  CreateBillEstimateRequest,
  CreateBillEstimateResponse,
  CreateBillEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      name: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: {
      billInterval: o_BillInterval,
      createdAt: D.ts,
      expiresAt: D.ts,
      costCategoryGroupSharingPreferenceEffectiveDate: D.ts,
    },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillEstimate",
})) as any;

export type CreateBillScenarioError =
  | ConflictException
  | DataUnavailableException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new bill scenario to model potential changes to Amazon Web Services usage and costs.
 */
export const createBillScenario: API.OperationMethod<
  CreateBillScenarioRequest,
  CreateBillScenarioResponse,
  CreateBillScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      groupSharingPreference: 0,
      costCategoryGroupSharingPreferenceArn: 0,
    },
    output: { billInterval: o_BillInterval, createdAt: D.ts, expiresAt: D.ts },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillScenario",
})) as any;

export type CreateWorkloadEstimateError =
  | ConflictException
  | DataUnavailableException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new workload estimate to model costs for a specific workload.
 */
export const createWorkloadEstimate: API.OperationMethod<
  CreateWorkloadEstimateRequest,
  CreateWorkloadEstimateResponse,
  CreateWorkloadEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      clientToken: D.m({ idempotency: true }),
      rateType: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, expiresAt: D.ts, rateTimestamp: D.ts },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkloadEstimate",
})) as any;

export type DeleteBillEstimateError =
  | ConflictException
  | DataUnavailableException
  | CommonErrors;
/**
 * Deletes an existing bill estimate.
 */
export const deleteBillEstimate: API.OperationMethod<
  DeleteBillEstimateRequest,
  DeleteBillEstimateResponse,
  DeleteBillEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [ConflictException, DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillEstimate",
})) as any;

export type DeleteBillScenarioError =
  | ConflictException
  | DataUnavailableException
  | CommonErrors;
/**
 * Deletes an existing bill scenario.
 */
export const deleteBillScenario: API.OperationMethod<
  DeleteBillScenarioRequest,
  DeleteBillScenarioResponse,
  DeleteBillScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [ConflictException, DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillScenario",
})) as any;

export type DeleteWorkloadEstimateError =
  | DataUnavailableException
  | CommonErrors;
/**
 * Deletes an existing workload estimate.
 */
export const deleteWorkloadEstimate: API.OperationMethod<
  DeleteWorkloadEstimateRequest,
  DeleteWorkloadEstimateResponse,
  DeleteWorkloadEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { identifier: 0 } },
  errors: [DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkloadEstimate",
})) as any;

export type GetBillEstimateError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details of a specific bill estimate.
 */
export const getBillEstimate: API.OperationMethod<
  GetBillEstimateRequest,
  GetBillEstimateResponse,
  GetBillEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: {
      billInterval: o_BillInterval,
      createdAt: D.ts,
      expiresAt: D.ts,
      costCategoryGroupSharingPreferenceEffectiveDate: D.ts,
    },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillEstimate",
})) as any;

export type GetBillScenarioError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details of a specific bill scenario.
 */
export const getBillScenario: API.OperationMethod<
  GetBillScenarioRequest,
  GetBillScenarioResponse,
  GetBillScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { billInterval: o_BillInterval, createdAt: D.ts, expiresAt: D.ts },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillScenario",
})) as any;

export type GetPreferencesError = DataUnavailableException | CommonErrors;
/**
 * Retrieves the current preferences for Pricing Calculator.
 */
export const getPreferences: API.OperationMethod<
  GetPreferencesRequest,
  GetPreferencesResponse,
  GetPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreferences",
})) as any;

export type GetWorkloadEstimateError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves details of a specific workload estimate.
 */
export const getWorkloadEstimate: API.OperationMethod<
  GetWorkloadEstimateRequest,
  GetWorkloadEstimateResponse,
  GetWorkloadEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0 },
    output: { createdAt: D.ts, expiresAt: D.ts, rateTimestamp: D.ts },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadEstimate",
})) as any;

export type ListBillEstimateCommitmentsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the commitments associated with a bill estimate.
 */
export const listBillEstimateCommitments: API.PaginatedOperationMethod<
  ListBillEstimateCommitmentsRequest,
  ListBillEstimateCommitmentsResponse,
  ListBillEstimateCommitmentsError,
  Credentials | HttpClient.HttpClient,
  BillEstimateCommitmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { billEstimateId: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillEstimateCommitments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillEstimateInputCommitmentModificationsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the input commitment modifications associated with a bill estimate.
 */
export const listBillEstimateInputCommitmentModifications: API.PaginatedOperationMethod<
  ListBillEstimateInputCommitmentModificationsRequest,
  ListBillEstimateInputCommitmentModificationsResponse,
  ListBillEstimateInputCommitmentModificationsError,
  Credentials | HttpClient.HttpClient,
  BillEstimateInputCommitmentModificationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { billEstimateId: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillEstimateInputCommitmentModifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillEstimateInputUsageModificationsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the input usage modifications associated with a bill estimate.
 */
export const listBillEstimateInputUsageModifications: API.PaginatedOperationMethod<
  ListBillEstimateInputUsageModificationsRequest,
  ListBillEstimateInputUsageModificationsResponse,
  ListBillEstimateInputUsageModificationsError,
  Credentials | HttpClient.HttpClient,
  BillEstimateInputUsageModificationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      billEstimateId: 0,
      filters: D.list(i_ListUsageFilter),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      items: D.list({
        quantities: D.list(o_UsageQuantity),
        historicalUsage: o_HistoricalUsageEntity,
      }),
    },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillEstimateInputUsageModifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillEstimateLineItemsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the line items associated with a bill estimate.
 */
export const listBillEstimateLineItems: API.PaginatedOperationMethod<
  ListBillEstimateLineItemsRequest,
  ListBillEstimateLineItemsResponse,
  ListBillEstimateLineItemsError,
  Credentials | HttpClient.HttpClient,
  BillEstimateLineItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      billEstimateId: 0,
      filters: D.list({ name: 0, values: 0, matchOption: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillEstimateLineItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillEstimatesError = DataUnavailableException | CommonErrors;
/**
 * Lists all bill estimates for the account.
 */
export const listBillEstimates: API.PaginatedOperationMethod<
  ListBillEstimatesRequest,
  ListBillEstimatesResponse,
  ListBillEstimatesError,
  Credentials | HttpClient.HttpClient,
  BillEstimateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0, matchOption: 0 }),
      createdAtFilter: i_FilterTimestamp,
      expiresAtFilter: i_FilterTimestamp,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      items: D.list({
        billInterval: o_BillInterval,
        createdAt: D.ts,
        expiresAt: D.ts,
      }),
    },
  },
  errors: [DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillEstimates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillScenarioCommitmentModificationsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the commitment modifications associated with a bill scenario.
 */
export const listBillScenarioCommitmentModifications: API.PaginatedOperationMethod<
  ListBillScenarioCommitmentModificationsRequest,
  ListBillScenarioCommitmentModificationsResponse,
  ListBillScenarioCommitmentModificationsError,
  Credentials | HttpClient.HttpClient,
  BillScenarioCommitmentModificationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { billScenarioId: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillScenarioCommitmentModifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillScenariosError = DataUnavailableException | CommonErrors;
/**
 * Lists all bill scenarios for the account.
 */
export const listBillScenarios: API.PaginatedOperationMethod<
  ListBillScenariosRequest,
  ListBillScenariosResponse,
  ListBillScenariosError,
  Credentials | HttpClient.HttpClient,
  BillScenarioSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filters: D.list({ name: 0, values: 0, matchOption: 0 }),
      createdAtFilter: i_FilterTimestamp,
      expiresAtFilter: i_FilterTimestamp,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      items: D.list({
        billInterval: o_BillInterval,
        createdAt: D.ts,
        expiresAt: D.ts,
      }),
    },
  },
  errors: [DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillScenarios",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillScenarioUsageModificationsError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the usage modifications associated with a bill scenario.
 */
export const listBillScenarioUsageModifications: API.PaginatedOperationMethod<
  ListBillScenarioUsageModificationsRequest,
  ListBillScenarioUsageModificationsResponse,
  ListBillScenarioUsageModificationsError,
  Credentials | HttpClient.HttpClient,
  BillScenarioUsageModificationItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      billScenarioId: 0,
      filters: D.list(i_ListUsageFilter),
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list(o_BillScenarioUsageModificationItem) },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillScenarioUsageModifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists all tags associated with a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWorkloadEstimatesError =
  | DataUnavailableException
  | CommonErrors;
/**
 * Lists all workload estimates for the account.
 */
export const listWorkloadEstimates: API.PaginatedOperationMethod<
  ListWorkloadEstimatesRequest,
  ListWorkloadEstimatesResponse,
  ListWorkloadEstimatesError,
  Credentials | HttpClient.HttpClient,
  WorkloadEstimateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      createdAtFilter: i_FilterTimestamp,
      expiresAtFilter: i_FilterTimestamp,
      filters: D.list({ name: 0, values: 0, matchOption: 0 }),
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      items: D.list({ createdAt: D.ts, expiresAt: D.ts, rateTimestamp: D.ts }),
    },
  },
  errors: [DataUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadEstimates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkloadEstimateUsageError =
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the usage associated with a workload estimate.
 */
export const listWorkloadEstimateUsage: API.PaginatedOperationMethod<
  ListWorkloadEstimateUsageRequest,
  ListWorkloadEstimateUsageResponse,
  ListWorkloadEstimateUsageError,
  Credentials | HttpClient.HttpClient,
  WorkloadEstimateUsageItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      workloadEstimateId: 0,
      filters: D.list(i_ListUsageFilter),
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list(o_WorkloadEstimateUsageItem) },
  },
  errors: [DataUnavailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadEstimateUsage",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Adds one or more tags to a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, tags: 0 } },
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes one or more tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, tagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBillEstimateError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing bill estimate.
 */
export const updateBillEstimate: API.OperationMethod<
  UpdateBillEstimateRequest,
  UpdateBillEstimateResponse,
  UpdateBillEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0, name: 0, expiresAt: 0 },
    output: {
      billInterval: o_BillInterval,
      createdAt: D.ts,
      expiresAt: D.ts,
      costCategoryGroupSharingPreferenceEffectiveDate: D.ts,
    },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillEstimate",
})) as any;

export type UpdateBillScenarioError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing bill scenario.
 */
export const updateBillScenario: API.OperationMethod<
  UpdateBillScenarioRequest,
  UpdateBillScenarioResponse,
  UpdateBillScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      identifier: 0,
      name: 0,
      expiresAt: 0,
      groupSharingPreference: 0,
      costCategoryGroupSharingPreferenceArn: 0,
    },
    output: { billInterval: o_BillInterval, createdAt: D.ts, expiresAt: D.ts },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillScenario",
})) as any;

export type UpdatePreferencesError =
  | DataUnavailableException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Updates the preferences for Pricing Calculator.
 */
export const updatePreferences: API.OperationMethod<
  UpdatePreferencesRequest,
  UpdatePreferencesResponse,
  UpdatePreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      managementAccountRateTypeSelections: 0,
      memberAccountRateTypeSelections: 0,
      standaloneAccountRateTypeSelections: 0,
    },
  },
  errors: [DataUnavailableException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreferences",
})) as any;

export type UpdateWorkloadEstimateError =
  | ConflictException
  | DataUnavailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing workload estimate.
 */
export const updateWorkloadEstimate: API.OperationMethod<
  UpdateWorkloadEstimateRequest,
  UpdateWorkloadEstimateResponse,
  UpdateWorkloadEstimateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { identifier: 0, name: 0, expiresAt: 0 },
    output: { createdAt: D.ts, expiresAt: D.ts, rateTimestamp: D.ts },
  },
  errors: [
    ConflictException,
    DataUnavailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkloadEstimate",
})) as any;

const i_FilterTimestamp: D.LazyStruct = () => ({
  afterTimestamp: 0,
  beforeTimestamp: 0,
});
const i_HistoricalUsageEntity: D.LazyStruct = () => ({
  serviceCode: 0,
  usageType: 0,
  operation: 0,
  location: 0,
  usageAccountId: 0,
  billInterval: { start: 0, end: 0 },
  filterExpression: i_Expression,
});
const i_ListUsageFilter: D.LazyStruct = () => ({
  name: 0,
  values: 0,
  matchOption: 0,
});
const i_UsageAmount: D.LazyStruct = () => ({ startHour: 0, amount: 0 });
const o_BillInterval: D.LazyStruct = () => ({ start: D.ts, end: D.ts });
const o_BillScenarioUsageModificationItem: D.LazyStruct = () => ({
  quantities: D.list(o_UsageQuantity),
  historicalUsage: o_HistoricalUsageEntity,
});
const o_HistoricalUsageEntity: D.LazyStruct = () => ({
  billInterval: o_BillInterval,
});
const o_UsageQuantity: D.LazyStruct = () => ({ startHour: D.ts });
const o_WorkloadEstimateUsageItem: D.LazyStruct = () => ({
  historicalUsage: o_HistoricalUsageEntity,
});
const i_Expression: D.LazyStruct = () => ({
  and: D.list(i_Expression),
  or: D.list(i_Expression),
  not: i_Expression,
  costCategories: i_ExpressionFilter,
  dimensions: i_ExpressionFilter,
  tags: i_ExpressionFilter,
});
const i_ExpressionFilter: D.LazyStruct = () => ({
  key: 0,
  matchOptions: 0,
  values: 0,
});
