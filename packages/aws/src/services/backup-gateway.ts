import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "Backup Gateway",
  target: "BackupOnPremises_v20210101",
  version: "2021-01-01",
  sigv4: "backup-gateway",
  protocol: awsJson1_0Protocol,
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
                `https://backup-gateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://backup-gateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export type GatewayArn = string;
export type ServerArn = string;
export interface AssociateGatewayToServerInput {
  GatewayArn: string;
  ServerArn: string;
}
export interface AssociateGatewayToServerOutput {
  GatewayArn?: string;
}
export type ActivationKey = string;
export type Name = string;
export type GatewayType = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export interface CreateGatewayInput {
  ActivationKey: string;
  GatewayDisplayName: string;
  GatewayType: string;
  Tags?: Tag[];
}
export interface CreateGatewayOutput {
  GatewayArn?: string;
}
export interface DeleteGatewayInput {
  GatewayArn: string;
}
export interface DeleteGatewayOutput {
  GatewayArn?: string;
}
export interface DeleteHypervisorInput {
  HypervisorArn: string;
}
export interface DeleteHypervisorOutput {
  HypervisorArn?: string;
}
export interface DisassociateGatewayFromServerInput {
  GatewayArn: string;
}
export interface DisassociateGatewayFromServerOutput {
  GatewayArn?: string;
}
export interface GetBandwidthRateLimitScheduleInput {
  GatewayArn: string;
}
export type AverageUploadRateLimit = number;
export type HourOfDay = number;
export type MinuteOfHour = number;
export type DayOfWeek = number;
export type DaysOfWeek = number[];
export interface BandwidthRateLimitInterval {
  AverageUploadRateLimitInBitsPerSec?: number;
  StartHourOfDay: number;
  EndHourOfDay: number;
  StartMinuteOfHour: number;
  EndMinuteOfHour: number;
  DaysOfWeek: number[];
}
export type BandwidthRateLimitIntervals = BandwidthRateLimitInterval[];
export interface GetBandwidthRateLimitScheduleOutput {
  GatewayArn?: string;
  BandwidthRateLimitIntervals?: BandwidthRateLimitInterval[];
}
export interface GetGatewayInput {
  GatewayArn: string;
}
export type HypervisorId = string;
export type DayOfMonth = number;
export interface MaintenanceStartTime {
  DayOfMonth?: number;
  DayOfWeek?: number;
  HourOfDay: number;
  MinuteOfHour: number;
}
export type VpcEndpoint = string;
export interface GatewayDetails {
  GatewayArn?: string;
  GatewayDisplayName?: string;
  GatewayType?: string;
  HypervisorId?: string;
  LastSeenTime?: Date;
  MaintenanceStartTime?: MaintenanceStartTime;
  NextUpdateAvailabilityTime?: Date;
  VpcEndpoint?: string;
  DeprecationDate?: Date;
  SoftwareVersion?: string;
}
export interface GetGatewayOutput {
  Gateway?: GatewayDetails;
}
export interface GetHypervisorInput {
  HypervisorArn: string;
}
export type Host = string;
export type KmsKeyArn = string;
export type LogGroupArn = string;
export type HypervisorState = string;
export type SyncMetadataStatus = string;
export interface HypervisorDetails {
  Host?: string;
  HypervisorArn?: string;
  KmsKeyArn?: string;
  Name?: string;
  LogGroupArn?: string;
  State?: string;
  LastSuccessfulMetadataSyncTime?: Date;
  LatestMetadataSyncStatusMessage?: string;
  LatestMetadataSyncStatus?: string;
}
export interface GetHypervisorOutput {
  Hypervisor?: HypervisorDetails;
}
export interface GetHypervisorPropertyMappingsInput {
  HypervisorArn: string;
}
export type VmwareCategory = string;
export type VmwareTagName = string;
export interface VmwareToAwsTagMapping {
  VmwareCategory: string;
  VmwareTagName: string;
  AwsTagKey: string;
  AwsTagValue: string;
}
export type VmwareToAwsTagMappings = VmwareToAwsTagMapping[];
export type IamRoleArn = string;
export interface GetHypervisorPropertyMappingsOutput {
  HypervisorArn?: string;
  VmwareToAwsTagMappings?: VmwareToAwsTagMapping[];
  IamRoleArn?: string;
}
export type ResourceArn = string;
export interface GetVirtualMachineInput {
  ResourceArn: string;
}
export type Path = string;
export interface VmwareTag {
  VmwareCategory?: string;
  VmwareTagName?: string;
  VmwareTagDescription?: string;
}
export type VmwareTags = VmwareTag[];
export interface VirtualMachineDetails {
  HostName?: string;
  HypervisorId?: string;
  Name?: string;
  Path?: string;
  ResourceArn?: string;
  LastBackupDate?: Date;
  VmwareTags?: VmwareTag[];
}
export interface GetVirtualMachineOutput {
  VirtualMachine?: VirtualMachineDetails;
}
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export interface ImportHypervisorConfigurationInput {
  Name: string;
  Host: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  KmsKeyArn?: string;
  Tags?: Tag[];
}
export interface ImportHypervisorConfigurationOutput {
  HypervisorArn?: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListGatewaysInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface Gateway {
  GatewayArn?: string;
  GatewayDisplayName?: string;
  GatewayType?: string;
  HypervisorId?: string;
  LastSeenTime?: Date;
}
export type Gateways = Gateway[];
export interface ListGatewaysOutput {
  Gateways?: Gateway[];
  NextToken?: string;
}
export interface ListHypervisorsInput {
  MaxResults?: number;
  NextToken?: string;
}
export interface Hypervisor {
  Host?: string;
  HypervisorArn?: string;
  KmsKeyArn?: string;
  Name?: string;
  State?: string;
}
export type Hypervisors = Hypervisor[];
export interface ListHypervisorsOutput {
  Hypervisors?: Hypervisor[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  ResourceArn?: string;
  Tags?: Tag[];
}
export interface ListVirtualMachinesInput {
  HypervisorArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface VirtualMachine {
  HostName?: string;
  HypervisorId?: string;
  Name?: string;
  Path?: string;
  ResourceArn?: string;
  LastBackupDate?: Date;
}
export type VirtualMachines = VirtualMachine[];
export interface ListVirtualMachinesOutput {
  VirtualMachines?: VirtualMachine[];
  NextToken?: string;
}
export interface PutBandwidthRateLimitScheduleInput {
  GatewayArn: string;
  BandwidthRateLimitIntervals: BandwidthRateLimitInterval[];
}
export interface PutBandwidthRateLimitScheduleOutput {
  GatewayArn?: string;
}
export interface PutHypervisorPropertyMappingsInput {
  HypervisorArn: string;
  VmwareToAwsTagMappings: VmwareToAwsTagMapping[];
  IamRoleArn: string;
}
export interface PutHypervisorPropertyMappingsOutput {
  HypervisorArn?: string;
}
export interface PutMaintenanceStartTimeInput {
  GatewayArn: string;
  HourOfDay: number;
  MinuteOfHour: number;
  DayOfWeek?: number;
  DayOfMonth?: number;
}
export interface PutMaintenanceStartTimeOutput {
  GatewayArn?: string;
}
export interface StartVirtualMachinesMetadataSyncInput {
  HypervisorArn: string;
}
export interface StartVirtualMachinesMetadataSyncOutput {
  HypervisorArn?: string;
}
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceOutput {
  ResourceARN?: string;
}
export interface TestHypervisorConfigurationInput {
  GatewayArn: string;
  Host: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
}
export interface TestHypervisorConfigurationOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {
  ResourceARN?: string;
}
export interface UpdateGatewayInformationInput {
  GatewayArn: string;
  GatewayDisplayName?: string;
}
export interface UpdateGatewayInformationOutput {
  GatewayArn?: string;
}
export interface UpdateGatewaySoftwareNowInput {
  GatewayArn: string;
}
export interface UpdateGatewaySoftwareNowOutput {
  GatewayArn?: string;
}
export interface UpdateHypervisorInput {
  HypervisorArn: string;
  Host?: string;
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  Name?: string;
  LogGroupArn?: string;
}
export interface UpdateHypervisorOutput {
  HypervisorArn?: string;
}
export type AssociateGatewayToServerError = ConflictException | CommonErrors;
/**
 * Associates a backup gateway with your server. After you complete the association process, you can back up and restore your VMs through the gateway.
 */
export const associateGatewayToServer: API.OperationMethod<
  AssociateGatewayToServerInput,
  AssociateGatewayToServerOutput,
  AssociateGatewayToServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0, ServerArn: 0 } },
  errors: [ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGatewayToServer",
})) as any;

export type CreateGatewayError = CommonErrors;
/**
 * Creates a backup gateway. After you create a gateway, you can associate it with a server using the `AssociateGatewayToServer` operation.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayInput,
  CreateGatewayOutput,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActivationKey: 0,
      GatewayDisplayName: 0,
      GatewayType: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
})) as any;

export type DeleteGatewayError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a backup gateway.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayInput,
  DeleteGatewayOutput,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
})) as any;

export type DeleteHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a hypervisor.
 */
export const deleteHypervisor: API.OperationMethod<
  DeleteHypervisorInput,
  DeleteHypervisorOutput,
  DeleteHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HypervisorArn: 0 } },
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHypervisor",
})) as any;

export type DisassociateGatewayFromServerError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a backup gateway from the specified server. After the disassociation process finishes, the gateway can no longer access the virtual machines on the server.
 */
export const disassociateGatewayFromServer: API.OperationMethod<
  DisassociateGatewayFromServerInput,
  DisassociateGatewayFromServerOutput,
  DisassociateGatewayFromServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0 } },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGatewayFromServer",
})) as any;

export type GetBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the bandwidth rate limit schedule for a specified gateway. By default, gateways do not have bandwidth rate limit schedules, which means no bandwidth rate limiting is in effect. Use this to get a gateway's bandwidth rate limit schedule.
 */
export const getBandwidthRateLimitSchedule: API.OperationMethod<
  GetBandwidthRateLimitScheduleInput,
  GetBandwidthRateLimitScheduleOutput,
  GetBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBandwidthRateLimitSchedule",
})) as any;

export type GetGatewayError = ResourceNotFoundException | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this API returns the gateway.
 */
export const getGateway: API.OperationMethod<
  GetGatewayInput,
  GetGatewayOutput,
  GetGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GatewayArn: 0 },
    output: {
      Gateway: {
        LastSeenTime: D.ts,
        NextUpdateAvailabilityTime: D.ts,
        DeprecationDate: D.ts,
      },
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGateway",
})) as any;

export type GetHypervisorError = ResourceNotFoundException | CommonErrors;
/**
 * This action requests information about the specified hypervisor to which the gateway will connect. A hypervisor is hardware, software, or firmware that creates and manages virtual machines, and allocates resources to them.
 */
export const getHypervisor: API.OperationMethod<
  GetHypervisorInput,
  GetHypervisorOutput,
  GetHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HypervisorArn: 0 },
    output: { Hypervisor: { LastSuccessfulMetadataSyncTime: D.ts } },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisor",
})) as any;

export type GetHypervisorPropertyMappingsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action retrieves the property mappings for the specified hypervisor. A hypervisor property mapping displays the relationship of entity properties available from the hypervisor to the properties available in Amazon Web Services.
 */
export const getHypervisorPropertyMappings: API.OperationMethod<
  GetHypervisorPropertyMappingsInput,
  GetHypervisorPropertyMappingsOutput,
  GetHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HypervisorArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisorPropertyMappings",
})) as any;

export type GetVirtualMachineError = ResourceNotFoundException | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this API returns the virtual machine.
 */
export const getVirtualMachine: API.OperationMethod<
  GetVirtualMachineInput,
  GetVirtualMachineOutput,
  GetVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { VirtualMachine: { LastBackupDate: D.ts } },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVirtualMachine",
})) as any;

export type ImportHypervisorConfigurationError =
  | AccessDeniedException
  | ConflictException
  | CommonErrors;
/**
 * Connect to a hypervisor by importing its configuration.
 */
export const importHypervisorConfiguration: API.OperationMethod<
  ImportHypervisorConfigurationInput,
  ImportHypervisorConfigurationOutput,
  ImportHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Host: 0,
      Username: 0,
      Password: 0,
      KmsKeyArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [AccessDeniedException, ConflictException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportHypervisorConfiguration",
})) as any;

export type ListGatewaysError = CommonErrors;
/**
 * Lists backup gateways owned by an Amazon Web Services account in an Amazon Web Services Region. The returned list is ordered by gateway Amazon Resource Name (ARN).
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysInput,
  ListGatewaysOutput,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  Gateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { Gateways: D.list({ LastSeenTime: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Gateways",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHypervisorsError = CommonErrors;
/**
 * Lists your hypervisors.
 */
export const listHypervisors: API.PaginatedOperationMethod<
  ListHypervisorsInput,
  ListHypervisorsOutput,
  ListHypervisorsError,
  Credentials | HttpClient.HttpClient,
  Hypervisor
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHypervisors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Hypervisors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags applied to the resource identified by its Amazon Resource Name (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListVirtualMachinesError = CommonErrors;
/**
 * Lists your virtual machines.
 */
export const listVirtualMachines: API.PaginatedOperationMethod<
  ListVirtualMachinesInput,
  ListVirtualMachinesOutput,
  ListVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  VirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { HypervisorArn: 0, MaxResults: 0, NextToken: 0 },
    output: { VirtualMachines: D.list({ LastBackupDate: D.ts }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VirtualMachines",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sets the bandwidth rate limit schedule for a specified gateway. By default, gateways do not have a bandwidth rate limit schedule, which means no bandwidth rate limiting is in effect. Use this to initiate a gateway's bandwidth rate limit schedule.
 */
export const putBandwidthRateLimitSchedule: API.OperationMethod<
  PutBandwidthRateLimitScheduleInput,
  PutBandwidthRateLimitScheduleOutput,
  PutBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GatewayArn: 0,
      BandwidthRateLimitIntervals: D.list({
        AverageUploadRateLimitInBitsPerSec: 0,
        StartHourOfDay: 0,
        EndHourOfDay: 0,
        StartMinuteOfHour: 0,
        EndMinuteOfHour: 0,
        DaysOfWeek: 0,
      }),
    },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBandwidthRateLimitSchedule",
})) as any;

export type PutHypervisorPropertyMappingsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sets the property mappings for the specified hypervisor. A hypervisor property mapping displays the relationship of entity properties available from the hypervisor to the properties available in Amazon Web Services.
 */
export const putHypervisorPropertyMappings: API.OperationMethod<
  PutHypervisorPropertyMappingsInput,
  PutHypervisorPropertyMappingsOutput,
  PutHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HypervisorArn: 0,
      VmwareToAwsTagMappings: D.list({
        VmwareCategory: 0,
        VmwareTagName: 0,
        AwsTagKey: 0,
        AwsTagValue: 0,
      }),
      IamRoleArn: 0,
    },
  },
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutHypervisorPropertyMappings",
})) as any;

export type PutMaintenanceStartTimeError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Set the maintenance start time for a gateway.
 */
export const putMaintenanceStartTime: API.OperationMethod<
  PutMaintenanceStartTimeInput,
  PutMaintenanceStartTimeOutput,
  PutMaintenanceStartTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GatewayArn: 0,
      HourOfDay: 0,
      MinuteOfHour: 0,
      DayOfWeek: 0,
      DayOfMonth: 0,
    },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMaintenanceStartTime",
})) as any;

export type StartVirtualMachinesMetadataSyncError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This action sends a request to sync metadata across the specified virtual machines.
 */
export const startVirtualMachinesMetadataSync: API.OperationMethod<
  StartVirtualMachinesMetadataSyncInput,
  StartVirtualMachinesMetadataSyncOutput,
  StartVirtualMachinesMetadataSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HypervisorArn: 0 } },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVirtualMachinesMetadataSync",
})) as any;

export type TagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Tag the resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TestHypervisorConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Tests your hypervisor configuration to validate that backup gateway can connect with the hypervisor and its resources.
 */
export const testHypervisorConfiguration: API.OperationMethod<
  TestHypervisorConfigurationInput,
  TestHypervisorConfigurationOutput,
  TestHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GatewayArn: 0, Host: 0, Username: 0, Password: 0 },
  },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestHypervisorConfiguration",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes tags from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateGatewayInformationError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a gateway's name. Specify which gateway to update using the Amazon Resource Name (ARN) of the gateway in your request.
 */
export const updateGatewayInformation: API.OperationMethod<
  UpdateGatewayInformationInput,
  UpdateGatewayInformationOutput,
  UpdateGatewayInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0, GatewayDisplayName: 0 } },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInformation",
})) as any;

export type UpdateGatewaySoftwareNowError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the gateway virtual machine (VM) software. The request immediately triggers the software update.
 *
 * When you make this request, you get a `200 OK` success response immediately. However, it might take some time for the update to complete.
 */
export const updateGatewaySoftwareNow: API.OperationMethod<
  UpdateGatewaySoftwareNowInput,
  UpdateGatewaySoftwareNowOutput,
  UpdateGatewaySoftwareNowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GatewayArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewaySoftwareNow",
})) as any;

export type UpdateHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a hypervisor metadata, including its host, username, and password. Specify which hypervisor to update using the Amazon Resource Name (ARN) of the hypervisor in your request.
 */
export const updateHypervisor: API.OperationMethod<
  UpdateHypervisorInput,
  UpdateHypervisorOutput,
  UpdateHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HypervisorArn: 0,
      Host: 0,
      Username: 0,
      Password: 0,
      Name: 0,
      LogGroupArn: 0,
    },
  },
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHypervisor",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
