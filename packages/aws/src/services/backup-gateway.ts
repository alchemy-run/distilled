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
  sdkId: "Backup Gateway",
  serviceShapeName: "BackupOnPremises_v20210101",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "backup-gateway" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-01-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://backup-gateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://backup-gateway.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "BackupGateway",
  service: "BackupGateway",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      ErrorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ErrorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      ErrorCode: S.String,
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GatewayArn = string;
export type ServerArn = string;
export interface AssociateGatewayToServerInput {
  GatewayArn: string;
  ServerArn: string;
}
export interface AssociateGatewayToServerOutput {
  GatewayArn?: string | undefined;
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
  Tags?: Tag[] | undefined;
}
export interface CreateGatewayOutput {
  GatewayArn?: string | undefined;
}
export interface DeleteGatewayInput {
  GatewayArn: string;
}
export interface DeleteGatewayOutput {
  GatewayArn?: string | undefined;
}
export interface DeleteHypervisorInput {
  HypervisorArn: string;
}
export interface DeleteHypervisorOutput {
  HypervisorArn?: string | undefined;
}
export interface DisassociateGatewayFromServerInput {
  GatewayArn: string;
}
export interface DisassociateGatewayFromServerOutput {
  GatewayArn?: string | undefined;
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
  AverageUploadRateLimitInBitsPerSec?: number | undefined;
  StartHourOfDay: number;
  EndHourOfDay: number;
  StartMinuteOfHour: number;
  EndMinuteOfHour: number;
  DaysOfWeek: number[];
}
export type BandwidthRateLimitIntervals = BandwidthRateLimitInterval[];
export interface GetBandwidthRateLimitScheduleOutput {
  GatewayArn?: string | undefined;
  BandwidthRateLimitIntervals?: BandwidthRateLimitInterval[] | undefined;
}
export interface GetGatewayInput {
  GatewayArn: string;
}
export type HypervisorId = string;
export type DayOfMonth = number;
export interface MaintenanceStartTime {
  DayOfMonth?: number | undefined;
  DayOfWeek?: number | undefined;
  HourOfDay: number;
  MinuteOfHour: number;
}
export type VpcEndpoint = string;
export interface GatewayDetails {
  GatewayArn?: string | undefined;
  GatewayDisplayName?: string | undefined;
  GatewayType?: string | undefined;
  HypervisorId?: string | undefined;
  LastSeenTime?: Date | undefined;
  MaintenanceStartTime?: MaintenanceStartTime | undefined;
  NextUpdateAvailabilityTime?: Date | undefined;
  VpcEndpoint?: string | undefined;
  DeprecationDate?: Date | undefined;
  SoftwareVersion?: string | undefined;
}
export interface GetGatewayOutput {
  Gateway?: GatewayDetails | undefined;
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
  Host?: string | undefined;
  HypervisorArn?: string | undefined;
  KmsKeyArn?: string | undefined;
  Name?: string | undefined;
  LogGroupArn?: string | undefined;
  State?: string | undefined;
  LastSuccessfulMetadataSyncTime?: Date | undefined;
  LatestMetadataSyncStatusMessage?: string | undefined;
  LatestMetadataSyncStatus?: string | undefined;
}
export interface GetHypervisorOutput {
  Hypervisor?: HypervisorDetails | undefined;
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
  HypervisorArn?: string | undefined;
  VmwareToAwsTagMappings?: VmwareToAwsTagMapping[] | undefined;
  IamRoleArn?: string | undefined;
}
export type ResourceArn = string;
export interface GetVirtualMachineInput {
  ResourceArn: string;
}
export type Path = string;
export interface VmwareTag {
  VmwareCategory?: string | undefined;
  VmwareTagName?: string | undefined;
  VmwareTagDescription?: string | undefined;
}
export type VmwareTags = VmwareTag[];
export interface VirtualMachineDetails {
  HostName?: string | undefined;
  HypervisorId?: string | undefined;
  Name?: string | undefined;
  Path?: string | undefined;
  ResourceArn?: string | undefined;
  LastBackupDate?: Date | undefined;
  VmwareTags?: VmwareTag[] | undefined;
}
export interface GetVirtualMachineOutput {
  VirtualMachine?: VirtualMachineDetails | undefined;
}
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export interface ImportHypervisorConfigurationInput {
  Name: string;
  Host: string;
  Username?: string | redacted.Redacted<string> | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
  KmsKeyArn?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ImportHypervisorConfigurationOutput {
  HypervisorArn?: string | undefined;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListGatewaysInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Gateway {
  GatewayArn?: string | undefined;
  GatewayDisplayName?: string | undefined;
  GatewayType?: string | undefined;
  HypervisorId?: string | undefined;
  LastSeenTime?: Date | undefined;
}
export type Gateways = Gateway[];
export interface ListGatewaysOutput {
  Gateways?: Gateway[] | undefined;
  NextToken?: string | undefined;
}
export interface ListHypervisorsInput {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface Hypervisor {
  Host?: string | undefined;
  HypervisorArn?: string | undefined;
  KmsKeyArn?: string | undefined;
  Name?: string | undefined;
  State?: string | undefined;
}
export type Hypervisors = Hypervisor[];
export interface ListHypervisorsOutput {
  Hypervisors?: Hypervisor[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  ResourceArn?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ListVirtualMachinesInput {
  HypervisorArn?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface VirtualMachine {
  HostName?: string | undefined;
  HypervisorId?: string | undefined;
  Name?: string | undefined;
  Path?: string | undefined;
  ResourceArn?: string | undefined;
  LastBackupDate?: Date | undefined;
}
export type VirtualMachines = VirtualMachine[];
export interface ListVirtualMachinesOutput {
  VirtualMachines?: VirtualMachine[] | undefined;
  NextToken?: string | undefined;
}
export interface PutBandwidthRateLimitScheduleInput {
  GatewayArn: string;
  BandwidthRateLimitIntervals: BandwidthRateLimitInterval[];
}
export interface PutBandwidthRateLimitScheduleOutput {
  GatewayArn?: string | undefined;
}
export interface PutHypervisorPropertyMappingsInput {
  HypervisorArn: string;
  VmwareToAwsTagMappings: VmwareToAwsTagMapping[];
  IamRoleArn: string;
}
export interface PutHypervisorPropertyMappingsOutput {
  HypervisorArn?: string | undefined;
}
export interface PutMaintenanceStartTimeInput {
  GatewayArn: string;
  HourOfDay: number;
  MinuteOfHour: number;
  DayOfWeek?: number | undefined;
  DayOfMonth?: number | undefined;
}
export interface PutMaintenanceStartTimeOutput {
  GatewayArn?: string | undefined;
}
export interface StartVirtualMachinesMetadataSyncInput {
  HypervisorArn: string;
}
export interface StartVirtualMachinesMetadataSyncOutput {
  HypervisorArn?: string | undefined;
}
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceOutput {
  ResourceARN?: string | undefined;
}
export interface TestHypervisorConfigurationInput {
  GatewayArn: string;
  Host: string;
  Username?: string | redacted.Redacted<string> | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
}
export interface TestHypervisorConfigurationOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {
  ResourceARN?: string | undefined;
}
export interface UpdateGatewayInformationInput {
  GatewayArn: string;
  GatewayDisplayName?: string | undefined;
}
export interface UpdateGatewayInformationOutput {
  GatewayArn?: string | undefined;
}
export interface UpdateGatewaySoftwareNowInput {
  GatewayArn: string;
}
export interface UpdateGatewaySoftwareNowOutput {
  GatewayArn?: string | undefined;
}
export interface UpdateHypervisorInput {
  HypervisorArn: string;
  Host?: string | undefined;
  Username?: string | redacted.Redacted<string> | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
  Name?: string | undefined;
  LogGroupArn?: string | undefined;
}
export interface UpdateHypervisorOutput {
  HypervisorArn?: string | undefined;
}
export type AssociateGatewayToServerError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a backup gateway with your server. After you complete the association process, you can back up and restore your VMs through the gateway.
 */
export const associateGatewayToServer: API.OperationMethod<
  AssociateGatewayToServerInput & RegionInput,
  AssociateGatewayToServerOutput,
  AssociateGatewayToServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<AssociateGatewayToServerInput>,
  output: __S(200, __c25, 0) as any as S.Schema<AssociateGatewayToServerOutput>,
  errors: [ConflictException, InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGatewayToServer",
  telemetry: TELEMETRY,
  span: "AssociateGatewayToServer",
}));

export type CreateGatewayError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a backup gateway. After you create a gateway, you can associate it with a server using the `AssociateGatewayToServer` operation.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayInput & RegionInput,
  CreateGatewayOutput,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<CreateGatewayInput>,
  output: __S(200, __c25, 0) as any as S.Schema<CreateGatewayOutput>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
  telemetry: TELEMETRY,
  span: "CreateGateway",
}));

export type DeleteGatewayError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a backup gateway.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayInput & RegionInput,
  DeleteGatewayOutput,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DeleteGatewayInput>,
  output: __S(200, __c25, 0) as any as S.Schema<DeleteGatewayOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
  telemetry: TELEMETRY,
  span: "DeleteGateway",
}));

export type DeleteHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a hypervisor.
 */
export const deleteHypervisor: API.OperationMethod<
  DeleteHypervisorInput & RegionInput,
  DeleteHypervisorOutput,
  DeleteHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DeleteHypervisorInput>,
  output: __S(240, __c30, 0) as any as S.Schema<DeleteHypervisorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHypervisor",
  telemetry: TELEMETRY,
  span: "DeleteHypervisor",
}));

export type DisassociateGatewayFromServerError =
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a backup gateway from the specified server. After the disassociation process finishes, the gateway can no longer access the virtual machines on the server.
 */
export const disassociateGatewayFromServer: API.OperationMethod<
  DisassociateGatewayFromServerInput & RegionInput,
  DisassociateGatewayFromServerOutput,
  DisassociateGatewayFromServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DisassociateGatewayFromServerInput>,
  output: __S(200, __c25, 0) as any as S.Schema<DisassociateGatewayFromServerOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGatewayFromServer",
  telemetry: TELEMETRY,
  span: "DisassociateGatewayFromServer",
}));

export type GetBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the bandwidth rate limit schedule for a specified gateway. By default, gateways do not have bandwidth rate limit schedules, which means no bandwidth rate limiting is in effect. Use this to get a gateway's bandwidth rate limit schedule.
 */
export const getBandwidthRateLimitSchedule: API.OperationMethod<
  GetBandwidthRateLimitScheduleInput & RegionInput,
  GetBandwidthRateLimitScheduleOutput,
  GetBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<GetBandwidthRateLimitScheduleInput>,
  output: __S(9, __c1, 1) as any as S.Schema<GetBandwidthRateLimitScheduleOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBandwidthRateLimitSchedule",
  telemetry: TELEMETRY,
  span: "GetBandwidthRateLimitSchedule",
}));

export type GetGatewayError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this API returns the gateway.
 */
export const getGateway: API.OperationMethod<
  GetGatewayInput & RegionInput,
  GetGatewayOutput,
  GetGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<GetGatewayInput>,
  output: __S(27, __c3, 3) as any as S.Schema<GetGatewayOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGateway",
  telemetry: TELEMETRY,
  span: "GetGateway",
}));

export type GetHypervisorError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action requests information about the specified hypervisor to which the gateway will connect. A hypervisor is hardware, software, or firmware that creates and manages virtual machines, and allocates resources to them.
 */
export const getHypervisor: API.OperationMethod<
  GetHypervisorInput & RegionInput,
  GetHypervisorOutput,
  GetHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetHypervisorInput>,
  output: __S(34, __c4, 2) as any as S.Schema<GetHypervisorOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisor",
  telemetry: TELEMETRY,
  span: "GetHypervisor",
}));

export type GetHypervisorPropertyMappingsError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action retrieves the property mappings for the specified hypervisor. A hypervisor property mapping displays the relationship of entity properties available from the hypervisor to the properties available in Amazon Web Services.
 */
export const getHypervisorPropertyMappings: API.OperationMethod<
  GetHypervisorPropertyMappingsInput & RegionInput,
  GetHypervisorPropertyMappingsOutput,
  GetHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetHypervisorPropertyMappingsInput>,
  output: __S(41, __c5, 1) as any as S.Schema<GetHypervisorPropertyMappingsOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHypervisorPropertyMappings",
  telemetry: TELEMETRY,
  span: "GetHypervisorPropertyMappings",
}));

export type GetVirtualMachineError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * By providing the ARN (Amazon Resource Name), this API returns the virtual machine.
 */
export const getVirtualMachine: API.OperationMethod<
  GetVirtualMachineInput & RegionInput,
  GetVirtualMachineOutput,
  GetVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<GetVirtualMachineInput>,
  output: __S(60, __c7, 4) as any as S.Schema<GetVirtualMachineOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVirtualMachine",
  telemetry: TELEMETRY,
  span: "GetVirtualMachine",
}));

export type ImportHypervisorConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connect to a hypervisor by importing its configuration.
 */
export const importHypervisorConfiguration: API.OperationMethod<
  ImportHypervisorConfigurationInput & RegionInput,
  ImportHypervisorConfigurationOutput,
  ImportHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<ImportHypervisorConfigurationInput>,
  output: __S(240, __c30, 0) as any as S.Schema<ImportHypervisorConfigurationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportHypervisorConfiguration",
  telemetry: TELEMETRY,
  span: "ImportHypervisorConfiguration",
}));

export type ListGatewaysError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists backup gateways owned by an Amazon Web Services account in an Amazon Web Services Region. The returned list is ordered by gateway Amazon Resource Name (ARN).
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysInput & RegionInput,
  ListGatewaysOutput,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  Gateway
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<ListGatewaysInput>,
  output: __S(75, __c9, 3) as any as S.Schema<ListGatewaysOutput>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Gateways",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListGateways",
})) as any;

export type ListHypervisorsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your hypervisors.
 */
export const listHypervisors: API.PaginatedOperationMethod<
  ListHypervisorsInput & RegionInput,
  ListHypervisorsOutput,
  ListHypervisorsError,
  Credentials | HttpClient.HttpClient,
  Hypervisor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<ListHypervisorsInput>,
  output: __S(83, __c10, 3) as any as S.Schema<ListHypervisorsOutput>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHypervisors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Hypervisors",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListHypervisors",
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags applied to the resource identified by its Amazon Resource Name (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput & RegionInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(89, __c11, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListVirtualMachinesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your virtual machines.
 */
export const listVirtualMachines: API.PaginatedOperationMethod<
  ListVirtualMachinesInput & RegionInput,
  ListVirtualMachinesOutput,
  ListVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  VirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<ListVirtualMachinesInput>,
  output: __S(99, __c12, 3) as any as S.Schema<ListVirtualMachinesOutput>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VirtualMachines",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListVirtualMachines",
})) as any;

export type PutBandwidthRateLimitScheduleError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action sets the bandwidth rate limit schedule for a specified gateway. By default, gateways do not have a bandwidth rate limit schedule, which means no bandwidth rate limiting is in effect. Use this to initiate a gateway's bandwidth rate limit schedule.
 */
export const putBandwidthRateLimitSchedule: API.OperationMethod<
  PutBandwidthRateLimitScheduleInput & RegionInput,
  PutBandwidthRateLimitScheduleOutput,
  PutBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<PutBandwidthRateLimitScheduleInput>,
  output: __S(200, __c25, 0) as any as S.Schema<PutBandwidthRateLimitScheduleOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBandwidthRateLimitSchedule",
  telemetry: TELEMETRY,
  span: "PutBandwidthRateLimitSchedule",
}));

export type PutHypervisorPropertyMappingsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action sets the property mappings for the specified hypervisor. A hypervisor property mapping displays the relationship of entity properties available from the hypervisor to the properties available in Amazon Web Services.
 */
export const putHypervisorPropertyMappings: API.OperationMethod<
  PutHypervisorPropertyMappingsInput & RegionInput,
  PutHypervisorPropertyMappingsOutput,
  PutHypervisorPropertyMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<PutHypervisorPropertyMappingsInput>,
  output: __S(240, __c30, 0) as any as S.Schema<PutHypervisorPropertyMappingsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutHypervisorPropertyMappings",
  telemetry: TELEMETRY,
  span: "PutHypervisorPropertyMappings",
}));

export type PutMaintenanceStartTimeError =
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the maintenance start time for a gateway.
 */
export const putMaintenanceStartTime: API.OperationMethod<
  PutMaintenanceStartTimeInput & RegionInput,
  PutMaintenanceStartTimeOutput,
  PutMaintenanceStartTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<PutMaintenanceStartTimeInput>,
  output: __S(200, __c25, 0) as any as S.Schema<PutMaintenanceStartTimeOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMaintenanceStartTime",
  telemetry: TELEMETRY,
  span: "PutMaintenanceStartTime",
}));

export type StartVirtualMachinesMetadataSyncError =
  | AccessDeniedException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action sends a request to sync metadata across the specified virtual machines.
 */
export const startVirtualMachinesMetadataSync: API.OperationMethod<
  StartVirtualMachinesMetadataSyncInput & RegionInput,
  StartVirtualMachinesMetadataSyncOutput,
  StartVirtualMachinesMetadataSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<StartVirtualMachinesMetadataSyncInput>,
  output: __S(240, __c30, 0) as any as S.Schema<StartVirtualMachinesMetadataSyncOutput>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVirtualMachinesMetadataSync",
  telemetry: TELEMETRY,
  span: "StartVirtualMachinesMetadataSync",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag the resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput & RegionInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<TagResourceInput>,
  output: __S(144, __c18, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type TestHypervisorConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tests your hypervisor configuration to validate that backup gateway can connect with the hypervisor and its resources.
 */
export const testHypervisorConfiguration: API.OperationMethod<
  TestHypervisorConfigurationInput & RegionInput,
  TestHypervisorConfigurationOutput,
  TestHypervisorConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<TestHypervisorConfigurationInput>,
  output: __S(153, __c19, 1) as any as S.Schema<TestHypervisorConfigurationOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestHypervisorConfiguration",
  telemetry: TELEMETRY,
  span: "TestHypervisorConfiguration",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput & RegionInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(161, __c20, 1) as any as S.Schema<UntagResourceInput>,
  output: __S(144, __c18, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateGatewayInformationError =
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a gateway's name. Specify which gateway to update using the Amazon Resource Name (ARN) of the gateway in your request.
 */
export const updateGatewayInformation: API.OperationMethod<
  UpdateGatewayInformationInput & RegionInput,
  UpdateGatewayInformationOutput,
  UpdateGatewayInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<UpdateGatewayInformationInput>,
  output: __S(200, __c25, 0) as any as S.Schema<UpdateGatewayInformationOutput>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInformation",
  telemetry: TELEMETRY,
  span: "UpdateGatewayInformation",
}));

export type UpdateGatewaySoftwareNowError =
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the gateway virtual machine (VM) software. The request immediately triggers the software update.
 *
 * When you make this request, you get a `200 OK` success response immediately. However, it might take some time for the update to complete.
 */
export const updateGatewaySoftwareNow: API.OperationMethod<
  UpdateGatewaySoftwareNowInput & RegionInput,
  UpdateGatewaySoftwareNowOutput,
  UpdateGatewaySoftwareNowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<UpdateGatewaySoftwareNowInput>,
  output: __S(200, __c25, 0) as any as S.Schema<UpdateGatewaySoftwareNowOutput>,
  errors: [
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewaySoftwareNow",
  telemetry: TELEMETRY,
  span: "UpdateGatewaySoftwareNow",
}));

export type UpdateHypervisorError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a hypervisor metadata, including its host, username, and password. Specify which hypervisor to update using the Amazon Resource Name (ARN) of the hypervisor in your request.
 */
export const updateHypervisor: API.OperationMethod<
  UpdateHypervisorInput & RegionInput,
  UpdateHypervisorOutput,
  UpdateHypervisorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<UpdateHypervisorInput>,
  output: __S(240, __c30, 0) as any as S.Schema<UpdateHypervisorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHypervisor",
  telemetry: TELEMETRY,
  span: "UpdateHypervisor",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateGatewayFromServerInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBandwidthRateLimitScheduleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.optional(S.String),
          BandwidthRateLimitIntervals: S.optional(__S(18, __c2, 2)),
        }),
      ).annotate({ identifier: "GetBandwidthRateLimitScheduleOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AverageUploadRateLimitInBitsPerSec: S.optional(S.Number),
          StartHourOfDay: S.Number,
          EndHourOfDay: S.Number,
          StartMinuteOfHour: S.Number,
          EndMinuteOfHour: S.Number,
          DaysOfWeek: __S(16, __c2, 0),
        }),
      ).annotate({ identifier: "BandwidthRateLimitInterval" });
    case 2:
      return S.Array(__S(17, __c2, 1));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGatewayInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DayOfMonth: S.optional(S.Number),
          DayOfWeek: S.optional(S.Number),
          HourOfDay: S.Number,
          MinuteOfHour: S.Number,
        }),
      ).annotate({ identifier: "MaintenanceStartTime" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.optional(S.String),
          GatewayDisplayName: S.optional(S.String),
          GatewayType: S.optional(S.String),
          HypervisorId: S.optional(S.String),
          LastSeenTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaintenanceStartTime: S.optional(__S(25, __c3, 1)),
          NextUpdateAvailabilityTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VpcEndpoint: S.optional(S.String),
          DeprecationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SoftwareVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GatewayDetails" });
    case 3:
      return S.suspend(() => S.Struct({ Gateway: S.optional(__S(26, __c3, 2)) })).annotate({
        identifier: "GetGatewayOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HypervisorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetHypervisorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Host: S.optional(S.String),
          HypervisorArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          Name: S.optional(S.String),
          LogGroupArn: S.optional(S.String),
          State: S.optional(S.String),
          LastSuccessfulMetadataSyncTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          LatestMetadataSyncStatusMessage: S.optional(S.String),
          LatestMetadataSyncStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "HypervisorDetails" });
    case 2:
      return S.suspend(() => S.Struct({ Hypervisor: S.optional(__S(33, __c4, 1)) })).annotate({
        identifier: "GetHypervisorOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HypervisorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetHypervisorPropertyMappingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HypervisorArn: S.optional(S.String),
          VmwareToAwsTagMappings: S.optional(__S(49, __c6, 1)),
          IamRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetHypervisorPropertyMappingsOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VmwareCategory: S.String,
          VmwareTagName: S.String,
          AwsTagKey: S.String,
          AwsTagValue: S.String,
        }),
      ).annotate({ identifier: "VmwareToAwsTagMapping" });
    case 1:
      return S.Array(__S(48, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetVirtualMachineInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VmwareCategory: S.optional(S.String),
          VmwareTagName: S.optional(S.String),
          VmwareTagDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "VmwareTag" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          HostName: S.optional(S.String),
          HypervisorId: S.optional(S.String),
          Name: S.optional(S.String),
          Path: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          LastBackupDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VmwareTags: S.optional(__S(58, __c7, 2)),
        }),
      ).annotate({ identifier: "VirtualMachineDetails" });
    case 4:
      return S.suspend(() => S.Struct({ VirtualMachine: S.optional(__S(59, __c7, 3)) })).annotate({
        identifier: "GetVirtualMachineOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Host: S.String,
          Username: S.optional(SensitiveString),
          Password: S.optional(SensitiveString),
          KmsKeyArn: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportHypervisorConfigurationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGatewaysInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.optional(S.String),
          GatewayDisplayName: S.optional(S.String),
          GatewayType: S.optional(S.String),
          HypervisorId: S.optional(S.String),
          LastSeenTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Gateway" });
    case 2:
      return S.Array(__S(73, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Gateways: S.optional(__S(74, __c9, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGatewaysOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHypervisorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Host: S.optional(S.String),
          HypervisorArn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          Name: S.optional(S.String),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "Hypervisor" });
    case 2:
      return S.Array(__S(81, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Hypervisors: S.optional(__S(82, __c10, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHypervisorsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(__S(217, __c27, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HypervisorArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVirtualMachinesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HostName: S.optional(S.String),
          HypervisorId: S.optional(S.String),
          Name: S.optional(S.String),
          Path: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          LastBackupDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "VirtualMachine" });
    case 2:
      return S.Array(__S(97, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          VirtualMachines: S.optional(__S(98, __c12, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListVirtualMachinesOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String, BandwidthRateLimitIntervals: __S(18, __c2, 2) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutBandwidthRateLimitScheduleInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HypervisorArn: S.String,
          VmwareToAwsTagMappings: __S(49, __c6, 1),
          IamRoleArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutHypervisorPropertyMappingsInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.String,
          HourOfDay: S.Number,
          MinuteOfHour: S.Number,
          DayOfWeek: S.optional(S.Number),
          DayOfMonth: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMaintenanceStartTimeInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HypervisorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartVirtualMachinesMetadataSyncInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(217, __c27, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceARN: S.optional(S.String) })).annotate({
        identifier: "TagResourceOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayArn: S.String,
          Host: S.String,
          Username: S.optional(SensitiveString),
          Password: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TestHypervisorConfigurationInput" });
    case 1:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "TestHypervisorConfigurationOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(160, __c20, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String, GatewayDisplayName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGatewayInformationInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGatewaySoftwareNowInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HypervisorArn: S.String,
          Host: S.optional(S.String),
          Username: S.optional(SensitiveString),
          Password: S.optional(SensitiveString),
          Name: S.optional(S.String),
          LogGroupArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateHypervisorInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String, ServerArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateGatewayToServerInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GatewayArn: S.optional(S.String) })).annotate({
        identifier: "AssociateGatewayToServerOutput",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActivationKey: S.String,
          GatewayDisplayName: S.String,
          GatewayType: S.String,
          Tags: S.optional(__S(217, __c27, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGatewayInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(216, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGatewayInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HypervisorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHypervisorInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ HypervisorArn: S.optional(S.String) })).annotate({
        identifier: "DeleteHypervisorOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
