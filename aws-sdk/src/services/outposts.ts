import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Outposts",
  serviceShapeName: "OutpostsOlafService",
});
const auth = T.AwsAuthSigv4({ name: "outposts" });
const ver = T.ServiceVersion("2019-12-03");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type CapacityTaskId = string;
export type OutpostIdentifier = string;
export type ErrorMessage = string;
export type OrderId = string;
export type SkuCode = string;
export type LineItemQuantity = number;
export type OutpostIdOnly = string;
export type LineItemId = string;
export type TrackingId = string;
export type AssetId = string;
export type MacAddress = string;
export type ISO8601Timestamp = Date;
export type OutpostName = string;
export type OutpostDescription = string;
export type SiteId = string;
export type AvailabilityZone = string;
export type AvailabilityZoneId = string;
export type TagKey = string;
export type TagValue = string;
export type OutpostId = string;
export type OwnerId = string;
export type OutpostArn = string;
export type LifeCycleStatus = string;
export type SiteArn = string;
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
export type CountryCode = string;
export type Municipality = string;
export type AccountId = string;
export type InstanceTypeName = string;
export type InstanceTypeCount = number;
export type InstanceId = string;
export type DryRun = boolean;
export type CapacityTaskStatusReason = string;
export type Family = string;
export type MaxSize = string;
export type Quantity = string;
export type CatalogItemPowerKva = number;
export type CatalogItemWeightLbs = number;
export type SupportedUplinkGbps = number;
export type ConnectionId = string;
export type WireGuardPublicKey = string;
export type ServerEndpoint = string;
export type CIDR = string;
export type Token = string;
export type MaxResults1000 = number;
export type InstanceType = string;
export type VCPUCount = number;
export type AssetIdInput = string;
export type OutpostInstanceType = string;
export type HostId = string;
export type RackId = string;
export type InstanceFamilyName = string;
export type RackElevation = number;
export type Arn = string;
export type DeviceSerialNumber = string;
export type NetworkInterfaceDeviceIndex = number;
export type UnderlayIpAddress = string;
export type ValidateOnly = boolean;

//# Schemas
export interface CancelCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export const CancelCapacityTaskInput = S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelCapacityTaskInput",
}) as any as S.Schema<CancelCapacityTaskInput>;
export interface CancelCapacityTaskOutput {}
export const CancelCapacityTaskOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "CancelCapacityTaskOutput",
}) as any as S.Schema<CancelCapacityTaskOutput>;
export type ResourceType = "OUTPOST" | "ORDER" | (string & {});
export const ResourceType = S.String;
export interface CancelOrderInput {
  OrderId: string;
}
export const CancelOrderInput = S.suspend(() =>
  S.Struct({ OrderId: S.String.pipe(T.HttpLabel("OrderId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/orders/{OrderId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelOrderInput",
}) as any as S.Schema<CancelOrderInput>;
export interface CancelOrderOutput {}
export const CancelOrderOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "CancelOrderOutput",
}) as any as S.Schema<CancelOrderOutput>;
export interface LineItemRequest {
  CatalogItemId?: string;
  Quantity?: number;
}
export const LineItemRequest = S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    Quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "LineItemRequest",
}) as any as S.Schema<LineItemRequest>;
export type LineItemRequestListDefinition = LineItemRequest[];
export const LineItemRequestListDefinition = S.Array(LineItemRequest);
export type PaymentOption =
  | "ALL_UPFRONT"
  | "NO_UPFRONT"
  | "PARTIAL_UPFRONT"
  | (string & {});
export const PaymentOption = S.String;
export type PaymentTerm =
  | "THREE_YEARS"
  | "ONE_YEAR"
  | "FIVE_YEARS"
  | (string & {});
export const PaymentTerm = S.String;
export interface CreateOrderInput {
  OutpostIdentifier: string;
  LineItems?: LineItemRequest[];
  PaymentOption: PaymentOption;
  PaymentTerm?: PaymentTerm;
}
export const CreateOrderInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String,
    LineItems: S.optional(LineItemRequestListDefinition),
    PaymentOption: PaymentOption,
    PaymentTerm: S.optional(PaymentTerm),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOrderInput",
}) as any as S.Schema<CreateOrderInput>;
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
export const OrderStatus = S.String;
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
export const LineItemStatus = S.String;
export type ShipmentCarrier =
  | "DHL"
  | "DBS"
  | "FEDEX"
  | "UPS"
  | "EXPEDITORS"
  | (string & {});
export const ShipmentCarrier = S.String;
export interface ShipmentInformation {
  ShipmentTrackingNumber?: string;
  ShipmentCarrier?: ShipmentCarrier;
}
export const ShipmentInformation = S.suspend(() =>
  S.Struct({
    ShipmentTrackingNumber: S.optional(S.String),
    ShipmentCarrier: S.optional(ShipmentCarrier),
  }),
).annotate({
  identifier: "ShipmentInformation",
}) as any as S.Schema<ShipmentInformation>;
export type MacAddressList = string[];
export const MacAddressList = S.Array(S.String);
export interface LineItemAssetInformation {
  AssetId?: string;
  MacAddressList?: string[];
}
export const LineItemAssetInformation = S.suspend(() =>
  S.Struct({
    AssetId: S.optional(S.String),
    MacAddressList: S.optional(MacAddressList),
  }),
).annotate({
  identifier: "LineItemAssetInformation",
}) as any as S.Schema<LineItemAssetInformation>;
export type LineItemAssetInformationList = LineItemAssetInformation[];
export const LineItemAssetInformationList = S.Array(LineItemAssetInformation);
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
export const LineItem = S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    LineItemId: S.optional(S.String),
    Quantity: S.optional(S.Number),
    Status: S.optional(LineItemStatus),
    ShipmentInformation: S.optional(ShipmentInformation),
    AssetInformationList: S.optional(LineItemAssetInformationList),
    PreviousLineItemId: S.optional(S.String),
    PreviousOrderId: S.optional(S.String),
  }),
).annotate({ identifier: "LineItem" }) as any as S.Schema<LineItem>;
export type LineItemListDefinition = LineItem[];
export const LineItemListDefinition = S.Array(LineItem);
export type OrderType = "OUTPOST" | "REPLACEMENT" | (string & {});
export const OrderType = S.String;
export interface Order {
  OutpostId?: string;
  OrderId?: string;
  Status?: OrderStatus;
  LineItems?: LineItem[];
  PaymentOption?: PaymentOption;
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
  PaymentTerm?: PaymentTerm;
  OrderType?: OrderType;
}
export const Order = S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    Status: S.optional(OrderStatus),
    LineItems: S.optional(LineItemListDefinition),
    PaymentOption: S.optional(PaymentOption),
    OrderSubmissionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OrderFulfilledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PaymentTerm: S.optional(PaymentTerm),
    OrderType: S.optional(OrderType),
  }),
).annotate({ identifier: "Order" }) as any as S.Schema<Order>;
export interface CreateOrderOutput {
  Order?: Order;
}
export const CreateOrderOutput = S.suspend(() =>
  S.Struct({ Order: S.optional(Order) }),
).annotate({
  identifier: "CreateOrderOutput",
}) as any as S.Schema<CreateOrderOutput>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export type SupportedHardwareType = "RACK" | "SERVER" | (string & {});
export const SupportedHardwareType = S.String;
export interface CreateOutpostInput {
  Name: string;
  Description?: string;
  SiteId: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  Tags?: { [key: string]: string | undefined };
  SupportedHardwareType?: SupportedHardwareType;
}
export const CreateOutpostInput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SiteId: S.String,
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    Tags: S.optional(TagMap),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/outposts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOutpostInput",
}) as any as S.Schema<CreateOutpostInput>;
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
export const Outpost = S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    SiteId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LifeCycleStatus: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    Tags: S.optional(TagMap),
    SiteArn: S.optional(S.String),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }),
).annotate({ identifier: "Outpost" }) as any as S.Schema<Outpost>;
export interface CreateOutpostOutput {
  Outpost?: Outpost;
}
export const CreateOutpostOutput = S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "CreateOutpostOutput",
}) as any as S.Schema<CreateOutpostOutput>;
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
export const Address = S.suspend(() =>
  S.Struct({
    ContactName: S.String,
    ContactPhoneNumber: S.String,
    AddressLine1: S.String,
    AddressLine2: S.optional(S.String),
    AddressLine3: S.optional(S.String),
    City: S.String,
    StateOrRegion: S.String,
    DistrictOrCounty: S.optional(S.String),
    PostalCode: S.String,
    CountryCode: S.String,
    Municipality: S.optional(S.String),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type PowerDrawKva =
  | "POWER_5_KVA"
  | "POWER_10_KVA"
  | "POWER_15_KVA"
  | "POWER_30_KVA"
  | (string & {});
export const PowerDrawKva = S.String;
export type PowerPhase = "SINGLE_PHASE" | "THREE_PHASE" | (string & {});
export const PowerPhase = S.String;
export type PowerConnector =
  | "L6_30P"
  | "IEC309"
  | "AH530P7W"
  | "AH532P6W"
  | "CS8365C"
  | (string & {});
export const PowerConnector = S.String;
export type PowerFeedDrop = "ABOVE_RACK" | "BELOW_RACK" | (string & {});
export const PowerFeedDrop = S.String;
export type UplinkGbps =
  | "UPLINK_1G"
  | "UPLINK_10G"
  | "UPLINK_40G"
  | "UPLINK_100G"
  | (string & {});
export const UplinkGbps = S.String;
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
export const UplinkCount = S.String;
export type FiberOpticCableType = "SINGLE_MODE" | "MULTI_MODE" | (string & {});
export const FiberOpticCableType = S.String;
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
export const OpticalStandard = S.String;
export type MaximumSupportedWeightLbs =
  | "NO_LIMIT"
  | "MAX_1400_LBS"
  | "MAX_1600_LBS"
  | "MAX_1800_LBS"
  | "MAX_2000_LBS"
  | (string & {});
export const MaximumSupportedWeightLbs = S.String;
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
export const RackPhysicalProperties = S.suspend(() =>
  S.Struct({
    PowerDrawKva: S.optional(PowerDrawKva),
    PowerPhase: S.optional(PowerPhase),
    PowerConnector: S.optional(PowerConnector),
    PowerFeedDrop: S.optional(PowerFeedDrop),
    UplinkGbps: S.optional(UplinkGbps),
    UplinkCount: S.optional(UplinkCount),
    FiberOpticCableType: S.optional(FiberOpticCableType),
    OpticalStandard: S.optional(OpticalStandard),
    MaximumSupportedWeightLbs: S.optional(MaximumSupportedWeightLbs),
  }),
).annotate({
  identifier: "RackPhysicalProperties",
}) as any as S.Schema<RackPhysicalProperties>;
export interface CreateSiteInput {
  Name: string;
  Description?: string;
  Notes?: string;
  Tags?: { [key: string]: string | undefined };
  OperatingAddress?: Address;
  ShippingAddress?: Address;
  RackPhysicalProperties?: RackPhysicalProperties;
}
export const CreateSiteInput = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Notes: S.optional(S.String),
    Tags: S.optional(TagMap),
    OperatingAddress: S.optional(Address),
    ShippingAddress: S.optional(Address),
    RackPhysicalProperties: S.optional(RackPhysicalProperties),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sites" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSiteInput",
}) as any as S.Schema<CreateSiteInput>;
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
export const Site = S.suspend(() =>
  S.Struct({
    SiteId: S.optional(S.String),
    AccountId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    SiteArn: S.optional(S.String),
    Notes: S.optional(S.String),
    OperatingAddressCountryCode: S.optional(S.String),
    OperatingAddressStateOrRegion: S.optional(S.String),
    OperatingAddressCity: S.optional(S.String),
    RackPhysicalProperties: S.optional(RackPhysicalProperties),
  }),
).annotate({ identifier: "Site" }) as any as S.Schema<Site>;
export interface CreateSiteOutput {
  Site?: Site;
}
export const CreateSiteOutput = S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "CreateSiteOutput",
}) as any as S.Schema<CreateSiteOutput>;
export interface DeleteOutpostInput {
  OutpostId: string;
}
export const DeleteOutpostInput = S.suspend(() =>
  S.Struct({ OutpostId: S.String.pipe(T.HttpLabel("OutpostId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOutpostInput",
}) as any as S.Schema<DeleteOutpostInput>;
export interface DeleteOutpostOutput {}
export const DeleteOutpostOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteOutpostOutput",
}) as any as S.Schema<DeleteOutpostOutput>;
export interface DeleteSiteInput {
  SiteId: string;
}
export const DeleteSiteInput = S.suspend(() =>
  S.Struct({ SiteId: S.String.pipe(T.HttpLabel("SiteId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSiteInput",
}) as any as S.Schema<DeleteSiteInput>;
export interface DeleteSiteOutput {}
export const DeleteSiteOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteSiteOutput",
}) as any as S.Schema<DeleteSiteOutput>;
export interface GetCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export const GetCapacityTaskInput = S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCapacityTaskInput",
}) as any as S.Schema<GetCapacityTaskInput>;
export interface InstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export const InstanceTypeCapacity = S.suspend(() =>
  S.Struct({ InstanceType: S.String, Count: S.Number }),
).annotate({
  identifier: "InstanceTypeCapacity",
}) as any as S.Schema<InstanceTypeCapacity>;
export type RequestedInstancePools = InstanceTypeCapacity[];
export const RequestedInstancePools = S.Array(InstanceTypeCapacity);
export type InstanceIdList = string[];
export const InstanceIdList = S.Array(S.String);
export type AccountIdList = string[];
export const AccountIdList = S.Array(S.String);
export type AWSServiceName =
  | "AWS"
  | "EC2"
  | "ELASTICACHE"
  | "ELB"
  | "RDS"
  | "ROUTE53"
  | (string & {});
export const AWSServiceName = S.String;
export type AWSServiceNameList = AWSServiceName[];
export const AWSServiceNameList = S.Array(AWSServiceName);
export interface InstancesToExclude {
  Instances?: string[];
  AccountIds?: string[];
  Services?: AWSServiceName[];
}
export const InstancesToExclude = S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceIdList),
    AccountIds: S.optional(AccountIdList),
    Services: S.optional(AWSServiceNameList),
  }),
).annotate({
  identifier: "InstancesToExclude",
}) as any as S.Schema<InstancesToExclude>;
export type CapacityTaskStatus =
  | "REQUESTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "WAITING_FOR_EVACUATION"
  | "CANCELLATION_IN_PROGRESS"
  | "CANCELLED"
  | (string & {});
export const CapacityTaskStatus = S.String;
export type CapacityTaskFailureType =
  | "UNSUPPORTED_CAPACITY_CONFIGURATION"
  | "UNEXPECTED_ASSET_STATE"
  | "BLOCKING_INSTANCES_NOT_EVACUATED"
  | "INTERNAL_SERVER_ERROR"
  | "RESOURCE_NOT_FOUND"
  | (string & {});
export const CapacityTaskFailureType = S.String;
export interface CapacityTaskFailure {
  Reason: string;
  Type?: CapacityTaskFailureType;
}
export const CapacityTaskFailure = S.suspend(() =>
  S.Struct({ Reason: S.String, Type: S.optional(CapacityTaskFailureType) }),
).annotate({
  identifier: "CapacityTaskFailure",
}) as any as S.Schema<CapacityTaskFailure>;
export type TaskActionOnBlockingInstances =
  | "WAIT_FOR_EVACUATION"
  | "FAIL_TASK"
  | (string & {});
export const TaskActionOnBlockingInstances = S.String;
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
export const GetCapacityTaskOutput = S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    RequestedInstancePools: S.optional(RequestedInstancePools),
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    Failed: S.optional(CapacityTaskFailure),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }),
).annotate({
  identifier: "GetCapacityTaskOutput",
}) as any as S.Schema<GetCapacityTaskOutput>;
export interface GetCatalogItemInput {
  CatalogItemId: string;
}
export const GetCatalogItemInput = S.suspend(() =>
  S.Struct({ CatalogItemId: S.String.pipe(T.HttpLabel("CatalogItemId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog/item/{CatalogItemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCatalogItemInput",
}) as any as S.Schema<GetCatalogItemInput>;
export type CatalogItemStatus = "AVAILABLE" | "DISCONTINUED" | (string & {});
export const CatalogItemStatus = S.String;
export interface EC2Capacity {
  Family?: string;
  MaxSize?: string;
  Quantity?: string;
}
export const EC2Capacity = S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    MaxSize: S.optional(S.String),
    Quantity: S.optional(S.String),
  }),
).annotate({ identifier: "EC2Capacity" }) as any as S.Schema<EC2Capacity>;
export type EC2CapacityListDefinition = EC2Capacity[];
export const EC2CapacityListDefinition = S.Array(EC2Capacity);
export type SupportedUplinkGbpsListDefinition = number[];
export const SupportedUplinkGbpsListDefinition = S.Array(S.Number);
export type SupportedStorageEnum = "EBS" | "S3" | (string & {});
export const SupportedStorageEnum = S.String;
export type SupportedStorageList = SupportedStorageEnum[];
export const SupportedStorageList = S.Array(SupportedStorageEnum);
export interface CatalogItem {
  CatalogItemId?: string;
  ItemStatus?: CatalogItemStatus;
  EC2Capacities?: EC2Capacity[];
  PowerKva?: number;
  WeightLbs?: number;
  SupportedUplinkGbps?: number[];
  SupportedStorage?: SupportedStorageEnum[];
}
export const CatalogItem = S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    ItemStatus: S.optional(CatalogItemStatus),
    EC2Capacities: S.optional(EC2CapacityListDefinition),
    PowerKva: S.optional(S.Number),
    WeightLbs: S.optional(S.Number),
    SupportedUplinkGbps: S.optional(SupportedUplinkGbpsListDefinition),
    SupportedStorage: S.optional(SupportedStorageList),
  }),
).annotate({ identifier: "CatalogItem" }) as any as S.Schema<CatalogItem>;
export interface GetCatalogItemOutput {
  CatalogItem?: CatalogItem;
}
export const GetCatalogItemOutput = S.suspend(() =>
  S.Struct({ CatalogItem: S.optional(CatalogItem) }),
).annotate({
  identifier: "GetCatalogItemOutput",
}) as any as S.Schema<GetCatalogItemOutput>;
export interface GetConnectionRequest {
  ConnectionId: string;
}
export const GetConnectionRequest = S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connections/{ConnectionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export type CIDRList = string[];
export const CIDRList = S.Array(S.String);
export interface ConnectionDetails {
  ClientPublicKey?: string;
  ServerPublicKey?: string;
  ServerEndpoint?: string;
  ClientTunnelAddress?: string;
  ServerTunnelAddress?: string;
  AllowedIps?: string[];
}
export const ConnectionDetails = S.suspend(() =>
  S.Struct({
    ClientPublicKey: S.optional(S.String),
    ServerPublicKey: S.optional(S.String),
    ServerEndpoint: S.optional(S.String),
    ClientTunnelAddress: S.optional(S.String),
    ServerTunnelAddress: S.optional(S.String),
    AllowedIps: S.optional(CIDRList),
  }),
).annotate({
  identifier: "ConnectionDetails",
}) as any as S.Schema<ConnectionDetails>;
export interface GetConnectionResponse {
  ConnectionId?: string;
  ConnectionDetails?: ConnectionDetails;
}
export const GetConnectionResponse = S.suspend(() =>
  S.Struct({
    ConnectionId: S.optional(S.String),
    ConnectionDetails: S.optional(ConnectionDetails),
  }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface GetOrderInput {
  OrderId: string;
}
export const GetOrderInput = S.suspend(() =>
  S.Struct({ OrderId: S.String.pipe(T.HttpLabel("OrderId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/orders/{OrderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetOrderInput" }) as any as S.Schema<GetOrderInput>;
export interface GetOrderOutput {
  Order?: Order;
}
export const GetOrderOutput = S.suspend(() =>
  S.Struct({ Order: S.optional(Order) }),
).annotate({ identifier: "GetOrderOutput" }) as any as S.Schema<GetOrderOutput>;
export interface GetOutpostInput {
  OutpostId: string;
}
export const GetOutpostInput = S.suspend(() =>
  S.Struct({ OutpostId: S.String.pipe(T.HttpLabel("OutpostId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostInput",
}) as any as S.Schema<GetOutpostInput>;
export interface GetOutpostOutput {
  Outpost?: Outpost;
}
export const GetOutpostOutput = S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "GetOutpostOutput",
}) as any as S.Schema<GetOutpostOutput>;
export interface GetOutpostBillingInformationInput {
  NextToken?: string;
  MaxResults?: number;
  OutpostIdentifier: string;
}
export const GetOutpostBillingInformationInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outpost/{OutpostIdentifier}/billing-information",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostBillingInformationInput",
}) as any as S.Schema<GetOutpostBillingInformationInput>;
export type SubscriptionType =
  | "ORIGINAL"
  | "RENEWAL"
  | "CAPACITY_INCREASE"
  | (string & {});
export const SubscriptionType = S.String;
export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "CANCELLED"
  | (string & {});
export const SubscriptionStatus = S.String;
export type OrderIdList = string[];
export const OrderIdList = S.Array(S.String);
export interface Subscription {
  SubscriptionId?: string;
  SubscriptionType?: SubscriptionType;
  SubscriptionStatus?: SubscriptionStatus;
  OrderIds?: string[];
  BeginDate?: Date;
  EndDate?: Date;
  MonthlyRecurringPrice?: number;
  UpfrontPrice?: number;
}
export const Subscription = S.suspend(() =>
  S.Struct({
    SubscriptionId: S.optional(S.String),
    SubscriptionType: S.optional(SubscriptionType),
    SubscriptionStatus: S.optional(SubscriptionStatus),
    OrderIds: S.optional(OrderIdList),
    BeginDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MonthlyRecurringPrice: S.optional(S.Number),
    UpfrontPrice: S.optional(S.Number),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = S.Array(Subscription);
export interface GetOutpostBillingInformationOutput {
  NextToken?: string;
  Subscriptions?: Subscription[];
  ContractEndDate?: string;
}
export const GetOutpostBillingInformationOutput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Subscriptions: S.optional(SubscriptionList),
    ContractEndDate: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOutpostBillingInformationOutput",
}) as any as S.Schema<GetOutpostBillingInformationOutput>;
export interface GetOutpostInstanceTypesInput {
  OutpostId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetOutpostInstanceTypesInput = S.suspend(() =>
  S.Struct({
    OutpostId: S.String.pipe(T.HttpLabel("OutpostId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostId}/instanceTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostInstanceTypesInput",
}) as any as S.Schema<GetOutpostInstanceTypesInput>;
export interface InstanceTypeItem {
  InstanceType?: string;
  VCPUs?: number;
}
export const InstanceTypeItem = S.suspend(() =>
  S.Struct({ InstanceType: S.optional(S.String), VCPUs: S.optional(S.Number) }),
).annotate({
  identifier: "InstanceTypeItem",
}) as any as S.Schema<InstanceTypeItem>;
export type InstanceTypeListDefinition = InstanceTypeItem[];
export const InstanceTypeListDefinition = S.Array(InstanceTypeItem);
export interface GetOutpostInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
  OutpostId?: string;
  OutpostArn?: string;
}
export const GetOutpostInstanceTypesOutput = S.suspend(() =>
  S.Struct({
    InstanceTypes: S.optional(InstanceTypeListDefinition),
    NextToken: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOutpostInstanceTypesOutput",
}) as any as S.Schema<GetOutpostInstanceTypesOutput>;
export interface GetOutpostSupportedInstanceTypesInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetOutpostSupportedInstanceTypesInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    OrderId: S.optional(S.String).pipe(T.HttpQuery("OrderId")),
    AssetId: S.optional(S.String).pipe(T.HttpQuery("AssetId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/supportedInstanceTypes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostSupportedInstanceTypesInput",
}) as any as S.Schema<GetOutpostSupportedInstanceTypesInput>;
export interface GetOutpostSupportedInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
}
export const GetOutpostSupportedInstanceTypesOutput = S.suspend(() =>
  S.Struct({
    InstanceTypes: S.optional(InstanceTypeListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOutpostSupportedInstanceTypesOutput",
}) as any as S.Schema<GetOutpostSupportedInstanceTypesOutput>;
export interface GetSiteInput {
  SiteId: string;
}
export const GetSiteInput = S.suspend(() =>
  S.Struct({ SiteId: S.String.pipe(T.HttpLabel("SiteId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetSiteInput" }) as any as S.Schema<GetSiteInput>;
export interface GetSiteOutput {
  Site?: Site;
}
export const GetSiteOutput = S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({ identifier: "GetSiteOutput" }) as any as S.Schema<GetSiteOutput>;
export type AddressType =
  | "SHIPPING_ADDRESS"
  | "OPERATING_ADDRESS"
  | (string & {});
export const AddressType = S.String;
export interface GetSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
}
export const GetSiteAddressInput = S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    AddressType: AddressType.pipe(T.HttpQuery("AddressType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites/{SiteId}/address" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSiteAddressInput",
}) as any as S.Schema<GetSiteAddressInput>;
export interface GetSiteAddressOutput {
  SiteId?: string;
  AddressType?: AddressType;
  Address?: Address;
}
export const GetSiteAddressOutput = S.suspend(() =>
  S.Struct({
    SiteId: S.optional(S.String),
    AddressType: S.optional(AddressType),
    Address: S.optional(Address),
  }),
).annotate({
  identifier: "GetSiteAddressOutput",
}) as any as S.Schema<GetSiteAddressOutput>;
export type AssetIdList = string[];
export const AssetIdList = S.Array(S.String);
export type OutpostInstanceTypeList = string[];
export const OutpostInstanceTypeList = S.Array(S.String);
export interface ListAssetInstancesInput {
  OutpostIdentifier: string;
  AssetIdFilter?: string[];
  InstanceTypeFilter?: string[];
  AccountIdFilter?: string[];
  AwsServiceFilter?: AWSServiceName[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssetInstancesInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    AssetIdFilter: S.optional(AssetIdList).pipe(T.HttpQuery("AssetIdFilter")),
    InstanceTypeFilter: S.optional(OutpostInstanceTypeList).pipe(
      T.HttpQuery("InstanceTypeFilter"),
    ),
    AccountIdFilter: S.optional(AccountIdList).pipe(
      T.HttpQuery("AccountIdFilter"),
    ),
    AwsServiceFilter: S.optional(AWSServiceNameList).pipe(
      T.HttpQuery("AwsServiceFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/assetInstances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetInstancesInput",
}) as any as S.Schema<ListAssetInstancesInput>;
export interface AssetInstance {
  InstanceId?: string;
  InstanceType?: string;
  AssetId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export const AssetInstance = S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AssetId: S.optional(S.String),
    AccountId: S.optional(S.String),
    AwsServiceName: S.optional(AWSServiceName),
  }),
).annotate({ identifier: "AssetInstance" }) as any as S.Schema<AssetInstance>;
export type AssetInstanceList = AssetInstance[];
export const AssetInstanceList = S.Array(AssetInstance);
export interface ListAssetInstancesOutput {
  AssetInstances?: AssetInstance[];
  NextToken?: string;
}
export const ListAssetInstancesOutput = S.suspend(() =>
  S.Struct({
    AssetInstances: S.optional(AssetInstanceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetInstancesOutput",
}) as any as S.Schema<ListAssetInstancesOutput>;
export type HostIdList = string[];
export const HostIdList = S.Array(S.String);
export type AssetState = "ACTIVE" | "RETIRING" | "ISOLATED" | (string & {});
export const AssetState = S.String;
export type StatusList = AssetState[];
export const StatusList = S.Array(AssetState);
export interface ListAssetsInput {
  OutpostIdentifier: string;
  HostIdFilter?: string[];
  MaxResults?: number;
  NextToken?: string;
  StatusFilter?: AssetState[];
}
export const ListAssetsInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    HostIdFilter: S.optional(HostIdList).pipe(T.HttpQuery("HostIdFilter")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    StatusFilter: S.optional(StatusList).pipe(T.HttpQuery("StatusFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostIdentifier}/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetsInput",
}) as any as S.Schema<ListAssetsInput>;
export type AssetType = "COMPUTE" | (string & {});
export const AssetType = S.String;
export type ComputeAssetState =
  | "ACTIVE"
  | "ISOLATED"
  | "RETIRING"
  | (string & {});
export const ComputeAssetState = S.String;
export type InstanceFamilies = string[];
export const InstanceFamilies = S.Array(S.String);
export interface AssetInstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export const AssetInstanceTypeCapacity = S.suspend(() =>
  S.Struct({ InstanceType: S.String, Count: S.Number }),
).annotate({
  identifier: "AssetInstanceTypeCapacity",
}) as any as S.Schema<AssetInstanceTypeCapacity>;
export type AssetInstanceCapacityList = AssetInstanceTypeCapacity[];
export const AssetInstanceCapacityList = S.Array(AssetInstanceTypeCapacity);
export interface ComputeAttributes {
  HostId?: string;
  State?: ComputeAssetState;
  InstanceFamilies?: string[];
  InstanceTypeCapacities?: AssetInstanceTypeCapacity[];
  MaxVcpus?: number;
}
export const ComputeAttributes = S.suspend(() =>
  S.Struct({
    HostId: S.optional(S.String),
    State: S.optional(ComputeAssetState),
    InstanceFamilies: S.optional(InstanceFamilies),
    InstanceTypeCapacities: S.optional(AssetInstanceCapacityList),
    MaxVcpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "ComputeAttributes",
}) as any as S.Schema<ComputeAttributes>;
export interface AssetLocation {
  RackElevation?: number;
}
export const AssetLocation = S.suspend(() =>
  S.Struct({ RackElevation: S.optional(S.Number) }),
).annotate({ identifier: "AssetLocation" }) as any as S.Schema<AssetLocation>;
export interface AssetInfo {
  AssetId?: string;
  RackId?: string;
  AssetType?: AssetType;
  ComputeAttributes?: ComputeAttributes;
  AssetLocation?: AssetLocation;
}
export const AssetInfo = S.suspend(() =>
  S.Struct({
    AssetId: S.optional(S.String),
    RackId: S.optional(S.String),
    AssetType: S.optional(AssetType),
    ComputeAttributes: S.optional(ComputeAttributes),
    AssetLocation: S.optional(AssetLocation),
  }),
).annotate({ identifier: "AssetInfo" }) as any as S.Schema<AssetInfo>;
export type AssetListDefinition = AssetInfo[];
export const AssetListDefinition = S.Array(AssetInfo);
export interface ListAssetsOutput {
  Assets?: AssetInfo[];
  NextToken?: string;
}
export const ListAssetsOutput = S.suspend(() =>
  S.Struct({
    Assets: S.optional(AssetListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetsOutput",
}) as any as S.Schema<ListAssetsOutput>;
export interface ListBlockingInstancesForCapacityTaskInput {
  OutpostIdentifier: string;
  CapacityTaskId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBlockingInstancesForCapacityTaskInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}/blockingInstances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBlockingInstancesForCapacityTaskInput",
}) as any as S.Schema<ListBlockingInstancesForCapacityTaskInput>;
export interface BlockingInstance {
  InstanceId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export const BlockingInstance = S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    AccountId: S.optional(S.String),
    AwsServiceName: S.optional(AWSServiceName),
  }),
).annotate({
  identifier: "BlockingInstance",
}) as any as S.Schema<BlockingInstance>;
export type BlockingInstancesList = BlockingInstance[];
export const BlockingInstancesList = S.Array(BlockingInstance);
export interface ListBlockingInstancesForCapacityTaskOutput {
  BlockingInstances?: BlockingInstance[];
  NextToken?: string;
}
export const ListBlockingInstancesForCapacityTaskOutput = S.suspend(() =>
  S.Struct({
    BlockingInstances: S.optional(BlockingInstancesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBlockingInstancesForCapacityTaskOutput",
}) as any as S.Schema<ListBlockingInstancesForCapacityTaskOutput>;
export type CapacityTaskStatusList = CapacityTaskStatus[];
export const CapacityTaskStatusList = S.Array(CapacityTaskStatus);
export interface ListCapacityTasksInput {
  OutpostIdentifierFilter?: string;
  MaxResults?: number;
  NextToken?: string;
  CapacityTaskStatusFilter?: CapacityTaskStatus[];
}
export const ListCapacityTasksInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifierFilter: S.optional(S.String).pipe(
      T.HttpQuery("OutpostIdentifierFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    CapacityTaskStatusFilter: S.optional(CapacityTaskStatusList).pipe(
      T.HttpQuery("CapacityTaskStatusFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/capacity/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCapacityTasksInput",
}) as any as S.Schema<ListCapacityTasksInput>;
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
export const CapacityTaskSummary = S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CapacityTaskSummary",
}) as any as S.Schema<CapacityTaskSummary>;
export type CapacityTaskList = CapacityTaskSummary[];
export const CapacityTaskList = S.Array(CapacityTaskSummary);
export interface ListCapacityTasksOutput {
  CapacityTasks?: CapacityTaskSummary[];
  NextToken?: string;
}
export const ListCapacityTasksOutput = S.suspend(() =>
  S.Struct({
    CapacityTasks: S.optional(CapacityTaskList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCapacityTasksOutput",
}) as any as S.Schema<ListCapacityTasksOutput>;
export type CatalogItemClass = "RACK" | "SERVER" | (string & {});
export const CatalogItemClass = S.String;
export type CatalogItemClassList = CatalogItemClass[];
export const CatalogItemClassList = S.Array(CatalogItemClass);
export type EC2FamilyList = string[];
export const EC2FamilyList = S.Array(S.String);
export interface ListCatalogItemsInput {
  NextToken?: string;
  MaxResults?: number;
  ItemClassFilter?: CatalogItemClass[];
  SupportedStorageFilter?: SupportedStorageEnum[];
  EC2FamilyFilter?: string[];
}
export const ListCatalogItemsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    ItemClassFilter: S.optional(CatalogItemClassList).pipe(
      T.HttpQuery("ItemClassFilter"),
    ),
    SupportedStorageFilter: S.optional(SupportedStorageList).pipe(
      T.HttpQuery("SupportedStorageFilter"),
    ),
    EC2FamilyFilter: S.optional(EC2FamilyList).pipe(
      T.HttpQuery("EC2FamilyFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog/items" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCatalogItemsInput",
}) as any as S.Schema<ListCatalogItemsInput>;
export type CatalogItemListDefinition = CatalogItem[];
export const CatalogItemListDefinition = S.Array(CatalogItem);
export interface ListCatalogItemsOutput {
  CatalogItems?: CatalogItem[];
  NextToken?: string;
}
export const ListCatalogItemsOutput = S.suspend(() =>
  S.Struct({
    CatalogItems: S.optional(CatalogItemListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCatalogItemsOutput",
}) as any as S.Schema<ListCatalogItemsOutput>;
export interface ListOrdersInput {
  OutpostIdentifierFilter?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOrdersInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifierFilter: S.optional(S.String).pipe(
      T.HttpQuery("OutpostIdentifierFilter"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/list-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOrdersInput",
}) as any as S.Schema<ListOrdersInput>;
export type LineItemStatusCounts = { [key in LineItemStatus]?: number };
export const LineItemStatusCounts = S.Record(
  LineItemStatus,
  S.Number.pipe(S.optional),
);
export interface OrderSummary {
  OutpostId?: string;
  OrderId?: string;
  OrderType?: OrderType;
  Status?: OrderStatus;
  LineItemCountsByStatus?: { [key: string]: number | undefined };
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
}
export const OrderSummary = S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    OrderType: S.optional(OrderType),
    Status: S.optional(OrderStatus),
    LineItemCountsByStatus: S.optional(LineItemStatusCounts),
    OrderSubmissionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OrderFulfilledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "OrderSummary" }) as any as S.Schema<OrderSummary>;
export type OrderSummaryListDefinition = OrderSummary[];
export const OrderSummaryListDefinition = S.Array(OrderSummary);
export interface ListOrdersOutput {
  Orders?: OrderSummary[];
  NextToken?: string;
}
export const ListOrdersOutput = S.suspend(() =>
  S.Struct({
    Orders: S.optional(OrderSummaryListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrdersOutput",
}) as any as S.Schema<ListOrdersOutput>;
export type LifeCycleStatusList = string[];
export const LifeCycleStatusList = S.Array(S.String);
export type AvailabilityZoneList = string[];
export const AvailabilityZoneList = S.Array(S.String);
export type AvailabilityZoneIdList = string[];
export const AvailabilityZoneIdList = S.Array(S.String);
export interface ListOutpostsInput {
  NextToken?: string;
  MaxResults?: number;
  LifeCycleStatusFilter?: string[];
  AvailabilityZoneFilter?: string[];
  AvailabilityZoneIdFilter?: string[];
}
export const ListOutpostsInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    LifeCycleStatusFilter: S.optional(LifeCycleStatusList).pipe(
      T.HttpQuery("LifeCycleStatusFilter"),
    ),
    AvailabilityZoneFilter: S.optional(AvailabilityZoneList).pipe(
      T.HttpQuery("AvailabilityZoneFilter"),
    ),
    AvailabilityZoneIdFilter: S.optional(AvailabilityZoneIdList).pipe(
      T.HttpQuery("AvailabilityZoneIdFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOutpostsInput",
}) as any as S.Schema<ListOutpostsInput>;
export type OutpostListDefinition = Outpost[];
export const OutpostListDefinition = S.Array(Outpost);
export interface ListOutpostsOutput {
  Outposts?: Outpost[];
  NextToken?: string;
}
export const ListOutpostsOutput = S.suspend(() =>
  S.Struct({
    Outposts: S.optional(OutpostListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOutpostsOutput",
}) as any as S.Schema<ListOutpostsOutput>;
export type CountryCodeList = string[];
export const CountryCodeList = S.Array(S.String);
export type StateOrRegionList = string[];
export const StateOrRegionList = S.Array(S.String);
export type CityList = string[];
export const CityList = S.Array(S.String);
export interface ListSitesInput {
  NextToken?: string;
  MaxResults?: number;
  OperatingAddressCountryCodeFilter?: string[];
  OperatingAddressStateOrRegionFilter?: string[];
  OperatingAddressCityFilter?: string[];
}
export const ListSitesInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    OperatingAddressCountryCodeFilter: S.optional(CountryCodeList).pipe(
      T.HttpQuery("OperatingAddressCountryCodeFilter"),
    ),
    OperatingAddressStateOrRegionFilter: S.optional(StateOrRegionList).pipe(
      T.HttpQuery("OperatingAddressStateOrRegionFilter"),
    ),
    OperatingAddressCityFilter: S.optional(CityList).pipe(
      T.HttpQuery("OperatingAddressCityFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListSitesInput" }) as any as S.Schema<ListSitesInput>;
export type SiteListDefinition = Site[];
export const SiteListDefinition = S.Array(Site);
export interface ListSitesOutput {
  Sites?: Site[];
  NextToken?: string;
}
export const ListSitesOutput = S.suspend(() =>
  S.Struct({
    Sites: S.optional(SiteListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSitesOutput",
}) as any as S.Schema<ListSitesOutput>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartCapacityTaskInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  InstancePools: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export const StartCapacityTaskInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    InstancePools: RequestedInstancePools,
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/outposts/{OutpostIdentifier}/capacity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCapacityTaskInput",
}) as any as S.Schema<StartCapacityTaskInput>;
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
export const StartCapacityTaskOutput = S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    RequestedInstancePools: S.optional(RequestedInstancePools),
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    Failed: S.optional(CapacityTaskFailure),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }),
).annotate({
  identifier: "StartCapacityTaskOutput",
}) as any as S.Schema<StartCapacityTaskOutput>;
export interface StartConnectionRequest {
  DeviceSerialNumber?: string;
  AssetId: string;
  ClientPublicKey: string;
  NetworkInterfaceDeviceIndex: number;
}
export const StartConnectionRequest = S.suspend(() =>
  S.Struct({
    DeviceSerialNumber: S.optional(S.String),
    AssetId: S.String,
    ClientPublicKey: S.String,
    NetworkInterfaceDeviceIndex: S.Number,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartConnectionRequest",
}) as any as S.Schema<StartConnectionRequest>;
export interface StartConnectionResponse {
  ConnectionId?: string;
  UnderlayIpAddress?: string;
}
export const StartConnectionResponse = S.suspend(() =>
  S.Struct({
    ConnectionId: S.optional(S.String),
    UnderlayIpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "StartConnectionResponse",
}) as any as S.Schema<StartConnectionResponse>;
export interface StartOutpostDecommissionInput {
  OutpostIdentifier: string;
  ValidateOnly?: boolean;
}
export const StartOutpostDecommissionInput = S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    ValidateOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/outposts/{OutpostIdentifier}/decommission",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartOutpostDecommissionInput",
}) as any as S.Schema<StartOutpostDecommissionInput>;
export type DecommissionRequestStatus =
  | "SKIPPED"
  | "BLOCKED"
  | "REQUESTED"
  | (string & {});
export const DecommissionRequestStatus = S.String;
export type BlockingResourceType =
  | "EC2_INSTANCE"
  | "OUTPOST_RAM_SHARE"
  | "LGW_ROUTING_DOMAIN"
  | "LGW_ROUTE_TABLE"
  | "LGW_VIRTUAL_INTERFACE_GROUP"
  | "OUTPOST_ORDER_CANCELLABLE"
  | "OUTPOST_ORDER_INTERVENTION_REQUIRED"
  | (string & {});
export const BlockingResourceType = S.String;
export type BlockingResourceTypeList = BlockingResourceType[];
export const BlockingResourceTypeList = S.Array(BlockingResourceType);
export interface StartOutpostDecommissionOutput {
  Status?: DecommissionRequestStatus;
  BlockingResourceTypes?: BlockingResourceType[];
}
export const StartOutpostDecommissionOutput = S.suspend(() =>
  S.Struct({
    Status: S.optional(DecommissionRequestStatus),
    BlockingResourceTypes: S.optional(BlockingResourceTypeList),
  }),
).annotate({
  identifier: "StartOutpostDecommissionOutput",
}) as any as S.Schema<StartOutpostDecommissionOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateOutpostInput {
  OutpostId: string;
  Name?: string;
  Description?: string;
  SupportedHardwareType?: SupportedHardwareType;
}
export const UpdateOutpostInput = S.suspend(() =>
  S.Struct({
    OutpostId: S.String.pipe(T.HttpLabel("OutpostId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOutpostInput",
}) as any as S.Schema<UpdateOutpostInput>;
export interface UpdateOutpostOutput {
  Outpost?: Outpost;
}
export const UpdateOutpostOutput = S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "UpdateOutpostOutput",
}) as any as S.Schema<UpdateOutpostOutput>;
export interface UpdateSiteInput {
  SiteId: string;
  Name?: string;
  Description?: string;
  Notes?: string;
}
export const UpdateSiteInput = S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Notes: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSiteInput",
}) as any as S.Schema<UpdateSiteInput>;
export interface UpdateSiteOutput {
  Site?: Site;
}
export const UpdateSiteOutput = S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "UpdateSiteOutput",
}) as any as S.Schema<UpdateSiteOutput>;
export interface UpdateSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
  Address: Address;
}
export const UpdateSiteAddressInput = S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    AddressType: AddressType,
    Address: Address,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sites/{SiteId}/address" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSiteAddressInput",
}) as any as S.Schema<UpdateSiteAddressInput>;
export interface UpdateSiteAddressOutput {
  AddressType?: AddressType;
  Address?: Address;
}
export const UpdateSiteAddressOutput = S.suspend(() =>
  S.Struct({
    AddressType: S.optional(AddressType),
    Address: S.optional(Address),
  }),
).annotate({
  identifier: "UpdateSiteAddressOutput",
}) as any as S.Schema<UpdateSiteAddressOutput>;
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
export const UpdateSiteRackPhysicalPropertiesInput = S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    PowerDrawKva: S.optional(PowerDrawKva),
    PowerPhase: S.optional(PowerPhase),
    PowerConnector: S.optional(PowerConnector),
    PowerFeedDrop: S.optional(PowerFeedDrop),
    UplinkGbps: S.optional(UplinkGbps),
    UplinkCount: S.optional(UplinkCount),
    FiberOpticCableType: S.optional(FiberOpticCableType),
    OpticalStandard: S.optional(OpticalStandard),
    MaximumSupportedWeightLbs: S.optional(MaximumSupportedWeightLbs),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/sites/{SiteId}/rackPhysicalProperties",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSiteRackPhysicalPropertiesInput",
}) as any as S.Schema<UpdateSiteRackPhysicalPropertiesInput>;
export interface UpdateSiteRackPhysicalPropertiesOutput {
  Site?: Site;
}
export const UpdateSiteRackPhysicalPropertiesOutput = S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "UpdateSiteRackPhysicalPropertiesOutput",
}) as any as S.Schema<UpdateSiteRackPhysicalPropertiesOutput>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  {
    Message: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
  },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withQuotaError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelCapacityTaskInput,
  output: CancelCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelOrderInput,
  output: CancelOrderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOrderInput,
  output: CreateOrderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOutpostInput,
  output: CreateOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSiteInput,
  output: CreateSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOutpostInput,
  output: DeleteOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSiteInput,
  output: DeleteSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCapacityTaskInput,
  output: GetCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCatalogItemInput,
  output: GetCatalogItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOrderInput,
  output: GetOrderOutput,
  errors: [InternalServerException, NotFoundException, ValidationException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOutpostInput,
  output: GetOutpostOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
export type GetOutpostBillingInformationError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | CommonErrors;
/**
 * Gets current and historical billing information about the specified Outpost.
 */
export const getOutpostBillingInformation: API.OperationMethod<
  GetOutpostBillingInformationInput,
  GetOutpostBillingInformationOutput,
  GetOutpostBillingInformationError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetOutpostBillingInformationInput,
  ) => stream.Stream<
    GetOutpostBillingInformationOutput,
    GetOutpostBillingInformationError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetOutpostBillingInformationInput,
  ) => stream.Stream<
    Subscription,
    GetOutpostBillingInformationError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostBillingInformationInput,
  output: GetOutpostBillingInformationOutput,
  errors: [AccessDeniedException, InternalServerException, NotFoundException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
}));
export type GetOutpostInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the instance types for the specified Outpost.
 */
export const getOutpostInstanceTypes: API.OperationMethod<
  GetOutpostInstanceTypesInput,
  GetOutpostInstanceTypesOutput,
  GetOutpostInstanceTypesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetOutpostInstanceTypesInput,
  ) => stream.Stream<
    GetOutpostInstanceTypesOutput,
    GetOutpostInstanceTypesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetOutpostInstanceTypesInput,
  ) => stream.Stream<
    InstanceTypeItem,
    GetOutpostInstanceTypesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostInstanceTypesInput,
  output: GetOutpostInstanceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
}));
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
export const getOutpostSupportedInstanceTypes: API.OperationMethod<
  GetOutpostSupportedInstanceTypesInput,
  GetOutpostSupportedInstanceTypesOutput,
  GetOutpostSupportedInstanceTypesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: GetOutpostSupportedInstanceTypesInput,
  ) => stream.Stream<
    GetOutpostSupportedInstanceTypesOutput,
    GetOutpostSupportedInstanceTypesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: GetOutpostSupportedInstanceTypesInput,
  ) => stream.Stream<
    InstanceTypeItem,
    GetOutpostSupportedInstanceTypesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostSupportedInstanceTypesInput,
  output: GetOutpostSupportedInstanceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteInput,
  output: GetSiteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSiteAddressInput,
  output: GetSiteAddressOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
export const listAssetInstances: API.OperationMethod<
  ListAssetInstancesInput,
  ListAssetInstancesOutput,
  ListAssetInstancesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAssetInstancesInput,
  ) => stream.Stream<
    ListAssetInstancesOutput,
    ListAssetInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssetInstancesInput,
  ) => stream.Stream<
    AssetInstance,
    ListAssetInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssetInstancesInput,
  output: ListAssetInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssetInstances",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listAssets: API.OperationMethod<
  ListAssetsInput,
  ListAssetsOutput,
  ListAssetsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAssetsInput,
  ) => stream.Stream<
    ListAssetsOutput,
    ListAssetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssetsInput,
  ) => stream.Stream<
    AssetInfo,
    ListAssetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssetsInput,
  output: ListAssetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listBlockingInstancesForCapacityTask: API.OperationMethod<
  ListBlockingInstancesForCapacityTaskInput,
  ListBlockingInstancesForCapacityTaskOutput,
  ListBlockingInstancesForCapacityTaskError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListBlockingInstancesForCapacityTaskInput,
  ) => stream.Stream<
    ListBlockingInstancesForCapacityTaskOutput,
    ListBlockingInstancesForCapacityTaskError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListBlockingInstancesForCapacityTaskInput,
  ) => stream.Stream<
    BlockingInstance,
    ListBlockingInstancesForCapacityTaskError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListBlockingInstancesForCapacityTaskInput,
  output: ListBlockingInstancesForCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BlockingInstances",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listCapacityTasks: API.OperationMethod<
  ListCapacityTasksInput,
  ListCapacityTasksOutput,
  ListCapacityTasksError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCapacityTasksInput,
  ) => stream.Stream<
    ListCapacityTasksOutput,
    ListCapacityTasksError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCapacityTasksInput,
  ) => stream.Stream<
    CapacityTaskSummary,
    ListCapacityTasksError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCapacityTasksInput,
  output: ListCapacityTasksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CapacityTasks",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listCatalogItems: API.OperationMethod<
  ListCatalogItemsInput,
  ListCatalogItemsOutput,
  ListCatalogItemsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCatalogItemsInput,
  ) => stream.Stream<
    ListCatalogItemsOutput,
    ListCatalogItemsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCatalogItemsInput,
  ) => stream.Stream<
    CatalogItem,
    ListCatalogItemsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCatalogItemsInput,
  output: ListCatalogItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CatalogItems",
    pageSize: "MaxResults",
  } as const,
}));
export type ListOrdersError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outpost orders for your Amazon Web Services account.
 */
export const listOrders: API.OperationMethod<
  ListOrdersInput,
  ListOrdersOutput,
  ListOrdersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOrdersInput,
  ) => stream.Stream<
    ListOrdersOutput,
    ListOrdersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOrdersInput,
  ) => stream.Stream<
    OrderSummary,
    ListOrdersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrdersInput,
  output: ListOrdersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Orders",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listOutposts: API.OperationMethod<
  ListOutpostsInput,
  ListOutpostsOutput,
  ListOutpostsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOutpostsInput,
  ) => stream.Stream<
    ListOutpostsOutput,
    ListOutpostsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOutpostsInput,
  ) => stream.Stream<
    Outpost,
    ListOutpostsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOutpostsInput,
  output: ListOutpostsOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Outposts",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listSites: API.OperationMethod<
  ListSitesInput,
  ListSitesOutput,
  ListSitesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSitesInput,
  ) => stream.Stream<
    ListSitesOutput,
    ListSitesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSitesInput,
  ) => stream.Stream<
    Site,
    ListSitesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSitesInput,
  output: ListSitesOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sites",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InternalServerException, NotFoundException, ValidationException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartCapacityTaskInput,
  output: StartCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartConnectionRequest,
  output: StartConnectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartOutpostDecommissionInput,
  output: StartOutpostDecommissionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalServerException, NotFoundException, ValidationException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, NotFoundException, ValidationException],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOutpostInput,
  output: UpdateOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteInput,
  output: UpdateSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteAddressInput,
  output: UpdateSiteAddressOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSiteRackPhysicalPropertiesInput,
  output: UpdateSiteRackPhysicalPropertiesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
}));
