import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { awsServiceErrorsWith } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Marketplace Discovery",
  serviceShapeName: "AWSMarketplaceDiscovery",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-02-05");
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
              `https://discovery-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://discovery-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://discovery-marketplace.{R}.api.aws","properties":{},"headers":{}}',
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
  prefix: "MarketplaceDiscovery",
  service: "MarketplaceDiscovery",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Locale = string;
export type ListingId = string;
export interface GetListingInput {
  locale?: string | undefined;
  listingId: string;
}
export type ProductId = string;
export type NonEmptyString = string;
export type SellerProfileId = string;
export interface SellerInformation {
  sellerProfileId: string;
  displayName: string;
}
export interface ProductInformation {
  productId: string;
  productName: string;
  manufacturer: SellerInformation;
}
export type OfferId = string;
export type NullableString = string;
export interface OfferInformation {
  offerId: string;
  offerName?: string | undefined;
  sellerOfRecord: SellerInformation;
}
export interface ListingAssociatedEntity {
  product?: ProductInformation | undefined;
  offer?: OfferInformation | undefined;
}
export type ListingAssociatedEntityList = ListingAssociatedEntity[];
export type ListingBadgeType =
  | "AWS_FREE_TIER"
  | "FREE_TRIAL"
  | "DEPLOYED_ON_AWS"
  | "QUICK_LAUNCH"
  | "MULTI_PRODUCT"
  | (string & {});
export interface ListingBadge {
  displayName: string;
  badgeType: ListingBadgeType;
}
export type ListingBadgeList = ListingBadge[];
export type Catalog = string;
export interface Category {
  categoryId: string;
  displayName: string;
}
export type CategoryList = Category[];
export type FulfillmentOptionType =
  | "AMAZON_MACHINE_IMAGE"
  | "API"
  | "CLOUDFORMATION_TEMPLATE"
  | "CONTAINER"
  | "HELM"
  | "EKS_ADD_ON"
  | "EC2_IMAGE_BUILDER_COMPONENT"
  | "DATA_EXCHANGE"
  | "PROFESSIONAL_SERVICES"
  | "SAAS"
  | "SAGEMAKER_ALGORITHM"
  | "SAGEMAKER_MODEL"
  | (string & {});
export interface FulfillmentOptionSummary {
  fulfillmentOptionType: FulfillmentOptionType;
  displayName: string;
}
export type FulfillmentOptionSummaryList = FulfillmentOptionSummary[];
export type HighlightList = string[];
export type URL = string;
export type PricingModelType = "USAGE" | "CONTRACT" | "BYOL" | "FREE" | (string & {});
export interface PricingModel {
  pricingModelType: PricingModelType;
  displayName: string;
}
export type PricingModelList = PricingModel[];
export type PricingUnitType =
  | "USERS"
  | "HOSTS"
  | "BANDWIDTH"
  | "DATA"
  | "TIERS"
  | "REQUESTS"
  | "UNITS"
  | (string & {});
export interface PricingUnit {
  pricingUnitType: PricingUnitType;
  displayName: string;
}
export type PricingUnitList = PricingUnit[];
export interface PromotionalEmbeddedImage {
  title: string;
  url: string;
  description?: string | undefined;
}
export interface PromotionalEmbeddedVideo {
  title: string;
  url: string;
  preview: string;
  thumbnail: string;
  description?: string | undefined;
}
export type PromotionalMedia =
  | { embeddedImage: PromotionalEmbeddedImage; embeddedVideo?: undefined }
  | { embeddedImage?: undefined; embeddedVideo: PromotionalEmbeddedVideo };
export type PromotionalMediaList = PromotionalMedia[];
export type ResourceType = "MANUFACTURER_SUPPORT" | "MANUFACTURER_INSTRUCTIONS" | (string & {});
export type ResourceContentType = "EMAIL" | "PHONE_NUMBER" | "LINK" | "OTHER" | (string & {});
export interface Resource {
  resourceType: ResourceType;
  contentType: ResourceContentType;
  value: string;
  displayName?: string | undefined;
}
export type ResourceList = Resource[];
export type ReviewSourceId = "AWS_MARKETPLACE" | "G2" | "PEERSPOT" | (string & {});
export type NonNegativeCount = number;
export interface ReviewSourceSummary {
  sourceName: string;
  sourceId: ReviewSourceId;
  sourceUrl?: string | undefined;
  averageRating: string;
  totalReviews: number;
}
export type ReviewSourceSummaryList = ReviewSourceSummary[];
export interface ReviewSummary {
  reviewSourceSummaries: ReviewSourceSummary[];
}
export type SellerEngagementType =
  | "REQUEST_FOR_PRIVATE_OFFER"
  | "REQUEST_FOR_DEMO"
  | "EXPRESS_PRIVATE_OFFER"
  | "BUY_NOW"
  | "TRY_FOR_FREE"
  | (string & {});
export type SellerEngagementContentType = "LINK" | (string & {});
export interface SellerEngagement {
  engagementType: SellerEngagementType;
  contentType: SellerEngagementContentType;
  value: string;
}
export type SellerEngagementList = SellerEngagement[];
export interface UseCase {
  description: string;
  displayName: string;
  value: string;
}
export interface UseCaseEntry {
  useCase: UseCase;
}
export type UseCaseList = UseCaseEntry[];
export type PurchaseIndicatorType =
  | "NOT_AVAILABLE_FOR_SUBSCRIPTION"
  | "AVAILABLE_FOR_USE_WITHOUT_SUBSCRIPTION"
  | (string & {});
export interface PurchaseIndicator {
  indicatorType: PurchaseIndicatorType;
}
export type PurchaseIndicatorList = PurchaseIndicator[];
export interface GetListingOutput {
  locale?: string | undefined;
  associatedEntities: ListingAssociatedEntity[];
  badges: ListingBadge[];
  catalog: string;
  categories: Category[];
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  highlights: string[];
  integrationGuide?: string | undefined;
  listingId: string;
  listingName: string;
  logoThumbnailUrl: string;
  longDescription: string;
  pricingModels: PricingModel[];
  pricingUnits: PricingUnit[];
  promotionalMedia: PromotionalMedia[];
  publisher: SellerInformation;
  resources: Resource[];
  reviewSummary?: ReviewSummary | undefined;
  sellerEngagements: SellerEngagement[];
  shortDescription: string;
  useCases: UseCaseEntry[];
  purchaseIndicators: PurchaseIndicator[];
}
export interface GetOfferInput {
  locale?: string | undefined;
  offerId: string;
}
export type OfferSetId = string;
export interface OfferSetInformation {
  offerSetId: string;
  sellerOfRecord: SellerInformation;
}
export interface OfferAssociatedEntity {
  product: ProductInformation;
  offerSet?: OfferSetInformation | undefined;
}
export type OfferAssociatedEntityList = OfferAssociatedEntity[];
export type AgreementResourceId = string;
export type PurchaseOptionBadgeType =
  | "PRIVATE_PRICING"
  | "FUTURE_DATED"
  | "REPLACEMENT_OFFER"
  | "AUTO_RENEW"
  | (string & {});
export interface PurchaseOptionBadge {
  displayName: string;
  badgeType: PurchaseOptionBadgeType;
}
export type PurchaseOptionBadgeList = PurchaseOptionBadge[];
export interface GetOfferOutput {
  locale?: string | undefined;
  offerId: string;
  catalog: string;
  offerName?: string | undefined;
  expirationTime?: Date | undefined;
  availableFromTime?: Date | undefined;
  sellerOfRecord: SellerInformation;
  associatedEntities: OfferAssociatedEntity[];
  agreementProposalId: string;
  replacementAgreementId?: string | undefined;
  pricingModel: PricingModel;
  badges: PurchaseOptionBadge[];
}
export interface GetOfferSetInput {
  locale?: string | undefined;
  offerSetId: string;
}
export interface OfferSetAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
}
export type OfferSetAssociatedEntityList = OfferSetAssociatedEntity[];
export interface GetOfferSetOutput {
  locale?: string | undefined;
  offerSetId: string;
  catalog: string;
  offerSetName?: string | undefined;
  availableFromTime?: Date | undefined;
  expirationTime?: Date | undefined;
  buyerNotes?: string | undefined;
  sellerOfRecord: SellerInformation;
  badges: PurchaseOptionBadge[];
  associatedEntities: OfferSetAssociatedEntity[];
}
export type NextToken = string;
export interface GetOfferTermsInput {
  locale?: string | undefined;
  offerId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type TermId = string;
export type TermType =
  | "ByolPricingTerm"
  | "ConfigurableUpfrontPricingTerm"
  | "FixedUpfrontPricingTerm"
  | "UsageBasedPricingTerm"
  | "FreeTrialPricingTerm"
  | "LegalTerm"
  | "PaymentScheduleTerm"
  | "RecurringPaymentTerm"
  | "RenewalTerm"
  | "SupportTerm"
  | "ValidityTerm"
  | "VariablePaymentTerm"
  | "NetPaymentTerm"
  | (string & {});
export interface ByolPricingTerm {
  id: string;
  type: TermType;
}
export type CurrencyCode = string;
export type SelectorType = "Duration" | (string & {});
export type BoundedString = string;
export interface Selector {
  type: SelectorType;
  value: string;
}
export type RateCardConstraintType = "Allowed" | "Disallowed" | (string & {});
export interface Constraints {
  multipleDimensionSelection: RateCardConstraintType;
  quantityConfiguration: RateCardConstraintType;
}
export type DimensionLabelType = "Region" | "SagemakerOption" | (string & {});
export interface DimensionLabel {
  labelType: DimensionLabelType;
  labelValue: string;
  displayName?: string | undefined;
}
export type DimensionLabelList = DimensionLabel[];
export interface RegionalPrice {
  region: string;
  displayName: string;
  price: string;
}
export type RegionalPriceList = RegionalPrice[];
export interface RateCardItem {
  dimensionKey: string;
  displayName: string;
  description?: string | undefined;
  dimensionLabels?: DimensionLabel[] | undefined;
  unit: string;
  price: string;
  regionalPrices: RegionalPrice[];
}
export type RateCardList = RateCardItem[];
export interface ConfigurableUpfrontRateCardItem {
  selector: Selector;
  constraints: Constraints;
  rateCard: RateCardItem[];
}
export type ConfigurableUpfrontRateCardList = ConfigurableUpfrontRateCardItem[];
export interface ConfigurableUpfrontPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  rateCards?: ConfigurableUpfrontRateCardItem[] | undefined;
}
export interface GrantItem {
  dimensionKey: string;
  displayName: string;
  description?: string | undefined;
  dimensionLabels?: DimensionLabel[] | undefined;
  unit: string;
  maxQuantity?: number | undefined;
}
export type GrantList = GrantItem[];
export interface FixedUpfrontPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  duration?: string | undefined;
  price: string;
  grants: GrantItem[];
}
export interface FreeTrialPricingTerm {
  id: string;
  type: TermType;
  duration?: string | undefined;
  grants: GrantItem[];
}
export type LegalDocumentType =
  | "CustomEula"
  | "CustomDsa"
  | "EnterpriseEula"
  | "StandardEula"
  | "StandardDsa"
  | (string & {});
export interface DocumentItem {
  type: LegalDocumentType;
  url: string;
  version?: string | undefined;
}
export type DocumentList = DocumentItem[];
export interface LegalTerm {
  id: string;
  type: TermType;
  documents: DocumentItem[];
}
export interface ScheduleItem {
  chargeDate: Date;
  chargeAmount: string;
}
export type ScheduleList = ScheduleItem[];
export interface PaymentScheduleTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  schedule: ScheduleItem[];
}
export type BillingPeriodType = "Monthly" | (string & {});
export interface RecurringPaymentTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  billingPeriod: BillingPeriodType;
  price: string;
}
export interface FixedPercentage {
  percentageValue: string;
}
export interface PercentageRange {
  minimumValue: string;
  maximumValue: string;
  defaultValue: string;
}
export type PriceIncrease =
  | { fixedPercentage: FixedPercentage; percentageRange?: undefined }
  | { fixedPercentage?: undefined; percentageRange: PercentageRange };
export interface PaymentScheduleEntry {
  chargeDateOffset: string;
  chargePercentage: string;
  dayOfMonth?: number | undefined;
}
export type PaymentScheduleEntryList = PaymentScheduleEntry[];
export interface PaymentScheduleTermTemplate {
  schedule: PaymentScheduleEntry[];
}
export type TermTemplate = { paymentScheduleTermTemplate: PaymentScheduleTermTemplate };
export type TermTemplateList = TermTemplate[];
export interface RenewalTerm {
  id: string;
  type: TermType;
  maxRenewals?: number | undefined;
  lockoutPeriod?: string | undefined;
  adjustmentDeadline?: string | undefined;
  priceIncrease?: PriceIncrease | undefined;
  termTemplates?: TermTemplate[] | undefined;
}
export interface SupportTerm {
  id: string;
  type: TermType;
  refundPolicy: string;
}
export interface UsageBasedRateCardItem {
  rateCard: RateCardItem[];
}
export type UsageBasedRateCardList = UsageBasedRateCardItem[];
export interface UsageBasedPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  rateCards: UsageBasedRateCardItem[];
}
export interface ValidityTerm {
  id: string;
  type: TermType;
  agreementDuration?: string | undefined;
  agreementEndDate?: Date | undefined;
  agreementStartDate?: Date | undefined;
}
export interface VariablePaymentTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  maxTotalChargeAmount: string;
}
export interface NetPaymentTerm {
  id: string;
  type: TermType;
  paymentDuePeriod: string;
}
export type OfferTerm =
  | {
      byolPricingTerm: ByolPricingTerm;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm: LegalTerm;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm: PaymentScheduleTerm;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm: RecurringPaymentTerm;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm: RenewalTerm;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm: SupportTerm;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm: ValidityTerm;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: undefined;
    }
  | {
      byolPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      legalTerm?: undefined;
      paymentScheduleTerm?: undefined;
      recurringPaymentTerm?: undefined;
      renewalTerm?: undefined;
      supportTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      validityTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm: NetPaymentTerm;
    };
export type OfferTermsList = OfferTerm[];
export interface GetOfferTermsOutput {
  locale?: string | undefined;
  offerTerms: OfferTerm[];
  nextToken?: string | undefined;
}
export interface GetProductInput {
  locale?: string | undefined;
  productId: string;
}
export type DeployedOnAwsStatus = "DEPLOYED" | "NOT_DEPLOYED" | "NOT_APPLICABLE" | (string & {});
export interface GetProductOutput {
  locale?: string | undefined;
  productId: string;
  catalog: string;
  productName: string;
  manufacturer: SellerInformation;
  deployedOnAws: DeployedOnAwsStatus;
  shortDescription: string;
  longDescription: string;
  logoThumbnailUrl: string;
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  categories: Category[];
  highlights: string[];
  promotionalMedia: PromotionalMedia[];
  resources: Resource[];
  sellerEngagements: SellerEngagement[];
  listingId: string;
  purchaseIndicators: PurchaseIndicator[];
}
export interface ListFulfillmentOptionsInput {
  locale?: string | undefined;
  productId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AmazonMachineImageOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
  operatingSystemVersion?: string | undefined;
}
export type AmazonMachineImageOperatingSystemList = AmazonMachineImageOperatingSystem[];
export type AmazonMachineImageCidrIpAddressList = string[];
export interface AmazonMachineImageSecurityGroup {
  protocol: string;
  fromPort: number;
  toPort: number;
  cidrIpAddresses: string[];
}
export type AmazonMachineImageSecurityGroupList = AmazonMachineImageSecurityGroup[];
export interface AmazonMachineImageRecommendation {
  instanceType: string;
  securityGroups?: AmazonMachineImageSecurityGroup[] | undefined;
}
export type AmazonMachineImageEbsVolumeTypeList = string[];
export interface AmazonMachineImageEbsVolume {
  volumeTypes: string[];
  iops?: number | undefined;
}
export interface AmazonMachineImageFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionVersion?: string | undefined;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  operatingSystems: AmazonMachineImageOperatingSystem[];
  recommendation?: AmazonMachineImageRecommendation | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
  availableFromTime?: Date | undefined;
  accessUrlTemplate?: string | undefined;
  architecture: string;
  amiAlias?: string | undefined;
  ebsVolume?: AmazonMachineImageEbsVolume | undefined;
  shortDescription?: string | undefined;
}
export interface AwsSupportedService {
  supportedServiceType: string;
  displayName: string;
  description: string;
}
export type AwsSupportedServiceList = AwsSupportedService[];
export interface ApiFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  usageInstructions?: string | undefined;
  awsSupportedServices: AwsSupportedService[];
}
export interface CloudFormationFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
  availableFromTime?: Date | undefined;
  architectureDiagramUrl?: string | undefined;
  deploymentTemplateUrl?: string | undefined;
  shortDescription?: string | undefined;
  longDescription?: string | undefined;
}
export interface ContainerOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export type ContainerOperatingSystemList = ContainerOperatingSystem[];
export interface ContainerFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  operatingSystems?: ContainerOperatingSystem[] | undefined;
  awsSupportedServices?: AwsSupportedService[] | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
}
export interface HelmOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export type HelmOperatingSystemList = HelmOperatingSystem[];
export interface HelmFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  operatingSystems?: HelmOperatingSystem[] | undefined;
  releaseNotes?: string | undefined;
  awsSupportedServices?: AwsSupportedService[] | undefined;
  usageInstructions?: string | undefined;
}
export interface EksAddOnOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export type EksAddOnOperatingSystemList = EksAddOnOperatingSystem[];
export interface EksAddOnFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  operatingSystems?: EksAddOnOperatingSystem[] | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
  awsSupportedServices?: AwsSupportedService[] | undefined;
}
export interface Ec2ImageBuilderComponentFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  operatingSystems?: ContainerOperatingSystem[] | undefined;
  awsSupportedServices?: AwsSupportedService[] | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
}
export interface DataArtifact {
  description?: string | undefined;
  resourceArn?: string | undefined;
  resourceType: string;
  dataClassification: string;
}
export type DataArtifactList = DataArtifact[];
export interface DataExchangeFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  dataArtifacts?: DataArtifact[] | undefined;
}
export interface ProfessionalServicesFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
}
export type SaasQuickLaunchStatus = "ENABLED" | "DISABLED" | (string & {});
export interface SaasCloudFormationDeploymentTemplate {
  templateName: string;
  description?: string | undefined;
  defaultStackName: string;
  templateUrl: string;
  iamPolicy: string;
}
export type SaasDeploymentTemplate = {
  cloudFormationDeploymentTemplate: SaasCloudFormationDeploymentTemplate;
};
export type SaasDeploymentTemplateList = SaasDeploymentTemplate[];
export interface SaasFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentUrl?: string | undefined;
  usageInstructions?: string | undefined;
  availableFromTime?: Date | undefined;
  launchUrl?: string | undefined;
  quickLaunch: SaasQuickLaunchStatus;
  deploymentTemplates: SaasDeploymentTemplate[];
}
export interface SageMakerAlgorithmRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string | undefined;
  recommendedTrainingInstanceType: string;
}
export interface SageMakerAlgorithmFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
  recommendation?: SageMakerAlgorithmRecommendation | undefined;
}
export interface SageMakerModelRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string | undefined;
}
export type SageMakerModelContentTypeList = string[];
export type SageMakerModelResponseMimeTypeList = string[];
export interface SageMakerModelFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string | undefined;
  releaseNotes?: string | undefined;
  usageInstructions?: string | undefined;
  recommendation?: SageMakerModelRecommendation | undefined;
  supportedContentTypes?: string[] | undefined;
  supportedResponseMimeTypes?: string[] | undefined;
}
export type FulfillmentOption =
  | {
      amazonMachineImageFulfillmentOption: AmazonMachineImageFulfillmentOption;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption: ApiFulfillmentOption;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption: CloudFormationFulfillmentOption;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption: ContainerFulfillmentOption;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption: HelmFulfillmentOption;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption: EksAddOnFulfillmentOption;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption: Ec2ImageBuilderComponentFulfillmentOption;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption: DataExchangeFulfillmentOption;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption: ProfessionalServicesFulfillmentOption;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption: SaasFulfillmentOption;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption: SageMakerAlgorithmFulfillmentOption;
      sageMakerModelFulfillmentOption?: undefined;
    }
  | {
      amazonMachineImageFulfillmentOption?: undefined;
      apiFulfillmentOption?: undefined;
      cloudFormationFulfillmentOption?: undefined;
      containerFulfillmentOption?: undefined;
      helmFulfillmentOption?: undefined;
      eksAddOnFulfillmentOption?: undefined;
      ec2ImageBuilderComponentFulfillmentOption?: undefined;
      dataExchangeFulfillmentOption?: undefined;
      professionalServicesFulfillmentOption?: undefined;
      saasFulfillmentOption?: undefined;
      sageMakerAlgorithmFulfillmentOption?: undefined;
      sageMakerModelFulfillmentOption: SageMakerModelFulfillmentOption;
    };
export type FulfillmentOptionsList = FulfillmentOption[];
export interface ListFulfillmentOptionsOutput {
  locale?: string | undefined;
  fulfillmentOptions: FulfillmentOption[];
  nextToken?: string | undefined;
}
export type ListingAttributeType =
  | "CASE_STUDY"
  | "SPECIALIZATION_DETAIL"
  | "TRUST_CENTER_SOURCE"
  | "TRUST_CENTER_CERTIFICATION"
  | "TRUST_CENTER_DOCUMENT"
  | "TRUST_CENTER_CONTROL"
  | "TRUST_CENTER_FAQ"
  | "TRUST_CENTER_UPDATE"
  | (string & {});
export type ListingAttributeTypeList = ListingAttributeType[];
export type MaxResults = number;
export interface ListListingAttributesInput {
  locale?: string | undefined;
  listingId: string;
  attributeTypes: ListingAttributeType[];
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type CaseStudyId = string;
export interface EngagementDates {
  startDate: Date;
  completionDate?: Date | undefined;
}
export type CaseStudyResourceType = "CASE_STUDY_WEBSITE" | (string & {});
export interface CaseStudyResource {
  contentType: ResourceContentType;
  value: string;
  displayName?: string | undefined;
  resourceType: CaseStudyResourceType;
}
export type CaseStudyResourceList = CaseStudyResource[];
export interface CaseStudy {
  caseStudyId: string;
  caseStudyName: string;
  shortDescription: string;
  engagementDates?: EngagementDates | undefined;
  challenge?: string | undefined;
  resolution?: string | undefined;
  implementationApproach?: string | undefined;
  outcome?: string | undefined;
  resources?: CaseStudyResource[] | undefined;
}
export type SpecializationId = string;
export type SpecializationType = "USE_CASE" | "INDUSTRY" | "SERVICES" | (string & {});
export interface SpecializationTypeDetail {
  specializationType: SpecializationType;
  displayName: string;
}
export type SpecializationTypeList = SpecializationTypeDetail[];
export type CaseStudyIdList = string[];
export interface Specialization {
  specializationId: string;
  specializationName: string;
  description?: string | undefined;
  specializationTypes: SpecializationTypeDetail[];
  caseStudyIds?: string[] | undefined;
}
export interface SpecializationCategory {
  specializationCategoryId: string;
  specializationCategoryName: string;
  parentSpecializationId: string;
}
export type SpecializationDetail =
  | { specialization: Specialization; specializationCategory?: undefined }
  | { specialization?: undefined; specializationCategory: SpecializationCategory };
export type TrustCenterProvider = "DRATA" | "VANTA" | "OTHER" | (string & {});
export interface TrustCenterSource {
  contentType: ResourceContentType;
  value: string;
  displayName?: string | undefined;
  provider: TrustCenterProvider;
}
export interface TrustCenterCertificationAttribute {
  certificationType: string;
  displayName: string;
  logoUrl: string;
}
export type TrustCenterDocumentAccessType = "DOWNLOAD" | "VIEW" | "REQUEST_ACCESS" | (string & {});
export interface TrustCenterDocumentAttribute {
  contentType: ResourceContentType;
  value: string;
  displayName?: string | undefined;
  subjectArea?: string | undefined;
  accessType: TrustCenterDocumentAccessType;
}
export type TrustCenterControlDomain = "SECURITY" | "AI_GOVERNANCE" | "RESILIENCE" | (string & {});
export type TrustCenterControlDomainList = TrustCenterControlDomain[];
export interface TrustCenterControl {
  name: string;
  description?: string | undefined;
  domains: TrustCenterControlDomain[];
}
export interface TrustCenterFaqAttribute {
  question: string;
  answer: string;
  subjectArea?: string | undefined;
}
export interface TrustCenterUpdateAttribute {
  title: string;
  description: string;
  publishedTime: Date;
}
export type ListingAttributeResults =
  | {
      caseStudy: CaseStudy;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail: SpecializationDetail;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource: TrustCenterSource;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification: TrustCenterCertificationAttribute;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument: TrustCenterDocumentAttribute;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl: TrustCenterControl;
      trustCenterFaq?: undefined;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq: TrustCenterFaqAttribute;
      trustCenterUpdate?: undefined;
    }
  | {
      caseStudy?: undefined;
      specializationDetail?: undefined;
      trustCenterSource?: undefined;
      trustCenterCertification?: undefined;
      trustCenterDocument?: undefined;
      trustCenterControl?: undefined;
      trustCenterFaq?: undefined;
      trustCenterUpdate: TrustCenterUpdateAttribute;
    };
export type ListingAttributeResultsList = ListingAttributeResults[];
export interface ListListingAttributesOutput {
  locale?: string | undefined;
  listingAttributes: ListingAttributeResults[];
  nextToken?: string | undefined;
}
export type PurchaseOptionFilterType =
  | "PRODUCT_ID"
  | "SELLER_OF_RECORD_PROFILE_ID"
  | "PURCHASE_OPTION_TYPE"
  | "VISIBILITY_SCOPE"
  | "AVAILABILITY_STATUS"
  | (string & {});
export type PurchaseOptionFilterValue = string;
export type PurchaseOptionFilterValueList = string[];
export interface PurchaseOptionFilter {
  filterType: PurchaseOptionFilterType;
  filterValues: string[];
}
export type PurchaseOptionFilterList = PurchaseOptionFilter[];
export interface ListPurchaseOptionsInput {
  locale?: string | undefined;
  filters?: PurchaseOptionFilter[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type PurchaseOptionType = "OFFER" | "OFFERSET" | (string & {});
export interface PurchaseOptionAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
  offerSet?: OfferSetInformation | undefined;
}
export type PurchaseOptionAssociatedEntityList = PurchaseOptionAssociatedEntity[];
export interface PurchaseOptionSummary {
  purchaseOptionId: string;
  catalog: string;
  purchaseOptionType: PurchaseOptionType;
  purchaseOptionName?: string | undefined;
  availableFromTime?: Date | undefined;
  expirationTime?: Date | undefined;
  sellerOfRecord: SellerInformation;
  badges?: PurchaseOptionBadge[] | undefined;
  associatedEntities: PurchaseOptionAssociatedEntity[];
}
export type PurchaseOptionSummaryList = PurchaseOptionSummary[];
export interface ListPurchaseOptionsOutput {
  purchaseOptions?: PurchaseOptionSummary[] | undefined;
  nextToken?: string | undefined;
}
export type SearchText = string;
export type SearchFilterType =
  | "MIN_AVERAGE_CUSTOMER_RATING"
  | "MAX_AVERAGE_CUSTOMER_RATING"
  | "CATEGORY"
  | "PUBLISHER"
  | "FULFILLMENT_OPTION_TYPE"
  | "PRICING_MODEL"
  | "PRICING_UNIT"
  | "DEPLOYED_ON_AWS"
  | "NUMBER_OF_PRODUCTS"
  | "CERTIFICATES"
  | "PRODUCT_ID"
  | "SPECIALIZATION"
  | "SPECIALIZATION_CATEGORY"
  | "SELLER_ENGAGEMENT"
  | "TRUST_CENTER"
  | (string & {});
export type SearchFilterValue = string;
export type SearchFilterValueList = string[];
export interface SearchFilter {
  filterType: SearchFilterType;
  filterValues: string[];
}
export type SearchFilterList = SearchFilter[];
export type SearchFacetType =
  | "AVERAGE_CUSTOMER_RATING"
  | "CATEGORY"
  | "PUBLISHER"
  | "FULFILLMENT_OPTION_TYPE"
  | "PRICING_MODEL"
  | "PRICING_UNIT"
  | "DEPLOYED_ON_AWS"
  | "NUMBER_OF_PRODUCTS"
  | "CERTIFICATES"
  | "SPECIALIZATION"
  | "SPECIALIZATION_CATEGORY"
  | "SELLER_ENGAGEMENT"
  | "TRUST_CENTER"
  | (string & {});
export type FacetTypeList = SearchFacetType[];
export interface SearchFacetsInput {
  locale?: string | undefined;
  searchText?: string | undefined;
  filters?: SearchFilter[] | undefined;
  facetTypes?: SearchFacetType[] | undefined;
  nextToken?: string | undefined;
}
export interface ListingFacet {
  value: string;
  displayName: string;
  parent?: string | undefined;
  count: number;
}
export type ListingFacetList = ListingFacet[];
export type TypeToFacetMap = { [key in SearchFacetType]?: ListingFacet[] | undefined };
export interface SearchFacetsOutput {
  totalResults: number;
  listingFacets: { [key: string]: ListingFacet[] | undefined };
  nextToken?: string | undefined;
}
export type SearchListingsSortBy = "RELEVANCE" | "AVERAGE_CUSTOMER_RATING" | (string & {});
export type SearchListingsSortOrder = "DESCENDING" | "ASCENDING" | (string & {});
export interface SearchListingsInput {
  locale?: string | undefined;
  searchText?: string | undefined;
  filters?: SearchFilter[] | undefined;
  maxResults?: number | undefined;
  sortBy?: SearchListingsSortBy | undefined;
  sortOrder?: SearchListingsSortOrder | undefined;
  nextToken?: string | undefined;
}
export interface ListingSummaryAssociatedEntity {
  product?: ProductInformation | undefined;
}
export type ListingSummaryAssociatedEntityList = ListingSummaryAssociatedEntity[];
export interface TrustCenterSourceSummary {
  contentType: ResourceContentType;
  value: string;
  displayName?: string | undefined;
  provider: TrustCenterProvider;
}
export type TrustCenterSourceSummaryList = TrustCenterSourceSummary[];
export interface TrustCenterCertificationSummary {
  certificationType: string;
  displayName: string;
  logoUrl: string;
}
export type TrustCenterCertificationSummaryList = TrustCenterCertificationSummary[];
export interface TrustCenterSummary {
  sourceSummaries: TrustCenterSourceSummary[];
  certificationSummaries: TrustCenterCertificationSummary[];
  totalCertificationCount: number;
}
export interface CaseStudiesSummary {
  caseStudyCount: number;
}
export interface UseCaseInformation {
  displayName: string;
  value: string;
}
export interface UseCaseSummaryEntry {
  useCase: UseCaseInformation;
}
export type UseCaseSummaryList = UseCaseSummaryEntry[];
export interface UseCaseSummary {
  useCases: UseCaseSummaryEntry[];
}
export interface ListingSummary {
  listingId: string;
  listingName: string;
  publisher: SellerInformation;
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  catalog: string;
  shortDescription: string;
  logoThumbnailUrl: string;
  categories: Category[];
  badges: ListingBadge[];
  reviewSummary: ReviewSummary;
  pricingModels: PricingModel[];
  pricingUnits: PricingUnit[];
  associatedEntities: ListingSummaryAssociatedEntity[];
  trustCenterSummary?: TrustCenterSummary | undefined;
  caseStudiesSummary?: CaseStudiesSummary | undefined;
  useCaseSummary?: UseCaseSummary | undefined;
  sellerEngagements?: SellerEngagement[] | undefined;
}
export type ListingSummaryList = ListingSummary[];
export interface SearchListingsOutput {
  totalResults: number;
  listingSummaries: ListingSummary[];
  nextToken?: string | undefined;
}
export type ExceptionMessage = string;
export type ValidationExceptionReason =
  | "INVALID_PAGINATION_TOKEN"
  | "MALFORMED_REQUEST_PARAMETERS"
  | "PAGINATION_LIMIT_EXCEEDED"
  | (string & {});
export type GetListingError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about a listing, such as descriptions, badges, categories, pricing model summaries, reviews, and associated products and offers.
 */
export const getListing: API.OperationMethod<
  GetListingInput & RegionInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<GetListingInput>,
  output: __S(262, __c8, 6) as any as S.Schema<GetListingOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListing",
  telemetry: TELEMETRY,
  span: "GetListing",
}));

export type GetOfferError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about an offer, such as the pricing model, seller of record, availability dates, badges, and associated products.
 */
export const getOffer: API.OperationMethod<
  GetOfferInput & RegionInput,
  GetOfferOutput,
  GetOfferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetOfferInput>,
  output: __S(547, __c17, 3) as any as S.Schema<GetOfferOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOffer",
  telemetry: TELEMETRY,
  span: "GetOffer",
}));

export type GetOfferSetError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about an offer set, which is a bundle of offers across multiple products. Includes the seller, availability dates, buyer notes, and associated product-offer pairs.
 */
export const getOfferSet: API.OperationMethod<
  GetOfferSetInput & RegionInput,
  GetOfferSetOutput,
  GetOfferSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<GetOfferSetInput>,
  output: __S(611, __c19, 3) as any as S.Schema<GetOfferSetOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferSet",
  telemetry: TELEMETRY,
  span: "GetOfferSet",
}));

export type GetOfferTermsError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the terms attached to an offer, such as pricing terms (usage-based, contract, Bring Your Own License (BYOL), free trial), legal terms, payment schedules, validity terms, support terms, and renewal terms. The operation returns results in pages. Use `nextToken` to retrieve the next page.
 */
export const getOfferTerms: API.PaginatedOperationMethod<
  GetOfferTermsInput & RegionInput,
  GetOfferTermsOutput,
  GetOfferTermsError,
  Credentials | HttpClient.HttpClient,
  OfferTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetOfferTermsInput>,
  output: __S(682, __c21, 10) as any as S.Schema<GetOfferTermsOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offerTerms",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetOfferTerms",
})) as any;

export type GetProductError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about a product, such as descriptions, highlights, categories, fulfillment option summaries, promotional media, and seller engagement options.
 */
export const getProduct: API.OperationMethod<
  GetProductInput & RegionInput,
  GetProductOutput,
  GetProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetProductInput>,
  output: __S(705, __c22, 1) as any as S.Schema<GetProductOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProduct",
  telemetry: TELEMETRY,
  span: "GetProduct",
}));

export type ListFulfillmentOptionsError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the fulfillment options available for a product, including deployment details such as version information, operating systems, usage instructions, and release notes. The operation returns results in pages. Use `nextToken` to retrieve the next page.
 */
export const listFulfillmentOptions: API.PaginatedOperationMethod<
  ListFulfillmentOptionsInput & RegionInput,
  ListFulfillmentOptionsOutput,
  ListFulfillmentOptionsError,
  Credentials | HttpClient.HttpClient,
  FulfillmentOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListFulfillmentOptionsInput>,
  output: __S(31, __c0, 31) as any as S.Schema<ListFulfillmentOptionsOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFulfillmentOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fulfillmentOptions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFulfillmentOptions",
})) as any;

export type ListListingAttributesError =
  | ResourceNotFoundException
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the requested attributes for a listing, including case studies and trust center information. The operation returns results in pages. Use `nextToken` to retrieve the next page.
 */
export const listListingAttributes: API.PaginatedOperationMethod<
  ListListingAttributesInput & RegionInput,
  ListListingAttributesOutput,
  ListListingAttributesError,
  Credentials | HttpClient.HttpClient,
  ListingAttributeResults
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<ListListingAttributesInput>,
  output: __S(48, __c1, 16) as any as S.Schema<ListListingAttributesOutput>,
  errors: [ResourceNotFoundException],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListListingAttributes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingAttributes",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListListingAttributes",
})) as any;

export type ListPurchaseOptionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the purchase options (offers and offer sets) available to you. You can filter results by product, seller, purchase option type, visibility scope, and availability status. The operation returns results in pages. Use `nextToken` to retrieve the next page.
 *
 * You must include at least one of the following filters in the request: a `PRODUCT_ID` filter to specify the product for which to retrieve purchase options, or a `VISIBILITY_SCOPE` filter to retrieve purchase options by visibility.
 */
export const listPurchaseOptions: API.PaginatedOperationMethod<
  ListPurchaseOptionsInput & RegionInput,
  ListPurchaseOptionsOutput,
  ListPurchaseOptionsError,
  Credentials | HttpClient.HttpClient,
  PurchaseOptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<ListPurchaseOptionsInput>,
  output: __S(133, __c4, 5) as any as S.Schema<ListPurchaseOptionsOutput>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPurchaseOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "purchaseOptions",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPurchaseOptions",
})) as any;

export type SearchFacetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the available facet values for filtering listings, such as categories, pricing models, fulfillment option types, publishers, and customer ratings. Each facet value includes a count of matching listings.
 */
export const searchFacets: API.PaginatedOperationMethod<
  SearchFacetsInput & RegionInput,
  SearchFacetsOutput,
  SearchFacetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<SearchFacetsInput>,
  output: __S(196, __c6, 4) as any as S.Schema<SearchFacetsOutput>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFacets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingFacets",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchFacets",
})) as any;

export type SearchListingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for listings that match your search criteria and filters. You can search by keyword, filter by category, pricing model, fulfillment type, and other attributes, and sort results by relevance or customer rating. The operation returns results in pages. Use `nextToken` to retrieve the next page.
 */
export const searchListings: API.PaginatedOperationMethod<
  SearchListingsInput & RegionInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  ListingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<SearchListingsInput>,
  output: __S(237, __c7, 13) as any as S.Schema<SearchListingsOutput>,
  errors: [],
  serviceErrors: awsServiceErrorsWith(
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ),
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchListings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchListings",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          productId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/listFulfillmentOptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFulfillmentOptionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          operatingSystemFamilyName: S.String,
          operatingSystemName: S.String,
          operatingSystemVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "AmazonMachineImageOperatingSystem" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          protocol: S.String,
          fromPort: S.Number,
          toPort: S.Number,
          cidrIpAddresses: __S(480, __c15, 0),
        }),
      ).annotate({ identifier: "AmazonMachineImageSecurityGroup" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ instanceType: S.String, securityGroups: S.optional(__S(4, __c0, 4)) }),
      ).annotate({ identifier: "AmazonMachineImageRecommendation" });
    case 6:
      return S.suspend(() =>
        S.Struct({ volumeTypes: __S(480, __c15, 0), iops: S.optional(S.Number) }),
      ).annotate({ identifier: "AmazonMachineImageEbsVolume" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          operatingSystems: __S(2, __c0, 2),
          recommendation: S.optional(__S(5, __c0, 5)),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          accessUrlTemplate: S.optional(S.String),
          architecture: S.String,
          amiAlias: S.optional(S.String),
          ebsVolume: S.optional(__S(6, __c0, 6)),
          shortDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "AmazonMachineImageFulfillmentOption" });
    case 8:
      return S.suspend(() =>
        S.Struct({ supportedServiceType: S.String, displayName: S.String, description: S.String }),
      ).annotate({ identifier: "AwsSupportedService" });
    case 9:
      return S.Array(__S(8, __c0, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          usageInstructions: S.optional(S.String),
          awsSupportedServices: __S(9, __c0, 9),
        }),
      ).annotate({ identifier: "ApiFulfillmentOption" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionName: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          architectureDiagramUrl: S.optional(S.String),
          deploymentTemplateUrl: S.optional(S.String),
          shortDescription: S.optional(S.String),
          longDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudFormationFulfillmentOption" });
    case 12:
      return S.suspend(() =>
        S.Struct({ operatingSystemFamilyName: S.String, operatingSystemName: S.String }),
      ).annotate({ identifier: "ContainerOperatingSystem" });
    case 13:
      return S.Array(__S(12, __c0, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionName: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          operatingSystems: S.optional(__S(13, __c0, 13)),
          awsSupportedServices: S.optional(__S(9, __c0, 9)),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerFulfillmentOption" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionName: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          operatingSystems: S.optional(__S(13, __c0, 13)),
          releaseNotes: S.optional(S.String),
          awsSupportedServices: S.optional(__S(9, __c0, 9)),
          usageInstructions: S.optional(S.String),
        }),
      ).annotate({ identifier: "HelmFulfillmentOption" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionName: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          operatingSystems: S.optional(__S(13, __c0, 13)),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          awsSupportedServices: S.optional(__S(9, __c0, 9)),
        }),
      ).annotate({ identifier: "EksAddOnFulfillmentOption" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          resourceArn: S.optional(S.String),
          resourceType: S.String,
          dataClassification: S.String,
        }),
      ).annotate({ identifier: "DataArtifact" });
    case 18:
      return S.Array(__S(17, __c0, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          dataArtifacts: S.optional(__S(18, __c0, 18)),
        }),
      ).annotate({ identifier: "DataExchangeFulfillmentOption" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
        }),
      ).annotate({ identifier: "ProfessionalServicesFulfillmentOption" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          templateName: S.String,
          description: S.optional(S.String),
          defaultStackName: S.String,
          templateUrl: S.String,
          iamPolicy: S.String,
        }),
      ).annotate({ identifier: "SaasCloudFormationDeploymentTemplate" });
    case 22:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cloudFormationDeploymentTemplate: __S(21, __c0, 21) }),
      ]);
    case 23:
      return S.Array(__S(22, __c0, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentUrl: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          launchUrl: S.optional(S.String),
          quickLaunch: S.String,
          deploymentTemplates: __S(23, __c0, 23),
        }),
      ).annotate({ identifier: "SaasFulfillmentOption" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          recommendedBatchTransformInstanceType: S.String,
          recommendedRealtimeInferenceInstanceType: S.optional(S.String),
          recommendedTrainingInstanceType: S.String,
        }),
      ).annotate({ identifier: "SageMakerAlgorithmRecommendation" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          recommendation: S.optional(__S(25, __c0, 25)),
        }),
      ).annotate({ identifier: "SageMakerAlgorithmFulfillmentOption" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          recommendedBatchTransformInstanceType: S.String,
          recommendedRealtimeInferenceInstanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SageMakerModelRecommendation" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          fulfillmentOptionId: S.String,
          fulfillmentOptionType: S.String,
          fulfillmentOptionDisplayName: S.String,
          fulfillmentOptionVersion: S.optional(S.String),
          releaseNotes: S.optional(S.String),
          usageInstructions: S.optional(S.String),
          recommendation: S.optional(__S(27, __c0, 27)),
          supportedContentTypes: S.optional(__S(480, __c15, 0)),
          supportedResponseMimeTypes: S.optional(__S(480, __c15, 0)),
        }),
      ).annotate({ identifier: "SageMakerModelFulfillmentOption" });
    case 29:
      return S.Union([
        /*@__PURE__*/ S.Struct({ amazonMachineImageFulfillmentOption: __S(7, __c0, 7) }),
        /*@__PURE__*/ S.Struct({ apiFulfillmentOption: __S(10, __c0, 10) }),
        /*@__PURE__*/ S.Struct({ cloudFormationFulfillmentOption: __S(11, __c0, 11) }),
        /*@__PURE__*/ S.Struct({ containerFulfillmentOption: __S(14, __c0, 14) }),
        /*@__PURE__*/ S.Struct({ helmFulfillmentOption: __S(15, __c0, 15) }),
        /*@__PURE__*/ S.Struct({ eksAddOnFulfillmentOption: __S(16, __c0, 16) }),
        /*@__PURE__*/ S.Struct({ ec2ImageBuilderComponentFulfillmentOption: __S(14, __c0, 14) }),
        /*@__PURE__*/ S.Struct({ dataExchangeFulfillmentOption: __S(19, __c0, 19) }),
        /*@__PURE__*/ S.Struct({ professionalServicesFulfillmentOption: __S(20, __c0, 20) }),
        /*@__PURE__*/ S.Struct({ saasFulfillmentOption: __S(24, __c0, 24) }),
        /*@__PURE__*/ S.Struct({ sageMakerAlgorithmFulfillmentOption: __S(26, __c0, 26) }),
        /*@__PURE__*/ S.Struct({ sageMakerModelFulfillmentOption: __S(28, __c0, 28) }),
      ]);
    case 30:
      return S.Array(__S(29, __c0, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          fulfillmentOptions: __S(30, __c0, 30),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFulfillmentOptionsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          listingId: S.String,
          attributeTypes: __S(64, __c2, 0),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/listListingAttributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListListingAttributesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          completionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EngagementDates" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          contentType: S.String,
          value: S.String,
          displayName: S.optional(S.String),
          resourceType: S.String,
        }),
      ).annotate({ identifier: "CaseStudyResource" });
    case 3:
      return S.Array(__S(34, __c1, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          caseStudyId: S.String,
          caseStudyName: S.String,
          shortDescription: S.String,
          engagementDates: S.optional(__S(33, __c1, 1)),
          challenge: S.optional(S.String),
          resolution: S.optional(S.String),
          implementationApproach: S.optional(S.String),
          outcome: S.optional(S.String),
          resources: S.optional(__S(35, __c1, 3)),
        }),
      ).annotate({ identifier: "CaseStudy" });
    case 5:
      return S.suspend(() =>
        S.Struct({ specializationType: S.String, displayName: S.String }),
      ).annotate({ identifier: "SpecializationTypeDetail" });
    case 6:
      return S.Array(__S(37, __c1, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          specializationId: S.String,
          specializationName: S.String,
          description: S.optional(S.String),
          specializationTypes: __S(38, __c1, 6),
          caseStudyIds: S.optional(__S(480, __c15, 0)),
        }),
      ).annotate({ identifier: "Specialization" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          specializationCategoryId: S.String,
          specializationCategoryName: S.String,
          parentSpecializationId: S.String,
        }),
      ).annotate({ identifier: "SpecializationCategory" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ specialization: __S(39, __c1, 7) }),
        /*@__PURE__*/ S.Struct({ specializationCategory: __S(40, __c1, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          contentType: S.String,
          value: S.String,
          displayName: S.optional(S.String),
          subjectArea: S.optional(S.String),
          accessType: S.String,
        }),
      ).annotate({ identifier: "TrustCenterDocumentAttribute" });
    case 11:
      return S.suspend(() =>
        S.Struct({ name: S.String, description: S.optional(S.String), domains: __S(64, __c2, 0) }),
      ).annotate({ identifier: "TrustCenterControl" });
    case 12:
      return S.suspend(() =>
        S.Struct({ question: S.String, answer: S.String, subjectArea: S.optional(S.String) }),
      ).annotate({ identifier: "TrustCenterFaqAttribute" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.String,
          publishedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TrustCenterUpdateAttribute" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ caseStudy: __S(36, __c1, 4) }),
        /*@__PURE__*/ S.Struct({ specializationDetail: __S(41, __c1, 9) }),
        /*@__PURE__*/ S.Struct({ trustCenterSource: __S(96, __c3, 0) }),
        /*@__PURE__*/ S.Struct({ trustCenterCertification: __S(97, __c3, 1) }),
        /*@__PURE__*/ S.Struct({ trustCenterDocument: __S(42, __c1, 10) }),
        /*@__PURE__*/ S.Struct({ trustCenterControl: __S(43, __c1, 11) }),
        /*@__PURE__*/ S.Struct({ trustCenterFaq: __S(44, __c1, 12) }),
        /*@__PURE__*/ S.Struct({ trustCenterUpdate: __S(45, __c1, 13) }),
      ]);
    case 15:
      return S.Array(__S(46, __c1, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          listingAttributes: __S(47, __c1, 15),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListListingAttributesOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentType: S.String,
          value: S.String,
          displayName: S.optional(S.String),
          provider: S.String,
        }),
      ).annotate({ identifier: "TrustCenterSource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ certificationType: S.String, displayName: S.String, logoUrl: S.String }),
      ).annotate({ identifier: "TrustCenterCertificationAttribute" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          filters: S.optional(__S(161, __c5, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/listPurchaseOptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPurchaseOptionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          product: __S(352, __c11, 0),
          offer: __S(416, __c13, 0),
          offerSet: S.optional(__S(576, __c18, 0)),
        }),
      ).annotate({ identifier: "PurchaseOptionAssociatedEntity" });
    case 2:
      return S.Array(__S(129, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          purchaseOptionId: S.String,
          catalog: S.String,
          purchaseOptionType: S.String,
          purchaseOptionName: S.optional(S.String),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sellerOfRecord: __S(384, __c12, 0),
          badges: S.optional(__S(354, __c11, 2)),
          associatedEntities: __S(130, __c4, 2),
        }),
      ).annotate({ identifier: "PurchaseOptionSummary" });
    case 4:
      return S.Array(__S(131, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          purchaseOptions: S.optional(__S(132, __c4, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPurchaseOptionsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filterType: S.String, filterValues: __S(480, __c15, 0) }),
      ).annotate({ identifier: "PurchaseOptionFilter" });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          searchText: S.optional(S.String),
          filters: S.optional(__S(161, __c5, 1)),
          facetTypes: S.optional(__S(64, __c2, 0)),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/searchFacets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchFacetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: S.String,
          displayName: S.String,
          parent: S.optional(S.String),
          count: S.Number,
        }),
      ).annotate({ identifier: "ListingFacet" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(194, __c6, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          totalResults: S.Number,
          listingFacets: __S(195, __c6, 3),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchFacetsOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          searchText: S.optional(S.String),
          filters: S.optional(__S(161, __c5, 1)),
          maxResults: S.optional(S.Number),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/searchListings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchListingsInput" });
    case 1:
      return S.suspend(() => S.Struct({ product: S.optional(__S(352, __c11, 0)) })).annotate({
        identifier: "ListingSummaryAssociatedEntity",
      });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.Array(__S(96, __c3, 0));
    case 4:
      return S.Array(__S(97, __c3, 1));
    case 5:
      return S.suspend(() =>
        S.Struct({
          sourceSummaries: __S(227, __c7, 3),
          certificationSummaries: __S(228, __c7, 4),
          totalCertificationCount: S.Number,
        }),
      ).annotate({ identifier: "TrustCenterSummary" });
    case 6:
      return S.suspend(() => S.Struct({ caseStudyCount: S.Number })).annotate({
        identifier: "CaseStudiesSummary",
      });
    case 7:
      return S.suspend(() => S.Struct({ displayName: S.String, value: S.String })).annotate({
        identifier: "UseCaseInformation",
      });
    case 8:
      return S.suspend(() => S.Struct({ useCase: __S(231, __c7, 7) })).annotate({
        identifier: "UseCaseSummaryEntry",
      });
    case 9:
      return S.Array(__S(232, __c7, 8));
    case 10:
      return S.suspend(() => S.Struct({ useCases: __S(233, __c7, 9) })).annotate({
        identifier: "UseCaseSummary",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          listingId: S.String,
          listingName: S.String,
          publisher: __S(384, __c12, 0),
          fulfillmentOptionSummaries: __S(515, __c16, 3),
          catalog: S.String,
          shortDescription: S.String,
          logoThumbnailUrl: S.String,
          categories: __S(513, __c16, 1),
          badges: __S(354, __c11, 2),
          reviewSummary: __S(293, __c9, 5),
          pricingModels: __S(288, __c9, 0),
          pricingUnits: __S(290, __c9, 2),
          associatedEntities: __S(226, __c7, 2),
          trustCenterSummary: S.optional(__S(229, __c7, 5)),
          caseStudiesSummary: S.optional(__S(230, __c7, 6)),
          useCaseSummary: S.optional(__S(234, __c7, 10)),
          sellerEngagements: S.optional(__S(517, __c16, 5)),
        }),
      ).annotate({ identifier: "ListingSummary" });
    case 12:
      return S.Array(__S(235, __c7, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          totalResults: S.Number,
          listingSummaries: __S(236, __c7, 12),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchListingsOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ locale: S.optional(S.String), listingId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/getListing" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetListingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          product: S.optional(__S(352, __c11, 0)),
          offer: S.optional(__S(416, __c13, 0)),
        }),
      ).annotate({ identifier: "ListingAssociatedEntity" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ description: S.String, displayName: S.String, value: S.String }),
      ).annotate({ identifier: "UseCase" });
    case 4:
      return S.suspend(() => S.Struct({ useCase: __S(259, __c8, 3) })).annotate({
        identifier: "UseCaseEntry",
      });
    case 5:
      return S.Array(__S(260, __c8, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          associatedEntities: __S(258, __c8, 2),
          badges: __S(354, __c11, 2),
          catalog: S.String,
          categories: __S(513, __c16, 1),
          fulfillmentOptionSummaries: __S(515, __c16, 3),
          highlights: __S(480, __c15, 0),
          integrationGuide: S.optional(S.String),
          listingId: S.String,
          listingName: S.String,
          logoThumbnailUrl: S.String,
          longDescription: S.String,
          pricingModels: __S(288, __c9, 0),
          pricingUnits: __S(290, __c9, 2),
          promotionalMedia: __S(451, __c14, 3),
          publisher: __S(384, __c12, 0),
          resources: __S(453, __c14, 5),
          reviewSummary: S.optional(__S(293, __c9, 5)),
          sellerEngagements: __S(517, __c16, 5),
          shortDescription: S.String,
          useCases: __S(261, __c8, 5),
          purchaseIndicators: __S(455, __c14, 7),
        }),
      ).annotate({ identifier: "GetListingOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(320, __c10, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ pricingUnitType: S.String, displayName: S.String }),
      ).annotate({ identifier: "PricingUnit" });
    case 2:
      return S.Array(__S(289, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.String,
          sourceId: S.String,
          sourceUrl: S.optional(S.String),
          averageRating: S.String,
          totalReviews: S.Number,
        }),
      ).annotate({ identifier: "ReviewSourceSummary" });
    case 4:
      return S.Array(__S(291, __c9, 3));
    case 5:
      return S.suspend(() => S.Struct({ reviewSourceSummaries: __S(292, __c9, 4) })).annotate({
        identifier: "ReviewSummary",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pricingModelType: S.String, displayName: S.String }),
      ).annotate({ identifier: "PricingModel" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ productId: S.String, productName: S.String, manufacturer: __S(384, __c12, 0) }),
      ).annotate({ identifier: "ProductInformation" });
    case 1:
      return S.suspend(() => S.Struct({ displayName: S.String, badgeType: S.String })).annotate({
        identifier: "ListingBadge",
      });
    case 2:
      return S.Array(__S(353, __c11, 1));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sellerProfileId: S.String, displayName: S.String }),
      ).annotate({ identifier: "SellerInformation" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          offerId: S.String,
          offerName: S.optional(S.String),
          sellerOfRecord: __S(384, __c12, 0),
        }),
      ).annotate({ identifier: "OfferInformation" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ title: S.String, url: S.String, description: S.optional(S.String) }),
      ).annotate({ identifier: "PromotionalEmbeddedImage" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          url: S.String,
          preview: S.String,
          thumbnail: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PromotionalEmbeddedVideo" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ embeddedImage: __S(448, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ embeddedVideo: __S(449, __c14, 1) }),
      ]);
    case 3:
      return S.Array(__S(450, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          contentType: S.String,
          value: S.String,
          displayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Resource" });
    case 5:
      return S.Array(__S(452, __c14, 4));
    case 6:
      return S.suspend(() => S.Struct({ indicatorType: S.String })).annotate({
        identifier: "PurchaseIndicator",
      });
    case 7:
      return S.Array(__S(454, __c14, 6));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ categoryId: S.String, displayName: S.String })).annotate({
        identifier: "Category",
      });
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ fulfillmentOptionType: S.String, displayName: S.String }),
      ).annotate({ identifier: "FulfillmentOptionSummary" });
    case 3:
      return S.Array(__S(514, __c16, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ engagementType: S.String, contentType: S.String, value: S.String }),
      ).annotate({ identifier: "SellerEngagement" });
    case 5:
      return S.Array(__S(516, __c16, 4));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ locale: S.optional(S.String), offerId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/getOffer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOfferInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ product: __S(352, __c11, 0), offerSet: S.optional(__S(576, __c18, 0)) }),
      ).annotate({ identifier: "OfferAssociatedEntity" });
    case 2:
      return S.Array(__S(545, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          offerId: S.String,
          catalog: S.String,
          offerName: S.optional(S.String),
          expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sellerOfRecord: __S(384, __c12, 0),
          associatedEntities: __S(546, __c17, 2),
          agreementProposalId: S.String,
          replacementAgreementId: S.optional(S.String),
          pricingModel: __S(320, __c10, 0),
          badges: __S(354, __c11, 2),
        }),
      ).annotate({ identifier: "GetOfferOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ offerSetId: S.String, sellerOfRecord: __S(384, __c12, 0) }),
      ).annotate({ identifier: "OfferSetInformation" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ locale: S.optional(S.String), offerSetId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/getOfferSet" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOfferSetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ product: __S(352, __c11, 0), offer: __S(416, __c13, 0) }),
      ).annotate({ identifier: "OfferSetAssociatedEntity" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          offerSetId: S.String,
          catalog: S.String,
          offerSetName: S.optional(S.String),
          availableFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          buyerNotes: S.optional(S.String),
          sellerOfRecord: __S(384, __c12, 0),
          badges: __S(354, __c11, 2),
          associatedEntities: __S(610, __c19, 2),
        }),
      ).annotate({ identifier: "GetOfferSetOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          offerId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/getOfferTerms" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOfferTermsInput" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, type: S.String })).annotate({
        identifier: "ByolPricingTerm",
      });
    case 2:
      return S.suspend(() => S.Struct({ type: S.String, value: S.String })).annotate({
        identifier: "Selector",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ multipleDimensionSelection: S.String, quantityConfiguration: S.String }),
      ).annotate({ identifier: "Constraints" });
    case 4:
      return S.suspend(() =>
        S.Struct({ labelType: S.String, labelValue: S.String, displayName: S.optional(S.String) }),
      ).annotate({ identifier: "DimensionLabel" });
    case 5:
      return S.Array(__S(644, __c20, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ region: S.String, displayName: S.String, price: S.String }),
      ).annotate({ identifier: "RegionalPrice" });
    case 7:
      return S.Array(__S(646, __c20, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          dimensionKey: S.String,
          displayName: S.String,
          description: S.optional(S.String),
          dimensionLabels: S.optional(__S(645, __c20, 5)),
          unit: S.String,
          price: S.String,
          regionalPrices: __S(647, __c20, 7),
        }),
      ).annotate({ identifier: "RateCardItem" });
    case 9:
      return S.Array(__S(648, __c20, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          selector: __S(642, __c20, 2),
          constraints: __S(643, __c20, 3),
          rateCard: __S(649, __c20, 9),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontRateCardItem" });
    case 11:
      return S.Array(__S(650, __c20, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          rateCards: S.optional(__S(651, __c20, 11)),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontPricingTerm" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          dimensionKey: S.String,
          displayName: S.String,
          description: S.optional(S.String),
          dimensionLabels: S.optional(__S(645, __c20, 5)),
          unit: S.String,
          maxQuantity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GrantItem" });
    case 14:
      return S.Array(__S(653, __c20, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          duration: S.optional(S.String),
          price: S.String,
          grants: __S(654, __c20, 14),
        }),
      ).annotate({ identifier: "FixedUpfrontPricingTerm" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          duration: S.optional(S.String),
          grants: __S(654, __c20, 14),
        }),
      ).annotate({ identifier: "FreeTrialPricingTerm" });
    case 17:
      return S.suspend(() =>
        S.Struct({ type: S.String, url: S.String, version: S.optional(S.String) }),
      ).annotate({ identifier: "DocumentItem" });
    case 18:
      return S.Array(__S(657, __c20, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ id: S.String, type: S.String, documents: __S(658, __c20, 18) }),
      ).annotate({ identifier: "LegalTerm" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          chargeDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          chargeAmount: S.String,
        }),
      ).annotate({ identifier: "ScheduleItem" });
    case 21:
      return S.Array(__S(660, __c20, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          schedule: __S(661, __c20, 21),
        }),
      ).annotate({ identifier: "PaymentScheduleTerm" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          billingPeriod: S.String,
          price: S.String,
        }),
      ).annotate({ identifier: "RecurringPaymentTerm" });
    case 24:
      return S.suspend(() => S.Struct({ percentageValue: S.String })).annotate({
        identifier: "FixedPercentage",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({ minimumValue: S.String, maximumValue: S.String, defaultValue: S.String }),
      ).annotate({ identifier: "PercentageRange" });
    case 26:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fixedPercentage: __S(664, __c20, 24) }),
        /*@__PURE__*/ S.Struct({ percentageRange: __S(665, __c20, 25) }),
      ]);
    case 27:
      return S.suspend(() =>
        S.Struct({
          chargeDateOffset: S.String,
          chargePercentage: S.String,
          dayOfMonth: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PaymentScheduleEntry" });
    case 28:
      return S.Array(__S(667, __c20, 27));
    case 29:
      return S.suspend(() => S.Struct({ schedule: __S(668, __c20, 28) })).annotate({
        identifier: "PaymentScheduleTermTemplate",
      });
    case 30:
      return S.Union([
        /*@__PURE__*/ S.Struct({ paymentScheduleTermTemplate: __S(669, __c20, 29) }),
      ]);
    case 31:
      return S.Array(__S(670, __c20, 30));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          maxRenewals: S.optional(S.Number),
          lockoutPeriod: S.optional(S.String),
          adjustmentDeadline: S.optional(S.String),
          priceIncrease: S.optional(__S(666, __c20, 26)),
          termTemplates: S.optional(__S(671, __c20, 31)),
        }),
      ).annotate({ identifier: "RenewalTerm" });
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, type: S.String, refundPolicy: S.String }),
      ).annotate({ identifier: "SupportTerm" });
    case 2:
      return S.suspend(() => S.Struct({ rateCard: __S(649, __c20, 9) })).annotate({
        identifier: "UsageBasedRateCardItem",
      });
    case 3:
      return S.Array(__S(674, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          rateCards: __S(675, __c21, 3),
        }),
      ).annotate({ identifier: "UsageBasedPricingTerm" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          agreementDuration: S.optional(S.String),
          agreementEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ValidityTerm" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          currencyCode: S.String,
          maxTotalChargeAmount: S.String,
        }),
      ).annotate({ identifier: "VariablePaymentTerm" });
    case 7:
      return S.suspend(() =>
        S.Struct({ id: S.String, type: S.String, paymentDuePeriod: S.String }),
      ).annotate({ identifier: "NetPaymentTerm" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ byolPricingTerm: __S(641, __c20, 1) }),
        /*@__PURE__*/ S.Struct({ configurableUpfrontPricingTerm: __S(652, __c20, 12) }),
        /*@__PURE__*/ S.Struct({ fixedUpfrontPricingTerm: __S(655, __c20, 15) }),
        /*@__PURE__*/ S.Struct({ freeTrialPricingTerm: __S(656, __c20, 16) }),
        /*@__PURE__*/ S.Struct({ legalTerm: __S(659, __c20, 19) }),
        /*@__PURE__*/ S.Struct({ paymentScheduleTerm: __S(662, __c20, 22) }),
        /*@__PURE__*/ S.Struct({ recurringPaymentTerm: __S(663, __c20, 23) }),
        /*@__PURE__*/ S.Struct({ renewalTerm: __S(672, __c21, 0) }),
        /*@__PURE__*/ S.Struct({ supportTerm: __S(673, __c21, 1) }),
        /*@__PURE__*/ S.Struct({ usageBasedPricingTerm: __S(676, __c21, 4) }),
        /*@__PURE__*/ S.Struct({ validityTerm: __S(677, __c21, 5) }),
        /*@__PURE__*/ S.Struct({ variablePaymentTerm: __S(678, __c21, 6) }),
        /*@__PURE__*/ S.Struct({ netPaymentTerm: __S(679, __c21, 7) }),
      ]);
    case 9:
      return S.Array(__S(680, __c21, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          offerTerms: __S(681, __c21, 9),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetOfferTermsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ locale: S.optional(S.String), productId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/2026-02-05/getProduct" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProductInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String),
          productId: S.String,
          catalog: S.String,
          productName: S.String,
          manufacturer: __S(384, __c12, 0),
          deployedOnAws: S.String,
          shortDescription: S.String,
          longDescription: S.String,
          logoThumbnailUrl: S.String,
          fulfillmentOptionSummaries: __S(515, __c16, 3),
          categories: __S(513, __c16, 1),
          highlights: __S(480, __c15, 0),
          promotionalMedia: __S(451, __c14, 3),
          resources: __S(453, __c14, 5),
          sellerEngagements: __S(517, __c16, 5),
          listingId: S.String,
          purchaseIndicators: __S(455, __c14, 7),
        }),
      ).annotate({ identifier: "GetProductOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
