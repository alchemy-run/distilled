import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Snowball",
  target: "AWSIESnowballJobManagementService",
  version: "2016-06-30",
  sigv4: "snowball",
  protocol: awsJson1_1Protocol,
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
                `https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://snowball.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://snowball.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ClusterLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("ClusterLimitExceededException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly ConflictResource?: string;
    readonly message?: string;
  }> {}
export class Ec2RequestFailedException
  extends /*@__PURE__*/ TE.TaggedError("Ec2RequestFailedException")<{
    readonly message?: string;
  }> {}
export class InvalidAddressException
  extends /*@__PURE__*/ TE.TaggedError("InvalidAddressException")<{
    readonly message?: string;
  }> {}
export class InvalidInputCombinationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputCombinationException")<{
    readonly message?: string;
  }> {}
export class InvalidJobStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidJobStateException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidResourceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourceException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class KMSRequestFailedException
  extends /*@__PURE__*/ TE.TaggedError("KMSRequestFailedException")<{
    readonly message?: string;
  }> {}
export class ReturnShippingLabelAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ReturnShippingLabelAlreadyExistsException",
    ["AlreadyExistsError"],
  )<{ readonly message?: string }> {}
export class UnsupportedAddressException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedAddressException")<{
    readonly message?: string;
  }> {}
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
export type DeviceServiceName =
  | "NFS_ON_DEVICE_SERVICE"
  | "S3_ON_DEVICE_SERVICE"
  | (string & {});
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
export type ShippingOption =
  | "SECOND_DAY"
  | "NEXT_DAY"
  | "EXPRESS"
  | "STANDARD"
  | (string & {});
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
export type ImpactLevel =
  | "IL2"
  | "IL4"
  | "IL5"
  | "IL6"
  | "IL99"
  | (string & {});
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
export type LongTermPricingType =
  | "OneYear"
  | "ThreeYear"
  | "OneMonth"
  | (string & {});
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
  descriptor: { service: svc, input: { ClusterId: 0 } },
  errors: [
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCluster",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Address: {
        AddressId: 0,
        Name: 0,
        Company: 0,
        Street1: 0,
        Street2: 0,
        Street3: 0,
        City: 0,
        StateOrProvince: 0,
        PrefectureOrDistrict: 0,
        Landmark: 0,
        Country: 0,
        PostalCode: 0,
        PhoneNumber: 0,
        IsRestricted: 0,
        Type: 0,
      },
    },
  },
  errors: [InvalidAddressException, UnsupportedAddressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddress",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      JobType: 0,
      Resources: i_JobResource,
      OnDeviceServiceConfiguration: i_OnDeviceServiceConfiguration,
      Description: 0,
      AddressId: 0,
      KmsKeyARN: 0,
      RoleARN: 0,
      SnowballType: 0,
      ShippingOption: 0,
      Notification: i_Notification,
      ForwardingAddressId: 0,
      TaxDocuments: i_TaxDocuments,
      RemoteManagement: 0,
      InitialClusterSize: 0,
      ForceCreateJobs: 0,
      LongTermPricingIds: 0,
      SnowballCapacityPreference: 0,
    },
    output: { JobListEntries: D.list(o_JobListEntry) },
  },
  errors: [
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      JobType: 0,
      Resources: i_JobResource,
      OnDeviceServiceConfiguration: i_OnDeviceServiceConfiguration,
      Description: 0,
      AddressId: 0,
      KmsKeyARN: 0,
      RoleARN: 0,
      SnowballCapacityPreference: 0,
      ShippingOption: 0,
      Notification: i_Notification,
      ClusterId: 0,
      SnowballType: 0,
      ForwardingAddressId: 0,
      TaxDocuments: i_TaxDocuments,
      DeviceConfiguration: {
        SnowconeDeviceConfiguration: {
          WirelessConnection: { IsWifiEnabled: 0 },
        },
      },
      RemoteManagement: 0,
      LongTermPricingId: 0,
      ImpactLevel: 0,
      PickupDetails: i_PickupDetails,
    },
  },
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
})) as any;

export type CreateLongTermPricingError =
  | InvalidResourceException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      LongTermPricingType: 0,
      IsLongTermPricingAutoRenew: 0,
      SnowballType: 0,
    },
  },
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLongTermPricing",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0, ShippingOption: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { AddressId: 0 } },
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddress",
})) as any;

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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { ClusterId: 0 },
    output: { ClusterMetadata: { CreationDate: D.ts } },
  },
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: {
      JobMetadata: o_JobMetadata,
      SubJobMetadata: D.list(o_JobMetadata),
    },
  },
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
})) as any;

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
  descriptor: {
    service: svc,
    input: { JobId: 0 },
    output: { ExpirationDate: D.ts },
  },
  errors: [
    ConflictException,
    InvalidJobStateException,
    InvalidResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReturnShippingLabel",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobManifest",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobUnlockCode",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnowballUsage",
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0 } },
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareUpdates",
})) as any;

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
  descriptor: {
    service: svc,
    input: { ClusterId: 0, MaxResults: 0, NextToken: 0 },
    output: { JobListEntries: D.list(o_JobListEntry) },
  },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { ClusterListEntries: D.list({ CreationDate: D.ts }) },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { JobListEntries: D.list(o_JobListEntry) },
  },
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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: {
      LongTermPricingEntries: D.list({
        LongTermPricingEndDate: D.ts,
        LongTermPricingStartDate: D.ts,
      }),
    },
  },
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
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  descriptor: {
    service: svc,
    input: {
      ServiceName: 0,
      DependentServices: D.list({
        ServiceName: 0,
        ServiceVersion: { Version: 0 },
      }),
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceVersions",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      RoleARN: 0,
      Description: 0,
      Resources: i_JobResource,
      OnDeviceServiceConfiguration: i_OnDeviceServiceConfiguration,
      AddressId: 0,
      ShippingOption: 0,
      Notification: i_Notification,
      ForwardingAddressId: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      JobId: 0,
      RoleARN: 0,
      Notification: i_Notification,
      Resources: i_JobResource,
      OnDeviceServiceConfiguration: i_OnDeviceServiceConfiguration,
      AddressId: 0,
      ShippingOption: 0,
      Description: 0,
      SnowballCapacityPreference: 0,
      ForwardingAddressId: 0,
      PickupDetails: i_PickupDetails,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { JobId: 0, ShipmentState: 0 } },
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobShipmentState",
})) as any;

export type UpdateLongTermPricingError =
  | InvalidResourceException
  | CommonErrors;
/**
 * Updates the long-term pricing type.
 */
export const updateLongTermPricing: API.OperationMethod<
  UpdateLongTermPricingRequest,
  UpdateLongTermPricingResult,
  UpdateLongTermPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LongTermPricingId: 0,
      ReplacementJob: 0,
      IsLongTermPricingAutoRenew: 0,
    },
  },
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLongTermPricing",
})) as any;

const i_JobResource: D.LazyStruct = () => ({
  S3Resources: D.list({
    BucketArn: 0,
    KeyRange: { BeginMarker: 0, EndMarker: 0 },
    TargetOnDeviceServices: D.list({ ServiceName: 0, TransferOption: 0 }),
  }),
  LambdaResources: D.list({
    LambdaArn: 0,
    EventTriggers: D.list({ EventResourceARN: 0 }),
  }),
  Ec2AmiResources: D.list({ AmiId: 0, SnowballAmiId: 0 }),
});
const i_Notification: D.LazyStruct = () => ({
  SnsTopicARN: 0,
  JobStatesToNotify: 0,
  NotifyAll: 0,
  DevicePickupSnsTopicARN: 0,
});
const i_OnDeviceServiceConfiguration: D.LazyStruct = () => ({
  NFSOnDeviceService: { StorageLimit: 0, StorageUnit: 0 },
  TGWOnDeviceService: { StorageLimit: 0, StorageUnit: 0 },
  EKSOnDeviceService: { KubernetesVersion: 0, EKSAnywhereVersion: 0 },
  S3OnDeviceService: {
    StorageLimit: 0,
    StorageUnit: 0,
    ServiceSize: 0,
    FaultTolerance: 0,
  },
});
const i_PickupDetails: D.LazyStruct = () => ({
  Name: 0,
  PhoneNumber: 0,
  Email: 0,
  IdentificationNumber: 0,
  IdentificationExpirationDate: 0,
  IdentificationIssuingOrg: 0,
  DevicePickupId: 0,
});
const i_TaxDocuments: D.LazyStruct = () => ({ IND: { GSTIN: 0 } });
const o_JobListEntry: D.LazyStruct = () => ({ CreationDate: D.ts });
const o_JobMetadata: D.LazyStruct = () => ({
  CreationDate: D.ts,
  PickupDetails: {
    PhoneNumber: D.secret,
    Email: D.secret,
    IdentificationExpirationDate: D.ts,
  },
});
