import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "CloudHSM",
  target: "CloudHsmFrontendService",
  version: "2014-05-30",
  sigv4: "cloudhsm",
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
                `https://cloudhsm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cloudhsm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cloudhsm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cloudhsm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class CloudHsmInternalException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmInternalException")<{
    readonly message?: string;
    readonly retryable?: boolean;
  }> {}
export class CloudHsmServiceException
  extends /*@__PURE__*/ TE.TaggedError("CloudHsmServiceException")<{
    readonly message?: string;
    readonly retryable?: boolean;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
    readonly retryable?: boolean;
  }> {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AddTagsToResourceRequest {
  ResourceArn: string;
  TagList: Tag[];
}
export interface AddTagsToResourceResponse {
  Status: string;
}
export type Label = string;
export interface CreateHapgRequest {
  Label: string;
}
export type HapgArn = string;
export interface CreateHapgResponse {
  HapgArn?: string;
}
export type SubnetId = string;
export type SshKey = string;
export type IpAddress = string;
export type IamRoleArn = string;
export type ExternalId = string;
export type SubscriptionType = "PRODUCTION" | (string & {});
export type ClientToken = string;
export interface CreateHsmRequest {
  SubnetId: string;
  SshKey: string;
  EniIp?: string;
  IamRoleArn: string;
  ExternalId?: string;
  SubscriptionType: SubscriptionType;
  ClientToken?: string;
  SyslogIp?: string;
}
export type HsmArn = string;
export interface CreateHsmResponse {
  HsmArn?: string;
}
export type ClientLabel = string;
export type Certificate = string;
export interface CreateLunaClientRequest {
  Label?: string;
  Certificate: string;
}
export type ClientArn = string;
export interface CreateLunaClientResponse {
  ClientArn?: string;
}
export interface DeleteHapgRequest {
  HapgArn: string;
}
export interface DeleteHapgResponse {
  Status: string;
}
export interface DeleteHsmRequest {
  HsmArn: string;
}
export interface DeleteHsmResponse {
  Status: string;
}
export interface DeleteLunaClientRequest {
  ClientArn: string;
}
export interface DeleteLunaClientResponse {
  Status: string;
}
export interface DescribeHapgRequest {
  HapgArn: string;
}
export type HsmList = string[];
export type PartitionSerial = string;
export type PartitionSerialList = string[];
export type CloudHsmObjectState =
  | "READY"
  | "UPDATING"
  | "DEGRADED"
  | (string & {});
export interface DescribeHapgResponse {
  HapgArn?: string;
  HapgSerial?: string;
  HsmsLastActionFailed?: string[];
  HsmsPendingDeletion?: string[];
  HsmsPendingRegistration?: string[];
  Label?: string;
  LastModifiedTimestamp?: string;
  PartitionSerialList?: string[];
  State?: CloudHsmObjectState;
}
export type HsmSerialNumber = string;
export interface DescribeHsmRequest {
  HsmArn?: string;
  HsmSerialNumber?: string;
}
export type HsmStatus =
  | "PENDING"
  | "RUNNING"
  | "UPDATING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | "DEGRADED"
  | (string & {});
export type AZ = string;
export type EniId = string;
export type VpcId = string;
export type PartitionArn = string;
export type PartitionList = string[];
export interface DescribeHsmResponse {
  HsmArn?: string;
  Status?: HsmStatus;
  StatusDetails?: string;
  AvailabilityZone?: string;
  EniId?: string;
  EniIp?: string;
  SubscriptionType?: SubscriptionType;
  SubscriptionStartDate?: string;
  SubscriptionEndDate?: string;
  VpcId?: string;
  SubnetId?: string;
  IamRoleArn?: string;
  SerialNumber?: string;
  VendorName?: string;
  HsmType?: string;
  SoftwareVersion?: string;
  SshPublicKey?: string;
  SshKeyLastUpdated?: string;
  ServerCertUri?: string;
  ServerCertLastUpdated?: string;
  Partitions?: string[];
}
export type CertificateFingerprint = string;
export interface DescribeLunaClientRequest {
  ClientArn?: string;
  CertificateFingerprint?: string;
}
export interface DescribeLunaClientResponse {
  ClientArn?: string;
  Certificate?: string;
  CertificateFingerprint?: string;
  LastModifiedTimestamp?: string;
  Label?: string;
}
export type ClientVersion = "5.1" | "5.3" | (string & {});
export type HapgList = string[];
export interface GetConfigRequest {
  ClientArn: string;
  ClientVersion: ClientVersion;
  HapgList: string[];
}
export interface GetConfigResponse {
  ConfigType?: string;
  ConfigFile?: string;
  ConfigCred?: string;
}
export interface ListAvailableZonesRequest {}
export type AZList = string[];
export interface ListAvailableZonesResponse {
  AZList?: string[];
}
export type PaginationToken = string;
export interface ListHapgsRequest {
  NextToken?: string;
}
export interface ListHapgsResponse {
  HapgList: string[];
  NextToken?: string;
}
export interface ListHsmsRequest {
  NextToken?: string;
}
export interface ListHsmsResponse {
  HsmList?: string[];
  NextToken?: string;
}
export interface ListLunaClientsRequest {
  NextToken?: string;
}
export type ClientList = string[];
export interface ListLunaClientsResponse {
  ClientList: string[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  TagList: Tag[];
}
export interface ModifyHapgRequest {
  HapgArn: string;
  Label?: string;
  PartitionSerialList?: string[];
}
export interface ModifyHapgResponse {
  HapgArn?: string;
}
export interface ModifyHsmRequest {
  HsmArn: string;
  SubnetId?: string;
  EniIp?: string;
  IamRoleArn?: string;
  ExternalId?: string;
  SyslogIp?: string;
}
export interface ModifyHsmResponse {
  HsmArn?: string;
}
export interface ModifyLunaClientRequest {
  ClientArn: string;
  Certificate: string;
}
export interface ModifyLunaClientResponse {
  ClientArn?: string;
}
export type TagKeyList = string[];
export interface RemoveTagsFromResourceRequest {
  ResourceArn: string;
  TagKeyList: string[];
}
export interface RemoveTagsFromResourceResponse {
  Status: string;
}
export type AddTagsToResourceError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Adds or overwrites one or more tags for the specified AWS CloudHSM resource.
 *
 * Each tag consists of a key and a value. Tag keys must be unique to each
 * resource.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceRequest,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, TagList: D.list({ Key: 0, Value: 0 }) },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
})) as any;

export type CreateHapgError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Creates a high-availability partition group. A high-availability partition group is a
 * group of partitions that spans multiple physical HSMs.
 */
export const createHapg: API.OperationMethod<
  CreateHapgRequest,
  CreateHapgResponse,
  CreateHapgError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Label: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHapg",
})) as any;

export type CreateHsmError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Creates an uninitialized HSM instance.
 *
 * There is an upfront fee charged for each HSM instance that you create with the
 * `CreateHsm` operation. If you accidentally provision an HSM and want to request a
 * refund, delete the instance using the DeleteHsm operation, go to the AWS Support Center, create a new case, and select
 * **Account and Billing Support**.
 *
 * It can take up to 20 minutes to create and provision an HSM. You can monitor the
 * status of the HSM with the DescribeHsm operation. The HSM is ready to be
 * initialized when the status changes to `RUNNING`.
 */
export const createHsm: API.OperationMethod<
  CreateHsmRequest,
  CreateHsmResponse,
  CreateHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubnetId: 0,
      SshKey: 0,
      EniIp: 0,
      IamRoleArn: 0,
      ExternalId: 0,
      SubscriptionType: 0,
      ClientToken: 0,
      SyslogIp: 0,
    },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsm",
})) as any;

export type CreateLunaClientError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Creates an HSM client.
 */
export const createLunaClient: API.OperationMethod<
  CreateLunaClientRequest,
  CreateLunaClientResponse,
  CreateLunaClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Label: 0, Certificate: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLunaClient",
})) as any;

export type DeleteHapgError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Deletes a high-availability partition group.
 */
export const deleteHapg: API.OperationMethod<
  DeleteHapgRequest,
  DeleteHapgResponse,
  DeleteHapgError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HapgArn: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHapg",
})) as any;

export type DeleteHsmError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Deletes an HSM. After completion, this operation cannot be undone and your key material
 * cannot be recovered.
 */
export const deleteHsm: API.OperationMethod<
  DeleteHsmRequest,
  DeleteHsmResponse,
  DeleteHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HsmArn: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsm",
})) as any;

export type DeleteLunaClientError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Deletes a client.
 */
export const deleteLunaClient: API.OperationMethod<
  DeleteLunaClientRequest,
  DeleteLunaClientResponse,
  DeleteLunaClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClientArn: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLunaClient",
})) as any;

export type DescribeHapgError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Retrieves information about a high-availability partition group.
 */
export const describeHapg: API.OperationMethod<
  DescribeHapgRequest,
  DescribeHapgResponse,
  DescribeHapgError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HapgArn: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHapg",
})) as any;

export type DescribeHsmError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Retrieves information about an HSM. You can identify the HSM by its ARN or its serial
 * number.
 */
export const describeHsm: API.OperationMethod<
  DescribeHsmRequest,
  DescribeHsmResponse,
  DescribeHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { HsmArn: 0, HsmSerialNumber: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsm",
})) as any;

export type DescribeLunaClientError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Retrieves information about an HSM client.
 */
export const describeLunaClient: API.OperationMethod<
  DescribeLunaClientRequest,
  DescribeLunaClientResponse,
  DescribeLunaClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientArn: 0, CertificateFingerprint: 0 },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLunaClient",
})) as any;

export type GetConfigError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Gets the configuration files necessary to connect to all high availability partition
 * groups the client is associated with.
 */
export const getConfig: API.OperationMethod<
  GetConfigRequest,
  GetConfigResponse,
  GetConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientArn: 0, ClientVersion: 0, HapgList: 0 },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfig",
})) as any;

export type ListAvailableZonesError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Lists the Availability Zones that have available AWS CloudHSM capacity.
 */
export const listAvailableZones: API.OperationMethod<
  ListAvailableZonesRequest,
  ListAvailableZonesResponse,
  ListAvailableZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableZones",
})) as any;

export type ListHapgsError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Lists the high-availability partition groups for the account.
 *
 * This operation supports pagination with the use of the `NextToken` member.
 * If more results are available, the `NextToken` member of the response contains a
 * token that you pass in the next call to `ListHapgs` to retrieve the next set of
 * items.
 */
export const listHapgs: API.OperationMethod<
  ListHapgsRequest,
  ListHapgsResponse,
  ListHapgsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextToken: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHapgs",
})) as any;

export type ListHsmsError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Retrieves the identifiers of all of the HSMs provisioned for the current
 * customer.
 *
 * This operation supports pagination with the use of the `NextToken` member.
 * If more results are available, the `NextToken` member of the response contains a
 * token that you pass in the next call to `ListHsms` to retrieve the next set of
 * items.
 */
export const listHsms: API.OperationMethod<
  ListHsmsRequest,
  ListHsmsResponse,
  ListHsmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextToken: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHsms",
})) as any;

export type ListLunaClientsError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Lists all of the clients.
 *
 * This operation supports pagination with the use of the `NextToken` member.
 * If more results are available, the `NextToken` member of the response contains a
 * token that you pass in the next call to `ListLunaClients` to retrieve the next set
 * of items.
 */
export const listLunaClients: API.OperationMethod<
  ListLunaClientsRequest,
  ListLunaClientsResponse,
  ListLunaClientsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NextToken: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLunaClients",
})) as any;

export type ListTagsForResourceError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Returns a list of all tags for the specified AWS CloudHSM resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ModifyHapgError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Modifies an existing high-availability partition group.
 */
export const modifyHapg: API.OperationMethod<
  ModifyHapgRequest,
  ModifyHapgResponse,
  ModifyHapgError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { HapgArn: 0, Label: 0, PartitionSerialList: 0 },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyHapg",
})) as any;

export type ModifyHsmError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Modifies an HSM.
 *
 * This operation can result in the HSM being offline for up to 15 minutes while the AWS
 * CloudHSM service is reconfigured. If you are modifying a production HSM, you should ensure
 * that your AWS CloudHSM service is configured for high availability, and consider executing this
 * operation during a maintenance window.
 */
export const modifyHsm: API.OperationMethod<
  ModifyHsmRequest,
  ModifyHsmResponse,
  ModifyHsmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      HsmArn: 0,
      SubnetId: 0,
      EniIp: 0,
      IamRoleArn: 0,
      ExternalId: 0,
      SyslogIp: 0,
    },
  },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyHsm",
})) as any;

export type ModifyLunaClientError = CloudHsmServiceException | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Modifies the certificate used by the client.
 *
 * This action can potentially start a workflow to install the new certificate on the
 * client's HSMs.
 */
export const modifyLunaClient: API.OperationMethod<
  ModifyLunaClientRequest,
  ModifyLunaClientResponse,
  ModifyLunaClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClientArn: 0, Certificate: 0 } },
  errors: [CloudHsmServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLunaClient",
})) as any;

export type RemoveTagsFromResourceError =
  | CloudHsmInternalException
  | CloudHsmServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * This is documentation for **AWS CloudHSM Classic**. For
 * more information, see AWS CloudHSM
 * Classic FAQs, the AWS
 * CloudHSM Classic User Guide, and the AWS CloudHSM Classic API Reference.
 *
 * For information about the current version of AWS
 * CloudHSM, see AWS CloudHSM, the
 * AWS CloudHSM User Guide,
 * and the AWS CloudHSM API
 * Reference.
 *
 * Removes one or more tags from the specified AWS CloudHSM resource.
 *
 * To remove a tag, specify only the tag key to remove (not the value). To overwrite the
 * value for an existing tag, use AddTagsToResource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceRequest,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeyList: 0 } },
  errors: [
    CloudHsmInternalException,
    CloudHsmServiceException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
})) as any;
