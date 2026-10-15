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
  sdkId: "Snowball",
  serviceShapeName: "AWSIESnowballJobManagementService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "snowball" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-06-30");
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
              `https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://snowball.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://snowball.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://snowball.{R}.{D}","properties":{},"headers":{}}');

export class ClusterLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClusterLimitExceededException>()(
    "ClusterLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    ConflictResource: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class Ec2RequestFailedException
  extends /*@__PURE__*/ S.TaggedError<Ec2RequestFailedException>()("Ec2RequestFailedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidAddressException
  extends /*@__PURE__*/ S.TaggedError<InvalidAddressException>()("InvalidAddressException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidInputCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputCombinationException>()(
    "InvalidInputCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidJobStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobStateException>()("InvalidJobStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidResourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceException>()("InvalidResourceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class KMSRequestFailedException
  extends /*@__PURE__*/ S.TaggedError<KMSRequestFailedException>()("KMSRequestFailedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ReturnShippingLabelAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ReturnShippingLabelAlreadyExistsException>()(
    "ReturnShippingLabelAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class UnsupportedAddressException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAddressException>()(
    "UnsupportedAddressException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type ClusterId = string;
export interface CancelClusterRequest {
  ClusterId: string;
}
export interface CancelClusterResult {}
export type JobId = string;
export interface CancelJobRequest {
  JobId: string;
}
export interface CancelJobResult {}
export type AddressId = string;
export type AddressType = "CUST_PICKUP" | "AWS_SHIP" | (string & {});
export interface Address {
  AddressId?: string;
  Name?: string;
  Company?: string;
  Street1?: string;
  Street2?: string;
  Street3?: string;
  City?: string;
  StateOrProvince?: string;
  PrefectureOrDistrict?: string;
  Landmark?: string;
  Country?: string;
  PostalCode?: string;
  PhoneNumber?: string;
  IsRestricted?: boolean;
  Type?: AddressType;
}
export interface CreateAddressRequest {
  Address: Address;
}
export interface CreateAddressResult {
  AddressId?: string;
}
export type JobType = "IMPORT" | "EXPORT" | "LOCAL_USE" | (string & {});
export type ResourceARN = string;
export interface KeyRange {
  BeginMarker?: string;
  EndMarker?: string;
}
export type DeviceServiceName = "NFS_ON_DEVICE_SERVICE" | "S3_ON_DEVICE_SERVICE" | (string & {});
export type TransferOption = "IMPORT" | "EXPORT" | "LOCAL_USE" | (string & {});
export interface TargetOnDeviceService {
  ServiceName?: DeviceServiceName;
  TransferOption?: TransferOption;
}
export type TargetOnDeviceServiceList = TargetOnDeviceService[];
export interface S3Resource {
  BucketArn?: string;
  KeyRange?: KeyRange;
  TargetOnDeviceServices?: TargetOnDeviceService[];
}
export type S3ResourceList = S3Resource[];
export interface EventTriggerDefinition {
  EventResourceARN?: string;
}
export type EventTriggerDefinitionList = EventTriggerDefinition[];
export interface LambdaResource {
  LambdaArn?: string;
  EventTriggers?: EventTriggerDefinition[];
}
export type LambdaResourceList = LambdaResource[];
export type AmiId = string;
export interface Ec2AmiResource {
  AmiId: string;
  SnowballAmiId?: string;
}
export type Ec2AmiResourceList = Ec2AmiResource[];
export interface JobResource {
  S3Resources?: S3Resource[];
  LambdaResources?: LambdaResource[];
  Ec2AmiResources?: Ec2AmiResource[];
}
export type StorageLimit = number;
export type StorageUnit = "TB" | (string & {});
export interface NFSOnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
}
export interface TGWOnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
}
export interface EKSOnDeviceServiceConfiguration {
  KubernetesVersion?: string;
  EKSAnywhereVersion?: string;
}
export type S3StorageLimit = number;
export type ServiceSize = number;
export type NodeFaultTolerance = number;
export interface S3OnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
  ServiceSize?: number;
  FaultTolerance?: number;
}
export interface OnDeviceServiceConfiguration {
  NFSOnDeviceService?: NFSOnDeviceServiceConfiguration;
  TGWOnDeviceService?: TGWOnDeviceServiceConfiguration;
  EKSOnDeviceService?: EKSOnDeviceServiceConfiguration;
  S3OnDeviceService?: S3OnDeviceServiceConfiguration;
}
export type KmsKeyARN = string;
export type RoleARN = string;
export type SnowballType =
  | "STANDARD"
  | "EDGE"
  | "EDGE_C"
  | "EDGE_CG"
  | "EDGE_S"
  | "SNC1_HDD"
  | "SNC1_SSD"
  | "V3_5C"
  | "V3_5S"
  | "RACK_5U_C"
  | (string & {});
export type ShippingOption = "SECOND_DAY" | "NEXT_DAY" | "EXPRESS" | "STANDARD" | (string & {});
export type SnsTopicARN = string;
export type JobState =
  | "New"
  | "PreparingAppliance"
  | "PreparingShipment"
  | "InTransitToCustomer"
  | "WithCustomer"
  | "InTransitToAWS"
  | "WithAWSSortingFacility"
  | "WithAWS"
  | "InProgress"
  | "Complete"
  | "Cancelled"
  | "Listing"
  | "Pending"
  | (string & {});
export type JobStateList = JobState[];
export interface Notification {
  SnsTopicARN?: string;
  JobStatesToNotify?: JobState[];
  NotifyAll?: boolean;
  DevicePickupSnsTopicARN?: string;
}
export type GSTIN = string;
export interface INDTaxDocuments {
  GSTIN?: string;
}
export interface TaxDocuments {
  IND?: INDTaxDocuments;
}
export type RemoteManagement =
  | "INSTALLED_ONLY"
  | "INSTALLED_AUTOSTART"
  | "NOT_INSTALLED"
  | (string & {});
export type InitialClusterSize = number;
export type LongTermPricingId = string;
export type LongTermPricingIdList = string[];
export type SnowballCapacity =
  | "T50"
  | "T80"
  | "T100"
  | "T42"
  | "T98"
  | "T8"
  | "T14"
  | "T32"
  | "NoPreference"
  | "T240"
  | "T13"
  | (string & {});
export interface CreateClusterRequest {
  JobType: JobType;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  Description?: string;
  AddressId: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  SnowballType: SnowballType;
  ShippingOption: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  RemoteManagement?: RemoteManagement;
  InitialClusterSize?: number;
  ForceCreateJobs?: boolean;
  LongTermPricingIds?: string[];
  SnowballCapacityPreference?: SnowballCapacity;
}
export interface JobListEntry {
  JobId?: string;
  JobState?: JobState;
  IsMaster?: boolean;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Description?: string;
}
export type JobListEntryList = JobListEntry[];
export interface CreateClusterResult {
  ClusterId?: string;
  JobListEntries?: JobListEntry[];
}
export interface WirelessConnection {
  IsWifiEnabled?: boolean;
}
export interface SnowconeDeviceConfiguration {
  WirelessConnection?: WirelessConnection;
}
export interface DeviceConfiguration {
  SnowconeDeviceConfiguration?: SnowconeDeviceConfiguration;
}
export type ImpactLevel = "IL2" | "IL4" | "IL5" | "IL6" | "IL99" | (string & {});
export type PhoneNumber = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export type DevicePickupId = string;
export interface PickupDetails {
  Name?: string;
  PhoneNumber?: string | redacted.Redacted<string>;
  Email?: string | redacted.Redacted<string>;
  IdentificationNumber?: string;
  IdentificationExpirationDate?: Date;
  IdentificationIssuingOrg?: string;
  DevicePickupId?: string;
}
export interface CreateJobRequest {
  JobType?: JobType;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  Description?: string;
  AddressId?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  SnowballCapacityPreference?: SnowballCapacity;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ClusterId?: string;
  SnowballType?: SnowballType;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  DeviceConfiguration?: DeviceConfiguration;
  RemoteManagement?: RemoteManagement;
  LongTermPricingId?: string;
  ImpactLevel?: ImpactLevel;
  PickupDetails?: PickupDetails;
}
export interface CreateJobResult {
  JobId?: string;
}
export type LongTermPricingType = "OneYear" | "ThreeYear" | "OneMonth" | (string & {});
export type JavaBoolean = boolean;
export interface CreateLongTermPricingRequest {
  LongTermPricingType: LongTermPricingType;
  IsLongTermPricingAutoRenew?: boolean;
  SnowballType: SnowballType;
}
export interface CreateLongTermPricingResult {
  LongTermPricingId?: string;
}
export interface CreateReturnShippingLabelRequest {
  JobId: string;
  ShippingOption?: ShippingOption;
}
export type ShippingLabelStatus =
  | "InProgress"
  | "TimedOut"
  | "Succeeded"
  | "Failed"
  | (string & {});
export interface CreateReturnShippingLabelResult {
  Status?: ShippingLabelStatus;
}
export interface DescribeAddressRequest {
  AddressId: string;
}
export interface DescribeAddressResult {
  Address?: Address;
}
export type ListLimit = number;
export interface DescribeAddressesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type AddressList = Address[];
export interface DescribeAddressesResult {
  Addresses?: Address[];
  NextToken?: string;
}
export interface DescribeClusterRequest {
  ClusterId: string;
}
export type ClusterState =
  | "AwaitingQuorum"
  | "Pending"
  | "InUse"
  | "Complete"
  | "Cancelled"
  | (string & {});
export interface ClusterMetadata {
  ClusterId?: string;
  Description?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  ClusterState?: ClusterState;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Resources?: JobResource;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
}
export interface DescribeClusterResult {
  ClusterMetadata?: ClusterMetadata;
}
export interface DescribeJobRequest {
  JobId: string;
}
export interface Shipment {
  Status?: string;
  TrackingNumber?: string;
}
export interface ShippingDetails {
  ShippingOption?: ShippingOption;
  InboundShipment?: Shipment;
  OutboundShipment?: Shipment;
}
export interface DataTransfer {
  BytesTransferred?: number;
  ObjectsTransferred?: number;
  TotalBytes?: number;
  TotalObjects?: number;
}
export interface JobLogs {
  JobCompletionReportURI?: string;
  JobSuccessLogURI?: string;
  JobFailureLogURI?: string;
}
export interface JobMetadata {
  JobId?: string;
  JobState?: JobState;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Resources?: JobResource;
  Description?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  AddressId?: string;
  ShippingDetails?: ShippingDetails;
  SnowballCapacityPreference?: SnowballCapacity;
  Notification?: Notification;
  DataTransferProgress?: DataTransfer;
  JobLogInfo?: JobLogs;
  ClusterId?: string;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  DeviceConfiguration?: DeviceConfiguration;
  RemoteManagement?: RemoteManagement;
  LongTermPricingId?: string;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  ImpactLevel?: ImpactLevel;
  PickupDetails?: PickupDetails;
  SnowballId?: string;
}
export type JobMetadataList = JobMetadata[];
export interface DescribeJobResult {
  JobMetadata?: JobMetadata;
  SubJobMetadata?: JobMetadata[];
}
export interface DescribeReturnShippingLabelRequest {
  JobId: string;
}
export interface DescribeReturnShippingLabelResult {
  Status?: ShippingLabelStatus;
  ExpirationDate?: Date;
  ReturnShippingLabelURI?: string;
}
export interface GetJobManifestRequest {
  JobId: string;
}
export interface GetJobManifestResult {
  ManifestURI?: string;
}
export interface GetJobUnlockCodeRequest {
  JobId: string;
}
export interface GetJobUnlockCodeResult {
  UnlockCode?: string;
}
export interface GetSnowballUsageRequest {}
export interface GetSnowballUsageResult {
  SnowballLimit?: number;
  SnowballsInUse?: number;
}
export interface GetSoftwareUpdatesRequest {
  JobId: string;
}
export interface GetSoftwareUpdatesResult {
  UpdatesURI?: string;
}
export interface ListClusterJobsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListClusterJobsResult {
  JobListEntries?: JobListEntry[];
  NextToken?: string;
}
export interface ListClustersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ClusterListEntry {
  ClusterId?: string;
  ClusterState?: ClusterState;
  CreationDate?: Date;
  Description?: string;
}
export type ClusterListEntryList = ClusterListEntry[];
export interface ListClustersResult {
  ClusterListEntries?: ClusterListEntry[];
  NextToken?: string;
}
export interface ListCompatibleImagesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface CompatibleImage {
  AmiId?: string;
  Name?: string;
}
export type CompatibleImageList = CompatibleImage[];
export interface ListCompatibleImagesResult {
  CompatibleImages?: CompatibleImage[];
  NextToken?: string;
}
export interface ListJobsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListJobsResult {
  JobListEntries?: JobListEntry[];
  NextToken?: string;
}
export interface ListLongTermPricingRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type LongTermPricingAssociatedJobIdList = string[];
export interface LongTermPricingListEntry {
  LongTermPricingId?: string;
  LongTermPricingEndDate?: Date;
  LongTermPricingStartDate?: Date;
  LongTermPricingType?: LongTermPricingType;
  CurrentActiveJob?: string;
  ReplacementJob?: string;
  IsLongTermPricingAutoRenew?: boolean;
  LongTermPricingStatus?: string;
  SnowballType?: SnowballType;
  JobIds?: string[];
}
export type LongTermPricingEntryList = LongTermPricingListEntry[];
export interface ListLongTermPricingResult {
  LongTermPricingEntries?: LongTermPricingListEntry[];
  NextToken?: string;
}
export interface ListPickupLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPickupLocationsResult {
  Addresses?: Address[];
  NextToken?: string;
}
export type ServiceName = "KUBERNETES" | "EKS_ANYWHERE" | (string & {});
export interface ServiceVersion {
  Version?: string;
}
export interface DependentService {
  ServiceName?: ServiceName;
  ServiceVersion?: ServiceVersion;
}
export type DependentServiceList = DependentService[];
export interface ListServiceVersionsRequest {
  ServiceName: ServiceName;
  DependentServices?: DependentService[];
  MaxResults?: number;
  NextToken?: string;
}
export type ServiceVersionList = ServiceVersion[];
export interface ListServiceVersionsResult {
  ServiceVersions: ServiceVersion[];
  ServiceName: ServiceName;
  DependentServices?: DependentService[];
  NextToken?: string;
}
export interface UpdateClusterRequest {
  ClusterId: string;
  RoleARN?: string;
  Description?: string;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
}
export interface UpdateClusterResult {}
export interface UpdateJobRequest {
  JobId: string;
  RoleARN?: string;
  Notification?: Notification;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Description?: string;
  SnowballCapacityPreference?: SnowballCapacity;
  ForwardingAddressId?: string;
  PickupDetails?: PickupDetails;
}
export interface UpdateJobResult {}
export type ShipmentState = "RECEIVED" | "RETURNED" | (string & {});
export interface UpdateJobShipmentStateRequest {
  JobId: string;
  ShipmentState: ShipmentState;
}
export interface UpdateJobShipmentStateResult {}
export interface UpdateLongTermPricingRequest {
  LongTermPricingId: string;
  ReplacementJob?: string;
  IsLongTermPricingAutoRenew?: boolean;
}
export interface UpdateLongTermPricingResult {}
export type CancelClusterError =
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Cancels a cluster job. You can only cancel a cluster job while it's in the
 * `AwaitingQuorum` status. You'll have at least an hour after creating a cluster
 * job to cancel it.
 */
export const cancelCluster: API.OperationMethod<
  CancelClusterRequest,
  CancelClusterResult,
  CancelClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelClusterRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CancelClusterResult>,
  errors: [InvalidJobStateException, InvalidResourceException, KMSRequestFailedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCluster",
}));

export type CancelJobError =
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Cancels the specified job. You can only cancel a job before its `JobState`
 * value changes to `PreparingAppliance`. Requesting the `ListJobs` or
 * `DescribeJob` action returns a job's `JobState` as part of the
 * response element data returned.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResult,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CancelJobResult>,
  errors: [InvalidJobStateException, InvalidResourceException, KMSRequestFailedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateAddressError =
  | InvalidAddressException
  | UnsupportedAddressException
  | CommonErrors;
/**
 * Creates an address for a Snow device to be shipped to. In most regions,
 * addresses are validated at the time of creation. The address you provide must be located
 * within the serviceable area of your region. If the address is invalid or unsupported, then an
 * exception is thrown. If providing an address as a JSON file through the `cli-input-json` option, include the full file path. For example, `--cli-input-json file://create-address.json`.
 */
export const createAddress: API.OperationMethod<
  CreateAddressRequest,
  CreateAddressResult,
  CreateAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CreateAddressRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateAddressResult>,
  errors: [InvalidAddressException, UnsupportedAddressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddress",
}));

export type CreateClusterError =
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Creates an empty cluster. Each cluster supports five nodes. You use the CreateJob action separately to create the jobs for each of these nodes. The
 * cluster does not ship until these five node jobs have been created.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResult,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<CreateClusterResult>,
  errors: [
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateJobError =
  | ClusterLimitExceededException
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Creates a job to import or export data between Amazon S3 and your on-premises data
 * center. Your Amazon Web Services account must have the right trust policies and permissions in
 * place to create a job for a Snow device. If you're creating a job for a node in a cluster, you
 * only need to provide the `clusterId` value; the other job attributes are inherited
 * from the cluster.
 *
 * Only the Snowball; Edge device type is supported when ordering clustered jobs.
 *
 * The device capacity is optional.
 *
 * Availability of device types differ by Amazon Web Services Region. For more information
 * about Region availability, see Amazon Web Services Regional Services.
 *
 * **Snow Family devices and their capacities.**
 *
 * - Device type: **SNC1_SSD**
 *
 * - Capacity: T14
 *
 * - Description: Snowcone
 *
 * - Device type: **SNC1_HDD**
 *
 * - Capacity: T8
 *
 * - Description: Snowcone
 *
 * - Device type: **EDGE_S**
 *
 * - Capacity: T98
 *
 * - Description: Snowball Edge Storage Optimized for data transfer only
 *
 * - Device type: **EDGE_CG**
 *
 * - Capacity: T42
 *
 * - Description: Snowball Edge Compute Optimized with GPU
 *
 * - Device type: **EDGE_C**
 *
 * - Capacity: T42
 *
 * - Description: Snowball Edge Compute Optimized without GPU
 *
 * - Device type: **EDGE**
 *
 * - Capacity: T100
 *
 * - Description: Snowball Edge Storage Optimized with EC2 Compute
 *
 * This device is replaced with T98.
 *
 * - Device type: **STANDARD**
 *
 * - Capacity: T50
 *
 * - Description: Original Snowball device
 *
 * This device is only available in the Ningxia, Beijing, and Singapore Amazon Web Services Region
 *
 * - Device type: **STANDARD**
 *
 * - Capacity: T80
 *
 * - Description: Original Snowball device
 *
 * This device is only available in the Ningxia, Beijing, and Singapore Amazon Web Services Region.
 *
 * - Snow Family device type: **RACK_5U_C**
 *
 * - Capacity: T13
 *
 * - Description: Snowblade.
 *
 * - Device type: **V3_5S**
 *
 * - Capacity: T240
 *
 * - Description: Snowball Edge Storage Optimized 210TB
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResult,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<CreateJobResult>,
  errors: [
    ClusterLimitExceededException,
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateLongTermPricingError = InvalidResourceException | CommonErrors;
/**
 * Creates a job with the long-term usage option for a device. The long-term usage is a
 * 1-year or 3-year long-term pricing type for the device. You are billed upfront, and Amazon Web Services provides discounts for long-term pricing.
 */
export const createLongTermPricing: API.OperationMethod<
  CreateLongTermPricingRequest,
  CreateLongTermPricingResult,
  CreateLongTermPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<CreateLongTermPricingRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<CreateLongTermPricingResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLongTermPricing",
}));

export type CreateReturnShippingLabelError =
  | ConflictException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | ReturnShippingLabelAlreadyExistsException
  | CommonErrors;
/**
 * Creates a shipping label that will be used to return the Snow device to Amazon Web Services.
 */
export const createReturnShippingLabel: API.OperationMethod<
  CreateReturnShippingLabelRequest,
  CreateReturnShippingLabelResult,
  CreateReturnShippingLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<CreateReturnShippingLabelRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<CreateReturnShippingLabelResult>,
  errors: [
    ConflictException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    ReturnShippingLabelAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReturnShippingLabel",
}));

export type DescribeAddressError = InvalidResourceException | CommonErrors;
/**
 * Takes an `AddressId` and returns specific details about that address in the
 * form of an `Address` object.
 */
export const describeAddress: API.OperationMethod<
  DescribeAddressRequest,
  DescribeAddressResult,
  DescribeAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DescribeAddressRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<DescribeAddressResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddress",
}));

export type DescribeAddressesError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns a specified number of `ADDRESS` objects. Calling this API in one of
 * the US regions will return addresses from the list of all addresses associated with this
 * account in all US regions.
 */
export const describeAddresses: API.PaginatedOperationMethod<
  DescribeAddressesRequest,
  DescribeAddressesResult,
  DescribeAddressesError,
  Credentials | HttpClient.HttpClient,
  Address
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<DescribeAddressesRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<DescribeAddressesResult>,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddresses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Addresses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeClusterError = InvalidResourceException | CommonErrors;
/**
 * Returns information about a specific cluster including shipping information, cluster
 * status, and other important metadata.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResult,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<DescribeClusterRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<DescribeClusterResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeJobError = InvalidResourceException | CommonErrors;
/**
 * Returns information about a specific job including shipping information, job status,
 * and other important metadata.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResult,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<DescribeJobRequest>,
  output: __S(615, __c19, 7) as any as S.Schema<DescribeJobResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

export type DescribeReturnShippingLabelError =
  | ConflictException
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Information on the shipping label of a Snow device that is being returned to Amazon Web Services.
 */
export const describeReturnShippingLabel: API.OperationMethod<
  DescribeReturnShippingLabelRequest,
  DescribeReturnShippingLabelResult,
  DescribeReturnShippingLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<DescribeReturnShippingLabelRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<DescribeReturnShippingLabelResult>,
  errors: [ConflictException, InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReturnShippingLabel",
}));

export type GetJobManifestError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns a link to an Amazon S3 presigned URL for the manifest file associated with the
 * specified `JobId` value. You can access the manifest file for up to 60 minutes
 * after this request has been made. To access the manifest file after 60 minutes have passed,
 * you'll have to make another call to the `GetJobManifest` action.
 *
 * The manifest is an encrypted file that you can download after your job enters the
 * `WithCustomer` status. This is the only valid status for calling this API as the
 * manifest and `UnlockCode` code value are used for securing your device and should
 * only be used when you have the device. The manifest is decrypted by using the
 * `UnlockCode` code value, when you pass both values to the Snow device through the
 * Snowball client when the client is started for the first time.
 *
 * As a best practice, we recommend that you don't save a copy of an
 * `UnlockCode` value in the same location as the manifest file for that job. Saving
 * these separately helps prevent unauthorized parties from gaining access to the Snow device
 * associated with that job.
 *
 * The credentials of a given job, including its manifest file and unlock code, expire 360
 * days after the job is created.
 */
export const getJobManifest: API.OperationMethod<
  GetJobManifestRequest,
  GetJobManifestResult,
  GetJobManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetJobManifestRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<GetJobManifestResult>,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobManifest",
}));

export type GetJobUnlockCodeError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns the `UnlockCode` code value for the specified job. A particular
 * `UnlockCode` value can be accessed for up to 360 days after the associated job
 * has been created.
 *
 * The `UnlockCode` value is a 29-character code with 25 alphanumeric
 * characters and 4 hyphens. This code is used to decrypt the manifest file when it is passed
 * along with the manifest to the Snow device through the Snowball client when the client is
 * started for the first time. The only valid status for calling this API is
 * `WithCustomer` as the manifest and `Unlock` code values are used for
 * securing your device and should only be used when you have the device.
 *
 * As a best practice, we recommend that you don't save a copy of the
 * `UnlockCode` in the same location as the manifest file for that job. Saving these
 * separately helps prevent unauthorized parties from gaining access to the Snow device
 * associated with that job.
 */
export const getJobUnlockCode: API.OperationMethod<
  GetJobUnlockCodeRequest,
  GetJobUnlockCodeResult,
  GetJobUnlockCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetJobUnlockCodeRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<GetJobUnlockCodeResult>,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobUnlockCode",
}));

export type GetSnowballUsageError = CommonErrors;
/**
 * Returns information about the Snow Family service limit for your account, and also the
 * number of Snow devices your account has in use.
 *
 * The default service limit for the number of Snow devices that you can have at one time
 * is 1. If you want to increase your service limit, contact Amazon Web Services Support.
 */
export const getSnowballUsage: API.OperationMethod<
  GetSnowballUsageRequest,
  GetSnowballUsageResult,
  GetSnowballUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetSnowballUsageRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<GetSnowballUsageResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnowballUsage",
}));

export type GetSoftwareUpdatesError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns an Amazon S3 presigned URL for an update file associated with a specified
 * `JobId`.
 */
export const getSoftwareUpdates: API.OperationMethod<
  GetSoftwareUpdatesRequest,
  GetSoftwareUpdatesResult,
  GetSoftwareUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<GetSoftwareUpdatesRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<GetSoftwareUpdatesResult>,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareUpdates",
}));

export type ListClusterJobsError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns an array of `JobListEntry` objects of the specified length. Each
 * `JobListEntry` object is for a job in the specified cluster and contains a job's
 * state, a job's ID, and other information.
 */
export const listClusterJobs: API.PaginatedOperationMethod<
  ListClusterJobsRequest,
  ListClusterJobsResult,
  ListClusterJobsError,
  Credentials | HttpClient.HttpClient,
  JobListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<ListClusterJobsRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<ListClusterJobsResult>,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError = InvalidNextTokenException | CommonErrors;
/**
 * Returns an array of `ClusterListEntry` objects of the specified length. Each
 * `ClusterListEntry` object contains a cluster's state, a cluster's ID, and other
 * important status information.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResult,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<ListClustersResult>,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCompatibleImagesError =
  | Ec2RequestFailedException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * This action returns a list of the different Amazon EC2-compatible Amazon Machine Images (AMIs)
 * that are owned by your Amazon Web Services accountthat would be supported for use on a Snow
 * device. Currently, supported AMIs are based on the Amazon Linux-2, Ubuntu 20.04 LTS - Focal, or Ubuntu 22.04 LTS - Jammy images, available on the
 * Amazon Web Services Marketplace. Ubuntu 16.04 LTS - Xenial (HVM) images are no longer supported in the Market, but still supported for use on devices through Amazon EC2 VM Import/Export and running locally in AMIs.
 */
export const listCompatibleImages: API.PaginatedOperationMethod<
  ListCompatibleImagesRequest,
  ListCompatibleImagesResult,
  ListCompatibleImagesError,
  Credentials | HttpClient.HttpClient,
  CompatibleImage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ListCompatibleImagesRequest>,
  output: __S(899, __c28, 3) as any as S.Schema<ListCompatibleImagesResult>,
  errors: [Ec2RequestFailedException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompatibleImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CompatibleImages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns an array of `JobListEntry` objects of the specified length. Each
 * `JobListEntry` object contains a job's state, a job's ID, and a value that
 * indicates whether the job is a job part, in the case of export jobs. Calling this API action
 * in one of the US regions will return jobs from the list of all jobs associated with this
 * account in all US regions.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<ListJobsResult>,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLongTermPricingError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Lists all long-term pricing types.
 */
export const listLongTermPricing: API.PaginatedOperationMethod<
  ListLongTermPricingRequest,
  ListLongTermPricingResult,
  ListLongTermPricingError,
  Credentials | HttpClient.HttpClient,
  LongTermPricingListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<ListLongTermPricingRequest>,
  output: __S(963, __c30, 3) as any as S.Schema<ListLongTermPricingResult>,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLongTermPricing",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LongTermPricingEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPickupLocationsError = InvalidResourceException | CommonErrors;
/**
 * A list of locations from which the customer can choose to pickup a device.
 */
export const listPickupLocations: API.PaginatedOperationMethod<
  ListPickupLocationsRequest,
  ListPickupLocationsResult,
  ListPickupLocationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<ListPickupLocationsRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<ListPickupLocationsResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPickupLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceVersionsError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Lists all supported versions for Snow on-device services. Returns an
 * array of `ServiceVersion` object containing the supported versions for a particular service.
 */
export const listServiceVersions: API.OperationMethod<
  ListServiceVersionsRequest,
  ListServiceVersionsResult,
  ListServiceVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1027, __c32, 3) as any as S.Schema<ListServiceVersionsRequest>,
  output: __S(1029, __c32, 5) as any as S.Schema<ListServiceVersionsResult>,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceVersions",
}));

export type UpdateClusterError =
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * While a cluster's `ClusterState` value is in the `AwaitingQuorum`
 * state, you can update some of the information associated with a cluster. Once the cluster
 * changes to a different job state, usually 60 minutes after the cluster being created, this
 * action is no longer available.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResult,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<UpdateClusterRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateClusterResult>,
  errors: [
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateJobError =
  | ClusterLimitExceededException
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * While a job's `JobState` value is `New`, you can update some of
 * the information associated with a job. Once the job changes to a different job state, usually
 * within 60 minutes of the job being created, this action is no longer available.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResult,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<UpdateJobRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateJobResult>,
  errors: [
    ClusterLimitExceededException,
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
}));

export type UpdateJobShipmentStateError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Updates the state when a shipment state changes to a different state.
 */
export const updateJobShipmentState: API.OperationMethod<
  UpdateJobShipmentStateRequest,
  UpdateJobShipmentStateResult,
  UpdateJobShipmentStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<UpdateJobShipmentStateRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateJobShipmentStateResult>,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobShipmentState",
}));

export type UpdateLongTermPricingError = InvalidResourceException | CommonErrors;
/**
 * Updates the long-term pricing type.
 */
export const updateLongTermPricing: API.OperationMethod<
  UpdateLongTermPricingRequest,
  UpdateLongTermPricingResult,
  UpdateLongTermPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<UpdateLongTermPricingRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UpdateLongTermPricingResult>,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLongTermPricing",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelClusterRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelClusterResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Address: __S(128, __c4, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAddressRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AddressId: S.optional(S.String) })).annotate({
        identifier: "CreateAddressResult",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AddressId: S.optional(S.String),
          Name: S.optional(S.String),
          Company: S.optional(S.String),
          Street1: S.optional(S.String),
          Street2: S.optional(S.String),
          Street3: S.optional(S.String),
          City: S.optional(S.String),
          StateOrProvince: S.optional(S.String),
          PrefectureOrDistrict: S.optional(S.String),
          Landmark: S.optional(S.String),
          Country: S.optional(S.String),
          PostalCode: S.optional(S.String),
          PhoneNumber: S.optional(S.String),
          IsRestricted: S.optional(S.Boolean),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Address" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobType: S.String,
          Resources: S.optional(__S(235, __c7, 11)),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
          Description: S.optional(S.String),
          AddressId: S.String,
          KmsKeyARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          SnowballType: S.String,
          ShippingOption: S.String,
          Notification: S.optional(__S(241, __c7, 17)),
          ForwardingAddressId: S.optional(S.String),
          TaxDocuments: S.optional(__S(193, __c6, 1)),
          RemoteManagement: S.optional(S.String),
          InitialClusterSize: S.optional(S.Number),
          ForceCreateJobs: S.optional(S.Boolean),
          LongTermPricingIds: S.optional(__S(288, __c9, 0)),
          SnowballCapacityPreference: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          JobListEntries: S.optional(__S(257, __c8, 1)),
        }),
      ).annotate({ identifier: "CreateClusterResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GSTIN: S.optional(S.String) })).annotate({
        identifier: "INDTaxDocuments",
      });
    case 1:
      return S.suspend(() => S.Struct({ IND: S.optional(__S(192, __c6, 0)) })).annotate({
        identifier: "TaxDocuments",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BeginMarker: S.optional(S.String), EndMarker: S.optional(S.String) }),
      ).annotate({ identifier: "KeyRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ServiceName: S.optional(S.String), TransferOption: S.optional(S.String) }),
      ).annotate({ identifier: "TargetOnDeviceService" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BucketArn: S.optional(S.String),
          KeyRange: S.optional(__S(224, __c7, 0)),
          TargetOnDeviceServices: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "S3Resource" });
    case 4:
      return S.Array(__S(227, __c7, 3));
    case 5:
      return S.suspend(() => S.Struct({ EventResourceARN: S.optional(S.String) })).annotate({
        identifier: "EventTriggerDefinition",
      });
    case 6:
      return S.Array(__S(229, __c7, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ LambdaArn: S.optional(S.String), EventTriggers: S.optional(__S(230, __c7, 6)) }),
      ).annotate({ identifier: "LambdaResource" });
    case 8:
      return S.Array(__S(231, __c7, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ AmiId: S.String, SnowballAmiId: S.optional(S.String) }),
      ).annotate({ identifier: "Ec2AmiResource" });
    case 10:
      return S.Array(__S(233, __c7, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          S3Resources: S.optional(__S(228, __c7, 4)),
          LambdaResources: S.optional(__S(232, __c7, 8)),
          Ec2AmiResources: S.optional(__S(234, __c7, 10)),
        }),
      ).annotate({ identifier: "JobResource" });
    case 12:
      return S.suspend(() =>
        S.Struct({ StorageLimit: S.optional(S.Number), StorageUnit: S.optional(S.String) }),
      ).annotate({ identifier: "NFSOnDeviceServiceConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          KubernetesVersion: S.optional(S.String),
          EKSAnywhereVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "EKSOnDeviceServiceConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          StorageLimit: S.optional(S.Number),
          StorageUnit: S.optional(S.String),
          ServiceSize: S.optional(S.Number),
          FaultTolerance: S.optional(S.Number),
        }),
      ).annotate({ identifier: "S3OnDeviceServiceConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          NFSOnDeviceService: S.optional(__S(236, __c7, 12)),
          TGWOnDeviceService: S.optional(__S(236, __c7, 12)),
          EKSOnDeviceService: S.optional(__S(237, __c7, 13)),
          S3OnDeviceService: S.optional(__S(238, __c7, 14)),
        }),
      ).annotate({ identifier: "OnDeviceServiceConfiguration" });
    case 16:
      return S.Array(S.String);
    case 17:
      return S.suspend(() =>
        S.Struct({
          SnsTopicARN: S.optional(S.String),
          JobStatesToNotify: S.optional(__S(240, __c7, 16)),
          NotifyAll: S.optional(S.Boolean),
          DevicePickupSnsTopicARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "Notification" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          JobState: S.optional(S.String),
          IsMaster: S.optional(S.Boolean),
          JobType: S.optional(S.String),
          SnowballType: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobListEntry" });
    case 1:
      return S.Array(__S(256, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobType: S.optional(S.String),
          Resources: S.optional(__S(235, __c7, 11)),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
          Description: S.optional(S.String),
          AddressId: S.optional(S.String),
          KmsKeyARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          SnowballCapacityPreference: S.optional(S.String),
          ShippingOption: S.optional(S.String),
          Notification: S.optional(__S(241, __c7, 17)),
          ClusterId: S.optional(S.String),
          SnowballType: S.optional(S.String),
          ForwardingAddressId: S.optional(S.String),
          TaxDocuments: S.optional(__S(193, __c6, 1)),
          DeviceConfiguration: S.optional(__S(354, __c11, 2)),
          RemoteManagement: S.optional(S.String),
          LongTermPricingId: S.optional(S.String),
          ImpactLevel: S.optional(S.String),
          PickupDetails: S.optional(__S(384, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) })).annotate({
        identifier: "CreateJobResult",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IsWifiEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "WirelessConnection",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ WirelessConnection: S.optional(__S(352, __c11, 0)) }),
      ).annotate({ identifier: "SnowconeDeviceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SnowconeDeviceConfiguration: S.optional(__S(353, __c11, 1)) }),
      ).annotate({ identifier: "DeviceConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          PhoneNumber: S.optional(SensitiveString),
          Email: S.optional(SensitiveString),
          IdentificationNumber: S.optional(S.String),
          IdentificationExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdentificationIssuingOrg: S.optional(S.String),
          DevicePickupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PickupDetails" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LongTermPricingType: S.String,
          IsLongTermPricingAutoRenew: S.optional(S.Boolean),
          SnowballType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLongTermPricingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ LongTermPricingId: S.optional(S.String) })).annotate({
        identifier: "CreateLongTermPricingResult",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String, ShippingOption: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateReturnShippingLabelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "CreateReturnShippingLabelResult",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AddressId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAddressRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Address: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "DescribeAddressResult",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAddressesRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c4, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ Addresses: S.optional(__S(544, __c17, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeAddressesResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          Description: S.optional(S.String),
          KmsKeyARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          ClusterState: S.optional(S.String),
          JobType: S.optional(S.String),
          SnowballType: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Resources: S.optional(__S(235, __c7, 11)),
          AddressId: S.optional(S.String),
          ShippingOption: S.optional(S.String),
          Notification: S.optional(__S(241, __c7, 17)),
          ForwardingAddressId: S.optional(S.String),
          TaxDocuments: S.optional(__S(193, __c6, 1)),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
        }),
      ).annotate({ identifier: "ClusterMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ClusterMetadata: S.optional(__S(577, __c18, 1)) }),
      ).annotate({ identifier: "DescribeClusterResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), TrackingNumber: S.optional(S.String) }),
      ).annotate({ identifier: "Shipment" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ShippingOption: S.optional(S.String),
          InboundShipment: S.optional(__S(609, __c19, 1)),
          OutboundShipment: S.optional(__S(609, __c19, 1)),
        }),
      ).annotate({ identifier: "ShippingDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          BytesTransferred: S.optional(S.Number),
          ObjectsTransferred: S.optional(S.Number),
          TotalBytes: S.optional(S.Number),
          TotalObjects: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataTransfer" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          JobCompletionReportURI: S.optional(S.String),
          JobSuccessLogURI: S.optional(S.String),
          JobFailureLogURI: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobLogs" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          JobState: S.optional(S.String),
          JobType: S.optional(S.String),
          SnowballType: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Resources: S.optional(__S(235, __c7, 11)),
          Description: S.optional(S.String),
          KmsKeyARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          AddressId: S.optional(S.String),
          ShippingDetails: S.optional(__S(610, __c19, 2)),
          SnowballCapacityPreference: S.optional(S.String),
          Notification: S.optional(__S(241, __c7, 17)),
          DataTransferProgress: S.optional(__S(611, __c19, 3)),
          JobLogInfo: S.optional(__S(612, __c19, 4)),
          ClusterId: S.optional(S.String),
          ForwardingAddressId: S.optional(S.String),
          TaxDocuments: S.optional(__S(193, __c6, 1)),
          DeviceConfiguration: S.optional(__S(354, __c11, 2)),
          RemoteManagement: S.optional(S.String),
          LongTermPricingId: S.optional(S.String),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
          ImpactLevel: S.optional(S.String),
          PickupDetails: S.optional(__S(384, __c12, 0)),
          SnowballId: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobMetadata" });
    case 6:
      return S.Array(__S(613, __c19, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          JobMetadata: S.optional(__S(613, __c19, 5)),
          SubJobMetadata: S.optional(__S(614, __c19, 6)),
        }),
      ).annotate({ identifier: "DescribeJobResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeReturnShippingLabelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReturnShippingLabelURI: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeReturnShippingLabelResult" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobManifestRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ManifestURI: S.optional(S.String) })).annotate({
        identifier: "GetJobManifestResult",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobUnlockCodeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ UnlockCode: S.optional(S.String) })).annotate({
        identifier: "GetJobUnlockCodeResult",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSnowballUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SnowballLimit: S.optional(S.Number), SnowballsInUse: S.optional(S.Number) }),
      ).annotate({ identifier: "GetSnowballUsageResult" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSoftwareUpdatesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ UpdatesURI: S.optional(S.String) })).annotate({
        identifier: "GetSoftwareUpdatesResult",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClusterJobsRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobListEntries: S.optional(__S(257, __c8, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListClusterJobsResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          ClusterState: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterListEntry" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClusterListEntries: S.optional(__S(866, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListClustersResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCompatibleImagesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AmiId: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "CompatibleImage" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CompatibleImages: S.optional(__S(898, __c28, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCompatibleImagesResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLongTermPricingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LongTermPricingId: S.optional(S.String),
          LongTermPricingEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LongTermPricingStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LongTermPricingType: S.optional(S.String),
          CurrentActiveJob: S.optional(S.String),
          ReplacementJob: S.optional(S.String),
          IsLongTermPricingAutoRenew: S.optional(S.Boolean),
          LongTermPricingStatus: S.optional(S.String),
          SnowballType: S.optional(S.String),
          JobIds: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "LongTermPricingListEntry" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LongTermPricingEntries: S.optional(__S(962, __c30, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLongTermPricingResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPickupLocationsRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Version: S.optional(S.String) })).annotate({
        identifier: "ServiceVersion",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceName: S.optional(S.String),
          ServiceVersion: S.optional(__S(1024, __c32, 0)),
        }),
      ).annotate({ identifier: "DependentService" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ServiceName: S.String,
          DependentServices: S.optional(__S(1026, __c32, 2)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceVersionsRequest" });
    case 4:
      return S.Array(__S(1024, __c32, 0));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ServiceVersions: __S(1028, __c32, 4),
          ServiceName: S.String,
          DependentServices: S.optional(__S(1026, __c32, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServiceVersionsResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.String,
          RoleARN: S.optional(S.String),
          Description: S.optional(S.String),
          Resources: S.optional(__S(235, __c7, 11)),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
          AddressId: S.optional(S.String),
          ShippingOption: S.optional(S.String),
          Notification: S.optional(__S(241, __c7, 17)),
          ForwardingAddressId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobId: S.String,
          RoleARN: S.optional(S.String),
          Notification: S.optional(__S(241, __c7, 17)),
          Resources: S.optional(__S(235, __c7, 11)),
          OnDeviceServiceConfiguration: S.optional(__S(239, __c7, 15)),
          AddressId: S.optional(S.String),
          ShippingOption: S.optional(S.String),
          Description: S.optional(S.String),
          SnowballCapacityPreference: S.optional(S.String),
          ForwardingAddressId: S.optional(S.String),
          PickupDetails: S.optional(__S(384, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateJobRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobId: S.String, ShipmentState: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateJobShipmentStateRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LongTermPricingId: S.String,
          ReplacementJob: S.optional(S.String),
          IsLongTermPricingAutoRenew: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLongTermPricingRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
