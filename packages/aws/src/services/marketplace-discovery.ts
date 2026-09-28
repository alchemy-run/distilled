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
  sdkId: "Marketplace Discovery",
  target: "AWSMarketplaceDiscovery",
  version: "2026-02-05",
  sigv4: "aws-marketplace",
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
};

export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type ListingId = string;
export interface GetListingInput {
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
  offerName?: string;
  sellerOfRecord: SellerInformation;
}
export interface ListingAssociatedEntity {
  product?: ProductInformation;
  offer?: OfferInformation;
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
export type PricingModelType =
  | "USAGE"
  | "CONTRACT"
  | "BYOL"
  | "FREE"
  | (string & {});
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
  description?: string;
}
export interface PromotionalEmbeddedVideo {
  title: string;
  url: string;
  preview: string;
  thumbnail: string;
  description?: string;
}
export type PromotionalMedia =
  | { embeddedImage: PromotionalEmbeddedImage; embeddedVideo?: never }
  | { embeddedImage?: never; embeddedVideo: PromotionalEmbeddedVideo };
export type PromotionalMediaList = PromotionalMedia[];
export type ResourceType =
  | "MANUFACTURER_SUPPORT"
  | "MANUFACTURER_INSTRUCTIONS"
  | (string & {});
export type ResourceContentType =
  | "EMAIL"
  | "PHONE_NUMBER"
  | "LINK"
  | "OTHER"
  | (string & {});
export interface Resource {
  resourceType: ResourceType;
  contentType: ResourceContentType;
  value: string;
  displayName?: string;
}
export type ResourceList = Resource[];
export type ReviewSourceId = "AWS_MARKETPLACE" | (string & {});
export type NonNegativeCount = number;
export interface ReviewSourceSummary {
  sourceName: string;
  sourceId: ReviewSourceId;
  sourceUrl?: string;
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
export interface GetListingOutput {
  associatedEntities: ListingAssociatedEntity[];
  badges: ListingBadge[];
  catalog: string;
  categories: Category[];
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  highlights: string[];
  integrationGuide?: string;
  listingId: string;
  listingName: string;
  logoThumbnailUrl: string;
  longDescription: string;
  pricingModels: PricingModel[];
  pricingUnits: PricingUnit[];
  promotionalMedia: PromotionalMedia[];
  publisher: SellerInformation;
  resources: Resource[];
  reviewSummary?: ReviewSummary;
  sellerEngagements: SellerEngagement[];
  shortDescription: string;
  useCases: UseCaseEntry[];
}
export interface GetOfferInput {
  offerId: string;
}
export type OfferSetId = string;
export interface OfferSetInformation {
  offerSetId: string;
  sellerOfRecord: SellerInformation;
}
export interface OfferAssociatedEntity {
  product: ProductInformation;
  offerSet?: OfferSetInformation;
}
export type OfferAssociatedEntityList = OfferAssociatedEntity[];
export type AgreementResourceId = string;
export type PurchaseOptionBadgeType =
  | "PRIVATE_PRICING"
  | "FUTURE_DATED"
  | "REPLACEMENT_OFFER"
  | (string & {});
export interface PurchaseOptionBadge {
  displayName: string;
  badgeType: PurchaseOptionBadgeType;
}
export type PurchaseOptionBadgeList = PurchaseOptionBadge[];
export interface GetOfferOutput {
  offerId: string;
  catalog: string;
  offerName?: string;
  expirationTime?: Date;
  availableFromTime?: Date;
  sellerOfRecord: SellerInformation;
  associatedEntities: OfferAssociatedEntity[];
  agreementProposalId: string;
  replacementAgreementId?: string;
  pricingModel: PricingModel;
  badges: PurchaseOptionBadge[];
}
export interface GetOfferSetInput {
  offerSetId: string;
}
export interface OfferSetAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
}
export type OfferSetAssociatedEntityList = OfferSetAssociatedEntity[];
export interface GetOfferSetOutput {
  offerSetId: string;
  catalog: string;
  offerSetName?: string;
  availableFromTime?: Date;
  expirationTime?: Date;
  buyerNotes?: string;
  sellerOfRecord: SellerInformation;
  badges: PurchaseOptionBadge[];
  associatedEntities: OfferSetAssociatedEntity[];
}
export type NextToken = string;
export interface GetOfferTermsInput {
  offerId: string;
  maxResults?: number;
  nextToken?: string;
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
  displayName?: string;
}
export type DimensionLabelList = DimensionLabel[];
export interface RateCardItem {
  dimensionKey: string;
  displayName: string;
  description?: string;
  dimensionLabels?: DimensionLabel[];
  unit: string;
  price: string;
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
  rateCards?: ConfigurableUpfrontRateCardItem[];
}
export interface GrantItem {
  dimensionKey: string;
  displayName: string;
  description?: string;
  dimensionLabels?: DimensionLabel[];
  unit: string;
  maxQuantity?: number;
}
export type GrantList = GrantItem[];
export interface FixedUpfrontPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  duration?: string;
  price: string;
  grants: GrantItem[];
}
export interface FreeTrialPricingTerm {
  id: string;
  type: TermType;
  duration?: string;
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
  version?: string;
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
export interface RenewalTerm {
  id: string;
  type: TermType;
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
  agreementDuration?: string;
  agreementEndDate?: Date;
  agreementStartDate?: Date;
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
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm: LegalTerm;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm: PaymentScheduleTerm;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm: RecurringPaymentTerm;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm: RenewalTerm;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm: SupportTerm;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm: ValidityTerm;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm: NetPaymentTerm;
    };
export type OfferTermsList = OfferTerm[];
export interface GetOfferTermsOutput {
  offerTerms: OfferTerm[];
  nextToken?: string;
}
export interface GetProductInput {
  productId: string;
}
export type DeployedOnAwsStatus =
  | "DEPLOYED"
  | "NOT_DEPLOYED"
  | "NOT_APPLICABLE"
  | (string & {});
export interface GetProductOutput {
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
}
export interface ListFulfillmentOptionsInput {
  productId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AmazonMachineImageOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
  operatingSystemVersion?: string;
}
export type AmazonMachineImageOperatingSystemList =
  AmazonMachineImageOperatingSystem[];
export interface AmazonMachineImageRecommendation {
  instanceType: string;
}
export interface AmazonMachineImageFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionVersion?: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  operatingSystems: AmazonMachineImageOperatingSystem[];
  recommendation?: AmazonMachineImageRecommendation;
  releaseNotes?: string;
  usageInstructions?: string;
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
  usageInstructions?: string;
  awsSupportedServices: AwsSupportedService[];
}
export interface CloudFormationFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
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
  fulfillmentOptionVersion?: string;
  operatingSystems?: ContainerOperatingSystem[];
  awsSupportedServices?: AwsSupportedService[];
  releaseNotes?: string;
  usageInstructions?: string;
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
  fulfillmentOptionVersion?: string;
  operatingSystems?: HelmOperatingSystem[];
  releaseNotes?: string;
  awsSupportedServices?: AwsSupportedService[];
  usageInstructions?: string;
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
  fulfillmentOptionVersion?: string;
  operatingSystems?: EksAddOnOperatingSystem[];
  releaseNotes?: string;
  usageInstructions?: string;
  awsSupportedServices?: AwsSupportedService[];
}
export interface Ec2ImageBuilderComponentFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  operatingSystems?: ContainerOperatingSystem[];
  awsSupportedServices?: AwsSupportedService[];
  releaseNotes?: string;
  usageInstructions?: string;
}
export interface DataArtifact {
  description?: string;
  resourceArn?: string;
  resourceType: string;
  dataClassification: string;
}
export type DataArtifactList = DataArtifact[];
export interface DataExchangeFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  dataArtifacts?: DataArtifact[];
}
export interface ProfessionalServicesFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
}
export interface SaasFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentUrl?: string;
  usageInstructions?: string;
}
export interface SageMakerAlgorithmRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string;
  recommendedTrainingInstanceType: string;
}
export interface SageMakerAlgorithmFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
  recommendation?: SageMakerAlgorithmRecommendation;
}
export interface SageMakerModelRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string;
}
export interface SageMakerModelFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
  recommendation?: SageMakerModelRecommendation;
}
export type FulfillmentOption =
  | {
      amazonMachineImageFulfillmentOption: AmazonMachineImageFulfillmentOption;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption: ApiFulfillmentOption;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption: CloudFormationFulfillmentOption;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption: ContainerFulfillmentOption;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption: HelmFulfillmentOption;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption: EksAddOnFulfillmentOption;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption: Ec2ImageBuilderComponentFulfillmentOption;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption: DataExchangeFulfillmentOption;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption: ProfessionalServicesFulfillmentOption;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption: SaasFulfillmentOption;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption: SageMakerAlgorithmFulfillmentOption;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption: SageMakerModelFulfillmentOption;
    };
export type FulfillmentOptionsList = FulfillmentOption[];
export interface ListFulfillmentOptionsOutput {
  fulfillmentOptions: FulfillmentOption[];
  nextToken?: string;
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
export type MaxResults = number;
export interface ListPurchaseOptionsInput {
  filters?: PurchaseOptionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type PurchaseOptionType = "OFFER" | "OFFERSET" | (string & {});
export interface PurchaseOptionAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
  offerSet?: OfferSetInformation;
}
export type PurchaseOptionAssociatedEntityList =
  PurchaseOptionAssociatedEntity[];
export interface PurchaseOptionSummary {
  purchaseOptionId: string;
  catalog: string;
  purchaseOptionType: PurchaseOptionType;
  purchaseOptionName?: string;
  availableFromTime?: Date;
  expirationTime?: Date;
  sellerOfRecord: SellerInformation;
  badges?: PurchaseOptionBadge[];
  associatedEntities: PurchaseOptionAssociatedEntity[];
}
export type PurchaseOptionSummaryList = PurchaseOptionSummary[];
export interface ListPurchaseOptionsOutput {
  purchaseOptions?: PurchaseOptionSummary[];
  nextToken?: string;
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
  | (string & {});
export type FacetTypeList = SearchFacetType[];
export interface SearchFacetsInput {
  searchText?: string;
  filters?: SearchFilter[];
  facetTypes?: SearchFacetType[];
  nextToken?: string;
}
export interface ListingFacet {
  value: string;
  displayName: string;
  parent?: string;
  count: number;
}
export type ListingFacetList = ListingFacet[];
export type TypeToFacetMap = { [key in SearchFacetType]?: ListingFacet[] };
export interface SearchFacetsOutput {
  totalResults: number;
  listingFacets: { [key: string]: ListingFacet[] | undefined };
  nextToken?: string;
}
export type SearchListingsSortBy =
  | "RELEVANCE"
  | "AVERAGE_CUSTOMER_RATING"
  | (string & {});
export type SearchListingsSortOrder =
  | "DESCENDING"
  | "ASCENDING"
  | (string & {});
export interface SearchListingsInput {
  searchText?: string;
  filters?: SearchFilter[];
  maxResults?: number;
  sortBy?: SearchListingsSortBy;
  sortOrder?: SearchListingsSortOrder;
  nextToken?: string;
}
export interface ListingSummaryAssociatedEntity {
  product?: ProductInformation;
}
export type ListingSummaryAssociatedEntityList =
  ListingSummaryAssociatedEntity[];
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
}
export type ListingSummaryList = ListingSummary[];
export interface SearchListingsOutput {
  totalResults: number;
  listingSummaries: ListingSummary[];
  nextToken?: string;
}
export type ExceptionMessage = string;
export type GetListingError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about a listing, such as descriptions, badges, categories, pricing model summaries, reviews, and associated products and offers.
 */
export const getListing: API.OperationMethod<
  GetListingInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/getListing",
    input: { listingId: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListing",
})) as any;

export type GetOfferError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about an offer, such as the pricing model, seller of record, availability dates, badges, and associated products.
 */
export const getOffer: API.OperationMethod<
  GetOfferInput,
  GetOfferOutput,
  GetOfferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/getOffer",
    input: { offerId: 0 },
    output: { expirationTime: D.ts, availableFromTime: D.ts },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOffer",
})) as any;

export type GetOfferSetError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about an offer set, which is a bundle of offers across multiple products. Includes the seller, availability dates, buyer notes, and associated product-offer pairs.
 */
export const getOfferSet: API.OperationMethod<
  GetOfferSetInput,
  GetOfferSetOutput,
  GetOfferSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/getOfferSet",
    input: { offerSetId: 0 },
    output: { availableFromTime: D.ts, expirationTime: D.ts },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferSet",
})) as any;

export type GetOfferTermsError = ResourceNotFoundException | CommonErrors;
/**
 * Returns the terms attached to an offer, such as pricing terms (usage-based, contract, BYOL, free trial), legal terms, payment schedules, validity terms, support terms, and renewal terms.
 */
export const getOfferTerms: API.PaginatedOperationMethod<
  GetOfferTermsInput,
  GetOfferTermsOutput,
  GetOfferTermsError,
  Credentials | HttpClient.HttpClient,
  OfferTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/getOfferTerms",
    input: { offerId: 0, maxResults: 0, nextToken: 0 },
    output: {
      offerTerms: D.list({
        paymentScheduleTerm: { schedule: D.list({ chargeDate: D.ts }) },
        validityTerm: { agreementEndDate: D.ts, agreementStartDate: D.ts },
      }),
    },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offerTerms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetProductError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about a product, such as descriptions, highlights, categories, fulfillment option summaries, promotional media, and seller engagement options.
 */
export const getProduct: API.OperationMethod<
  GetProductInput,
  GetProductOutput,
  GetProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/getProduct",
    input: { productId: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProduct",
})) as any;

export type ListFulfillmentOptionsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the fulfillment options available for a product, including deployment details such as version information, operating systems, usage instructions, and release notes.
 */
export const listFulfillmentOptions: API.PaginatedOperationMethod<
  ListFulfillmentOptionsInput,
  ListFulfillmentOptionsOutput,
  ListFulfillmentOptionsError,
  Credentials | HttpClient.HttpClient,
  FulfillmentOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/listFulfillmentOptions",
    input: { productId: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFulfillmentOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fulfillmentOptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPurchaseOptionsError = CommonErrors;
/**
 * Returns the purchase options (offers and offer sets) available to the buyer. You can filter results by product, seller, purchase option type, visibility scope, and availability status.
 *
 * You must include at least one of the following filters in the request: a `PRODUCT_ID` filter to specify the product for which to retrieve purchase options, or a `VISIBILITY_SCOPE` filter to retrieve purchase options by visibility.
 */
export const listPurchaseOptions: API.PaginatedOperationMethod<
  ListPurchaseOptionsInput,
  ListPurchaseOptionsOutput,
  ListPurchaseOptionsError,
  Credentials | HttpClient.HttpClient,
  PurchaseOptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/listPurchaseOptions",
    input: {
      filters: D.list({ filterType: 0, filterValues: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      purchaseOptions: D.list({
        availableFromTime: D.ts,
        expirationTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPurchaseOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "purchaseOptions",
  } as const,
})) as any;

export type SearchFacetsError = CommonErrors;
/**
 * Returns available facet values for filtering listings, such as categories, pricing models, fulfillment option types, publishers, and customer ratings. Each facet value includes a count of matching listings.
 */
export const searchFacets: API.PaginatedOperationMethod<
  SearchFacetsInput,
  SearchFacetsOutput,
  SearchFacetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/searchFacets",
    input: {
      searchText: 0,
      filters: D.list(i_SearchFilter),
      facetTypes: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFacets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingFacets",
  } as const,
})) as any;

export type SearchListingsError = CommonErrors;
/**
 * Returns a list of product listings based on search criteria and filters. You can search by keyword, filter by category, pricing model, fulfillment type, and other attributes, and sort results by relevance or customer rating.
 */
export const searchListings: API.PaginatedOperationMethod<
  SearchListingsInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  ListingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2026-02-05/searchListings",
    input: {
      searchText: 0,
      filters: D.list(i_SearchFilter),
      maxResults: 0,
      sortBy: 0,
      sortOrder: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchListings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

const i_SearchFilter: D.LazyStruct = () => ({ filterType: 0, filterValues: 0 });
