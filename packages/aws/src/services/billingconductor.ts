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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "billingconductor",
  serviceShapeName: "AWSBillingConductor",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "billingconductor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-07-30");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://billingconductor.us-east-1.amazonaws.com",
              {
                authSchemes: [
                  { name: "sigv4", signingName: "billingconductor", signingRegion: "us-east-1" },
                ],
              },
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(`https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://billingconductor.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingName":"billingconductor","signingRegion":"us-east-1"}]},"headers":{}}',
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
      ResourceId: S.String,
      ResourceType: S.String,
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ConflictExceptionReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      LimitCode: S.String,
      ServiceCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(337, __c42, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type BillingGroupArn = string;
export type AccountId = string;
export type AccountIdList = string[];
export interface AssociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export interface AssociateAccountsOutput {
  Arn?: string;
}
export type PricingPlanArn = string;
export type PricingRuleArn = string;
export type PricingRuleArnsNonEmptyInput = string[];
export interface AssociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export interface AssociatePricingRulesOutput {
  Arn?: string;
}
export type CustomLineItemArn = string;
export type CustomLineItemAssociationElement = string;
export type CustomLineItemBatchAssociationsList = string[];
export type BillingPeriod = string;
export interface CustomLineItemBillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod?: string;
}
export interface BatchAssociateResourcesToCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export type AssociateResourceErrorReason =
  | "INVALID_ARN"
  | "SERVICE_LIMIT_EXCEEDED"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "INTERNAL_SERVER_EXCEPTION"
  | "INVALID_BILLING_PERIOD_RANGE"
  | (string & {});
export interface AssociateResourceError {
  Message?: string;
  Reason?: AssociateResourceErrorReason;
}
export interface AssociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export type AssociateResourcesResponseList = AssociateResourceResponseElement[];
export interface BatchAssociateResourcesToCustomLineItemOutput {
  SuccessfullyAssociatedResources?: AssociateResourceResponseElement[];
  FailedAssociatedResources?: AssociateResourceResponseElement[];
}
export type CustomLineItemBatchDisassociationsList = string[];
export interface BatchDisassociateResourcesFromCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export interface DisassociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export type DisassociateResourcesResponseList = DisassociateResourceResponseElement[];
export interface BatchDisassociateResourcesFromCustomLineItemOutput {
  SuccessfullyDisassociatedResources?: DisassociateResourceResponseElement[];
  FailedDisassociatedResources?: DisassociateResourceResponseElement[];
}
export type ClientToken = string;
export type BillingGroupName = string | redacted.Redacted<string>;
export type ResponsibilityTransferArn = string;
export interface AccountGrouping {
  LinkedAccountIds?: string[];
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export type PricingPlanFullArn = string;
export interface ComputationPreference {
  PricingPlanArn: string;
}
export type BillingGroupDescription = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateBillingGroupInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  AccountGrouping: AccountGrouping;
  ComputationPreference: ComputationPreference;
  PrimaryAccountId?: string;
  Description?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateBillingGroupOutput {
  Arn?: string;
}
export type CustomLineItemName = string | redacted.Redacted<string>;
export type CustomLineItemDescription = string | redacted.Redacted<string>;
export type CustomLineItemChargeValue = number;
export interface CustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export type CustomLineItemPercentageChargeValue = number;
export type CustomLineItemAssociationsList = string[];
export interface CustomLineItemPercentageChargeDetails {
  PercentageValue: number;
  AssociatedValues?: string[];
}
export type CustomLineItemType = "CREDIT" | "FEE" | (string & {});
export type LineItemFilterAttributeName = "LINE_ITEM_TYPE" | "SERVICE" | (string & {});
export type MatchOption = "NOT_EQUAL" | "EQUAL" | (string & {});
export type LineItemFilterValue = "SAVINGS_PLAN_NEGATION" | (string & {});
export type LineItemFilterValuesList = LineItemFilterValue[];
export type AttributeValue = string;
export type AttributeValueList = string[];
export interface LineItemFilter {
  Attribute: LineItemFilterAttributeName;
  MatchOption: MatchOption;
  Values?: LineItemFilterValue[];
  AttributeValues?: string[];
}
export type LineItemFiltersList = LineItemFilter[];
export interface CustomLineItemChargeDetails {
  Flat?: CustomLineItemFlatChargeDetails;
  Percentage?: CustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export type ComputationRuleEnum = "ITEMIZED" | "CONSOLIDATED" | (string & {});
export type Service = string;
export interface PresentationObject {
  Service: string;
}
export interface CreateCustomLineItemInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description: string | redacted.Redacted<string>;
  BillingGroupArn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
  Tags?: { [key: string]: string | undefined };
  ChargeDetails: CustomLineItemChargeDetails;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export interface CreateCustomLineItemOutput {
  Arn?: string;
}
export type PricingPlanName = string | redacted.Redacted<string>;
export type PricingPlanDescription = string | redacted.Redacted<string>;
export type PricingRuleArnsInput = string[];
export interface CreatePricingPlanInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PricingRuleArns?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePricingPlanOutput {
  Arn?: string;
}
export type PricingRuleName = string | redacted.Redacted<string>;
export type PricingRuleDescription = string | redacted.Redacted<string>;
export type PricingRuleScope = "GLOBAL" | "SERVICE" | "BILLING_ENTITY" | "SKU" | (string & {});
export type PricingRuleType = "MARKUP" | "DISCOUNT" | "TIERING" | (string & {});
export type ModifierPercentage = number;
export type BillingEntity = string;
export type TieringActivated = boolean;
export interface CreateFreeTierConfig {
  Activated: boolean;
}
export type CustomTierBeginRangeInclusive = number;
export type CustomTierEndRangeExclusive = number;
export type CustomTierRateValue = number;
export interface CustomTier {
  BeginRangeInclusive: number;
  EndRangeExclusive?: number;
  RateValue: number;
}
export type CustomTiersList = CustomTier[];
export interface CreateTieringInput {
  FreeTier?: CreateFreeTierConfig;
  CustomTiers?: CustomTier[];
}
export type UsageType = string;
export type Operation = string;
export interface CreatePricingRuleInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope: PricingRuleScope;
  Type: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  Tags?: { [key: string]: string | undefined };
  BillingEntity?: string;
  Tiering?: CreateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export interface CreatePricingRuleOutput {
  Arn?: string;
}
export interface DeleteBillingGroupInput {
  Arn: string;
}
export interface DeleteBillingGroupOutput {
  Arn?: string;
}
export interface DeleteCustomLineItemInput {
  Arn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export interface DeleteCustomLineItemOutput {
  Arn?: string;
}
export interface DeletePricingPlanInput {
  Arn: string;
}
export interface DeletePricingPlanOutput {
  Arn?: string;
}
export interface DeletePricingRuleInput {
  Arn: string;
}
export interface DeletePricingRuleOutput {
  Arn?: string;
}
export interface DisassociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export interface DisassociateAccountsOutput {
  Arn?: string;
}
export interface DisassociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export interface DisassociatePricingRulesOutput {
  Arn?: string;
}
export interface BillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod: string;
}
export type GroupByAttributeName = "PRODUCT_NAME" | "BILLING_PERIOD" | (string & {});
export type GroupByAttributesList = GroupByAttributeName[];
export type MaxBillingGroupCostReportResults = number;
export type Token = string;
export interface GetBillingGroupCostReportInput {
  Arn: string;
  BillingPeriodRange?: BillingPeriodRange;
  GroupBy?: GroupByAttributeName[];
  MaxResults?: number;
  NextToken?: string;
}
export type AWSCost = string;
export type ProformaCost = string;
export type Margin = string;
export type MarginPercentage = string;
export type Currency = string;
export interface Attribute {
  Key?: string;
  Value?: string;
}
export type AttributesList = Attribute[];
export interface BillingGroupCostReportResultElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
  Attributes?: Attribute[];
}
export type BillingGroupCostReportResultsList = BillingGroupCostReportResultElement[];
export interface GetBillingGroupCostReportOutput {
  BillingGroupCostReportResults?: BillingGroupCostReportResultElement[];
  NextToken?: string;
}
export interface GetBillingTransferPreferenceInput {
  ResponsibilityTransferArn: string;
}
export interface AutoTransferBillingGroupCreationPreference {
  Enabled: boolean;
  PricingPlanArn?: string;
}
export type Instant = number;
export interface GetBillingTransferPreferenceOutput {
  ResponsibilityTransferArn: string;
  AutoBillingTransferBillingGroupCreation: AutoTransferBillingGroupCreationPreference;
  LastModifiedTime?: number;
}
export type Association = string;
export type AccountIdFilterList = string[];
export interface ListAccountAssociationsFilter {
  Association?: string;
  AccountId?: string;
  AccountIds?: string[];
}
export interface ListAccountAssociationsInput {
  BillingPeriod?: string;
  Filters?: ListAccountAssociationsFilter;
  NextToken?: string;
}
export type AccountName = string | redacted.Redacted<string>;
export type AccountEmail = string | redacted.Redacted<string>;
export interface AccountAssociationsListElement {
  AccountId?: string;
  BillingGroupArn?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountEmail?: string | redacted.Redacted<string>;
}
export type AccountAssociationsList = AccountAssociationsListElement[];
export interface ListAccountAssociationsOutput {
  LinkedAccounts?: AccountAssociationsListElement[];
  NextToken?: string;
}
export type MaxBillingGroupResults = number;
export type BillingGroupArnList = string[];
export interface ListBillingGroupCostReportsFilter {
  BillingGroupArns?: string[];
}
export interface ListBillingGroupCostReportsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupCostReportsFilter;
}
export interface BillingGroupCostReportElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
}
export type BillingGroupCostReportList = BillingGroupCostReportElement[];
export interface ListBillingGroupCostReportsOutput {
  BillingGroupCostReports?: BillingGroupCostReportElement[];
  NextToken?: string;
}
export type BillingGroupStatus = "ACTIVE" | "PRIMARY_ACCOUNT_MISSING" | "PENDING" | (string & {});
export type BillingGroupStatusList = BillingGroupStatus[];
export type PrimaryAccountIdList = string[];
export type BillingGroupType = "STANDARD" | "TRANSFER_BILLING" | (string & {});
export type BillingGroupTypeList = BillingGroupType[];
export type SearchOption = "STARTS_WITH" | (string & {});
export type SearchValue = string;
export interface StringSearch {
  SearchOption: SearchOption;
  SearchValue: string;
}
export type StringSearches = StringSearch[];
export type ResponsibilityTransferArnsList = string[];
export interface ListBillingGroupsFilter {
  Arns?: string[];
  PricingPlan?: string;
  Statuses?: BillingGroupStatus[];
  AutoAssociate?: boolean;
  PrimaryAccountIds?: string[];
  BillingGroupTypes?: BillingGroupType[];
  Names?: StringSearch[];
  ResponsibilityTransferArns?: string[];
}
export interface ListBillingGroupsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupsFilter;
}
export type NumberOfAccounts = number;
export type BillingGroupStatusReason = string;
export interface ListBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export interface BillingGroupListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  ComputationPreference?: ComputationPreference;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: ListBillingGroupAccountGrouping;
  BillingGroupType?: BillingGroupType;
}
export type BillingGroupList = BillingGroupListElement[];
export interface ListBillingGroupsOutput {
  BillingGroups?: BillingGroupListElement[];
  NextToken?: string;
}
export type MaxCustomLineItemResults = number;
export type CustomLineItemNameList = (string | redacted.Redacted<string>)[];
export type CustomLineItemArns = string[];
export interface ListCustomLineItemsFilter {
  Names?: (string | redacted.Redacted<string>)[];
  BillingGroups?: string[];
  Arns?: string[];
  AccountIds?: string[];
}
export interface ListCustomLineItemsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemsFilter;
}
export interface ListCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export interface ListCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export interface ListCustomLineItemChargeDetails {
  Flat?: ListCustomLineItemFlatChargeDetails;
  Percentage?: ListCustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export type CurrencyCode = "USD" | "CNY" | (string & {});
export type CustomLineItemProductCode = string;
export type NumberOfAssociations = number;
export interface CustomLineItemListElement {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export type CustomLineItemList = CustomLineItemListElement[];
export interface ListCustomLineItemsOutput {
  CustomLineItems?: CustomLineItemListElement[];
  NextToken?: string;
}
export interface ListCustomLineItemVersionsBillingPeriodRangeFilter {
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
}
export interface ListCustomLineItemVersionsFilter {
  BillingPeriodRange?: ListCustomLineItemVersionsBillingPeriodRangeFilter;
}
export interface ListCustomLineItemVersionsInput {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemVersionsFilter;
}
export interface CustomLineItemVersionListElement {
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
  Arn?: string;
  StartTime?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export type CustomLineItemVersionList = CustomLineItemVersionListElement[];
export interface ListCustomLineItemVersionsOutput {
  CustomLineItemVersions?: CustomLineItemVersionListElement[];
  NextToken?: string;
}
export type PricingPlanArns = string[];
export interface ListPricingPlansFilter {
  Arns?: string[];
}
export type MaxPricingPlanResults = number;
export interface ListPricingPlansInput {
  BillingPeriod?: string;
  Filters?: ListPricingPlansFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type NumberOfAssociatedPricingRules = number;
export interface PricingPlanListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
}
export type PricingPlanList = PricingPlanListElement[];
export interface ListPricingPlansOutput {
  BillingPeriod?: string;
  PricingPlans?: PricingPlanListElement[];
  NextToken?: string;
}
export type MaxPricingRuleResults = number;
export interface ListPricingPlansAssociatedWithPricingRuleInput {
  BillingPeriod?: string;
  PricingRuleArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPricingPlansAssociatedWithPricingRuleOutput {
  BillingPeriod?: string;
  PricingRuleArn?: string;
  PricingPlanArns?: string[];
  NextToken?: string;
}
export type PricingRuleArns = string[];
export interface ListPricingRulesFilter {
  Arns?: string[];
}
export interface ListPricingRulesInput {
  BillingPeriod?: string;
  Filters?: ListPricingRulesFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type NumberOfPricingPlansAssociatedWith = number;
export interface FreeTierConfig {
  Activated: boolean;
}
export interface Tiering {
  FreeTier?: FreeTierConfig;
  CustomTiers?: CustomTier[];
}
export interface PricingRuleListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: Tiering;
  UsageType?: string;
  Operation?: string;
}
export type PricingRuleList = PricingRuleListElement[];
export interface ListPricingRulesOutput {
  BillingPeriod?: string;
  PricingRules?: PricingRuleListElement[];
  NextToken?: string;
}
export interface ListPricingRulesAssociatedToPricingPlanInput {
  BillingPeriod?: string;
  PricingPlanArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPricingRulesAssociatedToPricingPlanOutput {
  BillingPeriod?: string;
  PricingPlanArn?: string;
  PricingRuleArns?: string[];
  NextToken?: string;
}
export type CustomLineItemRelationship = "PARENT" | "CHILD" | (string & {});
export interface ListResourcesAssociatedToCustomLineItemFilter {
  Relationship?: CustomLineItemRelationship;
}
export interface ListResourcesAssociatedToCustomLineItemInput {
  BillingPeriod?: string;
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListResourcesAssociatedToCustomLineItemFilter;
}
export interface ListResourcesAssociatedToCustomLineItemResponseElement {
  Arn?: string;
  Relationship?: CustomLineItemRelationship;
  EndBillingPeriod?: string;
}
export type ListResourcesAssociatedToCustomLineItemResponseList =
  ListResourcesAssociatedToCustomLineItemResponseElement[];
export interface ListResourcesAssociatedToCustomLineItemOutput {
  Arn?: string;
  AssociatedResources?: ListResourcesAssociatedToCustomLineItemResponseElement[];
  NextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export interface UpdateBillingGroupInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Status?: BillingGroupStatus;
  ComputationPreference?: ComputationPreference;
  Description?: string | redacted.Redacted<string>;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export interface UpdateBillingGroupOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  PricingPlanArn?: string;
  Size?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export interface UpdateBillingTransferPreferenceInput {
  ClientToken?: string;
  ResponsibilityTransferArn: string;
  AutoBillingTransferBillingGroupCreation: AutoTransferBillingGroupCreationPreference;
}
export interface UpdateBillingTransferPreferenceOutput {
  ResponsibilityTransferArn: string;
  AutoBillingTransferBillingGroupCreation: AutoTransferBillingGroupCreationPreference;
  LastModifiedTime: number;
}
export interface UpdateCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export interface UpdateCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export interface UpdateCustomLineItemChargeDetails {
  Flat?: UpdateCustomLineItemFlatChargeDetails;
  Percentage?: UpdateCustomLineItemPercentageChargeDetails;
  LineItemFilters?: LineItemFilter[];
}
export interface UpdateCustomLineItemInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: UpdateCustomLineItemChargeDetails;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export type BillingGroupFullArn = string;
export interface UpdateCustomLineItemOutput {
  Arn?: string;
  BillingGroupArn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  LastModifiedTime?: number;
  AssociationSize?: number;
}
export interface UpdatePricingPlanInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export interface UpdatePricingPlanOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  LastModifiedTime?: number;
}
export interface UpdateFreeTierConfig {
  Activated: boolean;
}
export interface UpdateTieringInput {
  FreeTier?: UpdateFreeTierConfig;
  CustomTiers?: CustomTier[];
}
export interface UpdatePricingRuleInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Tiering?: UpdateTieringInput;
}
export interface UpdatePricingRuleOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: UpdateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export type ConflictExceptionReason =
  | "RESOURCE_NAME_CONFLICT"
  | "PRICING_RULE_IN_PRICING_PLAN_CONFLICT"
  | "PRICING_PLAN_ATTACHED_TO_BILLING_GROUP_DELETE_CONFLICT"
  | "PRICING_PLAN_REFERENCED_BY_PREFERENCE_DELETE_CONFLICT"
  | "PRICING_RULE_ATTACHED_TO_PRICING_PLAN_DELETE_CONFLICT"
  | "WRITE_CONFLICT_RETRY"
  | (string & {});
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | "PRIMARY_NOT_ASSOCIATED"
  | "PRIMARY_CANNOT_DISASSOCIATE"
  | "ACCOUNTS_NOT_ASSOCIATED"
  | "ACCOUNTS_ALREADY_ASSOCIATED"
  | "ILLEGAL_PRIMARY_ACCOUNT"
  | "ILLEGAL_ACCOUNTS"
  | "MISMATCHED_BILLINGGROUP_ARN"
  | "MISSING_BILLINGGROUP"
  | "MISMATCHED_CUSTOMLINEITEM_ARN"
  | "ILLEGAL_BILLING_PERIOD"
  | "ILLEGAL_BILLING_PERIOD_RANGE"
  | "TOO_MANY_ACCOUNTS_IN_REQUEST"
  | "DUPLICATE_ACCOUNT"
  | "INVALID_BILLING_GROUP_STATUS"
  | "MISMATCHED_PRICINGPLAN_ARN"
  | "MISSING_PRICINGPLAN"
  | "MISMATCHED_PRICINGRULE_ARN"
  | "DUPLICATE_PRICINGRULE_ARNS"
  | "MISSING_COSTCATEGORY"
  | "ILLEGAL_EXPRESSION"
  | "ILLEGAL_SCOPE"
  | "ILLEGAL_SERVICE"
  | "PRICINGRULES_NOT_EXIST"
  | "PRICINGRULES_ALREADY_ASSOCIATED"
  | "PRICINGRULES_NOT_ASSOCIATED"
  | "INVALID_TIME_RANGE"
  | "INVALID_BILLINGVIEW_ARN"
  | "MISMATCHED_BILLINGVIEW_ARN"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "MISSING_CUSTOMLINEITEM"
  | "ILLEGAL_CUSTOMLINEITEM_UPDATE"
  | "TOO_MANY_CUSTOMLINEITEMS_IN_REQUEST"
  | "ILLEGAL_CHARGE_DETAILS"
  | "ILLEGAL_UPDATE_CHARGE_DETAILS"
  | "INVALID_ARN"
  | "ILLEGAL_RESOURCE_ARNS"
  | "ILLEGAL_CUSTOMLINEITEM_MODIFICATION"
  | "MISSING_LINKED_ACCOUNT_IDS"
  | "MULTIPLE_LINKED_ACCOUNT_IDS"
  | "MISSING_PRICING_PLAN_ARN"
  | "MULTIPLE_PRICING_PLAN_ARN"
  | "ILLEGAL_CHILD_ASSOCIATE_RESOURCE"
  | "CUSTOM_LINE_ITEM_ASSOCIATION_EXISTS"
  | "INVALID_BILLING_GROUP"
  | "INVALID_BILLING_PERIOD_FOR_OPERATION"
  | "ILLEGAL_BILLING_ENTITY"
  | "ILLEGAL_MODIFIER_PERCENTAGE"
  | "ILLEGAL_TYPE"
  | "ILLEGAL_BILLING_GROUP_TYPE"
  | "ILLEGAL_BILLING_GROUP_PRICING_PLAN"
  | "ILLEGAL_ENDED_BILLINGGROUP"
  | "ILLEGAL_TIERING_INPUT"
  | "ILLEGAL_OPERATION"
  | "ILLEGAL_USAGE_TYPE"
  | "INVALID_SKU_COMBO"
  | "INVALID_FILTER"
  | "TOO_MANY_AUTO_ASSOCIATE_BILLING_GROUPS"
  | "CANNOT_DELETE_AUTO_ASSOCIATE_BILLING_GROUP"
  | "ILLEGAL_ACCOUNT_ID"
  | "BILLING_GROUP_ALREADY_EXIST_IN_CURRENT_BILLING_PERIOD"
  | "ILLEGAL_COMPUTATION_RULE"
  | "ILLEGAL_LINE_ITEM_FILTER"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of account IDs in a consolidated billing family to a predefined billing group. The account IDs must be a part of the consolidated billing family during the current month, and not already associated with another billing group. The maximum number of accounts that can be associated in one call is 30.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsInput,
  AssociateAccountsOutput,
  AssociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<AssociateAccountsInput>,
  output: __S(352, __c44, 0) as any as S.Schema<AssociateAccountsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccounts",
}));

export type AssociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of `PricingRuleArns` to a defined `PricingPlan`. The maximum number `PricingRuleArn` that can be associated in one call is 30.
 */
export const associatePricingRules: API.OperationMethod<
  AssociatePricingRulesInput,
  AssociatePricingRulesOutput,
  AssociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<AssociatePricingRulesInput>,
  output: __S(352, __c44, 0) as any as S.Schema<AssociatePricingRulesOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePricingRules",
}));

export type BatchAssociateResourcesToCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a batch of resources to a percentage custom line item.
 */
export const batchAssociateResourcesToCustomLineItem: API.OperationMethod<
  BatchAssociateResourcesToCustomLineItemInput,
  BatchAssociateResourcesToCustomLineItemOutput,
  BatchAssociateResourcesToCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<BatchAssociateResourcesToCustomLineItemInput>,
  output: __S(377, __c47, 1) as any as S.Schema<BatchAssociateResourcesToCustomLineItemOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateResourcesToCustomLineItem",
}));

export type BatchDisassociateResourcesFromCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a batch of resources from a percentage custom line item.
 */
export const batchDisassociateResourcesFromCustomLineItem: API.OperationMethod<
  BatchDisassociateResourcesFromCustomLineItemInput,
  BatchDisassociateResourcesFromCustomLineItemOutput,
  BatchDisassociateResourcesFromCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemInput>,
  output: __S(1, __c0, 1) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemOutput>,
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
  operationName: "BatchDisassociateResourcesFromCustomLineItem",
}));

export type CreateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a billing group that resembles a consolidated billing family that Amazon Web Services charges, based off of the predefined pricing plan computation.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupInput,
  CreateBillingGroupOutput,
  CreateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(9, __c1, 1) as any as S.Schema<CreateBillingGroupInput>,
  output: __S(352, __c44, 0) as any as S.Schema<CreateBillingGroupOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
}));

export type CreateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom line item that can be used to create a one-time fixed charge that can be applied to a single billing group for the current or previous billing period. The one-time fixed charge is either a fee or discount.
 */
export const createCustomLineItem: API.OperationMethod<
  CreateCustomLineItemInput,
  CreateCustomLineItemOutput,
  CreateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(34, __c4, 2) as any as S.Schema<CreateCustomLineItemInput>,
  output: __S(352, __c44, 0) as any as S.Schema<CreateCustomLineItemOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomLineItem",
}));

export type CreatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing plan that is used for computing Amazon Web Services charges for billing groups.
 */
export const createPricingPlan: API.OperationMethod<
  CreatePricingPlanInput,
  CreatePricingPlanOutput,
  CreatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreatePricingPlanInput>,
  output: __S(352, __c44, 0) as any as S.Schema<CreatePricingPlanOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingPlan",
}));

export type CreatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing rule can be associated to a pricing plan, or a set of pricing plans.
 */
export const createPricingRule: API.OperationMethod<
  CreatePricingRuleInput,
  CreatePricingRuleOutput,
  CreatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<CreatePricingRuleInput>,
  output: __S(352, __c44, 0) as any as S.Schema<CreatePricingRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingRule",
}));

export type DeleteBillingGroupError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a billing group.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupInput,
  DeleteBillingGroupOutput,
  DeleteBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<DeleteBillingGroupInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DeleteBillingGroupOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
}));

export type DeleteCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the custom line item identified by the given ARN in the current, or previous billing period.
 */
export const deleteCustomLineItem: API.OperationMethod<
  DeleteCustomLineItemInput,
  DeleteCustomLineItemOutput,
  DeleteCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<DeleteCustomLineItemInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DeleteCustomLineItemOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomLineItem",
}));

export type DeletePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a pricing plan. The pricing plan must not be associated with any billing groups to delete successfully.
 */
export const deletePricingPlan: API.OperationMethod<
  DeletePricingPlanInput,
  DeletePricingPlanOutput,
  DeletePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeletePricingPlanInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DeletePricingPlanOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingPlan",
}));

export type DeletePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the pricing rule that's identified by the input Amazon Resource Name (ARN).
 */
export const deletePricingRule: API.OperationMethod<
  DeletePricingRuleInput,
  DeletePricingRuleOutput,
  DeletePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeletePricingRuleInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DeletePricingRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingRule",
}));

export type DisassociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified list of account IDs from the given billing group.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsInput,
  DisassociateAccountsOutput,
  DisassociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DisassociateAccountsInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DisassociateAccountsOutput>,
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
  operationName: "DisassociateAccounts",
}));

export type DisassociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of pricing rules from a pricing plan.
 */
export const disassociatePricingRules: API.OperationMethod<
  DisassociatePricingRulesInput,
  DisassociatePricingRulesOutput,
  DisassociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DisassociatePricingRulesInput>,
  output: __S(352, __c44, 0) as any as S.Schema<DisassociatePricingRulesOutput>,
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
  operationName: "DisassociatePricingRules",
}));

export type GetBillingGroupCostReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the margin summary report, which includes the Amazon Web Services cost and charged amount (pro forma cost) by Amazon Web Services service for a specific billing group.
 */
export const getBillingGroupCostReport: API.PaginatedOperationMethod<
  GetBillingGroupCostReportInput,
  GetBillingGroupCostReportOutput,
  GetBillingGroupCostReportError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportResultElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(137, __c17, 1) as any as S.Schema<GetBillingGroupCostReportInput>,
  output: __S(142, __c17, 6) as any as S.Schema<GetBillingGroupCostReportOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingGroupCostReport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReportResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetBillingTransferPreferenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the auto billing group creation preference for a billing transfer.
 */
export const getBillingTransferPreference: API.OperationMethod<
  GetBillingTransferPreferenceInput,
  GetBillingTransferPreferenceOutput,
  GetBillingTransferPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetBillingTransferPreferenceInput>,
  output: __S(145, __c18, 1) as any as S.Schema<GetBillingTransferPreferenceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingTransferPreference",
}));

export type ListAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This is a paginated call to list linked accounts that are linked to the payer account for the specified time period. If no information is provided, the current billing period is used. The response will optionally include the billing group that's associated with the linked account.
 */
export const listAccountAssociations: API.PaginatedOperationMethod<
  ListAccountAssociationsInput,
  ListAccountAssociationsOutput,
  ListAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  AccountAssociationsListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(161, __c20, 1) as any as S.Schema<ListAccountAssociationsInput>,
  output: __S(164, __c20, 4) as any as S.Schema<ListAccountAssociationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LinkedAccounts",
  } as const,
})) as any;

export type ListBillingGroupCostReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a summary report of actual Amazon Web Services charges and the calculated Amazon Web Services charges based on the associated pricing plan of a billing group.
 */
export const listBillingGroupCostReports: API.PaginatedOperationMethod<
  ListBillingGroupCostReportsInput,
  ListBillingGroupCostReportsOutput,
  ListBillingGroupCostReportsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(169, __c21, 1) as any as S.Schema<ListBillingGroupCostReportsInput>,
  output: __S(172, __c21, 4) as any as S.Schema<ListBillingGroupCostReportsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroupCostReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBillingGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a list of billing groups for the given billing period. If you don't provide a billing group, the current billing period is used.
 */
export const listBillingGroups: API.PaginatedOperationMethod<
  ListBillingGroupsInput,
  ListBillingGroupsOutput,
  ListBillingGroupsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(179, __c22, 3) as any as S.Schema<ListBillingGroupsInput>,
  output: __S(182, __c22, 6) as any as S.Schema<ListBillingGroupsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line items (FFLIs) for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listCustomLineItems: API.PaginatedOperationMethod<
  ListCustomLineItemsInput,
  ListCustomLineItemsOutput,
  ListCustomLineItemsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(194, __c24, 2) as any as S.Schema<ListCustomLineItemsInput>,
  output: __S(197, __c24, 5) as any as S.Schema<ListCustomLineItemsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line item versions.
 */
export const listCustomLineItemVersions: API.PaginatedOperationMethod<
  ListCustomLineItemVersionsInput,
  ListCustomLineItemVersionsOutput,
  ListCustomLineItemVersionsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemVersionListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(210, __c26, 2) as any as S.Schema<ListCustomLineItemVersionsInput>,
  output: __S(213, __c26, 5) as any as S.Schema<ListCustomLineItemVersionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItemVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItemVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get pricing plans for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listPricingPlans: API.PaginatedOperationMethod<
  ListPricingPlansInput,
  ListPricingPlansOutput,
  ListPricingPlansError,
  Credentials | HttpClient.HttpClient,
  PricingPlanListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<ListPricingPlansInput>,
  output: __S(219, __c27, 3) as any as S.Schema<ListPricingPlansOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansAssociatedWithPricingRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of the pricing plans that are associated with a pricing rule.
 */
export const listPricingPlansAssociatedWithPricingRule: API.PaginatedOperationMethod<
  ListPricingPlansAssociatedWithPricingRuleInput,
  ListPricingPlansAssociatedWithPricingRuleOutput,
  ListPricingPlansAssociatedWithPricingRuleError,
  Credentials | HttpClient.HttpClient,
  PricingPlanArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleInput>,
  output: __S(233, __c29, 1) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlansAssociatedWithPricingRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlanArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a pricing rule that can be associated to a pricing plan, or set of pricing plans.
 */
export const listPricingRules: API.PaginatedOperationMethod<
  ListPricingRulesInput,
  ListPricingRulesOutput,
  ListPricingRulesError,
  Credentials | HttpClient.HttpClient,
  PricingRuleListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<ListPricingRulesInput>,
  output: __S(243, __c30, 3) as any as S.Schema<ListPricingRulesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesAssociatedToPricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the pricing rules that are associated with a pricing plan.
 */
export const listPricingRulesAssociatedToPricingPlan: API.PaginatedOperationMethod<
  ListPricingRulesAssociatedToPricingPlanInput,
  ListPricingRulesAssociatedToPricingPlanOutput,
  ListPricingRulesAssociatedToPricingPlanError,
  Credentials | HttpClient.HttpClient,
  PricingRuleArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanInput>,
  output: __S(249, __c31, 1) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRulesAssociatedToPricingPlan",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRuleArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesAssociatedToCustomLineItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the resources that are associated to a custom line item.
 */
export const listResourcesAssociatedToCustomLineItem: API.PaginatedOperationMethod<
  ListResourcesAssociatedToCustomLineItemInput,
  ListResourcesAssociatedToCustomLineItemOutput,
  ListResourcesAssociatedToCustomLineItemError,
  Credentials | HttpClient.HttpClient,
  ListResourcesAssociatedToCustomLineItemResponseElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(257, __c32, 1) as any as S.Schema<ListResourcesAssociatedToCustomLineItemInput>,
  output: __S(260, __c32, 4) as any as S.Schema<ListResourcesAssociatedToCustomLineItemOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesAssociatedToCustomLineItem",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociatedResources",
    pageSize: "MaxResults",
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
 * A list the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they are not changed.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<TagResourceResponse>,
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
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing billing group.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupInput,
  UpdateBillingGroupOutput,
  UpdateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateBillingGroupInput>,
  output: __S(297, __c37, 1) as any as S.Schema<UpdateBillingGroupOutput>,
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
  operationName: "UpdateBillingGroup",
}));

export type UpdateBillingTransferPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the auto billing group creation preference for a billing transfer. When the preference is enabled, Billing Conductor automatically creates an indirect billing transfer billing group in your account, with the pricing plan that you specify, for each account that transfers its bill to the bill source account of this billing transfer. The preference applies only to billing groups that are created after you enable it.
 *
 * Enabling the preference requires the `iam:CreateServiceLinkedRole` permission. While a pricing plan is specified in an enabled preference, you can't delete that pricing plan.
 */
export const updateBillingTransferPreference: API.OperationMethod<
  UpdateBillingTransferPreferenceInput,
  UpdateBillingTransferPreferenceOutput,
  UpdateBillingTransferPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<UpdateBillingTransferPreferenceInput>,
  output: __S(305, __c38, 1) as any as S.Schema<UpdateBillingTransferPreferenceOutput>,
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
  operationName: "UpdateBillingTransferPreference",
}));

export type UpdateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing custom line item in the current or previous billing period.
 */
export const updateCustomLineItem: API.OperationMethod<
  UpdateCustomLineItemInput,
  UpdateCustomLineItemOutput,
  UpdateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(313, __c39, 1) as any as S.Schema<UpdateCustomLineItemInput>,
  output: __S(314, __c39, 2) as any as S.Schema<UpdateCustomLineItemOutput>,
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
  operationName: "UpdateCustomLineItem",
}));

export type UpdatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanInput,
  UpdatePricingPlanOutput,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UpdatePricingPlanInput>,
  output: __S(321, __c40, 1) as any as S.Schema<UpdatePricingPlanOutput>,
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
  operationName: "UpdatePricingPlan",
}));

export type UpdatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing pricing rule.
 */
export const updatePricingRule: API.OperationMethod<
  UpdatePricingRuleInput,
  UpdatePricingRuleOutput,
  UpdatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UpdatePricingRuleInput>,
  output: __S(329, __c41, 1) as any as S.Schema<UpdatePricingRuleOutput>,
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
  operationName: "UpdatePricingRule",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetArn: S.String,
          ResourceArns: __S(360, __c45, 0),
          BillingPeriodRange: S.optional(__S(392, __c49, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/batch-disassociate-resources-from-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDisassociateResourcesFromCustomLineItemInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SuccessfullyDisassociatedResources: S.optional(__S(386, __c48, 2)),
          FailedDisassociatedResources: S.optional(__S(386, __c48, 2)),
        }),
      ).annotate({ identifier: "BatchDisassociateResourcesFromCustomLineItemOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LinkedAccountIds: S.optional(__S(360, __c45, 0)),
          AutoAssociate: S.optional(S.Boolean),
          ResponsibilityTransferArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountGrouping" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          Name: SensitiveString,
          AccountGrouping: __S(8, __c1, 0),
          ComputationPreference: __S(24, __c3, 0),
          PrimaryAccountId: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-billing-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBillingGroupInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PricingPlanArn: S.String })).annotate({
        identifier: "ComputationPreference",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PercentageValue: S.Number, AssociatedValues: S.optional(__S(360, __c45, 0)) }),
      ).annotate({ identifier: "CustomLineItemPercentageChargeDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Flat: S.optional(__S(56, __c7, 0)),
          Percentage: S.optional(__S(32, __c4, 0)),
          Type: S.String,
          LineItemFilters: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "CustomLineItemChargeDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          Name: SensitiveString,
          Description: SensitiveString,
          BillingGroupArn: S.String,
          BillingPeriodRange: S.optional(__S(392, __c49, 0)),
          Tags: S.optional(__S(16, __c2, 0)),
          ChargeDetails: __S(33, __c4, 1),
          AccountId: S.optional(S.String),
          ComputationRule: S.optional(S.String),
          PresentationDetails: S.optional(__S(48, __c6, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomLineItemInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Service: S.String })).annotate({
        identifier: "PresentationObject",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ChargeValue: S.Number })).annotate({
        identifier: "CustomLineItemFlatChargeDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attribute: S.String,
          MatchOption: S.String,
          Values: S.optional(__S(40, __c5, 0)),
          AttributeValues: S.optional(__S(360, __c45, 0)),
        }),
      ).annotate({ identifier: "LineItemFilter" });
    case 2:
      return S.Array(__S(57, __c7, 1));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          Name: SensitiveString,
          Description: S.optional(SensitiveString),
          PricingRuleArns: S.optional(__S(360, __c45, 0)),
          Tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-pricing-plan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePricingPlanInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          Name: SensitiveString,
          Description: S.optional(SensitiveString),
          Scope: S.String,
          Type: S.String,
          ModifierPercentage: S.optional(S.Number),
          Service: S.optional(S.String),
          Tags: S.optional(__S(16, __c2, 0)),
          BillingEntity: S.optional(S.String),
          Tiering: S.optional(__S(83, __c10, 3)),
          UsageType: S.optional(S.String),
          Operation: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-pricing-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePricingRuleInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Activated: S.Boolean })).annotate({
        identifier: "CreateFreeTierConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BeginRangeInclusive: S.Number,
          EndRangeExclusive: S.optional(S.Number),
          RateValue: S.Number,
        }),
      ).annotate({ identifier: "CustomTier" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FreeTier: S.optional(__S(80, __c10, 0)),
          CustomTiers: S.optional(__S(82, __c10, 2)),
        }),
      ).annotate({ identifier: "CreateTieringInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-billing-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBillingGroupInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, BillingPeriodRange: S.optional(__S(392, __c49, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomLineItemInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-pricing-plan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePricingPlanInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-pricing-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePricingRuleInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, AccountIds: __S(360, __c45, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/disassociate-accounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAccountsInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, PricingRuleArns: __S(360, __c45, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/disassociate-pricing-rules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociatePricingRulesInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InclusiveStartBillingPeriod: S.String, ExclusiveEndBillingPeriod: S.String }),
      ).annotate({ identifier: "BillingPeriodRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          BillingPeriodRange: S.optional(__S(136, __c17, 0)),
          GroupBy: S.optional(__S(40, __c5, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-billing-group-cost-report" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBillingGroupCostReportInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Attribute" });
    case 3:
      return S.Array(__S(138, __c17, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AWSCost: S.optional(S.String),
          ProformaCost: S.optional(S.String),
          Margin: S.optional(S.String),
          MarginPercentage: S.optional(S.String),
          Currency: S.optional(S.String),
          Attributes: S.optional(__S(139, __c17, 3)),
        }),
      ).annotate({ identifier: "BillingGroupCostReportResultElement" });
    case 5:
      return S.Array(__S(140, __c17, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          BillingGroupCostReportResults: S.optional(__S(141, __c17, 5)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBillingGroupCostReportOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResponsibilityTransferArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-billing-transfer-preference" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBillingTransferPreferenceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponsibilityTransferArn: S.String,
          AutoBillingTransferBillingGroupCreation: __S(152, __c19, 0),
          LastModifiedTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetBillingTransferPreferenceOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, PricingPlanArn: S.optional(S.String) }),
      ).annotate({ identifier: "AutoTransferBillingGroupCreationPreference" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Association: S.optional(S.String),
          AccountId: S.optional(S.String),
          AccountIds: S.optional(__S(360, __c45, 0)),
        }),
      ).annotate({ identifier: "ListAccountAssociationsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          Filters: S.optional(__S(160, __c20, 0)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-account-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccountAssociationsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          BillingGroupArn: S.optional(S.String),
          AccountName: S.optional(SensitiveString),
          AccountEmail: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AccountAssociationsListElement" });
    case 3:
      return S.Array(__S(162, __c20, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          LinkedAccounts: S.optional(__S(163, __c20, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccountAssociationsOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BillingGroupArns: S.optional(__S(360, __c45, 0)) }),
      ).annotate({ identifier: "ListBillingGroupCostReportsFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(168, __c21, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-billing-group-cost-reports" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBillingGroupCostReportsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AWSCost: S.optional(S.String),
          ProformaCost: S.optional(S.String),
          Margin: S.optional(S.String),
          MarginPercentage: S.optional(S.String),
          Currency: S.optional(S.String),
        }),
      ).annotate({ identifier: "BillingGroupCostReportElement" });
    case 3:
      return S.Array(__S(170, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          BillingGroupCostReports: S.optional(__S(171, __c21, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBillingGroupCostReportsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SearchOption: S.String, SearchValue: S.String })).annotate({
        identifier: "StringSearch",
      });
    case 1:
      return S.Array(__S(176, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arns: S.optional(__S(360, __c45, 0)),
          PricingPlan: S.optional(S.String),
          Statuses: S.optional(__S(40, __c5, 0)),
          AutoAssociate: S.optional(S.Boolean),
          PrimaryAccountIds: S.optional(__S(360, __c45, 0)),
          BillingGroupTypes: S.optional(__S(40, __c5, 0)),
          Names: S.optional(__S(177, __c22, 1)),
          ResponsibilityTransferArns: S.optional(__S(360, __c45, 0)),
        }),
      ).annotate({ identifier: "ListBillingGroupsFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(178, __c22, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-billing-groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBillingGroupsInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          Arn: S.optional(S.String),
          Description: S.optional(SensitiveString),
          PrimaryAccountId: S.optional(S.String),
          ComputationPreference: S.optional(__S(24, __c3, 0)),
          Size: S.optional(S.Number),
          CreationTime: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          AccountGrouping: S.optional(__S(184, __c23, 0)),
          BillingGroupType: S.optional(S.String),
        }),
      ).annotate({ identifier: "BillingGroupListElement" });
    case 5:
      return S.Array(__S(180, __c22, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          BillingGroups: S.optional(__S(181, __c22, 5)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBillingGroupsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoAssociate: S.optional(S.Boolean),
          ResponsibilityTransferArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBillingGroupAccountGrouping" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(192, __c24, 0)),
          BillingGroups: S.optional(__S(360, __c45, 0)),
          Arns: S.optional(__S(360, __c45, 0)),
          AccountIds: S.optional(__S(360, __c45, 0)),
        }),
      ).annotate({ identifier: "ListCustomLineItemsFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(193, __c24, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-custom-line-items" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomLineItemsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          ChargeDetails: S.optional(__S(201, __c25, 1)),
          CurrencyCode: S.optional(S.String),
          Description: S.optional(SensitiveString),
          ProductCode: S.optional(S.String),
          BillingGroupArn: S.optional(S.String),
          CreationTime: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          AssociationSize: S.optional(S.Number),
          AccountId: S.optional(S.String),
          ComputationRule: S.optional(S.String),
          PresentationDetails: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "CustomLineItemListElement" });
    case 4:
      return S.Array(__S(195, __c24, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CustomLineItems: S.optional(__S(196, __c24, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomLineItemsOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PercentageValue: S.Number })).annotate({
        identifier: "ListCustomLineItemPercentageChargeDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Flat: S.optional(__S(56, __c7, 0)),
          Percentage: S.optional(__S(200, __c25, 0)),
          Type: S.String,
          LineItemFilters: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "ListCustomLineItemChargeDetails" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartBillingPeriod: S.optional(S.String),
          EndBillingPeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomLineItemVersionsBillingPeriodRangeFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BillingPeriodRange: S.optional(__S(208, __c26, 0)) }),
      ).annotate({ identifier: "ListCustomLineItemVersionsFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(209, __c26, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-custom-line-item-versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomLineItemVersionsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          ChargeDetails: S.optional(__S(201, __c25, 1)),
          CurrencyCode: S.optional(S.String),
          Description: S.optional(SensitiveString),
          ProductCode: S.optional(S.String),
          BillingGroupArn: S.optional(S.String),
          CreationTime: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          AssociationSize: S.optional(S.Number),
          StartBillingPeriod: S.optional(S.String),
          EndBillingPeriod: S.optional(S.String),
          Arn: S.optional(S.String),
          StartTime: S.optional(S.Number),
          AccountId: S.optional(S.String),
          ComputationRule: S.optional(S.String),
          PresentationDetails: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "CustomLineItemVersionListElement" });
    case 4:
      return S.Array(__S(211, __c26, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CustomLineItemVersions: S.optional(__S(212, __c26, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCustomLineItemVersionsOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          Filters: S.optional(__S(224, __c28, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-pricing-plans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPricingPlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          Arn: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Size: S.optional(S.Number),
          CreationTime: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PricingPlanListElement" });
    case 2:
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingPlans: S.optional(__S(218, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPricingPlansOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arns: S.optional(__S(360, __c45, 0)) })).annotate({
        identifier: "ListPricingPlansFilter",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingRuleArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-pricing-plans-associated-with-pricing-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPricingPlansAssociatedWithPricingRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingRuleArn: S.optional(S.String),
          PricingPlanArns: S.optional(__S(360, __c45, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPricingPlansAssociatedWithPricingRuleOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          Filters: S.optional(__S(224, __c28, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-pricing-rules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPricingRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          Arn: S.optional(S.String),
          Description: S.optional(SensitiveString),
          Scope: S.optional(S.String),
          Type: S.optional(S.String),
          ModifierPercentage: S.optional(S.Number),
          Service: S.optional(S.String),
          AssociatedPricingPlanCount: S.optional(S.Number),
          CreationTime: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          BillingEntity: S.optional(S.String),
          Tiering: S.optional(__S(83, __c10, 3)),
          UsageType: S.optional(S.String),
          Operation: S.optional(S.String),
        }),
      ).annotate({ identifier: "PricingRuleListElement" });
    case 2:
      return S.Array(__S(241, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingRules: S.optional(__S(242, __c30, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPricingRulesOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingPlanArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-pricing-rules-associated-to-pricing-plan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPricingRulesAssociatedToPricingPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          PricingPlanArn: S.optional(S.String),
          PricingRuleArns: S.optional(__S(360, __c45, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPricingRulesAssociatedToPricingPlanOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Relationship: S.optional(S.String) })).annotate({
        identifier: "ListResourcesAssociatedToCustomLineItemFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          Arn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(256, __c32, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-resources-associated-to-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourcesAssociatedToCustomLineItemInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Relationship: S.optional(S.String),
          EndBillingPeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcesAssociatedToCustomLineItemResponseElement" });
    case 3:
      return S.Array(__S(258, __c32, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          AssociatedResources: S.optional(__S(259, __c32, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcesAssociatedToCustomLineItemOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(16, __c2, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(16, __c2, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(360, __c45, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          Status: S.optional(S.String),
          ComputationPreference: S.optional(__S(24, __c3, 0)),
          Description: S.optional(SensitiveString),
          AccountGrouping: S.optional(__S(184, __c23, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-billing-group" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBillingGroupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          PrimaryAccountId: S.optional(S.String),
          PricingPlanArn: S.optional(S.String),
          Size: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          AccountGrouping: S.optional(__S(184, __c23, 0)),
        }),
      ).annotate({ identifier: "UpdateBillingGroupOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          ResponsibilityTransferArn: S.String,
          AutoBillingTransferBillingGroupCreation: __S(152, __c19, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/update-billing-transfer-preference" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBillingTransferPreferenceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResponsibilityTransferArn: S.String,
          AutoBillingTransferBillingGroupCreation: __S(152, __c19, 0),
          LastModifiedTime: S.Number,
        }),
      ).annotate({ identifier: "UpdateBillingTransferPreferenceOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Flat: S.optional(__S(56, __c7, 0)),
          Percentage: S.optional(__S(200, __c25, 0)),
          LineItemFilters: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "UpdateCustomLineItemChargeDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          ChargeDetails: S.optional(__S(312, __c39, 0)),
          BillingPeriodRange: S.optional(__S(392, __c49, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomLineItemInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          BillingGroupArn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          ChargeDetails: S.optional(__S(201, __c25, 1)),
          LastModifiedTime: S.optional(S.Number),
          AssociationSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdateCustomLineItemOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/update-pricing-plan" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePricingPlanInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          Size: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdatePricingPlanOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          Type: S.optional(S.String),
          ModifierPercentage: S.optional(S.Number),
          Tiering: S.optional(__S(83, __c10, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/update-pricing-rule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePricingRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(SensitiveString),
          Description: S.optional(SensitiveString),
          Scope: S.optional(S.String),
          Type: S.optional(S.String),
          ModifierPercentage: S.optional(S.Number),
          Service: S.optional(S.String),
          AssociatedPricingPlanCount: S.optional(S.Number),
          LastModifiedTime: S.optional(S.Number),
          BillingEntity: S.optional(S.String),
          Tiering: S.optional(__S(83, __c10, 3)),
          UsageType: S.optional(S.String),
          Operation: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdatePricingRuleOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(336, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, AccountIds: __S(360, __c45, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/associate-accounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAccountsInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "AssociateAccountsOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, PricingRuleArns: __S(360, __c45, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/associate-pricing-rules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePricingRulesInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetArn: S.String,
          ResourceArns: __S(360, __c45, 0),
          BillingPeriodRange: S.optional(__S(392, __c49, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/batch-associate-resources-to-custom-line-item" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchAssociateResourcesToCustomLineItemInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SuccessfullyAssociatedResources: S.optional(__S(386, __c48, 2)),
          FailedAssociatedResources: S.optional(__S(386, __c48, 2)),
        }),
      ).annotate({ identifier: "BatchAssociateResourcesToCustomLineItemOutput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), Reason: S.optional(S.String) }),
      ).annotate({ identifier: "AssociateResourceError" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Error: S.optional(__S(384, __c48, 0)) }),
      ).annotate({ identifier: "AssociateResourceResponseElement" });
    case 2:
      return S.Array(__S(385, __c48, 1));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InclusiveStartBillingPeriod: S.String,
          ExclusiveEndBillingPeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomLineItemBillingPeriodRange" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
