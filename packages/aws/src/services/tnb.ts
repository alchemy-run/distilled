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
  sdkId: "tnb",
  target: "TNB",
  version: "2008-10-21",
  sigv4: "tnb",
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
                `https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://tnb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://tnb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type NsLcmOpOccId = string;
export interface CancelSolNetworkOperationInput {
  nsLcmOpOccId: string;
}
export interface CancelSolNetworkOperationResponse {}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateSolFunctionPackageInput {
  tags?: { [key: string]: string | undefined };
}
export type VnfPkgId = string;
export type VnfPkgArn = string;
export type OnboardingState = "CREATED" | "ONBOARDED" | "ERROR" | (string & {});
export type OperationalState = "ENABLED" | "DISABLED" | (string & {});
export type UsageState = "IN_USE" | "NOT_IN_USE" | (string & {});
export interface CreateSolFunctionPackageOutput {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  tags?: { [key: string]: string | undefined };
}
export type NsdInfoId = string;
export interface CreateSolNetworkInstanceInput {
  nsdInfoId: string;
  nsName: string;
  nsDescription?: string;
  tags?: { [key: string]: string | undefined };
}
export type NsInstanceId = string;
export type NsInstanceArn = string;
export interface CreateSolNetworkInstanceOutput {
  id: string;
  arn: string;
  nsdInfoId: string;
  nsInstanceName: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSolNetworkPackageInput {
  tags?: { [key: string]: string | undefined };
}
export type NsdInfoArn = string;
export type NsdOnboardingState =
  | "CREATED"
  | "ONBOARDED"
  | "ERROR"
  | (string & {});
export type NsdOperationalState = "ENABLED" | "DISABLED" | (string & {});
export type NsdUsageState = "IN_USE" | "NOT_IN_USE" | (string & {});
export interface CreateSolNetworkPackageOutput {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteSolFunctionPackageInput {
  vnfPkgId: string;
}
export interface DeleteSolFunctionPackageResponse {}
export interface DeleteSolNetworkInstanceInput {
  nsInstanceId: string;
}
export interface DeleteSolNetworkInstanceResponse {}
export interface DeleteSolNetworkPackageInput {
  nsdInfoId: string;
}
export interface DeleteSolNetworkPackageResponse {}
export type VnfInstanceId = string;
export interface GetSolFunctionInstanceInput {
  vnfInstanceId: string;
}
export type VnfInstanceArn = string;
export type VnfdId = string;
export type VnfInstantiationState =
  | "INSTANTIATED"
  | "NOT_INSTANTIATED"
  | (string & {});
export type VnfOperationalState = "STARTED" | "STOPPED" | (string & {});
export interface GetSolVnfcResourceInfoMetadata {
  nodeGroup?: string;
  cluster?: string;
  helmChart?: string;
}
export interface GetSolVnfcResourceInfo {
  metadata?: GetSolVnfcResourceInfoMetadata;
}
export type GetSolVnfcResourceInfoList = GetSolVnfcResourceInfo[];
export interface GetSolVnfInfo {
  vnfState?: VnfOperationalState;
  vnfcResourceInfo?: GetSolVnfcResourceInfo[];
}
export interface GetSolFunctionInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface GetSolFunctionInstanceOutput {
  id: string;
  arn: string;
  nsInstanceId: string;
  vnfPkgId: string;
  vnfdId: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  instantiationState: VnfInstantiationState;
  instantiatedVnfInfo?: GetSolVnfInfo;
  metadata: GetSolFunctionInstanceMetadata;
  tags?: { [key: string]: string | undefined };
}
export interface GetSolFunctionPackageInput {
  vnfPkgId: string;
}
export interface ToscaOverride {
  name?: string;
  defaultValue?: string;
}
export type OverrideList = ToscaOverride[];
export interface FunctionArtifactMeta {
  overrides?: ToscaOverride[];
}
export interface GetSolFunctionPackageMetadata {
  vnfd?: FunctionArtifactMeta;
  createdAt: Date;
  lastModified: Date;
}
export interface GetSolFunctionPackageOutput {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  vnfdId?: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  metadata?: GetSolFunctionPackageMetadata;
  tags?: { [key: string]: string | undefined };
}
export type PackageContentType = "application/zip" | (string & {});
export interface GetSolFunctionPackageContentInput {
  vnfPkgId: string;
  accept: PackageContentType;
}
export interface GetSolFunctionPackageContentOutput {
  contentType?: PackageContentType;
  packageContent?: Uint8Array;
}
export type DescriptorContentType = "text/plain" | (string & {});
export interface GetSolFunctionPackageDescriptorInput {
  vnfPkgId: string;
  accept: DescriptorContentType;
}
export interface GetSolFunctionPackageDescriptorOutput {
  contentType?: DescriptorContentType;
  vnfd?: Uint8Array;
}
export interface GetSolNetworkInstanceInput {
  nsInstanceId: string;
}
export type NsdId = string;
export type NsState =
  | "INSTANTIATED"
  | "NOT_INSTANTIATED"
  | "UPDATED"
  | "IMPAIRED"
  | "UPDATE_FAILED"
  | "STOPPED"
  | "DELETED"
  | "INSTANTIATE_IN_PROGRESS"
  | "INTENT_TO_UPDATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "TERMINATE_IN_PROGRESS"
  | (string & {});
export interface LcmOperationInfo {
  nsLcmOpOccId: string;
}
export interface GetSolNetworkInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface GetSolNetworkInstanceOutput {
  id: string;
  arn: string;
  nsInstanceName: string;
  nsInstanceDescription: string;
  nsdId: string;
  nsdInfoId: string;
  nsState?: NsState;
  lcmOpInfo?: LcmOperationInfo;
  metadata: GetSolNetworkInstanceMetadata;
  tags?: { [key: string]: string | undefined };
}
export interface GetSolNetworkOperationInput {
  nsLcmOpOccId: string;
}
export type NsLcmOpOccArn = string;
export type NsLcmOperationState =
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | (string & {});
export type LcmOperationType =
  | "INSTANTIATE"
  | "UPDATE"
  | "TERMINATE"
  | (string & {});
export type UpdateSolNetworkType =
  | "MODIFY_VNF_INFORMATION"
  | "UPDATE_NS"
  | (string & {});
export interface ProblemDetails {
  detail: string;
  title?: string;
}
export interface UpdateNsMetadata {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export interface ModifyVnfInfoMetadata {
  vnfInstanceId: string;
  vnfConfigurableProperties: any;
}
export interface InstantiateMetadata {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export interface GetSolNetworkOperationMetadata {
  updateNsMetadata?: UpdateNsMetadata;
  modifyVnfInfoMetadata?: ModifyVnfInfoMetadata;
  instantiateMetadata?: InstantiateMetadata;
  createdAt: Date;
  lastModified: Date;
}
export type StringMap = { [key: string]: string | undefined };
export type ErrorCause = string;
export type ErrorDetails = string;
export interface ErrorInfo {
  cause?: string;
  details?: string;
}
export type TaskStatus =
  | "SCHEDULED"
  | "STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ERROR"
  | "SKIPPED"
  | "CANCELLED"
  | (string & {});
export interface GetSolNetworkOperationTaskDetails {
  taskName?: string;
  taskContext?: { [key: string]: string | undefined };
  taskErrorDetails?: ErrorInfo;
  taskStatus?: TaskStatus;
  taskStartTime?: Date;
  taskEndTime?: Date;
}
export type GetSolNetworkOperationTasksList =
  GetSolNetworkOperationTaskDetails[];
export interface GetSolNetworkOperationOutput {
  id?: string;
  arn: string;
  operationState?: NsLcmOperationState;
  nsInstanceId?: string;
  lcmOperationType?: LcmOperationType;
  updateType?: UpdateSolNetworkType;
  error?: ProblemDetails;
  metadata?: GetSolNetworkOperationMetadata;
  tasks?: GetSolNetworkOperationTaskDetails[];
  tags?: { [key: string]: string | undefined };
}
export interface GetSolNetworkPackageInput {
  nsdInfoId: string;
}
export type VnfPkgIdList = string[];
export interface NetworkArtifactMeta {
  overrides?: ToscaOverride[];
}
export interface GetSolNetworkPackageMetadata {
  nsd?: NetworkArtifactMeta;
  createdAt: Date;
  lastModified: Date;
}
export interface GetSolNetworkPackageOutput {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: GetSolNetworkPackageMetadata;
  tags?: { [key: string]: string | undefined };
}
export interface GetSolNetworkPackageContentInput {
  nsdInfoId: string;
  accept: PackageContentType;
}
export interface GetSolNetworkPackageContentOutput {
  contentType?: PackageContentType;
  nsdContent?: Uint8Array;
}
export interface GetSolNetworkPackageDescriptorInput {
  nsdInfoId: string;
}
export interface GetSolNetworkPackageDescriptorOutput {
  contentType?: DescriptorContentType;
  nsd?: Uint8Array;
}
export interface InstantiateSolNetworkInstanceInput {
  nsInstanceId: string;
  dryRun?: boolean;
  additionalParamsForNs?: any;
  tags?: { [key: string]: string | undefined };
}
export interface InstantiateSolNetworkInstanceOutput {
  nsLcmOpOccId: string;
  tags?: { [key: string]: string | undefined };
}
export type PaginationToken = string;
export interface ListSolFunctionInstancesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface GetSolInstantiatedVnfInfo {
  vnfState?: VnfOperationalState;
}
export interface ListSolFunctionInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface ListSolFunctionInstanceInfo {
  id: string;
  arn: string;
  nsInstanceId: string;
  vnfPkgId: string;
  vnfPkgName?: string;
  instantiationState: VnfInstantiationState;
  instantiatedVnfInfo?: GetSolInstantiatedVnfInfo;
  metadata: ListSolFunctionInstanceMetadata;
}
export type ListSolFunctionInstanceResources = ListSolFunctionInstanceInfo[];
export interface ListSolFunctionInstancesOutput {
  nextToken?: string;
  functionInstances?: ListSolFunctionInstanceInfo[];
}
export interface ListSolFunctionPackagesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ListSolFunctionPackageMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface ListSolFunctionPackageInfo {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  vnfdId?: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  metadata?: ListSolFunctionPackageMetadata;
}
export type ListSolFunctionPackageResources = ListSolFunctionPackageInfo[];
export interface ListSolFunctionPackagesOutput {
  nextToken?: string;
  functionPackages: ListSolFunctionPackageInfo[];
}
export interface ListSolNetworkInstancesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ListSolNetworkInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface ListSolNetworkInstanceInfo {
  id: string;
  arn: string;
  nsInstanceName: string;
  nsInstanceDescription: string;
  nsdId: string;
  nsdInfoId: string;
  nsState: NsState;
  metadata: ListSolNetworkInstanceMetadata;
}
export type ListSolNetworkInstanceResources = ListSolNetworkInstanceInfo[];
export interface ListSolNetworkInstancesOutput {
  nextToken?: string;
  networkInstances?: ListSolNetworkInstanceInfo[];
}
export interface ListSolNetworkOperationsInput {
  nsInstanceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListSolNetworkOperationsMetadata {
  nsdInfoId?: string;
  vnfInstanceId?: string;
  createdAt: Date;
  lastModified: Date;
}
export interface ListSolNetworkOperationsInfo {
  id: string;
  arn: string;
  operationState: NsLcmOperationState;
  nsInstanceId: string;
  lcmOperationType: LcmOperationType;
  updateType?: UpdateSolNetworkType;
  error?: ProblemDetails;
  metadata?: ListSolNetworkOperationsMetadata;
}
export type ListSolNetworkOperationsResources = ListSolNetworkOperationsInfo[];
export interface ListSolNetworkOperationsOutput {
  nextToken?: string;
  networkOperations?: ListSolNetworkOperationsInfo[];
}
export interface ListSolNetworkPackagesInput {
  maxResults?: number;
  nextToken?: string;
}
export interface ListSolNetworkPackageMetadata {
  createdAt: Date;
  lastModified: Date;
}
export interface ListSolNetworkPackageInfo {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  nsdId?: string;
  nsdName?: string;
  nsdVersion?: string;
  nsdDesigner?: string;
  nsdInvariantId?: string;
  vnfPkgIds?: string[];
  metadata: ListSolNetworkPackageMetadata;
}
export type ListSolNetworkPackageResources = ListSolNetworkPackageInfo[];
export interface ListSolNetworkPackagesOutput {
  nextToken?: string;
  networkPackages: ListSolNetworkPackageInfo[];
}
export type TNBResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export interface PutSolFunctionPackageContentInput {
  vnfPkgId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export interface PutSolFunctionPackageContentMetadata {
  vnfd?: FunctionArtifactMeta;
}
export interface PutSolFunctionPackageContentOutput {
  id: string;
  vnfdId: string;
  vnfProductName: string;
  vnfProvider: string;
  vnfdVersion: string;
  metadata: PutSolFunctionPackageContentMetadata;
}
export interface PutSolNetworkPackageContentInput {
  nsdInfoId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export interface PutSolNetworkPackageContentMetadata {
  nsd?: NetworkArtifactMeta;
}
export interface PutSolNetworkPackageContentOutput {
  id: string;
  arn: string;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: PutSolNetworkPackageContentMetadata;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export interface TerminateSolNetworkInstanceInput {
  nsInstanceId: string;
  tags?: { [key: string]: string | undefined };
}
export interface TerminateSolNetworkInstanceOutput {
  nsLcmOpOccId?: string;
  tags?: { [key: string]: string | undefined };
}
export type TagKeys = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateSolFunctionPackageInput {
  vnfPkgId: string;
  operationalState: OperationalState;
}
export interface UpdateSolFunctionPackageOutput {
  operationalState: OperationalState;
}
export interface UpdateSolNetworkModify {
  vnfInstanceId: string;
  vnfConfigurableProperties: any;
}
export interface UpdateSolNetworkServiceData {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export interface UpdateSolNetworkInstanceInput {
  nsInstanceId: string;
  updateType: UpdateSolNetworkType;
  modifyVnfInfoData?: UpdateSolNetworkModify;
  updateNs?: UpdateSolNetworkServiceData;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateSolNetworkInstanceOutput {
  nsLcmOpOccId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateSolNetworkPackageInput {
  nsdInfoId: string;
  nsdOperationalState: NsdOperationalState;
}
export interface UpdateSolNetworkPackageOutput {
  nsdOperationalState: NsdOperationalState;
}
export interface ValidateSolFunctionPackageContentInput {
  vnfPkgId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export interface ValidateSolFunctionPackageContentMetadata {
  vnfd?: FunctionArtifactMeta;
}
export interface ValidateSolFunctionPackageContentOutput {
  id: string;
  vnfdId: string;
  vnfProductName: string;
  vnfProvider: string;
  vnfdVersion: string;
  metadata: ValidateSolFunctionPackageContentMetadata;
}
export interface ValidateSolNetworkPackageContentInput {
  nsdInfoId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export interface ValidateSolNetworkPackageContentMetadata {
  nsd?: NetworkArtifactMeta;
}
export interface ValidateSolNetworkPackageContentOutput {
  id: string;
  arn: string;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: ValidateSolNetworkPackageContentMetadata;
}
export type CancelSolNetworkOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a network operation.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const cancelSolNetworkOperation: API.OperationMethod<
  CancelSolNetworkOperationInput,
  CancelSolNetworkOperationResponse,
  CancelSolNetworkOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}/cancel",
    input: { nsLcmOpOccId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSolNetworkOperation",
})) as any;

export type CreateSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network. For more information, see Function packages in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * Creating a function package is the first step for creating a network in AWS TNB. This
 * request creates an empty container with an ID. The next step is to upload the actual CSAR
 * zip file into that empty container. To upload function package content, see PutSolFunctionPackageContent.
 */
export const createSolFunctionPackage: API.OperationMethod<
  CreateSolFunctionPackageInput,
  CreateSolFunctionPackageOutput,
  CreateSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/vnfpkgm/v1/vnf_packages",
    input: { tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolFunctionPackage",
})) as any;

export type CreateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed. Creating a network instance is the third step after creating a network
 * package. For more information about network instances, Network instances in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * Once you create a network instance, you can instantiate it. To instantiate a network,
 * see InstantiateSolNetworkInstance.
 */
export const createSolNetworkInstance: API.OperationMethod<
  CreateSolNetworkInstanceInput,
  CreateSolNetworkInstanceOutput,
  CreateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nslcm/v1/ns_instances",
    input: { nsdInfoId: 0, nsName: 0, nsDescription: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolNetworkInstance",
})) as any;

export type CreateSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on. For more information, see Network instances in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * A network package consists of a network service descriptor (NSD) file (required) and any
 * additional files (optional), such as scripts specific to your needs. For example, if you
 * have multiple function packages in your network package, you can use the NSD to define
 * which network functions should run in certain VPCs, subnets, or EKS clusters.
 *
 * This request creates an empty network package container with an ID. Once you create a
 * network package, you can upload the network package content using PutSolNetworkPackageContent.
 */
export const createSolNetworkPackage: API.OperationMethod<
  CreateSolNetworkPackageInput,
  CreateSolNetworkPackageOutput,
  CreateSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nsd/v1/ns_descriptors",
    input: { tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolNetworkPackage",
})) as any;

export type DeleteSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 *
 * To delete a function package, the package must be in a disabled state. To disable a
 * function package, see UpdateSolFunctionPackage.
 */
export const deleteSolFunctionPackage: API.OperationMethod<
  DeleteSolFunctionPackageInput,
  DeleteSolFunctionPackageResponse,
  DeleteSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}",
    input: { vnfPkgId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolFunctionPackage",
})) as any;

export type DeleteSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * To delete a network instance, the instance must be in a stopped or terminated state. To
 * terminate a network instance, see TerminateSolNetworkInstance.
 */
export const deleteSolNetworkInstance: API.OperationMethod<
  DeleteSolNetworkInstanceInput,
  DeleteSolNetworkInstanceResponse,
  DeleteSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sol/nslcm/v1/ns_instances/{nsInstanceId}",
    input: { nsInstanceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolNetworkInstance",
})) as any;

export type DeleteSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 *
 * To delete a network package, the package must be in a disable state. To disable a
 * network package, see UpdateSolNetworkPackage.
 */
export const deleteSolNetworkPackage: API.OperationMethod<
  DeleteSolNetworkPackageInput,
  DeleteSolNetworkPackageResponse,
  DeleteSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sol/nsd/v1/ns_descriptors/{nsdInfoId}",
    input: { nsdInfoId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolNetworkPackage",
})) as any;

export type GetSolFunctionInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network function instance, including the instantiation state and
 * metadata from the function package descriptor in the network function package.
 *
 * A network function instance is a function in a function package .
 */
export const getSolFunctionInstance: API.OperationMethod<
  GetSolFunctionInstanceInput,
  GetSolFunctionInstanceOutput,
  GetSolFunctionInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnflcm/v1/vnf_instances/{vnfInstanceId}",
    input: { vnfInstanceId: 0 },
    output: { metadata: { createdAt: D.ts, lastModified: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionInstance",
})) as any;

export type GetSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of an individual function package, such as the operational state and
 * whether the package is in use.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network..
 */
export const getSolFunctionPackage: API.OperationMethod<
  GetSolFunctionPackageInput,
  GetSolFunctionPackageOutput,
  GetSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}",
    input: { vnfPkgId: 0 },
    output: { metadata: { createdAt: D.ts, lastModified: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackage",
})) as any;

export type GetSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the contents of a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const getSolFunctionPackageContent: API.OperationMethod<
  GetSolFunctionPackageContentInput,
  GetSolFunctionPackageContentOutput,
  GetSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
    input: { vnfPkgId: 0, accept: D.m({ header: "Accept" }) },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      packageContent: D.m({ payload: true, shape: D.blob }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackageContent",
})) as any;

export type GetSolFunctionPackageDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a function package descriptor in a function package.
 *
 * A function package descriptor is a .yaml file in a function package that uses the TOSCA standard to describe how the network function in the function package should run on your network.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const getSolFunctionPackageDescriptor: API.OperationMethod<
  GetSolFunctionPackageDescriptorInput,
  GetSolFunctionPackageDescriptorOutput,
  GetSolFunctionPackageDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/vnfd",
    input: { vnfPkgId: 0, accept: D.m({ header: "Accept" }) },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      vnfd: D.m({ payload: true, shape: D.blob }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackageDescriptor",
})) as any;

export type GetSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 */
export const getSolNetworkInstance: API.OperationMethod<
  GetSolNetworkInstanceInput,
  GetSolNetworkInstanceOutput,
  GetSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nslcm/v1/ns_instances/{nsInstanceId}",
    input: { nsInstanceId: 0 },
    output: { metadata: { createdAt: D.ts, lastModified: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkInstance",
})) as any;

export type GetSolNetworkOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network operation, including the tasks involved in the network
 * operation and the status of the tasks.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const getSolNetworkOperation: API.OperationMethod<
  GetSolNetworkOperationInput,
  GetSolNetworkOperationOutput,
  GetSolNetworkOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}",
    input: { nsLcmOpOccId: 0 },
    output: {
      metadata: { createdAt: D.ts, lastModified: D.ts },
      tasks: D.list({ taskStartTime: D.ts, taskEndTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkOperation",
})) as any;

export type GetSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const getSolNetworkPackage: API.OperationMethod<
  GetSolNetworkPackageInput,
  GetSolNetworkPackageOutput,
  GetSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nsd/v1/ns_descriptors/{nsdInfoId}",
    input: { nsdInfoId: 0 },
    output: { metadata: { createdAt: D.ts, lastModified: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackage",
})) as any;

export type GetSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the contents of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const getSolNetworkPackageContent: API.OperationMethod<
  GetSolNetworkPackageContentInput,
  GetSolNetworkPackageContentOutput,
  GetSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content",
    input: { nsdInfoId: 0, accept: D.m({ header: "Accept" }) },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      nsdContent: D.m({ payload: true, shape: D.blob }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackageContent",
})) as any;

export type GetSolNetworkPackageDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the content of the network service descriptor.
 *
 * A network service descriptor is a .yaml file in a network package that uses the TOSCA standard to describe the network functions you want to deploy and the Amazon Web Services infrastructure you want to deploy the network functions on.
 */
export const getSolNetworkPackageDescriptor: API.OperationMethod<
  GetSolNetworkPackageDescriptorInput,
  GetSolNetworkPackageDescriptorOutput,
  GetSolNetworkPackageDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd",
    input: { nsdInfoId: 0 },
    output: {
      contentType: D.m({ header: "Content-Type" }),
      nsd: D.m({ payload: true, shape: D.blob }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackageDescriptor",
})) as any;

export type InstantiateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instantiates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * Before you can instantiate a network instance, you have to create a network instance.
 * For more information, see CreateSolNetworkInstance.
 */
export const instantiateSolNetworkInstance: API.OperationMethod<
  InstantiateSolNetworkInstanceInput,
  InstantiateSolNetworkInstanceOutput,
  InstantiateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nslcm/v1/ns_instances/{nsInstanceId}/instantiate",
    input: {
      nsInstanceId: 0,
      dryRun: D.m({ query: "dry_run" }),
      additionalParamsForNs: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InstantiateSolNetworkInstance",
})) as any;

export type ListSolFunctionInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network function instances.
 *
 * A network function instance is a function in a function package .
 */
export const listSolFunctionInstances: API.PaginatedOperationMethod<
  ListSolFunctionInstancesInput,
  ListSolFunctionInstancesOutput,
  ListSolFunctionInstancesError,
  Credentials | HttpClient.HttpClient,
  ListSolFunctionInstanceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnflcm/v1/vnf_instances",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "nextpage_opaque_marker" }),
    },
    output: {
      functionInstances: D.list({
        metadata: { createdAt: D.ts, lastModified: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolFunctionInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functionInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolFunctionPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about function packages.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const listSolFunctionPackages: API.PaginatedOperationMethod<
  ListSolFunctionPackagesInput,
  ListSolFunctionPackagesOutput,
  ListSolFunctionPackagesError,
  Credentials | HttpClient.HttpClient,
  ListSolFunctionPackageInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/vnfpkgm/v1/vnf_packages",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "nextpage_opaque_marker" }),
    },
    output: {
      functionPackages: D.list({
        metadata: { createdAt: D.ts, lastModified: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolFunctionPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functionPackages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your network instances.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 */
export const listSolNetworkInstances: API.PaginatedOperationMethod<
  ListSolNetworkInstancesInput,
  ListSolNetworkInstancesOutput,
  ListSolNetworkInstancesError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkInstanceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nslcm/v1/ns_instances",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "nextpage_opaque_marker" }),
    },
    output: {
      networkInstances: D.list({
        metadata: { createdAt: D.ts, lastModified: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details for a network operation, including when the operation started and the
 * status of the operation.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const listSolNetworkOperations: API.PaginatedOperationMethod<
  ListSolNetworkOperationsInput,
  ListSolNetworkOperationsOutput,
  ListSolNetworkOperationsError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkOperationsInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nslcm/v1/ns_lcm_op_occs",
    input: {
      nsInstanceId: D.m({ query: "nsInstanceId" }),
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "nextpage_opaque_marker" }),
    },
    output: {
      networkOperations: D.list({
        metadata: { createdAt: D.ts, lastModified: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network packages.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const listSolNetworkPackages: API.PaginatedOperationMethod<
  ListSolNetworkPackagesInput,
  ListSolNetworkPackagesOutput,
  ListSolNetworkPackagesError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkPackageInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sol/nsd/v1/ns_descriptors",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "nextpage_opaque_marker" }),
    },
    output: {
      networkPackages: D.list({
        metadata: { createdAt: D.ts, lastModified: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkPackages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for AWS TNB resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads the contents of a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const putSolFunctionPackageContent: API.OperationMethod<
  PutSolFunctionPackageContentInput,
  PutSolFunctionPackageContentOutput,
  PutSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
    input: {
      vnfPkgId: 0,
      contentType: D.m({ header: "Content-Type" }),
      file: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSolFunctionPackageContent",
})) as any;

export type PutSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads the contents of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const putSolNetworkPackageContent: API.OperationMethod<
  PutSolNetworkPackageContentInput,
  PutSolNetworkPackageContentOutput,
  PutSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content",
    input: {
      nsdInfoId: 0,
      contentType: D.m({ header: "Content-Type" }),
      file: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSolNetworkPackageContent",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags an AWS TNB resource.
 *
 * A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your Amazon Web Services costs.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TerminateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * You must terminate a network instance before you can delete it.
 */
export const terminateSolNetworkInstance: API.OperationMethod<
  TerminateSolNetworkInstanceInput,
  TerminateSolNetworkInstanceOutput,
  TerminateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nslcm/v1/ns_instances/{nsInstanceId}/terminate",
    input: { nsInstanceId: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSolNetworkInstance",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untags an AWS TNB resource.
 *
 * A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your Amazon Web Services costs.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the operational state of function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const updateSolFunctionPackage: API.OperationMethod<
  UpdateSolFunctionPackageInput,
  UpdateSolFunctionPackageOutput,
  UpdateSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}",
    input: { vnfPkgId: 0, operationalState: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolFunctionPackage",
})) as any;

export type UpdateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * Choose the *updateType* parameter to target the necessary update of the network instance.
 */
export const updateSolNetworkInstance: API.OperationMethod<
  UpdateSolNetworkInstanceInput,
  UpdateSolNetworkInstanceOutput,
  UpdateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sol/nslcm/v1/ns_instances/{nsInstanceId}/update",
    input: {
      nsInstanceId: 0,
      updateType: 0,
      modifyVnfInfoData: { vnfInstanceId: 0, vnfConfigurableProperties: 0 },
      updateNs: { nsdInfoId: 0, additionalParamsForNs: 0 },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolNetworkInstance",
})) as any;

export type UpdateSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the operational state of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 *
 * A network service descriptor is a .yaml file in a network package that uses the TOSCA standard to describe the network functions you want to deploy and the Amazon Web Services infrastructure you want to deploy the network functions on.
 */
export const updateSolNetworkPackage: API.OperationMethod<
  UpdateSolNetworkPackageInput,
  UpdateSolNetworkPackageOutput,
  UpdateSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sol/nsd/v1/ns_descriptors/{nsdInfoId}",
    input: { nsdInfoId: 0, nsdOperationalState: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolNetworkPackage",
})) as any;

export type ValidateSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates function package content. This can be used as a dry run before uploading
 * function package content with PutSolFunctionPackageContent.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const validateSolFunctionPackageContent: API.OperationMethod<
  ValidateSolFunctionPackageContentInput,
  ValidateSolFunctionPackageContentOutput,
  ValidateSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content/validate",
    input: {
      vnfPkgId: 0,
      contentType: D.m({ header: "Content-Type" }),
      file: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSolFunctionPackageContent",
})) as any;

export type ValidateSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates network package content. This can be used as a dry run before uploading
 * network package content with PutSolNetworkPackageContent.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const validateSolNetworkPackageContent: API.OperationMethod<
  ValidateSolNetworkPackageContentInput,
  ValidateSolNetworkPackageContentOutput,
  ValidateSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content/validate",
    input: {
      nsdInfoId: 0,
      contentType: D.m({ header: "Content-Type" }),
      file: D.m({ payload: true, shape: D.stream }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSolNetworkPackageContent",
})) as any;
