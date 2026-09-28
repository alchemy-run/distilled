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
  sdkId: "Outposts",
  target: "OutpostsOlafService",
  version: "2019-12-03",
  sigv4: "outposts",
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
                `https://outposts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://outposts.${Region}.amazonaws.com`);
              }
              return e(
                `https://outposts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://outposts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://outposts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: ResourceType;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type CapacityTaskId = string;
export type OutpostIdentifier = string;
export interface CancelCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export interface CancelCapacityTaskOutput {}
export type OrderId = string;
export interface CancelOrderInput {
  OrderId: string;
}
export interface CancelOrderOutput {}
export type QuoteIdentifier = string;
export type QuoteOptionIdentifier = string;
export type SkuCode = string;
export type LineItemQuantity = number;
export interface LineItemRequest {
  CatalogItemId?: string;
  Quantity?: number;
}
export type LineItemRequestListDefinition = LineItemRequest[];
export type PaymentOption =
  | "ALL_UPFRONT"
  | "NO_UPFRONT"
  | "PARTIAL_UPFRONT"
  | (string & {});
export type PaymentTerm =
  | "THREE_YEARS"
  | "ONE_YEAR"
  | "FIVE_YEARS"
  | (string & {});
export interface CreateOrderInput {
  OutpostIdentifier: string;
  QuoteIdentifier?: string;
  QuoteOptionIdentifier?: string;
  LineItems?: LineItemRequest[];
  PaymentOption: PaymentOption;
  PaymentTerm?: PaymentTerm;
}
export type OutpostIdOnly = string;
export type OrderStatus =
  | "RECEIVED"
  | "PENDING"
  | "PROCESSING"
  | "INSTALLING"
  | "FULFILLED"
  | "CANCELLED"
  | "PREPARING"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export type LineItemId = string;
export type LineItemStatus =
  | "PREPARING"
  | "BUILDING"
  | "SHIPPED"
  | "DELIVERED"
  | "INSTALLING"
  | "INSTALLED"
  | "ERROR"
  | "CANCELLED"
  | "REPLACED"
  | (string & {});
export type TrackingId = string;
export type ShipmentCarrier =
  | "DHL"
  | "DBS"
  | "FEDEX"
  | "UPS"
  | "EXPEDITORS"
  | (string & {});
export interface ShipmentInformation {
  ShipmentTrackingNumber?: string;
  ShipmentCarrier?: ShipmentCarrier;
}
export type AssetId = string;
export type MacAddress = string;
export type MacAddressList = string[];
export interface LineItemAssetInformation {
  AssetId?: string;
  MacAddressList?: string[];
}
export type LineItemAssetInformationList = LineItemAssetInformation[];
export interface LineItem {
  CatalogItemId?: string;
  LineItemId?: string;
  Quantity?: number;
  Status?: LineItemStatus;
  ShipmentInformation?: ShipmentInformation;
  AssetInformationList?: LineItemAssetInformation[];
  PreviousLineItemId?: string;
  PreviousOrderId?: string;
}
export type LineItemListDefinition = LineItem[];
export type ISO8601Timestamp = Date;
export type OrderType = "OUTPOST" | "REPLACEMENT" | (string & {});
export interface Order {
  OutpostId?: string;
  QuoteIdentifier?: string;
  QuoteOptionIdentifier?: string;
  OrderId?: string;
  Status?: OrderStatus;
  LineItems?: LineItem[];
  PaymentOption?: PaymentOption;
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
  PaymentTerm?: PaymentTerm;
  OrderType?: OrderType;
}
export interface CreateOrderOutput {
  Order?: Order;
}
export type OutpostName = string;
export type OutpostDescription = string;
export type SiteId = string;
export type AvailabilityZone = string;
export type AvailabilityZoneId = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type SupportedHardwareType = "RACK" | "SERVER" | (string & {});
export interface CreateOutpostInput {
  Name: string;
  Description?: string;
  SiteId: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  Tags?: { [key: string]: string | undefined };
  SupportedHardwareType?: SupportedHardwareType;
}
export type OutpostId = string;
export type OwnerId = string;
export type OutpostArn = string;
export type LifeCycleStatus = string;
export type SiteArn = string;
export interface Outpost {
  OutpostId?: string;
  OwnerId?: string;
  OutpostArn?: string;
  SiteId?: string;
  Name?: string;
  Description?: string;
  LifeCycleStatus?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  Tags?: { [key: string]: string | undefined };
  SiteArn?: string;
  SupportedHardwareType?: SupportedHardwareType;
}
export interface CreateOutpostOutput {
  Outpost?: Outpost;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type VpcEndpointId = string;
export interface VpcInformation {
  VpcId?: string;
  SubnetIds?: string[];
  VpcEndpointId?: string;
}
export type VpcInformationList = VpcInformation[];
export interface CreatePrivateConnectivityConfigInput {
  OutpostId: string;
  VpcInformationList: VpcInformation[];
}
export type RoleArn = string;
export type PrivateConnectivityStatus = "ENABLED" | "DISABLED" | (string & {});
export interface PrivateConnectivityConfig {
  RoleArn?: string;
  PrivateConnectivityStatus?: PrivateConnectivityStatus;
  VpcInformationList?: VpcInformation[];
  ProvisioningRoleArn?: string;
}
export interface CreatePrivateConnectivityConfigOutput {
  PrivateConnectivityConfig?: PrivateConnectivityConfig;
  OutpostId?: string;
}
export type CountryCode = string;
export type QuoteCapacityType = "EC2" | "EBS" | "S3" | (string & {});
export interface QuoteCapacity {
  QuoteCapacityType?: QuoteCapacityType;
  Unit?: string;
  Quantity?: number;
}
export type QuoteCapacityList = QuoteCapacity[];
export type QuoteConstraintType =
  | "RACK_MAXIMUM"
  | "RACK_MAX_POWER_KVA"
  | "RACK_MAX_WEIGHT_LBS"
  | (string & {});
export type ConstraintValue = string;
export interface QuoteConstraint {
  QuoteConstraintType?: QuoteConstraintType;
  Value?: string;
}
export type QuoteConstraintList = QuoteConstraint[];
export type PaymentOptionList = PaymentOption[];
export type PaymentTermList = PaymentTerm[];
export type QuoteDescription = string | redacted.Redacted<string>;
export interface CreateQuoteInput {
  OutpostIdentifier?: string;
  CountryCode: string;
  RequestedCapacities: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  Description?: string | redacted.Redacted<string>;
}
export type QuoteId = string;
export type AccountId = string;
export type QuoteStatus =
  | "CREATED"
  | "ORDER_SUBMITTED"
  | "EXPIRED"
  | (string & {});
export type StatusMessage = string;
export interface CapacitySummary {
  ExistingCapacities?: QuoteCapacity[];
  FinalCapacities?: QuoteCapacity[];
  CapacityChange?: QuoteCapacity[];
}
export type QuoteSpecificationType =
  | "UPDATED_RACK"
  | "NEW_RACK"
  | "EXISTING_RACK"
  | "SERVER"
  | (string & {});
export type RackId = string;
export type QuoteRackUseType = "NETWORKING" | "COMPUTE" | (string & {});
export type RackUnitHeight =
  | "HEIGHT_42U"
  | "HEIGHT_2U"
  | "HEIGHT_1U"
  | (string & {});
export type Family = string;
export type MaxSize = string;
export type Quantity = string;
export interface EC2Capacity {
  Family?: string;
  MaxSize?: string;
  Quantity?: string;
}
export type EC2CapacityListDefinition = EC2Capacity[];
export interface RackSpecificationDetails {
  RackId?: string;
  RackUse?: QuoteRackUseType;
  RackPowerDrawKva?: number;
  RackWeightLbs?: number;
  RackHeightInches?: number;
  RackWidthInches?: number;
  RackDepthInches?: number;
  RackUnitHeight?: RackUnitHeight;
  EC2Capacities?: EC2Capacity[];
}
export interface ServerSpecificationDetails {
  ServerPowerDrawKva?: number;
  ServerWeightLbs?: number;
  ServerHeightInches?: number;
  ServerWidthInches?: number;
  ServerDepthInches?: number;
  RackUnitHeight?: RackUnitHeight;
  EC2Capacities?: EC2Capacity[];
}
export interface QuoteSpecification {
  QuoteSpecificationType?: QuoteSpecificationType;
  ExistingRackSpecificationDetails?: RackSpecificationDetails;
  FinalRackSpecificationDetails?: RackSpecificationDetails;
  ServerSpecificationDetails?: ServerSpecificationDetails;
}
export type QuoteSpecificationList = QuoteSpecification[];
export type QuotePricingType = "SUBSCRIPTION" | (string & {});
export type CurrencyCode = "USD" | (string & {});
export interface SubscriptionPricingDetails {
  PaymentOption?: PaymentOption;
  PaymentTerm?: PaymentTerm;
  UpfrontPrice?: number;
  MonthlyRecurringPrice?: number;
  Currency?: CurrencyCode;
}
export interface PricingOption {
  PricingType?: QuotePricingType;
  SubscriptionPricingDetails?: SubscriptionPricingDetails;
}
export type PricingOptionList = PricingOption[];
export interface QuoteOption {
  QuoteOptionIdentifier?: string;
  Capacities?: QuoteCapacity[];
  CapacitySummary?: CapacitySummary;
  Specifications?: QuoteSpecification[];
  PricingOptions?: PricingOption[];
}
export type QuoteOptionList = QuoteOption[];
export type OrderingRequirementType =
  | "OUTPOST_ACTIVE_CHECK_ERROR"
  | "MAXIMUM_ALLOWED_ORDERS_CHECK_ERROR"
  | "VALID_ZIP_CODE_CHECK_ERROR"
  | "RACK_PHYSICAL_PROPERTIES_CHECK_ERROR"
  | "OPERATING_ADDRESS_EXISTENCE_CHECK_ERROR"
  | "SHIPPING_ADDRESS_EXISTENCE_CHECK_ERROR"
  | "COUNTRY_CODE_MISMATCH_CHECK_ERROR"
  | "OUTPOST_GENERATION_MISMATCH_ERROR"
  | "UNSUPPORTED"
  | "OUTPOST_ID_MISSING_ON_QUOTE_ERROR"
  | "ENTERPRISE_SUPPORT_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_NAME_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_NUMBER_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_INFO_ERROR"
  | "OUTPOST_STATE_CHANGED_ERROR"
  | "OUTPOST_NOT_FOUND_ERROR"
  | "OUTPOST_RENEWAL_REQUIRED_ERROR"
  | (string & {});
export type OrderingRequirementStatus =
  | "PASS"
  | "FAIL"
  | "EXEMPT"
  | (string & {});
export interface OrderingRequirement {
  StatusMessage?: string;
  OrderingRequirementType?: OrderingRequirementType;
  Status?: OrderingRequirementStatus;
}
export type OrderingRequirementList = OrderingRequirement[];
export type OrderIdentifier = string;
export interface Quote {
  QuoteId?: string;
  AccountId?: string;
  QuoteStatus?: QuoteStatus;
  StatusMessage?: string;
  OutpostArn?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  QuoteOptions?: QuoteOption[];
  OrderingRequirements?: OrderingRequirement[];
  SubmittedOrderId?: string;
  CreatedDate?: Date;
  ExpirationDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export interface CreateQuoteOutput {
  Quote?: Quote;
}
export type AutoFillIdempotencyToken = string;
export interface CreateRenewalInput {
  PaymentOption: PaymentOption;
  PaymentTerm: PaymentTerm;
  OutpostIdentifier: string;
  ClientToken?: string;
}
export interface CreateRenewalOutput {
  PaymentOption?: PaymentOption;
  PaymentTerm?: PaymentTerm;
  OutpostId?: string;
  UpfrontPrice?: number;
  MonthlyRecurringPrice?: number;
  Currency?: CurrencyCode;
}
export type SiteName = string;
export type SiteDescription = string;
export type SiteNotes = string;
export type ContactName = string;
export type ContactPhoneNumber = string;
export type AddressLine1 = string;
export type AddressLine2 = string;
export type AddressLine3 = string;
export type City = string;
export type StateOrRegion = string;
export type DistrictOrCounty = string;
export type PostalCode = string;
export type Municipality = string;
export interface Address {
  ContactName: string;
  ContactPhoneNumber: string;
  AddressLine1: string;
  AddressLine2?: string;
  AddressLine3?: string;
  City: string;
  StateOrRegion: string;
  DistrictOrCounty?: string;
  PostalCode: string;
  CountryCode: string;
  Municipality?: string;
}
export type PowerDrawKva =
  | "POWER_5_KVA"
  | "POWER_10_KVA"
  | "POWER_15_KVA"
  | "POWER_30_KVA"
  | (string & {});
export type PowerPhase = "SINGLE_PHASE" | "THREE_PHASE" | (string & {});
export type PowerConnector =
  | "L6_30P"
  | "IEC309"
  | "AH530P7W"
  | "AH532P6W"
  | "CS8365C"
  | (string & {});
export type PowerFeedDrop = "ABOVE_RACK" | "BELOW_RACK" | (string & {});
export type UplinkGbps =
  | "UPLINK_1G"
  | "UPLINK_10G"
  | "UPLINK_40G"
  | "UPLINK_100G"
  | (string & {});
export type UplinkCount =
  | "UPLINK_COUNT_1"
  | "UPLINK_COUNT_2"
  | "UPLINK_COUNT_3"
  | "UPLINK_COUNT_4"
  | "UPLINK_COUNT_5"
  | "UPLINK_COUNT_6"
  | "UPLINK_COUNT_7"
  | "UPLINK_COUNT_8"
  | "UPLINK_COUNT_12"
  | "UPLINK_COUNT_16"
  | (string & {});
export type FiberOpticCableType = "SINGLE_MODE" | "MULTI_MODE" | (string & {});
export type OpticalStandard =
  | "OPTIC_10GBASE_SR"
  | "OPTIC_10GBASE_IR"
  | "OPTIC_10GBASE_LR"
  | "OPTIC_40GBASE_SR"
  | "OPTIC_40GBASE_ESR"
  | "OPTIC_40GBASE_IR4_LR4L"
  | "OPTIC_40GBASE_LR4"
  | "OPTIC_100GBASE_SR4"
  | "OPTIC_100GBASE_CWDM4"
  | "OPTIC_100GBASE_LR4"
  | "OPTIC_100G_PSM4_MSA"
  | "OPTIC_1000BASE_LX"
  | "OPTIC_1000BASE_SX"
  | (string & {});
export type MaximumSupportedWeightLbs =
  | "NO_LIMIT"
  | "MAX_1400_LBS"
  | "MAX_1600_LBS"
  | "MAX_1800_LBS"
  | "MAX_2000_LBS"
  | (string & {});
export interface RackPhysicalProperties {
  PowerDrawKva?: PowerDrawKva;
  PowerPhase?: PowerPhase;
  PowerConnector?: PowerConnector;
  PowerFeedDrop?: PowerFeedDrop;
  UplinkGbps?: UplinkGbps;
  UplinkCount?: UplinkCount;
  FiberOpticCableType?: FiberOpticCableType;
  OpticalStandard?: OpticalStandard;
  MaximumSupportedWeightLbs?: MaximumSupportedWeightLbs;
}
export interface CreateSiteInput {
  Name: string;
  Description?: string;
  Notes?: string;
  Tags?: { [key: string]: string | undefined };
  OperatingAddress?: Address;
  ShippingAddress?: Address;
  RackPhysicalProperties?: RackPhysicalProperties;
}
export interface Site {
  SiteId?: string;
  AccountId?: string;
  Name?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  SiteArn?: string;
  Notes?: string;
  OperatingAddressCountryCode?: string;
  OperatingAddressStateOrRegion?: string;
  OperatingAddressCity?: string;
  RackPhysicalProperties?: RackPhysicalProperties;
}
export interface CreateSiteOutput {
  Site?: Site;
}
export interface DeleteOutpostInput {
  OutpostId: string;
}
export interface DeleteOutpostOutput {}
export interface DeleteQuoteInput {
  QuoteIdentifier: string;
}
export interface DeleteQuoteOutput {}
export interface DeleteSiteInput {
  SiteId: string;
}
export interface DeleteSiteOutput {}
export interface GetCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export type InstanceTypeName = string;
export type InstanceTypeCount = number;
export interface InstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export type RequestedInstancePools = InstanceTypeCapacity[];
export type InstanceId = string;
export type InstanceIdList = string[];
export type AccountIdList = string[];
export type AWSServiceName =
  | "AWS"
  | "EC2"
  | "EKS"
  | "ELASTICACHE"
  | "ELB"
  | "RDS"
  | "ROUTE53"
  | (string & {});
export type AWSServiceNameList = AWSServiceName[];
export interface InstancesToExclude {
  Instances?: string[];
  AccountIds?: string[];
  Services?: AWSServiceName[];
}
export type DryRun = boolean;
export type CapacityTaskStatus =
  | "REQUESTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "WAITING_FOR_EVACUATION"
  | "CANCELLATION_IN_PROGRESS"
  | "CANCELLED"
  | (string & {});
export type CapacityTaskStatusReason = string;
export type CapacityTaskFailureType =
  | "UNSUPPORTED_CAPACITY_CONFIGURATION"
  | "UNEXPECTED_ASSET_STATE"
  | "BLOCKING_INSTANCES_NOT_EVACUATED"
  | "INTERNAL_SERVER_ERROR"
  | "RESOURCE_NOT_FOUND"
  | (string & {});
export interface CapacityTaskFailure {
  Reason: string;
  Type?: CapacityTaskFailureType;
}
export type TaskActionOnBlockingInstances =
  | "WAIT_FOR_EVACUATION"
  | "FAIL_TASK"
  | (string & {});
export interface GetCapacityTaskOutput {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  RequestedInstancePools?: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  CapacityTaskStatus?: CapacityTaskStatus;
  Failed?: CapacityTaskFailure;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export interface GetCatalogItemInput {
  CatalogItemId: string;
}
export type CatalogItemStatus = "AVAILABLE" | "DISCONTINUED" | (string & {});
export type CatalogItemPowerKva = number;
export type CatalogItemWeightLbs = number;
export type SupportedUplinkGbps = number;
export type SupportedUplinkGbpsListDefinition = number[];
export type SupportedStorageEnum = "EBS" | "S3" | (string & {});
export type SupportedStorageList = SupportedStorageEnum[];
export interface CatalogItem {
  CatalogItemId?: string;
  ItemStatus?: CatalogItemStatus;
  EC2Capacities?: EC2Capacity[];
  PowerKva?: number;
  WeightLbs?: number;
  SupportedUplinkGbps?: number[];
  SupportedStorage?: SupportedStorageEnum[];
}
export interface GetCatalogItemOutput {
  CatalogItem?: CatalogItem;
}
export type ConnectionId = string;
export interface GetConnectionRequest {
  ConnectionId: string;
}
export type WireGuardPublicKey = string;
export type ServerEndpoint = string;
export type CIDR = string;
export type CIDRList = string[];
export interface ConnectionDetails {
  ClientPublicKey?: string;
  ServerPublicKey?: string;
  ServerEndpoint?: string;
  ClientTunnelAddress?: string;
  ServerTunnelAddress?: string;
  AllowedIps?: string[];
}
export interface GetConnectionResponse {
  ConnectionId?: string;
  ConnectionDetails?: ConnectionDetails;
}
export interface GetOrderInput {
  OrderId: string;
}
export interface GetOrderOutput {
  Order?: Order;
}
export interface GetOutpostInput {
  OutpostId: string;
}
export interface GetOutpostOutput {
  Outpost?: Outpost;
}
export type Token = string;
export type MaxResults1000 = number;
export interface GetOutpostBillingInformationInput {
  NextToken?: string;
  MaxResults?: number;
  OutpostIdentifier: string;
}
export type SubscriptionType =
  | "ORIGINAL"
  | "RENEWAL"
  | "CAPACITY_INCREASE"
  | (string & {});
export type SubscriptionStatus =
  | "ACTIVE"
  | "PENDING"
  | "INACTIVE"
  | "CANCELLED"
  | (string & {});
export type OrderIdList = string[];
export interface Subscription {
  SubscriptionId?: string;
  SubscriptionType?: SubscriptionType;
  SubscriptionStatus?: SubscriptionStatus;
  OrderIds?: string[];
  BeginDate?: Date;
  EndDate?: Date;
  Currency?: CurrencyCode;
  MonthlyRecurringPrice?: number;
  UpfrontPrice?: number;
}
export type SubscriptionList = Subscription[];
export interface GetOutpostBillingInformationOutput {
  NextToken?: string;
  Subscriptions?: Subscription[];
  ContractEndDate?: string;
  PaymentTerm?: PaymentTerm;
  PaymentOption?: PaymentOption;
}
export interface GetOutpostInstanceTypesInput {
  OutpostId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type InstanceType = string;
export type VCPUCount = number;
export interface InstanceTypeItem {
  InstanceType?: string;
  VCPUs?: number;
}
export type InstanceTypeListDefinition = InstanceTypeItem[];
export interface GetOutpostInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
  OutpostId?: string;
  OutpostArn?: string;
}
export type AssetIdInput = string;
export interface GetOutpostSupportedInstanceTypesInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface GetOutpostSupportedInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
}
export interface GetPrivateConnectivityConfigInput {
  OutpostId: string;
}
export interface GetPrivateConnectivityConfigOutput {
  PrivateConnectivityConfig?: PrivateConnectivityConfig;
}
export interface GetQuoteInput {
  QuoteIdentifier: string;
}
export interface GetQuoteOutput {
  Quote?: Quote;
}
export interface GetRenewalPricingInput {
  OutpostIdentifier: string;
}
export type PricingResult = "PRICED" | "UNABLE_TO_PRICE" | (string & {});
export interface GetRenewalPricingOutput {
  PricingResult?: PricingResult;
  PricingOptions?: PricingOption[];
}
export interface GetSiteInput {
  SiteId: string;
}
export interface GetSiteOutput {
  Site?: Site;
}
export type AddressType =
  | "SHIPPING_ADDRESS"
  | "OPERATING_ADDRESS"
  | (string & {});
export interface GetSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
}
export interface GetSiteAddressOutput {
  SiteId?: string;
  AddressType?: AddressType;
  Address?: Address;
}
export type AssetIdList = string[];
export type OutpostInstanceType = string;
export type OutpostInstanceTypeList = string[];
export interface ListAssetInstancesInput {
  OutpostIdentifier: string;
  AssetIdFilter?: string[];
  InstanceTypeFilter?: string[];
  AccountIdFilter?: string[];
  AwsServiceFilter?: AWSServiceName[];
  MaxResults?: number;
  NextToken?: string;
}
export interface AssetInstance {
  InstanceId?: string;
  InstanceType?: string;
  AssetId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export type AssetInstanceList = AssetInstance[];
export interface ListAssetInstancesOutput {
  AssetInstances?: AssetInstance[];
  NextToken?: string;
}
export type HostId = string;
export type HostIdList = string[];
export type AssetState =
  | "ACTIVE"
  | "RETIRING"
  | "ISOLATED"
  | "INSTALLING"
  | (string & {});
export type StatusList = AssetState[];
export type AssetType =
  | "COMPUTE"
  | "STORAGE"
  | "POWERSHELF"
  | "SWITCH"
  | "NETWORKING"
  | (string & {});
export type AssetTypeList = AssetType[];
export interface ListAssetsInput {
  OutpostIdentifier: string;
  HostIdFilter?: string[];
  MaxResults?: number;
  NextToken?: string;
  StatusFilter?: AssetState[];
  AssetTypeFilter?: AssetType[];
}
export type ComputeAssetState =
  | "ACTIVE"
  | "ISOLATED"
  | "RETIRING"
  | "INSTALLING"
  | (string & {});
export type InstanceFamilyName = string;
export type InstanceFamilies = string[];
export interface AssetInstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export type AssetInstanceCapacityList = AssetInstanceTypeCapacity[];
export interface ComputeAttributes {
  HostId?: string;
  State?: ComputeAssetState;
  InstanceFamilies?: string[];
  InstanceTypeCapacities?: AssetInstanceTypeCapacity[];
  MaxVcpus?: number;
}
export type RackElevation = number;
export interface AssetLocation {
  RackElevation?: number;
}
export interface AssetInfo {
  AssetId?: string;
  RackId?: string;
  AssetType?: AssetType;
  ComputeAttributes?: ComputeAttributes;
  AssetLocation?: AssetLocation;
}
export type AssetListDefinition = AssetInfo[];
export interface ListAssetsOutput {
  Assets?: AssetInfo[];
  NextToken?: string;
}
export interface ListBlockingInstancesForCapacityTaskInput {
  OutpostIdentifier: string;
  CapacityTaskId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface BlockingInstance {
  InstanceId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export type BlockingInstancesList = BlockingInstance[];
export interface ListBlockingInstancesForCapacityTaskOutput {
  BlockingInstances?: BlockingInstance[];
  NextToken?: string;
}
export type CapacityTaskStatusList = CapacityTaskStatus[];
export interface ListCapacityTasksInput {
  OutpostIdentifierFilter?: string;
  MaxResults?: number;
  NextToken?: string;
  CapacityTaskStatusFilter?: CapacityTaskStatus[];
}
export interface CapacityTaskSummary {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  CapacityTaskStatus?: CapacityTaskStatus;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
}
export type CapacityTaskList = CapacityTaskSummary[];
export interface ListCapacityTasksOutput {
  CapacityTasks?: CapacityTaskSummary[];
  NextToken?: string;
}
export type CatalogItemClass = "RACK" | "SERVER" | (string & {});
export type CatalogItemClassList = CatalogItemClass[];
export type EC2FamilyList = string[];
export interface ListCatalogItemsInput {
  NextToken?: string;
  MaxResults?: number;
  ItemClassFilter?: CatalogItemClass[];
  SupportedStorageFilter?: SupportedStorageEnum[];
  EC2FamilyFilter?: string[];
}
export type CatalogItemListDefinition = CatalogItem[];
export interface ListCatalogItemsOutput {
  CatalogItems?: CatalogItem[];
  NextToken?: string;
}
export type OutpostGeneration = "GENERATION_2" | "GENERATION_1" | (string & {});
export interface ListOrderableInstanceTypesInput {
  OutpostGenerationFilter?: OutpostGeneration;
  MaxResults?: number;
  NextToken?: string;
}
export type MemoryInMib = number;
export type NetworkPerformance = string;
export type FormFactor = "RACK" | "SERVER" | (string & {});
export interface FormFactorConfig {
  FormFactor?: FormFactor;
  OutpostGeneration?: OutpostGeneration;
}
export type FormFactorConfigList = FormFactorConfig[];
export interface DetailedInstanceTypeItem {
  InstanceType?: string;
  VCPUs?: number;
  MemoryInMib?: number;
  NetworkPerformance?: string;
  FormFactorConfigs?: FormFactorConfig[];
}
export type DetailedInstanceTypeListDefinition = DetailedInstanceTypeItem[];
export interface ListOrderableInstanceTypesOutput {
  InstanceTypes?: DetailedInstanceTypeItem[];
  NextToken?: string;
}
export interface ListOrdersInput {
  OutpostIdentifierFilter?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type LineItemStatusCounts = { [key in LineItemStatus]?: number };
export interface OrderSummary {
  OutpostId?: string;
  OrderId?: string;
  OrderType?: OrderType;
  Status?: OrderStatus;
  LineItemCountsByStatus?: { [key: string]: number | undefined };
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
}
export type OrderSummaryListDefinition = OrderSummary[];
export interface ListOrdersOutput {
  Orders?: OrderSummary[];
  NextToken?: string;
}
export type LifeCycleStatusList = string[];
export type AvailabilityZoneList = string[];
export type AvailabilityZoneIdList = string[];
export interface ListOutpostsInput {
  NextToken?: string;
  MaxResults?: number;
  LifeCycleStatusFilter?: string[];
  AvailabilityZoneFilter?: string[];
  AvailabilityZoneIdFilter?: string[];
}
export type OutpostListDefinition = Outpost[];
export interface ListOutpostsOutput {
  Outposts?: Outpost[];
  NextToken?: string;
}
export interface ListQuotesInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface QuoteSummary {
  QuoteId?: string;
  AccountId?: string;
  QuoteStatus?: QuoteStatus;
  StatusMessage?: string;
  OutpostArn?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  QuoteOptions?: QuoteOption[];
  SubmittedOrderId?: string;
  CreatedDate?: Date;
  ExpirationDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export type QuoteSummaryListDefinition = QuoteSummary[];
export interface ListQuotesOutput {
  Quotes?: QuoteSummary[];
  NextToken?: string;
}
export type CountryCodeList = string[];
export type StateOrRegionList = string[];
export type CityList = string[];
export interface ListSitesInput {
  NextToken?: string;
  MaxResults?: number;
  OperatingAddressCountryCodeFilter?: string[];
  OperatingAddressStateOrRegionFilter?: string[];
  OperatingAddressCityFilter?: string[];
}
export type SiteListDefinition = Site[];
export interface ListSitesOutput {
  Sites?: Site[];
  NextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface StartCapacityTaskInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  InstancePools: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export interface StartCapacityTaskOutput {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  RequestedInstancePools?: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  CapacityTaskStatus?: CapacityTaskStatus;
  Failed?: CapacityTaskFailure;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export type DeviceSerialNumber = string;
export type NetworkInterfaceDeviceIndex = number;
export interface StartConnectionRequest {
  DeviceSerialNumber?: string;
  AssetId: string;
  ClientPublicKey: string;
  NetworkInterfaceDeviceIndex: number;
}
export type UnderlayIpAddress = string;
export interface StartConnectionResponse {
  ConnectionId?: string;
  UnderlayIpAddress?: string;
}
export type ValidateOnly = boolean;
export interface StartOutpostDecommissionInput {
  OutpostIdentifier: string;
  ValidateOnly?: boolean;
}
export type DecommissionRequestStatus =
  | "SKIPPED"
  | "BLOCKED"
  | "REQUESTED"
  | (string & {});
export type BlockingResourceType =
  | "EC2_INSTANCE"
  | "OUTPOST_RAM_SHARE"
  | "LGW_ROUTING_DOMAIN"
  | "LGW_ROUTE_TABLE"
  | "LGW_VIRTUAL_INTERFACE_GROUP"
  | "OUTPOST_ORDER_CANCELLABLE"
  | "OUTPOST_ORDER_INTERVENTION_REQUIRED"
  | (string & {});
export type BlockingResourceTypeList = BlockingResourceType[];
export interface StartOutpostDecommissionOutput {
  Status?: DecommissionRequestStatus;
  BlockingResourceTypes?: BlockingResourceType[];
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
export interface UpdateOutpostInput {
  OutpostId: string;
  Name?: string;
  Description?: string;
  SupportedHardwareType?: SupportedHardwareType;
}
export interface UpdateOutpostOutput {
  Outpost?: Outpost;
}
export type OutpostIdentifierOrEmpty = string;
export interface UpdateQuoteInput {
  QuoteIdentifier: string;
  OutpostIdentifier?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  Description?: string | redacted.Redacted<string>;
}
export interface UpdateQuoteOutput {
  Quote?: Quote;
}
export interface UpdateSiteInput {
  SiteId: string;
  Name?: string;
  Description?: string;
  Notes?: string;
}
export interface UpdateSiteOutput {
  Site?: Site;
}
export interface UpdateSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
  Address: Address;
}
export interface UpdateSiteAddressOutput {
  AddressType?: AddressType;
  Address?: Address;
}
export interface UpdateSiteRackPhysicalPropertiesInput {
  SiteId: string;
  PowerDrawKva?: PowerDrawKva;
  PowerPhase?: PowerPhase;
  PowerConnector?: PowerConnector;
  PowerFeedDrop?: PowerFeedDrop;
  UplinkGbps?: UplinkGbps;
  UplinkCount?: UplinkCount;
  FiberOpticCableType?: FiberOpticCableType;
  OpticalStandard?: OpticalStandard;
  MaximumSupportedWeightLbs?: MaximumSupportedWeightLbs;
}
export interface UpdateSiteRackPhysicalPropertiesOutput {
  Site?: Site;
}
export type ErrorMessage = string;
export type ResourceType = "OUTPOST" | "ORDER" | (string & {});
export type CancelCapacityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the capacity task.
 */
export const cancelCapacityTask: API.OperationMethod<
  CancelCapacityTaskInput,
  CancelCapacityTaskOutput,
  CancelCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
    input: { CapacityTaskId: 0, OutpostIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCapacityTask",
})) as any;

export type CancelOrderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified order for an Outpost.
 */
export const cancelOrder: API.OperationMethod<
  CancelOrderInput,
  CancelOrderOutput,
  CancelOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /orders/{OrderId}/cancel",
    input: { OrderId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelOrder",
})) as any;

export type CreateOrderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an order for an Outpost.
 */
export const createOrder: API.OperationMethod<
  CreateOrderInput,
  CreateOrderOutput,
  CreateOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /orders",
    input: {
      OutpostIdentifier: 0,
      QuoteIdentifier: 0,
      QuoteOptionIdentifier: 0,
      LineItems: D.list({ CatalogItemId: 0, Quantity: 0 }),
      PaymentOption: 0,
      PaymentTerm: 0,
    },
    output: { Order: o_Order },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrder",
})) as any;

export type CreateOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Outpost.
 *
 * You can specify either an Availability one or an AZ ID.
 */
export const createOutpost: API.OperationMethod<
  CreateOutpostInput,
  CreateOutpostOutput,
  CreateOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /outposts",
    input: {
      Name: 0,
      Description: 0,
      SiteId: 0,
      AvailabilityZone: 0,
      AvailabilityZoneId: 0,
      Tags: 0,
      SupportedHardwareType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutpost",
})) as any;

export type CreatePrivateConnectivityConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates the private connectivity configuration for the specified Outpost. Private
 * connectivity establishes a service link VPN connection between the Outpost and its home
 * Amazon Web Services Region using a VPC and subnet that you specify, which allows the service link traffic
 * to flow through your VPC and minimizes public internet exposure.
 */
export const createPrivateConnectivityConfig: API.OperationMethod<
  CreatePrivateConnectivityConfigInput,
  CreatePrivateConnectivityConfigOutput,
  CreatePrivateConnectivityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /outposts/{OutpostId}/privateConnectivity",
    input: {
      OutpostId: 0,
      VpcInformationList: D.list({ VpcId: 0, SubnetIds: 0, VpcEndpointId: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrivateConnectivityConfig",
})) as any;

export type CreateQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a quote for an Outpost. A quote provides pricing and configuration options based
 * on the requested capacity. You can optionally associate the quote with an existing Outpost or
 * create a standalone quote by specifying only the country code and requested capacities.
 */
export const createQuote: API.OperationMethod<
  CreateQuoteInput,
  CreateQuoteOutput,
  CreateQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /quotes",
    input: {
      OutpostIdentifier: 0,
      CountryCode: 0,
      RequestedCapacities: D.list(i_QuoteCapacity),
      RequestedConstraints: D.list(i_QuoteConstraint),
      RequestedPaymentOptions: 0,
      RequestedPaymentTerms: 0,
      Description: 0,
    },
    output: { Quote: o_Quote },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuote",
})) as any;

export type CreateRenewalError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a renewal contract for the specified Outpost.
 */
export const createRenewal: API.OperationMethod<
  CreateRenewalInput,
  CreateRenewalOutput,
  CreateRenewalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /renewals",
    input: {
      PaymentOption: 0,
      PaymentTerm: 0,
      OutpostIdentifier: 0,
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRenewal",
})) as any;

export type CreateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a site for an Outpost.
 */
export const createSite: API.OperationMethod<
  CreateSiteInput,
  CreateSiteOutput,
  CreateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sites",
    input: {
      Name: 0,
      Description: 0,
      Notes: 0,
      Tags: 0,
      OperatingAddress: i_Address,
      ShippingAddress: i_Address,
      RackPhysicalProperties: {
        PowerDrawKva: 0,
        PowerPhase: 0,
        PowerConnector: 0,
        PowerFeedDrop: 0,
        UplinkGbps: 0,
        UplinkCount: 0,
        FiberOpticCableType: 0,
        OpticalStandard: 0,
        MaximumSupportedWeightLbs: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSite",
})) as any;

export type DeleteOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Outpost.
 */
export const deleteOutpost: API.OperationMethod<
  DeleteOutpostInput,
  DeleteOutpostOutput,
  DeleteOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /outposts/{OutpostId}",
    input: { OutpostId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutpost",
})) as any;

export type DeleteQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified quote.
 */
export const deleteQuote: API.OperationMethod<
  DeleteQuoteInput,
  DeleteQuoteOutput,
  DeleteQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /quotes/{QuoteIdentifier}",
    input: { QuoteIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuote",
})) as any;

export type DeleteSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified site.
 */
export const deleteSite: API.OperationMethod<
  DeleteSiteInput,
  DeleteSiteOutput,
  DeleteSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sites/{SiteId}",
    input: { SiteId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSite",
})) as any;

export type GetCapacityTaskError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of the specified capacity task.
 */
export const getCapacityTask: API.OperationMethod<
  GetCapacityTaskInput,
  GetCapacityTaskOutput,
  GetCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
    input: { CapacityTaskId: 0, OutpostIdentifier: 0 },
    output: {
      CreationDate: D.ts,
      CompletionDate: D.ts,
      LastModifiedDate: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityTask",
})) as any;

export type GetCatalogItemError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified catalog item.
 */
export const getCatalogItem: API.OperationMethod<
  GetCatalogItemInput,
  GetCatalogItemOutput,
  GetCatalogItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /catalog/item/{CatalogItemId}",
    input: { CatalogItemId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogItem",
})) as any;

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services uses this action to install Outpost servers.
 *
 * Gets information about the specified connection.
 *
 * Use CloudTrail to monitor this action or Amazon Web Services managed policy for Amazon Web Services Outposts to secure it. For
 * more information, see
 * Amazon Web Services managed policies for Amazon Web Services Outposts and
 * Logging Amazon Web Services Outposts API calls with Amazon Web Services CloudTrail in the *Amazon Web Services Outposts User Guide*.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /connections/{ConnectionId}",
    input: { ConnectionId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
})) as any;

export type GetOrderError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified order.
 */
export const getOrder: API.OperationMethod<
  GetOrderInput,
  GetOrderOutput,
  GetOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /orders/{OrderId}",
    input: { OrderId: 0 },
    output: { Order: o_Order },
  },
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrder",
})) as any;

export type GetOutpostError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified Outpost.
 */
export const getOutpost: API.OperationMethod<
  GetOutpostInput,
  GetOutpostOutput,
  GetOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostId}",
    input: { OutpostId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpost",
})) as any;

export type GetOutpostBillingInformationError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | CommonErrors;
/**
 * Gets current and historical billing information about the specified Outpost.
 */
export const getOutpostBillingInformation: API.PaginatedOperationMethod<
  GetOutpostBillingInformationInput,
  GetOutpostBillingInformationOutput,
  GetOutpostBillingInformationError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outpost/{OutpostIdentifier}/billing-information",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      OutpostIdentifier: 0,
    },
    output: { Subscriptions: D.list({ BeginDate: D.ts, EndDate: D.ts }) },
  },
  errors: [AccessDeniedException, InternalServerException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostBillingInformation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetOutpostInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the instance types for the specified Outpost.
 */
export const getOutpostInstanceTypes: API.PaginatedOperationMethod<
  GetOutpostInstanceTypesInput,
  GetOutpostInstanceTypesOutput,
  GetOutpostInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostId}/instanceTypes",
    input: {
      OutpostId: 0,
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetOutpostSupportedInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the instance types that an Outpost can support in `InstanceTypeCapacity`.
 * This will generally include instance types that are not currently configured and therefore
 * cannot be launched with the current Outpost capacity configuration.
 */
export const getOutpostSupportedInstanceTypes: API.PaginatedOperationMethod<
  GetOutpostSupportedInstanceTypesInput,
  GetOutpostSupportedInstanceTypesOutput,
  GetOutpostSupportedInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostIdentifier}/supportedInstanceTypes",
    input: {
      OutpostIdentifier: 0,
      OrderId: D.m({ query: "OrderId" }),
      AssetId: D.m({ query: "AssetId" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostSupportedInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPrivateConnectivityConfigError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the private connectivity configuration for the specified Outpost.
 */
export const getPrivateConnectivityConfig: API.OperationMethod<
  GetPrivateConnectivityConfigInput,
  GetPrivateConnectivityConfigOutput,
  GetPrivateConnectivityConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostId}/privateConnectivity",
    input: { OutpostId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrivateConnectivityConfig",
})) as any;

export type GetQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified quote.
 */
export const getQuote: API.OperationMethod<
  GetQuoteInput,
  GetQuoteOutput,
  GetQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /quotes/{QuoteIdentifier}",
    input: { QuoteIdentifier: 0 },
    output: { Quote: o_Quote },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuote",
})) as any;

export type GetRenewalPricingError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets all available renewal pricing options for the specified Outpost.
 */
export const getRenewalPricing: API.OperationMethod<
  GetRenewalPricingInput,
  GetRenewalPricingOutput,
  GetRenewalPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /outpost/{OutpostIdentifier}/renewal-pricing",
    input: { OutpostIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRenewalPricing",
})) as any;

export type GetSiteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified Outpost site.
 */
export const getSite: API.OperationMethod<
  GetSiteInput,
  GetSiteOutput,
  GetSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sites/{SiteId}",
    input: { SiteId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSite",
})) as any;

export type GetSiteAddressError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the site address of the specified site.
 */
export const getSiteAddress: API.OperationMethod<
  GetSiteAddressInput,
  GetSiteAddressOutput,
  GetSiteAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sites/{SiteId}/address",
    input: { SiteId: 0, AddressType: D.m({ query: "AddressType" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSiteAddress",
})) as any;

export type ListAssetInstancesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of Amazon EC2 instances, belonging to all accounts, running on the specified Outpost.
 * Does not include Amazon EBS or Amazon S3 instances.
 */
export const listAssetInstances: API.PaginatedOperationMethod<
  ListAssetInstancesInput,
  ListAssetInstancesOutput,
  ListAssetInstancesError,
  Credentials | HttpClient.HttpClient,
  AssetInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostIdentifier}/assetInstances",
    input: {
      OutpostIdentifier: 0,
      AssetIdFilter: D.m({ query: "AssetIdFilter" }),
      InstanceTypeFilter: D.m({ query: "InstanceTypeFilter" }),
      AccountIdFilter: D.m({ query: "AccountIdFilter" }),
      AwsServiceFilter: D.m({ query: "AwsServiceFilter" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssetInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssetsError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the hardware assets for the specified Outpost.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsInput,
  ListAssetsOutput,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostIdentifier}/assets",
    input: {
      OutpostIdentifier: 0,
      HostIdFilter: D.m({ query: "HostIdFilter" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      StatusFilter: D.m({ query: "StatusFilter" }),
      AssetTypeFilter: D.m({ query: "AssetTypeFilter" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBlockingInstancesForCapacityTaskError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of Amazon EC2 instances running on the Outpost and belonging to the account that
 * initiated the capacity task. Use this list to specify the instances you cannot stop to free up
 * capacity to run the capacity task.
 */
export const listBlockingInstancesForCapacityTask: API.PaginatedOperationMethod<
  ListBlockingInstancesForCapacityTaskInput,
  ListBlockingInstancesForCapacityTaskOutput,
  ListBlockingInstancesForCapacityTaskError,
  Credentials | HttpClient.HttpClient,
  BlockingInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}/blockingInstances",
    input: {
      OutpostIdentifier: 0,
      CapacityTaskId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlockingInstancesForCapacityTask",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BlockingInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCapacityTasksError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the capacity tasks for your Amazon Web Services account.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listCapacityTasks: API.PaginatedOperationMethod<
  ListCapacityTasksInput,
  ListCapacityTasksOutput,
  ListCapacityTasksError,
  Credentials | HttpClient.HttpClient,
  CapacityTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /capacity/tasks",
    input: {
      OutpostIdentifierFilter: D.m({ query: "OutpostIdentifierFilter" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      CapacityTaskStatusFilter: D.m({ query: "CapacityTaskStatusFilter" }),
    },
    output: {
      CapacityTasks: D.list({
        CreationDate: D.ts,
        CompletionDate: D.ts,
        LastModifiedDate: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CapacityTasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCatalogItemsError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the items in the catalog.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listCatalogItems: API.PaginatedOperationMethod<
  ListCatalogItemsInput,
  ListCatalogItemsOutput,
  ListCatalogItemsError,
  Credentials | HttpClient.HttpClient,
  CatalogItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /catalog/items",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      ItemClassFilter: D.m({ query: "ItemClassFilter" }),
      SupportedStorageFilter: D.m({ query: "SupportedStorageFilter" }),
      EC2FamilyFilter: D.m({ query: "EC2FamilyFilter" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCatalogItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CatalogItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrderableInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the instance types that can be ordered for an Outpost. You can filter the results
 * by Outpost generation.
 */
export const listOrderableInstanceTypes: API.PaginatedOperationMethod<
  ListOrderableInstanceTypesInput,
  ListOrderableInstanceTypesOutput,
  ListOrderableInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  DetailedInstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /instanceTypes",
    input: {
      OutpostGenerationFilter: D.m({ query: "OutpostGenerationFilter" }),
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrderableInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrdersError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outpost orders for your Amazon Web Services account.
 */
export const listOrders: API.PaginatedOperationMethod<
  ListOrdersInput,
  ListOrdersOutput,
  ListOrdersError,
  Credentials | HttpClient.HttpClient,
  OrderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /list-orders",
    input: {
      OutpostIdentifierFilter: D.m({ query: "OutpostIdentifierFilter" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Orders: D.list({ OrderSubmissionDate: D.ts, OrderFulfilledDate: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Orders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutpostsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outposts for your Amazon Web Services account.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listOutposts: API.PaginatedOperationMethod<
  ListOutpostsInput,
  ListOutpostsOutput,
  ListOutpostsError,
  Credentials | HttpClient.HttpClient,
  Outpost
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /outposts",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      LifeCycleStatusFilter: D.m({ query: "LifeCycleStatusFilter" }),
      AvailabilityZoneFilter: D.m({ query: "AvailabilityZoneFilter" }),
      AvailabilityZoneIdFilter: D.m({ query: "AvailabilityZoneIdFilter" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutposts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Outposts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQuotesError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the quotes for your Amazon Web Services account.
 */
export const listQuotes: API.PaginatedOperationMethod<
  ListQuotesInput,
  ListQuotesOutput,
  ListQuotesError,
  Credentials | HttpClient.HttpClient,
  QuoteSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /quotes",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Quotes: D.list({
        CreatedDate: D.ts,
        ExpirationDate: D.ts,
        Description: D.secret,
      }),
    },
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuotes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSitesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outpost sites for your Amazon Web Services account. Use filters to return specific
 * results.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listSites: API.PaginatedOperationMethod<
  ListSitesInput,
  ListSitesOutput,
  ListSitesError,
  Credentials | HttpClient.HttpClient,
  Site
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sites",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      OperatingAddressCountryCodeFilter: D.m({
        query: "OperatingAddressCountryCodeFilter",
      }),
      OperatingAddressStateOrRegionFilter: D.m({
        query: "OperatingAddressStateOrRegionFilter",
      }),
      OperatingAddressCityFilter: D.m({ query: "OperatingAddressCityFilter" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSites",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sites",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartCapacityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified capacity task. You can have one active capacity task for each order
 * and each Outpost.
 */
export const startCapacityTask: API.OperationMethod<
  StartCapacityTaskInput,
  StartCapacityTaskOutput,
  StartCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /outposts/{OutpostIdentifier}/capacity",
    input: {
      OutpostIdentifier: 0,
      OrderId: 0,
      AssetId: 0,
      InstancePools: D.list({ InstanceType: 0, Count: 0 }),
      InstancesToExclude: { Instances: 0, AccountIds: 0, Services: 0 },
      DryRun: 0,
      TaskActionOnBlockingInstances: 0,
    },
    output: {
      CreationDate: D.ts,
      CompletionDate: D.ts,
      LastModifiedDate: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCapacityTask",
})) as any;

export type StartConnectionError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services uses this action to install Outpost servers.
 *
 * Starts the connection required for Outpost server installation.
 *
 * Use CloudTrail to monitor this action or Amazon Web Services managed policy for Amazon Web Services Outposts to secure it. For
 * more information, see
 * Amazon Web Services managed policies for Amazon Web Services Outposts and
 * Logging Amazon Web Services Outposts API calls with Amazon Web Services CloudTrail in the *Amazon Web Services Outposts User Guide*.
 */
export const startConnection: API.OperationMethod<
  StartConnectionRequest,
  StartConnectionResponse,
  StartConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /connections",
    input: {
      DeviceSerialNumber: 0,
      AssetId: 0,
      ClientPublicKey: 0,
      NetworkInterfaceDeviceIndex: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConnection",
})) as any;

export type StartOutpostDecommissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the decommission process to return the Outposts racks or servers.
 */
export const startOutpostDecommission: API.OperationMethod<
  StartOutpostDecommissionInput,
  StartOutpostDecommissionOutput,
  StartOutpostDecommissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /outposts/{OutpostIdentifier}/decommission",
    input: { OutpostIdentifier: 0, ValidateOnly: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOutpostDecommission",
})) as any;

export type TagResourceError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Outpost.
 */
export const updateOutpost: API.OperationMethod<
  UpdateOutpostInput,
  UpdateOutpostOutput,
  UpdateOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /outposts/{OutpostId}",
    input: { OutpostId: 0, Name: 0, Description: 0, SupportedHardwareType: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOutpost",
})) as any;

export type UpdateQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified quote. You can modify the requested capacities, constraints,
 * payment options, payment terms, or Outpost association.
 */
export const updateQuote: API.OperationMethod<
  UpdateQuoteInput,
  UpdateQuoteOutput,
  UpdateQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /quotes/{QuoteIdentifier}",
    input: {
      QuoteIdentifier: 0,
      OutpostIdentifier: 0,
      CountryCode: 0,
      RequestedCapacities: D.list(i_QuoteCapacity),
      RequestedConstraints: D.list(i_QuoteConstraint),
      RequestedPaymentOptions: 0,
      RequestedPaymentTerms: 0,
      Description: 0,
    },
    output: { Quote: o_Quote },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuote",
})) as any;

export type UpdateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified site.
 */
export const updateSite: API.OperationMethod<
  UpdateSiteInput,
  UpdateSiteOutput,
  UpdateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sites/{SiteId}",
    input: { SiteId: 0, Name: 0, Description: 0, Notes: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSite",
})) as any;

export type UpdateSiteAddressError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the address of the specified site.
 *
 * You can't update a site address if there is an order in progress. You must wait for the
 * order to complete or cancel the order.
 *
 * You can update the operating address before you place an order at the site, or after all
 * Outposts that belong to the site have been deactivated.
 */
export const updateSiteAddress: API.OperationMethod<
  UpdateSiteAddressInput,
  UpdateSiteAddressOutput,
  UpdateSiteAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sites/{SiteId}/address",
    input: { SiteId: 0, AddressType: 0, Address: i_Address },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSiteAddress",
})) as any;

export type UpdateSiteRackPhysicalPropertiesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update the physical and logistical details for a rack at a site. For more information
 * about hardware requirements for racks, see Network
 * readiness checklist in the Amazon Web Services Outposts User Guide.
 *
 * To update a rack at a site with an order of `IN_PROGRESS`, you must wait for
 * the order to complete or cancel the order.
 */
export const updateSiteRackPhysicalProperties: API.OperationMethod<
  UpdateSiteRackPhysicalPropertiesInput,
  UpdateSiteRackPhysicalPropertiesOutput,
  UpdateSiteRackPhysicalPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sites/{SiteId}/rackPhysicalProperties",
    input: {
      SiteId: 0,
      PowerDrawKva: 0,
      PowerPhase: 0,
      PowerConnector: 0,
      PowerFeedDrop: 0,
      UplinkGbps: 0,
      UplinkCount: 0,
      FiberOpticCableType: 0,
      OpticalStandard: 0,
      MaximumSupportedWeightLbs: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSiteRackPhysicalProperties",
})) as any;

const i_Address: D.LazyStruct = () => ({
  ContactName: 0,
  ContactPhoneNumber: 0,
  AddressLine1: 0,
  AddressLine2: 0,
  AddressLine3: 0,
  City: 0,
  StateOrRegion: 0,
  DistrictOrCounty: 0,
  PostalCode: 0,
  CountryCode: 0,
  Municipality: 0,
});
const i_QuoteCapacity: D.LazyStruct = () => ({
  QuoteCapacityType: 0,
  Unit: 0,
  Quantity: 0,
});
const i_QuoteConstraint: D.LazyStruct = () => ({
  QuoteConstraintType: 0,
  Value: 0,
});
const o_Order: D.LazyStruct = () => ({
  OrderSubmissionDate: D.ts,
  OrderFulfilledDate: D.ts,
});
const o_Quote: D.LazyStruct = () => ({
  CreatedDate: D.ts,
  ExpirationDate: D.ts,
  Description: D.secret,
});
