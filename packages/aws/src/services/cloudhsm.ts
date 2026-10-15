import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudHSM",
  serviceShapeName: "CloudHsmFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudhsm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-05-30");
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
              `https://cloudhsm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://cloudhsm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudhsm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://cloudhsm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://cloudhsm.{R}.{D}","properties":{},"headers":{}}');

export class CloudHsmInternalException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmInternalException>()("CloudHsmInternalException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    retryable: /*@__PURE__*/ S.optional(S.Boolean),
  }) {}
export class CloudHsmServiceException
  extends /*@__PURE__*/ S.TaggedError<CloudHsmServiceException>()("CloudHsmServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    retryable: /*@__PURE__*/ S.optional(S.Boolean),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    retryable: /*@__PURE__*/ S.optional(S.Boolean),
  }) {}
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
export type CloudHsmObjectState = "READY" | "UPDATING" | "DEGRADED" | (string & {});
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
  input: __S(28, __c14, 0) as any as S.Schema<AddTagsToResourceRequest>,
  output: __S(32, __c16, 0) as any as S.Schema<AddTagsToResourceResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

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
  input: __S(34, __c17, 0) as any as S.Schema<CreateHapgRequest>,
  output: __S(36, __c18, 0) as any as S.Schema<CreateHapgResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHapg",
}));

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
  input: __S(38, __c19, 0) as any as S.Schema<CreateHsmRequest>,
  output: __S(40, __c20, 0) as any as S.Schema<CreateHsmResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsm",
}));

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
  input: __S(42, __c21, 0) as any as S.Schema<CreateLunaClientRequest>,
  output: __S(44, __c22, 0) as any as S.Schema<CreateLunaClientResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLunaClient",
}));

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
  input: __S(46, __c23, 0) as any as S.Schema<DeleteHapgRequest>,
  output: __S(32, __c16, 0) as any as S.Schema<DeleteHapgResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHapg",
}));

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
  input: __S(48, __c24, 0) as any as S.Schema<DeleteHsmRequest>,
  output: __S(32, __c16, 0) as any as S.Schema<DeleteHsmResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsm",
}));

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
  input: __S(50, __c25, 0) as any as S.Schema<DeleteLunaClientRequest>,
  output: __S(32, __c16, 0) as any as S.Schema<DeleteLunaClientResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLunaClient",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DescribeHapgRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<DescribeHapgResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHapg",
}));

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
  input: __S(4, __c2, 0) as any as S.Schema<DescribeHsmRequest>,
  output: __S(5, __c2, 1) as any as S.Schema<DescribeHsmResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsm",
}));

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
  input: __S(6, __c3, 0) as any as S.Schema<DescribeLunaClientRequest>,
  output: __S(7, __c3, 1) as any as S.Schema<DescribeLunaClientResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLunaClient",
}));

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
  input: __S(8, __c4, 0) as any as S.Schema<GetConfigRequest>,
  output: __S(9, __c4, 1) as any as S.Schema<GetConfigResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfig",
}));

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
  input: __S(10, __c5, 0) as any as S.Schema<ListAvailableZonesRequest>,
  output: __S(11, __c5, 1) as any as S.Schema<ListAvailableZonesResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableZones",
}));

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
  input: __S(12, __c6, 0) as any as S.Schema<ListHapgsRequest>,
  output: __S(13, __c6, 1) as any as S.Schema<ListHapgsResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHapgs",
}));

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
  input: __S(14, __c7, 0) as any as S.Schema<ListHsmsRequest>,
  output: __S(15, __c7, 1) as any as S.Schema<ListHsmsResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHsms",
}));

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
  input: __S(16, __c8, 0) as any as S.Schema<ListLunaClientsRequest>,
  output: __S(17, __c8, 1) as any as S.Schema<ListLunaClientsResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLunaClients",
}));

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
  input: __S(18, __c9, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(19, __c9, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(20, __c10, 0) as any as S.Schema<ModifyHapgRequest>,
  output: __S(36, __c18, 0) as any as S.Schema<ModifyHapgResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyHapg",
}));

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
  input: __S(22, __c11, 0) as any as S.Schema<ModifyHsmRequest>,
  output: __S(40, __c20, 0) as any as S.Schema<ModifyHsmResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyHsm",
}));

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
  input: __S(24, __c12, 0) as any as S.Schema<ModifyLunaClientRequest>,
  output: __S(44, __c22, 0) as any as S.Schema<ModifyLunaClientResponse>,
  errors: [CloudHsmServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLunaClient",
}));

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
  input: __S(26, __c13, 0) as any as S.Schema<RemoveTagsFromResourceRequest>,
  output: __S(32, __c16, 0) as any as S.Schema<RemoveTagsFromResourceResponse>,
  errors: [CloudHsmInternalException, CloudHsmServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HapgArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHapgRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HapgArn: S.optional(S.String),
          HapgSerial: S.optional(S.String),
          HsmsLastActionFailed: S.optional(__S(2, __c1, 0)),
          HsmsPendingDeletion: S.optional(__S(2, __c1, 0)),
          HsmsPendingRegistration: S.optional(__S(2, __c1, 0)),
          Label: S.optional(S.String),
          LastModifiedTimestamp: S.optional(S.String),
          PartitionSerialList: S.optional(__S(2, __c1, 0)),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeHapgResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HsmArn: S.optional(S.String), HsmSerialNumber: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHsmRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          HsmArn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusDetails: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          EniId: S.optional(S.String),
          EniIp: S.optional(S.String),
          SubscriptionType: S.optional(S.String),
          SubscriptionStartDate: S.optional(S.String),
          SubscriptionEndDate: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          SerialNumber: S.optional(S.String),
          VendorName: S.optional(S.String),
          HsmType: S.optional(S.String),
          SoftwareVersion: S.optional(S.String),
          SshPublicKey: S.optional(S.String),
          SshKeyLastUpdated: S.optional(S.String),
          ServerCertUri: S.optional(S.String),
          ServerCertLastUpdated: S.optional(S.String),
          Partitions: S.optional(__S(2, __c1, 0)),
        }),
      ).annotate({ identifier: "DescribeHsmResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientArn: S.optional(S.String),
          CertificateFingerprint: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLunaClientRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientArn: S.optional(S.String),
          Certificate: S.optional(S.String),
          CertificateFingerprint: S.optional(S.String),
          LastModifiedTimestamp: S.optional(S.String),
          Label: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeLunaClientResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClientArn: S.String, ClientVersion: S.String, HapgList: __S(2, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigType: S.optional(S.String),
          ConfigFile: S.optional(S.String),
          ConfigCred: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConfigResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAvailableZonesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AZList: S.optional(__S(2, __c1, 0)) })).annotate({
        identifier: "ListAvailableZonesResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHapgsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HapgList: __S(2, __c1, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHapgsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHsmsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HsmList: S.optional(__S(2, __c1, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHsmsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLunaClientsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClientList: __S(2, __c1, 0), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLunaClientsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TagList: __S(31, __c15, 1) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HapgArn: S.String,
          Label: S.optional(S.String),
          PartitionSerialList: S.optional(__S(2, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyHapgRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HsmArn: S.String.pipe(T.XmlName("HsmArn")),
          SubnetId: S.optional(S.String).pipe(T.XmlName("SubnetId")),
          EniIp: S.optional(S.String).pipe(T.XmlName("EniIp")),
          IamRoleArn: S.optional(S.String).pipe(T.XmlName("IamRoleArn")),
          ExternalId: S.optional(S.String).pipe(T.XmlName("ExternalId")),
          SyslogIp: S.optional(S.String).pipe(T.XmlName("SyslogIp")),
        }).pipe(
          T.all(
            T.XmlName("ModifyHsmRequest"),
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ModifyHsmRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClientArn: S.String, Certificate: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ModifyLunaClientRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeyList: __S(2, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsFromResourceRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagList: __S(31, __c15, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(30, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "AddTagsToResourceResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Label: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateHapgRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ HapgArn: S.optional(S.String) })).annotate({
        identifier: "CreateHapgResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetId: S.String.pipe(T.XmlName("SubnetId")),
          SshKey: S.String.pipe(T.XmlName("SshKey")),
          EniIp: S.optional(S.String).pipe(T.XmlName("EniIp")),
          IamRoleArn: S.String.pipe(T.XmlName("IamRoleArn")),
          ExternalId: S.optional(S.String).pipe(T.XmlName("ExternalId")),
          SubscriptionType: S.String.pipe(T.XmlName("SubscriptionType")),
          ClientToken: S.optional(S.String).pipe(T.XmlName("ClientToken")),
          SyslogIp: S.optional(S.String).pipe(T.XmlName("SyslogIp")),
        }).pipe(
          T.all(
            T.XmlName("CreateHsmRequest"),
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateHsmRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ HsmArn: S.optional(S.String) })).annotate({
        identifier: "CreateHsmResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Label: S.optional(S.String), Certificate: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLunaClientRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ClientArn: S.optional(S.String) })).annotate({
        identifier: "CreateLunaClientResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HapgArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteHapgRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HsmArn: S.String.pipe(T.XmlName("HsmArn")) }).pipe(
          T.all(
            T.XmlName("DeleteHsmRequest"),
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteHsmRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClientArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLunaClientRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
